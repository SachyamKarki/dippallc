"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NAVBAR_HIDDEN_PATHS = new Set([]);

export default function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname ? NAVBAR_HIDDEN_PATHS.has(pathname) : false;
  
  // Make it sticky everywhere, use light theme for pages with white heroes
  const navbarSticky = true;
  const navbarTheme = (
    pathname === "/" || 
    pathname?.startsWith("/news") || 
    pathname?.startsWith("/careers") || 
    pathname?.startsWith("/products")
  ) ? "light" : "dark";

  return (
    <>
      {!hideNavbar ? <Navbar sticky={navbarSticky} theme={navbarTheme} /> : null}
      {children}
      <Footer />
    </>
  );
}
