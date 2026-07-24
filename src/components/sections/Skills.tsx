"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { SkillGroup, Skill, SectionCopy } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
  const sectionRef = useRef<HTMLElement>(null);

  // Progress from 0 (section entering the viewport) to 1 (section centered).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // The sideways spread only applies once the cards sit in a row (md+). On
  // mobile they're stacked, so we fall back to a simple fade-up per card.
  const [spread, setSpread] = useState(220);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setSpread(mq.matches ? 220 : 0);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const center = (skillGroups.length - 1) / 2;

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-28">
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
            <SkillGroupCard
              key={group.title}
              group={group}
              dir={gi - center}
              spread={spread}
              progress={scrollYProgress}
              reduce={!!reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** One skill group card. On desktop it eases outward from the center as the
 *  section scrolls into view; on mobile it fades up. */
function SkillGroupCard({
  group,
  dir,
  spread,
  progress,
  reduce,
}: {
  group: SkillGroupWithIcons;
  dir: number;
  spread: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const desktop = spread > 0;
  // Start pulled toward the center (opposite of the card's side), then settle
  // into its natural position — so the row "opens up" as you scroll.
  const x = useTransform(progress, [0, 1], [-dir * spread, 0]);
  const opacity = useTransform(progress, [0, 0.4], [0, 1]);
  const scale = useTransform(progress, [0, 1], [0.94, 1]);

  const motionProps =
    reduce || !desktop
      ? reduce
        ? {}
        : {
            initial: { opacity: 0, y: 22 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
          }
      : { style: { x, opacity, scale } };

  return (
    <motion.div
      {...motionProps}
      className="card flex w-full flex-col p-6 will-change-transform md:w-[calc(33.333%-1rem)]"
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
    </motion.div>
  );
}
