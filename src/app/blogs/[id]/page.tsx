"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ArticleVote from "@/components/blog/ArticleVote";
import { getExamplePost, getExamplePostSummaries } from "@/lib/blog/examplePosts";
import { recommendPosts } from "@/lib/blog/recommendations";
import type { BlogContentBlock } from "@/lib/blog/types";

interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

function renderBlocks(blocks: readonly BlogContentBlock[]) {
  return blocks.map((block, index) => {
    if (block.type === "h2") {
      return (
        <h2 key={index} className="mt-12 text-2xl md:text-3xl font-black tracking-tight text-slate-900">
          {block.text}
        </h2>
      );
    }

    if (block.type === "h3") {
      return (
        <h3 key={index} className="mt-10 text-xl md:text-2xl font-bold tracking-tight text-slate-900">
          {block.text}
        </h3>
      );
    }

    if (block.type === "ul") {
      return (
        <ul key={index} className="mt-6 space-y-2 pl-5 text-slate-700">
          {block.items.map((item) => (
            <li key={item} className="list-disc leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }

    if (block.type === "quote") {
      return (
        <figure key={index} className="mt-10 rounded-4xl border border-slate-200 bg-slate-50 px-6 py-6">
          <blockquote className="text-slate-800 text-lg leading-relaxed">“{block.text}”</blockquote>
          {block.attribution ? (
            <figcaption className="mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    if (block.type === "code") {
      return (
        <pre key={index} className="mt-8 overflow-x-auto rounded-4xl bg-slate-950 px-6 py-6 text-slate-100 text-sm leading-relaxed">
          <code>{block.code}</code>
        </pre>
      );
    }

    return (
      <p key={index} className="mt-6 text-slate-700 text-lg leading-relaxed">
        {block.text}
      </p>
    );
  });
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
      <main className="min-h-screen bg-white text-slate-900">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
          </div>
        </div>
      </main>
    );
  }

  const articleTitle = examplePost?.title ?? post?.title;
  const articleTag = examplePost?.tag ?? post?.tag;
  const articleDate = examplePost?.createdAt ?? post?.created_at;
  const articleExcerpt = examplePost?.excerpt ?? post?.text ?? "";
  const articleSlug = id ?? "article";

  const recommended = recommendPosts({
    currentSlug: articleSlug,
    posts: getExamplePostSummaries(),
    preferredTag: articleTag,
    limit: 3,
  });

  if (notFound || (!examplePost && !post)) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog not found.</h1>
          <p className="mt-4 text-slate-500">The link may be broken, or the blog has been unpublished.</p>
          <div className="mt-10 flex justify-center">
            <Link href="/blogs" className="button-secondary">
              Back to Blogs
            </Link>
          </div>

          {recommended.length > 0 ? (
            <div className="mt-14 text-left">
              <h2 className="text-xl font-black tracking-tight text-slate-900">Recommended articles</h2>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommended.map((rec) => (
                  <Link
                    key={rec.slug}
                    href={`/blogs/${rec.slug}`}
                    className="rounded-4xl border border-slate-200 bg-white px-5 py-5 hover:border-slate-300 transition"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">{rec.tag}</div>
                    <div className="mt-3 font-bold text-slate-900 leading-snug">{rec.title}</div>
                    <div className="mt-3 text-sm text-slate-600 line-clamp-3">{rec.excerpt}</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <article className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/blogs" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition">
              ← Back to Blogs
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {articleDate
                ? new Date(articleDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                : null}
            </span>
          </div>

          <div className="mt-10">
            <span className="inline-flex text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
              {articleTag}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">{articleTitle}</h1>
            {examplePost?.readingTimeMinutes ? (
              <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {examplePost.readingTimeMinutes} min read
              </div>
            ) : null}
          </div>

          <div className="mt-10 relative aspect-video overflow-hidden rounded-4xl bg-slate-100">
            {post?.image_url ? (
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                unoptimized
                sizes="(max-width: 900px) 100vw, 900px"
                className="object-cover"
                priority
              />
            ) : examplePost?.cover?.className ? (
              <div className={`absolute inset-0 bg-linear-to-br ${examplePost.cover.className}`} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-xs">
                No Preview Available
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/5" />
          </div>

          <div className="mt-10">
            <ArticleVote
              slug={articleSlug}
              initialUpvotes={examplePost?.initialUpvotes ?? 0}
              initialDownvotes={examplePost?.initialDownvotes ?? 0}
            />
          </div>

          <div className="mt-12">
            {examplePost ? (
              renderBlocks(examplePost.content)
            ) : (
              <>
                {articleExcerpt
                  .split(/\n\s*\n/g)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p key={idx} className="mt-6 text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {paragraph}
                    </p>
                  ))}
              </>
            )}
          </div>

          {recommended.length > 0 ? (
            <section className="mt-20 pt-12 border-t border-slate-100">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Recommended articles</h2>
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommended.map((rec) => (
                  <Link
                    key={rec.slug}
                    href={`/blogs/${rec.slug}`}
                    className="group rounded-4xl border border-slate-200 bg-white px-5 py-5 hover:border-slate-300 transition"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">{rec.tag}</div>
                    <div className="mt-3 font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {rec.title}
                    </div>
                    <div className="mt-3 text-sm text-slate-600 line-clamp-3">{rec.excerpt}</div>
                    <div className="mt-5 text-[10px] font-black uppercase tracking-widest text-slate-900">
                      Read →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-16 pt-10 border-t border-slate-100 flex justify-between items-center gap-4">
            <Link href="/blogs" className="button-secondary">
              Back to Blogs
            </Link>
            <a
              href={`mailto:hello@dippa.com?subject=${encodeURIComponent(`Re: ${articleTitle ?? "Article"}`)}`}
              className="text-xs font-black uppercase tracking-widest text-slate-900 hover:underline underline-offset-4"
            >
              Discuss this
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
