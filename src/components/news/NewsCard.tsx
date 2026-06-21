"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/blog/utils";
import type { BlogPreview } from "@/lib/blog/types";

export const CARD_ACCENTS = [
  "bg-[#F0F2F0]",  // sage-tinted white
  "bg-[#F2F2F0]",  // warm white
  "bg-[#F0F0F2]",  // cool white
  "bg-[#F5F5F4]",  // stone white
] as const;

export function cardAccent(index: number) {
  return CARD_ACCENTS[index % CARD_ACCENTS.length];
}

const FALLBACK_IMAGES: Record<string, string> = {
  "Software systems": "/images/service-software-dev.jpg",
  "AI orchestration": "/images/service-ai-agent-real.jpg",
  "Consulting": "/images/service-sales-lead.jpg",
  "Technical Architecture": "/images/service-systems.jpg",
  "Architecture": "/images/service-systems.jpg",
  "Operating model": "/images/service-automation-real.jpg",
  "Engineering": "/images/service-app-dev.jpg",
  "Infrastructure": "/images/service-webapp.jpg",
  "Case Study": "/images/service-web-dev.jpg",
};

function resolveImage(article: BlogPreview): string {
  if (article.imageUrl) return article.imageUrl;
  const tag = article.tag?.split(",")[0] ?? "";
  return FALLBACK_IMAGES[tag] || "/images/service-systems.jpg";
}

interface NewsCardProps {
  article: BlogPreview;
  index?: number;
  compact?: boolean;
  priority?: boolean;
}

export default function NewsCard({ article, index = 0, compact = false, priority = false }: NewsCardProps) {
  const href = `/news/${article.slug}`;
  const accent = cardAccent(index);
  const image = resolveImage(article);
  const tag = article.tag?.split(",")[0]?.trim() ?? "Insights";

  return (
    <article className={`news-card ${accent}`}>
      {/* Text block — top */}
      <div className={`news-card-body${compact ? " news-card-body-compact" : ""}`}>
        <div className="news-card-meta-row">
          <div className="news-card-pills">
            <span className="news-card-pill news-card-pill-date">{formatDate(article.createdAt)}</span>
            <span className="news-card-pill news-card-pill-tag">{tag}</span>
          </div>
          <span className="news-card-arrow-icon" aria-hidden="true">
            <ArrowRight className="w-3 h-3 -rotate-45 text-[#0a0a0a]" />
          </span>
        </div>

        <div className="news-card-title-group">
          <h3 className={`st-title news-card-title${compact ? " news-card-title-compact" : ""}`}>
            <Link href={href} className="news-card-title-link">{article.title}</Link>
          </h3>
          <p className="st-text news-card-excerpt">{article.excerpt}</p>
        </div>
      </div>

      {/* Image — bottom */}
      <div className={`news-card-media${compact ? " news-card-media-compact" : ""}`}>
        {article.cover?.kind === "gradient" && !article.imageUrl ? (
          <div className="news-card-gradient" style={{ background: article.cover.background }} />
        ) : (
          <Image
            src={article.cover?.kind === "image" ? article.cover.src : image}
            alt={article.title}
            fill
            unoptimized
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="news-card-img"
          />
        )}
        <div className="news-card-media-overlay" />
        <div className="news-card-read-btn-wrap">
          <Link href={href} className="news-card-read-btn">
            <span className="news-card-read-label">Read More</span>
            <span className="news-card-read-icon" aria-hidden="true">
              <ArrowRight className="w-4 h-4 text-[#0a0a0a]" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
