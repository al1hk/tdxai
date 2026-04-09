"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Moon, Sun, User, Layers, Briefcase, DollarSign, MessageSquare, Mail } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import logo from '../assets/cropped-TDX_LOGO-2.png';

const navLinks = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Services', href: '#services', icon: Layers },
  { name: 'Work', href: '#work', icon: Briefcase },
  { name: 'Pricing', href: '#pricing', icon: DollarSign },
  { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const scrolledRef = useRef(false);
  const { theme, toggleTheme } = useTheme();

  // Scroll tracking for navbar background
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

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect, {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  const scrollToContact = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

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
          <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-white/5 rounded-full px-2 p-1 border border-gray-200/50 dark:border-white/10 backdrop-blur-sm relative">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-5 py-2 text-sm font-medium transition-all duration-300 relative cursor-hover rounded-full
                  ${activeSection === link.href
                    ? 'text-white bg-tdx-red shadow-md shadow-tdx-red/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10'
                  }
                `}
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
             <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-tdx-red rounded-full hover:bg-black transition-all duration-300 shadow-[0_0_20px_rgba(255,31,31,0.3)] hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] group cursor-hover"
            >
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
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;
              return (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-3xl font-display font-bold mb-6 transition-colors duration-200
                    ${isActive
                      ? 'text-tdx-red'
                      : 'text-gray-900 dark:text-white hover:text-tdx-red'
                    }
                  `}
                >
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200
                    ${isActive
                      ? 'bg-tdx-red/10 border-tdx-red/30 text-tdx-red'
                      : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400'
                    }
                  `}>
                    <Icon size={20} />
                  </span>
                  {link.name}
                </motion.a>
              );
            })}

            <div className="flex items-center gap-4 mt-4 w-full max-w-xs">
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
                className="flex-1 px-6 py-4 text-base font-bold rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white"
              >
                {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(scrollToContact, 300);
                }}
                className="flex-1 px-6 py-4 text-base font-bold text-white bg-tdx-red rounded-full shadow-lg"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};