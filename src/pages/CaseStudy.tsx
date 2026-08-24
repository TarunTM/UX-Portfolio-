import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, Wrench, Sparkles, BookOpen } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectMockup from '../components/ProjectMockup';
import Navbar from '../components/Navbar';
import RizenCaseStudy from './RizenCaseStudy';
import SanctumCaseStudy from './SanctumCaseStudy';
import QuantelCaseStudy from './QuantelCaseStudy';

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (id === 'rizen') {
    return <RizenCaseStudy />;
  }

  if (id === 'sanctum') {
    return <SanctumCaseStudy />;
  }

  if (id === 'quantel-ai') {
    return <QuantelCaseStudy />;
  }

  const currentIdx = projects.findIndex((p) => p.id === id);
  const project = projects[currentIdx];

  if (!project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <h1 className="text-2xl font-bold tracking-tight">Case Study Not Found</h1>
        <Link to="/" className="text-accent flex items-center gap-2 hover:underline text-sm font-mono">
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  // Get next project ID
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div
      className="min-h-screen relative pb-28 text-left"
      style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {/* Floating Navbar */}
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 flex flex-col gap-10 sm:gap-14">
        {/* Project Hero Header */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
              {project.category}
            </span>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold tracking-[0px] text-[var(--text-primary)] leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-[17px] sm:text-[19px] md:text-[20px] text-[var(--text-secondary)] font-normal leading-relaxed max-w-3xl mt-0.5">
              {project.tagline}
            </p>
          </div>

          {/* Project Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 pb-2 items-start text-left">
            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                MY ROLE
              </span>
              <span className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[var(--text-secondary)]">
                {project.role}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[var(--text-secondary)]">
                {project.timeline}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1.5">
                TOOLS
              </span>
              <div className="flex flex-col text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[var(--text-secondary)]">
                {project.tools.map((t, idx) => (
                  <span key={idx}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Primary Metrics Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="border p-6 rounded-2xl flex flex-col justify-center items-center text-center"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-accent">
                  {metric.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mt-1.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </section>
        )}

        {/* Case Overview: Objectives, Problem & Solution */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left py-2">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Core Objective
            </span>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">The Goal</h3>
            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.75] font-normal">{project.objective}</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Problem Statement
            </span>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">The Friction</h3>
            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.75] font-normal">{project.problem}</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Design Solution
            </span>
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[var(--text-primary)]">The Outcome</h3>
            <p className="text-[16px] text-[var(--text-secondary)] leading-[1.75] font-normal">{project.solution}</p>
          </div>
        </section>

        {/* Detailed Double Diamond Walkthrough */}
        <section className="flex flex-col gap-6 text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
              Double Diamond Execution
            </h2>
            <span className="text-xs text-[var(--text-muted)] font-mono">STEP-BY-STEP</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {project.process.map((step, idx) => (
              <div
                key={idx}
                className="border p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between gap-4"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      Phase {step.phase.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                      step.type === 'Divergent'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {step.type} Thinking {step.type === 'Divergent' ? '◀▶' : '▶◀'}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-[var(--text-primary)] mt-1">
                    {step.phase.split(' ').slice(1).join(' ')}
                  </h3>
                  <p className="text-xs text-accent font-sans mt-0.5 leading-snug">
                    {step.summary}
                  </p>
                </div>

                <p className="text-[16px] text-[var(--text-secondary)] leading-[1.75] font-normal">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hi-Fi Design Mockups Section */}
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            High-Fidelity Interface Concept
          </h3>
          <div
            className="h-[320px] sm:h-[450px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm relative border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
          >
            <ProjectMockup projectId={project.id} />
          </div>
        </section>

        {/* Takeaways & Learning */}
        <section
          className="border p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-left flex flex-col gap-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
        >
          <h3 className="text-[28px] sm:text-[36px] md:text-[42px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
            Key Project Takeaways
          </h3>
          <ul className="flex flex-col gap-3 text-[16px] text-[var(--text-secondary)] leading-[1.75] list-disc list-inside font-normal">
            {project.takeaways.map((takeaway, idx) => (
              <li key={idx} className="marker:text-accent pl-1">
                <span className="text-[var(--text-primary)] font-medium pl-1">{takeaway.split('.')[0]}.</span>
                {takeaway.split('.').slice(1).join('.')}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer / Next Project */}
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

export default CaseStudy;
