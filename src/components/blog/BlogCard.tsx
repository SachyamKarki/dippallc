import Image from "next/image";
import Link from "next/link";
import type { BlogPreview } from "@/lib/blog/types";

type Variant = "featured" | "standard" | "compact";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function articleLabel(tag: string) {
  if (/ai|agent/i.test(tag)) return "Field Note";
  if (/architecture|system/i.test(tag)) return "Deep Dive";
  if (/consulting|operating/i.test(tag)) return "Operator Brief";
  return "Editorial";
}

export default function BlogCard(props: {
  article: BlogPreview;
  href?: string;
  variant?: Variant;
}) {
  const href = props.href ?? `/blogs/${props.article.slug}`;
  const variant = props.variant ?? "standard";
  const label = articleLabel(props.article.tag);
  const coverStyle = props.article.cover ? { backgroundImage: props.article.cover.background } : undefined;

  if (variant === "compact") {
    return (
      <Link href={href} className="blog-card blog-card-compact">
        <div className="blog-card-compact-meta">
          <span className="blog-card-tag blog-card-tag-muted">{props.article.tag}</span>
          <span className="blog-card-date blog-card-date-muted">{formatDate(props.article.createdAt)}</span>
        </div>

        <h3 className="blog-card-title blog-card-title-compact">{props.article.title}</h3>
        <p className="blog-card-excerpt blog-card-excerpt-compact">{props.article.excerpt}</p>

        <div className="blog-card-footer blog-card-footer-compact">
          <span className="blog-card-footer-note">{label}</span>
          <span className="blog-card-cta">
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    );
  }

  const isFeatured = variant === "featured";

  return (
    <Link href={href} className={`blog-card ${isFeatured ? "blog-card-featured" : "blog-card-standard"}`}>
      <div className={`blog-card-media ${isFeatured ? "blog-card-media-featured" : "blog-card-media-standard"}`}>
        {props.article.imageUrl ? (
          <Image
            src={props.article.imageUrl}
            alt={props.article.title}
            fill
            unoptimized
            sizes={isFeatured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 640px) 100vw, (max-width: 1279px) 50vw, 25vw"}
            className="blog-card-image"
          />
        ) : (
          <div className="blog-card-cover" style={coverStyle} />
        )}
        <div className="blog-card-media-overlay" />
      </div>

      <div className={`blog-card-body ${isFeatured ? "blog-card-body-featured" : "blog-card-body-standard"}`}>
        <div className="blog-card-meta-row">
          <span className="blog-card-tag blog-card-tag-muted">{props.article.tag}</span>
          <span className="blog-card-date">{formatDate(props.article.createdAt)}</span>
        </div>

        <div className="blog-card-meta-row blog-card-meta-row-secondary">
          <span className="blog-card-label">{label}</span>
          <span className="blog-card-reading-time">
            {props.article.readingTimeMinutes ? `${props.article.readingTimeMinutes} min read` : "Article"}
          </span>
        </div>

        <h3 className={`blog-card-title ${isFeatured ? "blog-card-title-featured" : "blog-card-title-standard"}`}>{props.article.title}</h3>

        <p className={`blog-card-excerpt ${isFeatured ? "blog-card-excerpt-featured" : "blog-card-excerpt-standard"}`}>
          {props.article.excerpt}
        </p>

        <div className="blog-card-footer">
          <span className="blog-card-footer-note">{isFeatured ? "Featured article" : "From the archive"}</span>
          <span className="blog-card-cta">
            Read article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
