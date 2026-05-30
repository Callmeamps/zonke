# COMPOSITION.MD

## 1. Visual Identity (Industrial Brutalist Terminal)
**Source of Truth:** `index.html` + `zonke_studio/DESIGN.md`

### Palette
- **Primary:** `#c3f400` (Lime Green)
- **Background:** `#121414` (Matte Dark)
- **Structural:** `#8e9379` (Olive)
- **Contrast:** `#ffffff` (White)

### Geometry & Rules
- **Radius:** Strictly `0px`.
- **Borders:** `2px` solid (Primary or Structural).
- **Shadows:** Hard offset `6px 6px 0px 0px` (no blur).
- **Atmosphere:** Global `3%` scanlines; Terminal block cursor.
- **Motion:** Snappy. `expo.out` or `back.out`. No soft eases.

---

## 2. Planned Compositions

### [REEL_01] Brand Identity (12s)
*High-energy percussive brand showcase.*
- **Scene 1 (0-3s):** Terminal prompt `> ZONKE_` types in. Every character glitches.
- **Scene 2 (3-5s):** **Glitch Shader Transition.** "Z" logo formed by particle nodes. Ghost text "AI NATIVE STUDIO" rolls in background (12% opacity).
- **Scene 3 (5-10s):** Tagline "KNOWLEDGE IS POWER.". Cursor erases text, blinks then "INTELLIGENCE IS LEVERAGE." types onto frame. Final frame shake impact.

### [DEMO_01] Lead Reactor (30s)
*Product funnel walkthrough.*
- **Scene 1 (0-3s):** "> INITIALIZING LEAD REACTOR..." block progress bar fills.
- **Scene 2 (3-12s):** 12-column grid lines reveal cards. Data counts up in `tabular-nums`.
- **Scene 3 (12-20s):** "Instant response. Automated qualification." text type in. CTA button glitches on final 2s.

### [DEMO_02] Tender Vault (30s)
*Data-heavy signal monitoring.*
- **Scene 1 (0-10s):** Radar sweep gradient reveals "Opportunity signals detected."
- **Scene 2 (10-25s):** Vertical list of tenders scrolls; selection highlight boxes snap between rows.
- **Scene 3 (25-30s):** "SCAN NOW_" terminal command pulse.

---

## 3. Technical Implementation Guidelines
- **Typography:** JetBrains Mono ONLY.
- **Scale:** Headlines 80px+, Body 32px+, Labels 18px.
- **Transitions:** Hard cuts or Glitch shaders. No crossfades.
- **Deterministic:** All `gsap` tweens must be `tl.fromTo` for seekability.
- **Sub-Comps:** Use `comp/terminal-prompt.html` and `comp/neo-card.html`.

---

## 4. Status
- [ ] BRAND_REEL (Ready to author)
- [ ] LEAD_REACTOR (Ready to author)
- [ ] TENDER_VAULT (Ready to author)
