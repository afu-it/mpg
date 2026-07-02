# Progress Tracker — MPG

last_synced_commit: 712c892
context_synced_at: 2026-07-02
context_selftest: skipped (not first-run)

## Current Phase
Pure static directory of **59** Malaysian payment providers, polished, with a
**/learn** section for devs and a **Jalur Gemilang** dark theme. Categorised by
how a merchant accesses them (gateway = integrate, bank/e-wallet = merchant
account, plus BNPL + infrastructure). Sourced fees, popularity-ranked by default.
No server/DB. Deployed (push master → Cloudflare Pages).

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table + **sort dropdown**, `?category=` deep-links), `/compare` (shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- **Default sort = lowest estimated fee** (gated). `src/lib/fees.ts` computes a unit-correct effective cost on a RM100 basket (`parseFeeShape` → `{pct,fixed,floor}`, `effectiveCost`, `gatewayCost` weighted FPX/card/e-wallet 50/30/20). Only gateways publishing comparable official rates are ranked (18/59); single-channel / indicative-`*` / "Contact sales" gateways show **"On request"** below. Table has an **Est. fee / RM100** column (beside Fixed fee). Dropdown: Lowest fees · Popularity · Lowest FPX/card/e-wallet · Name A-Z/Z-A. (See spec 07.)
- **59 gateways** across categories: gateway 40, bank 10, ewallet 1 (TNG), bnpl 7, infrastructure 1 (PayNet). Every entry sourced; Boost + CIMB publish rates, most banks/acquirers are "Contact sales".
- **Categories:** Gateways / Banks / E-wallet / BNPL / Infrastructure (sidebar radio, table/detail/compare badges at text-[8px]).
- **Access model** (`src/lib/access.ts`): each entry shows "Integrate (API/plugin)" or "Merchant account" (detail strip + compare row); /learn hub has a "Which type do you need?" explainer; category filter accepts `?category=` deep-links from /learn.
- **/learn** (spec 06): hub + glossary, integration-flow, ai-agents, checklist. Per-gateway "Copy prompt" from `skill:`.
- **Compare** list cells: short chips pair 2-per-row (lone one centered), long-name chips drop to a full-width centered row, and show-more toggles all providers at once.
- **Logos:** 59 real logos (no monograms). Square symbol-marks for wordmark brands, circle-crop (`logo_round`) for circular marks, all visible on dark (dark-on-transparent recoloured).
- Developer-experience (MCP/webhooks/plugins/dev_docs); Jalur Gemilang theme; Clerk auth (CDN). Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- **Branding (2026-07-02):** real logo (shield + growth arrow, flag colours) as `public/logo.svg` (vector-traced, source of truth); header brand mark + "Malaysia Payment Gateway"; favicon set (ico 48/32/16 + 96 png for Google + SVG), apple-touch-icon, og:image 512. Google search icon updates when Google recrawls (days to weeks). Dark-mode variants: header uses `logo-white.svg`; `favicon.svg` is adaptive (white on dark browser chrome via prefers-color-scheme, coloured on light); coloured logo reserved for future light mode.
- **Contribute (spec 11, 2026-07-02):** `/contribute` page — contribution rules (sourced fees only), 4-step flow, Clerk-gated apply form → prefilled email application (GitHub username + area + message). Repo stays private; AFU invites approved contributors on GitHub; deploy workflow is owner-gated so collaborator pushes never auto-deploy. Linked from footer + /learn.
- **"Help me choose" wizard (spec 09):** `/choose` — 4-question fit-first flow → ranked shortlist (cheapest first) with reasons + Compare deep link. Powered by `src/lib/recommend.ts` (pure, tested); linked from landing/footer/learn. `recommend()` is the shared engine the planned SEO pages (Spec B) reuse.
- **Data API (spec 08):** static `GET /api/gateways.json` + `/api/gateways/<slug>.json` (build-time, no server), documented at `/learn/api`. Each entry carries `est_fee_rm100`/`rankable` so the API matches the site ranking. **MCP server** in `mcp/` (standalone CF Worker, 4 tools over the JSON API) — built + dry-run verified, deployed separately by AFU (`cd mcp && npx wrangler login && npm run deploy`).
- **Programmatic SEO pages (spec 10):** `/best/<profile>` (12 curated need-profiles: cheapest, FPX, cards, e-wallet, DuitNow QR, recurring, no-code, API, online-store, BNPL, plugins, generic) + `/vs/<a>-vs-<b>` (69 curated same-category head-to-heads: top-12 gateways where a side publishes rates + top-4 BNPL). Registry + builders in `src/lib/seo-pages.ts` (pure, 22 vitest) over `recommend()`/`fees.ts`; ItemList + FAQPage JSON-LD; `@astrojs/sitemap` (`sitemap-index.xml`) + `robots.txt`; linked from /learn hub Guides block + footer. Build = 151 pages.

## Current Goal / Next Up
- **Spec B / spec 10 (programmatic SEO pages) DONE 2026-07-02** — see What works. Next options: spec-07 ranking follow-ups (per-RM100 cells on /compare, visual track for BNPL/bank/wallet, FPX-required gating decision); Tier 2 PSP reconsideration; Phase 3 submit-a-gateway.
- API + MCP (spec 08) DONE + live: JSON API at `/api/gateways.json`; MCP Worker deployed at `https://mpg-mcp.afuitdev.workers.dev/mcp` (re-deploy: `cd mcp && npm run deploy`).
- Ranking redesign (spec 07) shipped A→D (default lowest-fee + gating + corrected popularity); **live as of 2026-06-27**. Optional follow-ups: per-RM100 cells on `/compare`; a separate visual track for BNPL/bank/wallet rows.
- Custom domain `malaysiapg.com.my` **LIVE** (2026-07-02): registered at YeahHost → nameservers moved to Cloudflare → CF Pages custom domain + SSL. Clerk **production** live too (`pk_live`, Google + email sign-in). MCP redeployed at the new domain.
- Phase 3: public "submit a gateway" (needs server + DB).

## Open Questions
- Reconsider the deferred Tier 2 international PSPs (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs)? Found + deferred per AFU (Malaysian-focused).
- Tune the ranking knobs if AFU wants: channel weighting (50/30/20), basket size (RM100), or gating rule (currently FPX + card/e-wallet, OR card+e-wallet). Should ranking require FPX (e.g. Fasspay ranks #1 on card+e-wallet but has no FPX)?
- Per-entry access override for acquirer gateways that are "apply first" (currently derived as "Integrate" from category)?
- Backfill `methods` for remaining all-"Contact sales" gateways if/when sourced.

## Reference
- Owner's agent-skills repo: https://github.com/afu-it/malaysia-payment-gateway — maps 1:1 to the `skill:` field; backbone of /learn.
- Discovery research (2026-06-26): full candidate data in spec `context/feature-specs/04-expand-gateways.md`.

## Decisions (safe summary)
- **Contribution model (2026-07-02, spec 11):** repo stays PRIVATE; approved applicants get a GitHub collaborator invite; applications arrive via prefilled email (not a backend form). GitHub free gives no branch protection on private repos, so the deploy job is actor-gated (owner-only) as the production safety net. Public-repo fork+PR was offered and declined.
- Stay **Astro 7 static**; Clerk via CDN. No SSR adapter.
- Keep the whole MY payment landscape: gateways (integrate), banks (merchant account), e-wallets, BNPL. Distinguish purpose via categories + access model rather than excluding any.
- Tier 2 international PSPs SKIPPED (AFU: keep Malaysian-focused); kept as history in spec 04.
- Excluded as non-gateways: EOS Systems, Infinitium, Sinopay, Presto Pay, Merchantrade. Excluded banks (no distinct online gateway): Affin, Bank Islam, Bank Rakyat.
- myIOU removed (dormant). senangPay = "A DOKU Company" (same brand/URL).
- **Payex REJECTED (2026-06-27)** — payex.io is now Xendit Malaysia; Xendit already listed. Do not re-add.
- Logos: square symbol-marks for consistency; recolour dark logos rather than a global white plate (keeps the floating aesthetic).
- **Default table order = lowest estimated effective fee (gated), then On-request rows by popularity** (changed 2026-06-27 from popularity-first; the old `valueScore` mean was unit-broken — see spec 07 audit). Fees never fabricated; third-party values carry trailing `*` and are excluded from the ranking; unconfirmed numbers stay "Contact sales".
- Ranking redesign (spec 07) chosen over a one-line default flip because a 12-agent + adversarial audit proved the old "Lowest fees" mean mixed RM with %, dropped add-ons, and rewarded opacity. Editorial popularity corrected from researched market signals (estimates, not measured).
- **Custom domain + production auth go-live (2026-07-02):** malaysiapg.com.my registered at YeahHost, DNS moved to Cloudflare, connected to CF Pages (SSL). Clerk production instance on `clerk.malaysiapg.com.my` (`pk_live`); sign-in = email code + password + Google (GitHub disabled). GH secret `PUBLIC_CLERK_PUBLISHABLE_KEY` holds `pk_live` for the prod build; local `.env` stays `pk_test` for `npm run dev`. Clerk instance config changes apply at runtime (no site rebuild needed). App `app_3FZd3mHzTBeSp0ufdwueJaORgP2`, prod instance `ins_3FvlB7gGDEHgTNV12mP6YFQQqBM`.
