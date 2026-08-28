import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return 'dark';
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] select-none">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
      
      {/* Tactile Capsule Segmented Toggle */}
      <button
        onClick={toggleTheme}
        className="w-16 h-8 bg-[#DFEAF0] dark:bg-[#262626] border border-[#C8D7DF] dark:border-[#383838] rounded-full p-1 relative flex items-center justify-between cursor-pointer select-none transition-colors duration-200"
        aria-label={`Toggle theme, current: ${theme}`}
      >
        {/* Animated Sliding Handle */}
        <motion.div
          layout
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 60,
            mass: 1,
          }}
          className="absolute w-6 h-6 bg-[#FFFFFF] dark:bg-[#3D3D3D] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_6px_rgba(0,0,0,0.3)] z-0"
          style={{
            left: theme === 'light' ? '4px' : 'calc(100% - 28px)',
          }}
        />

        {/* Sun Icon */}
        <div className="relative z-10 w-6 h-6 flex items-center justify-center pointer-events-none">
          <Sun className={`w-3.5 h-3.5 stroke-[2] transition-colors ${theme === 'light' ? 'text-[#000000]' : 'text-[#595F5D] dark:text-[#B6B6B6]'}`} />
        </div>

        {/* Moon Icon */}
        <div className="relative z-10 w-6 h-6 flex items-center justify-center pointer-events-none">
          <Moon className={`w-3.5 h-3.5 stroke-[2] transition-colors ${theme === 'dark' ? 'text-[#FFFFFF]' : 'text-[#595F5D] dark:text-[#B6B6B6]'}`} />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
