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
              FinTech · Web App · Mobile App · UI/UX Design
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Quantel AI
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              Designing new experiences for an AI-powered wealth management platform
            </p>
          </div>

          {/* Large Project Mockup */}
          <div
            className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop"
              alt="Quantel AI Wealth Management Platform Dashboard"
              className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]"
            />
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 pt-6 pb-2 items-start text-left">
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>UI/UX Designer</span>
                <span className="text-xs text-[var(--text-muted)]">(Feature Expansion)</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                WHAT I DID
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>UI & Interaction</span>
                <span>Design Systems</span>
                <span>Mobile Flows</span>
                <span>Asset Dashboards</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TEAM
              </span>
              <div className="flex flex-col gap-1 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <div>
                  <span className="text-[var(--text-primary)] font-medium block">Quantel Core</span>
                  <span className="text-xs text-[var(--text-muted)]">Design & Product</span>
                </div>
                <div>
                  <span className="text-[var(--text-primary)] font-medium block">Tarun Madan</span>
                  <span className="text-xs text-[var(--text-muted)]">UI/UX Designer</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                3 Months
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TOOLS
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>Figma</span>
                <span>FigJam</span>
                <span>Design System</span>
                <span>Linear</span>
                <span>Slack</span>
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
              Quantel AI is an intelligent wealth management platform that brings investing, financial advice, and live market insights into one unified digital ecosystem.
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
              While the core brand vision was set, the platform lacked key transactional workflows and critical expansion modules. Wealth management data was dense and intimidating for everyday investors, and complex decision-making during financial onboarding caused significant friction.
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
              I worked as a UI/UX Designer extending the existing product through 5 new core modules: the Assets Dashboard, Light Mode Dashboard, Points & Rewards system, Quantel Capital, and Quantel Advise.
            </p>
            <p>
              I worked rigorously within the established design system token standards to ensure every screen felt deeply native to the core brand.
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
                Decision 1 — Structuring complex financial data
              </h3>
              <p className="text-xs font-mono text-accent uppercase tracking-wider">
                Making the Assets experience easier to scan
              </p>
              <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
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
            <div className="flex flex-col gap-1.5">
              <div
                className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
                  alt="Assets Dashboard full screen and information hierarchy"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                Visual: Assets Dashboard — full screen + close-up of the information hierarchy
              </span>
            </div>
          </div>

          {/* Decision 02 */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">
                Decision 2 — Breaking financial onboarding into focused steps
              </h3>
              <p className="text-xs font-mono text-accent uppercase tracking-wider">
                Making complex investment decisions feel manageable
              </p>
              <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
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
            <div className="flex flex-col gap-1.5">
              <div
                className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1600&auto=format&fit=crop"
                  alt="Capital and Advise mobile flow connected horizontally"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                Visual: Capital & Advise flow — 4–6 screens connected as one horizontal flow
              </span>
            </div>
          </div>

          {/* Decision 03 */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">
                Decision 3 — Extending the product without breaking consistency
              </h3>
              <p className="text-xs font-mono text-accent uppercase tracking-wider">
                Designing new experiences within an established system
              </p>
              <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
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
            <div className="flex flex-col gap-1.5">
              <div
                className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border"
                style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop"
                  alt="Existing component to Light Mode Dashboard to Points and Rewards progression"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                Visual: Existing component → Light Mode Dashboard → Points & Rewards screen
              </span>
            </div>
          </div>
        </section>

        {/* ── OUTCOME ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Outcome & Impact
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              My work expanded Quantel's existing product foundation with new web and mobile experiences across its investment, wealth management, and engagement features.
            </p>
            <p>
              Working within an established design system also gave me experience designing for a complex FinTech product where data, product requirements, and system consistency directly influenced the interface.
            </p>
          </div>

          {/* Final Polished Screens Mockup Grid */}
          <div className="flex flex-col gap-2 mt-2">
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
              Final Quantel AI Web & Mobile Experiences
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

export default QuantelCaseStudy;
