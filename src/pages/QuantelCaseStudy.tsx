import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Maximize2, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import CaseStudyFooter from '../components/CaseStudyFooter';
import TextReveal from '../components/TextReveal';
import SpinningCounter from '../components/SpinningCounter';
import { projects } from '../data/projects';

// Asset imports
import heroQuantel from '../assets/Quantel Img/Quantel hero.webp';
import assetsQuantel from '../assets/Quantel Img/Assets Quantel.webp';
import lightmodeDashboard from '../assets/Quantel Img/Quantel LightMode Dashboard.webp';
import capital1Quantel from '../assets/Quantel Img/Capital 1.webp';
import capital2Quantel from '../assets/Quantel Img/Capital 2.webp';
import adviseQuantel from '../assets/Quantel Img/Advice.webp';
import referralQuantel from '../assets/Quantel Img/Quantel referal Screen.webp';

// 12 Variables for Light Mode data
interface LightModeVariable {
  name: string;
  hex: string;
}

interface VariableGroup {
  title: string;
  variables: LightModeVariable[];
}

const LEFT_COLUMN_GROUPS: VariableGroup[] = [
  {
    title: 'SURFACE',
    variables: [
      { name: 'BG - Primary', hex: '#F5F6F6' },
      { name: 'Comp Surface - Primary', hex: '#FFFFFF' },
    ],
  },
  {
    title: 'STROKE',
    variables: [
      { name: 'Stroke', hex: '#DFE5ED' },
      { name: 'Stroke - Light', hex: '#EBEDF0' },
    ],
  },
  {
    title: 'CTA / LINK',
    variables: [
      { name: 'Brand - Primary', hex: '#3549EE' },
      { name: 'Brand - Secondary', hex: '#6270D9' },
    ],
  },
];

const RIGHT_COLUMN_GROUPS: VariableGroup[] = [
  {
    title: 'TEXT',
    variables: [
      { name: 'Text - Primary', hex: '#111B21' },
      { name: 'Text - Secondary', hex: '#26353D' },
      { name: 'Text - Tertiary', hex: '#6C7D87' },
      { name: 'Sub-Text', hex: '#53646E' },
      { name: 'Inactive Nav Text', hex: '#71717A' },
      { name: 'Placeholder Search Text', hex: '#A49F9F' },
    ],
  },
];

// Learnings data
const learningsData = [
  {
    id: 'role-based-tokens',
    title: 'Role-based tokens made the light mode possible.',
    description:
      'Organizing color strictly by surface, text, stroke, and brand allowed the entire dashboard to switch themes without modifying a single line of component structure or layout code.',
  },
  {
    id: 'check-contrast',
    title: 'Check contrast while building.',
    description:
      'The lighter text colors sit near the WCAG AA limit. Testing contrast ratios early and continuously as I design is a crucial habit I have integrated into my ongoing workflow.',
  },
];

