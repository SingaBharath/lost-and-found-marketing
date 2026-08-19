import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-purple-900/30 shadow-xl shadow-purple-950/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Knight Bite Style Glowing Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-pink-500 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#050508] rounded-[10px] flex items-center justify-center text-white">
              <Search className="w-4 h-4 text-purple-400 stroke-[2.5]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              Lost & Found <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800">AI</span>
            </span>
          </div>
        </div>

        {/* Knight Bite Styled Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#0D0B14]/80 p-1.5 rounded-full border border-purple-900/40 backdrop-blur-md">
          <button
            onClick={() => handleNavClick('hero')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-900/40 transition-all"
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('demo')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-900/40 transition-all flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Interactive Demo</span>
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-900/40 transition-all"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('architecture')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-900/40 transition-all"
          >
            Tech Specs
          </button>
          <button
            onClick={() => handleNavClick('social-proof')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-900/40 transition-all"
          >
            Why We Built It
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('demo')}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center space-x-1.5"
          >
            <span>Try AI Matcher</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-[#0D0B14]/95 backdrop-blur-xl px-6 py-4 space-y-3 mt-2">
          <button
            onClick={() => handleNavClick('demo')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Interactive Demo
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('architecture')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Tech Specs
          </button>
          <button
            onClick={() => handleNavClick('social-proof')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-200"
          >
            Why We Built It
          </button>
          <button
            onClick={() => handleNavClick('demo')}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-center text-xs mt-2 shadow-lg"
          >
            Try AI Matcher
          </button>
        </div>
      )}
    </header>
  );
};
