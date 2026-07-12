"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight pointer-parallax. Tracks the cursor's offset from the center of
 * the referenced element and returns a `transform(depth)` helper that moves a
 * layer proportionally to its depth. Disabled implicitly on touch (no
 * pointermove) and should be skipped by callers when reduced motion is set.
 *
 * @param strength  Max pixel travel at depth 1.
 */
export function useParallax(strength = 20) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Normalized -1..1 offset from center.
        setPos({
          x: (e.clientX - cx) / (rect.width / 2),
          y: (e.clientY - cy) / (rect.height / 2),
        });
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const transform = (depth: number) =>
    `translate3d(${(-pos.x * strength * depth).toFixed(2)}px, ${(
      -pos.y *
      strength *
      depth
    ).toFixed(2)}px, 0)`;

  return { ref, transform };
}
