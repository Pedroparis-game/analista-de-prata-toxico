import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { Language } from '../lib/translations';

interface LoginScreenProps {
  t: any;
  language: Language;
  riotId: string;
  setRiotId: (val: string) => void;
  handleTrackerLogin: (e: React.FormEvent) => void;
  authLoading: boolean;
  supabaseError: string | null;
  gtaWasted: boolean;
  loginSuccessAnim: boolean;
}

export function LoginScreen({
  t,
  language,
  riotId,
  setRiotId,
  handleTrackerLogin,
  authLoading,
  supabaseError,
  gtaWasted,
  loginSuccessAnim
}: LoginScreenProps) {
  return (
    <motion.div 
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0f1923] flex items-center justify-center p-4 relative val-grid overflow-hidden"
    >
      <div className="absolute inset-0 bg-vignette pointer-events-none z-0" />
      <div className="scanline" />
      
      {/* GTA Wasted Overlay */}
      <AnimatePresence>
        {gtaWasted && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm mix-blend-multiply"
          >
            <motion.h1 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-red-600 font-display text-8xl md:text-[150px] uppercase tracking-widest font-black gta-text"
            >
              WASTED
            </motion.h1>
            <p className="font-mono text-white/50 tracking-widest uppercase mt-4">Player not found. RIP.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success/Loading Animation Overlay */}
      <AnimatePresence>
        {loginSuccessAnim && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0f1923] overflow-hidden">
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-[#0f1923]/80" />
              
              <motion.div 
                className="z-10 flex flex-col items-center"
                initial={{ scale: 0.9, filter: 'blur(10px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-6 mb-8">
                   <div className="w-24 h-24 border-2 border-[#ff4655] rounded-none rotate-45 flex items-center justify-center relative overflow-hidden bg-[#0f1923]">
                      <div className="absolute inset-0 bg-[#ff4655]/20 animate-pulse" />
                      <div className="w-12 h-12 bg-[#ff4655] -rotate-45" />
                   </div>
                   <div className="flex gap-2">
                      <div className="w-4 h-16 bg-[#ff4655] transform -skew-x-12 opacity-50" />
                      <div className="w-2 h-16 bg-[#ff4655] transform -skew-x-12 opacity-20" />
                   </div>
                </div>
                <h2 className="font-display text-4xl text-white uppercase tracking-[0.2em] italic">
                  {language === 'pt' ? 'CARREGANDO' : 'LOADING'}
                </h2>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="val-card w-full max-w-xl relative z-10 neon-glow mx-auto"
      >
        <h2 className="val-card-header justify-center !border-b-0">{t.login.header}</h2>

        <div className="text-center mb-8 md:mb-10 pt-4">
          <h1 className="font-display text-5xl md:text-8xl uppercase leading-[0.8] mb-6 tracking-tighter italic val-title-hover transition-all cursor-default">
            Silver <br /> <span className="text-[#ff4655] glitch-red">Analyst</span>
          </h1>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#ece8e1] opacity-50">
            {t.login.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          <form onSubmit={handleTrackerLogin} className="space-y-6">
            <div className="relative group">
              <label htmlFor="riotIdInput" className="sr-only">Riot ID</label>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff4655] transition-transform group-focus-within:scale-110" size={20} />
              <input 
                id="riotIdInput"
                type="text" 
                placeholder={t.login.placeholder}
                value={riotId}
                onChange={(e) => setRiotId(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-[#0f1923] border-b-2 border-[#ece8e1]/20 font-mono text-xl focus:outline-none focus:border-[#ff4655] transition-all placeholder:opacity-20 uppercase val-input-pulse"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={authLoading}
              className="val-btn val-btn-primary w-full text-2xl"
              aria-label={authLoading ? t.login.loading : t.login.button}
            >
              {authLoading ? t.login.loading : t.login.button}
            </button>
          </form>

          {supabaseError && (
            <div className="border-l-4 border-[#ff4655] bg-[#ff4655]/10 p-4 animate-pulse mt-4">
              <p className="text-[#ff4655] font-mono text-[10px] uppercase font-bold">
                ERROR: {supabaseError}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-[#ece8e1]/10 flex justify-between items-center">
            <span className="font-mono text-[9px] uppercase opacity-30">Ver. 2.0.0A</span>
            <p className="font-mono text-[9px] uppercase opacity-30 text-right max-w-[200px]">
              {t.login.footer}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements - Now anchored to a common container with the card if we want, but for now they stay here */}
      <div className="absolute top-10 left-10 flex gap-4 pointer-events-none">
        <div className="w-1 h-32 bg-[#ece8e1]/10" />
        <div className="w-1 h-12 bg-[#ff4655]/40" />
      </div>
      <div className="absolute bottom-10 right-10 flex gap-1 items-end pointer-events-none">
        <div className="w-8 h-1 bg-[#ece8e1]/20" />
        <div className="w-2 h-1 bg-[#ff4655]" />
        <div className="w-12 h-1 bg-[#ece8e1]/20" />
      </div>
    </motion.div>
  );
}
