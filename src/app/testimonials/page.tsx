"use client";

import { useEffect, useState } from "react";
import ProgressiveImage from "@/components/ui/ProgressiveImage";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Spinner from "@/components/ui/Spinner";

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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(`${apiUrl}/api/testimonials/`);
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
      <PageHero
        kicker="Client Stories"
        title="Client Perspective."
        subtitle="Success stories and feedback from the founders and operators we've partnered with to build premium software systems."
      />

      <section className="pb-32">
        <div className="section-shell">
          {loading ? (
            <div className="flex justify-center py-32">
              <Spinner size={32} />
            </div>
          ) : testimonials.length > 0 ? (
            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <article key={t.id} className="testimonial-card">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-person">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full bg-slate-200 flex-shrink-0">
                      {t.image_url ? (
                        <ProgressiveImage
                          src={t.image_url}
                          alt={t.name}
                          fill
                          sizes="48px"
                          quality={60}
                          className="testimonial-avatar"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold">
                          {t.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
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
        <div className="section-shell">
          <div className="bg-blue-600 rounded-[3.5rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-500" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to be our next success story?</h2>
              <p className="text-blue-100 mb-10 max-w-lg mx-auto text-lg">
                We focus on high-trust partnerships and tangible business outcomes. Let&apos;s talk about what you&apos;re building.
              </p>
              <Link href="/contact" className="button-primary inline-flex h-14 items-center justify-center px-10 font-black uppercase tracking-widest text-xs shadow-xl">
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
