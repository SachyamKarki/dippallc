import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-zinc-50">
      <div className="section-shell">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="section-title">Let&apos;s Talk.</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Tell us about your challenge, timeline, and technical landscape.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
