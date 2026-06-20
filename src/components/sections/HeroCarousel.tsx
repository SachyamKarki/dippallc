"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";

const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

export default function HeroCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => { setIsLoaded(true); }, []);

  return (
    <div className="hero-full-container section-shell">
      <div className="hero-new-layout">
        <div className={`hero-new-left ${isLoaded ? "hero-left-enter" : "opacity-0"}`}>
          <p className="hero-kicker">
            From <span className="text-[#e32929]">core</span> to <span className="text-[#e32929]">edge</span> to the full spectrum of IT and electronics
          </p>

          <h1 className="hero-title mt-4 lg:mt-6">
            Empowering Productivity<br />through better IT.
          </h1>

          <div className={`hero-actions w-full sm:w-auto ${isLoaded ? "hero-cta-enter" : "opacity-0"}`}>
            <Button href="/products" className="w-full sm:w-auto flex justify-center">
              Explore Products
            </Button>
          </div>
        </div>

        <div className={`hero-new-right ${isLoaded ? "hero-right-enter" : "opacity-0"}`}>
          <div className="hero-globe-wrapper">
            <HeroGlobe />
          </div>
        </div>
      </div>
    </div>
  );
}
