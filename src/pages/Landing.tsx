import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import Navbar from '../components/Navbar';
import UXGame from '../components/UXGame';
import figjamIcon from '../assets/figjam-icon-filled-256 1.png';
import wixStudioIcon from '../assets/wix-studio.png';
import antigravityIcon from '../assets/antigravity-icon__full-color.png';
import socialSlateLogo from '../assets/SS- OG colors.png';

// ── Tool Icon Components ──────────────────────────────────────────────
const FigmaIcon = () => (
  <svg viewBox="0 0 12 18" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 0a3 3 0 0 0-3 3 3 3 0 0 0 3 3h3V0H3z" fill="#F24E1E"/>
    <path d="M9 0H6v6h3a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="#FF7262"/>
    <path d="M6 6H3a3 3 0 0 0-3 3 3 3 0 0 0 3 3h3V6z" fill="#A259FF"/>
    <path d="M0 15a3 3 0 0 0 3 3h3v-6H3a3 3 0 0 0-3 3z" fill="#1ABC9C"/>
    <path d="M6 12a3 3 0 0 0 3-3V6H6v6z" fill="#18A0FB"/>
  </svg>
);

const FigJamIcon = () => (
  <img
    src={figjamIcon}
    alt="FigJam"
    className="w-full h-full object-contain"
  />
);

const FramerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#0055FF" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
  </svg>
);

const AsanaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#F06A6A" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.336-5.22-5.22-5.22zm-13.56 0c-2.88 0-5.22 2.337-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.338 5.22-5.22-2.336-5.22-5.22-5.22zm12-6.525c0 2.883-2.337 5.22-5.22 5.22-2.882 0-5.22-2.337-5.22-5.22 0-2.88 2.338-5.22 5.22-5.22 2.883 0 5.22 2.34 5.22 5.22z"/>
  </svg>
);

const MiroIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFD02F" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.392 0H13.9 L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

const WixStudioIcon = () => (
  <img
    src={wixStudioIcon}
    alt="Wix Studio"
    className="w-full h-full object-contain"
  />
);

const AntigravityLogo = () => (
  <img
    src={antigravityIcon}
    alt="Antigravity"
    className="w-3.5 h-3.5 object-contain group-hover:rotate-[12deg] transition-transform duration-300"
  />
);

// ── App Icons ─────────────────────────────────────────────────────────
const renderAppIcon = (projectId: string) => {
  const baseClass = "w-16 h-16 rounded-2xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105";
  switch (projectId) {
    case 'rizen':
      return (
        <div className={`${baseClass} bg-gradient-to-br from-cyan-950 via-slate-900 to-amber-950 border border-cyan-500/40 shadow-lg shadow-cyan-500/10`}>
          <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span className="text-[7px] font-mono text-cyan-400 font-bold mt-1 uppercase tracking-widest">RIZEN</span>
        </div>
      );
    case 'quantel-ai':
      return (
        <div className={`${baseClass} bg-gradient-to-br from-slate-900 to-zinc-800 border border-zinc-700/40`}>
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <span className="text-[7px] font-mono text-blue-400/80 mt-1 uppercase tracking-widest">QUANTEL</span>
        </div>
      );
    case 'sanctum':
      return (
        <div className={`${baseClass} bg-gradient-to-br from-stone-950 to-neutral-800 border border-stone-700/40`}>
          <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
          <span className="text-[7px] font-mono text-amber-400/80 mt-1 uppercase tracking-widest">SANCTUM</span>
        </div>
      );
    case 'influencer-agency':
      return (
        <div className={`${baseClass} bg-gradient-to-br from-zinc-900 to-neutral-800 border border-zinc-700/40`}>
          <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20.08l-.014-.002" />
          </svg>
          <span className="text-[7px] font-mono text-pink-400/80 mt-1 uppercase tracking-widest">SLATE</span>
        </div>
      );
    case 'strength-training-research':
      return (
        <div className={`${baseClass} bg-gradient-to-br from-slate-950 to-slate-800 border border-slate-700/40`}>
          <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          <span className="text-[7px] font-mono text-violet-400/80 mt-1 uppercase tracking-widest">STRENGTH</span>
        </div>
      );
    default:
      return null;
  }
};

