import type { BlogPostSummary } from "@/lib/blog/types";

export function recommendPosts(params: {
  currentSlug: string;
  posts: readonly BlogPostSummary[];
  preferredTag?: string;
  limit?: number;
}): BlogPostSummary[] {
  const limit = params.limit ?? 3;
  const filtered = params.posts.filter((post) => post.slug !== params.currentSlug);
  const byTag = params.preferredTag
    ? filtered.filter((post) => post.tag === params.preferredTag)
    : [];
  const remaining = filtered.filter((post) => !byTag.includes(post));

  const byDateDesc = (a: BlogPostSummary, b: BlogPostSummary) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

  return [...byTag.sort(byDateDesc), ...remaining.sort(byDateDesc)].slice(0, limit);
}

