import { defineField, defineType } from "sanity";
import { MenuIcon } from "@sanity/icons";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "links",
      title: "Nav links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() },
            { name: "href", type: "string", title: "Link", validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
  ],
});
