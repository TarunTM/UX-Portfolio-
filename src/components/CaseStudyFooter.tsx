import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import ValorantGame from './ValorantGame';

const LinkedInIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.1a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63A1.63 1.63 0 0 0 7.86 6.1Z" />
  </svg>
);

interface CaseStudyFooterProps {
  nextProject: {
    id: string;
    title?: string;
    name?: string;
    path?: string;
  };
}

export const CaseStudyFooter: React.FC<CaseStudyFooterProps> = ({ nextProject }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('tarunmadan2506@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextPath = nextProject.path || `/work/${nextProject.id}`;

  return (
    <footer className="mt-14 sm:mt-20 flex flex-col">
      
      {/* ── 1. CASE STUDY NAVIGATION BAR ────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 w-full pb-8 sm:pb-10">
        <button
          onClick={() => {
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group px-1 py-1"
          aria-label="Return to Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Portfolio</span>
        </button>

        <button
          onClick={() => {
            navigate(nextPath);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:border-[var(--text-primary)] hover:shadow-sm cursor-pointer group"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          aria-label="Next Case Study"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            Next Case Study
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transform group-hover:translate-x-1 transition-transform ml-0.5" />
        </button>
      </div>

      {/* ── DIVIDER BELOW NAVIGATION BUTTONS ────────────────────── */}
      <div className="w-full border-t border-[var(--border-card)] mb-10 sm:mb-14" />

      {/* ── TACTICAL MINIGAME (AFTER NEXT CASE STUDY, ABOVE FOOTER) ─ */}
      <div className="w-full pb-10 sm:pb-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Just for fun
            </p>
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Aim Labs{' '}
              <span
                style={{
                  fontFamily: 'Instrument Serif, Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                Minigame
              </span>
            </h2>
          </div>
          <span
            className="text-[10px] font-mono uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="hidden sm:inline">Click to Shoot</span>
            <span className="sm:hidden">Tap to Shoot</span>
          </span>
        </div>
        <ValorantGame />
      </div>

      {/* ── DIVIDER ─────────────────────────────────────────────── */}
      <div className="w-full border-t border-[var(--border-card)]" />

      {/* ── 2. "LET'S TALK" CONTACT HERO SECTION ───────────────── */}
      <div className="flex flex-col items-center text-center gap-3.5 sm:gap-4.5 pt-4 sm:pt-5 pb-8 sm:pb-10 px-4">
        
        {/* Signature script */}
        <span 
          className="text-2xl sm:text-3xl text-[var(--text-secondary)] tracking-wide select-none font-medium leading-none"
          style={{ fontFamily: "'Caveat', 'Alex Brush', cursive, sans-serif" }}
        >
          Tarun Madan
        </span>

        {/* Catchy headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] max-w-xl mx-auto leading-snug">
          Got a project in mind or just<br className="hidden sm:inline" /> curious? Let's talk.
        </h2>

        {/* Contact Action Pills (Mail & LinkedIn) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          {/* Email Button with Copy & Direct Feedback */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[var(--border-card)] hover:border-[var(--text-primary)] bg-[var(--bg-card)]/50 text-[var(--text-primary)] text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer group"
            title="Click to copy email address"
            aria-label="Copy email address"
          >
            <span className="text-[var(--text-muted)] group-hover:text-accent transition-colors font-mono">@</span>
            <span className="font-mono text-xs sm:text-sm">tarunmadan2506@gmail.com</span>
            {copied ? (
              <span className="flex items-center gap-1 text-emerald-500 font-sans text-xs ml-1 animate-fade-in">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Copied</span>
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors ml-0.5 shrink-0" />
            )}
          </button>

          {/* LinkedIn Pill */}
          <a
            href="https://www.linkedin.com/in/taruntm/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[var(--border-card)] hover:border-[var(--text-primary)] bg-[var(--bg-card)]/50 text-[var(--text-primary)] text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer group"
            aria-label="Open Tarun's LinkedIn Profile"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2] dark:text-[#38bdf8] shrink-0" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors ml-0.5" />
          </a>

        </div>

      </div>

      {/* ── 3. BOTTOM COPYRIGHT SUB-FOOTER ─────────────────────── */}
      <div className="flex items-center justify-center text-center text-[11px] font-mono text-[var(--text-muted)] pb-8 -mt-2">
        <span>© {new Date().getFullYear()} Tarun. All rights reserved.</span>
      </div>

    </footer>
  );
};

export default CaseStudyFooter;
