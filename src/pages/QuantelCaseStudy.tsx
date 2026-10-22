import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CaseStudyFooter from '../components/CaseStudyFooter';
import TextReveal from '../components/TextReveal';
import { projects } from '../data/projects';
import heroQuantel from '../assets/Quantel Img/Quantel hero.webp';
import assetsQuantel from '../assets/Quantel Img/Assets Quantel.webp';
import lightmodeDashboard from '../assets/Quantel Img/Quantel LightMode Dashboard.webp';
import capital1Quantel from '../assets/Quantel Img/Capital 1.webp';
import capital2Quantel from '../assets/Quantel Img/Capital 2.webp';
import adviseQuantel from '../assets/Quantel Img/Advice.webp';
import referralQuantel from '../assets/Quantel Img/Quantel referal Screen.webp';

export const QuantelCaseStudy: React.FC = () => {

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find next project in the list (or loop to next available)
  const currentIdx = projects.findIndex((p) => p.id === 'quantel-ai');
  const nextProject = projects[(currentIdx + 1) % projects.length] || projects[0];

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
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              Web App · Mobile App ·FinTech
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Quantel AI
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              AI-powered wealth management platform
            </p>
          </TextReveal>

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
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <div className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6] flex flex-col">
                <span>UI/UX Designer <br/>@The Social Slate</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(Feature Expansion)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                WHAT I DID
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                <span>UI & Interaction</span>
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
                  <span >Yash Moon</span><br></br>
                  <span className="text-xs text-[var(--text-muted)]">(Design Lead)</span>
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
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] font-normal leading-[1.6]">
                3 Months
              </span>
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
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
        <section id="context" className="flex flex-col gap-3">
          <TextReveal className="flex flex-col gap-3">
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
          </TextReveal>
        </section>

        {/* ── MY ROLE ─────────────────────────────────────────────── */}
        <section id="role" className="flex flex-col gap-3">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              My Role & Scope
            </h2>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                I worked as a UI/UX Designer, primarily contributing to the visual design of Quantel's web and mobile experiences. I designed the Assets Dashboard, a light-mode version of the main dashboard, and a Points & Rewards concept for the web app. I also adapted the existing Quantel Capital and Quantel Advise flows into mobile screens, making the necessary adjustments for smaller screen sizes while maintaining consistency with the established design system.
              </p>
            </div>
          </TextReveal>
        </section>

        {/* ── UI SCREENS ─────────────────────────────────────────── */}
        <section id="screens" className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col">
            <TextReveal className="flex flex-col">
              <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                UI Screens
              </h2>
            </TextReveal>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10">
            {/* Screen 01 — Assets Dashboard */}
            <div className="flex flex-col gap-4">
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Assets Dashboard
                </h3>
                
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Users can connect investment accounts held on other platforms to Quantel. The Assets experience brings that information together and gives users an overview of their investments along with key insights about their accounts.
                  </p>
                </div>
              </TextReveal>

              {/* Mockup for Screen 01 — Assets Dashboard */}
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

            {/* Screen 02 — Dashboard Light Mode */}
            <div className="flex flex-col gap-4 pt-2">
              <TextReveal className="flex flex-col gap-1.5">
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
              </TextReveal>

              {/* Mockup for Screen 02 — Light Mode Dashboard */}
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

            {/* Screen 03 — Quantel Capital Flow */}
            <div className="flex flex-col gap-4 pt-2">
              <TextReveal className="flex flex-col gap-1.5">
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
              </TextReveal>

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
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Quantel Advise Flow - Mobile App
                </h3>
              
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                    Quantel Advise connects users with financial advisors through a subscription-based experience, where users can subscribe for a certain number of advisory calls and book sessions with an advisor.
                  </p>
                </div>
              </TextReveal>

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
              <TextReveal className="flex flex-col gap-1.5">
                <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
                  Concept Screen for Quantel Referrals
                </h3>
              </TextReveal>

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

        {/* ── WHAT HAPPENED AFTER LAUNCH ─────────────────────────── */}
        <section id="outcomes" className="flex flex-col gap-6 sm:gap-8 pt-2">
          <TextReveal className="flex flex-col gap-3">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              What happened after launch
            </h2>

            <div className="flex flex-col gap-3 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl">
              <p>
                Quantel successfully launched the MVP into the hands of real capital investors. The combination of high-powered quantitative models and clear, human-centered UI drove remarkable quantifiable outcomes:
              </p>
            </div>
          </TextReveal>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Metric 01 */}
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4 border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
            >
              <span className="text-[36px] sm:text-[40px] md:text-[44px] font-bold tracking-tight text-[var(--text-primary)] leading-none">
                50%+
              </span>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)] font-normal">
                Returns delivered over 18 months across Quantel portfolios, systematically beating benchmark indices.
              </p>
            </div>

            {/* Metric 02 */}
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4 border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
            >
              <span className="text-[36px] sm:text-[40px] md:text-[44px] font-bold tracking-tight text-[var(--text-primary)] leading-none">
                36.83%
              </span>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)] font-normal">
                A director&apos;s IRA expanded from $1.11M to $1.52M in 12 months, versus ~20% for the S&amp;P 500.
              </p>
            </div>

            {/* Metric 03 */}
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-4 border shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
            >
              <span className="text-[36px] sm:text-[40px] md:text-[44px] font-bold tracking-tight text-[var(--text-primary)] leading-none">
                5 Yrs
              </span>
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)] font-normal">
                One client is now on track to retire a full 5 years ahead of their original schedule.
              </p>
            </div>
          </div>

          {/* Client Feedback Card */}
          <div
            className="w-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border shadow-xs flex flex-col gap-3.5 sm:gap-4 transition-all duration-300 hover:shadow-md"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-card)' }}
          >
            <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] font-semibold">
              CLIENT FEEDBACK
            </span>
            <blockquote className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold tracking-tight text-[var(--text-primary)] leading-[1.35]">
              “I went from feeling overlooked by conventional 60/40 advisors to feeling like I finally have real advantages.”
            </blockquote>
            <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] font-normal">
              — Quantel client &amp; Fortune 500 corporate director
            </p>
          </div>
        </section>

        {/* ── FOOTER & CONTACT ───────────────────────────────────── */}
        <CaseStudyFooter nextProject={nextProject} />

      </main>
    </div>
  );
};

export default QuantelCaseStudy;
