"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the follower
  const springConfig = { damping: 20, stiffness: 150, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Use refs instead of state to avoid re-renders on every mouse event
  const hoverStateRef = useRef<'default' | 'pointer'>('default');
  const isClickingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const enabledRef = useRef(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    enabledRef.current = finePointer;
    if (!finePointer) {
      // Hide cursor elements immediately
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (ringRef.current) ringRef.current.style.display = 'none';
    }
  }, []);

  // Apply style updates directly to DOM refs — no React re-renders
  const applyStyles = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringInner = ringInnerRef.current;
    if (!dot || !ring) return;

    const visible = isVisibleRef.current;
    const hover = hoverStateRef.current;
    const clicking = isClickingRef.current;

    // Dot visibility & scale
    dot.style.opacity = visible ? '1' : '0';
    dot.style.transform = `translate(-50%, -50%) scale(${hover === 'pointer' ? 0 : 1})`;

    // Ring sizing & styling
    ring.style.opacity = visible ? '1' : '0';
    const size = hover === 'pointer' ? 60 : 32;
    ring.style.width = `${size}px`;
    ring.style.height = `${size}px`;
    ring.style.backgroundColor = hover === 'pointer' ? 'rgba(255, 31, 31, 0.1)' : 'transparent';
    ring.style.transform = `translate(-50%, -50%) scale(${clicking ? 0.8 : 1})`;
    ring.style.borderWidth = hover === 'pointer' ? '2px' : '1px';
    ring.style.borderColor = hover === 'pointer' ? '#FF1F1F' : 'rgba(255, 31, 31, 0.5)';

    // Inner text element
    if (ringInner) {
      ringInner.style.opacity = hover === 'pointer' ? '1' : '0';
      ringInner.style.transform = `scale(${hover === 'pointer' ? 1 : 0})`;
    }
  }, []);

  useEffect(() => {
    if (!enabledRef.current) return;

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
          applyStyles();
        }
      });
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      applyStyles();
    };
    const handleMouseUp = () => {
      isClickingRef.current = false;
      applyStyles();
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = target.closest('a, button, .cursor-hover, [role="button"], input, textarea, select');
      const nextState: 'default' | 'pointer' = isPointer ? 'pointer' : 'default';
      if (hoverStateRef.current !== nextState) {
        hoverStateRef.current = nextState;
        applyStyles();
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
  }, [mouseX, mouseY, applyStyles]);

  // Subscribe to motion value changes to update dot & ring position via DOM
  useEffect(() => {
    if (!enabledRef.current) return;

    const unsubX = mouseX.on('change', (v) => {
      if (dotRef.current) dotRef.current.style.left = `${v}px`;
    });
    const unsubY = mouseY.on('change', (v) => {
      if (dotRef.current) dotRef.current.style.top = `${v}px`;
    });
    const unsubCX = cursorX.on('change', (v) => {
      if (ringRef.current) ringRef.current.style.left = `${v}px`;
    });
    const unsubCY = cursorY.on('change', (v) => {
      if (ringRef.current) ringRef.current.style.top = `${v}px`;
    });

    return () => {
      unsubX();
      unsubY();
      unsubCX();
      unsubCY();
    };
  }, [mouseX, mouseY, cursorX, cursorY]);

  return (
    <>
      {/* Primary Dot - Instant Follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-tdx-red rounded-full pointer-events-none z-[9999] shadow-md"
        style={{
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s, transform 0.2s',
        }}
      />

      {/* Secondary Ring - Smooth Follow & Transform */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-tdx-red shadow-sm flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s, width 0.15s, height 0.15s, background-color 0.15s, transform 0.15s, border-width 0.15s, border-color 0.15s',
        }}
      >
        {/* Optional: Inner Text/Icon for Pointer State */}
        <div
          ref={ringInnerRef}
          className="text-black text-[8px] font-bold font-mono tracking-widest uppercase"
          style={{ opacity: 0, transform: 'scale(0)', transition: 'opacity 0.15s, transform 0.15s' }}
        >
        </div>
      </div>
    </>
  );
};