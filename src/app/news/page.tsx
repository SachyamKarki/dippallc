"use client";

import { useEffect, useState } from "react";
import { getExamplePostSummaries } from "@/lib/blog/examplePosts";
import type { BlogPreview } from "@/lib/blog/types";
import { 
  toCardTitle, 
  toCardExcerpt, 
  estimateReadingTimeMinutes, 
  safeTime,
  normalizeWhitespace
} from "@/lib/blog/utils";

// Components
import NewsHero from "@/components/news/NewsHero";
import NewsFeatured from "@/components/news/NewsFeatured";
import NewsGrid from "@/components/news/NewsGrid";
import NewsPagination from "@/components/news/NewsPagination";
import NewsFooterCTA from "@/components/news/NewsFooterCTA";

interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

export default function BlogsPage() {
  const [remotePosts, setRemotePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/posts/`);
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

  const allCards: BlogPreview[] = [
    ...remotePosts.map((post) => ({
      slug: String(post.id),
      title: toCardTitle(post.title),
      tag: normalizeWhitespace(post.tag || "Deep Tech"),
      excerpt: toCardExcerpt(post.text),
      imageUrl: post.image_url || undefined,
      createdAt: post.created_at,
      readingTimeMinutes: estimateReadingTimeMinutes(post.text),
      source: "backend" as const,
    })),
    ...getExamplePostSummaries().map((post) => ({
      slug: post.slug,
      title: toCardTitle(post.title),
      tag: normalizeWhitespace(post.tag || "Deep Tech"),
      excerpt: toCardExcerpt(post.excerpt, 200),
      cover: post.cover,
      createdAt: post.createdAt,
      readingTimeMinutes: post.readingTimeMinutes,
      source: "example" as const,
    })),
  ]
    .filter((post, index, list) => list.findIndex((other) => other.slug === post.slug) === index)
    .sort((a, b) => safeTime(b.createdAt) - safeTime(a.createdAt));

  const cards = allCards.filter(card => {
    const query = searchQuery.toLowerCase();
    return card.title.toLowerCase().includes(query) ||
           card.tag.toLowerCase().includes(query) ||
           card.excerpt.toLowerCase().includes(query);
  });

  const recentCards = searchQuery ? [] : cards.slice(0, 3);
  const remainingCards = searchQuery ? cards : cards.slice(3);

  const totalPages = Math.max(1, Math.ceil(remainingCards.length / POSTS_PER_PAGE));
  const paginatedCards = remainingCards.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="blogs-page bg-white min-h-screen">
      <NewsHero 
        searchQuery={searchQuery} 
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }} 
      />

      <section className="blogs-gallery-section" style={{ paddingBottom: '4rem' }}>
        <div className="blogs-gallery-shell section-shell">
          {loading ? (
            <div className="blogs-loading">
              <div className="blogs-loading-spinner" />
            </div>
          ) : cards.length > 0 ? (
            <>
              {!searchQuery && <NewsFeatured recentCards={recentCards} />}
              
              <NewsGrid 
                articles={paginatedCards} 
                title={searchQuery ? `Search results for "${searchQuery}"` : "All news articles"} 
              />

              <NewsPagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </>
          ) : (
            <div className="blogs-empty-state">
              <p className="blogs-empty-copy">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
