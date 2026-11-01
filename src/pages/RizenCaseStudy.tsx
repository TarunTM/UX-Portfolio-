import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import CaseStudyFooter from '../components/CaseStudyFooter';
import TextReveal from '../components/TextReveal';
import { projects } from '../data/projects';
import heroRizen from '../assets/Rizen Img/Hero Rizen.webp';
import outcomePrototype from '../assets/Rizen Img/Outcome Prototype.webm';
import workoutPlanMockup from '../assets/Rizen Img/Workout Plan Mockup.webp';
import recordWorkoutMockup from '../assets/Rizen Img/Record Workout Mockup.webp';
import friendsProfileMockup from '../assets/Rizen Img/Friends Profile Mockup.webp';
import friendsActivityMockup from '../assets/Rizen Img/Friends Activity Mockup.webp';
import bottomNavImg from '../assets/Rizen Img/Bottom Navigation.webp';
import rankIron from '../assets/Rizen Img/Rank-Iron.webp';
import rankBronze from '../assets/Rizen Img/Rank-Bronze.webp';
import rankSilver from '../assets/Rizen Img/Rank-Silver.webp';
import rankGold from '../assets/Rizen Img/Rank-Gold.webp';
import rankDiamond from '../assets/Rizen Img/Rank-Diamond.webp';
import rankRizenElite from '../assets/Rizen Img/Rank-RizenElite.webp';
import badgeFirstStep from '../assets/Rizen Img/Badge-FirstStep.webp';
import badgeMomentum from '../assets/Rizen Img/Badge-Momentum.webp';
import badgeUnbreakable from '../assets/Rizen Img/Badge-Unbreakable.webp';
import badgeRecordBreaker from '../assets/Rizen Img/Badge-RecordBreaker.webp';
import badgeProgressMachine from '../assets/Rizen Img/Badge-ProgressMachine.webp';
import badgeConsistentPerformer from '../assets/Rizen Img/Badge-ConsistentPerformer.webp';

// Wireframe assets (01 to 05)
import wireframe01 from '../assets/Rizen Img/01-wireframe home.png';
import wireframe02 from '../assets/Rizen Img/02- Wireframe workout plan.png';
import wireframe03 from '../assets/Rizen Img/03-Wireframe record.png';
import wireframe04 from '../assets/Rizen Img/04-wireframe profile.png';
import wireframe05 from '../assets/Rizen Img/05-wireframe Stats.png';

// High-Fidelity Mockups
import splashMockup from '../assets/Rizen Img/Splash HIFI mockup.png';
import signupMockup from '../assets/Rizen Img/Signup HIFI MOCKUpp.png';
import homeMockup from '../assets/Rizen Img/Home Mockup.webp';
import analyticsMockup from '../assets/Rizen Img/Analytics Hifi mockup.png';
import myProfileMockup from '../assets/Rizen Img/My profile HIfi Mockup.png';
import settingsMockup from '../assets/Rizen Img/Settings HIFI mockup.png';

const wireframesData = [
  {
    num: '01',
    src: wireframe01,
    alt: '01 · Home Wireframe',
    title: 'Home & Feed',
    desc: 'Daily streak, today’s workout card, and friend activity preview',
  },
  {
    num: '02',
    src: wireframe02,
    alt: '02 · Workout Plan Wireframe',
    title: 'Workout Plans',
    desc: 'Categorized split browsing and routine creation flow',
  },
  {
    num: '03',
    src: wireframe03,
    alt: '03 · Record Workout Wireframe',
    title: 'Record Workout',
    desc: 'Live execution mode with rest timers and set counter',
  },
  {
    num: '04',
    src: wireframe04,
    alt: '04 · Profile Wireframe',
    title: 'Profile & Social',
    desc: 'Stats, current rank tier, and friend connection cards',
  },
  {
    num: '05',
    src: wireframe05,
    alt: '05 · Stats Wireframe',
    title: 'Stats & Consistency',
    desc: 'Volume tracking, consistency logs, and progression analytics',
  },
];

