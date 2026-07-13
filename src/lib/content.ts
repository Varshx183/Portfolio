import "server-only";
import { cache } from "react";
import { groq } from "next-sanity";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import * as fallback from "@/content/site";
import type {
  SiteContent,
  Project,
  ProjectCategory,
} from "@/content/types";

/**
 * The single entry point for site content.
 *
 * - If Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID set), reads from the
 *   CMS. Any section with no CMS documents yet falls back to the local content,
 *   and any error falls back entirely — so the site always renders.
 * - Wrapped in React `cache()` so multiple calls in one request share one fetch.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured) return fromFallback();

  // Always fetch the latest published content (no caching), so an edit in the
  // CMS shows on the next page load. `getContent` is wrapped in React `cache()`
  // below, so this still runs only once per request.
  const opts = { cache: "no-store" } as const;

  try {
    const [settings, projects, skillGroups, experience, education, certifications] =
      await Promise.all([
        sanityClient.fetch(settingsQuery, {}, opts),
        sanityClient.fetch(projectsQuery, {}, opts),
        sanityClient.fetch(skillGroupsQuery, {}, opts),
        sanityClient.fetch(experienceQuery, {}, opts),
        sanityClient.fetch(educationQuery, {}, opts),
        sanityClient.fetch(certificationsQuery, {}, opts),
      ]);

    return {
      site: settings ? mapSettings(settings) : fallback.site,
      socials:
        settings?.socials?.length > 0 ? settings.socials : fallback.socials,
      skillGroups: skillGroups?.length ? skillGroups : fallback.skillGroups,
      experience: experience?.length ? experience : fallback.experience,
      education: education?.length ? education : fallback.education,
      projects: projects?.length ? projects.map(mapProject) : fallback.projects,
      certifications: certifications?.length
        ? certifications
        : fallback.certifications,
      sections: mapSections(settings),
      hero: mapHero(settings),
      nav: mapNav(settings),
    };
  } catch (err) {
    console.error("[content] Sanity fetch failed, using fallback:", err);
    return fromFallback();
  }
});

/* --------------------------------- fallback -------------------------------- */

function fromFallback(): SiteContent {
  return {
    site: fallback.site,
    socials: fallback.socials,
    skillGroups: fallback.skillGroups,
    experience: fallback.experience,
    education: fallback.education,
    projects: fallback.projects,
    certifications: fallback.certifications,
    sections: fallback.sectionHeadings,
    hero: fallback.heroCopy,
    nav: fallback.navLabels,
  };
}

/** Merge CMS section headings over the defaults, field by field. */
function mapSections(s: any): SiteContent["sections"] {
  const d = fallback.sectionHeadings;
  const cms = s?.sections ?? {};
  const keys = Object.keys(d) as (keyof typeof d)[];
  return Object.fromEntries(
    keys.map((k) => [
      k,
      {
        eyebrow: cms[k]?.eyebrow || d[k].eyebrow,
        title: cms[k]?.title || d[k].title,
        subtitle: cms[k]?.subtitle || d[k].subtitle,
      },
    ])
  ) as SiteContent["sections"];
}

/** Merge CMS hero CTA labels over the defaults. */
function mapHero(s: any): SiteContent["hero"] {
  const d = fallback.heroCopy;
  const cms = s?.hero ?? {};
  return {
    ctaPrimary: cms.ctaPrimary || d.ctaPrimary,
    ctaSecondary: cms.ctaSecondary || d.ctaSecondary,
  };
}

/** Merge CMS nav labels over the defaults, key by key. */
function mapNav(s: any): SiteContent["nav"] {
  const d = fallback.navLabels;
  const cms = s?.nav ?? {};
  const keys = Object.keys(d) as (keyof typeof d)[];
  return Object.fromEntries(
    keys.map((k) => [k, cms[k] || d[k]])
  ) as SiteContent["nav"];
}

/* --------------------------------- mappers --------------------------------- */

function mapSettings(s: any): SiteContent["site"] {
  return {
    name: s.name ?? fallback.site.name,
    role: s.role ?? fallback.site.role,
    tagline: s.tagline ?? fallback.site.tagline,
    description: s.description ?? fallback.site.description,
    about: s.about?.length ? s.about : fallback.site.about,
    location: s.location ?? fallback.site.location,
    email: s.email ?? fallback.site.email,
    resumeUrl: s.resumeUrl || fallback.site.resumeUrl,
    photo: s.photo ? urlForImage(s.photo).width(800).url() : "",
    // URL is deployment config, not content — always from env/fallback.
    url: fallback.site.url,
    stats: s.stats?.length ? s.stats : fallback.site.stats,
  };
}

function mapProject(p: any): Project {
  return {
    title: p.title,
    bounty: p.bounty ?? "",
    summary: p.summary ?? "",
    description: p.description ?? "",
    image: p.image
      ? urlForImage(p.image).width(1200).height(750).fit("crop").url()
      : "/projects/project-1.svg",
    tags: p.tags ?? [],
    category: (p.category ?? "Web") as ProjectCategory,
    featured: Boolean(p.featured),
    links: { live: p.liveUrl || undefined, code: p.codeUrl || undefined },
  };
}

/* --------------------------------- queries --------------------------------- */

const settingsQuery = groq`*[_type == "siteSettings"][0]{
  name, role, tagline, description, about, location, email,
  "resumeUrl": resume.asset->url,
  photo,
  stats,
  socials,
  sections,
  hero,
  nav
}`;

const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt asc){
  title, bounty, summary, description, image, tags, category, featured, liveUrl, codeUrl
}`;

const skillGroupsQuery = groq`*[_type == "skillGroup"] | order(order asc){
  title, blurb, skills[]{ name, icon, level }
}`;

const experienceQuery = groq`*[_type == "experience"] | order(order asc){
  role, company, period, location, bullets, tags
}`;

const educationQuery = groq`*[_type == "education"] | order(order asc){
  degree, school, period, detail
}`;

const certificationsQuery = groq`*[_type == "certification"] | order(order asc){
  title, issuer, year, credentialUrl
}`;
