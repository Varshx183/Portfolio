"use client";

import { FiAward, FiExternalLink } from "react-icons/fi";
import type { Certification, SectionCopy } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications({
  certifications,
  heading,
  viewLabel = "View credential",
}: {
  certifications: Certification[];
  heading: SectionCopy;
  viewLabel?: string;
}) {
  return (
    <section id="certifications" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          subtitle={heading.subtitle}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 text-center transition-all hover:-translate-y-1.5 hover:border-gold hover:shadow-gold">
                {/* Glow ring */}
                <span className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gold/20 blur-2xl transition-opacity group-hover:opacity-100" />

                <span className="relative mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full border-2 border-gold/60 bg-gold/10 text-gold">
                  <FiAward size={26} />
                  <span className="absolute inset-0 rounded-full border-2 border-gold/40 group-hover:animate-pulse-ring" />
                </span>

                <h3 className="font-display text-base font-semibold leading-snug text-ink">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-gold">{cert.issuer}</p>
                <p className="mt-1 text-xs text-ink-muted">{cert.year}</p>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-gold"
                  >
                    {viewLabel} <FiExternalLink size={14} />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
