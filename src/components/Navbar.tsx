import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Award,
  Wrench,
  Briefcase,
  Mail,
  Gamepad2,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Sparkles,
  TrendingUp,
  Layers,
} from 'lucide-react';

interface CaseStudyItem {
  id: string;
  path: string;
  name: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CASE_STUDIES: CaseStudyItem[] = [
  { id: 'rizen', path: '/work/rizen', name: 'Rizen', label: 'Rizen · Fitness App', icon: Dumbbell },
  { id: 'sanctum', path: '/work/sanctum', name: 'Sanctum', label: 'Sanctum · Gym', icon: Sparkles },
  { id: 'quantel-ai', path: '/work/quantel-ai', name: 'Quantel AI', label: 'Quantel · AI Wealth', icon: TrendingUp },
  { id: 'side-quests', path: '/work/side-quests', name: 'Side Quests', label: 'Side Quests · Explorations', icon: Layers },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCaseStudy = location.pathname.startsWith('/work/');

  // Default to light theme for warm editorial design
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      return 'dark';
    }
    document.documentElement.classList.remove('dark');
    return 'light';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    const root = document.documentElement;
    if (nextTheme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleNav = (target: string) => {
    if (target === 'home') {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      const sectionMap: Record<string, string> = {
        skills: 'skills-section',
        work: 'selected-work',
        timeline: 'timeline-section',
        contact: 'contact-section',
        game: 'minigame-section',
      };
      const elementId = sectionMap[target];
      if (isHome) {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  // Intersection Observer for scroll tracking on Landing page
  useEffect(() => {
    if (!isHome) return;

    const sections = ['home-section', 'selected-work', 'skills-section', 'timeline-section', 'contact-section', 'minigame-section'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'home-section') setActiveSection('home');
          else if (id === 'selected-work') setActiveSection('work');
          else if (id === 'skills-section') setActiveSection('skills');
          else if (id === 'timeline-section') setActiveSection('timeline');
          else if (id === 'contact-section') setActiveSection('contact');
          else if (id === 'minigame-section') setActiveSection('game');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // Current case study calculation
  const currentProjectIdx = CASE_STUDIES.findIndex((p) => p.path === location.pathname);
  const nextProject =
    currentProjectIdx !== -1
      ? CASE_STUDIES[(currentProjectIdx + 1) % CASE_STUDIES.length]
      : CASE_STUDIES[0];

  return (
    <nav className="fixed bottom-[58px] sm:bottom-[66px] left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:left-8 lg:-translate-y-1/2 lg:-translate-x-0 z-[1000] select-none max-w-[calc(100vw-16px)]">
      <div className="flex flex-row lg:flex-col items-center gap-1 sm:gap-2 lg:gap-2.5 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-2.5 lg:py-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-neutral-200/50 dark:border-zinc-800/80 rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.4)] transition-all duration-300">
        
        {isCaseStudy ? (
          /* ── CASE STUDY MODE NAVBAR ── */
          <>
            {/* Back to Home / Work */}
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Back to Home
              </span>
            </button>

            {/* Divider */}
            <div className="w-[1px] h-4 sm:h-5 lg:w-5 lg:h-[1px] bg-neutral-200 dark:bg-zinc-800 mx-0.5 sm:mx-1 my-0.5" />

            {/* 4 Case Studies Quick Jump */}
            {CASE_STUDIES.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!isActive) {
                      navigate(item.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                      : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                  }`}
                  aria-label={item.name}
                >
                  <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
                  <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Next Project Fast Forward */}
            <button
              onClick={() => {
                navigate(nextProject.path);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label={`Next: ${nextProject.name}`}
            >
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Next: {nextProject.name}
              </span>
            </button>
          </>
        ) : (
          /* ── LANDING PAGE MODE NAVBAR ── */
          <>
            {/* Home Button */}
            <button
              onClick={() => handleNav('home')}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                activeSection === 'home'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                  : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
              aria-label="Home"
            >
              <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Home
              </span>
            </button>

            {/* Projects (Work) Button */}
            <button
              onClick={() => handleNav('work')}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                activeSection === 'work'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                  : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
              aria-label="Work"
            >
              <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Work
              </span>
            </button>

            {/* Skills Button */}
            <button
              onClick={() => handleNav('skills')}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                activeSection === 'skills'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                  : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
              aria-label="Skills"
            >
              <Wrench className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Skills
              </span>
            </button>

            {/* Experience Button */}
            <button
              onClick={() => handleNav('timeline')}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                activeSection === 'timeline'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                  : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
              aria-label="Experience"
            >
              <Briefcase className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Experience
              </span>
            </button>

            {/* Contact Button */}
            <button
              onClick={() => handleNav('contact')}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                  : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
              aria-label="Contact"
            >
              <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Contact
              </span>
            </button>

            {/* Mini Game Button */}
            <button
              onClick={() => handleNav('game')}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer ${
                activeSection === 'game'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-zinc-950 shadow-md scale-105'
                  : 'bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
              }`}
              aria-label="Mini Game"
            >
              <Gamepad2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.75]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Minigame
              </span>
            </button>
          </>
        )}

        {/* Vertical divider on mobile / Horizontal on desktop */}
        <div className="w-[1px] h-4 sm:h-5 lg:w-5 lg:h-[1px] bg-neutral-200 dark:bg-zinc-800 mx-0.5 sm:mx-1 my-0.5" />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 relative group cursor-pointer bg-neutral-100/70 text-neutral-500 hover:bg-neutral-200/80 hover:text-neutral-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent stroke-[1.75]" />
          ) : (
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 stroke-[1.75]" />
          )}
          <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
            Theme
          </span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
