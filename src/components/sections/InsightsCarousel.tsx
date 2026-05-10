"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NewsCard from "@/components/news/NewsCard";

import { BlogPostSource } from "@/lib/blog/types";

interface InsightsCarouselProps {
  articles: Array<{
    slug: string;
    title: string;
    excerpt: string;
    tag: string;
    createdAt?: string;
    imageUrl?: string;
    source?: BlogPostSource;
    cover?: { kind: "gradient"; background: string; url?: string };
  }>;
}

export default function InsightsCarousel({ articles }: InsightsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) setVisibleSlides(2);
      else if (window.innerWidth <= 1024) setVisibleSlides(2);
      else setVisibleSlides(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = articles.length;
  // Maximum index we can scroll to so we don't show empty space at the end
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  const goTo = useCallback(
    (index: number) => {
      // Loop or clamp? Let's loop for a carousel feel
      setCurrentIndex((index + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 3000);
    return () => clearInterval(timer);
  }, [goNext, isPaused]);

  return (
    <div
      className="insights-carousel group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Arrows - Only show if more articles than visible */}
      {totalSlides > visibleSlides && (
        <>
          <button
            onClick={goPrev}
            className="insights-carousel-arrow insights-carousel-arrow--left"
            aria-label="Previous article"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>

          <button
            onClick={goNext}
            className="insights-carousel-arrow insights-carousel-arrow--right"
            aria-label="Next article"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Track */}
      <div className="insights-carousel-viewport">
        <div
          ref={trackRef}
          className="insights-carousel-track"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% + ${window.innerWidth <= 640 ? 25 : 0
              }%))`,
          }}
        >
          {articles.map((item) => (
            <div key={item.slug} className="insights-carousel-slide">
              <NewsCard
                article={{
                  ...item,
                  createdAt: item.createdAt || new Date().toISOString(),
                  imageUrl: item.imageUrl || item.cover?.url,
                  source: item.source || "example",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="insights-carousel-dots">
        {articles.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`insights-carousel-dot ${i === currentIndex ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
