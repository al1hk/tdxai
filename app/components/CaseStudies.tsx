"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { CaseStudy } from '@/types';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const cases: CaseStudy[] = [
  {
    id: 1,
    title: "Pak Go",
    category: "Logistics & Supply Chain",
    description: "A complete logistics solution for Marine Group of companies for management of shipments via truck and train. Consumer booking app for tracking shipments. Driver app to pickup and dropoff shipments with respect to cargo.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
    link: "https://pakgo.org/",
  },
  {
    id: 2,
    title: "White Label E-Commerce",
    category: "SaaS Platform",
    description: "A multi-tenant e-commerce SaaS platform to serve all the needs of a modern shopping platform. Easy & rapidly configurable on client needs. Developed on cutting edge technologies.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1600",
    link: "https://business.kauppahalli24.fi/",
  },
  {
    id: 3,
    title: "FoodChoo",
    category: "On-Demand Delivery",
    description: "An online innovative on demand food delivery platform aims to provide best experience from their client first mobile app made on state of the art technologies.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1600",
    link: "https://foodchoo.com/",
  },
  {
    id: 4,
    title: "Penny Pinch",
    category: "FinTech",
    description: "A convenient, easy, and rewarding way to shop and send money. Save money on your purchases through discounts while also benefiting from an impressive loyalty program.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600",
    link: "https://mypennypinch.com/",
  },
  {
    id: 5,
    title: "Pocket Giving",
    category: "Charity & Donations",
    description: "A revolutionary, London-based donation platform designed to make charitable giving seamless, transparent, and impactful. Support over 30 trusted charities with just a few taps.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1600",
    link: "https://pocketgiving.co.uk/",
  },
];

