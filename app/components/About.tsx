"use client"
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const storyChapters = [
  {
    highlight: "The Beginning",
    text: "We started empowering businesses through technology acceleration back in 2014. We have been synonymous with innovation for more than a decade now. Back then, we started our journey as a basic IT service provider."
  },
  {
    highlight: "Expansion",
    text: "Over the passage of time, we expanded our services to multiple areas. Understanding the increasing demands of our clients, later on, we brought several on-demand software solutions with adding SaaS services to our umbrella."
  },
  {
    highlight: "Scaling Up",
    text: "We grew and extended our services from small projects to a sum of different fields with elapsed time. Now, we are honoured to produce our exciting experiences in almost every aspect of a business by providing state of the art software solutions."
  },
  {
    highlight: "A Home for Dreamers",
    text: "Eventually, we became a place for the people who are eager to put their thoughts and ideas into their actions to deliver the best out of them. You will find every bit of our services ooze with passion and resourcefulness."
  },
  {
    highlight: "Social Impact",
    text: "We truly believe in harnessing the power of technology for social good & We are contributing to the betterment and positivity in society by producing in the health and education sectors."
  },
  {
    highlight: "The Legacy",
    text: "After countless days of hard come smart work and dedication, now TDX Labs is known for delivering matchless and innovative business solutions."
  }
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} id="about" className="relative overflow-hidden">
      
      {/* ═══════════════════════════════════════════ */}
      {/* PART 1: HERO — "Our Story" */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative bg-neutral-950 text-white overflow-hidden">
        
        {/* Layered ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] bg-tdx-red/[0.07] rounded-full blur-[200px]" />
          <div className="absolute bottom-[-30%] left-[-15%] w-[700px] h-[700px] bg-blue-500/[0.03] rounded-full blur-[180px]" />
          <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-tdx-red/[0.04] rounded-full blur-[120px]" />
        </div>
        
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none z-[1]" 
          style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`, backgroundRepeat: 'repeat' }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-24 md:pb-32">
          
          {/* Floating tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-16 h-[1px] bg-gradient-to-r from-tdx-red to-transparent" />
            <span className="font-mono text-tdx-red text-[10px] md:text-xs tracking-[0.4em] font-bold uppercase">Since 2014</span>
          </motion.div>

          {/* Massive headline */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display font-bold text-[clamp(3.5rem,10vw,10rem)] tracking-[-0.04em] leading-[0.85] mb-12 md:mb-16"
          >
            Our <br />
            <span className="bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-700 bg-clip-text text-transparent">Story</span>
            <span className="text-tdx-red">.</span>
          </motion.h2>

          {/* Intro paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <p className="font-display font-light text-xl md:text-2xl lg:text-[1.75rem] leading-[1.6] text-neutral-400 tracking-tight">
              A decade of building <span className="text-white font-medium">transformative technology</span> — from a small IT service provider to a global force in <span className="text-white font-medium">digital innovation.</span>
            </p>
          </motion.div>

        </div>
      </div>


      {/* ═══════════════════════════════════════════ */}
      {/* PART 2: TIMELINE JOURNEY */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative bg-neutral-950 text-white">
        
        {/* Persistent ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-tdx-red/[0.05] rounded-full blur-[180px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 py-24 md:py-40">
          
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-20 md:mb-32"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-tdx-red rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-tdx-red rounded-full" />
              </div>
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.3em]">The Journey</span>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>

          {/* Timeline cards */}
          <div className="relative">
            {/* Central timeline line for desktop */}
            <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
            
            {storyChapters.map((chapter, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative mb-20 md:mb-32 lg:mb-40 last:mb-0 lg:flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Timeline Node (desktop) */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 hidden lg:flex flex-col items-center z-20">
                    <div className="w-4 h-4 rounded-full bg-neutral-950 border-2 border-tdx-red shadow-[0_0_20px_rgba(255,31,31,0.3)]" />
                  </div>

                  {/* Content side */}
                  <div className={`lg:w-1/2 ${isLeft ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:text-left'}`}>
                    
                    {/* Chapter index badge */}
                    <div className={`flex items-center gap-3 mb-6 ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <div className="lg:hidden w-3 h-3 rounded-full bg-neutral-950 border-2 border-tdx-red shadow-[0_0_15px_rgba(255,31,31,0.3)]" />
                      <span className="font-mono text-tdx-red text-xs md:text-sm font-bold tracking-[0.2em]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className={`w-12 h-[1px] bg-gradient-to-r ${isLeft ? 'from-transparent to-white/20 lg:from-white/20 lg:to-transparent' : 'from-white/20 to-transparent'}`} />
                    </div>

                    {/* Glassmorphism card */}
                    <div className="relative group">
                      {/* Hover glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-tdx-red/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl md:rounded-3xl p-8 md:p-10 group-hover:border-white/[0.12] group-hover:bg-white/[0.05] transition-all duration-500">
                        
                        {/* Decorative corner */}
                        <div className={`absolute top-0 ${isLeft ? 'right-0 border-r-2 border-t-2 rounded-tr-3xl' : 'left-0 border-l-2 border-t-2 rounded-tl-3xl'} w-12 h-12 border-tdx-red/20 pointer-events-none`} />
                        
                        <h3 className={`font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-4 tracking-tight ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                          {chapter.highlight}
                        </h3>
                        
                        <p className={`font-display font-light text-base md:text-lg leading-[1.7] text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                          {chapter.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>


      {/* ═══════════════════════════════════════════ */}
      {/* PART 3: WHY WE ARE DIFFERENT */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative bg-white dark:bg-neutral-950 overflow-hidden transition-colors duration-300">
        
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-tdx-red/[0.04] dark:bg-tdx-red/[0.06] rounded-full blur-[180px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neutral-200/50 dark:bg-white/[0.02] rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-48 relative z-10">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-32"
          >
            <div className="flex justify-center items-center gap-4 mb-10">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-tdx-red" />
              <span className="font-mono text-tdx-red text-[10px] md:text-xs tracking-[0.4em] font-bold uppercase">Philosophy</span>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-tdx-red" />
            </div>
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-[6rem] tracking-[-0.03em] leading-[0.85] text-black dark:text-white">
              Why we are <br className="hidden md:block"/>
              <span className="bg-gradient-to-r from-tdx-red to-red-400 bg-clip-text text-transparent">different.</span>
            </h2>
          </motion.div>

          {/* Two-column manifesto */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 max-w-6xl mx-auto">
            
            {/* Left: Main manifesto */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <p className="font-display font-light text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.35] text-neutral-700 dark:text-neutral-300 tracking-tight">
                Professionalism, trust, expertise and passion are the words that <span className="font-semibold text-black dark:text-white">define us well.</span>
              </p>
              <p className="font-display font-light text-lg md:text-xl leading-[1.7] text-neutral-500 dark:text-neutral-400 mt-8 tracking-tight">
                From building a software solution to our marketing strategies, we take each and every step with great care, after a full analysis of your business demands.
              </p>
            </motion.div>
            
            {/* Right: Accent block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <div className="relative">
                {/* Background glow on the block */}
                <div className="absolute -inset-4 bg-gradient-to-br from-tdx-red/5 to-transparent rounded-3xl blur-2xl" />
                
                <div className="relative bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] rounded-2xl md:rounded-3xl p-8 md:p-10">
                  <div className="w-10 h-1 bg-tdx-red rounded-full mb-6" />
                  <p className="font-display font-light text-lg md:text-xl leading-[1.65] text-neutral-600 dark:text-neutral-400 mb-6 tracking-tight">
                    We prioritize your business growth with our futuristic & innovative ideas. We are not working to earn money but to <span className="font-semibold text-black dark:text-white">earn your trust.</span>
                  </p>
                  <blockquote className="border-l-4 border-tdx-red pl-6 py-1">
                    <p className="font-display font-medium text-lg md:text-xl text-black dark:text-white leading-[1.5] italic tracking-tight">
                      &ldquo;Passion and compassion are our chosen path towards success that stand us out in this world of competition.&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};