const hifiScreensData = [
  {
    num: '01',
    src: splashMockup,
    alt: 'Splash Screen Mockup',
    title: 'Splash Screen',
    caption: 'Brand Identity',
  },
  {
    num: '02',
    src: signupMockup,
    alt: 'Sign Up Screen Mockup',
    title: 'Sign In / Welcome',
    caption: 'Authentication & Onboarding',
  },
  {
    num: '03',
    src: homeMockup,
    alt: 'Home Screen Mockup',
    title: 'Home Screen',
    caption: 'Daily Focus, Streaks & Feed',
  },
  {
    num: '04',
    src: workoutPlanMockup,
    alt: 'Workout Plan Screen Mockup',
    title: 'Workout Plan',
    caption: 'Plan Mode & Custom Splits',
  },
  {
    num: '05',
    src: analyticsMockup,
    alt: 'Analytics Screen Mockup',
    title: 'Analytics & Progress',
    caption: 'PRs & Progressive Overload',
  },
  {
    num: '06',
    src: myProfileMockup,
    alt: 'My Profile Screen Mockup',
    title: 'My Profile',
    caption: 'Rank Progression & Badges',
  },
  {
    num: '07',
    src: friendsActivityMockup,
    alt: 'Friends Activity Mockup',
    title: 'Friends Activity',
    caption: 'Accountability Feed',
  },
  {
    num: '08',
    src: friendsProfileMockup,
    alt: 'Friends Profile Mockup',
    title: 'Friends Profile',
    caption: 'Routine Sharing',
  },
  {
    num: '09',
    src: settingsMockup,
    alt: 'Settings Screen Mockup',
    title: 'Settings',
    caption: 'Preferences & Splits',
  },
];

