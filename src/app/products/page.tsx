"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allProducts } from "@/lib/data";

const FILTER_ALL = "all" as const;
const PAGE_SIZE = 12;

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function toLabel(value: string) {
  return normalizeWhitespace(value || "");
}

export default function ProductsPage() {
  const products = allProducts;

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => toLabel(p.category)).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const [activeFilter, setActiveFilter] = useState<string>(FILTER_ALL);
  const [page, setPage] = useState(1);

  const visible =
    activeFilter === FILTER_ALL
      ? products
      : products.filter((p) => toLabel(p.category).toLowerCase() === activeFilter.toLowerCase());

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));

  useEffect(() => {
    setPage((current) => Math.min(Math.max(1, current), totalPages));
  }, [totalPages]);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndexExclusive = Math.min(visible.length, startIndex + PAGE_SIZE);
  const pageItems = visible.slice(startIndex, endIndexExclusive);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const current = page;
    const set = new Set<number>([1, totalPages, current, current - 1, current + 1]);
    const clamped = Array.from(set).filter((n) => n >= 1 && n <= totalPages);
    return clamped.sort((a, b) => a - b);
  }, [page, totalPages]);

  function selectFilter(next: string) {
    setActiveFilter(next);
    setPage(1);
  }

  return (
    <main className="projects-page">
      <section className="projects-hero">
        <div className="projects-shell section-shell">
          <h1 className="projects-title">PROJECTS</h1>
          <p className="projects-summary">
            A small catalogue of the systems we build and the engagements we run. Each one is designed to produce real operating leverage, not vanity output.
          </p>

          <div className="projects-tabs" role="tablist" aria-label="Project categories">
            <button
              type="button"
              className={`projects-tab ${activeFilter === FILTER_ALL ? "projects-tab-active" : ""}`}
              onClick={() => selectFilter(FILTER_ALL)}
              aria-pressed={activeFilter === FILTER_ALL}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`projects-tab ${activeFilter === category ? "projects-tab-active" : ""}`}
                onClick={() => selectFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="projects-shell section-shell">
          {pageItems.length > 0 ? (
            <>
              <div className="projects-grid">
              {pageItems.map((product, index) => (
                <Link
                  key={product.name}
                  href={product.href}
                  className="projects-card"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="projects-media">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      className="projects-image"
                      priority={index < 2}
                    />
                  </div>

                  <div className="projects-body">
                    <div className="projects-meta">
                      <span>{product.category}</span>
                      <span className="projects-meta-right">Delivery</span>
                    </div>

                    <h2 className="projects-card-title">{product.name}</h2>
                    <p className="projects-card-excerpt">{product.description}</p>

                    <div className="projects-footer">
                      <span>Learn more</span>
                      <span className="projects-link">View</span>
                    </div>
                  </div>
                </Link>
              ))}
              </div>

              {totalPages > 1 ? (
                <nav className="projects-pagination" aria-label="Projects pagination">
                  <div className="projects-pagination-left">
                    <span className="projects-pagination-label">
                      Showing {startIndex + 1}–{endIndexExclusive} of {visible.length}
                    </span>
                  </div>

                  <div className="projects-pagination-controls">
                    <button
                      type="button"
                      className="projects-page-btn"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                      Prev
                    </button>

                    <div className="projects-page-numbers" aria-label="Page numbers">
                      {pageNumbers.map((n, idx) => {
                        const prev = pageNumbers[idx - 1];
                        const showDots = prev !== undefined && n - prev > 1;
                        return (
                          <span key={n} className="projects-page-number-wrap">
                            {showDots ? <span className="projects-page-dots">…</span> : null}
                            <button
                              type="button"
                              className={`projects-page-number ${page === n ? "projects-page-number-active" : ""}`}
                              onClick={() => setPage(n)}
                              aria-current={page === n ? "page" : undefined}
                            >
                              {n}
                            </button>
                          </span>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="projects-page-btn"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      aria-label="Next page"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="projects-empty">
              <p className="projects-empty-copy">No projects match this category.</p>
            </div>
          )}

          <div className="projects-home-row">
            <Link href="/" className="projects-home-link">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
