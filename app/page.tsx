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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://chembyneerajsir.com";

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${siteUrl}/#organization`,
        name: "CHEM by Neeraj Sir",
        url: siteUrl,
        logo: `${siteUrl}/images/logo.png`,
        founder: {
          "@type": "Person",
          name: "Neeraj Sharma",
          jobTitle: "Chemistry Teacher",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Chemistry with Neeraj Sharma",
        publisher: { "@id": `${siteUrl}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/blog?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
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
