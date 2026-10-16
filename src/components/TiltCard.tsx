import React, { useRef, useCallback } from 'react';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  cardStyle?: React.CSSProperties;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  showGlare?: boolean;
}

/**
 * 3D Tilt Transition from transitions.dev
 *
 * An interactive card that tilts in 3D toward the pointer on hover/drag
 * with a cursor-tracked soft light glare. Flattens on prefers-reduced-motion.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  cardClassName = '',
  cardStyle,
  maxTilt = 14,
  perspective,
  scale,
  showGlare = true,
  ...props
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    const tilt = tiltRef.current;
    const card = cardRef.current;
    if (!tilt || !card) return;

    tilt.classList.remove('is-hover');
    card.classList.remove('is-tilting');
    card.style.setProperty('--tilt-rx', '0deg');
    card.style.setProperty('--tilt-ry', '0deg');
    card.style.setProperty('--tilt-scale', '1');
  }, []);

  const track = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const tilt = tiltRef.current;
      const card = cardRef.current;
      if (!tilt || !card) return;

      const r = tilt.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));

      tilt.classList.add('is-hover');
      card.classList.add('is-tilting');
      card.style.setProperty('--tilt-ry', `${((px - 0.5) * maxTilt).toFixed(2)}deg`);
      card.style.setProperty('--tilt-rx', `${((0.5 - py) * maxTilt).toFixed(2)}deg`);
      card.style.setProperty('--tilt-gx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--tilt-gy', `${(py * 100).toFixed(1)}%`);
      if (scale !== undefined) {
        card.style.setProperty('--tilt-scale', `${scale}`);
      }
    },
    [maxTilt, scale]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' && tiltRef.current) {
      try {
        tiltRef.current.setPointerCapture(e.pointerId);
      } catch (_) {
        // Pointer capture fallback
      }
    }
  }, []);

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'mouse') {
        reset();
      }
    },
    [reset]
  );

  const mergedCardStyle: React.CSSProperties = {
    ...(perspective ? ({ '--tilt-perspective': `${perspective}px` } as React.CSSProperties) : {}),
    ...cardStyle,
  };

  return (
    <div
      ref={tiltRef}
      className={`t-tilt ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={track}
      onPointerUp={reset}
      onPointerCancel={reset}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <div ref={cardRef} style={mergedCardStyle} className={`t-tilt-card ${cardClassName}`}>
        {children}
        {showGlare && <div className="t-tilt-glare" />}
      </div>
    </div>
  );
};

export default TiltCard;
