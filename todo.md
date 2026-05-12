# Zonke Website Build

## Context
- Design: `zonke_studio/DESIGN.md` (Industrial Brutalist Terminal)
- Business plan: `AI_Native_Studio_Full_Plan.md`
- Multi-page site: Home, Real Estate, Tenders, Pricing, Booking, Thanks
- Tech: Tailwind CDN, JetBrains Mono, canvas/ThreeJS assets, motion.dev, Supabase backend, serverless functions (Netlify/Render/OCI)

## Tasks

### Setup
- [x] Create project structure (folders, gitignore, package.json)
- [x] Set up Supabase schema (`supabase/schema.sql`)
- [x] Create shared lib: `lib/supabaseAdmin.js`, `lib/handleAudit.js`, `lib/handleBooking.js`
- [x] Create serverless functions (Netlify) & Express server for Render/OCI
- [x] Create deployment configs (netlify.toml, render.yaml, README)

### Pages
- [x] `index.html` — Home / vertical selector
- [x] `real-estate.html` — Lead Reactor funnel
- [x] `tenders.html` — Tender Vault funnel
- [x] `pricing.html` — Full pricing table
- [ ] `booking.html` (optional — forms on vertical pages)
- [ ] `audit-thanks.html` (optional — inline success)

### Components & Assets
- [x] Sidebar navigation (reusable HTML snippet)
- [x] Buttons / cards / form styles (Tailwind classes)
- [x] Canvas particle network (`assets/js/particles.js`)
- [x] Scroll animations with motion.dev
- [ ] GA4 integration snippet (add manually later)

### Final Checks
- [~] Verify responsive design (mobile breakpoints)
- [ ] Test form submissions (deploy to Netlify/Render)
- [x] Ensure no private keys in client
- [x] All pages linked correctly

### Recent Fixes
- [x] Fixed `real-estate.html` class typo (`neo-brutalist-button-alt`)
- [x] Hardened animation fallback on `index.html`, `real-estate.html`, `tenders.html`, `pricing.html` (content visible even if Motion/CDN fails)
- [x] Rendered mobile HyperFrames MP4s:
  - `zonke-videos-mobile/brand-reel-mobile.mp4`
  - `zonke-videos-mobile-lead/lead-reactor-mobile.mp4`
  - `zonke-videos-mobile-tender/tender-vault-mobile.mp4`
