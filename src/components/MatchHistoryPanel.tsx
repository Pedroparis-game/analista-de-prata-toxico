import React from 'react';
import { motion } from 'motion/react';
import { PlayerStats } from '../types';

interface MatchHistoryPanelProps {
  player: PlayerStats;
  selectedMatch: any;
  handleMatchSelect: (match: any) => void;
  t: any;
}

export function MatchHistoryPanel({
  player,
  selectedMatch,
  handleMatchSelect,
  t
}: MatchHistoryPanelProps) {
  return (
    <div className="space-y-10">
      <div className="val-card">
        <h2 className="val-card-header">{t.match.history}</h2>
        
        <div className="space-y-4 mt-12 max-h-[350px] md:max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          {player.matches && player.matches.length > 0 ? (
            player.matches.map((match: any, idx: number) => {
              const stats = match.players?.all_players?.find((p: any) => p.name === player.name);
              const isWin = match.metadata?.mode === 'Deathmatch' ? false : (match.teams?.red?.has_won && stats?.team === 'Red') || (match.teams?.blue?.has_won && stats?.team === 'Blue');

              return (
                <motion.div
                  key={match.metadata?.matchid || idx}
                  whileHover={{ x: 8 }}
                  onClick={() => handleMatchSelect(match)}
                  className={`p-5 val-border cursor-pointer transition-all group hover-sweep ${selectedMatch?.metadata?.matchid === match.metadata?.matchid ? 'bg-[#ff4655] border-white' : 'bg-[#0f1923] hover:bg-[#2a3744]'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-display uppercase text-lg italic ${selectedMatch?.metadata?.matchid === match.metadata?.matchid ? 'text-white' : 'text-[#ff4655]'}`}>
                      {match.metadata?.map || t.match.unknownMap}
                    </span>
                    <span className={`text-[9px] font-mono px-3 py-1 skew-x-[-12deg] border ${isWin ? 'bg-[#00b2a9] text-white border-white/20' : 'bg-[#ff4655] text-white border-white/20'}`}>
                      {isWin ? t.match.win : t.match.loss}
                    </span>
                  </div>
                  <div className="flex gap-6 font-mono text-[9px] uppercase opacity-50 font-bold">
                    <span className="flex items-center gap-1">{t.match.agent} <span className="text-white">{stats?.character || 'RANDOM'}</span></span>
                    <span className="flex items-center gap-1">{t.match.kda} <span className={isWin ? 'text-[#00b2a9]' : 'text-[#ff4655]'}>{stats?.stats?.kills}/{stats?.stats?.deaths}/{stats?.stats?.assists}</span></span>
                    <span className="flex items-center gap-1">{t.match.points} <span className="text-white">{stats?.stats?.score}</span></span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#ece8e1]/10 bg-black/10">
              <p className="font-mono text-xs uppercase opacity-20 tracking-widest">{t.match.awaitingData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
