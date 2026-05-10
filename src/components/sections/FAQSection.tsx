"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const faqs = [
  {
    question: "What is the typical timeline from kickoff to launch?",
    answer: "Most engagements move from strategic discovery to a production-ready first release within 4 to 8 weeks. We prioritize deploying high-fidelity prototypes early, allowing your team to validate with real users and iterate based on market evidence rather than assumptions.",
  },
  {
    question: "How does Dippa integrate with our existing team?",
    answer: "We operate as either a standalone execution partner or an embedded extension of your engineering team. In both models, we maintain full architectural transparency, comprehensive documentation, and weekly progress reviews to ensure seamless alignment with your internal roadmap and tech stack.",
  },
  {
    question: "What types of AI automation do you build?",
    answer: "We engineer intelligent agents that automate complex, multi-step business workflows across your existing tool stack. Every system is built with full observability, human-in-the-loop governance, and clearly defined operational boundaries to ensure reliability and accountability in production environments.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes. Our Embedded Partner framework provides continuous engineering leadership, performance monitoring, and iterative feature development post-launch. We treat every deployment as a living system that evolves alongside your business objectives, not a one-time deliverable.",
  },
  {
    question: "How is pricing structured for your engagements?",
    answer: "We offer flexible engagement models tailored to scope and complexity. Options include fixed-scope project pricing for defined deliverables, and retainer-based partnerships for ongoing development and strategic advisory. Every engagement begins with a complimentary discovery session to define scope and align expectations.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

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

    // Removed title follow animation to keep title fixed on the left
  }, [openIndex]);

  return (
    <section className="faq-section pt-12 pb-12 lg:pt-[24rem] lg:pb-32 bg-white text-zinc-900" id="faq">
      <div className="section-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-32">

          {/* FAQ Intro - Left Sticky */}
          <div className="lg:col-span-4 relative h-full">
            <div
              ref={titleRef}
              className="lg:sticky lg:top-32 space-y-8 text-left"
            >
              <h2 className="section-title !text-left !mb-0 !text-2xl lg:!text-[clamp(2.4rem,4vw,3.6rem)]">
                Frequently Asked <br /> Questions <span className="text-[#1E293B] font-medium">(FAQs)</span>
              </h2>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={el => { faqRefs.current[index] = el; }}
                className={cn(
                  "group relative rounded-xl lg:rounded-[2.1rem] transition-all duration-700",
                  openIndex === index ? "" : ""
                )}
              >
                {/* Background Mask - Ensures content has a solid background */}
                <div className="absolute inset-[1px] bg-white rounded-xl lg:rounded-[2.05rem] z-10" />

                <div className="relative z-20">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-4 py-5 lg:px-8 lg:py-8 flex items-center justify-between gap-4 lg:gap-8 text-left"
                  >
                    <div className="flex items-start gap-3 lg:gap-8">
                      <span className="text-xs font-black text-black mt-1.5 shrink-0">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span className="text-base lg:text-2xl font-black text-black tracking-tighter leading-tight" style={{ fontFamily: 'var(--font-title)' }}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={cn(
                      "w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500",
                      openIndex === index && "rotate-45 bg-[#1E293B] text-white"
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
                    <div className="px-4 lg:pl-24 pr-6 lg:pr-12 pb-6 lg:pb-12">
                      <p className="text-xs lg:text-base text-black font-medium leading-relaxed">
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
