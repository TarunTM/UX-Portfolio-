import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import CaseStudyFooter from '../components/CaseStudyFooter';
import TextReveal from '../components/TextReveal';
import SpinningCounter from '../components/SpinningCounter';
import ImageLightboxModal, { type LightboxImage } from '../components/ImageLightboxModal';
import { projects } from '../data/projects';
import heroVideo from '../assets/Sanctum Img:Video/Hero Video.webm';
import homeSanctum from '../assets/Sanctum Img:Video/Home Sanctum.webp';
import juhuSanctum from '../assets/Sanctum Img:Video/Juhu Sanctum.webp';
import andheriOldSanctum from '../assets/Sanctum Img:Video/Andheri Page old.webp';
import groupxSanctum from '../assets/Sanctum Img:Video/GroupX Sanctum.webp';
import trainingScrollVideo from '../assets/Sanctum Img:Video/Training Scroll video.webm';
import trainingRecoveryIterationVideo from '../assets/Sanctum Img:Video/Training Recovery Iteration.webm';
import recoveryIteration2Img from '../assets/Sanctum Img:Video/Recovery iteration 2.webp';
import recoveryIteration3Img from '../assets/Sanctum Img:Video/Recovery iteration 3.webp';

const outcomeImages = [
  { img: homeSanctum, alt: 'Sanctum Home Page', title: 'Home Experience' },
  { img: juhuSanctum, alt: 'Sanctum Juhu Club Page', title: 'Club Location Page' },
  { img: groupxSanctum, alt: 'Sanctum GroupX Classes', title: 'GroupX Experience' },
];

const iterationsData = [
  {
    type: 'video' as const,
    src: trainingRecoveryIterationVideo,
    alt: 'Sanctum Training and Recovery - Image cards for every service',
    caption: 'Image cards for every service',
  },
  {
    type: 'image' as const,
    src: recoveryIteration2Img,
    alt: 'Sanctum Training and Recovery - Card grid with icon and description',
    caption: 'Card grid with icon and description',
  },
  {
    type: 'image' as const,
    src: recoveryIteration3Img,
    alt: 'Sanctum Training and Recovery - Same grid, borders instead of gaps',
    caption: 'Same grid, borders instead of gaps',
  },
];

const constraintsData = [
  {
    id: 'wix-limitations',
    title: 'Wix limitations',
    description:
      'Parts of the experience relied on Wix Forms, Wix Bookings, and native Wix components, which limited customisation in certain areas.',
  },
  {
    id: 'timeline',
    title: 'Timeline',
    description:
      'The website was developed in phases, with each phase working against its own timeline and delivery requirements.',
  },
];

const whatILearntData = [
  {
    id: 'design-for-outcomes',
    title: 'Design for outcomes, not just aesthetics.',
    description:
      'The 3× increase in enquiries showed me that a small, practical UX improvement can matter more than a visually perfect solution. Sometimes aesthetics can be compromised when it leads to better conversion.',
  },
  {
    id: 'design-with-implementation',
    title: 'Design with implementation in mind.',
    description:
      'Working with a tight timeline taught me to consider the development process while designing. Using responsive, pre-built Wix components where appropriate helped speed up implementation without compromising the overall experience.',
  },
];

