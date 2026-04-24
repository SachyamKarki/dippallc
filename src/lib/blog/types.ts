export type BlogPostSource = "example" | "backend";

export type BlogContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "code"; code: string; language?: string };

export type BlogPost = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  createdAt: string; // ISO date
  source: BlogPostSource;
  cover?: {
    kind: "gradient";
    className: string;
  };
  readingTimeMinutes?: number;
  initialUpvotes: number;
  initialDownvotes: number;
  content: BlogContentBlock[];
};

export type BlogPostSummary = Pick<
  BlogPost,
  "slug" | "title" | "tag" | "excerpt" | "createdAt" | "source" | "cover" | "readingTimeMinutes"
>;

