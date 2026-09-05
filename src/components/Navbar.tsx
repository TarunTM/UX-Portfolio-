import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

// BenBox / Framer Signature Sliding Pill (High-damping spring with crisp glide and zero wobble)
const ActivePill: React.FC<{ layoutId: string }> = ({ layoutId }) => (
  <motion.div
    layoutId={layoutId}
    className="absolute inset-0 bg-[#FFFFFF] dark:bg-[#3D3D3D] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)] z-0"
    transition={{
      type: 'spring',
      stiffness: 500,
      damping: 35,
      mass: 0.8,
    }}
  />
);

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isCaseStudy = location.pathname.startsWith('/work/');

  // Default to dark theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      return 'light';
    }
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    return 'dark';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleThemeChanged = () => {
      const saved = localStorage.getItem('theme');
      setTheme(saved === 'light' ? 'light' : 'dark');
    };
    window.addEventListener('theme-changed', handleThemeChanged);
    window.addEventListener('storage', handleThemeChanged);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChanged);
      window.removeEventListener('storage', handleThemeChanged);
    };
  }, []);

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
    window.dispatchEvent(new Event('theme-changed'));
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
      <div className="flex flex-row lg:flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 px-1.5 py-1.5 sm:px-2 sm:py-2 lg:px-2 lg:py-2.5 bg-[#DFEAF0] dark:bg-[#262626] backdrop-blur-xl border border-[#C8D7DF] dark:border-[#383838] rounded-full shadow-[0_8px_28px_rgba(18,24,32,0.08)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {isCaseStudy ? (
          /* ── CASE STUDY MODE NAVBAR ── */
          <>
            {/* Back to Home / Work */}
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 relative group cursor-pointer text-[#000000] hover:bg-[#FFFFFF]/70 hover:text-[#000000] dark:text-[#F0F0F0] dark:hover:bg-[#3D3D3D]/60 dark:hover:text-white"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Back to Home
              </span>
            </button>

            {/* Divider */}
            <div className="w-[1px] h-4 sm:h-5 lg:w-5 lg:h-[1px] bg-[#C8D7DF] dark:bg-[#383838] mx-0.5 sm:mx-1 my-0.5" />

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
                  className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
                  aria-label={item.name}
                >
                  {isActive && <ActivePill layoutId="casestudy-active-pill" />}
                  <IconComponent className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#000000] dark:text-[#FFFFFF]'
                      : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
                  }`} />
                  <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
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
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 relative group cursor-pointer text-[#000000] hover:bg-[#FFFFFF]/70 hover:text-[#000000] dark:text-[#F0F0F0] dark:hover:bg-[#3D3D3D]/60 dark:hover:text-white"
              aria-label={`Next: ${nextProject.name}`}
            >
              <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
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
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Home"
            >
              {activeSection === 'home' && <ActivePill layoutId="nav-active-pill" />}
              <Home className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                activeSection === 'home'
                  ? 'text-[#000000] dark:text-[#FFFFFF]'
                  : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
              }`} />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Home
              </span>
            </button>

            {/* Projects (Work) Button */}
            <button
              onClick={() => handleNav('work')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Work"
            >
              {activeSection === 'work' && <ActivePill layoutId="nav-active-pill" />}
              <Award className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                activeSection === 'work'
                  ? 'text-[#000000] dark:text-[#FFFFFF]'
                  : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
              }`} />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Work
              </span>
            </button>

            {/* Skills Button */}
            <button
              onClick={() => handleNav('skills')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Skills"
            >
              {activeSection === 'skills' && <ActivePill layoutId="nav-active-pill" />}
              <Wrench className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                activeSection === 'skills'
                  ? 'text-[#000000] dark:text-[#FFFFFF]'
                  : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
              }`} />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Skills
              </span>
            </button>

            {/* Experience Button */}
            <button
              onClick={() => handleNav('timeline')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Experience"
            >
              {activeSection === 'timeline' && <ActivePill layoutId="nav-active-pill" />}
              <Briefcase className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                activeSection === 'timeline'
                  ? 'text-[#000000] dark:text-[#FFFFFF]'
                  : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
              }`} />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Experience
              </span>
            </button>

            {/* Contact Button */}
            <button
              onClick={() => handleNav('contact')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Contact"
            >
              {activeSection === 'contact' && <ActivePill layoutId="nav-active-pill" />}
              <Mail className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                activeSection === 'contact'
                  ? 'text-[#000000] dark:text-[#FFFFFF]'
                  : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
              }`} />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Contact
              </span>
            </button>

            {/* Mini Game Button */}
            <button
              onClick={() => handleNav('game')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Mini Game"
            >
              {activeSection === 'game' && <ActivePill layoutId="nav-active-pill" />}
              <Gamepad2 className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                activeSection === 'game'
                  ? 'text-[#000000] dark:text-[#FFFFFF]'
                  : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
              }`} />
              <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                Minigame
              </span>
            </button>
          </>
        )}

        {/* Vertical divider on mobile / Horizontal on desktop */}
        <div className="w-[1px] h-4 sm:h-5 lg:w-5 lg:h-[1px] bg-[#C8D7DF] dark:bg-[#383838] mx-0.5 sm:mx-1 my-0.5" />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 relative group cursor-pointer text-[#000000] hover:bg-[#FFFFFF]/70 hover:text-[#000000] dark:text-[#F0F0F0] dark:hover:bg-[#3D3D3D]/60 dark:hover:text-white"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#000000] opacity-75 group-hover:opacity-100 stroke-[2] transition-colors" />
          ) : (
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white stroke-[2] transition-colors" />
          )}
          <span className="absolute bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
            Theme
          </span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
