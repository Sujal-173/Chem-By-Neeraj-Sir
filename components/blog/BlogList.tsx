"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/sanity/queries";
import CmsImage from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category?.title).filter(Boolean)))],
    [posts]
  );

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category?.title === category;
      const matchesQuery =
        query.trim() === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, category, query]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-full border border-primary/15 bg-white pl-11 pr-4 py-2.5 text-sm focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat as string)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === cat
                ? "bg-primary text-white"
                : "bg-white border border-primary/15 text-dark/70 hover:border-primary/40"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-primary/8 py-16 text-center text-dark/50 text-sm">
          No articles match your search yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((post) => (
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
                <p className="mt-2 text-sm text-dark/55 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="mt-4 flex items-center gap-1.5 text-xs text-dark/50">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readingTime || 5} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
