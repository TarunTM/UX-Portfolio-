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
      className={`group flex flex-col w-full min-w-0 text-inherit no-underline cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-2xl sm:rounded-[22px] ${className}`}
    >
      {/* ── Visual Media Banner ── */}
      <div 
        className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-[22px] overflow-hidden border border-black/[0.06] dark:border-transparent shadow-xs transition-all duration-500 group-hover:shadow-md"
        style={{
          background: thumbBg || 'var(--bg-surface, #141822)',
        }}
      >
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
          {children}
        </div>
      </div>

      {/* ── Info Row: Title + Arrow & Description ── */}
      <div className="flex flex-col mt-4 sm:mt-4.5">
        {/* Title + Arrow */}
        <div className="flex items-center justify-between gap-3">
          <h3 
            className="text-xl sm:text-[22px] font-semibold tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
          >
            {title}
          </h3>
          
          <ArrowUpRight 
            className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-muted)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" 
          />
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
