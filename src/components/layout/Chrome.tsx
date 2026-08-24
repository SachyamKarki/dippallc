"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloatingButton from "@/components/layout/WhatsAppFloatingButton";
import { SiteAudioProvider } from "@/components/layout/SiteAudioProvider";

const NAVBAR_HIDDEN_PATHS = new Set<string>();

export default function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname ? NAVBAR_HIDDEN_PATHS.has(pathname) : false;

  // Homepage: transparent → dark glass on scroll
  // All other pages: dark glass from the very top (white page backgrounds)
  const isHomepage = pathname === "/";
  const isContactPage = pathname === "/contact";

  return (
    <SiteAudioProvider>
      {!hideNavbar && (
        <Navbar
          sticky
          lightNav={!isHomepage}
        />
      )}
      {children}
      {!isContactPage && <Footer />}
      <WhatsAppFloatingButton />
    </SiteAudioProvider>
  );
}
