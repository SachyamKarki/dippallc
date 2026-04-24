import React from "react";

const partners = [
  "Lattice Enterprise",
  "Aura Systems",
  "Vector Global",
  "Prism Labs",
  "Nexus Operations",
  "Orbit Institutional"
];

export default function PartnersSection() {
  return (
    <section className="py-20 border-y border-zinc-100 bg-white reveal">
      <div className="section-shell">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-12">
          Global Strategic Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <span 
              key={partner} 
              className="text-2xl md:text-3xl font-serif font-bold italic tracking-tight text-zinc-900"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
