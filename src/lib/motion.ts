/**
 * Shared motion language — one set of curves/durations so every animation on
 * the site feels like it belongs to the same product.
 */

/** Primary ease — a smooth ease-out-expo. Use for reveals and entrances. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Gentle ease-in-out for looping / ambient motion. */
export const easeSoft = [0.45, 0, 0.55, 1] as const;

export const durations = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** Standard spring for layout/interactive elements (nav pill, filter pill). */
export const spring = { type: "spring", stiffness: 380, damping: 32 } as const;
