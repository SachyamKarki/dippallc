import Link from "next/link";
import InsightsCarousel from "./InsightsCarousel";
import Button from "@/components/ui/Button";

const InsightsSection = () => {
  return (
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
          <Button href="/news" className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-4 flex justify-center text-center">
            View all news
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
