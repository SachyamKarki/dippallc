import Link from "next/link";
import CaseStudyContent from "@/components/case-study/CaseStudyContent";
import CaseStudyDocAside from "@/components/case-study/CaseStudyDocAside";
import { extractDocHeadings } from "@/lib/blog/contentUtils";
import { buildCaseStudyMetadata, caseStudyJsonLd } from "@/lib/blog/seo";
import { examplePosts, getExamplePost } from "@/lib/blog/examplePosts";
import { formatDate } from "@/lib/blog/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface NewsDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return examplePosts.map((post) => ({ id: post.slug }));
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { id } = await params;
  const post = getExamplePost(id);
  if (!post) return { title: "Case Study" };
  return buildCaseStudyMetadata(post);
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id } = await params;
  const post = getExamplePost(id);
  if (!post) notFound();

  const meta = post.caseStudy;
  const headings = extractDocHeadings(post.content);
  const related = examplePosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (b.category === post.category && a.category !== post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <main className="case-study-page case-study-doc" data-nav-tone="light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd(post)) }}
      />

      <header className="case-study-doc-header">
        <div className="section-shell case-study-doc-header-inner">
          <nav className="case-study-doc-breadcrumb" aria-label="Breadcrumb">
            <Link href="/news">Case studies</Link>
            {post.category ? (
              <>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
              </>
            ) : null}
          </nav>
          <h1 className="case-study-doc-title">{post.title}</h1>
          <p className="case-study-doc-meta">
            <time dateTime={post.createdAt}>
              {formatDate(post.createdAt, { month: "long" })}
            </time>
            {post.readingTimeMinutes ? (
              <>
                <span className="case-study-doc-meta-sep" aria-hidden="true">·</span>
                {post.readingTimeMinutes} min read
              </>
            ) : null}
            {meta?.industry ? (
              <>
                <span className="case-study-doc-meta-sep" aria-hidden="true">·</span>
                {meta.industry}
              </>
            ) : null}
          </p>
        </div>
      </header>

      <div className="case-study-doc-shell section-shell">
        <CaseStudyDocAside meta={meta} headings={headings} />

        <article className="case-study-doc-article">
          <p className="case-study-doc-lede">{post.excerpt}</p>
          <CaseStudyContent blocks={post.content} />

          {meta ? (
            <section className="case-study-doc-review" aria-labelledby="technical-review-heading">
              <h2 id="technical-review-heading" className="case-study-h2">
                Engineering assessment
              </h2>
              <p className="case-study-doc-review-summary">{meta.review.summary}</p>
              <div className="case-study-doc-review-grid">
                <div>
                  <h3 className="case-study-h3">Strengths</h3>
                  <ul className="case-study-ul">
                    {meta.review.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="case-study-h3">Risks &amp; mitigations</h3>
                  <ul className="case-study-ul">
                    {meta.review.risks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="case-study-doc-verdict">
                <strong>Verdict.</strong> {meta.review.verdict}
              </p>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="case-study-doc-related" aria-labelledby="related-heading">
              <h2 id="related-heading" className="case-study-h2">
                Related case studies
              </h2>
              <ul className="case-study-doc-related-list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                    {item.category ? (
                      <span className="case-study-doc-related-cat">{item.category}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <footer className="case-study-doc-footer">
            <p>
              Building something similar?{" "}
              <Link href="/contact">Request a consultation</Link>
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
