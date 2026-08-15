import Link from "next/link";
import {
  Home,
  User,
  FileStack,
  BookOpen,
  Tag,
  Users,
  MessageSquareQuote,
  HelpCircle,
  Menu as MenuIcon,
  PanelBottom,
  Settings,
  ExternalLink,
} from "lucide-react";
import { isSanityConfigured } from "@/lib/sanity/client";

const SECTIONS = [
  {
    group: "Pages",
    items: [
      { id: "homepage", label: "Homepage", desc: "Hero, stats, why-choose-us, CTAs and every homepage block.", icon: Home },
      { id: "about", label: "About Page", desc: "Neeraj Sir's bio, philosophy, and about-page media.", icon: User },
    ],
  },
  {
    group: "Content",
    items: [
      { id: "resource", label: "Notes & Resources", desc: "Also manageable from the Upload Notes tab.", icon: FileStack },
      { id: "blogPost", label: "Blog Posts", desc: "Write and publish articles.", icon: BookOpen },
      { id: "category", label: "Categories", desc: "Organize blog posts by topic.", icon: Tag },
      { id: "author", label: "Authors", desc: "Manage blog author profiles.", icon: Users },
      { id: "testimonial", label: "Testimonials", desc: "Student reviews shown across the site.", icon: MessageSquareQuote },
      { id: "faq", label: "FAQs", desc: "Frequently asked questions.", icon: HelpCircle },
    ],
  },
  {
    group: "Site-wide",
    items: [
      { id: "navigation", label: "Navigation", desc: "Menu links shown in the header.", icon: MenuIcon },
      { id: "footer", label: "Footer", desc: "Footer links, socials, and contact details.", icon: PanelBottom },
      { id: "siteSettings", label: "Site Settings", desc: "SEO defaults, global metadata, and site-wide toggles.", icon: Settings },
    ],
  },
];

export default function AdminContentHubPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark">Website Content</h1>
      <p className="mt-1 text-sm text-dark/50">
        Every editable part of the site, in one place. Each card opens the right section of
        Sanity Studio so you can update it and publish — changes go live automatically.
      </p>

      {!isSanityConfigured && (
        <div className="mt-6 rounded-2xl bg-accent/10 border border-accent/20 px-5 py-4 text-sm text-dark/70">
          Sanity isn&apos;t connected yet. Add{" "}
          <code className="font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code className="font-mono text-xs">SANITY_API_TOKEN</code> to your environment to
          enable full content editing here.
        </div>
      )}

      <div className="mt-8 space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.group}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-dark/40 mb-3">
              {section.group}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {section.items.map(({ id, label, desc, icon: Icon }) => (
                <Link
                  key={id}
                  href={`/studio/structure/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl bg-white border border-primary/8 p-5 hover:shadow-soft-lg hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ExternalLink className="h-4 w-4 text-dark/20 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="mt-4 font-semibold text-dark">{label}</p>
                  <p className="mt-1 text-sm text-dark/50 leading-relaxed">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white border border-primary/8 p-6">
        <h2 className="font-heading font-semibold text-dark mb-1">Contact messages &amp; waiting list</h2>
        <p className="text-sm text-dark/55 leading-relaxed">
          Those live outside the CMS in the database — manage them from{" "}
          <Link href="/admin/messages" className="text-primary font-medium hover:underline">
            Contact Messages
          </Link>{" "}
          and{" "}
          <Link href="/admin/waiting-list" className="text-primary font-medium hover:underline">
            Waiting List
          </Link>{" "}
          in the sidebar.
        </p>
      </div>
    </div>
  );
}
