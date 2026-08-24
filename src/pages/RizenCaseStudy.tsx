import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';

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
              Designing for the comeback — behavioral UX for sustainable fitness routines.
            </p>
          </div>

          {/* Large Project Mockup */}
          <div
            className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop"
              alt="Rizen Fitness App Concept — Editorial Workout Scene"
              className="w-full h-full object-cover grayscale-[15%] contrast-[1.05]"
            />
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 pt-6 pb-2 items-start text-left">
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>Product Designer</span>
                <span className="text-xs text-[var(--text-muted)]">(UI/UX Lead)</span>
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
                  <span className="text-[var(--text-primary)] font-medium block">Jonathan Remulla</span>
                  <span className="text-xs text-[var(--text-muted)]">Design Manager</span>
                </div>
                <div>
                  <span className="text-[var(--text-primary)] font-medium block">Peter Piczon</span>
                  <span className="text-xs text-[var(--text-muted)]">Web Designer</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                4 Months
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TOOLS
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Figma</span>
                <span>FigJam</span>
                <span>Asana</span>
                <span>Slack</span>
                <span>Telegram</span>
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
              Kultivate Labs (KL), the nonprofit behind San Francisco's SOMA Pilipinas, needed a central platform for its expanding internship program established 2020. Like a startup continuing to scale, they lacked a cohesive space for users to engage with the program.
            </p>
          </div>
        </section>

        {/* ── THE PROBLEM ─────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            The Problem
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              The internship program lacked a dedicated website, leaving information scattered and hard to find. Without a centralized home, users struggled to learn about the program and apply, limiting its growth. There is an internship program — but no home to call its own.
            </p>
          </div>
        </section>

        {/* ── MY ROLE ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            My Role & Scope
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              I worked as a Product Designer within a collaborative team, focusing on Information Architecture, User Flows, Design System foundation, Hi-Fi UI, Gamification, and Ranks & Achievements.
            </p>
          </div>
        </section>

        {/* ── KEY DESIGN DECISIONS ─────────────────────────────────── */}
        <section className="flex flex-col gap-8 sm:gap-10">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Key Design Decisions
          </h2>

          {/* Decision 01 */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">
                Decision 1 — Designing for the comeback
              </h3>
              <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                <p>
                  Users often lost momentum after missing workouts. We designed recovery nudges to help users return instead of treating a missed workout as the end of their routine.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 01 */}
            <div className="flex flex-col gap-1.5">
              <div
                className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop"
                  alt="Recovery nudges and mobility comeback flow"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                Visual: Recovery Nudge & Low-Friction Restart Screen
              </span>
            </div>
          </div>

          {/* Decision 02 */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">
                Decision 2 — Separate planning from doing
              </h3>
              <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                <p>
                  Planning and exercising require different mindsets. We separated Workout Plans (discovering & customising routines) from Record Workout (focusing solely on executing the session).
                </p>
                <p className="text-base sm:text-lg font-medium text-[var(--text-primary)] italic pt-0.5">
                  "Plan when you're planning. Execute when you're training."
                </p>
              </div>
            </div>

            {/* Mockup for Decision 02 */}
            <div className="flex flex-col gap-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1483721074573-586540da5703?q=80&w=1200&auto=format&fit=crop"
                    alt="Workout routine planner discovery mode"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                    alt="Active live session record mode"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                Visual: Workout Plans Mode vs. Record Workout Mode
              </span>
            </div>
          </div>

          {/* Decision 03 */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">
                Decision 3 — Accountability without comparison anxiety
              </h3>
              <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                <p>
                  Users wanted accountability, but not the pressure of competing with everyone. We focused on friends, activity, and small-circle competition instead of global leaderboards, paired with visible rank progression (Iron to Rizen Elite).
                </p>
                <p className="text-base sm:text-lg font-medium text-[var(--text-primary)] italic pt-0.5">
                  "My friend is working out. I should probably show up too."
                </p>
              </div>
            </div>

            {/* Mockup for Decision 03 */}
            <div className="flex flex-col gap-1.5">
              <div
                className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop"
                  alt="Friends activity feed and small squad accountability"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                Visual: Home Activity, Friend Profile & Small-Circle Squad
              </span>
            </div>
          </div>
        </section>

        {/* ── OUTCOME ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Outcome & Learnings
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              Rizen evolved from a broad fitness-tracking concept into a focused experience built around Structure, Progress, Recovery, and Social Accountability.
            </p>
            <p className="text-base sm:text-lg font-medium text-[var(--text-primary)] italic pt-0.5">
              "A feature is only valuable when it supports a user behaviour."
            </p>
          </div>

          {/* Final Polished Screens Mockup Grid */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { title: 'Home & Comeback Nudge', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop' },
                { title: 'Routine Planner', img: 'https://images.unsplash.com/photo-1483721074573-586540da5703?q=80&w=800&auto=format&fit=crop' },
                { title: 'Live Workout Logger', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
                { title: 'Squad Feed', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop' },
                { title: 'Rank Progression', img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=800&auto=format&fit=crop' },
                { title: 'Milestone Rewards', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop' },
              ].map((screen, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div
                    className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border"
                    style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  >
                    <img src={screen.img} alt={screen.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] truncate">{screen.title}</span>
                </div>
              ))}
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] text-left">
              Final MVP Core Screens
            </span>
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
