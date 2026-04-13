"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, ArrowUpRight, Scan } from 'lucide-react';

const pricingData = [
  {
    service: "AI Driven Services",
    tag: "ML_CORE",
    tiers: [
      { plan: "Starter", price: "$2,000", unit: "/project", desc: "Basic AI integrations to automate ops" },
      { plan: "Growth", price: "$3,500", unit: "/project", desc: "Custom AI models + integrations" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "Advanced AI systems & security (SaaS)" }
    ]
  },
  {
    service: "Business Automation",
    tag: "AUTO_OPS",
    tiers: [
      { plan: "Automated Workflow", price: "$1,500", unit: "/workflow", desc: "Single process automation workflow" },
      { plan: "Cross-Team", price: "$3,000", unit: "/workflow", desc: "Multi-platform bots & workflow integration" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "Full System Automation" }
    ]
  },
  {
    service: "Blockchain Development",
    tag: "WEB3_SEC",
    tiers: [
      { plan: "Prototype", price: "$5,000", unit: "/project", desc: "Smart contract, testnet deployment" },
      { plan: "Custom dApp", price: "$10,000", unit: "/project", desc: "Mainnet, audits, dashboards" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "Multi-chain routing, DEX integration" }
    ]
  },
  {
    service: "Web App Development",
    tag: "FULL_STACK",
    tiers: [
      { plan: "SaaS Platform", price: "$5,000", unit: "/project", desc: "End-to-end full stack web app" },
      { plan: "E-Commerce", price: "$4,000", unit: "/project", desc: "E-Commerce platform" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "High complexity SaaS with maintenance" }
    ]
  },
  {
    service: "Mobile App Development",
    tag: "NATIVE_OS",
    tiers: [
      { plan: "Prototype App", price: "$3,500", unit: "/app", desc: "Cross-platform single platform" },
      { plan: "Production App", price: "$7,000", unit: "/app", desc: "iOS & Android apps" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "Advanced features, integrations" }
    ]
  },
  {
    service: "AI Agents Development",
    tag: "AGENT_X",
    tiers: [
      { plan: "Basic Agent", price: "$2,000", unit: "/agent", desc: "Pre-trained AI assistant" },
      { plan: "Advanced Agent", price: "$5,000", unit: "/agent", desc: "Custom models + realtime capabilities" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "RAG, memory based AI agents" }
    ]
  },
  {
    service: "WordPress Development",
    tag: "CMS_PRO",
    tiers: [
      { plan: "Basic Site", price: "$1,000", unit: "/site", desc: "Responsive WordPress website" },
      { plan: "Advanced Site", price: "$2,500", unit: "/site", desc: "eCommerce / Custom theme / CPT" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "Multi-language, scalable WordPress" }
    ]
  },
  {
    service: "SEO Services",
    tag: "SEARCH_AI",
    tiers: [
      { plan: "Basic SEO", price: "$500", unit: "/month", desc: "Keyword & on-page SEO" },
      { plan: "Growth SEO", price: "$1,000", unit: "/month", desc: "Content & technical SEO" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "High volume, enterprise" }
    ]
  },
  {
    service: "Social Media Marketing",
    tag: "VIRAL_NET",
    tiers: [
      { plan: "Starter", price: "$400", unit: "/month", desc: "Content posting calendar" },
      { plan: "Growth", price: "$900", unit: "/month", desc: "Strategy, design, reporting" },
      { plan: "Enterprise", price: "Custom", unit: "Quote", desc: "Ad placements, campaign management" }
    ]
  }
];

