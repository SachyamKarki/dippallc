"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { bindVisibility } from "@/lib/motion";
import { subscribeImmersiveFocus } from "@/lib/renderFocus";
import { EARTH_NIGHT_URL, preloadEarthTexture } from "@/lib/earthAssets";

/* ── City lat/lng ── */
const CITIES = [
  { name: "Atlanta",       lat:  33.749, lng:  -84.388 },
  { name: "New York",      lat:  40.713, lng:  -74.006 },
  { name: "Los Angeles",   lat:  34.052, lng: -118.244 },
  { name: "Chicago",       lat:  41.878, lng:  -87.630 },
  { name: "Miami",         lat:  25.762, lng:  -80.191 },
  { name: "Houston",       lat:  29.760, lng:  -95.370 },
  { name: "San Francisco", lat:  37.775, lng: -122.418 },
  { name: "Toronto",       lat:  43.651, lng:  -79.383 },
  { name: "Vancouver",     lat:  49.283, lng: -123.121 },
  { name: "Montreal",      lat:  45.508, lng:  -73.587 },
  { name: "Mexico City",   lat:  19.433, lng:  -99.133 },
  { name: "São Paulo",     lat: -23.550, lng:  -46.633 },
  { name: "Bogotá",        lat:   4.711, lng:  -74.072 },
  { name: "London",        lat:  51.507, lng:   -0.128 },
  { name: "Frankfurt",     lat:  50.110, lng:    8.682 },
  { name: "Paris",         lat:  48.857, lng:    2.352 },
  { name: "Mumbai",        lat:  19.076, lng:   72.878 },
  { name: "Singapore",     lat:   1.352, lng:  103.820 },
  { name: "Tokyo",         lat:  35.676, lng:  139.650 },
  { name: "Dubai",         lat:  25.204, lng:   55.270 },
  { name: "Kathmandu",     lat:  27.700, lng:   85.318 },
  { name: "Seoul",         lat:  37.566, lng:  126.978 },
  { name: "Johannesburg",  lat: -26.205, lng:   28.047 },
];

function latLngToVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

function buildArc(a: THREE.Vector3, b: THREE.Vector3, segments = 48, lift = 0.25): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t   = i / segments;
    const mid = a.clone().lerp(b, t).normalize();
    const h = 1 + lift * Math.sin(Math.PI * t);
    points.push(mid.multiplyScalar(h));
  }
  return new THREE.CatmullRomCurve3(points);
}

const ATLANTA_CONNECTIONS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

