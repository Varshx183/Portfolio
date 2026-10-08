import { defineType, defineField, defineArrayMember } from "sanity";
import { ExperienceInput } from "../components/ExperienceInput";

export const experience = defineType({
  name: "experience",
  title: "Work Experience",
  type: "document",
  components: { input: ExperienceInput },
  fields: [
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", title: "Period", type: "string", description: 'e.g. "2023 — Present"' }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first (most recent = lowest).",
      initialValue: 0,
    }),
    defineField({
      name: "bullets",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),
    defineField({
      name: "tags",
      title: "Tech / tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "role", subtitle: "company" } },
});
