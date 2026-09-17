import React from 'react';
import { motion } from 'motion/react';
import { Skull, Activity, Target, Shield, Zap, Brain, ShieldAlert, AlertTriangle, RotateCcw, User, Gamepad2 } from 'lucide-react';
import { HeroMedal } from './HeroMedal';
import { Language } from '../lib/translations';

export function LandingPage({ onEnter, t, language }: { onEnter: () => void, t: any, language: Language }) {
  return (
    <div className="min-h-screen bg-[#0f1923] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden val-grid moving-grid select-none cursor-default">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-vignette pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4655]/5 via-transparent to-[#00b2a9]/5 opacity-40 z-0" />
      
      {/* Decorative Floating Mesh */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-[#ff4655] rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-[#00b2a9] rounded-full blur-[150px] animate-pulse-slow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-20 text-center max-w-5xl w-full px-4"
      >
        <HeroMedal />

        <p className="font-mono text-xs md:text-lg text-[#ece8e1]/80 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 max-w-3xl mx-auto leading-relaxed font-light">
          {language === 'pt' ? (
            <>
              O PRIMEIRO MOTOR DE ROAST POR IA PARA
              <span className="text-[#ff4655] mt-1 md:mt-2 block font-semibold tracking-[0.3em] md:tracking-[0.4em]">COMUNIDADES GAMERS</span>
            </>
          ) : (
            <>
              THE FIRST SOCIAL AI ROAST ENGINE FOR
              <span className="text-[#ff4655] mt-1 md:mt-2 block font-semibold tracking-[0.3em] md:tracking-[0.4em]">GAMING COMMUNITIES</span>
            </>
          )}
        </p>

        <h1 className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-display uppercase italic tracking-tighter leading-[0.85] mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#ff4655]/40 drop-shadow-[0_15px_40px_rgba(255,70,85,0.25)] hover:scale-105 transition-transform duration-700">
          {t.landing.title.split(' ').map((word: string, i: number) => (
            <React.Fragment key={i}>
              {word}{i === 0 && <br />}
            </React.Fragment>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          <div className="inline-block py-2.5 px-6 md:px-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#ff4655] font-semibold flex items-center gap-3 whitespace-nowrap">
              <span className="w-2 h-2 bg-[#ff4655] rounded-full animate-ping" />
              {t.landing.infra}
            </span>
          </div>

          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(255, 70, 85, 0.4)",
              y: -3
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onEnter}
            className="bg-[#ff4655] text-white font-display text-2xl md:text-4xl px-8 md:px-12 py-4 md:py-5 rounded-full relative group overflow-hidden border border-white/20 shadow-[0_10px_20px_rgba(255,70,85,0.3)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-4 italic tracking-tight uppercase whitespace-nowrap">
              {t.landing.cta}
              <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </motion.button>
        </div>

        {/* Version & Credits */}
        <div className="mt-20 flex items-center justify-center gap-8 font-mono text-[9px] uppercase tracking-widest opacity-20">
          <span>{t.landing.enterprise}</span>
          <span className="w-1 h-1 bg-[#ece8e1] rounded-full" />
          <span>{t.landing.network}</span>
          <span className="w-1 h-1 bg-[#ece8e1] rounded-full" />
          <span>{t.landing.encryption}</span>
        </div>
      </motion.div>

      {/* Grid Scan Animation */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#ff4655]/5 to-transparent pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [0, 500] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-full h-[1px] bg-[#ff4655]/20 shadow-[0_0_20px_#ff4655]"
        />
      </div>
    </div>
  );
}