const ServiceCategory: React.FC<{
  category: typeof pricingData[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ category, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group"
    >
      {/* Category Header Row — always visible */}
      <button
        onClick={onToggle}
        className="w-full grid grid-cols-12 items-center py-6 md:py-8 border-b border-black/[0.06] dark:border-white/[0.08] hover:bg-neutral-50/80 dark:hover:bg-white/[0.02] transition-all duration-300 cursor-pointer text-left"
      >
        {/* Index + Service Name */}
        <div className="col-span-7 md:col-span-4 flex items-center gap-4 md:gap-6 pl-4 md:pl-8">
          <span className={`font-mono text-[10px] md:text-xs font-bold tracking-widest transition-colors duration-300 ${isExpanded ? 'text-tdx-red' : 'text-neutral-400'}`}>
            0{index + 1}
          </span>
          <div className={`hidden md:block h-[1px] w-4 md:w-6 transition-colors duration-300 ${isExpanded ? 'bg-tdx-red' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
          <h3 className="font-display font-bold text-base md:text-xl text-black dark:text-white group-hover:text-tdx-red transition-colors duration-300">
            {category.service}
          </h3>
        </div>

        {/* Tag */}
        <div className="hidden md:flex col-span-2 items-center">
          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border transition-all duration-300 ${isExpanded ? 'text-tdx-red border-tdx-red/30 bg-tdx-red/5' : 'text-neutral-400 border-neutral-200 dark:border-white/10'}`}>
            {category.tag}
          </span>
        </div>

        {/* Starting Price */}
        <div className="col-span-3 md:col-span-4 flex items-center justify-end md:justify-start gap-2">
          <span className="font-mono text-xs md:text-sm text-neutral-500 dark:text-neutral-400">from</span>
          <span className="font-display font-bold text-base md:text-xl text-black dark:text-white">
            {category.tiers[0].price}
          </span>
        </div>

        {/* Expand Button */}
        <div className="col-span-2 flex items-center justify-end pr-4 md:pr-8">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-tdx-red border-tdx-red text-white' : 'border-neutral-200 dark:border-white/15 text-neutral-400 group-hover:border-tdx-red group-hover:text-tdx-red'}`}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      {/* Expanded Tier Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-neutral-50/80 dark:bg-white/[0.02] border-b border-black/[0.06] dark:border-white/[0.08]">
              {category.tiers.map((tier, tierIdx) => (
                <motion.div
                  key={tierIdx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + tierIdx * 0.08, duration: 0.4 }}
                  className="grid grid-cols-12 items-center py-5 md:py-6 px-4 md:px-8 border-b border-black/[0.04] dark:border-white/[0.04] last:border-b-0 hover:bg-white dark:hover:bg-white/[0.03] transition-colors group/tier"
                >
                  {/* Plan Name */}
                  <div className="col-span-5 md:col-span-3 flex items-center gap-3 md:pl-12">
                    <Zap size={10} className="text-tdx-red opacity-60 group-hover/tier:opacity-100 transition-opacity" />
                    <span className="font-display font-semibold text-sm md:text-base text-black dark:text-white">
                      {tier.plan}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-4 md:col-span-3 flex items-baseline gap-1">
                    <span className="font-display font-bold text-lg md:text-2xl text-black dark:text-white">
                      {tier.price}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-neutral-400">
                      {tier.unit}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="hidden md:block col-span-4 text-sm text-neutral-500 dark:text-neutral-400 font-light">
                    {tier.desc}
                  </div>

                  {/* CTA */}
                  <div className="col-span-3 md:col-span-2 flex justify-end">
                    <div className="flex items-center gap-1 font-mono text-[10px] md:text-xs text-tdx-red opacity-0 group-hover/tier:opacity-100 transition-opacity cursor-pointer">
                      <span className="hidden md:inline">SELECT</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Pricing: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="pricing" className="bg-white dark:bg-neutral-950 py-24 lg:py-36 relative z-10 overflow-hidden">
      
      {/* Background Ambience - Optimized for mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[-15%] w-[700px] h-[700px] bg-red-50/40 dark:bg-tdx-red/[0.06] rounded-full blur-[80px] md:blur-[150px] will-change-transform" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-neutral-100/60 dark:bg-white/[0.03] rounded-full blur-[60px] md:blur-[120px] will-change-transform" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative">

        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/[0.06] dark:border-white/10 pb-10 md:pb-14"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="flex items-center justify-center w-6 h-6 border border-tdx-red rounded-full text-tdx-red">
                <Scan size={12} />
              </span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-tdx-red font-bold">Price Matrix v2.0</span>
            </div>
            <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-8xl tracking-tighter text-black dark:text-white leading-[0.85]">
              Our{' '}
              <span className="italic text-neutral-300 dark:text-neutral-600 font-light">Pricing</span>
              <span className="text-tdx-red">.</span>
            </h2>
          </div>

          <div className="hidden md:flex flex-col items-end gap-4 pb-2">
            <div className="flex items-center gap-3 px-4 py-2 bg-neutral-50 dark:bg-white/5 rounded-full border border-neutral-100 dark:border-white/10">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-tdx-red rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-tdx-red rounded-full" />
              </div>
              <span className="font-bold font-mono text-[10px] text-neutral-600 dark:text-neutral-300 tracking-widest">RATES LIVE</span>
            </div>
            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest text-right leading-relaxed">
              Transparent Pricing Grid<br />
              Select service for details
            </p>
          </div>
        </motion.div>

        {/* Express MVP Promotional Block */}
        <div className="mb-16 md:mb-24 mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-tdx-red/30 bg-neutral-50 dark:bg-neutral-900/50 p-8 md:p-12 shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-tdx-red/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mix-blend-overlay" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Content */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tdx-red opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-tdx-red"></span>
                  </span>
                  <span className="font-mono text-tdx-red text-xs font-bold tracking-widest uppercase">express mvp</span>
                </div>
                
                <h3 className="font-display font-bold text-4xl md:text-5xl text-black dark:text-white mb-6 leading-[1.1]">
                  Launch a complete MVP in just 7 days
                </h3>
                
                <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-8 font-light">
                  Fully equipped for market feedback and user testing.
                </p>
                
                <div className="mb-8">
                  <span className="text-neutral-500 dark:text-neutral-400 block text-sm font-mono mb-2 uppercase tracking-wide">In Just</span>
                  <div className="text-5xl md:text-6xl font-display font-bold text-black dark:text-white pb-2 border-b-2 border-tdx-red inline-block">
                    $3500
                  </div>
                </div>
                
                <div>
                  <a href="#contact" className="group relative inline-flex items-center justify-center px-10 py-4 bg-tdx-red text-white font-bold rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(255,31,31,0.3)] hover:shadow-[0_0_30px_rgba(255,31,31,0.5)]">
                    <span className="relative z-10 flex items-center gap-2">
                      Let's Talk <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Features List */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-black/40 rounded-2xl p-8 border border-black/5 dark:border-white/10 h-full flex items-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 w-full">
                    {[
                      "Custom-Built Functional Web Application",
                      "Core Features Implementation",
                      "Simple & Secure User Authentication",
                      "Basic Database Integration",
                      "Mobile-Responsive, Adaptive Design",
                      "Complete Source Code Ownership",
                      "Deployment to Live Environment",
                      "Comprehensive Technical Documentation",
                      "Basic Analytics & Feedback Hooks",
                      "Post-Launch Support & Maintenance"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Scan size={14} className="text-tdx-red mt-1 shrink-0" />
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-12 items-center py-4 px-8 mb-2">
          <div className="col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Service</span>
          </div>
          <div className="col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Module</span>
          </div>
          <div className="col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Starting Rate</span>
          </div>
          <div className="col-span-2 text-right pr-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Details</span>
          </div>
        </div>

        {/* Divider line under header */}
        <div className="h-[2px] bg-gradient-to-r from-tdx-red via-tdx-red/40 to-transparent mb-2" />

        {/* Pricing Accordion */}
        <div className="flex flex-col">
          {pricingData.map((category, index) => (
            <ServiceCategory
              key={index}
              category={category}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-100 dark:border-white/[0.08]"
        >
          <div>
            <p className="font-display font-bold text-xl md:text-2xl text-black dark:text-white mb-1">
              Need a custom solution?
            </p>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 tracking-wide">
              // ENTERPRISE SOLUTIONS TAILORED TO YOUR SCALE
            </p>
          </div>
          <a href="#contact" className="group flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-tdx-red dark:hover:bg-tdx-red dark:hover:text-white transition-all duration-300 font-display font-bold text-sm cursor-pointer">
            Get a Quote
            <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
