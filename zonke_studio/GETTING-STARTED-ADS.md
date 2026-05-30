# Getting Started: Zonke Ad Creatives

## Prerequisites

- Node.js 18+ installed
- Google Chrome or Chromium (for headless rendering)
- Basic familiarity with command line

## Quick Start

### 1. Install Dependencies

```bash
cd /home/callmeamps/Projects/zonke/zonke_studio/ads
npm install
```

This will install Puppeteer (~300MB download on first run).

### 2. Preview Templates in Browser

Open any template directly in Chrome to see how it looks:

```bash
# Example: Preview Template A (Feed)
open templates/a-system-override.html

# Example: Preview Template B (Stories)
open templates/b-terminal-countdown.html
```

Use Chrome DevTools device toolbar to check how it looks at different dimensions.

### 3. Render First Batch

```bash
# Install deps first if not done
npm install

# Render all creatives from config
node batch-render.js batch-config-initial.json

# Output will go to:
# build/insta-feed/realestate-system-override-a.png
# build/insta-feed/tenders-system-override-a.png
# build/insta-stories/realestate-countdown-a.png
# build/insta-stories/tenders-countdown-a.png
```

### 4. Manual Render (Optional)

To render a single file:

```bash
node render.js templates/a-system-override.html 1080 1080 build/insta-feed/manual-test.png
```

---

## What's Included

### Templates

| Template | Purpose | Dimensions | Status |
|----------|---------|------------|--------|
| **A - System Override** | Feed ad: problem/solution comparison | 1080×1080 | ✅ Complete |
| **A (Tenders)** | Feed ad: deadline drift focus | 1080×1080 | ✅ Complete |
| **B - Terminal Countdown** | Stories ad: urgency & countdown | 1080×1920 | ✅ Complete |
| **B (Tenders)** | Stories ad: tender health check | 1080×1920 | ✅ Complete |
| C - Geometric Sticker | Feature highlight card | 1080×1080 | 📝 Planned |
| D - Binary Choice | Comparison layout | 1080×1350 | 📝 Planned |
| E - System Diagnostic | Social proof with metrics | 1080×1920 | 📝 Planned |
| F - Loader Teaser | Pre-launch countdown | Any | 📝 Planned |

### Created Files

```
zonke_studio/ads/
├── templates/
│   ├── base.html                  # Foundation with design tokens
│   ├── a-system-override.html     # Feed ad - Real Estate
│   ├── a-system-override-tenders.html  # Feed ad - Tenders
│   ├── b-terminal-countdown.html  # Stories - Real Estate
│   ├── b-terminal-countdown-tenders.html  # Stories - Tenders
│   ├── c-geometric-sticker.html   *(coming)*
│   ├── d-binary-choice.html      *(coming)*
│   ├── e-system-diagnostic.html  *(coming)*
│   └── f-loader-teaser.html      *(coming)*
├── variants/                      # Your custom variants go here
├── build/                         # Rendered images (gitignored)
├── render.js                      # Single-file renderer
├── batch-render.js                # Batch renderer
├── batch-config-initial.json      # Week 1 batch config
├── package.json                   # Dependencies
├── .gitignore
└── README.md                      # Detailed docs
```

---

## Customization Workflow

### To Create a New Variant

1. **Copy a template** to `variants/`:
   ```bash
   cp templates/a-system-override.html variants/insta-feed-realestate-promo.html
   ```

2. **Edit copy** (headlines, CTAs, URLs) in the HTML file
   - Keep structure intact
   - Change text only
   - Update links to your landing pages

3. **Add to batch config** (edit `batch-config-initial.json` or create new):
   ```json
   {
     "name": "My Custom Batch",
     "creatives": [
       {
         "template": "variants/insta-feed-realestate-promo.html",
         "width": 1080,
         "height": 1080,
         "output": "insta-feed/realestate-promo-1.png"
       }
     ]
   }
   ```

4. **Render**:
   ```bash
   node batch-render.js my-config.json
   ```

5. **Find output** in `build/` folder

---

## Design System Refresher

All ads must follow the **Industrial Brutalist Terminal** aesthetic from `DESIGN.md`:

- **Colors**: Dark surface (#121414), Lime primary (#CCFF00), Orange secondary (#FF4C00)
- **Fonts**: JetBrains Mono (monospace) for all text
- **Borders**: 2-3px solid black, 0px border-radius (sharp corners)
- **Effects**: Scanlines overlay, glitch hover, hard shadows (sticker effect)
- **Layout**: Grid-based, visible borders, clipped corners optional

**Never**:
- Use rounded corners
- Use drop shadows (blur)
- Use mid-tone greys
- Use more than 2 fonts
- Center-align everything (prefer left-aligned blocks)

---

## Next Steps After Rendering

1. **Review at actual size** (100% zoom) - ensure legibility on mobile
2. **Compress** with TinyPNG/ImageOptim (save ~30-50%)
3. **Rename** for deployment: `platform_size_variant_YYYYMMDD.png`
4. **Upload** to Meta Ads Manager, TikTok Ads, etc.
5. **Track** which variants perform best in a simple spreadsheet

---

## Troubleshooting

### Puppeteer fails to launch
- Ensure Chrome/Chromium is installed
- On Linux, you may need additional dependencies: `apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils`

### Images are blank or missing fonts
- Ensure network access (fonts load from Google Fonts CDN)
- Add `await page.waitForFunction(() => document.fonts.ready);` in `render.js` (already included)
- Try adding a longer delay before screenshot (edit render.js)

### Output is distorted/cropped
- Check that body in HTML has explicit width/height matching render dimensions
- Use `overflow: hidden` on body to prevent scrollbars

### Scanlines too strong/weak
- Adjust opacity in `.scanlines::before` CSS rule (try 0.15 instead of 0.25)

---

## References

- **Full design system**: `../DESIGN.md`
- **Brand voice & messaging**: `../Brand_Voice.md`
- **Ad plan**: `../HTML-ADS-PLAN.md`
- **Live site examples**: `../zonke_neobrutalist_terminal_bookings/code.html`

---

## Support

For issues or questions:
1. Check README.md in ads folder
2. Review DESIGN.md for color/typography reference
3. Compare with working examples in parent directory

---

**Ready to launch**: After you render your first batch, you should have 4-8 PNG files ready for social media upload.

**Week 1 goal**: 4 core creatives (Feed + Stories x 2 verticals) → render → upload to Meta/TikTok → start validation.

Good luck!
