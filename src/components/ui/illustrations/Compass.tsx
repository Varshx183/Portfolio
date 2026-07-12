/** Decorative compass / log-pose illustration. Inherits color via currentColor. */
export function Compass({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <circle cx="100" cy="100" r="92" strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="100" r="78" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="100" cy="100" r="60" strokeWidth="2" />
      {/* Cardinal ticks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const long = i % 6 === 0;
        return (
          <line
            key={i}
            x1="100"
            y1="14"
            x2="100"
            y2={long ? 26 : 20}
            strokeWidth={long ? 2 : 1}
            transform={`rotate(${angle} 100 100)`}
            opacity={long ? 1 : 0.5}
          />
        );
      })}
      {/* Compass needle */}
      <g>
        <path d="M100 46 L112 100 L100 154 L88 100 Z" fill="currentColor" opacity="0.15" />
        <path d="M100 46 L112 100 L100 100 Z" fill="currentColor" />
        <path
          d="M100 154 L88 100 L100 100 Z"
          fill="currentColor"
          opacity="0.45"
        />
      </g>
      <circle cx="100" cy="100" r="6" fill="currentColor" />
    </svg>
  );
}
