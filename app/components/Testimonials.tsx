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
  <div className="w-[350px] md:w-[450px] bg-gray-50 p-8 rounded-2xl border border-gray-100 flex-shrink-0 mx-4 whitespace-normal flex flex-col justify-between hover:border-tdx-red/30 hover:bg-white hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 group/card cursor-default">
    <div>
      <Quote className="w-8 h-8 text-gray-300 mb-6 fill-current group-hover/card:text-tdx-red transition-colors" />
      <p className="font-display text-lg leading-relaxed text-gray-800 mb-6">
        "{data.quote}"
      </p>
    </div>
    <div className="flex items-center gap-4 border-t border-gray-200 pt-6 mt-auto">
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-mono font-bold text-sm">
        {data.author[0]}
      </div>
      <div>
        <div className="font-bold text-sm text-gray-900 font-display">{data.author}</div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
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
    <div id="testimonials" className="bg-white py-32 border-t border-gray-100 relative overflow-hidden">
      
      {/* Label */}
      <div className="mb-20 flex justify-center">
        <div className="px-5 py-2 rounded-full border border-gray-100 bg-gray-50 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tdx-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tdx-red"></span>
          </span>
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-gray-500">Live Client Feed</span>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="flex overflow-hidden relative group">
         {/* Gradient Masks */}
         <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

         {/* Stream 1 */}
         <div className="flex animate-marquee [animation-duration:60s] hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch will-change-transform translate-z-0">
            {testimonials.map((t) => (
                <TestimonialCard key={t.id} data={t} />
            ))}
         </div>
         
         {/* Stream 2 (Duplicate for loop) */}
         <div className="flex animate-marquee [animation-duration:60s] hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch will-change-transform translate-z-0">
            {testimonials.map((t) => (
                <TestimonialCard key={`dup-${t.id}`} data={t} />
            ))}
         </div>
         
         {/* Stream 3 (Extra buffer for wide screens) */}
         <div className="flex animate-marquee [animation-duration:60s] hover:[animation-play-state:paused] min-w-full shrink-0 items-stretch will-change-transform translate-z-0">
            {testimonials.map((t) => (
                <TestimonialCard key={`dup2-${t.id}`} data={t} />
            ))}
         </div>
      </div>
    </div>
  );
};