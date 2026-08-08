import type { StructureResolver } from "sanity/structure";
import {
  HomeIcon,
  UserIcon,
  MenuIcon,
  CogIcon,
  WrenchIcon,
  DocumentIcon,
  DocumentTextIcon,
  CommentIcon,
  HelpCircleIcon,
  TagIcon,
  UsersIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("About Page")
        .icon(UserIcon)
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.listItem()
        .title("Notes & Resources")
        .icon(DocumentIcon)
        .child(S.documentTypeList("resource").title("Notes & Resources")),
      S.listItem()
        .title("Blog Posts")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("blogPost").title("Blog Posts")),
      S.listItem()
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Authors")
        .icon(UsersIcon)
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .title("Testimonials")
        .icon(CommentIcon)
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .title("FAQs")
        .icon(HelpCircleIcon)
        .child(S.documentTypeList("faq").title("FAQs")),
      S.divider(),
      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.listItem()
        .title("Footer")
        .icon(CogIcon)
        .child(S.document().schemaType("footer").documentId("footer")),
      S.listItem()
        .title("Site Settings")
        .icon(WrenchIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
