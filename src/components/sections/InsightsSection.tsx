"use client";

import { useState } from "react";
import NewsCard from "@/components/news/NewsCard";
import { getExamplePostSummaries } from "@/lib/blog/examplePosts";
import type { BlogPreview } from "@/lib/blog/types";

const INITIAL_COUNT = 3;

export default function InsightsSection() {
  const [expanded, setExpanded] = useState(false);

  const articles: BlogPreview[] = getExamplePostSummaries().map((p) => ({
    slug: p.slug,
    title: p.title,
    tag: p.tag || "Case Study",
    category: p.category,
    excerpt: p.excerpt,
    createdAt: p.createdAt,
    cover: p.cover,
    source: "example" as const,
    caseStudy: p.caseStudy,
  }));

  const visible = expanded ? articles : articles.slice(0, INITIAL_COUNT);
  const canExpand = articles.length > INITIAL_COUNT && !expanded;

  return (
    <section id="insights" className="insights-preview-section" data-nav-tone="light">
      <div className="section-shell insights-preview-shell">
        <div className="insights-preview-heading-row">
          <h2 className="st-title insights-preview-heading">Case Studies</h2>
          <p className="insights-preview-sub">
            3 AI case studies · 2 networking studies · 1 security study
          </p>
        </div>

        <div className="insights-preview-grid">
          {visible.map((article, i) => (
            <NewsCard
              key={article.slug}
              article={article}
              index={i}
              compact
            />
          ))}
        </div>

        {canExpand ? (
          <div className="insights-preview-actions">
            <button
              type="button"
              className="button-primary"
              aria-expanded={expanded}
              onClick={() => setExpanded(true)}
            >
              View More
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
