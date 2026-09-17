import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull } from 'lucide-react';
import { ProfileAnalysisResult } from '../types';

interface ProfileAnalysisCardProps {
  analyzing: boolean;
  profileAnalysis: ProfileAnalysisResult | null;
  t: any;
}

export function ProfileAnalysisCard({ analyzing, profileAnalysis, t }: ProfileAnalysisCardProps) {
  return (
    <AnimatePresence>
      {(analyzing || profileAnalysis) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="val-card bg-[#ff4655] text-white shadow-[0_0_40px_rgba(255,70,85,0.2)] max-h-[600px] flex flex-col"
        >
          <div className="absolute -top-1 left-0 w-full flex justify-center items-center z-20 px-6">
            <div className="bg-[#0f1923] text-white py-2 font-display text-sm tracking-widest skew-x-[-15deg] flex items-center justify-center border-l-4 border-white w-full">
              {t.dashboard.agentVerdict}
            </div>
          </div>
          
          {analyzing ? (
            <div className="pt-12 flex flex-col items-center justify-center h-48 gap-4">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Skull size={48} className="opacity-20" />
              </motion.div>
              <p className="font-mono text-[10px] uppercase tracking-widest animate-pulse opacity-50">{t.analysis.compiling}</p>
            </div>
          ) : profileAnalysis ? (
            <>
              <div className="pt-8 flex-shrink-0">
                <div className="bg-black/20 p-3 mb-4 border border-white/10">
                  <span className="font-mono text-[9px] uppercase font-bold opacity-60 block mb-1">{t.analysis.labels.archetype}</span>
                  <h3 className="font-display text-2xl italic tracking-tight uppercase leading-none mb-2">{profileAnalysis.archetype.title}</h3>
                  <p className="font-mono text-[9px] text-[#ece8e1]/70 leading-relaxed uppercase">{profileAnalysis.archetype.description}</p>
                </div>
              </div>

              <div className="overflow-y-auto custom-scrollbar pr-2 flex-1 space-y-4">
                <div className="grid gap-3">
                  <div className="bg-black/10 p-3 border-l-2 border-white/30">
                    <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">{t.analysis.labels.strategic}</span>
                    <p className="font-mono text-[11px] font-bold uppercase leading-relaxed italic line-clamp-3">{profileAnalysis.scoutingReport.rankLevel}</p>
                  </div>
                  <div className="bg-black/10 p-3 border-l-2 border-[#00b2a9]">
                    <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">{t.analysis.labels.mechanical}</span>
                    <p className="font-mono text-[11px] font-bold uppercase leading-relaxed italic line-clamp-3">{profileAnalysis.scoutingReport.mechanical}</p>
                  </div>
                </div>
                
                <div className="relative mt-2">
                   <div className="absolute -top-2 left-2 bg-black text-white text-[7px] font-bold px-1.5 py-0.5 uppercase tracking-tighter skew-x-[-15deg] z-20 border border-white/20">
                    {t.analysis.labels.verdictSummary}
                  </div>
                  <div className="bg-black/30 p-4 border border-white/10 italic relative overflow-hidden group">
                    {/* subtle scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 top-0 group-hover:animate-scan-fast pointer-events-none" />
                    <p className="font-mono text-[11px] font-bold uppercase leading-relaxed relative z-10">
                      {profileAnalysis.crushingSummary}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
