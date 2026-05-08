"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "website",
    name: "Platforms",
    title: "Engineering high-authority digital environments.",
    description: "We build high-performance institutional platforms that prioritize technical integrity and systemic clarity. Your platform should be your most dependable operator, functioning with architectural precision and high-density performance.",
    image: "/images/service-website.png",
    points: ["Institutional-grade architecture", "High-density performance", "Systemic security standards"]
  },
  {
    id: "software",
    name: "Systems",
    title: "Operating systems for high-stakes business.",
    description: "Custom internal infrastructure and distributed applications designed to eliminate operational bottlenecks. We move fragmented data into a single, high-fidelity technical management surface.",
    image: "/images/blog-software.png",
    points: ["Distributed infrastructure", "Enterprise state management", "Technical transformation"]
  },
  {
    id: "ai-agent",
    name: "AI Agent",
    title: "Autonomous agents for complex workflows.",
    description: "Intelligent systems that reason, route work, and execute tasks across your existing tool stack. Our agents are built with observability and human-in-the-loop controls.",
    image: "/images/blog-ai-automation.png",
    points: ["LLM-powered orchestration", "Predictive lead routing", "Automated support resolution"]
  },
  {
    id: "automation",
    name: "Automation",
    title: "Velocity through systemic orchestration.",
    description: "Eliminate repetitive manual overhead by connecting your apps into a unified velocity engine. We design systems that handle the busy work so your team can focus on strategy.",
    image: "/images/service-webapp.png",
    points: ["Custom API integrations", "Process bottleneck removal", "Operational transparency"]
  },
  {
    id: "seo",
    name: "Deep Tech",
    title: "Technical advisory and research-led execution.",
    description: "Complex technical decisions are a matter of institutional authority. We provide advisory and deep research to ensure your roadmap is backed by architectural soundess and operational leverage.",
    image: "/images/blog-consulting.png",
    points: ["Architectural auditing", "Technical roadmap research", "Systemic leverage strategy"]
  }
];

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id);

  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (
    <section className="py-[12rem] bg-white relative overflow-hidden" id="strategic-capability">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Strategic Capability.</h2>
          <p className="max-w-2xl mx-auto text-xl font-medium text-slate-600">
            Disciplined execution for companies that require technical excellence and systemic operational clarity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-0 px-6">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={cn(
                "px-8 py-3 text-sm font-bold tracking-tight transition-all duration-500 border",
                activeTab === service.id 
                  ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg scale-105" 
                  : "bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-900"
              )}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-white border-y border-slate-100 py-16 lg:py-24 transition-all duration-1000 mt-16">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 font-title" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {activeService.title}
              </h3>
              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed font-sans">
                {activeService.description}
              </p>
              
              <ul className="space-y-5">
                {activeService.points.map(point => (
                  <li key={point} className="flex items-center gap-4 text-sm font-bold text-slate-800 uppercase tracking-wide font-subtitle">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <button className="button-primary px-10 py-5 font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  Start your project
                </button>
              </div>
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-[3rem] border border-slate-100 bg-white lg:h-[600px] shadow-2xl transition-all duration-700">
              <Image
                src={activeService.image}
                alt={activeService.name}
                fill
                className="object-cover"
                key={activeService.id}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
