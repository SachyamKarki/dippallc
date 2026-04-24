import ContactForm from "@/components/ContactForm";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 reveal">
        <div className="section-shell">
          <h1 className="text-6xl md:text-8xl font-bold text-zinc-900 mb-12 tracking-tight">
            Institutional Excellence.
          </h1>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <p className="text-2xl text-zinc-600 leading-tight">
              Dippa is a senior-led engineering collective dedicated to the architecture of high-stakes digital infrastructure and autonomous AI orchestration.
            </p>
            <div className="space-y-8">
              <p className="text-lg text-zinc-500">
                Founded on the principle of technical integrity, we bridge the gap between speculative innovation and operational reality. Our mission is to empower institutional leadership with systems that compound in value, ensuring continuity in an age of rapid disruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Goals Section */}
      <section className="bg-zinc-50 py-24 reveal">
        <div className="section-shell">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 text-left">Strategic Vision</h2>
              <h3 className="text-4xl font-bold mb-8">Autonomous Orchestration</h3>
              <p className="text-zinc-600 mb-8 text-lg leading-relaxed">
                We envision a future where enterprise intelligence is not just automated, but orchestrated. Our vision is to create &quot;Institutional Brains&quot;—autonomous systems that manage complexity, mitigate risk, and scale institutional knowledge without human bottlenecks.
              </p>
              <div className="h-1 w-20 bg-zinc-900" />
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 text-left">Operational Goals</h2>
              <h3 className="text-4xl font-bold mb-8">Architectural Resilience</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-zinc-900 font-bold">01.</span>
                  <p className="text-zinc-600">Eliminate legacy technical debt through modular, forward-compatible engineering.</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-zinc-900 font-bold">02.</span>
                  <p className="text-zinc-600">Deploy AI agents that integrate deeply into core business workflows.</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-zinc-900 font-bold">03.</span>
                  <p className="text-zinc-600">Ensure long-term institutional continuity through structured data governance.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Values Section */}
        <section className="py-24 reveal">
          <div className="section-shell">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <h4 className="text-2xl font-bold mb-4">Uncompromising Quality</h4>
                <p className="text-zinc-500">We do not ship experiments as production environments. Every line of code is written for the long-term governance of the client.</p>
              </div>
              <div className="group">
                <h4 className="text-2xl font-bold mb-4">Strategic Partnership</h4>
                <p className="text-zinc-500">We act as technical extensions of the leadership team, prioritizing strategic alignment over transactional project counts.</p>
              </div>
              <div className="group">
                <h4 className="text-2xl font-bold mb-4">Senior-Led Execution</h4>
                <p className="text-zinc-500">Every project is architected and overseen by senior leadership. No junior hand-offs, only veteran precision.</p>
              </div>
            </div>
          </div>
        </section>

      {/* Closing CTA with Contact Form */}
      <section id="contact" className="bg-zinc-50 py-32 reveal">
        <div className="section-shell max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Build the Future.</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Ready to discuss your vision? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
