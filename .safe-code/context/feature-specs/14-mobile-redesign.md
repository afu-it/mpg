---
status: done   # 2026-07-17: AFU real-device smoke confirmed clean; emulation-verified 2026-07-03
created: 2026-07-03
---

# Mobile experience redesign — drawer navigation + card lists

AFU reported the mobile view needs a real redesign and suggested a left sidebar
(drawer) for mobile. Verified by chrome-devtools emulation (390x844, DPR 3,
local preview of current master + spec-12 pages).

## Problems found (evidence: emulated screenshots 2026-07-03)

1. **/gateways filter sidebar stacks on top**: category + channels + features +
   reset eat ~2 full screens before the H1 or any gateway row. (Old backlog item
   "collapsible Filters sidebar on mobile" was this same complaint.)
2. **/gateways table**: 9 columns behind a barely-visible horizontal scroll; the
   Est.-fee column clips mid-word ("On requ..."); per-channel fees, settlement
   and badges are effectively invisible on mobile.
3. **/compare table**: same wide-table problem; the 3rd/4th provider columns are
   off-screen and the label column wastes ~40% width; no sticky labels.
4. **Header**: cramped at 390px; the Sign up button wraps to two lines; newer
   tool pages (calculator, fee changes, /best, /vs) are unreachable from the
   header on mobile (footer-only).
5. Homepage/detail/choose/learn pages are structurally fine (single column).

## Design (layout-only; the Jalur Gemilang dark theme, tokens and Inter stay)

Applied ui-ux-pro-max UX rules: drawer for secondary nav, no horizontal scroll
on mobile, content priority (core content first), touch targets >= 44px with
8px spacing, dvh over vh, scrim 40-60% black, Esc/scrim/X dismissal,
state preservation. (sleek.design skill skipped: no SLEEK_API_KEY;
imagegen-frontend-mobile skipped: image-mockups-only skill, explicitly "not for
websites".)

### A. Mobile nav drawer (all pages)
- `< sm`: hamburger button (44px) left of the logo opens a LEFT slide-in drawer:
  Gateways, Compare, Help me choose, Fee calculator, Fee changes, Best gateways,
  Comparisons (/vs/), Learn, API & MCP, Contribute, About.
- Drawer: `fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-panel border-r border-line`,
  translate-x slide 200ms, scrim `bg-black/50`, close via scrim tap / X / Esc,
  body scroll-locked while open. Desktop header unchanged.
- Sign up button gets `whitespace-nowrap` (no more two-line wrap).

### B. Filter drawer on /gateways (`< lg`)
- The stacked sidebar disappears; a sticky control row under the header shows
  **Filters** (funnel icon + active-count badge) beside the existing sort
  dropdown and search.
- Tapping Filters slides the SAME sidebar element in from the left as a drawer
  (one DOM node, so `table.ts` filtering keeps working untouched); apply is
  instant, drawer closes on scrim/X/Esc. Touch rows padded to >= 44px.

### C. Gateways table becomes a card list on mobile (`< md`)
- Same DOM, CSS-transformed rows (so search/sort/filter/dividers in `table.ts`
  keep working): each `<tr>` renders as a card; the name cell + Est. fee are the
  card header (fee right-aligned, prominent); FPX / card / e-wallet / DuitNow QR
  / settlement render as labelled chips via `data-label` pseudo-elements;
  low-value columns (banks count, min txn, MCP column etc.) hidden on mobile
  (badges already live in the name cell). No horizontal scroll.
- `>= md` keeps the existing table exactly as-is.

### D. Compare table mobile pass
- Label column becomes `position: sticky; left: 0` with panel background and
  reduced width; provider columns get a sane `min-width` so 2 fit per viewport
  and the rest scroll with visible affordance. Everything else unchanged.

### E. Small fry
- Calculator table: hide the Effective % column on `< sm` (keeps it unscrolled).

## Acceptance criteria
- 390x844 emulation: /gateways shows H1 + first ranked card within the first
  viewport; zero horizontal scroll on /, /gateways, /gateway/x, /choose,
  /calculator; /compare labels stay pinned while providers scroll.
- Drawers open/close via button, scrim, Esc; body does not scroll behind.
- Filtering/sorting/search still pass their current behavior (manual smoke on
  emulation) and `npm test` + `astro check` + build stay green.
- Desktop (>= 1024px) renders pixel-identical to today (no regression).

## Out of scope
- Rebrand/visual identity changes (ui-ux-pro-max's suggested cyberpunk palette
  rejected: MPG brand is established).
- Native-app patterns (bottom tab bar): this is a content site; drawer + footer
  suffice.
- Light mode (separate backlog item).
