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
        {/* Header row */}
        <div className="insights-preview-header">
          <div className="insights-preview-header-left">
            <h2 className="insights-preview-title">Our Case Studies &amp; Latest Blogs</h2>
          </div>
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
        <div className="flex justify-center mt-16">
          <Link href="/news" className="button-primary" aria-label="View more articles">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
