import Link from "next/link";

interface ComingSoonProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}

export default function ComingSoon({ eyebrow, title, subtitle }: ComingSoonProps) {
  return (
    <main className="coming-soon-page" data-nav-tone="light">
      <div className="coming-soon-inner">
        <p className="coming-soon-eyebrow">{eyebrow}</p>
        <span className="coming-soon-badge">Coming Soon</span>
        <h1 className="coming-soon-title">{title}</h1>
        <p className="coming-soon-sub">{subtitle}</p>
        <Link href="/" className="coming-soon-back">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
