export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scheduleIdle(callback: () => void, timeout = 600): () => void {
  if (typeof window === "undefined") return () => {};

  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(() => callback(), { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, Math.min(timeout, 250));
  return () => window.clearTimeout(id);
}

/** Pause work when the node is off-screen or the tab is hidden. */
export function bindVisibility(
  element: Element,
  onChange: (active: boolean) => void,
): () => void {
  let inView = true;

  const emit = () => {
    onChange(inView && document.visibilityState === "visible");
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = Boolean(entry?.isIntersecting);
      emit();
    },
    { threshold: 0.02 },
  );

  io.observe(element);
  document.addEventListener("visibilitychange", emit);
  emit();

  return () => {
    io.disconnect();
    document.removeEventListener("visibilitychange", emit);
  };
}
