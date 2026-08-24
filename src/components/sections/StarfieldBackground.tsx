"use client";
import { useEffect, useRef } from "react";
import { bindVisibility, prefersReducedMotion } from "@/lib/motion";
import { subscribeImmersiveFocus } from "@/lib/renderFocus";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let W = 0, H = 0;
    let active = true;
    let yieldToImmersive = false;
    const reduced = prefersReducedMotion();
    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 50 : 80;
    const SHOOTING_MAX = reduced || isMobile ? 0 : 2;

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
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.01 + 0.003,
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

    function paintStars() {
      ctx!.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${a})`;
        ctx!.fill();
      }
    }

    function draw() {
      if (!active || yieldToImmersive) {
        animId = 0;
        return;
      }
      paintStars();

      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
      }

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

      animId = requestAnimationFrame(draw);
    }

    resize();

    if (reduced) {
      paintStars();
    } else {
      draw();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const unbind = reduced
      ? () => {}
      : bindVisibility(canvas, (isActive) => {
          active = isActive;
          if (active && !yieldToImmersive && !animId) animId = requestAnimationFrame(draw);
          else if ((!active || yieldToImmersive) && animId) {
            cancelAnimationFrame(animId);
            animId = 0;
          }
        });

    const unsubFocus = reduced
      ? () => {}
      : subscribeImmersiveFocus((busy) => {
          yieldToImmersive = busy;
          if (busy) {
            if (animId) {
              cancelAnimationFrame(animId);
              animId = 0;
            }
          } else if (active && !animId) {
            animId = requestAnimationFrame(draw);
          }
        });

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      unbind();
      unsubFocus();
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
