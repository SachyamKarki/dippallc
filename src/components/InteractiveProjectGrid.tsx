"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  link: string;
  summary: string;
  result: string;
  year: string;
};

const projects: readonly Project[] = [
  {
    id: 1,
    title: "Lattice AI",
    category: "Agentic Systems",
    image: "/images/blog-software.png",
    link: "/products",
    summary: "An operations layer that routes approvals, summaries, and decision support across multiple teams.",
    result: "Reduced executive review time by 63%.",
    year: "2026",
  },
  {
    id: 2,
    title: "Prism Dashboard",
    category: "Data Visualization",
    image: "/images/blog-consulting.png",
    link: "/products",
    summary: "A premium command center for live reporting, forecasting, and commercial performance tracking.",
    result: "Unified 7 reporting streams into one view.",
    year: "2025",
  },
  {
    id: 3,
    title: "Orbit Protocol",
    category: "Infrastructure",
    image: "/images/blog-ai-automation.png",
    link: "/products",
    summary: "A resilient backbone for product teams shipping regulated workflows under tight delivery constraints.",
    result: "Cut deployment risk with staged release controls.",
    year: "2025",
  },
  {
    id: 4,
    title: "Nexus Flow",
    category: "Automation",
    image: "/images/hero/clean.png",
    link: "/products",
    summary: "Service operations automation that routes requests, exceptions, and approvals with full auditability.",
    result: "Moved repetitive service work out of inboxes.",
    year: "2026",
  },
  {
    id: 5,
    title: "Aura Intelligence",
    category: "Enterprise AI",
    image: "/images/blog-software.png",
    link: "/products",
    summary: "An AI-enabled internal platform for knowledge retrieval, drafting, and high-confidence execution support.",
    result: "Improved response consistency across support teams.",
    year: "2024",
  },
  {
    id: 6,
    title: "Vector Vault",
    category: "Cybersecurity",
    image: "/images/blog-consulting.png",
    link: "/products",
    summary: "A secure data surface for leadership teams needing high-trust access patterns and clear governance.",
    result: "Centralized access without losing oversight.",
    year: "2025",
  },
  {
    id: 7,
    title: "Strategic Edge",
    category: "Analytics",
    image: "/images/blog-ai-automation.png",
    link: "/products",
    summary: "An operating dashboard that turns fragmented reporting into weekly commercial decisions.",
    result: "Brought planning cycles down from days to hours.",
    year: "2026",
  },
  {
    id: 8,
    title: "Institutional Core",
    category: "Resilience",
    image: "/images/hero/clean.png",
    link: "/products",
    summary: "A continuity-focused platform designed for operational clarity, permissions, and long-term maintainability.",
    result: "Stabilized a critical internal workflow during migration.",
    year: "2024",
  },
] as const;

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function shortestAngleDelta(from: number, to: number) {
  return ((to - from + 540) % 360) - 180;
}

function indexForFrontFace(rotation: number) {
  const step = 360 / projects.length;
  const normalized = normalizeDegrees(-rotation);
  return Math.round(normalized / step) % projects.length;
}

