import React from 'react';
import { ArrowRight, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#050508]">
      
      {/* Knight Bite Signature Purple Background Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-900/30 via-violet-600/20 to-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D0B14] text-purple-300 text-xs font-medium border border-purple-900/50 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>Native Android App • Built with Kotlin & Jetpack Compose</span>
            </div>

            {/* Knight Bite Style Headline */}
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              Lost something? <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-pink-400 bg-clip-text text-transparent">
                Find it with visual AI.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Lost & Found replaces manual lost property binders with Gemini 1.5 multimodal visual embeddings and MongoDB Vector Search — matching item photos with security desk logs in seconds.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-purple-600/35 hover:shadow-purple-600/55 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Try Interactive Matcher</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#architecture"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#0D0B14] hover:bg-[#161224] text-slate-200 border border-purple-900/50 font-medium text-sm text-center transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>Tech Specs</span>
              </a>
            </div>

            {/* Stack Highlights */}
            <div className="pt-6 border-t border-purple-900/40 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Gemini 1.5 Flash Vision</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Spring Boot 3 API</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>MongoDB Atlas Vector</span>
              </div>
            </div>

          </div>

          {/* Right Visual Anchor - Interactive Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>

        </div>
      </div>
    </section>
  );
};
