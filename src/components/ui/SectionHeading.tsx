import { Reveal } from "./Reveal";

/**
 * Consistent section header: a small "chapter" eyebrow, a big display title,
 * and an optional subtitle. Used at the top of every section.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal
      className={`mx-auto mb-12 flex max-w-2xl flex-col gap-4 ${alignment} ${
        align === "center" ? "" : "mx-0"
      }`}
    >
      <span className="pill uppercase tracking-[0.2em] text-gold">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        <span className="text-gradient-gold">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
