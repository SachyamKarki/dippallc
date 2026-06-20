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
  const href = props.href ?? `/news/${props.article.slug}`;
  const variant = props.variant ?? "standard";
  const label = articleLabel(props.article.tag);
  const coverStyle = props.article.cover?.kind === "gradient" ? { backgroundImage: props.article.cover.background } : undefined;

  if (variant === "compact") {
    return (
      <Link href={href} className="flex flex-col group rounded-lg border-t border-gray-100 px-2 py-6 transition-all hover:bg-gray-50 first:border-0">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-[#1E293B] px-3 py-1.5 rounded-md">#{props.article.tag}</span>
          <span className="w-1 h-1 rounded-full bg-gray-200"></span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{formatDate(props.article.createdAt)}</span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-[#111] mb-3 group-hover:text-[#1E293B] transition-colors">{props.article.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#4b5563]">{props.article.excerpt}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">{label}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#111] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Read Archive &rarr;
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
          <span className="text-[9px] font-bold uppercase tracking-widest text-white bg-[#1E293B] px-3 py-1.5 rounded-md">#{props.article.tag}</span>
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
