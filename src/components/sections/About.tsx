"use client";

import Image from "next/image";
import { FiAnchor, FiCompass, FiMap, FiUser } from "react-icons/fi";
import type { SiteInfo, SectionCopy } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const highlights = [
  {
    icon: FiCompass,
    title: "Security-minded",
    text: "I think about how systems break, not just how they work.",
  },
  {
    icon: FiAnchor,
    title: "Thorough & methodical",
    text: "Careful analysis and clean fixes, with no loose ends.",
  },
  {
    icon: FiMap,
    title: "Always learning",
    text: "New tools, new threats. The map is never finished.",
  },
];

export function About({
  site,
  heading,
}: {
  site: SiteInfo;
  heading: SectionCopy;
}) {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          subtitle={heading.subtitle}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Portrait card (wanted-poster frame). Add your photo by dropping an
              image in /public and setting `photo` in src/content/site.ts. */}
          <Reveal direction="right" className="mx-auto w-full max-w-sm">
            <div className="group relative">
              <div className="relative overflow-hidden rounded-3xl border-2 border-gold/50 bg-surface-2 shadow-poster-lg">
                <div className="relative aspect-[4/5] w-full">
                  {site.photo ? (
                    <Image
                      src={site.photo}
                      alt={site.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 24rem"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-ocean/25 to-ocean-deep/45">
                      <span className="grid h-24 w-24 place-items-center rounded-full border-2 border-gold/50 text-gold/70">
                        <FiUser size={44} />
                      </span>
                      <p className="font-pirate text-2xl text-gold">Wanted</p>
                    </div>
                  )}
                </div>
                <div className="border-t-2 border-dashed border-gold/40 bg-surface px-5 py-4 text-center">
                  <p className="font-display text-lg font-semibold text-ink">
                    {site.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    Wanted Alive
                  </p>
                </div>
              </div>
              <div className="absolute -right-3 -top-3 h-16 w-16 rotate-12 rounded-full border-2 border-crimson/60 bg-crimson/10" aria-hidden />
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            {site.about.map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="mb-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {para}
                </p>
              </Reveal>
            ))}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={0.15 + i * 0.1}>
                  <div className="card h-full p-5 transition-transform hover:-translate-y-1">
                    <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-gold/15 text-gold">
                      <h.icon size={20} />
                    </span>
                    <p className="font-display font-semibold text-ink">
                      {h.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
