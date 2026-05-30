# Tool Audit Report

Audit date: 2026-05-30
Scope: All 13 lead magnet tools in `tools/*.html`, server routes, shared library

## Methodology

1. HTTP smoke test every tool endpoint (all 13 return 200 ✅)
2. API endpoint tested with valid/invalid payloads (validation works ✅)
3. JS syntax validation via `node --check` on extracted scripts (all pass ✅)
4. Structural analysis: screens, event wiring, import chain
5. Code quality: Unix principle (one thing well), parent/child composition (call down, signal up), functional patterns
6. Stub/orphan detection: TODO markers, unused handlers, dead code

---

## Section 1 — No Critical Issues

All 13 tools:
| Check | Result |
|-------|--------|
| HTTP 200 | ✅ All pass |
| No JS syntax errors | ✅ All pass |
| Tailwind CDN + design colors | ✅ Consistent |
| JetBrains Mono | ✅ All tools |
| toolkit.js import | ✅ All tools |
| Screen flow (5 screens) | ✅ All consistent `screen-splash → input → processing → results → complete` |
| Email gate via `toolShowEmailGate` | ✅ All tools |
| IIFE encapsulation | ✅ All use `(function(){...})()` |
| `addEventListener` (no inline events) | ✅ All tools |
| Scanline overlay | ✅ All tools |
| Zero TODOs/FIXMEs/STUBs | ✅ All tools |
| No hardcoded API keys/secrets | ✅ |

---

## Section 2 — Issues by Severity

### P2 — Structural / Code Quality

**2.1 Duplicated tailwind.config (403 lines across 13 files)**
Every tool duplicates the exact same 31-line `tailwind.config` inline. This violates the DRY principle and means any design system change requires touching all 13 files.

**Solution**: Extract to `assets/js/tailwind-config.js`:
```js
// assets/js/tailwind-config.js
tailwind.config = { /* ... the full config once */ };
```
Each tool then loads two scripts instead of inline config:
```html
<script src="/assets/js/tailwind-config.js"></script>
<script src="/assets/js/toolkit.js"></script>
```
Saves 31 × 12 = 372 lines of duplication (the reference tool keeps its config as the canonical copy).

---

**2.2 Server route ordering — `tender-vault` path in tool section**
Concurrent subagent edits placed `app.get('/tender-vault')` at line 111, sandwiched between tool routes (ai-readiness-scanner at 107, automation-roi-calculator at 115). Not a runtime bug (Express evaluates all routes on every request), but makes the file harder to read.

**Solution**: Group all tool routes together, then all page routes separately:
```js
// Page routes
app.get('/', ...) app.get('/real-estate', ...) ...
// Tool routes
app.get('/tools/*', ...) ...
// Fallback
app.get('*', ...)
```

---

**2.3 Raw ZAR formatting in 2 tools (bypassing shared library)**
- `automation-roi-calculator.html` — uses `'R' + value.toLocaleString()` inline
- `workflow-automator.html` — uses `'R' + v.toLocaleString() + '/hr'` inline

These should use `toolFormatZAR(value)` for consistency and easier maintenance.

**Solution**: Replace inline ZAR formatting with `toolFormatZAR()` calls.

---

**2.4 `toolAnimateValue` under-used in 2 tools**
- `compliance-radar.html` — only 1 `toolAnimateValue` call (only animates the total cost counter)
- `deadline-drift-calculator.html` — only 1 `toolAnimateValue` call (only animates drift percentage)

Key metric counters in results screens should use `toolAnimateValue` for consistency with the other 11 tools.

**Solution**: Animate additional key figures (e.g., compliance radar's time estimate, deadline calculator's remaining days).

---

**2.5 Hardcoded hex colors inline (15-25 per tool)**
While most colors match the design system, several tools use inline `#hex` colors in `<style>` blocks or as style attributes (`tender-fit-score.html`: 7 inline styles, `deadline-drift-calculator.html`: 8, etc.). This creates visual drift risk when the design system evolves.

**Solution**: Replace inline `style="color: #ff571c"` with `class="text-secondary-container"` etc. Use the design tokens from the tailwind config.

---

### P3 — Architectural / Design

**2.6 Monolithic JS: everything in one IIFE per tool (violates Unix principle)**
Each tool has 300-450 lines of JS in a single IIFE containing: input binding, validation, core logic, animation orchestration, screen management, event wiring, and DOM manipulation. This violates the Unix principle of one function doing one thing well.

**Example**: `commission-forecaster.html` has 100+ variable declarations in one scope.

**Solution**: Decompose into named, single-responsibility functions:
```
setupInputs()          — bind range sliders → display
validate(inputs)       — return { valid, errors }
calculate(inputs)      — pure function: inputs → results (no DOM, no side effects)
renderResults(results) — side-effect: update DOM with results
animateCounters(data)  — trigger toolAnimateValue on result elements
runProcessing(cb)      — animated progress, then call cb
wireEvents()           — bind event listeners in one pass
```

This achieves:
- **Parent/child composition**: `init()` calls `wireEvents()` which delegates to `setupInputs()`, and so on
- **Call down, signal up**: `calculate` never touches the DOM; `renderResults` never computes
- **Testability**: `calculate(inputs)` can be tested in isolation without DOM

---

**2.7 Inconsistent restart UX**
Tools that use `btn-restart` transition to `screen-input` (skipping the splash/boot animation). This is correct. However:
- Some tools: `Re-run scan` button → input
- `tender-fit-score`: `Re-take assessment` → input
- `workflow-automator` has two restart paths with slightly different reset logic

**Solution**: Standardize restart behavior:
1. Reset all inputs to defaults
2. Clear `lastResults`
3. Show `screen-input` (not splash)
4. Common utility: `resetTool(defaults, showInputScreen)`

---

**2.8 Email gate data payload is incomplete**
While all tools pass their results to `toolShowEmailGate`, the `toolkit.js` handler currently stores the data in Supabase but does NOT send an email. The `handleToolSubmit.js` comment says "Here you could trigger an email via Resend" but no email integration exists. Users who enter their email get a "✓" screen but no email arrives.

**Solution**: Wire up Resend in `handleToolSubmit.js` (tracked in `zonke-kny`).

---

## Section 3 — Verdict

| Category | Score | Notes |
|----------|-------|-------|
| HTTP/API | ✅ All pass | 13/13 tools, 3 API validation paths |
| JS syntax | ✅ Clean | 0 syntax errors |
| No stubs/TODOs | ✅ Clean | 0 found |
| Screen consistency | ✅ Excellent | All 5 screens identical across all tools |
| Design system alignment | ⚠️ Minor | 403 lines of duplicated config, some inline hex |
| Shared lib usage | ⚠️ Partial | 2 tools bypass toolFormatZAR, 2 under-use toolAnimateValue |
| Architecture | ⚠️ Functional | All use IIFE but monolithic; needs decomposition |
| Email delivery | ❌ Not wired | Gate captures data but no email sent |
| Route organization | ⚠️ Messy | tender-vault in wrong section |

### What to fix now (P2)
1. Extract tailwind config to shared file
2. Fix route ordering in server.js
3. Replace raw ZAR formatting in automation-roi-calculator and workflow-automator
4. Animate additional counters in compliance-radar and deadline-drift-calculator

### What to fix next (P3)
5. Decompose monolithic JS into single-responsibility functions (start with commission-forecaster — worst offender at 100 vars)
6. Wire up Resend email delivery (zonke-kny)
7. Standardize restart behavior across all tools
8. Add Free Tools section to tenders.html (zonke-wkt)
9. Add tools index page + sidebar nav (zonke-6t7)
