"use client";

import React, { useEffect, useRef } from 'react';

export const AIBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = 0;
    let mouseY = 0;
    let tabVisible = true;
    let inViewport = true;
    let rafId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    // Throttled mousemove via RAF
    let mouseRafId: number | null = null;
    let latestMX = 0;
    let latestMY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      latestMX = e.clientX;
      latestMY = e.clientY;
      if (mouseRafId !== null) return;
      mouseRafId = window.requestAnimationFrame(() => {
        mouseRafId = null;
        mouseX = latestMX;
        mouseY = latestMY;
      });
    };

    const handleVisibility = () => {
      tabVisible = document.visibilityState === 'visible';
    };

    // Scroll-based pause — canvas is position:fixed so IntersectionObserver always reports visible.
    // All sections below hero have opaque backgrounds that fully cover the canvas,
    // so animation is invisible once scrolled past ~1 viewport height.
    const handleScroll = () => {
      inViewport = window.scrollY < window.innerHeight * 1.2;
    };
    handleScroll(); // check initial state

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    resize();

    // Defer animation start by 2s to avoid blocking hydration and competing with hero canvas
    const startTimer = setTimeout(() => {
      interface Point {
        x: number;
        y: number;
        ox: number; // original x
        oy: number; // original y
      }

      // Grid of points
      const points: Point[] = [];
      const spacing = width > 1200 ? 120 : 90;
      const rows = Math.ceil(height / spacing);
      const cols = Math.ceil(width / spacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          points.push({
            x: i * spacing,
            y: j * spacing,
            ox: i * spacing,
            oy: j * spacing,
          });
        }
      }

      const maxDist = 200;
      const maxDistSq = maxDist * maxDist;
      const hotDistSq = 250 * 250;

      let lastTime = 0;
      const frameMs = 1000 / 30;

      const animate = (t: number) => {
        if (!tabVisible || !inViewport) {
          rafId = requestAnimationFrame(animate);
          return;
        }

        if (t - lastTime < frameMs) {
          rafId = requestAnimationFrame(animate);
          return;
        }
        lastTime = t;

        // Disable heavy background physics on mobile
        if (width < 768) {
          ctx.clearRect(0, 0, width, height);
          rafId = requestAnimationFrame(animate);
          return;
        }

        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines first (faint)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          // Physics: Move points away from mouse
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const force = (maxDist - dist) / maxDist;
            const push = force * 20;

            // Optimized directional vector math (cheaper than atan2 + sin/cos)
            p.x += (dx / dist) * push * 0.1;
            p.y += (dy / dist) * push * 0.1;
          }

          // Return to original position (spring)
          const dkx = p.ox - p.x;
          const dky = p.oy - p.y;
          p.x += dkx * 0.05;
          p.y += dky * 0.05;

          // Draw point
          ctx.fillStyle = distSq < hotDistSq ? 'rgba(255, 31, 31, 0.4)' : 'rgba(200, 200, 200, 0.2)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, distSq < hotDistSq ? 2 : 1, 0, Math.PI * 2);
          ctx.fill();
        }

        rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      if (mouseRafId !== null) window.cancelAnimationFrame(mouseRafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-white dark:bg-black"
    />
  );
};