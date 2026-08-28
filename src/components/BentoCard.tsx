import React from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  colSpan?: string;
  rowSpan?: string;
  delay?: number;
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  id,
  colSpan = 'col-span-1',
  rowSpan = '',
  delay = 0,
  onClick,
}) => {
  const isClickable = !!onClick;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom ease-out
      }}
      whileHover={
        isClickable
          ? {
              y: -5,
              borderColor: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow-hover)',
            }
          : undefined
      }
      onClick={onClick}
      className={`
        bg-bg-card/90 
        border border-border-card 
        rounded-3xl 
        p-6 md:p-8 
        relative 
        overflow-hidden 
        transition-colors 
        duration-300 
        ${colSpan} 
        ${rowSpan} 
        ${isClickable ? 'cursor-pointer select-none' : ''} 
        ${className}
      `}
    >
      {/* Subtle radial inner glow effect */}
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export default BentoCard;
