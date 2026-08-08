import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", group: "content" }),
    defineField({ name: "photo", title: "Photo", type: "cloudinaryImage", group: "content" }),
    defineField({ name: "qualification", title: "Qualification", type: "string", group: "content", initialValue: "M.Sc Chemistry" }),
    defineField({ name: "experienceYears", title: "Years of experience", type: "number", group: "content", initialValue: 15 }),
    defineField({
      name: "teachingMedium",
      title: "Teaching medium",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      initialValue: ["Hindi", "English"],
    }),
    defineField({ name: "bio", title: "Biography", type: "blockContent", group: "content" }),
    defineField({
      name: "philosophyPoints",
      title: "Teaching philosophy points",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", rows: 2, title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", type: "string", title: "Year" },
            { name: "description", type: "string", title: "Description" },
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
