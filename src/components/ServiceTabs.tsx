"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "website",
    name: "Website",
    title: "Digital products that shape brand authority.",
    description: "We build high-performance editorial websites that prioritize brand confidence and user clarity. Your website should be your most effective salesperson, operating with disciplined design and massive typography.",
    image: "/images/service-website.png",
    points: ["Editorial-standard design", "Performance-first engineering", "Seamless mobile experience"]
  },
  {
    id: "software",
    name: "Softwares",
    title: "Operating systems for modern business.",
    description: "Custom internal platforms and web applications designed to solve operational bottlenecks. We move your fragmented data into a single, high-output management surface.",
    image: "/images/blog-software.png",
    points: ["Workflow automation", "Centralized data systems", "Scalable cloud architecture"]
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
    name: "SEO",
    title: "Search dominance and organic reach.",
    description: "Search results are a matter of technical integrity and authority. We optimize your structure and content to ensure your brand is discovered by high-intent audiences.",
    image: "/images/blog-consulting.png",
    points: ["Technical SEO audits", "Authority-building content", "Strategic keyword ranking"]
  }
];

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(services[0].id);

  const activeService = services.find(s => s.id === activeTab) || services[0];

  return (
    <section className="service-tabs-section reveal">

      <div className="section-shell">
        <div className="text-center mb-16">
          <h2 className="section-title">Strategic Capability.</h2>
          <p className="section-subtitle mt-4">Disciplined execution for companies that require technical excellence.</p>
        </div>

        <div className="tab-navigation">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              className={cn(
                "tab-button",
                activeTab === service.id && "tab-button-active"
              )}
            >
              {service.name}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className="tab-content-grid">
            <div className="tab-copy">
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>
              
              <ul className="tab-points">
                {activeService.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="mt-10">
                <button className="button-primary">Start your project</button>
              </div>
            </div>

            <div className="tab-visual">
              <div className="tab-visual-inner">
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
      </div>
    </section>
  );
}
