import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2 }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: ["WhatsApp", "Instagram", "YouTube", "Email"],
              },
            },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
  ],
});
