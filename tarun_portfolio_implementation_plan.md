# Implementation Plan: Vibe-Coding Your Portfolio

This document outlines the step-by-step strategy for guiding your AI coding agent (Google Antigravity, Cursor, or similar) to build your portfolio based on the provided prompt.

## Phase 1: Environment & Scaffold Setup
1.  **Initialize Project:** Direct the AI to spin up a new project using your preferred stack (e.g., Next.js with Tailwind CSS and Framer Motion).
2.  **Apply Design Tokens:** Feed the AI your color variables (backgrounds, text, accents) and typography settings in the global CSS file. 
3.  **Routing Structure:** Instruct the AI to create the file tree:
    * `app/page.tsx` (Landing Page)
    * `app/work/quantel-ai/page.tsx`
    * `app/work/sanctum/page.tsx`
    * `app/work/influencer-agency/page.tsx`
    * `app/work/strength-training-research/page.tsx`

## Phase 2: Building Core Components
Before building the full pages, have the AI generate reusable UI blocks:
1.  **Navigation Bar:** Sticky header with logo and links.
2.  **Project Card Component:** Needs image placeholder, title, tags, and a hover animation (slight scale up and shadow).
3.  **Process Card Component:** A neat card or list item for the 4 Double Diamond stages.
4.  **Skill Pill Component:** Rounded inline tags for the Skills section.

## Phase 3: Landing Page Assembly
Paste the AI Prompt (from the other document) and instruct the agent to assemble the homepage.
* **Checkpoint 1:** Review the Hero section. Ensure the copy reflecting your business-to-design background sounds natural and impactful.
* **Checkpoint 2:** Verify the Process Section. **Crucial:** Make sure the AI correctly distinguishes the divergent and convergent natures of the Discover, Define, Develop, and Deliver phases as specified.
* **Checkpoint 3:** Review the Experience section to ensure your tenure at The Social Slate is formatted cleanly.

## Phase 4: Case Study Template Development
1.  Prompt the AI to build a generic `CaseStudyLayout` wrapper component.
2.  **Sections to include:**
    * Project Header (Title, Role, Tools).
    * Context / Problem Statement.
    * Research / Ideation visuals (placeholder grid).
    * Final Solution visuals (large placeholder area).
    * Takeaways / Metrics.
3.  Test responsiveness: Ensure the text remains readable and image placeholders scale correctly on mobile devices.

## Phase 5: Content Integration
Feed the specific details for your 4 projects into the case study pages one by one:
* **Quantel AI:** Focus on the structural flow, mapping out the user journey and account creation screens.
* **Sanctum:** Emphasize the luxury aesthetic, Wix Studio implementation, and lead generation goals.
* **Influencer Agency:** Focus on the Framer build process and visual hierarchy for high conversion.
* **Strength Training App:** Highlight the UX competitor research methodologies used to analyze Strong, JEFIT, and Hevy.

## Phase 6: Polish & Animations
1.  **Micro-interactions:** Ask the AI to add Framer Motion (or equivalent) properties to fade in sections as they scroll into view (`whileInView={{ opacity: 1, y: 0 }}`).
2.  **Audit:** Do a final walkthrough. Check contrast ratios, ensure button hit areas are large enough for mobile, and verify that all case study links route correctly.
