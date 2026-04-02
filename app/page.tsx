import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroAI } from './components/HeroAI';
import { AIBg } from './components/AIBg';
import { Services } from './components/Services';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { Marquee } from './components/Marquee';
import { CoreValues } from './components/CoreValues';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans selection:bg-tdx-red selection:text-white bg-white dark:bg-neutral-950 text-black dark:text-white cursor-none">
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
        <Pricing />
        <CaseStudies />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
};

export default App;