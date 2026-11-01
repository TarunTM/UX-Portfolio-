import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import PixelSpeechBubble from './PixelSpeechBubble';
import PixelTarunCharacter from './PixelTarunCharacter';

interface Particle {
  id: number;
  text: string;
  x: number;
}

export const PixelCompanion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const [hasHighFived, setHasHighFived] = useState<boolean>(false);
  const [highFiveCount, setHighFiveCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tarun_high_five_count');
      return saved ? parseInt(saved, 10) : 128;
    } catch {
      return 128;
    }
  });
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerExcitedWave = () => {
    setIsExcited(true);
    setTimeout(() => setIsExcited(false), 2400);
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerExcitedWave();
    const el = document.getElementById('selected-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const particleTexts = ['+1', '🔥 FIRE!', '✨ VIBE!', '✋', 'BOOM!', 'VIBE CHECK ✅', '100% 🔥'];

  const handleHighFive = () => {
    triggerExcitedWave();
    setHasHighFived(true);

    setHighFiveCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem('tarun_high_five_count', next.toString());
      } catch {}
      return next;
    });

    const id = Date.now() + Math.random();
    const text = particleTexts[Math.floor(Math.random() * particleTexts.length)];
    const x = (Math.random() - 0.5) * 60;

    setParticles((prev) => [...prev.slice(-6), { id, text, x }]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  const resetHighFive = () => {
    setHasHighFived(false);
    triggerExcitedWave();
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center select-none relative z-20">
      {/* Retro Pixel Speech Bubble */}
      <div 
        className={`w-full mb-4 relative ${!hasHighFived ? 'cursor-pointer' : ''}`}
        onClick={!hasHighFived ? handleHighFive : undefined}
      >
        <PixelSpeechBubble tailX={180}>
          {/* Dialogue Message */}
          <AnimatePresence mode="wait">
            {!hasHighFived ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center py-1"
              >
                <span
                  className="text-[10px] sm:text-[11px] font-bold text-black uppercase tracking-tight text-center whitespace-nowrap"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  GIVE ME A HI FIVE ✋
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="vibe-check-response"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-2 py-0.5"
              >
                <p
                  className="text-[13px] sm:text-[14px] text-neutral-900 leading-snug font-semibold text-center sm:text-left"
                  style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
                >
                  You passed the Vibe check! Check out my work 
                </p>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <a
                    href="#selected-work"
                    onClick={scrollToProjects}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-black text-white hover:bg-neutral-800 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>PROJECTS ↓</span>
                  </a>

                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHighFive();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 border-2 border-black bg-neutral-100 hover:bg-neutral-200 text-black text-[8px] sm:text-[9px] font-bold uppercase transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                      title="High-five count"
                    >
                      <span>✋ {highFiveCount}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        resetHighFive();
                      }}
                      className="p-1.5 text-neutral-500 hover:text-black transition-colors cursor-pointer"
                      title="Reset"
                      aria-label="Reset"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PixelSpeechBubble>
      </div>

      {/* Front-View Pixel Character Display with Real-Time Animated Waving Arm */}
      <div
        onClick={handleHighFive}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer flex flex-col items-center mt-2"
        title="Give Tarun a high-five!"
      >
        {/* Floating Arcade High-Five Particles bursting from character */}
        <div className="pointer-events-none absolute inset-x-0 -top-6 flex justify-center z-50">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, y: 0, scale: 0.8, x: p.x }}
                animate={{ opacity: 0, y: -65, scale: 1.3, x: p.x + (p.x > 0 ? 16 : -16) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute text-[11px] sm:text-[13px] font-bold text-amber-300 select-none whitespace-nowrap bg-black px-2.5 py-1 border-2 border-amber-400 shadow-[2px_2px_0px_#000]"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {p.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Character Component */}
        <div className="relative transition-transform duration-200 group-hover:scale-105 active:scale-95 flex flex-col items-center">
          <div
            className={`absolute -top-3 right-2 sm:right-4 z-30 pointer-events-none animate-bounce px-2.5 py-0.5 border-2 border-black text-[8px] font-bold uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 whitespace-nowrap ${
              hasHighFived ? 'bg-[#C8FF3D] text-black' : 'bg-amber-400 text-black'
            }`}
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            <span>{hasHighFived ? '✨ VIBE CHECKED!' : '✋ TAP TO HI-FIVE'}</span>
          </div>

          <PixelTarunCharacter
            isHovered={isHovered}
            isExcited={isExcited}
            className="h-56 sm:h-64 w-auto drop-shadow-md"
          />
        </div>

        {/* Retro Tag underneath character */}
        <div className="flex items-center gap-1.5 mt-2 bg-black/80 dark:bg-white/10 px-2.5 py-0.5 border border-black/20 dark:border-white/20">
          <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
          <span
            className="text-[8px] uppercase tracking-wider text-white font-bold opacity-80"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            [TARUN'S PIXEL TWIN]
          </span>
        </div>
      </div>
    </div>
  );
};

export default PixelCompanion;
