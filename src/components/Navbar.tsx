import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  Sparkles,
  Dumbbell,
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
  { id: 'sanctum', path: '/work/sanctum', name: 'Sanctum', label: 'Sanctum · Gym', icon: Sparkles },
  { id: 'rizen', path: '/work/rizen', name: 'Rizen', label: 'Rizen · Fitness App', icon: Dumbbell },
  { id: 'quantel-ai', path: '/work/quantel-ai', name: 'Quantel AI', label: 'Quantel · AI Wealth', icon: TrendingUp },
  { id: 'side-quests', path: '/work/side-quests', name: 'Side Quests', label: 'Side Quests · Explorations', icon: Layers },
];

interface SubheadingItem {
  id: string;
  label: string;
  isNested?: boolean;
}

const CASE_STUDY_SUBHEADINGS: Record<string, SubheadingItem[]> = {
  sanctum: [
    { id: 'overview', label: 'Overview' },
    { id: 'context', label: 'Context' },
    { id: 'role', label: 'Role' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'decisions', label: 'Key Decisions' },
    { id: 'decision-1', label: 'Decision 1', isNested: true },
    { id: 'decision-2', label: 'Decision 2', isNested: true },
    { id: 'decision-3', label: 'Decision 3', isNested: true },
    { id: 'constraints', label: 'Constraints' },
    { id: 'learnings', label: 'Learnings' },
  ],
  rizen: [
    { id: 'overview', label: 'Overview' },
    { id: 'context', label: 'Context' },
    { id: 'role', label: 'Role' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'mvp', label: 'MVP' },
    { id: 'decisions', label: 'Key Decisions' },
    { id: 'decision-1', label: 'Decision 1', isNested: true },
    { id: 'decision-2', label: 'Decision 2', isNested: true },
    { id: 'decision-3', label: 'Decision 3', isNested: true },
    { id: 'visuals', label: 'Visuals' },
    { id: 'next', label: "What's Next" },
  ],
  'quantel-ai': [
    { id: 'overview', label: 'Overview' },
    { id: 'context', label: 'Intro' },
    { id: 'role', label: 'Role' },
    { id: 'screens', label: 'UI Screens' },
  ],
  'side-quests': [
    { id: 'overview', label: 'Overview' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'flipkart', label: 'Flipkart' },
    { id: 'calculator', label: 'Calculator' },
  ],
};

