---
status: done   # suggested | approved | in-progress | done | rejected
created: 2026-06-27
---

> **DONE 2026-06-27.** Built inline via executing-plans (plan: docs/superpowers/plans/
> 2026-06-27-help-me-choose-wizard.md). `src/lib/recommend.ts` (pure, 8 vitest) +
> `src/pages/choose.astro` + `src/scripts/choose.ts` + entry points (landing CTA, footer,
> /learn card). astro check 0, build 70, vitest 42/42. Manual browser smoke left to AFU
> (house rule: no chrome-devtools unless asked). Spec B (programmatic SEO) reuses recommend().

# "Help me choose" wizard (`/choose`)

Brainstormed + approved 2026-06-27. Spec kept in the project's feature-specs system
(overrides the superpowers `docs/superpowers/specs/` default). First of two related
units; **Spec B (programmatic SEO pages) will reuse the `recommend()` engine built here.**

## Goal
A guided, fit-first wizard that turns a merchant's needs into a short, ranked list of
matching Malaysian gateways — so a non-technical user who doesn't know the catalogue
can get a confident shortlist without reading the whole directory. Output is ranked by
the same effective-cost engine as the table/API, so recommendations never contradict
the rest of the site.

## Scope (in / out)
IN:
- New page `/choose` (static, client-side wizard, no backend).
- New pure lib `src/lib/recommend.ts` (`recommend(gateways, needs) → Match[]`), unit-tested.
- Client script `src/scripts/choose.ts` driving the 4-step flow + rendering the shortlist.
- Entry points: a CTA on the landing page, a footer link, and a link from `/learn`.
OUT (YAGNI): volume/cost inputs (that's the separate fee-calculator idea, not chosen);
saving/accounts; any backend; changing the existing `/gateways` filter machinery.

## Approach

### Architecture (static, no backend)
- `src/pages/choose.astro` (`prerender = true`) embeds the gateway data as JSON
  (`<script id="gw-data">`, same pattern as `compare.astro`) with only the fields the
  wizard needs: `slug, name, category, channels, features {no_code,api,recurring},
  access {key,short}, est_fee_rm100, rankable, logo, mcp`.
- `src/lib/recommend.ts` — **pure, DOM-free, testable.** Reused by Spec B (SEO pages).
- `src/scripts/choose.ts` — reads `gw-data`, runs the wizard UI, calls `recommend()`,
  renders results. (NTFS HMR caveat: hard-refresh after editing — house rule.)

### The 4 questions → `Needs`
1. **Integration style**: No-code (payment links) / Developer (API) / No preference → `noCode?`, `developer?`
2. **Channels** (multi-select): FPX, Card, E-wallet, DuitNow QR, BNPL → `channels[]` — a gateway must support **all** selected.
3. **Recurring / subscriptions?**: Yes / No → `recurring?`
4. **Access type**: Integrate yourself (gateway) / Merchant account (bank or e-wallet) / BNPL / No preference → `access?`

Every question has a "No preference" escape so a filter only narrows when the user cares.

```ts
interface Needs {
  channels?: Channel[];          // must support ALL
  recurring?: boolean;           // require features.recurring
  noCode?: boolean;              // require features.no_code
  developer?: boolean;           // require features.api
  access?: "integrate" | "account" | "bnpl";
}
```

**Access mapping (explicit — don't conflate with `access.key`):** because `access.key`
treats BNPL as `integrate`, Q4 maps by category, not by `access.key` alone:
- `integrate` → `category === "gateway"`
- `account`   → `category === "bank" || category === "ewallet"` (i.e. `access.key === "account"`)
- `bnpl`      → `category === "bnpl"`

### `recommend()` logic
- Always exclude `category === "infrastructure"` (PayNet — not a merchant gateway).
- Apply each filter only when specified: channels (all-of), recurring, noCode/developer, access.
- Split results: **rankable** (have `est_fee_rm100`) first, sorted by cost asc; then matching
  **"on request"** (non-rankable) after, sorted by popularity desc.
- Each `Match` carries `reasons[]` derived from satisfied needs (e.g. "FPX + cards",
  "recurring", "no-code") plus a cost note ("~RM1.38 / RM100" or "Pricing on request").
- Return the top N (default 5).

```ts
interface Match { gateway: ApiGatewayLike; reasons: string[]; }
function recommend(gateways: ApiGatewayLike[], needs: Needs, limit = 5): Match[]
```

### Output UI
- Header: "N gateways match your needs" + a compact, editable summary of the chosen answers (go back to change).
- Shortlist cards: logo, name, category badge, `Est. fee / RM100` (or "On request"), reason chips, and buttons **View details** (`/gateway/<slug>`) and **Compare these** (`/compare?ids=<shortlist>` preloaded).
- "Start over" + "Browse all gateways" links.

### Edge / error handling
- **0 matches** → progressively drop constraints in a fixed priority order until ≥1 match:
  (1) `access`, (2) `developer`/`noCode`, (3) `recurring`, (4) channels one at a time (last-selected
  first). Show "No exact match — here's the closest" naming exactly which constraints were relaxed,
  plus start-over / browse-all. If still empty after dropping all channels, show the cheapest overall.
- **All matches on request** (no published fees) → show them ranked by popularity with a
  "Pricing on request" note (don't imply a cost order that doesn't exist).
- Recommendations use the same `gatewayCost` output as the table/API → no drift.

### Testing
- Vitest on the pure `recommend()` (~6–8 cases): channel all-of matching; recurring / no-code /
  developer filters; access→category mapping; rank order (rankable-by-cost then popularity);
  `reasons` content; empty-result relaxation; infrastructure always excluded.
- Client script (DOM) not unit-tested (no component tests in repo) — verify via `astro check`,
  `npm run build`, and a manual pass.

## Acceptance criteria
- `/choose` builds and runs the 4-step flow client-side; produces a ranked shortlist.
- `recommend()` is pure + unit-tested; reused-ready for Spec B.
- Shortlist costs match the `/gateways` table and `/api/gateways.json` for the same gateways.
- Sensible empty / all-on-request states. No fabricated fees; `*`-indicative + "Contact sales" respected.
- Entry CTA on landing + footer + /learn link. astro check 0, build green, vitest green.

## Notes
- `recommend()` deliberately mirrors the MCP `recommend_gateway` tool's intent; keep them
  conceptually aligned, but this is the canonical on-site engine (and Spec B's foundation).
- Don't reimplement filtering inside `choose.ts` — it must call `recommend()` so SEO pages and
  the wizard stay consistent.
- Spec B (programmatic SEO) — separate spec — will pre-render `recommend()` results for common
  need-profiles + head-to-head "X vs Y" pages.
