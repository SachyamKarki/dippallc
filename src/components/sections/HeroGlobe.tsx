"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── City lat/lng ── */
const CITIES = [
  // Hub
  { name: "Atlanta",       lat:  33.749, lng:  -84.388 },
  // USA
  { name: "New York",      lat:  40.713, lng:  -74.006 },
  { name: "Los Angeles",   lat:  34.052, lng: -118.244 },
  { name: "Chicago",       lat:  41.878, lng:  -87.630 },
  { name: "Miami",         lat:  25.762, lng:  -80.191 },
  { name: "Houston",       lat:  29.760, lng:  -95.370 },
  { name: "San Francisco", lat:  37.775, lng: -122.418 },
  // Canada
  { name: "Toronto",       lat:  43.651, lng:  -79.383 },
  { name: "Vancouver",     lat:  49.283, lng: -123.121 },
  { name: "Montreal",      lat:  45.508, lng:  -73.587 },
  // Mexico
  { name: "Mexico City",   lat:  19.433, lng:  -99.133 },
  // South America
  { name: "São Paulo",     lat: -23.550, lng:  -46.633 },
  { name: "Bogotá",        lat:   4.711, lng:  -74.072 },
  // Europe
  { name: "London",        lat:  51.507, lng:   -0.128 },
  { name: "Frankfurt",     lat:  50.110, lng:    8.682 },
  { name: "Paris",         lat:  48.857, lng:    2.352 },
  // Asia
  { name: "Mumbai",        lat:  19.076, lng:   72.878 },
  { name: "Singapore",     lat:   1.352, lng:  103.820 },
  { name: "Tokyo",         lat:  35.676, lng:  139.650 },
  { name: "Dubai",         lat:  25.204, lng:   55.270 },
  { name: "Kathmandu",     lat:  27.700, lng:   85.318 },
  { name: "Seoul",         lat:  37.566, lng:  126.978 },
  { name: "Johannesburg",  lat: -26.205, lng:   28.047 },
];

/* Convert lat/lng to 3D point on unit sphere */
function latLngToVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

/* Build a smooth arc between two points on the sphere */
function buildArc(a: THREE.Vector3, b: THREE.Vector3, segments = 60, lift = 0.25): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t   = i / segments;
    const mid = a.clone().lerp(b, t).normalize();
    // Lift arc above surface — peaks in the middle
    const h = 1 + lift * Math.sin(Math.PI * t);
    points.push(mid.multiplyScalar(h));
  }
  return new THREE.CatmullRomCurve3(points);
}

/* Atlanta (0) to every other city */
const ATLANTA_CONNECTIONS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];

