# Zonke Roadmap

## Done

### Core
- [x] Multi-page site (Home, Real Estate, Tenders, Pricing)
- [x] 13 lead magnet tools with email gate
- [x] Supabase backend (audit, booking, tool submissions)
- [x] Resend email delivery
- [x] Tools landing page (`/tools`)
- [x] Audit success page (`/audit-thanks`)
- [x] Shared Tailwind config
- [x] Shared toolkit utilities

### Refactor
- [x] Extract tailwind.config to shared file
- [x] Reorganize server.js routes
- [x] Standardize ZAR formatting (toolFormatZAR)
- [x] Standardize restart UX across all tools
- [x] Decompose commission-forecaster into SRP functions
- [x] Animate counters in compliance-radar + deadline-drift-calculator
- [x] Convert inline hex colors to design token classes
- [x] Dynamic email gate text per tool

## In Progress

### Deploy
- [ ] Netlify deployment (preferred)
- [ ] Render deployment (fallback)
- [ ] E2E form testing on deployed environment
- [ ] Mobile responsive verification (320px, 768px, 1024px)

## Up Next

### Conversion
- [ ] WhatsApp click-to-chat button (per funnel spec)
  - Real Estate: link on hero + post-audit CTA
  - Tenders: link on hero + post-audit CTA
  - Format: `https://wa.me/<number>?text=<encoded message>`
  - Use brand green (#c3f400) circle button, bottom-right fixed position

### Polish
- [ ] Glitch/flicker hover effects on buttons (per DESIGN.md)
  - Primary buttons: horizontal "slice" or color-shift glitch on hover
  - Secondary buttons: border flicker
  - CSS animation, no JS dependency

### Analytics (post-launch)
- [ ] GA4 integration
  - Add gtag.js snippet to all pages
  - Track: page views, tool starts, email gate submissions, booking form submits
  - WhatsApp click tracking
  - Measurement ID from user when ready

## Backlog

- [ ] booking.html dedicated page (forms currently on vertical pages)
- [ ] SVG icons replace material-symbols-outlined (performance)
- [ ] Lazy loading for tool JS
- [ ] PWA manifest + service worker
