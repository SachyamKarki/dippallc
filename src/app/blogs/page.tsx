"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getExamplePostSummaries } from "@/lib/blog/examplePosts";
import type { BlogPreview } from "@/lib/blog/types";

interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

const BLOG_FILTERS = [
  { label: "All", value: "all" },
  { label: "Software systems", value: "Software systems" },
  { label: "AI orchestration", value: "AI orchestration" },
  { label: "Operating model", value: "Operating model" },
  { label: "Consulting", value: "Consulting" },
] as const;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function stripMarkup(value: string) {
  return (
    value
      // Remove HTML tags.
      .replace(/<[^>]+>/g, " ")
      // Remove Markdown images.
      .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
      // Replace Markdown links with link text.
      .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
      // Remove inline code backticks.
      .replace(/`([^`]+)`/g, "$1")
  );
}

function firstParagraph(value: string) {
  const normalized = value.replace(/\r/g, "").trim();
  const paragraphs = normalized
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean);
  return paragraphs[0] ?? "";
}

function toCardExcerpt(raw: string, maxLen = 180) {
  const base = normalizeWhitespace(stripMarkup(firstParagraph(raw || "")));
  if (!base) return "";
  if (base.length <= maxLen) return base;
  const clipped = base.slice(0, maxLen);
  const safe = clipped.replace(/[,\s]+$/g, "");
  return `${safe}…`;
}

function toCardTitle(raw: string) {
  const base = normalizeWhitespace(stripMarkup(raw || ""));
  return base.replace(/[.!?]+$/g, "");
}

function estimateReadingTimeMinutes(raw: string) {
  const plain = normalizeWhitespace(stripMarkup(raw || ""));
  const words = plain ? plain.split(" ").filter(Boolean).length : 0;
  // Conservative: 200 wpm, minimum of 3 minutes so cards don't show "1 min".
  return Math.max(3, Math.round(words / 200));
}

function safeTime(date: string) {
  const ms = new Date(date).getTime();
  return Number.isFinite(ms) ? ms : 0;
}

export default function BlogsPage() {
  const [remotePosts, setRemotePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<(typeof BLOG_FILTERS)[number]["value"]>("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/posts/");
        const data = await res.json();
        setRemotePosts(Array.isArray(data) ? (data as Post[]) : []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const cards: BlogPreview[] = [
    ...remotePosts.map((post) => ({
      slug: String(post.id),
      title: toCardTitle(post.title),
      tag: normalizeWhitespace(post.tag || "Insights"),
      excerpt: toCardExcerpt(post.text),
      imageUrl: post.image_url || undefined,
      createdAt: post.created_at,
      readingTimeMinutes: estimateReadingTimeMinutes(post.text),
      source: "backend" as const,
    })),
    ...getExamplePostSummaries().map((post) => ({
      slug: post.slug,
      title: toCardTitle(post.title),
      tag: normalizeWhitespace(post.tag || "Insights"),
      excerpt: toCardExcerpt(post.excerpt, 200),
      cover: post.cover,
      createdAt: post.createdAt,
      readingTimeMinutes: post.readingTimeMinutes,
      source: "example" as const,
    })),
  ]
    .filter((post, index, list) => list.findIndex((other) => other.slug === post.slug) === index)
    .sort((a, b) => safeTime(b.createdAt) - safeTime(a.createdAt));

  const visibleCards =
    activeFilter === "all" ? cards : cards.filter((post) => post.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <main className="blogs-page">
      <section className="blogs-gallery-hero">
        <div className="blogs-gallery-shell section-shell">
          <h1 className="blogs-gallery-title">BLOG</h1>
          <p className="blogs-gallery-summary">
            Explore practical writing on software systems, AI orchestration, consulting, and operating models for modern delivery teams.
          </p>

          <div className="blogs-gallery-tabs" role="tablist" aria-label="Blog categories">
            {BLOG_FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`blogs-gallery-tab ${activeFilter === filter.value ? "blogs-gallery-tab-active" : ""}`}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="blogs-gallery-section">
        <div className="blogs-gallery-shell section-shell">
          {loading ? (
            <div className="blogs-loading">
              <div className="blogs-loading-spinner" />
            </div>
          ) : visibleCards.length > 0 ? (
            <div className="blogs-gallery-grid">
              {visibleCards.map((article, index) => {
                const href = `/blogs/${article.slug}`;

                return (
                  <Link
                    key={`${article.source}:${article.slug}`}
                    href={href}
                    className="blogs-gallery-card"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div className="blogs-gallery-image-shell">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          unoptimized
                          sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw"
                          className="blogs-gallery-image"
                        />
                      ) : (
                        <div className="blogs-gallery-image-fallback" style={{ backgroundImage: article.cover?.background }} />
                      )}
                    </div>

                    <div className="blogs-gallery-card-body">
                      <div className="blogs-gallery-meta">
                        <span>{article.tag}</span>
                        <span>{formatDate(article.createdAt)}</span>
                      </div>

                      <h2 className="blogs-gallery-card-title">{article.title}</h2>
                      <p className="blogs-gallery-card-excerpt">{article.excerpt}</p>

                      <div className="blogs-gallery-card-footer">
                        <span>{article.readingTimeMinutes ? `${article.readingTimeMinutes} min read` : "Article"}</span>
                        <span className="blogs-gallery-card-link">Read article</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="blogs-empty-state">
              <p className="blogs-empty-copy">No articles are published yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
