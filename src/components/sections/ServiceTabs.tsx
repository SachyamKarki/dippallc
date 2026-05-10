"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const services = [
  {
    id: "web-development",
    name: "Web Development",
    title: "Engineering high authority digital environments.",
    description: "We build high performance institutional platforms that prioritize technical integrity and systemic clarity. Your platform should be your most dependable operator, functioning with architectural precision and high density performance.",
    image: "/images/service-web-dev.jpg",
    points: [
      "Custom architectural design and full stack implementation for scalable, high traffic web applications.",
      "Performance auditing and code level optimization to ensure sub second response times and maximum availability.",
      "Implementation of strict security protocols and compliance ready infrastructure for sensitive digital environments."
    ]
  },
  {
    id: "app-development",
    name: "App Development",
    title: "Native and cross platform mobile experiences.",
    description: "Custom mobile applications designed for high stakes user engagement. We engineer intuitive, high performance apps that seamlessly integrate with your broader operational infrastructure.",
    image: "/images/service-app-dev.jpg",
    points: [
      "End to end engineering of cross platform and native mobile applications tailored for high user retention.",
      "Consultative UI/UX systems design to ensure complex operational logic translates intuitively to mobile devices.",
      "Seamless integration of mobile interfaces with existing legacy APIs and complex backend infrastructure."
    ]
  },
  {
    id: "software-development",
    name: "Software Development",
    title: "Operating systems for high stakes business.",
    description: "Custom internal infrastructure and distributed applications designed to eliminate operational bottlenecks. We move fragmented data into a single, high fidelity technical management surface.",
    image: "/images/service-software-dev.jpg",
    points: [
      "Strategic modernization of legacy internal systems to eliminate technical debt and operational bottlenecks.",
      "Development of bespoke, distributed enterprise applications to centralize fragmented business data.",
      "Comprehensive technical roadmap planning and enterprise architecture design for long term scalability."
    ]
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    title: "Autonomous agents for complex workflows.",
    description: "Intelligent systems that reason, route work, and execute tasks across your existing tool stack. Our AI automation is built with observability and human in the loop controls.",
    image: "/images/service-ai-agent-real.jpg",
    points: [
      "Integration of LLM powered autonomous agents to handle complex, multi step business workflows.",
      "Consultative auditing of your current operational stack to identify high leverage automation opportunities.",
      "Deployment of predictive routing systems and intelligent data classification to eliminate manual overhead."
    ]
  },
  {
    id: "sales-lead",
    name: "Sales Lead",
    title: "Predictive revenue and intelligent growth architecture.",
    description: "We engineer systems that automate lead qualification, routing, and engagement. Transform your sales pipeline into a predictable, high velocity revenue engine backed by technical leverage.",
    image: "/images/service-sales-lead.jpg",
    points: [
      "Engineering automated, predictive lead scoring systems integrated directly into your existing CRM infrastructure.",
      "Architecting intelligent sales pipelines that automatically route, qualify, and engage inbound opportunities.",
      "Data driven revenue architecture consulting to align your technical stack with aggressive growth targets."
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
    <section className="py-24 lg:py-28 bg-white relative overflow-hidden" id="strategic-capability">
      {/* Floating Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="service-orb service-orb-1" />
        <div className="service-orb service-orb-2" />
        <div className="service-orb service-orb-3" />
      </div>

      <div className="section-shell relative z-10">
        <div className="w-full flex flex-col items-center text-center mb-8 lg:mb-10 px-1">
          <h2 className="section-title text-black mt-10 mb-6 w-full max-w-4xl mx-auto sm:mb-8">
            What we offer
          </h2>
          <p className="section-subtitle text-black mb-0! max-w-prose sm:max-w-2xl">
            Disciplined execution for companies that require technical excellence and systemic operational clarity.
          </p>
        </div>

        <div className="relative w-full max-w-full overflow-hidden mb-0">
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar justify-start sm:justify-center items-center gap-1 sm:gap-0 p-2 bg-transparent w-full">
            {/* Sliding Indicator */}
            <div 
              className="absolute h-[calc(100%-16px)] bg-[#1E293B] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
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
                  "relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 flex-shrink-0 sm:px-4 sm:text-base",
                  activeTab === service.id 
                    ? "text-white" 
                    : "text-black hover:text-black"
                )}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full pt-8 lg:pt-10 pb-4 lg:pb-8 transition-all duration-1000 mt-6 lg:mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text Content */}
            <div
              key={activeService.id + "-text"}
              className="space-y-8 lg:space-y-10 service-content-enter text-center lg:text-left"
            >
              <div className="flex flex-col max-w-prose lg:max-w-none mx-auto lg:mx-0">
                {/* Active service number badge */}
                <div className="service-counter-enter mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 lg:mb-5">
                  <span className="text-xs font-bold tabular-nums uppercase tracking-widest text-black/40">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden h-px w-8 shrink-0 bg-black/10 sm:block" aria-hidden />
                  <span className="text-sm font-semibold text-black">{activeService.name}</span>
                </div>

                <h3 className="service-title-enter text-black text-center lg:text-left">
                  {activeService.title}
                </h3>
                <p className="mt-4 text-black sm:mt-5 lg:mt-6 service-desc-enter text-center lg:text-left">
                  {activeService.description}
                </p>
              </div>
              
              <div className="space-y-8 max-w-prose lg:max-w-none">
                <ul className="space-y-5 lg:space-y-6">
                  {activeService.points.map((point, index) => (
                    <li 
                      key={activeService.id + index} 
                      className="flex items-start gap-3 text-black lg:gap-4 service-point-enter text-left"
                      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                    >
                      <div className="w-1.5 h-1.5 mt-2 shrink-0 rounded-full bg-black" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="pt-2 service-btn-enter flex justify-center lg:justify-start">
                  <Button
                    href="/products"
                    className="px-10 py-5"
                  >
                    Start your project
                  </Button>
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
                className="relative w-full aspect-[4/5] lg:aspect-square max-w-md lg:max-w-lg mx-auto overflow-hidden shadow-2xl service-image-enter"
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
          background: #1E293B;
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
