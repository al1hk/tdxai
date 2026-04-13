"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, Send, Sparkles, CheckCircle2, ChevronDown, Facebook, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import logo from '../assets/cropped-TDX_LOGO-2.png';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  name: string;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  name,
  isFocused,
  onFocus,
  onBlur
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        onBlur();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  return (
    <div className="relative" ref={containerRef}>
      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2 block">
        {label} {required && <span className="text-tdx-red">*</span>}
      </label>
      <div 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) onFocus();
        }}
        className={`w-full bg-transparent border-b-2 py-4 text-base md:text-lg font-sans text-black dark:text-white cursor-pointer flex justify-between items-center transition-all duration-300 ${isOpen || isFocused ? 'border-tdx-red' : 'border-neutral-200 dark:border-white/10'} ${!value ? 'text-neutral-400 dark:text-neutral-600' : ''}`}
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={16} className={`text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/5 overflow-hidden"
          >
            <div className="max-h-[260px] overflow-y-auto py-2 flex flex-col scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {options.map((opt: string, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    onChange({ target: { name, value: opt } });
                    setIsOpen(false);
                  }}
                  className={`px-6 py-3 cursor-pointer text-sm md:text-base transition-colors duration-200 ${value === opt ? 'bg-tdx-red/10 text-tdx-red font-semibold' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04]'}`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });
      
      const data = await response.json();
      if (!response.ok) {
        console.error("Submission failed:", data.error);
      }
    } catch (error) {
      console.error(error);
    }
    
    setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: '', email: '', service: '', budget: '', message: '' });
    }, 4000);
  };

  const services = [
    "AI Driven Services",
    "Business Automation",
    "Blockchain Development",
    "Web App Development",
    "Mobile App Development",
    "AI Agents Development",
    "WordPress Development",
    "SEO Services",
    "Social Media Marketing"
  ];

  const budgetRanges = [
    "$1,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+",
    "Not sure yet"
  ];

  const inputBaseClass = "w-full bg-transparent border-b-2 py-4 text-base md:text-lg font-sans text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-all duration-300";
  const inputIdleClass = "border-neutral-200 dark:border-white/10";
  const inputFocusClass = "border-tdx-red";

  return (
    <section id="contact" className="bg-white dark:bg-neutral-950 relative z-10 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-50/30 dark:bg-tdx-red/[0.04] rounded-full blur-[180px]" />
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] bg-neutral-100/40 dark:bg-white/[0.02] rounded-full blur-[140px]" />
      </div>

      {/* Top CTA Banner */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-20 md:py-32 overflow-hidden border-y border-neutral-200 dark:border-white/5">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:20px_20px]" />
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-tdx-red/10 rounded-full blur-[120px]" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 mb-8 md:mb-10 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <Sparkles size={12} className="text-tdx-red" />
              <span className="font-mono text-[10px] md:text-xs text-black/60 dark:text-white/60 uppercase tracking-[0.3em] font-bold">
                Get In Touch
              </span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-black dark:text-white tracking-tighter leading-[0.9] mb-6">
              Let's work together on<br />
              <span className="italic font-light text-neutral-500 dark:text-neutral-400">your next project</span>
            </h2>

            <p className="max-w-xl mx-auto font-sans text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-10">
              Whether you need an AI-powered solution, a cutting-edge web platform, or a complete digital transformation — we're ready to build it.
            </p>

            <a href="#contact-form" className="group inline-flex items-center gap-3 px-10 py-5 bg-tdx-red text-white rounded-full hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-display font-bold text-sm md:text-base cursor-pointer shadow-lg shadow-tdx-red/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              LET'S TALK
              <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Contact Form + Info Grid */}
      <div id="contact-form" className="max-w-[1400px] mx-auto px-4 md:px-12 pt-20 md:pt-36 pb-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24 md:mb-36">

          {/* Left Column — Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-tdx-red text-[10px] md:text-xs tracking-[0.2em] uppercase mb-4 block font-bold">Contact Details</span>
              <h3 className="font-display font-bold text-3xl md:text-5xl text-black dark:text-white tracking-tight mb-8">
                Get in <span className="text-tdx-red">touch</span>.
              </h3>

              <div className="space-y-8">
                {/* Email */}
                <div className="group flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center group-hover:bg-tdx-red group-hover:border-tdx-red transition-all duration-300 shrink-0">
                    <Mail size={18} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Email</p>
                    <a href="mailto:hello@tdx.ai" className="font-display font-semibold text-base md:text-lg text-black dark:text-white hover:text-tdx-red transition-colors">
                      hello@tdx.ai
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column — Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <div className="relative p-6 md:p-12 rounded-3xl bg-neutral-50/50 dark:bg-white/[0.02] border border-neutral-100 dark:border-white/[0.06] overflow-hidden">
              
              {/* Subtle corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-tdx-red/20 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-tdx-red/20 rounded-br-3xl pointer-events-none" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-emerald-600" />
                  </div>
                  <h4 className="font-display font-bold text-2xl md:text-3xl text-black dark:text-white mb-3">
                    Message Sent!
                  </h4>
                  <p className="font-sans text-neutral-500 dark:text-neutral-400 max-w-md">
                    We'll get back to you within 24 hours. In the meantime, grab a coffee ☕
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Send size={14} className="text-tdx-red" />
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.2em]">Send a Message</span>
                  </div>

                  {/* Name + Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2 block">
                        Your Name <span className="text-tdx-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        required
                        className={`${inputBaseClass} ${focusedField === 'name' ? inputFocusClass : inputIdleClass}`}
                      />
                    </div>
                    <div className="relative">
                      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2 block">
                        Email Address <span className="text-tdx-red">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@company.com"
                        required
                        className={`${inputBaseClass} ${focusedField === 'email' ? inputFocusClass : inputIdleClass}`}
                      />
                    </div>
                  </div>

                  {/* Service + Budget Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CustomSelect
                      name="service"
                      label="Service Needed"
                      value={formState.service}
                      options={services}
                      placeholder="Select a service..."
                      onChange={handleChange}
                      isFocused={focusedField === 'service'}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <CustomSelect
                      name="budget"
                      label="Budget Range"
                      value={formState.budget}
                      options={budgetRanges}
                      placeholder="Select range..."
                      onChange={handleChange}
                      isFocused={focusedField === 'budget'}
                      onFocus={() => setFocusedField('budget')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.15em] mb-2 block">
                      Project Details <span className="text-tdx-red">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your project, goals, and timeline..."
                      required
                      rows={5}
                      className={`${inputBaseClass} ${focusedField === 'message' ? inputFocusClass : inputIdleClass} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                    <p className="font-mono text-[10px] text-neutral-400 tracking-wide order-2 md:order-1">
                      We respond within 24 hours
                    </p>
                    <button
                      type="submit"
                      className="order-1 md:order-2 group w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-tdx-red dark:hover:bg-tdx-red dark:hover:text-white transition-all duration-300 font-display font-bold text-sm md:text-base cursor-pointer hover:shadow-lg hover:shadow-tdx-red/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Send Message
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mixed Footer Area */}
      <footer className="bg-neutral-950 text-white w-full pt-16 pb-8 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            <div className="col-span-1 md:col-span-1">
               <div className="mb-6">
                  <Image src={logo} alt="TDX" className="h-8 md:h-10 w-auto object-contain brightness-200" />
               </div>
               <p className="text-sm font-medium text-neutral-400 mb-6 max-w-[200px]">
                 Architecting intelligent digital systems.
               </p>
               <div className="flex gap-4">
                 {[
                   { icon: Linkedin, href: 'https://www.linkedin.com/company/tdx/' },
                   { icon: Facebook, href: 'https://www.facebook.com/TDXai/' },
                   { icon: Instagram, href: 'https://www.instagram.com/tdx.ai' }
                 ].map((social, i) => {
                   const Icon = social.icon;
                   return (
                     <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:bg-tdx-red hover:text-white hover:border-tdx-red transition-all cursor-hover">
                       <Icon size={16} />
                     </a>
                   );
                 })}
               </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Navigate</h4>
              <ul className="space-y-2 text-sm font-medium text-neutral-300">
                <li><a href="#about" className="hover:text-tdx-red transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-tdx-red transition-colors">Services</a></li>
                <li><a href="#work" className="hover:text-tdx-red transition-colors">Work</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">More</h4>
              <ul className="space-y-2 text-sm font-medium text-neutral-300">
                <li><a href="#pricing" className="hover:text-tdx-red transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-tdx-red transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-tdx-red transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 font-mono text-[10px] text-neutral-500">
             <p className="mb-4 md:mb-0">© 2024 TDX Agency. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
};
