"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "web-development",
    name: "Web Development",
    title: "Engineering high-authority digital environments.",
    description: "We build high-performance institutional platforms that prioritize technical integrity and systemic clarity. Your platform should be your most dependable operator, functioning with architectural precision and high-density performance.",
    image: "/images/service-web-dev.jpg",
    points: [
      "Custom architectural design and full-stack implementation for scalable, high-traffic web applications.",
      "Performance auditing and code-level optimization to ensure sub-second response times and maximum availability.",
      "Implementation of strict security protocols and compliance-ready infrastructure for sensitive digital environments."
    ]
  },
  {
    id: "app-development",
    name: "App Development",
    title: "Native and cross-platform mobile experiences.",
    description: "Custom mobile applications designed for high-stakes user engagement. We engineer intuitive, high-performance apps that seamlessly integrate with your broader operational infrastructure.",
    image: "/images/service-app-dev.jpg",
    points: [
      "End-to-end engineering of cross-platform and native mobile applications tailored for high user retention.",
      "Consultative UI/UX systems design to ensure complex operational logic translates intuitively to mobile devices.",
      "Seamless integration of mobile interfaces with existing legacy APIs and complex backend infrastructure."
    ]
  },
  {
    id: "software-development",
    name: "Software Development",
    title: "Operating systems for high-stakes business.",
    description: "Custom internal infrastructure and distributed applications designed to eliminate operational bottlenecks. We move fragmented data into a single, high-fidelity technical management surface.",
    image: "/images/service-software-dev.jpg",
    points: [
      "Strategic modernization of legacy internal systems to eliminate technical debt and operational bottlenecks.",
      "Development of bespoke, distributed enterprise applications to centralize fragmented business data.",
      "Comprehensive technical roadmap planning and enterprise architecture design for long-term scalability."
    ]
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    title: "Autonomous agents for complex workflows.",
    description: "Intelligent systems that reason, route work, and execute tasks across your existing tool stack. Our AI automation is built with observability and human-in-the-loop controls.",
    image: "/images/service-ai-agent-real.jpg",
    points: [
      "Integration of LLM-powered autonomous agents to handle complex, multi-step business workflows.",
      "Consultative auditing of your current operational stack to identify high-leverage automation opportunities.",
      "Deployment of predictive routing systems and intelligent data classification to eliminate manual overhead."
    ]
  },
  {
    id: "sales-lead",
    name: "Sales Lead",
    title: "Predictive revenue and intelligent growth architecture.",
    description: "We engineer systems that automate lead qualification, routing, and engagement. Transform your sales pipeline into a predictable, high-velocity revenue engine backed by technical leverage.",
    image: "/images/service-sales-lead.jpg",
    points: [
      "Engineering automated, predictive lead scoring systems integrated directly into your existing CRM infrastructure.",
      "Architecting intelligent sales pipelines that automatically route, qualify, and engage inbound opportunities.",
      "Data-driven revenue architecture consulting to align your technical stack with aggressive growth targets."
    ]
  }
];

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

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
  const activeIndex = services.findIndex(s => s.id === activeTab);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="strategic-capability">
      {/* Floating Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="service-orb service-orb-1" />
        <div className="service-orb service-orb-2" />
        <div className="service-orb service-orb-3" />
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">WHAT WE OFFER ?</h2>
          <p className="max-w-2xl mx-auto text-lg font-medium text-[#0a0a0a]">
            Disciplined execution for companies that require technical excellence and systemic operational clarity.
          </p>
        </div>

        <div className="relative flex overflow-x-auto no-scrollbar md:flex-wrap justify-start md:justify-center items-center p-2 bg-transparent max-w-full md:w-fit mx-auto mb-0">
          {/* Sliding Indicator */}
          <div 
            className="absolute h-[calc(100%-16px)] bg-[#364835] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
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
                "relative z-10 px-6 py-3 text-sm md:text-base font-medium transition-colors duration-300 rounded-full",
                activeTab === service.id 
                  ? "text-white" 
                  : "text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
              )}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 transition-all duration-1000 mt-8">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text Content */}
            <div key={activeService.id + "-text"} className="space-y-14 service-content-enter">
              <div className="flex flex-col">
                {/* Active service number badge */}
                <div className="service-counter-enter mb-6">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a]">
                    <span className="text-2xl font-black text-[#364835]">0{activeIndex + 1}</span>
                    <span className="w-8 h-[1.5px] bg-[#0a0a0a]" />
                    {activeService.name}
                  </span>
                </div>

                <h3 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-[#0a0a0a] service-title-enter" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  {activeService.title}
                </h3>
                <p className="mt-10 lg:mt-12 text-base lg:text-lg leading-relaxed font-medium service-desc-enter" style={{ color: '#0a0a0a' }}>
                  {activeService.description}
                </p>
              </div>
              
              <div className="space-y-10">
                <ul className="space-y-7">
                  {activeService.points.map((point, index) => (
                    <li 
                      key={activeService.id + index} 
                      className="flex items-start gap-4 text-sm lg:text-base font-semibold text-[#0a0a0a] tracking-normal service-point-enter"
                      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                    >
                      <div className="w-1.5 h-1.5 mt-2 rounded-full bg-[var(--accent)] shrink-0 service-dot-pulse" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 service-btn-enter">
                  <Link href="/products" className="button-primary inline-block px-10 py-5 text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Start your project
                  </Link>
                </div>
              </div>
            </div>

            {/* Image with 3D Tilt + Gradient Blob */}
            <div className="relative" key={activeService.id + "-img-wrap"}>
              {/* Morphing Gradient Blob */}
              <div className="service-blob" />

              <div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full aspect-[4/5] lg:aspect-square max-w-xl mx-auto overflow-hidden shadow-2xl service-image-enter"
                style={{ 
                  borderRadius: '3rem 3rem 3rem 0',
                  transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <Image
                  src={activeService.image}
                  alt={activeService.name}
                  fill
                  className="object-cover service-image-zoom"
                  priority
                />

                {/* Shine overlay on hover */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${(tilt.y / 8 + 0.5) * 100}% ${(tilt.x / -8 + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Motion Graphics Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.08); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -50px); }
          75% { transform: translate(-30px, 30px); }
        }
        @keyframes blobMorph {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: rotate(0deg) scale(1); }
          25% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: rotate(90deg) scale(1.05); }
          50% { border-radius: 50% 50% 30% 70% / 50% 40% 60% 50%; transform: rotate(180deg) scale(0.95); }
          75% { border-radius: 30% 70% 55% 45% / 55% 35% 65% 45%; transform: rotate(270deg) scale(1.02); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.8); }
        }
        @keyframes counterSlide {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .service-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.04;
        }
        .service-orb-1 {
          width: 500px; height: 500px;
          background: #364835;
          top: 10%; right: -5%;
          animation: float1 20s ease-in-out infinite;
        }
        .service-orb-2 {
          width: 350px; height: 350px;
          background: #5a7d59;
          bottom: 5%; left: 5%;
          animation: float2 25s ease-in-out infinite;
        }
        .service-orb-3 {
          width: 250px; height: 250px;
          background: #2d3e2c;
          top: 40%; left: 40%;
          animation: float3 18s ease-in-out infinite;
        }

        .service-blob {
          position: absolute;
          width: 85%;
          height: 85%;
          top: 7.5%;
          left: 7.5%;
          background: linear-gradient(135deg, rgba(54,72,53,0.08), rgba(90,125,89,0.06), rgba(54,72,53,0.04));
          animation: blobMorph 16s ease-in-out infinite;
          z-index: 0;
          pointer-events: none;
        }

        .service-content-enter {
          animation: fadeInRight 0.6s ease-out both;
        }
        .service-title-enter {
          animation: fadeInUp 0.5s ease-out both;
          animation-delay: 0.15s;
        }
        .service-desc-enter {
          animation: fadeInUp 0.5s ease-out both;
          animation-delay: 0.25s;
        }
        .service-point-enter {
          animation: fadeInUp 0.45s ease-out both;
        }
        .service-btn-enter {
          animation: fadeInUp 0.5s ease-out both;
          animation-delay: 0.55s;
        }
        .service-counter-enter {
          animation: counterSlide 0.4s ease-out both;
        }
        .service-image-enter {
          animation: scaleIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.15s;
          position: relative;
          z-index: 1;
        }
        .service-image-zoom {
          animation: slowZoom 12s ease-in-out infinite alternate;
        }
        .service-dot-pulse {
          animation: dotPulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
