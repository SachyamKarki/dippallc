import ProgressiveImage from "@/components/ui/ProgressiveImage";
import { headingId } from "@/lib/blog/contentUtils";
import type { BlogContentBlock } from "@/lib/blog/types";

function renderParagraph(text: string, key: number) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <p key={key} className="case-study-p">
      {parts.map((part, partIndex) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (match) {
          return (
            <sup key={partIndex} className="case-study-cite-ref">
              <a href={`#ref-${match[1]}`}>[{match[1]}]</a>
            </sup>
          );
        }
        return part;
      })}
    </p>
  );
}

export default function CaseStudyContent({ blocks }: { blocks: readonly BlogContentBlock[] }) {
  const h2Texts: string[] = [];

  return (
    <div className="case-study-content case-study-prose">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          const id = headingId(block.text, index, h2Texts);
          h2Texts.push(block.text);
          return (
            <h2 key={index} id={id} className="case-study-h2">
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3 key={index} className="case-study-h3">
              {block.text}
            </h3>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={index} className="case-study-ul">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <figure key={index} className="case-study-quote">
              <blockquote>&ldquo;{block.text}&rdquo;</blockquote>
              {block.attribution ? (
                <figcaption>{block.attribution}</figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "code") {
          return (
            <figure key={index} className="case-study-code">
              {block.language ? (
                <figcaption className="case-study-code-lang">{block.language}</figcaption>
              ) : null}
              <pre
                translate="no"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
              >
                <code>{block.code}</code>
              </pre>
            </figure>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={index} className="case-study-figure">
              <div className="case-study-figure-media">
                <ProgressiveImage
                  src={block.src}
                  alt={block.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 720px"
                  quality={80}
                  className="case-study-figure-img"
                />
              </div>
              {block.caption ? (
                <figcaption className="case-study-figure-caption">{block.caption}</figcaption>
              ) : null}
              {block.credit ? (
                <p className="case-study-figure-credit">{block.credit}</p>
              ) : null}
            </figure>
          );
        }

        if (block.type === "references") {
          return (
            <section key={index} className="case-study-references" aria-labelledby={`refs-${index}`}>
              <h2 id={`refs-${index}`} className="case-study-h2">
                {block.title ?? "References"}
              </h2>
              <ol className="case-study-ref-list">
                {block.items.map((item) => (
                  <li key={item.id} id={`ref-${item.id}`} className="case-study-ref-item">
                    <span className="case-study-ref-id">[{item.id}]</span>{" "}
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
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

        return renderParagraph(block.text, index);
      })}
    </div>
  );
}
