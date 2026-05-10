"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArticleVote from "@/components/blog/ArticleVote";
import BlogCard from "@/components/blog/BlogCard";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";
import { getExamplePost, getExamplePostSummaries } from "@/lib/blog/examplePosts";
import { recommendPosts } from "@/lib/blog/recommendations";
import { formatDate } from "@/lib/blog/utils";
import { Post } from "@/types";

const DUMMY_AUTHORS = [
  "Phoenix Baker",
  "Lana Steiner",
  "Alec Whitten",
  "Demi Wilkinson",
  "Candice Wu",
  "Natali Craig",
  "Drew Cano",
  "Orlando Diggs"
];

function getAuthorForSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash << 5) - hash + slug.charCodeAt(i);
  return DUMMY_AUTHORS[Math.abs(hash) % DUMMY_AUTHORS.length];
}

function getFallbackImageForSlug(slug: string) {
  const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash << 5) - hash + slug.charCodeAt(i);
  return FALLBACK_IMAGES[Math.abs(hash) % FALLBACK_IMAGES.length];
}


export default function NewsArticlePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const examplePost = id ? getExamplePost(id) : undefined;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      if (examplePost) {
        setPost(null);
        setNotFound(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setNotFound(false);

      try {
        const res = await fetch(`http://localhost:8000/api/posts/${encodeURIComponent(id)}/`);

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        const data = (await res.json()) as Post;
        setPost(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [examplePost, id]);

  const isComingSoon = true;

  if (isComingSoon) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-white pt-24">
        <div className="text-center px-6 section-shell">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-[#0a0a0a] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            COMING SOON
          </h1>
          <p className="text-lg text-[#0a0a0a]/70 font-medium max-w-xl mx-auto mb-12">
            We are currently curating and formatting our technical research articles. The full editorial piece will be available shortly.
          </p>
          <Link href="/news" className="button-primary px-8 py-4 text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            Return to Newsroom
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#111]">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
          <div className="flex justify-center py-48">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-100 border-t-[#1E293B]" />
          </div>
        </div>
      </main>
    );
  }

  const articleTitle = examplePost?.title ?? post?.title ?? "Article";
  const articleTag = examplePost?.tag ?? post?.tag ?? "Deep Tech";
  const articleDate = examplePost?.createdAt ?? post?.created_at;
  const articleSlug = id ?? "article";
  const articleExcerpt = examplePost?.excerpt ?? post?.text ?? "";
  const readingTime = examplePost?.readingTimeMinutes;

  const recommended = recommendPosts({
    currentSlug: articleSlug,
    posts: getExamplePostSummaries(),
    preferredTag: articleTag,
    limit: 3,
  });

  if (notFound || (!examplePost && !post)) {
    return (
      <main className="min-h-screen bg-white text-[#111]">
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-48 text-center uppercase sm:px-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">Article</p>
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-[#111] md:text-5xl">Article not found.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-500 normal-case tracking-normal">
            The technical report you are looking for has been archived or relocated. 
            Browse our recommended deep dives below or return to the main newsroom.
          </p>
          <div className="mt-12 flex justify-center">
            <Link href="/news" className="button-primary text-[10px] hover:bg-[#1E293B]">
              RETURN TO NEWSROOM
            </Link>
          </div>

          {recommended.length > 0 ? (
            <section className="mt-24 border-t border-gray-100 pt-16 text-left">
              <div className="mb-10 text-center">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">Recommended</p>
                <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-950 md:text-3xl">Recommended reading</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {recommended.map((article) => (
                  <BlogCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <article className="pb-32 pt-28 md:pb-40 md:pt-36">
        <div className="mx-auto max-w-[1360px] px-6 sm:px-12">
          <Link
            href="/news"
            className="mb-12 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 transition hover:text-[#111]"
          >
            &larr; Back to Archive
          </Link>

          <header className="mb-20 border-b border-gray-100 pb-14">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <span className="inline-flex min-h-8 items-center rounded-full bg-[#1E293B] px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  {articleTag}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                  {articleDate ? formatDate(articleDate, { month: "long" }) : ""}
                </span>
                {readingTime ? (
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                    {readingTime} min read
                  </span>
                ) : null}
              </div>

              <h1 className="text-[clamp(2.9rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[#111]">
                {articleTitle}
              </h1>

              {articleExcerpt && (
                <p className="mt-8 max-w-3xl text-lg leading-8 text-[#4b5563] md:text-[1.45rem] md:leading-10">
                  {articleExcerpt}
                </p>
              )}

              <div className="mt-10 flex flex-col gap-6 rounded-[1.75rem] border border-gray-100 bg-[#fafaf8] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[11px] font-bold uppercase text-[#475569] shadow-sm">
                    {getAuthorForSlug(articleSlug).split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Written by</p>
                    <p className="text-base font-bold text-[#111]">{getAuthorForSlug(articleSlug)}</p>
                  </div>
                </div>

                <div className="grid gap-4 text-sm text-[#4b5563] sm:grid-cols-2 md:min-w-[320px]">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Published</p>
                    <p className="text-sm font-medium text-[#111]">{articleDate ? formatDate(articleDate, { month: "long" }) : ""}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Category</p>
                    <p className="text-sm font-medium text-[#111]">{articleTag}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="mb-20 overflow-hidden rounded-[2rem] border border-gray-100 bg-gray-50 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="relative aspect-[16/9]">
              <Image
                src={post?.image_url || getFallbackImageForSlug(articleSlug)}
                alt={articleTitle}
                fill
                unoptimized
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="mx-auto w-full max-w-3xl">
              <div className="max-w-none text-[#334155] leading-relaxed selection:bg-black selection:text-white">
                <BlogContentRenderer blocks={examplePost?.content} fallbackText={post?.text} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[1.75rem] border border-gray-100 bg-[#fafaf8] p-6">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">Article Summary</p>
                <div className="space-y-5">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Category</p>
                    <p className="text-sm font-semibold text-[#111]">{articleTag}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Published</p>
                    <p className="text-sm font-semibold text-[#111]">{articleDate ? formatDate(articleDate, { month: "long" }) : ""}</p>
                  </div>
                  {readingTime ? (
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Reading Time</p>
                      <p className="text-sm font-semibold text-[#111]">{readingTime} minutes</p>
                    </div>
                  ) : null}
                  <div className="border-t border-gray-200 pt-5">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">Continue exploring</p>
                    <Link href="/news" className="inline-flex items-center text-sm font-semibold text-[#111] transition hover:text-[#1E293B]">
                      Browse all articles &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-24 border-t border-gray-100 pt-14">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-[0_18px_44px_rgba(15,23,42,0.04)] md:p-10">
              <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">Reader Response</p>
                  <h2 className="text-2xl font-bold tracking-tight text-[#111] md:text-3xl">Was this article useful?</h2>
                  <p className="mt-3 text-base leading-8 text-[#4b5563]">
                    Your feedback helps shape the next set of research notes, deep dives, and engineering briefings.
                  </p>
                </div>

                <div className="md:text-right">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">Engagement</p>
                  <a
                    href={`mailto:hello@dippa.com?subject=${encodeURIComponent(`Re: ${articleTitle}`)}`}
                    className="button-primary text-[10px]"
                  >
                    Discuss this article
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <ArticleVote
                  slug={articleSlug}
                  initialUpvotes={examplePost?.initialUpvotes ?? 0}
                  initialDownvotes={examplePost?.initialDownvotes ?? 0}
                />
              </div>
            </div>
          </footer>

          {recommended.length > 0 ? (
            <section className="mt-32 border-t border-gray-100 pt-20">
              <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">Archive Recommendation</p>
                  <h2 className="text-3xl font-bold tracking-tight text-[#111] md:text-4xl">More from the Tech Archive</h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-[#4b5563]">
                  Continue with adjacent research, systems commentary, and operator-focused briefings from the archive.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {recommended.map((article) => (
                  <BlogCard key={article.slug} article={article} variant="compact" />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
