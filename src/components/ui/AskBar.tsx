"use client";

import { useState, type FormEvent } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import type { AskCopy } from "@/content/types";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { matchIntent } from "@/lib/askIntents";

/**
 * "Ask me anything" bar for the hero.
 *
 * A visitor can click a shortcut chip or type a question; we match it against
 * keywords and jump to the matching section (or open the résumé). Matching is
 * local and rule-based, so it's instant, works offline, and can never invent an
 * answer. Chip labels are editable in the CMS; the section each one targets is
 * fixed here.
 */

/** Shortcut chips, in display order. `key` reads its label from the CMS copy. */
const CHIPS = [
  { key: "projects", target: "#projects" },
  { key: "skills", target: "#skills" },
  { key: "experience", target: "#experience" },
  { key: "certifications", target: "#certifications" },
  { key: "resume", target: "resume" },
  { key: "contact", target: "#contact" },
] as const;

export function AskBar({
  copy,
  resumeUrl,
}: {
  copy: AskCopy;
  resumeUrl: string;
}) {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  function go(target: string) {
    if (target === "resume") {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    smoothScrollTo(target);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    const target = matchIntent(query);
    if (target) {
      setMessage("");
      setQuery("");
      go(target);
    } else {
      setMessage(copy.notFound);
    }
  }

  return (
    <div className="mt-8 max-w-xl">
      <form
        onSubmit={onSubmit}
        role="search"
        className="flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 backdrop-blur-sm transition-colors focus-within:border-gold"
      >
        <FiSearch className="shrink-0 text-ink-muted" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (message) setMessage("");
          }}
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink-muted/80"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-bg transition-transform hover:scale-105"
        >
          <FiArrowRight size={16} />
        </button>
      </form>

      {/* Only speaks up when nothing matched. */}
      <div aria-live="polite">
        {message && <p className="mt-2 text-xs text-ink-muted">{message}</p>}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CHIPS.map((chip, i) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => {
              setMessage("");
              go(chip.target);
            }}
            // Keep the mobile hero compact: show the first three chips, then
            // the rest once there's room.
            className={`pill transition-colors hover:border-gold hover:text-gold ${
              i >= 3 ? "hidden sm:inline-flex" : ""
            }`}
          >
            {copy[chip.key]}
          </button>
        ))}
      </div>
    </div>
  );
}