export default function InteractiveProjectGrid() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef(0);
  const snapTargetRef = useRef<number | null>(0);
  const resumeAutoAtRef = useRef(0);
  const hoveringRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(210);
        return;
      }

      if (window.innerWidth < 1024) {
        setRadius(300);
        return;
      }

      setRadius(420);
    };

    updateMotionPreference();
    updateRadius();

    mediaQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("resize", updateRadius);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let frameId = 0;

    const tick = () => {
      const shouldAutoRotate =
        !reducedMotionRef.current &&
        !hoveringRef.current &&
        performance.now() > resumeAutoAtRef.current;

      if (snapTargetRef.current !== null) {
        const delta = shortestAngleDelta(currentRotationRef.current, snapTargetRef.current);
        currentRotationRef.current += delta * 0.085;

        if (Math.abs(delta) < 0.15) {
          currentRotationRef.current = snapTargetRef.current;
          snapTargetRef.current = null;
        }
      } else if (shouldAutoRotate) {
        currentRotationRef.current += 0.14;
      }

      gsap.set(ring, { rotateY: currentRotationRef.current });

      const nextIndex = indexForFrontFace(currentRotationRef.current);
      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(scene, {
        rotateY: relativeX * 10,
        rotateX: relativeY * -8,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handlePointerEnter = () => {
      hoveringRef.current = true;
    };

    const handlePointerLeave = () => {
      hoveringRef.current = false;
      gsap.to(scene, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerenter", handlePointerEnter);
    scene.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerenter", handlePointerEnter);
      scene.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const activeProject = projects[activeIndex];

  function focusProject(index: number) {
    const step = 360 / projects.length;
    snapTargetRef.current = -(index * step);
    resumeAutoAtRef.current = performance.now() + 3200;
    setActiveIndex(index);
  }

  function focusNext(direction: 1 | -1) {
    const nextIndex = (activeIndex + direction + projects.length) % projects.length;
    focusProject(nextIndex);
  }

  return (
    <section
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(61,95,172,0.18),transparent_28%),linear-gradient(180deg,#09111c_0%,#0d1724_48%,#081018_100%)] py-24 text-white"
      aria-labelledby="project-showcase-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-12 top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-[58%] h-40 w-[60rem] -translate-x-1/2 rounded-full border border-white/8" />
        <div className="absolute left-1/2 top-[61%] h-10 w-[42rem] -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-white/45">Selected Work</p>
          <h2 id="project-showcase-title" className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
            Project showcase in motion.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            A cylindrical gallery for flagship work, designed to feel immersive without losing clarity.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.35fr_0.9fr] lg:gap-8">
          <div className="relative">
            <div className="flex items-center justify-between px-2 pb-6">
              <button
                type="button"
                onClick={() => focusNext(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/10"
                aria-label="Previous project"
              >
                &#8592;
              </button>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/35">
                Click any panel to bring it forward
              </p>
              <button
                type="button"
                onClick={() => focusNext(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/6 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/10"
                aria-label="Next project"
              >
                &#8594;
              </button>
            </div>

            <div className="relative mx-auto flex h-[29rem] w-full max-w-[52rem] items-center justify-center [perspective:1800px] sm:h-[34rem] lg:h-[40rem]">
              <div
                ref={sceneRef}
                className="relative flex h-full w-full items-center justify-center [transform-style:preserve-3d]"
              >
                <div
                  ref={ringRef}
                  className="relative h-[18rem] w-[18rem] [transform-style:preserve-3d] sm:h-[22rem] sm:w-[22rem] lg:h-[24rem] lg:w-[24rem]"
                >
                  {projects.map((project, index) => {
                    const angle = (360 / projects.length) * index;
                    const isActive = activeIndex === index;

                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => focusProject(index)}
                        className="absolute left-1/2 top-1/2 block h-[13rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem] text-left outline-none transition-transform duration-500 focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:h-[16rem] sm:w-[12rem] lg:h-[18rem] lg:w-[13.5rem]"
                        style={{
                          transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                          transformStyle: "preserve-3d",
                        }}
                        aria-pressed={isActive}
                      >
                        <span
                          className={`absolute inset-0 overflow-hidden rounded-[1.8rem] border ${
                            isActive ? "border-cyan-300/70" : "border-white/10"
                          } bg-slate-900 shadow-[0_28px_80px_rgba(0,0,0,0.45)]`}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 220px, 260px"
                            className="object-cover"
                          />
                          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,22,0.08),rgba(6,12,22,0.26)_35%,rgba(6,12,22,0.94)_100%)]" />
                          <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%)]" />
                          <span className="absolute inset-x-0 bottom-0 block px-5 pb-5 pt-10">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                              {project.category}
                            </span>
                            <span className="mt-3 block text-xl font-black leading-tight tracking-tight text-white">
                              {project.title}
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200/70">
                  {activeProject.category}
                </p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                  {activeProject.title}
                </h3>
              </div>
              <span className="rounded-full border border-white/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                {activeProject.year}
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-white/68">{activeProject.summary}</p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/18 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">Outcome</p>
              <p className="mt-3 text-lg font-semibold leading-relaxed text-white">{activeProject.result}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={activeProject.link} className="button-primary">
                Explore project
              </Link>
              <button
                type="button"
                onClick={() => focusNext(1)}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 px-6 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/8"
              >
                View next
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => focusProject(index)}
                    className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                      isActive
                        ? "border-cyan-300/70 bg-cyan-300/12 text-cyan-100"
                        : "border-white/12 bg-white/4 text-white/45 hover:border-white/22 hover:text-white/70"
                    }`}
                  >
                    {project.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
