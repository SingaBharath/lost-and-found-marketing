import React, { useState, useEffect } from 'react';
import { Sparkles, X, Play, Clock, CheckCircle2, Trophy, Flame, RotateCcw } from 'lucide-react';

interface GameItem {
  id: string;
  name: string;
  image: string;
  location: string;
}

const ALL_ITEMS: GameItem[] = [
  {
    id: 'wallet',
    name: 'Navy Leather Cardholder',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80',
    location: 'Central Library Box #4'
  },
  {
    id: 'headphones',
    name: 'Bose QC45 Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    location: 'Auditorium B Desk'
  },
  {
    id: 'bottle',
    name: 'Hydro Flask Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    location: 'Gym Desk Bin'
  },
  {
    id: 'keys',
    name: 'Set of Brass Keys with Lanyard',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=400&q=80',
    location: 'Student Union Lounge'
  },
  {
    id: 'glasses',
    name: 'Ray-Ban Aviator Glasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80',
    location: 'Science Building Lab 3'
  },
  {
    id: 'backpack',
    name: 'Canvas Travel Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
    location: 'Campus Shuttle Stop'
  }
];

export const KonamiEasterEgg: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  
  // Game State
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(8);
  const [targetItem, setTargetItem] = useState<GameItem>(ALL_ITEMS[0]);
  const [options, setOptions] = useState<GameItem[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Non-repeating question deck
  const [deck, setDeck] = useState<GameItem[]>([]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  // Listen for Konami sequence
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

  // Timer loop when playing
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      setGameState('gameover');
      if (score > highScore) setHighScore(score);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, score, highScore]);

  // Helper to get non-repeating deck
  const getNextDeckItem = (currentDeck: GameItem[]): { item: GameItem; remainingDeck: GameItem[] } => {
    let activeDeck = [...currentDeck];
    if (activeDeck.length === 0) {
      // Re-shuffle full deck
      activeDeck = [...ALL_ITEMS].sort(() => Math.random() - 0.5);
    }
    const nextItem = activeDeck.pop()!;
    return { item: nextItem, remainingDeck: activeDeck };
  };

  const startNewRound = (currentDeck: GameItem[] = deck) => {
    const { item: nextTarget, remainingDeck } = getNextDeckItem(currentDeck);
    setDeck(remainingDeck);
    setTargetItem(nextTarget);

    // Pick 3 distractor candidate images without repeating target
    const candidates = [nextTarget];
    while (candidates.length < 4) {
      const rand = ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
      if (!candidates.find(c => c.id === rand.id)) {
        candidates.push(rand);
      }
    }
    // Shuffle candidates grid layout
    setOptions(candidates.sort(() => Math.random() - 0.5));
    setTimeLeft(8);
  };

  const handleStartGame = () => {
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setGameState('playing');
    
    // Create new shuffled deck
    const shuffled = [...ALL_ITEMS].sort(() => Math.random() - 0.5);
    startNewRound(shuffled);
  };

  const handleSelectOption = (selected: GameItem) => {
    if (gameState !== 'playing') return;

    if (selected.id === targetItem.id) {
      // Correct Match!
      setFeedback('correct');
      const earned = 100 + streak * 25;
      setScore(prev => prev + earned);
      setStreak(prev => prev + 1);

      setTimeout(() => {
        setFeedback(null);
        startNewRound();
      }, 400);
    } else {
      // Wrong Match
      setFeedback('wrong');
      setStreak(0);
      setTimeout(() => {
        setFeedback(null);
      }, 400);
    }
  };

  return (
    <>
      {active && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0B14] border-2 border-purple-600 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  🎮
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-sm text-white flex items-center gap-1.5">
                    Lost & Found AI Visual Matcher Game
                  </h3>
                  <div className="text-[10px] font-mono text-purple-300">Playable Konami Easter Egg</div>
                </div>
              </div>

              <button
                onClick={() => setActive(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Streak Bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="bg-[#080610] p-2 rounded-xl border border-purple-900/40">
                <div className="text-slate-400 text-[10px]">Score</div>
                <div className="text-purple-300 font-extrabold text-sm">{score}</div>
              </div>

              <div className="bg-[#080610] p-2 rounded-xl border border-purple-900/40">
                <div className="text-slate-400 text-[10px]">Streak</div>
                <div className="text-amber-400 font-extrabold text-sm flex items-center justify-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>x{streak}</span>
                </div>
              </div>

              <div className="bg-[#080610] p-2 rounded-xl border border-purple-900/40">
                <div className="text-slate-400 text-[10px]">High Score</div>
                <div className="text-emerald-400 font-extrabold text-sm flex items-center justify-center gap-0.5">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{highScore}</span>
                </div>
              </div>
            </div>

            {/* Main Game Screen */}
            {gameState === 'idle' && (
              <div className="bg-[#080610] rounded-2xl p-6 border border-purple-900/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-700 flex items-center justify-center mx-auto text-purple-300">
                  <Sparkles className="w-6 h-6 animate-pulse text-purple-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">Can you beat the AI Matcher?</h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                    Visual memory challenge! Identify the correct lost item photo from the candidate grid based on the reported title.
                  </p>
                </div>

                <button
                  onClick={handleStartGame}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 mx-auto transition-transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Visual Game</span>
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="space-y-4">
                
                {/* Target Prompt */}
                <div className="bg-[#080610] p-3 rounded-2xl border border-purple-800/60 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-purple-400 uppercase font-bold">Target Lost Item Title:</div>
                    <div className="text-sm font-extrabold text-white">{targetItem.name}</div>
                    <div className="text-[10px] text-slate-400">Reported at: {targetItem.location}</div>
                  </div>

                  {/* Timer Bar */}
                  <div className="flex items-center space-x-1.5 font-mono text-sm font-bold text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-800/60">
                    <Clock className="w-4 h-4" />
                    <span>{timeLeft}s</span>
                  </div>
                </div>

                {/* Candidate Selection Options Grid (PURE IMAGE CARDS ONLY - NO TITLE OVERLAYS) */}
                <div className="grid grid-cols-2 gap-3">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className={`relative rounded-2xl overflow-hidden border-2 aspect-video group transition-all ${
                        feedback === 'correct' && opt.id === targetItem.id
                          ? 'border-emerald-400 ring-4 ring-emerald-400/50 scale-[1.03]'
                          : feedback === 'wrong' && opt.id !== targetItem.id
                          ? 'border-rose-500 opacity-40'
                          : 'border-purple-900/60 hover:border-purple-400 active:scale-95 hover:scale-[1.02]'
                      }`}
                    >
                      <img src={opt.image} alt="Candidate option" className="w-full h-full object-cover" />
                      
                      {/* Subtle hover outline ring */}
                      <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  ))}
                </div>

                {/* Feedback Toast */}
                {feedback === 'correct' && (
                  <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 p-2.5 rounded-xl text-xs text-center font-mono font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct Visual Match! (+100 PTS • 98.4% Vector Cosine Similarity)</span>
                  </div>
                )}

                {feedback === 'wrong' && (
                  <div className="bg-rose-950 border border-rose-500 text-rose-300 p-2.5 rounded-xl text-xs text-center font-mono font-bold animate-in fade-in">
                    ❌ Incorrect Visual Match! Streak Reset
                  </div>
                )}

              </div>
            )}

            {gameState === 'gameover' && (
              <div className="bg-[#080610] rounded-2xl p-6 border border-purple-900/40 text-center space-y-4">
                <div className="text-3xl font-extrabold text-white">Game Over!</div>
                <div className="text-sm font-mono text-purple-300">
                  Final Match Score: <span className="text-white font-bold">{score}</span>
                </div>

                <button
                  onClick={handleStartGame}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 mx-auto transition-transform active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again</span>
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Konami sequence: ↑ ↑ ↓ ↓ ← → ← → B A</span>
              <button onClick={() => setActive(false)} className="text-slate-400 hover:text-white">
                Close Game
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
