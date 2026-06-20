"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Simulate submission — wire to real endpoint when ready
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="newsletter-section-v2">
      {/* Background texture */}
      <div className="newsletter-bg-glow" aria-hidden="true" />

      <div className="section-shell newsletter-inner">
        <h2 className="newsletter-title">
          Subscribe for the latest insights.
        </h2>

        <p className="newsletter-sub">
          Architecture deep-reads, AI systems thinking, and delivery principles —
          direct to your inbox. No noise.
        </p>

        {status === "success" ? (
          <div className="newsletter-success">
            <span className="newsletter-success-icon" aria-hidden="true">✓</span>
            <p className="newsletter-success-text">
              You&apos;re in. Expect the next issue soon.
            </p>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-wrap">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-submit button-primary">
                Subscribe
              </button>
            </div>
            {status === "error" && (
              <p className="newsletter-error">Something went wrong. Please try again.</p>
            )}
            <p className="newsletter-disclaimer">
              No spam, ever. Unsubscribe any time.
            </p>
          </form>
        )}

        {/* Social proof */}
        <div className="newsletter-proof">
          <div className="newsletter-proof-avatars">
            {["/images/avatar-priya.png", "/images/avatar-rajesh.png", "/images/avatar-arun.png"].map((src, i) => (
              <img key={i} src={src} alt="" className="newsletter-proof-avatar" aria-hidden="true" />
            ))}
          </div>
          <span className="newsletter-proof-text">Joined by 1,200+ engineers &amp; operators</span>
        </div>
      </div>
    </section>
  );
}
