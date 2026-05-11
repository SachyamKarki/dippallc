"use client";

import { CheckCircle2, Cpu, Globe, MessageSquare, ShieldCheck, Zap } from "lucide-react";

const reasons = [
  {
    icon: <Zap size={24} className="text-white" />,
    title: "Senior led execution",
    text: "Every project is directed by principals who stay in the code. No dilution of quality via handoffs to junior executors.",
  },
  {
    icon: <Cpu size={24} className="text-white" />,
    title: "Autonomous Ops",
    text: "We design AI agent systems that reason, route work, and stay observable enough for serious businesses to trust.",
  },
  {
    icon: <ShieldCheck size={24} className="text-white" />,
    title: "Architectural Discipline",
    text: "Systems built for institutional continuity, high observability, and the ability to scale without technical debt.",
  },
  {
    icon: <MessageSquare size={24} className="text-white" />,
    title: "Direct Communication",
    text: "The process is clear, the recommendations are practical, and the conversations stay honest and evidence-based.",
  },
  {
    icon: <Globe size={24} className="text-white" />,
    title: "Business first thinking",
    text: "We connect software decisions to real company goals so the work supports growth instead of adding more noise.",
  },
  {
    icon: <CheckCircle2 size={24} className="text-white" />,
    title: "Long term leverage",
    text: "We focus on building systems that remain useful after launch, not just short term output that looks good in the moment.",
  },
];

export default function WhyDippaSection() {
  return (
    <section className="why-dippa-section" id="why-dippa">
      <div className="section-shell">
        <div className="text-center mb-20">
          <h2 className="why-dippa-title">Why Dippa?</h2>
        </div>

        <div className="why-dippa-grid">
          {reasons.map((reason, idx) => (
            <div key={idx} className="why-dippa-card">
              <div className="why-dippa-card-inner">
                <div className="why-dippa-card-header">
                  <div className="why-dippa-icon-shell">
                    {reason.icon}
                  </div>
                  <h3 className="why-dippa-card-title uppercase tracking-tighter" style={{ fontFamily: 'var(--font-title)' }}>{reason.title}</h3>
                </div>
                <p className="why-dippa-card-text">{reason.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
