"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  location: string;
  job_type: string;
  category: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("http://localhost:8000/api/jobs/");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch {
        // Fallback for demonstration if API is unavailable
        setJobs([
          { id: 1, title: 'Head of Marketing', category: 'Sales & Marketing', location: 'San Francisco, CA', job_type: 'Full-time' },
          { id: 2, title: 'Senior Software Engineer', category: 'Software Development', location: 'San Francisco, CA', job_type: 'Full-time' },
          { id: 3, title: 'Software Engineer', category: 'Software Development', location: 'San Francisco, CA', job_type: 'Full-time' },
          { id: 4, title: 'Founding Account Executive', category: 'Sales & Marketing', location: 'San Francisco, CA', job_type: 'Full-time' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <main className="careers-page-v2">
      <Navbar sticky={false} theme="light" />

      {/* ═══ HERO SECTION ═══ */}
      <section className="careers-hero-v2">
        <div className="careers-title-wrap">
          <h1 className="careers-title-main">
            <span className="careers-title-highlight">Careers.</span>
          </h1>
          <p className="careers-hero-sub">
            Join us to reshape the future of Technology.
          </p>
        </div>

        {/* Image Collage */}
        <div className="careers-collage">
          <div className="collage-img-1">
            <div className="collage-inner">
              <Image src="/images/careers-meeting.png" fill className="object-cover" alt="Team meeting" draggable={false} />
            </div>
          </div>
          <div className="collage-img-2">
            <div className="collage-inner">
              <Image src="/images/careers-lounge.png" fill className="object-cover" alt="Team lounge" draggable={false} />
            </div>
          </div>
          <div className="collage-img-v">
            <div className="collage-inner">
              <Image src="/images/careers-whiteboard.png" fill className="object-cover" alt="Team whiteboard" draggable={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMMERSION SECTION ═══ */}
      <section className="careers-immersion">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="values-main-title">Our Values</h2>
          <div className="values-grid">

            {/* Card 1 */}
            <div className="value-box">
              <div className="value-img-wrap">
                <div className="value-img-inner">
                  <Image src="/images/value-excellence.png" fill className="object-cover" alt="Excellence" draggable={false} />
                </div>
              </div>
              <div className="value-content">
                <div className="value-headline">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                      <path d="M3 12h18"></path>
                      <path d="M12 3v18"></path>
                    </svg>
                  </div>
                  <h4>Excellence</h4>
                </div>
                <p>We&apos;re committed to developing our talent and building great things.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="value-box">
              <div className="value-img-wrap">
                <div className="value-img-inner">
                  <Image src="/images/value-lean.png" fill className="object-cover" alt="Keep it lean" draggable={false} />
                </div>
              </div>
              <div className="value-content">
                <div className="value-headline">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                      <path d="M3 12h18"></path>
                      <path d="M12 3v9"></path>
                    </svg>
                  </div>
                  <h4>Keep it lean</h4>
                </div>
                <p>No politics or bureaucracy. You can make an impact on day 1.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="value-box">
              <div className="value-img-wrap">
                <div className="value-img-inner">
                  <Image src="/images/value-courage.png" fill className="object-cover" alt="Courage" draggable={false} />
                </div>
              </div>
              <div className="value-content">
                <div className="value-headline">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                      <path d="M7 3v18"></path>
                      <path d="M17 3v18"></path>
                    </svg>
                  </div>
                  <h4>Courage</h4>
                </div>
                <p>We value people who are excited about solving hard problems and persistently seek solutions.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="value-box">
              <div className="value-img-wrap">
                <div className="value-img-inner">
                  <Image src="/images/value-impatience.png" fill className="object-cover" alt="Impatience" draggable={false} />
                </div>
              </div>
              <div className="value-content">
                <div className="value-headline">
                  <div className="value-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                      <path d="M8 12h8"></path>
                      <path d="M12 8l4 4-4 4"></path>
                    </svg>
                  </div>
                  <h4>Impatience</h4>
                </div>
                <p>We value speed, intensity, and bias towards action.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CURRENT OPENINGS ═══ */}
      <section className="careers-openings">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="section-title-serif">Current Openings</h2>

          <div className="openings-table">
            <div className="openings-header">
              <span className="opening-label">Role</span>
              <span className="opening-label">Team</span>
              <span className="opening-label">Location</span>
              <span></span>
            </div>

            {loading ? (
              <div className="py-20 text-center text-zinc-400">Loading opportunities...</div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="opening-wrapper border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <Link href={`/careers/${job.id}`} className="block w-full">
                    <div className="opening-row items-center py-6">
                      <h3 className="opening-title hover:text-[#364835] transition-colors">{job.title}</h3>
                      <p className="opening-meta">{job.category}</p>
                      <p className="opening-meta">{job.location}</p>
                      <div className="flex justify-end items-center">
                        <span className="bg-black text-white px-5 py-2 text-[10px] tracking-widest uppercase font-bold hover:bg-zinc-800 transition-colors rounded-sm inline-block">
                          Apply
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-zinc-400">
                No current openings. Check back soon!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-32 bg-white reveal px-4 md:px-8">
        <div
          className="relative rounded-[3rem] py-12 md:py-16 px-8 md:px-16 text-center w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center overflow-hidden"
          style={{ 
            backgroundColor: '#FAF9F6',
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        >
          <h2 className="section-title !mb-6">
            Join The Team
          </h2>

          <p className="relative z-10 text-base md:text-lg text-[#4a4a4a] max-w-2xl mx-auto mb-12 font-medium">
            Connect with us today and help build high-performance institutional platforms.
          </p>

          <div className="relative z-10">
            <Link
              href="/contact"
              className="journey-btn"
              style={{ backgroundColor: '#364835' }}
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
