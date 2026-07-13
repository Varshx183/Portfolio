"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project, SectionCopy, ProjectLabels } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";

export function Projects({
  projects,
  heading,
  labels,
}: {
  projects: Project[];
  heading: SectionCopy;
  labels: ProjectLabels;
}) {
  const allLabel = labels.all;
  const [filter, setFilter] = useState<string>(allLabel);
  const [active, setActive] = useState<Project | null>(null);

  const projectCategories = useMemo(
    () => [allLabel, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects, allLabel]
  );

  const visible = useMemo(
    () =>
      filter === allLabel
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects, allLabel]
  );

  return (
    <section id="projects" className="relative py-24 sm:py-28">
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

        {/* Filter bar */}
        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => {
            const selected = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(cat)}
                className={`relative rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                  selected
                    ? "text-bg"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.ul
          layout
          className="flex flex-wrap justify-center gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <ProjectCard
                  project={project}
                  labels={labels}
                  onOpen={() => setActive(project)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <Reveal className="py-16 text-center text-ink-muted">
            {labels.empty}
          </Reveal>
        )}
      </div>

      {/* Detail modal */}
      <ProjectModal
        project={active}
        labels={labels}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
