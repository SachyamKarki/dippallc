"use client";

import Link from "next/link";
import { LinkedInIcon } from "@/components/ui/Icons";

const footerNav = [
  { label: "Overview", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Studies & Blogs", href: "/news" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root">
      <div className="footer-shell">

        {/* ── Main grid: brand | nav | newsletter ── */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <div className="footer-logo-wrap">
                <img src="/logo-dippa.jpg" alt="DIPPA" className="footer-logo-img" />
              </div>
              <span className="footer-logo-name">DIPPA</span>
            </div>
            <p className="footer-tagline">
              End-to-end IT solutions for businesses that demand reliability. From infrastructure and networks to AI automation and support — we keep your operations running.
            </p>

            <div className="footer-inline-contact">
              <p className="footer-inline-mail-row">
                <a href="mailto:info@thedippa.com" className="footer-inline-mail">info@thedippa.com</a>
                <span className="footer-inline-sep"> | </span>
                <a href="mailto:contact@thedippa.com" className="footer-inline-mail">contact@thedippa.com</a>
              </p>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-pill footer-social-pill-linkedin footer-inline-li">
                <span className="footer-social-icon footer-social-icon-li"><LinkedInIcon className="w-4 h-4" /></span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="footer-nav">
            <p className="footer-nav-label">Navigate</p>
            <ul className="footer-nav-list">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-nav-link">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <p className="footer-newsletter-label">IT tips &amp; updates</p>
            <form className="footer-newsletter-form">
              <input type="email" placeholder="Work email" className="footer-newsletter-input" />
              <button type="submit" className="footer-newsletter-btn-sm">Subscribe</button>
            </form>
            <p className="footer-newsletter-sub">No noise. Only signal.</p>
          </div>
        </div>

        {/* Wordmark */}
        <div className="footer-wordmark-wrap">
          <span className="footer-wordmark">DIPPA.</span>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">&copy; {year} Dippa IT Solutions. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link href="/privacy" className="footer-legal-link">Privacy</Link>
            <span className="footer-legal-sep" aria-hidden="true">·</span>
            <Link href="/terms" className="footer-legal-link">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
