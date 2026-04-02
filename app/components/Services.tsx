"use client"
import React, { useState, useRef } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  Terminal,
  Activity,
  Plus,
  Minus,
  Cpu,
  Scan,
  Zap
} from 'lucide-react';

const services = [
  {
    title: "AI Driven Services",
    description: "Deep learning models & neural integration.",
    details: [
      "Starter: Basic AI integrations for small apps", 
      "Growth: Custom AI models + integration", 
      "Enterprise: Advanced AI systems, ongoing tuning"
    ],
    tag: "ML_CORE",
    icon: BrainCircuit
  },
  {
    title: "Business Automation",
    description: "Workflow orchestration & data sync.",
    details: [
      "Basic Automation: Single no-code/low-code workflow", 
      "Advanced Automation: AI + data sync + orchestration", 
      "Enterprise Automation: Full system automation"
    ],
    tag: "AUTO_OPS",
    icon: Workflow
  },
  {
    title: "Blockchain Dev",
    description: "Smart contracts & decentralized ledgers.",
    details: [
      "Prototype: Smart contract, testnet deployment", 
      "Launch-Ready: Mainnet, audits, dashboards", 
      "Enterprise: Multi-chain, advanced integration"
    ],
    tag: "WEB3_SEC",
    icon: Blocks
  },
  {
    title: "Web App Development",
    description: "Scalable SaaS & cloud architectures.",
    details: [
      "MVP Launch: Core feature web app", 
      "Scale Plan: Full SaaS platform", 
      "Enterprise: High-security SaaS with maintenance"
    ],
    tag: "FULL_STACK",
    icon: Globe
  },
  {
    title: "Mobile Ecosystems",
    description: "Native iOS/Android performance.",
    details: [
      "Prototype App: Core features, single platform", 
      "Cross-Platform: iOS & Android apps", 
      "Enterprise App: Advanced features, integrations"
    ],
    tag: "NATIVE_OS",
    icon: Smartphone
  },
  {
    title: "AI Agents",
    description: "Autonomous decision-making entities.",
    details: [
      "Basic Agent: Pre-trained AI assistant", 
      "Advanced Agent: Custom decision-making capabilities", 
      "Research/Enterprise: RAG, memory-based AI agents"
    ],
    tag: "AGENT_X",
    icon: Bot
  },
  {
    title: "WordPress Enterprise",
    description: "Custom headless CMS solutions.",
    details: [
      "Starter Site: Basic WordPress website", 
      "Business Site: eCommerce/membership site", 
      "Enterprise Site: Multi-language, scalable WordPress"
    ],
    tag: "CMS_PRO",
    icon: LayoutTemplate
  },
  {
    title: "SEO Intelligence",
    description: "Algorithmic ranking dominance.",
    details: [
      "Basic SEO: Keyword & on-page SEO", 
      "Growth SEO: Content & technical SEO", 
      "Enterprise SEO: High-volume site SEO"
    ],
    tag: "SEARCH_AI",
    icon: Search
  },
  {
    title: "Social Algorithms",
    description: "Data-driven engagement loops.",
    details: [
      "Starter: Content posting + calendar", 
      "Growth: Strategy, design, tracking", 
      "Enterprise: Ads, campaigns, analytics"
    ],
    tag: "VIRAL_NET",
    icon: Share2
  }
];

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax hook for subtle background movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} id="services" className="bg-white dark:bg-neutral-950 py-24 lg:py-32 relative z-10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-red-50/50 dark:bg-tdx-red/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-neutral-100/50 dark:bg-white/5 rounded-full blur-[100px]" />
      </div>

      <SectionWrapper>
        
        {/* Editorial Header */}
        <div className="relative mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/5 dark:border-white/10 pb-12">
            <div className="max-w-4xl relative z-10">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <span className="flex items-center justify-center w-6 h-6 border border-red-600 rounded-full text-red-600">
                        <Scan size={12} />
                    </span>
                    <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-red-600 font-bold">What We Do</span>
                </div>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-black dark:text-white leading-[0.85] tracking-tighter">
                  Core <br/>
                  <span className="italic text-neutral-300 font-light">Capabilities</span><span className="text-red-600">.</span> 
                </h2>
            </div>

            <div className="hidden md:flex flex-col items-end gap-4 pb-2">
                <p className="font-mono text-[10px] text-neutral-400 dark:text-neutral-400 uppercase tracking-widest text-right leading-relaxed">
                    Click any service<br/>to explore details
                </p>
            </div>
        </div>

        {/* The Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950">
          {services.map((service, index) => {
            // Grid Layout Logic
            const isFeatured = index === 0;
            const isWide = index === 3;
            const isLast = index === 8;
            
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;
            const isActive = isHovered || isExpanded;
            
            let gridClass = 'min-h-[380px] border-r border-b border-black/5 dark:border-white/5';
            if (isFeatured) gridClass = 'md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[500px] lg:min-h-[760px] border-r border-b border-black/5 dark:border-white/5';
            else if (isWide) gridClass = 'lg:col-span-2 min-h-[380px] border-r border-b border-black/5 dark:border-white/5';
            else if (isLast) gridClass = 'lg:col-span-1 md:col-span-2 lg:col-span-3 min-h-[340px] lg:flex-row lg:items-center border-r border-b border-black/5 dark:border-white/5';

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`group relative flex flex-col justify-between overflow-hidden cursor-pointer bg-white dark:bg-neutral-950 transition-colors duration-500
                  ${gridClass}
                `}
              >
                {/* Active Background - Gradient Red */}
                <motion.div
                    className="absolute inset-0 z-0 bg-gradient-to-br from-red-600 via-red-600 to-red-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
                
                {/* Dot Matrix Texture Overlay (Only visible on Active) */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:24px_24px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.15 : 0 }}
                />

                {/* Top Interaction Line */}
                <motion.div 
                    className="absolute top-0 left-0 h-[2px] bg-red-600 z-20"
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Content Container */}
                <div className={`relative z-10 h-full w-full flex flex-col justify-between p-8 md:p-10 ${isLast ? 'lg:flex-row lg:w-full lg:items-center' : ''}`}>
                    
                    {/* Header */}
                    <div className={`flex justify-between items-start w-full ${isLast ? 'lg:w-auto lg:gap-16' : ''}`}>
                      <div className="flex flex-col gap-2">
                          <div className={`flex items-center gap-2 font-mono text-xs font-bold tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-red-600'}`}>
                            <span>0{index + 1}</span>
                            <div className={`h-[1px] w-8 transition-colors duration-300 ${isActive ? 'bg-white/50' : 'bg-red-200'}`} />
                          </div>
                          
                          <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white/70' : 'text-neutral-400'}`}>
                             {service.tag}
                          </span>
                      </div>
                      
                      {/* Expansion Toggle Button */}
                      <motion.div 
                          animate={{ rotate: isExpanded ? 0 : 0 }}
                          className={`
                            relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300
                            ${isActive ? 'border-white text-white rotate-180' : 'border-neutral-200 text-neutral-400 group-hover:border-red-200 group-hover:text-red-400'}
                          `}
                      >
                          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                          {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                      </motion.div>
                    </div>

                    {/* Middle / Bottom Content */}
                    <div className={`mt-auto pt-16 relative ${isLast ? 'lg:mt-0 lg:flex-1 lg:pl-12 lg:pt-0' : ''}`}>
                      
                      {/* Technical Watermark Icon - Subtle */}
                      <div className={`absolute pointer-events-none transition-all duration-700 ease-out z-0
                          ${isFeatured 
                              ? 'right-[-5%] bottom-[-5%] opacity-[0.03] group-hover:opacity-10 scale-110 group-hover:scale-100 rotate-0' 
                              : isLast 
                                ? 'left-[40%] top-1/2 -translate-y-1/2 opacity-[0.03] scale-125 group-hover:opacity-10'
                                : 'right-[-10%] bottom-[-10%] opacity-[0.03] group-hover:opacity-10 scale-150 group-hover:scale-125 rotate-12'}
                          ${isActive ? 'text-white' : 'text-black'} dark:text-white
                      `}>
                          <service.icon size={isFeatured ? 480 : 280} strokeWidth={0.5} />
                      </div>

                      {/* Title */}
                      <h3 className={`font-serif leading-[0.9] transition-colors duration-300 relative z-10
                          ${isFeatured 
                            ? 'text-5xl md:text-7xl mb-6 font-medium tracking-tight' 
                            : isLast 
                                ? 'text-4xl md:text-5xl lg:text-6xl mb-4 lg:mb-0' 
                                : 'text-3xl md:text-4xl mb-4'}
                          ${isActive ? 'text-white' : 'text-black'} dark:text-white
                      `}>
                          {service.title}
                      </h3>
                      
                      {/* Description Reveal */}
                      <div className={`overflow-hidden transition-all duration-500 ease-out 
                        ${isActive || isFeatured ? 'opacity-100 max-h-96' : 'max-h-0 opacity-0 lg:max-h-24 lg:opacity-100'}`}>
                          <p className={`font-sans font-light leading-relaxed transition-colors duration-300
                              ${isFeatured 
                                ? 'text-lg md:text-xl text-neutral-500 max-w-lg' 
                                : 'text-sm text-neutral-500 max-w-[90%]'}
                              ${isActive ? 'text-white/80' : 'text-neutral-500 dark:text-neutral-300'}
                          `}>
                              {service.description}
                          </p>
                      </div>

                      {/* Expanded Details List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            className="overflow-hidden"
                          >
                             <div className="pt-8 mt-2 relative">
                                {/* Decorative Line */}
                                <div className="absolute top-4 left-0 w-8 h-[1px] bg-white/30" />
                                
                                <ul className={`grid gap-x-8 gap-y-3 ${isWide || isLast || isFeatured ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                  {service.details.map((detail, idx) => (
                                    <motion.li 
                                      key={idx}
                                      initial={{ x: -10, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: 0.1 + (idx * 0.05), duration: 0.3 }}
                                      className="flex items-start gap-3 group/item"
                                    >
                                      <Zap size={10} className="mt-0.5 text-white/50 group-hover/item:text-white transition-colors" />
                                      <span className="font-mono text-[10px] uppercase tracking-wide text-white/90 group-hover/item:text-white transition-colors">
                                        {detail}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Footer / Status Area */}
                    <div className={`mt-8 flex items-end justify-between relative z-10 ${isLast ? 'lg:mt-0 lg:justify-end lg:w-auto lg:gap-8' : ''}`}>
                          <div className={`hidden md:flex flex-wrap gap-2`}>
                          </div>
                          
                          {/* Corner Accent */}
                          <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-r border-b transition-colors duration-300
                             ${isActive ? 'border-white' : 'border-neutral-300'}
                          `} />
                    </div>
                </div>
              
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>
    </section>
  );
};