export const RizenCaseStudy: React.FC = () => {
  const outcomeVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingOutcome, setIsPlayingOutcome] = useState(true);

  // Wireframes Scroll & Fullscreen State
  const wireframesScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollWireframesLeft, setCanScrollWireframesLeft] = useState(false);
  const [canScrollWireframesRight, setCanScrollWireframesRight] = useState(true);
  const [fullscreenWireframeIndex, setFullscreenWireframeIndex] = useState<number | null>(null);

  // Hi-Fi Screens Scroll & Fullscreen State
  const screensScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollScreensLeft, setCanScrollScreensLeft] = useState(false);
  const [canScrollScreensRight, setCanScrollScreensRight] = useState(true);
  const [fullscreenScreenIndex, setFullscreenScreenIndex] = useState<number | null>(null);

  const toggleOutcomePlay = () => {
    if (outcomeVideoRef.current) {
      if (outcomeVideoRef.current.paused) {
        outcomeVideoRef.current.play();
        setIsPlayingOutcome(true);
      } else {
        outcomeVideoRef.current.pause();
        setIsPlayingOutcome(false);
      }
    }
  };

  const checkWireframesScroll = () => {
    if (!wireframesScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = wireframesScrollRef.current;
    setCanScrollWireframesLeft(scrollLeft > 10);
    setCanScrollWireframesRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const checkScreensScroll = () => {
    if (!screensScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = screensScrollRef.current;
    setCanScrollScreensLeft(scrollLeft > 10);
    setCanScrollScreensRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollWireframes = (direction: 'left' | 'right') => {
    if (!wireframesScrollRef.current) return;
    const scrollAmount = wireframesScrollRef.current.clientWidth * 0.75;
    wireframesScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollScreens = (direction: 'left' | 'right') => {
    if (!screensScrollRef.current) return;
    const scrollAmount = screensScrollRef.current.clientWidth * 0.75;
    screensScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenWireframeIndex !== null) {
        if (e.key === 'Escape') setFullscreenWireframeIndex(null);
        else if (e.key === 'ArrowLeft') {
          setFullscreenWireframeIndex((prev) =>
            prev !== null ? (prev > 0 ? prev - 1 : wireframesData.length - 1) : null
          );
        } else if (e.key === 'ArrowRight') {
          setFullscreenWireframeIndex((prev) =>
            prev !== null ? (prev < wireframesData.length - 1 ? prev + 1 : 0) : null
          );
        }
      } else if (fullscreenScreenIndex !== null) {
        if (e.key === 'Escape') setFullscreenScreenIndex(null);
        else if (e.key === 'ArrowLeft') {
          setFullscreenScreenIndex((prev) =>
            prev !== null ? (prev > 0 ? prev - 1 : hifiScreensData.length - 1) : null
          );
        } else if (e.key === 'ArrowRight') {
          setFullscreenScreenIndex((prev) =>
            prev !== null ? (prev < hifiScreensData.length - 1 ? prev + 1 : 0) : null
          );
        }
      }
    };

    if (fullscreenWireframeIndex !== null || fullscreenScreenIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenWireframeIndex, fullscreenScreenIndex]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find next project in the list
  const currentIdx = projects.findIndex((p) => p.id === 'rizen');
  const nextProject = projects[(currentIdx + 1) % projects.length] || projects[1] || projects[0];

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
              Mobile App · Fitness & Habit Formation
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              RIZEN
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              Fitness Journey Companion to achieve fitness goals.
            </p>
          </TextReveal>

          {/* Large Project Hero Image — Uncropped Natural Aspect Ratio */}
          <div
            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <img
              src={heroRizen}
              alt="Rizen Fitness App Showcase — Hero Mockup"
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
                <span>Product Designer (PG Austin UX Project)</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(UI/UX Lead)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                WHAT I DID
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Product Design</span>
                <span>User Research</span>
                <span>Prototyping</span>
                <span>Product Thinking</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TEAM
              </span>
              <div className="flex flex-col gap-1 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <div>
                  <span >Team of 6 UX learners</span> <br></br>
                  {/* <span className="text-xs text-[var(--text-muted)]">(Design Lead)</span> */}
                </div>
                {/* <div>
                  <span >Tarun Madan</span> <br></br>
                  <span className="text-xs text-[var(--text-muted)]">(UI/UX Designer)</span>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                1 Month
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TOOLS
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Figma</span>
                <span>FigJam</span>
                <span>Balsamiq</span>
                <span>Google Meet</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUTCOME ─────────────────────────────────────────────── */}
        <section id="outcome" className="flex flex-col gap-6 sm:gap-8">
          <TextReveal className="flex flex-col">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              Outcome
            </h2>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Prototype Video (Click to Pause / Play) */}
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div
                onClick={toggleOutcomePlay}
                role="button"
                tabIndex={0}
                aria-label={isPlayingOutcome ? "Pause prototype video" : "Play prototype video"}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleOutcomePlay();
                  }
                }}
                className="relative cursor-pointer select-none w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.22)]"
              >
                <video
                  ref={outcomeVideoRef}
                  src={outcomePrototype}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onPlay={() => setIsPlayingOutcome(true)}
                  onPause={() => setIsPlayingOutcome(false)}
                  className="w-full h-auto object-contain block rounded-[44px]"
                />
              </div>
            </div>

            {/* Right Narrative & Core Pillars */}
            <div className="md:col-span-7 flex flex-col justify-center gap-6 sm:gap-7 text-left">
              <p className="text-[16px] sm:text-[18px] md:text-[19px] leading-[1.75] text-[var(--text-secondary)] font-normal">
                Rizen evolved from a simple workout-tracking idea into a fitness companion built around
              </p>

              <div className="text-[16px] sm:text-[18px] md:text-[19px] font-medium tracking-wide text-[var(--text-primary)] text-center sm:text-left py-1">
                Plan <span className="text-[var(--text-muted)] mx-1">|</span> Workout <span className="text-[var(--text-muted)] mx-1">|</span> Progress <span className="text-[var(--text-muted)] mx-1">|</span> Accountability
              </div>

              <p className="text-[16px] sm:text-[18px] md:text-[19px] leading-[1.75] text-[var(--text-secondary)] font-normal">
                The final product brought together workout plans, workout tracking, progress, social features and gamification in one mobile experience.
              </p>
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
                Rizen is a fitness companion that helps people stay committed through workout planning, progress tracking and social accountability. I worked on it as part of my PG UX Austin course, starting with the question: how might we help people stay committed to their fitness goals? The challenge was to move beyond workout tracking and help users return after missing a workout. The problem wasn’t starting. It was restarting.
              </p>
            </div>
          </TextReveal>
        </section>

        {/* ── MY ROLE & SCOPE ───────────────────────────────────────── */}
        <section id="role" className="flex flex-col gap-3">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              My Role & Scope
            </h2>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                I worked across the workout experience, social and accountability features, gamification and visual direction, and contributed to the information architecture, user flows and high-fidelity UI. I also owned the MVP product thinking, including workout sharing and the XP, rank, streak and achievement system.
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
            <div id="decision-1" className="flex flex-col gap-4">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  1. Replacing public leaderboards with friends-only accountability
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Our first plan leaned on competition, but competition can motivate some people and make others feel they’re behind. The initial plan was workout tracking and gamification with ranks and public leaderboards.
                  </p>
                  <p>
                    After our survey and 5 interviews, we saw that users preferred competing with friends over everyone. I proposed refining the MVP around that. Instead of ranking users against a country or the world, I built the social layer around friends: an activity feed, profiles and group rankings, plus shareable routines for friends or clients. Public leaderboards were removed to prevent comparison anxiety.
                  </p>
                </div>
              </TextReveal>

              {/* Centered Quote across both images */}
              <div className="w-full flex justify-center pt-2">
                <p className="text-[16px] sm:text-[17px] font-medium text-[var(--text-primary)] text-center italic">
                  “My friend is working out. I should probably show up too.”
                </p>
              </div>

              {/* 2 Side-by-Side Phone Mockups for Decision 01 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 pt-2 items-center justify-items-center">
                <div className="w-full flex justify-center">
                  <img
                    src={friendsActivityMockup}
                    alt="Friends Activity Feed Mockup"
                    className="w-full max-w-[220px] sm:max-w-[255px] md:max-w-[270px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
                  />
                </div>
                <div className="w-full flex justify-center">
                  <img
                    src={friendsProfileMockup}
                    alt="Friends Profile Mockup"
                    className="w-full max-w-[220px] sm:max-w-[255px] md:max-w-[270px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
                  />
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  The social experience centers on people the user already knows. Public leaderboards left the MVP, and the friends feed and routine sharing became must-haves.
                </p>
              </TextReveal>
            </div>

            {/* Decision 02 */}
            <div id="decision-2" className="flex flex-col gap-5 pt-3">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  2. Scoping the MVP with Must Have vs Nice to Have
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    We had a list of good ideas and one month to design them. The ideas on the table included workout tracking, progress, social features, gamification, public leaderboards, AI workout assistance and trainer booking.
                  </p>
                  <p>
                    I took the revised scope to the team using a Must Have vs Nice to Have approach. We kept four must-haves, each with a clear scope:
                  </p>
                </div>
              </TextReveal>

              {/* 4 Core Focus Areas - Max 2 Cards Per Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {[
                  {
                    title: "Workout Tracking",
                    desc: "Set, rep & rest timer logging",
                    badge: "Must Have"
                  },
                  {
                    title: "Progress Tracking",
                    desc: "PRs, volume & consistency logs",
                    badge: "Must Have"
                  },
                  {
                    title: "Social & Accountability",
                    desc: "Friends feed & routine sharing",
                    badge: "Must Have"
                  },
                  {
                    title: "Lightweight Gamification",
                    desc: "XP, rank tiers, streaks & badges",
                    badge: "Must Have"
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4 border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border-card)',
                    }}
                  >
                    <span 
                      className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-semibold"
                      style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                    >
                      {item.badge}
                    </span>

                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deferred ideas narrative & cards */}
              <div className="flex flex-col gap-4 pt-1">
                <TextReveal className="flex flex-col text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
                  <p>
                    We deferred AI workout assistance to a future subscription tier and trainer booking until retention was validated:
                  </p>
                </TextReveal>

                {/* 3 Nice to Have (Moved Out) Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  {[
                    {
                      title: "Public Leaderboards",
                      desc: "Removed to prevent comparison anxiety",
                      badge: "Moved Out"
                    },
                    {
                      title: "AI Workout Assistance",
                      desc: "Deferred to a future subscription tier",
                      badge: "Phase 2"
                    },
                    {
                      title: "Trainer Booking",
                      desc: "Deferred to validate retention first",
                      badge: "Phase 2"
                    }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4 border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      style={{
                        background: 'var(--bg-card)',
                        borderColor: 'var(--border-card)',
                      }}
                    >
                      <span 
                        className="text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-semibold"
                        style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                      >
                        {item.badge}
                      </span>

                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  A focused four-area MVP gave every deferred idea a stated reason. The team designed against one agreed scope, and the deferred ideas became the Phase 2 plan at the end of this page.
                </p>
              </TextReveal>
            </div>

            {/* Wireframes: Information Architecture & Core Flows */}
            <div id="wireframes" className="flex flex-col gap-5 pt-3">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Wireframes: Translating Scope into Structure
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    With the MVP scope locked, we mapped out user flows and explored low-fidelity wireframes to test layout clarity, screen density, and navigation hierarchy before committing to visual fidelity.
                  </p>
                </div>
              </TextReveal>

              {/* Wireframes Carousel */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-center justify-end">
                  {/* Left & Right Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollWireframes('left')}
                      disabled={!canScrollWireframesLeft}
                      aria-label="Previous wireframe"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        canScrollWireframesLeft
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
                      onClick={() => scrollWireframes('right')}
                      disabled={!canScrollWireframesRight}
                      aria-label="Next wireframe"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        canScrollWireframesRight
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
                <div className="relative group/wireframes">
                  <div
                    ref={wireframesScrollRef}
                    onScroll={checkWireframesScroll}
                    className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-2 px-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {wireframesData.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-[54%] sm:w-[34%] md:w-[25%] lg:w-[21%] max-w-[210px] sm:max-w-[230px] snap-start flex flex-col items-center gap-2.5"
                      >
                        <div
                          onClick={() => setFullscreenWireframeIndex(idx)}
                          className="group relative w-full aspect-[1/2] rounded-2xl overflow-hidden border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md bg-white flex items-center justify-center"
                          style={{ borderColor: 'var(--border-card)' }}
                        >
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-end justify-end p-3">
                            <div className="flex items-center gap-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[12px] font-medium px-3 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Full view</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-0.5 px-2">
                          <span className="text-[14px] sm:text-[15px] font-semibold text-[var(--text-primary)]">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Floating Arrows */}
                  {canScrollWireframesLeft && (
                    <button
                      type="button"
                      onClick={() => scrollWireframes('left')}
                      aria-label="Previous wireframe"
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-10"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                  {canScrollWireframesRight && (
                    <button
                      type="button"
                      onClick={() => scrollWireframes('right')}
                      aria-label="Next wireframe"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-10"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Decision 03 */}
            <div id="decision-3" className="flex flex-col gap-4 pt-3">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  3. Separating planning from doing
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Planning a workout and doing one are different jobs. When planning, users browse, customise and decide. When training, they only need to focus on the session. The fitness apps I looked at put planning and recording in the same place.
                  </p>
                  <p>
                    I separated Workout Plans from Record Workout so each could be designed for one purpose.
                  </p>
                </div>
              </TextReveal>

              {/* 2 Side-by-Side Phone Mockups with divided captions above */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 pt-2 items-start justify-items-center">
                {/* 1st Mockup: Plan */}
                <div className="w-full flex flex-col items-center gap-3">
                  <p className="text-[16px] sm:text-[17px] font-medium text-[var(--text-primary)] text-center italic">
                    “Plan when you’re planning”
                  </p>
                  <img
                    src={workoutPlanMockup}
                    alt="Workout Plans Mode Mockup"
                    className="w-full max-w-[220px] sm:max-w-[255px] md:max-w-[270px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
                  />
                </div>

                {/* 2nd Mockup: Execute */}
                <div className="w-full flex flex-col items-center gap-3">
                  <p className="text-[16px] sm:text-[17px] font-medium text-[var(--text-primary)] text-center italic">
                    “Execute when you’re training”
                  </p>
                  <img
                    src={recordWorkoutMockup}
                    alt="Record Workout Mode Mockup"
                    className="w-full max-w-[220px] sm:max-w-[255px] md:max-w-[270px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
                  />
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  Planning has room to browse and customise, and recording keeps the screen on the session — two focused experiences instead of one crowded one.
                </p>
              </TextReveal>
            </div>

            {/* Decision 04 */}
            <div id="decision-4" className="flex flex-col gap-5 pt-3">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  4. Giving each part of gamification a different job
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Gamification can make progress feel rewarding or make an app feel like a game, and I wanted the first without the second. Gamification began as ranks and public leaderboards.
                  </p>
                  <p>
                    I gave each part its own purpose: XP shows progress, ranks show long-term progression, streaks celebrate consistency and achievements mark smaller milestones. I chose familiar rank names because our research was with Indian users who already knew similar progression systems from games.
                  </p>
                </div>
              </TextReveal>

              {/* Visual Artifacts: Rank System & Achievement Badges */}
              <div className="flex flex-col gap-6 pt-2">
                {/* 1. Rank System */}
                <div className="flex flex-col gap-3">
                  <p className="text-[16px] font-bold text-[var(--text-primary)]">
                    Rank Progression
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 pt-1">
                    {[
                      { image: rankIron, name: "Iron" },
                      { image: rankBronze, name: "Bronze" },
                      { image: rankSilver, name: "Silver" },
                      { image: rankGold, name: "Gold" },
                      { image: rankDiamond, name: "Diamond" },
                      { image: rankRizenElite, name: "Rizen Elite" }
                    ].map((rank, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center py-1 sm:py-2 transition-all duration-300 hover:scale-[1.05] group"
                      >
                        <div className="w-[78px] h-[78px] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center p-0.5 sm:p-1">
                          <img
                            src={rank.image}
                            alt={rank.name}
                            className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Achievement Badges */}
                <div className="flex flex-col gap-4 pt-2">
                  <p className="text-[16px] font-bold text-[var(--text-primary)]">
                    Achievement Badges
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 pt-1">
                    {[
                      {
                        image: badgeFirstStep,
                        name: "First Step",
                        desc: "First Workout Completed"
                      },
                      {
                        image: badgeMomentum,
                        name: "Momentum",
                        desc: "7-Day Streak"
                      },
                      {
                        image: badgeUnbreakable,
                        name: "Unbreakable",
                        desc: "30-Day Streak"
                      },
                      {
                        image: badgeRecordBreaker,
                        name: "Record Breaker",
                        desc: "First Personal Record"
                      },
                      {
                        image: badgeProgressMachine,
                        name: "Progress Machine",
                        desc: "Achieve 10 PRs"
                      },
                      {
                        image: badgeConsistentPerformer,
                        name: "Consistent Performer",
                        desc: "Complete 4 weeks of a plan"
                      }
                    ].map((badge, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center py-2 transition-all duration-300 hover:scale-[1.05] group"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center p-1">
                          <img
                            src={badge.image}
                            alt={badge.name}
                            className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 sm:gap-1 mt-2 sm:mt-2.5">
                          <span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-wider text-[var(--text-primary)] leading-tight">
                            {badge.name}
                          </span>
                          <span className="text-[9px] sm:text-[11px] text-[var(--text-secondary)] font-normal leading-tight">
                            {badge.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  The system includes XP, rank tiers, streaks and six badges: First Step, Momentum, Unbreakable, Record Breaker, Progress Machine and Consistent Performer. Streaks and early badges are designed to reward returning, which supports the restarting problem.
                </p>
              </TextReveal>
            </div>

            {/* Decision 05 */}
            <div id="decision-5" className="flex flex-col gap-6 pt-3">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  5. Moving from blue and purple to neon green
                </h3>
                <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Our first visual direction felt too similar to existing fitness apps. When planning colours, we generated AI design explorations, and they came out in blue and purple.
                  </p>
                  <p>
                    I moved to neon green (#C8FF3D) on a dark base (#0B0F1A), with an orange streak accent (#FF6B35), for a more energetic and distinctive identity. I created the initial system covering colour, typography, buttons, cards, spacing and icons, and chose Inter for its readability across workout data, social content and gamification.
                  </p>
                </div>
              </TextReveal>

              {/* 01 Color */}
              <div className="flex flex-col gap-5 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-4 bg-[#C8FF3D] rounded-full" />
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight">
                    01 Color
                  </h4>
                </div>

                {/* 3 Main Color Swatches */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Primary */}
                  <div className="h-28 sm:h-32 rounded-2xl bg-[#C8FF3D] p-4 sm:p-5 flex flex-col justify-between text-black shadow-sm">
                    <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                      PRIMARY
                    </span>
                    <span className="text-[20px] sm:text-[24px] font-black tracking-tight" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                      #C8FF3D
                    </span>
                  </div>

                  {/* Streak */}
                  <div className="h-28 sm:h-32 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] p-4 sm:p-5 flex flex-col justify-between text-white shadow-sm">
                    <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider opacity-90" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                      STREAK
                    </span>
                    <span className="text-[20px] sm:text-[24px] font-black tracking-tight" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                      #FF6B35
                    </span>
                  </div>

                  {/* Danger */}
                  <div className="h-28 sm:h-32 rounded-2xl bg-[#FF4D6D] p-4 sm:p-5 flex flex-col justify-between text-white shadow-sm">
                    <span className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wider opacity-90" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                      DANGER
                    </span>
                    <span className="text-[20px] sm:text-[24px] font-black tracking-tight" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                      #FF4D6D
                    </span>
                  </div>
                </div>

                {/* Neutrals Sub-section */}
                <div className="flex flex-col gap-3 pt-2">
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold px-0.5" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                    Neutrals
                  </span>

                  <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Line 1: Background & Stroke Tokens (4 items) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {[
                        { token: "bg/page", hex: "#0B0F1A", color: "#0B0F1A", borderColor: "#2A3142", textColor: "text-white" },
                        { token: "bg/surface", hex: "#161B2A", color: "#161B2A", borderColor: "#2A3142", textColor: "text-white" },
                        { token: "bg/raised", hex: "#1F2638", color: "#1F2638", borderColor: "#2A3142", textColor: "text-white" },
                        { token: "border/stroke", hex: "#2A3142", color: "#2A3142", borderColor: "#3A4356", textColor: "text-white" }
                      ].map((neutral, idx) => (
                        <div 
                          key={idx}
                          className={`h-24 sm:h-28 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border shadow-sm ${neutral.textColor}`}
                          style={{ background: neutral.color, borderColor: neutral.borderColor }}
                        >
                          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider opacity-80" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                            {neutral.token}
                          </span>
                          <span className="text-[16px] sm:text-[19px] font-black tracking-tight" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                            {neutral.hex}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Line 2: Typography & Content Tokens (3 items) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      {[
                        { token: "text/tertiary", hex: "#5A637B", color: "#5A637B", borderColor: "#4A5268", textColor: "text-white" },
                        { token: "text/secondary", hex: "#9CA3AF", color: "#9CA3AF", borderColor: "#CBD5E1", textColor: "text-black" },
                        { token: "text/primary", hex: "#FFFFFF", color: "#FFFFFF", borderColor: "#FFFFFF", textColor: "text-black" }
                      ].map((neutral, idx) => (
                        <div 
                          key={idx}
                          className={`h-24 sm:h-28 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border shadow-sm ${neutral.textColor}`}
                          style={{ background: neutral.color, borderColor: neutral.borderColor }}
                        >
                          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider opacity-80" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                            {neutral.token}
                          </span>
                          <span className="text-[16px] sm:text-[19px] font-black tracking-tight" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                            {neutral.hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 02 Typography */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-4 bg-[#C8FF3D] rounded-full" />
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight">
                    02 Typography
                  </h4>
                </div>

                <div 
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] shadow-xs flex items-center justify-between"
                >
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-widest text-[var(--text-secondary)] font-bold" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                    Typeface
                  </span>
                  <span className="text-[20px] sm:text-[24px] font-bold text-[var(--text-primary)] tracking-tight">
                    Inter
                  </span>
                </div>
              </div>

              {/* 03 Components */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-4 bg-[#C8FF3D] rounded-full" />
                  <h4 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight">
                    03 Components
                  </h4>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                  {/* Buttons & States */}
                  <div className="lg:col-span-6 p-4 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex flex-col justify-between gap-5">
                    <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
                      <span className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-bold" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                        Buttons & States
                      </span>
                      <span className="text-[11px] text-[var(--text-secondary)] font-medium" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                        Interactive
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 py-2">
                      {/* Primary Button */}
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="w-36 sm:w-40 py-2.5 sm:py-3 rounded-xl bg-[#C8FF3D] text-black font-bold text-[13px] sm:text-[14px] shadow-sm flex items-center justify-center transition-transform hover:scale-105"
                        >
                          Start Workout
                        </button>
                        <span className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] font-medium" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                          Primary
                        </span>
                      </div>

                      {/* Disabled Button */}
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          disabled
                          style={{ fontFamily: "'Inter', sans-serif" }}
                          className="w-36 sm:w-40 py-2.5 sm:py-3 rounded-xl bg-[var(--bg-surface)] text-[var(--text-secondary)] opacity-60 font-bold text-[13px] sm:text-[14px] border border-[var(--border-card)] flex items-center justify-center cursor-not-allowed"
                        >
                          Start Workout
                        </button>
                        <span className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] font-medium" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                          Disabled
                        </span>
                      </div>

                      {/* FAB Button */}
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="w-11 h-11 rounded-full bg-[#C8FF3D] text-black flex items-center justify-center shadow-md transition-transform hover:scale-110"
                        >
                          <Plus size={20} strokeWidth={3} />
                        </button>
                        <span className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] font-medium" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                          Create Plan
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="lg:col-span-6 p-4 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-card)] flex flex-col justify-between gap-5">
                    <div className="flex items-center justify-between border-b border-[var(--border-card)] pb-3">
                      <span className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-bold" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                        Bottom Navigation
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)] font-medium" style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}>
                        from IA · 5 destinations
                      </span>
                    </div>

                    {/* Bottom Navigation Image Preview */}
                    <div className="flex items-center justify-center my-auto py-4 sm:py-6 px-1">
                      <img
                        src={bottomNavImg}
                        alt="Bottom Navigation (from IA · 5 destinations)"
                        className="w-full max-w-md sm:max-w-lg object-contain transition-transform duration-300 hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* After & Result narrative */}
              <TextReveal className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl pt-1">
                <p>
                  The team had one consistent foundation for the high-fidelity screens. Establishing a distinctive identity, with Hi-Fi screens built on one shared system.
                </p>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* ── HIGH-FIDELITY SCREENS ───────────────────────────────── */}
        <section id="screens" className="flex flex-col gap-5 sm:gap-6">
          <TextReveal className="flex flex-col gap-2">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              High-Fidelity Screens
            </h2>
          </TextReveal>

          {/* Hi-Fi Screens Carousel */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-end">
              {/* Left & Right Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollScreens('left')}
                  disabled={!canScrollScreensLeft}
                  aria-label="Previous screen"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    canScrollScreensLeft
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
                  onClick={() => scrollScreens('right')}
                  disabled={!canScrollScreensRight}
                  aria-label="Next screen"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    canScrollScreensRight
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

            {/* Horizontal Scrollable Mockups */}
            <div className="relative group/screens">
              <div
                ref={screensScrollRef}
                onScroll={checkScreensScroll}
                className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {hifiScreensData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-[68%] sm:w-[42%] md:w-[32%] snap-start flex flex-col items-center gap-3.5"
                  >
                    <div
                      onClick={() => setFullscreenScreenIndex(idx)}
                      className="group relative w-full cursor-pointer flex justify-center transition-transform duration-300 hover:scale-[1.03]"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full max-w-[220px] sm:max-w-[245px] md:max-w-[260px] h-auto object-contain block"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-white text-[12px] font-medium px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View screen</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-0.5 px-2">
                      <span className="text-[14px] sm:text-[15px] font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </span>
                      <span className="text-[12px] text-[var(--text-secondary)] font-normal">
                        {item.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Floating Arrows */}
              {canScrollScreensLeft && (
                <button
                  type="button"
                  onClick={() => scrollScreens('left')}
                  aria-label="Previous screen"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-10"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              {canScrollScreensRight && (
                <button
                  type="button"
                  onClick={() => scrollScreens('right')}
                  aria-label="Next screen"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-10"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── WHAT'S NEXT / PHASE 2 ─────────────────────────────────── */}
        <section id="next" className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              What's Next for Rizen
            </h2>
            <div className="flex flex-col gap-3 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                Once the MVP was defined, I also explored opportunities to make Rizen a sustainable business beyond basic workout tracking.
              </p>
              <p className="pt-1">
                The <strong className="font-bold text-[var(--text-primary)]">Phase 2</strong> ideas focused on revenue and growth opportunities:
              </p>
            </div>
          </div>

          {/* Revenue & Growth Opportunities Cards (Max 2 cards per row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {[
              {
                title: "Community",
                desc: "Build engagement through group challenges, creator workout plans and community features.",
              },
              {
                title: "Advanced Analytics",
                desc: "Offer deeper performance, recovery and health insights as a potential premium feature.",
              },
              {
                title: "Online Coaching Marketplace",
                desc: "Connect users with certified trainers and explore a booking/commission model.",
              },
              {
                title: "AI Workout Assistance",
                desc: "AI assistance could also become part of a future subscription, using the user's existing workout and progress data to provide personalised guidance.",
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border-card)',
                }}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-[18px] sm:text-[20px] font-bold text-[var(--text-primary)] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fullscreen Lightbox for Wireframes */}
        <AnimatePresence>
          {fullscreenWireframeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setFullscreenWireframeIndex(null)}
              className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            >
              {/* Top Bar: Counter, Title & Close Button */}
              <div
                className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="text-white/80 text-[13px] sm:text-[14px] tracking-wider px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 font-semibold"
                    style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                  >
                    {fullscreenWireframeIndex + 1} / {wireframesData.length}
                  </span>
                  <span className="text-white/90 text-[13px] sm:text-[14px] font-medium hidden sm:inline-block">
                    {wireframesData[fullscreenWireframeIndex].title} · Wireframe
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFullscreenWireframeIndex(null)}
                  aria-label="Close fullscreen view"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15 backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenWireframeIndex((prev) =>
                    prev !== null ? (prev > 0 ? prev - 1 : wireframesData.length - 1) : null
                  );
                }}
                aria-label="Previous wireframe"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Lightbox Image Container */}
              <motion.div
                key={`wireframe-${fullscreenWireframeIndex}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[82vh] w-full flex items-center justify-center p-2 z-10"
              >
                <img
                  src={wireframesData[fullscreenWireframeIndex].src}
                  alt={wireframesData[fullscreenWireframeIndex].alt}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl block bg-white"
                />
              </motion.div>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenWireframeIndex((prev) =>
                    prev !== null ? (prev < wireframesData.length - 1 ? prev + 1 : 0) : null
                  );
                }}
                aria-label="Next wireframe"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Lightbox for Hi-Fi Screens */}
        <AnimatePresence>
          {fullscreenScreenIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setFullscreenScreenIndex(null)}
              className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            >
              {/* Top Bar: Counter, Title & Close Button */}
              <div
                className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between z-20 pointer-events-auto gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="text-white/80 text-[13px] sm:text-[14px] tracking-wider px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 font-semibold"
                    style={{ fontFamily: "'Hanken Grotesk', 'Satoshi', sans-serif" }}
                  >
                    {fullscreenScreenIndex + 1} / {hifiScreensData.length}
                  </span>
                  <span className="text-white/90 text-[13px] sm:text-[14px] font-medium hidden sm:inline-block">
                    {hifiScreensData[fullscreenScreenIndex].title} · {hifiScreensData[fullscreenScreenIndex].caption}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFullscreenScreenIndex(null)}
                  aria-label="Close fullscreen view"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15 backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenScreenIndex((prev) =>
                    prev !== null ? (prev > 0 ? prev - 1 : hifiScreensData.length - 1) : null
                  );
                }}
                aria-label="Previous screen"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Lightbox Image Container */}
              <motion.div
                key={`screen-${fullscreenScreenIndex}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center p-2 z-10"
              >
                <img
                  src={hifiScreensData[fullscreenScreenIndex].src}
                  alt={hifiScreensData[fullscreenScreenIndex].alt}
                  className="max-w-full max-h-[82vh] w-auto h-auto object-contain block"
                />
              </motion.div>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenScreenIndex((prev) =>
                    prev !== null ? (prev < hifiScreensData.length - 1 ? prev + 1 : 0) : null
                  );
                }}
                aria-label="Next screen"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95 z-20 backdrop-blur-sm shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FOOTER & CONTACT ───────────────────────────────────── */}
        <CaseStudyFooter nextProject={nextProject} />

      </main>
    </div>
  );
};

export default RizenCaseStudy;
