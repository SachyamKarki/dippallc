"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the typical timeline from kickoff to launch?",
    answer:
      "Most engagements move from strategic discovery to a production-ready first release within 4 to 8 weeks. We prioritize deploying high-fidelity prototypes early so your team can validate with real users and iterate on market evidence — not assumptions.",
  },
  {
    question: "How does Dippa integrate with our existing team?",
    answer:
      "We operate as either a standalone execution partner or an embedded extension of your engineering team. In both models we maintain full architectural transparency, comprehensive documentation, and weekly progress reviews — seamlessly aligned with your internal roadmap.",
  },
  {
    question: "What types of AI automation do you build?",
    answer:
      "We engineer intelligent agents that automate complex, multi-step business workflows across your existing tool stack. Every system is built with full observability, human-in-the-loop governance, and clearly defined operational boundaries so it stays reliable in production.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. Our Embedded Partner framework provides continuous engineering leadership, performance monitoring, and iterative feature development post-launch. We treat every deployment as a living system that evolves alongside your business — not a one-time deliverable.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "We offer fixed-scope project pricing for defined deliverables, and retainer-based partnerships for ongoing development and strategic advisory. Every engagement begins with a complimentary discovery session to align on scope and expectations.",
  },
  {
    question: "Can you work with our existing codebase?",
    answer:
      "Absolutely. We routinely conduct technical audits, inherit legacy systems, and modernize codebases incrementally — without burning everything down. Our first step is always to understand what's working before recommending change.",
  },
];

export default function FAQSection({ onContactPage = false }: { onContactPage?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    bodyRefs.current.forEach((el, i) => {
      if (!el) return;
      if (openIndex === i) {
        el.style.height = el.scrollHeight + "px";
        el.style.opacity = "1";
      } else {
        el.style.height = "0px";
        el.style.opacity = "0";
      }
    });
  }, [openIndex]);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className={cn("faq-section", onContactPage && "faq-section--contact")} id="faq">
      <div className="section-shell faq-section-shell">
        <div className="faq-heading-block">
          <p className="faq-kicker">FAQ</p>
          <h2 className="faq-title">Questions we hear often.</h2>
          <p className="faq-subtitle">
            {onContactPage ? (
              <>Everything below covers how we work, timelines, and engagement models — before you submit your inquiry.</>
            ) : (
              <>
                If your question isn&apos;t answered here,{" "}
                <a href="/contact" className="underline underline-offset-2 text-[var(--accent)] font-semibold">
                  send us a message
                </a>{" "}
                — we respond within one business day.
              </>
            )}
          </p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? " faq-item-open" : ""}`}>
              <button className="faq-trigger" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <div className="faq-trigger-left">
                  <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="faq-question">{faq.question}</span>
                </div>
                <div className="faq-icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0V12" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M0 6H12" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </button>
              <div
                ref={(el) => { bodyRefs.current[i] = el; }}
                className="faq-body"
                style={{ height: i === 0 ? "auto" : "0px", opacity: i === 0 ? 1 : 0 }}
              >
                <div className="faq-body-inner">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