export default function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 520;
    const H = container.clientHeight || 520;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Correct size after first paint when CSS layout is settled
    requestAnimationFrame(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w && h) { camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }
    });

    const scene  = new THREE.Scene();
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(isMobile ? 52 : 48, W / H, 0.1, 100);
    camera.position.z = isMobile ? 2.4 : 3.2;

    scene.add(new THREE.AmbientLight(0x0a1020, 1));
    const moon = new THREE.DirectionalLight(0x223355, 0.35);
    moon.position.set(-4, 2, 2);
    scene.add(moon);

    const loader   = new THREE.TextureLoader();
    const nightTex = loader.load("/earth-night.jpg");
    nightTex.colorSpace = THREE.SRGBColorSpace;

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1, 80, 80),
      new THREE.MeshStandardMaterial({
        map:               nightTex,
        emissiveMap:       nightTex,
        emissive:          new THREE.Color(0xffeedd),
        emissiveIntensity: 1.4,
        roughness:         1,
        metalness:         0,
      })
    );
    // Atlanta at lng=-84.4° has theta≈1.67rad (sin≈1), so R≈0 centers it on camera
    globe.rotation.y = 0.0;
    globe.rotation.x = 0.08;
    scene.add(globe);

    /* ── City dots ── */
    const cityVecs = CITIES.map(c => latLngToVec3(c.lat, c.lng, 1.005));
    const dotGeo   = new THREE.SphereGeometry(0.013, 10, 10);

    const cityDots: THREE.Mesh[] = [];
    cityVecs.forEach((v, ci) => {
      const mat = new THREE.MeshBasicMaterial({ color: ci === 0 ? 0xffffff : 0xffffff, transparent: true, opacity: 0 });
      const dot = new THREE.Mesh(dotGeo, mat);
      dot.position.copy(v);
      globe.add(dot);
      cityDots.push(dot);
    });

    /* ── Arc beams from Atlanta ── */
    interface RippleRing { mesh: THREE.Mesh; phase: number; }
    interface ArcData {
      curve:    THREE.CatmullRomCurve3;
      trail:    THREE.Line;
      head:     THREE.Mesh;
      destPos:  THREE.Vector3;
      destDot:  THREE.Mesh;
      ripples:  RippleRing[];
      prog:     number;
      done:     boolean;
    }

    (cityDots[0].material as THREE.MeshBasicMaterial).opacity = 1;
    const TRAIL_SEGS = 80;
    const arcs: ArcData[] = [];

    const rippleGeo = new THREE.RingGeometry(0.01, 0.018, 32);

    ATLANTA_CONNECTIONS.forEach((destIdx, i) => {
      const a = cityVecs[0].clone();
      const b = cityVecs[destIdx].clone();
      const angularDist = a.angleTo(b);
      const lift = 0.02 + angularDist * 0.05;
      const curve = buildArc(a, b, TRAIL_SEGS, lift);

      // Trail
      const trailGeo = new THREE.BufferGeometry().setFromPoints([a]);
      const trailMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
      const trail    = new THREE.Line(trailGeo, trailMat);
      globe.add(trail);

      // Head
      const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
      const head    = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), headMat);
      head.position.copy(a);
      globe.add(head);

      // 3 staggered ripple rings per destination
      const ripples: RippleRing[] = [0, 0.33, 0.66].map(phase => {
        const mat  = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(rippleGeo.clone(), mat);
        mesh.position.copy(b);
        mesh.lookAt(new THREE.Vector3(0, 0, 0));
        mesh.visible = false;
        globe.add(mesh);
        return { mesh, phase };
      });

      arcs.push({
        curve, trail, head,
        destPos: b.clone(),
        destDot: cityDots[destIdx],
        ripples,
        prog: -(i * 0.06),
        done: false,
      });
    });

    /* ── Rotation state ── */
    const BASE    = globe.rotation.y;
    let scrollDelta = 0;
    let dragDeltaY  = 0;
    let dragDeltaX  = 0;
    let currentY    = BASE;
    let currentX    = globe.rotation.x;

    function onScroll() { scrollDelta = window.scrollY / 260; }
    window.addEventListener("scroll", onScroll, { passive: true });

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

    let lastSY = -1, idleT = 0;
    const raf  = { id: 0 };

    function animate(t: number) {
      raf.id = requestAnimationFrame(animate);

      const sy = window.scrollY;
      if (sy !== lastSY) { lastSY = sy; idleT = t; }

      if (!isDragging && t - idleT > 1500) dragDeltaY += 0.0005;

      if (!isDragging && (Math.abs(velX) > 0.0001 || Math.abs(velY) > 0.0001)) {
        dragDeltaY += velX; dragDeltaX += velY;
        velX *= 0.92; velY *= 0.92;
      }

      dragDeltaX = Math.max(-0.6, Math.min(0.6, dragDeltaX));
      const targetY = BASE + scrollDelta + dragDeltaY;
      const targetX = 0.1 + dragDeltaX;
      currentY += (targetY - currentY) * 0.07;
      currentX += (targetX - currentX) * 0.07;

      globe.rotation.y = currentY;
      globe.rotation.x = currentX;

      /* Animate arc beams */
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 2.5);

      arcs.forEach((arc) => {
        arc.prog = Math.min(arc.prog + 0.018, 1);
        const raw = Math.max(0, arc.prog);
        if (raw <= 0) return;

        const p = easeOut(raw);

        // Trail draw
        const count = Math.max(2, Math.ceil(p * TRAIL_SEGS));
        const pts   = arc.curve.getPoints(count);
        arc.trail.geometry.dispose();
        arc.trail.geometry = new THREE.BufferGeometry().setFromPoints(pts);

        // Moving head
        if (raw < 1) {
          const tip = arc.curve.getPoint(Math.min(p, 0.999));
          arc.head.position.copy(tip);
          (arc.head.material as THREE.MeshBasicMaterial).opacity = 0.95;
        } else {
          (arc.head.material as THREE.MeshBasicMaterial).opacity = 0;
        }

        // On arrival reveal dest dot
        if (raw >= 1 && !arc.done) {
          arc.done = true;
          (arc.destDot.material as THREE.MeshBasicMaterial).opacity = 1;
          arc.ripples.forEach(r => { r.mesh.visible = true; });
        }

        // One-time burst: each ring tracks its own 0→1 progress then stops
        if (arc.done) {
          arc.ripples.forEach((r) => {
            if (!r.mesh.visible) return;
            r.phase = Math.min(r.phase + 0.025, 1);
            const scale = 0.5 + r.phase * 3;
            const opacity = Math.max(0, 0.9 * (1 - r.phase));
            r.mesh.scale.setScalar(scale);
            (r.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
            if (r.phase >= 1) r.mesh.visible = false;
          });
        }
      });

      /* Pulse Atlanta dot */
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.004);
      (cityDots[0].material as THREE.MeshBasicMaterial).opacity = 0.7 + pulse * 0.3;
      cityDots[0].scale.setScalar(1 + pulse * 0.3);

      renderer.render(scene, camera);
    }
    raf.id = requestAnimationFrame(animate);

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

    return () => {
      cancelAnimationFrame(raf.id);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointerdown",  pointerDown);
      canvas.removeEventListener("pointermove",  pointerMove);
      canvas.removeEventListener("pointerup",    pointerUp);
      canvas.removeEventListener("pointerleave", pointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, background: "transparent" }}
      aria-hidden="true"
    />
  );
}
