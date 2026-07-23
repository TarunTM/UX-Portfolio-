import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Target, Compass, Send } from 'lucide-react';

interface Phase {
  id: string;
  num: string;
  name: string;
  type: 'Divergent' | 'Convergent';
  icon: React.ReactNode;
  summary: string;
  details: string;
}

const PHASES: Phase[] = [
  {
    id: 'discover',
    num: '01',
    name: 'Discover',
    type: 'Divergent',
    icon: <Compass className="w-5 h-5" />,
    summary: 'Divergent Thinking — Researching and understanding the user\'s core problem and context.',
    details: 'This phase focuses on keeping an open mind, researching widely, gathering data from users, conducting competitive benchmarking, and exploring the landscape without immediate constraints.'
  },
  {
    id: 'define',
    num: '02',
    name: 'Define',
    type: 'Convergent',
    icon: <Target className="w-5 h-5" />,
    summary: 'Convergent Thinking — Synthesizing research to clearly articulate the specific problem to solve.',
    details: 'Here, we filter and group our findings, narrow down research insights, build user personas, map user journeys, and establish a singular, actionable design brief or problem statement.'
  },
  {
    id: 'develop',
    num: '03',
    name: 'Develop',
    type: 'Divergent',
    icon: <Eye className="w-5 h-5" />,
    summary: 'Divergent Thinking — Ideating, wireframing, and exploring multiple design options.',
    details: 'This is the creative execution phase. We brainstorm layout solutions, wireframe potential interactions, design UI components, and test various design systems and aesthetic directions.'
  },
  {
    id: 'deliver',
    num: '04',
    name: 'Deliver',
    type: 'Convergent',
    icon: <Send className="w-5 h-5" />,
    summary: 'Convergent Thinking — Prototyping, testing, refining, and shipping the final product.',
    details: 'In the final phase, we refine our selected designs into high-fidelity prototypes, run usability tests to resolve friction, deliver assets to engineering, and measure performance metrics.'
  }
];

export const DoubleDiamond: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('discover');
  const activePhase = PHASES.find(p => p.id === activeTab) || PHASES[0];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-text-secondary font-mono">Design Methodology</span>
        </div>
        <h3 className="text-2xl font-semibold text-text-primary text-left">The Design Process</h3>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-4 gap-2 bg-black/40 p-1.5 rounded-2xl border border-border-card">
        {PHASES.map((phase) => {
          const isSelected = phase.id === activeTab;
          return (
            <button
              key={phase.id}
              onClick={() => setActiveTab(phase.id)}
              className={`relative flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all cursor-pointer ${
                isSelected ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
              aria-label={`Show ${phase.name} phase details`}
            >
              {isSelected && (
                <motion.div
                  layoutId="active-process-tab"
                  className="absolute inset-0 bg-bg-card border border-border-card rounded-xl z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-mono text-xs opacity-60">{phase.num}</span>
              <div className="relative z-10">{phase.icon}</div>
              <span className="relative z-10 text-[10px] sm:text-xs font-medium">{phase.name}</span>
            </button>
          );
        })}
      </div>

      {/* Details Box */}
      <div className="flex-1 bg-black/25 border border-border-card p-6 rounded-2xl relative min-h-[180px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 text-left"
          >
            <h4 className="text-lg font-medium text-text-primary">{activePhase.summary}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{activePhase.details}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Visual Diamond Diagram */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/10 border border-border-card rounded-2xl font-mono text-[10px] text-text-secondary">
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${activeTab === 'discover' ? 'bg-accent animate-pulse' : 'bg-zinc-800'}`} />
          <span>Research</span>
        </div>
        <div className="h-[1px] flex-1 bg-zinc-800 mx-2" />
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${activeTab === 'define' ? 'bg-accent animate-pulse' : 'bg-zinc-800'}`} />
          <span>Brief</span>
        </div>
        <div className="h-[1px] flex-1 bg-zinc-800 mx-2" />
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${activeTab === 'develop' ? 'bg-accent animate-pulse' : 'bg-zinc-800'}`} />
          <span>Design</span>
        </div>
        <div className="h-[1px] flex-1 bg-zinc-800 mx-2" />
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${activeTab === 'deliver' ? 'bg-accent animate-pulse' : 'bg-zinc-800'}`} />
          <span>Deploy</span>
        </div>
      </div>
    </div>
  );
};

export default DoubleDiamond;
