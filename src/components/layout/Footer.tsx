import { navLinks } from "@/content/site";
import type { SiteInfo, Social, NavLabels } from "@/content/types";
import { SocialIcon } from "@/components/ui/SocialIcon";

/** Site footer: brand blurb, quick nav, social links, and a rope divider. */
export function Footer({
  site,
  socials,
  nav,
}: {
  site: SiteInfo;
  socials: Social[];
  nav: NavLabels;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border bg-bg-soft">
      {/* Rope divider */}
      <div className="rope h-1 w-full opacity-70" aria-hidden />

      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <p className="font-display text-xl font-semibold text-ink">
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            {site.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-ink-soft transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <SocialIcon name={s.key} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <nav aria-label="Footer">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Navigate
          </p>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-ink-soft transition-colors hover:text-gold"
                >
                  {nav[l.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Set Sail
          </p>
          <ul className="space-y-2.5 text-sm text-ink-soft">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-gold"
              >
                {site.email}
              </a>
            </li>
            <li>{site.location}</li>
            <li>
              <a
                href={site.resumeUrl}
                download
                className="transition-colors hover:text-gold"
              >
                Download Résumé ↓
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {year} {site.name}. Sailing the Grand Line of the web.
          </p>
          <p>Built with Next.js, Tailwind &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
