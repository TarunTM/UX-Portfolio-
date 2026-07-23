import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User, Wrench, Sparkles, BookOpen } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectMockup from '../components/ProjectMockup';
import Navbar from '../components/Navbar';

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const currentIdx = projects.findIndex((p) => p.id === id);
  const project = projects[currentIdx];

  if (!project) {
    return (
      <div className="min-h-screen bg-bg-base text-text-primary flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-light font-serif">Case Study Not Found</h1>
        <Link to="/" className="text-accent flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  // Get next project ID
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div className="min-h-screen bg-bg-base text-text-primary px-4 md:px-8 py-12 pb-32 max-w-5xl mx-auto flex flex-col gap-12 relative">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Header Controls */}
      <header className="flex items-center justify-between z-10 border-b border-border-card/40 pb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-xs">Back to Portfolio</span>
        </button>

        <span className="text-xs text-text-secondary font-mono">
          CASE STUDY {currentIdx + 1} / {projects.length}
        </span>
      </header>

      {/* Project Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-4 text-left z-10"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full w-max">
          {project.category}
        </span>
        <h1 className="text-4xl md:text-7xl font-light tracking-tight text-text-primary font-serif mt-2">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl font-light text-text-secondary max-w-3xl leading-relaxed">
          {project.tagline}
        </p>
      </motion.section>

      {/* Project Metadata Card */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-bg-surface/30 border border-border-card p-6 rounded-3xl z-10"
      >
        <div className="flex items-start gap-3.5 text-left">
          <User className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">Role</h4>
            <p className="text-sm font-medium text-text-primary mt-1">{project.role}</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 text-left">
          <Calendar className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">Timeline</h4>
            <p className="text-sm font-medium text-text-primary mt-1">{project.timeline}</p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 text-left">
          <Wrench className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">Tools & Stack</h4>
            <p className="text-sm font-medium text-text-primary mt-1.5 flex flex-wrap gap-1.5">
              {project.tools.map((t, idx) => (
                <span key={idx} className="bg-bg-base border border-border-card px-2.5 py-0.5 rounded-md text-xs font-mono">
                  {t}
                </span>
              ))}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Primary Metrics Highlights */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 z-10"
      >
        {project.metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-bg-surface/30 border border-border-card p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          >
            <span className="text-3xl md:text-4xl font-light tracking-tight text-accent font-serif">
              {metric.value}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-text-secondary mt-1.5">
              {metric.label}
            </span>
          </div>
        ))}
      </motion.section>

      {/* Case Overview: Objectives, Problem & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left py-4 z-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Objective</span>
          </div>
          <h3 className="text-xl font-light font-serif text-text-primary">The Goal</h3>
          <p className="text-sm text-text-secondary leading-relaxed font-light">{project.objective}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80 animate-pulse" />
            <span>Problem Statement</span>
          </div>
          <h3 className="text-xl font-light font-serif text-text-primary">The Friction</h3>
          <p className="text-sm text-text-secondary leading-relaxed font-light">{project.problem}</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <span>Design Solution</span>
          </div>
          <h3 className="text-xl font-light font-serif text-text-primary">The Outcome</h3>
          <p className="text-sm text-text-secondary leading-relaxed font-light">{project.solution}</p>
        </div>
      </section>

      {/* Detailed Double Diamond Walkthrough */}
      <section className="flex flex-col gap-8 text-left z-10 pt-4">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-2xl font-light font-serif tracking-tight text-text-primary flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <span>Double Diamond Execution Walkthrough</span>
          </h2>
          <span className="text-xs text-text-secondary font-mono">STEP-BY-STEP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.process.map((step, idx) => (
            <div
              key={idx}
              className="bg-bg-surface/20 border border-border-card/50 p-6 rounded-3xl flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-text-secondary">
                    Phase {step.phase.split(' ')[0]}
                  </span>
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                    step.type === 'Divergent'
                      ? 'bg-amber-500/5 text-amber-500 border border-amber-500/10'
                      : 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10'
                  }`}>
                    {step.type} Thinking {step.type === 'Divergent' ? '◀▶' : '▶◀'}
                  </span>
                </div>
                <h3 className="text-lg font-light font-serif text-text-primary mt-1">
                  {step.phase.split(' ').slice(1).join(' ')}
                </h3>
                <p className="text-xs text-accent font-sans mt-0.5 leading-snug">
                  {step.summary}
                </p>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed border-t border-border-card/30 pt-3 font-light">
                {project.id === 'strength-training-research' && step.details.includes('Strong, JEFIT, and Hevy') ? (
                  // Custom highlights for strength training research details
                  <span>
                    Conducted UX audit on leading tracking competitors like <strong className="text-text-primary">Strong, JEFIT, and Hevy</strong> to isolate common structural inefficiencies. {step.details.replace('Conducted UX audit on leading tracking competitors like Strong, JEFIT, and Hevy to isolate common structural inefficiencies.', '')}
                  </span>
                ) : (
                  step.details
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hi-Fi Design Mockups Section */}
      <section className="flex flex-col gap-6 text-left z-10">
        <h3 className="text-xl font-light font-serif text-text-primary">High-Fidelity Interface Concept</h3>
        <div className="h-[320px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl relative bg-bg-surface border border-border-card/60">
          <ProjectMockup projectId={project.id} />
        </div>
      </section>

      {/* Takeaways & Learning */}
      <section className="bg-bg-surface/20 border border-border-card p-6 md:p-8 rounded-3xl text-left flex flex-col gap-4 z-10">
        <h3 className="text-xl font-light font-serif text-text-primary">Key Project Takeaways</h3>
        <ul className="flex flex-col gap-3 text-sm text-text-secondary leading-relaxed font-sans list-disc list-inside font-light">
          {project.takeaways.map((takeaway, idx) => (
            <li key={idx} className="marker:text-accent pl-1">
              <span className="text-text-primary font-medium pl-1">{takeaway.split('.')[0]}.</span>
              {takeaway.split('.').slice(1).join('.')}
            </li>
          ))}
        </ul>
      </section>

      {/* Next Case Study Navigation CTA */}
      <footer className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <button
          onClick={() => navigate(`/work/${nextProject.id}`)}
          className="flex items-center gap-2.5 bg-bg-surface/40 hover:bg-bg-surface/80 border border-border-card/60 px-5 py-3 rounded-2xl cursor-pointer group transition-colors text-sm font-medium"
        >
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-widest text-text-secondary block">Next Case Study</span>
            <span className="text-text-primary font-light font-serif">{nextProject.title}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-accent transform group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
};

export default CaseStudy;
