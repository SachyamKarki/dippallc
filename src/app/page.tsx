import NewsletterSection from "@/components/sections/NewsletterSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServiceTabs from "@/components/sections/ServiceTabs";
import HomeHero from "@/components/sections/HomeHero";
import LazyProjectGrid from "@/components/sections/LazyProjectGrid";
import JourneySection from "@/components/sections/JourneySection";
import InsightsSection from "@/components/sections/InsightsSection";
import { EARTH_NIGHT_URL } from "@/lib/earthAssets";

export default function Home() {
  return (
    <main className="site-shell squarespace-home relative">
      <link rel="preload" as="image" href={EARTH_NIGHT_URL} fetchPriority="high" />
      <HomeHero />

      <ServiceTabs />

      <LazyProjectGrid />

      <NewsletterSection />

      <InsightsSection />

      <TestimonialsSection />

      <JourneySection />
    </main>
  );
}
