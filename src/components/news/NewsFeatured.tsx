import type { BlogPreview } from "@/lib/blog/types";
import NewsCard from "./NewsCard";

interface NewsFeaturedProps {
  recentCards: BlogPreview[];
}

export default function NewsFeatured({ recentCards }: NewsFeaturedProps) {
  if (recentCards.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="blogs-recent-grid">
        {/* Primary large post on the left */}
        {recentCards[0] && (
          <div className="blogs-recent-primary">
            <NewsCard article={recentCards[0]} priority={true} />
          </div>
        )}
        
        {/* Secondary stacked posts on the right */}
        <div className="blogs-recent-secondary-stack">
          {recentCards.slice(1, 3).map((article) => (
            <NewsCard 
              key={`${article.source}:${article.slug}`} 
              article={article} 
              variant="horizontal" 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
