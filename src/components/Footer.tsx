import Link from "next/link";
import { footerLinks } from "@/lib/data";
import { DippaLogo } from "./Icons";


function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17.4 6.9h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21a9 9 0 0 1-4.2-1.04L3 21l1.1-4.2A9 9 0 1 1 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.05 8.9c.2-.49.4-.5.74-.5h.6c.17 0 .39.06.6.47.2.41.7 1.7.76 1.82.06.12.1.27.02.43-.08.16-.12.27-.25.41-.12.14-.26.32-.37.43-.12.12-.24.24-.1.47.14.23.64 1.04 1.38 1.68.95.83 1.75 1.09 1.98 1.21.23.12.36.1.49-.06.14-.16.56-.65.71-.87.14-.22.29-.18.49-.1.2.08 1.28.6 1.5.71.22.1.37.16.43.25.06.08.06.49-.12.96-.18.47-1.02.92-1.42.97-.39.05-.88.07-1.42-.1-.33-.1-.76-.25-1.3-.49-2.29-1-3.78-3.33-3.9-3.49-.12-.16-.93-1.23-.93-2.35s.58-1.67.79-1.9Z" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const siteTitle = "DIPPA GROUP";
  const email = "hello@dippa.group";
  const phoneNumber = "9779800000000";

  return (
    <footer className="relative z-0 mt-32 w-full overflow-hidden border-t border-white/5 bg-black pb-10 pt-20 text-white font-sans">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-12 md:items-start">
          {/* Left Column: Brand Info & Actions */}
          <div className="flex flex-col gap-12 md:col-span-7 lg:col-span-8">
            <div className="flex flex-col gap-6">
              <DippaLogo className="w-12 h-12 text-white" />

              <p className="max-w-md text-base leading-relaxed text-white/50">
                Premium software products, AI agent systems, and consulting-led execution for companies that need quality they can feel and systems they can trust.
              </p>
              <p className="text-sm text-white/30">
                Based in Kathmandu, Nepal. Serving bold operators globally.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/60">
                  CONNECT WITH US
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-2 pr-5 py-2 text-xs font-bold text-white transition-all hover:bg-white/15 hover:border-white/20"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
                      <InstagramIcon className="h-4 w-4" />
                    </div>
                    <span>Instagram</span>
                  </a>
                  <a
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-2 pr-5 py-2 text-xs font-bold text-white transition-all hover:bg-white/15 hover:border-white/20"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                      <WhatsAppIcon className="h-4 w-4" />
                    </div>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 pl-2 pr-5 py-2 text-xs font-bold text-white transition-all hover:bg-white/15 hover:border-white/20"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Navigation */}
          <div className="flex flex-col gap-10 md:col-span-5 md:items-end lg:col-span-4">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-12 gap-y-4 text-left md:text-right">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-[11px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/blogs" className="block text-[11px] font-bold uppercase tracking-widest text-white/50 transition-colors hover:text-white">
                    Blogs
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Massive Site Title - Exactly like Photographer Portfolio */}
        <div className="pointer-events-none mt-20 w-full select-none text-center overflow-hidden opacity-10">
          <h2 className="font-sans uppercase whitespace-nowrap py-2 text-[clamp(2.5rem,14vw,12rem)] font-black tracking-tighter text-white leading-none">
            {siteTitle}.
          </h2>
        </div>

        <div className="mt-12 w-full border-t border-white/5 pb-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
              © 2026 {siteTitle}. ALL RIGHTS RESERVED.
            </p>

            <div className="flex items-center gap-8">
              <Link href="/privacy-policy" className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 transition-all hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 transition-all hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
