import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SpinningCounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  className?: string;
  spins?: number;
  duration?: number; // ms
  stagger?: number; // ms per column
  trigger?: 'scroll' | 'mount';
}

export const SpinningCounter: React.FC<SpinningCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  className = '',
  spins = 2,
  duration = 1400,
  stagger = 90,
  trigger = 'scroll',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const valueStr = String(value);
  const chars = valueStr.split('');

  const spin = useCallback(() => {
    setIsSpinning(true);
    setHasAnimated(true);

    const timer = setTimeout(() => {
      setIsSpinning(false);
    }, duration + chars.length * stagger + 50);

    return () => clearTimeout(timer);
  }, [chars.length, duration, stagger]);

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(() => spin(), 100);
      return () => clearTimeout(timer);
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          spin();
        } else {
          setHasAnimated(false);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [trigger, spin]);

  return (
    <div
      ref={containerRef}
      className={`t-reel cursor-pointer select-none inline-flex items-baseline ${className}`}
      onClick={spin}
      title="Click to re-spin"
      aria-label={`${prefix}${value}${suffix}`}
    >
      {/* Directional SVG filter for vertical-only motion blur from transitions.dev */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id="reel-vertical-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0 1.8" />
          </filter>
        </defs>
      </svg>

      {prefix && <span>{prefix}</span>}

      {chars.map((char, colIndex) => {
        const isDigit = /^\d$/.test(char);

        if (!isDigit) {
          return (
            <span key={colIndex} className="inline-block">
              {char}
            </span>
          );
        }

        const targetDigit = parseInt(char, 10);
        // Build digit reel: repeat 0-9 for each spin loop, then up to targetDigit
        const stripDigits: number[] = [];
        for (let s = 0; s < spins; s++) {
          for (let d = 0; d < 10; d++) {
            stripDigits.push(d);
          }
        }
        for (let d = 0; d <= targetDigit; d++) {
          stripDigits.push(d);
        }

        const targetOffsetEm = stripDigits.length - 1;
        const colDelay = colIndex * stagger;

        return (
          <div key={colIndex} className="t-reel-col">
            <div
              className="t-reel-strip"
              style={{
                transform: hasAnimated ? `translateY(-${targetOffsetEm}em)` : 'translateY(0)',
                transition: hasAnimated
                  ? `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${colDelay}ms`
                  : 'none',
                filter: isSpinning ? 'url(#reel-vertical-blur)' : 'none',
              }}
            >
              {stripDigits.map((digit, dIdx) => (
                <div key={dIdx} className="t-reel-digit">
                  {digit}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {suffix && <span className="ml-0.5">{suffix}</span>}
    </div>
  );
};

export default SpinningCounter;
