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
      <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary select-none">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
      
      {/* Tactile Slider Switch */}
      <button
        onClick={toggleTheme}
        className="w-14 h-7 bg-bg-surface border border-border-card rounded-full p-0.5 relative flex items-center cursor-pointer select-none transition-colors duration-300"
        aria-label={`Toggle theme, current: ${theme}`}
      >
        {/* Static Background Icons */}
        <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none text-text-secondary">
          <Moon className="w-3.5 h-3.5 opacity-60" />
          <Sun className="w-3.5 h-3.5 opacity-60" />
        </div>

        {/* Animated Sliding Handle */}
        <motion.div
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className="w-5.5 h-5.5 bg-text-primary rounded-full shadow-md z-10 flex items-center justify-center"
          style={{
            marginLeft: theme === 'light' ? 'auto' : '0',
          }}
        >
          {theme === 'light' ? (
            <Sun className="w-3.5 h-3.5 text-amber-500" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-accent" />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;
