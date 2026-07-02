# MEMORY — temporary audit/architecture notes

_2026-07-02 (rev 2)_

## SEO pages layer (2026-07-02)
- `src/lib/seo-pages.ts` is registry + builders ONLY (pure, tested); it owns page copy, not fee math or ranking. Canonical architecture note lives in `context/architecture.md` (Navigation map).
- vs-pair curation is derived from data (top-12 gateway w/ ≥1 rankable side + top-4 BNPL); if popularity numbers are re-tuned, the generated pair set (and thus URLs) can shift on the next build — old /vs URLs would 404. Acceptable now (fresh, unindexed); revisit (pin the list or add redirects) once pages are indexed.

## Clerk production (2026-07-02)
- App "Malaysia Payment Gateway" = `app_3FZd3mHzTBeSp0ufdwueJaORgP2`; dev `ins_3FZd3lUKfoKphjFxMa78MStFTXF` (pk_test), prod `ins_3FvlB7gGDEHgTNV12mP6YFQQqBM` (pk_live for `clerk.malaysiapg.com.my`).
- Production is driven via the `clerk` CLI + Platform API. Domain verified (dns/ssl/mail) with 5 CNAMEs on Cloudflare (clerk/accounts/clkmail + 2 DKIM, all DNS-only). Sign-in = email code + password + Google; GitHub disabled. `clerk deploy status` may still show github "pending" (cosmetic — it's disabled, not a blocker).
- Build wiring: prod uses `pk_live` via GitHub secret `PUBLIC_CLERK_PUBLISHABLE_KEY`; local `.env` keeps `pk_test` for `npm run dev`. Clerk **instance config** changes (enable/disable a provider, OAuth creds) take effect at runtime — no site rebuild; only a publishable-key change needs a redeploy.

## Recommendation engine + /choose wizard (2026-06-27, spec 09)
- `src/lib/recommend.ts` is the canonical, pure, DOM-free recommendation engine: `recommend(gateways, needs, limit)` filters by `Needs` (channels all-of, recurring, no-code/developer, access→category mapping: integrate=gateway, account=bank|ewallet, bnpl=bnpl; infrastructure always excluded) and ranks by `est_fee_rm100` then `popularity`, attaching `reasons[]`. `recommendOrClosest()` relaxes constraints in a fixed order (access → integration → recurring → channels last-first) when nothing matches.
- `/choose` (`src/pages/choose.astro`) embeds gateway JSON (compare.astro `gw-data` pattern) + `src/scripts/choose.ts` runs a 4-step wizard calling `recommendOrClosest`. Operates on `ApiGateway` (from api.ts), so it stays consistent with the table/API.
- **Spec B (programmatic SEO pages) MUST reuse `recommend()`** — do not reimplement filtering. The MCP `recommend_gateway` tool mirrors this intent but `recommend.ts` is the on-site source of truth.

## Data API + MCP architecture (2026-06-27, spec 08)
- The site is static, so the "API" is build-time JSON: `src/lib/api.ts` (`toApiGateway`/`buildApiPayload`) + Astro endpoints `src/pages/api/gateways.json.ts` and `src/pages/api/gateways/[slug].json.ts` (`prerender = true`) → `dist/api/*.json`. NO server. `est_fee_rm100`/`rankable` come from `gatewayCost`, so the API mirrors the site ranking. Docs: `src/pages/learn/api.astro`.
- MCP server is a SEPARATE Cloudflare Worker in `mcp/` (its own package.json/wrangler.jsonc/tsconfig; NOT `@astrojs/cloudflare`). `McpAgent` + `McpServer`, Streamable HTTP `MpgMCP.serve("/mcp")`, DO `MpgMCP` (`new_sqlite_classes` migration), var `MPG_API_BASE`. 4 read-only tools (list/get/compare/recommend) fetch the live JSON API (cached per isolate via module-scope cache, 10-min TTL). Root `tsconfig.json` excludes `mcp/` so astro check doesn't scan the Worker.
- Deploy is manual + separate (GitHub Actions only deploys the Pages dist): `cd mcp && npx wrangler login && npm run deploy`. Worker needs Phase 1 (`/api/gateways.json`) live first. When the custom domain lands, update `MPG_API_BASE`.

## Fee math + ranking model (2026-06-27, spec 07)
- `src/lib/fees.ts` is the single source of fee math. `parseFeeShape(str)` → `{pct, fixed, floor, known, indicative}` (parses %, additive `+RM`, whichever-greater/`min` floor, range→midpoint, `*`→indicative, B2C/first for tiers). `effectiveCost(shape, ticket) = max(ticket·pct/100, floor) + fixed`. `gatewayCost(fees, ticket=100)` → `{rankable, cost}`: weighted blend FPX .5 / card .3 / e-wallet .2 over known non-indicative channels, renormalised; **eligibility gate** = (FPX + card|e-wallet) OR (card + e-wallet), else `rankable:false` (cost Infinity).
- `GatewayTable.astro` default order: rankable by cost asc, then non-rankable ("On request") by popularity desc, then name. Per-fee-column `data-sort-value` = `effectiveCostAt(cell, 100)` (unit-correct within a column). Row `data-value` = blended cost (Infinity if not rankable); `data-popularity` drives the Popularity sort option.
- `table.ts` builds `colIndex` from `data-col-key` on fee column headers → per-channel sorts (Lowest FPX/card/e-wallet) and column reordering are safe without touching the script.
- WHY (audit): old `valueScore` mean averaged flat RM with %, dropped `+RM`, and rewarded opaque/single-channel disclosure → TNG #1 on one figure, Stripe last for honesty, 34/59 unscored. Don't regress to a single-number proxy. Tuning knobs: weights 50/30/20, basket RM100 (`REF_TICKET`), gate rule — all in fees.ts.

## Categories + access model (2026-06-26)
- `category` enum (`content.config.ts`): gateway (default) / bank / ewallet / bnpl / infrastructure. Banks → `bank`, TNG → `ewallet`. Boost kept `gateway` (full multi-channel gateway, not just wallet acceptance).
- `src/lib/access.ts` `accessInfo(category)` derives the merchant access path: gateway/bnpl → "Integrate", bank/ewallet → "Merchant account", infrastructure → "Infrastructure". Shown on detail (strip under channels) + compare ("Access" row). NO per-entry field — derived, so it stays in sync. Caveat: acquirer gateways (Fiuu, NTT DATA, local acquirers) are really "apply first" but read "Integrate"; add an override field if that matters.
- /learn hub has a "Which type do you need?" block linking to `/gateways?category=<key>` — `table.ts` reads `?category=` and preselects the sidebar radio.
- Default category filter is still "Gateways" (banks/ewallet/bnpl/infra one click away).

## Liveness methodology (2026-06-26, AFU rule)
- A live website is NOT proof of a live business — also check social-media recency / last sign of life. Dormant socials (12-18+ months quiet, like myIOU's ~Jun 2023) = candidate for removal. Done via multi-agent workflows (liveness sweep + social-recency sweep + deep discovery + per-logo visual QA).

## Logo system v2 (2026-06-26)
- 59 real logos, 0 monograms. For wordmark-only brands, crop the SYMBOL (square) not the wordmark (J&C planet, MPay M-swoosh, CIMB chevron, Public Bank octagon, UOB pillars, HLB swoosh, RHB diamond, Fasspay "P"); for brands with no symbol, build a clean app-icon tile in brand colours (commercepay C, revpay "rev", bcl "bcl").
- Dark-on-transparent fix = recolour the dark ink to white/silver (NOT a global white plate — keeps the floating aesthetic). SVGs rasterised with `rsvg-convert`. `logo_round: true` on circular marks (billplz, gomobi, hitpay, ipay88, ocbc-malaysia, swif, moby, maybank2u-pay, …).
- Small favicons (boost 32px) are fine: logos display at ~22px so source ≥22px downscales sharp; only sub-22px (16px) or blank/banner sources needed replacing.

## Compare list-cell layout (2026-06-26)
- `compare.ts` list cells (methods/plugins/banks): chips ≤10 chars pair 2-per-row (lone last one `col-span-2 justify-self-center`); chips >10 chars drop to a full-width centered row at the bottom. Show-more uses a SHARED `listExpanded` + `listDraws` registry so one toggle expands all provider columns.

## Stray vite cache trap (2026-06-26)
- `astro dev` with `CHOKIDAR_USEPOLLING=true` on the NTFS mount sometimes writes its vite deps cache + `.astro` types into a source subdir (`src/pages/node_modules/.vite/...`, `src/pages/.astro/`) instead of the root. Both are gitignored + untracked → safe to `rm -rf`, they regenerate. Recurs across sessions; if annoying, pin vite `cacheDir` in `astro.config.mjs`. Not real code — never treat as source or commit it.

## Theme + UI system (2026-06-25)
- **Jalur Gemilang on dark.** Tokens in `global.css` `@theme`: accent `#4f86f5` (lighter flag-blue, text-safe), brand-blue `#0031a0` (button/badge fills + white text only), brand-red `#cc0000` (large text / fills), brand-yellow `#fed100`, fpx `#6f83cc`, duitnow `#e61f65`. Surface `#0a0a0a`, panel `#141416`. Full design notes in `context/ui-context.md`.
- **Contrast trap:** pure flag blue `#0031a0` (~1.5:1) and red `#cc0000` (~3.4:1) fail as small text on dark — fills-only / large-text-only. Dark-on-transparent logos go on a white chip.
- **Top progress bar trap:** Tailwind `scale-x-0` sets the CSS `scale` property, which multiplies with `transform` and collapses the bar to 0 width. Drive `#top-progress` with inline `transform: scaleX()` only.
- **Astro whitespace trap:** newline between text and an inline tag (`<strong>`/`<a>`/`<em>`) is stripped → words glue. End the wrapping line with `{" "}`.
- **Logo system:** `Logo.astro` rounds square logos (`rounded-[22%]`); `logo_round: true` frontmatter crops circular marks to a full circle. Logos in `src/assets/logos/<slug>.{svg,png,webp}`.

## iPay88 → NTT DATA (2026-06-25)
- iPay88 retired: ipay88.com is down (502); now NTT DATA Payment Services / **ADAPTIS** (my.nttdatapay.com), which consolidates **iPay88 + eGHL**. Entry renamed "NTTDataPay (formerly iPay88)", slug kept `/gateway/ipay88`, all fees "Contact sales" (ADAPTIS publishes none; legacy iPay88 rates not reused).
- eGHL still operates under its own brand (eghl.my live; eghl.com is a parked for-sale domain) → kept as a separate entry with a note it's now under NTT DATA.

## Astro 7 ecosystem traps (June 2026)
- `@clerk/astro` peer-deps cap at Astro ≤6 → won't install/run on Astro 7.
- `@astrojs/cloudflare` dev (workerd) breaks on Astro 7 ("return statement…"); downgrading to Astro 6 hit Vite-7 + `@tailwindcss/vite` resolution hell.
- **Working combo:** Astro 7 static + `@clerk/clerk-js` via CDN hotload + Tailwind v4 (`@tailwindcss/vite`). No SSR adapter.
- Dev gotcha: `astro dev` daemonizes → stale daemons serve old code; use `CHOKIDAR_USEPOLLING=true` on the NTFS mount; hard-refresh after client-script edits.

## Developer-experience + ranking (2026-06-24)
- Schema additions: `popularity` (number, default 0 — default sort key, DESC; value is tiebreaker), `mcp` (official/community/none, default none), `webhooks` (bool), `plugins[]`, `dev_docs` (url).
- MCP official: Stripe, Curlec (Razorpay), HitPay, Airwallex. Community: Xendit, Bayarcash. All others none.
- `popularity` is editorial (market presence), set on ~21 gateways; the rest default 0. iPay88=100 down to airwallex=40; BNPL atome=75/spaylater=70/grab=66. Tweak freely.
- Owner's agent-skills repo (github.com/afu-it/malaysia-payment-gateway) maps 1:1 to our `skill:` field and is the backbone for the planned `/learn` section (spec 06): ready agent prompts, security rules (verify signatures, idempotent settlement, no redirect-unlock), production checklist.

## Fee provenance + `*` marker (2026-06-24)
- Fee values may be official (no marker) or third-party/indicative (trailing ` *`, e.g. `"6% *"`). Legend on table/compare/detail; detail shows it only when a fee contains `*`. `parseFee` regex ignores the `*` so sorting/valueScore unaffected.
- Gateways WITH a usable rate card/fee PDF: Fiuu (booster.fiuu.com base-rate PDF), iPay88 (SME fee-structure PDF, mirrored on reseller domains), RinggitPay (ringgitpay.biz/sp1), ManagePay (info.mpay.my/faq), Curlec/CHIP/BCL/Stripe/Billplz/Xendit/Bizappay/Kiple/Gkash/Paydibs/Revenue-Monster (partial, on own sites), Riipay (T&C PDF), senangPay (senangpay.my/fee-costing-features).
- Genuinely quote-only (no official OR third-party figures anywhere): OxPay, RevPay, Paydee, M1Pay (MDR), CommercePay (MDR), AsiaPay (rates). Don't keep re-researching these.
- toyyibPay: official site publishes no pricing page (the /pricing-plans URL 404s); only FPX RM1.00 + T+1 are dependable.

## Banks + methods dimension (2026-06-24)
- FPX participating banks are a national PayNet standard → stored ONCE in `src/lib/fpx-banks.ts` (B2C list, sourced PayNet KB + FI-code PDF), shown for any `fpx` gateway. Do NOT duplicate per-gateway bank lists.
- `methods` (e-wallets/other rails) DO differ per gateway → sourced per file. Generic "e-wallets" mentions (asiapay/payhalal/xendit in listicles) were too vague to map to brands → left empty rather than guessed.
- Research provenance: sitegiant comparison + easystore + rebrand + justsimple + veecotech (sitegiant 2026 blog was Cloudflare-blocked). CardBizPay + Airwallex publish real rates; M1Pay = contact-sales. OnPay is a sales-page SaaS (not an acquirer) → excluded. PayNet = infrastructure entry.

## Phase 2/3 backend — ARCHIVED (built then removed 2026-06-24)
Favourites (Pages Functions + D1 + `@clerk/backend`) was built and removed the same
day — owner doesn't want it. The repo is back to a pure static site. If Phase 3
ever needs a server + DB, these lessons from that build still hold:
- Cloudflare **Pages Functions** (`/functions/api/*`) + **D1**, separate from the Astro build. Verify Clerk server-side with `@clerk/backend` (`verifyToken`, networked JWKS via `secretKey`).
- **Type isolation:** `/functions` needs its own `tsconfig.json` (`lib: ES2022`, `types: @cloudflare/workers-types`, `exclude: []`) and the root tsconfig must `exclude: ["functions"]`. Otherwise DOM `Request`/`Response`/`Headers` clash with Workers types (`getAll`/`webSocket` errors). Don't add the `WebWorker` lib — it reintroduces a conflicting `Response`.
- **Safe-deploy pattern:** Functions check `env.DB && env.CLERK_SECRET_KEY` → 503 when unset, so an inert binding never breaks the live `wrangler pages deploy`.
