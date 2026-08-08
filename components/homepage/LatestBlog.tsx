import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getBlogPosts } from "@/lib/sanity/queries";
import CmsImage from "@/components/ui/CmsImage";

export default async function LatestBlog() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <span className="text-sm font-semibold text-accent">From the Blog</span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight">
              Latest articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all shrink-0"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group rounded-3xl border border-primary/8 overflow-hidden hover:shadow-soft-lg transition-all"
            >
              <CmsImage image={post.coverImage} alt={post.title} className="aspect-[16/10]" />
              <div className="p-6">
                <span className="text-xs font-semibold text-accent">{post.category?.title}</span>
                <h3 className="mt-2 font-heading font-semibold text-dark leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className="mt-4 flex items-center gap-1.5 text-xs text-dark/50">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime || 5} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
