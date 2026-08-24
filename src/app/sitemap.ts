import type { MetadataRoute } from "next";
import { examplePosts } from "@/lib/blog/examplePosts";

const SITE = "https://dippa.group";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = examplePosts.map((post) => ({
    url: `${SITE}/news/${post.slug}`,
    lastModified: post.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/news`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies,
  ];
}
