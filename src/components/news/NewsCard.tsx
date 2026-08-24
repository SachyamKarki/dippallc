import ProgressiveImage from "@/components/ui/ProgressiveImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/blog/utils";
import type { BlogPreview } from "@/lib/blog/types";

export const CARD_ACCENTS = [
  "bg-[#F0F2F0]",
  "bg-[#F2F2F0]",
  "bg-[#F0F0F2]",
  "bg-[#F5F5F4]",
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
  if (article.cover?.kind === "image") return article.cover.src;
  const tag = article.tag?.split(",")[0] ?? "";
  return FALLBACK_IMAGES[tag] || "/images/service-systems.jpg";
}

interface NewsCardProps {
  article: BlogPreview;
  index?: number;
  compact?: boolean;
  priority?: boolean;
  /** Homepage preview — card only, no navigation to case study pages */
  previewOnly?: boolean;
}

export default function NewsCard({
  article,
  index = 0,
  compact = false,
  priority = false,
  previewOnly = false,
}: NewsCardProps) {
  const href = `/news/${article.slug}`;
  const accent = cardAccent(index);
  const image = resolveImage(article);

  return (
    <article className={`news-card ${accent}${previewOnly ? " news-card-preview-only" : ""}`}>
      <div className={`news-card-body${compact ? " news-card-body-compact" : ""}`}>
        <div className="news-card-meta-row">
          <p className="news-card-date">{formatDate(article.createdAt, { month: "long" })}</p>
          {!previewOnly ? (
            <span className="news-card-arrow-icon" aria-hidden="true">
              <ArrowRight className="w-3 h-3 -rotate-45 text-[#0a0a0a]" />
            </span>
          ) : null}
        </div>

        <div className="news-card-title-group">
          <h3 className={`st-title news-card-title${compact ? " news-card-title-compact" : ""}`}>
            {previewOnly ? (
              <span className="news-card-title-text">{article.title}</span>
            ) : (
              <Link href={href} className="news-card-title-link">{article.title}</Link>
            )}
          </h3>
          <p className="st-text news-card-excerpt">{article.excerpt}</p>
        </div>
      </div>

      <div className={`news-card-media${compact ? " news-card-media-compact" : ""}`}>
        {article.cover?.kind === "gradient" && !article.imageUrl ? (
          <div className="news-card-gradient" style={{ background: article.cover.background }} />
        ) : (
          <ProgressiveImage
            src={image}
            alt={article.title}
            fill
            preload={priority || undefined}
            loading={priority ? "eager" : "lazy"}
            placeholder="empty"
            sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, (max-width: 1440px) 22vw, 320px"
            quality={75}
            className="news-card-img"
          />
        )}
        <div className="news-card-media-overlay" />
        {!previewOnly ? (
          <div className="news-card-read-btn-wrap">
            <Link href={href} className="news-card-read-btn">
              <span className="news-card-read-label">Read More</span>
              <span className="news-card-read-icon" aria-hidden="true">
                <ArrowRight className="w-4 h-4 text-[#0a0a0a]" />
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </article>
  );
}