export default function HeroGlobe({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let disposed = false;
    const disposables: Array<{ dispose: () => void }> = [];

    const W = container.clientWidth  || 520;
    const H = container.clientHeight || 520;
    const isMobile = window.innerWidth < 768;
    const segs = isMobile ? 40 : 72;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.opacity = "0";
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 68 : 48, W / H, 0.1, 100);
    camera.position.z = isMobile ? 2.4 : 3.2;

    scene.add(new THREE.AmbientLight(0x1a2840, 0.55));
    const moon = new THREE.DirectionalLight(0x8eb4ff, 0.55);
    moon.position.set(-3.5, 2.2, 2.5);
    scene.add(moon);
    const rim = new THREE.DirectionalLight(0x4466aa, 0.35);
    rim.position.set(4, -1, -2);
    scene.add(rim);

    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x0a1428,
      emissive: new THREE.Color(0xffeedd),
      emissiveIntensity: 1.55,
      roughness: 0.92,
      metalness: 0.05,
    });
    disposables.push(globeMat);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, segs, segs),
      globeMat,
    );
    disposables.push(globe.geometry);
    globe.rotation.y = 0.0;
    globe.rotation.x = 0.08;
    scene.add(globe);

    const cityVecs = CITIES.map(c => latLngToVec3(c.lat, c.lng, 1.005));
    const dotGeo   = new THREE.SphereGeometry(0.013, isMobile ? 6 : 10, isMobile ? 6 : 10);
    disposables.push(dotGeo);

    const cityDots: THREE.Mesh[] = [];
    const cityMats: THREE.MeshBasicMaterial[] = [];
    cityVecs.forEach((v, ci) => {
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: ci === 0 ? 1 : 0 });
      cityMats.push(mat);
      disposables.push(mat);
      const dot = new THREE.Mesh(dotGeo, mat);
      dot.position.copy(v);
      globe.add(dot);
      cityDots.push(dot);
    });

    interface RippleRing { mesh: THREE.Mesh; phase: number }
    interface ArcData {
      curve:    THREE.CatmullRomCurve3;
      trail:    THREE.Line;
      head:     THREE.Mesh;
      destDot:  THREE.Mesh;
      ripples:  RippleRing[];
      prog:     number;
      done:     boolean;
    }

    const TRAIL_SEGS = isMobile ? 36 : 48;
    const arcs: ArcData[] = [];
    const tmp = new THREE.Vector3();
    const rippleGeo = new THREE.RingGeometry(0.01, 0.018, 16);
    disposables.push(rippleGeo);

    ATLANTA_CONNECTIONS.forEach((destIdx, i) => {
      const a = cityVecs[0].clone();
      const b = cityVecs[destIdx].clone();
      const angularDist = a.angleTo(b);
      const lift = 0.02 + angularDist * 0.05;
      const curve = buildArc(a, b, TRAIL_SEGS, lift);

      const trailPositions = new Float32Array((TRAIL_SEGS + 1) * 3);
      for (let p = 0; p <= TRAIL_SEGS; p++) {
        trailPositions[p * 3] = a.x;
        trailPositions[p * 3 + 1] = a.y;
        trailPositions[p * 3 + 2] = a.z;
      }
      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3));
      trailGeo.setDrawRange(0, 2);
      disposables.push(trailGeo);
      const trailMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
      disposables.push(trailMat);
      const trail    = new THREE.Line(trailGeo, trailMat);
      globe.add(trail);

      const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      disposables.push(headMat);
      const headGeo = new THREE.SphereGeometry(0.018, 6, 6);
      disposables.push(headGeo);
      const head    = new THREE.Mesh(headGeo, headMat);
      head.position.copy(a);
      globe.add(head);

      const ripples: RippleRing[] = [0, 0.33, 0.66].map(phase => {
        const mat  = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
        disposables.push(mat);
        const mesh = new THREE.Mesh(rippleGeo, mat);
        mesh.position.copy(b);
        mesh.lookAt(new THREE.Vector3(0, 0, 0));
        mesh.visible = false;
        globe.add(mesh);
        return { mesh, phase };
      });

      arcs.push({
        curve, trail, head,
        destDot: cityDots[destIdx],
        ripples,
        prog: -(i * 0.06),
        done: false,
      });
    });

    const BASE    = 0.0;
    globe.rotation.y = BASE;
    globe.rotation.x = 0.08;
    let autoRotate  = 0;
    let dragDeltaY  = 0;
    let dragDeltaX  = 0;
    let currentY    = BASE;
    let currentX    = globe.rotation.x;
    let arcsComplete = false;
    let textureReady = false;

    let isDragging = false, lastX = 0, lastY = 0, velX = 0, velY = 0;
    const canvas = renderer.domElement;
    canvas.style.cursor = "grab";

    function pointerDown(e: PointerEvent) {
      isDragging = true; lastX = e.clientX; lastY = e.clientY;
      velX = 0; velY = 0; canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    }
    function pointerMove(e: PointerEvent) {
      if (!isDragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      dragDeltaY += dx * 0.005; dragDeltaX += dy * 0.005;
      velX = dx * 0.005; velY = dy * 0.005;
    }
    function pointerUp(e: PointerEvent) {
      isDragging = false; canvas.style.cursor = "grab";
      canvas.releasePointerCapture(e.pointerId);
    }

    canvas.addEventListener("pointerdown",  pointerDown);
    canvas.addEventListener("pointermove",  pointerMove);
    canvas.addEventListener("pointerup",    pointerUp);
    canvas.addEventListener("pointerleave", pointerUp);

    const raf  = { id: 0 };
    let active = true;
    let yieldToImmersive = false;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 2.5);

    function animate(t: number) {
      if (!active || yieldToImmersive) {
        raf.id = 0;
        return;
      }
      raf.id = requestAnimationFrame(animate);

      if (!isDragging) autoRotate += 0.0004;

      if (!isDragging && (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001)) {
        dragDeltaY += velX; dragDeltaX += velY;
        velX *= 0.92; velY *= 0.92;
      }

      dragDeltaX = Math.max(-0.6, Math.min(0.6, dragDeltaX));
      const targetY = BASE + autoRotate + dragDeltaY;
      const targetX = 0.08 + dragDeltaX;
      currentY += (targetY - currentY) * 0.07;
      currentX += (targetX - currentX) * 0.07;

      globe.rotation.y = currentY;
      globe.rotation.x = currentX;

      if (textureReady && !arcsComplete) {
        let remaining = 0;
        arcs.forEach((arc) => {
          if (arc.done) {
            let rippleLive = false;
            arc.ripples.forEach((r) => {
              if (!r.mesh.visible) return;
              rippleLive = true;
              r.phase = Math.min(r.phase + 0.025, 1);
              const scale = 0.5 + r.phase * 3;
              const opacity = Math.max(0, 0.9 * (1 - r.phase));
              r.mesh.scale.setScalar(scale);
              (r.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
              if (r.phase >= 1) r.mesh.visible = false;
            });
            if (rippleLive) remaining += 1;
            return;
          }

          remaining += 1;
          arc.prog = Math.min(arc.prog + 0.018, 1);
          const raw = Math.max(0, arc.prog);
          if (raw <= 0) return;

          const p = easeOut(raw);
          const count = Math.max(2, Math.ceil(p * TRAIL_SEGS));
          const attr = arc.trail.geometry.getAttribute("position") as THREE.BufferAttribute;
          for (let i = 0; i <= count; i++) {
            arc.curve.getPoint(i / TRAIL_SEGS, tmp);
            attr.setXYZ(i, tmp.x, tmp.y, tmp.z);
          }
          attr.needsUpdate = true;
          arc.trail.geometry.setDrawRange(0, count + 1);

          if (raw < 1) {
            arc.curve.getPoint(Math.min(p, 0.999), tmp);
            arc.head.position.copy(tmp);
            (arc.head.material as THREE.MeshBasicMaterial).opacity = 0.95;
          } else {
            (arc.head.material as THREE.MeshBasicMaterial).opacity = 0;
            arc.done = true;
            (arc.destDot.material as THREE.MeshBasicMaterial).opacity = 1;
            arc.ripples.forEach(r => { r.mesh.visible = true; });
          }
        });
        if (remaining === 0) arcsComplete = true;
      }

      if (textureReady) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
        (cityDots[0].material as THREE.MeshBasicMaterial).opacity = 0.7 + pulse * 0.3;
        cityDots[0].scale.setScalar(1 + pulse * 0.3);
      }

      renderer.render(scene, camera);
    }

    function startLoop() {
      if (!active || yieldToImmersive || raf.id) return;
      raf.id = requestAnimationFrame(animate);
    }

    function revealCanvas() {
      if (disposed) return;
      renderer.domElement.style.opacity = "1";
      setVisible(true);
      onReadyRef.current?.();
    }

    function onTextureReady() {
      if (disposed) return;
      textureReady = true;
      startLoop();
    }

    function onResize(w: number, h: number) {
      if (!w || !h) return;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (e) onResize(e.contentRect.width, e.contentRect.height);
    });
    ro.observe(container);

    const unbind = bindVisibility(container, (isActive) => {
      active = isActive;
      if (active && !yieldToImmersive) startLoop();
      else if (raf.id) {
        cancelAnimationFrame(raf.id);
        raf.id = 0;
      }
    });

    const unsubFocus = subscribeImmersiveFocus((busy) => {
      yieldToImmersive = busy;
      if (busy) {
        if (raf.id) {
          cancelAnimationFrame(raf.id);
          raf.id = 0;
        }
      } else {
        startLoop();
      }
    });

    // Prefer a warm browser-decoded image; fall back to TextureLoader.
    const applyTexture = (source: HTMLImageElement | THREE.Texture) => {
      if (disposed) {
        if (source instanceof THREE.Texture) source.dispose();
        return;
      }

      let nightTex: THREE.Texture;
      if (source instanceof THREE.Texture) {
        nightTex = source;
      } else {
        nightTex = new THREE.Texture(source);
        nightTex.needsUpdate = true;
      }

      nightTex.colorSpace = THREE.SRGBColorSpace;
      nightTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      nightTex.generateMipmaps = true;
      nightTex.minFilter = THREE.LinearMipmapLinearFilter;
      nightTex.magFilter = THREE.LinearFilter;
      disposables.push(nightTex);

      globeMat.map = nightTex;
      globeMat.emissiveMap = nightTex;
      globeMat.needsUpdate = true;
      onTextureReady();
    };

    preloadEarthTexture()
      .then((img) => applyTexture(img))
      .catch(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
          EARTH_NIGHT_URL,
          (tex) => applyTexture(tex),
          undefined,
          () => onTextureReady(),
        );
      });

    // Show the sphere at the correct size/angle immediately (dark), then
    // apply the night texture in place — no size or angle jump.
    renderer.domElement.style.opacity = "1";
    startLoop();
    requestAnimationFrame(() => {
      revealCanvas();
    });

    return () => {
      disposed = true;
      active = false;
      cancelAnimationFrame(raf.id);
      unbind();
      unsubFocus();
      ro.disconnect();
      canvas.removeEventListener("pointerdown",  pointerDown);
      canvas.removeEventListener("pointermove",  pointerMove);
      canvas.removeEventListener("pointerup",    pointerUp);
      canvas.removeEventListener("pointerleave", pointerUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={visible ? "hero-globe-canvas is-ready" : "hero-globe-canvas"}
      style={{ position: "absolute", inset: 0, background: "transparent" }}
      aria-hidden="true"
    />
  );
}
