import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import Statistics from "@/components/homepage/Statistics";
import AboutPreview from "@/components/homepage/AboutPreview";
import TeachingPhilosophy from "@/components/homepage/TeachingPhilosophy";
import PremiumNotes from "@/components/homepage/PremiumNotes";
import FreeResources from "@/components/homepage/FreeResources";
import WhyChoose from "@/components/homepage/WhyChoose";
import ComingSoon from "@/components/homepage/ComingSoon";
import Testimonials from "@/components/homepage/Testimonials";
import LatestBlog from "@/components/homepage/LatestBlog";
import FAQ from "@/components/homepage/FAQ";
import ContactCTA from "@/components/homepage/ContactCTA";
import {
  buildMetadata,
  buildOrganizationGraph,
  SITE_TITLE_DEFAULT,
  SITE_DESCRIPTION_DEFAULT,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION_DEFAULT,
  path: "/",
  keywords: [
    "Neeraj Sharma Chemistry teacher home",
    "best CBSE chemistry teacher India",
    "chemistry notes and resources website",
  ],
});

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": buildOrganizationGraph(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Statistics />
      <AboutPreview />
      <TeachingPhilosophy />
      <PremiumNotes />
      <FreeResources />
      <WhyChoose />
      <ComingSoon />
      <Testimonials />
      <LatestBlog />
      <FAQ />
      <ContactCTA />
    </>
  );
}