export const QuantelCaseStudy: React.FC = () => {
  const [expandedLearning, setExpandedLearning] = useState<string | null>('role-based-tokens');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Lock body when lightbox is active & support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };

    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  const toggleLearning = (id: string) => {
    setExpandedLearning((prev) => (prev === id ? null : id));
  };

  // Find next project in the list (or loop to next available)
  const currentIdx = projects.findIndex((p) => p.id === 'quantel-ai');
  const nextProject = projects[(currentIdx + 1) % projects.length] || projects[0];

  return (
    <div
      className="min-h-screen relative pb-28 text-left overflow-x-hidden w-full max-w-full"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Floating Navbar */}
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-24 sm:pt-28 flex flex-col gap-10 sm:gap-14">
        
        {/* ── HERO TITLE & INTRO ───────────────────────────────────── */}
        <section id="overview" className="flex flex-col gap-6">
          <TextReveal className="flex flex-col gap-2">
            <span 
              className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium"
              style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
            >
              Web App · Mobile App · FinTech
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Quantel AI
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              AI-powered wealth management platform
            </p>
          </TextReveal>

          {/* Large Project Hero Image — Matching 16:9 ratio of Sanctum & Rizen */}
          <div
            className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm cursor-pointer group"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
            onClick={() => setLightboxImage({ src: heroQuantel, alt: 'Quantel AI Wealth Management Platform Hero', caption: 'Quantel AI Platform Overview' })}
          >
            <img
              src={heroQuantel}
              alt="Quantel AI Wealth Management Platform Hero"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-end justify-end p-4">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full view</span>
              </div>
            </div>
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 pt-6 pb-2 items-start text-left">
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>UI/UX Intern <br/>@The Social Slate</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                WHAT I DID
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Production UI Screens</span>
                <span>Mobile Adaptation</span>
                <span>Design System Tokens</span>
                <span>Prototyping</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TEAM
              </span>
              <div className="flex flex-col gap-0.5 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Me</span>
                <span>Design Lead</span>
                <span>Agency Lead</span>
                <span>Project Manager</span>
                <span>6 Engineers</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                3 Months
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TOOLS
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Figma</span>
                <span>FigJam</span>
                <span>Jira</span>
                <span>Asana</span>
                <span>Google Meet</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTEXT ─────────────────────────────────────────────── */}
        <section id="context" className="flex flex-col gap-3">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              Context
            </h2>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                Quantel AI brings investing, financial advice and AI market insights into one experience. I joined after the product direction and design system were set, so every decision had to work inside the existing system. My job was to design new production screens and adapt web experiences for mobile.
              </p>
            </div>
          </TextReveal>
        </section>

        {/* ── KEY DESIGN DECISIONS ─────────────────────────────────── */}
        <section id="decisions" className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col">
            <TextReveal className="flex flex-col">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                Key Design Decisions
              </h2>
            </TextReveal>
          </div>

          {/* ── DECISION 1 ────────────────────────────────────────── */}
          <div id="decision-1" className="flex flex-col gap-5 pt-2">
            <TextReveal className="flex flex-col gap-2">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                1. Adapting the dashboard to light mode without redesigning it
              </h3>
              
              <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                <p>
                  Quantel was designed dark-first, and late in the project the founder asked for a light-mode dashboard. Until then, the dashboard existed only in dark mode.
                </p>
                <p>
                  I kept the components, layout and hierarchy and changed only color. I built variables for light mode organized by role, so the dashboard could keep its structure.
                </p>
              </div>
            </TextReveal>

            {/* Dashboard Light Mode Mockup */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div
                className="w-full aspect-[1920/1112] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm cursor-pointer group relative"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                onClick={() => setLightboxImage({ src: lightmodeDashboard, alt: 'Quantel Dashboard Light Mode', caption: 'Production Light-Mode Dashboard' })}
              >
                <img
                  src={lightmodeDashboard}
                  alt="Quantel Dashboard Light Mode"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-end justify-end p-4">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full view</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Variables for Light Mode — Section stroke removed, standalone cards like Rizen */}
            <div className="flex flex-col gap-4 sm:gap-5 pt-2">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-4 bg-[#3549EE] rounded-full" />
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight">
                    Variables for Light Mode
                  </h4>
                </div>
                <span 
                  className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[var(--text-muted)] font-semibold"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  LIGHT MODE · 12 VARIABLES
                </span>
              </div>

              {/* Two Columns: Left (SURFACE, STROKE, CTA / LINK) & Right (TEXT) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
                {/* Left Column: Stacked Cards (SURFACE, STROKE, CTA / LINK) */}
                <div className="flex flex-col gap-4 sm:gap-5">
                  {LEFT_COLUMN_GROUPS.map((group, gIdx) => (
                    <div 
                      key={gIdx} 
                      className="rounded-2xl p-5 sm:p-6 border shadow-xs transition-all duration-300 hover:border-[var(--text-muted)]/30 flex flex-col gap-3.5"
                      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
                    >
                      <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
                        <span 
                          className="text-[11px] sm:text-[12px] uppercase tracking-widest text-[var(--text-secondary)] font-bold"
                          style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                        >
                          {group.title}
                        </span>
                        <span 
                          className="text-[11px] text-[var(--text-muted)] font-medium tabular-nums"
                          style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                        >
                          {group.variables.length} {group.variables.length === 1 ? 'variable' : 'variables'}
                        </span>
                      </div>

                      <div className="flex flex-col divide-y divide-[var(--border-card)]">
                        {group.variables.map((item, vIdx) => {
                          const isLight = ['#FFFFFF', '#F5F6F6', '#DFE5ED', '#EBEDF0'].includes(item.hex.toUpperCase());
                          return (
                            <div
                              key={vIdx}
                              className="flex items-center justify-between py-2.5"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Swatch with thin border for white/near-white swatches */}
                                <div 
                                  className={`w-7 h-7 rounded-lg shrink-0 ${
                                    isLight
                                      ? 'border border-neutral-300 dark:border-neutral-600 shadow-2xs'
                                      : 'border border-black/10 dark:border-white/15 shadow-2xs'
                                  }`}
                                  style={{ backgroundColor: item.hex }}
                                />
                                <span 
                                  className="text-[13px] sm:text-[14px] font-medium text-[var(--text-primary)] truncate"
                                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                                >
                                  {item.name}
                                </span>
                              </div>

                              <span 
                                className="font-mono text-[12px] sm:text-[13px] font-semibold text-[var(--text-secondary)] shrink-0 pl-2"
                              >
                                {item.hex}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: TEXT Card */}
                <div className="flex flex-col gap-4 sm:gap-5">
                  {RIGHT_COLUMN_GROUPS.map((group, gIdx) => (
                    <div 
                      key={gIdx} 
                      className="rounded-2xl p-5 sm:p-6 border shadow-xs transition-all duration-300 hover:border-[var(--text-muted)]/30 flex flex-col gap-3.5"
                      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
                    >
                      <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
                        <span 
                          className="text-[11px] sm:text-[12px] uppercase tracking-widest text-[var(--text-secondary)] font-bold"
                          style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                        >
                          {group.title}
                        </span>
                        <span 
                          className="text-[11px] text-[var(--text-muted)] font-medium tabular-nums"
                          style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                        >
                          {group.variables.length} {group.variables.length === 1 ? 'variable' : 'variables'}
                        </span>
                      </div>

                      <div className="flex flex-col divide-y divide-[var(--border-card)]">
                        {group.variables.map((item, vIdx) => {
                          const isLight = ['#FFFFFF', '#F5F6F6', '#DFE5ED', '#EBEDF0', '#A49F9F'].includes(item.hex.toUpperCase());
                          return (
                            <div
                              key={vIdx}
                              className="flex items-center justify-between py-2.5"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Swatch */}
                                <div 
                                  className={`w-7 h-7 rounded-lg shrink-0 ${
                                    isLight
                                      ? 'border border-neutral-300 dark:border-neutral-600 shadow-2xs'
                                      : 'border border-black/10 dark:border-white/15 shadow-2xs'
                                  }`}
                                  style={{ backgroundColor: item.hex }}
                                />
                                <span 
                                  className="text-[13px] sm:text-[14px] font-medium text-[var(--text-primary)] truncate"
                                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                                >
                                  {item.name}
                                </span>
                              </div>

                              <span 
                                className="font-mono text-[12px] sm:text-[13px] font-semibold text-[var(--text-secondary)] shrink-0 pl-2"
                              >
                                {item.hex}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* After & Result Narrative */}
            <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
              <p>
                Near-black text on white and <span className="font-semibold text-[var(--text-primary)]">#F5F6F6</span> surfaces, white cards separated by a light stroke, and the brand blue holding <span className="font-semibold text-[var(--text-primary)]">6.3:1</span> behind white button labels. The light-mode dashboard shipped.
              </p>
            </TextReveal>
          </div>

          {/* ── DECISION 2 ────────────────────────────────────────── */}
          <div id="decision-2" className="flex flex-col gap-5 pt-3">
            <TextReveal className="flex flex-col gap-2">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                2. Bringing Capital and Advise to mobile without changing the flows
              </h3>
              
              <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                <p>
                  Both flows already worked on web, and mobile needed the same journeys on a much smaller screen.
                </p>
                <p>
                  My design lead’s direction was to keep the flows and adapt the interface, so I translated instead of redesigning. In Capital, each question gets its own screen with a step counter and one primary button. In Advise, plans sit in stacked cards with a Recommended tag, and quarterly sessions in a list with report downloads.
                </p>
              </div>
            </TextReveal>

            {/* Mobile Flows: Capital & Advise — Vertical full width without card background or image description */}
            <div className="flex flex-col gap-6 sm:gap-8 pt-3 items-start w-full">
              {/* Quantel Capital Flow Heading */}
              <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight">
                Quantel Capital Flow
              </h4>

              {/* Capital 1 */}
              <div 
                className="w-full flex justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => setLightboxImage({ src: capital1Quantel, alt: 'Quantel Capital Mobile Flow Part 1' })}
              >
                <img
                  src={capital1Quantel}
                  alt="Quantel Capital Mobile Flow Part 1"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                />
              </div>

              {/* Capital 2 */}
              <div 
                className="w-full flex justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => setLightboxImage({ src: capital2Quantel, alt: 'Quantel Capital Mobile Flow Part 2' })}
              >
                <img
                  src={capital2Quantel}
                  alt="Quantel Capital Mobile Flow Part 2"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                />
              </div>

              {/* Quantel Advise Flow Heading */}
              <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight pt-4">
                Quantel Advise Flow
              </h4>

              {/* Advise */}
              <div 
                className="w-full flex justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
                onClick={() => setLightboxImage({ src: adviseQuantel, alt: 'Quantel Advise Mobile Flow' })}
              >
                <img
                  src={adviseQuantel}
                  alt="Quantel Advise Mobile Flow"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>

            {/* After & Result Narrative */}
            <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
              <p>
                Both flows run on mobile with the same components and visual language as web. Both mobile flows shipped.
              </p>
            </TextReveal>
          </div>

          {/* ── DECISION 3 ────────────────────────────────────────── */}
          <div id="decision-3" className="flex flex-col gap-5 pt-3">
            <TextReveal className="flex flex-col gap-2">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                3. Turning a portfolio status view into a path to Quantel Advise
              </h3>
              
              <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                <p>
                  Users can link investment accounts from other platforms, and the page had to do more than mirror what they could already see there. Previously, their portfolio lived on other platforms, with no view of how healthy it was or what to improve.
                </p>
                <p>
                  The brief asked for a status view that leads into Quantel Advise. I put the account value, a health status and six ratings at the top, a “Schedule a free call” bar attached to that status, then the performance chart, an overall score and insights on what could improve with Quantel.
                </p>
              </div>
            </TextReveal>

            {/* Assets Dashboard Mockup */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div
                className="w-full aspect-[1920/1024] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm cursor-pointer group relative"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                onClick={() => setLightboxImage({ src: assetsQuantel, alt: 'Quantel Assets Dashboard', caption: 'Assets Dashboard — Account Value, Health Status & Conversion Path to Advise' })}
              >
                <img
                  src={assetsQuantel}
                  alt="Quantel Assets Dashboard"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-end justify-end p-4">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full view</span>
                  </div>
                </div>
              </div>
            </div>

            {/* After & Result Narrative */}
            <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
              <p>
                A user sees how their portfolio is doing and the next step in the same glance. The Assets Dashboard shipped.
              </p>
            </TextReveal>
          </div>
        </section>

        {/* ── CONCEPT (NOT SHIPPED): POINTS & REWARDS ─────────────── */}
        <section id="concept" className="flex flex-col gap-5 pt-2">
          <TextReveal className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className="text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full font-semibold"
                style={{ 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--border-card)', 
                  color: 'var(--text-muted)', 
                  fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" 
                }}
              >
                Exploration · Not Shipped
              </span>
            </div>
            <h2 className="text-[24px] sm:text-[30px] md:text-[36px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              Concept: Points & Rewards
            </h2>
            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
              <p>
                A first draft the team discussed in a meeting, showing total, earned, redeemed and expiring points, featured rewards and ways to earn. The number of points and the rewards were never confirmed, so every value on screen is a placeholder.
              </p>
            </div>
          </TextReveal>

          {/* Referral Screen Concept Mockup */}
          <div className="flex flex-col gap-2 pt-1">
            <div
              className="w-full aspect-[3840/2280] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm cursor-pointer group relative"
              style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              onClick={() => setLightboxImage({ src: referralQuantel, alt: 'Quantel Points and Rewards Referral Screen Concept', caption: 'Points & Rewards Concept Exploration (Unconfirmed Placeholder Values)' })}
            >
              <img
                src={referralQuantel}
                alt="Quantel Points and Rewards Referral Screen"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute top-4 left-4">
                <span 
                  className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/90 border border-white/20 font-semibold shadow-md"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  Concept
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-end justify-end p-4">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full view</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUANTEL'S RESULTS AFTER LAUNCH ───────────────────────── */}
        <section id="results" className="flex flex-col gap-6 sm:gap-8 pt-2">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              Quantel’s results after launch
            </h2>
          </TextReveal>

          {/* Result Highlight Card with 50%+ Counter */}
          <div
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-9 border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span 
                  className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-semibold"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  PORTFOLIO PERFORMANCE
                </span>
              </div>
              <p className="text-[17px] sm:text-[19px] leading-relaxed text-[var(--text-primary)] font-semibold">
                50%+ returns over 18 months across Quantel portfolios.
              </p>
              <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--text-secondary)] font-normal pt-1">
                These reflect Quantel’s investment models and the platform as a whole, not my screens alone.
              </p>
              <div className="pt-2">
                <span 
                  className="inline-flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] font-medium"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  Source: Quantel’s public YouTube video
                </span>
              </div>
            </div>

            {/* Stat Counter */}
            <div className="flex items-center justify-center select-none py-2 shrink-0">
              <div className="flex items-baseline">
                <SpinningCounter
                  value={50}
                  suffix="%+"
                  className="text-[52px] sm:text-[64px] md:text-[76px] font-bold tracking-tight text-[var(--text-primary)] leading-none"
                  duration={1400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT I LEARNT ───────────────────────────────────────── */}
        <section id="learnings" className="flex flex-col gap-6 sm:gap-8 pt-2">
          <TextReveal className="flex flex-col gap-2">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              What I Learnt
            </h2>
          </TextReveal>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            {learningsData.map((item) => {
              const isExpanded = expandedLearning === item.id;
              return (
                <div
                  key={item.id}
                  className="border rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-200"
                  style={{
                    borderColor: 'var(--border-card)',
                    background: 'var(--bg-surface)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleLearning(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between py-4 px-4 sm:py-5 sm:px-6 text-left cursor-pointer select-none group focus:outline-none"
                  >
                    <span className="text-[16px] sm:text-[17px] md:text-[18px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors duration-150">
                      {item.title}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="w-7 h-7 rounded-full flex items-center justify-center border shrink-0 ml-3 transition-colors"
                      style={{
                        borderColor: 'var(--border-card)',
                        background: isExpanded ? 'var(--bg-card)' : 'transparent',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-6 sm:pb-5 pt-0 text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[var(--text-secondary)] font-normal">
                          <p className="pt-0.5">{item.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FOOTER & CONTACT ───────────────────────────────────── */}
        <CaseStudyFooter nextProject={nextProject} />

      </main>

      {/* ── FULL VIEW LIGHTBOX MODAL ────────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Top Bar: Caption & Close Button */}
            <div
              className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-white/80 text-[13px] sm:text-[14px] tracking-wider px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 font-semibold"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  Preview
                </span>
                {lightboxImage.caption && (
                  <span className="text-white/90 text-[13px] sm:text-[14px] font-medium hidden sm:inline-block">
                    {lightboxImage.caption}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close full view"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div
              className="relative max-w-5xl max-h-[82vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-[82vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/15"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuantelCaseStudy;
