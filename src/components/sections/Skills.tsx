"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SkillGroup, Skill, SectionCopy } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Skills with their icon pre-rendered server-side (see page.tsx). */
type SkillWithIcon = Skill & { iconNode: ReactNode };
type SkillGroupWithIcons = Omit<SkillGroup, "skills"> & {
  skills: SkillWithIcon[];
};

export function Skills({
  skillGroups,
  heading,
}: {
  skillGroups: SkillGroupWithIcons[];
  heading: SectionCopy;
}) {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative py-24 sm:py-28">
      {/* soft backdrop */}
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

        <div className="flex flex-wrap justify-center gap-6">
          {skillGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 0.1}
              className="card flex w-full flex-col p-6 md:w-[calc(33.333%-1rem)]"
            >
              <div className="mb-5">
                <h3 className="font-display text-xl font-semibold text-gold">
                  {group.title}
                </h3>
                <p className="text-sm text-ink-muted">{group.blurb}</p>
              </div>

              <ul className="flex flex-col gap-4">
                {group.skills.map((skill, si) => (
                  <li key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                        {skill.iconNode}
                        {skill.name}
                      </span>
                      <span className="text-xs tabular-nums text-ink-muted">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Ability meter */}
                    <div
                      className="h-2 overflow-hidden rounded-full bg-surface-2"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name} proficiency`}
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: 0.1 + si * 0.06,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
