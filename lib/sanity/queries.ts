import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";

/**
 * One tag per document type. Every query below is tagged with the type(s)
 * of document it depends on; app/api/revalidate/route.ts calls
 * revalidateTag() with these same names — from a Sanity webhook (covers
 * edits made directly in Studio) and directly from the admin dashboard's
 * write routes (covers edits made through /admin, for zero-delay feedback).
 */
export const SANITY_TAGS = {
  resource: "sanity:resource",
  blogPost: "sanity:blogPost",
  testimonial: "sanity:testimonial",
  faq: "sanity:faq",
  about: "sanity:about",
  homepage: "sanity:homepage",
  siteSettings: "sanity:siteSettings",
} as const;

// ---- Types -----------------------------------------------------------

export type SanityImage = {
  url?: string;
  alt?: string;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
};

export type Resource = {
  _id: string;
  title: string;
  slug: { current: string };
  accessType: "free" | "premium";
  resourceType: string;
  subject: "chemistry" | "biology";
  classLevel: "11" | "12";
  chapter?: string;
  description?: string;
  thumbnail?: SanityImage;
  fileUrl?: string;
  priceDisplay?: string;
  featured?: boolean;
  publishedAt: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage: SanityImage;
  category: { title: string; slug: { current: string } };
  tags?: string[];
  author: { name: string; image?: SanityImage; bio?: string };
  body: unknown;
  readingTime?: number;
  publishedAt: string;
  seo?: Seo;
};

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  photo?: SanityImage;
};

export type Faq = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export type SiteSettings = {
  siteTitle?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  whatsappNumber?: string;
  address?: string;
};

export type AboutPage = {
  heading?: string;
  photo?: SanityImage;
  qualification?: string;
  experienceYears?: number;
  teachingMedium?: string[];
  bio?: unknown;
  philosophyPoints?: { title: string; description: string }[];
  milestones?: { year: string; description: string }[];
  seo?: Seo;
};

// ---- Fallback content --------------------------------------------------
// Shown until the Sanity project is connected, so every page renders real,
// finished copy from day one instead of an empty or "TODO" state.

const FALLBACK_ABOUT: AboutPage = {
  heading: "An experienced teacher, not just a notes seller",
  qualification: "M.Sc Chemistry",
  experienceYears: 15,
  teachingMedium: ["Hindi", "English"],
  philosophyPoints: [
    {
      title: "Understand, then memorize",
      description: "Every reaction starts with why it happens, not just what to write in the exam.",
    },
    {
      title: "Build layer by layer",
      description: "Topics connect to what came before, so chemistry stops feeling like disconnected chapters.",
    },
    {
      title: "Practice with purpose",
      description: "Previous year and NCERT-aligned questions reinforce concepts, not just recall.",
    },
  ],
  milestones: [
    { year: "2009", description: "Began teaching Chemistry full-time" },
    { year: "2015", description: "Crossed 500 students guided through boards" },
    { year: "2024", description: "Launched CHEM by Neeraj Sir online" },
  ],
};

const FALLBACK_FAQS: Faq[] = [
  {
    _id: "fallback-1",
    question: "How do I purchase premium notes?",
    answer:
      "Browse the Notes page, select what you need, and message on WhatsApp. After confirming your order and completing UPI payment, notes are delivered digitally or by post depending on the type.",
    category: "notes",
    order: 1,
  },
  {
    _id: "fallback-2",
    question: "Are the notes aligned with the CBSE syllabus?",
    answer:
      "Yes. All notes are built directly around the current CBSE Chemistry syllabus and exam pattern, with additional depth for JEE and NEET aspirants where relevant.",
    category: "notes",
    order: 2,
  },
  {
    _id: "fallback-3",
    question: "Can I try before buying premium notes?",
    answer:
      "Yes. The Free Resources section includes sample PDFs, important questions, and NCERT solutions so you can see the teaching style firsthand.",
    category: "general",
    order: 3,
  },
  {
    _id: "fallback-4",
    question: "When will online classes be available?",
    answer:
      "Online classes are in development. Join the waiting list on the homepage to get early access and founder pricing when they launch.",
    category: "onlineClasses",
    order: 4,
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: "fallback-1",
    name: "Ananya Verma",
    role: "Class 12 Student",
    review:
      "Organic chemistry finally made sense once Neeraj Sir explained the mechanisms instead of asking us to memorize them.",
    rating: 5,
  },
  {
    _id: "fallback-2",
    name: "Rohit Malhotra",
    role: "Parent, Class 11",
    review:
      "My son's confidence in chemistry improved noticeably within a month. The notes are clear and well organized.",
    rating: 5,
  },
  {
    _id: "fallback-3",
    name: "Priya Nair",
    role: "Class 12 Student, NEET Aspirant",
    review: "The concept-based approach helped me connect topics I used to treat as separate chapters.",
    rating: 5,
  },
];

