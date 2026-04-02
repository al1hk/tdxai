"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowDown, Zap, CircleDashed, Fingerprint } from 'lucide-react';

export const HeroAI: React.FC = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mouse position tracking for canvas interaction
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        mouseX.current = latestX;
        mouseY.current = latestY;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Neural Network Canvas Animation
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let running = true;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const handleVisibility = () => {
      running = document.visibilityState === 'visible';
    };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    // Particles Configuration
    const particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
    const particleCount = width > 1200 ? 35 : 25;
    const connectionDistance = 180;
    const mouseInteractionDistance = 250;
    const connectionDistanceSq = connectionDistance * connectionDistance;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slow movement
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5
      });
    }

    let lastTime = 0;
    const frameMs = 1000 / 30;
    let connectToggle = false;

    const animate = (t: number) => {
      if (!running) {
        requestAnimationFrame(animate);
        return;
      }

      if (t - lastTime < frameMs) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = t;

      ctx.clearRect(0, 0, width, height);
      connectToggle = !connectToggle;
      
      // Update and Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interaction with mouse: push away gently
        const dx = mouseX.current - p.x;
        const dy = mouseY.current - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < mouseInteractionDistance) {
           const force = (mouseInteractionDistance - dist) / mouseInteractionDistance;
           const angle = Math.atan2(dy, dx);
           p.x -= Math.cos(angle) * force * 1;
           p.y -= Math.sin(angle) * force * 1;
        }

        // Draw Node
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Dark subtle dots
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines (every other frame to reduce work)
        if (connectToggle) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx2 = p.x - p2.x;
            const dy2 = p.y - p2.y;
            const dist2Sq = dx2 * dx2 + dy2 * dy2;

            if (dist2Sq < connectionDistanceSq) {
              const dist2 = Math.sqrt(dist2Sq);
              // Opacity based on distance
              let alpha = 1 - dist2/connectionDistance;
             
             // If close to mouse, turn red/active
              const m2dx = mouseX.current - p2.x;
              const m2dy = mouseY.current - p2.y;
              const mouseDistAvg = (dist + Math.sqrt(m2dx * m2dx + m2dy * m2dy)) / 2;
             
             if (mouseDistAvg < 200) {
                ctx.strokeStyle = `rgba(255, 31, 31, ${alpha * 0.4})`; // Red when active
                ctx.lineWidth = 0.8;
             } else {
                ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 0.05})`; // Very faint otherwise
                ctx.lineWidth = 0.5;
             }
             
             ctx.beginPath();
             ctx.moveTo(p.x, p.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
            }
          }
        }
      });
      requestAnimationFrame(animate);
    };
    
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={ref} className="relative min-h-[110vh] flex flex-col justify-center overflow-hidden bg-white dark:bg-neutral-950 pt-24">
      
      {/* --- NEW DYNAMIC BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Pulsing Red Glows (Ambient) - Optimized */}
        <div className="absolute top-0 left-0 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(255,31,31,0.06)_0%,transparent_70%)] animate-pulse -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(255,31,31,0.05)_0%,transparent_70%)] animate-pulse translate-x-1/4 translate-y-1/4 delay-700" />

        {/* 2. Neural Network Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />
        
        {/* 3. Tech Mesh Overlay (Pattern) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* 3D Perspective Floor (Maintained but softened) */}
      <div className="absolute inset-0 z-0 perspective-[1000px] pointer-events-none">
        <div className="absolute bottom-0 left-[-50%] right-[-50%] h-[1000px] bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] transform rotate-x-[60deg] origin-bottom [mask-image:linear-gradient(to_top,rgba(0,0,0,0.8),transparent)]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Typography */}
        <motion.div style={{ y, opacity }} className="relative z-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tdx-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tdx-red"></span>
              </span>
              <span className="font-mono text-xs font-bold tracking-widest uppercase">TDX Labs</span>
            </div>
            <div className="h-[1px] w-12 bg-black/10 dark:bg-white/10" />
            <span className="font-mono text-xs text-gray-400">Since 2014</span>
          </div>

          <h1 className="font-display font-bold text-6xl sm:text-7xl md:text-[120px] lg:text-[140px] leading-[0.85] tracking-tighter text-black dark:text-white mb-8 relative">
            FUTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tdx-red to-black dark:to-white relative z-10">
              PRIME
            </span>
            {/* Subtle Text Glow Behind Headline */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-tdx-red/20 blur-[60px] -z-10" />
          </h1>

          <p className="font-mono text-gray-500 dark:text-gray-300 text-lg max-w-xl leading-relaxed mb-12 border-l-4 border-tdx-red pl-8 backdrop-blur-sm">
            We build innovative digital solutions that transform businesses. 
            From AI-powered platforms to scalable SaaS — we deliver results.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#contact" className="group relative px-10 py-5 bg-black text-white rounded-full overflow-hidden shadow-2xl shadow-black/20 hover:shadow-tdx-red/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-tdx-red to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-bold flex items-center gap-3 tracking-wide">
                GET STARTED <ArrowDown size={18} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Right: Quantum Core Animation */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-end pointer-events-none">
          <motion.div 
            style={{ rotate }}
            className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px]"
          >
            {/* The Core Reactor */}
            <div className="absolute inset-0 preserve-3d">
              {/* Outer Orbit */}
              <div className="absolute inset-0 border-[1px] border-black/10 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-4 border-[1px] border-dashed border-black/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Gyro Rings */}
              <div className="absolute top-1/2 left-0 w-full h-[300px] -mt-[150px] border border-black/40 dark:border-white/20 rounded-full animate-[spin_8s_linear_infinite] [transform:rotateX(70deg)]" />
              <div className="absolute top-0 left-1/2 h-full w-[300px] -ml-[150px] border border-tdx-red/80 rounded-full animate-[spin_12s_linear_infinite] [transform:rotateY(70deg)]" />
              
              {/* Central Energy Mass */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-black via-gray-900 to-black rounded-full shadow-xl flex items-center justify-center z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                <div className="w-full h-[1px] bg-tdx-red/50 absolute top-1/2 animate-pulse" />
                <Zap className="text-white w-12 h-12 relative z-20 animate-pulse" />
              </div>

              {/* Satellites */}
              <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                 <div className="absolute top-0 left-1/2 w-4 h-4 bg-tdx-red rounded-full -translate-x-1/2 -translate-y-2" />
              </div>
            </div>



          </motion.div>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
         <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Scroll to Explore</span>
         <div className="w-[1px] h-12 bg-gray-200 overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-black animate-dropdown" />
         </div>
      </div>
    </section>
  );
};