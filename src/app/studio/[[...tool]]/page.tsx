import type { Metadata } from "next";
import Studio from "./Studio";

/**
 * Embedded Sanity Studio at /studio — the content dashboard. The actual editor
 * is loaded client-side (see Studio.tsx) so it never runs on the server.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <Studio />;
}