export const SanctumCaseStudy: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);
  const [expandedConstraint, setExpandedConstraint] = useState<string | null>('wix-limitations');
  const [expandedLearning, setExpandedLearning] = useState<string | null>('design-for-outcomes');
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [outcomeLightboxIndex, setOutcomeLightboxIndex] = useState<number | null>(null);

  // Iterations Carousel & Full View State
  const [fullscreenIterationIndex, setFullscreenIterationIndex] = useState<number | null>(null);
  const iterationsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (!iterationsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = iterationsScrollRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  };

  const scrollIterations = (direction: 'left' | 'right') => {
    if (!iterationsScrollRef.current) return;
    const cardWidth = iterationsScrollRef.current.clientWidth * 0.72;
    iterationsScrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const toggleConstraint = (id: string) => {
    setExpandedConstraint((prev) => (prev === id ? null : id));
  };

  const toggleLearning = (id: string) => {
    setExpandedLearning((prev) => (prev === id ? null : id));
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Listen to carousel scroll to update arrow states
  useEffect(() => {
    const el = iterationsScrollRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  // Keyboard navigation & body lock for Full View Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIterationIndex === null) return;
      if (e.key === 'Escape') {
        setFullscreenIterationIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setFullscreenIterationIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : iterationsData.length - 1) : null
        );
      } else if (e.key === 'ArrowRight') {
        setFullscreenIterationIndex((prev) =>
          prev !== null ? (prev < iterationsData.length - 1 ? prev + 1 : 0) : null
        );
      }
    };

    if (fullscreenIterationIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenIterationIndex]);

  // 2-second rotating image timer for Outcome section
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % outcomeImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Find next project in the list (or loop to next available)
  const currentIdx = projects.findIndex((p) => p.id === 'sanctum');
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
          <TextReveal trigger="scroll" className="flex flex-col gap-2">
            <span 
              className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium"
              style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
            >
              Website · Fitness & Wellness
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Sanctum House of Wellness
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              A digital experience for a premium fitness & wellness brand
            </p>
          </TextReveal>

          {/* Large Project Hero Video — Uncropped Natural Aspect Ratio */}
          <div
            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm cursor-zoom-in group"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
            onClick={() => setLightboxImage({ src: heroVideo, type: 'video', caption: 'Sanctum — Hero Video' })}
          >
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 pt-6 pb-2 items-start text-left">
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>UI/UX Designer <br/>@The Social Slate</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(Web & Conversion)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                WHAT I DID
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Product Design,</span>
                <span>Product Thinking,</span>
                <span>Prototyping,</span>
                <span>Product Development</span>

              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TEAM
              </span>
              <div className="flex flex-col gap-0.5 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Me</span>
                <span>2 Designers</span>
                <span>Brand Manager</span>
                <span>Agency Lead</span>
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
                <span>Wix Studio</span>
                <span>Google Meet</span>
                <span>Asana</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUTCOME ─────────────────────────────────────────────── */}
        <section id="outcome" className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-4">
            <TextReveal className="flex flex-col gap-2">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                Outcome
              </h2>
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6 items-center">
              {/* Left narrative */}
              <TextReveal className="md:col-span-9 flex flex-col gap-3 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--text-secondary)] font-normal">
                <p>
                  <strong className="text-[var(--text-primary)] font-semibold">3x WhatsApp and phone enquiries within 3 weeks</strong> of adding direct contact actions to the club pages, as reported by the client.
                </p>
              </TextReveal>

              {/* Right: 3x Inquiries Stat Display with Spinning Counter */}
              <div
                className="md:col-span-3 flex flex-col items-center justify-center text-center select-none py-1 group cursor-pointer"
                title="Click to replay spin"
              >
                <div className="flex items-baseline justify-center">
                  <SpinningCounter
                    value={3}
                    suffix="x"
                    className="text-[60px] sm:text-[72px] md:text-[84px] font-bold tracking-tight text-[var(--text-primary)] leading-none"
                  />
                </div>
                <span className="text-[15px] sm:text-[17px] md:text-[18px] font-medium text-[var(--text-primary)] tracking-tight mt-1 sm:mt-1.5">
                  Inquiries
                </span>
              </div>
            </div>
          </div>

          {/* 2-Second Rotating Showcase Carousel — Matching Hero Video Aspect Ratio */}
          <div className="flex flex-col gap-2 mt-2">
            <div
              className="relative w-full aspect-[3388/1758] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
              style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
            >
              {outcomeImages.map((slide, idx) => (
                <div
                  key={idx}
                  onClick={() => setOutcomeLightboxIndex(idx)}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-zoom-in group ${activeSlide === idx ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              ))}

              {/* Slide Indicator Dots */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
                {outcomeImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* View Live Site Full-Width Seamless Gradient Button */}
            <div className="w-full pt-3 pb-1">
              <a
                href="https://www.sanctumclub.co/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                className="group relative w-full py-4 px-6 rounded-2xl font-medium text-[15px] sm:text-[16px] tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer overflow-hidden border active:scale-[0.99] shadow-sm hover:shadow-xl"
                style={{
                  background: btnHovered
                    ? 'linear-gradient(135deg, rgba(26, 24, 20, 0.96) 0%, rgba(55, 50, 42, 0.95) 50%, rgba(26, 24, 20, 0.98) 100%)'
                    : 'linear-gradient(135deg, rgba(26, 24, 20, 0.92) 0%, rgba(38, 35, 30, 0.90) 50%, rgba(26, 24, 20, 0.92) 100%)',
                  borderColor: btnHovered ? 'rgba(255, 255, 255, 0.25)' : 'var(--border-card)',
                  color: '#ffffff',
                }}
              >
                {/* Subtle top specular sheen */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
                    opacity: btnHovered ? 1 : 0.4,
                  }}
                />

                {/* Subtle luminous ambient background glow on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 70%)',
                    opacity: btnHovered ? 1 : 0,
                  }}
                />

                <span className="relative z-10 font-medium transition-all duration-300 tracking-wide">
                  {btnHovered ? "Letss gooo.." : "See it here"}
                </span>

                <ArrowRight
                  className={`relative z-10 w-4 h-4 transition-all duration-300 ${btnHovered ? 'translate-x-1.5 opacity-100' : 'opacity-70'
                    }`}
                />
              </a>
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
                Sanctum is a premium fitness and wellness brand with multiple locations across Mumbai. I took the website from design through implementation, covering the homepage, all club pages and the GroupX experience. The goals were to communicate what Sanctum stands for, help users find the right class and location, and make it easy to enquire.
              </p>
            </div>
          </TextReveal>
        </section>

        {/* ── MY ROLE ─────────────────────────────────────────────── */}
        <section id="role" className="flex flex-col gap-3">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              My Role & Scope
            </h2>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                I designed the homepage, club pages and GroupX experience in Figma, then built the final site in Wix Studio, using Wix Bookings for class scheduling and reservations.
              </p>
            </div>
          </TextReveal>
        </section>

        {/* ── KEY DESIGN DECISIONS ─────────────────────────────────── */}
        <section className="flex flex-col gap-5 sm:gap-6">
          <div id="decisions" className="flex flex-col">
            <TextReveal className="flex flex-col">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                Key Design Decisions
              </h2>
            </TextReveal>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Decision 01 */}
            <div id="decision-1" className="flex flex-col gap-5">
              <TextReveal className="flex flex-col gap-2">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  1. Turning contact details into actions
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Meta Ads began sending people straight to specific club pages. These visitors already had a location in mind and wanted to ask a question, call or find the club.
                  </p>
                  <p>
                    The club pages showed the phone number and address as plain text. A visitor had to copy the number, switch apps or look up the address themselves.
                  </p>
                </div>
              </TextReveal>

              {/* Specific Image: (Before image) */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full font-semibold"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)', fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                  >
                    Before
                  </span>
                  <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                    Initial Club Page (Andheri)
                  </span>
                </div>
                <div
                  className="w-full aspect-[3840/2556] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 relative group cursor-zoom-in"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  onClick={() => setLightboxImage({ src: andheriOldSanctum, alt: 'Sanctum Club Page - Before (Andheri)', caption: 'Initial Club Page (Andheri)' })}
                >
                  <img
                    src={andheriOldSanctum}
                    alt="Sanctum Club Page - Before (Andheri)"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  {/* Outline around plain text details */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[63.0%] top-[27.2%] w-[20.2%] h-[17.2%] rounded-xl sm:rounded-2xl border-2 border-[#FF4D4D] shadow-[0_0_18px_rgba(255,77,77,0.35)] pointer-events-none"
                    style={{ background: 'rgba(255, 77, 77, 0.06)' }}
                  />
                </div>
              </div>

              {/* Redesign Decision & Experience */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  I redesigned the Andheri, Juhu and Khar pages and turned the key information into three tappable actions: WhatsApp, Call and Directions. I made them one-tap on purpose, because visitors from ads were ready to act.
                </p>
                <p>
                  A visitor landing from an ad can message, call or get directions in one tap.
                </p>
              </TextReveal>

              {/* Specific Image: (After image) */}
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full font-semibold"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)', fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                  >
                    After
                  </span>
                  <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                    Redesigned Club Page with Direct Actions (Juhu)
                  </span>
                </div>
                <div
                  className="w-full aspect-[3840/2556] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 relative group cursor-zoom-in"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  onClick={() => setLightboxImage({ src: juhuSanctum, alt: 'Sanctum Redesigned Club Page with Direct Actions - After (Juhu)', caption: 'Redesigned Club Page with Direct Actions (Juhu)' })}
                >
                  <img
                    src={juhuSanctum}
                    alt="Sanctum Redesigned Club Page with Direct Actions - After (Juhu)"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                  {/* Outline around action buttons */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-[62.8%] top-[28.8%] w-[25.0%] h-[14.4%] rounded-xl sm:rounded-2xl border-2 border-[#FF4D4D] shadow-[0_0_18px_rgba(255,77,77,0.35)] pointer-events-none"
                    style={{ background: 'rgba(255, 77, 77, 0.06)' }}
                  />
                </div>
              </div>

              {/* Client Report Card */}
              <div
                className="w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border shadow-xs flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 hover:shadow-md mt-1"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
              >
                <span 
                  className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-semibold"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  CLIENT REPORT
                </span>
                <blockquote className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-[1.35]">
                  “Roughly 3x WhatsApp and phone enquiries within 3 weeks of the change.”
                </blockquote>
              </div>
            </div>

            {/* Decision 02 */}
            <div id="decision-2" className="flex flex-col gap-5 pt-3">
              <TextReveal className="flex flex-col gap-2">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  2. Putting location into the structure, because the cards couldn’t hold it
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    GroupX runs classes across several locations, so users needed to know which classes were offered where before they booked. Wix Bookings offers four preset layouts (Side by Side, Overlapping, Strip, Grid), and every one shows the same fields: image, name, short description, days, duration and Book Now. There is no field for location, I couldn’t change the image sizes and shapes, and the booking flow was fixed. With no location on the cards, a combined list of classes couldn’t say where each class runs.
                  </p>
                  <p>
                    I moved location out of the cards and into the structure of the site. A separate “GroupX near you” page has a location filter (All Services, Andheri East, Juhu, Khar), and the same class widget sits on every club page, where the page already tells the user the location. I used the Wix Bookings widget instead of a custom flow because building one would have been a project in itself, and we had a deadline.
                  </p>
                </div>
              </TextReveal>

              {/* Specific Image: (GroupX page image) */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[3388/1758] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm cursor-zoom-in group"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  onClick={() => setLightboxImage({ src: groupxSanctum, alt: 'Sanctum GroupX Class Experience with Location Filtering', caption: 'GroupX Class Experience with Location Filtering' })}
                >
                  <img
                    src={groupxSanctum}
                    alt="Sanctum GroupX Class Experience with Location Filtering"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  Users pick a location and see only that location’s classes, then book from the card.
                </p>
                <p>
                  Location discovery works inside Wix’s fixed layouts, with a booking flow users already know how to use.
                </p>
              </TextReveal>
            </div>

            {/* Decision 03 */}
            <div id="decision-3" className="flex flex-col gap-5 pt-3">
              <TextReveal className="flex flex-col gap-2">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  3. Giving Training and Recovery equal weight without overloading the homepage
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Sanctum is built on two pillars with four services each. Shown in full, the homepage section would turn into a feature list before visitors reached the club and class pages. I started by giving every service its own image card, then moved to a card grid with an icon, name and description for each item.
                  </p>
                </div>
              </TextReveal>

              {/* Specific Media: (Iterations 1 to 3) */}
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold tracking-tight text-[var(--text-primary)]">
                    Iterations
                  </h4>
                  {/* Left & Right Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollIterations('left')}
                      disabled={!canScrollLeft}
                      aria-label="Previous iteration"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        canScrollLeft
                          ? 'hover:scale-105 active:scale-95 shadow-sm'
                          : 'opacity-30 cursor-not-allowed'
                      }`}
                      style={{
                        background: 'var(--bg-surface)',
                        borderColor: 'var(--border-card)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollIterations('right')}
                      disabled={!canScrollRight}
                      aria-label="Next iteration"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        canScrollRight
                          ? 'hover:scale-105 active:scale-95 shadow-sm'
                          : 'opacity-30 cursor-not-allowed'
                      }`}
                      style={{
                        background: 'var(--bg-surface)',
                        borderColor: 'var(--border-card)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Horizontal Scrollable Gallery */}
                <div className="relative group/carousel">
                  <div
                    ref={iterationsScrollRef}
                    className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-1 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {iterationsData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-[84%] sm:w-[72%] md:w-[62%] snap-start flex flex-col gap-2"
                      >
                        <div
                          onClick={() => setFullscreenIterationIndex(idx)}
                          className="group relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border shadow-sm cursor-zoom-in transition-all duration-300 hover:shadow-md"
                          style={{
                            borderColor: 'var(--border-card)',
                            background: 'var(--bg-surface)',
                          }}
                        >
                          {item.type === 'video' ? (
                            <video
                              src={item.src}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <img
                              src={item.src}
                              alt={item.alt}
                              className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          )}
                        </div>
                        <span className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] font-medium px-0.5">
                          {item.caption}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Floating On-Track Navigation Arrows (appear on hover/desktop) */}
                  {canScrollLeft && (
                    <button
                      type="button"
                      onClick={() => scrollIterations('left')}
                      aria-label="Previous iteration"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-10"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                  {canScrollRight && (
                    <button
                      type="button"
                      onClick={() => scrollIterations('right')}
                      aria-label="Next iteration"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-10"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Narrative: Decision */}
              <TextReveal className="flex flex-col text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  I dropped the cards and descriptions. Each pillar became a headline with just its service names, either side of one image that shows training and recovery together. The names appear as the user scrolls.
                </p>
              </TextReveal>

              {/* Specific Media: (Final design and scroll video) */}
              <div className="pt-1">
                <div
                  className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm cursor-zoom-in group"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  onClick={() => setLightboxImage({ src: trainingScrollVideo, type: 'video', caption: 'Sanctum — Final: Revealed on scroll' })}
                >
                  <video
                    src={trainingScrollVideo}
                    title="Final: names only, revealed on scroll"
                    aria-label="Final: names only, revealed on scroll"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  The homepage introduces both pillars with equal weight and an uncluttered first screen.
                </p>
                <p>
                  This became the final direction. It suited the homepage, didn’t explain every detail, and looked premium.
                </p>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* ── CONSTRAINTS ─────────────────────────────────────────── */}
        <section id="constraints" className="flex flex-col gap-4 sm:gap-5">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Constraints
          </h2>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            {constraintsData.map((item) => {
              const isExpanded = expandedConstraint === item.id;
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
                    onClick={() => toggleConstraint(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between py-3.5 px-4 sm:py-4 sm:px-5 text-left cursor-pointer select-none group focus:outline-none"
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
                        <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 pt-0 text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[var(--text-secondary)] font-normal">
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

        {/* ── WHAT I LEARNT ───────────────────────────────────────── */}
        <section id="learnings" className="flex flex-col gap-4 sm:gap-5">
          <TextReveal className="flex flex-col">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              What I Learnt
            </h2>
          </TextReveal>

          <div className="flex flex-col gap-2.5 sm:gap-3">
            {whatILearntData.map((item) => {
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
                    className="w-full flex items-center justify-between py-3.5 px-4 sm:py-4 sm:px-5 text-left cursor-pointer select-none group focus:outline-none"
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
                        <div className="px-4 pb-3.5 sm:px-5 sm:pb-4 pt-0 text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[var(--text-secondary)] font-normal">
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

      {/* ── FULL VIEW MODAL / LIGHTBOX FOR ITERATIONS ───────────── */}
      <AnimatePresence>
        {fullscreenIterationIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFullscreenIterationIndex(null)}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          >
            {/* Top Bar: Counter, Caption & Close Button */}
            <div
              className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-white/80 text-[13px] sm:text-[14px] tracking-wider px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 font-semibold"
                  style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                >
                  {fullscreenIterationIndex + 1} / {iterationsData.length}
                </span>
                <span className="text-white/90 text-[13px] sm:text-[14px] font-medium hidden sm:inline-block">
                  {iterationsData[fullscreenIterationIndex].caption}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFullscreenIterationIndex(null)}
                aria-label="Close full view"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Navigation Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenIterationIndex((prev) =>
                  prev !== null ? (prev > 0 ? prev - 1 : iterationsData.length - 1) : null
                );
              }}
              aria-label="Previous iteration"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center Content: Image or Video */}
            <motion.div
              key={fullscreenIterationIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[82vh] w-full flex items-center justify-center p-2 z-10"
            >
              {iterationsData[fullscreenIterationIndex].type === 'video' ? (
                <video
                  src={iterationsData[fullscreenIterationIndex].src}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl block bg-black"
                />
              ) : (
                <img
                  src={iterationsData[fullscreenIterationIndex].src}
                  alt={iterationsData[fullscreenIterationIndex].alt}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl block"
                />
              )}
            </motion.div>

            {/* Right Navigation Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenIterationIndex((prev) =>
                  prev !== null ? (prev < iterationsData.length - 1 ? prev + 1 : 0) : null
                );
              }}
              aria-label="Next iteration"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── OUTCOME CAROUSEL GALLERY LIGHTBOX MODAL ─────────────── */}
      <ImageLightboxModal
        images={outcomeImages.map((s) => ({
          src: s.img,
          alt: s.alt,
          caption: `Sanctum Outcome — ${s.title}`,
        }))}
        initialIndex={outcomeLightboxIndex ?? 0}
        isOpen={outcomeLightboxIndex !== null}
        onIndexChange={(idx) => setActiveSlide(idx)}
        onClose={() => setOutcomeLightboxIndex(null)}
      />

      {/* ── SINGLE IMAGE PREVIEW LIGHTBOX MODAL ─────────────────── */}
      <ImageLightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};

export default SanctumCaseStudy;
