"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { loadImmersiveImagesPriority, prefetchImmersiveImages } from "@/lib/immersiveAssets";
import { setImmersiveFocus } from "@/lib/renderFocus";

const InteractiveProjectGrid = dynamic(() => import("./InteractiveProjectGrid"), {
  ssr: false,
});

export default function LazyProjectGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const warm = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          prefetchImmersiveImages("low");
          warm.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    const show = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImmersiveFocus(true);
          prefetchImmersiveImages("high");
          void loadImmersiveImagesPriority();
          setLoad(true);
          show.disconnect();
        }
      },
      { rootMargin: "220px 0px" },
    );

    warm.observe(el);
    show.observe(el);
    return () => {
      warm.disconnect();
      show.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="bg-[#000000] overflow-hidden" data-nav-tone="dark">
      {load ? (
        <InteractiveProjectGrid />
      ) : (
        <section className="work-sphere-section" aria-hidden="true">
          <div className="work-sphere-shell">
            <div className="work-sphere-stage" />
          </div>
        </section>
      )}
    </div>
  );
}
