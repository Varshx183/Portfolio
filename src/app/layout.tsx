import type { Metadata, Viewport } from "next";
import { Fredoka, Plus_Jakarta_Sans, Pirata_One } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SoundProvider } from "@/components/sound/SoundProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { JollyRogerBackdrop } from "@/components/ui/JollyRogerBackdrop";
import { PageLoader } from "@/components/ui/PageLoader";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { getContent } from "@/lib/content";

/* ---- Fonts (self-hosted via next/font, zero layout shift) ---------------- */

const display = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const pirate = Pirata_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pirate",
  display: "swap",
});

/* ---- SEO metadata -------------------------------------------------------- */

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    keywords: [
      "portfolio",
      "software engineer",
      "full-stack developer",
      "web developer",
      "React",
      "Next.js",
      "TypeScript",
      site.name,
    ],
    authors: [{ name: site.name }],
    creator: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: site.url,
      title: `${site.name} — ${site.role}`,
      description: site.description,
      siteName: site.name,
      // og:image is provided by the file-based opengraph-image.tsx (a real PNG).
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: site.description,
      // twitter:image provided by twitter-image.tsx.
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: { icon: "/favicon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0e3" },
    { media: "(prefers-color-scheme: dark)", color: "#081426" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { site, copy } = await getContent();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${pirate.variable}`}
    >
      <body>
        <StructuredData />
        <CustomCursor />
        <PageLoader name={site.name} tagline={copy.loaderText} />
        {/* Skip link for keyboard & screen-reader users (a11y). */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-crimson focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll />
            <JollyRogerBackdrop />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
