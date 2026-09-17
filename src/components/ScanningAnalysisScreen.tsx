import React from 'react';
import { motion } from 'motion/react';
import { Activity, Skull, Zap, Brain, Target, AlertTriangle } from 'lucide-react';
import { PlayerStats, ProfileAnalysisResult } from '../types';

interface ScanningAnalysisScreenProps {
  player: PlayerStats;
  analysisProgress: number;
  analyzing: boolean;
  profileAnalysis: ProfileAnalysisResult | null;
  setShowAnalysisScreen: (val: boolean) => void;
  t: any;
}

export function ScanningAnalysisScreen({
  player,
  analysisProgress,
  analyzing,
  profileAnalysis,
  setShowAnalysisScreen,
  t
}: ScanningAnalysisScreenProps) {
  return (
    <motion.div
      key="analysis"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#0f1923] flex flex-col items-center justify-center p-4 md:p-8 relative val-grid overflow-hidden"
    >
      <div className="absolute inset-0 bg-vignette pointer-events-none z-0" />
      <div className="scanline" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="val-card w-full max-w-4xl relative z-10 neon-glow"
      >
        {/* Scanning Animation Header */}
        <h2 className="val-card-header !justify-center"><Activity className="animate-pulse" size={18} /> {t.analysis.header} <Activity className="animate-pulse" size={18} /></h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-8 md:mt-10">
          {/* Player Card & Info */}
          <div className="md:w-1/3 space-y-6">
            <div className="relative group">
              <div className="val-border p-2 bg-black/40">
                <img 
                  src={player.card || "https://picsum.photos/seed/val/400/400"} 
                  className="w-full aspect-[1/1] object-cover border-2 border-[#ff4655]/30 group-hover:border-[#ff4655] transition-all" 
                  alt="Card"
                  referrerPolicy="no-referrer"
                />
                {/* Scan bar animation */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-[#ff4655] shadow-[0_0_15px_#ff4655] z-30 opacity-60"
                />
              </div>
              <div className="mt-4 text-center md:text-left">
                <h2 className="font-display text-4xl uppercase italic tracking-tighter truncate">{player.name}</h2>
                <p className="font-mono text-sm text-[#ff4655] font-bold">#{player.tag}</p>
              </div>
            </div>

            <div className="val-border p-4 bg-black/20 space-y-4">
              <div className="flex justify-between items-end border-b border-[#ece8e1]/10 pb-2">
                <span className="font-mono text-[10px] uppercase opacity-40">{t.analysis.rankLabel}</span>
                <span className="font-display text-xl text-[#00b2a9]">{player.rank || '??'}</span>
              </div>
              <div className="flex justify-between items-end border-b border-[#ece8e1]/10 pb-2">
                <span className="font-mono text-[10px] uppercase opacity-40">{t.analysis.statusLabel}</span>
                <span className="font-mono text-[10px] text-[#ff4655] animate-pulse">
                  {analysisProgress < 100 ? t.analysis.tracking : t.analysis.complete}
                </span>
              </div>
            </div>
          </div>

          {/* AI Analysis Reveal */}
          <div className="md:w-2/3 flex flex-col justify-between">
            <div className="val-border bg-black/40 p-6 flex-1 relative overflow-y-auto max-h-[400px] custom-scrollbar">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-[#ff4655] rounded-full animate-ping" />
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">{t.analysis.verdictTitle}</span>
              </div>

              {analyzing ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Skull size={48} className="text-[#ff4655] opacity-20" />
                  </motion.div>
                  <p className="font-mono text-xs uppercase tracking-widest opacity-30 animate-pulse">{t.analysis.compiling}</p>
                </div>
              ) : profileAnalysis ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Archetype Header */}
                  <div className="border-l-4 border-[#ff4655] pl-4 py-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap size={14} className="text-[#ff4655]" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff4655] font-bold">{t.analysis.labels.archetype}</span>
                    </div>
                    <h4 className="font-display text-2xl italic uppercase text-white">{profileAnalysis.archetype.title}</h4>
                    <p className="font-mono text-[11px] opacity-60 uppercase">{profileAnalysis.archetype.description}</p>
                  </div>

                  {/* Scouting Report Grid */}
                  <div className="grid gap-4">
                    <div className="bg-white/5 p-4 val-border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain size={16} className="text-[#00b2a9]" />
                        <span className="font-mono text-[10px] uppercase font-bold text-[#00b2a9]">{t.analysis.labels.strategic}</span>
                      </div>
                      <p className="font-mono text-xs leading-relaxed italic opacity-80 uppercase">{profileAnalysis.scoutingReport.rankLevel}</p>
                    </div>

                    <div className="bg-white/5 p-4 val-border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={16} className="text-[#ff4655]" />
                        <span className="font-mono text-[10px] uppercase font-bold text-[#ff4655]">{t.analysis.labels.mechanical}</span>
                      </div>
                      <p className="font-mono text-xs leading-relaxed italic opacity-80 uppercase">{profileAnalysis.scoutingReport.mechanical}</p>
                    </div>

                    <div className="bg-white/5 p-4 val-border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-yellow-500" />
                        <span className="font-mono text-[10px] uppercase font-bold text-yellow-500">{t.analysis.labels.stability}</span>
                      </div>
                      <p className="font-mono text-xs leading-relaxed italic opacity-80 uppercase">{profileAnalysis.scoutingReport.mental}</p>
                    </div>
                  </div>

                  {/* tactical separator */}
                  <div className="py-2 flex items-center justify-between opacity-30">
                    <div className="h-[1px] flex-1 bg-white/20"></div>
                    <span className="mx-4 font-mono text-[8px] tracking-[0.4em]">VERDICT PROTOCOL V3.1</span>
                    <div className="h-[1px] flex-1 bg-white/20"></div>
                  </div>

                  {/* Final Verdict */}
                  <div className="relative group">
                    <div className="absolute -top-3 -left-2 bg-[#ff4655] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-tighter skew-x-[-15deg] z-20">
                      {t.analysis.labels.finalVerdict}
                    </div>
                    <div className="val-border bg-[#1f2933] border-[#ff4655]/40 p-5 relative overflow-hidden">
                      {/* Technical grid background */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                      
                      <p className="font-mono text-sm leading-relaxed text-[#ece8e1] whitespace-pre-wrap italic uppercase relative z-10">
                        {profileAnalysis.crushingSummary}
                      </p>
                      
                      {/* Decorative corner */}
                      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-[#ff4655]"></div>
                        <div className="absolute bottom-0 right-0 h-[2px] w-4 bg-[#ff4655]"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center p-8 opacity-20 font-mono italic">
                  {t.analysis.empty}
                </div>
              )}
            </div>

            {/* Progress Bar & Actions */}
            <div className="mt-8 space-y-6">
              <div className="w-full h-1.5 bg-black/50 overflow-hidden val-border !border-[#ece8e1]/10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  className="h-full bg-[#ff4655] shadow-[0_0_10px_#ff4655]"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setShowAnalysisScreen(false)}
                  className="val-btn flex-1 text-xl val-btn-primary"
                  aria-label={t.analysis.accessButton}
                >
                  {t.analysis.accessButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-20">
        <div className="writing-vertical-rl font-mono text-[10px] uppercase tracking-[0.5em]">{t.analysis.protocol}</div>
        <div className="w-[1px] h-32 bg-[#ece8e1]" />
      </div>
    </motion.div>
  );
}
