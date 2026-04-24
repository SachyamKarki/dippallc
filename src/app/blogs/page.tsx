"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getExamplePostSummaries } from "@/lib/blog/examplePosts";

interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

type ArticleCard = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  imageUrl?: string;
  coverClassName?: string;
  createdAt: string;
  source: "backend" | "example";
  readingTimeMinutes?: number;
};

export default function BlogsPage() {
  const [remotePosts, setRemotePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/posts/");
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

  const exampleSummaries = getExamplePostSummaries();
  const cards: ArticleCard[] = [
    ...remotePosts.map((post) => ({
      slug: String(post.id),
      title: post.title,
      tag: post.tag,
      excerpt: post.text,
      imageUrl: post.image_url || undefined,
      createdAt: post.created_at,
      source: "backend" as const,
    })),
    ...exampleSummaries.map((post) => ({
      slug: post.slug,
      title: post.title,
      tag: post.tag,
      excerpt: post.excerpt,
      coverClassName: post.cover?.className,
      createdAt: post.createdAt,
      readingTimeMinutes: post.readingTimeMinutes,
      source: "example" as const,
    })),
  ]
    .filter((post, index, list) => list.findIndex((other) => other.slug === post.slug) === index)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="pt-24 pb-12 md:pt-28 md:pb-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-600">
            Dippa Insights
          </div>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,5vw,5rem)] font-bold tracking-[-0.06em] text-slate-950 leading-[0.96]">
            Articles built for operators.
          </h1>
          <p className="mt-5 max-w-3xl text-[1.05rem] md:text-xl text-slate-600 leading-relaxed">
            Practical notes on delivery systems, AI orchestration, and product engineering, written with the same clarity and precision we bring to client work.
          </p>
        </div>
      </header>

      <section className="pb-24 md:pb-28">
        <div className="max-w-[1500px] mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
            </div>
          ) : cards.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-7">
              {cards.map((post) => (
                <Link
                  key={`${post.source}:${post.slug}`}
                  href={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-slate-200/80 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_26px_80px_rgba(15,23,42,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-slate-100">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1279px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${post.coverClassName ?? "from-slate-900/5 via-white to-blue-600/10"}`}
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/5" />
                  </div>

                  <div className="flex h-full flex-col px-1 pt-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
                        {post.tag}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="mt-4 text-[1.35rem] font-bold tracking-[-0.04em] leading-[1.12] text-slate-950 text-left transition-colors group-hover:text-blue-700">
                      {post.title}
                    </h2>

                    <p className="mt-4 line-clamp-4 text-[0.98rem] leading-7 text-slate-600">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        {post.readingTimeMinutes ? `${post.readingTimeMinutes} min read` : "Article"}
                      </span>
                      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-900">
                        Read article
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 rounded-[3rem] bg-slate-50 border border-slate-100">
              <p className="text-slate-400 font-medium">No blogs published yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
