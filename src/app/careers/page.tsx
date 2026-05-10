"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Job } from '@/types';
import Button from '@/components/ui/Button';
import { Briefcase, Zap, Shield, Users, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch - replace with real API call if needed
    setJobs([]);
    setLoading(false);
  }, []);

  const values = [
    {
      title: "Excellence",
      description: "We are committed to developing our talent and building great things. Quality is not a compromise; it is our baseline.",
      icon: <Zap className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Lean Execution",
      description: "No politics or bureaucracy. You can make an impact on day 1. We value people who move fast and break bottlenecks.",
      icon: <Users className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Technical Courage",
      description: "We value people who are excited about solving hard problems and persistently seek solutions in complex landscapes.",
      icon: <Shield className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Radical Ownership",
      description: "Every member of our group is a principal. We take full responsibility for the architectural integrity of our systems.",
      icon: <Briefcase className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* ═══ HERO SECTION ═══ */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="section-shell relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter text-black uppercase" style={{ fontFamily: 'var(--font-lato)' }}>
                Join the Group.
              </h1>
              <p className="text-lg lg:text-xl text-black/70 max-w-2xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
                We are building a culture of senior product judgment, architectural precision, and high velocity execution. No juniors, no dilution, just engineering excellence.
              </p>
              <div className="flex justify-center lg:justify-start gap-4">
                <Button href="#openings" className="px-10 py-5">
                  View Openings
                </Button>
              </div>
            </div>

            {/* Restored Collage */}
            <div className="lg:w-1/2 relative h-[400px] w-full max-w-lg mx-auto">
              <div className="absolute top-0 left-0 w-64 h-48 rounded-3xl overflow-hidden shadow-2xl rotate-[-6deg] z-10 border-4 border-white">
                <Image src="/images/careers-meeting.png" fill className="object-cover" alt="Team meeting" />
              </div>
              <div className="absolute top-20 right-0 w-64 h-48 rounded-3xl overflow-hidden shadow-2xl rotate-[4deg] z-20 border-4 border-white">
                <Image src="/images/careers-lounge.png" fill className="object-cover" alt="Team lounge" />
              </div>
              <div className="absolute bottom-0 left-20 w-48 h-64 rounded-3xl overflow-hidden shadow-2xl rotate-[2deg] z-30 border-4 border-white">
                <Image src="/images/careers-whiteboard.png" fill className="object-cover" alt="Team whiteboard" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES SECTION ═══ */}
      <section className="py-24 bg-[#f8f9f8]">
        <div className="section-shell">
          <div className="mb-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight text-black uppercase" style={{ fontFamily: 'var(--font-lato)' }}>
              How We Work
            </h2>
            <p className="text-black/60 max-w-xl mx-auto font-medium">
              Dippa is not just a workplace; it is a technical management surface for senior talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={value.image} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={value.title}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black shadow-lg">
                    {value.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold mb-3 text-black uppercase tracking-tight" style={{ fontFamily: 'var(--font-lato)' }}>
                    {value.title}
                  </h4>
                  <p className="text-black/70 text-sm leading-relaxed font-medium">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OPENINGS SECTION ═══ */}
      <section className="py-24 lg:py-32" id="openings">
        <div className="section-shell">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight text-black uppercase" style={{ fontFamily: 'var(--font-lato)' }}>
                Current Opportunities
              </h2>
              <p className="text-black/60 font-medium">
                Find your place within our high performance engineering culture.
              </p>
            </div>
            <div className="bg-black/5 px-6 py-3 rounded-full border border-black/5 text-sm font-bold uppercase tracking-widest text-black/50">
              {jobs.length} Positions Active
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center font-medium text-black/40">Synchronizing opportunities...</div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <Link 
                  key={job.id} 
                  href={`/careers/${job.id}`}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-white border border-black/5 rounded-3xl hover:border-black/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4 md:mb-0">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 mb-2 block">
                      {job.category}
                    </span>
                    <h3 className="text-2xl font-bold text-black group-hover:text-black transition-colors" style={{ fontFamily: 'var(--font-lato)' }}>
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-sm font-bold text-black/50 uppercase tracking-widest">
                      {job.location}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-24 px-8 text-center bg-[#f8f9f8] rounded-[3rem] border border-dashed border-black/10">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 border border-black/5">
                    <Briefcase className="w-10 h-10 text-black/20" />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tight" style={{ fontFamily: 'var(--font-lato)' }}>
                    No Open Seats
                  </h3>
                  <p className="text-black/60 mb-10 font-medium leading-relaxed">
                    We aren&apos;t currently hiring for any specific roles, but we are always looking for senior talent to join our ecosystem.
                  </p>
                  <Button href="/contact" className="px-10 py-5">
                    Open Application
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white reveal px-4 md:px-8">
        <div className="section-shell">
          <div
            className="relative rounded-[3rem] py-12 md:py-24 px-8 md:px-16 text-center w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center overflow-hidden"
            style={{
              backgroundColor: '#FAF9F6',
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          >
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black text-black mb-8 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-lato)' }}>
                Start Your Journey.
              </h2>
              <p className="text-black/70 text-lg lg:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                Book a discovery call and let&apos;s map your technical landscape into a clear, institutional-grade architectural plan.
              </p>
              <Button href="/contact" className="px-12 py-6">
                Book Discovery Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
