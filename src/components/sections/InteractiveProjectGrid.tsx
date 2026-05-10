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
  slug?: string;
}

const mockSites: readonly MockSite[] = [
  { id: 1, title: "Ops Canvas", accent: "#6a7f5c", surface: "#d4d0b7", ink: "#1d1f17", layout: "editorial", slug: "ops-canvas" },
  { id: 2, title: "Agent Desk", accent: "#4ca58f", surface: "#d9c9cd", ink: "#241e25", layout: "catalog", slug: "agent-desk" },
  { id: 3, title: "Synthesis Engine", accent: "#9f7c51", surface: "#332c27", ink: "#f2e8da", layout: "minimal", slug: "clarity-sprint" },
  { id: 4, title: "Neural Lattice", accent: "#b81a1a", surface: "#b8b0aa", ink: "#151515", layout: "poster" },
  { id: 5, title: "Quant Vector", accent: "#4250d0", surface: "#f1f0ec", ink: "#161616", layout: "minimal" },
  { id: 6, title: "Systemic Core", accent: "#111111", surface: "#e9e4df", ink: "#1a1a1a", layout: "catalog" },
  { id: 7, title: "Logic Gateway", accent: "#efadc7", surface: "#f2e4eb", ink: "#201d1d", layout: "catalog" },
  { id: 8, title: "Neural Hub", accent: "#d1d6ce", surface: "#5a635d", ink: "#f4f1eb", layout: "poster" },
  { id: 9, title: "Vector Flow", accent: "#ceb89d", surface: "#eee7df", ink: "#201816", layout: "editorial" },
  { id: 10, title: "Agentic Ops", accent: "#2ba68c", surface: "#eef2eb", ink: "#1b211e", layout: "minimal" },
  { id: 11, title: "Continuity OS", accent: "#d8d8d3", surface: "#ece9e2", ink: "#171717", layout: "minimal" },
  { id: 12, title: "System Architect", accent: "#1f1f1f", surface: "#efeee8", ink: "#111111", layout: "editorial" },
  { id: 13, title: "Neural Archive", accent: "#c45e3a", surface: "#f0ebe4", ink: "#1a1410", layout: "poster" },
  { id: 14, title: "Vector Base", accent: "#3d3d3d", surface: "#fafaf8", ink: "#0e0e0e", layout: "minimal" },
  { id: 15, title: "Logic Stream", accent: "#7a6b4e", surface: "#e8e0d2", ink: "#1c1812", layout: "editorial" },
  { id: 16, title: "AI Orchestrator", accent: "#5c6bc0", surface: "#e3e6f0", ink: "#181a24", layout: "catalog" },
  { id: 17, title: "Systemic Layer", accent: "#2e7d5a", surface: "#e4ede8", ink: "#121e18", layout: "minimal" },
  { id: 18, title: "Neural Bridge", accent: "#8d6e63", surface: "#ede8e2", ink: "#1e1814", layout: "editorial" },
  { id: 19, title: "Quant Signal", accent: "#e65100", surface: "#2a2522", ink: "#f5efe8", layout: "poster" },
  { id: 20, title: "Lattice View", accent: "#ab47bc", surface: "#f0e8f2", ink: "#1a141e", layout: "catalog" },
  { id: 21, title: "Neural Ops", accent: "#00838f", surface: "#e0f2f3", ink: "#0a1a1c", layout: "minimal" },
  { id: 22, title: "Systemic Hub", accent: "#bf360c", surface: "#fbe9e7", ink: "#1a0e0a", layout: "poster" },
  { id: 23, title: "Vector Strategy", accent: "#546e7a", surface: "#eceff1", ink: "#1a2024", layout: "editorial" },
  { id: 24, title: "Monolith Neural", accent: "#212121", surface: "#f5f5f5", ink: "#0a0a0a", layout: "catalog" },
  { id: 25, title: "Systemic Forge", accent: "#e64a19", surface: "#3e2723", ink: "#ffccbc", layout: "poster" },
  { id: 26, title: "Logic Bureau", accent: "#6d4c41", surface: "#efebe9", ink: "#1c1412", layout: "editorial" },
  { id: 27, title: "Neural Media", accent: "#7b1fa2", surface: "#f3e5f5", ink: "#1a0e20", layout: "catalog" },
  { id: 28, title: "Core Intelligence", accent: "#0277bd", surface: "#e1f5fe", ink: "#0a1820", layout: "minimal" },
  { id: 29, title: "Systemic Forge", accent: "#ff6f00", surface: "#fff8e1", ink: "#1a1408", layout: "poster" },
  { id: 30, title: "Neural Digital", accent: "#455a64", surface: "#f4f6f7", ink: "#0e1418", layout: "editorial" },
  { id: 31, title: "Agentic Labs", accent: "#00695c", surface: "#e0f2f1", ink: "#081a18", layout: "minimal" },
  { id: 32, title: "Systemic Press", accent: "#4e342e", surface: "#d7ccc8", ink: "#1a1210", layout: "catalog" },
] as const;

const webImages = Array.from({ length: 32 }).map((_, i) => `/projects/${i + 1}.jpg`);

export default function InteractiveProjectGrid() {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
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
    const stage = stageRef.current;
    const viewport = viewportRef.current;

    if (!stage || !viewport) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 500);
    // Adjusted camera further back to increase visible 3D depth and curvature
    camera.position.set(0, 0, 64);
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
    const siteTextures = mockSites.map((_, index) => {
      const url = webImages[index % webImages.length];
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
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
        link: `/projects/${mockSites[siteIndex].id}`,
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
  }, []);

  return (
    <section className="work-sphere-section" aria-labelledby="project-showcase-title">
      <div className="section-shell work-sphere-shell">
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
                  router.push(link);
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
                fontFamily: 'var(--font-title), serif',
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
