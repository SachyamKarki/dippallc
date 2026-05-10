"use client";

import React from 'react';
import Button from '@/components/ui/Button';

export default function NewsletterSection() {
  return (
    <section className="pt-10 pb-10 lg:pt-16 lg:pb-24 bg-[#000000] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
        <div className="max-w-4xl text-left flex-1">
          <h2 className="text-white text-xl sm:text-2xl lg:text-4xl font-black tracking-tight leading-[1.2] mb-0" style={{ fontFamily: 'var(--font-title)' }}>
            Subscribe for the latest engineering insights.
          </h2>
        </div>

        <div className="w-full lg:max-w-md shrink-0">
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors font-bold text-left text-xs sm:text-sm"
              required
            />
            <Button
              type="submit"
              className="px-6 py-3 sm:px-8 sm:py-4 whitespace-nowrap shrink-0 font-black uppercase tracking-widest text-[10px] sm:text-xs"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
