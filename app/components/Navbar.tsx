"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
          ${scrolled 
            ? 'w-full max-w-5xl bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50' 
            : 'w-full max-w-7xl bg-transparent'
          }
        `}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden bg-black text-white rounded-full font-bold font-display cursor-hover">
              <span className="relative z-10 group-hover:-translate-y-full transition-transform duration-300 block">T</span>
              <span className="absolute z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 block text-tdx-red">T</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className={`font-display font-bold text-xl tracking-tight ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>
              TDX
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center bg-gray-100/50 rounded-full px-2 p-1 border border-gray-200/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors relative cursor-hover rounded-full hover:bg-white/80"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-tdx-red rounded-full hover:bg-black transition-all duration-300 shadow-[0_0_20px_rgba(255,31,31,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group cursor-hover">
              Start Project
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-900 p-2 bg-gray-100 rounded-full cursor-hover"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col items-center"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-bold text-gray-900 mb-8 hover:text-tdx-red transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
             <button className="w-full max-w-xs mt-8 px-6 py-4 text-lg font-bold text-white bg-tdx-red rounded-full shadow-lg">
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};