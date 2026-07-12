"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Wraps the app with next-themes. Uses the `class` strategy (adds `.dark`
 * to <html>) which our Tailwind config + CSS variables key off of.
 * `defaultTheme="dark"` because the pirate/night-sea look is the hero look.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
