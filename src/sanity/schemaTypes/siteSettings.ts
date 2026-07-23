import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * The single "Site Settings" document. Everything that isn't a repeatable list
 * (projects, skills, experience…) lives here.
 *
 * Fields are organised into TABS (groups) that follow the website top-to-bottom
 * — Home, About, Contact, Section Titles, Menu — so it's obvious what each field
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
    { name: "menu", title: "🧭 Menu Labels" },
    { name: "footer", title: "⚓ Footer" },
    { name: "labels", title: "🔖 Buttons & Small Labels" },
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
      name: "hero",
      title: "Home page buttons",
      description: "The two buttons under your intro.",
      type: "object",
      group: "home",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "ctaPrimary",
          title: "First button text",
          description: 'e.g. "View my projects" (scrolls to Projects).',
          type: "string",
        },
        {
          name: "ctaSecondary",
          title: "Second button text",
          description: 'e.g. "Contact me" (scrolls to Contact).',
          type: "string",
        },
      ],
    }),
    defineField({
      name: "askCopy",
      title: "“Ask me anything” bar",
      description:
        "The search-style bar under your buttons. Each label below is a shortcut chip that jumps to that section.",
      type: "object",
      group: "home",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "placeholder", title: "Placeholder text", type: "string" },
        {
          name: "notFound",
          title: "Message when nothing matches",
          type: "string",
        },
        { name: "projects", title: "Chip: goes to Projects", type: "string" },
        { name: "skills", title: "Chip: goes to Skills", type: "string" },
        { name: "experience", title: "Chip: goes to Experience", type: "string" },
        {
          name: "certifications",
          title: "Chip: goes to Certifications",
          type: "string",
        },
        { name: "resume", title: "Chip: opens your résumé", type: "string" },
        { name: "contact", title: "Chip: goes to Contact", type: "string" },
      ],
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
              options: { list: ["github", "linkedin", "twitter", "email"] },
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
    defineField({
      name: "contactCopy",
      title: "Contact section text",
      description: "The wording of the contact card, résumé card, and form.",
      type: "object",
      group: "contact",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "cardHeading", title: "Info card heading", type: "string" },
        { name: "cardText", title: "Info card text", type: "text", rows: 3 },
        { name: "resumeTitle", title: "Résumé card title", type: "string" },
        { name: "resumeText", title: "Résumé card subtitle", type: "string" },
        { name: "resumeButton", title: "Résumé button text", type: "string" },
        { name: "nameLabel", title: "Form: Name label", type: "string" },
        { name: "emailLabel", title: "Form: Email label", type: "string" },
        { name: "messageLabel", title: "Form: Message label", type: "string" },
        { name: "namePlaceholder", title: "Form: Name placeholder", type: "string" },
        { name: "emailPlaceholder", title: "Form: Email placeholder", type: "string" },
        { name: "messagePlaceholder", title: "Form: Message placeholder", type: "string" },
        { name: "submitLabel", title: "Form: Send button", type: "string" },
        { name: "sendingLabel", title: "Form: Sending… text", type: "string" },
        { name: "successMessage", title: "Form: Success message", type: "string" },
        { name: "errorMessage", title: "Form: Error message", type: "string" },
      ],
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

    /* ---------------------------- Menu Labels ---------------------------- */
    defineField({
      name: "nav",
      title: "Navigation menu labels",
      description:
        "Rename the links in the top menu. The links themselves stay the same.",
      type: "object",
      group: "menu",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "home", title: "Home link", type: "string" },
        { name: "about", title: "About link", type: "string" },
        { name: "skills", title: "Skills link", type: "string" },
        { name: "experience", title: "Experience link", type: "string" },
        { name: "projects", title: "Projects link", type: "string" },
        { name: "certifications", title: "Certifications link", type: "string" },
        { name: "contact", title: "Contact link", type: "string" },
      ],
    }),

    /* ------------------------------ Footer ------------------------------- */
    defineField({
      name: "footerCopy",
      title: "Footer text",
      type: "object",
      group: "footer",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "navHeading", title: 'Links column heading (e.g. "Navigate")', type: "string" },
        { name: "contactHeading", title: 'Contact column heading (e.g. "Set Sail")', type: "string" },
        { name: "resumeLabel", title: "Résumé download link text", type: "string" },
        {
          name: "copyright",
          title: "Copyright tagline",
          description: "Shown after “© year Your Name.” at the bottom.",
          type: "string",
        },
        { name: "credit", title: "Credit line (bottom right)", type: "string" },
      ],
    }),

    /* ------------------------ Buttons & Small Labels --------------------- */
    defineField({
      name: "educationHeading",
      title: 'Education heading (in Experience, e.g. "Navigation School")',
      type: "string",
      group: "labels",
    }),
    defineField({
      name: "certView",
      title: 'Certification link text (e.g. "View credential")',
      type: "string",
      group: "labels",
    }),
    defineField({
      name: "navResume",
      title: "Header résumé button (desktop)",
      type: "string",
      group: "labels",
    }),
    defineField({
      name: "navResumeMobile",
      title: "Header résumé button (mobile menu)",
      type: "string",
      group: "labels",
    }),
    defineField({
      name: "loaderText",
      title: 'Loading screen text (e.g. "Charting the course…")',
      type: "string",
      group: "labels",
    }),
    defineField({
      name: "projectLabels",
      title: "Projects section labels",
      type: "object",
      group: "labels",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "all", title: '"All" filter label', type: "string" },
        { name: "empty", title: "No-results message", type: "string" },
        { name: "wanted", title: 'Card banner (e.g. "Wanted")', type: "string" },
        { name: "featured", title: 'Featured badge (e.g. "Featured")', type: "string" },
        { name: "bounty", title: 'Bounty label (e.g. "Bounty")', type: "string" },
        { name: "crewTools", title: 'Tech list heading (e.g. "Tools & Technologies")', type: "string" },
        { name: "live", title: 'Live-demo button (e.g. "Live demo")', type: "string" },
        { name: "code", title: 'Source-code button (e.g. "Source code")', type: "string" },
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
