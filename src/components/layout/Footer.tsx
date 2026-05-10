"use client";

import Link from "next/link";
import { LinkedInIcon, MailIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-0 w-full overflow-hidden border-t border-white/5 bg-[#364835] pb-10 pt-20 text-white selection:bg-white selection:text-black">
      <div className="section-shell">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-12 md:items-start">
          {/* Left Column: Brand Info & Actions */}
          <div className="flex flex-col gap-12 md:col-span-7 lg:col-span-8">
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-base leading-relaxed text-white/90 md:text-lg font-medium tracking-normal" style={{ fontFamily: 'var(--font-main)', letterSpacing: '0' }}>
                High performance software orchestration for institutional grade systems. 
                We transform technical debt into architectural leverage.
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.05em] text-white/50" style={{ letterSpacing: '0.05em' }}>
                  INSTITUTIONAL BASE
                </p>
                <p className="text-sm font-medium text-white/80" style={{ fontFamily: 'var(--font-main)', letterSpacing: '0' }}>
                  Silicon Valley &middot; New York &middot; Remote
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                CONNECT WITH US
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:hello@dippa.com"
                  className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-2 pr-6 py-2.5 text-xs font-bold text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-white/20">
                    <MailIcon className="h-4 w-4" />
                  </div>
                  <span className="opacity-70 group-hover:opacity-100 uppercase tracking-widest">Email Us</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-2 pr-6 py-2.5 text-xs font-bold text-white transition-all hover:border-white/40 hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0077B5] text-white transition-transform group-hover:scale-110">
                    <LinkedInIcon className="h-4 w-4" />
                  </div>
                  <span className="opacity-70 group-hover:opacity-100 uppercase tracking-widest">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Navigation & Newsletter */}
          <div className="flex flex-col gap-16 md:col-span-5 md:items-end lg:col-span-4">
            <nav aria-label="Footer Navigation" className="w-full">
              <ul className="grid grid-cols-2 gap-x-12 gap-y-6 text-left md:text-right">
                {[
                  { label: "Overview", href: "/" },
                  { label: "Newsroom", href: "/news" },
                  { label: "Case Studies", href: "/projects" },
                  { label: "Careers", href: "/careers" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="w-full max-w-sm md:ml-auto">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50 md:text-right">
                STAY SYNCHRONIZED
              </p>
              <form className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl focus-within:border-white/20 transition-all">
                <input
                  type="email"
                  placeholder="Work email"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none font-medium"
                />
                <Button type="submit" variant="secondary" className="px-6 py-2 !text-[10px]">
                  Join
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Massive Brand Title */}
        <div className="pointer-events-none mt-24 w-full select-none text-center overflow-hidden border-t border-white/5 pt-16">
          <h2 className="font-black uppercase whitespace-nowrap py-4 text-[clamp(2.5rem,15vw,14rem)] font-bold tracking-tighter text-white leading-none opacity-[0.95]" style={{ fontFamily: 'var(--font-accent)' }}>
            DIPPA.
          </h2>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="mt-8 flex flex-col items-center justify-center gap-6 border-t border-white/5 pt-12 pb-6">
          <p className="text-xs font-bold uppercase tracking-tight text-white/30 text-center" style={{ fontFamily: 'var(--font-accent)', letterSpacing: '-0.01em' }}>
            &copy; {currentYear} DIPPA ENGINEERING GROUP. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            <Link href="/privacy" className="text-xs font-bold uppercase tracking-tight text-white/30 transition-colors hover:text-white" style={{ fontFamily: 'var(--font-accent)', letterSpacing: '-0.01em' }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs font-bold uppercase tracking-tight text-white/30 transition-colors hover:text-white" style={{ fontFamily: 'var(--font-accent)', letterSpacing: '-0.01em' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
