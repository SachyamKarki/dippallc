"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const faqs = [
  {
    question: "What is the typical timeframe for discovery and deployment?",
    answer: "Our standard engagement cycles move from strategic discovery to a functional first release within 4 to 8 weeks. We prioritize deploying high-integrity prototypes early so your team can pivot based on market evidence rather than internal assumptions.",
  },
  {
    question: "How do you coordinate with internal engineering and product leadership?",
    answer: "We function as both a standalone execution unit and an embedded leadership partner. Regardless of the model, we enforce strict architectural legibility and comprehensive documentation to ensure the system remains a long-term asset for your internal team.",
  },
  {
    question: "What defines your methodology for autonomous agent orchestration?",
    answer: "We implement AI as a strategic extension of your operational logic. Our agents are engineered with rigorous observability, human-in-the-loop governance, and precise tool-calling boundaries to ensure they are dependable in production environments.",
  },
  {
    question: "What is the structure of your post-delivery continuity model?",
    answer: "Sustainability is managed through our Embedded Partner framework. This provides ongoing engineering leadership, workflow evolution, and systemic scaling to ensure the software evolves alongside your business objectives.",
  },
  {
    question: "Do you provide technical advisory and systemic due diligence?",
    answer: "Yes. Through our Advisory Sprints, we deliver deep-tier audits of existing architectures. We identify structural technical debt and provide actionable, senior-led roadmaps for modernization or scaling.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;
      const isOpen = openIndex === index;
      
      gsap.to(el, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.6,
        ease: "power3.inOut",
        overwrite: "auto",
        force3D: true,
      });
    });
  }, [openIndex]);

  return (
    <section className="faq-section py-32 bg-white text-zinc-900" id="faq">
      <div className="section-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">

          {/* FAQ Intro - Left Sticky */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8 text-left">
              <h2 className="text-2xl lg:text-3xl font-black text-zinc-900 leading-[0.85] tracking-tighter">
                Frequently Asked <br /> Questions <span className="text-zinc-600 font-medium">(FAQs)</span>
              </h2>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "group relative p-[1px] rounded-[2.1rem] transition-all duration-700",
                  openIndex === index ? "shadow-2xl shadow-zinc-200" : "bg-zinc-100 hover:bg-zinc-200"
                )}
              >
                {/* Background Mask - Ensures content has a solid background */}
                <div className="absolute inset-[1px] bg-white rounded-[2.05rem] z-10" />

                <div className="relative z-20">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-10 py-10 flex items-center justify-between gap-8 text-left"
                  >
                    <div className="flex items-start gap-8">
                      <span className="text-xs font-black text-zinc-400 mt-1.5 shrink-0">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span className="text-xl lg:text-2xl font-bold text-zinc-900 tracking-tight leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    <div className={cn(
                      "w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center shrink-0 transition-transform duration-500",
                      openIndex === index && "rotate-45 bg-zinc-900 text-white border-zinc-900"
                    )}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0V14" stroke="currentColor" strokeWidth="2" />
                        <path d="M0 7H14" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                  </button>

                  <div
                    ref={el => { contentRefs.current[index] = el; }}
                    className="overflow-hidden h-0 opacity-0"
                  >
                    <div className="px-10 lg:pl-24 pr-12 pb-12">
                      <p className="text-lg lg:text-xl text-zinc-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
