"use client";

import { useEffect, useRef } from "react";
import ProgressiveImage from "@/components/ui/ProgressiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    id: "advisory",
    kicker: "01 / Alignment",
    title: "Advisory Sprint.",
    description: "Positioning, scope, architecture, and a practical delivery plan. We move from ambiguity into a concrete roadmap your team can actually execute.",
    image: "/images/service-webapp.png",
  },
  {
    id: "build",
    kicker: "02 / Execution",
    title: "Product Build.",
    description: "Web apps, internal tools, and AI-enabled workflows designed for long-term clarity. High-performance implementation that stays legible as you grow.",
    image: "/images/blog-software.png",
  },
  {
    id: "partner",
    kicker: "03 / Scale",
    title: "Embedded Partner.",
    description: "Ongoing product, engineering, and automation support. We integrate deeply with your team to maintain velocity and operational excellence.",
    image: "/images/blog-ai-automation.png",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".service-row");

      rows.forEach((row) => {
        const content = row.querySelector(".service-content");
        const visual = row.querySelector(".service-visual");

        gsap.fromTo(
          content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          visual,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="services-section bg-black py-32" ref={sectionRef} id="services">
      <div className="section-shell">
        <div className="services-grid space-y-32">
          {services.map((service, index) => (
            <article 
              key={service.id} 
              className={`service-row${index % 2 === 1 ? " service-row-reverse" : ""} flex flex-col lg:flex-row items-center gap-20`}
            >
              <div className="service-content lg:w-1/2 space-y-6">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">{service.kicker}</span>
                <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none">{service.title}</h3>
                <p className="text-xl lg:text-2xl text-white leading-relaxed font-medium">{service.description}</p>
              </div>

              <div className="service-visual lg:w-1/2 h-[500px] relative rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <ProgressiveImage
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
