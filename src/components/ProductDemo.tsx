import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Cpu, 
  Loader2,
  Scan
} from 'lucide-react';

interface SampleItem {
  id: string;
  name: string;
  category: string;
  location: string;
  timeLost: string;
  description: string;
  lostImage: string;
  foundImage: string;
  foundLocation: string;
  matchScore: number;
  vectorDistance: number;
  detectedFeatures: string[];
  status: string;
}

const SAMPLE_ITEMS: SampleItem[] = [
  {
    id: 'item-1',
    name: 'Navy Leather Cardholder',
    category: 'Wallets & Bags',
    location: 'Central Library, 2nd Floor Study Desk',
    timeLost: 'Today at 02:15 PM',
    description: 'Dark navy leather cardholder with 3 credit card slots and a silver key ring attached.',
    lostImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    foundImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    foundLocation: 'Library Helpdesk Lost & Found Box #4',
    matchScore: 98.4,
    vectorDistance: 0.042,
    detectedFeatures: ['Navy blue leather grain', 'Metallic split key ring', 'Rectangular card slot geometry'],
    status: 'Verified Match'
  },
  {
    id: 'item-2',
    name: 'Bose QuietComfort 45 Headphones',
    category: 'Electronics',
    location: 'Engineering Building Auditorium B',
    timeLost: 'Yesterday at 11:30 AM',
    description: 'Black over-ear wireless headphones with minor scratch on the left ear cup hinge.',
    lostImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    foundImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    foundLocation: 'Campus Security Office Room 102',
    matchScore: 94.8,
    vectorDistance: 0.078,
    detectedFeatures: ['Matte black finish', 'Over-ear padded cup outline', 'Bose emblem OCR match'],
    status: 'Ready for Pickup'
  },
  {
    id: 'item-3',
    name: 'Hydro Flask Water Bottle (32oz)',
    category: 'Personal Effects',
    location: 'Recreation Center Basketball Court',
    timeLost: '3 days ago',
    description: 'Pacific Blue stainless steel bottle with National Park stickers on lower side.',
    lostImage: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    foundImage: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80',
    foundLocation: 'Gym Front Desk Lost & Found Bin',
    matchScore: 91.2,
    vectorDistance: 0.115,
    detectedFeatures: ['Pacific Blue powder coating', 'Yosemite sticker graphic vector', 'Flex cap loop'],
    status: 'Match Pending Claim'
  }
];

export const ProductDemo: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SampleItem>(SAMPLE_ITEMS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);

  const handleSelectScenario = (item: SampleItem) => {
    setSelectedItem(item);
    setClaimed(false);
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <section id="demo" className="py-20 md:py-28 bg-[#050508] border-y border-purple-900/40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#0D0B14] border border-purple-800/60 text-purple-300 text-xs font-semibold shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Demo Workspace</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            See multimodal AI match lost items in real-time
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Select a lost report scenario below to test how Gemini 1.5 extracts features and matches MongoDB Atlas records.
          </p>
        </div>

        {/* Knight Bite Dark Bento Card */}
        <div className="bg-[#0D0B14] rounded-3xl border border-purple-900/50 shadow-2xl shadow-purple-950/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Segmented Selector */}
          <div className="lg:col-span-4 p-5 bg-[#080610] border-b lg:border-b-0 lg:border-r border-purple-900/40 space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3 font-mono">
                1. Select Lost Report Scenario
              </h3>
              
              <div className="space-y-2.5">
                {SAMPLE_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectScenario(item)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center space-x-3 ${
                      selectedItem.id === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white border-purple-500 shadow-lg shadow-purple-600/30 scale-[1.01]'
                        : 'bg-[#0D0B14] border-purple-900/40 text-slate-200 hover:border-purple-600/60'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-purple-800/60">
                      <img src={item.lostImage} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{item.name}</div>
                      <div className={`text-[11px] truncate mt-0.5 ${selectedItem.id === item.id ? 'text-purple-100' : 'text-slate-400'}`}>
                        {item.location}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="pt-4 border-t border-purple-900/40 space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0D0B14] border border-purple-900/40">
                <span className="text-slate-400 font-sans">Vision Engine</span>
                <span className="text-purple-400 font-bold">Gemini 1.5 Flash</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0D0B14] border border-purple-900/40">
                <span className="text-slate-400 font-sans">Vector Index</span>
                <span className="text-slate-200 font-bold">MongoDB Atlas</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#0D0B14] border border-purple-900/40">
                <span className="text-slate-400 font-sans">Query Latency</span>
                <span className="text-emerald-400 font-bold">118 ms</span>
              </div>
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            
            {/* Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-purple-900/40 text-xs">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span className="font-medium text-slate-300">Reported {selectedItem.timeLost}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium">Vector Score:</span>
                {isAnalyzing ? (
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 font-bold border border-purple-800 animate-pulse">
                    Computing...
                  </span>
                ) : (
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-800">
                    {selectedItem.vectorDistance} (98.4% Confidence)
                  </span>
                )}
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-auto">
              
              {/* Lost Photo */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Reported Lost Photo</span>
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-800">
                    User Input
                  </span>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden border border-purple-900/50 aspect-video bg-black shadow-md">
                  <img src={selectedItem.lostImage} alt="Lost Item" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-3 flex flex-col justify-end text-white">
                    <span className="text-xs font-bold">{selectedItem.name}</span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" /> {selectedItem.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Matched Photo */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  {isAnalyzing ? (
                    <span className="text-purple-400 font-bold flex items-center gap-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching Records...
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Security Candidate Match
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                    Database Result
                  </span>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-purple-900/50 aspect-video bg-black shadow-md">
                  {isAnalyzing ? (
                    <div className="absolute inset-0 bg-black z-30 flex flex-col items-center justify-center space-y-2 p-4 text-center">
                      <Scan className="w-6 h-6 text-purple-400 animate-pulse" />
                      <div className="text-xs font-mono text-purple-300">Comparing 768-dim Visual Vector</div>
                    </div>
                  ) : (
                    <>
                      <img src={selectedItem.foundImage} alt="Found Candidate" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-3 flex flex-col justify-end text-white">
                        <span className="text-xs font-bold">Logged at Security Office</span>
                        <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {selectedItem.foundLocation}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Extracted Features */}
            <div className="bg-[#080610] rounded-2xl p-4 border border-purple-900/40 space-y-2">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                Gemini Extracted Visual Features
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {isAnalyzing ? (
                  <span className="text-purple-300 font-mono text-xs">Extracting features...</span>
                ) : (
                  selectedItem.detectedFeatures.map((feat, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#0D0B14] border border-purple-900/60 text-xs font-medium text-purple-200"
                    >
                      {feat}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Action */}
            <div className="pt-3 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-slate-400 text-center sm:text-left">
                Matches are calculated via vector cosine distance. No personal data stored.
              </p>

              <button
                onClick={() => setClaimed(true)}
                disabled={claimed || isAnalyzing}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full font-bold transition-all ${
                  claimed
                    ? 'bg-emerald-600 text-white'
                    : isAnalyzing
                    ? 'bg-purple-950 text-purple-400'
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white shadow-lg shadow-purple-600/30'
                }`}
              >
                {claimed ? 'Claim Request Sent' : 'Simulate Claim Request'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
