---
name: Industrial Brutalist Terminal
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#ffb59f'
  on-secondary: '#5e1700'
  secondary-container: '#ff571c'
  on-secondary-container: '#531300'
  tertiary: '#ffffff'
  on-tertiary: '#21323e'
  tertiary-container: '#d2e5f5'
  on-tertiary-container: '#556774'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59f'
  on-secondary-fixed: '#3a0a00'
  on-secondary-fixed-variant: '#852400'
  tertiary-fixed: '#d2e5f5'
  tertiary-fixed-dim: '#b6c9d8'
  on-tertiary-fixed: '#0b1d29'
  on-tertiary-fixed-variant: '#374956'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: JetBrains Mono
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.02em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
  margin: 40px
---

## Brand & Style

This design system is built on the principles of **Industrial Brutalism** and **Guerrilla Marketing**. The personality is aggressive, technical, and unapologetic. It rejects the softness of modern consumer web design in favor of a "machine-native" aesthetic that feels like a high-fidelity command center or an underground technical manual.

The visual language communicates authority and speed. It is designed for power users who value raw utility and high-contrast information density. Every element is intentional, sharp, and structurally honest, utilizing visible grid lines and terminal-inspired textures to create a sense of digital "grit."

## Colors

The palette is rooted in high-visibility functionalism. 

- **Backgrounds:** A deep, matte charcoal (#131313) serves as the "void" for all content.
- **Primary (Action):** Lime Green (#CCFF00) is used for primary calls to action, active states, and critical data points. It is the color of the "on" state.
- **Secondary (Warning):** Orange (#FF4C00) is reserved for secondary accents, alerts, and system-level status indicators.
- **Support:** Pure white (#FFFFFF) is used for high-contrast body text and borders. Mid-tone greys are avoided to maintain the binary, high-contrast feel; instead, use low-opacity white or deep grey (#333333) for structural lines.

## Typography

The typography system uses **JetBrains Mono** exclusively to reinforce the terminal aesthetic. 

- **Headings:** Must be bold and predominantly all-caps. Tight line-heights and negative letter-spacing should be used for large display sizes to create a "dense" block-like feel.
- **Body Text:** Maintains a generous line-height for legibility against the dark background.
- **Labels:** Small, all-caps, and tracked out for a "technical spec" look. 
- **Hierarchy:** Established through scale and color (Lime Green for primary headers, White for secondary).

## Layout & Spacing

This design system uses a **Fixed Grid** model based on a 12-column structure with visible grid lines.

- **The Grid:** 1px solid borders (#333333) should define the primary layout containers. 
- **Rhythm:** All spacing must be a multiple of 4px. 
- **Padding:** Use "Internal Padding" (md/lg) to keep content away from container edges, creating a "framed" look.
- **Alignment:** Content should feel snapped to the grid. Avoid centering; prefer left-aligned blocks that emphasize the mechanical structure of the layout.

## Elevation & Depth

Depth is not created through shadows or blurs, but through **Tonal Layering** and **Structural Borders**.

- **Layers:** Use "Sticker" overlays—elements that appear to be pasted over the grid. These have 100% opacity and thick 2px solid borders.
- **Hard Borders:** Every container must have a visible 1px or 2px border. Primary containers use White or Lime Green borders; inactive/background containers use #333333.
- **Scanlines:** A global overlay of 1px horizontal lines at 3% opacity provides a CRT-style texture to the entire interface.
- **Glitch FX:** Interaction states (like hovering over a primary button) should trigger a horizontal "slice" or color-shift glitch rather than a smooth fade.

## Shapes

The shape language is strictly **Rectilinear**. 

- **Corners:** Absolutely 0px radius for all elements, including buttons, inputs, cards, and modal windows.
- **Accents:** Use 45-degree "clipped" corners for specific aesthetic accents (e.g., status tags or terminal headers) to imply a machined/fabricated metal look.
- **Icons:** Use sharp, pixel-aligned stroke icons. Avoid any rounded terminals on icon paths.

## Components

### Buttons
- **Primary:** Background #CCFF00, Text #131313, 0px radius. All-caps bold text. On hover: Invert colors or apply a "flicker" glitch effect.
- **Secondary:** Background transparent, 2px solid #FFFFFF border, Text #FFFFFF.
- **Tertiary:** No background, underline on hover, #CCFF00 text.

### Inputs & Fields
- **Container:** Dark background (#131313), 1px solid border (#333333).
- **Focus State:** Border changes to #CCFF00. A "blinking cursor" underscore should appear at the end of the text.
- **Labels:** Positioned outside the box, top-left, in `label-mono` style.

### Stickers & Badges
- **Status Tags:** High-contrast blocks (e.g., Orange background for 'DANGER' or 'CRITICAL').
- **Metadata:** Small blocks of text wrapped in brackets, e.g., `[ SYSTEM_READY ]`.

### Grid Containers
- Use 1px #333333 lines to separate sections of the page vertically and horizontally, resembling a technical blueprint.

### Loading States
- Use terminal-style "ASCII" spinners (e.g., `[ / ]`, `[ - ]`, `[ \ ]`, `[ | ]`) or progress bars made of block characters `██████▒▒▒`.