"use client";

import React, { useEffect, useRef } from 'react';

export default function BloodDripOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const obstaclesRef = useRef<DOMRect[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    interface Strand {
      baseX: number;
      phase: number;
      points: Point[];
      width: number;
    }

    const strands: Strand[] = [];
    const strandCount = 20; // Exactly 20 strands
    const pointsPerStrand = 50;

    const updateObstacles = () => {
      const elements = document.querySelectorAll('.hero-title, .hero-stats, .hero-actions, .hero-globe-container, .hero-kicker');
      obstaclesRef.current = Array.from(elements).map(el => el.getBoundingClientRect());
    };

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateObstacles();

      strands.length = 0;
      for (let i = 0; i < strandCount; i++) {
        const baseX = Math.random() * canvas.width;
        const s: Strand = {
          baseX,
          phase: Math.random() * Math.PI * 2,
          width: 0.5 + Math.random() * 1.5, // Very small width
          points: []
        };
        
        for (let j = 0; j < pointsPerStrand; j++) {
          s.points.push({
            x: baseX,
            y: (canvas.height / pointsPerStrand) * j,
            vx: 0,
            vy: 0
          });
        }
        strands.push(s);
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Blood color
      ctx.strokeStyle = '#8B0000';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      strands.forEach(strand => {
        // 1. Update the "head" (top) to wiggle randomly
        const topWiggle = Math.sin(time * 0.0005 + strand.phase) * 60;
        strand.points[0].x = strand.baseX + topWiggle;
        strand.points[0].y = 0;

        // 2. Update all other points with "Honey" logic but thin
        for (let j = 1; j < strand.points.length; j++) {
          const p = strand.points[j];
          const prev = strand.points[j - 1];

          // Target is always below the previous point with some drift
          const drift = Math.sin(j * 0.15 + time * 0.001 + strand.phase) * 12;
          const targetX = prev.x + drift;
          const targetY = prev.y + (canvas.height / pointsPerStrand);

          // Viscous following
          p.vx += (targetX - p.x) * 0.04;
          p.vy += (targetY - p.y) * 0.04;
          
          p.vx *= 0.85;
          p.vy *= 0.85;

          // Obstacle Bending
          for (const rect of obstaclesRef.current) {
            if (p.x > rect.left && p.x < rect.right && p.y > rect.top && p.y < rect.bottom) {
              const toLeft = p.x - rect.left;
              const toRight = rect.right - p.x;
              p.vx += (toLeft < toRight) ? -2 : 2;
              p.vy *= 0.1;
              break;
            }
          }

          p.x += p.vx;
          p.y += p.vy;
        }

        // 3. Draw the thin strand as a continuous line
        ctx.beginPath();
        ctx.lineWidth = strand.width;
        ctx.moveTo(strand.points[0].x, strand.points[0].y);
        
        for (let j = 1; j < strand.points.length - 1; j++) {
          const xc = (strand.points[j].x + strand.points[j + 1].x) / 2;
          const yc = (strand.points[j].y + strand.points[j + 1].y) / 2;
          ctx.quadraticCurveTo(strand.points[j].x, strand.points[j].y, xc, yc);
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    initCanvas();
    animationFrameId = requestAnimationFrame(draw);

    window.addEventListener('resize', initCanvas);
    const obstacleInterval = setInterval(updateObstacles, 2000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initCanvas);
      clearInterval(obstacleInterval);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[200] overflow-hidden"
      style={{ 
        // For very thin strands, we use less blur but keep the contrast for liquid skin look
        filter: 'blur(3px) contrast(15)', 
        mixBlendMode: 'darken',
        opacity: 0.9
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
}
