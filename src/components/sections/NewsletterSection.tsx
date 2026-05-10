"use client";

import React from 'react';
import Button from '@/components/ui/Button';

export default function NewsletterSection() {
  return (
    <section className="pt-32 pb-12 lg:pt-56 lg:pb-24 bg-[#000000] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-3xl text-left flex-1">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Newsletter.
          </h2>
          <p className="text-lg text-white font-medium leading-relaxed">
            Subscribe to our site to get the latest discoveries in tech, software architecture, and engineering innovation.
          </p>
        </div>
        
        <div className="w-full max-w-md shrink-0">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your work email" 
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors font-medium text-left"
              required
            />
            <Button 
              type="submit" 
              className="px-8 py-4 whitespace-nowrap shrink-0"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-white mt-4 px-4 font-medium text-left tracking-wide opacity-70">
            Practical engineering insights. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
