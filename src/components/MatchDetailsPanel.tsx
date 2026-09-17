import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Activity, ShieldAlert, Shield } from 'lucide-react';
import { PlayerStats } from '../types';
import { Language } from '../lib/translations';

interface MatchDetailsPanelProps {
  player: PlayerStats | null;
  selectedMatch: any;
  agentData: any;
  language: Language;
  t: any;
}

export function MatchDetailsPanel({
  player,
  selectedMatch,
  agentData,
  language,
  t
}: MatchDetailsPanelProps) {
  if (!selectedMatch) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid lg:grid-cols-2 gap-8"
    >
      {/* Left Side: Telemetry */}
      <div className="val-card border-[#ff4655]/40 overflow-hidden flex flex-col h-[600px]">
        {/* Background Agent Graphic */}
        {agentData?.background && (
          <div 
            className="absolute inset-0 z-0 opacity-15 bg-no-repeat mix-blend-screen"
            style={{ 
              backgroundImage: `url(${agentData.background})`,
              backgroundSize: '100%',
              backgroundPosition: 'top center',
              WebkitMaskImage: 'linear-gradient(to bottom, white 20%, transparent 70%)',
              maskImage: 'linear-gradient(to bottom, white 20%, transparent 70%)'
            }}
          />
        )}
        <div className="absolute top-0 right-0 p-4 opacity-10 z-10 pointer-events-none">
          <Activity size={60} className="text-[#ff4655]" />
        </div>
        <h2 className="val-card-header"><Activity size={24} className="text-[#ff4655]" /> {language === "pt" ? "TELEMETRIA DA PARTIDA" : "MATCH TELEMETRY"}</h2>

        {/* Agent Portrait Inline */}
        <div className="relative flex-1 w-full flex items-end justify-center z-10 pt-10 mb-[-10px] pointer-events-none">
          {agentData?.portrait && (
            <img 
              src={agentData.portrait} 
              alt="Agent"
              className="w-full max-w-[280px] h-full max-h-[350px] object-contain object-bottom drop-shadow-[0_0_15px_rgba(255,70,85,0.4)]"
              style={{ 
                WebkitMaskImage: 'linear-gradient(to bottom, white 80%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, white 80%, transparent 100%)'
              }}
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <div className="p-8 relative z-20 space-y-4 bg-[#1f2933] shrink-0 border-t border-white/5">
          {(() => {
             const matchStats = selectedMatch.players?.all_players?.find((p: any) => p.name === player?.name);
             const kills = matchStats?.stats?.kills || 0;
             const deaths = matchStats?.stats?.deaths || 0;
             const assists = matchStats?.stats?.assists || 0;
             const kdRatio = deaths > 0 ? (kills / deaths).toFixed(2) : kills.toFixed(2);
             return (
               <>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-4 border-l-2 border-white/20">
                      <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">AGENT</span>
                      <p className="font-mono text-lg font-bold uppercase">{matchStats?.character || 'UNKNOWN'}</p>
                    </div>
                    <div className="bg-black/20 p-4 border-l-2 border-[#ff4655]">
                      <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">K/D RATIO</span>
                      <p className="font-mono text-lg font-bold uppercase">{kdRatio}</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black/20 p-3 text-center border-b-2 border-white/10">
                      <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">KILLS</span>
                      <p className="font-mono text-xl font-bold uppercase text-white">{kills}</p>
                    </div>
                    <div className="bg-black/20 p-3 text-center border-b-2 border-[#ff4655]/50">
                      <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">DEATHS</span>
                      <p className="font-mono text-xl font-bold uppercase text-[#ff4655]">{deaths}</p>
                    </div>
                    <div className="bg-black/20 p-3 text-center border-b-2 border-[#00b2a9]/50">
                      <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">ASSISTS</span>
                      <p className="font-mono text-xl font-bold uppercase text-[#00b2a9]">{assists}</p>
                    </div>
                 </div>
                 <div className="bg-black/30 p-4 border border-white/10 italic relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 top-0 group-hover:animate-scan-fast pointer-events-none" />
                   <span className="font-mono text-[9px] uppercase font-bold opacity-40 block mb-1">COMBAT SCORE</span>
                   <p className="font-mono text-2xl font-bold uppercase text-white">{matchStats?.stats?.score || 0}</p>
                 </div>
               </>
             )
          })()}
        </div>
      </div>

      {/* Right Side: Analysis */}
      <div className="val-card border-[#ff4655]/40 text-[#ece8e1] relative overflow-hidden flex flex-col h-[600px]">
        <div className="absolute top-0 right-0 p-2 opacity-10">
          <Shield size={60} className="text-[#ff4655]" />
        </div>
        
        <div className="absolute -top-1 left-0 w-full flex justify-center items-center z-20 px-8">
          <div className="bg-[#ff4655] text-white py-2 font-display text-base md:text-lg skew-x-[-10deg] italic flex items-center justify-center border-l-4 border-white w-full uppercase shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
            <ShieldAlert size={18} className="mr-3" />
            {t.errors.details}
          </div>
        </div>

        <div className="mt-8 relative flex-1 flex flex-col overflow-y-auto custom-scrollbar pr-2 min-h-0">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff4655] via-white/20 to-transparent" />
          <div className="pl-6 pb-6">
            <div className="flex items-center gap-2 mb-4 opacity-30">
              <span className="font-mono text-[9px] uppercase tracking-tighter">DATASET ID: {selectedMatch.metadata?.matchid?.slice(0, 8) || 'VAL_X'}</span>
              <div className="h-[1px] w-12 bg-white/20"></div>
              <span className="font-mono text-[9px] uppercase tracking-tighter">TIMESTAMP: {new Date().toLocaleTimeString()}</span>
            </div>
            
            <div className="font-mono text-[10px] md:text-xs leading-relaxed italic whitespace-pre-wrap text-white/90 uppercase [text-shadow:0_0_1px_rgba(255,255,255,0.2)] markdown-body space-y-3">
              <Markdown>{selectedMatch.analysis}</Markdown>
            </div>
          </div>
        </div>

        {/* technical footer for aesthetic */}
        <div className="mt-6 flex justify-end gap-2 pr-2">
          <div className="w-1 h-3 bg-red-500 opacity-40"></div>
          <div className="w-1 h-3 bg-red-400 opacity-40"></div>
          <div className="w-1 h-3 bg-red-600 opacity-40"></div>
        </div>
      </div>
    </motion.div>
  );
}