// ── Motion Animation Variants ─────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 110,
      damping: 14,
    },
  },
};

// ── Main Component ─────────────────────────────────────────────────────
export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('tarun.ux@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools = [
    { name: 'Figma', icon: <FigmaIcon /> },
    { name: 'FigJam', icon: <FigJamIcon /> },
    { name: 'Framer', icon: <FramerIcon /> },
    { name: 'Notion', icon: <NotionIcon /> },
    { name: 'Asana', icon: <AsanaIcon /> },
    { name: 'Miro', icon: <MiroIcon /> },
    { name: 'Wix Studio', icon: <WixStudioIcon /> },
  ];

  const skills = [
    'User Centered Design',
    'Design Thinking',
    'Wire-framing',
    'Prototyping',
    'User Research',
    'Usability Testing',
    'Interaction Design',
    'Information Architecture',
    'Visual Systems',
    'Design Strategy',
  ];

  const [expandedExp, setExpandedExp] = useState<string | null>(null);

  const toggleExp = (id: string) => {
    setExpandedExp((prev) => (prev === id ? null : id));
  };

  const experiences = [
    {
      id: 'the-social-slate',
      company: 'The Social Slate',
      role: 'UI/UX DESIGNER',
      period: 'Mar 2025 — Feb 2026',
      logo: socialSlateLogo,
      fallbackInitials: 'SS',
      tag: '1 Year',
      employmentType: 'Internship',
      description:
        'Designed wireframes, user flows, and high-fidelity UI/UX systems for SaaS platforms, dashboards, and mobile apps in Figma. Engineered responsive layouts using Framer and Wix Studio, and coordinated design workflows with teams using Asana.',
      skills: ['Figma', 'Framer', 'Wix Studio', 'Design Systems', 'Responsive UI', 'Asana'],
    },
  ];



  return (
    <div
      className="min-h-screen relative"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <Navbar />

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section id="home-section" className="section-band-base pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Small label */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#4ade80' }}
            />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.12em]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Open for opportunities
            </span>
          </div>

          {/* Hero display heading with inline avatar */}
          <h1 className="mb-8 leading-none">
            <span className="flex items-center gap-4 flex-wrap">
              <span
                className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight"
                style={{ fontFamily: 'Hanken Grotesk, Satoshi, sans-serif', letterSpacing: '-0.03em' }}
              >
                Product
              </span>
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 shrink-0 inline-block align-middle shadow-sm hover:scale-105 transition-transform duration-300"
                style={{ borderColor: 'var(--border-card)' }}
              >
                <img
                  src="/avatar.png"
                  alt="Tarun — Product Designer"
                  className="w-full h-full object-cover"
                />
              </div>
            </span>
            <span
              className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight mt-2"
              style={{
                fontFamily: 'Instrument Serif, Fraunces, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              Designer
            </span>
          </h1>

          {/* Intro text section */}
          <div className="mt-10">
            <div className="flex-1">
              <p
                className="text-base sm:text-lg max-w-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
              >
                I'm{' '}
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Tarun Madan</span>
                {' '}crafting designs with top notes of delight, heart notes of simplicity,
                and base notes of usability. 1+ year building digital products that matter.
              </p>
              
              <div className="flex flex-wrap items-center gap-3.5 mt-8">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-semibold tracking-wider uppercase bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer border border-transparent shadow-sm"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                
                <a
                  href="https://www.linkedin.com/in/taruntm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-semibold tracking-wider uppercase border hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'transparent',
                    borderColor: 'var(--border-card)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-accent" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS MARQUEE BAND ─────────────────────────────────── */}
      <div className="section-band-surface py-6 overflow-hidden relative">
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, var(--bg-surface), transparent)` }}
        />
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, var(--bg-surface), transparent)` }}
        />
        <div className="animate-marquee flex items-center gap-6">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="tag-pill whitespace-nowrap">{s}</span>
          ))}
        </div>
      </div>

      {/* ── SELECTED WORK ─────────────────────────────────────────── */}
      <section id="selected-work" className="section-band-base py-24 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Soft Ambient Glow */}
        <div className="section-ambient-glow -top-10" />
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
              style={{ color: 'var(--text-muted)' }}
            >
              01 / Selected Work
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{ letterSpacing: '-0.025em' }}
            >
              Featured{' '}
              <span
                style={{
                  fontFamily: 'Instrument Serif, Georgia, serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                Projects
              </span>
            </h2>
          </div>
          <span
            className="hidden sm:block text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            {projects.length} Case Studies
          </span>
        </div>

        {/* Project vertical stack (Image First -> Details Second) */}
        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => navigate(`/work/${project.id}`)}
              className="group cursor-pointer flex flex-col gap-6"
            >
              {/* 1. SPOTLIGHT IMAGE CANVAS (FIRST) */}
              <div
                className="w-full aspect-[16/10] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl border relative overflow-hidden transition-all duration-500 shadow-sm group-hover:shadow-md group-hover:border-neutral-400 dark:group-hover:border-neutral-600"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-card)',
                }}
              >
                {/* Floating Glassmorphic Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase text-accent bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm flex items-center gap-1.5">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>

                {/* Arrow Button on Hover */}
                <div
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md group-hover:scale-105"
                  style={{ background: 'var(--text-primary)', color: 'var(--bg-base)' }}
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Simulated Browser/App Window Frame */}
                <div
                  className="absolute inset-x-4 sm:inset-x-10 bottom-0 top-14 sm:top-16 rounded-t-xl sm:rounded-t-2xl border-t border-x p-4 sm:p-6 flex flex-col justify-between shadow-xl transition-transform duration-500 group-hover:-translate-y-2"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border-card)',
                  }}
                >
                  {/* Browser dots header */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>

                  {/* Canvas Preview Center */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-6">
                    {renderAppIcon(project.id)}
                    <span
                      className="font-mono text-xs sm:text-sm tracking-wide font-medium"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.title} Interface Preview
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. SPOTLIGHT DETAILS (SECOND) */}
              <div className="flex flex-col gap-3.5 px-1">
                {/* Meta row */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[0.12em]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-[11px] sm:text-xs font-mono"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {project.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight transition-colors duration-200"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {project.title}
                </h3>

                {/* Tagline / Summary */}
                <p
                  className="text-sm sm:text-base leading-relaxed max-w-3xl"
                  style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
                >
                  {project.tagline || project.objective}
                </p>

                {/* Metrics & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 mt-1 border-t border-[var(--border-card)]/60">
                  {/* Metrics List */}
                  <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex flex-col">
                        <span className="text-base sm:text-lg font-mono font-semibold text-[var(--text-primary)]">
                          {metric.value}
                        </span>
                        <span className="text-[11px] font-sans text-[var(--text-muted)]">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white transition-all duration-300 cursor-pointer shadow-sm self-start sm:self-auto group-hover:translate-x-1">
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── TOOL STACK ─────────────────────────────────────────────── */}
      <section id="skills-section" className="section-band-surface py-24 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            02 / Tool Stack
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8"
            style={{ letterSpacing: '-0.025em' }}
          >
            My{' '}
            <span
              style={{
                fontFamily: 'Instrument Serif, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              Arsenal
            </span>
          </h2>

          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                className="relative group flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.08] hover:-translate-y-1.5 hover:bg-neutral-800/[0.04] dark:hover:bg-white/[0.04] hover:shadow-[0_12px_24px_rgba(0,180,216,0.12)]"
                style={{
                  background: 'transparent',
                }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[6deg]">
                  {tool.icon}
                </div>
                
                {/* Floating Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 text-[10px] font-mono font-medium tracking-wider uppercase opacity-0 scale-95 translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-30 whitespace-nowrap">
                  {tool.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ─────────────────────────────────────── */}
      <section id="timeline-section" className="section-band-base py-24 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="section-ambient-glow -top-10" />
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                03 / Background
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold tracking-tight"
                style={{ letterSpacing: '-0.025em' }}
              >
                Professional{' '}
                <span
                  style={{
                    fontFamily: 'Instrument Serif, Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  Experience
                </span>
              </h2>
            </div>
            <span
              className="hidden sm:block text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              1 Year
            </span>
          </div>

          <div className="flex flex-col border-t border-[var(--border-card)]">
            {experiences.map((exp) => {
              const isExpanded = expandedExp === exp.id;
              return (
                <div
                  key={exp.id}
                  className="transition-colors"
                >
                  {/* Horizontal Interactive Row Button */}
                  <button
                    onClick={() => toggleExp(exp.id)}
                    className="w-full py-5 sm:py-6 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group hover:bg-[var(--bg-surface)]/30 rounded-xl transition-all"
                    aria-expanded={isExpanded}
                  >
                    {/* Left: Circular Company Logo + Company Name + Internship Status */}
                    <div className="flex items-center gap-3.5 sm:w-1/3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shrink-0 border border-[var(--border-card)] bg-[#121212] flex items-center justify-center shadow-sm relative">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[11px] font-bold font-mono text-[var(--text-primary)]">
                            {exp.fallbackInitials}
                          </span>
                        )}
                      </div>

                      <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-snug">
                        {exp.company}
                      </span>
                    </div>

                    {/* Center: Role in Uppercase */}
                    <div className="sm:w-1/3 sm:text-center">
                      <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[var(--text-primary)] font-mono">
                        {exp.role}
                      </span>
                    </div>

                    {/* Right: Date Range + Down Arrow */}
                    <div className="flex items-center gap-2 sm:w-1/3 sm:justify-end text-xs sm:text-sm font-mono text-[var(--text-secondary)]">
                      <span>{exp.period}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expandable Details Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-12 pb-6 pt-1 flex flex-col gap-2.5 text-left">
                          {exp.employmentType && (
                            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                              {exp.employmentType}
                            </span>
                          )}
                          <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-light max-w-3xl">
                            {exp.description}
                          </p>

                          {exp.skills && exp.skills.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {exp.skills.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--bg-surface)] border border-[var(--border-card)] text-[var(--text-secondary)]"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact-section" className="section-band-surface py-24 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="section-ambient-glow -top-10" />
          <p
            className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            04 / Contact
          </p>
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-10 leading-none"
            style={{ letterSpacing: '-0.03em' }}
          >
            Let's work{' '}
            <span
              style={{
                fontFamily: 'Instrument Serif, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              together
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p
              className="text-base max-w-md leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
            >
              Open to Product Designer roles, design reviews, audits, and
              product architecture consulting.
            </p>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-3 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="font-mono text-sm">tarunmadan2506@gmail.com</span>
                {copied ? (
                  <Check className="w-4 h-4 shrink-0" style={{ color: '#4ade80' }} />
                ) : (
                  <Copy className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                )}
              </button>

              <a
                href="https://www.linkedin.com/in/taruntm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 border"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-card)',
                  color: 'var(--text-primary)',
                }}
              >
                <LinkedInIcon className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINIGAME ────────────────────────────────────────────────── */}
      <section id="minigame-section" className="section-band-base py-24 sm:py-32 relative">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.12em] mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Just for fun
              </p>
              <h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                UX Runner{' '}
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
              className="hidden sm:block text-[10px] font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              Space / Tap to Jump
            </span>
          </div>
          <UXGame />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="section-band-base py-8 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-[11px] font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            © {new Date().getFullYear()} Tarun. All rights reserved.
          </span>
          <div className="flex items-center gap-2.5">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5"
              style={{
                borderColor: 'var(--border-card)',
                color: 'var(--text-secondary)',
              }}
            >
              <ArrowUpRight className="w-3 h-3 text-accent" />
              <span>Resume</span>
            </a>
            <a
              href="https://www.linkedin.com/in/taruntm/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5"
              style={{
                borderColor: 'var(--border-card)',
                color: 'var(--text-secondary)',
              }}
            >
              <LinkedInIcon className="w-3-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>

      {/* ── ANTIGRAVITY FLOATING BADGE ─────────────────────────────────── */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="antigravity-badge group"
        aria-label="Vibe coded with Antigravity IDE"
      >
        <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 bg-accent/5 border border-accent/15 group-hover:scale-110 transition-all duration-300">
          <AntigravityLogo />
        </div>
        <span>
          Vibe coded with <span className="font-extrabold text-accent">Antigravity</span>
        </span>
      </a>
    </div>
  );
};

export default Landing;
