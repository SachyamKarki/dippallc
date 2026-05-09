"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DippaLogo } from "./Icons";

import { navLinks } from "@/lib/data";

export default function Navbar({ sticky = true, theme = "dark" }: { sticky?: boolean; theme?: "dark" | "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  if (isProjectPage) return null;

  return (
    <>
      <nav
        className={`site-nav${sticky ? "" : " site-nav-static"}${theme === "light" ? " theme-light" : ""}${isScrolled && sticky ? " site-nav-scrolled" : ""}`}
      >
        <div className="site-nav-inner">
          <Link href="/" className="site-logo" onClick={closeMenu}>
            <span className="font-black text-2xl tracking-[0.25em] uppercase text-inherit leading-none" style={{ fontFamily: 'var(--font-playfair), serif' }}>DIPPA</span>
          </Link>


          <div className="site-nav-desktop">
            <ul className="site-nav-links">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-nav-link" onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="site-nav-cta">
                <Link 
                  href="/contact" 
                  className="site-nav-cta-link" 
                  onClick={closeMenu}
                >
                  Request a Consultation
                </Link>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className={`nav-toggle${isMenuOpen ? " nav-toggle-open" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-[99] backdrop-blur-sm"
          style={{ top: '72px' }}
          onClick={closeMenu}
        />
      )}

      <div className={`mobile-drawer${isMenuOpen ? " mobile-drawer-open" : ""}`}>
        <div className="mobile-drawer-panel">
          <ul className="mobile-drawer-links">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu} className="uppercase text-sm font-bold tracking-[0.2em]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-8">
              <Link href="/contact" className="button-primary w-full uppercase text-xs font-bold tracking-widest text-center" onClick={closeMenu}>
                Request a Consultation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
