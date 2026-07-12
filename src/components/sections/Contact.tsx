"use client";

import { useState, type FormEvent } from "react";
import { FiSend, FiDownload, FiMail, FiMapPin, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import type { SiteInfo, Social, SectionCopy } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact({
  site,
  socials,
  heading,
}: {
  site: SiteInfo;
  socials: Social[];
  heading: SectionCopy;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) next.name = "Please tell me your name.";
    if (!emailRe.test(email)) next.email = "Please enter a valid email.";
    if (message.length < 10) next.message = "A little more detail, please (10+ chars).";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields; humans don't.
    if (data.get("company")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");

    // If a form endpoint is configured (e.g. Formspree), POST to it.
    // Otherwise, gracefully fall back to a pre-filled mailto: link.
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
        const body = encodeURIComponent(
          `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-bg-soft/70 to-transparent"
        aria-hidden
      />

      <div className="container-x">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          subtitle={heading.subtitle}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: info + resume */}
          <Reveal direction="right" className="flex flex-col gap-6">
            <div className="card p-6">
              <h3 className="font-display text-xl font-semibold text-ink">
                Let&apos;s set sail together
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                I&apos;m open to full-time roles, freelance voyages, and
                interesting collaborations. I usually reply within a day.
              </p>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-center gap-3 text-ink-soft">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold">
                    <FiMail size={16} />
                  </span>
                  <a href={`mailto:${site.email}`} className="hover:text-gold">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-ink-soft">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold">
                    <FiMapPin size={16} />
                  </span>
                  {site.location}
                </li>
              </ul>

              <div className="mt-5 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target={s.key === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-ink-soft transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                  >
                    <SocialIcon name={s.key} size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Resume download card */}
            <div className="card flex items-center gap-4 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-crimson/15 text-crimson">
                <FiDownload size={22} />
              </span>
              <div className="flex-1">
                <p className="font-display font-semibold text-ink">
                  Grab my résumé
                </p>
                <p className="text-sm text-ink-muted">
                  The full logbook — one PDF.
                </p>
              </div>
              <a href={site.resumeUrl} download className="btn-primary !px-5 !py-2.5 text-sm">
                Download
              </a>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="left">
            <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
              {/* Honeypot (hidden from humans) */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Nico Robin"
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@crew.com"
                  error={errors.email}
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or role…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full resize-y rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-gold"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-crimson">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                <FiSend />
              </button>

              {/* Live region for status (a11y) */}
              <div aria-live="polite" className="mt-4">
                {status === "success" && (
                  <p className="flex items-center gap-2 rounded-lg bg-aqua/15 px-4 py-3 text-sm text-aqua">
                    <FiCheckCircle /> Message sent! I&apos;ll be in touch soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 rounded-lg bg-crimson/15 px-4 py-3 text-sm text-crimson">
                    <FiAlertCircle /> Something went wrong. Please email me directly.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Reusable labelled input with inline error messaging. */
function Field({
  label,
  name,
  type,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus:border-gold"
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}
