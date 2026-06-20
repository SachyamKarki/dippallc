import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="coming-soon-page">
      <div className="coming-soon-inner">
        <p className="coming-soon-eyebrow">Products</p>
        <h1 className="coming-soon-title">Built with precision.<br />Launching soon.</h1>
        <p className="coming-soon-sub">
          Our product suite is in final development. Purpose-built tools for IT operations, automation, and business continuity.
        </p>
        <Link href="/" className="coming-soon-back">← Back to home</Link>
      </div>
    </main>
  );
}
