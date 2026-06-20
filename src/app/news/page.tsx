import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="coming-soon-page">
      <div className="coming-soon-inner">
        <p className="coming-soon-eyebrow">Case Studies &amp; Blogs</p>
        <h1 className="coming-soon-title">Something worth<br />reading is coming.</h1>
        <p className="coming-soon-sub">
          We're compiling real-world case studies, technical insights, and strategic perspectives from our engagements. Check back soon.
        </p>
        <Link href="/" className="coming-soon-back">← Back to home</Link>
      </div>
    </main>
  );
}
