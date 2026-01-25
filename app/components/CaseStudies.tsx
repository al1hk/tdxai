"use client";

import React, { useRef } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { CaseStudy } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const cases: CaseStudy[] = [
  {
    id: 1,
    title: "NeuroFinance",
    category: "FinTech AI",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    title: "AutoLogistics",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    title: "HealthScan.ai",
    category: "MedTech",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 4,
    title: "Urban Flow",
    category: "Smart City",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 5,
    title: "CyberShield",
    category: "Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
  },
];

export const CaseStudies: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll to horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} id="work" className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Overlay Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-bold text-neutral-800/20 whitespace-nowrap select-none pointer-events-none">
          SELECTED WORKS
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-24">
          
          {/* Header Card in Scroll */}
          <div className="w-[400px] flex-shrink-0 flex flex-col justify-center text-white">
            <span className="text-tdx-red font-mono text-sm tracking-widest uppercase mb-4">03 // Portfolio</span>
            <h2 className="font-display font-bold text-6xl mb-6">
              Intelligence <br /> in Action
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Explore how we deploy neural architectures to solve complex enterprise challenges.
            </p>
            <div className="flex items-center gap-2 text-sm font-mono text-gray-500">
              <span className="w-2 h-2 bg-tdx-red rounded-full animate-pulse"/>
              SCROLL TO EXPLORE
            </div>
          </div>

          {/* Project Cards */}
          {cases.map((study) => (
            <div key={study.id} className="relative w-[70vw] md:w-[600px] aspect-[4/3] flex-shrink-0 group cursor-hover">
              <div className="w-full h-full overflow-hidden rounded-2xl relative">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse z-0" />
                <img 
                  src={study.image} 
                  alt={study.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 relative z-10"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-500 z-20" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 bg-tdx-red/90 text-white text-xs font-mono mb-3 rounded-full backdrop-blur-md">
                        {study.category}
                      </span>
                      <h3 className="text-white font-display font-bold text-4xl">{study.title}</h3>
                    </div>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                      <ArrowUpRight className="text-black w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="w-[400px] flex-shrink-0 flex flex-col justify-center items-center text-center text-white">
            <h3 className="font-display font-bold text-4xl mb-6">Your Project Next?</h3>
            <button className="px-8 py-4 bg-tdx-red text-white rounded-full font-bold hover:bg-white hover:text-black transition-colors duration-300 cursor-hover">
              Start Discussion
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
};