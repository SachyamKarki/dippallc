"use client";

import { useState, useRef, useEffect } from "react";
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
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = services.findIndex(s => s.id === activeTab);
    const activeButton = tabsRef.current[activeIndex];
    if (activeButton) {
      setSliderStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab]);

  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="strategic-capability">
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">WHAT WE OFFER ?</h2>
          <p className="max-w-2xl mx-auto text-xl font-medium text-[#1a1a1a]">
            Disciplined execution for companies that require technical excellence and systemic operational clarity.
          </p>
        </div>

        <div className="relative flex overflow-x-auto no-scrollbar md:flex-wrap justify-start md:justify-center items-center p-2 bg-slate-100/80 backdrop-blur-sm rounded-[2.5rem] max-w-full md:w-fit mx-auto mb-0 border border-slate-200">
          {/* Sliding Indicator */}
          <div 
            className="absolute h-[calc(100%-16px)] bg-white rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              opacity: sliderStyle.opacity
            }}
          />

          {services.map((service, index) => (
            <button
              key={service.id}
              ref={el => { tabsRef.current[index] = el; }}
              onClick={() => setActiveTab(service.id)}
              className={cn(
                "relative z-10 px-6 py-3 text-xs md:text-sm uppercase tracking-widest font-bold transition-colors duration-300 rounded-full",
                activeTab === service.id 
                  ? "text-slate-900" 
                  : "text-slate-500 hover:text-slate-800"
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
