"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import Button from "@/components/ui/Button";
import DippaLogo from "@/components/layout/DippaLogo";
import { navLinks } from "@/lib/data";
import { useSiteAudio } from "@/components/layout/SiteAudioProvider";

interface NavbarProps {
  sticky?: boolean;
  /** Force the dark-glass scrolled state immediately (for light-bg pages) */
  forceScrolled?: boolean;
}

export default function Navbar({ sticky = true, forceScrolled = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { enabled: soundEnabled, toggle: toggleSound } = useSiteAudio();
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/");

  useEffect(() => {
    if (forceScrolled) {
      setScrolled(true);
      return;
    }
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 80);
      lastY = y;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? Math.min(100, (y / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  // Track scroll progress even on forceScrolled pages
  useEffect(() => {
    if (!forceScrolled) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  if (isProjectPage) return null;

  const navClass = [
    "site-nav",
    sticky ? "" : "site-nav-static",
    scrolled ? "site-nav-scrolled" : "",
    hidden ? "site-nav-hidden" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <nav className={navClass}>
<div className="site-nav-inner">
          {/* Logo */}
          <Link href="/" className="site-logo nav-logo-link" onClick={closeMenu} aria-label="Dippa home">
            <DippaLogo />
          </Link>

          {/* Desktop links */}
          <div className="site-nav-desktop">
            <ul className="site-nav-links">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                const isCareers = item.href === "/careers";
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className={`site-nav-link${isActive ? " site-nav-link-active" : ""}`}
                      onClick={closeMenu}
                    >
                      {item.label}
                      {isCareers && <span className="nav-hiring-badge">Hiring</span>}
                    </Link>
                    {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              className="nav-sound-toggle"
              aria-label={soundEnabled ? "Mute ambient sound" : "Play ambient sound"}
              aria-pressed={soundEnabled}
              onClick={() => { toggleSound(); closeMenu(); }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              type="button"
              className={`nav-toggle${isMenuOpen ? " nav-toggle-open" : ""}`}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>

            <div className="hidden md:block">
              <Link href="/contact" className="site-nav-cta-link" onClick={closeMenu}>
                Request a Consultation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[97] bg-black/60 backdrop-blur-sm"
          style={{ top: "80px" }}
          onClick={closeMenu}
        />
      )}

      {/* Mobile drawer */}
      <div className={`mobile-drawer${isMenuOpen ? " mobile-drawer-open" : ""}`}>
        <div className="mobile-drawer-panel">
          <ul className="mobile-drawer-links">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const isCareers = item.href === "/careers";
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`mobile-drawer-nav-link${isActive ? " mobile-drawer-nav-link-active" : ""}`}
                  >
                    <span>{item.label}</span>
                    {isCareers && <span className="nav-hiring-badge">Hiring</span>}
                  </Link>
                </li>
              );
            })}
            <li className="mobile-drawer-divider" />
            <li>
              <div className="mobile-drawer-social">
                <a href="mailto:hello@dippa.com" className="mobile-drawer-social-link">Email us</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="mobile-drawer-social-link">LinkedIn</a>
              </div>
            </li>
            <li className="mt-6">
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
