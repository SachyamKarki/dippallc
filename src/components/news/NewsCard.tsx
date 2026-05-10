import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/blog/utils";
import type { BlogPreview } from "@/lib/blog/types";

interface NewsCardProps {
  article: BlogPreview;
  variant?: "standard" | "horizontal";
  priority?: boolean;
}

export default function NewsCard({ article, variant = "standard", priority = false }: NewsCardProps) {
  const href = `/news/${article.slug}`;
  const author = "Dippa Team";

  if (variant === "horizontal") {
    return (
      <Link href={href} className="blogs-horizontal-card">
        <div className="blogs-gallery-image-shell">
          <Image
            src={article.imageUrl || "/images/blog-software.png"}
            alt={article.title}
            fill
            unoptimized
            priority={priority}
            sizes="(max-width: 767px) 100vw, 30vw"
            className="blogs-gallery-image"
          />
        </div>
        <div className="blogs-horizontal-card-body">
          <div className="blogs-gallery-meta flex items-center gap-2 text-[0.8rem] whitespace-nowrap overflow-hidden">
            <span className="author truncate">{author}</span>
            <span className="shrink-0 text-black/20">&bull;</span>
            <span className="shrink-0">{formatDate(article.createdAt)}</span>
          </div>
          <h3 className="blogs-gallery-card-title text-[1.25rem]">{article.title}</h3>
          <p className="blogs-gallery-card-excerpt line-clamp-2 text-[0.95rem]">{article.excerpt}</p>
          <div className="blogs-tag-list">
            {article.tag.split(',').map((t, i) => (
              <span key={i} className="blog-tag-pill">{t.trim()}</span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="news-project-card group">
      <div className="news-project-image-shell">
        <Image
          src={article.imageUrl || "/images/blog-software.png"}
          alt={article.title}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className="news-project-image"
        />
        {/* Subtle navigation indicator dots or arrows could go here if needed, but keeping it clean for now */}
      </div>

      <div className="news-project-body">
        <span className="news-project-kicker">
          {article.tag.split(',')[0].toUpperCase()}
        </span>
        <h3 className="news-project-title">{article.title}</h3>
        <p className="news-project-excerpt line-clamp-3">{article.excerpt}</p>
      </div>
    </Link>
  );
}
