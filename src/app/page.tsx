import Image from "next/image";
import Link from "next/link";
import WhyDippaSection from "@/components/WhyDippaSection";
import ContactForm from "@/components/ContactForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceTabs from "@/components/ServiceTabs";
import FAQSection from "@/components/FAQSection";
import HeroCarousel from "@/components/HeroCarousel";
import PartnersSection from "@/components/PartnersSection";
import InteractiveProjectGrid from "@/components/InteractiveProjectGrid";
import JourneySection from "@/components/JourneySection";
import InsightsCarousel from "@/components/InsightsCarousel";
import { getExamplePostSummaries } from "@/lib/blog/examplePosts";

export default function Home() {
  const latestInsights = getExamplePostSummaries().slice(0, 3);

  return (
    <main className="site-shell squarespace-home">
      <section className="hero-section hero-full-bg">
        <HeroCarousel />
        <div className="hero-container relative z-10 py-32">
          <div className="hero-copy-right max-w-5xl">
            <h1 className="hero-title">Autonomous <br /> Systems.</h1>
            <p className="hero-description max-w-xl">
              Senior-led engineering for high-stakes systemic orchestration and institutional continuity.
            </p>

            <div className="hero-actions flex justify-start gap-6">
              <Link href="#contact" className="button-primary text-sm font-bold">
                Book discovery
              </Link>
              <Link href="#proof" className="button-secondary text-sm font-bold">
                See the structure
              </Link>
            </div>
          </div>
        </div>
      </section>


      <PartnersSection />

      <WhyDippaSection />
      <ServiceTabs />

      <InteractiveProjectGrid />
      <section className="insights-section reveal" id="insights">

        <div className="section-shell">
          <h2 className="section-title">Engineering Intelligence.</h2>
          <p className="section-subtitle">
            Engagement governance, architectural standards, and research-led systemic delivery.
          </p>

          <InsightsCarousel
            articles={[
              { slug: "stake-high-delivery", title: "What great delivery looks like when stakes are high", tag: "Software Systems", excerpt: "A practical look at senior-led execution, decision cadence, and the signals that separate busy work from real progress." },
              { slug: "ai-automation-leverage", title: "Where AI automation belongs inside modern operations", tag: "AI Orchestration", excerpt: "Not hype — leverage. How to introduce AI safely, measure outcomes, and keep systems legible as they evolve." },
              { slug: "shipping-strategy", title: "Turning strategy into shipping: a simple operating model", tag: "Consulting", excerpt: "How we reduce ambiguity, align stakeholders, and keep delivery velocity high without sacrificing quality." },
              { slug: "decision-cadence", title: "The anatomy of institutional decision cadence", tag: "Management", excerpt: "How systems-first companies handle rapid iteration without compromising architectural integrity." },
            ]}
          />

          <div className="flex justify-center mt-16">
            <Link href="/news" className="button-secondary">
              View all news
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <JourneySection />

      <FAQSection />

      <section id="contact" className="contact-section scroll-mt-24 reveal">

        <div className="section-shell">
          <div className="max-w-7xl mx-auto pt-16">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
