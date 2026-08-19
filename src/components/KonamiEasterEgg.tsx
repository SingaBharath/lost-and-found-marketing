import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Zap, Volume2, VolumeX, Sparkles, Award, Compass, Trophy } from 'lucide-react';

export const KonamiEasterEgg: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentVector, setCurrentVector] = useState<string>('0.042, -0.118, 0.891');
  const [scanPulse, setScanPulse] = useState<boolean>(false);
  const [unlockedBadge, setUnlockedBadge] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Web Audio API 8-bit Sound Synthesizer
  const playSound = (type: 'activate' | 'scan' | 'badge') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'activate') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'scan') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'badge') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Listen for Konami key sequence
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const updated = [...keySequence, e.key];
      if (updated.length > konamiCode.length) {
        updated.shift();
      }
      setKeySequence(updated);

      if (updated.join(',') === konamiCode.join(',')) {
        setActive(true);
        playSound('activate');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  // Track cursor position & generate dynamic 768-dim vector coordinates
  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const v1 = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3);
      const v2 = ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3);
      const v3 = (Math.sin(e.clientX * 0.01) * 0.9).toFixed(3);
      setCurrentVector(`${v1}, ${v2}, ${v3}`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [active]);

  // HTML5 Canvas 768-Dim Vector Rain Animation
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 24);
    const drops: number[] = Array(columns).fill(1);
    const chars = '010101768DIMSKOTLINJETPACKCOMPOSEMONGODBEMBEDDINGS';

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#8B5CF6';
      ctx.font = '11px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * 24, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [active]);

  const triggerLaserPulse = () => {
    setScanPulse(true);
    playSound('scan');
    setTimeout(() => setScanPulse(false), 1200);
  };

  const handleUnlockBadge = () => {
    setUnlockedBadge(true);
    playSound('badge');
  };

  return (
    <>
      {active && (
        <div className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden font-mono">
          
          {/* HTML5 Canvas Background Vector Matrix Rain */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

          {/* Full Screen Laser Scan Pulse Sweep */}
          {scanPulse && (
            <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_40px_#ec4899] animate-scan z-20 pointer-events-none"></div>
          )}

          {/* Cursor Interactive HUD Tracker */}
          <div
            className="fixed pointer-events-none z-30 transition-transform duration-75 flex items-center space-x-3 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
          >
            {/* Glowing Target Ring */}
            <div className="w-8 h-8 rounded-full border-2 border-purple-400 border-dashed animate-spin"></div>

            {/* Vector Stats Box */}
            <div className="bg-[#0D0B14]/95 border border-purple-700/80 p-2.5 rounded-xl shadow-2xl backdrop-blur-md text-[10px] space-y-1 text-white">
              <div className="flex items-center space-x-1.5 text-purple-400 font-bold">
                <Compass className="w-3 h-3 animate-pulse" />
                <span>Live Gemini 1.5 Vector HUD</span>
              </div>
              <div className="text-slate-300">
                Coords: <span className="text-emerald-400 font-bold">[{currentVector}, ... 768 dims]</span>
              </div>
              <div className="text-slate-400">
                Cosine Similarity: <span className="text-purple-300 font-bold">0.984 (Match Verified)</span>
              </div>
            </div>
          </div>

          {/* Floating Control HUD Dashboard at Bottom */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-full px-4">
            <div className="bg-[#0D0B14]/90 backdrop-blur-xl border-2 border-purple-600 rounded-3xl p-5 shadow-2xl shadow-purple-950/80 text-white space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-pink-500 p-0.5 shadow-lg shadow-purple-600/40">
                    <div className="w-full h-full bg-[#050508] rounded-[10px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-sm text-white flex items-center gap-2">
                      Gemini 1.5 AI Vector Lab Mode
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-semibold">
                        Konami Code Unlocked 🎮
                      </span>
                    </h3>
                    <div className="text-[11px] text-slate-300 font-sans">
                      Hover anywhere on the screen to inspect live 768-dimensional visual vectors!
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 rounded-xl bg-[#161224] border border-purple-800 text-purple-300 hover:text-white"
                    title="Toggle 8-Bit Web Audio Sound"
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  </button>

                  <button
                    onClick={() => setActive(false)}
                    className="p-2 rounded-xl bg-[#161224] border border-purple-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <button
                  onClick={triggerLaserPulse}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center space-x-2 transition-transform active:scale-95"
                >
                  <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span>Pulse Full-Screen Laser Scanner</span>
                </button>

                <button
                  onClick={handleUnlockBadge}
                  className="px-5 py-2.5 rounded-full bg-[#161224] hover:bg-[#201936] text-purple-300 border border-purple-700 font-bold text-xs flex items-center space-x-2 transition-transform active:scale-95"
                >
                  <Award className="w-4 h-4 text-pink-400" />
                  <span>{unlockedBadge ? 'Badge Claimed! 🏆' : 'Claim AI Architect Badge'}</span>
                </button>

                <button
                  onClick={() => setActive(false)}
                  className="px-4 py-2.5 rounded-full bg-purple-950 text-purple-300 hover:text-white text-xs font-semibold"
                >
                  Exit Lab Mode
                </button>
              </div>

              {/* Secret Easter Egg Developer Banner */}
              {unlockedBadge && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-950 via-pink-950 to-purple-950 border border-pink-500/60 text-xs text-center space-y-1 animate-in fade-in">
                  <div className="font-bold text-pink-300 flex items-center justify-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>Secret Easter Egg Certificate Unlocked!</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    You discovered the hidden Gemini AI Vector Inspection Lab mode! Try typing <strong>↑ ↑ ↓ ↓ ← → ← → B A</strong> on your keyboard anywhere on the live website.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      )}
    </>
  );
};
