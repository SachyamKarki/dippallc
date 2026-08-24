export const IMMERSIVE_IMAGE_URLS = Array.from(
  { length: 16 },
  (_, i) => `/projects/${i + 1}.jpg`,
);

const CACHE_NAME = "dippa-360-v1";
const FRONT_COUNT = 8;

type ImmersiveSource = HTMLImageElement | ImageBitmap;
type FetchPriority = "high" | "low" | "auto";

const images = new Map<string, ImmersiveSource>();
const inflight = new Map<string, Promise<ImmersiveSource>>();
const objectUrls = new Map<string, string>();
let warmed = false;

function fetchOptions(priority: FetchPriority): RequestInit {
  return {
    cache: "force-cache",
    credentials: "same-origin",
    mode: "same-origin",
    priority,
  } as RequestInit;
}

function isReady(source: ImmersiveSource | undefined): source is ImmersiveSource {
  if (!source) return false;
  if (source instanceof HTMLImageElement) {
    return source.complete && source.naturalWidth > 0;
  }
  return source.width > 0;
}

async function blobFor(url: string, priority: FetchPriority): Promise<Blob | null> {
  try {
    if ("caches" in window) {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached?.ok) return cached.blob();

      const res = await fetch(url, fetchOptions(priority));
      if (!res.ok) return null;
      await cache.put(url, res.clone()).catch(() => {});
      return res.blob();
    }

    const res = await fetch(url, fetchOptions(priority));
    return res.ok ? res.blob() : null;
  } catch {
    return null;
  }
}

function imageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}

async function decodeBlob(blob: Blob, url: string): Promise<ImmersiveSource> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(blob);
    } catch {
      // Fall through to an object-URL image decode.
    }
  }

  let objectUrl = objectUrls.get(url);
  if (!objectUrl) {
    objectUrl = URL.createObjectURL(blob);
    objectUrls.set(url, objectUrl);
  }

  return imageFromUrl(objectUrl);
}

export function getCachedImmersiveImage(url: string): ImmersiveSource | undefined {
  const source = images.get(url);
  return isReady(source) ? source : undefined;
}

export function areFrontImmersiveImagesCached() {
  return IMMERSIVE_IMAGE_URLS.slice(0, FRONT_COUNT).every((url) =>
    getCachedImmersiveImage(url),
  );
}

export function loadImmersiveImage(
  url: string,
  priority: FetchPriority = "high",
): Promise<ImmersiveSource> {
  const ready = getCachedImmersiveImage(url);
  if (ready) return Promise.resolve(ready);

  const pending = inflight.get(url);
  if (pending) return pending;

  const task = (async () => {
    try {
      const blob = await blobFor(url, priority);
      if (blob) {
        const source = await decodeBlob(blob, url);
        images.set(url, source);
        return source;
      }

      const img = await imageFromUrl(url);
      images.set(url, img);
      return img;
    } finally {
      inflight.delete(url);
    }
  })();

  inflight.set(url, task);
  return task;
}

/** Warm HTTP + Cache Storage. Safe to call early (does not load Three.js). */
export function prefetchImmersiveImages(priority: FetchPriority = "low") {
  if (warmed && priority === "low") return;
  warmed = true;
  IMMERSIVE_IMAGE_URLS.forEach((url, index) => {
    void loadImmersiveImage(url, index < FRONT_COUNT ? priority : "low");
  });
}

/**
 * Decode the first ring of cards at high priority, kick the rest immediately,
 * then resolve so the 360 scene can mount without waiting on every file.
 */
export async function loadImmersiveImagesPriority() {
  const front = IMMERSIVE_IMAGE_URLS.slice(0, FRONT_COUNT);
  const rest = IMMERSIVE_IMAGE_URLS.slice(FRONT_COUNT);
  rest.forEach((url) => void loadImmersiveImage(url, "high"));
  await Promise.all(front.map((url) => loadImmersiveImage(url, "high")));
}
