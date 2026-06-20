import ContactForm from "@/components/sections/ContactForm";
import FAQSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "Request a Consultation — DIPPA",
  description:
    "Tell us about your challenge, timeline, and technical landscape. We'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="consult-hero">
        <div className="section-shell">
          <div className="consult-hero-inner">
            <div className="consult-hero-text">
              <p className="consult-kicker">Request a Consultation</p>
              <h1 className="consult-title">
                Let&apos;s build<br />
                something great.
              </h1>
              <p className="consult-subtitle">
                Tell us about your challenge, timeline, and technical landscape. We listen first — because the right solution starts with the right understanding.
              </p>

              <ul className="consult-trust-list">
                {[
                  "Response within 1 business day",
                  "Senior-led discovery — no junior hand-off",
                  "Complimentary first session, no strings attached",
                ].map((item) => (
                  <li key={item} className="consult-trust-item">
                    <span className="consult-trust-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="consult-form-col">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="consult-stats-bar">
        <div className="section-shell">
          <div className="consult-stats-inner">
            {[
              { value: "48+", label: "high-trust launches shipped" },
              { value: "14d", label: "to first production prototype" },
              { value: "93%", label: "client retention on strategic work" },
            ].map((s) => (
              <div key={s.label} className="consult-stat">
                <span className="consult-stat-value">{s.value}</span>
                <span className="consult-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />
    </main>
  );
}
