import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import "../styles/buttons.css";
import "../styles/layout.css";
import "../styles/sections.css";
import "../styles/pages.css";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import Chrome from "@/components/layout/Chrome";
import { dippaMotto } from "@/lib/data";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dippa.group"),
  title: {
    default: `Dippa | ${dippaMotto}`,
    template: "%s | Dippa",
  },
  description:
    `${dippaMotto}. Dippa delivers high-stakes software transformations and autonomous AI agent systems for modern enterprise leadership.`,
  keywords: [
    "enterprise software transformation",
    "autonomous AI orchestration",
    "senior-led product engineering",
    "strategic data automation",
    "high-integrity digital products",
  ],
  openGraph: {
    title: "Dippa",
    description: dippaMotto,
    url: "https://dippa.group",
    siteName: "Dippa",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dippa - AI & Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dippa",
    description: dippaMotto,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${lato.variable} ${playfair.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased">
        <ScrollRevealProvider>
          <Chrome>{children}</Chrome>
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
