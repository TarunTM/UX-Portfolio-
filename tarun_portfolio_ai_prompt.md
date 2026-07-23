# AI Agent Vibe-Coding Prompt: Portfolio Generation

**System Role:** You are an elite Frontend Developer and UX Engineer specializing in modern web frameworks (React, Next.js, Framer Motion) and minimalist, high-conversion design systems. 

**Objective:** Build a 5-page UI/UX Portfolio (1 Landing Page + 4 Case Study Pages) based on the "Athos" Framer template architecture. The site must exude a premium, typography-driven, and minimalist aesthetic. 

## 1. Global Design System & Vibe
* **Typography:** Sans-serif, highly legible (e.g., Inter, Geist, or SF Pro). Large, bold headings with tight tracking for hero sections. Muted secondary text.
* **Color Palette:** Monochromatic or dark mode default (Deep charcoal/black backgrounds, off-white text, subtle gray borders, and one muted accent color for active states/CTAs).
* **Animations:** Smooth, scroll-triggered fade-ups (Framer Motion). Subtle scale transforms on project card hovers. 
* **Layout:** CSS Grid-heavy, generous whitespace (padding/margins), and responsive structural integrity across mobile, tablet, and desktop.

## 2. Content & Architecture

### A. Landing Page (`/`)
**1. Hero Section:**
* **Headline:** "Tarun Madan — UI/UX & Product Designer"
* **Subheadline:** Highlight the unique perspective of bringing a strategic business background into product design and digital experiences.
* **CTAs:** "View Work" (Primary), "Contact" (Secondary).

**2. Selected Work (Grid Layout):**
Create reusable, componentized project cards displaying the title, category, and 2-3 key metrics/outcomes. Connect these to their respective case study pages.
* **Project 1:** Quantel AI (Web & Mobile Application). Focus: User journey and account creation flow for investment services.
* **Project 2:** Sanctum (Luxury Gym Redesign). Focus: UX/UI overhaul and lead generation.
* **Project 3:** Influencer Marketing Agency. Focus: High-conversion landing page design.
* **Project 4:** Strength Training App UX Research. Focus: Competitive analysis and user experience benchmarking across leading fitness platforms (Strong, JEFIT, Hevy).

**3. Process Section (The Double Diamond - Strict Adherence):**
Implement a 4-column or 2x2 grid explaining the design process accurately:
* **01 Discover:** Divergent thinking—researching and understanding the user's core problem and context.
* **02 Define:** Convergent thinking—synthesizing research to clearly articulate and define the specific problem to be solved.
* **03 Develop:** Divergent thinking—ideating, brainstorming, and designing multiple potential solutions.
* **04 Deliver:** Convergent thinking—prototyping, testing, refining, and shipping the final implementation.

**4. Skills & Experience:**
* **Skills (Pill Tags):** UX Research, UI Design, Prototyping, Wireframing, Web Design, Mobile App Design.
* **Experience List:** Feature recent roles, notably including UI/UX Intern at The Social Slate.

**5. Footer:** Minimalist links, social handles, and a clean contact CTA.

### B. Case Study Template (`/case-study/[id]`)
Generate a dynamic layout that can be reused for all 4 projects.
* **Hero:** Full-width project cover image/mockup area, Project Title, Role, Timeline, and Core Objective.
* **Overview Grid:** The Problem vs. The Solution.
* **Process Breakdown:** Sections for wireframes, design system, and final high-fidelity screens.
* **Results/Impact:** Bold typography highlighting key metrics.
* **Footer Navigation:** "Next Project" link.

## 3. Technical Constraints & Instructions
* Use standard, semantic HTML5 structure.
* Ensure all components (Buttons, ProjectCards, ProcessSteps) are modular and accept props.
* Implement clean routing between the home page and the 4 case studies.
* Initialize the project with accessible ARIA labels and optimized image placeholders.
