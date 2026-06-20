import NewsletterSection from "@/components/sections/NewsletterSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServiceTabs from "@/components/sections/ServiceTabs";
import HeroCarousel from "@/components/sections/HeroCarousel";
import StarfieldBackground from "@/components/sections/StarfieldBackground";
import TechAnimation from "@/components/sections/TechAnimation";
import InteractiveProjectGrid from "@/components/sections/InteractiveProjectGrid";
import JourneySection from "@/components/sections/JourneySection";
import InsightsSection from "@/components/sections/InsightsSection";

export default function Home() {
  return (
    <main className="site-shell squarespace-home relative">
      <section className="hero-section-new relative overflow-hidden">
        <StarfieldBackground />
        <TechAnimation />
        <HeroCarousel />
      </section>

      <ServiceTabs />

      {/* 360 immersive — black canvas */}
      <div className="bg-[#000000] overflow-hidden">
<InteractiveProjectGrid />
      </div>

      {/* Subscribe — after 360 */}
      <NewsletterSection />

      {/* Case Studies & Blogs */}
      <InsightsSection />

      <TestimonialsSection />

      <JourneySection />
    </main>
  );
}
