# Logo Revamp & Watermark Animation — Observations & Enhancement Notes

**Plan Identifier:** `logo-revamp-and-watermark-animation-master-plan`  
**Execution Date:** August 4, 2026  

---

## Observations Recorded During Execution

1. **SVG Vector Precision:**
   - *Observation:* Removing the legacy `<rect fill="black"/>` background block and refactoring line 2's `d="..."` path in `public/Kinstel_logo-G Font.svg` allowed true vector transparency.
   - *Result:* Zero clashing white paths or black box artifacts on both dark and light backgrounds.

2. **Circular Solid BG Standard for Schema & PWA Icons:**
   - *Observation:* Replacing square background icons with `K arrow 400x400px BG=Black&Circle.webp` and generating `apple-touch-icon.png`, `android-chrome-192x192.png`, and `android-chrome-512x512.png` ensures Google Knowledge Graph and mobile PWA icons display with clean circular badges.

3. **Subtle Background Watermark Ambience:**
   - *Observation:* Oversized `KLogoWatermark` at `0.035` opacity in the hero and footer backdrops adds depth and high-end agency aesthetics without distracting from primary CTAs.

---
*Observations file recorded during Logo Master Plan execution.*
