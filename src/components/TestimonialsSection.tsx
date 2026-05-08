"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const testimonials = [
  {
    image: "/images/avatar-priya.png",
    name: "Sarah Chen",
    role: "CTO, NexaFlow",
    quote: "Dippa moved us from strategic discovery to a high-integrity production release in under six weeks. Their architectural discipline and senior-led execution are fundamentally unmatched.",
  },
  {
    image: "/images/avatar-rajesh.png",
    name: "Marcus Vance",
    role: "Founder, ScaleOps",
    quote: "The autonomous AI agents they engineered for our workflow orchestration completely transformed our operational overhead. It's not just software; it's true business leverage.",
  },
  {
    image: "/images/avatar-arun.png",
    name: "Elena Rodriguez",
    role: "Head of Product, Veritas",
    quote: "Exceptional editorial polish paired with deep-tier engineering. They understood our brand narrative and translated it into a high-performance digital operating system.",
  },
  {
    image: "/images/avatar-samir.png",
    name: "David Park",
    role: "VP Engineering, Horizon Systems",
    quote: "Pure velocity. They integrated seamlessly with our internal leadership and enforced a level of documentation and code purity that remains our internal standard.",
  },
  {
    image: "/images/avatar-anita.png",
    name: "Julian Thorne",
    role: "Director of Operations, Aether",
    quote: "The transition from fragmented manual workflows to a unified operational surface was seamless. Dippa builds systems that feel premium and perform at scale.",
  },
  {
    image: "/images/avatar-rohan.png",
    name: "Dr. Aris Varma",
    role: "Founder, BioLogic AI",
    quote: "Their approach to AI implementation is rigorous. They prioritize observability and human-in-the-loop controls, ensuring the tech is dependable for high-stakes decisions.",
  },
];

export default function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    if (showAll) {
      // Animate to the full height of the internal grid
      gsap.to(containerRef.current, {
        height: gridRef.current.offsetHeight,
        duration: 0.8,
        ease: "power4.inOut",
      });
    } else {
      // Calculate height of the first element/row
      const firstCard = gridRef.current.querySelector('.testimonial-card') as HTMLElement;
      const initialHeight = firstCard ? firstCard.offsetHeight + 10 : 400;

      gsap.to(containerRef.current, {
        height: initialHeight,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [showAll]);

  // Initial setup to prevent jump on fresh load
  useEffect(() => {
    if (showAll) return;
    if (gridRef.current && containerRef.current) {
      const firstCard = gridRef.current.querySelector('.testimonial-card') as HTMLElement;
      if (firstCard) {
        containerRef.current.style.height = `${firstCard.offsetHeight + 10}px`;
      }
    }
  }, [showAll]);

  return (
    <section className="testimonials-section reveal" id="testimonials">

      <div className="section-shell">
        <div className="section-heading-block">
          <h2 className="section-title">Built for scale. Trusted by visionary operators.</h2>
        </div>

        <div className="relative">
          <div 
            ref={containerRef}
            className="testimonials-animation-wrapper overflow-hidden"
            style={{ height: '400px' }} // Fallback
          >
            <div ref={gridRef} className="testimonials-grid">
              {testimonials.map((testimonial, idx) => (
                <article key={testimonial.name + idx} className="testimonial-card">
                  <div className="testimonial-person">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="testimonial-avatar"
                    />
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                  <p>{testimonial.quote}</p>
                </article>
              ))}
            </div>
          </div>
          
          {/* Glassy Overlay for Collapsed State */}
          <div className={`absolute bottom-0 left-0 w-full h-32 pointer-events-none transition-opacity duration-700 bg-gradient-to-t from-[#fcfcfc] to-transparent z-10 ${showAll ? 'opacity-0' : 'opacity-100'}`} />
        </div>

        <div className="flex justify-center mt-16">
          <button 
            onClick={() => {
              if (showAll) {
                const element = document.getElementById('testimonials');
                if (element) {
                   const offset = 100;
                   const bodyRect = document.body.getBoundingClientRect().top;
                   const elementRect = element.getBoundingClientRect().top;
                   const elementPosition = elementRect - bodyRect;
                   const offsetPosition = elementPosition - offset;

                   window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                   });
                }
              }
              setShowAll(!showAll);
            }}
            className="button-primary"
          >
            {showAll ? "Show less" : "View more testimonials"}
          </button>
        </div>
      </div>
    </section>
  );
}
