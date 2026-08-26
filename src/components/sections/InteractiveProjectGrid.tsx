"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { bindVisibility } from "@/lib/motion";
import {
  areAllImmersiveImagesCached,
  getCachedImmersiveImage,
  IMMERSIVE_IMAGE_URLS,
  loadImmersiveImage,
  loadImmersiveImagesPriority,
} from "@/lib/immersiveAssets";
import { setImmersiveFocus } from "@/lib/renderFocus";

import { STUDIO_WEBSITES } from "@/lib/data";

interface MockSite {
  id: number;
  title: string;
  accent: string;
  surface: string;
  ink: string;
  layout: string;
  url: string;
}

const FILLER_PROJECTS = [
  { title: "Stripe", accent: "#635bff", surface: "#f6f5ff", ink: "#0a0820", layout: "minimal", url: "https://stripe.com" },
  { title: "Linear", accent: "#5e6ad2", surface: "#f4f4fb", ink: "#0e0e1a", layout: "editorial", url: "https://linear.app" },
  { title: "Vercel", accent: "#000000", surface: "#f5f5f5", ink: "#0a0a0a", layout: "minimal", url: "https://vercel.com" },
  { title: "Notion", accent: "#37352f", surface: "#f7f6f3", ink: "#1a1916", layout: "catalog", url: "https://notion.so" },
  { title: "PlanetScale", accent: "#00c0b4", surface: "#e8faf9", ink: "#061a19", layout: "poster", url: "https://planetscale.com" },
  { title: "Framer", accent: "#0055ff", surface: "#eef3ff", ink: "#060d20", layout: "minimal", url: "https://framer.com" },
  { title: "Loom", accent: "#625df5", surface: "#f5f4ff", ink: "#0e0d20", layout: "editorial", url: "https://loom.com" },
  { title: "Railway", accent: "#b100e8", surface: "#f9eeff", ink: "#150520", layout: "poster", url: "https://railway.app" },
  { title: "Cal.com", accent: "#292929", surface: "#f5f5f5", ink: "#0a0a0a", layout: "minimal", url: "https://cal.com" },
  { title: "Supabase", accent: "#3ecf8e", surface: "#edfbf4", ink: "#061a0f", layout: "catalog", url: "https://supabase.com" },
] as const;

const STUDIO_PROJECT_STYLES = [
  { accent: "#1a1a2e", surface: "#f0f0f5", ink: "#0a0a1a", layout: "editorial" },
  { accent: "#c0392b", surface: "#1a0a08", ink: "#f5e6e0", layout: "poster" },
  { accent: "#2980b9", surface: "#eaf4fb", ink: "#0a1820", layout: "minimal" },
] as const;

const REAL_PROJECTS = [
  ...STUDIO_WEBSITES.map((site, i) => ({
    title: site.name,
    url: site.liveLink,
    ...STUDIO_PROJECT_STYLES[i],
  })),
  ...FILLER_PROJECTS,
];

const mockSites: readonly MockSite[] = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  ...REAL_PROJECTS[i % REAL_PROJECTS.length],
}));

const webImages = Array.from({ length: 32 }).map((_, i) => `/projects/${(i % 16) + 1}.jpg`);
const threeTextureCache = new Map<string, THREE.Texture>();

function applyTextureSource(texture: THREE.Texture, url: string) {
  const source = getCachedImmersiveImage(url);
  if (!source) return;
  if (texture.image !== source) {
    texture.image = source;
  }
  // HTMLImageElement uploads expect flipY=true. ImageBitmap (if ever used) does not.
  texture.flipY = !(typeof ImageBitmap !== "undefined" && source instanceof ImageBitmap);
  texture.needsUpdate = true;
}

function configureTextureQuality(texture: THREE.Texture, anisotropy = 1) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = Math.max(1, Math.min(anisotropy, 16));
  texture.needsUpdate = true;
}

function textureFromCache(url: string, anisotropy = 1): THREE.Texture {
  const existing = threeTextureCache.get(url);
  if (existing) {
    applyTextureSource(existing, url);
    configureTextureQuality(existing, anisotropy);
    return existing;
  }

  const texture = new THREE.Texture();
  configureTextureQuality(texture, anisotropy);
  applyTextureSource(texture, url);
  threeTextureCache.set(url, texture);
  return texture;
}

