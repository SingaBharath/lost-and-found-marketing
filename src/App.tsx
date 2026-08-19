import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductDemo } from './components/ProductDemo';
import { Features } from './components/Features';
import { TechStack } from './components/TechStack';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { KonamiEasterEgg } from './components/KonamiEasterEgg';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 selection:bg-slate-900 selection:text-white transition-colors duration-200">
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onNavigate={handleNavigate} 
      />
      
      <main>
        <Hero onExploreClick={() => handleNavigate('demo')} />
        <ProductDemo />
        <Features />
        <TechStack />
        <SocialProof />
      </main>

      <Footer onNavigate={handleNavigate} />
      
      {/* Interactive Konami Easter Egg Controller */}
      <KonamiEasterEgg />
    </div>
  );
};

export default App;
