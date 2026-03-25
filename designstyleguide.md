# Nclusion Design Style Guide

## 1. Overall Design Philosophy

Nclusion uses a dark-mode-first, corporate fintech aesthetic that conveys trust, sophistication, and global impact. The design is built with Tailwind CSS and follows a single-page layout with distinct full-width sections. The overall feel is modern, clean, and data-driven — combining rich photography, warm gold accents, illustrated value cards, and an interactive SVG world map.

---

## 2. Color Palette

### Primary Brand Color (Gold/Amber)

| Token | Value | Usage |
|-------|-------|-------|
| Primary Gold | `#FFC600` / `rgb(255, 198, 0)` | CTAs, accent text, stat numbers, icon backgrounds, step circles, section labels, value card headings, logo ring |
| Secondary Gold | `#F9CB0E` / `rgb(249, 203, 14)` | Checkmark icons, subtle accent variations |
| Gold 20% | `rgba(255, 198, 0, 0.2)` | Circular icon background containers |
| Gold 10% | `rgba(255, 198, 0, 0.1)` | Subtle tag/badge backgrounds |

### Dark Background Tones

| Token | Value | Usage |
|-------|-------|-------|
| Deepest Dark | `#141518` / `rgb(20, 21, 24)` | Primary page background |
| Dark Navy | `#1D202E` / `rgb(29, 32, 46)` | Section overlays, card backgrounds, core brand dark color |
| Card Dark | `#161A28` / `rgb(22, 26, 40)` | Job listing cards, footer background |
| Overlay 70% | `rgba(29, 32, 46, 0.7)` | Section overlays |
| Overlay 90% | `rgba(29, 32, 46, 0.9)` | Section overlays |
| Overlay 95% | `rgba(29, 32, 46, 0.95)` | Navigation header |

### Neutral / Gray System

| Token | Value | Usage |
|-------|-------|-------|
| Gray 700 | `rgb(55, 65, 81)` | Card borders, dividers |
| Gray 600 | `rgb(31, 41, 55)` | Hover borders |
| Gray 400 | `rgb(156, 163, 175)` | Tertiary text, metadata |
| Gray 300 | `rgb(209, 213, 219)` | Body text on dark backgrounds, value card descriptions |
| Gray 200 | `rgb(229, 231, 235)` | Secondary body text |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| White | `rgb(255, 255, 255)` | Primary headings, navigation text, card titles |
| Gold | `#FFC600` | Stat numbers, eyebrow labels, value headings, "View Details" links, department headings |
| Light Gray | `rgb(209, 213, 219)` | Body copy, descriptions |
| Medium Gray | `rgb(156, 163, 175)` | Metadata (location, job type) |

---

## 3. Typography

**Font Stack:** System sans-serif — `ui-sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`. No external/custom web fonts are loaded, keeping the site fast and performance-optimized.

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| H1 (Hero) | 48px | 700 (Bold) | 48px (1.0) | -0.96px | White |
| H2 (Section Titles) | 36px | 700 (Bold) | 40px (1.11) | -0.36px | White |
| H2 (Careers CTA) | 36px | 700 | 40px | -0.36px | White, italic |
| H3 (Sub-headings) | 20px | 700 (Bold) | 30px (1.5) | normal | White or Gold |
| Stat Numbers | 48px | 700 (Bold) | — | — | Gold `#FFC600` |
| Large Map Stats | 48px | 700 | — | — | Gold |
| Body Text | 18px | 400 (Regular) | ~29px (1.625) | normal | Gray 300 |
| Nav Items | 14px | 500 (Medium) | — | normal | White |
| Metadata / Labels | 14px | 400–500 | — | — | Gray 400 |
| Eyebrow Text | 14–16px | 600 (Semi-Bold) | — | wider | Gold |
| Department Headings | 24px | 700 | 32px | — | Gold, italic |
| Filter Pills | 14px | 500 | — | — | White or Dark |
| Tags/Badges | 12px | 500 | — | — | Gold |

---

## 4. Logo

The Nclusion logo consists of a circular ring icon in gold (`#FFC600`) with the word "nclusion" in white, set in a clean sans-serif typeface. The logo appears in both the sticky header and footer. The circular ring motif is echoed throughout the site in step number circles and icon containers, creating strong brand consistency.

---

## 5. Buttons & Interactive Elements

### Primary CTA (Gold Filled)

