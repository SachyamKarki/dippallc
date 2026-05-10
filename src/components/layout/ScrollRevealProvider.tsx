"use client";

import { useEffect } from "react";

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    const observeAll = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>(".reveal").forEach((el) => observer.observe(el));
    };

    observeAll(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".reveal")) observer.observe(node);
          observeAll(node);
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
