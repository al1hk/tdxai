"use client";

import React from 'react';
import { Twitter, Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950 pt-24 pb-8 border-t border-gray-100 dark:border-white/10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Big CTA */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end">
          <h2 className="font-display font-bold text-6xl md:text-9xl tracking-tighter text-gray-900 dark:text-white leading-[0.8]">
            LET'S <br /> BUILD.
          </h2>
          <button className="group mt-8 md:mt-0 flex items-center gap-4 px-8 py-4 bg-black text-white rounded-full hover:bg-tdx-red transition-colors duration-300 cursor-hover">
            <span className="font-bold">Start a Project</span>
            <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-gray-200 dark:border-white/10 pt-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="font-display font-bold text-2xl tracking-tight mb-6 text-gray-900 dark:text-white">TDX</div>
             <div className="flex gap-4">
               {[Twitter, Linkedin, Github].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black dark:hover:border-white transition-all cursor-hover">
                   <Icon size={16} />
                 </a>
               ))}
             </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Sitemap</h4>
            <ul className="space-y-2 text-sm font-medium text-gray-900 dark:text-white">
              <li><a href="#" className="hover:text-tdx-red transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-tdx-red transition-colors">Capabilities</a></li>
              <li><a href="#" className="hover:text-tdx-red transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-tdx-red transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm font-medium text-gray-900 dark:text-white">
              <li><a href="#" className="hover:text-tdx-red transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-tdx-red transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest">Contact</h4>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              hello@tdx.ai <br />
              +1 (555) 000-0000
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-white/10 font-mono text-xs text-gray-400">
          <p>© 2024 TDX Agency.</p>
          <p>SYSTEM_STATUS: ONLINE</p>
        </div>
      </div>
    </footer>
  );
};