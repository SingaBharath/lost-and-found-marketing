import React from 'react';
import { Search, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => onNavigate('hero')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-white text-slate-950 font-bold text-xs flex items-center justify-center">
                L&F
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-white">
                Lost & Found
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Native Android application built with Jetpack Compose, Spring Boot 3, MongoDB Atlas Vector Search, and Gemini 1.5 Flash multimodal matching.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% Honest Copy • Zero Fabricated Metrics</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('demo')} className="hover:text-white transition-colors">
                  Live Demo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('architecture')} className="hover:text-white transition-colors">
                  Tech Stack
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Jetpack Compose UI</li>
              <li>Spring Boot 3 API</li>
              <li>MongoDB Atlas Vector</li>
              <li>Gemini 1.5 Flash</li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Challenge Submission
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed & built for the Acdyon Technologies Frontend Challenge.
            </p>
            
            <div className="pt-1">
              <button 
                onClick={() => onNavigate('hero')}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white font-medium"
              >
                <span>Back to Top</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Konami Hint */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Lost & Found Project. Built for Acdyon Challenge.
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Try key sequence:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-800 font-bold">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
