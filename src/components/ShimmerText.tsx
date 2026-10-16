import React from 'react';

interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
  duration?: string;
  band?: string;
}

export const ShimmerText: React.FC<ShimmerTextProps> = ({
  children,
  className = '',
  baseColor,
  highlightColor,
  duration,
  band,
  style,
  ...props
}) => {
  const customStyles: React.CSSProperties = {
    ...style,
    ...(baseColor ? ({ '--shimmer-base': baseColor } as React.CSSProperties) : {}),
    ...(highlightColor ? ({ '--shimmer-highlight': highlightColor } as React.CSSProperties) : {}),
    ...(duration ? ({ '--shimmer-dur': duration } as React.CSSProperties) : {}),
    ...(band ? ({ '--shimmer-band': band } as React.CSSProperties) : {}),
  };

  return (
    <span
      className={`t-shimmer ${className}`}
      data-text={children}
      style={customStyles}
      {...props}
    >
      {children}
    </span>
  );
};

export default ShimmerText;
