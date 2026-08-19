import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Database, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Cpu
} from 'lucide-react';

interface FeatureCard {
  icon: React.ReactNode;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  techBadge: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: <Sparkles className="w-5 h-5 text-purple-400" />,
    stepNumber: '01',
    title: 'Gemini Visual Feature Extraction',
    subtitle: 'Multimodal Vector Embeddings',
    description: 'Converts item photos and natural descriptions into 768-dimensional visual vectors, identifying texture, color distribution, and OCR labels despite poor lighting.',
    techBadge: 'Gemini 1.5 Flash'
  },
  {
    icon: <Database className="w-5 h-5 text-purple-400" />,
    stepNumber: '02',
    title: 'Sub-120ms Vector Search',
    subtitle: 'MongoDB Atlas $vectorSearch',
    description: 'Queries high-dimensional k-NN indices inside MongoDB Atlas, scoring visual cosine distance against candidate records in under 120 milliseconds.',
    techBadge: 'MongoDB Atlas'
  },
  {
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    stepNumber: '03',
    title: 'Native Android Kotlin UI',
    subtitle: 'Jetpack Compose Architecture',
    description: 'Built with 100% native Jetpack Compose and Spring Boot 3 backend. Uses Android CameraX for instant capture and WorkManager for offline report caching.',
    techBadge: 'Kotlin • Compose'
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    stepNumber: '04',
    title: 'Encrypted Ownership Claim',
    subtitle: 'Zero Public Data Exposure',
    description: 'Serial numbers and finder contact info remain encrypted. The system generates visual verification questions for claimants before releasing pickup notes.',
    techBadge: 'Encrypted Data'
  }
];

export const Features: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#050508]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0D0B14] border border-purple-900/50 text-purple-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture</span>
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Designed for speed. Built for privacy.
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Four focused subsystems working together to deliver instant, secure property recovery.
          </p>
        </div>

        {/* Knight Bite Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0D0B14] rounded-3xl p-8 border border-purple-900/50 hover:border-purple-500/60 shadow-xl shadow-purple-950/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-[#161224] border border-purple-800/60 flex items-center justify-center shadow-md">
                    {feature.icon}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#161224] text-purple-300 border border-purple-800/60">
                      {feature.techBadge}
                    </span>
                    <span className="font-sans font-extrabold text-xl text-purple-900">
                      {feature.stepNumber}
                    </span>
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-white mb-1">
                  {feature.title}
                </h3>
                
                <div className="text-xs font-semibold text-purple-400 mb-3">
                  {feature.subtitle}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Verified System Subsystem</span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Steps */}
        <div className="mt-12 bg-[#0D0B14] rounded-3xl p-8 border border-purple-900/50 shadow-xl">
          <h3 className="font-sans font-bold text-xl text-center mb-6 text-white tracking-tight">
            3 Steps from Loss to Recovery
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
            <div className="space-y-1.5 p-4 rounded-2xl bg-[#080610] border border-purple-900/40">
              <div className="font-bold text-sm text-purple-400 font-mono">01. Snap Photo</div>
              <p className="text-slate-300 leading-relaxed">Take a photo of a lost or found item. App captures location metadata.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-[#080610] border border-purple-900/40">
              <div className="font-bold text-sm text-purple-400 font-mono">02. Vector Search</div>
              <p className="text-slate-300 leading-relaxed">Gemini Flash generates embeddings. MongoDB calculates cosine similarity.</p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-[#080610] border border-purple-900/40">
              <div className="font-bold text-sm text-emerald-400 font-mono">03. Verified Claim</div>
              <p className="text-slate-300 leading-relaxed">Automated alert notifies owner and sends single-use verification code.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
