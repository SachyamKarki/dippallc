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

interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

function formatDate(date?: string) {
  return date
    ? new Date(date).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
}

export default function BlogArticlePage() {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fcfbf8] text-slate-900">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
          <div className="flex justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />
          </div>
        </div>
      </main>
    );
  }

  const articleTitle = examplePost?.title ?? post?.title ?? "Article";
  const articleTag = examplePost?.tag ?? post?.tag ?? "Insights";
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
      <main className="min-h-screen bg-[#fcfbf8] text-slate-900">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-28 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Article</p>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] text-slate-950 md:text-5xl">Article not found.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            The article may have been moved or removed. You can return to the archive or continue with a recommended read.
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/blogs" className="button-secondary">
              Back to articles
            </Link>
          </div>

          {recommended.length > 0 ? (
            <section className="mt-16 text-left">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-950">Recommended reading</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
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
    <main className="min-h-screen bg-[#fcfbf8] text-slate-900">
      <article className="pb-24 pt-20 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900"
          >
            <span>&larr;</span>
            Back to articles
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div>
              <header className="border-b border-stone-200 pb-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700">
                    {articleTag}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{formatDate(articleDate)}</span>
                  {readingTime ? (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{readingTime} min read</span>
                  ) : null}
                </div>

                <h1 className="mt-6 max-w-5xl text-left text-[clamp(2.7rem,5vw,4.9rem)] font-bold leading-[0.98] tracking-[-0.065em] text-slate-950">
                  {articleTitle}
                </h1>

                <p className="mt-6 max-w-3xl text-[1.04rem] leading-8 text-slate-600 md:text-[1.12rem]">
                  {articleExcerpt}
                </p>
              </header>

              <div className="mt-8 overflow-hidden rounded-[1.4rem] border border-stone-200 bg-stone-100">
                <div className="relative aspect-[16/8]">
                  {post?.image_url ? (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      unoptimized
                      sizes="(max-width: 1280px) 100vw, 1040px"
                      className="object-cover"
                      priority
                    />
                  ) : examplePost?.cover?.background ? (
                    <div className="absolute inset-0" style={{ backgroundImage: examplePost.cover.background }} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                      No preview available
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 max-w-3xl">
                <BlogContentRenderer blocks={examplePost?.content} fallbackText={post?.text} />

                <div className="mt-14 border-t border-stone-200 pt-8">
                  <a
                    href={`mailto:hello@dippa.com?subject=${encodeURIComponent(`Re: ${articleTitle}`)}`}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-900 transition hover:text-blue-700"
                  >
                    Discuss this article
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            <aside>
              <div className="space-y-5 lg:sticky lg:top-24">
                <div className="rounded-[1.4rem] border border-stone-200 bg-white p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Article details</p>
                  <dl className="mt-4 space-y-4">
                    <div className="border-b border-stone-100 pb-4">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Published</dt>
                      <dd className="mt-1 text-sm font-semibold text-slate-800">{formatDate(articleDate)}</dd>
                    </div>
                    <div className="border-b border-stone-100 pb-4">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Category</dt>
                      <dd className="mt-1 text-sm font-semibold text-slate-800">{articleTag}</dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Reading time</dt>
                      <dd className="mt-1 text-sm font-semibold text-slate-800">{readingTime ? `${readingTime} minutes` : "Article"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-[1.4rem] border border-stone-200 bg-white p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Reader signal</p>
                  <div className="mt-4">
                    <ArticleVote
                      slug={articleSlug}
                      initialUpvotes={examplePost?.initialUpvotes ?? 0}
                      initialDownvotes={examplePost?.initialDownvotes ?? 0}
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {recommended.length > 0 ? (
            <section className="mt-20 border-t border-stone-200 pt-12">
              <div className="max-w-3xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Continue reading</p>
                <h2 className="mt-4 text-left text-3xl font-bold tracking-[-0.05em] text-slate-950">More articles from the archive</h2>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
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
