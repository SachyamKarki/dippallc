import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Request a Consultation — DIPPA IT Solutions",
  description:
    "Tell us about your challenge, timeline, and technical landscape. We'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-form-only-section">
        <div className="section-shell contact-form-only-shell">
          <ContactForm simple />
        </div>
      </section>
    </main>
  );
}
