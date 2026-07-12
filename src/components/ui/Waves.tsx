"use client";

/**
 * Layered, animated ocean waves used as section dividers.
 * Pure SVG + CSS animation (paused for reduced-motion via globals.css).
 * `flip` renders waves pointing up (for the top of a section).
 */
export function Waves({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${
        flip ? "top-0 rotate-180" : "bottom-0"
      } ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-[70px] w-full sm:h-[110px]"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--ocean))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(var(--ocean-deep))" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGrad)"
          d="M0,64 C240,110 480,10 720,48 C960,86 1200,20 1440,56 L1440,120 L0,120 Z"
        />
        <path
          fill="rgb(var(--aqua))"
          fillOpacity="0.12"
          d="M0,80 C240,40 480,110 720,74 C960,38 1200,96 1440,66 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
