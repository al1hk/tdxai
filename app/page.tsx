import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from './components/Navbar';
import { HeroAI } from './components/HeroAI';
import { AIBg } from './components/AIBg';
import { CustomCursor } from './components/CustomCursor';
const Marquee = dynamic(() => import('./components/Marquee').then(mod => ({ default: mod.Marquee })), {
  loading: () => <div className="min-h-[200px]" />,
});
const CoreValues = dynamic(() => import('./components/CoreValues').then(mod => ({ default: mod.CoreValues })), {
  loading: () => <div className="min-h-screen" />,
});

// Dynamically import below-the-fold sections to reduce initial JS bundle and hydration cost
const Services = dynamic(() => import('./components/Services').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="min-h-screen" />,
});
const About = dynamic(() => import('./components/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-screen" />,
});
const Pricing = dynamic(() => import('./components/Pricing').then(mod => ({ default: mod.Pricing })), {
  loading: () => <div className="min-h-screen" />,
});
const CaseStudies = dynamic(() => import('./components/CaseStudies').then(mod => ({ default: mod.CaseStudies })), {
  loading: () => <div className="min-h-screen" />,
});
const Contact = dynamic(() => import('./components/Contact').then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-screen" />,
});

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans selection:bg-tdx-red selection:text-white bg-white dark:bg-black text-black dark:text-white">
      <div className="bg-noise" />
      <CustomCursor />
      <AIBg />
      <Navbar />
      <main>
        <HeroAI />
        <Marquee />
        <CoreValues />
        <About />
        <Services />
        <CaseStudies />
        <Pricing />
        {/* <Testimonials /> */}
        <Contact />
      </main>
    </div>
  );
};

export default App;