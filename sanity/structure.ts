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
        .id("homepage")
        .title("Homepage")
        .icon(HomeIcon)
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .id("about")
        .title("About Page")
        .icon(UserIcon)
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.listItem()
        .id("resource")
        .title("Notes & Resources")
        .icon(DocumentIcon)
        .child(S.documentTypeList("resource").title("Notes & Resources")),
      S.listItem()
        .id("blogPost")
        .title("Blog Posts")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("blogPost").title("Blog Posts")),
      S.listItem()
        .id("category")
        .title("Categories")
        .icon(TagIcon)
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .id("author")
        .title("Authors")
        .icon(UsersIcon)
        .child(S.documentTypeList("author").title("Authors")),
      S.listItem()
        .id("testimonial")
        .title("Testimonials")
        .icon(CommentIcon)
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .id("faq")
        .title("FAQs")
        .icon(HelpCircleIcon)
        .child(S.documentTypeList("faq").title("FAQs")),
      S.divider(),
      S.listItem()
        .id("navigation")
        .title("Navigation")
        .icon(MenuIcon)
        .child(S.document().schemaType("navigation").documentId("navigation")),
      S.listItem()
        .id("footer")
        .title("Footer")
        .icon(CogIcon)
        .child(S.document().schemaType("footer").documentId("footer")),
      S.listItem()
        .id("siteSettings")
        .title("Site Settings")
        .icon(WrenchIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
