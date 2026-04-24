"use client";

import Image from "next/image";
import { businesses, leadership } from "@/lib/data";
import { CodeIcon, CpuIcon, CompassIcon } from "@/components/Icons";

const iconMap: Record<string, () => React.ReactNode> = {
  code: () => <CodeIcon />,
  cpu: () => <CpuIcon />,
  compass: () => <CompassIcon />,
};

export default function CompanyInfoPage() {
  return (
    <main className="min-h-screen bg-[var(--color-cream)]">
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="section-label mb-6">Company Overview</p>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tighter text-slate-900 mb-10 max-w-4xl">
            Architecting the <span className="text-slate-400">operating systems</span> of modern industry.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            Dippa Group is a technical parent company that builds software products, orchestrates agentic AI workflows, and delivers high-impact digital consulting.
          </p>
        </div>
      </section>

      {/* ═══ VISION & MISSION ═══ */}
      <section className="section bg-white border-y border-slate-100 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Our Vision & Mission</h2>
              <div className="space-y-12">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2">The Mission</p>
                  <p className="text-2xl font-medium text-slate-700 leading-snug">
                    To build the infrastructure of the future through radical clarity and relentless technical execution.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2">The Vision</p>
                  <p className="text-2xl font-medium text-slate-700 leading-snug">
                    A world where businesses operate with zero friction and maximum intelligence, powered by systems that compound in value.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-64 rounded-3xl bg-slate-50 border border-slate-100 p-8 flex flex-col justify-end">
                <p className="text-4xl font-bold text-slate-900 mb-2">3</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-tight">Core Divisions</p>
              </div>
              <div className="h-64 rounded-3xl bg-slate-900 p-8 flex flex-col justify-end">
                <p className="text-4xl font-bold text-white mb-2">50+</p>
                <p className="text-sm font-medium text-white/50 uppercase tracking-tight">Projects Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIVISIONS ═══ */}
      <section id="divisions" className="section py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <p className="section-label">Structure</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-4">Three verticals, one clear mission.</h2>
          </div>

          <div className="space-y-16">
            {businesses.map((business, i) => (
              <div key={business.name} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full relative group">
                  <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl relative">
                    <Image
                      src={business.image}
                      alt={business.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center z-10 text-blue-600">
                    {iconMap[business.icon]()}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Division {String(i+1).padStart(2, '0')}</span>
                  <h3 className="text-4xl font-bold text-slate-900 mt-4 mb-6">{business.name}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">{business.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 border-t border-slate-100 pt-8">
                    {business.focus?.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm font-semibold text-slate-800 uppercase tracking-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section className="section bg-slate-50 border-y border-slate-200 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <p className="section-label">Team</p>
            <h2 className="text-4xl font-bold text-slate-900 mt-4">The minds behind the move.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 border border-slate-100">
                  <Image src={person.avatar} alt={person.name} width={80} height={80} className="object-cover" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{person.name}</h3>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{person.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white py-32 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">Group Synergy</h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-12">
            While each division operates independently, our clients benefit from the collective knowledge and modular platforms developed across the entire group.
          </p>
          <div className="inline-flex gap-8 items-center text-slate-300">
            <span className="h-px w-24 bg-slate-100" />
            <div className="flex gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <div className="w-3 h-3 rounded-full bg-slate-900" />
              <div className="w-3 h-3 rounded-full bg-slate-400" />
            </div>
            <span className="h-px w-24 bg-slate-100" />
          </div>
        </div>
      </section>

    </main>
  );
}
