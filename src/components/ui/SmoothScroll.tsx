"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { setLenis, SCROLL_OFFSET } from "@/lib/smoothScroll";

/**
 * Inertial smooth-scroll layer (Lenis). Renders nothing; sets up the global
 * scroll on mount. It drives the *real* scroll position, so IntersectionObserver
 * scroll-spy, `position: fixed`, and framer's `useScroll` all keep working.
 *
 * - Disabled entirely under `prefers-reduced-motion` (falls back to native).
 * - Disabled on the /studio route (the CMS has its own scroll).
 * - Intercepts in-page `#anchor` links for eased navigation with a navbar offset.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  // Publish a STABLE viewport height for the fixed background layer. It updates
  // only when the width changes (orientation change / window resize), so the
  // mobile URL bar sliding in and out — a height-only resize — never resizes the
  // background and makes it wobble while scrolling.
  useEffect(() => {
    let lastWidth = window.innerWidth;
    const setAppHeight = () =>
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    setAppHeight();
    const onResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        setAppHeight();
      }
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", setAppHeight);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", setAppHeight);
    };
  }, []);

  useEffect(() => {
    if (pathname?.startsWith("/studio")) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Eased in-page anchor navigation.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: SCROLL_OFFSET });
      history.pushState(null, "", href);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      setLenis(null);
    };
  }, [pathname]);

  return null;
}
