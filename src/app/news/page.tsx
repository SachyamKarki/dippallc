import Link from "next/link";
import ProgressiveImage from "@/components/ui/ProgressiveImage";
import {
  CASE_STUDY_CATEGORIES,
  getExamplePostSummaries,
} from "@/lib/blog/examplePosts";
import { formatDate } from "@/lib/blog/utils";
import type { BlogPreview, CaseStudyCategory } from "@/lib/blog/types";

export const metadata = {
  title: "Case Studies",
  description:
    "Dippa case studies — 3 AI, 2 networking, and 1 security deployment with architecture notes, published dates, and engineering reviews.",
  openGraph: {
    title: "Case Studies | Dippa",
    description:
      "3 AI case studies, 2 networking studies, and 1 security study from production deployments.",
    url: "https://dippa.group/news",
    type: "website",
  },
  alternates: {
    canonical: "https://dippa.group/news",
  },
};

function coverSrc(article: BlogPreview) {
  if (article.cover?.kind === "image") return article.cover.src;
  return "/images/service-systems.jpg";
}

function CaseStudyCard({
  article,
  index,
}: {
  article: BlogPreview;
  index: number;
}) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="case-study-index-card reveal"
    >
      <div className="case-study-index-media">
        <ProgressiveImage
          src={coverSrc(article)}
          alt={article.title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          quality={75}
          className="case-study-index-img"
        />
        <span className="case-study-index-num">0{index + 1}</span>
      </div>
      <div className="case-study-index-body">
        <h3 className="case-study-index-title">{article.title}</h3>
        <p className="case-study-index-excerpt">{article.excerpt}</p>
        <p className="case-study-index-meta">
          {formatDate(article.createdAt, { month: "long" })}
          {article.readingTimeMinutes ? ` · ${article.readingTimeMinutes} min read` : ""}
        </p>
        <span className="case-study-index-link">Read case study →</span>
      </div>
    </Link>
  );
}

export default function NewsPage() {
  const articles: BlogPreview[] = getExamplePostSummaries().map((post) => ({
    slug: post.slug,
    title: post.title,
    tag: post.tag || "Case Study",
    category: post.category,
    excerpt: post.excerpt,
    createdAt: post.createdAt,
    cover: post.cover,
    source: post.source,
    readingTimeMinutes: post.readingTimeMinutes,
    caseStudy: post.caseStudy,
  }));

  const byCategory = (category: CaseStudyCategory) =>
    articles
      .filter((article) => article.category === category)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

  return (
    <main className="case-study-page" data-nav-tone="light">
      <section className="case-study-index case-study-index-top">
        <div className="section-shell">
          <header className="case-study-index-head reveal">
            <h1 className="case-study-index-page-title">Case Studies</h1>
          </header>

          {CASE_STUDY_CATEGORIES.map((group) => {
            const groupArticles = byCategory(group.id);
            if (groupArticles.length === 0) return null;

            return (
              <section
                key={group.id}
                className="case-study-index-group"
                aria-labelledby={`case-study-group-${group.id}`}
              >
                <header className="case-study-index-group-head reveal">
                  <div className="case-study-index-group-label-wrap">
                    <h2
                      id={`case-study-group-${group.id}`}
                      className="case-study-index-group-title"
                    >
                      {group.label}
                    </h2>
                  </div>
                  <p className="case-study-index-group-desc">{group.description}</p>
                  <p className="case-study-index-group-count">
                    {groupArticles.length}{" "}
                    {groupArticles.length === 1 ? "study" : "studies"}
                  </p>
                </header>

                <div className="case-study-index-grid">
                  {groupArticles.map((article, index) => (
                    <CaseStudyCard
                      key={article.slug}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
