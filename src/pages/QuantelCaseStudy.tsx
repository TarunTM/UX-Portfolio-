import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';

export const QuantelCaseStudy: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find next project in the list (or loop to next available)
  const currentIdx = projects.findIndex((p) => p.id === 'quantel-ai');
  const nextProject = projects[(currentIdx + 1) % projects.length] || projects[0];

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
              FinTech · Web App · Mobile App · UI/UX Design
            </span>
            <h1
              className="text-5xl sm:text-7xl font-light tracking-tight text-[var(--text-primary)] leading-none"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif' }}
            >
              Quantel AI
            </h1>
            <p
              className="text-2xl sm:text-3xl text-[var(--text-secondary)] font-normal leading-snug mt-1"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif', fontStyle: 'italic' }}
            >
              Designing new experiences for an AI-powered wealth management platform
            </p>
          </div>

          {/* Large Project Mockup */}
          <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
            <img
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop"
              alt="Quantel AI Wealth Management Platform Dashboard"
              className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono bg-black/60 text-white backdrop-blur-sm">
              Hero Visual · Quantel AI Wealth Management System
            </div>
          </div>

          {/* Minimal Metadata Strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-6 pt-6 pb-6 border-y text-xs"
            style={{ borderColor: 'var(--border-card)' }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">My Role</span>
              <span className="font-medium text-[var(--text-primary)]">UI/UX Designer</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Focus</span>
              <span className="font-medium text-[var(--text-primary)]">Product Expansion</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Industry</span>
              <span className="font-medium text-[var(--text-primary)]">FinTech & AI</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Platform</span>
              <span className="font-medium text-[var(--text-primary)]">Web & Mobile Apps</span>
            </div>
            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Scope</span>
              <span className="font-medium text-[var(--text-primary)]">5 New Core Flows</span>
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
              Quantel AI is a wealth management platform that brings investing, financial advice, and market insights into one digital experience.
            </p>
            <p>
              When I joined the project, the core product direction and design system were already established. I focused on designing new web and mobile experiences needed to expand the product toward production.
            </p>
          </div>

          {/* Project Intro Mockup */}
          {/* <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="Quantel AI data intelligence and market insights visualization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 sm:p-10 text-center">
                <blockquote className="text-white text-lg sm:text-2xl font-light italic max-w-xl leading-relaxed" style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif' }}>
                  "Bringing investing, automated financial advice, and live market intelligence into one cohesive design language."
                </blockquote>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Product context visual · AI-powered wealth management ecosystem
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
              I worked as a UI/UX Designer, contributing to the design of new web and mobile experiences for Quantel AI. Since the core product direction and design system were already established when I joined, my focus was on extending the existing product through new screens and flows, including the Assets Dashboard, Light Mode Dashboard, Points & Rewards experience, Quantel Capital, and Quantel Advise.
            </p>
            <p>
              I worked within the existing design system to ensure these new experiences remained consistent with the overall Quantel product.
            </p>
          </div>

          {/* Role / Design System Mockup */}
          {/* <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/8] sm:aspect-[21/8] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop"
                alt="Quantel design components and design system tokens"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Design System & Extended Components Strip (Placeholder — Screens to be added)
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
                Decision 1 — Structuring complex financial data
              </h3>
              <p className="text-sm font-mono text-accent uppercase tracking-wider">
                Making the Assets experience easier to scan
              </p>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  The Assets experience contained a large amount of financial information, from portfolio-level information to individual holdings and detailed performance data.
                </p>
                <p>
                  I structured the experience so users could move from high-level portfolio information to deeper asset details without competing information overwhelming the screen.
                </p>
                <p>
                  The hierarchy separates summary information, supporting metrics, detailed asset information, and comparison data into clear sections.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 01 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
                  alt="Assets Dashboard full screen and information hierarchy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Visual: Assets Dashboard — full screen + close-up of the information hierarchy (Placeholder — Screens to be added)
              </span>
            </div>
          </div>

          {/* Decision 02 */}
          <div className="flex flex-col gap-8 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 2 — Breaking financial onboarding into focused steps
              </h3>
              <p className="text-sm font-mono text-accent uppercase tracking-wider">
                Making complex investment decisions feel manageable
              </p>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  The Capital and Advise experiences required users to provide financial information and make important decisions during onboarding.
                </p>
                <p>
                  Rather than presenting everything at once, I designed the flows around focused steps, allowing users to make one decision at a time while maintaining a clear sense of progress.
                </p>
                <p>
                  This helped keep the experience structured while working within the existing Quantel design language.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 02 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1600&auto=format&fit=crop"
                  alt="Capital and Advise mobile flow connected horizontally"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Visual: Capital & Advise flow — 4–6 screens connected as one horizontal flow (Placeholder — Screens to be added)
              </span>
            </div>
          </div>

          {/* Decision 03 */}
          <div className="flex flex-col gap-8 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 3 — Extending the product without breaking consistency
              </h3>
              <p className="text-sm font-mono text-accent uppercase tracking-wider">
                Designing new experiences within an established system
              </p>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  Because Quantel already had an established design system when I joined, new screens needed to feel native to the existing product.
                </p>
                <p>
                  I reused the existing components, typography, spacing, navigation patterns, and visual language while adapting them to new requirements such as Light Mode and the Points & Rewards experience.
                </p>
                <p>
                  The goal wasn't to introduce a new visual direction, but to make the product feel consistent as it expanded.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 03 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop"
                  alt="Existing component to Light Mode Dashboard to Points and Rewards progression"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Visual: Existing component → Light Mode Dashboard → Points & Rewards screen (Placeholder — Screens to be added)
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
              My work expanded Quantel's existing product foundation with new web and mobile experiences across its investment, wealth management, and engagement features.
            </p>
            <p>
              Working within an established design system also gave me experience designing for a complex FinTech product where data, product requirements, and system consistency directly influenced the interface.
            </p>
          </div>

          {/* Final Polished Screens Mockup Grid */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { title: 'Assets Dashboard Overview', img: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=800&auto=format&fit=crop' },
                { title: 'Light Mode Surface', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop' },
                { title: 'Points & Rewards Hub', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
                { title: 'Quantel Capital Wizard', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop' },
                { title: 'Quantel Advise Flow', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop' },
                { title: 'Mobile Portfolio View', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop' },
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
              Final Quantel AI Web & Mobile Experiences (Placeholder — Final high-res screens will be inserted here)
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

export default QuantelCaseStudy;
