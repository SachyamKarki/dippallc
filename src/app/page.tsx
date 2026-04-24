import Image from "next/image";
import Link from "next/link";
import ProcessSection from "@/components/ProcessSection";
import ContactForm from "@/components/ContactForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceTabs from "@/components/ServiceTabs";
import FAQSection from "@/components/FAQSection";
import HeroCarousel from "@/components/HeroCarousel";
import AboutTeaser from "@/components/AboutTeaser";
import PartnersSection from "@/components/PartnersSection";
import InteractiveProjectGrid from "@/components/InteractiveProjectGrid";


const metrics = [
  { value: "12+", label: "High-stakes product and platform transformations delivered with senior-led precision." },
  { value: "4-8 wks", label: "Average velocity to move from strategic discovery into a production-ready release." },
  { value: "100%", label: "Centered on direct collaboration with founders, operators, and enterprise leadership." },
] as const;

const insights = [
  {
    image: "/images/blog-software.png",
    tag: "Software systems",
    title: "What a premium service homepage borrows from product storytelling.",
    text: "Large typography, disciplined spacing, and clearer proof blocks do more work than extra copy ever will.",
  },
  {
    image: "/images/blog-consulting.png",
    tag: "Consulting",
    title: "How to make a consulting offer feel more tangible in under thirty seconds.",
    text: "Frame the decision, show the operating model, and reveal enough confidence that the next click feels obvious.",
  },
  {
    image: "/images/blog-ai-automation.png",
    tag: "AI agents",
    title: "Where AI automation belongs in a premium company narrative.",
    text: "Not as hype, but as a concrete extension of delivery quality, workflow leverage, and operational speed.",
  },
] as const;


export default function Home() {
  return (
    <main className="site-shell squarespace-home">
      <section className="hero-section hero-full-bg">
        <HeroCarousel />
        <div className="hero-container relative z-10">
          <div className="hero-copy-centered">

            <h1 className="hero-title">AUTONOMOUS AI ORCHESTRATION.</h1>
            <p className="hero-description text-center max-w-2xl mx-auto">
              Senior-led engineering for high-stakes digital transformation and institutional continuity. Built for speed, precision, and architectural excellence.
            </p>

            <div className="hero-actions hero-actions-centered">
              <Link href="#contact" className="button-primary">
                Book discovery
              </Link>
              <Link href="#proof" className="button-secondary">
                See the structure
              </Link>
            </div>

            <div className="hero-visual-compact hidden">
              <div className="hero-visual-inner">
                <div className="visual-card">
                  <strong>Scalable product engineering for senior teams.</strong>
                </div>
                <div className="visual-card visual-card-accent">
                  <strong>93% client retention on strategic work.</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="metrics-section reveal" aria-label="Company highlights">

        <div className="metrics-grid section-shell">
          {metrics.map((metric) => (
            <article key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <PartnersSection />

      <ProcessSection />
      <ServiceTabs />

      <InteractiveProjectGrid />
      <section className="insights-section reveal" id="insights">

        <div className="section-shell">
          <h2 className="section-title">Institutional Continuity.</h2>
          <p className="section-subtitle">
            Engagement governance, architectural standards, and systemic delivery models.
          </p>

          <div className="insights-grid">
            {insights.map((item) => (
              <article key={item.title} className="insight-card">
                <div className="insight-media">
                  <Image src={item.image} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" />
                </div>
                <span className="blog-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <Link href="/blogs" className="button-secondary">
              View all articles
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <AboutTeaser />
      <FAQSection />

      <section id="contact" className="contact-section scroll-mt-24 reveal">

        <div className="section-shell">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-title">Engineered for operational scale.</h2>
            <p className="section-subtitle mt-4">High-output solutions for senior product and engineering leadership.</p>
            <p className="text-xl text-slate-500 leading-relaxed">
              Share your project goals and timeline. You&apos;ll receive a response and a clear next step within 24 hours.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
