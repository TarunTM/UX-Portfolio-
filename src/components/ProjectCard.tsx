import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectCardProps {
  to: string;
  title: string;
  description: string;
  children: React.ReactNode;
  thumbBg?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  to,
  title,
  description,
  children,
  thumbBg,
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={`group flex flex-col w-full min-w-0 text-inherit no-underline cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-base)] rounded-2xl sm:rounded-[22px] ${className}`}
    >
      {/* ── Visual Media Banner ── */}
      <div 
        className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-[22px] overflow-hidden border border-black/[0.08] dark:border-white/[0.08] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-black/[0.18] dark:group-hover:border-white/[0.22] shadow-xs group-hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_20px_48px_-12px_rgba(0,0,0,0.65)]"
        style={{
          background: thumbBg || 'var(--bg-surface, #141822)',
        }}
      >
        {/* Subtle inner highlight rim for physical finish */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 dark:ring-white/[0.08] z-30" />

        <div className="w-full h-full relative overflow-hidden flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
          {children}
        </div>
      </div>

      {/* ── Info Row: Title + Tactile Arrow Disc & Description ── */}
      <div className="flex flex-col mt-4 sm:mt-4.5">
        {/* Title + Arrow Button */}
        <div className="flex items-center justify-between gap-3">
          <h3 
            className="text-xl sm:text-[22px] font-semibold tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
          >
            {title}
          </h3>
          
          <div 
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border border-black/[0.08] dark:border-white/[0.12] bg-black/[0.02] dark:bg-white/[0.04] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-black/25 dark:group-hover:border-white/25 group-hover:bg-black/[0.06] dark:group-hover:bg-white/[0.08] shrink-0"
            aria-hidden="true"
          >
            <ArrowUpRight 
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--text-muted)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Subtitle / One-Liner Description */}
        <p className="text-xs sm:text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors duration-300 font-normal leading-relaxed mt-1.5 line-clamp-2 m-0">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
