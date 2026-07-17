---
status: in-progress   # AFU approved ALL slices 2026-07-17 + added E (/learn chip walls) + F (detail-page block pile: AI-prompt box, 18 bank chips, long vs-chips, scattered provenance)
created: 2026-07-17
---
# Minimalist pass — reduce visual clutter without SEO regression

## Goal
AFU (2026-07-17): "aku kalau boleh nak yang minimalist, tulisan tak banyak
sangat" + asked for an honest clutter audit. Verdict from the audit: the data
pages are clean; the clutter concentrates in 4 spots. Fix those, keep the
openrouter.ai-style data-first aesthetic, and lose ZERO indexed copy (SEO text
may move or collapse, never be deleted — spec 12/15 copy is load-bearing).

## Audit evidence (live, 2026-07-17, 1440px)
Word/link counts per page (visible text): home 466w/48 links · gateways
1444w/93 · detail 544w/51 · best 600w/54 · compare 336w/35 · blog post 831w/49.
By industry standards these are LOW; the "serabut" feeling comes from layout,
not volume:
1. **Footer**: 15+ inline links in one dot-separated wrapping line on every
   page (grew again today with Guides + pillar links). Reads as link soup.
2. **/gateways**: the one genuinely dense page — filter sidebar (3 stacked
   groups) + 9-column table + divider + legend + long intro caption.
3. **Homepage stack**: hero (clean) → stats row → "What is a payment gateway"
   paragraph block → 4 value cards → 6 highlight cards → popular comparisons →
   CTA box. Each fine alone; stacked = busy.
4. **Fine-print scatter**: methodology/caveat captions repeated per page in
   slightly different shapes (fees indicative, verified date, weighting note,
   indicative marker legend).

## Scope (in) — slices
- **A. Footer**: replace the dot-run with a compact grouped footer (3 short
  columns: Tools / Guides / Site, 4-5 links each) + one-line legal strip.
  Same links, grouped and scannable; mobile stacks.
- **B. Homepage tightening**: keep hero + stats; MOVE the "What is a payment
  gateway?" block to the bottom (above footer, same copy for SEO); trim value
  cards to 1 line each; cap highlight cards at 3 (one row); popular
  comparisons max 6 chips (already).
- **C. /gateways calm-down**: sidebar groups collapsible on desktop (CHANNELS
  + FEATURES start collapsed; CATEGORY open), shorten the intro caption to one
  line, move the *-legend into a tooltip/footnote line under the table.
  Do NOT touch the table DOM/columns (table.ts + card-list depend on it).
- **D. Fine-print unification**: one shared MethodologyNote component (single
  sentence + link to /about methodology); replace per-page caption variants.
- **E. /learn hub chips**: shorten chip labels (strip "(formerly ...)" via the
  base-name helper; drop repeated "Payment gateways with/for" prefixes); same
  hrefs, add title attr with the full label. Applies to homepage + /vs hub +
  detail head-to-head chips too.
- **F. Detail page calm-down**: AI-agent prompt block + Supported-banks chip
  wall become native <details> (content stays in DOM/indexed); head-to-head
  chips capped at 6 short labels + "All comparisons"; skill/source/verified
  lines merged into one compact provenance block. Fee table + features stay
  exactly where they are.
- Verify each slice vs live with emulation screenshots (desktop + 390px).

## Scope (out)
- No brand/theme change (Jalur Gemilang dark stays), no rebrand, no light mode
  (separate backlog item), no table column removal, no deleting SEO copy or
  JSON-LD, no /learn or blog restructuring (already clean).

## Acceptance criteria
- Indexed word count per page >= before (copy moves, never dies) — scripted
  before/after diff on dist.
- vitest green, astro check 0, SERP-window scans untouched.
- Footer <= 2 visual rows on desktop; /gateways above-the-fold shows the table
  within one screen at 1440x900 with sidebar visible.
- AFU eyeball approval on screenshots before push.

## Notes
- Squirrel "keyword-stuffing" warnings on /vs and /fee-changes are a
  by-product of enumerating provider names; ignore (data pages).
- If AFU later wants MORE text cut (actual copy deletion), that is an SEO
  trade-off decision to take per-page with the GSC data open.
