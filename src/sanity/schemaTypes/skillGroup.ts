import { defineType, defineField, defineArrayMember } from "sanity";
import { IconPicker } from "../components/IconPicker";

export const skillGroup = defineType({
  name: "skillGroup",
  title: "Skill category",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Category name (e.g. Frontend)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "blurb", title: "Short description", type: "string" }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "name", title: "Name", type: "string", validation: (r) => r.required() },
            {
              name: "icon",
              title: "Icon",
              description: "Search and click an icon below.",
              type: "string",
              components: { input: IconPicker },
              validation: (r) => r.required(),
            },
            {
              name: "level",
              title: "Proficiency (0–100)",
              type: "number",
              validation: (r) => r.min(0).max(100),
            },
          ],
          preview: { select: { title: "name", subtitle: "level" } },
        }),
      ],
    }),
  ],
  orderings: [
    { title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title" } },
});
