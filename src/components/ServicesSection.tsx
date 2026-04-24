"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
    <section className="services-section" ref={sectionRef} id="services">
      <div className="section-shell">
        <div className="services-grid">
          {services.map((service, index) => (
            <article 
              key={service.id} 
              className={`service-row${index % 2 === 1 ? " service-row-reverse" : ""}`}
            >
              <div className="service-content">
                <span className="service-kicker">{service.kicker}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <div className="service-visual">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