const FALLBACK_RESOURCES: Resource[] = [
  {
    _id: "fallback-1",
    title: "Chemical Bonding — Chapter Notes",
    slug: { current: "chemical-bonding-chapter-notes" },
    accessType: "premium",
    resourceType: "chapterWise",
    subject: "chemistry",
    classLevel: "11",
    description: "Complete conceptual breakdown of chemical bonding with solved examples.",
    priceDisplay: undefined,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-2",
    title: "Organic Chemistry — Full Notes",
    slug: { current: "organic-chemistry-full-notes" },
    accessType: "premium",
    resourceType: "fullNotes",
    subject: "chemistry",
    classLevel: "12",
    description: "Every named reaction and mechanism for Class 12 boards, JEE, and NEET.",
    publishedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-3",
    title: "Periodic Table — Important Questions",
    slug: { current: "periodic-table-important-questions" },
    accessType: "free",
    resourceType: "importantQuestions",
    subject: "chemistry",
    classLevel: "11",
    description: "The questions that show up most often in board exams.",
    fileUrl: "#",
    publishedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-4",
    title: "Class 12 NCERT Solutions — Electrochemistry",
    slug: { current: "ncert-solutions-electrochemistry" },
    accessType: "free",
    resourceType: "ncertSolutions",
    subject: "chemistry",
    classLevel: "12",
    description: "Step-by-step, textbook-aligned answers for every in-text and exercise question.",
    fileUrl: "#",
    publishedAt: new Date().toISOString(),
  },
];

const FALLBACK_POSTS: BlogPost[] = [
  {
    _id: "fallback-1",
    title: "5 Reaction Mechanisms Every Class 12 Student Must Master",
    slug: { current: "organic-chemistry-reaction-mechanisms" },
    excerpt: "The mechanisms that appear most often in board exams, explained conceptually rather than by rote.",
    coverImage: {},
    category: { title: "Organic Chemistry", slug: { current: "organic-chemistry" } },
    author: { name: "Neeraj Sharma" },
    body: null,
    readingTime: 6,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-2",
    title: "NCERT First: Why It Still Wins for Board Exams",
    slug: { current: "ncert-vs-board-preparation" },
    excerpt: "Why building from the NCERT textbook beats jumping straight into reference books.",
    coverImage: {},
    category: { title: "Board Preparation", slug: { current: "board-preparation" } },
    author: { name: "Neeraj Sharma" },
    body: null,
    readingTime: 5,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: "fallback-3",
    title: "Periodic Table Trends, Simplified with One Framework",
    slug: { current: "periodic-table-trends-simplified" },
    excerpt: "One mental model that makes atomic radius, ionization energy, and electronegativity click.",
    coverImage: {},
    category: { title: "Inorganic Chemistry", slug: { current: "inorganic-chemistry" } },
    author: { name: "Neeraj Sharma" },
    body: null,
    readingTime: 7,
    publishedAt: new Date().toISOString(),
  },
];

// ---- Query helpers -------------------------------------------------------
// Every helper checks isSanityConfigured first. Once the project connects,
// these automatically start serving live CMS content — no code changes
// needed elsewhere in the app.

export async function getResources(): Promise<Resource[]> {
  if (!isSanityConfigured) return FALLBACK_RESOURCES;
  return getSanityClient().fetch(
    `*[_type == "resource"] | order(publishedAt desc){
      _id, title, slug, accessType, resourceType, subject, classLevel,
      chapter, description, thumbnail, fileUrl, priceDisplay, featured, publishedAt
    }`,
    {},
    { next: { tags: [SANITY_TAGS.resource], revalidate: false } }
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return FALLBACK_POSTS;
  return getSanityClient().fetch(
    `*[_type == "blogPost"] | order(publishedAt desc){
      _id, title, slug, excerpt, coverImage,
      category->{title, slug},
      tags, author->{name, image, bio}, readingTime, publishedAt
    }`,
    {},
    { next: { tags: [SANITY_TAGS.blogPost], revalidate: false } }
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    return FALLBACK_POSTS.find((p) => p.slug.current === slug) ?? null;
  }
  return getSanityClient().fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id, title, slug, excerpt, coverImage, body,
      category->{title, slug},
      tags, author->{name, image, bio}, readingTime, publishedAt, seo
    }`,
    { slug },
    { next: { tags: [SANITY_TAGS.blogPost], revalidate: false } }
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return FALLBACK_TESTIMONIALS;
  return getSanityClient().fetch(
    `*[_type == "testimonial" && published == true] | order(_createdAt desc){
      _id, name, role, review, rating, photo
    }`,
    {},
    { next: { tags: [SANITY_TAGS.testimonial], revalidate: false } }
  );
}

export async function getFaqs(): Promise<Faq[]> {
  if (!isSanityConfigured) return FALLBACK_FAQS;
  return getSanityClient().fetch(
    `*[_type == "faq"] | order(order asc){ _id, question, answer, category, order }`,
    {},
    { next: { tags: [SANITY_TAGS.faq], revalidate: false } }
  );
}

export async function getAboutPage(): Promise<AboutPage> {
  if (!isSanityConfigured) return FALLBACK_ABOUT;
  const result = await getSanityClient().fetch(
    `*[_type == "about"][0]{
      heading, photo, qualification, experienceYears, teachingMedium, bio, philosophyPoints, milestones, seo
    }`,
    {},
    { next: { tags: [SANITY_TAGS.about], revalidate: false } }
  );
  return result ?? FALLBACK_ABOUT;
}

const FALLBACK_SITE_SETTINGS: SiteSettings = {
  siteTitle: "CHEM by Neeraj Sir",
  tagline: "Learn Chemistry the Conceptual Way",
  whatsappNumber: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return FALLBACK_SITE_SETTINGS;
  const result = await getSanityClient().fetch(
    `*[_type == "siteSettings"][0]{ siteTitle, tagline, contactEmail, contactPhone, whatsappNumber, address }`,
    {},
    { next: { tags: [SANITY_TAGS.siteSettings], revalidate: false } }
  );
  return result ?? FALLBACK_SITE_SETTINGS;
}
