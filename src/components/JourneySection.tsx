"use client";

import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Book a Discovery Call",
    text: "Tell us about your challenge, timeline, and technical landscape. We listen first — because the right solution starts with the right understanding.",
  },
  {
    number: "2",
    title: "Receive a Strategic Brief",
    text: "We map your requirements into a clear architectural plan with defined milestones, resource allocation, and delivery expectations.",
  },
  {
    number: "3",
    title: "Senior-Led Execution Begins",
    text: "Our principals embed directly into your workflow — writing code, designing systems, and shipping production-grade outcomes from day one.",
  },
  {
    number: "4",
    title: "Deliver & Scale with Confidence",
    text: "Launch with institutional-grade infrastructure, full documentation, and a system built to compound value long after handoff.",
  },
];

export default function JourneySection() {
  return (
    <section id="journey" className="section py-32 bg-zinc-50 overflow-hidden reveal">
      <div className="section-shell">
        <div className="journey-grid">
          <div className="journey-image-col">
            <div className="journey-image-wrapper">
              <Image
                src="/images/journey-person-v3.png"
                alt="Start Your Journey with Dippa"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>

          <div className="journey-content-col">
            <h2 className="journey-title md:-ml-24 mb-12">Start Your Journey</h2>
            <div className="journey-steps">
              {steps.map((step) => (
                <div key={step.number} className="journey-step flex flex-col gap-0.5">
                  <div className="flex items-center gap-6">
                    <span className="journey-step-number !min-w-[1.5rem] !text-right !pt-0 !mb-0">{step.number}</span>
                    <h3 className="journey-step-title !m-0">{step.title}</h3>
                  </div>
                  <div className="pl-12">
                    <p className="journey-step-text m-0">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="journey-cta">
              <Link href="/contact" className="journey-btn">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
