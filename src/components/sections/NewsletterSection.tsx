"use client";

import NewsletterForm from "@/components/sections/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="newsletter-section-v2" data-nav-tone="dark">
      <div className="newsletter-bg-glow" aria-hidden="true" />

      <div className="section-shell newsletter-inner">
        <h2 className="newsletter-title">Subscribe to get the latest news from Dippa.</h2>
        <NewsletterForm variant="homepage" source="homepage" />
      </div>
    </section>
  );
}
