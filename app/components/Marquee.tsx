"use client";

import React from 'react';

// Custom SVG Logos for a futuristic/tech feel
const Logos = [
  {
    name: "NEXUS",
    path: (
      <g>
        <path d="M0 20 L10 0 L20 20 L30 0 L40 20" stroke="currentColor" strokeWidth="4" fill="none" />
        <circle cx="50" cy="10" r="4" fill="currentColor" />
        <text x="65" y="16" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="currentColor">NEXUS</text>
      </g>
    )
  },
  {
    name: "VORTEX",
    path: (
      <g>
        <circle cx="15" cy="10" r="8" stroke="currentColor" strokeWidth="3" fill="none" />
        <circle cx="15" cy="10" r="3" fill="currentColor" />
        <text x="40" y="16" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="currentColor">VORTEX</text>
      </g>
    )
  },
  {
    name: "QUANTUM",
    path: (
      <g>
        <rect x="0" y="0" width="15" height="15" fill="currentColor" />
        <rect x="20" y="5" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="50" y="16" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="currentColor">QUANTUM</text>
      </g>
    )
  },
  {
    name: "HYPERGRID",
    path: (
      <g>
        <line x1="0" y1="5" x2="30" y2="5" stroke="currentColor" strokeWidth="2" />
        <line x1="0" y1="15" x2="30" y2="15" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="0" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
        <text x="45" y="16" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="currentColor">HYPERGRID</text>
      </g>
    )
  },
  {
    name: "SYNTH",
    path: (
      <g>
        <path d="M0 15 Q10 0 20 15 T40 15" stroke="currentColor" strokeWidth="3" fill="none" />
        <text x="55" y="16" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="currentColor">SYNTH</text>
      </g>
    )
  },
  {
    name: "AETHER",
    path: (
      <g>
        <polygon points="15,0 30,20 0,20" fill="currentColor" />
        <text x="45" y="16" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="currentColor">AETHER</text>
      </g>
    )
  }
];

export const Marquee: React.FC = () => {
  return (
    <div className="relative py-24 bg-white dark:bg-neutral-950 overflow-hidden z-20 border-b border-gray-100 dark:border-white/10">
      {/* Fade Edges */}
      <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

      {/* Label - Positioned cleanly inside the section */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-100 dark:border-white/10 bg-gray-50/80 dark:bg-white/5 backdrop-blur-sm z-30">
         <div className="w-1.5 h-1.5 rounded-full bg-tdx-red animate-pulse" />
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 dark:text-gray-300 uppercase">Trusted By Industry Leaders</span>
      </div>

      <div className="flex overflow-hidden group mt-8">
        {/* Stream 1 */}
        <div className="flex animate-marquee whitespace-nowrap items-center min-w-full shrink-0">
          {[...Logos, ...Logos].map((logo, i) => (
            <div 
              key={i} 
              className="mx-12 opacity-30 hover:opacity-100 transition-all duration-500 cursor-pointer grayscale hover:grayscale-0 group/logo"
            >
              <svg height="30" width="200" className="text-black dark:text-white group-hover/logo:text-tdx-red transition-colors duration-500 overflow-visible">
                {logo.path}
              </svg>
            </div>
          ))}
        </div>
        
        {/* Stream 2 (Duplicate for loop) */}
        <div className="flex animate-marquee whitespace-nowrap items-center min-w-full shrink-0" aria-hidden="true">
           {[...Logos, ...Logos].map((logo, i) => (
            <div 
              key={i} 
              className="mx-12 opacity-30 hover:opacity-100 transition-all duration-500 cursor-pointer grayscale hover:grayscale-0 group/logo"
            >
              <svg height="30" width="200" className="text-black dark:text-white group-hover/logo:text-tdx-red transition-colors duration-500 overflow-visible">
                {logo.path}
              </svg>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Scanline */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100 dark:bg-white/10">
        <div className="absolute top-0 left-0 h-full w-32 bg-tdx-red/20 blur-[2px] animate-[marquee_5s_linear_infinite]" />
      </div>
    </div>
  );
};