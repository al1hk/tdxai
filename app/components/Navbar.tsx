"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import logo from '../assets/cropped-TDX_LOGO-2.png';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolledRef = useRef(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const next = window.scrollY > 50;
        if (scrolledRef.current !== next) {
          scrolledRef.current = next;
          setScrolled(next);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
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
          flex items-center justify-between px-4 md:px-6 py-3 rounded-full transition-colors duration-300
          ${scrolled 
            ? 'w-full max-w-5xl bg-white/90 dark:bg-neutral-950/90 shadow-sm border border-black/5 dark:border-white/10 backdrop-blur-md' 
            : 'w-full max-w-5xl bg-transparent border border-transparent'
          }
        `}>
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image src={logo} alt="TDX" className="h-8 md:h-10 w-auto object-contain" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-white/5 rounded-full px-2 p-1 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors relative cursor-hover rounded-full hover:bg-white/80 dark:hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-white/10 transition-colors cursor-hover"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
             <button className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-tdx-red rounded-full hover:bg-black transition-all duration-300 shadow-[0_0_20px_rgba(255,31,31,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group cursor-hover">
              Start Project
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-900 dark:text-white p-2 bg-gray-100 dark:bg-white/5 rounded-full cursor-hover"
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
            className="fixed inset-0 z-40 bg-white dark:bg-neutral-950 pt-24 px-6 flex flex-col items-center"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-8 hover:text-tdx-red transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="mt-2 mb-8 w-full max-w-xs px-6 py-4 text-lg font-bold rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
             <button className="w-full max-w-xs mt-8 px-6 py-4 text-lg font-bold text-white bg-tdx-red rounded-full shadow-lg">
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};