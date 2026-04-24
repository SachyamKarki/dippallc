"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image_url: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/testimonials/");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="section-title mb-8">Client Perspective.</h1>
          <p className="text-xl text-slate-500 leading-relaxed mx-auto max-w-2xl">
            Success stories and feedback from the founders and operators we&apos;ve partnered with to build premium software systems.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <article key={t.id} className="bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100/80 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="mb-8">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-blue-600/20">
                        <path d="M10 20H15L12 28H7L10 20ZM25 20H30L27 28H22L25 20Z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-10 font-medium italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-5 pt-8 border-t border-slate-100">
                    <div className="relative w-14 h-14 overflow-hidden rounded-2xl bg-slate-200">
                      {t.image_url ? (
                        <Image
                          src={t.image_url}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                          {t.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{t.name}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 rounded-[3rem] bg-slate-50 border border-slate-100">
              <p className="text-slate-400 font-medium">No testimonials found.</p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-500" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to be our next success story?</h2>
              <p className="text-blue-100 mb-10 max-w-lg mx-auto text-lg">
                We focus on high-trust partnerships and tangible business outcomes. Let&apos;s talk about what you&apos;re building.
              </p>
              <Link href="/#contact" className="inline-flex h-14 items-center justify-center px-10 rounded-2xl bg-white text-blue-600 font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition shadow-xl">
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
