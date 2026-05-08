# Zonke AI Native Studio Website

Industrial Brutalist Terminal design. Multi-page static site with serverless API.

## Structure

- `index.html` — Home (vertical selector)
- `real-estate.html` — Lead Reactor funnel
- `tenders.html` — Tender Vault funnel
- `pricing.html` — Full pricing table
- `assets/` — JavaScript, images
- `lib/` — Shared backend logic (Supabase)
- `netlify/functions/` — Netlify serverless functions
- `server.js` — Express server for Render/OCI
- `supabase/schema.sql` — Database schema

## Tech Stack

- **Frontend**: HTML, Tailwind CSS (CDN), JetBrains Mono, Motion.dev for scroll animations
- **Backend**: Node.js (Express) or Netlify Functions
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Netlify (static+functions) or Render (web service) or OCI (compute)

## Setup

### 1. Supabase

- Create a Supabase project.
- Run `supabase/schema.sql` in the SQL editor to create `audits` and `bookings` tables.
- Create a service role key (Settings → API → Service role key).
- Note your project URL and anon key (though service role used for serverless).

### 2. Environment Variables

Create `.env` (or set in deployment platform):

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Local Development

```bash
# Install dependencies
npm install

# Run Express server (for Render-style)
npm start
# Visit http://localhost:3000

# Or serve static files directly (no API)
npx serve .
```

### 4. Deployment

#### Netlify

- Connect repo.
- Set environment variables in Site settings → Environment variables.
- Build command: `echo "No build step required"` (or leave blank).
- Publish directory: `/` (root).
- Netlify will detect functions in `netlify/functions`.
- Forms submit to `/api/...` which Netlify rewrites to `/.netlify/functions/...` per `netlify.toml`.

#### Render

- Create a new Web Service.
- Build command: `npm install`.
- Start command: `node server.js`.
- Set environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
- The same repo is used; Render runs the Express server which serves static files and handles API.

#### OCI (Oracle Cloud Infrastructure)

- Provision a compute instance (e.g., Ubuntu).
- Clone repo, install Node.js, run `npm install`.
- Start server with `npm start` or use PM2.
- Configure security lists to allow port 80/443.
- Optionally put behind a load balancer.

## Notes

- All form submissions are handled server-side to keep Supabase credentials safe.
- Frontend uses fetch with JSON; CORS is enabled in functions for same-origin.
- Responsive design works on mobile and desktop.
- Expand with GA4 tracking as needed.

## License

Proprietary. All rights reserved.
