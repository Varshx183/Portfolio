/**
 * Site-wide hidden Jolly Roger — the EXACT uploaded artwork, embedded subtly.
 *
 * The artwork is used as a CSS mask over a theme-ink fill, so the black
 * linework recolors to the current theme (faint light emboss on dark, dark on
 * light) instead of showing a flat black box, and the white interiors stay
 * transparent. Rendered ONCE near the root as a `fixed`, centered layer so the
 * mark stays present in the viewport while scrolling; it sits behind all
 * content at a negative z-index and is kept extremely subtle (tiny alpha +
 * soft-light blend + faint blur) so it reads as texture, not a watermark.
 *
 * The mask lives at public/jolly-roger-mask.png (a committed alpha PNG).
 * Non-interactive and hidden from assistive tech.
 */
export function JollyRogerBackdrop() {
  // Two mask layers composited together: the artwork itself + a soft radial
  // fade. Intersecting them feathers the logo's outer edges (the sword tips)
  // so it dissolves into the background instead of ending on a hard crop —
  // reading as a natural part of the texture rather than a placed graphic.
  const artwork = "url(/jolly-roger-mask.png)";
  const fade = "radial-gradient(circle at 50% 47%, #000 22%, rgba(0,0,0,0) 72%)";

  const mask = {
    WebkitMaskImage: `${artwork}, ${fade}`,
    maskImage: `${artwork}, ${fade}`,
    WebkitMaskRepeat: "no-repeat, no-repeat",
    maskRepeat: "no-repeat, no-repeat",
    WebkitMaskPosition: "center, center",
    maskPosition: "center, center",
    WebkitMaskSize: "contain, 100% 100%",
    maskSize: "contain, 100% 100%",
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
    width: "min(60vmin, 500px)",
    height: "min(60vmin, 500px)",
    filter: "blur(0.9px)",
  } as const;

  return (
    <div
      className="fixed-viewport-layer pointer-events-none fixed inset-x-0 top-0 -z-10 flex items-center justify-center overflow-hidden"
      aria-hidden
      // Sized with a STABLE viewport height (see .fixed-viewport-layer) rather
      // than inset-0, so the mobile URL bar showing/hiding doesn't resize this
      // layer and make the background wobble while scrolling.
      // Also: no `transform`/`will-change` here — a transform on a fixed element
      // breaks fixed positioning on some mobile browsers.
    >
      {/* Ambient ocean glow (moved off the body to a cheap fixed layer).
          Strength is theme-aware via --glow-a: faint on parchment, fuller on
          the night sea. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -8%, rgb(var(--ocean) / var(--glow-a)), transparent 60%)",
        }}
      />
      {/* Jolly Roger — equally present in both themes.
          Light: sepia ink `multiply`-stamped into the parchment (like a mark
          pressed onto an old map). Dark: pale-gold light `screen`ed off the
          navy (like a glow). Color + strength come from --jr-ink / --jr-a. */}
      <div
        className="mix-blend-multiply dark:mix-blend-screen"
        style={{
          ...mask,
          backgroundColor: "rgb(var(--jr-ink) / var(--jr-a))",
        }}
      />
    </div>
  );
}
