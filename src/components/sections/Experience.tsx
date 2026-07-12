"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiBriefcase, FiBookOpen } from "react-icons/fi";
import type { ExperienceItem, EducationItem, SectionCopy } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience({
  experience,
  education,
  heading,
}: {
  experience: ExperienceItem[];
  education: EducationItem[];
  heading: SectionCopy;
}) {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          subtitle={heading.subtitle}
        />

        {/* Timeline */}
        <ol className="relative mx-auto max-w-3xl">
          {/* The route line */}
          <div
            className="absolute left-4 top-2 h-full w-0.5 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden
          >
            <motion.div
              className="h-full w-full origin-top rope"
              style={{ backgroundSize: "2px 16px" }}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
          </div>

          {experience.map((item, i) => {
            const sideLeft = i % 2 === 0;
            return (
              <li
                key={`${item.company}-${i}`}
                className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${
                  sideLeft
                    ? "sm:pr-10 sm:text-right"
                    : "sm:ml-auto sm:pl-10"
                }`}
              >
                {/* Node marker */}
                <span
                  className={`absolute top-1.5 grid h-8 w-8 place-items-center rounded-full border-2 border-gold bg-surface text-gold shadow-gold left-0 sm:left-auto ${
                    sideLeft
                      ? "sm:-right-4 sm:translate-x-1/2"
                      : "sm:-left-4 sm:-translate-x-1/2"
                  }`}
                  aria-hidden
                >
                  <FiBriefcase size={15} />
                </span>

                <Reveal direction={sideLeft ? "left" : "right"}>
                  <article className="card p-5 transition-transform hover:-translate-y-1">
                    <span className="pill mb-2 text-gold">{item.period}</span>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-gold">
                      {item.company} · {item.location}
                    </p>
                    <ul
                      className={`mt-3 space-y-1.5 text-sm text-ink-muted ${
                        sideLeft ? "sm:text-right" : ""
                      }`}
                    >
                      {item.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                    <div
                      className={`mt-3 flex flex-wrap gap-1.5 ${
                        sideLeft ? "sm:justify-end" : ""
                      }`}
                    >
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Education */}
        <div className="mx-auto mt-16 max-w-3xl">
          <Reveal className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold">
              <FiBookOpen size={20} />
            </span>
            <h3 className="font-display text-2xl font-semibold text-ink">
              Navigation School
            </h3>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu, i) => (
              <Reveal key={edu.school} delay={i * 0.1}>
                <article className="card h-full p-5 transition-transform hover:-translate-y-1">
                  <span className="pill mb-2 text-gold">{edu.period}</span>
                  <h4 className="font-display text-lg font-semibold text-ink">
                    {edu.degree}
                  </h4>
                  <p className="text-sm font-medium text-gold">{edu.school}</p>
                  <p className="mt-2 text-sm text-ink-muted">{edu.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
