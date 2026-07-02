---
status: done   # suggested | approved | in-progress | done | rejected
created: 2026-07-02
---

> **DONE 2026-07-02** (same-day build). `src/lib/seo-pages.ts` (+22 vitest) +
> `src/pages/best/[profile].astro` (12 pages) + `src/pages/vs/[pair].astro`
> (69 pages) + `@astrojs/sitemap` + `public/robots.txt` + /learn hub Guides
> block + footer link. vitest 64/64, astro check 0, build 151 pages.
> Manual browser smoke left to AFU (house rule: no chrome-devtools unless asked).

# Spec B — Programmatic SEO pages (`/best/*` + `/vs/*`)

Approved 2026-07-02 (AFU picked it as the next unit on resume). Pair of spec 09:
pre-renders `recommend()` results so search traffic lands on answer pages instead
of the bare directory. Fully static, zero backend, reuses existing engines only.

## Goal
Rank on Google for high-intent Malay(sian) merchant searches ("cheapest payment
gateway Malaysia", "toyyibPay vs Billplz", "payment gateway FPX") by pre-rendering
the same recommendations `/choose` computes, plus head-to-head comparison pages.
Content is generated from sourced data at build time, so pages never contradict
the table, API, wizard, or MCP tools.

## Scope (in / out)
IN:
- **Need-profile pages** `/best/<profile>/` — one page per curated need profile,
  each mapping to a `Needs` object fed to `recommendOrClosest()` (limit ~8).
- **Head-to-head pages** `/vs/<a>-vs-<b>/` — one page per curated gateway pair,
  reusing the compare data accessors (`api.ts` / `fees.ts` / `access.ts`).
- New pure lib `src/lib/seo-pages.ts`: profile registry + pair registry + slug
  helpers + page-copy builders. Unit-tested (vitest).
- `@astrojs/sitemap` integration + `public/robots.txt` pointing at the sitemap.
- JSON-LD: `ItemList` on profile pages, `FAQPage` where the page carries Q&A copy.
- Hub links: a "Guides" block on `/learn` hub + footer link + cross-links
  (profile page → /choose, /compare?ids=, gateway detail; detail page untouched).
OUT (YAGNI):
- No auto-generated pages for ALL 1,711 possible pairs (thin/doorway-page risk).
- No per-page hand-written prose beyond the templated copy builders.
- No BM translation track (site is EN; revisit later as its own unit).
- No changes to `recommend.ts`, ranking math, or the wizard.

## Page inventory (curated, build-time)

### `/best/<profile>/` — 12 profiles v1
| slug | Needs | intent |
|---|---|---|
| `payment-gateway-malaysia` | `{}` | generic head term (overall ranked list) |
| `cheapest-payment-gateway-malaysia` | `{}` + rankable-only emphasis | price hunters |
| `payment-gateway-fpx` | `{channels:["fpx"]}` | FPX requirement |
| `payment-gateway-credit-card` | `{channels:["card"]}` | card acceptance |
| `payment-gateway-ewallet` | `{channels:["ewallet"]}` | TNG/Grab/Boost acceptance |
| `payment-gateway-duitnow-qr` | `{channels:["duitnowqr"]}` | QR at checkout |
| `payment-gateway-recurring` | `{recurring:true}` | subscriptions/SaaS |
| `payment-gateway-no-code` | `{noCode:true}` | payment links, no dev |
| `payment-gateway-api` | `{developer:true}` | developer integrations |
| `payment-gateway-online-store` | `{noCode:true, channels:["fpx"]}` | small e-commerce |
| `bnpl-malaysia` | `{access:"bnpl"}` | BNPL providers |
| `payment-gateway-ecommerce-plugins` | `{developer:true}` + plugin-having filter in copy | Woo/Shopify sellers |

Profile registry entries carry: slug, `Needs`, H1, meta title/description,
intro copy template, and 2-3 FAQ Q&As (templated, data-driven — e.g. "What is
the cheapest gateway with FPX?" answered from the actual #1 result).

### `/vs/<a>-vs-<b>/` — curated pairs, ~40-60 pages v1
Pair rule (data-driven, not hand-listed): pairs within the **same category**
among the most-searched entries — top 12 `gateway`-category entries by
popularity (66 pairs max, trimmed to pairs where at least one side is rankable
or both are top-8 popular) + all `bnpl` pairs among the 7 BNPL providers (21)
is too many; take BNPL top 4 (6 pairs). Target ≈ 50-65 total. Slug = alphabetical
order (`billplz-vs-toyyibpay`), one canonical page per pair (no duplicate B-vs-A;
optional redirect handled by canonical URL only).

Each vs page shows: both logos/names/badges, est fee per RM100 (or On request),
fee table rows (FPX/card/e-wallet/DuitNow QR/setup/settlement) with the existing
`*`/Contact-sales semantics, feature + access + developer-experience rows,
"when to pick X / when to pick Y" templated verdict derived from data (cheaper
side, no-code side, MCP side), links to both detail pages and
`/compare?ids=a,b` for the full matrix.

## Approach
- `src/lib/seo-pages.ts` — pure + tested:
  - `PROFILES: ProfileDef[]` (registry above), `profilePath(slug)`
  - `buildProfilePage(gateways, def)` → `{matches, relaxed, faqs, jsonld}`
  - `vsPairs(gateways)` → deterministic curated pair list (rule above)
  - `buildVsPage(a, b)` → row model + verdict bullets (no fee math of its own —
    everything through `fees.ts` / `api.ts` accessors)
- `src/pages/best/[profile].astro` + `src/pages/vs/[pair].astro` with
  `getStaticPaths()` over the registries. Prerendered; zero client JS beyond the
  site's standard scripts.
- Copy builders never fabricate: fees render through the same formatting used by
  the table/compare (official / `*` third-party / "Contact sales"); "cheapest"
  claims only over `rankable` entries; On-request entries listed separately.
- House style: **no em-dashes in prose**; the standalone `—` fee placeholder is data.
- `@astrojs/sitemap` added to `astro.config.mjs` (build-time only, safe with
  Astro 7 static; NOT an SSR adapter). `public/robots.txt` = allow all +
  `Sitemap: https://malaysiapg.com.my/sitemap-index.xml`.
- `Base.astro` gains optional `canonical` prop only if needed for pair pages;
  otherwise untouched.

## Testing / verification
- Vitest on `seo-pages.ts`: profile registry integrity (slugs unique/url-safe),
  every profile yields ≥1 match on current data, pair rule determinism +
  alphabetical slugs + no dupes, verdict builder picks the cheaper rankable side,
  copy builders respect `*`/Contact-sales semantics.
- `astro check` 0 errors; `npm run build` green; page count grows by
  ~12 + ~50-65 + sitemap; spot-read 2-3 generated HTML files for sane copy.
- No chrome-devtools verification unless AFU asks (house rule).

## Acceptance criteria
- `/best/*` (12) and `/vs/*` (~50-65) build statically with unique, data-true
  title/meta/H1/copy; JSON-LD present; sitemap + robots.txt served.
- All ranked claims match `/gateways`, `/api/gateways.json`, and `/choose`
  (single-source engines only).
- Linked from /learn hub + footer; no orphan pages.
- astro check 0, build green, vitest green (existing 42 + new suite).

## Notes
- If AFU later wants BM pages, that is a separate spec (i18n route track).
- Profile list is a registry: adding a landing page later = one entry + tests.
- Ranking caveat carried from spec 07: only 18/59 publish comparable rates, so
  most profile pages will show a short ranked list + an "on request" tail. That
  is honest and intended.
