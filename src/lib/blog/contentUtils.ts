import type { BlogContentBlock } from "@/lib/blog/types";
import { estimateReadingTimeMinutes } from "@/lib/blog/utils";

export function csImage(
  slug: string,
  name: string,
  alt: string,
  caption?: string,
  credit?: string,
): BlogContentBlock {
  return {
    type: "image",
    src: `/images/case-studies/${slug}/${name}.jpg`,
    alt,
    caption,
    credit,
  };
}

export function extractTextFromBlocks(blocks: readonly BlogContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "p":
        case "h2":
        case "h3":
          return block.text;
        case "ul":
          return block.items.join(" ");
        case "quote":
          return block.text;
        case "code":
          return block.code;
        case "image":
          return `${block.alt} ${block.caption ?? ""}`;
        case "references":
          return block.items.map((item) => item.text).join(" ");
        default:
          return "";
      }
    })
    .join(" ");
}

export function countWordsInBlocks(blocks: readonly BlogContentBlock[]): number {
  const text = extractTextFromBlocks(blocks);
  return text.split(/\s+/g).filter(Boolean).length;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractDocHeadings(
  blocks: readonly BlogContentBlock[],
): { id: string; text: string }[] {
  const seen = new Map<string, number>();
  const headings: { id: string; text: string }[] = [];

  for (const block of blocks) {
    if (block.type !== "h2") continue;
    const base = slugifyHeading(block.text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count > 0 ? `${base}-${count + 1}` : base;
    headings.push({ id, text: block.text });
  }

  return headings;
}

export function headingId(text: string, _index: number, prior: readonly string[]): string {
  const base = slugifyHeading(text);
  const duplicates = prior.filter((t) => slugifyHeading(t) === base).length;
  return duplicates > 0 ? `${base}-${duplicates + 1}` : base;
}

export function readingTimeFromBlocks(blocks: readonly BlogContentBlock[]): number {
  return estimateReadingTimeMinutes(extractTextFromBlocks(blocks));
}
