import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: 'E.g. "Class 12 Student" or "Parent, Class 11"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "review",
      title: "Review",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({ name: "photo", title: "Photo", type: "cloudinaryImage" }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      description: "Only published testimonials appear on the site.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
