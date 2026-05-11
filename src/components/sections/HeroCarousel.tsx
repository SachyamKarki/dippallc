"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const stats = [
  { value: "4", suffix: "", label: "Years of\nExperience" },
  { value: "10", suffix: "+", label: "Authorized\nPartners" },
  { value: "30", suffix: "+", label: "Projects\nDone" },
];

export default function HeroCarousel() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="hero-full-container section-shell">
        <div className="hero-new-layout">
          {/* Left Content */}
          <div className={`hero-new-left ${isLoaded ? 'hero-left-enter' : 'opacity-0'}`}>
            <p className="hero-kicker-v2">
              From <span className="text-[#e32929]">core</span> to <span className="text-[#e32929]">edge</span> to the full spectrum of it and electronics
            </p>

            <h1 className="hero-title-v2 mt-4 lg:mt-6">
              Empowering Productivity <br /> through better IT.
            </h1>

            {/* Stats Row */}
            <div className={`hero-stats-v2 mb-10 ${isLoaded ? 'hero-stats-enter' : 'opacity-0'}`}>
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat-item">
                  <div className="hero-stat-value">
                    {stat.value}
                    <span className="hero-stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="hero-stat-label">
                    {stat.label.split('\n').map((line, idx) => (
                      <span key={idx}>{line}<br /></span>
                    ))}
                  </div>
                  {i < stats.length - 1 && <div className="hero-stat-divider" />}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`hero-actions-v2 w-full sm:w-auto ${isLoaded ? 'hero-cta-enter' : 'opacity-0'}`}>
              <Button
                href="/products"
                className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 button-primary flex justify-center text-center"
              >
                Explore Products
              </Button>
            </div>
          </div>

          {/* Right - High-Fidelity Globe */}
          <div className={`hero-new-right ${isLoaded ? 'hero-right-enter' : 'opacity-0'}`}>
            <div className="hero-globe-container-v2">
              <div className="hero-globe-wrapper hero-image-float">
                <Image
                  src="/globe-hubs.png"
                  alt="Global Network Hubs"
                  fill
                  className="object-contain"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-new-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 2rem;
          width: 100%;
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .hero-new-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-kicker-v2 {
          font-size: 1.1rem;
          font-weight: 500;
          color: #4b5563;
          margin-bottom: 1rem;
        }

        .hero-title-v2 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 700;
          line-height: 1.1;
          color: #1e293b;
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
        }

        .hero-stats-v2 {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 1rem;
        }

        .hero-stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
        }

        .hero-stat-value {
          font-size: 2.2rem;
          font-weight: 900;
          color: #000000;
          line-height: 1;
        }

        .hero-stat-suffix {
          font-size: 1.5rem;
          vertical-align: top;
          margin-left: 1px;
        }

        .hero-stat-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: #000000;
          text-transform: uppercase;
          line-height: 1.3;
          letter-spacing: 0.02em;
        }

        .hero-stat-divider {
          width: 1px;
          height: 40px;
          background: #e2e8f0;
          margin-left: 2rem;
        }

        .hero-globe-container-v2 {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
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
          .hero-new-layout { 
            grid-template-columns: 1fr; 
            text-align: center;
            padding: 4rem 1.5rem;
            gap: 3rem;
          }
          .hero-new-left { align-items: center; text-align: center; }
          .hero-title-v2 { 
            font-size: clamp(2rem, 8vw, 2.5rem);
            margin-bottom: 1.5rem;
          }
          .hero-kicker-v2 { font-size: 0.9375rem; }
          .hero-stats-v2 { 
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 1rem;
          }
          .hero-stat-value { font-size: 1.75rem; }
          .hero-stat-divider { display: none; }
          .hero-new-right { 
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
        }
        @media (max-width: 768px) {
          .hero-new-right {
            max-width: 220px;
          }
          .hero-new-layout {
            padding: 2.5rem 1rem;
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
