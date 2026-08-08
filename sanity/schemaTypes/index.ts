import { type SchemaTypeDefinition } from "sanity";

import seo from "./seo";
import blockContent from "./blockContent";
import cloudinaryImage from "./cloudinaryImage";
import author from "./author";
import category from "./category";
import blogPost from "./blogPost";
import resource from "./resource";
import testimonial from "./testimonial";
import faq from "./faq";
import about from "./about";
import homepage from "./homepage";
import navigation from "./navigation";
import footer from "./footer";
import siteSettings from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    blockContent,
    cloudinaryImage,
    // Collections
    author,
    category,
    blogPost,
    resource,
    testimonial,
    faq,
    // Singletons
    about,
    homepage,
    navigation,
    footer,
    siteSettings,
  ],
};

export const singletonTypes = new Set(["homepage", "about", "navigation", "footer", "siteSettings"]);
