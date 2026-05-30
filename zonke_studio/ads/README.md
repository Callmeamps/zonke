# Zonke Ad Creatives

HTML-based ad images and posters using the Industrial Brutalist Terminal design system.

## Quick Start

### 1. Install Dependencies
```bash
cd zonke_studio/ads
npm install
```

### 2. Render a Single Creative
```bash
node render.js templates/a-system-override.html 1080 1080 build/insta-feed/test.png
```

### 3. Render Batch from Config
```bash
node batch-render.js batch-config-1.json
```

## Directory Structure

```
ads/
├── templates/          # HTML templates with placeholders
│   ├── a-system-override.html
│   ├── b-terminal-countdown.html    (coming soon)
│   ├── c-geometric-sticker.html    (coming soon)
│   ├── d-binary-choice.html       (coming soon)
│   ├── e-system-diagnostic.html   (coming soon)
│   └── f-loader-teaser.html       (coming soon)
├── variants/           # Customized variants with specific copy
│   ├── insta-feed-realestate-1.html
│   └── ...
├── build/              # Rendered images (gitignored)
│   ├── insta-feed/
│   ├── insta-stories/
│   ├── tiktok/
│   └── facebook/
├── render.js           # Single-file renderer
├── batch-render.js     # Batch renderer from JSON config
├── package.json        # Dependencies (puppeteer)
└── README.md           # This file
```

## Platform Dimensions

| Platform | Format | Dimensions | Notes |
|----------|--------|------------|-------|
| Instagram Feed | Square | 1080×1080 | Primary feed ad |
| Instagram Feed | Portrait | 1080×1350 | For taller content |
| Instagram/WhatsApp Stories | Vertical | 1080×1920 | Full-screen |
| TikTok Feed | Vertical | 1080×1920 | In-feed vertical |
| Facebook Feed | Landscape | 1200×630 | Desktop preferred |
| Facebook Feed | Square | 1080×1080 | Mobile preferred |
| LinkedIn Feed | Landscape | 1200×627 | Professional |

## Workflow

### For Template Development

1. Create new template in `templates/` using `base.html` as foundation
2. Use Tailwind utility classes for styling
3. Test locally by opening HTML in browser
4. Use Chrome DevTools device toolbar to preview at exact dimensions
5. Screenshot manually, or use `render.js` for precise pixel output

### For Variant Generation

1. Copy a template to `variants/`
2. Customize copy (headlines, CTAs) while keeping design intact
3. Add variant to a batch config JSON file
4. Run `node batch-render.js config.json`
5. Find rendered images in `build/`

### For Production

- All final images should be stored in `build/` organized by platform
- Compress images using TinyPNG or ImageOptim before publishing
- Track which variants are deployed in a deployment log (spreadsheet)

## Batch Config Format

```json
{
  "name": "Campaign Name",
  "creatives": [
    {
      "name": "Descriptive name",
      "template": "a-system-override.html",
      "width": 1080,
      "height": 1080,
      "output": "insta-feed/variant-1.png"
    }
  ]
}
```

## Design Tokens

All templates must use the color palette and spacing from `DESIGN.md` in the parent directory. Key values:

- Background: `#121414` (surface)
- Primary (CTA): `#CCFF00`
- Secondary (Warning): `#FF4C00`
- Text: `#e2e2e2` (on-surface)
- Border: `#333535` (surface-variant)
- Font: JetBrains Mono (all elements)
- Border radius: `0px` (always sharp)

## Utilities Available

- `.sticker` - thick border + hard shadow effect
- `.glitch` - hover glitch animation (CSS keyframes)
- `.scanlines` - CRT scanline overlay (auto on body)
- `.uppercase-tracked` - all caps + letter-spacing
- `.text-primary`, `.text-secondary` - brand colors
- `.border-2`, `.border-3` - hard borders
- `.grid-pattern` - faint grid background

## Tips

- **Always test at actual size**: Open rendered PNG at 100% zoom to check legibility
- **Keep text minimal**: Social ads have < 2 seconds attention
- **Use high contrast**: Lime on black is always readable, avoid mid-tone greys
- **QR codes**: Minimum 100px in final image, with `[ SCAN TO ... ]` label
- **Brand consistency**: Never round corners, always use hard borders

## Next Steps

1. ✅ Base template and renderer ready
2. Create remaining templates (B-F) as per HTML-ADS-PLAN.md
3. Generate copy variants for Real Estate and Tenders verticals
4. Render test batch and review
5. Run small paid campaign for validation

## Resources

- Full design system: `../DESIGN.md`
- Brand voice: `../Brand_Voice.md`
- Ad plan: `../HTML-ADS-PLAN.md`
- Main site examples: `../zonke_neobrutalist_terminal_bookings/code.html`

---

**Status**: Template A implemented. Templates B-F pending.
**Last updated**: 2025-05-14
