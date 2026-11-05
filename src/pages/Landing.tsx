import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import UXGame from '../components/UXGame';
import TiltCard from '../components/TiltCard';
import ProjectCard from '../components/ProjectCard';
import StreamingText from '../components/StreamingText';
import PixelCompanion from '../components/PixelCompanion';
import figjamIcon from '../assets/figjam-icon-filled-256 1.webp';
import wixStudioIcon from '../assets/wix-studio.webp';
import antigravityIcon from '../assets/antigravity-icon__full-color.webp';
import socialSlateLogo from '../assets/SS- OG colors.webp';
import rizenMockupVideo from '../assets/Rizen Img/rizen mockup video.webm';
import sanctumMockupVideo from '../assets/Sanctum Img:Video/Sanctum Home mockup.webm';
import quantelMockupVideo from '../assets/Quantel Img/quantel mockup vid.webm';
import sideReelsMockup from '../assets/side_reels_mockup.png';
import sideFlipkartMockup from '../assets/side_flipkart_mockup.png';
import sideNothingMockup from '../assets/side_nothing_mockup.png';

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

const AntigravityIcon = () => (
  <img
    src={antigravityIcon}
    alt="Antigravity"
    className="w-full h-full object-contain"
  />
);

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
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('tarunmadan2506@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tools = [
    { name: 'Figma', icon: <FigmaIcon /> },
    { name: 'FigJam', icon: <FigJamIcon /> },
    { name: 'Framer', icon: <FramerIcon /> },
    { name: 'Wix Studio', icon: <WixStudioIcon /> },
    { name: 'Antigravity', icon: <AntigravityIcon /> },
    { name: 'Miro', icon: <MiroIcon /> },
    { name: 'Notion', icon: <NotionIcon /> },
    { name: 'Asana', icon: <AsanaIcon /> },
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
      id: 'the-social-slate-fulltime',
      company: 'The Social Slate',
      role: 'UI/UX DESIGNER',
      period: 'Sept 2025 — Present',
      logo: socialSlateLogo,
      fallbackInitials: 'SS',
      description:
        'Full-time UI/UX Designer (Sept 1, 2025 — Present) promoted after a successful 6-month internship. Shipped 5 digital products and websites across fintech, fitness, education, and creative industries, owning features and pages from wireframes to final implementation.',
      skills: ['Figma', 'Framer', 'Wix Studio', 'Design Systems', 'Responsive UI', 'Asana'],
    },
    {
      id: 'the-social-slate-intern',
      company: 'The Social Slate',
      role: 'UI/UX INTERN',
      period: 'March 2025 — Aug 2025',
      logo: socialSlateLogo,
      fallbackInitials: 'SS',
      description:
        '6-month intensive UI/UX design internship (March 2025 — August 2025). Contributed to client web platforms, responsive layouts, design component libraries, and conversion-focused landing experiences, culminating in full-time conversion.',
      skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
    },
  ];



  return (
    <div
      className="min-h-screen relative overflow-x-hidden w-full max-w-full"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      <Navbar />

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section id="home-section" className="section-band-base pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading, Bio, CTAs */}
            <div className="lg:col-span-7 flex flex-col">
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
                  <TiltCard
                    className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0 inline-block align-middle select-none cursor-pointer"
                    cardClassName="!rounded-full border-2 shadow-sm"
                    cardStyle={{ borderColor: 'var(--border-card)' }}
                    maxTilt={38}
                    perspective={320}
                    scale={1.12}
                    showGlare={true}
                  >
                    <img
                      src="/avatar.webp?v=11"
                      alt="Tarun — Product Designer"
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />
                  </TiltCard>
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
              <div className="mt-4 sm:mt-6">
                <StreamingText
                  className="text-base sm:text-lg max-w-lg leading-relaxed"
                  style={{ color: 'var(--text-secondary)', fontWeight: 300 }}
                  delay={180}
                  gap={45}
                  segments={[
                    { text: "I'm" },
                    { text: "Tarun Madan,", style: { color: 'var(--text-primary)', fontWeight: 500 } },
                    { text: "crafting designs with top notes of delight, heart notes of simplicity, and base notes of usability. 1.5+ year building digital products that matter." },
                  ]}
                />
                
                <div className="flex flex-wrap items-center gap-3.5 mt-8 relative z-20">
                  <a
                    href="https://drive.google.com/file/d/1tpcvZ6VKyebz2Gnq154fXAiTy3ZZwHAj/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!e.defaultPrevented) {
                        window.open('https://drive.google.com/file/d/1tpcvZ6VKyebz2Gnq154fXAiTy3ZZwHAj/view?usp=sharing', '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-semibold tracking-wider uppercase bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer border border-transparent shadow-sm relative z-20 select-none"
                  >
                    <span>Resume</span>
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

            {/* Right Column: Interactive Pixel Character */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
              <PixelCompanion />
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
          {/* <span
            className="hidden sm:block text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            {projects.length} Case Studies
          </span> */}
        </div>

        {/* 2x2 Grid Layout (Max 2 per row, No Dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-14 lg:gap-x-10 lg:gap-y-14">
          
          {/* ── CARD 1: Sanctum ── */}
          <ProjectCard
            to="/work/sanctum"
            title="Sanctum"
            description="Wellness club website that turned ad traffic into 3× more direct enquiries."
            thumbBg="#080b11"
          >
            <video
              src={sanctumMockupVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </ProjectCard>

          {/* ── CARD 2: Quantel AI ── */}
          <ProjectCard
            to="/work/quantel-ai"
            title="Quantel AI"
            description="AI wealth management app combining automated investing, AI driven advice, and real time market data."
            thumbBg="#090d18"
          >
            <video
              src={quantelMockupVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </ProjectCard>

          {/* ── CARD 3: RIZEN ── */}
          <ProjectCard
            to="/work/rizen"
            title="RIZEN"
            description="Fitness app built around Plan, Workout, Progress, and Accountability, designed for the comeback."
            thumbBg="#0b100d"
          >
            <video
              src={rizenMockupVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </ProjectCard>

          {/* ── CARD 4: Side Quests ── */}
          <ProjectCard
            to="/work/side-quests"
            title="Side Quests"
            description="UX fixes for Instagram Reels, Flipkart checkout, and a Nothing style calculator."
            thumbBg="radial-gradient(ellipse at 50% 65%, #182235 0%, #080b11 100%)"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[200px] bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-full h-full relative flex items-center justify-center overflow-hidden select-none">
              {/* 1. Center: Flipkart MacBook (z-10) */}
              <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[68%] sm:w-[72%] max-w-[340px] z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-[1.03] group-hover:-translate-y-1">
                <img 
                  src={sideFlipkartMockup} 
                  alt="Flipkart Checkout Side Quest" 
                  className="w-full h-auto object-contain block select-none pointer-events-none" 
                  draggable={false}
                />
              </div>

              {/* 2. Left: Instagram Reels Phone (z-20, in front of laptop left) */}
              <div className="absolute bottom-[3%] left-[8%] sm:left-[10%] w-[23%] sm:w-[24%] max-w-[112px] z-20 -rotate-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_24px_38px_rgba(0,0,0,0.95)] group-hover:-translate-x-2.5 group-hover:-translate-y-1 group-hover:-rotate-10 group-hover:scale-105">
                <img 
                  src={sideReelsMockup} 
                  alt="Instagram Reels Side Quest" 
                  className="w-full h-auto object-contain block select-none pointer-events-none" 
                  draggable={false}
                />
              </div>

              {/* 3. Right: Nothing Calculator Phone (z-20, in front of laptop right) */}
              <div className="absolute bottom-[3%] right-[8%] sm:right-[10%] w-[23%] sm:w-[24%] max-w-[112px] z-20 rotate-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] drop-shadow-[0_24px_38px_rgba(0,0,0,0.95)] group-hover:translate-x-2.5 group-hover:-translate-y-1 group-hover:rotate-10 group-hover:scale-105">
                <img 
                  src={sideNothingMockup} 
                  alt="Nothing OS Calculator Side Quest" 
                  className="w-full h-auto object-contain block select-none pointer-events-none" 
                  draggable={false}
                />
              </div>
            </div>
          </ProjectCard>

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
                    className="w-full py-5 sm:py-6 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer group hover:bg-[var(--bg-surface)]/30 rounded-xl transition-all"
                    aria-expanded={isExpanded}
                  >
                    {/* Left: Circular Company Logo + Company Name */}
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

                    {/* Right / Second Line on Mobile: Job Title & Timeline (Justify Between) */}
                    <div className="w-full sm:w-2/3 flex items-center justify-between sm:grid sm:grid-cols-2 gap-4">
                      {/* Role in Uppercase */}
                      <div className="sm:text-center">
                        <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[var(--text-primary)] font-mono">
                          {exp.role}
                        </span>
                      </div>

                      {/* Date Range + Down Arrow */}
                      <div className="flex items-center gap-2 justify-end text-xs sm:text-sm font-mono text-[var(--text-secondary)]">
                        <span>{exp.period}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-[var(--text-primary)]' : ''
                          }`}
                        />
                      </div>
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
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-10 leading-[1.05]"
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
              className="text-base sm:text-lg max-w-md leading-relaxed"
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
                  fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif"
                }}
                title="Click to copy email address"
                aria-label="Copy email address"
              >
                <span className="text-sm font-medium">
                  {copied ? 'Copied' : 'Copy mail'}
                </span>
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
                  fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif"
                }}
              >
                <LinkedInIcon className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">LinkedIn</span>
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
                className="text-3xl sm:text-4xl font-semibold tracking-tight"
                style={{ letterSpacing: '-0.025em' }}
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
              className="text-[10px] font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="hidden sm:inline">Space to Jump</span>
              <span className="sm:hidden">Tap to Jump</span>
            </span>
          </div>
          <UXGame />
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer 
        className="section-band-base py-8 border-t border-[var(--border-subtle)]"
        style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            © {new Date().getFullYear()} Tarun. All rights reserved.
          </span>
          <div className="flex items-center gap-2.5 relative z-20">
            <a
              href="https://drive.google.com/file/d/1tpcvZ6VKyebz2Gnq154fXAiTy3ZZwHAj/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!e.defaultPrevented) {
                  window.open('https://drive.google.com/file/d/1tpcvZ6VKyebz2Gnq154fXAiTy3ZZwHAj/view?usp=sharing', '_blank', 'noopener,noreferrer');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5 cursor-pointer relative z-20 select-none"
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium border transition-all duration-200 hover:border-accent hover:text-accent hover:bg-accent/5"
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
    </div>
  );
};

export default Landing;
