import React from 'react';
import { motion } from 'framer-motion';
import bodyImg from '../assets/tarun_front_body.png';
import handImg from '../assets/tarun_waving_hand.png';

interface PixelTarunCharacterProps {
  className?: string;
  isHovered?: boolean;
  isExcited?: boolean;
}

export const PixelTarunCharacter: React.FC<PixelTarunCharacterProps> = ({
  className = '',
  isHovered = false,
  isExcited = false,
}) => {
  return (
    <div
      className={`relative select-none aspect-[486/877] ${className}`}
      style={{
        imageRendering: 'pixelated',
      }}
    >
      {/* Ground Shadow */}
      <div
        className="w-[55%] h-3.5 rounded-full absolute -bottom-1 left-[22.5%] opacity-40 blur-[2px] transition-transform duration-300 pointer-events-none"
        style={{ background: 'var(--text-muted)' }}
      />

      {/* Solid Front-View Body: Grounded, completely stationary (no up and down movement) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={bodyImg}
          alt="Tarun Pixel Front View"
          className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
          draggable={false}
        />
      </div>

      {/* Real-time Waving Hand: Pivots exclusively at the wrist with ZERO vertical movement (stays 100% attached to sleeve) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transformOrigin: '86.83% 21.09%', // Exact wrist socket inside the gold cuff (422px / 486px, 185px / 877px)
        }}
        animate={{
          rotate: isHovered || isExcited
            ? [0, 14, -14, 14, -10, 12, 0] // Excited fast wave on hover or click
            : [0, 10, -10, 10, -6, 8, 0],   // Natural friendly waving gesture
        }}
        transition={{
          duration: isHovered || isExcited ? 0.75 : 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.22, 0.44, 0.65, 0.8, 0.9, 1],
        }}
      >
        <img
          src={handImg}
          alt="Tarun Waving Hand with Henna"
          className="w-full h-full object-contain select-none pointer-events-none"
          style={{
            imageRendering: 'pixelated',
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  );
};

export default PixelTarunCharacter;
