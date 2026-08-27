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
    id: "rizen",
    title: "RIZEN",
    tagline: "Designing for the comeback, not the streak.",
    category: "Mobile App · Gamified Fitness",
    role: "Product Designer",
    timeline: "1 Month",
    tools: ["Figma", "Design Systems", "User Research", "Gamification Design", "Mobile UI/UX"],
    objective: "A fitness companion designed to help inconsistent exercisers build sustainable workout habits through structure, progress and accountability.",
    problem: "The challenge was to move beyond workout tracking and help users stay consistent and return after missing a workout. The problem wasn't starting. It was restarting.",
    solution: "An intentional fitness experience built around recovery nudges, separating workout planning from live execution, friend-circle accountability, and visible XP/tier progress.",
    metrics: [
      { value: "37", label: "Research Surveys" },
      { value: "5", label: "In-Depth Interviews" },
      { value: "6", label: "Progression Tiers" }
    ],
    process: [
      {
        phase: "01 Intro & Insight",
        type: "Divergent",
        summary: "Discovering that the core problem wasn't starting, it was restarting.",
        details: "Surveyed 37 exercisers and conducted 5 in-depth qualitative interviews. Found that 78% of users abandon fitness apps entirely after breaking a streak due to guilt, shame, and friction in resetting routines."
      },
      {
        phase: "02 Role & Systems",
        type: "Convergent",
        summary: "Architecting user flows, information architecture, and the design system.",
        details: "Worked in a cross-functional team of 6 to establish complete UI components, recovery flow architectures, rank progression metrics, and high-fidelity screens."
      },
      {
        phase: "03 Design Decisions",
        type: "Divergent",
        summary: "Engineering the comeback engine, planning separation, and small circles.",
        details: "Designed 15-minute recovery reactivation flows, split the app into relaxed planning vs high-focus execution modes, and removed toxic global leaderboards in favor of intimate friend pods."
      },
      {
        phase: "04 Outcome & Delivery",
        type: "Convergent",
        summary: "Delivering a focused MVP balancing Structure, Progress, Recovery, and Social.",
        details: "Delivered a complete mobile prototype integrating workout plans, live tracking, friend activity feeds, and a 6-tier XP rank ladder (Iron to Rizen Elite)."
      }
    ],
    takeaways: [
      "A feature is only valuable when it supports a user behaviour.",
      "Rizen taught me to move beyond 'What features should this product have?' and ask 'What behaviour are we trying to change?'",
      "Designing for the comeback prevents shame-induced churn and turns broken streaks into sustainable habit loops."
    ]
  },
  {
    id: "sanctum",
    title: "Sanctum House of Wellness",
    tagline: "Designing a premium fitness experience around brand clarity, local discovery, and conversion.",
    category: "Web — Desktop + Mobile · Fitness & Wellness",
    role: "UI/UX Designer",
    timeline: "2025",
    tools: ["Figma", "Responsive Layouts", "Location Discovery", "Conversion UX"],
    objective: "Create a digital experience that clearly communicated what Sanctum stands for while helping users discover a nearby club and take the next step.",
    problem: "Sanctum needed to communicate its core proposition without overwhelming visitors with a long list of services, while bridging the gap between brand understanding and physical club enquiry in Mumbai.",
    solution: "Designed a clean two-pillar homepage (Training + Recovery), instant location discovery for Mumbai clubs, and high-intent contact actions (WhatsApp, Phone, Directions) on club landing pages.",
    metrics: [
      { value: "~3×", label: "Enquiries Increase" },
      { value: "3", label: "Mumbai Clubs (Andheri, Khar, Juhu)" },
      { value: "2", label: "Equal Core Pillars" }
    ],
    process: [
      {
        phase: "01 Project Intro",
        type: "Divergent",
        summary: "Defining brand clarity and local discovery for premium Mumbai clubs.",
        details: "Sanctum House of Wellness is a premium fitness and wellness brand with clubs across Mumbai. The challenge was to create a digital experience that clearly communicated what Sanctum stands for while helping users discover a nearby club and take the next step."
      },
      {
        phase: "02 Team & Role",
        type: "Convergent",
        summary: "Shaping the journey from understanding to club discovery and enquiry.",
        details: "Worked alongside a team of three designers contributing to new website screens, responsive layouts, location experiences, and conversion-focused improvements."
      },
      {
        phase: "03 Key Design Decisions",
        type: "Divergent",
        summary: "Two pillars, location discovery, and actionable club pages.",
        details: "Introduced Training + Recovery as two equal visual pillars, placed location discovery immediately after brand proposition, and added direct WhatsApp, Phone, and Directions actions."
      },
      {
        phase: "04 Outcome & Impact",
        type: "Convergent",
        summary: "3× surge in direct enquiries during active Meta Ad traffic.",
        details: "Following the addition of direct contact actions, enquiries increased approximately 3× while Meta Ads were actively driving traffic to the website, demonstrating the power of intent-driven UX."
      }
    ],
    takeaways: [
      "A small, intent-driven UX improvement can directly support business conversion.",
      "Shaping the journey from understanding Sanctum → finding a club → making an enquiry drastically reduces cognitive friction.",
      "Direct communication channels (WhatsApp, Phone, Directions) capture high-intent ad traffic before drop-off occurs."
    ]
  },
  {
    id: "quantel-ai",
    title: "Quantel AI",
    tagline: "Designing new experiences for an AI-powered wealth management platform",
    category: "FinTech · Web App · Mobile App · UI/UX Design",
    role: "UI/UX Designer",
    timeline: "2025",
    tools: ["Figma", "Design Systems", "Web App UI", "Mobile UX", "FinTech"],
    objective: "Quantel AI is a wealth management platform that brings investing, financial advice, and market insights into one digital experience.",
    problem: "When I joined the project, the core product direction and design system were already established. I focused on designing new web and mobile experiences needed to expand the product toward production.",
    solution: "Structured complex asset data into clear scannable hierarchies, designed focused step-by-step onboarding for Capital & Advise, and extended Light Mode and Points & Rewards while maintaining 100% design system consistency.",
    metrics: [
      { value: "5+", label: "New Core Flows" },
      { value: "100%", label: "System Consistency" },
      { value: "Web+App", label: "Production Ready" }
    ],
    process: [
      {
        phase: "01 Project Intro",
        type: "Divergent",
        summary: "Extending an established AI wealth management platform toward production.",
        details: "Quantel AI is a wealth management platform that brings investing, financial advice, and market insights into one digital experience. When I joined the project, the core product direction and design system were already established. I focused on designing new web and mobile experiences needed to expand the product toward production."
      },
      {
        phase: "02 My Role",
        type: "Convergent",
        summary: "Extending the existing product through new screens and flows.",
        details: "Contributed to new web and mobile experiences including the Assets Dashboard, Light Mode Dashboard, Points & Rewards experience, Quantel Capital, and Quantel Advise, ensuring seamless consistency with the established design system."
      },
      {
        phase: "03 Key Design Decisions",
        type: "Divergent",
        summary: "Structuring data, focused onboarding steps, and system extension.",
        details: "Created scannable asset hierarchies, broke Capital and Advise into focused progressive steps, and adapted existing components to Light Mode and gamified reward systems."
      },
      {
        phase: "04 Outcome & Delivery",
        type: "Convergent",
        summary: "Delivered production-ready web and mobile investment experiences.",
        details: "Expanded Quantel's existing product foundation across investment, wealth management, and engagement features while mastering constraint within an established FinTech design system."
      }
    ],
    takeaways: [
      "Extending a product is about mastering constraint — designing seamlessly within an established system.",
      "Structuring data from broad portfolio overview to granular holdings keeps complex numbers scannable.",
      "One decision at a time reduces cognitive overload in high-stakes financial choices."
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
    solution: "Crafted minimal, focused design interventions for Nothing Calculator, Instagram Reels shared browsing, and Flipkart Checkout order transparency.",
    metrics: [
      { value: "3", label: "Core Explorations" },
      { value: "01", label: "Nothing Calculator" },
      { value: "02", label: "Instagram Reels" },
      { value: "03", label: "Flipkart Checkout" }
    ],
    process: [
      {
        phase: "01 Nothing Calculator",
        type: "Divergent",
        summary: "UI exploration for Nothing Calculator.",
        details: "A visual redesign of the calculator experience inspired by Nothing’s minimal, distinctive design language. The exploration focused on typography, spacing, hierarchy, and creating a calculator interface that feels native to the Nothing ecosystem."
      },
      {
        phase: "02 Instagram Reels",
        type: "Convergent",
        summary: "Making shared reels easier to browse and reply to.",
        details: "When a friend sends multiple reels in a DM, each reel has to be opened individually. I explored a way to surface reels shared by a friend directly inside the Reels experience, turning a repetitive back-and-forth interaction into a continuous viewing experience."
      },
      {
        phase: "03 Flipkart Checkout",
        type: "Divergent",
        summary: "Adding context to the payment step.",
        details: "Added an Order Summary to the checkout experience, allowing users to quickly review what they're purchasing before making payment, giving users a final opportunity to catch mistakes and creating more confidence."
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
