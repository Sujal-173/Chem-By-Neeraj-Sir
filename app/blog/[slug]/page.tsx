import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity/queries";
import CmsImage from "@/components/ui/CmsImage";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import ShareButtons from "@/components/blog/ShareButtons";
import { SITE_URL, BRAND_NAME, TEACHER_NAME, buildMetadata, buildBreadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found", robots: { index: false, follow: false } };
  return buildMetadata({
    title: post.seo?.metaTitle || `${post.title} | Chemistry Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug.current}`,
    keywords: post.tags && post.tags.length ? post.tags : [post.category?.title || "chemistry article"],
    ogImage: post.coverImage?.url,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug.current !== post.slug.current && p.category?.title === post.category?.title)
    .slice(0, 3);

  const postUrl = `${SITE_URL}/blog/${post.slug.current}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage?.url ? [post.coverImage.url] : undefined,
    author: {
      "@type": "Person",
      name: post.author?.name || TEACHER_NAME,
      url: `${SITE_URL}/about`,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    publisher: {
      "@type": "EducationalOrganization",
      name: BRAND_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.category?.title,
    keywords: post.tags?.join(", "),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug.current}` },
  ]);

  return (
    <div className="py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container-custom max-w-3xl">
        <span className="text-sm font-semibold text-accent">{post.category?.title}</span>
        <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-dark/50">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTime || 5} min read
          </span>
          <span>By {post.author?.name}</span>
        </div>

        <CmsImage
          image={post.coverImage}
          alt={post.title}
          className="mt-8 aspect-[16/9] rounded-3xl"
        />

        <div className="mt-8 flex items-center justify-between border-b border-primary/8 pb-8">
          <p className="text-dark/60 max-w-md">{post.excerpt}</p>
          <div className="hidden sm:block shrink-0 ml-6">
            <ShareButtons title={post.title} />
          </div>
        </div>
        <div className="sm:hidden mt-6">
          <ShareButtons title={post.title} />
        </div>

        <article className="mt-10">
          {post.body ? (
            <PortableTextRenderer value={post.body} />
          ) : (
            <p className="text-dark/60 leading-relaxed">
              The full article is being finalized and will be published here shortly.
            </p>
          )}
        </article>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-primary/8">
            <h2 className="font-heading text-xl font-semibold text-dark mb-6">Related articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="group rounded-2xl border border-primary/8 overflow-hidden hover:shadow-soft-lg transition-all"
                >
                  <CmsImage image={related.coverImage} alt={related.title} className="aspect-[16/10]" />
                  <div className="p-4">
                    <h3 className="text-sm font-heading font-semibold text-dark leading-snug group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
