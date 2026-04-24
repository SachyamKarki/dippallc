"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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

  return (
    <section className="faq-section reveal" id="faq">

      <div className="section-shell">
        <div className="faq-layout">
          <div className="faq-intro">
            <h2 className="section-title">Institutional Continuity.</h2>
            <p className="section-subtitle">
              Engagement governance, architectural standards, and technical delivery protocols.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={cn(
                  "faq-item",
                  openIndex === index && "faq-item-active"
                )}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="faq-trigger"
                >
                  <span>{faq.question}</span>
                  <div className="faq-icon-wrapper">
                    <div className="faq-icon-line" />
                    <div className="faq-icon-line faq-icon-line-v" />
                  </div>
                </button>
                <div className="faq-content">
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
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
