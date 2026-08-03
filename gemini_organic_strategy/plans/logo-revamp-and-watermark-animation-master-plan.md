# Logo Revamp & Watermark Animation Master Plan

**Document Location:** `gemini_organic_strategy/plans/logo-revamp-and-watermark-animation-master-plan.md`  
**Status:** Deferred Plan (Execution Trigger: User says `gologo`)  

---

## Executive Overview

This plan establishes the design engineering roadmap for integrating the Kinstel K-arrow logo mark and full vector logo (`public/Kinstel_logo-G Font.svg`) across the website, PDF generators, structured data schemas, favicons, studio tools, and background animations.

Key Directive Rules:
1. **SVG Standard:** Use `public/Kinstel_logo-G Font.svg` for full brand headers/PDFs and `public/K-Logo.svg` for icon marks, modals, buttons, and watermarks.
2. **Circular Solid BG Rule:** Square solid background logos are eliminated. Wherever a solid background is required (Schema.org JSON-LD, PWA app icons, profile avatars), strictly use **circular container** variants (`public/logos/K arrow 400x400px BG=Black&Circle.webp` and derived sizes).

---

## 📋 Comprehensive Task List

### Task 1: Full Logo (`Kinstel_logo-G Font.svg`) & Icon Mark (`K-Logo.svg`) Integration
- **PDF Invoice & Proposal Generators (`src/components/studio/`):**
  - Embed vector `public/Kinstel_logo-G Font.svg` in top-left header of exported client PDF invoices and proposals.
- **Lead Capture & Audit Modal Headers (`src/components/ui/website-audit-modal.tsx`):**
  - Display full vector logo header badge at top of lead capture modals.
- **Studio Dashboard (`src/app/studio/page.tsx`):**
  - Embed full vector logo mark beside Studio operations title banner.
- **Contact Page Office Card (`src/app/contact/page.tsx`):**
  - Render full vector logo directly above Lucknow office address & direct call links.
- **Payment Success Receipt (`src/app/pay/success/page.tsx`):**
  - Render full vector logo in checkout receipt confirmation card.

---

### Task 2: Circular Solid Background Standard (`BG=Black&Circle.webp`)
- **Schema.org JSON-LD (`src/app/layout.tsx` & `src/lib/schema.ts`):**
  - Replace `K arrow 500x500px BG=Black.webp` (square) with `https://www.kinstel.com/logos/K%20arrow%20400x400px%20BG=Black&Circle.webp` (circular container).
- **PWA & iOS Touch Icons (`public/`):**
  - Using `sharp`, generate circular container icon variants:
    - `public/apple-touch-icon.png` (180x180 circular black badge)
    - `public/android-chrome-192x192.png` (192x192 circular black badge)
    - `public/android-chrome-512x512.png` (512x512 circular black badge)
- **External Directory Profiles & Social Avatars:**
  - Standardize `K arrow 400x400px BG=Black&Circle.webp` across Google Business Profile, Clutch, LinkedIn, X, Justdial, GoodFirms, TechBehemoths, and DesignRush.

---

### Task 3: Watermark & Laser Animation Implementation
- **Task A — Oversized Hero Ambient Background Watermark (`<KLogoWatermark />`):**
  - Build `src/components/ui/k-logo-watermark.tsx` rendering an oversized `public/K-Logo.svg` (opacity `0.03`–`0.05`) in the top-right hero backdrop.
- **Task B — Footer Signature Watermark:**
  - Embed oversized `public/K-Logo.svg` watermark clipped at the bottom-right corner of `<Footer />` at `0.04` opacity.
- **Task C — Animated SVG Laser-Stroke Component (`<AnimatedKLogo />`):**
  - Build Framer Motion scroll-triggered component (`motion.path` with `pathLength: 0 → 1`) where `public/K-Logo.svg` draws itself with gold laser light upon scroll entry.
- **Task D — Interactive Ambient Glow Beacon:**
  - Add interactive gold pulse aura (`animate-pulse`) around `public/K-Logo.svg` on interactive lead tools.
- **Task E — K Logo Bullet Mark Glyphs:**
  - Replace standard bullet checkmarks in service grids with a micro 16px/20px `public/K-Logo.svg` glyph.

---

## 🔒 Usage & Asset Matrix

| Surface | Target Asset | Container Format |
|---|---|---|
| **Header Navigation & Footer** | `public/Kinstel_logo-G Font.svg` | No-BG (Transparent Vector) |
| **Exported PDF Invoices & Proposals** | `public/Kinstel_logo-G Font.svg` | Vector PDF Header |
| **Audit & Lead Modal Headers** | `public/Kinstel_logo-G Font.svg` | No-BG (Transparent Vector) |
| **Hero & Footer Watermarks** | `public/K-Logo.svg` | No-BG (Transparent `0.03` opacity) |
| **Scroll Laser Animations** | `public/K-Logo.svg` | No-BG (Motion SVG) |
| **Schema.org JSON-LD Logo** | `K arrow 400x400px BG=Black&Circle.webp` | **Circular Black Container** |
| **iOS Apple Touch Icon (180x180)** | `apple-touch-icon.png` | **Circular Black Container** |
| **Android PWA Icons (192 & 512)** | `android-chrome-512x512.png` | **Circular Black Container** |
| **Directory Profile Avatars** | `K arrow 400x400px BG=Black&Circle.webp` | **Circular Black Container** |

---
*Master plan updated in `gemini_organic_strategy/plans/logo-revamp-and-watermark-animation-master-plan.md`. Execution activates when user says `gologo`.*
