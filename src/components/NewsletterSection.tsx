import React from 'react';

export default function NewsletterSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-playfair), serif' }}>
            Institutional Insights,<br />Delivered.
          </h2>
          <p className="text-base lg:text-lg text-white/70 font-medium leading-relaxed">
            Subscribe to our newsletter for research-led insights on enterprise architecture, AI orchestration, and engineering excellence. No spam, just signal.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex-1 max-w-md">
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors font-medium"
              required
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-white text-[#0a0a0a] font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-200 transition-transform hover:scale-105 whitespace-nowrap shrink-0"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-white/40 mt-4 px-4 font-medium">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
