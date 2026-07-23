import React from 'react';
import { motion } from 'framer-motion';

export type DividerVariant = 'faded' | 'accent' | 'dot' | 'minimal';

interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'faded',
  className = '',
}) => {
  return (
    <div className={`relative w-full overflow-hidden py-1 flex items-center justify-center ${className}`}>
      {variant === 'faded' && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.92 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="divider-faded"
        />
      )}

      {variant === 'accent' && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.92 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="divider-glow"
        />
      )}

      {variant === 'dot' && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center"
        >
          <div className="divider-faded" />
          <div className="absolute w-2 h-2 rounded-full bg-accent/80 border border-bg-base shadow-[0_0_8px_rgba(0,180,216,0.5)] z-10" />
        </motion.div>
      )}

      {variant === 'minimal' && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0.95 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="h-[1px] w-full max-w-3xl mx-auto opacity-30"
          style={{ background: 'var(--separator)' }}
        />
      )}
    </div>
  );
};

export default SectionDivider;
