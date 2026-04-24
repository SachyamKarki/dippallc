"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const approachItems = [
  {
    title: "What we do",
    text: "We design and build software products, internal tools, and modern business platforms that make daily operations easier to run.",
  },
  {
    title: "How we work",
    text: "We begin with business clarity, shape the right technical direction, and keep delivery structured so progress stays visible.",
  },
  {
    title: "How we ship",
    text: "We stay close to execution, making sure planning, product thinking, and implementation all move together in a practical way.",
  },
] as const;

const whyItems = [
  {
    title: "Business-first thinking",
    text: "We connect software decisions to real company goals so the work supports growth instead of adding more noise.",
  },
  {
    title: "Direct communication",
    text: "Teams work with us because the process is clear, the recommendations are practical, and the conversations stay honest.",
  },
  {
    title: "Long-term value",
    text: "We focus on building systems that remain useful after launch, not just short-term output that looks good in the moment.",
  },
] as const;

const introContent = {
  approach: {
    kicker: "What We Do",
    title: "We shape software systems with more clarity and less noise.",
    description:
      "The section reveals our product, consulting, and delivery story one step at a time while the left panel stays calm and anchored.",
  },
  why: {
    kicker: "About Dippa",
    title: "The way we work matters just as much as what we build.",
    description:
      "After the first sequence, the story opens into a quieter transition and shifts into the qualities clients value most in Dippa.",
  },
} as const;

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const currentModeRef = useRef<keyof typeof introContent>("approach");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const switchIntro = (mode: keyof typeof introContent) => {
      if (currentModeRef.current === mode) return;

      currentModeRef.current = mode;
      const content = introContent[mode];
      const introItems = [titleRef.current, descriptionRef.current];
      const timeline = gsap.timeline({
        defaults: { duration: 0.5, ease: "power3.out" },
      });

      timeline.to(introItems, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05,
        onComplete: () => {
          if (titleRef.current) titleRef.current.textContent = content.title;
          if (descriptionRef.current) descriptionRef.current.textContent = content.description;
        },
      });

      timeline.fromTo(
        introItems,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, stagger: 0.06 },
      );
    };

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-item");

      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      ScrollTrigger.matchMedia({
        "(min-width: 821px)": () => {
          if (introRef.current && sectionRef.current) {
            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              pin: introRef.current,
              pinSpacing: true,
            });
          }
        },
      });

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 56, opacity: 0.18, scale: 0.975 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              end: "top 46%",
              scrub: 0.9,
              onEnter: () => card.classList.add("is-active"),
              onEnterBack: () => card.classList.add("is-active"),
              onLeave: () => card.classList.remove("is-active"),
              onLeaveBack: () => card.classList.remove("is-active"),
            },
          },
        );
      });

      ScrollTrigger.create({
        trigger: ".process-break",
        start: "top 58%",
        end: "bottom 42%",
        onEnter: () => switchIntro("why"),
        onLeaveBack: () => switchIntro("approach"),
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="process-section" id="approach" ref={sectionRef}>
      <div className="process-layout">
        <div className="process-intro" ref={introRef}>

          <h2 ref={titleRef}>{introContent.approach.title}</h2>
          <p className="process-description" ref={descriptionRef}>
            {introContent.approach.description}
          </p>
        </div>

        <div className="process-content">
          <div className="process-group">
            {approachItems.map((item) => (
              <article key={item.title} className="process-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="process-break" aria-hidden="true" />

          <div className="process-group" id="about">
            {whyItems.map((item) => (
              <article key={item.title} className="process-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
