"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Compass } from "@/components/ui/illustrations/Compass";

/**
 * Brief branded intro overlay shown on first load, then fades away. It covers
 * the initial paint/layout-shift so the entrance feels intentional and smooth.
 * `name` is passed from the server layout (so it reflects the CMS name).
 * Dismisses on window `load` (with a short settle delay) and has a hard
 * fallback timeout so it can never get stuck. Respects reduced motion via the
 * global CSS rule that neutralizes animations.
 */
export function PageLoader({
  name,
  tagline = "Charting the course…",
}: {
  name: string;
  tagline?: string;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let settle: number | undefined;
    const finish = () => {
      settle = window.setTimeout(() => setLoading(false), 350);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    // Safety net: never stay longer than this.
    const max = window.setTimeout(() => setLoading(false), 1800);

    return () => {
      window.removeEventListener("load", finish);
      if (settle) clearTimeout(settle);
      clearTimeout(max);
    };
  }, []);

  // Don't cover the CMS Studio with the intro overlay.
  if (pathname?.startsWith("/studio")) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-5">
            {/* Spinning ring + compass emblem */}
            <div className="relative h-16 w-16">
              <span className="absolute inset-0 rounded-full border-2 border-gold/20" />
              <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" />
              <Compass className="absolute inset-[7px] text-gold/70" />
            </div>
            <p className="font-pirate text-2xl text-gradient-gold">{name}</p>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-muted">
              {tagline}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
