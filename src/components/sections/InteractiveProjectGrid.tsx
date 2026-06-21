"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

interface MockSite {
  id: number;
  title: string;
  accent: string;
  surface: string;
  ink: string;
  layout: string;
  url: string;
}

const REAL_PROJECTS = [
  { title: "Unmarkd", accent: "#1a1a2e", surface: "#f0f0f5", ink: "#0a0a1a", layout: "editorial", url: "https://unmarkdofficial.com" },
  { title: "LFG Burnego", accent: "#c0392b", surface: "#1a0a08", ink: "#f5e6e0", layout: "poster", url: "https://www.lfgburnego.com" },
  { title: "Laxmi Pustak", accent: "#e67e22", surface: "#fdf6ec", ink: "#1a1008", layout: "catalog", url: "https://www.laxmipustak.com" },
  { title: "Rabinson", accent: "#2980b9", surface: "#eaf4fb", ink: "#0a1820", layout: "minimal", url: "https://www.rabinson.info" },
  { title: "Hoarding Board Nepal", accent: "#0d7a9e", surface: "#e8f6fb", ink: "#061820", layout: "editorial", url: "https://www.hoardingboardnepal.com" },
  { title: "Season Food", accent: "#b5451b", surface: "#fdf3ee", ink: "#1a0a06", layout: "catalog", url: "https://seasonfood.com.np" },
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
];

const mockSites: readonly MockSite[] = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  ...REAL_PROJECTS[i % REAL_PROJECTS.length],
}));

const webImages = Array.from({ length: 32 }).map((_, i) => `/projects/${(i % 16) + 1}.jpg`);

export default function InteractiveProjectGrid() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    const stage = stageRef.current;
    const viewport = viewportRef.current;

    if (!stage || !viewport) {
      return;
    }

    const scene = new THREE.Scene();
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 32, 1, 0.1, 500);
    // Adjusted camera further back to increase visible 3D depth and curvature
    camera.position.set(0, 0, isMobile ? 56 : 64);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.className = "work-sphere-webgl";
    viewport.appendChild(renderer.domElement);

    const pitchGroup = new THREE.Group();
    scene.add(pitchGroup);

    const carouselGroup = new THREE.Group();
    pitchGroup.add(carouselGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 1.45));

    const keyLight = new THREE.DirectionalLight(0xf7f2e7, 1.8);
    keyLight.position.set(6, 8, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xaad3ff, 1.7, 50);
    rimLight.position.set(-10, 2, -8);
    scene.add(rimLight);


    const planeGeometry = new THREE.PlaneGeometry(16.2, 10.8);
    // Expand cylinder radius to fill entire width of modern ultra-wide screens
    const radius = 48;
    const itemsPerRow = 12;
    const totalCards = 84;
    const rowCount = Math.ceil(totalCards / itemsPerRow);
    const verticalStep = 18.0;
    const angleStep = (Math.PI * 2) / itemsPerRow;

    const textureLoader = new THREE.TextureLoader();
    const uniqueUrls = [...new Set(webImages.slice(0, 16))];
    const textureByUrl = new Map<string, THREE.Texture>();
    uniqueUrls.forEach((url) => {
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      textureByUrl.set(url, texture);
    });
    const siteTextures = mockSites.map((_, index) => {
      const url = webImages[index % webImages.length];
      return textureByUrl.get(url)!;
    });

    Array.from({ length: totalCards }).forEach((_, index) => {
      const siteIndex = index % mockSites.length;

      const material = new THREE.MeshStandardMaterial({
        map: siteTextures[siteIndex],
        metalness: 0.04,
        roughness: 0.84,
      });

      const card = new THREE.Mesh(planeGeometry, material);
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;

      const angle = col * angleStep;
      // Stagger odd columns downwards by half a row
      const staggerOffset = col % 2 === 1 ? -(verticalStep / 2) : 0;
      const y = ((rowCount - 1) / 2 - row) * verticalStep + staggerOffset;

      card.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
      card.lookAt(0, y, 0);
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
      // Smooth interpolation for both rotation and vertical panning
      rotationRef.current.current += (rotationRef.current.target - rotationRef.current.current) * 0.08;
      verticalOffsetRef.current.current += (verticalOffsetRef.current.target - verticalOffsetRef.current.current) * 0.08;

      carouselGroup.rotation.y = rotationRef.current.current;
      pitchGroup.rotation.x = verticalOffsetRef.current.current;

      updateActiveSite();
      renderer.render(scene, camera);
    };

    gsap.ticker.add(tick);

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(tick);
      renderer.dispose();
      planeGeometry.dispose();
      siteTextures.forEach(t => t.dispose());
      textureByUrl.forEach((t) => t.dispose());
      viewport.removeChild(renderer.domElement);

      scene.traverse((object: THREE.Object3D) => {
        const mesh = object as THREE.Mesh;
        if (!("geometry" in mesh) || !("material" in mesh)) {
          return;
        }

        mesh.geometry?.dispose?.();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: THREE.Material) => material.dispose());
        } else {
          mesh.material?.dispose?.();
        }
      });
    };
  }, [sceneReady]);

  return (
    <section ref={sectionRef} className="work-sphere-section" aria-labelledby="project-showcase-title">
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

            setMousePos({ x: event.clientX, y: event.clientY });

            // Raycasting for hover state
            if (cameraRef.current && groupRef.current) {
              const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
              const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

              const raycaster = new THREE.Raycaster();
              raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
              const intersects = raycaster.intersectObjects(groupRef.current.children);

              if (intersects.length > 0 && !pointerRef.current.active) {
                const card = intersects[0].object as THREE.Mesh;
                setHoveredData(card.userData as { link: string; title: string });
                stageRef.current!.style.cursor = "pointer";
              } else {
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

              const raycaster = new THREE.Raycaster();
              raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
              const intersects = raycaster.intersectObjects(groupRef.current.children);

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
            setHoveredData(null);
            try {
              event.currentTarget.releasePointerCapture(event.pointerId);
            } catch {
              // Ignore capture release failures when the pointer is already gone.
            }
          }}
          onPointerLeave={() => {
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
              style={{
                position: 'fixed',
                left: mousePos.x,
                top: mousePos.y,
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
