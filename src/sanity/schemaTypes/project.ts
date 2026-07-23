import { defineType, defineField, defineArrayMember } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "category",
      title: "Category",
      description:
        'Type any category to group and filter this project by — e.g. "Web", "Security", "Cloud", "Tooling", "Research", "Open Source". Reuse the exact same wording across projects so they filter together.',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bounty",
      title: "Bounty number (wanted-poster style, optional)",
      type: "string",
      description: 'The big number on the card, e.g. "500,000,000". Leave blank to hide.',
    }),
    defineField({ name: "summary", title: "Short summary (shown on the card)", type: "string" }),
    defineField({ name: "description", title: "Full description", type: "text", rows: 4 }),
    defineField({
      name: "image",
      title: "Preview image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tags",
      title: "Tools & technologies",
      description: "Type each tool or technology and press Enter to add it.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "liveUrl", title: "Live demo URL", type: "url" }),
    defineField({ name: "codeUrl", title: "Source code URL", type: "url" }),
  ],
  orderings: [
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
