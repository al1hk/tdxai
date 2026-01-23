
"use client"
import React, { useState, useRef } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  BrainCircuit, 
  Workflow, 
  Blocks, 
  Globe, 
  Smartphone, 
  Bot, 
  LayoutTemplate,
  Search,
  Share2,
  ArrowUpRight,
  Terminal
} from 'lucide-react';

const services = [
  {
    title: "AI Driven Services",
    description: "Deep learning models & neural integration.",
    tag: "ML_CORE",
    icon: BrainCircuit
  },
  {
    title: "Business Automation",
    description: "Workflow orchestration & data sync.",
    tag: "AUTO_OPS",
    icon: Workflow
  },
  {
    title: "Blockchain Dev",
    description: "Smart contracts & decentralized ledgers.",
    tag: "WEB3_SEC",
    icon: Blocks
  },
  {
    title: "Web App Development",
    description: "Scalable SaaS & cloud architectures.",
    tag: "FULL_STACK",
    icon: Globe
  },
  {
    title: "Mobile Ecosystems",
    description: "Native iOS/Android performance.",
    tag: "NATIVE_OS",
    icon: Smartphone
  },
  {
    title: "AI Agents",
    description: "Autonomous decision-making entities.",
    tag: "AGENT_X",
    icon: Bot
  },
  {
    title: "WordPress Enterprise",
    description: "Custom headless CMS solutions.",
    tag: "CMS_PRO",
    icon: LayoutTemplate
  },
  {
    title: "SEO Intelligence",
    description: "Algorithmic ranking dominance.",
    tag: "SEARCH_AI",
    icon: Search
  },
  {
    title: "Social Algorithms",
    description: "Data-driven engagement loops.",
    tag: "VIRAL_NET",
    icon: Share2
  }
];

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform for background grid movement
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} id="services" className="bg-white py-32 lg:py-48 relative z-10 overflow-hidden">
      <SectionWrapper>
        
        {/* Editorial Header */}
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end border-b border-black/10 pb-12">
          <div className="max-w-4xl">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 bg-tdx-red" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">Service Manifest</span>
             </div>
             <h2 className="text-7xl md:text-9xl font-serif text-black leading-[0.8] tracking-tighter">
               Capabilities <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-400 italic">Indexed.</span>
             </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
             <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">System Status</span>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="font-bold font-mono text-sm text-black">OPERATIONAL</span>
             </div>
          </div>
        </div>

        {/* The Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/10 bg-black">
          {services.map((service, index) => {
            const isFeatured = index === 0;
            const isLast = index === services.length - 1;
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col justify-between overflow-hidden cursor-pointer transition-colors duration-500 ease-in-out border-r border-b border-white/10
                  ${isFeatured 
                    ? 'md:col-span-2 z-10 hover:z-20 shadow-[0_0_50px_-10px_rgba(220,0,0,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(220,0,0,0.3)]' 
                    : 'hover:z-20 hover:shadow-2xl'}
                  bg-black hover:bg-white
                  ${isLast ? 'lg:col-span-3' : ''}
                  min-h-[420px] lg:min-h-[480px]
                `}
              >
                {/* Internal Padding Container */}
                <div className={`relative h-full w-full flex flex-col justify-between ${isFeatured ? 'p-10 lg:p-14' : 'p-8 lg:p-10'}`}>
                    
                    {/* Parallax Grid Background */}
                    <motion.div 
                    style={{ y: gridY }}
                    className="absolute inset-[-20%] opacity-[0.15] group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-500 
                    bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] 
                    group-hover:bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] 
                    bg-[size:40px_40px]" 
                    />
                    
                    {/* Top Meta */}
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                          <span className={`font-mono transition-colors duration-300 ${isFeatured ? 'text-tdx-red font-bold' : 'text-neutral-500 group-hover:text-tdx-red'} text-xs`}>
                          ID_0{index + 1}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 transition-colors">
                          / {service.tag}
                          </span>
                      </div>
                      <motion.div 
                          animate={{ rotate: isHovered ? 45 : 0 }}
                          transition={{ duration: 0.4 }}
                          className={isFeatured ? 'text-tdx-red' : 'text-neutral-500 group-hover:text-black'}
                      >
                          <ArrowUpRight size={isFeatured ? 28 : 24} />
                      </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 mt-auto pt-24">
                      {/* Icon Watermark */}
                      <div className={`absolute pointer-events-none transition-all duration-700 ease-out
                          ${isFeatured 
                              ? '-right-12 -top-12 text-tdx-red opacity-[0.1]' 
                              : '-right-8 -top-12 opacity-[0.1] group-hover:opacity-[0.05] text-white group-hover:text-black scale-100 group-hover:scale-110'}
                      `}>
                          {isFeatured ? (
                              <motion.div
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity,
                                    ease: "easeInOut" 
                                }}
                              >
                                <service.icon size={360} strokeWidth={0.5} />
                              </motion.div>
                          ) : (
                              <motion.div
                                animate={isHovered ? { y: [0, -15, 0] } : {}}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <service.icon size={180} strokeWidth={0.5} />
                              </motion.div>
                          )}
                      </div>

                      <h3 className={`font-serif leading-tight transition-colors duration-300 relative 
                          ${isFeatured ? 'text-5xl lg:text-7xl mb-8 tracking-tight font-medium text-white group-hover:text-black' : 'text-3xl lg:text-4xl mb-4 text-white group-hover:text-black'}
                      `}>
                          {service.title}
                      </h3>
                      
                      {/* Description with Bolder Hover Effect */}
                      <p className={`font-light leading-relaxed transition-all duration-300 relative
                          ${isFeatured 
                            ? 'text-xl md:text-2xl text-neutral-400 font-normal max-w-2xl group-hover:text-neutral-800' 
                            : 'text-sm max-w-[90%] text-neutral-400 group-hover:text-black group-hover:font-semibold'}
                      `}>
                          {service.description}
                      </p>

                      {/* Tags Reveal */}
                      <div className="flex flex-wrap gap-2 mt-8">
                          <span className={`px-3 py-1 border text-[10px] font-mono uppercase tracking-wider transition-colors duration-300
                              ${isFeatured 
                                  ? 'border-tdx-red/30 text-tdx-red bg-tdx-red/5' 
                                  : 'border-white/10 group-hover:border-black/20 text-neutral-500 group-hover:text-black'}
                          `}>
                              {service.tag}
                          </span>
                          <span className={`px-3 py-1 border text-[10px] font-mono uppercase tracking-wider transition-colors duration-300
                              ${isFeatured
                                  ? 'border-tdx-red/30 text-tdx-red bg-tdx-red/5'
                                  : 'border-white/10 group-hover:border-black/20 text-neutral-500 group-hover:text-black'}
                          `}>
                              SYS_READY
                          </span>
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className={`absolute bottom-0 right-0 w-0 h-0 border-b-[60px] border-r-[60px] border-b-transparent border-r-transparent transition-all duration-300 ease-out
                        ${isFeatured ? 'border-r-tdx-red scale-100' : 'group-hover:border-r-tdx-red scale-0 group-hover:scale-100'}
                    `} />
                    <Terminal size={16} className={`absolute bottom-4 right-4 z-20 transition-opacity duration-500 delay-100
                        ${isFeatured ? 'opacity-100 text-white group-hover:text-black' : 'opacity-0 group-hover:opacity-100 text-black'}
                    `} />
                </div>
              
              </div>
            );
          })}
        </div>

      </SectionWrapper>
    </section>
  );
};