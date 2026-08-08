import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string", initialValue: "CHEM by Neeraj Sir" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", initialValue: "Learn Chemistry the Conceptual Way" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number (with country code)", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seo" }),
  ],
});
