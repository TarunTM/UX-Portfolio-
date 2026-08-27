import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import heroRizen from '../assets/Rizen Img/Hero Rizen.webp';
import homeMockup from '../assets/Rizen Img/Home Mockup.webp';
import workoutPlanMockup from '../assets/Rizen Img/Workout Plan Mockup.webp';
import recordWorkoutMockup from '../assets/Rizen Img/Record Workout Mockup.webp';
import friendsProfileMockup from '../assets/Rizen Img/Friends Profile Mockup.webp';
import friendsActivityMockup from '../assets/Rizen Img/Friends Activity Mockup.webp';
import rankSystem from '../assets/Rizen Img/Rank System.webp';
import achievementBadges from '../assets/Rizen Img/Achievement Badges.webp';

export const RizenCaseStudy: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find next project in the list
  const currentIdx = projects.findIndex((p) => p.id === 'rizen');
  const nextProject = projects[(currentIdx + 1) % projects.length] || projects[1] || projects[0];

  return (
    <div
      className="min-h-screen relative pb-28 text-left"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Floating Navbar */}
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 flex flex-col gap-10 sm:gap-14">
        
        {/* ── HERO TITLE & INTRO ───────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              Mobile App · Fitness & Habit Formation
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              RIZEN
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              Fitness Journey Companion to achieve fitness goals.
            </p>
          </div>

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
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>Product Designer (PG Austin UX Project)</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(UI/UX Lead)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
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
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TEAM
              </span>
              <div className="flex flex-col gap-1 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <div>
                  <span >6 Designers</span> <br></br>
                  {/* <span className="text-xs text-[var(--text-muted)]">(Design Lead)</span> */}
                </div>
                {/* <div>
                  <span >Tarun Madan</span> <br></br>
                  <span className="text-xs text-[var(--text-muted)]">(UI/UX Designer)</span>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                1 Month
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TOOLS
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Figma</span>
                <span>FigJam</span>
                <span>Wix Studio</span>
                <span>Asana</span>
                <span>Google Meet </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTEXT ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Context
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              Rizen is a fitness journey companion designed to help people stay committed to their fitness goals through workout planning, progress tracking and social accountability.
              This was a project I worked on as part of my PG UX Austin course, starting with a simple question: how might we help people stay committed to their fitness goals? <br></br>
              The challenge was to move beyond workout tracking and help users stay consistent and return after missing a workout. The problem wasn't starting. It was restarting.
              After Survey & 5 user interviews we noticed user didn't necessarily want more motivation or another public leaderboard. They wanted structure, visible progress and accountability from people they actually knew.
            </p>
          </div>
        </section>

        {/* ── THE PROBLEM ─────────────────────────────────────────── */}
        {/* <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            The Problem
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              The internship program lacked a dedicated website, leaving information scattered and hard to find. Without a centralized home, users struggled to learn about the program and apply, limiting its growth. There is an internship program — but no home to call its own.
            </p>
          </div>
        </section> */}

        {/* ── MY ROLE ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            My Role & Scope
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
                I worked across the workout experience, social/accountability features, gamification and visual direction, while also contributing to the information architecture, user flows and high-fidelity UI.
                I was also involved in Product Thinking (MVP) like sharing workouts with friends or clients, and the XP, rank, streak and achievement system.
            </p>
          </div>
        </section>

        {/* ── OUTCOME ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-6 sm:gap-8">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Outcome
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Mockup */}
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
                <img
                  src={homeMockup}
                  alt="Rizen Home Screen Outcome Mockup"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
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

        {/* ── KEY DESIGN DECISIONS ─────────────────────────────────── */}
        <section className="flex flex-col gap-5 sm:gap-6">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Key Design Decisions
          </h2>

          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Decision 01 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  1. Separate Planning from Doing
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Planning a workout and actually doing one are two very different things.
                    When planning, users need to browse, customise and decide what they're going to do. Once they're working out, they just need to focus on the session, so we separated Workout Plans from Record Workout.
                  </p>
                </div>
              </div>

              {/* 2 Side-by-Side Phone Mockups with divided captions above */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 pt-2 items-start justify-items-center">
                {/* 1st Mockup: Plan */}
                <div className="w-full flex flex-col items-center gap-3">
                  <p className="text-[16px] sm:text-[17px] font-medium text-[var(--text-primary)] text-center italic">
                    "Plan when you're planning"
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
                    "Execute when you're training"
                  </p>
                  <img
                    src={recordWorkoutMockup}
                    alt="Record Workout Mode Mockup"
                    className="w-full max-w-[220px] sm:max-w-[255px] md:max-w-[270px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
                  />
                </div>
              </div>
            </div>

            {/* Decision 02 */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  2. Accountability Without Comparison Anxiety
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    We initially considered public leaderboards, but our interviews showed that users were more comfortable competing or staying accountable within their own circles.
                    So instead of ranking users against an entire country or the world, we built the social experience around friends, activity, profiles and group rankings. We also made workouts shareable, so users could share routines with friends or clients.                  
                  </p>
                </div>
              </div>

              {/* Centered Quote across both images */}
              <div className="w-full flex justify-center pt-2">
                <p className="text-[16px] sm:text-[17px] font-medium text-[var(--text-primary)] text-center italic">
                  "My friend is working out. I should probably show up too."
                </p>
              </div>

              {/* 2 Side-by-Side Phone Mockups for Decision 02 */}
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
            </div>

            {/* Decision 03 */}
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  3. Gamification That Makes Progress Feel Good
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    I wanted gamification to make progress feel rewarding without making Rizen feel like a game.<br />
                    So each part had a different purpose:<br />
                    <b>XP</b> shows progress.<br />
                    <b>Ranks</b> show long-term progression.<br />
                    <b>Streaks</b> celebrate consistency.<br />
                    <b>Achievements</b> to celebrate smaller milestones.<br />
                    We chose familiar rank names because our research was conducted with Indian users, many of whom were already familiar with similar progression systems through games.
                  </p>
                </div>
              </div>

              {/* Visual Artifacts: Rank System & Achievement Badges */}
              <div className="flex flex-col gap-6 pt-2">
                {/* 1. Rank System */}
                <div className="flex flex-col gap-3">
                  <p className="text-[16px] font-bold text-[var(--text-primary)]">
                    The Rank progression became
                  </p>
                  <div className="w-full py-1">
                    <img
                      src={rankSystem}
                      alt="The Rank progression system: Iron, Bronze, Silver, Gold, Diamond, Rizen Elite"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                </div>

                {/* 2. Achievement Badges */}
                <div className="flex flex-col gap-3 pt-2">
                  <p className="text-[16px] font-bold text-[var(--text-primary)]">
                    Achievement Badges
                  </p>
                  <div className="w-full py-1">
                    <img
                      src={achievementBadges}
                      alt="Achievement Badges: First Step, Momentum, Unbreakable, Record Breaker, Progress Machine, Consistent Performer"
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                </div>
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
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transform group-hover:translate-x-1 transition-transform" />
          </button>
        </footer>

      </main>
    </div>
  );
};

export default RizenCaseStudy;
