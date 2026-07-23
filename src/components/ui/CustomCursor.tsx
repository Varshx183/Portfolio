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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cursor-fruit.png" alt="" draggable={false} />
      </div>
    </>
  );
}
