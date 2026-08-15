import type { Metadata } from "next";
import { getEnv } from "@/lib/env";

/**
 * Single source of truth for SEO. Change the domain, brand copy, or
 * keyword sets here and every page picks it up — titles, canonical URLs,
 * Open Graph/Twitter cards, and the JSON-LD graph all read from this file.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.easychembyneerajsir.in"
).replace(/\/$/, "");

export const BRAND_NAME = "Easy Chem by Neeraj Sir";
export const LEGACY_BRAND_NAME = "CHEM by Neeraj Sir"; // kept for schema continuity
export const TEACHER_NAME = "Neeraj Sharma";
export const SITE_TITLE_DEFAULT = `${BRAND_NAME} | CBSE Chemistry Teacher | Notes, JEE & NEET Prep`;
export const SITE_DESCRIPTION_DEFAULT =
  "Easy Chem by Neeraj Sir — learn Chemistry the conceptual way with Neeraj Sharma, a CBSE Chemistry teacher with 15+ years of experience. Premium & free notes, NCERT solutions, PYQs, and concept-first coaching for Class 9, Class 10, Class 11, Class 12, JEE and NEET.";

/**
 * A broad but relevant keyword set covering brand, subject, exam, class,
 * and intent variations students actually search for. Reused as the base
 * `keywords` array on every page, with page-specific terms appended.
 */
export const CORE_KEYWORDS = [
  // Brand
  "Easy Chem by Neeraj Sir",
  "easychembyneerajsir",
  "Neeraj Sir Chemistry",
  "Neeraj Sharma Chemistry teacher",
  "Chem by Neeraj Sir",
  // Subject + teacher intent
  "chemistry teacher",
  "best chemistry teacher",
  "online chemistry teacher",
  "chemistry tuition",
  "chemistry home tuition",
  "chemistry classes near me",
  "CBSE chemistry teacher",
  "private chemistry tutor",
  // Class-level
  "chemistry notes class 11",
  "chemistry notes class 12",
  "class 11 chemistry notes pdf",
  "class 12 chemistry notes pdf",
  "CBSE class 11 chemistry",
  "CBSE class 12 chemistry",
  "class 11 chemistry syllabus",
  "class 12 chemistry syllabus",
  // Content types
  "chemistry notes pdf free download",
  "handwritten chemistry notes",
  "chemistry revision notes",
  "NCERT solutions chemistry",
  "NCERT chemistry class 11 solutions",
  "NCERT chemistry class 12 solutions",
  "chemistry important questions",
  "chemistry previous year questions",
  "chemistry PYQ",
  "organic chemistry notes",
  "inorganic chemistry notes",
  "physical chemistry notes",
  "chemistry formula sheet",
  // Exam prep
  "JEE chemistry",
  "JEE Mains chemistry notes",
  "JEE Advanced chemistry",
  "NEET chemistry",
  "NEET chemistry notes",
  "NEET chemistry preparation",
  "JEE NEET chemistry preparation",
  // Learning style / value prop
  "concept based chemistry learning",
  "chemistry made easy",
  "learn chemistry the conceptual way",
  "chemistry online classes",
  "chemistry doubt solving",
];

export const SOCIAL_LINKS = () => {
  const env = getEnv();
  return [
    env.NEXT_PUBLIC_CONTACT_INSTAGRAM,
    env.NEXT_PUBLIC_CONTACT_YOUTUBE,
    env.NEXT_PUBLIC_CONTACT_WHATSAPP,
  ].filter((url): url is string => Boolean(url));
};

/**
 * Builds a Metadata object for a page, merging page-specific fields on top
 * of sane, brand-consistent defaults (OG/Twitter cards, canonical URL,
 * robots directives). Pass `path` without a leading domain, e.g. "/about".
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  ogImage,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || `${SITE_URL}/images/og-image.jpg`;

  return {
    title,
    description,
    keywords: Array.from(new Set([...keywords, ...CORE_KEYWORDS])),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: BRAND_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** The Organization + Person + WebSite nodes shared by every page's JSON-LD graph. */
export function buildOrganizationGraph() {
  const env = getEnv();
  const sameAs = SOCIAL_LINKS();

  return [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      alternateName: LEGACY_BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/og-image.jpg`,
      description: SITE_DESCRIPTION_DEFAULT,
      email: env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
      telephone: env.NEXT_PUBLIC_CONTACT_PHONE || undefined,
      areaServed: "IN",
      sameAs: sameAs.length ? sameAs : undefined,
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}/#founder`,
        name: TEACHER_NAME,
        jobTitle: "Chemistry Teacher",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: TEACHER_NAME,
      jobTitle: "CBSE Chemistry Teacher",
      description:
        "CBSE Chemistry teacher with 15+ years of experience teaching Class 11, Class 12, JEE and NEET Chemistry with a concept-first approach.",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/images/neeraj-sir-hero.png`,
      sameAs: SOCIAL_LINKS().length ? SOCIAL_LINKS() : undefined,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND_NAME,
      description: SITE_DESCRIPTION_DEFAULT,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/blog?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

/** Simple BreadcrumbList JSON-LD for interior pages. */
export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
