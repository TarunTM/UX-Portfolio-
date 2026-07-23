import React from 'react';

interface ProjectMockupProps {
  projectId: string;
  className?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ projectId, className = '' }) => {
  // Render custom premium SVGs representing high-fidelity wireframes/mockups for each case study
  
  if (projectId === 'quantel-ai') {
    return (
      <div className={`w-full h-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 md:p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-500 overflow-hidden relative group ${className}`}>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        {/* Mock App Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="font-semibold text-zinc-300 ml-2">QUANTEL.AI</span>
          </div>
          <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">ONBOARDING_FLOW_V2</span>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-3 gap-3 my-4 z-10 flex-1">
          {/* Conversational Left Panel */}
          <div className="col-span-2 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col gap-2.5">
            <div className="text-[9px] uppercase tracking-wider text-accent font-semibold">Step 3 of 5: Risk Profile</div>
            <div className="text-zinc-300 font-sans text-xs font-semibold leading-tight">What is your primary investment goal?</div>
            
            <div className="flex flex-col gap-1.5 mt-1 font-sans">
              <div className="bg-zinc-950 border border-accent/40 rounded-lg p-2 flex items-center justify-between text-zinc-200">
                <span className="text-[11px] font-medium">A. Capital Preservation (Low Risk)</span>
                <span className="w-3 h-3 rounded-full border border-accent flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </span>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-800/80 rounded-lg p-2 flex items-center justify-between text-zinc-400">
                <span className="text-[11px] font-medium">B. Balanced Growth (Moderate Risk)</span>
                <span className="w-3 h-3 rounded-full border border-zinc-800" />
              </div>
            </div>
            
            <div className="text-[8px] text-zinc-500 mt-1 leading-normal border-t border-zinc-800/50 pt-2 flex items-start gap-1">
              <span className="text-accent">ℹ</span>
              <span>Why the AI needs this: We calibrate portfolio boundaries to avoid investments exceeding your downside tolerance.</span>
            </div>
          </div>

          {/* Right Metrics Panel */}
          <div className="col-span-1 flex flex-col gap-3">
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col justify-center items-center text-center flex-1">
              <div className="text-[18px] font-semibold text-zinc-100 font-sans tracking-tight">91%</div>
              <div className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1 leading-none">Trust Index</div>
            </div>
            
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex-1 flex flex-col justify-center relative">
              <div className="text-zinc-300 font-sans font-semibold text-[10px] mb-1">Live Allocation Preview</div>
              {/* Fake bar chart */}
              <div className="flex items-end gap-1.5 h-10 mt-1">
                <div className="w-3 bg-zinc-800 rounded-t h-4" />
                <div className="w-3 bg-accent rounded-t h-8" />
                <div className="w-3 bg-zinc-700 rounded-t h-3" />
                <div className="w-3 bg-zinc-800 rounded-t h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[8px] border-t border-zinc-850 pt-3 text-zinc-650 z-10">
          <span>SECURE KYC SEC_DATA_KEY_25</span>
          <span>COMPLETION RATE: 89.4%</span>
        </div>
      </div>
    );
  }

  if (projectId === 'sanctum') {
    return (
      <div className={`w-full h-full bg-[#0a0a0b] border border-zinc-900 rounded-2xl p-4 md:p-6 flex flex-col justify-between font-serif text-[10px] text-zinc-500 overflow-hidden relative ${className}`}>
        {/* Dark radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent)] pointer-events-none" />
        
        {/* Luxury Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <span className="font-semibold text-zinc-200 tracking-[0.2em] font-sans text-xs">SANCTUM</span>
          <span className="text-[8px] bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded text-zinc-400 font-sans tracking-widest">MEMBERSHIP_FUNNEL</span>
        </div>

        {/* Hero Section Mock */}
        <div className="my-5 flex flex-col gap-3 text-center">
          <div className="text-zinc-300 text-xs tracking-wider uppercase font-sans">SANCTUARY FOR THE BODY & MIND</div>
          <div className="text-zinc-100 text-lg md:text-xl font-light leading-tight">
            Refined Fitness.<br/>
            <span className="italic text-zinc-400">Exclusive Wellness.</span>
          </div>
          
          {/* Reservation Widget */}
          <div className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-3 max-w-xs mx-auto w-full font-sans mt-1">
            <div className="text-[8px] uppercase tracking-widest text-zinc-400 mb-2">Book a Private Tour</div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-zinc-900 border border-zinc-850 p-1.5 rounded text-[8px] text-zinc-300 text-left">Date: May 24</div>
              <div className="bg-zinc-900 border border-zinc-850 p-1.5 rounded text-[8px] text-zinc-300 text-left">Time: 10:00 AM</div>
            </div>
            <div className="bg-zinc-100 text-zinc-950 font-medium py-1 rounded text-[9px] hover:bg-zinc-200 cursor-pointer">
              Schedule Tour
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[8px] border-t border-zinc-950 pt-3 text-zinc-600 font-sans">
          <span>WIX STUDIO LAYOUT</span>
          <span className="text-zinc-400 tracking-wider">TOUR LEADS +148%</span>
        </div>
      </div>
    );
  }

  if (projectId === 'influencer-agency') {
    return (
      <div className={`w-full h-full bg-zinc-950 border border-zinc-850 rounded-2xl p-4 md:p-6 flex flex-col justify-between font-sans text-[10px] text-zinc-500 overflow-hidden relative ${className}`}>
        {/* Accent light highlight */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl pointer-events-none" />
        
        {/* Agency Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-bold text-zinc-200 tracking-wider text-xs">INFLUENCER SLATE</span>
          </div>
          <span className="text-[8px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono">FRAMER_BUILD</span>
        </div>

        {/* Dashboard/Calculator Layout */}
        <div className="grid grid-cols-5 gap-3 my-4 flex-1">
          {/* Left Calculator (Col span 3) */}
          <div className="col-span-3 bg-zinc-900/60 border border-zinc-800 p-3 rounded-xl flex flex-col gap-2 justify-center">
            <div className="text-[8px] uppercase tracking-wider text-zinc-400 font-semibold font-mono">Campaign Budget Calculator</div>
            <div className="text-zinc-100 font-bold text-xs">Estimate Campaign Quote</div>
            
            {/* Slider track */}
            <div className="w-full bg-zinc-800 h-1 rounded-full relative mt-1.5">
              <div className="bg-accent w-2/3 h-full rounded-full" />
              <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-zinc-100 border border-accent rounded-full flex items-center justify-center shadow">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-[9px] font-mono mt-1 text-zinc-300">
              <span>Budget: $25k</span>
              <span className="text-accent font-bold">Est. Reach: 450k</span>
            </div>
          </div>

          {/* Right Creators List (Col span 2) */}
          <div className="col-span-2 flex flex-col gap-2">
            <div className="bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-xl flex items-center gap-2">
              {/* Fake Avatar */}
              <div className="w-6 h-6 rounded-full bg-zinc-850 flex items-center justify-center border border-zinc-850 text-zinc-400 text-[8px] font-mono">@A</div>
              <div className="flex flex-col">
                <span className="text-zinc-200 font-semibold text-[8px]">@alex_travel</span>
                <span className="text-accent text-[7px] font-mono">4.8% Engagement</span>
              </div>
            </div>
            
            <div className="bg-zinc-900/60 border border-zinc-800 p-2.5 rounded-xl flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-zinc-850 flex items-center justify-center border border-zinc-850 text-zinc-400 text-[8px] font-mono">@S</div>
              <div className="flex flex-col">
                <span className="text-zinc-200 font-semibold text-[8px]">@sara_fit</span>
                <span className="text-accent text-[7px] font-mono">6.2% Engagement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[8px] border-t border-zinc-850 pt-3 text-zinc-650 font-mono">
          <span>CONVERSION OPTIMIZED</span>
          <span className="text-zinc-300">INBOUND BRIEFS +85%</span>
        </div>
      </div>
    );
  }

  // default to strength app research
  return (
    <div className={`w-full h-full bg-zinc-950 border border-zinc-850 rounded-2xl p-4 md:p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-500 overflow-hidden relative ${className}`}>
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Research Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 z-10">
        <span className="font-semibold text-zinc-300 ml-1">UX RESEARCH SYSTEM</span>
        <span className="text-[8px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">BENCHMARKING_STUDY</span>
      </div>

      {/* App Comparison Columns */}
      <div className="grid grid-cols-3 gap-2 my-4 z-10 flex-1">
        {/* Strong App Wireframe */}
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-2 flex flex-col gap-1 items-center justify-center text-center">
          <div className="text-[9px] text-zinc-300 font-semibold font-sans">Strong App</div>
          <div className="w-full bg-zinc-950 border border-zinc-800 p-1.5 rounded flex flex-col gap-1 mt-1 text-[7px]">
            <div className="flex justify-between text-zinc-400"><span>Set 1</span><span className="text-zinc-200">100 lbs x 8</span></div>
            <div className="w-full bg-zinc-850 h-1.5 rounded" />
          </div>
          <span className="text-[7px] text-zinc-500 mt-1">Clean, but legacy</span>
        </div>

        {/* JEFIT App Wireframe */}
        <div className="bg-zinc-900/40 border border-zinc-850 rounded-lg p-2 flex flex-col gap-1 items-center justify-center text-center">
          <div className="text-[9px] text-zinc-300 font-semibold font-sans">JEFIT</div>
          <div className="w-full bg-zinc-950 border border-zinc-800 p-1 rounded flex flex-col gap-1 mt-1 text-[6px]">
            <div className="text-zinc-500">ADVERTISING BANNER</div>
            <div className="flex justify-between text-zinc-400"><span>Log</span><span>Stats</span><span>Plans</span></div>
          </div>
          <span className="text-[7px] text-zinc-500 mt-1">Cluttered interface</span>
        </div>

        {/* Proposed Concept App Wireframe */}
        <div className="bg-zinc-900/70 border border-accent/40 rounded-lg p-2 flex flex-col gap-1 items-center justify-center text-center shadow-[0_0_15px_rgba(59,130,246,0.05)]">
          <div className="text-[9px] text-zinc-100 font-semibold font-sans">Proposed Concept</div>
          <div className="w-full bg-zinc-950 border border-accent/30 p-1.5 rounded flex flex-col gap-1.5 mt-1 text-[7px]">
            <div className="bg-accent/10 border border-accent/30 rounded py-0.5 text-accent font-bold">Log in 3 Taps</div>
            <div className="w-full bg-zinc-850 h-1 rounded" />
          </div>
          <span className="text-[7px] text-accent font-semibold mt-1">Tedium Reduced</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[8px] border-t border-zinc-850 pt-3 text-zinc-650 z-10">
        <span>COMPETITORS AUDITED: 3</span>
        <span>BENCHMARKED SCALES</span>
      </div>
    </div>
  );
};

export default ProjectMockup;
