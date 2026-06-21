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
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      html.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  // Nav tone: white controls on dark sections, black on light sections
  useEffect(() => {
    const detectSurface = () => {
      if (lightNav || isMenuOpen) {
        if (lightNav) setNavSurface("light");
        return;
      }

      const navInner = document.querySelector(".site-nav-inner") as HTMLElement | null;
      const nav = document.querySelector(".site-nav") as HTMLElement | null;
      if (!navInner || !nav) {
        setNavSurface("dark");
        return;
      }

      const rect = navInner.getBoundingClientRect();
      const sampleY = Math.min(window.innerHeight - 1, Math.max(1, rect.bottom + 12));
      const sampleXs = [
        rect.left + Math.min(56, rect.width * 0.12),
        rect.left + rect.width / 2,
        rect.right - Math.min(56, rect.width * 0.12),
      ].map((x) => Math.min(window.innerWidth - 1, Math.max(1, x)));

      nav.style.pointerEvents = "none";
      const tones = sampleXs
        .map((x) => surfaceFromElement(document.elementFromPoint(x, sampleY)))
        .filter((tone): tone is NavSurface => tone === "dark" || tone === "light");
      nav.style.pointerEvents = "";

      if (!tones.length) {
        setNavSurface("dark");
        return;
      }

      const lightCount = tones.filter((tone) => tone === "light").length;
      setNavSurface(lightCount >= 2 ? "light" : tones[0] ?? "dark");
    };

    detectSurface();
    window.addEventListener("scroll", detectSurface, { passive: true });
    window.addEventListener("resize", detectSurface);
    return () => {
      window.removeEventListener("scroll", detectSurface);
      window.removeEventListener("resize", detectSurface);
    };
  }, [isMenuOpen, lightNav, pathname]);

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
      <nav className={navClass} data-nav-surface={navSurface}>
        <div className="site-nav-inner">
          {/* Logo */}
          <Link
            href="/"
            className={`site-logo nav-logo-link nav-logo-link--on-${navSurface}`}
            onClick={closeMenu}
            aria-label="Dippa home"
          >
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
              className={`nav-sound-toggle nav-sound-toggle--on-${navSurface}`}
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

      {/* Mobile backdrop — always mounted to avoid open/close flash */}
      <div
        className={`mobile-drawer-backdrop${isMenuOpen ? " mobile-drawer-backdrop-open" : ""}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer${isMenuOpen ? " mobile-drawer-open" : ""}`}
        aria-hidden={!isMenuOpen}
        inert={isMenuOpen ? undefined : true}
      >
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
