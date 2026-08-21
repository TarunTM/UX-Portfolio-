import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';

export const SanctumCaseStudy: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find next project in the list (or loop to next available)
  const currentIdx = projects.findIndex((p) => p.id === 'sanctum');
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
              Web — Desktop + Mobile · Fitness & Wellness
            </span>
            <h1
              className="text-5xl sm:text-7xl font-light tracking-tight text-[var(--text-primary)] leading-none"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif' }}
            >
              Sanctum House of Wellness
            </h1>
            <p
              className="text-2xl sm:text-3xl text-[var(--text-secondary)] font-normal leading-snug mt-1"
              style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif', fontStyle: 'italic' }}
            >
              Designing a premium fitness experience around brand clarity, local discovery, and conversion.
            </p>
          </div>

          {/* Large Project Mockup */}
          <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600&auto=format&fit=crop"
              alt="Sanctum House of Wellness — Luxury Club Atmosphere"
              className="w-full h-full object-cover grayscale-[15%] contrast-[1.05]"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono bg-black/60 text-white backdrop-blur-sm">
              Hero Visual · Sanctum Brand Atmosphere
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
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Team</span>
              <span className="font-medium text-[var(--text-primary)]">4 Designers</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Industry</span>
              <span className="font-medium text-[var(--text-primary)]">Fitness & Wellness</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Platform</span>
              <span className="font-medium text-[var(--text-primary)]">Web (Desktop + Mobile)</span>
            </div>
            <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Impact</span>
              <span className="font-medium text-[var(--text-primary)]">~3× Enquiries Increase</span>
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
              Sanctum House of Wellness is a premium fitness and wellness brand with clubs across Mumbai. The challenge was to create a digital experience that clearly communicated what Sanctum stands for while helping users discover a nearby club and take the next step.
            </p>
          </div>

          {/* Project Intro Mockup */}
          {/* <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/10] sm:aspect-[21/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1600&auto=format&fit=crop"
                alt="Sanctum House of Wellness Club Ambiance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 sm:p-10 text-center">
                <blockquote className="text-white text-lg sm:text-2xl font-light italic max-w-xl leading-relaxed" style={{ fontFamily: 'Instrument Serif, Fraunces, Georgia, serif' }}>
                  "Creating a digital space that reflects the premium physical atmosphere of Sanctum's Mumbai clubs."
                </blockquote>
              </div>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Brand atmosphere visual · Premium wellness proposition
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
              I was a UI/UX Designer working alongside a team of three designers. I contributed to new website screens, responsive layouts, location experiences, and conversion-focused improvements.
            </p>
            <p>
              My key contribution was shaping the journey from understanding Sanctum → finding a club → making an enquiry.
            </p>
          </div>

          {/* Role / Design Mockup */}
          {/* <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/8] sm:aspect-[21/8] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop"
                alt="Sanctum UI Screen Explorations and Layout Systems"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
              Responsive Website Screens & Layout Explorations (Placeholder — Screens to be added)
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
                Decision 01 — Defining Sanctum through two pillars
              </h3>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  Sanctum's offering is built around Training + Recovery. I designed these as two visually equal pillars on the homepage to immediately communicate what the brand stands for instead of presenting a long list of services.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 01 */}
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                    alt="Training Pillar visual"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
                    alt="Recovery Pillar visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Training + Recovery Equal Pillars Showcase (Placeholder — Screens to be added)
              </span>
            </div>
          </div>

          {/* Decision 02 */}
          <div className="flex flex-col gap-8 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 02 — Introducing location discovery
              </h3>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  Once users understood the Sanctum proposition, the next question was “Where can I experience it?” I introduced the club locations immediately after the Training + Recovery introduction, allowing users to quickly discover a Sanctum location relevant to them.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 02 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1600&auto=format&fit=crop"
                  alt="Sanctum Club Location Discovery Map and Cards"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Club Location Discovery — Andheri, Khar & Juhu (Placeholder — Screens to be added)
              </span>
            </div>
          </div>

          {/* Decision 03 */}
          <div className="flex flex-col gap-8 pt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--text-primary)]">
                Decision 03 — Making location pages actionable
              </h3>
              <div className="flex flex-col gap-3 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-light w-full">
                <p>
                  After Meta Ads started driving traffic to the website, users were landing directly on specific club pages. I noticed an opportunity to reduce friction for visitors who had questions about trials, offers, memberships, or the club itself.
                </p>
                <p>
                  I added WhatsApp, Phone, and Directions actions to the Andheri, Khar and Juhu pages, giving high-intent visitors a direct way to ask, call, or visit.
                </p>
              </div>
            </div>

            {/* Mockup for Decision 03 */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}>
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
                  alt="Actionable Club Page with Direct Communication CTA Bar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] text-left">
                Direct Contact Actions (WhatsApp, Phone, Directions) on Club Pages (Placeholder — Screens to be added)
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
              Following the addition of the direct contact actions, enquiries increased approximately 3× while Meta Ads were actively driving traffic to the website.
            </p>
            <p>
              The change showed how a small, intent-driven UX improvement could directly support business conversion.
            </p>
          </div>

          {/* Final Polished Screens Mockup Grid */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { title: 'Brand Homepage', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop' },
                { title: 'Training & Recovery Split', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
                { title: 'Location Hub', img: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=800&auto=format&fit=crop' },
                { title: 'Andheri Club Page', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop' },
                { title: 'Khar & Juhu Discovery', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop' },
                { title: 'Direct CTA Bar & Lead Flow', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
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
              Final Sanctum Web & Mobile Layouts (Placeholder — Final high-res screens will be inserted here)
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

export default SanctumCaseStudy;
