"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project, ProjectLabels } from "@/content/site";
import { lockScroll, unlockScroll } from "@/lib/smoothScroll";

/**
 * Accessible project detail dialog.
 * - Closes on Escape / backdrop click.
 * - Locks body scroll and restores focus to the trigger on close.
 * - Uses role="dialog" + aria-modal and a labelled title.
 */
export function ProjectModal({
  project,
  labels,
  onClose,
}: {
  project: Project | null;
  labels: ProjectLabels;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    lockScroll(); // pause Lenis so the background can't scroll behind the modal
    // Move focus into the dialog.
    const t = setTimeout(() => closeRef.current?.focus(), 20);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      unlockScroll();
      lastFocused.current?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ocean-deep/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-2 border-gold/50 bg-surface shadow-poster-lg"
          >
            {/* Header image */}
            <div className="relative aspect-[16/9] w-full shrink-0 bg-ocean-deep/40">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 42rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-surface/90 text-ink backdrop-blur-sm transition-colors hover:bg-surface"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="pill text-gold">{project.category}</span>
                {project.bounty && (
                  <span className="font-pirate text-lg text-crimson">
                    ฿ {project.bounty}
                  </span>
                )}
              </div>
              <h3
                id="project-modal-title"
                className="font-display text-2xl font-bold text-ink sm:text-3xl"
              >
                {project.title}
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {project.description}
              </p>

              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                  {labels.crewTools}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-surface-2 px-3 py-1 text-sm text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {labels.live} <FiExternalLink />
                  </a>
                )}
                {project.links.code && (
                  <a
                    href={project.links.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    {labels.code} <FiGithub />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
