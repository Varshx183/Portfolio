"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiEye } from "react-icons/fi";
import type { Project } from "@/content/site";

/**
 * "Wanted Poster" project card. Hover lifts + tilts the poster and reveals a
 * quick-actions bar. The whole card opens a detail modal; inner links stop
 * propagation so they navigate instead of opening the modal.
 */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-gold/40 bg-surface shadow-poster transition-shadow hover:shadow-poster-lg"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {/* Poster header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-gold/40 bg-surface-2 px-4 py-2">
        <span className="font-pirate text-sm uppercase tracking-[0.25em] text-gold">
          Wanted
        </span>
        {project.featured && (
          <span className="rounded-full bg-crimson/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-crimson">
            Featured
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ocean-deep/30">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover quick-actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-ocean-deep/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open live demo of ${project.title}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-gold text-bg transition-transform hover:scale-110"
            >
              <FiExternalLink size={18} />
            </a>
          )}
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View source code of ${project.title}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink transition-transform hover:scale-110"
            >
              <FiGithub size={18} />
            </a>
          )}
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white">
            <FiEye size={18} />
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-ink">
            {project.title}
          </h3>
          <span className="pill shrink-0 text-[10px]">{project.category}</span>
        </div>
        <p className="mb-4 flex-1 text-sm text-ink-muted">{project.summary}</p>

        {/* Bounty — optional One Piece flourish; hidden when not set. */}
        {project.bounty && (
          <div className="mb-4 flex items-baseline gap-1 border-y border-dashed border-border py-2">
            <span className="text-xs uppercase tracking-wide text-ink-muted">
              Bounty
            </span>
            <span className="ml-auto font-pirate text-xl text-crimson">
              ฿ {project.bounty}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
