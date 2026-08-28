import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import heroVideo from '../assets/Sanctum Img:Video/Hero Video.webm';
import homeSanctum from '../assets/Sanctum Img:Video/Home Sanctum.webp';
import juhuSanctum from '../assets/Sanctum Img:Video/Juhu Sanctum.webp';
import groupxSanctum from '../assets/Sanctum Img:Video/GroupX Sanctum.webp';
import trainingScrollVideo from '../assets/Sanctum Img:Video/Training Scroll video.webm';

const outcomeImages = [
  { img: homeSanctum, alt: 'Sanctum Home Page', title: 'Home Experience' },
  { img: juhuSanctum, alt: 'Sanctum Juhu Club Page', title: 'Club Location Page' },
  { img: groupxSanctum, alt: 'Sanctum GroupX Classes', title: 'GroupX Experience' },
];

export const SanctumCaseStudy: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [btnHovered, setBtnHovered] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2-second rotating image timer for Outcome section
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % outcomeImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Find next project in the list (or loop to next available)
  const currentIdx = projects.findIndex((p) => p.id === 'sanctum');
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
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              Website · Fitness & Wellness
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              Sanctum House of Wellness
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              A digital experience for a premium fitness & wellness brand
            </p>
          </div>

          {/* Large Project Hero Video — Uncropped Natural Aspect Ratio */}
          <div
            className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border relative shadow-sm"
            style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
          >
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
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
                <span>UI/UX Designer</span>
                {/* <span className="text-xs text-[var(--text-muted)]">(Web & Conversion)</span> */}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
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
              <span className="text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
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

          {/* 2-Second Rotating Showcase Carousel — Matching Hero Video Aspect Ratio */}
          <div className="flex flex-col gap-2 mt-2">
            <div
              className="relative w-full aspect-[3388/1758] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
              style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
            >
              {outcomeImages.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeSlide === idx ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.img}
                    alt={slide.alt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}

              {/* Slide Indicator Dots */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
                {outcomeImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* View Live Site Full-Width Seamless Gradient Button */}
            <div className="w-full pt-3 pb-1">
              <a
                href="https://www.sanctumclub.co/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                className="group relative w-full py-4 px-6 rounded-2xl font-medium text-[15px] sm:text-[16px] tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer overflow-hidden border active:scale-[0.99] shadow-sm hover:shadow-xl"
                style={{
                  background: btnHovered
                    ? 'linear-gradient(135deg, rgba(26, 24, 20, 0.96) 0%, rgba(55, 50, 42, 0.95) 50%, rgba(26, 24, 20, 0.98) 100%)'
                    : 'linear-gradient(135deg, rgba(26, 24, 20, 0.92) 0%, rgba(38, 35, 30, 0.90) 50%, rgba(26, 24, 20, 0.92) 100%)',
                  borderColor: btnHovered ? 'rgba(255, 255, 255, 0.25)' : 'var(--border-card)',
                  color: '#ffffff',
                }}
              >
                {/* Subtle top specular sheen */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent)',
                    opacity: btnHovered ? 1 : 0.4,
                  }}
                />

                {/* Subtle luminous ambient background glow on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08), transparent 70%)',
                    opacity: btnHovered ? 1 : 0,
                  }}
                />

                <span className="relative z-10 font-medium transition-all duration-300 tracking-wide">
                  {btnHovered ? "Letss gooo.." : "See it here"}
                </span>

                <ArrowRight
                  className={`relative z-10 w-4 h-4 transition-all duration-300 ${
                    btnHovered ? 'translate-x-1.5 opacity-100' : 'opacity-70'
                  }`}
                />
              </a>
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
                  1. Making GroupX easier to explore 
                </h3>
                <div className="flex flex-col gap-2.5 text-[16px] leading-[1.75] text-[var(--text-secondary)] font-normal max-w-3xl mt-0.5">
                  <p>
                      GroupX offers a range of classes across Sanctum's locations, but users first needed to understand what classes were available and where they could take them.I designed the GroupX experience to make the relationship between class and location clearer, allowing users to browse the available sessions and understand where each class was offered before moving into the booking flow.
                  </p>
                </div>
              </div>

              {/* Mockup for Decision 01 — GroupX Experience */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[3388/1758] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src={groupxSanctum}
                    alt="Sanctum GroupX Class Experience"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
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

              {/* Video Mockup for Decision 02 — Training Scroll Video */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <video
                    src={trainingScrollVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto object-contain block"
                  />
                </div>
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

              {/* Mockup for Decision 03 — Juhu Club Page & Direct Actions */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div
                  className="w-full aspect-[3388/1758] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm"
                  style={{ borderColor: 'var(--border-card)', background: 'var(--bg-surface)' }}
                >
                  <img
                    src={juhuSanctum}
                    alt="Sanctum Juhu Club Actionable Page"
                    className="w-full h-full object-cover object-top"
                  />
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

export default SanctumCaseStudy;