| Property | Value |
|----------|-------|
| Background | `#FFC600` |
| Text color | `#1D202E` (dark navy) |
| Border radius | 8px |
| Padding | 16px 32px |
| Font | 16px, Bold (700) |
| Height | 60px |
| Hover | translateY(-2px), shadow, 90% opacity on background |
| Example | "Learn How It Works →" |

### Secondary CTA (Ghost/Outlined)

| Property | Value |
|----------|-------|
| Background | transparent |
| Text color | White |
| Border | 2px solid white |
| Border radius | 8px |
| Padding | 16px 32px |
| Font | 16px, Bold (700) |
| Height | 60px |
| Hover | white/10 background tint, translate up |
| Example | "Build with us" |

### Filter Pills (Active)

| Property | Value |
|----------|-------|
| Background | `#FFC600` (gold) |
| Text color | `#1D202E` (dark) |
| Border radius | 9999px (fully rounded) |
| Padding | 8px 16px |
| Font | 14px, Medium (500) |

### Filter Pills (Inactive)

| Property | Value |
|----------|-------|
| Background | transparent |
| Text color | White |
| Border | 1px solid `rgb(55, 65, 81)` (gray-700) |
| Border radius | 9999px |
| Hover | subtle background change |

### "View Details" Links

| Property | Value |
|----------|-------|
| Color | Gold `#FFC600` |
| Font | 14px, Semibold (600) |
| Icon | Right-arrow (→) |

---

## 6. Cards & Containers

### Job Listing Cards

| Property | Value |
|----------|-------|
| Background | `#161A28` |
| Border | 1px solid `rgb(55, 65, 81)` (gray-700) |
| Border radius | 8px |
| Padding | 24px |
| Hover | border brightens to gray-600, slight upward translate, shadow appears |
| Transition | 300ms all |

### Impact Metric Cards

| Property | Value |
|----------|-------|
| Background | `#1D202E` with very dark fill |
| Border | 1px solid `rgb(55, 65, 81)` |
| Border radius | 12px |
| Layout | Centered: icon → label → large stat number → description |
| Text alignment | Center |

### Research Paper Cards

| Property | Value |
|----------|-------|
| Background | `#161A28` |
| Border | 1px solid `rgb(55, 65, 81)` |
| Border radius | 12px |
| Padding | 24px |
| Contents | Title (white, bold), authors/journal (gray), description (gray-300), tag pills |

### Key Findings Cards

| Property | Value |
|----------|-------|
| Background | `rgba(29, 32, 46, 0.9)` to `#1D202E` |
| Border-left | 2px solid `#FFC600` (gold accent line) |
| Border radius | 8px |
| Contents | Gold sub-heading, bulleted list with gold checkmark icons |

### Value Cards (Core Values Section)

| Property | Value |
|----------|-------|
| Top | Illustrated artwork (warm-toned, flat illustration style in oranges/browns) |
| Body | Dark background with gold heading and gray description text |
| Border radius | 12–16px |
| Overflow | Hidden for image containment |

### Field Validation Card

| Property | Value |
|----------|-------|
| Background | Subtle dark |
| Icon | Gold clipboard as visual anchor |
| Corners | Rounded, contained text |

---

## 7. Iconography

### Circular Icon Containers

| Property | Value |
|----------|-------|
| Size | 64px × 64px |
| Background | `rgba(255, 198, 0, 0.2)` (20% gold) |
| Border radius | 9999px (full circle) |
| Icon color | Gold `#F9CB0E` |
| Icon size | 32px |
| Used in | Impact metrics section, research key findings |

### Step Number Circles

| Property | Value |
|----------|-------|
| Size | 64px × 64px |
| Background | Solid gold `#FFC600` |
| Border radius | 9999px |
| Text | 20px, Bold, color `#1D202E` (dark navy on gold) |
| Used in | "How It Works" 3-step flow |

### Checkmark Icons

| Property | Value |
|----------|-------|
| Color | Gold `#F9CB0E` |
| Size | ~20px |
| Used in | Key Findings bullet lists |

### Navigation / UI Icons

| Property | Value |
|----------|-------|
| Arrow icons in CTAs | 20px, matches text color |
| Location pin, clock icons | Gold, ~16px |

---

## 8. Layout & Spacing

### Navigation Header

| Property | Value |
|----------|-------|
| Position | Fixed/Sticky at top |
| Background | `rgba(29, 32, 46, 0.95)` (semi-transparent dark) |
| Transition | 0.3s `cubic-bezier(0.4, 0, 0.2, 1)` |
| Height | ~68px |
| Horizontal padding | Consistent with content max-width |

