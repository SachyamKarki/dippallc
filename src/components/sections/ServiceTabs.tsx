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
    description: "High-performance institutional platforms engineered for technical integrity, architectural precision, and maximum dependability.",
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
    description: "High-performance mobile apps engineered for seamless integration and maximum user engagement.",
    image: "/images/service-app-dev.jpg",
    points: [
      "End to end engineering of cross platform and native mobile applications tailored for high user retention.",
      "Consultative UI/UX systems design to ensure complex operational logic translates intuitively to mobile devices.",
      "Seamless integration of mobile interfaces with existing legacy APIs and complex backend infrastructure."
    ]
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    title: "Autonomous agents for complex workflows.",
    description: "Intelligent systems that automate complex workflows across your tool stack with full observability and human-in-the-loop controls.",
    image: "/images/service-ai-agent-real.jpg",
    points: [
      "Integration of LLM powered autonomous agents to handle complex, multi step business workflows.",
      "Consultative auditing of your current operational stack to identify high leverage automation opportunities.",
      "Deployment of predictive routing systems and intelligent data classification to eliminate manual overhead."
    ]
  },
  {
    id: "software-development",
    name: "Software Development",
    title: "Operating systems for high stakes business.",
    description: "Custom distributed applications that eliminate operational bottlenecks and centralize fragmented business data.",
    image: "/images/service-software-dev.jpg",
    points: [
      "Strategic modernization of legacy internal systems to eliminate technical debt and operational bottlenecks.",
      "Development of bespoke, distributed enterprise applications to centralize fragmented business data.",
      "Comprehensive technical roadmap planning and enterprise architecture design for long term scalability."
    ]
  }
];

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIndex = services.findIndex(s => s.id === activeTab);
    const activeButton = tabsRef.current[activeIndex];
    if (activeButton) {
      setSliderStyle({
        left: activeButton.offsetLeft,
        top: activeButton.offsetTop,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
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
    <section className="py-12 lg:py-36 bg-white relative overflow-hidden" id="strategic-capability">

      <div className="section-shell relative z-10">
        <div className="w-full flex flex-col items-center text-center mb-4 lg:mb-6">
          <h2 className="section-title st-title mt-0 mb-4 w-full max-w-4xl mx-auto sm:mb-6 font-black">
            What We Offer
          </h2>
          <p
            className="section-subtitle st-text max-w-prose sm:max-w-2xl text-base opacity-80"
            style={{ fontFamily: 'var(--font-main)' }}
          >
            Disciplined execution for companies that require technical excellence and systemic operational clarity.
          </p>
        </div>

        {/* Mobile: static stacked list of all services */}
        <div className="sm:hidden w-full px-4 mt-4 flex flex-col divide-y divide-black/10">
          {services.map((service, index) => (
            <div key={service.id} className="py-6 first:pt-2">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.18em', color: '#000', marginBottom: '0.5rem' }}>
                {String(index + 1).padStart(2, "0")}{"  "}{service.name}
              </p>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.9375rem', fontWeight: 700, lineHeight: 1.35, color: '#000', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {service.title}
              </p>
              <p style={{ fontFamily: 'var(--font-main)', fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.7, color: '#000', marginBottom: '0.75rem' }}>
                {service.description}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {service.points.map((point, pi) => (
                  <li key={pi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontFamily: 'var(--font-main)', fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.7, color: '#000' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#364835', marginTop: '0.6rem', flexShrink: 0 }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: pill tabs + active service panel */}
        <div className="hidden sm:block">
          <div className="w-full max-w-full overflow-hidden mb-0">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar justify-center items-center gap-4 px-8 py-2 bg-transparent w-full relative">
              <div
                className="absolute h-[calc(100%-16px)] bg-[#364835] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  left: `${sliderStyle.left}px`,
                  top: `${sliderStyle.top}px`,
                  width: `${sliderStyle.width}px`,
                  height: `${sliderStyle.height}px`,
                  opacity: sliderStyle.opacity
                }}
              />
              {services.map((service, index) => (
                <button
                  key={service.id}
                  ref={el => { tabsRef.current[index] = el; }}
                  onClick={() => setActiveTab(service.id)}
                  className="st-tab relative z-10 rounded-full px-7 py-3.5 text-base font-black whitespace-nowrap text-center transition-colors duration-300 flex-shrink-0"
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full pt-14 pb-10 transition-all duration-1000 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div
                key={activeService.id + "-text"}
                className="space-y-12 service-content-enter text-left flex flex-col items-start"
              >
                <div className="flex flex-col w-full items-start">
                  <div className="service-counter-enter mb-5 flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
                    <span className="text-sm font-bold tabular-nums uppercase tracking-[0.2em] text-black">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="block h-px w-8 shrink-0 bg-black/20" aria-hidden />
                    <span className="text-sm font-bold text-black uppercase tracking-wider">{activeService.name}</span>
                  </div>
                  <h3 className="st-title service-title-enter text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] mt-2">
                    {activeService.title}
                  </h3>
                  <p
                    className="st-text mt-8 service-desc-enter leading-relaxed max-w-2xl font-normal text-base opacity-90"
                    style={{ fontFamily: 'var(--font-main)' }}
                  >
                    {activeService.description}
                  </p>
                </div>
                <ul className="space-y-6 max-w-none text-left">
                  {activeService.points.map((point, index) => (
                    <li
                      key={activeService.id + index}
                      className="st-text flex items-start gap-3 service-point-enter text-left leading-relaxed font-normal text-base opacity-85"
                      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                    >
                      <div className="w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-black/30" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative" key={activeService.id + "-img-wrap"}>
                <div
                  ref={imageRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative w-full aspect-square max-w-md lg:max-w-lg mx-auto overflow-hidden shadow-2xl service-image-enter"
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
      </div>

      {/* Advanced Motion Graphics Styles */}
      <style jsx>{`
        .st-title {
          font-family: var(--font-playfair);
          color: #000000;
        }
        .st-text {
          font-family: var(--font-lato);
          color: #000000;
        }
        .st-tab {
          font-family: var(--font-main);
          letter-spacing: 0.01em;
        }

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

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.8); }
        }
        @keyframes counterSlide {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
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
