"use client";

import React, { useEffect, useRef } from 'react';

export const AIBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    interface Point {
      x: number;
      y: number;
      ox: number; // original x
      oy: number; // original y
    }

    // Grid of points
    const points: Point[] = [];
    const spacing = 60;
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

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid lines first (faint)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.lineWidth = 1;
      
      points.forEach(p => {
        // Physics: Move points away from mouse
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          const push = force * 20;
          
          p.x += Math.cos(angle) * push * 0.1;
          p.y += Math.sin(angle) * push * 0.1;
        }

        // Return to original position (spring)
        const dkx = p.ox - p.x;
        const dky = p.oy - p.y;
        p.x += dkx * 0.05;
        p.y += dky * 0.05;

        // Draw point
        ctx.fillStyle = dist < 250 ? 'rgba(255, 31, 31, 0.4)' : 'rgba(200, 200, 200, 0.2)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, dist < 250 ? 2 : 1, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 bg-white"
    />
  );
};