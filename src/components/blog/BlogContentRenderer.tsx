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
              <h2 key={index} className="mt-20 text-left text-[1.9rem] md:text-[2.4rem] font-black leading-[1.08] tracking-tighter text-black" style={{ fontFamily: 'var(--font-display)' }}>
                {block.text}
              </h2>
            );
          }

          if (block.type === "h3") {
            return (
              <h3 key={index} className="mt-12 text-left text-[1.3rem] md:text-[1.6rem] font-black leading-tight tracking-tighter text-black" style={{ fontFamily: 'var(--font-display)' }}>
                {block.text}
              </h3>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={index} className="mt-8 space-y-4 pl-6 text-[1.06rem] leading-8 text-black/80 md:text-[1.1rem]">
                {block.items.map((item) => (
                  <li key={item} className="list-disc pl-2 marker:text-black/30 font-medium">
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

          if (block.type === "image") {
            return (
              <figure key={index} className="my-12 overflow-hidden rounded-[1.5rem] border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="h-auto w-full object-cover" />
                {block.caption ? (
                  <figcaption className="px-6 py-4 text-sm leading-relaxed text-gray-600">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          if (block.type === "references") {
            return (
              <section key={index} className="mt-16 border-t border-gray-200 pt-10">
                <h2 className="mb-6 text-2xl font-black tracking-tight text-black">
                  {block.title ?? "References & citations"}
                </h2>
                <ol className="space-y-3">
                  {block.items.map((item) => (
                    <li key={item.id} id={`ref-${item.id}`} className="text-sm leading-relaxed text-gray-700">
                      <span className="font-bold text-black">[{item.id}]</span>{" "}
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline">
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          }

          return (
            <p key={index} className="mt-8 text-[1.08rem] leading-8 text-black/80 font-medium md:text-[1.12rem]">
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
