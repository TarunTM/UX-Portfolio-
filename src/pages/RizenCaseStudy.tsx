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
      className="min-h-screen relative pb-32 text-left"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Floating Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 flex flex-col gap-24 sm:gap-32">
        
        {/* ── HERO TITLE & INTRO ───────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              Mobile App · Fitness & Habit Formation
            </span>
            <h1
              className="text-5xl sm:text-7xl font-light tracking-tight text-[var(--text-primary)] leading-none"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif' }}
            >
              RIZEN
            </h1>
            <p
              className="text-2xl sm:text-3xl text-[var(--text-secondary)] font-normal leading-snug mt-1"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif', fontStyle: 'italic' }}
            >
              Designing for the comeback.
            </p>
          </div>

          {/* Large Project Mockup */}
          <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop"
              alt="Rizen Fitness App Concept — Editorial Workout Scene"
              className="w-full h-full object-cover grayscale-[15%] contrast-[1.05]"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono bg-black/60 text-white backdrop-blur-sm">
              Hero Visual · Product Concept
            </div>
          </div>

          {/* Minimal Metadata Strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-6 pb-6 border-y text-xs"
            style={{ borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">My Role</span>
              <span className="font-medium text-[var(--text-primary)]">Product Designer</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Team</span>
              <span className="font-medium text-[var(--text-primary)]">6 Designers</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Timeline</span>
              <span className="font-medium text-[var(--text-primary)]">1 Month</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Platform</span>
              <span className="font-medium text-[var(--text-primary)]">Mobile App</span>
            </div>
            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Research</span>
              <span className="font-medium text-[var(--text-primary)]"> Survey · 5 Interviews</span>
            </div>
          </div>
        </section>

        {/* ── 01 — PROJECT INTRO ────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              01 — Project Intro
            </h2>
          </div>

          <div className="flex flex-col gap-5 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
            <p>
              Rizen is a fitness companion designed to help inconsistent exercisers build sustainable workout habits through structure, progress, and accountability.
            </p>
            <p>
              The challenge was to move beyond workout tracking and help users stay consistent and return after missing a workout. The problem wasn't starting. It was restarting.
            </p>
          </div>

          {/* Project Intro Mockup */}
          {/* <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1600&auto=format&fit=crop"
                alt="Research data and fitness habit tracking insights"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 sm:p-10 text-center">
                <blockquote className="text-white text-lg sm:text-2xl font-light italic max-w-xl leading-relaxed" style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif' }}>
                  "Missing a single day wasn't what broke my habit. It was opening the app the next day and seeing a broken streak that made me want to give up."
                </blockquote>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Research synthesis · Qualitative interview quote from inconsistent exercisers
            </span>
          </div> */}
        </section>

        {/* ── 02 — MY ROLE ────────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              02 — My Role
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
            <p>
              I worked as a Product Designer within a team of 6, focusing on Information Architecture, User Flows, Design System, Hi-Fi UI, Gamification, and Ranks & Achievements.
            </p>
          </div>

          {/* Role / Design System Mockup */}
          {/* <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/8] sm:aspect-[21/8] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop"
                alt="Design System, Tokens & UI Components Strip"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Design System & UI Components Strip (Placeholder — Screens to be added)
            </span>
          </div> */}
        </section>

        {/* ── 03 — KEY DESIGN DECISIONS ────────────────────────────── */}
        <section className="flex flex-col gap-20 sm:gap-28">
          <div className="flex flex-col gap-2 border-b pb-4" style={{ borderColor: 'var(--border-card)' }}>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              03 — Key Design Decisions
            </h2>
          </div>

          {/* Decision 01 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 01 — Designing for the comeback
              </h3>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  Users often lost momentum after missing workouts. We designed recovery nudges to help users return instead of treating a missed workout as the end of their routine.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 01 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop"
                  alt="Recovery nudges and mobility comeback flow"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Recovery Nudge & Low-Friction Restart Screen (Placeholder — Screens to be added)
              </span>
            </div>
          </div>

          {/* Decision 02 */}
          <div className="flex flex-col gap-8 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 02 — Separate planning from doing
              </h3>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  Planning and exercising require different mindsets. We separated Workout Plans (discovering & customising routines) from Record Workout (focusing solely on executing the session).
                </p>
                <p
                  className="text-xl sm:text-2xl text-[var(--text-primary)] leading-snug pt-1"
                  style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif', fontStyle: 'italic' }}
                >
                  "Plan when you're planning. Execute when you're training."
                </p>
              </div>
            </div>

            {/* Mockup for Decision 02 */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1483721074573-586540da5703?q=80&w=1200&auto=format&fit=crop"
                    alt="Workout routine planner discovery mode"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                    alt="Active live session record mode"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Workout Plans Mode vs. Record Workout Mode (Placeholder — Screens to be added)
              </span>
            </div>
          </div>

          {/* Decision 03 */}
          <div className="flex flex-col gap-8 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 03 — Accountability without comparison anxiety
              </h3>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  Users wanted accountability, but not the pressure of competing with everyone. We focused on friends, activity, and small-circle competition instead of global leaderboards, paired with visible rank progression (Iron to Rizen Elite).
                </p>
                <p
                  className="text-xl sm:text-2xl text-[var(--text-primary)] leading-snug pt-1"
                  style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif', fontStyle: 'italic' }}
                >
                  "My friend is working out. I should probably show up too."
                </p>
              </div>
            </div>

            {/* Mockup for Decision 03 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600&auto=format&fit=crop"
                  alt="Friends activity feed and small squad accountability"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Home Activity, Friend Profile & Small-Circle Squad (Placeholder — Screens to be added)
              </span>
            </div>
          </div>
        </section>

        {/* ── 04 — OUTCOME ────────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              04 — Outcome
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
            <p>
              Rizen evolved from a broad fitness-tracking concept into a focused experience built around Structure, Progress, Recovery, and Social Accountability.
            </p>
            <p
              className="text-xl sm:text-2xl text-[var(--text-primary)] leading-snug pt-2"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif', fontStyle: 'italic' }}
            >
              "A feature is only valuable when it supports a user behaviour."
            </p>
          </div>

          {/* Final Polished Screens Mockup Grid */}
          <div className="flex flex-col gap-3 mt-4">
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
                  <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                    <img src={screen.img} alt={screen.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] truncate">{screen.title}</span>
                </div>
              ))}
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Final MVP Core Screens Grid (Placeholder — Final high-res screens will be inserted here)
            </span>
          </div>
        </section>

        {/* ── FOOTER / NEXT PROJECT NAVIGATION ─────────────────────── */}
        <footer className="pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-6" style={{ borderColor: 'var(--border-card)' }}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
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
