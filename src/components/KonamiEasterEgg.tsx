import React, { useState, useEffect } from 'react';
import { Terminal, X, CheckCircle2, Cpu, Database, Smartphone } from 'lucide-react';

export const KonamiEasterEgg: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [tested, setTested] = useState<boolean>(false);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const updated = [...keySequence, e.key];
      if (updated.length > konamiCode.length) {
        updated.shift();
      }
      setKeySequence(updated);

      if (updated.join(',') === konamiCode.join(',')) {
        setActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  return (
    <>
      {/* Clean Developer Diagnostics Panel */}
      {active && (
        <div className="fixed bottom-6 right-6 z-[90] max-w-sm w-full bg-[#161617] text-white rounded-3xl border border-slate-800 p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-[#0071E3]" />
              <span className="font-mono font-bold text-xs text-white">
                Developer Diagnostics Mode
              </span>
            </div>

            <button
              onClick={() => setActive(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            🎮 <strong>Konami Code Unlocked!</strong> You activated the hidden developer diagnostics panel for Lost & Found AI.
          </p>

          {/* System Specs List */}
          <div className="bg-black p-3 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Android Build:</span>
              <span className="text-white font-bold">Jetpack Compose 1.7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Backend API:</span>
              <span className="text-white font-bold">Spring Boot 3.3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Vector Index:</span>
              <span className="text-[#0071E3] font-bold">MongoDB Atlas (118ms)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Vision Model:</span>
              <span className="text-emerald-400 font-bold">Gemini 1.5 Flash</span>
            </div>
          </div>

          {/* Test Action Button */}
          <button
            onClick={() => setTested(true)}
            className="w-full py-2 rounded-full bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{tested ? 'Diagnostics Passed (100% Operational)' : 'Run System Diagnostic'}</span>
          </button>

          {/* Footer Note */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Sequence: ↑ ↑ ↓ ↓ ← → ← → B A</span>
            <button onClick={() => setActive(false)} className="text-slate-400 hover:text-white">
              Dismiss
            </button>
          </div>

        </div>
      )}
    </>
  );
};
