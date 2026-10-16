import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import CaseStudyFooter from '../components/CaseStudyFooter';
import TextReveal from '../components/TextReveal';
import SpinningCounter from '../components/SpinningCounter';
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
    alt: 'Sanctum Training and Recovery Iteration Video',
  },
  {
    type: 'image' as const,
    src: recoveryIteration2Img,
    alt: 'Sanctum Training and Recovery Iteration 2',
  },
  {
    type: 'image' as const,
    src: recoveryIteration3Img,
    alt: 'Sanctum Training and Recovery Iteration 3',
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
  const [expandedConstraint, setExpandedConstraint] = useState<string | null>(null);
  const [expandedLearning, setExpandedLearning] = useState<string | null>(null);

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
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
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
            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-contain block"
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
              <div className="flex flex-col gap-1 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <div>
                  <span >Yash Moon</span> <br></br>
                  <span className="text-xs text-[var(--text-muted)]">(Design Lead)</span>
                </div>
                <div>
                  <span >Tarun Madan</span><br></br>
                  <span className="text-xs text-[var(--text-muted)]">(UI/UX Designer)</span>
                </div>
                <div>
                  <span >Shruti Katekar</span><br></br>
                  <span className="text-xs text-[var(--text-muted)]">(UI/UX Designer)</span>
                </div>
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

        {/* ── CONTEXT ─────────────────────────────────────────────── */}
        <section id="context" className="flex flex-col gap-3">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              Context
            </h2>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                Sanctum House of Wellness is a premium fitness and wellness brand with multiple locations across Mumbai. I worked on the website from design through implementation, creating an experience that communicated what Sanctum stands for, helped users discover the right classes and locations, and made it easier to enquire.
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
                I worked as part of a team of three designers, contributing to the design of the website, including the homepage, all club pages and the GroupX experience. I designed the screens in Figma and implemented the final experience in Wix Studio, using Wix Bookings for class scheduling and reservations.
              </p>
            </div>
          </TextReveal>
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
                  <strong >3x increase in WhatsApp and phone enquiries within 3 weeks</strong>, as reported by the client after direct contact actions were introduced on the club pages. The final experience also gave Sanctum a clearer way to communicate its brand, helped users discover GroupX classes by location, and created a more direct path from location-specific traffic to enquiry.
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
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeSlide === idx ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-top"
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
            <div id="decision-1" className="flex flex-col gap-4">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  1. Making GroupX easier to explore
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    GroupX offers a range of classes across Sanctum's locations, but users first needed to understand what classes were available and where they could take them. I designed the GroupX experience to make the relationship between class and location clearer, allowing users to browse the available sessions and understand where each class was offered before moving into the booking flow.
                  </p>
                </div>
              </TextReveal>

              {/* Mockup for Decision 01 — GroupX Experience */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[3388/1758] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src={groupxSanctum}
                    alt="Sanctum GroupX Class Experience"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Decision 02 */}
            <div id="decision-2" className="flex flex-col gap-4 pt-2">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  2. Building the experience around Training + Recovery
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Sanctum's branding already defined Training and Recovery as its two core pillars. I translated that into the website through a left-and-right visual composition, giving both pillars equal importance.
                    This helped communicate what Sanctum stood for before users moved into the details of its locations, classes and facilities.
                  </p>
                </div>
              </TextReveal>

              {/* Video Mockup for Decision 02 — Training Scroll Video */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <video
                    src={trainingScrollVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-contain block"
                  />
                </div>
              </div>

              {/* Iterations for Decision 02 */}
              <div className="flex flex-col gap-4 pt-4">
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
                        onClick={() => setFullscreenIterationIndex(idx)}
                        className="group relative flex-shrink-0 w-[84%] sm:w-[72%] md:w-[62%] aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border shadow-sm cursor-pointer snap-start transition-all duration-300 hover:shadow-md"
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

                        {/* Hover Overlay with Expand Affordance */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-3 sm:p-4">
                          <div className="flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Full view</span>
                          </div>
                        </div>
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
            </div>

            {/* Decision 03 */}
            <div id="decision-3" className="flex flex-col gap-4 pt-2">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  3. Turning club pages into actionable experiences
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    After the website went live, Meta Ads started driving traffic to specific Sanctum locations. We knew the campaigns were targeting areas around the clubs, so users landing on these pages were often already interested in a particular location.
                    I redesigned the Andheri, Juhu and Khar club pages and later added direct WhatsApp, Phone and Directions actions to make it easier for users to ask questions, call the club or find their way there.
                    About a week after the change, the client shared that WhatsApp and phone enquiries had increased by approximately <strong>3X</strong>.
                  </p>
                </div>
              </TextReveal>

              {/* Before vs After Screens for Decision 03 */}
              <div className="flex flex-col gap-8 sm:gap-10 pt-2">
                {/* Before Screen */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full font-medium"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}
                    >
                      Before
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                      Initial Club Page (Andheri)
                    </span>
                  </div>
                  <div
                    className="w-full aspect-[3840/2556] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm transition-all duration-300"
                    style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  >
                    <img
                      src={andheriOldSanctum}
                      alt="Sanctum Club Page - Before (Andheri)"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* After / Redesigned Screen */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full font-medium"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}
                    >
                      After
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                      Redesigned Club Page with Direct Actions (Juhu)
                    </span>
                  </div>
                  <div
                    className="w-full aspect-[3840/2556] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm transition-all duration-300"
                    style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  >
                    <img
                      src={juhuSanctum}
                      alt="Sanctum Redesigned Club Page with Direct Actions - After (Juhu)"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
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
            {/* Top Bar: Counter & Close Button */}
            <div
              className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white/80 text-[13px] sm:text-[14px] font-mono tracking-wider px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                {fullscreenIterationIndex + 1} / {iterationsData.length}
              </span>
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
    </div>
  );
};

export default SanctumCaseStudy;
