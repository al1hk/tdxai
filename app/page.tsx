import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroAI } from './components/HeroAI';
import { AIBg } from './components/AIBg';
import { Services } from './components/Services';
import { About } from './components/About';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
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
        <CaseStudies />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;