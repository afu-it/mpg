# UI Context — MPG (read only for UI work)

Dark mode only, modelled on openrouter.ai/models, with a **Jalur Gemilang (Malaysia flag)** accent system. Tokens in `src/styles/global.css` (`@theme`).

## Tokens
- **Surfaces:** `--color-surface #0a0a0a` (page), `--color-panel #141416` (cards), `--color-raised #212225`, `--color-strong #27272a`.
- **Text:** `--color-fg #dfe1e2` (primary), `--color-muted #a1a1aa` (secondary).
- **Accent (links/focus/small UI):** `--color-accent #4f86f5` — a lighter flag-blue, ~5.7:1 on surface (readable as text).
- **Flag fills/large text:** `--color-brand-blue #0031a0` (deep flag blue — primary button/badge FILLS behind white text only), `--color-brand-red #cc0000` (BNPL badge / large text / fill w/ white text — fails small-text contrast on dark), `--color-brand-yellow #fed100` (high-contrast accent / large text).
- **Brand-label colours:** `--color-fpx #6f83cc` (FPX, lightened navy), `--color-duitnow #e61f65` (DuitNow magenta). Applied to FPX / DuitNow QR labels (table header, sidebar, detail chip + fee row, glossary, compare).
- **Border:** `--color-line #3d3d42`. **Radius:** sm 6 / md 8. **Font:** Inter variable. `tabular-nums` on body.
- Utilities: `bg-surface/panel/raised/strong`, `text-fg/muted/accent`, `bg-brand-blue/brand-red/brand-yellow`, `text-fpx/duitnow`, `border-line`.

## Contrast rule (dark bg)
Flag blue `#0031a0` and red `#cc0000` are **too low-contrast as small text** on `#0a0a0a` — use them only as fills behind white text, or on large text. Yellow and the lighter accent blue are fine as text. A dark-on-transparent logo (e.g. asiapay navy, NTT-DATA-mark for some) goes on a **white chip** so it stays visible.

## Layout & components
- Full-width app shell. Sticky top header (brand + nav [Gateways / Compare / Learn] + auth). `/gateways` uses a sticky left filter sidebar (`md:w-60`) + full-width table.
- **Site brand (2026-07-02):** AFU-provided mark = Jalur Gemilang shield + growth arrow (blue `#033DA6`, yellow `#FDC209`, red `#D71323`). Source of truth `public/logo.svg` (potrace 3-layer vector trace of the raster; scratch masters gone with the session). Header = 22px mark + "Malaysia Payment Gateway" (mark + "MPG" below `sm:`), OpenRouter-style. All icons DERIVE from logo.svg via rsvg-convert + magick: `favicon.ico` (48/32/16), `favicon-96.png` (Google search icon), `apple-touch-icon.png` (180, white bg, apple dislikes transparency), `icon-512.png` (og:image, white bg). Regenerate from logo.svg, never edit PNGs by hand.
- **Buttons:** primary = `bg-brand-blue text-white`; secondary = `border border-line`. (Was indigo `bg-accent text-black`.)
- **Top progress bar:** 2px `#001bcf` bar (`#top-progress` in `Base.astro` + `src/scripts/progress.ts`), NProgress-style, shows on every page load. Static-friendly (no SPA). Drive its state with inline `transform: scaleX()` — do NOT use Tailwind `scale-*` (it sets the CSS `scale` property and collapses the bar to 0 width).
- **Logo system** (`src/components/Logo.astro`): square logos get subtle rounded corners (`rounded-[22%]`); logos with `logo_round: true` in frontmatter are cropped to a full circle (`rounded-full` + `object-cover`). All logos in `src/assets/logos/<slug>.{svg,png,webp}` (slug = filename). `logo_round` set on bizappay, payhalal, ringgitpay, myiou, paydee, riipay, senangpay.
- **Logo-cycle button:** `src/components/LogoCycle.astro` — pure-CSS vertical carousel of gateway logos inside the Browse-gateways button; respects `prefers-reduced-motion`.
- **ASCII flow diagrams:** `src/components/FlowDiagram.astro` — auto-aligned boxes + connectors, double-line box for the security gate. Used on `/learn/integration-flow` + `/learn/ai-agents`.

## Astro whitespace gotcha
A newline between a word and an inline tag (`<strong>`/`<a>`/`<em>`) is stripped, gluing the words. When prose wraps right before an inline tag, end the line with `{" "}`.

## Auth styling
Clerk modal/UserButton themed dark via `appearance` in `src/scripts/auth.ts` (panel `#212025`, input `#18181b`, primary `#0031a0` + white text, links `#4f86f5`) + WCAG contrast overrides for Clerk's dim text in `global.css` (`.cl-*`).

## Accessibility
WCAG 2.2 AA — accent focus ring, AA contrast, keyboard-operable sort/filter, semantic table. No em-dashes in prose (house style).
