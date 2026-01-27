"use client";

import React from 'react';
import { motion } from 'framer-motion';

const values = [
  {
    id: "01",
    title: "Experienced",
    description: "Experience is what makes something concrete, yet futuristic. We draw from a deep well of historical data to predict the next wave.",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: "02",
    title: "Reliable",
    description: "We aim to gain your trust, which is only possible by providing the best. Our systems are architected for 99.99% uptime and fault tolerance.",
    gradient: "from-tdx-red/20 to-orange-500/20"
  },
  {
    id: "03",
    title: "Passionate",
    description: "Passion to innovate is the only key which can lead you to success. We are obsessed with the boundary between what is and what could be.",
    gradient: "from-emerald-500/20 to-teal-500/20"
  }
];

export const CoreValues: React.FC = () => {
  return (
    <section className="py-40 bg-white dark:bg-neutral-950 relative z-10 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 md:flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-8"
        >
          <div>
            <span className="font-mono text-tdx-red text-xs tracking-[0.2em] uppercase mb-4 block">Our DNA</span>
            <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tighter text-black dark:text-white">
              CORE <span className="text-gray-400">PHILOSOPHY</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="font-mono text-xs text-gray-500 text-right max-w-xs">
              // PRINCIPLES GUIDING OUR <br /> INTELLIGENT SYSTEMS
            </p>
          </div>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full p-8 md:p-10 rounded-3xl bg-gray-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-colors duration-500 border border-transparent hover:border-black/5 dark:hover:border-white/10 overflow-hidden">
                
                {/* Hover Gradient Orb */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${item.gradient} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Big Number */}
                <div className="font-display font-bold text-8xl md:text-9xl text-gray-200/50 dark:text-white/10 group-hover:text-black/5 dark:group-hover:text-white/10 transition-colors duration-500 mb-8 select-none">
                  {item.id}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-3xl mb-4 text-gray-900 dark:text-white group-hover:text-tdx-red transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-12 bg-black/10 dark:bg-white/10 mb-6 group-hover:w-full group-hover:bg-tdx-red transition-all duration-500 ease-out" />
                  <p className="text-gray-500 dark:text-gray-300 text-base leading-relaxed font-light group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Kinetic Border Lines */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/5 dark:bg-white/10">
                    <div className="h-full bg-tdx-red w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
                </div>
                <div className="absolute top-0 right-0 w-[2px] h-full bg-black/5 dark:bg-white/10">
                    <div className="w-full bg-tdx-red h-0 group-hover:h-full transition-all duration-1000 ease-in-out delay-100" />
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};