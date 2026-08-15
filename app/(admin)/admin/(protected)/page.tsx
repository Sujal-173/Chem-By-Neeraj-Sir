import Link from "next/link";
import { MessageSquare, ListChecks, BookOpen, FileStack, ArrowRight } from "lucide-react";
import { getDb } from "@/lib/mongodb";
import { getResources, getBlogPosts } from "@/lib/sanity/queries";
import { isSanityConfigured } from "@/lib/sanity/client";

async function getCounts() {
  let messageCount = 0;
  let waitingListCount = 0;
  try {
    const db = await getDb();
    [messageCount, waitingListCount] = await Promise.all([
      db.collection("contact_messages").countDocuments(),
      db.collection("waiting_list").countDocuments(),
    ]);
  } catch {
    // MongoDB not configured yet — show zeros rather than crashing the dashboard.
  }

  const [resources, posts] = await Promise.all([getResources(), getBlogPosts()]);

  return {
    messageCount,
    waitingListCount,
    resourceCount: resources.length,
    postCount: posts.length,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    {
      label: "Contact Messages",
      value: counts.messageCount,
      icon: MessageSquare,
      href: "/admin/messages",
    },
    {
      label: "Waiting List Signups",
      value: counts.waitingListCount,
      icon: ListChecks,
      href: "/admin/waiting-list",
    },
    {
      label: "Notes & Resources",
      value: counts.resourceCount,
      icon: FileStack,
      href: "/admin/notes",
    },
    {
      label: "Blog Posts",
      value: counts.postCount,
      icon: BookOpen,
      href: "/admin/content",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark">Overview</h1>
      <p className="mt-1 text-sm text-dark/50">A quick look at what&apos;s happening on the site.</p>

      {!isSanityConfigured && (
        <div className="mt-6 rounded-2xl bg-accent/10 border border-accent/20 px-5 py-4 text-sm text-dark/70">
          Sanity isn&apos;t connected yet — Notes and Blog counts below reflect built-in placeholder
          content. Add <code className="font-mono text-xs">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to
          switch over to live data.
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl bg-white border border-primary/8 p-5 sm:p-6 hover:shadow-soft-lg hover:border-primary/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-dark/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="mt-5 font-mono text-2xl font-bold text-dark">{value}</p>
            <p className="mt-1 text-sm text-dark/50">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white border border-primary/8 p-5 sm:p-6">
        <h2 className="font-heading font-semibold text-dark mb-1">Update the whole website</h2>
        <p className="text-sm text-dark/55 leading-relaxed">
          Homepage, About, Blog posts, Testimonials, FAQs, Navigation, and Footer are all editable
          from one place —{" "}
          <Link href="/admin/content" className="text-primary font-medium hover:underline">
            Website Content
          </Link>
          . This overview page covers what lives outside the CMS: contact messages, the waiting
          list, and note uploads.
        </p>
      </div>
    </div>
  );
}