const getCaseStudySlug = (pathname: string): string => {
  const slug = pathname.replace('/work/', '').split('/')[0] || '';
  if (slug === 'side-projects' || slug === 'influencer-agency') return 'side-quests';
  return slug;
};

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

  // Case Study Subheadings Navigation State
  const [activeCaseStudySection, setActiveCaseStudySection] = useState<string>('overview');

  const currentSlug = getCaseStudySlug(location.pathname);
  const currentSubheadings = CASE_STUDY_SUBHEADINGS[currentSlug] || [
    { id: 'overview', label: 'Overview' },
    { id: 'context', label: 'Context' },
    { id: 'outcome', label: 'Outcome' },
    { id: 'decisions', label: 'Decisions' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveCaseStudySection('overview');
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -96;
      const y = element.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      setActiveCaseStudySection(sectionId);
    }
  };

  // Intersection Observer for scroll tracking on Case Study pages
  useEffect(() => {
    if (!isCaseStudy) return;

    const slug = getCaseStudySlug(location.pathname);
    const subheadings = CASE_STUDY_SUBHEADINGS[slug] || [];
    if (subheadings.length === 0) return;

    setActiveCaseStudySection(subheadings[0]?.id || 'overview');

    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (window.scrollY < 200) {
        setActiveCaseStudySection(subheadings[0]?.id || 'overview');
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCaseStudySection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    subheadings.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveCaseStudySection(subheadings[0]?.id || 'overview');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCaseStudy, location.pathname]);

  const currentProjectIdx = CASE_STUDIES.findIndex(
    (cs) => cs.path === location.pathname || location.pathname.startsWith(cs.path)
  );

  const nextProject =
    currentProjectIdx !== -1
      ? CASE_STUDIES[(currentProjectIdx + 1) % CASE_STUDIES.length]
      : CASE_STUDIES[0];

  // ── Tabs Sliding Animation (transitions.dev) ──
  const landingNavPillRef = useRef<HTMLSpanElement>(null);
  const landingNavRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const moveLandingPill = useCallback((animate: boolean) => {
    const pill = landingNavPillRef.current;
    const targetEl = landingNavRefs.current[activeSection];
    if (!pill || !targetEl) return;

    if (!animate) {
      const prev = pill.style.transition;
      pill.style.transition = 'none';
      pill.style.transform = `translate3d(${targetEl.offsetLeft}px, ${targetEl.offsetTop}px, 0)`;
      pill.style.width = `${targetEl.offsetWidth}px`;
      pill.style.height = `${targetEl.offsetHeight}px`;
      pill.style.opacity = '1';
      void pill.offsetWidth;
      pill.style.transition = prev;
    } else {
      pill.style.transform = `translate3d(${targetEl.offsetLeft}px, ${targetEl.offsetTop}px, 0)`;
      pill.style.width = `${targetEl.offsetWidth}px`;
      pill.style.height = `${targetEl.offsetHeight}px`;
      pill.style.opacity = '1';
    }
  }, [activeSection]);

  useEffect(() => {
    if (!isHome) return;
    moveLandingPill(true);
  }, [activeSection, isHome, moveLandingPill]);

  useEffect(() => {
    if (!isHome) return;
    const frame = requestAnimationFrame(() => moveLandingPill(false));
    const handleResize = () => moveLandingPill(false);
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHome, moveLandingPill]);

  // Mobile Case Study Sliding Pill
  const caseStudyPillRef = useRef<HTMLSpanElement>(null);
  const caseStudyRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeCaseStudySlug = CASE_STUDIES.find(
    (cs) => cs.path === location.pathname || location.pathname.startsWith(cs.path)
  )?.id;

  const moveCaseStudyPill = useCallback((animate: boolean) => {
    const pill = caseStudyPillRef.current;
    if (!activeCaseStudySlug) {
      if (pill) pill.style.opacity = '0';
      return;
    }
    const targetEl = caseStudyRefs.current[activeCaseStudySlug];
    if (!pill || !targetEl) return;

    if (!animate) {
      const prev = pill.style.transition;
      pill.style.transition = 'none';
      pill.style.transform = `translate3d(${targetEl.offsetLeft}px, ${targetEl.offsetTop}px, 0)`;
      pill.style.width = `${targetEl.offsetWidth}px`;
      pill.style.height = `${targetEl.offsetHeight}px`;
      pill.style.opacity = '1';
      void pill.offsetWidth;
      pill.style.transition = prev;
    } else {
      pill.style.transform = `translate3d(${targetEl.offsetLeft}px, ${targetEl.offsetTop}px, 0)`;
      pill.style.width = `${targetEl.offsetWidth}px`;
      pill.style.height = `${targetEl.offsetHeight}px`;
      pill.style.opacity = '1';
    }
  }, [activeCaseStudySlug]);

  useEffect(() => {
    if (!isCaseStudy) return;
    moveCaseStudyPill(true);
  }, [isCaseStudy, location.pathname, moveCaseStudyPill]);

  useEffect(() => {
    if (!isCaseStudy) return;
    const frame = requestAnimationFrame(() => moveCaseStudyPill(false));
    const handleResize = () => moveCaseStudyPill(false);
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [isCaseStudy, moveCaseStudyPill]);

  return (
    <nav
      className={
        isCaseStudy
          ? "fixed bottom-[70px] sm:bottom-8 left-1/2 -translate-x-1/2 xl:bottom-auto xl:top-1/2 xl:left-6 2xl:left-8 xl:-translate-y-1/2 xl:translate-x-0 z-[1000] select-none max-w-[calc(100vw-24px)] xl:max-w-none"
          : "fixed bottom-[70px] sm:bottom-8 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:left-6 xl:left-8 lg:-translate-y-1/2 lg:translate-x-0 z-[1000] select-none max-w-[calc(100vw-24px)] lg:max-w-none"
      }
    >
      <div
        className={
          isCaseStudy
            ? "flex flex-row xl:flex-col items-center xl:items-stretch gap-1 sm:gap-1.5 xl:gap-1 px-1.5 py-1.5 sm:px-2 sm:py-2 xl:p-0 max-xl:bg-[#DFEAF0] max-xl:dark:bg-[#262626] max-xl:backdrop-blur-xl max-xl:border max-xl:border-[#C8D7DF] max-xl:dark:border-[#383838] max-xl:rounded-full max-xl:shadow-[0_8px_28px_rgba(18,24,32,0.08)] max-xl:dark:shadow-[0_12px_45px_rgba(0,0,0,0.5)] bg-transparent dark:bg-transparent border-none dark:border-none shadow-none dark:shadow-none backdrop-blur-none transition-all duration-300 max-w-[calc(100vw-24px)] xl:max-w-none xl:min-w-[144px]"
            : "relative flex flex-row lg:flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 px-1.5 py-1.5 sm:px-2 sm:py-2 lg:px-2 lg:py-2.5 bg-[#DFEAF0] dark:bg-[#262626] backdrop-blur-xl border border-[#C8D7DF] dark:border-[#383838] rounded-full shadow-[0_8px_28px_rgba(18,24,32,0.08)] dark:shadow-[0_12px_45px_rgba(0,0,0,0.5)] transition-all duration-300"
        }
      >
        {isCaseStudy ? (
          /* ── CASE STUDY MODE NAVBAR ── */
          <>
            {/* ── MOBILE & TABLET NAVIGATION (< 1280px: Home + 4 Case Studies + Next Project) ── */}
            <div className="relative flex xl:hidden items-center gap-1 sm:gap-1.5">
              {/* Sliding Pill for mobile case study dock */}
              <span
                ref={caseStudyPillRef}
                className="t-nav-pill opacity-0"
                aria-hidden="true"
              />

              {/* Back to Home / Work */}
              <button
                onClick={() => navigate('/')}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 relative z-10 group cursor-pointer text-[#000000] hover:bg-[#FFFFFF]/70 hover:text-[#000000] dark:text-[#F0F0F0] dark:hover:bg-[#3D3D3D]/60 dark:hover:text-white"
                aria-label="Back to Home"
              >
                <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                <span className="absolute bottom-12 sm:bottom-14 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                  Back to Home
                </span>
              </button>

              {/* Divider */}
              <div className="w-[1px] h-4 sm:h-5 bg-[#C8D7DF] dark:bg-[#383838] mx-0.5 sm:mx-1 my-0.5" />

              {/* 4 Case Studies Quick Jump */}
              {CASE_STUDIES.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.id}
                    ref={(el) => { caseStudyRefs.current[item.id] = el; }}
                    onClick={() => {
                      if (!isActive) {
                        navigate(item.path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
                    aria-label={item.name}
                  >
                    <IconComponent className={`w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] relative z-10 transition-colors duration-200 ${
                      isActive
                        ? 'text-[#000000] dark:text-[#FFFFFF]'
                        : 'text-[#000000] opacity-75 group-hover:opacity-100 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white'
                    }`} />
                    <span className="absolute bottom-12 sm:bottom-14 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
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
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 relative z-10 group cursor-pointer text-[#000000] hover:bg-[#FFFFFF]/70 hover:text-[#000000] dark:text-[#F0F0F0] dark:hover:bg-[#3D3D3D]/60 dark:hover:text-white"
                aria-label={`Next: ${nextProject.name}`}
              >
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
                <span className="absolute bottom-12 sm:bottom-14 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                  Next: {nextProject.name}
                </span>
              </button>
            </div>

            {/* ── DESKTOP NAVIGATION (>= 1280px: In-Page Subheadings with Indented Decisions) ── */}
            <div className="hidden xl:flex flex-col items-stretch gap-1">
              {/* Back to Home with Home icon only */}
              <button
                onClick={() => navigate('/')}
                className="w-10 h-10 rounded-full flex items-center justify-center self-start ml-1 text-[#000000]/70 dark:text-[#F0F0F0]/70 hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-all duration-200 active:scale-90 relative group cursor-pointer select-none bg-transparent"
                aria-label="Home"
              >
                <Home className="w-4.5 h-4.5 stroke-[2] transition-transform duration-200 group-hover:scale-110" />
                <span className="absolute left-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50">
                  Home
                </span>
              </button>

              {/* Divider */}
              <div className="w-full h-[1px] bg-black/[0.08] dark:bg-white/[0.12] my-1.5 shrink-0" />

              {/* Subheadings list: compact vertical spacing to comfortably fit all sections including Decision 1, 2, 3 */}
              <div className="flex flex-col items-stretch gap-0.5 py-0.5">
                {currentSubheadings.map((item) => {
                  const isActive = activeCaseStudySection === item.id;
                  const isNested = Boolean(item.isNested);
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative whitespace-nowrap text-left shrink-0 transition-colors duration-200 cursor-pointer select-none active:scale-95 bg-transparent ${
                        isNested
                          ? 'pl-7 pr-3.5 py-1 text-[12.5px]'
                          : 'px-3.5 py-1.25 text-[13px]'
                      } ${
                        isActive
                          ? 'text-[#000000] dark:text-[#FFFFFF] font-semibold'
                          : isNested
                          ? 'text-[#000000]/45 dark:text-[#76767C] hover:text-[#000000] dark:hover:text-[#FFFFFF] font-normal'
                          : 'text-[#000000]/55 dark:text-[#8E8E93] hover:text-[#000000] dark:hover:text-[#FFFFFF] font-medium'
                      }`}
                    >
                      <span className="relative z-10 block truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* ── LANDING PAGE MODE NAVBAR ── */
          <>
            {/* Sliding Pill for landing navigation (transitions.dev Tabs Sliding) */}
            <span
              ref={landingNavPillRef}
              className="t-nav-pill opacity-0"
              aria-hidden="true"
            />

            {/* Home Button */}
            <button
              ref={(el) => { landingNavRefs.current['home'] = el; }}
              onClick={() => handleNav('home')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Home"
            >
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
              ref={(el) => { landingNavRefs.current['work'] = el; }}
              onClick={() => handleNav('work')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Work"
            >
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
              ref={(el) => { landingNavRefs.current['skills'] = el; }}
              onClick={() => handleNav('skills')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Skills"
            >
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
              ref={(el) => { landingNavRefs.current['timeline'] = el; }}
              onClick={() => handleNav('timeline')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Experience"
            >
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
              ref={(el) => { landingNavRefs.current['contact'] = el; }}
              onClick={() => handleNav('contact')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Contact"
            >
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
              ref={(el) => { landingNavRefs.current['game'] = el; }}
              onClick={() => handleNav('game')}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center relative z-10 group cursor-pointer transition-transform duration-200 active:scale-90"
              aria-label="Mini Game"
            >
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
        <div
          className={
            isCaseStudy
              ? "w-[1px] h-4 sm:h-5 xl:w-full xl:h-[1px] bg-[#C8D7DF]/60 dark:bg-[#383838]/60 xl:bg-black/[0.08] xl:dark:bg-white/[0.12] mx-0.5 sm:mx-1 my-0.5 xl:my-2 shrink-0"
              : "w-[1px] h-4 sm:h-5 lg:w-5 lg:h-[1px] bg-[#C8D7DF] dark:bg-[#383838] mx-0.5 sm:mx-1 my-0.5"
          }
        />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 relative group cursor-pointer text-[#000000] dark:text-[#F0F0F0] ${
            isCaseStudy
              ? 'self-center xl:self-start xl:ml-1 hover:bg-[#FFFFFF]/70 dark:hover:bg-[#3D3D3D]/60 xl:hover:bg-transparent xl:dark:hover:bg-transparent hover:text-[#000000] dark:hover:text-white'
              : 'self-center hover:bg-[#FFFFFF]/70 dark:hover:bg-[#3D3D3D]/60 hover:text-[#000000] dark:hover:text-white'
          }`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#000000] opacity-75 group-hover:opacity-100 stroke-[2] transition-colors" />
          ) : (
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 dark:text-[#F0F0F0] dark:opacity-80 dark:group-hover:opacity-100 dark:group-hover:text-white stroke-[2] transition-colors" />
          )}
          <span className={`absolute px-2.5 py-1 rounded-md bg-[#000000] dark:bg-white text-white dark:text-[#000000] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md border border-neutral-800 dark:border-neutral-200 z-50 ${
            isCaseStudy
              ? 'bottom-12 sm:bottom-14 xl:bottom-auto xl:left-14 xl:top-1/2 xl:-translate-y-1/2'
              : 'bottom-12 sm:bottom-14 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2'
          }`}>
            Theme
          </span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
