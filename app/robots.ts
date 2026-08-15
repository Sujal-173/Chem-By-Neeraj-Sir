import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/", "/studio", "/studio/"],
      },
      // Explicitly allow search and answer-engine crawlers. The public pages
      // remain available through the wildcard rule above as well.
      {
        userAgent: [
          "Googlebot",
          "bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: ["/admin", "/admin/", "/api", "/api/", "/studio", "/studio/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
