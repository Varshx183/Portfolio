"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDown, FiMapPin } from "react-icons/fi";
import type { SiteInfo, Social, HeroCopy } from "@/content/types";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Waves } from "@/components/ui/Waves";
import { Compass } from "@/components/ui/illustrations/Compass";
import { useParallax } from "@/hooks/useParallax";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({
  site,
  socials,
  hero,
}: {
  site: SiteInfo;
  socials: Social[];
  hero: HeroCopy;
}) {
  const reduce = useReducedMotion();
  const { ref, transform } = useParallax(18);

  // Lay the stat boxes out to match how many there are, so there's never a
  // blank cell (e.g. 3 stats no longer leaves an empty 4th box).
  const statCount = Math.min(site.stats.length, 4);
  const statCols =
    ({
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    } as Record<number, string>)[statCount] || "grid-cols-2 sm:grid-cols-4";

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Backdrop: map grid + radial ocean glow */}
      <div className="absolute inset-0 -z-10 bg-radial-fade" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-map-grid [background-size:44px_44px] opacity-[0.35]"
        aria-hidden
      />

      {/* Floating decorations: the compass (spins) and the anchor (bobs).
          Shown on every screen — including mobile portrait — tucked into the
          corners at a negative z-index so they sit *behind* the text and read
          as ambient map details without ever covering the copy. */}
      <motion.div
        style={reduce ? undefined : { transform: transform(0.5) }}
        className="pointer-events-none absolute -right-6 top-20 -z-10 opacity-60 sm:-right-4 sm:opacity-80 md:-right-10 md:top-24 md:opacity-90"
        aria-hidden
      >
        <Compass className="h-40 w-40 animate-spin-slow text-gold/70 sm:h-60 sm:w-60 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[28rem] xl:w-[28rem]" />
      </motion.div>
      <motion.div
        style={reduce ? undefined : { transform: transform(0.8) }}
        className="pointer-events-none absolute bottom-52 right-6 -z-10 text-4xl opacity-70 sm:bottom-36 sm:right-8 sm:text-6xl md:right-10 md:bottom-44 md:text-7xl"
        aria-hidden
      >
        <span className="inline-block animate-float">⚓</span>
      </motion.div>

      <div className="container-x">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="pill mb-6 border-gold/40 text-gold"
          >
            <FiMapPin className="text-gold" />
            {site.location}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-gold">{site.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-pirate text-2xl text-ink-soft sm:text-3xl"
          >
            {site.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {site.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary">
              {hero.ctaPrimary}
              <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#contact" className="btn-ghost">
              {hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/70 text-ink-soft backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <SocialIcon name={s.key} size={19} />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.dl
            variants={item}
            className={`mt-12 grid max-w-xl gap-px overflow-hidden rounded-2xl border border-border bg-border ${statCols}`}
          >
            {site.stats.map((s) => (
              <div key={s.label} className="bg-surface/80 px-4 py-4 text-center backdrop-blur-sm">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-gold">
                  {s.value}
                </dd>
                <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-28 left-1/2 hidden -translate-x-1/2 text-ink-muted sm:block"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <FiArrowDown size={22} />
      </motion.a>

      <Waves />
    </section>
  );
}
