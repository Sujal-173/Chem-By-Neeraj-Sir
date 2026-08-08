import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/sanity/queries";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Chemistry Blog | Board Prep, NCERT, JEE & NEET Articles",
  description:
    "Weekly Chemistry articles covering board preparation, organic/physical/inorganic chemistry, NCERT, JEE, and NEET.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-accent">Blog</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight">
            Chemistry, explained weekly
          </h1>
        </div>
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
