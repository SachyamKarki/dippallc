import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import Chrome from "@/components/layout/Chrome";

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
    default: "Dippa | Senior-Led Product Engineering & AI Orchestration",
    template: "%s | Dippa",
  },
  description:
    "Dippa delivers high-stakes software transformations and autonomous AI agent systems for modern enterprise leadership. Built for speed, precision, and architectural excellence.",
  keywords: [
    "enterprise software transformation",
    "autonomous AI orchestration",
    "senior-led product engineering",
    "strategic data automation",
    "high-integrity digital products",
  ],
  openGraph: {
    title: "Dippa",
    description:
      "Premium software products, AI agent systems, and consulting-led execution.",
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
    description:
      "Premium software products, AI agent systems, and consulting-led execution.",
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
        <link rel="preload" href="/earth-night.jpg" as="image" />
        <link rel="preload" href="/projects/1.jpg" as="image" />
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
