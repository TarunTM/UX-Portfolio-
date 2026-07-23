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
    id: "quantel-ai",
    title: "Quantel AI",
    tagline: "Account Creation & Trust-Building in AI Investment Services",
    category: "Web & Mobile Application",
    role: "Lead Product Designer",
    timeline: "3 Months (Q3 2025)",
    tools: ["Figma", "ProtoPie", "Tailwind CSS", "UserTesting"],
    objective: "Redesign the digital onboarding and account creation flow for an AI-powered retail investment assistant, lowering abandonment rates while fostering platform trust.",
    problem: "Quantel AI's onboarding flow suffered from a 58% abandonment rate. Users felt overwhelmed by long financial compliance forms (KYC) and expressed skepticism regarding how the AI algorithm managed their financial portfolios.",
    solution: "A step-by-step progressive onboarding wizard that groups complex financial questions into natural, conversational queries. We integrated contextual tooltips explaining 'Why the AI needs this' at high-friction points, combined with visual trust cues.",
    metrics: [
      { value: "+34%", label: "Onboarding Completion Rate" },
      { value: "-42s", label: "Average Time-to-Complete" },
      { value: "91%", label: "User Trust Rating (Post-Flow)" }
    ],
    process: [
      {
        phase: "01 Discover",
        type: "Divergent",
        summary: "Understanding compliance friction and user trust barriers.",
        details: "Conducted 12 moderated remote usability tests on the legacy flow and ran an open-ended survey (150 participants). Discovered that users abandoned because they didn't understand why the platform needed sensitive financial data (SSNs/net worth statements) right after sign-up."
      },
      {
        phase: "02 Define",
        type: "Convergent",
        summary: "Synthesizing research into core design pillars.",
        details: "Mapped out the user journey and identified three critical friction points: compliance over-explanation, lack of algorithmic transparency, and rigid input validation. Defined the design goal: humanize compliance and explain AI decisions in real-time."
      },
      {
        phase: "03 Develop",
        type: "Divergent",
        summary: "Ideating conversational and progressive onboarding patterns.",
        details: "Sketched and wireframed three distinct layouts: a single-scroll page, a modular card stack, and a conversational chat-style wizard. Designed multiple micro-copy variations for compliance fields to reassure users about data security."
      },
      {
        phase: "04 Deliver",
        type: "Convergent",
        summary: "Testing interactive prototypes and shipping the flow.",
        details: "Refined the conversational wizard into a high-fidelity prototype. Conducted A/B testing on 50 users. The progressive modular wizard proved superior, leading to a 34% increase in flow completion. Validated visual cues and packaged components for front-end implementation."
      }
    ],
    takeaways: [
      "In AI-driven finance, transparency is the primary driver of conversion. Explaining the reasoning behind algorithmic data collection builds instant trust.",
      "Progressive disclosure is highly effective for reducing cognitive load during lengthy compliance questionnaires."
    ]
  },
  {
    id: "sanctum",
    title: "Sanctum Luxury Gym",
    tagline: "Overhauling Luxury Fitness Branding & Lead Generation",
    category: "Luxury Gym Redesign",
    role: "Freelance UI/UX Designer",
    timeline: "2 Months (2025)",
    tools: ["Wix Studio", "Figma", "Adobe Photoshop", "Google Analytics"],
    objective: "Redesign Sanctum Gym's website to convey an ultra-premium, wellness-sanctuary brand identity while optimizing the membership lead generation funnel.",
    problem: "The original site looked generic and failed to justify the gym's premium monthly price point. Navigation was cluttered, and the CTA button for booking private tours generated fewer than 5 inquiries per week.",
    solution: "A bespoke editorial landing page featuring high-contrast typography, cinematic fullscreen photography, and an integrated, seamless tour booking widget. Rebuilt on Wix Studio for smooth responsiveness and scroll animation control.",
    metrics: [
      { value: "+148%", label: "Membership Lead Inquiries" },
      { value: "45%", label: "Reduction in Page Bounce Rate" },
      { value: "6.2%", label: "Conversion Rate (Visits to Leads)" }
    ],
    process: [
      {
        phase: "01 Discover",
        type: "Divergent",
        summary: "Competitive benchmarking and luxury demographic analysis.",
        details: "Analyzed top luxury fitness websites globally (Equinox, Third Space, Remedy). Conducted interviews with 8 high-net-worth gym members to identify key conversion motivators (exclusivity, facility hygiene, trainer caliber, and community atmosphere)."
      },
      {
        phase: "02 Define",
        type: "Convergent",
        summary: "Establishing brand aesthetic guidelines and flow objectives.",
        details: "Synthesized insights into a brand brief: Sanctum is not a workout station; it is a wellness sanctuary. Defined the key site metric as booking a 'Guided Private Sanctuary Experience'. Designed a clean, distraction-free tour booking path."
      },
      {
        phase: "03 Develop",
        type: "Divergent",
        summary: "Designing visual layouts and editorial typography grids.",
        details: "Explored visual themes utilizing dark modes, gold/champagne accents, and asymmetric photo grids. Designed custom layouts emphasizing large, elegant typography alongside immersive video backgrounds showing the facilities."
      },
      {
        phase: "04 Deliver",
        type: "Convergent",
        summary: "Implementing in Wix Studio and optimizing performance.",
        details: "Coded and built the final layouts in Wix Studio. Configured responsive breakpoints, optimized media assets to prevent layout shifting, and implemented interactive calendars. Conducted speed audits to keep load times under 1.8 seconds."
      }
    ],
    takeaways: [
      "Luxury websites must lead with visual story-telling. Emphasizing atmosphere over spec lists builds stronger emotional desire.",
      "A simple, low-friction booking form is vastly superior to sending users to third-party scheduling software."
    ]
  },
  {
    id: "influencer-agency",
    title: "Influencer Slate",
    tagline: "High-Conversion Web Presence for an Influencer Marketing Agency",
    category: "High-Conversion Landing Page",
    role: "Lead Frontend/UI Designer",
    timeline: "1 Month (2025)",
    tools: ["Framer", "Figma", "CSS Grid", "Spline 3D"],
    objective: "Design and develop a high-conversion landing page for Influencer Slate to convert brand marketers looking for creator partnerships.",
    problem: "The agency lacked a modern digital showcase. Brand managers visiting the site found it hard to navigate case studies and estimate campaign ROI, resulting in lost client opportunities.",
    solution: "A bold, graphic-heavy landing page built on Framer. Features include structured metric cards, dynamic case study popovers, and an interactive pricing calculator to generate instant campaign quotes.",
    metrics: [
      { value: "+85%", label: "Inbound Agency Briefs" },
      { value: "4.8m", label: "Impressions on Shared Case Studies" },
      { value: "72%", label: "Increase in Calculator Engagement" }
    ],
    process: [
      {
        phase: "01 Discover",
        type: "Divergent",
        summary: "Analyzing brand marketer needs and ROI metrics.",
        details: "Interviewed 5 marketing directors to understand what metrics they scan when vetting agencies (creator roster size, average engagement, previous brand case studies). Collected historical campaign data to feed into an estimation model."
      },
      {
        phase: "02 Define",
        type: "Convergent",
        summary: "Mapping the path to action (instant quote submission).",
        details: "Determined that providing transparent case study outcomes and allowing users to estimate campaign cost instantly would drastically increase lead qualification. Focused design flow on a CTA leading directly to a 'Get Campaign Quote' slider."
      },
      {
        phase: "03 Develop",
        type: "Divergent",
        summary: "Creating bold visual styles and interactive layout options.",
        details: "Designed high-contrast, graphic layout options with bold cards. Built mockups for a live campaign budget calculator widget. Refined 3D asset integration ideas to add a sense of digital maturity."
      },
      {
        phase: "04 Deliver",
        type: "Convergent",
        summary: "Shipping on Framer and fine-tuning micro-interactions.",
        details: "Built the page inside Framer. Configured high-fidelity micro-interactions for the calculator slider, created smooth scroll transitions, and set up Webflow/Framer forms. Conducted cross-browser compatibility testing."
      }
    ],
    takeaways: [
      "Providing immediate utility (such as a campaign calculator) drastically increases user engagement and lead conversion rate.",
      "Clear social proof linked to physical data (case studies) is the most effective vetting tool for brand managers."
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
