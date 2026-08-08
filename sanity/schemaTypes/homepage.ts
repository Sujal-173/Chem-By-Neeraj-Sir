import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "announcement", title: "Announcement Bar" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroBadge", title: "Hero badge text", type: "string", group: "hero", initialValue: "15+ Years Experience" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string", group: "hero", initialValue: "Master Chemistry with Confidence" }),
    defineField({ name: "heroSubheading", title: "Hero subheading", type: "string", group: "hero", initialValue: "Learn Chemistry the Conceptual Way" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", type: "string", group: "hero", initialValue: "Download Free Notes" }),
    defineField({ name: "heroPrimaryCtaLink", title: "Primary CTA link", type: "string", group: "hero", initialValue: "/resources" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", type: "string", group: "hero", initialValue: "Explore Premium Notes" }),
    defineField({ name: "heroSecondaryCtaLink", title: "Secondary CTA link", type: "string", group: "hero", initialValue: "/notes" }),
    defineField({
      name: "announcementEnabled",
      title: "Show announcement bar",
      type: "boolean",
      group: "announcement",
      initialValue: true,
    }),
    defineField({
      name: "announcementText",
      title: "Announcement text",
      type: "string",
      group: "announcement",
      initialValue: "Online classes launching soon — join the waiting list for early access",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
});
