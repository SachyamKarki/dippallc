"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { dippaMotto } from "@/lib/data";
import { warmEarthAssets } from "@/lib/earthAssets";
import { prefersReducedMotion, scheduleIdle } from "@/lib/motion";

const HeroGlobe = dynamic(() => import("./HeroGlobe"), { ssr: false });

export default function HeroCarousel() {
  const [showGlobe, setShowGlobe] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    warmEarthAssets();
    if (prefersReducedMotion()) return;
    return scheduleIdle(() => setShowGlobe(true), 80);
  }, []);

  return (
    <div className="hero-full-container section-shell">
      <div className="hero-new-layout">
        <div className="hero-new-left">
          <p className="hero-kicker">{dippaMotto}</p>

          <h1 className="hero-title mt-4 lg:mt-6">
            We solve tech.<br />You run the business.
          </h1>

          <div className="hero-actions">
            <Button href="/contact">
              Request a Consultation
            </Button>
          </div>
        </div>

        <div className="hero-new-right">
          <div className="hero-globe-wrapper">
            {/*
              Sized to match the WebGL sphere projection:
              desktop FOV 48° @ z=3.2 ≈ 70% of canvas height
              mobile  FOV 68° @ z=2.4 ≈ 62% of canvas height
            */}
            <div
              className={`hero-globe-placeholder${globeReady ? " is-hidden" : ""}`}
              aria-hidden="true"
            >
              <div className="hero-globe-preview">
                <div className="hero-globe-preview-orb" />
              </div>
            </div>
            {showGlobe ? <HeroGlobe onReady={() => setGlobeReady(true)} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
