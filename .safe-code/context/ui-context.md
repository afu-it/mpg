# UI Context — MPG (read only for UI work)

Dark mode only, modelled on openrouter.ai/models. Tokens in `src/styles/global.css` (`@theme`):

- **Surfaces:** `--color-surface #000000` (page), `--color-panel #090a0b`, `--color-raised #212225`, `--color-strong #27272a`.
- **Text:** `--color-fg #dfe1e2` (primary), `--color-muted #a1a1aa` (secondary), `--color-accent #818df8` (indigo).
- **Border:** `--color-line #3d3d42`. **Radius:** sm 6 / md 8. **Font:** Inter variable. `tabular-nums` on body for aligned figures.
- Utilities: `bg-surface/panel/raised/strong`, `text-fg/muted/accent`, `border-line`.

Layout: full-width app shell. Sticky top header (wordmark + nav + auth). `/gateways` uses a sticky left filter sidebar (`md:w-60`) + full-width table. Buttons: primary = `bg-accent text-black`; secondary = `border border-line`.

Clerk modal/UserButton themed dark via `appearance` in `src/scripts/auth.ts` (panel `#212025`, input `#18181b`, accent `#818df8`) + WCAG contrast overrides for Clerk's dim text in `global.css` (`.cl-*`).

Accessibility: WCAG 2.2 AA — accent focus ring, AA contrast, keyboard-operable sort/filter, semantic table.
