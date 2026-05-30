# Lead Magnet Generation Plan

## Strategy

**Core idea**: Publish fully functional interactive tools as lead magnets. Each tool demonstrates Zonke's AI-native capability while capturing qualified leads. No PDFs, no static checklists, no trivial changes to existing flows — every magnet is a standalone interactive system or agentic workflow.

**Why tools work for this audience**: SA real estate agencies and tender teams are practical, results-driven, and skeptical of "AI hype." A tool that immediately saves them time or money proves value before they ever talk to sales.

**Conversion model**: Soft gate — tool delivers immediate value freely, then gates the full output/report/repeatability behind email capture.

---

## Technical Architecture

### Pattern
```
Each tool = One self-contained HTML file
- Tailwind CDN (existing design system)
- JetBrains Mono (existing brand font)
- brutaliest terminal theme (existing colors)
- Alpine.js or vanilla JS for interactivity
- No build step — drop in and link
```

### Backend
```
Single shared Express handler: POST /api/tool-submit
- Receives: { tool_id, email, results }
- Stores in Supabase `tool_submissions` table
- Returns: { success, report_url, email_sent }
```

### Database (new table)
```sql
CREATE TABLE tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id VARCHAR(50) NOT NULL,
  email TEXT NOT NULL,
  results JSONB,
  score DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);
```

### Lead capture strategies per tool
| Strategy | How it works | Best for |
|----------|-------------|----------|
| Report gate | Tool shows summary, full report requires email | Calculators, checkers |
| Email delivery | Results sent to inbox with brand follow-up | Simulators, generators |
| Save & share | Must enter email to save/share results | Interactive dashboards |
| Freemium gate | Basic mode free, pro mode after email | Scoring engines |

---

## Tool Pipeline

### Tier 1: Real Estate (Lead Reactor vertical)

| # | Tool | Description | Est. effort | Capture |
|---|------|-------------|-------------|---------|
| 1 | **Lead Leak Calculator** | Enter monthly lead numbers + response times. Tool calculates leakage percentage, lost revenue, and opportunity cost. Shows side-by-side "before/after" with optimized metrics. Agentic: simulates a week of lead flow and highlights every leak point with animated visualization. | 8h | Report gate |
| 2 | **Response Time Simulator** | Animated simulation: lead comes in, timer ticks, conversion probability decays in real-time. User can adjust response speed, channel, and follow-up cadence to see impact on conversion rate. Agentic: runs 100 simulated lead journeys and reports outcome distribution. | 6h | Email delivery |
| 3 | **Commission Forecaster** | Enter current pipeline (leads, viewings, offers). Tool builds a probabilistic forecast using weighted scoring. Shows best/worst/likely case in an interactive chart. Agentic: runs Monte Carlo-style simulation across 500 iterations. | 10h | Report gate |
| 4 | **Viewing Optimizer** | Enter available time slots + agent availability. Tool finds optimal viewing schedule minimizing gaps and travel time. Agentic: backtracks from desired close date to recommend ideal showing cadence. | 6h | Save & share |
| 5 | **Property Market Pulse** | Enter a suburb/area. Tool fetches (simulated) market indicators: avg days on market, price trends, inventory levels. Agentic: generates a natural-language market brief from the data points. | 12h | Email delivery |

### Tier 2: Tenders (Tender Vault vertical)

| # | Tool | Description | Est. effort | Capture |
|---|------|-------------|-------------|---------|
| 6 | **Tender Fit Score** | Answer 8 questions about your company and the opportunity. Tool scores match across compliance, capacity, experience, and margin dimensions. Agentic: generates a tailored go/no-go recommendation with rationale. | 6h | Report gate |
| 7 | **Deadline Drift Calculator** | Enter tender deadline + your current stage. Tool builds an interactive timeline showing buffer erosion, risk zones, and critical path. Agentic: suggests task re-prioritization to recover lost time. | 6h | Save & share |
| 8 | **Bid ROI Analyzer** | Enter estimated bid costs + contract value + win probability. Tool calculates expected ROI, break-even, and opportunity cost of bidding vs. not bidding. Agentic: sensitivity analysis across variable ranges. | 5h | Report gate |
| 9 | **Compliance Radar** | Select tender categories. Tool shows which compliance documents you have/missing, with estimated acquisition time/cost for each gap. Agentic: prioritizes gaps by urgency and suggests a 30-day compliance plan. | 8h | Email delivery |

### Tier 3: Cross-vertical (AI Readiness / General)

| # | Tool | Description | Est. effort | Capture |
|---|------|-------------|-------------|---------|
| 10 | **AI Readiness Scanner** | 12-dimension interactive audit across People, Process, Tech, Data. Tool scores readiness, benchmarks against industry, and generates a custom AI adoption roadmap. Agentic: the roadmap is dynamically ordered by quick wins vs. strategic impact. | 10h | Report gate |
| 11 | **Automation ROI Calculator** | Select up to 10 recurring tasks, enter frequency + time spent. Tool calculates hours saved, cost saved, and breakeven period for automation. Agentic: recommends specific automation patterns for each task. | 6h | Email delivery |
| 12 | **Workflow Automator** | Describe a manual workflow in plain language. Tool maps it as an interactive flowchart, identifies automation opportunities, and generates a step-by-step automation playbook. Agentic: uses decision-tree logic to probe for edge cases. | 12h | Email delivery |

