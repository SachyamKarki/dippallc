import Link from "next/link";

export default function NewsFooterCTA() {
  return (
    <section className="blogs-footer-cta">
      <div className="blogs-footer-cta-shell">
        <div className="blogs-footer-cta-text">
          <h2 className="text-3xl md:text-4xl">Have a complex system in mind?</h2>
          <p className="opacity-90">Let's discuss how our engineering team can help you build for scale.</p>
        </div>
        <div className="flex gap-4">
          <Link href="#contact" className="blogs-newsletter-btn inline-flex items-center justify-center min-w-[200px] h-14 font-bold tracking-widest uppercase text-[10px]">
            Request a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}

