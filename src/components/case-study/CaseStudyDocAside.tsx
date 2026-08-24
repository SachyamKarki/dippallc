"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type DocHeading = { id: string; text: string };

type CaseStudyMeta = {
  engagement: string;
  industry: string;
  stack: readonly string[];
};

function navTopOffset() {
  const root = document.querySelector(".case-study-doc");
  const raw = getComputedStyle(root ?? document.documentElement).getPropertyValue("--site-nav-offset");
  const navOffset = parseFloat(raw);
  return (Number.isFinite(navOffset) ? navOffset : 80) + 20;
}

export default function CaseStudyDocAside({
  meta,
  headings,
}: {
  meta: CaseStudyMeta | null | undefined;
  headings: readonly DocHeading[];
}) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);
  const [asideStyle, setAsideStyle] = useState<CSSProperties>({});
  const [tocOpen, setTocOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const sync = () => setTocOpen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const aside = asideRef.current;
    if (!wrap) return;

    const shell = wrap.closest(".case-study-doc-shell") as HTMLElement | null;

    const update = () => {
      const top = navTopOffset();

      if (headings.length > 0) {
        let current = headings[0]?.id ?? null;
        for (const heading of headings) {
          const el = document.getElementById(heading.id);
          if (el && el.getBoundingClientRect().top <= top + 4) {
            current = heading.id;
          }
        }
        setActiveId(current);
      }

      if (!shell || !aside || window.innerWidth <= 1024) {
        setAsideStyle({});
        return;
      }

      const shellRect = shell.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const asideHeight = aside.offsetHeight;

      if (shellRect.top >= top) {
        setAsideStyle({});
        return;
      }

      if (shellRect.bottom <= asideHeight + top) {
        setAsideStyle({
          position: "absolute",
          top: "auto",
          bottom: 0,
          left: 0,
          width: 240,
        });
        return;
      }

      setAsideStyle({
        position: "fixed",
        top,
        left: wrapRect.left,
        width: 240,
        zIndex: 20,
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    if (aside) ro.observe(aside);
    ro.observe(wrap);
    if (shell) ro.observe(shell);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [headings]);

  if (!meta && headings.length === 0) return null;

  return (
    <div ref={wrapRef} className="case-study-doc-aside-wrap">
      <aside
        ref={asideRef}
        className="case-study-doc-aside"
        style={asideStyle}
        aria-label="Document navigation"
      >
        <div className="case-study-doc-aside-inner">
          {meta ? (
            <div className="case-study-doc-facts">
              <p className="case-study-doc-facts-label">Overview</p>
              <dl className="case-study-doc-facts-list">
                <div>
                  <dt>Engagement</dt>
                  <dd>{meta.engagement}</dd>
                </div>
                <div>
                  <dt>Industry</dt>
                  <dd>{meta.industry}</dd>
                </div>
                {meta.stack.length > 0 ? (
                  <div>
                    <dt>Stack</dt>
                    <dd className="case-study-doc-stack">
                      {meta.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}

          {headings.length > 0 ? (
            <details
              className="case-study-doc-toc-details"
              open={tocOpen}
              onToggle={(event) => {
                if (window.innerWidth > 1024) return;
                setTocOpen((event.target as HTMLDetailsElement).open);
              }}
            >
              <summary className="case-study-doc-toc-summary">
                On this page
                <span className="case-study-doc-toc-count" aria-hidden="true">
                  {headings.length}
                </span>
              </summary>
              <nav className="case-study-doc-toc" aria-label="On this page">
                <ul>
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        aria-current={activeId === heading.id ? "location" : undefined}
                        className={activeId === heading.id ? "is-active" : undefined}
                        onClick={() => {
                          if (window.innerWidth <= 1024) setTocOpen(false);
                        }}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </details>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
