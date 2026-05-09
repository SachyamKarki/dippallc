import Link from "next/link";
import WhyDippaSection from "@/components/WhyDippaSection";
import NewsletterSection from "@/components/NewsletterSection";
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

  return (
    <main className="site-shell squarespace-home">
      <section className="hero-section-new">
        <HeroCarousel />
      </section>


      <ServiceTabs />
      <PartnersSection />

      <section className="insights-section reveal" id="insights">
        <div className="section-shell">
          <h2 className="section-title">DIPPA ARTICLES.</h2>
          <p className="section-subtitle">
            Engagement governance, architectural standards, and research-led systemic delivery.
          </p>

          <div className="mt-24">
            <InsightsCarousel
              articles={[
                { slug: "stake-high-delivery", title: "What great delivery looks like when stakes are high", tag: "Software Systems", excerpt: "A practical look at senior-led execution, decision cadence, and the signals that separate busy work from real progress." },
                { slug: "ai-automation-leverage", title: "Where AI automation belongs inside modern operations", tag: "AI Orchestration", excerpt: "Not hype — leverage. How to introduce AI safely, measure outcomes, and keep systems legible as they evolve." },
                { slug: "shipping-strategy", title: "Turning strategy into shipping: a simple operating model", tag: "Consulting", excerpt: "How we reduce ambiguity, align stakeholders, and keep delivery velocity high without sacrificing quality." },
                { slug: "decision-cadence", title: "The anatomy of institutional decision cadence", tag: "Management", excerpt: "How systems-first companies handle rapid iteration without compromising architectural integrity." },
              ]}
            />
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="/news"
              className="button-secondary"
              style={{ backgroundColor: '#364835', color: '#ffffff', borderColor: '#364835' }}
            >
              View all news
            </Link>
          </div>
        </div>
      </section>

      <JourneySection />

      <WhyDippaSection />
      
      <NewsletterSection />

      <InteractiveProjectGrid />

      <FAQSection />
      <TestimonialsSection />

      <section className="py-32 bg-white reveal px-4 md:px-8">
        <div
          className="relative rounded-[3rem] py-12 md:py-16 px-8 md:px-16 text-center w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center overflow-hidden"
          style={{ 
            backgroundColor: '#FAF9F6',
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        >
          <h2 className="section-title !mb-6">
            Start Your Journey
          </h2>

          <p className="relative z-10 text-base md:text-lg text-[#4a4a4a] max-w-2xl mx-auto mb-12 font-medium">
            Book a discovery call and let&apos;s map your technical landscape into a clear, institutional-grade architectural plan.
          </p>

          <div className="relative z-10">
            <Link
              href="/contact"
              className="journey-btn"
              style={{ backgroundColor: '#364835' }}
            >
              Book Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
