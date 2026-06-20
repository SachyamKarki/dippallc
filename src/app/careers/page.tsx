import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="coming-soon-page">
      <div className="coming-soon-inner">
        <p className="coming-soon-eyebrow">Careers</p>
        <h1 className="coming-soon-title">We're building<br />the team.</h1>
        <p className="coming-soon-sub">
          Open roles are on their way. We hire people who take ownership, think clearly, and care about the craft. Stay tuned.
        </p>
        <Link href="/" className="coming-soon-back">← Back to home</Link>
      </div>
    </main>
  );
}
