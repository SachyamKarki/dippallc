"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import ContactForm from "@/components/sections/ContactForm";
import FAQSection from "@/components/sections/FAQSection";

export default function ContactPageClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="contact-page">
      <section className="contact-form-only-section">
        <div className="contact-form-only-shell">
          <ContactForm simple />
        </div>
      </section>
      <FAQSection onContactPage />
      <Toaster position="top-center" />
    </main>
  );
}
