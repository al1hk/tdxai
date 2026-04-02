"use client";

import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "TDX engineered a digital nervous system for our enterprise. The speed of execution was terrifyingly efficient.",
    author: "Sarah Chen",
    role: "CTO",
    company: "NEXUS DYNAMICS",
  },
  {
    id: 2,
    quote: "We handed them a fragmented dataset. They returned a predictive engine that increased output by 400%.",
    author: "Marcus Thorne",
    role: "Head of AI",
    company: "AETHER CORP",
  },
  {
    id: 3,
    quote: "The interface between human intent and machine execution has never been smoother.",
    author: "Elena Vostrov",
    role: "VP Operations",
    company: "ORBITAL FINTECH",
  },
  {
    id: 4,
    quote: "Finally, an agency that understands the physics of data. Absolute precision in every deployment.",
    author: "Dr. Aris Thorne",
    role: "Chief Scientist",
    company: "VORTEX LABS",
  },
  {
    id: 5,
    quote: "Our security protocols were obsolete until TDX implemented their autonomous defense grid.",
    author: "James Miller",
    role: "CISO",
    company: "CYBERSHIELD",
  },
  {
    id: 6,
    quote: "Generative design pipelines that would take months were built in days. Simply incredible.",
    author: "Sofia R.",
    role: "Creative Dir",
    company: "SYNTH",
  }
];

const TestimonialCard = ({ data }: { data: typeof testimonials[0] }) => (
  <div className="w-[300px] sm:w-[350px] md:w-[450px] bg-neutral-50 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-white/10 flex-shrink-0 mx-3 md:mx-4 whitespace-normal flex flex-col justify-between hover:border-tdx-red/30 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg hover:shadow-neutral-200 transition-all duration-300 group/card cursor-default">
    <div>
      <Quote className="w-6 h-6 md:w-8 md:h-8 text-neutral-300 dark:text-white/30 mb-4 md:mb-6 fill-current group-hover/card:text-tdx-red transition-colors" />
      <p className="font-display text-base md:text-lg leading-relaxed text-neutral-900 dark:text-white mb-4 md:mb-6">
        "{data.quote}"
      </p>
    </div>
    <div className="flex items-center gap-4 border-t border-neutral-200 dark:border-white/10 pt-4 md:pt-6 mt-auto">
      <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono font-bold text-sm">
        {data.author[0]}
      </div>
      <div>
        <div className="font-bold text-sm text-neutral-900 dark:text-white font-display">{data.author}</div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase">
          <span className="text-tdx-red">{data.role}</span>
          <span>//</span>
          <span>{data.company}</span>
        </div>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <div id="testimonials" className="bg-white dark:bg-neutral-950 py-16 md:py-32 border-t border-neutral-100 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      
      {/* Label */}
      <div className="mb-12 md:mb-20 flex justify-center">
        <div className="px-5 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tdx-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tdx-red"></span>
          </span>
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-300">Live Client Feed</span>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="flex overflow-hidden relative group">
         {/* Gradient Masks */}
         <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />

         {/* Stream 1 */}
         <div className="flex animate-marquee [animation-duration:60s] group-hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch will-change-transform translate-z-0">
            {testimonials.map((t) => (
                <TestimonialCard key={t.id} data={t} />
            ))}
         </div>
         
         {/* Stream 2 (Duplicate for loop) */}
         <div className="flex animate-marquee [animation-duration:60s] group-hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch will-change-transform translate-z-0">
            {testimonials.map((t) => (
                <TestimonialCard key={`dup-${t.id}`} data={t} />
            ))}
         </div>
         
         {/* Stream 3 (Extra buffer for wide screens) */}
         <div className="flex animate-marquee [animation-duration:60s] group-hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch will-change-transform translate-z-0">
            {testimonials.map((t) => (
                <TestimonialCard key={`dup2-${t.id}`} data={t} />
            ))}
         </div>
      </div>
    </div>
  );
};