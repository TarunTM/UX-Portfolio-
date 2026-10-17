import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowUpRight, Sparkles } from 'lucide-react';
import PixelSpeechBubble from './PixelSpeechBubble';
import PixelTarunCharacter from './PixelTarunCharacter';

type DialogueState = 'greeting' | 'hiring' | 'exploring';

interface Particle {
  id: number;
  text: string;
  x: number;
}

export const PixelCompanion: React.FC = () => {
  const [dialogue, setDialogue] = useState<DialogueState>('greeting');
  const [isHovered, setIsHovered] = useState(false);
  const [isExcited, setIsExcited] = useState(false);

  // High-Five state
  const [highFiveCount, setHighFiveCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tarun_high_five_count');
      return saved ? parseInt(saved, 10) : 128;
    } catch {
      return 128;
    }
  });
  const [comboCount, setComboCount] = useState<number>(0);
  const [hasHighFived, setHasHighFived] = useState<boolean>(false);
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

  const handleChoice = (next: DialogueState) => {
    setDialogue(next);
    triggerExcitedWave();
  };

  const resetDialogue = () => {
    setDialogue('greeting');
    setHasHighFived(false);
    setComboCount(0);
    triggerExcitedWave();
  };

  const particleTexts = ['+1', '🔥 FIRE!', '❤️', '✨', '🔥', '✋', 'BOOM!'];

  const handleHighFive = () => {
    triggerExcitedWave();
    setHasHighFived(true);
    setComboCount((prev) => prev + 1);

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

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center select-none relative z-20">
      {/* Retro Pixel Speech Bubble */}
      <div className="w-full mb-4 relative">
        <PixelSpeechBubble tailX={180}>
          {/* Header Bar inside bubble */}
          <div className="flex items-center justify-between gap-2 border-b-2 border-black pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-black animate-pulse" />
              <span
                className="text-[9px] tracking-widest uppercase font-bold text-black"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                TARUN.EXE
              </span>
            </div>
            {dialogue !== 'greeting' && (
              <button
                onClick={resetDialogue}
                className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-neutral-600 hover:text-black font-bold cursor-pointer transition-colors"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
                title="Restart conversation"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>RESET</span>
              </button>
            )}
          </div>

          {/* Dialogue Message */}
          <AnimatePresence mode="wait">
            {dialogue === 'greeting' && (
              <motion.div
                key="greeting"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-2.5"
              >
                <div>
                  <h3
                    className="text-[9px] sm:text-[10px] font-bold text-black tracking-tight uppercase mb-1 whitespace-nowrap"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    HI! WHAT BRINGS YOU HERE ?
                  </h3>
                </div>

                {/* 2 Clean Choice Buttons */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => handleChoice('hiring')}
                    className="w-full text-left p-2.5 border-2 border-black bg-neutral-100 hover:bg-black text-black hover:text-white transition-colors duration-150 flex items-center justify-between text-[9px] sm:text-[10px] tracking-tight font-bold cursor-pointer group shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>▶ HIRING A DESIGNER</span>
                    <span className="text-[11px] opacity-70 group-hover:opacity-100">→</span>
                  </button>

                  <button
                    onClick={() => handleChoice('exploring')}
                    className="w-full text-left p-2.5 border-2 border-black bg-neutral-100 hover:bg-black text-black hover:text-white transition-colors duration-150 flex items-center justify-between text-[9px] sm:text-[10px] tracking-tight font-bold cursor-pointer group shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>▶ JUST EXPLORING</span>
                    <span className="text-[11px] opacity-70 group-hover:opacity-100">→</span>
                  </button>
                </div>
              </motion.div>
            )}

            {dialogue === 'hiring' && (
              <motion.div
                key="hiring"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-2.5"
              >
                <div
                  className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-black"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>READY TO SHIP 0→1</span>
                </div>
                <p
                  className="text-[12px] sm:text-[13px] text-neutral-800 leading-relaxed font-medium"
                  style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
                >
                  Open for opportunities! 1.5+ years shipping products. Ready to join immediately.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1.5">
                  <a
                    href="https://drive.google.com/file/d/1oXCa3UClaDoagkFoIhEj_m2gvM6hqlqM/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-2 border-2 border-black bg-black text-white hover:bg-neutral-800 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>RESUME</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href="#selected-work"
                    onClick={scrollToProjects}
                    className="inline-flex items-center gap-1 px-3 py-2 border-2 border-black bg-white text-black hover:bg-neutral-100 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>PROJECTS ↓</span>
                  </a>

                  <button
                    onClick={() => handleChoice('greeting')}
                    className="text-[9px] text-neutral-600 hover:text-black uppercase font-bold ml-auto cursor-pointer"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    ◀ BACK
                  </button>
                </div>
              </motion.div>
            )}

            {dialogue === 'exploring' && !hasHighFived && (
              <motion.div
                key="exploring-prompt"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <div
                    className="flex items-center gap-1 text-[8px] sm:text-[9px] uppercase font-bold text-black whitespace-nowrap"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>GIVE A HI FIVE&nbsp;✋</span>
                  </div>
                  <span
                    className="text-[8px] font-bold text-neutral-600 uppercase tracking-tight bg-neutral-100 px-1.5 py-0.5 border border-black/20 shrink-0 whitespace-nowrap"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    COUNT: {highFiveCount}
                  </span>
                </div>

                <p
                  className="text-[12px] sm:text-[13px] text-neutral-800 leading-relaxed font-medium"
                  style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
                >
                  Welcome to my corner of the web! Don't leave me hanging <strong className="text-black font-bold">tap my pixel twin below</strong> to give me a high five!
                </p>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <a
                    href="#selected-work"
                    onClick={scrollToProjects}
                    className="inline-flex items-center gap-1 px-3 py-2 border-2 border-black bg-white text-black hover:bg-neutral-100 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>PROJECTS ↓</span>
                  </a>

                  <button
                    onClick={() => handleChoice('greeting')}
                    className="text-[9px] text-neutral-600 hover:text-black uppercase font-bold cursor-pointer px-2"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    ◀ BACK
                  </button>
                </div>
              </motion.div>
            )}

            {dialogue === 'exploring' && hasHighFived && (
              <motion.div
                key="exploring-slapped"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <div
                    className="flex items-center gap-1 text-[8px] sm:text-[9px] uppercase font-bold text-black whitespace-nowrap"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>GIVE A HI FIVE&nbsp;✋</span>
                  </div>
                  <span
                    className="text-[8px] font-bold text-black uppercase tracking-tight bg-neutral-100 px-1.5 py-0.5 border-2 border-black shadow-[1px_1px_0px_#000] shrink-0 whitespace-nowrap"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    HIGH-FIVES: {highFiveCount}
                  </span>
                </div>

                <p
                  className="text-[12px] sm:text-[13px] text-neutral-800 leading-relaxed font-medium"
                  style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
                >
                  {comboCount >= 10
                    ? "WHOA! I think you like me!  Hope you like my work too!"
                    : comboCount >= 5
                    ? "You broke the high five meter! Check out my work!"
                    : comboCount >= 2
                    ? "Two for good measure! You've got great taste! Hope you like my work !"
                    : "Thanks for the high five! Enjoy exploring my work."}
                </p>

                {/* Combo / Power status callout (monochrome) */}
                <div className="flex items-center justify-center gap-2 py-2 px-3 border-2 border-dashed border-black bg-neutral-100 text-black shadow-[2px_2px_0px_#000]">
                  <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
                  <span
                    className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-black"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    {comboCount >= 10
                      ? 'MAX POWER! 🏆'
                      : comboCount >= 5
                      ? `COMBO X${comboCount}! ⚡`
                      : comboCount >= 2
                      ? `YOU'RE ON FIRE 🔥`
                      : 'BOOM! 💥'}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-black animate-pulse" />
                </div>

                {/* Actions: Explore Work & Back */}
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <a
                    href="#selected-work"
                    onClick={scrollToProjects}
                    className="inline-flex items-center gap-1 px-3 py-2 border-2 border-black bg-black text-white hover:bg-neutral-800 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    <span>PROJECTS ↓</span>
                  </a>

                  <button
                    onClick={() => {
                      setHasHighFived(false);
                      setComboCount(0);
                      handleChoice('greeting');
                    }}
                    className="text-[9px] text-neutral-600 hover:text-black uppercase font-bold cursor-pointer px-2"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    ◀ BACK
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PixelSpeechBubble>
      </div>

      {/* Front-View Pixel Character Display with Real-Time Animated Waving Arm */}
      <div
        onClick={() => {
          if (dialogue === 'exploring') {
            handleHighFive();
          } else {
            triggerExcitedWave();
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer flex flex-col items-center mt-2"
        title={dialogue === 'exploring' ? "Give Tarun a high-five!" : "Click to wave back!"}
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
          {dialogue === 'exploring' && (
            <div
              className="absolute -top-3 right-2 sm:right-4 z-30 pointer-events-none animate-bounce bg-amber-400 text-black px-2.5 py-0.5 border-2 border-black text-[8px] font-bold uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 whitespace-nowrap"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              <span>✋ GIVE A HI FIVE</span>
            </div>
          )}
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
