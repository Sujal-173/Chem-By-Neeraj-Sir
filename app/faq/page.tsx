import type { Metadata } from "next";
import { getFaqs } from "@/lib/sanity/queries";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions | Notes, Classes & Purchases",
  description:
    "Answers to common questions about Chemistry notes, purchases, and upcoming online classes with Neeraj Sir.",
  path: "/faq",
  keywords: ["chemistry notes faq", "chemistry classes faq"],
});

const CATEGORY_LABEL: Record<string, string> = {
  general: "General",
  notes: "Notes & Purchases",
  onlineClasses: "Online Classes",
};

export default async function FAQPage() {
  const faqs = await getFaqs();
  const grouped = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] || [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  return (
    <div className="py-20 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-accent">FAQ</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight">
            Frequently asked questions
          </h1>
        </div>

        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="mb-12 last:mb-0">
            <h2 className="font-heading text-lg font-semibold text-dark mb-4">
              {CATEGORY_LABEL[category] || category}
            </h2>
            <FaqAccordion faqs={items} defaultOpenIndex={null} />
          </div>
        ))}
      </div>
    </div>
  );
}
