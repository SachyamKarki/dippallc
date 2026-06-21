"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import type { Testimonial } from "@/types";

const FALLBACK: Testimonial[] = [
  { id: 1, name: "Sarah Chen", role: "CTO, NexaFlow", quote: "Dippa moved us from strategic discovery to a high-integrity production release in under six weeks. Their architectural discipline and senior-led execution are fundamentally unmatched.", image_url: "/images/avatar-priya.png" },
  { id: 2, name: "Marcus Vance", role: "Founder, ScaleOps", quote: "The autonomous AI agents they engineered for our workflow orchestration completely transformed our operational overhead. It's not just software; it's true business leverage.", image_url: "/images/avatar-rajesh.png" },
  { id: 3, name: "Elena Rodriguez", role: "Head of Product, Veritas", quote: "Exceptional editorial polish paired with deep-tier engineering. They understood our brand narrative and translated it into a high-performance digital operating system.", image_url: "/images/avatar-arun.png" },
  { id: 4, name: "David Park", role: "VP Engineering, Horizon Systems", quote: "Pure velocity. They integrated seamlessly with our internal leadership and enforced a level of documentation and code purity that remains our internal standard.", image_url: "/images/avatar-samir.png" },
  { id: 5, name: "Julian Thorne", role: "Director of Operations, Aether", quote: "The transition from fragmented manual workflows to a unified operational surface was seamless. Dippa builds systems that feel premium and perform at scale.", image_url: "/images/avatar-anita.png" },
  { id: 6, name: "Dr. Aris Varma", role: "Founder, BioLogic AI", quote: "Their approach to AI implementation is rigorous. They prioritize observability and human-in-the-loop controls, ensuring the tech is dependable for high-stakes decisions.", image_url: "/images/avatar-rohan.png" },
];

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    fetch(`${api}/api/testimonials/`)
      .then((r) => r.ok ? r.json() : [])
      .then((data: Testimonial[]) => { if (data.length) setItems(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;
    if (showAll) {
      gsap.to(containerRef.current, { height: gridRef.current.offsetHeight, duration: 0.8, ease: "power4.inOut" });
    } else {
      const firstCard = gridRef.current.querySelector(".testimonial-card") as HTMLElement;
      const h = firstCard ? firstCard.offsetHeight + 10 : 400;
      gsap.to(containerRef.current, { height: h, duration: 0.8, ease: "power4.inOut" });
    }
  }, [showAll, items]);

  useEffect(() => {
    if (!gridRef.current || !containerRef.current || showAll) return;
    const firstCard = gridRef.current.querySelector(".testimonial-card") as HTMLElement;
    if (firstCard) containerRef.current.style.height = `${firstCard.offsetHeight + 10}px`;
  }, [items, showAll]);

  return (
    <section className="testimonials-section reveal" id="testimonials">
      <div className="section-shell">
        <div className="w-full flex flex-col items-center text-center mb-4 lg:mb-16">
          <h2 className="st-title text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] mt-0 mb-4 w-full max-w-4xl mx-auto sm:mb-6 text-center">
            Built for scale. Trusted by visionary operators.
          </h2>
        </div>

        <div className="relative">
          <div ref={containerRef} className="overflow-hidden" style={{ height: 400 }}>
            <div ref={gridRef} className="testimonials-grid">
              {items.map((t) => (
                <article key={t.id} className="testimonial-card">
                  <div className="testimonial-person">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      {t.image_url ? (
                        <Image src={t.image_url} alt={t.name} fill className="testimonial-avatar" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-400">
                          {t.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <strong className="st-text block text-sm font-bold uppercase tracking-wider text-[#0a0a0a]">{t.name}</strong>
                      <span className="st-text block text-sm opacity-70">{t.role}</span>
                    </div>
                  </div>
                  <p className="st-text leading-relaxed text-base opacity-90">&ldquo;{t.quote}&rdquo;</p>
                </article>
              ))}
            </div>
          </div>
          <div className={`pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-700 ${showAll ? "opacity-0" : "opacity-100"}`} />
        </div>

        <div className="mt-16 flex justify-start lg:justify-center">
          <button
            onClick={() => {
              if (showAll) {
                document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
              setShowAll((v) => !v);
            }}
            className="button-primary"
          >
            VIEW MORE
          </button>
        </div>
      </div>
    </section>
  );
}
