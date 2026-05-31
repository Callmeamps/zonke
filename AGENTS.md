# Zonke — Agent Instructions

**Zonke AI Native Studio** website. Industrial Brutalist Terminal design. Multi-page static funnels + 13 lead magnet tools. Deployed on Netlify (preferred) or Render.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work atomically
bd close <id>         # Complete work
bd dolt push          # Push beads data to remote
```

## Stack

- **Frontend**: Static HTML, Tailwind CDN (`zonke_studio/DESIGN.md` tokens), JetBrains Mono, Motion.dev, canvas particles
- **Backend**: Node/Express `server.js` + Netlify functions `netlify/functions/`
- **DB**: Supabase (PostgreSQL) — 3 tables: `audits`, `bookings`, `tool_submissions`
- **Email**: Resend API (`lib/handleToolSubmit.js`)
- **Deploy**: Netlify (static+functions) or Render (Express)

## Key Files

| File | Purpose |
|------|---------|
| `server.js` | Express server (routes: pages → `/audit-thanks` → `/tools/` → tool routes → fallback) |
| `netlify/functions/` | Serverless functions: `submit-audit.js`, `submit-booking.js`, `submit-tool.js` |
| `lib/` | Shared backend: `handleAudit.js`, `handleBooking.js`, `handleToolSubmit.js`, `supabaseAdmin.js` |
| `assets/js/tailwind-config.js` | Shared Tailwind config (design tokens) |
| `assets/js/toolkit.js` | Shared tool utilities (animate, format ZAR, email gate, reset) |
| `tools/` | 13 lead magnet tool HTML pages + `index.html` landing page |
| `supabase/schema.sql` | DB schema |
| `todo.md` | Task checklist |
| `docs/ROADMAP.md` | Project roadmap |

## Project Structure

```
zonke/
├── index.html               # Home / vertical selector
├── real-estate.html         # Lead Reactor funnel
├── tenders.html             # Tender Vault funnel
├── pricing.html             # Pricing table
├── audit-thanks.html        # Post-audit success page
├── assets/
│   ├── js/
│   │   ├── tailwind-config.js  # Shared design tokens
│   │   ├── toolkit.js          # Shared tool utilities
│   │   └── particles.js        # Canvas particle network
│   └── images/
├── lib/
│   ├── supabaseAdmin.js        # Supabase client
│   ├── handleAudit.js          # Audit submission logic
│   ├── handleBooking.js        # Booking submission logic
│   └── handleToolSubmit.js     # Tool submission + Resend email
├── netlify/functions/
│   ├── submit-audit.js         # Netlify function (wraps handleAudit)
│   ├── submit-booking.js       # Netlify function (wraps handleBooking)
│   └── submit-tool.js          # Netlify function (wraps handleToolSubmit)
├── tools/
│   ├── index.html              # Tools landing page
│   └── *.html                  # 13 tool pages
├── supabase/schema.sql
├── server.js                   # Express server
├── netlify.toml                # Netlify config
├── render.yaml                 # Render config
├── zonke_studio/DESIGN.md      # Design system source of truth
├── Brand_Voice.md              # Brand voice guidelines
└── docs/ROADMAP.md             # Roadmap
```

## Develop

```bash
npm install          # Install deps
npm start            # Express server at http://localhost:3000
npm run dev          # Static serve (no API)
```

## Architecture Notes

### Tool Pattern (all 13 tools)
```
IIFE:
  Constants → State → Pure Functions → DOM Get → DOM Render →
  DOM Screens → DOM Processing → DOM Boot → Event Wiring → Init
```
Screen flow: `splash → input → processing → results → email gate → complete`

### Restart Flow (standardized)
`toolResetAndShowInput(defaults)` in `toolkit.js` — resets inputs to defaults, shows `screen-input` (not splash). No `location.reload()`.

### Tailwind Config
Shared at `assets/js/tailwind-config.js`. Each tool imports via `<script src="../assets/js/tailwind-config.js"></script>`. Tokens: surface (`#0a0a0a`), primary (`#c3f400`), secondary (`#1478db`), error (`#ff3b30`).

### Email Gate
`toolShowEmailGate(toolId, results, onComplete)` in `toolkit.js` — dynamic report names via `reportNames` map. Submits to `handleToolSubmit` → Supabase insert + Resend HTML email.

### Deployment Notes
- `.env` must have: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_REPLY_TO`
- Netlify: connect repo → set env vars → `netlify deploy --prod` or push to connected branch
- Render: connect repo → set env vars in dashboard → auto-deploy on push

## Design References
- `zonke_studio/DESIGN.md` — Industrial Brutalist Terminal tokens
- `Brand_Voice.md` — Voice, zero-cognitive-load rules
- `COMPOSITION.MD` — Composition rules
- `AI_Native_Studio_Full_Plan.md` — Business plan + funnel specs
- `docs/ROADMAP.md` — What's done / in progress / next

## Non-Interactive Shell Commands

```bash
cp -f source dest       # NOT: cp source dest
mv -f source dest       # NOT: mv source dest
rm -f file              # NOT: rm file
rm -rf directory        # NOT: rm -r directory
scp: use -o BatchMode=yes
ssh: use -o BatchMode=yes
apt-get: use -y
brew: use HOMEBREW_NO_AUTO_UPDATE=1
```

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` for full workflow context and commands.

### Rules
- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**MANDATORY before every session end:**

1. File issues for remaining work
2. Run quality gates (tests, builds)
3. Update issue status (close done, update in-progress)
4. **PUSH TO REMOTE:**
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. Clean up (clear stashes, prune remote branches)
6. Verify all changes committed AND pushed
7. Hand off — write handoff doc in `handoffs/`

**Work is NOT complete until `git push` succeeds. YOU must push.**
<!-- END BEADS INTEGRATION -->
