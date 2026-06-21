"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    text: "We assess your current infrastructure, identify gaps, and understand your business goals before recommending anything.",
  },
  {
    number: "02",
    title: "Tailored IT Roadmap",
    text: "You receive a clear, costed plan — covering hardware, software, network, and security — with defined timelines and no jargon.",
  },
  {
    number: "03",
    title: "Hands-On Deployment",
    text: "Our engineers implement the solution on-site or remotely, with minimal disruption to your day-to-day operations.",
  },
  {
    number: "04",
    title: "Ongoing Support & Growth",
    text: "We don't disappear after go-live. Proactive monitoring, fast response, and quarterly reviews keep your systems performing.",
  },
];

export default function JourneySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="journey-v2-section" ref={sectionRef}>
      <div className="journey-v2-glow" aria-hidden="true" />

      <div className="section-shell journey-v2-inner">

        {/* Hero row: image left, headline right */}
        <div className={`journey-v2-hero-row ${isVisible ? "journey-v2-fade-up" : "opacity-0"}`}>
          {/* Person image */}
          <div className="journey-v2-img-wrap">
            <Image
              src="/images/careers-whiteboard.png"
              alt="Start your journey with Dippa"
              fill
              className="journey-v2-img"
              loading="lazy"
            />
            {/* Motivational overlay quote */}
            <div className="journey-v2-img-overlay">
              <blockquote className="journey-v2-quote">
                &ldquo;Great IT isn&apos;t invisible — it&apos;s the reason your team moves faster than the competition.&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Headline + sub */}
          <div className="journey-v2-headline-col">
            <h2 className="journey-v2-title">IT that works<br />from day one.</h2>
            <p className="journey-v2-sub">
              Every engagement starts with understanding your business first. No templates, no guesswork — just a clear path from where you are to where you need to be.
            </p>
            <Link href="/contact" className="button-primary journey-v2-hero-cta journey-v2-hero-cta--desktop">
              Get Started
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="journey-v2-steps">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`journey-v2-step ${isVisible ? "journey-v2-fade-up" : "opacity-0"}`}
              style={{ animationDelay: isVisible ? `${0.3 + i * 0.1}s` : "0s" }}
            >
              {/* Number badge + connector row */}
              <div className="journey-v2-step-head">
                <span className="journey-v2-num">{step.number}</span>
                {i < steps.length - 1 && <span className="journey-v2-connector" aria-hidden="true" />}
              </div>
              <h3 className="journey-v2-step-title">{step.title}</h3>
              <p className="journey-v2-step-text">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="journey-v2-cta-row journey-v2-cta-row--mobile">
          <Link href="/contact" className="button-primary journey-v2-hero-cta">
            Get Started
          </Link>
        </div>

      </div>
    </section>
  );
}
