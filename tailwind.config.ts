import type { Config } from "tailwindcss";

/**
 * Tailwind configuration for the "Grand Line" portfolio.
 *
 * Colors are driven by CSS variables (see globals.css) so that a single
 * `data-theme`/`class` swap re-skins the whole site for dark/light mode.
 * The pirate-map identity is preserved in both themes: navy sea + treasure
 * gold + warm red CTA, with parchment surfaces in light mode.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens -> CSS variables (RGB channels for /opacity support)
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-soft": "rgb(var(--bg-soft) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",

        // Brand accents (stable across themes)
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          soft: "rgb(var(--gold-soft) / <alpha-value>)",
        },
        crimson: "rgb(var(--crimson) / <alpha-value>)",
        ocean: "rgb(var(--ocean) / <alpha-value>)",
        "ocean-deep": "rgb(var(--ocean-deep) / <alpha-value>)",
        aqua: "rgb(var(--aqua) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        pirate: ["var(--font-pirate)", "var(--font-display)", "cursive"],
      },
      boxShadow: {
        poster: "0 10px 30px -10px rgb(0 0 0 / 0.35)",
        "poster-lg": "0 24px 60px -18px rgb(0 0 0 / 0.5)",
        gold: "0 0 0 1px rgb(var(--gold) / 0.4), 0 8px 30px -8px rgb(var(--gold) / 0.35)",
        inset: "inset 0 1px 0 0 rgb(255 255 255 / 0.06)",
      },
      backgroundImage: {
        "map-grid":
          "linear-gradient(rgb(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / 0.35) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgb(var(--ocean) / var(--glow-a)), transparent 60%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        wave: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        wave: "wave 12s linear infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2.5s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
