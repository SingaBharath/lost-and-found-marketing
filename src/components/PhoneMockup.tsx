import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, MapPin, RefreshCw, ChevronRight } from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  const [isScanning, setIsScanning] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[350px] group">
      
      {/* Knight Bite glowing aura */}
      <div className="absolute -inset-3 bg-gradient-to-r from-purple-600/30 via-violet-600/30 to-pink-600/30 rounded-[48px] blur-2xl opacity-80 group-hover:opacity-100 transition duration-500"></div>

      {/* Android Device Shell */}
      <div className="relative rounded-[40px] border-[8px] border-slate-900 bg-[#050508] shadow-2xl shadow-purple-950/80 overflow-hidden text-white transition-transform duration-300 group-hover:-translate-y-1">
        
        {/* Camera Hole */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-slate-800 z-30 flex items-center justify-center">
          <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
        </div>

        {/* Top Status Bar */}
        <div className="pt-2.5 px-6 pb-2 bg-[#050508] flex items-center justify-between text-[10px] font-mono text-slate-400 select-none border-b border-purple-900/30 z-20 relative">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[9px] px-1 py-0.5 rounded bg-purple-950 text-purple-300 font-semibold">5G</span>
            <div className="w-2.5 h-2 bg-slate-700 rounded-xs"></div>
          </div>
        </div>

        {/* Jetpack Compose App Bar */}
        <div className="bg-[#0D0B14] px-4 py-3 border-b border-purple-900/40 flex items-center justify-between z-20 relative">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
              <Search className="w-3 h-3" />
            </div>
            <span className="font-sans font-bold text-xs text-white tracking-tight">Lost & Found</span>
          </div>
          
          <button 
            onClick={() => setIsScanning(!isScanning)}
            className="p-1 rounded bg-[#161224] text-purple-300 text-[9px] font-medium flex items-center gap-1 px-2 border border-purple-800/60"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isScanning ? 'animate-spin text-purple-400' : ''}`} />
            <span>{isScanning ? 'Live AI' : 'Paused'}</span>
          </button>
        </div>

        {/* App Main Workspace */}
        <div className="p-3.5 space-y-3 bg-[#050508] min-h-[450px] relative select-none">
          
          {/* Top Status Banner */}
          <div className="bg-gradient-to-r from-[#0D0B14] via-[#161224] to-[#0D0B14] p-2.5 rounded-xl border border-purple-800/50 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-700/60 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-white flex items-center gap-1">
                  Gemini 1.5 Flash
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="text-[9px] text-slate-400">Embedding distance: 0.042</div>
              </div>
            </div>
            <span className="text-[9px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
              98.4% Match
            </span>
          </div>

          {/* Reported Lost Item Card */}
          <div className="bg-[#0D0B14] rounded-xl border border-purple-900/50 p-3 space-y-2 relative overflow-hidden shadow-lg">
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_#a855f7] animate-scan z-10"></div>
            )}

            <div className="flex gap-3 items-center">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-purple-800/60">
                <img 
                  src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80" 
                  alt="Lost Item"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-semibold text-purple-400 uppercase tracking-wider">Reported Lost</div>
                <h4 className="text-xs font-bold text-white truncate">Navy Leather Cardholder</h4>
                <p className="text-[9px] text-slate-400 truncate mt-0.5">3 slots & silver split ring</p>
                <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-300">
                  <MapPin className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                  <span className="truncate">Central Library Desk</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[10px]">
              <div className="flex items-center space-x-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Found at Security Desk Box #4</span>
              </div>
              <span className="text-[9px] text-purple-300 font-mono">118ms</span>
            </div>
          </div>

          {/* Security Candidate Item */}
          <div className="bg-[#0D0B14]/80 rounded-xl border border-purple-900/40 p-2.5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-purple-800/60 overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80" 
                  alt="Found candidate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-[10px] font-semibold text-slate-200">Security Office Log #4</div>
                <div className="text-[8px] font-mono text-slate-400">Jetpack Compose UI • Vector Matched</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
          </div>

          {/* Specs */}
          <div className="bg-[#0D0B14]/40 rounded-lg p-2 border border-purple-900/30 flex justify-around text-center text-[9px] text-slate-400 font-mono">
            <div><span className="text-purple-300 font-bold block">Spring 3</span> REST</div>
            <div className="w-px h-5 bg-purple-900/50"></div>
            <div><span className="text-purple-300 font-bold block">MongoDB</span> Atlas</div>
            <div className="w-px h-5 bg-purple-900/50"></div>
            <div><span className="text-purple-300 font-bold block">Gemini 1.5</span> Vision</div>
          </div>

        </div>

        {/* Home Bar */}
        <div className="bg-black py-2.5 flex justify-center">
          <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};
