/** Shared hero-earth asset helpers — preload early so WebGL mounts with texture warm. */

export const EARTH_NIGHT_URL = "/earth-night.jpg";

let earthPreloadPromise: Promise<HTMLImageElement> | null = null;

export function preloadEarthTexture(): Promise<HTMLImageElement> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("preloadEarthTexture requires window"));
  }
  if (earthPreloadPromise) return earthPreloadPromise;

  earthPreloadPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to preload earth texture"));
    img.src = EARTH_NIGHT_URL;
  });

  return earthPreloadPromise;
}

export function warmEarthAssets() {
  if (typeof window === "undefined") return;
  void preloadEarthTexture().catch(() => {});
}
