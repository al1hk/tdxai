"use client"
import React, { useRef } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const processSteps = [
  { 
    id: "01",
    label: "Phase One",
    title: "The Audit", 
    subtitle: "Deconstruction & Analysis",
    description: "We don't guess. We dissect. Our team performs a forensic audit of your current digital infrastructure, identifying latency, inefficiencies, and untapped data reservoirs." 
  },
  { 
    id: "02",
    label: "Phase Two",
    title: "The Architecture", 
    subtitle: "Strategic Blueprinting",
    description: "Intelligence requires structure. We design bespoke neural architectures and workflow automata that align strictly with your Q4 objectives and long-term scalability requirements." 
  },
  { 
    id: "03",
    label: "Phase Three",
    title: "The Synthesis", 
    subtitle: "Production & Deployment",
    description: "The build. We deploy your custom intelligence layer using CI/CD pipelines ensuring 99.99% uptime. This is where strategy transforms into a self-sustaining digital reality." 
  },
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} id="about" className="bg-neutral-950 text-white relative">
      
      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* LEFT: Sticky Manifesto */}
          <div className="hidden lg:block relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center py-24">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-[1px] bg-tdx-red" />
                   <span className="font-mono text-tdx-red text-xs tracking-[0.3em] uppercase">Methodology</span>
                </div>
                
                <h2 className="font-serif text-6xl xl:text-7xl leading-[0.9] mb-12">
                  We build <br/>
                  <span className="text-neutral-500 italic">machines</span> that <br/>
                  <span className="text-white">think.</span>
                </h2>

                <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-md border-l border-white/10 pl-8">
                  The gap between human potential and digital capability is closing. We bridge it. Our process is a rigorous discipline of clarity, engineered to strip away the noise and amplify the signal.
                </p>

                <div className="mt-16 flex items-center gap-4">
                  <div className="px-6 py-3 border border-white/10 rounded-full flex items-center gap-3 bg-white/5 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">System Active</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Scrolling Steps */}
          <div className="relative py-24 lg:py-0">
             {/* Vertical Guide Line */}
             <div className="absolute left-[29px] top-32 bottom-32 w-[1px] bg-white/10 hidden md:block" />

             {/* Mobile Header (Visible only on small screens) */}
             <div className="lg:hidden mb-16">
                <span className="text-tdx-red font-mono text-xs tracking-widest uppercase block mb-4">Methodology</span>
                <h2 className="font-serif text-5xl leading-none mb-6">We build machines that think.</h2>
             </div>

             <div className="lg:py-[20vh] space-y-32">
               {processSteps.map((step, index) => (
                 <StepCard key={step.id} step={step} index={index} />
               ))}
             </div>
          </div>

        </div>
      </SectionWrapper>
    </section>
  );
};

const StepCard = ({ step, index }: { step: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative pl-0 md:pl-24"
    >
      {/* Connector Dot */}
      <div className="absolute left-6 top-0 hidden md:flex items-center justify-center -translate-x-1/2">
        <div className="w-3 h-3 rounded-full bg-neutral-800 border border-white/20 group-hover:bg-tdx-red group-hover:border-tdx-red transition-colors duration-500 z-10" />
      </div>

      {/* Large Backdrop Number */}
      <div className="absolute -top-20 left-0 md:left-12 font-serif text-[180px] leading-none text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-700">
        {step.id}
      </div>

      <div className="relative z-10 border-t border-white/20 pt-8 md:pt-0 md:border-t-0 transition-all duration-500">
        <div className="flex justify-between items-start mb-6">
          <span className="font-mono text-xs text-tdx-red tracking-widest uppercase">
            {step.label}
          </span>
          <CheckCircle2 size={20} className="text-neutral-800 group-hover:text-tdx-red transition-colors duration-500" />
        </div>

        <h3 className="text-4xl md:text-5xl font-serif mb-4 group-hover:translate-x-2 transition-transform duration-500">
          {step.title}
        </h3>
        
        <h4 className="text-lg text-white/60 mb-8 italic font-serif">
          {step.subtitle}
        </h4>

        <p className="text-neutral-400 leading-relaxed font-light max-w-lg group-hover:text-neutral-300 transition-colors">
          {step.description}
        </p>

        <div className="mt-10 overflow-hidden">
           <button className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
             <span>Explore Phase</span>
             <ArrowRight size={14} className="text-tdx-red" />
           </button>
        </div>
      </div>
    </motion.div>
  );
}