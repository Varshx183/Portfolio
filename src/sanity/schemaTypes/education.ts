import { defineType, defineField } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "degree", title: "Degree / program", type: "string", validation: (r) => r.required() }),
    defineField({ name: "school", title: "School", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", title: "Period", type: "string" }),
    defineField({
      name: "detail",
      title: "Details (one point per line)",
      description: "Each line becomes a bullet point.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "order", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "degree", subtitle: "school" } },
});
