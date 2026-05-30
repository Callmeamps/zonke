# HTML-Based Ad Images & Posters Plan
**Early-Bird Validation Material for Instagram, WhatsApp, TikTok, Facebook**

---

## 1. Strategic Overview

### Why HTML-Based Ads?
- **Perfect brand consistency**: The Industrial Brutalist Terminal design translates beautifully to HTML/CSS with Tailwind
- **Rapid iteration**: Change copy, colors, or layouts instantly without redesigning in Figma/Photoshop
- **Scalable production**: Generate multiple variants programmatically
- **Export quality**: Render at any resolution using headless browser screenshots
- **Interactive potential**: Can include subtle animations for high-engagement platforms
- **Dev-friendly**: Engineers can produce marketing assets without design tools

### Mission
Create high-impact, platform-optimized ad creatives that:
- Stop the scroll with aggressive visual contrast
- Communicate "AI-Native or Left Behind" urgency
- Drive early-bird signups for Zonke's AI command center
- Validate messaging and creative direction quickly

---

## 2. Platform Specifications

| Platform | Recommended Sizes | Format | Notes |
|----------|-------------------|--------|-------|
| **Instagram Feed** | 1080×1080 (1:1) <br> 1080×1350 (4:5) | JPG/PNG | Square for main feed, vertical for Stories/Reels cross-post |
| **Instagram Stories** | 1080×1920 (9:16) | JPG/PNG | Full-screen immersive, 5-7 second view time |
| **WhatsApp Status** | 1080×1920 (9:16) | JPG/PNG | Similar to Stories, less text (people zoom) |
| **TikTok** | 1080×1920 (9:16) | JPG/PNG | Vertical video ads, but static image for in-feed |
| **Facebook Feed** | 1200×630 (1.91:1) <br> 1080×1080 (1:1) | JPG/PNG | Landscape for desktop, square for mobile |
| **Facebook Stories** | 1080×1920 (9:16) | JPG/PNG | Same as Instagram Stories |
| **LinkedIn** | 1200×627 (1.91:1) | JPG/PNG | Professional audience, slightly more formal is okay |

**Export recommendations:**
- Render HTML at 2x resolution for retina displays
- Compress to JPG quality 85% for faster loading
- Filename convention: `platform_size_variant_date.jpg`

---

## 3. Content Strategy

### Brand Voice Reminders (from Brand_Voice.md)
- **Zero Cognitive Load**: Drop articles, hard headlines, no questions that don't challenge
- **Urgency**: "AI-Native or Left Behind"
- **Call to Action**: Interactive magnets (tools, not PDFs)
- **Tone**: Aggressive, technical, premium

### Vertical-Specific Angles
**Real Estate (Speed to Lead)**
- Headline: YOUR COMPETITOR REPLIES FASTER
- CTA: LEAD LEAK AUDIT → (Interactive tool)
- Promise: "Viewings booked while you sleep"

**Tenders (Precision & Visibility)**
- Headline: MISSED TENDER = MISSED MONEY
- CTA: TENDER MISS CHECKER → (Interactive tool)
- Promise: "No deadline drift. Clean submissions."

### Early-Bird Offer Framing
- "FIRST 10 AGENCIES: AI READINESS SPRINT [50% OFF]"
- "BETA ACCESS: Install AI Command Center Before [DATE]"
- "EARLY ADOPTER BONUS: Free Integration Audit"
- "LIMITED SPOTS: 3-Month Free Trial for Early Signups"

---

## 4. Design Templates

All templates use the exact design system from `DESIGN.md`:
- **Colors**: `#121414` bg, `#CCFF00` primary lime, `#FF4C00` secondary orange, `#FFFFFF` text
- **Fonts**: JetBrains Mono (all text), Inter (headlines optional)
- **Borders**: 2px solid, 0px radius
- **Scanlines**: Global 1px horizontal lines, 3% opacity
- **Grid**: Fixed 12-column, visible 1px borders

### Template A: The "System Override" Announcement
**Best for**: Instagram Feed, Facebook Feed, LinkedIn (1200×627)

**Layout**:
- Split screen: Left 60% deep black with large all-caps headline in Lime Green
- Right 40%: "Sticker" overlaying the grid with an abstract geometric visualization
- Top row: `[ SYS.OVERRIDE ]  EARLY_BIRD_MODE_ACTIVE  [ BETA ]`
- Bottom: CTA button "INITIATE SEQUENCE" with glitch hover effect
- Footer: "AI NATIVE OR LEFT BEHIND" in mono 12px

