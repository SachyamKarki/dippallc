"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NAVBAR_HIDDEN_PATHS = new Set(["/products", "/careers"]);

export default function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname ? NAVBAR_HIDDEN_PATHS.has(pathname) : false;
  const navbarSticky = pathname !== "/" && !pathname?.startsWith("/news");
  const navbarTheme = pathname?.startsWith("/news") ? "light" : "dark";

  return (
    <>
      {!hideNavbar ? <Navbar sticky={navbarSticky} theme={navbarTheme} /> : null}
      {children}
      <Footer />
    </>
  );
}
