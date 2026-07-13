"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/content/site";
import type { SiteInfo, NavLabels } from "@/content/types";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SoundToggle } from "@/components/sound/SoundToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { lockScroll, unlockScroll } from "@/lib/smoothScroll";

/**
 * Fixed top navigation styled like a ship's log banner.
 * - Highlights the active section via scroll-spy.
 * - Collapses into an animated drawer on mobile.
 * - Adds a solid/blurred background once the user scrolls.
 */
export function Navbar({
  site,
  nav,
  resumeLabel = "Résumé",
  resumeMobileLabel = "Download Résumé",
}: {
  site: SiteInfo;
  nav: NavLabels;
  resumeLabel?: string;
  resumeMobileLabel?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll (and pause Lenis) while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lockScroll();
    else unlockScroll();
    return () => {
      document.body.style.overflow = "";
      unlockScroll();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="container-x flex h-[4.5rem] items-center justify-between"
        aria-label="Primary"
      >
        {/* Brand / emblem */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold text-ink"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-gold bg-surface-2 text-gold shadow-gold transition-transform group-hover:rotate-12">
            {/* Simple skull-and-straw-hat mark */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                fill="currentColor"
                d="M12 2c-1.7 0-3 1-3.6 2.2C4.9 5 3 6.7 3 8.6c0 .8.6 1.4 1.4 1.4h15.2c.8 0 1.4-.6 1.4-1.4C21 6.7 19.1 5 15.6 4.2 15 3 13.7 2 12 2Z"
              />
              <circle cx="12" cy="14" r="6" fill="currentColor" />
              <circle cx="9.7" cy="13" r="1.4" className="fill-surface-2" />
              <circle cx="14.3" cy="13" r="1.4" className="fill-surface-2" />
              <path
                d="M9 17.5c1 .8 5 .8 6 0"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                className="stroke-surface-2"
              />
            </svg>
          </span>
          <span className="hidden sm:inline">{site.name.split(" ")[0]}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-gold"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {nav[link.key]}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <a href={site.resumeUrl} download className="hidden btn-ghost !px-4 !py-2 !text-sm md:inline-flex">
            {resumeLabel}
          </a>
          <SoundToggle />
          <ThemeToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2/70 text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="container-x border-t border-border bg-bg/95 pb-6 pt-2 backdrop-blur-md"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const id = link.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? "bg-surface-2 text-gold"
                            : "text-ink-soft hover:bg-surface-2/60"
                        }`}
                      >
                        {nav[link.key]}
                      </a>
                    </li>
                  );
                })}
                <li className="mt-2">
                  <a
                    href={site.resumeUrl}
                    download
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    {resumeMobileLabel}
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
