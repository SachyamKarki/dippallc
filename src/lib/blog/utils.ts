export function formatDate(date: string, options: { month?: "short" | "long" } = {}) {
  return new Date(date).toLocaleDateString(undefined, {
    month: options.month || "short",
    day: "numeric",
    year: "numeric",
  });
}

export function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function stripMarkup(value: string) {
  return (
    value
      // Remove HTML tags.
      .replace(/<[^>]+>/g, " ")
      // Remove Markdown images.
      .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
      // Replace Markdown links with link text.
      .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
      // Remove inline code backticks.
      .replace(/`([^`]+)`/g, "$1")
  );
}

export function firstParagraph(value: string) {
  const normalized = value.replace(/\r/g, "").trim();
  const paragraphs = normalized
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean);
  return paragraphs[0] ?? "";
}

export function toCardExcerpt(raw: string, maxLen = 180) {
  const base = normalizeWhitespace(stripMarkup(firstParagraph(raw || "")));
  if (!base) return "";
  if (base.length <= maxLen) return base;
  const clipped = base.slice(0, maxLen);
  const lastSpace = clipped.lastIndexOf(" ");
  return (lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped) + "...";
}

export function toCardTitle(title: string) {
  return normalizeWhitespace(title);
}

export function estimateReadingTimeMinutes(text: string) {
  const wordsPerMinute = 225;
  const wordCount = text.split(/\s+/g).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function safeTime(val: string) {
  const t = new Date(val).getTime();
  return isNaN(t) ? 0 : t;
}
