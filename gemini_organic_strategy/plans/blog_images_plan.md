# Plan: Blog Visual Assets & Screenshot Proof Integration

Plan for organizing, redacting, optimizing, and embedding real client proof screenshots (Google Ads dashboards, PageSpeed 100/100 scores, GA4 AEO traffic, and live portfolio UIs) across all blog posts and site components.

## Target Goals
1. Process 24 raw screenshots from `raw-contents/temp-images-to-choose-from/`.
2. Redact sensitive customer IDs, personal emails, and staging domain names.
3. Crop browser URL bars, tab strips, and DevTools sidebars for clean presentation.
4. Convert images to optimized `.webp` format and save to `public/blog-assets/` and `public/portfolio-assets/`.
5. Update `BlogPost` interface and `posts` array in `src/lib/blog.ts` with `coverImage` properties.
6. Render responsive cover image banners in `src/app/blog/[slug]/page.tsx` and thumbnails in `src/app/blog/page.tsx`.
7. Configure dynamic OpenGraph (`og:image`) and Twitter Card image metadata per post.

---

## Tasks
- [x] Task 1: Organize local master PNGs in `raw-contents/temp-images-to-choose-from/`
- [x] Task 2: Process, redact, crop, and convert images to WebP
- [x] Task 3: Support manual user blurred edits for GSC screenshot
- [x] Task 4: Add `coverImage` to `src/lib/blog.ts`
- [x] Task 5: Update blog index and detail pages for image rendering
- [x] Task 6: Run `npm run build` verification
