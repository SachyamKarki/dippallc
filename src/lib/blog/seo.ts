import type { BlogPost } from "@/lib/blog/types";

const SITE = "https://dippa.group";

export function caseStudyCanonical(slug: string) {
  return `${SITE}/news/${slug}`;
}

export function caseStudyKeywords(post: BlogPost): string[] {
  const stack = post.caseStudy?.stack.slice(0, 4) ?? [];
  return [
    post.category,
    post.tag,
    "case study",
    "Dippa",
    `${post.category} case study`,
    ...stack,
  ];
}

export function buildCaseStudyMetadata(post: BlogPost) {
  const url = caseStudyCanonical(post.slug);
  const cover = post.cover?.kind === "image" ? post.cover.src : "/og-image.png";

  return {
    title: post.title,
    description: post.excerpt,
    keywords: caseStudyKeywords(post),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article" as const,
      publishedTime: post.createdAt,
      section: post.category,
      tags: [post.tag, post.category, "case study"],
      images: [{ url: cover, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.title,
      description: post.excerpt,
      images: [cover],
    },
  };
}

export function caseStudyJsonLd(post: BlogPost) {
  const url = caseStudyCanonical(post.slug);
  const image =
    post.cover?.kind === "image"
      ? `${SITE}${post.cover.src}`
      : `${SITE}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: { "@type": "Organization", name: "Dippa", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Dippa",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/og-image.png` },
    },
    image,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    keywords: caseStudyKeywords(post).join(", "),
  };
}
