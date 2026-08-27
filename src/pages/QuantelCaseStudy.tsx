import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import heroQuantel from '../assets/Quantel Img/Hero Sanctum.webp';
import assetsQuantel from '../assets/Quantel Img/Assets Quantel.webp';
import lightmodeDashboard from '../assets/Quantel Img/Quantel LightMode Dashboard.webp';
import capital1Quantel from '../assets/Quantel Img/Capital 1.webp';
import capital2Quantel from '../assets/Quantel Img/Capital 2.webp';
import adviseQuantel from '../assets/Quantel Img/Advice.webp';
import referralQuantel from '../assets/Quantel Img/Quantel referal Screen.webp';

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
              Web App · Mobile App ·FinTech
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Quantel AI
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              AI-powered wealth management platform
            </p>
          </div>

          {/* Large Project Hero Image — Matching 16:9 ratio of Sanctum & Rizen */}
          <div
            className="w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <img
              src={heroQuantel}
              alt="Quantel AI Wealth Management Platform Hero"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 pt-6 pb-2 items-start text-left">
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>UI/UX Designer <br/>(UI Focused)</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(Feature Expansion)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                WHAT I DID
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>UI & Interaction</span>
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
                  <span >Yash Moon</span><br></br>
                  <span className="text-xs text-[var(--text-muted)]">(Deign Lead)</span>
                </div>
                <div>
                  <span >Tarun Madan</span><br></br>
                  <span className="text-xs text-[var(--text-muted)]">(UI/UX Designer)</span>
                </div>
                <div>
                  <span > Shruti Katekar</span><br></br>
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
                <span>Jira</span>
                <span>Asana</span>
                <span>Google Meet</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTEXT ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Project Intro
          </h2>

          <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
            <p>
              Quantel AI is a wealth management platform that brings investing, financial advice, and AI-powered market insights into one experience.
              <br></br>
              I joined the project when the core product direction and design system were already established. My focus was designing the new UI screens required for production and adapting existing web experiences for mobile.
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
              While the core brand vision was set, the platform lacked key transactional workflows and critical expansion modules. Wealth management data was dense and intimidating for everyday investors, and complex decision-making during financial onboarding caused significant friction.
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
              I worked as a UI/UX Designer, primarily contributing to the visual design of Quantel's web and mobile experiences. I designed the Assets Dashboard, a light-mode version of the main dashboard, and a Points & Rewards concept for the web app. I also adapted the existing Quantel Capital and Quantel Advise flows into mobile screens, making the necessary adjustments for smaller screen sizes while maintaining consistency with the established design system.
            </p>
          
          </div>
        </section>

        {/* ── KEY DESIGN DECISIONS ─────────────────────────────────── */}
        <section className="flex flex-col gap-5 sm:gap-6">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            UI Screens
          </h2>

          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Decision 01 */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Assets Dashboard
                </h3>
                
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Users can connect investment accounts held on other platforms to Quantel. The Assets experience brings that information together and gives users an overview of their investments along with key insights about their accounts.
                  </p>
                  
                </div>
              </div>

              {/* Mockup for Decision 01 — Assets Dashboard */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[1920/1024] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src={assetsQuantel}
                    alt="Quantel Assets Dashboard"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Decision 02 — Dashboard Light Mode */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Dashboard Light Mode
                </h3>
                
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                      Quantel was originally designed as a dark-mode product. Later in the project, the founder requested a light-mode version of the dashboard.
                  </p>
                  <p>
                      I adapted the existing dashboard to light mode while keeping the established components, layout, hierarchy, and visual language consistent with the original product.
                  </p>
                </div>
              </div>

              {/* Mockup for Decision 02 — Light Mode Dashboard */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[1920/1112] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src={lightmodeDashboard}
                    alt="Quantel Dashboard Light Mode"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Decision 03 — Quantel Capital Flow */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Quantel Capital Flow - Mobile App
                </h3>
              
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    The Quantel Capital web flow was already established when I joined the project. My role was to translate that experience into mobile.
                  </p>
                  <p>
                    Capital allows users to create an investment account with Quantel, with their investments managed according to their risk profile.
                  </p>
                  <p>
                    For mobile, I focused on prioritising the most important information, simplifying layouts, and adapting the existing components to a smaller screen rather than changing the underlying flow.
                  </p>
                </div>
              </div>

              {/* Mockups for Decision 03 — Capital 1 & Capital 2 */}
              <div className="flex flex-col gap-6 pt-2 items-center">
                <div className="w-full flex justify-center">
                  <img
                    src={capital1Quantel}
                    alt="Quantel Capital Mobile Flow Part 1"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  />
                </div>
                <div className="w-full flex justify-center">
                  <img
                    src={capital2Quantel}
                    alt="Quantel Capital Mobile Flow Part 2"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </div>
            </div>

            {/* Decision 04 — Quantel Advise Flow */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Quantel Advise Flow - Mobile App
                </h3>
              
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                      Quantel Advise connects users with financial advisors through a subscription-based experience, where users can subscribe for a certain number of advisory calls and book sessions with an advisor.
                  </p>
                </div>
              </div>

              {/* Mockup for Decision 04 — Advise Mobile Flow */}
              <div className="flex flex-col gap-1.5 pt-2 items-center">
                <div className="w-full flex justify-center">
                  <img
                    src={adviseQuantel}
                    alt="Quantel Advise Mobile Flow"
                    className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </div>
            </div>

            {/* Decision 05 — Concept Screen for Quantel Referrals */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Concept Screen for Quantel Referrals
                </h3>
              </div>

              {/* Mockup for Decision 05 — Points and Rewards */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[3840/2280] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src={referralQuantel}
                    alt="Quantel Points and Rewards Referral Screen"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
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
