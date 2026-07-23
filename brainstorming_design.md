# Brainstorming Design Documentation: Tarun Madan Portfolio

This document captures the finalized design architecture, visual language, and technical decisions made during the collaborative planning session.

## 1. Understanding Summary
* **Goal:** A premium 5-page UI/UX Portfolio website featuring 1 landing page and 4 dedicated case study pages (Quantel AI, Sanctum, Influencer Agency, Strength App UX).
* **Objective:** Showcase Tarun Madan's design work and unique business background to recruiters and prospective clients.
* **Target Audience:** Tech recruiters, product design hiring managers, and design clients.
* **Non-Goals:** Dynamic database, user login/accounts, dynamic CMS (will build as static components), complex contact forms requiring server storage.

## 2. Technical Stack
* **Build Tool:** Vite
* **Library:** React (TypeScript)
* **Styling:** Tailwind CSS (fully customized theme)
* **Animations:** Framer Motion (page transitions and interactive grids)

## 3. Visual & Design System
* **Aesthetic Tone:** Interactive Bento Grid - structured, clean, tactile, and editorial.
* **Color Palette (Monochromatic Pure + 1% Blue):**
  * Background: Pitch Black (`#09090B` / `#000000`)
  * Surfaces/Cards: Zinc Dark Grey (`#18181B` / `#121212`)
  * Text/Primary: Off-White (`#FAFAFA`)
  * Muted Text: Soft Gray (`#71717A`)
  * Accent/CTA (1%): Electric Blue (`#3B82F6`) — used exclusively for focus points, active badges, navigation arrows, and key statistics.
  * Borders: Subtle charcoal lines (`#27272A`)
* **Typography:**
  * Headings: **Clash Display** (imported via CDN/Google Fonts)
  * Body: **Satoshi** (clean geometric sans-serif)

## 4. Key Components & Interactions
1. **Floating Bottom Navbar:** Center-anchored floating pill navbar (`fixed bottom-6 left-1/2 -translate-x-1/2`) with a blurred background.
2. **Tactile Bento Cards:** Hover lifts the card (`y: -4`) using Framer Motion and highlights the border to blue (`#3B82F6`).
3. **Double Diamond Process Section:** Fully interactive 4-phase card system matching Discover, Define, Develop, and Deliver, allowing users to toggle and view divergent/convergent notes.
4. **Responsive Layout:**
  * Desktop (1024px+): 4-column layout
  * Tablet (768px-1023px): 2-column layout
  * Mobile (<768px): 1-column stacked list

## 5. Decision Log
* **Decision 1: Tech Stack Choice**
  * *Option Chosen:* Vite + React + Tailwind CSS + Framer Motion.
  * *Alternatives Considered:* Next.js (App Router).
  * *Why:* Vite React provides a lightweight build configuration with maximum speed and zero server overhead for static deployment.
* **Decision 2: Typography Selection**
  * *Option Chosen:* Clash Display (Headings) + Satoshi (Body).
  * *Alternatives Considered:* Outfit & Plus Jakarta Sans, Geist Sans & Geist Mono, Inter.
  * *Why:* Clash Display offers a bold, editorial, premium agency feel, while Satoshi provides exceptional readability without feeling generic.
* **Decision 3: Color Tone**
  * *Option Chosen:* Monochromatic Pure + 1% Blue (`#3B82F6`).
  * *Alternatives Considered:* Warm Charcoal & Gold, Cold Steel & Teal, pure monochrome.
  * *Why:* Highlight active focus states and metrics without diluting the ultra-minimalist, high-end portfolio aesthetic.
* **Decision 4: Layout Pattern**
  * *Option Chosen:* Interactive Bento Grid.
  * *Alternatives Considered:* Minimalist Editorial Grid, Scroll-Narrative Showcase.
  * *Why:* Bento grids are structured, highly visual, responsive, and provide a premium "dashboard-like" overview of the designer's skills and projects.

## 6. Assumptions & Risk Management
* **Performance Risk:** Grid scaling issues on extremely small mobile screens.
  * *Mitigation:* Explicit flex-stacking for viewports `< 640px` and defining clear column spans (`col-span-1 md:col-span-2 lg:col-span-3`).
* **Asset Readiness:** Placeholders look generic.
  * *Mitigation:* Design custom SVG device frames (browser mockups, mobile skins) directly inline with Tailwind styling to display each project elegantly.
