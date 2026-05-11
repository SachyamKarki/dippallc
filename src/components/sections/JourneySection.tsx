"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="section journey-section pt-32 pb-0 overflow-hidden reveal" ref={sectionRef}>
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="journey-orb journey-orb-1" />
        <div className="journey-orb journey-orb-2" />
      </div>

      <div className="section-shell">
        <h2 
          className={`section-title mb-10 lg:mb-24 ${isVisible ? 'journey-heading-enter' : 'opacity-0'}`}
          style={{ fontFamily: 'var(--font-title)', fontWeight: 700 }}
        >
          Start Your Journey
        </h2>
        
        <div className="journey-grid">
          <div className="journey-image-col">
            <div className={`journey-image-wrapper ${isVisible ? 'journey-image-enter' : 'opacity-0'}`}>
              <Image
                src="/images/journey-person-v3.png"
                alt="Start Your Journey with Dippa"
                fill
                className="object-contain object-bottom journey-image-float sm:object-right-bottom"
                priority
              />
            </div>
          </div>

          <div className="journey-content-col">
            <div className="journey-steps">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className={`journey-step ${isVisible ? 'journey-step-enter' : 'opacity-0'}`}
                  style={{ animationDelay: isVisible ? `${0.3 + index * 0.5}s` : '0s' }}
                >
                  <span className="journey-step-number journey-number-glow" style={{ fontFamily: 'var(--font-lato)' }}>{step.number}</span>
                  <div className="journey-step-body">
                    <h3 className="journey-step-title" style={{ fontFamily: 'var(--font-title)', fontWeight: 700 }}>{step.title}</h3>
                    <p className="journey-step-text" style={{ fontFamily: 'var(--font-lato)' }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`journey-cta flex justify-center lg:justify-start ${isVisible ? 'journey-cta-enter' : 'opacity-0'}`}>
              <Button href="/contact" className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 flex justify-center text-center">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Motion Graphics Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleInRight {
          from { opacity: 0; transform: translateX(60px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.06); }
          66% { transform: translate(-25px, 15px) scale(0.94); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, -45px) scale(1.08); }
        }
        @keyframes numberPulse {
          0%, 100% { text-shadow: 0 0 0 transparent; }
          50% { text-shadow: 0 0 20px rgba(54, 72, 53, 0.15); }
        }

        .journey-heading-enter {
          animation: fadeInUp 0.6s ease-out both;
        }
        .journey-step-enter {
          animation: fadeInLeft 0.5s ease-out both;
        }
        .journey-cta-enter {
          animation: fadeInUp 0.5s ease-out both;
          animation-delay: 2.5s;
        }
        .journey-image-enter {
          animation: scaleInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.3s;
        }
        .journey-image-float {
          animation: gentleFloat 6s ease-in-out infinite;
        }
        .journey-number-glow {
          animation: numberPulse 3s ease-in-out infinite;
        }

        .journey-section {
          background: #ffffff;
          padding-top: 6rem !important;
          padding-bottom: 6rem !important;
          margin-bottom: 4rem !important;
        }

        @media (max-width: 768px) {
          .journey-section {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
            margin-bottom: 2rem !important;
          }
        }

        .journey-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.035;
        }
        .journey-orb-1 {
          width: 400px; height: 400px;
          background: #1E293B;
          bottom: 10%; left: -5%;
          animation: orbDrift1 22s ease-in-out infinite;
        }
        .journey-orb-2 {
          width: 300px; height: 300px;
          background: #5a7d59;
          top: 15%; right: 5%;
          animation: orbDrift2 18s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
