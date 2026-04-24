"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function AboutTeaser() {
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!graphicRef.current) return;

    // Sophisticated orb/prism animation
    gsap.to(graphicRef.current.querySelectorAll(".graphic-shape"), {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, []);

  return (
    <section className="py-32 bg-white reveal overflow-hidden" id="vision">
      <div className="section-shell relative">
        {/* Subtle Background Motion Graphics */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none" ref={graphicRef}>
          <div className="graphic-shape w-64 h-64 border border-zinc-900 rounded-full blur-3xl absolute" />
          <div className="graphic-shape w-96 h-96 border border-zinc-900 rounded-full blur-2xl absolute opacity-50" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-zinc-400 mb-8">
            Strategic Identity
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight leading-none">
            Architecting Institutional Continuity.
          </h3>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed mb-12 max-w-2xl mx-auto">
            Dippa provides the senior-led precision required to build resilient, autonomous systems that compound in value over time.
          </p>
          <div className="flex justify-center">
            <Link href="/about" className="button-primary px-10">
              Explore Our Vision
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
