import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "resource",
  title: "Notes & Resources",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accessType",
      title: "Access type",
      type: "string",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Premium", value: "premium" },
        ],
        layout: "radio",
      },
      initialValue: "free",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resourceType",
      title: "Resource type",
      type: "string",
      options: {
        list: [
          { title: "Chapter-wise Notes", value: "chapterWise" },
          { title: "Full Notes", value: "fullNotes" },
          { title: "Printed Notes", value: "printed" },
          { title: "PDF Notes", value: "pdf" },
          { title: "Sample PDF", value: "samplePdf" },
          { title: "Important Questions", value: "importantQuestions" },
          { title: "NCERT Solutions", value: "ncertSolutions" },
          { title: "Previous Year Questions", value: "pyq" },
          { title: "Revision Notes", value: "revisionNotes" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      options: { list: [{ title: "Chemistry", value: "chemistry" }, { title: "Biology", value: "biology" }] },
      initialValue: "chemistry",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "classLevel",
      title: "Class",
      type: "string",
      options: { list: [{ title: "Class 9", value: "9" },{ title: "Class 10", value: "10" },{ title: "Class 11", value: "11" }, { title: "Class 12", value: "12" }] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "chapter", title: "Chapter (optional)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "thumbnail", title: "Thumbnail", type: "cloudinaryImage" }),
    defineField({
      name: "fileUrl",
      title: "File URL",
      type: "url",
      description: "Cloudinary URL of the uploaded PDF.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).custom((value, context) => {
          const accessType = (context.document as { accessType?: string })?.accessType;
          if (accessType === "free" && !value) {
            return "Free resources must have a downloadable file URL.";
          }
          return true;
        }),
    }),
    defineField({
      name: "priceDisplay",
      title: "Price display",
      type: "string",
      description: 'E.g. "₹199" or leave blank to show "Contact on WhatsApp".',
    }),
    defineField({
      name: "priceInPaise",
      title: "Price (in paise, for future online checkout)",
      type: "number",
      description:
        "Not used by the current WhatsApp purchase flow. Reserved for when online payments launch — ₹199 = 19900.",
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "resourceType", media: "thumbnail" },
  },
});
