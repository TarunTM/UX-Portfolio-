import React, { useRef, useState, useEffect } from 'react';

interface PixelSpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
  tailX?: number; // X offset for tail from the left (px)
}

export const PixelSpeechBubble: React.FC<PixelSpeechBubbleProps> = ({
  children,
  className = '',
  tailX = 56,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 340, height: 160 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        // Snap to nearest 4px grid for crisp retro pixel art
        const w = Math.max(260, Math.round(offsetWidth / 4) * 4);
        const h = Math.max(100, Math.round(offsetHeight / 4) * 4);
        setDimensions({ width: w, height: h });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const W = dimensions.width;
  const H = dimensions.height;
  const snappedTailX = Math.max(24, Math.min(W - 48, Math.round(tailX / 4) * 4));

  return (
    <div className={`relative inline-block w-full max-w-full ${className}`}>
      {/* SVG Pixel Speech Bubble Background */}
      <svg
        width={W}
        height={H + 20}
        viewBox={`0 0 ${W} ${H + 20}`}
        className="absolute top-0 left-0 w-full h-[calc(100%+20px)] pointer-events-none select-none z-0"
        style={{ shapeRendering: 'crispEdges' }}
      >
        {/* Drop Shadow (4px offset) */}
        <path
          d={`
            M 8 4 H ${W - 8} V 8 H ${W - 4} V 12 H ${W} V ${H - 8} H ${W - 4} V ${H - 4} H ${W - 8} V ${H} H ${snappedTailX + 24}
            V ${H + 4} H ${snappedTailX + 20} V ${H + 16} H ${snappedTailX + 16} V ${H + 20} H ${snappedTailX + 8} V ${H + 16} H ${snappedTailX + 8} V ${H + 8} H ${snappedTailX + 4} V ${H + 4} H ${snappedTailX}
            H 8 V ${H - 4} H 4 V ${H - 8} H 0 V 12 H 4 V 8 H 8 Z
          `}
          fill="rgba(0,0,0,0.35)"
          transform="translate(4, 4)"
        />

        {/* White Interior Body & Tail Fill */}
        <path
          d={`
            M 8 0 H ${W - 8} V 4 H ${W - 4} V 8 H ${W} V ${H - 8} H ${W - 4} V ${H - 4} H ${W - 8} V ${H} H ${snappedTailX + 24}
            V ${H + 4} H ${snappedTailX + 20} V ${H + 16} H ${snappedTailX + 16} V ${H + 20} H ${snappedTailX + 8} V ${H + 16} H ${snappedTailX + 8} V ${H + 8} H ${snappedTailX + 4} V ${H + 4} H ${snappedTailX}
            H 8 V ${H - 4} H 4 V ${H - 8} H 0 V 8 H 4 V 4 H 8 Z
          `}
          fill="#FFFFFF"
        />

        {/* 4px Black Pixel Border */}
        {/* Top border */}
        <rect x="8" y="0" width={W - 16} height="4" fill="#000000" />
        
        {/* Top-left corner */}
        <rect x="4" y="4" width="4" height="4" fill="#000000" />
        <rect x="0" y="8" width="4" height="4" fill="#000000" />
        
        {/* Left vertical border */}
        <rect x="0" y="8" width="4" height={H - 16} fill="#000000" />
        
        {/* Bottom-left corner */}
        <rect x="0" y={H - 12} width="4" height="4" fill="#000000" />
        <rect x="4" y={H - 8} width="4" height="4" fill="#000000" />

        {/* Top-right corner */}
        <rect x={W - 8} y="4" width="4" height="4" fill="#000000" />
        <rect x={W - 4} y="8" width="4" height="4" fill="#000000" />
        
        {/* Right vertical border */}
        <rect x={W - 4} y="8" width="4" height={H - 16} fill="#000000" />
        
        {/* Bottom-right corner */}
        <rect x={W - 4} y={H - 12} width="4" height="4" fill="#000000" />
        <rect x={W - 8} y={H - 8} width="4" height="4" fill="#000000" />

        {/* Bottom border left of tail */}
        <rect x="8" y={H - 4} width={Math.max(0, snappedTailX - 8)} height="4" fill="#000000" />
        
        {/* Bottom border right of tail */}
        <rect x={snappedTailX + 24} y={H - 4} width={Math.max(0, W - snappedTailX - 32)} height="4" fill="#000000" />

        {/* Stepped Pixel Tail Border (matching reference image) */}
        <rect x={snappedTailX} y={H} width="4" height="4" fill="#000000" />
        <rect x={snappedTailX + 4} y={H + 4} width="4" height="4" fill="#000000" />
        <rect x={snappedTailX + 8} y={H + 8} width="4" height="8" fill="#000000" />
        <rect x={snappedTailX + 8} y={H + 16} width="16" height="4" fill="#000000" />
        <rect x={snappedTailX + 20} y={H} width="4" height="16" fill="#000000" />
      </svg>

      {/* Bubble Content with safe padding inside 4px borders */}
      <div
        ref={containerRef}
        className="relative z-10 px-5 pt-4 pb-4.5 sm:px-6 sm:pt-5 sm:pb-5 text-black"
        style={{ color: '#000000' }}
      >
        {children}
      </div>
    </div>
  );
};

export default PixelSpeechBubble;
