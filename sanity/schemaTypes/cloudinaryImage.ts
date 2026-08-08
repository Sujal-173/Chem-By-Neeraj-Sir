import { defineField, defineType } from "sanity";

/**
 * Every image in this project is stored in Cloudinary, not Sanity's own
 * asset pipeline — Sanity only holds the resulting URL. This keeps a
 * single media library (Cloudinary) for teacher photos, blog images,
 * thumbnails, and OG images, uploaded through the admin dashboard's
 * CloudinaryUploader widget.
 */
export default defineType({
  name: "cloudinaryImage",
  title: "Image (Cloudinary)",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Cloudinary URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["https"] }).custom((value) => {
          if (value && !value.includes("res.cloudinary.com")) {
            return "This should be a res.cloudinary.com URL — upload through the admin dashboard.";
          }
          return true;
        }),
    }),
    defineField({ name: "alt", title: "Alt text", type: "string", description: "Important for SEO and accessibility." }),
  ],
  preview: {
    select: { subtitle: "url" },
    prepare({ subtitle }) {
      return { title: "Image", subtitle, media: undefined };
    },
  },
});
