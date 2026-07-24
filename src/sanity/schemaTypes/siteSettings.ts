import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * The single "Site Settings" document. Everything that isn't a repeatable list
 * (projects, skills, experience…) lives here.
 *
 * Fields are organised into TABS (groups) that follow the website top-to-bottom
 * — Home, About, Contact, Section Titles — so it's obvious what each field
 * controls. Field `name`s are kept stable; only the human labels changed.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "home", title: "🏠 Home Page", default: true },
    { name: "about", title: "🧑 About Section" },
    { name: "contact", title: "✉️ Contact & Résumé" },
    { name: "headings", title: "🏷️ Section Titles" },
  ],
  fields: [
    /* ----------------------------- Home Page ----------------------------- */
    defineField({
      name: "name",
      title: "Your name (big heading)",
      description: "The large gold name at the top of the page.",
      type: "string",
      group: "home",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Title under your name",
      description: 'Shown right below your name, e.g. "Cybersecurity Analyst".',
      type: "string",
      group: "home",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "One-line intro",
      description: "A short sentence shown under your title.",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "location",
      title: "Location pill",
      description: "The small location chip at the very top (e.g. your city).",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "stats",
      title: "Highlight numbers",
      description:
        "The small stat boxes under your intro (e.g. Projects · 10+).",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "value", title: "Number", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),

    /* ----------------------------- About --------------------------------- */
    defineField({
      name: "about",
      title: "About paragraphs",
      description: "One block per paragraph in the About section.",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "photo",
      title: "Profile photo",
      description: "Shown in the About “wanted poster”. Optional.",
      type: "image",
      group: "about",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutHighlights",
      title: "Highlight cards",
      description: "The three small cards next to your About text.",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Card title", type: "string" },
            { name: "text", title: "Card text", type: "text", rows: 2 },
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "posterStatus",
      title: "Poster label",
      description: 'The gold line under your name on the photo poster (e.g. "Wanted Alive").',
      type: "string",
      group: "about",
    }),
    defineField({
      name: "posterPlaceholder",
      title: "Poster label when no photo is set",
      description: 'Shown on the empty poster before you add a photo (e.g. "Wanted").',
      type: "string",
      group: "about",
    }),

    /* -------------------------- Contact & Résumé ------------------------- */
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "resume",
      title: "Résumé (PDF)",
      description: "Powers the “Download Résumé” button.",
      type: "file",
      group: "contact",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "socials",
      title: "Social links",
      description: "Icons shown in the header, hero, and footer.",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "key",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "GitHub", value: "github" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Email", value: "email" },
                  { title: "Reddit", value: "reddit" },
                  { title: "Medium", value: "medium" },
                  { title: "Discord", value: "discord" },
                ],
              },
              validation: (r) => r.required(),
            },
            { name: "label", title: "Label (for screen readers)", type: "string" },
            {
              name: "href",
              title: "Link (URL or mailto:)",
              type: "string",
              validation: (r) => r.required(),
            },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Search-engine description",
      description:
        "One or two sentences used for Google results and link previews.",
      type: "text",
      group: "contact",
      rows: 2,
    }),

    /* --------------------------- Section Titles -------------------------- */
    defineField({
      name: "sections",
      title: "Section titles & subtitles",
      description:
        "The small label, title, and subtitle at the top of each section. Leave any field blank to keep the default.",
      type: "object",
      group: "headings",
      options: { collapsible: true, collapsed: false },
      fields: [
        sectionHeadingField("about", "About section"),
        sectionHeadingField("skills", "Skills section"),
        sectionHeadingField("experience", "Experience section"),
        sectionHeadingField("projects", "Projects section"),
        sectionHeadingField("certifications", "Certifications section"),
        sectionHeadingField("contact", "Contact section"),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});

/** A {eyebrow, title, subtitle} object field for one section's heading. */
function sectionHeadingField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: true },
    fields: [
      { name: "eyebrow", title: "Small label above the title", type: "string" },
      { name: "title", title: "Title", type: "string" },
      { name: "subtitle", title: "Subtitle", type: "text", rows: 2 },
    ],
  });
}
