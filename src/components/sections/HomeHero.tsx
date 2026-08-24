"use client";

import { useEffect, useState } from "react";
import HeroCarousel from "@/components/sections/HeroCarousel";
import StarfieldBackground from "@/components/sections/StarfieldBackground";
import { warmEarthAssets } from "@/lib/earthAssets";
import { prefersReducedMotion, scheduleIdle } from "@/lib/motion";

export default function HomeHero() {
  const [showStarfield, setShowStarfield] = useState(false);

  useEffect(() => {
    warmEarthAssets();
    if (prefersReducedMotion()) return;
    return scheduleIdle(() => setShowStarfield(true), 500);
  }, []);

  return (
    <section className="hero-section-new relative overflow-hidden" data-nav-tone="dark">
      {showStarfield ? <StarfieldBackground /> : null}
      <HeroCarousel />
    </section>
  );
}
