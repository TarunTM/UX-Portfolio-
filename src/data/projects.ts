export interface Metric {
  value: string;
  label: string;
}

export interface ProcessSection {
  phase: string;
  type: 'Divergent' | 'Convergent';
  summary: string;
  details: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  timeline: string;
  tools: string[];
  objective: string;
  problem: string;
  solution: string;
  metrics: Metric[];
  process: ProcessSection[];
  takeaways: string[];
}

export const projects: Project[] = [
  {
    id: "sanctum",
    title: "Sanctum House of Wellness",
    tagline: "Designing a premium fitness experience around brand clarity, local discovery, and conversion.",
    category: "Web — Desktop + Mobile · Fitness & Wellness",
    role: "UI/UX Designer @The Social Slate",
    timeline: "3 Months (2025)",
    tools: ["Figma", "FigJam", "Wix Studio", "Wix Bookings", "Asana", "Google Meet"],
    objective: "Create a digital experience that clearly communicates what Sanctum stands for, helps users find the right class and location, and makes it seamless to enquire.",
    problem: "Sanctum needed to communicate its two-pillar proposition without turning the homepage into a feature list, while overcoming Wix Bookings card constraints and bridging the gap between ad clicks and direct enquiries.",
    solution: "Turned contact details into one-tap WhatsApp, Call, and Directions actions (generating ~3x enquiries), moved location discovery into the site structure, and balanced Training and Recovery through interactive scroll reveal.",
    metrics: [
      { value: "~3×", label: "Enquiries Surge within 3 Weeks" },
      { value: "3", label: "Mumbai Clubs (Andheri, Khar, Juhu)" },
      { value: "2", label: "Equal Pillars (Training + Recovery)" }
    ],
    process: [
      {
        phase: "01 Context & Role",
        type: "Divergent",
        summary: "Designing and building Sanctum's digital presence in Wix Studio.",
        details: "Sanctum is a premium fitness and wellness brand with multiple locations across Mumbai. Designed the homepage, club pages, and GroupX experience in Figma, then built the final site in Wix Studio using Wix Bookings for scheduling."
      },
      {
        phase: "02 Decision 1: Contact Details into Actions",
        type: "Convergent",
        summary: "Turning plain text into one-tap WhatsApp, Call, and Directions buttons.",
        details: "Meta Ads sent traffic directly to club pages where visitors wanted to ask questions or visit. Replaced plain static phone and address text with direct action buttons, leading to roughly 3x WhatsApp and phone enquiries within 3 weeks."
      },
      {
        phase: "03 Decision 2: Location into Site Structure",
        type: "Divergent",
        summary: "Overcoming Wix Bookings card limitations through architecture.",
        details: "Wix Bookings preset cards had fixed layouts with no location fields. Solved this by moving location out of cards and into the site structure: a dedicated 'GroupX near you' location filter and embedded club-specific class widgets."
      },
      {
        phase: "04 Decision 3: Equal Weight Pillars",
        type: "Convergent",
        summary: "Balancing Training and Recovery without overloading the homepage.",
        details: "Iterated through image cards and card grids to a clean interactive scroll reveal that presents Sanctum's two 4-service pillars with equal weight before users navigate to club pages."
      }
    ],
    takeaways: [
      "Design for outcomes, not just aesthetics — a practical, high-intent UX change can drive massive conversion improvements.",
      "Design with implementation in mind — working within platform constraints (Wix Bookings) under strict deadlines requires smart structural solutions.",
      "Direct action buttons (WhatsApp, Call, Directions) capture high-intent ad traffic immediately."
    ]
  },
  {
    id: "rizen",
    title: "RIZEN",
    tagline: "Designing for the comeback, not the streak.",
    category: "Mobile App · Gamified Fitness & Habit Formation",
    role: "Product Designer (End-to-End)",
    timeline: "1 Month (2025)",
    tools: ["Figma", "FigJam", "Balsamiq", "Google Meet", "Mobile UI/UX"],
    objective: "A fitness companion designed to help inconsistent exercisers build sustainable workout habits through structure, progress, and recovery accountability.",
    problem: "78% of users abandon fitness apps after breaking a streak due to guilt and friction. The core challenge wasn't starting a routine — it was restarting after missing a workout.",
    solution: "Engineered a comeback engine that rewards restarting, separated calm planning from live gym execution, replaced global leaderboards with intimate friend pods, and established a 6-tier XP rank ladder.",
    metrics: [
      { value: "37", label: "Research Surveys" },
      { value: "5", label: "In-Depth Interviews" },
      { value: "6", label: "Progression Tiers (Iron to Elite)" }
    ],
    process: [
      {
        phase: "01 Discovery & Insight",
        type: "Divergent",
        summary: "Discovering that the core problem was restarting, not starting.",
        details: "Surveyed 37 exercisers and conducted 5 in-depth interviews. Uncovered that streak-based guilt triggers immediate abandonment when life interrupts training routines."
      },
      {
        phase: "02 Decision 1: Friend-Circle Pods",
        type: "Convergent",
        summary: "Replacing toxic global leaderboards with intimate friend accountability.",
        details: "Substituted demotivating public rankings with 3-to-5 person friend circles focused on celebration and positive nudges rather than comparison."
      },
      {
        phase: "03 Decision 2: Planning vs. Execution Separation",
        type: "Divergent",
        summary: "Calm planning at home vs high-focus live workout tracking.",
        details: "Split the app into two intentional modes: relaxed routine building at home, and high-contrast, clutter-free gym floor execution with 56pt tap targets and auto-rest timers."
      },
      {
        phase: "04 Decision 3: XP Progression & Badges",
        type: "Convergent",
        summary: "A 6-tier ladder and badges rewarding comeback resilience.",
        details: "Architected a long-term progression ladder from Iron to Rizen Elite with consistency badges that reward returning to workouts rather than demanding unbroken perfection."
      }
    ],
    takeaways: [
      "A feature is only valuable when it supports a desirable human behavior.",
      "Designing for the comeback prevents shame-induced churn and turns broken streaks into sustainable habit loops.",
      "Separating planning cognitive load from live execution creates an effortless gym-floor experience."
    ]
  },
  {
    id: "quantel-ai",
    title: "Quantel AI",
    tagline: "AI-powered wealth management platform",
    category: "Web App · Mobile App · FinTech",
    role: "UI/UX Intern @The Social Slate",
    timeline: "3 Months (2025)",
    tools: ["Figma", "FigJam", "Jira", "Asana", "Google Meet"],
    objective: "Quantel AI brings investing, financial advice and AI market insights into one experience. The goal was to design new production screens and adapt web experiences for mobile inside the existing system.",
    problem: "Joined after the product direction and design system were already established. Every design decision had to work strictly inside the existing system while delivering a new Light Mode dashboard, mobile translations for Capital and Advise, and a status view that leads into Advise.",
    solution: "Adapted the dashboard to Light Mode using 12 role-based variables without layout changes, brought Capital & Advise to mobile without altering user journeys, and turned external portfolio views into a path to Advise.",
    metrics: [
      { value: "50%+", label: "Portfolio Returns (YT Source)" },
      { value: "12", label: "Light Mode Variables" },
      { value: "3", label: "Core Shipped Decisions" }
    ],
    process: [
      {
        phase: "01 Context & Scope",
        type: "Divergent",
        summary: "Joining after product direction and design system were set.",
        details: "Quantel AI brings investing, financial advice and AI market insights into one experience. Joined after the product direction and design system were set, so every decision worked inside the existing system. Focused on designing new production screens and adapting web experiences for mobile."
      },
      {
        phase: "02 Decision 1: Light Mode Adaptation",
        type: "Convergent",
        summary: "Adapting the dashboard to light mode without redesigning it.",
        details: "Kept components, layout, and hierarchy intact while switching color. Built 12 variables organized strictly by role (Surface, Text, Stroke, CTA/Link), achieving a 6.3:1 contrast ratio behind white button labels. The light-mode dashboard shipped."
      },
      {
        phase: "03 Decision 2: Mobile Adaptation",
        type: "Divergent",
        summary: "Bringing Capital and Advise to mobile without changing flows.",
        details: "Translated web experiences into mobile screens — one question per screen with step counters in Capital, and stacked plan cards with Recommended badges in Advise. Both mobile flows shipped."
      },
      {
        phase: "04 Decision 3: Path to Advise & Concept",
        type: "Convergent",
        summary: "Turning portfolio status into a path to Advise; Points & Rewards concept.",
        details: "Designed an Assets status view with health ratings and a 'Schedule a free call' bar leading into Advise. Explored a Points & Rewards concept with placeholder values. Post-launch metrics showed 50%+ returns over 18 months across Quantel portfolios (source: Quantel's public YouTube video; reflects Quantel's platform and investment models as a whole, not designer screens alone)."
      }
    ],
    takeaways: [
      "Role-based tokens made the light mode possible — organizing color strictly by surface, text, stroke, and brand allowed the entire dashboard to switch themes without modifying layout code.",
      "Check contrast while building — lighter text colors sit near the WCAG AA limit, so validating contrast early is crucial.",
      "50%+ returns over 18 months across Quantel portfolios (source: Quantel's public YouTube video) reflect Quantel's investment models and platform as a whole, not my screens alone."
    ]
  },
  {
    id: "side-quests",
    title: "Side Quests",
    tagline: "A collection of small design explorations, interface experiments, and everyday UX problems I wanted to solve.",
    category: "Design Explorations · UI/UX Experiments",
    role: "Product Designer",
    timeline: "2025",
    tools: ["Figma", "Prototyping", "Design Systems", "Mobile UI/UX"],
    objective: "A collection of small design explorations, interface experiments, and everyday UX problems I wanted to solve.",
    problem: "Everyday mobile and web products frequently have subtle friction points in navigation, context switching, and checkout transparency.",
    solution: "Crafted minimal, focused design interventions for Instagram Reels shared browsing, Flipkart Checkout order transparency, and Nothing Calculator.",
    metrics: [
      { value: "3", label: "Core Explorations" },
      { value: "01", label: "Instagram Reels" },
      { value: "02", label: "Flipkart Checkout" },
      { value: "03", label: "Nothing Calculator" }
    ],
    process: [
      {
        phase: "01 Instagram Reels",
        type: "Convergent",
        summary: "Making shared reels easier to browse and reply to.",
        details: "When a friend sends multiple reels in a DM, each reel has to be opened individually. I explored a way to surface reels shared by a friend directly inside the Reels experience, turning a repetitive back-and-forth interaction into a continuous viewing experience."
      },
      {
        phase: "02 Flipkart Checkout",
        type: "Divergent",
        summary: "Adding context to the payment step.",
        details: "Added an Order Summary to the checkout experience, allowing users to quickly review what they're purchasing before making payment, giving users a final opportunity to catch mistakes and creating more confidence."
      },
      {
        phase: "03 Nothing Calculator",
        type: "Divergent",
        summary: "UI exploration for Nothing Calculator.",
        details: "A visual redesign of the calculator experience inspired by Nothing’s minimal, distinctive design language. The exploration focused on typography, spacing, hierarchy, and creating a calculator interface that feels native to the Nothing ecosystem."
      }
    ],
    takeaways: [
      "Great UX often lives in the micro-moments — solving everyday friction in the apps we use constantly.",
      "A seamless continuous flow reduces cognitive context switching between messaging and media.",
      "Clear order transparency at the final checkout step builds buyer confidence."
    ]
  },
  {
    id: "strength-training-research",
    title: "Strength App UX Research",
    tagline: "Competitive Benchmarking & UX Analysis across Leading Fitness Apps",
    category: "UX Research & Benchmarking",
    role: "UX Researcher",
    timeline: "2 Months (2025)",
    tools: ["Miro", "Figma", "Lookback", "Dscout"],
    objective: "Execute a thorough competitive analysis and usability benchmarking study on the top three strength training platforms (Strong, JEFIT, and Hevy) to guide a next-gen fitness app roadmap.",
    problem: "Most strength apps suffer from high drop-off rates after 2 weeks. Users find the workout-logging interface too tedious to use during intense training sessions, leading them to revert to physical notebooks.",
    solution: "A comprehensive usability audit mapping user journeys, cognitive load scores, and interface layouts. Proposed a 'three-tap log' conceptual framework to minimize training friction.",
    metrics: [
      { value: "3", label: "Industry Leaders Audited" },
      { value: "48", label: "Workout Log Tasks Analysed" },
      { value: "SUS", label: "Validated System Usability Scale Scores" }
    ],
    process: [
      {
        phase: "01 Discover",
        type: "Divergent",
        summary: "Testing current workout log flows with active athletes.",
        details: "Recruited 15 strength athletes for usability tests across Strong, JEFIT, and Hevy during live workouts. Conducted cognitive walkthroughs and administered SUS surveys to evaluate task friction."
      },
      {
        phase: "02 Define",
        type: "Convergent",
        summary: "Identifying key friction points in workout entry.",
        details: "Synthesized user data to identify core issues: JEFIT was overloaded with ads and cluttered stats, Strong felt clean but abandoned by developers, and Hevy balanced social well but had a complex routine builder. Defined the 'Tedium Barrier' in logging."
      },
      {
        phase: "03 Develop",
        type: "Divergent",
        summary: "Ideating friction-free logging frameworks.",
        details: "Designed interface wireframes aimed at reducing tapping actions. Explored ideas such as automatic plate calculator overlays, swipe-to-complete actions, and voice-assisted set logging."
      },
      {
        phase: "04 Deliver",
        type: "Convergent",
        summary: "Synthesizing research report and interactive wireframes.",
        details: "Created a comprehensive UX evaluation matrix mapping usability scores. Built a high-fidelity Figma prototype showcasing the 'three-tap log' flow. Delivered the final research presentation to the product stakeholders."
      }
    ],
    takeaways: [
      "Any interface detail that requires double-tapping or keyboard input during a workout increases task load and leads to user drop-off.",
      "Smart defaults (pre-populating the weight and reps from the previous session) resolve 80% of workout entry friction."
    ]
  }
];
