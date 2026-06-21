import Link from "next/link";

export default function NewsFooterCTA() {
  return (
    <section className="blogs-footer-cta">
      <div className="blogs-footer-cta-shell">
        <div className="blogs-footer-cta-text">
          <h2 className="section-title !text-left">Have a complex system in mind?</h2>
          <p className="opacity-90">Let&apos;s discuss how our engineering team can help you build for scale.</p>
        </div>
        <div className="flex gap-4">
          <Link href="/contact" className="button-primary inline-flex items-center justify-center min-w-[200px]">
            Request a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}

