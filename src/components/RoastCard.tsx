import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull, AlertTriangle, RotateCcw } from 'lucide-react';
import Markdown from 'react-markdown';
import { TwitterShareButton } from 'react-share';

interface RoastCardProps {
  loading: boolean;
  lastRoast: string | null;
  triggerShake: boolean;
  setLastRoast: (val: string | null) => void;
  setInput: (val: string) => void;
  t: any;
}

export function RoastCard({
  loading,
  lastRoast,
  triggerShake,
  setLastRoast,
  setInput,
  t
}: RoastCardProps) {
  return (
    <AnimatePresence>
      {(loading || lastRoast) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: triggerShake ? [-12, 12, -10, 10, -5, 5, 0] : 0,
            rotate: triggerShake ? [-1, 1, -1, 1, 0] : 0,
            scale: triggerShake ? [1, 1.05, 1] : 1,
            boxShadow: triggerShake 
              ? "0 0 80px rgba(255, 70, 85, 0.8), inset 0 0 40px rgba(255, 70, 85, 0.4)" 
              : "0 0 15px rgba(255, 70, 85, 0.2)",
            borderColor: "#ff4655"
          }}
          transition={{ 
            duration: triggerShake ? 0.3 : 0.5,
            ease: "easeInOut"
          }}
          className={`val-card transition-colors duration-150 border-2 border-[#ff4655]/40 mb-8 min-h-[200px] flex flex-col justify-center`}
        >
          {/* Background Glitch Overlay */}
          {triggerShake && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.1, 0.3, 0] }}
              className="absolute inset-0 bg-[#ff4655] pointer-events-none z-0"
            />
          )}

          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
            <AlertTriangle size={60} className="text-[#ff4655]" />
          </div>

          <h2 className={`val-card-header ${triggerShake ? "text-white" : ""}`}><AlertTriangle size={24} /> {loading ? t.analysis.compiling : (triggerShake ? t.dashboard.eliminated : t.dashboard.finalVerdict)}</h2>

          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ff4655 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 pt-10">
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Skull size={48} className="text-[#ff4655]" />
                </motion.div>
                <p className="font-mono text-xs uppercase tracking-widest opacity-30 animate-pulse">{t.dashboard.generatingRoast}</p>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff4655] via-white/20 to-transparent" />
                <div className="pl-6">
                  <div className={`text-left font-mono text-xs md:text-sm leading-relaxed uppercase italic whitespace-pre-wrap transition-all duration-150 markdown-body space-y-3 ${triggerShake ? 'text-white glitch-red' : 'text-white/90 [text-shadow:0_0_1px_rgba(255,255,255,0.2)]'}`}>
                    <Markdown>{lastRoast}</Markdown>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setLastRoast(null);
                      setInput('');
                    }}
                    className="val-btn val-btn-secondary w-full py-3 text-sm"
                    aria-label={t.dashboard.newSubmission}
                  >
                    <RotateCcw size={18} />
                    {t.dashboard.newSubmission}
                  </button>
                  <TwitterShareButton 
                    url="https://silver-analyst.example.com" 
                    title={`"${lastRoast}"\n\n`}
                    hashtags={['Valorant', 'SilverAnalyst']}
                    className="w-full"
                  >
                    <div className="val-btn val-btn-secondary w-full py-3 text-sm bg-[#1DA1F2]/10 border-[#1DA1F2]/30 hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/20 text-[#1DA1F2] flex items-center justify-center gap-2">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                      {t.dashboard.shareTwitter}
                    </div>
                  </TwitterShareButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
