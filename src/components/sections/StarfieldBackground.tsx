"use client";
import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const STAR_COUNT = 220;
    const SHOOTING_MAX = 6;

    type Star = { x: number; y: number; r: number; alpha: number; twinkleSpeed: number; twinklePhase: number };
    type Shoot = { x: number; y: number; len: number; speed: number; angle: number; alpha: number; trail: number; active: boolean; delay: number };

    let stars: Star[] = [];
    let shoots: Shoot[] = [];

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width = W;
      canvas!.height = H;
      buildStars();
    }

    function buildStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.012 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }

    function newShoot(): Shoot {
      const angle = (Math.random() * 30 + 20) * (Math.PI / 180);
      return {
        x: Math.random() * W * 1.2 - W * 0.1,
        y: Math.random() * H * 0.5,
        len: Math.random() * 140 + 80,
        speed: Math.random() * 6 + 5,
        angle,
        alpha: 1,
        trail: Math.random() * 0.4 + 0.6,
        active: true,
        delay: Math.random() * 180,
      };
    }

    shoots = Array.from({ length: SHOOTING_MAX }, newShoot);

    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // static stars
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.fill();
      }

      // shooting stars
      for (const sh of shoots) {
        if (sh.delay > 0) { sh.delay--; continue; }
        if (!sh.active) continue;

        const dx = Math.cos(sh.angle) * sh.len;
        const dy = Math.sin(sh.angle) * sh.len;

        const grad = ctx!.createLinearGradient(sh.x, sh.y, sh.x - dx, sh.y - dy);
        grad.addColorStop(0, `rgba(255,255,255,${sh.alpha})`);
        grad.addColorStop(0.3, `rgba(180,200,255,${sh.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);

        ctx!.beginPath();
        ctx!.moveTo(sh.x, sh.y);
        ctx!.lineTo(sh.x - dx, sh.y - dy);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        sh.x += Math.cos(sh.angle) * sh.speed;
        sh.y += Math.sin(sh.angle) * sh.speed;
        sh.alpha -= 0.012;

        if (sh.alpha <= 0 || sh.x > W + 50 || sh.y > H + 50) {
          Object.assign(sh, newShoot());
        }
      }

      t++;
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
