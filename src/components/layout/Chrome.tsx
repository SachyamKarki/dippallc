"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SiteAudioProvider } from "@/components/layout/SiteAudioProvider";

const NAVBAR_HIDDEN_PATHS = new Set<string>();

export default function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname ? NAVBAR_HIDDEN_PATHS.has(pathname) : false;
  
  // Make it sticky everywhere, use light theme for pages with white heroes
  const navbarSticky = false;
  const navbarTheme = (
    pathname === "/" || 
    pathname?.startsWith("/news") || 
    pathname?.startsWith("/careers") || 
    pathname?.startsWith("/products")
  ) ? "light" : "dark";

  return (
    <SiteAudioProvider>
      {!hideNavbar ? <Navbar sticky={navbarSticky} theme={navbarTheme} /> : null}
      {children}
      <Footer />
    </SiteAudioProvider>
  );
}
