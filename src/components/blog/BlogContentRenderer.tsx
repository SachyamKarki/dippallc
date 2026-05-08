import type { BlogContentBlock } from "@/lib/blog/types";

export default function BlogContentRenderer(props: {
  blocks?: readonly BlogContentBlock[];
  fallbackText?: string;
}) {
  if (props.blocks?.length) {
    return (
      <div className="space-y-0">
        {props.blocks.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2 key={index} className="mt-20 text-left text-[1.9rem] md:text-[2.4rem] font-bold leading-[1.08] tracking-[-0.04em] text-[#0f172a]">
                {block.text}
              </h2>
            );
          }

          if (block.type === "h3") {
            return (
              <h3 key={index} className="mt-12 text-left text-[1.3rem] md:text-[1.6rem] font-bold leading-tight tracking-[-0.03em] text-[#1e293b]">
                {block.text}
              </h3>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={index} className="mt-8 space-y-4 pl-6 text-[1.06rem] leading-8 text-[#334155] md:text-[1.1rem]">
                {block.items.map((item) => (
                  <li key={item} className="list-disc pl-2 marker:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "quote") {
            return (
              <figure key={index} className="my-[4.5rem] rounded-r-[1.75rem] border-l-4 border-[#111] bg-[#fafaf8] px-8 py-8 md:px-10">
                <blockquote className="text-2xl md:text-[2rem] font-medium leading-[1.45] tracking-[-0.03em] text-[#0f172a] italic">
                  &ldquo;{block.text}&rdquo;
                </blockquote>
                {block.attribution ? (
                  <figcaption className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">
                    {block.attribution}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          if (block.type === "code") {
            return (
              <pre key={index} className="mt-12 overflow-x-auto rounded-[1.5rem] border border-gray-100 bg-gray-50 px-6 py-6 text-sm leading-7 text-[#1f2937] md:px-8 md:py-8">
                <code className="font-mono">{block.code}</code>
              </pre>
            );
          }

          return (
            <p key={index} className="mt-8 text-[1.08rem] leading-8 text-[#334155] md:text-[1.12rem]">
              {block.text}
            </p>
          );
        })}
      </div>
    );
  }

  const paragraphs = (props.fallbackText ?? "")
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-[1.08rem] leading-8 text-[#334155] whitespace-pre-wrap md:text-[1.12rem]">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
