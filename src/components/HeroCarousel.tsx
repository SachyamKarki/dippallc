"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "12", suffix: "", label: "Years of Experience" },
  { value: "300", suffix: "+", label: "Authorized Partners" },
  { value: "1000", suffix: "+", label: "Product SKU Range" },
];

export default function HeroCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="hero-full-container">
        <div className="hero-new-layout">
          {/* Left Content */}
          <div className={`hero-new-left ${isLoaded ? 'hero-left-enter' : 'opacity-0'}`}>
            <p className="hero-eyebrow">
              From <span className="hero-eyebrow-accent">core</span> to <span className="hero-eyebrow-accent">edge</span> to the full spectrum of it and electronics
            </p>

            <h1 className="hero-title">
              Empowering Productivity <br /> through better IT.
            </h1>

            {/* Stats Row */}
            <div className={`hero-stats-row ${isLoaded ? 'hero-stats-enter' : 'opacity-0'}`}>
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat">
                  <div className="flex items-baseline">
                    <span className="hero-stat-value">
                      {stat.value}
                    </span>
                    <span className="hero-stat-suffix-green">{stat.suffix}</span>
                  </div>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`hero-actions flex justify-start gap-6 ${isLoaded ? 'hero-cta-enter' : 'opacity-0'}`}>
              <Link href="/products" className="button-primary-green text-sm font-bold flex items-center gap-2">
                Explore Products <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right - High-Fidelity Globe with Integrated Hubs */}
          <div className={`hero-new-right ${isLoaded ? 'hero-right-enter' : 'opacity-0'}`}>
            <div className="hero-globe-container">
              <div className="hero-globe-wrapper hero-image-float">
                <Image 
                  src="/globe-hubs.png"
                  alt="Global Network Hubs"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-full-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4rem;
          padding-bottom: 4rem;
        }

        .hero-new-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 4rem;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .hero-eyebrow {
          font-size: 0.9rem;
          font-weight: 500;
          color: #64748b;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .hero-eyebrow-accent {
          color: #364835;
          font-weight: 700;
        }

        .hero-title {
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
        }

        .hero-stats-row { display: flex; gap: 3rem; margin-bottom: 4rem; padding-left: 0.5rem; }
        .hero-stat { display: flex; flex-direction: column; gap: 0.25rem; position: relative; }
        .hero-stat:not(:last-child)::after { content: ''; position: absolute; right: -1.5rem; top: 15%; bottom: 15%; width: 1px; background: #e2e8f0; }
        .hero-stat-value { font-size: 3rem; font-weight: 800; color: #364835; line-height: 1; letter-spacing: -0.02em; }
        .hero-stat-suffix-green { font-size: 2rem; font-weight: 800; color: #364835; margin-left: 2px; }
        .hero-stat-label { font-size: 0.85rem; font-weight: 600; color: #64748b; line-height: 1.2; max-width: 120px; text-transform: uppercase; letter-spacing: 0.02em; }

        :global(.button-primary-green) {
          background: #364835;
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(54, 72, 53, 0.3);
        }
        :global(.button-primary-green:hover) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(54, 72, 53, 0.4);
        }

        /* Globe Styling */
        .hero-new-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-globe-container {
          position: relative;
          width: 550px;
          height: 550px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-globe-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .hero-image-float {
          animation: floatGlobe 8s ease-in-out infinite;
        }

        @keyframes floatGlobe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-left-enter { animation: fadeInUp 0.8s ease-out both; }
        .hero-stats-enter { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.3s; }
        .hero-cta-enter { animation: fadeInUp 0.8s ease-out both; animation-delay: 0.5s; }
        .hero-right-enter { animation: fadeInUp 1s ease-out both; animation-delay: 0.4s; }

        @media (max-width: 1024px) {
          .hero-new-layout { grid-template-columns: 1fr; text-align: center; }
          .hero-new-right { display: none; }
          .hero-stats-row { justify-content: center; }
          .hero-actions { justify-content: center !important; }
        }
      `}</style>
    </>
  );
}
