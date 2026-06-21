"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NewsCard from "@/components/news/NewsCard";
import { getExamplePostSummaries } from "@/lib/blog/examplePosts";
import { toCardTitle, toCardExcerpt, normalizeWhitespace } from "@/lib/blog/utils";
import type { Post } from "@/types";
import type { BlogPreview } from "@/lib/blog/types";

const PREVIEW_COUNT = 4;

export default function InsightsSection() {
  const [articles, setArticles] = useState<BlogPreview[]>(() =>
    getExamplePostSummaries()
      .slice(0, PREVIEW_COUNT)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        tag: p.tag || "Insights",
        excerpt: p.excerpt,
        createdAt: p.createdAt,
        cover: p.cover,
        source: "example" as const,
      }))
  );

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    fetch(`${api}/api/posts/`)
      .then((r) => r.ok ? r.json() : [])
      .then((posts: Post[]) => {
        if (!posts.length) return;
        const remote: BlogPreview[] = posts.map((p) => ({
          slug: String(p.id),
          title: toCardTitle(p.title),
          tag: normalizeWhitespace(p.tag || "Insights"),
          excerpt: toCardExcerpt(p.text),
          imageUrl: p.image_url || undefined,
          createdAt: p.created_at,
          source: "backend" as const,
        }));
        const examples = getExamplePostSummaries().map((p) => ({
          slug: p.slug,
          title: p.title,
          tag: p.tag || "Insights",
          excerpt: p.excerpt,
          createdAt: p.createdAt,
          cover: p.cover,
          source: "example" as const,
        }));
        const seen = new Set(remote.map((p) => p.slug));
        const merged = [...remote, ...examples.filter((p) => !seen.has(p.slug))];
        setArticles(merged.slice(0, PREVIEW_COUNT));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="insights" className="insights-preview-section reveal">
      <div className="section-shell">
        <div className="w-full mb-4 lg:mb-6">
          <h2 className="st-title text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] mt-0 mb-4 sm:mb-6 text-left max-w-4xl">
            Our Case Studies &amp; Latest Blogs
          </h2>
        </div>

        {/* 4-column card grid */}
        <div className="insights-preview-grid">
          {articles.map((article, i) => (
            <NewsCard
              key={article.slug}
              article={article}
              index={i}
              compact
              priority={i < 2}
            />
          ))}
        </div>

        {/* View More button */}
        <div className="flex justify-start lg:justify-center mt-16">
          <Link href="/news" className="button-primary" aria-label="View more articles">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
