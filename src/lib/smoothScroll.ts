"use client";

import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance so any component can drive
 * smooth scrolling (nav links, back-to-top) or pause it (modals, drawers)
 * without prop-drilling. When Lenis isn't active (reduced motion / not mounted)
 * the helpers fall back to native scrolling so behavior degrades gracefully.
 */

let instance: Lenis | null = null;

/** Offset so anchored targets clear the fixed navbar. */
export const SCROLL_OFFSET = -90;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

/** Smooth-scroll to a pixel position, selector, or element. */
export function smoothScrollTo(
  target: number | string | HTMLElement,
  offset = SCROLL_OFFSET
) {
  if (instance) {
    instance.scrollTo(target as never, { offset });
    return;
  }
  // Native fallback.
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

/** Pause / resume smooth scrolling (used while a modal or drawer is open). */
export function lockScroll() {
  instance?.stop();
}
export function unlockScroll() {
  instance?.start();
}
