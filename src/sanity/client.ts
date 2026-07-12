import { createClient } from "next-sanity";
import { apiVersion, dataset, safeProjectId } from "./env";

/**
 * Read-only Sanity client. `useCdn: false` so that Next.js's own fetch cache /
 * ISR revalidation controls freshness (with useCdn:true, next-sanity bypasses
 * Next's cache and content wouldn't refresh on the schedule). Only queried when
 * `isSanityConfigured` is true (see src/lib/content.ts).
 */
export const sanityClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
