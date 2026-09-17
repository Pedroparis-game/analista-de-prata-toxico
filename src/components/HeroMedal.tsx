import React from 'react';
import { motion } from 'motion/react';

export function HeroMedal() {
  return (
    <div className="relative mx-auto mb-6 md:mb-10 flex flex-col items-center justify-center" style={{ perspective: 1000 }}>
      <motion.img
        src="https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/largeicon.png"
        alt="Silver Rank"
        className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] relative z-10"
        referrerPolicy="no-referrer"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      
      {/* Sombra base suave no chão para o efeito "flutuante" */}
      <div className="w-32 h-4 md:w-40 md:h-5 bg-black/80 blur-[14px] rounded-full absolute -bottom-4 pointer-events-none z-0" />
    </div>
  );
}
