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
              <h2 key={index} className="mt-16 text-left text-[1.95rem] font-bold leading-tight tracking-[-0.045em] text-slate-950">
                {block.text}
              </h2>
            );
          }

          if (block.type === "h3") {
            return (
              <h3 key={index} className="mt-10 text-left text-[1.4rem] font-bold leading-tight tracking-[-0.03em] text-slate-900">
                {block.text}
              </h3>
            );
          }

          if (block.type === "ul") {
            return (
              <ul key={index} className="mt-6 space-y-3 pl-5 text-[1.02rem] leading-8 text-slate-700">
                {block.items.map((item) => (
                  <li key={item} className="list-disc pl-1 marker:text-slate-400">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "quote") {
            return (
              <figure key={index} className="mt-12 rounded-[1.5rem] border border-stone-200 bg-white px-7 py-7 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <blockquote className="text-[1.2rem] font-medium leading-9 tracking-[-0.03em] text-slate-900">
                  &ldquo;{block.text}&rdquo;
                </blockquote>
                {block.attribution ? (
                  <figcaption className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {block.attribution}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          if (block.type === "code") {
            return (
              <pre key={index} className="mt-8 overflow-x-auto rounded-[1.4rem] bg-slate-950 px-6 py-6 text-sm leading-7 text-slate-100">
                <code>{block.code}</code>
              </pre>
            );
          }

          return (
            <p key={index} className="mt-6 text-[1.06rem] leading-8 text-slate-700">
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
    <div>
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="mt-6 text-[1.06rem] leading-8 text-slate-700 whitespace-pre-wrap">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