**Visual Elements**:
- Use skewed rectangles in lime/orange to imply machine parts
- Show "data flow" with connecting lines
- QR code integrated as a "terminal output" block

**Copy Examples**:
- REAL ESTATE: `> MANUAL_LEAD_RESPONSE: 4.2 HOURS <br> > AI_NATIVE: 0.4 SECONDS <br> > YOUR_STATUS: <span style="color:#FF4C00">VULNERABLE</span>`
- TENDERS: `> TENDER_DATABASE_SCAN... <br> > 3 DEADLINES_DRIFTED DETECTED <br> > RECOMMENDATION: <span style="color:#CCFF00">UPGRADE_TO_ZONKE</span>`

---

### Template B: The "Terminal Output" Countdown
**Best for**: Instagram Stories, TikTok, WhatsApp Status (1080×1920)

**Layout**:
- Full-screen "terminal" window
- Top: Green prompt `zonke@studio:~$` with blinking cursor
- Center: Large monospace countdown timer (e.g., `72:14:33:09`)
- Below timer: Two-line message in white:
  ```
  EARLY-BIRD WINDOW CLOSES IN
  [ INITIATE AI READINESS SPRINT ]
  ```
- Bottom: QR code with `[ SCAN_TO_SECURE_SPOT ]` label above
- Border: 2px lime green, corners cut at 45°

**Visual Elements**:
- Scanlines strong (5% opacity)
- Random "data" lines in dim grey: `#Reading memory... #Process 87% #Decrypting...`
- Bulletins: Yellow `[!]` or Orange `[WARNING]` in corners

---

### Template C: The "Geometric Sticker" Feature Card
**Best for**: Instagram Feed (1080×1080), Facebook Feed

