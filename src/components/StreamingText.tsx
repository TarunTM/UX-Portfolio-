import React, { useEffect, useState, useRef, useMemo } from 'react';

export interface StreamSegment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface StreamWord {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface StreamingTextProps {
  /** Array of styled text segments (words within each segment inherit the segment's style) */
  segments?: StreamSegment[];
  /** Plain text string to stream if segments are not provided */
  text?: string;
  /** Custom wrapper CSS class names */
  className?: string;
  /** Custom wrapper styles */
  style?: React.CSSProperties;
  /** HTML element type to render, defaults to 'p' */
  as?: React.ElementType;
  /** Delay before streaming starts in milliseconds (default: 180ms) */
  delay?: number;
  /** Gap between consecutive words in milliseconds (default: 48ms) */
  gap?: number;
}

export const StreamingText: React.FC<StreamingTextProps> = ({
  segments,
  text,
  className = '',
  style,
  as: Component = 'p',
  delay = 180,
  gap = 48,
}) => {
  const words: StreamWord[] = useMemo(() => {
    if (segments && segments.length > 0) {
      const parsed: StreamWord[] = [];
      segments.forEach((seg) => {
        const parts = seg.text.trim().split(/\s+/).filter(Boolean);
        parts.forEach((part) => {
          parsed.push({
            text: part,
            className: seg.className,
            style: seg.style,
          });
        });
      });
      return parsed;
    }
    if (text) {
      return text.trim().split(/\s+/).filter(Boolean).map((w) => ({ text: w }));
    }
    return [];
  }, [segments, text]);

  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCount(words.length);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasStarted, words.length]);

  useEffect(() => {
    if (!hasStarted || words.length === 0) return;

    let stepTimer: ReturnType<typeof setTimeout> | null = null;
    const startTimer = setTimeout(() => {
      let current = 0;
      const step = () => {
        current += 1;
        setVisibleCount(current);
        if (current < words.length) {
          stepTimer = setTimeout(step, gap);
        }
      };
      step();
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (stepTimer) clearTimeout(stepTimer);
    };
  }, [hasStarted, words.length, delay, gap]);

  return (
    <Component
      ref={containerRef as any}
      className={`t-stream ${className}`}
      style={style}
    >
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <span
            className={`t-stream-w ${idx < visibleCount ? 'is-in' : ''} ${word.className || ''}`}
            style={word.style}
          >
            {word.text}
          </span>
          {idx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Component>
  );
};
export default StreamingText;
