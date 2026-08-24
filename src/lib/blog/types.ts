export type BlogPostSource = "example" | "backend";

export type CaseStudyReference = {
  id: string;
  text: string;
  url?: string;
};

export type BlogContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; code: string; language?: string }
  | { type: "image"; src: string; alt: string; caption?: string; credit?: string }
  | { type: "references"; title?: string; items: readonly CaseStudyReference[] };

export type CaseStudyCategory = "AI" | "Networking" | "Security";

export type CaseStudyMetric = {
  label: string;
  value: string;
  suffix?: string;
};

export type CaseStudyReview = {
  summary: string;
  strengths: readonly string[];
  risks: readonly string[];
  verdict: string;
};

export type CaseStudyMeta = {
  industry: string;
  engagement: string;
  stack: readonly string[];
  metrics: readonly CaseStudyMetric[];
  review: CaseStudyReview;
};

export type BlogPost = {
  slug: string;
  title: string;
  tag: string;
  category: CaseStudyCategory;
  excerpt: string;
  createdAt: string;
  source: BlogPostSource;
  cover?:
    | { kind: "gradient"; background: string }
    | { kind: "image"; src: string };
  readingTimeMinutes?: number;
  initialUpvotes: number;
  initialDownvotes: number;
  caseStudy?: CaseStudyMeta;
  content: readonly BlogContentBlock[];
};

export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "tag" | "excerpt" | "createdAt" | "source" | "cover" | "readingTimeMinutes" | "caseStudy"
> & {
  category?: CaseStudyCategory;
};

export type BlogPreview = BlogPostSummary & {
  imageUrl?: string;
};
