import ContactForm from "@/components/sections/ContactForm";
import FAQSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "Contact — DIPPA IT Solutions",
  description:
    "Tell us about your challenge, timeline, and technical landscape. We'll respond within one business day.",
};

const TRUST_ITEMS = [
  "Response within 1 business day",
  "Senior-led discovery — no junior hand-off",
  "Complimentary first session, no strings attached",
];

const STATS = [
  { value: "48+", label: "high-trust launches shipped" },
  { value: "14d", label: "to first prototype" },
  { value: "93%", label: "client retention" },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero-dark">
        <div className="section-shell contact-hero-inner">
          {/* Left — copy */}
          <div className="contact-hero-left">
            <p className="contact-eyebrow">Start a Conversation</p>
            <h1 className="contact-hero-title">
              Let&apos;s build<br />something great.
            </h1>
            <p className="contact-hero-sub">
              Tell us about your challenge, timeline, and technical
              landscape. We listen first — because the right solution
              starts with the right understanding.
            </p>

            <ul className="contact-trust-list">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className="contact-trust-item">
                  <span className="contact-trust-check" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="contact-hero-stats">
              {STATS.map((s, i) => (
                <div key={s.label} className="contact-hero-stat">
                  {i > 0 && <span className="contact-hero-stat-div" aria-hidden="true" />}
                  <span className="contact-hero-stat-value">{s.value}</span>
                  <span className="contact-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form card */}
          <div className="contact-form-wrap">
            <ContactForm />
          </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}