export const CaseStudies: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Transform vertical scroll to horizontal scroll
  const x = useTransform(smoothProgress, [0, 1], ["1%", "-75%"]);

  // Mobile drag-to-scroll handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isMobile || !scrollContainerRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
  }, [isMobile]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 1.5;
    scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    dragStartRef.current = {
      x: e.touches[0].pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft,
    };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 1.5;
    scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - walk;
  }, []);

  // Navigation via arrow buttons (mobile)
  const scrollToCard = useCallback((direction: 'prev' | 'next') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.querySelector('.case-card')?.clientWidth || 320;
    const gap = 32;
    const scrollAmount = cardWidth + gap;

    if (direction === 'next') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }, []);

  // Track active card index on mobile scroll
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      const card = container.querySelector('.case-card');
      if (!card) return;
      const cardWidth = (card as HTMLElement).clientWidth + 32; // + gap
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(index, cases.length - 1)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section ref={targetRef} id="work" className="relative h-auto md:h-[300vh] bg-neutral-900">
      <div className="relative md:sticky top-0 h-auto md:h-screen flex flex-col md:flex-row items-center overflow-hidden">

        {/* Background Overlay Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-bold text-neutral-800/20 whitespace-nowrap select-none pointer-events-none hidden md:block">
          SELECTED WORKS
        </div>

        {/* Desktop: horizontal scroll via vertical scroll (framer-motion) */}
        <motion.div
          style={{ x: isMobile ? 0 : x, willChange: "transform" }}
          className={`hidden md:flex flex-row gap-12 px-24 py-0`}
        >
          {/* Header Card */}
          <div className="w-[400px] flex-shrink-0 flex flex-col justify-center text-white">
            <span className="text-tdx-red font-mono text-sm tracking-widest uppercase mb-4">03 // Portfolio</span>
            <h2 className="font-display font-bold text-6xl mb-6">
              Our <br /> Work
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Real solutions we've built for businesses worldwide — from logistics platforms to fintech apps.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
              <span className="w-2 h-2 bg-tdx-red rounded-full animate-pulse" />
              SCROLL TO EXPLORE
            </div>
          </div>

          {/* Project Cards */}
          {cases.map((study) => (
            <div key={study.id} className="relative w-[600px] aspect-[4/3] flex-shrink-0 group cursor-hover">
              <div className="w-full h-full overflow-hidden rounded-2xl relative">
                <div className="absolute inset-0 bg-neutral-800 z-0" />
                <img
                  src={study.image}
                  alt={study.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-500 z-20" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 bg-tdx-red/90 text-white text-xs font-mono mb-3 rounded-full backdrop-blur-md">
                        {study.category}
                      </span>
                      <h3 className="text-white font-display font-bold text-4xl mb-2">{study.title}</h3>
                      {study.description && (
                        <p className="text-white/60 text-base font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                          {study.description}
                        </p>
                      )}
                    </div>
                    {study.link ? (
                      <a href={study.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-tdx-red hover:text-white shrink-0 ml-4">
                        <ArrowUpRight className="text-black w-5 h-5" />
                      </a>
                    ) : (
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shrink-0 ml-4">
                        <ArrowUpRight className="text-black w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="w-[400px] flex-shrink-0 flex flex-col justify-center items-center text-center text-white">
            <h3 className="font-display font-bold text-4xl mb-6">Your Project Next?</h3>
            <a href="#contact" className="px-8 py-4 bg-tdx-red text-white rounded-full font-bold hover:bg-white hover:text-black transition-colors duration-300 cursor-hover">
              Start Discussion
            </a>
          </div>
        </motion.div>

        {/* Mobile: swipeable horizontal scroll */}
        <div className="md:hidden flex flex-col w-full py-20 px-0">
          {/* Mobile Header */}
          <div className="px-6 mb-8 text-white">
            <span className="text-tdx-red font-mono text-sm tracking-widest uppercase mb-4 block">03 // Portfolio</span>
            <h2 className="font-display font-bold text-5xl mb-4">
              Our Work
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Real solutions we've built for businesses worldwide.
            </p>
          </div>

          {/* Scrollable Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-6 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {cases.map((study) => (
              <div key={study.id} className="case-card relative w-[85vw] flex-shrink-0 snap-center aspect-[4/3] group">
                <div className="w-full h-full overflow-hidden rounded-2xl relative">
                  <div className="absolute inset-0 bg-neutral-800 z-0" />
                  <img
                    src={study.image}
                    alt={study.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-20" />

                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="inline-block px-3 py-1 bg-tdx-red/90 text-white text-[10px] font-mono mb-2 rounded-full backdrop-blur-md">
                          {study.category}
                        </span>
                        <h3 className="text-white font-display font-bold text-2xl mb-1">{study.title}</h3>
                        <p className="text-white/60 text-sm font-light leading-relaxed max-w-[240px] line-clamp-2">
                          {study.description}
                        </p>
                      </div>
                      {study.link && (
                        <a href={study.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 ml-3">
                          <ArrowUpRight className="text-black w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-between px-6 mt-6">
            {/* Dot Indicators */}
            <div className="flex gap-2">
              {cases.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'w-8 bg-tdx-red'
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => scrollToCard('prev')}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200
                  ${activeIndex === 0
                    ? 'border-white/10 text-white/20'
                    : 'border-white/30 text-white hover:bg-white hover:text-black'
                  }
                `}
                disabled={activeIndex === 0}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollToCard('next')}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200
                  ${activeIndex === cases.length - 1
                    ? 'border-white/10 text-white/20'
                    : 'border-white/30 text-white hover:bg-white hover:text-black'
                  }
                `}
                disabled={activeIndex === cases.length - 1}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* End CTA */}
          <div className="flex flex-col items-center text-center text-white mt-12 px-6">
            <h3 className="font-display font-bold text-3xl mb-6">Your Project Next?</h3>
            <a href="#contact" className="px-8 py-4 bg-tdx-red text-white rounded-full font-bold hover:bg-white hover:text-black transition-colors duration-300">
              Start Discussion
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};