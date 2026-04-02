"use client";

import React, { useRef, useState, useEffect } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { CaseStudy } from '@/types';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section ref={targetRef} id="work" className="relative h-auto md:h-[300vh] bg-neutral-900">
      <div className="relative md:sticky top-0 h-auto md:h-screen flex items-center overflow-hidden">

        {/* Background Overlay Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-bold text-neutral-800/20 whitespace-nowrap select-none pointer-events-none hidden md:block">
          SELECTED WORKS
        </div>

        <motion.div
          style={{ x: isMobile ? 0 : x, willChange: "transform" }}
          className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-24 py-24 md:py-0"
        >

          {/* Header Card */}
          <div className="w-full md:w-[400px] flex-shrink-0 flex flex-col justify-center text-white mb-12 md:mb-0">
            <span className="text-tdx-red font-mono text-sm tracking-widest uppercase mb-4">03 // Portfolio</span>
            <h2 className="font-display font-bold text-5xl md:text-6xl mb-6">
              Our <br className="hidden md:block" /> Work
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Real solutions we've built for businesses worldwide — from logistics platforms to fintech apps.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono text-gray-500 md:flex hidden">
              <span className="w-2 h-2 bg-tdx-red rounded-full animate-pulse" />
              SCROLL TO EXPLORE
            </div>
          </div>

          {/* Project Cards */}
          {cases.map((study) => (
            <div key={study.id} className="relative w-full md:w-[600px] aspect-[4/3] flex-shrink-0 group cursor-hover">
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
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 bg-tdx-red/90 text-white text-[10px] md:text-xs font-mono mb-2 md:mb-3 rounded-full backdrop-blur-md">
                        {study.category}
                      </span>
                      <h3 className="text-white font-display font-bold text-2xl md:text-4xl mb-2">{study.title}</h3>
                      {study.description && (
                        <p className="text-white/60 text-sm md:text-base font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 transition-all duration-500 overflow-hidden">
                          {study.description}
                        </p>
                      )}
                    </div>
                    {study.link ? (
                      <a href={study.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-tdx-red hover:text-white shrink-0 ml-4">
                        <ArrowUpRight className="text-black w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    ) : (
                      <button className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shrink-0 ml-4">
                        <ArrowUpRight className="text-black w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="w-full md:w-[400px] flex-shrink-0 flex flex-col justify-center items-center text-center text-white pb-12 md:pb-0">
            <h3 className="font-display font-bold text-4xl mb-6">Your Project Next?</h3>
            <a href="#contact" className="px-8 py-4 bg-tdx-red text-white rounded-full font-bold hover:bg-white hover:text-black transition-colors duration-300 cursor-hover">
              Start Discussion
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};