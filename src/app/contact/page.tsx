import ContactForm from "@/components/sections/ContactForm";
import FAQSection from "@/components/sections/FAQSection";

export const metadata = {
  title: "Contact — DIPPA IT Solutions",
  description:
    "Tell us about your challenge, timeline, and technical landscape. We'll respond within one business day.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-form-only-section">
        <div className="section-shell contact-form-only-shell">
          <ContactForm />
        </div>
      </section>

      <FAQSection />
    </main>
  );
}