export default function InteractiveProjectGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);
  const pointerRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startRotation: 0,
    startVertical: 0,
    startTime: 0,
  });
  // Initialize with a slight ~3% rotation offset to the right
  const rotationRef = useRef({ current: 0.2, target: 0.2 });
  const verticalOffsetRef = useRef({ current: 0, target: 0 });
  const activeIndexRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const [activeSite, setActiveSite] = useState(mockSites[0]);
  const [hoveredData, setHoveredData] = useState<{ link: string; title: string } | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const hoverKeyRef = useRef<string | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerNdcRef = useRef(new THREE.Vector2());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSceneReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sceneReady) return;
    let cancelled = false;
    setImmersiveFocus(true);

    if (areAllImmersiveImagesCached()) {
      setAssetsReady(true);
      return;
    }

    const failSafe = window.setTimeout(() => {
      if (!cancelled) setAssetsReady(true);
    }, 6000);

    void loadImmersiveImagesPriority()
      .then(() => {
        if (!cancelled) setAssetsReady(true);
      })
      .catch(() => {
        if (!cancelled) setAssetsReady(true);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(failSafe);
    };
  }, [sceneReady]);

  useEffect(() => {
    if (!sceneReady || !assetsReady) return;

    const stage = stageRef.current;
    const viewport = viewportRef.current;

    if (!stage || !viewport) {
      return;
    }

    // Drop any HMR/stale GPU textures so orientation fixes always take effect.
    threeTextureCache.forEach((texture) => texture.dispose());
    threeTextureCache.clear();

    const scene = new THREE.Scene();
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;
    const isNarrowPhone = viewportWidth <= 390;
    const camera = new THREE.PerspectiveCamera(
      isNarrowPhone ? 58 : isMobile ? 52 : 36,
      1,
      0.1,
      500
    );
    // Sit inside a tighter cylinder so the wall wraps more on the z-axis.
    camera.position.set(0, 0, isNarrowPhone ? 48 : isMobile ? 46 : 56);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      // Keep canvas sharp on retina / high-DPI phones and desktops.
      precision: "highp",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.className = "work-sphere-webgl";
    viewport.appendChild(renderer.domElement);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const textureAnisotropy = Math.min(maxAnisotropy, isMobile ? 8 : 16);

    const pitchGroup = new THREE.Group();
    scene.add(pitchGroup);

    const carouselGroup = new THREE.Group();
    pitchGroup.add(carouselGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 1.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
    keyLight.position.set(6, 8, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.15, 60);
    rimLight.position.set(-10, 2, -8);
    scene.add(rimLight);


    const planeGeometry = new THREE.PlaneGeometry(
      isNarrowPhone ? 13.8 : isMobile ? 14.8 : 15.0,
      isNarrowPhone ? 9.2 : isMobile ? 9.8 : 10.0
    );
    // Tighter radius = stronger wrap along z (more curved wall).
    const radius = isNarrowPhone ? 34 : isMobile ? 36 : 40;
    const itemsPerRow = 12;
    // Phone: 5 cards per column so the taller stage fills cleanly.
    const rowCount = isMobile ? 5 : 4;
    const totalCards = itemsPerRow * rowCount;
    const verticalStep = isNarrowPhone ? 14.0 : isMobile ? 14.8 : 17.0;
    const angleStep = (Math.PI * 2) / itemsPerRow;

    const uniqueUrls = IMMERSIVE_IMAGE_URLS;
    uniqueUrls.forEach((url) => {
      textureFromCache(url, textureAnisotropy);
      if (getCachedImmersiveImage(url)) return;
      void loadImmersiveImage(url, "high").then(() => {
        applyTextureSource(textureFromCache(url, textureAnisotropy), url);
      });
    });
    const siteTextures = mockSites.map((_, index) => {
      const url = webImages[index % webImages.length];
      return textureFromCache(url, textureAnisotropy);
    });

    Array.from({ length: totalCards }).forEach((_, index) => {
      const siteIndex = index % mockSites.length;

      const material = new THREE.MeshStandardMaterial({
        map: siteTextures[siteIndex],
        metalness: 0,
        roughness: 0.72,
        envMapIntensity: 0,
      });

      const card = new THREE.Mesh(planeGeometry, material);
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;

      const angle = col * angleStep;
      // Symmetric stagger so the center black gap lines up behind DIPPA at rest.
      const staggerOffset = col % 2 === 1 ? -(verticalStep / 4) : verticalStep / 4;
      const y = ((rowCount - 1) / 2 - row) * verticalStep + staggerOffset;

      card.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
      // Face the inward camera without lookAt(), which can invert card "up".
      card.rotation.order = "YXZ";
      card.rotation.set(0, angle + Math.PI, 0);
      card.userData = {
        link: mockSites[siteIndex].url,
        title: mockSites[siteIndex].title
      };
      carouselGroup.add(card);
    });

    cameraRef.current = camera;
    groupRef.current = carouselGroup;

    const resize = () => {
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(viewport);

    const updateActiveSite = () => {
      const normalized = THREE.MathUtils.euclideanModulo(-rotationRef.current.current, Math.PI * 2);
      const col = Math.round(normalized / angleStep) % itemsPerRow;

      // Select the site from the middle row
      const centerRow = Math.floor(rowCount / 2);
      const index = Math.min((centerRow * itemsPerRow) + col, totalCards - 1);
      const siteIndex = index % mockSites.length;

      if (index !== activeIndexRef.current && mockSites[siteIndex]) {
        activeIndexRef.current = index;
        setActiveSite(mockSites[siteIndex]);
      }
    };

    const tick = () => {
      rotationRef.current.current += (rotationRef.current.target - rotationRef.current.current) * 0.08;
      verticalOffsetRef.current.current += (verticalOffsetRef.current.target - verticalOffsetRef.current.current) * 0.08;

      carouselGroup.rotation.y = rotationRef.current.current;
      pitchGroup.rotation.x = verticalOffsetRef.current.current;

      updateActiveSite();
      renderer.render(scene, camera);
    };

    let tickerOn = false;
    const setTicker = (on: boolean) => {
      if (on === tickerOn) return;
      tickerOn = on;
      if (on) gsap.ticker.add(tick);
      else gsap.ticker.remove(tick);
    };

    const unbind = bindVisibility(viewport, (isActive) => {
      setTicker(isActive);
      if (isActive) tick();
    });

    tick();
    const releaseFocus = window.setTimeout(() => setImmersiveFocus(false), 450);

    return () => {
      window.clearTimeout(releaseFocus);
      setImmersiveFocus(false);
      unbind();
      resizeObserver.disconnect();
      setTicker(false);
      renderer.dispose();
      planeGeometry.dispose();
      if (viewport.contains(renderer.domElement)) {
        viewport.removeChild(renderer.domElement);
      }

      scene.traverse((object: THREE.Object3D) => {
        const mesh = object as THREE.Mesh;
        if (!("geometry" in mesh) || !("material" in mesh)) {
          return;
        }

        if (mesh.geometry && mesh.geometry !== planeGeometry) {
          mesh.geometry.dispose?.();
        }
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: THREE.Material) => material.dispose());
        } else {
          mesh.material?.dispose?.();
        }
      });
    };
  }, [sceneReady, assetsReady]);

  return (
    <section ref={sectionRef} className="work-sphere-section" aria-labelledby="project-showcase-title" data-nav-tone="dark">
      <div className="work-sphere-shell">
        <div
          ref={stageRef}
          className="work-sphere-stage"
          onPointerDown={(event) => {
            pointerRef.current.active = true;
            pointerRef.current.startX = event.clientX;
            pointerRef.current.startY = event.clientY;
            pointerRef.current.startRotation = rotationRef.current.target;
            pointerRef.current.startVertical = verticalOffsetRef.current.target;
            pointerRef.current.startTime = Date.now();
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const rect = stageRef.current?.getBoundingClientRect();
            if (!rect) return;

            if (tooltipRef.current) {
              tooltipRef.current.style.left = `${event.clientX}px`;
              tooltipRef.current.style.top = `${event.clientY}px`;
            }

            if (cameraRef.current && groupRef.current) {
              pointerNdcRef.current.set(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1,
              );
              raycasterRef.current.setFromCamera(pointerNdcRef.current, cameraRef.current);
              const intersects = raycasterRef.current.intersectObjects(groupRef.current.children);

              if (intersects.length > 0 && !pointerRef.current.active) {
                const card = intersects[0].object as THREE.Mesh;
                const data = card.userData as { link: string; title: string };
                const key = data.title;
                if (hoverKeyRef.current !== key) {
                  hoverKeyRef.current = key;
                  setHoveredData(data);
                }
                stageRef.current!.style.cursor = "pointer";
              } else if (hoverKeyRef.current !== null) {
                hoverKeyRef.current = null;
                setHoveredData(null);
                stageRef.current!.style.cursor = pointerRef.current.active ? "grabbing" : "grab";
              }
            }

            if (!pointerRef.current.active) return;

            // Calculate horizontal rotation
            const dx = event.clientX - pointerRef.current.startX;
            rotationRef.current.target = pointerRef.current.startRotation + (dx / rect.width) * Math.PI * 1.4;

            // Calculate vertical panning as a limited pitch (curved) view
            const dy = event.clientY - pointerRef.current.startY;
            // Dragging down (positive dy) pitches the group down
            const rawVertical = pointerRef.current.startVertical - (dy / rect.height) * Math.PI * 0.4;
            // Limit to a certain angle (approx +/- 18 degrees) since there isn't much vertical content
            verticalOffsetRef.current.target = THREE.MathUtils.clamp(rawVertical, -Math.PI / 10, Math.PI / 10);
          }}
          onPointerUp={(event) => {
            pointerRef.current.active = false;
            hoverKeyRef.current = null;
            setHoveredData(null);
            try {
              event.currentTarget.releasePointerCapture(event.pointerId);
            } catch { }

            // Detect if this was a click (not a drag)
            const dx = Math.abs(event.clientX - pointerRef.current.startX);
            const dy = Math.abs(event.clientY - pointerRef.current.startY);
            const dt = Date.now() - pointerRef.current.startTime;

            if (dx < 5 && dy < 5 && dt < 400 && stageRef.current && cameraRef.current && groupRef.current) {
              const rect = stageRef.current.getBoundingClientRect();
              const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
              const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

              raycasterRef.current.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
              const intersects = raycasterRef.current.intersectObjects(groupRef.current.children);

              if (intersects.length > 0) {
                const clickedCard = intersects[0].object as THREE.Mesh;
                const link = clickedCard.userData.link;
                if (link) {
                  window.open(link, '_blank', 'noopener,noreferrer');
                }
              }
            }
          }}
          onPointerCancel={(event) => {
            pointerRef.current.active = false;
            hoverKeyRef.current = null;
            setHoveredData(null);
            try {
              event.currentTarget.releasePointerCapture(event.pointerId);
            } catch {
              // Ignore capture release failures when the pointer is already gone.
            }
          }}
          onPointerLeave={() => {
            hoverKeyRef.current = null;
            setHoveredData(null);
          }}
        >
          <div className="work-sphere-stage-shell work-sphere-stage-shell-left" aria-hidden="true" />
          <div className="work-sphere-stage-shell work-sphere-stage-shell-right" aria-hidden="true" />
          <div className="work-sphere-stage-shell work-sphere-stage-shell-top" aria-hidden="true" />
          <div className="work-sphere-stage-glow" aria-hidden="true" />
          <div className="work-sphere-stage-vignette" aria-hidden="true" />

          <div ref={viewportRef} className="work-sphere-viewport work-sphere-canvas" />

          <div className="work-sphere-stage-copy" aria-live="polite">
            <h4 id="project-showcase-title" className="work-sphere-stage-title">
              DIPPA
            </h4>
          </div>

          {hoveredData && (
            <div
              ref={tooltipRef}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                transform: 'translate(-50%, -140%)',
                padding: '10px 20px',
                background: 'rgba(10, 10, 10, 0.9)',
                color: '#ffffff',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                pointerEvents: 'none',
                zIndex: 9999,
                fontFamily: 'var(--font-lato), sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em'
              }}
            >
              <span>{hoveredData.title.toLowerCase().replace(/\s+/g, '-') + '.com'}</span>
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
