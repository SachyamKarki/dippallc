import WhyDippaSection from "@/components/sections/WhyDippaSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServiceTabs from "@/components/sections/ServiceTabs";
import FAQSection from "@/components/sections/FAQSection";
import HeroCarousel from "@/components/sections/HeroCarousel";
import TechAnimation from "@/components/sections/TechAnimation";
import PartnersSection from "@/components/sections/PartnersSection";
import InteractiveProjectGrid from "@/components/sections/InteractiveProjectGrid";
import JourneySection from "@/components/sections/JourneySection";
import InsightsSection from "@/components/sections/InsightsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="site-shell squarespace-home relative">
      <section className="hero-section-new relative overflow-hidden">
        <TechAnimation />
        <HeroCarousel />
      </section>

      <ServiceTabs />
      <PartnersSection />

      <JourneySection />

      <InsightsSection />

      <div style={{ background: 'linear-gradient(to bottom, #ffffff 50%, #000000 50%)' }}>
        <WhyDippaSection />
      </div>

      <div className="bg-[#000000] overflow-hidden">
        <NewsletterSection />
        <InteractiveProjectGrid />
      </div>

      {/* Professional Gradient Blend into FAQ Section */}
      <div
        className="w-full h-32 md:h-56 pointer-events-none -mb-16 md:-mb-24 relative z-10"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0) 100%)'
        }}
      />

      <FAQSection />
      <TestimonialsSection />

      <CTASection />
    </main>
  );
}
