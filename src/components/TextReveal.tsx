import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  trigger?: 'scroll' | 'mount';
  staggerDelay?: number;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  trigger = 'scroll',
  staggerDelay = 60,
  once = false,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(() => setIsShown(true), 60);
      return () => clearTimeout(timer);
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHiding(false);
          setIsShown(true);
          if (once) {
            observer.disconnect();
          }
        } else {
          if (!once) {
            setIsHiding(true);
            setIsShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [trigger, once]);

  const childrenArray = React.Children.toArray(children);
  const stateClass = isShown ? 'is-shown' : isHiding ? 'is-hiding' : '';

  return (
    <div
      ref={containerRef}
      className={`t-stagger ${stateClass} ${className}`.trim()}
      {...props}
    >
      {childrenArray.map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        const childProps = child.props as { className?: string; style?: React.CSSProperties };
        const existingClass = childProps.className || '';
        const delay = index * staggerDelay;

        return React.cloneElement(child, {
          key: index,
          className: `t-stagger-line t-stagger-line--${index + 1} ${existingClass}`.trim(),
          style: {
            ...(childProps.style || {}),
            transitionDelay: isShown ? `${delay}ms` : '0ms',
          },
        } as React.Attributes & { className: string; style: React.CSSProperties });
      })}
    </div>
  );
};

export default TextReveal;
