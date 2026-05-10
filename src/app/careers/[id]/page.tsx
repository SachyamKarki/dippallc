"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Job } from '@/types';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:8000/api/jobs/${id}/`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
        } else {
          // Fallback logic
          setJob({
            id: Number(id),
            title: 'Sample Engineering Role',
            category: 'Software Development',
            location: 'San Francisco, CA',
            job_type: 'Full-time',
            description: 'We are looking for a highly driven professional to join our team. You will be instrumental in scaling our high-performance culture and building innovative solutions that modernize the contract lifecycle at Dippa.'
          });
        }
      } catch {
        setJob({
          id: Number(id),
          title: 'Sample Engineering Role',
          category: 'Software Development',
          location: 'San Francisco, CA',
          job_type: 'Full-time',
          description: 'We are looking for a highly driven professional to join our team. You will be instrumental in scaling our high-performance culture and building innovative solutions that modernize the contract lifecycle at Dippa.'
        });
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <main className="careers-page-v2 flex items-center justify-center min-h-screen">
        <div className="text-zinc-400">Loading job details...</div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="careers-page-v2 flex items-center justify-center min-h-screen">
        <div className="text-zinc-400">Job not found.</div>
      </main>
    );
  }

  return (
    <main className="careers-page-v2 pb-32">

      <section className="pt-40 max-w-4xl mx-auto px-6">
        <div className="mb-8 border-b border-[#e5e5e5] pb-8">
            <Link href="/careers" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors inline-block mb-12 uppercase tracking-widest font-bold">
                &larr; Back to Careers
            </Link>
          <h1 className="text-5xl font-medium text-[#1a1a1a] mb-6 tracking-tight leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm uppercase tracking-widest font-bold text-zinc-500">
            <span className="bg-zinc-100 px-3 py-1 rounded-sm">{job.category}</span>
            <span className="bg-zinc-100 px-3 py-1 rounded-sm">{job.location}</span>
            <span className="bg-zinc-100 px-3 py-1 rounded-sm">{job.job_type}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-[#4a4a4a] leading-relaxed mb-16">
          {job.description ? (
            <p>{job.description}</p>
          ) : (
            <>
              <p className="mb-6">
                We are looking for a highly driven <strong>{job.title}</strong> to join our team in {job.location}.
                As a key member contributing to our {job.category} division, you will be instrumental in scaling our high-performance culture and building innovative solutions that modernize the contract lifecycle at Dippa.
              </p>
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">Responsibilities</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>Drive end-to-end execution of core strategies.</li>
                  <li>Collaborate directly with cross-functional teams and leadership.</li>
                  <li>Establish new standards for quality, speed, and precision in your domain.</li>
              </ul>
              <h3 className="text-xl font-medium text-[#1a1a1a] mb-4 mt-8">What We Value</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>A profound sense of urgency and ownership.</li>
                  <li>Extremely high standards for the things you build.</li>
                  <li>Willingness to dive straight into ambiguity and create structure.</li>
              </ul>
            </>
          )}
        </div>

        <div>
          <a
            href={`mailto:careers@dippa.com?subject=Application for ${job.title}`}
            className="inline-flex min-h-14 items-center justify-center px-10 bg-black text-white text-sm tracking-widest uppercase font-semibold hover:bg-zinc-800 transition-colors rounded-sm"
          >
            Apply for this role
          </a>
        </div>
      </section>
    </main>
  );
}
