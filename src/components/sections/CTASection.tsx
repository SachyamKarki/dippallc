import Button from "@/components/ui/Button";

const steps = [
  {
    num: "01",
    title: "Book a Discovery Call",
    body: "Tell us about your challenge, timeline, and technical landscape. We listen first — because the right solution starts with the right understanding.",
  },
  {
    num: "02",
    title: "Receive a Strategic Brief",
    body: "We map your requirements into a clear architectural plan with defined milestones, resource allocation, and delivery expectations.",
  },
  {
    num: "03",
    title: "Senior-Led Execution Begins",
    body: "Our principals embed directly into your workflow — writing code, designing systems, and shipping production-grade outcomes from day one.",
  },
  {
    num: "04",
    title: "Deliver & Scale with Confidence",
    body: "Launch with institutional-grade infrastructure, full documentation, and a system built to compound value long after handoff.",
  },
];

export default function CTASection() {
  return (
    <section className="cta-journey-section">
      <div className="section-shell cta-journey-shell">

        <div className="cta-journey-head">
          <span className="cta-journey-kicker">Start Your Journey</span>
          <h2 className="cta-journey-title">Start Your Journey with Dippa</h2>
          <p className="cta-journey-sub">
            From first conversation to production-grade delivery — here&apos;s exactly how we work.
          </p>
        </div>

        <div className="cta-journey-steps">
          {steps.map((step) => (
            <div key={step.num} className="cta-journey-step">
              <div className="cta-journey-step-num">{step.num}</div>
              <div className="cta-journey-step-body">
                <h3 className="cta-journey-step-title">{step.title}</h3>
                <p className="cta-journey-step-text">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-journey-action">
          <Button href="/contact" variant="primary">
            Get Started
          </Button>
        </div>

      </div>
    </section>
  );
}
