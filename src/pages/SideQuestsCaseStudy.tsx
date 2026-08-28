import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import nothingCalculatorImg from '../assets/3.Side Project Large.webp';
import instaReelsPrototype from '../assets/Insta Reels Prototype.webm';
import beforeFlipkartImg from '../assets/Before Flipkart checkout.webp';
import afterFlipkartImg from '../assets/After Flipkart Checkout.webp';

export const SideQuestsCaseStudy: React.FC = () => {
  const navigate = useNavigate();
  const instaVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingInsta, setIsPlayingInsta] = useState(true);

  const toggleInstaPlay = () => {
    if (instaVideoRef.current) {
      if (instaVideoRef.current.paused) {
        instaVideoRef.current.play();
        setIsPlayingInsta(true);
      } else {
        instaVideoRef.current.pause();
        setIsPlayingInsta(false);
      }
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Next project loops back to Rizen
  const nextProject = projects.find((p) => p.id === 'rizen') || projects[0];

  return (
    <div
      className="min-h-screen relative pb-28 text-left overflow-x-hidden w-full max-w-full"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Floating Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-24 sm:pt-28 flex flex-col gap-14 sm:gap-20">
        
        {/* ── HERO TITLE & INTRO ───────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              Design Explorations · UI/UX Experiments · Side Projects
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Side Quests
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              A collection of small design explorations, interface experiments, and everyday UX problems I wanted to solve.
            </p>
          </div>
        </section>

        {/* ── 01: NOTHING CALCULATOR (Two-Column Layout) ───────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                1. Nothing Calculator
              </h2>
              <p className="text-[17px] sm:text-[19px] font-medium text-[var(--text-primary)]">
                UI exploration for Nothing Calculator
              </p>
            </div>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal">
              <p>
                A visual redesign of the calculator experience inspired by Nothing’s minimal, distinctive design language. The exploration focused on typography, spacing, hierarchy, and creating a calculator interface that feels native to the Nothing ecosystem.
              </p>
            </div>
          </div>

          {/* Right Column: Mockup (Matches Rizen mockup sizing) */}
          <div className="lg:col-span-6 flex justify-center items-center py-2">
            <img
              src={nothingCalculatorImg}
              alt="Nothing Calculator UI Exploration"
              className="w-full max-w-[230px] sm:max-w-[260px] lg:max-w-[280px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </section>

        {/* ── DIVIDER ─────────────────────────────────────────────── */}
        <div className="w-full h-[1px]" style={{ background: 'var(--border-card)' }} />

        {/* ── 02: INSTAGRAM REELS (Two-Column Layout) ──────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          {/* Left Column: Text Content + Problem & Solution */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                2. Instagram Reels
              </h2>
              <p className="text-[17px] sm:text-[19px] font-medium text-[var(--text-primary)]">
                Making shared reels easier to browse and reply to
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* The Problem */}
              <div
                className="flex flex-col gap-2 p-5 sm:p-6 rounded-2xl border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <h3 className="text-[17px] sm:text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                  The Problem
                </h3>
                <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-secondary)] font-normal">
                  When a friend sends multiple reels in a DM, each reel has to be opened individually. After watching and reacting, you have to go back to the chat to open the next one. Repeating this makes the experience unnecessarily fragmented.
                </p>
              </div>

              {/* The Solution */}
              <div
                className="flex flex-col gap-2 p-5 sm:p-6 rounded-2xl border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <h3 className="text-[17px] sm:text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                  The Solution
                </h3>
                <div className="flex flex-col gap-2 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-secondary)] font-normal">
                  <p>
                    I added a section in the Reels tab where users can see all the reels shared by a friend in one place. They can scroll through the reels one by one and reply to them directly without going back to the chat each time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prototype Video (Click to Pause / Play) */}
          {/* Right Column: Prototype Video (Matches Rizen mockup sizing) */}
          <div className="lg:col-span-6 flex justify-center items-center py-2">
            <div
              onClick={toggleInstaPlay}
              role="button"
              tabIndex={0}
              aria-label={isPlayingInsta ? "Pause Instagram Reels prototype video" : "Play Instagram Reels prototype video"}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleInstaPlay();
                }
              }}
              className="relative cursor-pointer select-none w-full max-w-[230px] sm:max-w-[260px] lg:max-w-[280px] rounded-[48px] overflow-hidden drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
            >
              <video
                ref={instaVideoRef}
                src={instaReelsPrototype}
                autoPlay
                loop
                muted
                playsInline
                onPlay={() => setIsPlayingInsta(true)}
                onPause={() => setIsPlayingInsta(false)}
                className="w-full h-auto object-contain block rounded-[48px]"
              />
            </div>
          </div>
        </section>

        {/* ── DIVIDER ─────────────────────────────────────────────── */}
        <div className="w-full h-[1px]" style={{ background: 'var(--border-card)' }} />

        {/* ── 03: FLIPKART CHECKOUT ───────────────────────────────── */}
        <section className="flex flex-col gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              3. Flipkart Checkout
            </h2>
            <p className="text-[17px] sm:text-[19px] font-medium text-[var(--text-primary)]">
              Adding context to the payment step
            </p>
          </div>

          {/* Problem & Solution Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-1">
            {/* The Problem */}
            <div
              className="flex flex-col gap-2.5 p-6 rounded-2xl border"
              style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
            >
              <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-[var(--text-primary)]">
                The Problem
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal">
                The payment screen doesn't provide enough visibility into the items being purchased. A user may not be able to quickly verify details such as the selected MacBook colour, variant, or whether an extra item was accidentally added before completing payment.
              </p>
            </div>

            {/* The Solution */}
            <div
              className="flex flex-col gap-2.5 p-6 rounded-2xl border"
              style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
            >
              <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight text-[var(--text-primary)]">
                The Solution
              </h3>
              <div className="flex flex-col gap-2 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal">
                <p>
                  I added an <strong className="font-semibold text-[var(--text-primary)]">Order Summary</strong> to the checkout experience, allowing users to quickly review what they're purchasing before making the payment.
                </p>
              </div>
            </div>
          </div>

          {/* Before vs After Screens (Neutral Badges & Scaled Sizing) */}
          <div className="flex flex-col gap-10 sm:gap-12 pt-2">
            {/* Before */}
            <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}
                  >
                    Before
                  </span>
                  <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                    Original Payment Screen
                  </span>
                </div>
              </div>
              <div
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 hover:border-[var(--text-primary)]"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src={beforeFlipkartImg}
                  alt="Flipkart Original Payment Screen - Before"
                  className="w-full h-auto object-contain block"
                />
              </div>
              
            </div>

            {/* After */}
            <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full font-medium"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}
                  >
                    After
                  </span>
                  <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                    Redesigned Payment Screen with Order Summary
                  </span>
                </div>

              </div>
              <div
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 hover:border-[var(--text-primary)]"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src={afterFlipkartImg}
                  alt="Flipkart Redesigned Payment Screen - After"
                  className="w-full h-auto object-contain block"
                />
              </div>
              
            </div>
          </div>
        </section>

        {/* ── FOOTER / NEXT PROJECT NAVIGATION ─────────────────────── */}
        <footer
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderColor: 'var(--border-card)' }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          <button
            onClick={() => navigate(`/work/${nextProject.id}`)}
            className="flex items-center gap-3 p-3 px-5 rounded-xl border transition-colors hover:border-[var(--text-primary)] cursor-pointer group"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
                Next Case Study
              </span>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {nextProject.title}
              </span>
            </div>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-0.5"
              style={{ background: 'var(--bg-base)', border: '1px solid var(--border-card)' }}
            >
              <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-[var(--text-primary)]" />
            </div>
          </button>
        </footer>

      </main>
    </div>
  );
};

export default SideQuestsCaseStudy;