**Layout**:
- Background: Deep black with faint grid lines (1px #333333)
- Center: Large rotated sticker (15°) with solid lime border (4px) containing:
  - **Headline**: ALL CAPS, Inter 900, 60px, tracked -0.02em
  - **Subhead**: Monospace, 18px, regular, white
- Behind sticker: Three overlapping geometric shapes (orange, white, lime) at 0% opacity borders
- Top-left: `[ PROTOCOL: LEAD_CAPTURE ]` in monospace yellow
- Bottom-right: `VERIFY_STATUS → zonke.ai/verify` in monospace

**Examples**:
1. **Real Estate**: Sticker says `SPEED TO LEAD` <br> Sub: `Your competitor is already 10x faster. Audit your response time.`
2. **Tenders**: Sticker says `DEADLINE DRIFT` <br> Sub: `3 submissions missed last quarter. Find your blind spots.`

---

### Template D: The "Binary Choice" Comparison
**Best for**: Instagram Feed (1080×1350 vertical), Facebook Feed

**Layout**:
- Split vertically down middle (1px white line)
- **Left side (40%)**: DARKER (#0c0f0f), label `[ MANUAL ]` top, icon of 📠 or 📝
- **Right side (60%)**: Lime tint (#1a260d), label `[ ZONKE ]` top, icon of ⚡ or 🤖
- Each side lists 3-4 comparison points using monospace
- Bottom: CTA button spanning both sides `BRIDGE THE GAP →`

**Comparison points (Real Estate)**:
- Left: `Lead response: 4+ hours` <br> `After-hours: OFFLINE` <br> `Lead tracking: Spreadsheet` <br> `Competitor intel: None`
- Right: `Lead response: <1 sec` <br> `After-hours: 24/7 AI` <br> `Lead tracking: Real-time dashboard` <br> `Competitor intel: Automated`

**Visual**:
- Use "sticker" effect: a torn paper look (jagged edge) along the split line
- Orange warning triangles on left side

---

### Template E: The "System Diagnostic" Social Proof
**Best for**: Stories format, carousel first card (1080×1920)

**Layout**:
- Top: `SYSTEM DIAGNOSTIC REPORT` in monospace lime
- Below: Three "metrics" cards in grid (2x2)
  ```
  [ METRIC: RESPONSE_TIME ]
  BEFORE: 4.2h   AFTER: 0.4s
  STATUS: <span style="color:#CCFF00">OPTIMIZED</span>

  [ METRIC: LEAD_CAPTURE ]
  BEFORE: 62%   AFTER: 98%
  STATUS: <span style="color:#CCFF00">EFFICIENT</span>

  [ METRIC: COMPETITOR_GAP ]
  BEFORE: -3.1hrs   AFTER: +2.4hrs
  STATUS: <span style="color:#FF4C00">DOMINANT</span>
  ```
- Bottom: "Full report available for early adopters" + QR + CTA `GENERATE_YOUR_REPORT`

**Visual**:
- Each metric card has 1px border, lime on left side
- Scanlines heavy
- "Terminal cursor" blinking at bottom

---

### Template F: The "Loader" Teaser
**Best for**: Stories, pre-launch posts (any format)

**Layout**:
- Centered large "loading" animation using block characters
  ```
  [██████████▒▒▒▒▒▒] 75%
  ```
- Above: `INITIALIZING ZONKE PROTOCOL...`
- Below: `EARLY_BIRD_SEQUENCE_STARTS: [DATE]`
- Subtext (small): `AI-NATIVE AGENCIES ONLY. MANUAL SYSTEMS WILL BE DEPRECATED.`

**Color scheme**: Dark bg, white primary text, lime progress bar

**Platform tweak**: On 9:16, move text inside the "progress bar" container.

---

## 5. Technical Implementation

### Tech Stack
- **HTML5** + Tailwind CSS (CDN)
- **Custom Tailwind config** matching `DESIGN.md` colors and spacing exactly
- **JetBrains Mono** via Google Fonts
- **Optional**: GSAP for subtle glitch animations in Stories/Reels

### Sample HTML Structure
```html
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Zonke - Ad Creative</title>
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            surface: '#121414',
            primary: '#CCFF00',
            secondary: '#FF4C00',
            // ... all from DESIGN.md
          },
          fontFamily: {
            mono: ['JetBrains Mono', 'monospace'],
          },
          spacing: {
            xs: '4px',
            sm: '8px',
            md: '16px',
            lg: '32px',
            xl: '64px',
          },
          borderRadius: {
            DEFAULT: '0px',
          }
        }
      }
    }
  </script>
  <style>
    /* Scanlines overlay */
    .scanlines::before {
      content: " ";
      display: block;
      position: absolute;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%),
                  linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
      background-size: 100% 2px, 3px 100%;
      pointer-events: none;
      z-index: 10;
    }
    /* Sticker effect */
    .sticker {
      border: 3px solid #000;
      box-shadow: 8px 8px 0 0 rgba(0,0,0,0.8);
    }
    /* Glitch animation */
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-2px, 2px); }
      40% { transform: translate(-2px, -2px); }
      60% { transform: translate(2px, 2px); }
      80% { transform: translate(2px, -2px); }
      100% { transform: translate(0); }
    }
    .glitch:hover { animation: glitch 0.2s linear infinite; }
    /* Blinking cursor */
    @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
    .cursor-blink { animation: blink 1s step-end infinite; }
  </style>
</head>
<body class="bg-surface text-on-surface font-mono overflow-hidden relative scanlines">
  <!-- Content here -->
</body>
</html>
```

### Image Rendering Workflow
1. **Local Development**: Open HTML in Chrome, screenshot at required dimensions
2. **Automated Approach**: Use Puppeteer or Playwright for batch rendering:
   ```bash
   npx playwright screenshot --width 1080 --height 1920 ad-story.html output.png
   ```
3. **Headless Chrome CLI** (already installed):
   ```bash
   # Install if needed: npm install -g chrome-remote-interface
   # Or use wkhtmltoimage
   wkhtmltoimage --width 1080 --height 1920 ad.html ad.png
   ```
4. **Quick Manual**: Use Chrome DevTools device toolbar to set exact viewport, then screenshot

**Recommended Tool**: `puppeteer-cluster` for mass rendering of variants

### File Organization
```
zonke_studio/
├── ads/
│   ├── templates/          # Base HTML templates
│   │   ├── a-system-override.html
│   │   ├── b-terminal-countdown.html
│   │   ├── c-geometric-sticker.html
│   │   ├── d-binary-choice.html
│   │   ├── e-system-diagnostic.html
│   │   └── f-loader-teaser.html
│   ├── variants/          # Specific creatives with custom copy
│   │   ├── insta-feed-realestate-1.html
│   │   ├── insta-stories-tenders-1.html
│   │   └── ...
│   ├── build/             # Rendered images (gitignore)
│   │   ├── insta-feed/
│   │   ├── insta-stories/
│   │   ├── tiktok/
│   │   └── facebook/
│   └── render.js          # Script to batch render
├── DESIGN.md
├── index.html
└── HTML-ADS-PLAN.md (this file)
```

---

## 6. Production Plan

### Week 1: Foundation & Templates
- [ ] **Day 1-2**: Confirm Tailwind config matches DESIGN.md exactly. Create base HTML boilerplate with all utility classes defined. Set up rendering script.
- [ ] **Day 3-4**: Build Templates A-D (core ones)
- [ ] **Day 5**: Create variant copy for Real Estate and Tenders (4-6 variants each)
- [ ] **Day 6**: Render first batch, review quality
- [ ] **Day 7**: Iterate based on preview, finalize 3 winning variants per platform

### Week 2: Platform Optimization & Expansion
- [ ] Create Instagram Stories/Reels variants (9:16)
- [ ] Create Facebook/LinkedIn landscape variants
- [ ] Add Templae E & F for social proof and teaser campaigns
- [ ] Create carousel-ready set (3-4 cards telling story)
- [ ] Generate QR codes with branded styling (use `zonke.ai/earlybird` or platform-specific UTM links)

### Week 3: A/B Testing Prep
- [ ] Create 2-3 headline variants per template (test urgent vs. benefit-driven)
- [ ] Create color variants (test orange accents vs. pure lime)
- [ ] Prepare ad copy variations for each creative (for Facebook ad manager)
- [ ] Document src URLs and tracking parameters

### Week 4: Validation & Handoff
- [ ] Run small budget test campaigns ($20-50 per creative)
- [ ] Capture metrics: CTR, engagement rate, conversion to email signup
- [ ] Identify top 2-3 winners
- [ ] Document final creative specs for scaling
- [ ] Create .psd/.fig backup if needed for non-dev team members (but keep HTML as source of truth)

---

## 7. Creative Copy Bank

### Headlines (choose based on vertical)
- `MANUAL TEAMS WILL BE OBSOLETE`
- `YOUR COMPETITOR IS FASTER`
- `3 LEADS LOST. EVERY. DAY.`
- `AI NATIVE OR LEFT BEHIND`
- `DEADLINE DRIFT: DETECTED`
- `RESPONSE TIME GAP: 4.2 HOURS`
- `SYSTEM UPGRADE REQUIRED`
- `[ WARNING ] MANUAL MODE ACTIVE`

### Subheads
- `Zonke installs an AI command center into your business.`
- `Capture every lead. Track every bid. Leave competitors behind.`
- `Move from "outdated and manual" to "AI-native and dominant."`
- `Starting an AI Readiness Sprint is the right decision.`
- `No more after-hours dead zones.`

### CTAs (buttons)
- `INITIATE AI SPRINT`
- `RUN LEAD LEAK AUDIT`
- `CHECK TENDER HEALTH`
- `GENERATE DIAGNOSTIC`
- `SECURE BETA ACCESS`
- `UPGRADE NOW →`

---

## 8. Critical Success Factors

1. **Stay on-brand**: Never deviate from DESIGN.md - no rounded corners, no drop shadows, no soft colors
2. **High contrast**: All text must be legible on dark backgrounds. Use lime for primary, white for secondary
3. **Less is more**: Don't overcrowd. Industrial brutalist needs room to breathe
4. **Test readability on mobile**: Most social consumption is mobile - preview at actual size
5. **QR codes**: Keep them large enough (minimum 100×100px in final asset), with instruction text: `[ SCAN TO ... ]`

---

## 9. Early-Bird Specific Recommendations

### Offer Messaging
- Position as **"AI Readiness Sprint"** - a 2-week intensive audit + integration
- Price anchor: `$2,997` with early-bird: `$1,497` or "3-month free trial"
- Social proof: "First 10 agencies only" (creates scarcity)
- Guarantee: "If you don't capture 5+ leads in first 30 days, we refund 100%"

### Landing Page Alignment
- QR codes should point to dedicated landing page: `zonke.ai/earlybird-[realestate|tenders]`
- Landing page must maintain the same brutalist design - NO big disconnect
- Use exact same headers, fonts, border styles
- Keep form minimal: Name, Email, Company, "I'm interested in: [ ] Real Estate [ ] Tenders"

---

## 10. Metrics to Validate

During the 2-3 week validation period, track:

1. **Engagement Rate** (likes + comments + saves / impressions) - aim > 3%
2. **Click-Through Rate** to landing page - aim > 2%
3. **Conversion Rate** (email signup / clicks) - aim > 25%
4. **Cost per Lead** - keep under $50 for early validation
5. **Qualitative feedback**: Comments asking "How does this work?" indicate message clarity

**Decision criteria**:
- If CTR > 2% and conversion > 20%: double down on this creative direction
- If below threshold: test new headline variants, adjust imagery

---

## 11. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| **Too aggressive/scary** | Test one variant with softer approach (white primary text instead of lime) |
| **Low legibility on mobile** | Increase font sizes minimum 14px for body, 20px for headlines |
| **Brand mismatch** | Cross-check every pixel against DESIGN.md color codes |
| **Slow rendering** | Batch render overnight, optimize PNG compression |
| **QR code scanning fails** | Ensure high contrast (lime on black), minimum size 100px |

---

## 12. Next Steps (Immediate Actions)

1. **Set up project structure**:
   ```bash
   cd /home/callmeamps/Projects/zonke/zonke_studio
   mkdir -p ads/{templates,variants,build/{insta-feed,insta-stories,tiktok,facebook}}
   ```

2. **Create base template** (`ads/templates/base.html`) with full Tailwind config from DESIGN.md

3. **Build Template A** (`ads/templates/a-system-override.html`) - the flagship creative

4. **Write render script** (`ads/render.js`) using Puppeteer for batch image generation

5. **Draft first 4 creatives**: 2 for Real Estate, 2 for Tenders, mixing platforms

6. **Review with stakeholders** (if applicable) before production run

---

## Appendix: Tailwind Color Mapping

Copy these exact values into your Tailwind config:

```javascript
colors: {
  surface: '#121414',
  'surface-dim': '#121414',
  'surface-bright': '#37393a',
  'surface-container-lowest': '#0c0f0f',
  'surface-container-low': '#1a1c1c',
  'surface-container': '#1e2020',
  'surface-container-high': '#282a2b',
  'surface-container-highest': '#333535',
  'on-surface': '#e2e2e2',
  'on-surface-variant': '#c4c9ac',
  'inverse-surface': '#e2e2e2',
  'inverse-on-surface': '#2f3131',
  outline: '#8e9379',
  'outline-variant': '#444933',
  'surface-tint': '#abd600',
  primary: '#ffffff',
  'on-primary': '#283500',
  'primary-container': '#c3f400',
  'on-primary-container': '#556d00',
  'inverse-primary': '#506600',
  secondary: '#ffb59f',
  'on-secondary': '#5e1700',
  'secondary-container': '#ff571c',
  'on-secondary-container': '#531300',
  tertiary: '#ffffff',
  'on-tertiary': '#21323e',
  'tertiary-container': '#d2e5f5',
  'on-tertiary-container': '#556774',
  error: '#ffb4ab',
  'on-error': '#690005',
  'error-container': '#93000a',
  'on-error-container': '#ffdad6',
  'primary-fixed': '#c3f400',
  'primary-fixed-dim': '#abd600',
  'on-primary-fixed': '#161e00',
  'on-primary-fixed-variant': '#3c4d00',
  'secondary-fixed': '#ffdbd0',
  'secondary-fixed-dim': '#ffb59f',
  'on-secondary-fixed': '#3a0a00',
  'on-secondary-fixed-variant': '#852400',
  'tertiary-fixed': '#d2e5f5',
  'tertiary-fixed-dim': '#b6c9d8',
  'on-tertiary-fixed': '#0b1d29',
  'on-tertiary-fixed-variant': '#374956',
  background: '#121414',
  'on-background': '#e2e2e2',
  'surface-variant': '#333535',
}
```

*Note: DESIGN.md color palette derived from Material Design 3, customized for brutalist aesthetic.*

---

**Document Version**: 1.0  
**Last Updated**: 2025-05-14  
**Status**: Ready for Implementation  
**Owner**: zonke_studio team  

---
