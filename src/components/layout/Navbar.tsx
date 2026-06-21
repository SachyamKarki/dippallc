"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Volume2, VolumeX } from "lucide-react";
import Button from "@/components/ui/Button";
import DippaLogo from "@/components/layout/DippaLogo";
import { navLinks, navLinkCounts } from "@/lib/data";
import { useSiteAudio } from "@/components/layout/SiteAudioProvider";

interface NavbarProps {
  sticky?: boolean;
  /** Force the dark-glass scrolled state immediately (for light-bg pages) */
  forceScrolled?: boolean;
  /** White fixed navbar for light pages like contact */
  lightNav?: boolean;
}

type NavSurface = "dark" | "light";

function surfaceFromElement(el: Element | null): NavSurface | null {
  let node = el as HTMLElement | null;
  while (node) {
    const tone = node.dataset.navTone;
    if (tone === "dark" || tone === "light") return tone;
    node = node.parentElement;
  }
  return null;
}

export default function Navbar({ sticky = true, forceScrolled = false, lightNav = false }: NavbarProps) {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navSurface, setNavSurface] = useState<NavSurface>(lightNav ? "light" : "dark");
  const { enabled: soundEnabled, toggle: toggleSound } = useSiteAudio();
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/projects/");
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (lightNav) {
      setScrolled(true);
      return;
    }
    if (forceScrolled) {
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(total > 0 ? Math.min(100, (y / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled, lightNav]);

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
    const html = document.documentElement;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      html.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Nav tone: white links on dark sections, black links on light sections (mobile + desktop homepage)
  useEffect(() => {
    const MOBILE_MAX = 1024;

    const detectSurface = () => {
      if (lightNav) {
        setNavSurface("light");
        return;
      }

      if (!isHomepage) {
        setNavSurface("dark");
        return;
      }

      const isMobile = window.innerWidth <= MOBILE_MAX;
      let x: number;
      let y: number;
      let hit: Element | null = null;
      const btn = toggleRef.current;

      if (isMobile && btn) {
        const rect = btn.getBoundingClientRect();
        x = Math.min(window.innerWidth - 1, Math.max(1, rect.left + rect.width / 2));
        y = Math.min(window.innerHeight - 1, Math.max(1, rect.top + rect.height + 10));
        btn.style.pointerEvents = "none";
        hit = document.elementFromPoint(x, y);
        btn.style.pointerEvents = "";
      } else {
        const nav = document.querySelector(".site-nav");
        const navHeight = nav?.getBoundingClientRect().height ?? 80;
        x = window.innerWidth / 2;
        y = Math.min(window.innerHeight - 1, navHeight + 12);
        if (nav instanceof HTMLElement) nav.style.pointerEvents = "none";
        hit = document.elementFromPoint(x, y);
        if (nav instanceof HTMLElement) nav.style.pointerEvents = "";
      }

      setNavSurface(surfaceFromElement(hit) ?? "dark");
    };

    detectSurface();
    window.addEventListener("scroll", detectSurface, { passive: true });
    window.addEventListener("resize", detectSurface);
    return () => {
      window.removeEventListener("scroll", detectSurface);
      window.removeEventListener("resize", detectSurface);
    };
  }, [isHomepage, lightNav, pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  const renderNavBadge = (href: string) => {
    const count = navLinkCounts[href as keyof typeof navLinkCounts];
    if (count != null) {
      return (
        <span className="nav-item-tag" aria-label={`${count} items`}>
          {count}
        </span>
      );
    }
    if (href === "/careers") {
      return <span className="nav-item-tag nav-item-tag--hiring">Hiring</span>;
    }
    return null;
  };

  if (isProjectPage) return null;

  const navClass = [
    "site-nav",
    isHomepage ? "site-nav-home" : "",
    sticky ? "" : "site-nav-static",
    lightNav
      ? "site-nav-light"
      : isHomepage
        ? scrolled
          ? "site-nav-scrolled"
          : ""
        : navSurface === "light"
          ? "site-nav-light"
          : scrolled
            ? "site-nav-scrolled"
            : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <nav className={navClass}>
        <div className="site-nav-inner">
          {/* Logo — desktop/tablet only */}
          <Link href="/" className="site-logo nav-logo-link nav-logo-desktop" onClick={closeMenu} aria-label="Dippa home">
            <DippaLogo />
          </Link>

          {/* Desktop links */}
          <div className="site-nav-desktop">
            <ul className="site-nav-links">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className={`site-nav-link${isActive ? " site-nav-link-active" : ""}`}
                      onClick={closeMenu}
                    >
                      {item.label}
                      {renderNavBadge(item.href)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right controls */}
          <div className="site-nav-controls">
            <button
              type="button"
              className="nav-sound-toggle nav-sound-desktop"
              aria-label={soundEnabled ? "Mute ambient sound" : "Play ambient sound"}
              aria-pressed={soundEnabled}
              onClick={() => { toggleSound(); closeMenu(); }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              ref={toggleRef}
              type="button"
              className={`nav-toggle nav-toggle--on-${navSurface}${isMenuOpen ? " nav-toggle-open" : ""}`}
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
          onClick={closeMenu}
        />
      )}

      {/* Mobile drawer */}
      <div className={`mobile-drawer${isMenuOpen ? " mobile-drawer-open" : ""}`}>
        <div className="mobile-drawer-panel">
          <ul className="mobile-drawer-links">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`mobile-drawer-nav-link${isActive ? " mobile-drawer-nav-link-active" : ""}`}
                  >
                    <span>{item.label}</span>
                    {renderNavBadge(item.href)}
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
