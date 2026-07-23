"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Custom "devil fruit" cursor: a small exact dot plus a spinning, glowing
 * devil-fruit orb that trails the pointer with easing and grows over anything
 * interactive.
 *
 * - Only on precise pointers (a real mouse) and when reduced motion is off, so
 *   touch users and motion-sensitive users keep the native cursor.
 * - Skipped on /studio so the CMS keeps its normal cursor.
 * - Purely decorative and non-interactive (pointer-events: none).
 */
export function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const fruitRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/studio")) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    // mouse target (mx,my) and eased orb position (fx,fy)
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let fx = mx;
    let fy = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea, select, label, summary"
      );
      fruitRef.current?.classList.toggle("is-hover", Boolean(el));
    };
    const onLeave = () => root.classList.add("cursor-hidden");
    const onEnter = () => root.classList.remove("cursor-hidden");

    const tick = () => {
      fx += (mx - fx) * 0.16;
      fy += (my - fy) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (fruitRef.current) {
        fruitRef.current.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      root.classList.remove("has-custom-cursor", "cursor-hidden");
    };
  }, [pathname]);

  if (!enabled || pathname?.startsWith("/studio")) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={fruitRef} className="cursor-fruit" aria-hidden>
        <svg viewBox="0 0 40 40" className="text-gold" fill="none">
          <defs>
            <radialGradient id="devil-fruit" cx="38%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#8a5cd8" />
              <stop offset="100%" stopColor="#37205f" />
            </radialGradient>
          </defs>
          {/* stem + leaf */}
          <path
            d="M20 8c0-3 1.4-4.6 4-5.2"
            stroke="#7c5a33"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M23 3c2.6-1.5 5-.7 6.5 1.1-1.8 2.1-4.5 2-6.5.3z" fill="#3fa35c" />
          {/* body */}
          <circle
            cx="20"
            cy="24"
            r="13"
            fill="url(#devil-fruit)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* signature swirls */}
          <path
            d="M12 22c2.4-3.2 5-3.2 7.4 0s5 3.2 7.4 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M11 28c2.7-3.4 5.6-3.4 8.3 0s5.6 3.4 8.3 0"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>
    </>
  );
}
