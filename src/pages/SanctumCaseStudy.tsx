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
              Web — Desktop + Mobile · Fitness & Wellness
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Sanctum House of Wellness
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              A digital experience for a premium fitness & wellness brand
            </p>
          </div>

          {/* Large Project Mockup */}
          <div
            className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1600&auto=format&fit=crop"
              alt="Sanctum House of Wellness — Luxury Club Atmosphere"
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
                <span>UI/UX Designer</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(Web & Conversion)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
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
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TEAM
              </span>
              <div className="flex flex-col gap-1 text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <div>
                  <span >Yash Moon</span> <br></br>
                  <span className="text-xs text-[var(--text-muted)]">(Deign Lead)</span>
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
                <span>Wix Studio</span>
                <span>Google Meet</span>
                <span>Asana</span>
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
                Sanctum House of Wellness is a premium fitness and wellness brand with multiple locations across Mumbai. I worked on the website from design through implementation, creating an experience that communicated what Sanctum stands for, helped users discover the right classes and locations, and made it easier to enquire.
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
              The previous online presence presented an overwhelming catalog of wellness services without clarifying the core brand ethos. Furthermore, high-intent traffic arriving from Meta advertising had no frictionless channel to ask questions or book trial sessions.
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
                I worked as part of a team of three designers, contributing to the design of the website, including the homepage, all club pages and the GroupX experience. I designed the screens in Figma and implemented the final experience in Wix Studio, using Wix Bookings for class scheduling and reservations.
            </p>
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
                  1. Making GroupX easier to explore 
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                      GroupX offers a range of classes across Sanctum's locations, but users first needed to understand what classes were available and where they could take them.I designed the GroupX experience to make the relationship between class and location clearer, allowing users to browse the available sessions and understand where each class was offered before moving into the booking flow.
                  </p>
                </div>
              </div>

              {/* Mockup for Decision 01 */}
              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border"
                    style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
                      alt="Training Pillar visual"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border"
                    style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
                      alt="Recovery Pillar visual"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                  Visual: Training + Recovery Equal Pillars Showcase
                </span>
              </div>
            </div>

            {/* Decision 02 */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  2. Building the experience around Training + Recovery
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                      Sanctum's branding already defined Training and Recovery as its two core pillars. I translated that into the website through a left-and-right visual composition, giving both pillars equal importance.
This helped communicate what Sanctum stood for before users moved into the details of its locations, classes and facilities.
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
                    src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=1600&auto=format&fit=crop"
                    alt="Sanctum Club Location Discovery Map and Cards"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                  Visual: Club Location Discovery — Andheri, Khar & Juhu
                </span>
              </div>
            </div>

            {/* Decision 03 */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
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
              </div>

              {/* Mockup for Decision 03 */}
              <div className="flex flex-col gap-1.5">
                <div
                  className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop"
                    alt="Actionable Club Page with Direct Communication CTA Bar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] text-left">
                  Visual: Direct Contact Actions (WhatsApp, Phone, Directions) on Club Pages
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUTCOME ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Outcome & Business Impact
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
                The final website gave Sanctum a clearer way to communicate its brand, helped users discover GroupX classes by location, and created a more direct path from location-specific traffic to enquiry.
                The most measurable result came from the club-page improvement, where the client reported a <strong>3X increase</strong> in WhatsApp and phone enquiries after the direct contact actions were introduced.
            </p>
            
          </div>

          {/* Final Polished Screens Mockup Grid */}
          <div className="flex flex-col gap-2 mt-2">
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
              Final Sanctum Web & Mobile Layouts
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

export default SanctumCaseStudy;
