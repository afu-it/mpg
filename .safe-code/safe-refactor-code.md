# safe-refactor-code — flagged candidates

_2026-07-02 (rev 13)_

## Resolved
- Removed unused dependency `@clerk/clerk-js` (auth loads Clerk from CDN via `window.Clerk`).
- Removed favourites feature + its deps (`@clerk/backend`, `@cloudflare/workers-types`) and the whole `/functions` tree — owner's call. Repo is pure static again.

## Open candidates
- (none) — Clerk sign-in/up is intentionally kept (owner's call) for a future account feature, even though favourites was removed. Do NOT flag it as dead.

## Guardrails
- Do not "optimize" by re-adding `@clerk/astro` / `@astrojs/cloudflare` (Astro 7 incompatible).
- Keep `src/lib/fees.ts` the single source of fee math: `parseFeeShape` ({pct,fixed,floor,known,indicative}) + `effectiveCost`/`effectiveCostAt` + `gatewayCost` (gated, weighted). Used by `GatewayTable.astro`, `data-sort-value`, `compare.ts`, detail page. The old first-%-only `parseFee`/`compareFee` were removed (unit-broken — see spec 07); do not reintroduce a single-number fee proxy.
- Keep `src/lib/fpx-banks.ts` as the single FPX bank source — never inline/duplicate the list in a gateway `.md` or component.
- Never strip the trailing ` *` from a fee value as "cleanup" — it marks third-party/indicative data and is explained by a legend. Removing it would misrepresent unofficial rates as official.
- Default sort is **lowest effective fee, gated** (`gatewayCost`): rankable rows by cost asc, then non-rankable ("On request") by popularity. Don't "simplify" the two-tier order back to a single mean or to popularity-first. `popularity` is editorial (a sort option + the On-request tiebreaker); changing numbers is fine, removing the field is not. The eligibility gate (FPX + card/e-wallet, OR card+e-wallet; indicative `*` excluded) is deliberate — don't drop it or single-channel/opaque gateways will fake-lead the ranking again.
- Don't "tidy" the `#top-progress` bar to a Tailwind `scale-*` class — it sets the CSS `scale` property and collapses the bar to 0 width. Keep the inline `transform: scaleX()` JS.
- Don't strip `{" "}` spacers in `.astro` prose as "noise" — they fix Astro's newline-before-inline-tag whitespace gluing.
- Don't remove em-dashes' replacement punctuation back to em-dashes; no em-dashes in prose is house style. The standalone `"—"` fee placeholder is data, keep it.
- Keep `src/lib/access.ts` as the single source for the integrate-vs-account label, derived from `category` — don't inline the mapping in components or add a duplicate field.
- Logos must stay square (1.0 aspect) symbol-marks for table consistency — don't "restore" wide wordmark logos. `logo_round: true` marks circular logos; don't drop it.
- `compare.ts` list-cell layout (narrow-pair / wide-to-bottom / shared `listExpanded`) is intentional — don't "simplify" back to a flat per-cell toggle.
- Don't reuse legacy iPay88 fee numbers for NTTDataPay — ADAPTIS publishes none, so it's "Contact sales".
- `mcp/` is a SEPARATE Cloudflare Worker (own package.json/wrangler/tsconfig) — never fold it into the static Astro app or add `@astrojs/cloudflare`. Root `tsconfig.json` must keep `mcp` in `exclude` (else astro check scans the Worker and fails on Workers types). `mcp/node_modules` + `.wrangler` are gitignored.
- The JSON API (`src/lib/api.ts` + `/api/*` endpoints) and the MCP Worker derive `est_fee_rm100`/`rankable` from `gatewayCost` — keep them sourced from `fees.ts`, don't hardcode a parallel fee number.
- `src/lib/recommend.ts` is the single recommendation engine (filter `Needs` → rank → reasons). `/choose` (`choose.ts`) and the SEO pages (`seo-pages.ts`, spec 10) MUST call it — don't reimplement gateway filtering inline. Keep it pure (no DOM) so it stays testable + reusable.
- `src/lib/seo-pages.ts` (spec 10) must stay copy/registry only — no fee math, no parallel ranking. Its vs-pair list is DERIVED (top-12 gateway + top-4 BNPL rule), don't replace it with a hand-maintained list; add `/best/` pages by adding a `PROFILES` entry. Page prose is templated there so the no-em-dash + never-fabricate-fees rules are enforced by its tests — keep those tests.
- `@astrojs/sitemap` is build-time only and safe on Astro 7 static — it is NOT in the same family as the banned SSR adapters; don't remove it as "adapter cleanup", and don't delete `public/robots.txt` (it points crawlers at sitemap-index.xml).
