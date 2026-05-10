"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Job } from '@/types';
import Button from '@/components/ui/Button';

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setJobs([]);
    setLoading(false);
  }, []);

  return (
    <main className="careers-page-v2">

      {/* ═══ HERO SECTION ═══ */}
      <section className="careers-hero-v2">
        <div className="section-shell flex flex-col lg:flex-row lg:justify-center lg:items-start gap-5 lg:gap-8 w-full">
          <div className="careers-title-wrap max-w-sm lg:max-w-[20rem] shrink-0">
            <h1 className="careers-title-main">
              <span className="careers-title-highlight font-black tracking-tighter">Careers.</span>
            </h1>
            <p className="careers-hero-sub max-w-prose">
              We are building a culture of senior product judgment, architectural precision, and high-velocity execution.
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
        </div>
      </section>

      {/* ═══ IMMERSION SECTION ═══ */}
      <section className="careers-immersion">
        <div className="section-shell">
          <h2 className="values-main-title">Our Values</h2>
          <div className="values-grid">

            {/* Card 1 */}
            <div className="value-box">
              <div className="value-img-wrap">
                <div className="value-img-inner">
                  <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" fill className="object-cover" alt="Excellence" draggable={false} unoptimized />
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
                  <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop" fill className="object-cover" alt="Keep it lean" draggable={false} unoptimized />
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
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" fill className="object-cover" alt="Courage" draggable={false} unoptimized />
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
                  <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" fill className="object-cover" alt="Impatience" draggable={false} unoptimized />
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
        <div className="section-shell">
          <h2 className="section-title-serif">Current Openings</h2>

          <div className="openings-table">
            {jobs.length > 0 && (
              <div className="openings-header">
                <span className="opening-label">Role</span>
                <span className="opening-label">Team</span>
                <span className="opening-label">Location</span>
                <span></span>
              </div>
            )}

            {loading ? (
              <div className="py-12 text-center careers-body-text text-sm text-[#0a0a0a]/70">Loading opportunities...</div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="opening-wrapper border-b border-[#e5e5e5] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <Link href={`/careers/${job.id}`} className="block w-full">
                    <div className="opening-row items-center">
                      <h3 className="opening-title transition-colors">{job.title}</h3>
                      <p className="opening-meta">{job.category}</p>
                      <p className="opening-meta">{job.location}</p>
                      <div className="flex justify-end items-center">
                        <Button href={`/careers/${job.id}`} variant="secondary" className="px-5 py-2 !text-[9px]">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="py-14 px-6 sm:px-8 text-center bg-[#f9f9f9] rounded-2xl border border-dashed border-[#d1d1d1]">
                <div className="max-w-md mx-auto">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm">
                    <svg className="w-6 h-6 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a0a0a] mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                    No Active Openings
                  </h3>
                  <p className="careers-body-text text-sm text-[#0a0a0a] mb-6 leading-relaxed">
                    We aren&apos;t currently hiring for any specific roles, but we&apos;re always looking for senior-level talent to join our network.
                  </p>
                  <Button href="/contact" variant="navy" className="px-6 py-3 !text-[0.65rem]">
                    Open Application
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-16 md:py-20 bg-white reveal">
        <div className="section-shell">
          <div
            className="relative rounded-2xl md:rounded-[2rem] py-8 md:py-10 px-6 md:px-10 text-center w-full max-w-xl mx-auto flex flex-col items-center justify-center overflow-hidden"
            style={{
              backgroundColor: '#FAF9F6',
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          >
            <h2 className="section-title !mb-4">
              Join The Team
            </h2>

            <p className="careers-body-text relative z-10 text-sm md:text-base text-[#0a0a0a] max-w-prose mx-auto mb-8 font-medium">
              Connect with us today and help build high-performance institutional platforms.
            </p>

            <div className="relative z-10">
              <Button href="/contact" variant="navy" className="px-10 py-5">
                Let&apos;s Connect
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
