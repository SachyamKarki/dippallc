import Link from "next/link";
import { DippaLogo } from "./Icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#364835] text-[#e4e7e4] relative z-10 overflow-hidden border-t border-white/5">
      <div className="section-shell pt-24 pb-12">
        {/* Top Grid: Info & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Col 1: Contact / Info */}
          <div className="md:col-span-6 lg:col-span-3">
             <h4 className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-8 border-b border-white/5 pb-4 inline-block">Contact</h4>
             <div className="space-y-6">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Electronic Mail</p>
                   <a href="mailto:hello@dippa.com" className="text-lg font-medium hover:text-[#a8b8a5] transition-colors duration-300">hello@dippa.com</a>
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Institutional base</p>
                   <p className="text-sm font-medium text-gray-400 leading-relaxed">Silicon Valley &middot; New York &middot; Remote</p>
                </div>
             </div>
          </div>

          {/* Col 2: Site Index */}
          <div className="md:col-span-6 lg:col-span-3">
             <h4 className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-8 border-b border-white/5 pb-4 inline-block">Navigation</h4>
             <div className="flex flex-col gap-3">
                {[
                  { label: "Overview", href: "/" },
                  { label: "Newsroom", href: "/news" },
                  { label: "Case Studies", href: "/projects" },
                  { label: "Careers", href: "/careers" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 w-fit">
                    {link.label}
                  </Link>
                ))}
             </div>
          </div>

          {/* Col 3: Network */}
          <div className="md:col-span-6 lg:col-span-3">
             <h4 className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-8 border-b border-white/5 pb-4 inline-block">Network</h4>
             <div className="flex flex-col gap-3">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "X Platform", href: "https://x.com" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "Read.cv", href: "https://read.cv" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="group text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 w-fit">
                    {link.label} 
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 group-hover:translate-x-1">&nearr;</span>
                  </a>
                ))}
             </div>
          </div>

          {/* Col 4: Logo/Signoff */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col items-start lg:items-end justify-between">
             <DippaLogo className="w-12 h-12 text-[#364835] opacity-80 mb-6 lg:mb-0" />
             <div className="text-right hidden lg:block">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Built for scale</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">2026 &copy; Edition</p>
             </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-20 border-t border-white/5">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
              <div className="max-w-xl">
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Stay synchronized.</h3>
                 <p className="text-gray-500 text-sm md:text-base leading-relaxed">Intelligence feed on engineering systems and research.</p>
              </div>
              <div className="w-full max-w-md">
                 <form className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-lg focus-within:border-white/20 transition-all">
                    <input 
                       type="email" 
                       placeholder="Engineering email" 
                       className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none font-medium" 
                    />
                    <button className="bg-white text-black px-6 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all rounded-md">
                       Join
                    </button>
                 </form>
              </div>
           </div>
        </div>

        {/* Massive Logo Section */}
        <div className="relative pt-12 pb-4">
           <h2 className="text-[clamp(4rem,20vw,18rem)] font-bold text-white tracking-[-0.05em] leading-none opacity-[0.02] pointer-events-none select-none text-center">
              DIPPA
           </h2>
           <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 gap-6">
              <div className="flex gap-8">
                 <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                 <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
              </div>
              <p className="tracking-widest">&copy; DIPPA ENGINEERING GROUP. ALL RIGHTS RESERVED.</p>
           </div>
        </div>
      </div>
    </footer>
  );
}

