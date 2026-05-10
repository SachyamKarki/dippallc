"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import Button from "@/components/ui/Button";

import { navLinks } from "@/lib/data";
import { useSiteAudio } from "@/components/layout/SiteAudioProvider";

export default function Navbar({ sticky = true, theme = "dark" }: { sticky?: boolean; theme?: "dark" | "light" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { enabled: soundEnabled, toggle: toggleSound } = useSiteAudio();
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
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg">
              <img
                src="/logo-dippa.jpg"
                alt="DIPPA Logo"
                className="w-full h-full object-cover"
              />
            </div>
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
            </ul>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              className="nav-sound-toggle"
              aria-label={soundEnabled ? "Sound on (click to mute)" : "Sound off (click to unmute)"}
              aria-pressed={soundEnabled}
              onClick={() => {
                toggleSound();
                closeMenu();
              }}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

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

            <div className="hidden md:block">
              <Link
                href="/contact"
                className="site-nav-cta-link"
                onClick={closeMenu}
              >
                Request a Consultation
              </Link>
            </div>
          </div>

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
              <Button href="/contact" className="w-full" onClick={closeMenu}>
                Request a Consultation
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
