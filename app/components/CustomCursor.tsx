"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the follower
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [hoverState, setHoverState] = useState<'default' | 'pointer'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const isVisibleRef = useRef(false);
  const hoverStateRef = useRef<'default' | 'pointer'>('default');

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId: number | null = null;
    let latestX = -100;
    let latestY = -100;

    const moveMouse = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        mouseX.set(latestX);
        mouseY.set(latestY);
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          setIsVisible(true);
        }
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Broad check for interactive elements including inputs and typical interactive roles
      const isPointer = target.closest('a, button, .cursor-hover, [role="button"], input, textarea, select');
      const nextState: 'default' | 'pointer' = isPointer ? 'pointer' : 'default';
      if (hoverStateRef.current !== nextState) {
        hoverStateRef.current = nextState;
        setHoverState(nextState);
      }
    };

    window.addEventListener('mousemove', moveMouse, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', checkHover, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Primary Dot - Instant Follow */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: hoverState === 'pointer' ? 0 : 1 // Hide dot when in pointer mode (merged into ring)
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Secondary Ring - Smooth Follow & Transform */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-exclusion border border-white flex items-center justify-center"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: hoverState === 'pointer' ? 60 : 32,
          height: hoverState === 'pointer' ? 60 : 32,
          backgroundColor: hoverState === 'pointer' ? 'white' : 'transparent',
          scale: isClicking ? 0.8 : 1,
          borderWidth: hoverState === 'pointer' ? '0px' : '1px',
        }}
        transition={{ 
          type: "spring", 
          stiffness: 250, 
          damping: 20,
          mass: 0.5
        }}
      >
        {/* Optional: Inner Text/Icon for Pointer State (Inverted by exclusion) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hoverState === 'pointer' ? 1 : 0, 
            scale: hoverState === 'pointer' ? 1 : 0 
          }}
          className="text-black text-[8px] font-bold font-mono tracking-widest uppercase"
        >
        </motion.div>
      </motion.div>
    </>
  );
};