---

## Publishing Cadence

| Phase | Cadence | Duration | Output |
|-------|---------|----------|--------|
| Launch | 1 tool / week | 4 weeks | 4 tools to build initial library |
| Sustain | 2 tools / month | 4 months | 8 more tools for 12 total |
| Mature | 1 tool / month | Ongoing | Steady stream, retire underperformers |

### Launch sprint (first 4 weeks)
| Week | Tool | Vertical | Notes |
|------|------|----------|-------|
| 1 | Lead Leak Calculator | Real Estate | Highest-intent audience |
| 2 | Tender Fit Score | Tenders | Low build effort, high value |
| 3 | AI Readiness Scanner | Cross | Broad appeal, showcases consulting |
| 4 | Response Time Simulator | Real Estate | Visually impressive, shareable |

---

## Implementation Playbook

### Build process for each tool
1. **Spec** — Define inputs, logic, output, capture mechanism (15 min)
2. **Prototype** — HTML + JS, no backend, fake data (2-4h)
3. **Integrate** — Wire up `/api/tool-submit` + Supabase (1h)
4. **Polish** — Animations, error states, mobile responsive (1-2h)
5. **Ship** — Add server route, link from website, deploy (30 min)

### Template
Each tool follows this structure:
```
tools/
  lead-leak-calculator.html
  tender-fit-score.html
  ...
```
With a shared route pattern:
```js
app.get('/tools/:toolName', (req, res) => {
  res.sendFile(path.join(__dirname, 'tools', `${req.params.toolName}.html`));
});
```

### Shared component library
Create `assets/js/toolkit.js` with reusable functions:
- `showEmailGate(formats Results)` — Modal overlay, captures email, posts to `/api/tool-submit`
- `renderChart(data, target)` — SVG/Canvas chart renderer (using simple canvas or embedded Chart.js)
- `animateValue(el, start, end, duration)` — Count-up / transition animations
- `terminalPrint(text, target, speed)` — Typewriter terminal effect (already in brand-reel patterns)

---

## Distribution Channels

| Channel | Strategy | Per-tool effort |
|---------|----------|-----------------|
| Zonke website | `/tools/*` pages linked from relevant vertical pages | Build once |
| LinkedIn (personal) | Post tool with a screenshot + one insight it reveals | 15 min |
| LinkedIn (Zonke page) | Cross-post with vertical targeting | 5 min |
| Email nurture | Tool users get follow-up sequence (value → case study → call) | Automate |
| WhatsApp / Telegram | Share direct links in SA real estate / tender groups | 5 min |
| Ads | Retarget tool visitors with related ad templates (existing zonke_studio/ads) | Perf config |

---

## Success Metrics

| Metric | Target | Tracked via |
|--------|--------|-------------|
| Tool submissions | 50+/tool/month | Supabase `tool_submissions` |
| Email capture rate | >60% of tool users | `submissions / page views` via GA4 |
| Conversion to consultation | >5% of submissions | Link clicks in email follow-up |
| Social shares | 10+/tool | URL tracking |
| Time-on-tool | >3 min avg | GA4 event |

---

## First Tool: Lead Leak Calculator (Detailed Spec)

### What it does
Real estate agent enters their monthly lead numbers. The tool:
1. Animatedly simulates a 7-day lead flow cycle
2. Identifies every "leak point" (slow response, no follow-up, missed booking)
3. Calculates total lost revenue
4. Shows optimized side-by-side comparison
5. Email gate to receive full report + custom recommendations

### Inputs
- Monthly leads (number)
- Average response time (minutes)
- Current conversion rate (%)
- Average commission (ZAR)
- Follow-up attempts (number)

### Outputs
- Leakage dashboard (animated)
- Lost revenue (ZAR)
- Optimized conversion projection
- Quick-win recommendations (3 items)
- Full PDF report (email gate)

### UI States
| State | What user sees |
|-------|----------------|
| Landing | Terminal-style prompt: `> INITIALIZE LEAD LEAK SCAN_` |
| Input | Clean form with animated cursor fields |
| Processing | Scanline animation, progress indicators, simulated "analysis" |
| Results | Split-screen: current vs optimized, live counters |
| Gate | Modal: "Enter email for your full Leak Report" |
| Complete | Thank you + sharing CTA |

---

## Next Steps (Immediate)

1. Add `tool_submissions` table to Supabase 
2. Create `/api/tool-submit` server endpoint
3. Build `assets/js/toolkit.js` shared library
4. Build **Lead Leak Calculator** (Week 1 launch)
5. Add `/tools/:name` route to Express server
