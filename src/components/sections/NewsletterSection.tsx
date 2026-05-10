"use client";

import React from 'react';
import Button from '@/components/ui/Button';

export default function NewsletterSection() {
  return (
    <section className="pt-32 pb-12 lg:pt-56 lg:pb-24 bg-[#000000] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-4xl text-left flex-1">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.2] mb-0" style={{ fontFamily: 'var(--font-title)' }}>
            Subscribe to our site to get the latest discoveries in tech, software architecture, and engineering innovation.
          </h2>
        </div>
        
        <div className="w-full max-w-md shrink-0">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors font-bold text-left text-sm"
              required
            />
            <Button 
              type="submit" 
              className="px-8 py-4 whitespace-nowrap shrink-0 font-black uppercase tracking-widest text-xs"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-[13px] text-white mt-4 font-bold text-left tracking-wide" style={{ fontFamily: 'var(--font-lato)' }}>
            Practical engineering insights. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
