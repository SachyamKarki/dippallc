import type { BlogPreview } from "@/lib/blog/types";
import NewsCard from "./NewsCard";

interface NewsGridProps {
  articles: BlogPreview[];
  title?: string;
  hideHeader?: boolean;
}

export default function NewsGrid({ articles, title, hideHeader = false }: NewsGridProps) {
  if (articles.length === 0) return null;

  return (
    <div className="news-grid-section">
      {!hideHeader ? (
        <div className="news-grid-header text-center mb-20">
          <h2 className="news-grid-title">{title || "Insights from the frontier"}</h2>
          <p className="news-grid-subtitle mx-auto">
            Deep dives into AI orchestration, senior product engineering, and the systemic shifts shaping modern enterprise operations.
          </p>
        </div>
      ) : null}
      
      <div className="blogs-gallery-grid">
        {articles.map((article) => (
          <NewsCard 
            key={`${article.source}:${article.slug}`} 
            article={article} 
          />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <button className="button-primary px-12 py-4">Explore all news</button>
      </div>
    </div>
  );
}