### Content Width

- Max content width constrained (~1200px based on class usage)
- Generous horizontal padding on sections: 0px to 80px vertical

### Section Spacing

- Vertical section padding: 80px top and bottom (common)
- Inter-card gap: typically 24px (gap-6) or 32px (gap-8)
- Card internal padding: 24px

### Grid System

- 2-column grid for cards (job listings, value cards, impact metrics)
- Single column on mobile (Tailwind responsive breakpoints)
- Centered text sections for headings and descriptions

---

## 9. Imagery & Illustration Style

**Hero Section:** Full-bleed photograph of a community scene (Haiti) with a dark overlay gradient (`rgba(29, 32, 46, ~0.7)`) to ensure text legibility. The photo conveys human connection and community.

**Value Card Illustrations:** Flat, warm-toned illustrations in an editorial/vintage style using oranges, golds, tans, and browns. Each illustration represents an abstract concept (magnifying glass for curiosity, chess board for thoughtfulness, rocket launch for initiative, etc.). The art style is consistent, hand-drawn-feeling, and aligns with the gold brand palette.

**Company Logos (Partners/Alumni):** Displayed as white/monochrome logos in a horizontally scrolling marquee. The logos include Google, Stripe, Meta, Chime, Robinhood, Coinbase, Microsoft, Apple, Rubrik, Bolt, DoorDash, Yuga Labs, Course Hero, and Roku. Two rows scroll in opposite directions creating visual dynamism.

**Interactive SVG Map:** A world map visualization showing financial exclusion data by region, with region labels, percentages, and adult population counts. Uses the gold color for statistical highlights.

---

## 10. Animations & Transitions

### Hover Effects

- **Buttons:** `transform: translateY(-2px)` with shadow on hover
- **Cards:** border color brightens, subtle translate up, shadow appears
- **All transitions:** `cubic-bezier(0.4, 0, 0.2, 1)` easing (Tailwind's default ease)

### Scroll/Reveal Animations

- **scaleIn:** 0.5s ease-out forwards — used on images entering viewport
- **fadeInUp:** Elements fade in and slide up on scroll
- **slideInLeft / slideInRight:** Horizontal entrance animations

### Logo Marquee

- Continuous horizontal scroll animation for company logos
- Two rows moving in opposite directions

### Color Transitions

- Background, color, border-color transitions: 150ms `cubic-bezier(0.4, 0, 0.2, 1)`

---

## 11. Tags & Badges

### Research Paper Tags

| Property | Value |
|----------|-------|
| Background | `rgba(255, 198, 0, 0.1)` (10% gold) |
| Text color | Gold `#FFC600` |
| Border radius | 9999px (pill shape) |
| Padding | 4px 12px |
| Font | 12px, Medium (500) |
| Examples | "digital payments", "financial inclusion", "RCT" |

---

## 12. Form Elements

### Search Input

| Property | Value |
|----------|-------|
| Background | transparent / dark |
| Border | 1px solid `rgb(55, 65, 81)` |
| Border radius | 8px |
| Text color | White |
| Placeholder color | Gray 400 |
| Icon | Search magnifying glass on the right |
| Used in | Research Papers section |

---

## 13. Footer

| Property | Value |
|----------|-------|
| Background | `#161A28` |
| Contents | Logo, mission statement, contact info (Palo Alto, CA / email), copyright, Privacy Policy, Terms of Service, Cookie Settings |
| Body text | Gray 300 |
| Headings | White |
| Divider | 1px solid gray-700 |
| Layout | Clean, minimal two-column |

---

## Summary of Key Design Tokens

| Token | Value |
|-------|-------|
| Primary Gold | `#FFC600` |
| Secondary Gold | `#F9CB0E` |
| Dark Background | `#141518` |
| Dark Navy | `#1D202E` |
| Card Background | `#161A28` |
| Border Gray | `rgb(55, 65, 81)` |
| Body Text | `rgb(209, 213, 219)` |
| Border Radius (Cards) | 8px |
| Border Radius (Pills) | 9999px (full) |
| Button Height | 60px |
| Section Padding | 80px vertical |
| Font Stack | System sans-serif |
| Base Font Size | 16px |
| Heading Weight | 700 |
| Easing Curve | `cubic-bezier(0.4, 0, 0.2, 1)` |
