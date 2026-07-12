/** Sanity connection settings, read from public env vars. */

export const apiVersion = "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a real Sanity project id is configured. When false the site
 *  renders from the local fallback content and the CMS layer is skipped. */
export const isSanityConfigured = Boolean(projectId);

/** A syntactically-valid placeholder so the Studio config / client can be
 *  constructed at build time even before the real project id is set. No network
 *  calls are made unless `isSanityConfigured` is true. */
export const safeProjectId = projectId || "placeholder-project";
