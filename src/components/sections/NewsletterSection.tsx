"use client";

import NewsletterForm from "@/components/sections/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="newsletter-section-v2" data-nav-tone="dark">
      <div className="newsletter-bg-glow" aria-hidden="true" />

      <div className="section-shell newsletter-inner">
        <p className="newsletter-label-text">Briefing</p>
        <h2 className="newsletter-title">Notes on software, AI, and delivery.</h2>
        <p className="newsletter-sub">
          Occasional briefings for operators and technology leaders — how we
          scope systems, apply AI with controls, and run client work. A few
          times a quarter. No promotional mail.
        </p>
        <NewsletterForm variant="homepage" source="homepage" />
      </div>
    </section>
  );
}
