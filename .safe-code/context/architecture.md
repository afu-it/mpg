# Architecture — MPG

## Stack
- **Astro 7** (static output) + **Tailwind CSS v4** (`@tailwindcss/vite`, tokens in `src/styles/global.css` via `@theme`).
- **Astro Content Collections** for data: one markdown file per gateway in `src/content/gateways/`, validated by a Zod schema in `src/content.config.ts` (z imported from `zod` directly to avoid Astro's deprecated re-export).
- **Vitest** for the pure logic libs: fee math (`fees.ts`), API shaping (`api.ts`), recommendations (`recommend.ts`), SEO page builders (`seo-pages.ts`).
- **@astrojs/sitemap** (build-time only, static-safe — NOT an SSR adapter) emits `sitemap-index.xml`; `public/robots.txt` points crawlers at it.
- **Auth:** `@clerk/clerk-js` (browser SDK) loaded **from Clerk's CDN** in `src/scripts/auth.ts` — client-side only. Frontend-API host is derived from the publishable key.
- **Hosting:** Cloudflare Pages via **direct Git integration** (project `mpg-site`, since 2026-07-17 spec 19): push `master` → Cloudflare clones, builds (`npm run build` → `dist`) and deploys; PRs get preview deployments. GitHub Actions deploy + all GH secrets REMOVED (TM-001 closed) — no tokens live in GitHub. `PUBLIC_CLERK_PUBLISHABLE_KEY` (public by design) is a Pages build env var. Do NOT re-add a root `wrangler.toml`: its presence makes the Pages build ignore dashboard build command/env vars. Old direct-upload project `mpg` kept domain-less as rollback (delete after stability). Repo is PUBLIC (MIT code / CC BY 4.0 data).

## Navigation map (where things live)
- Data: `src/content/gateways/<slug>.md` · schema `src/content.config.ts`
- Pages: `src/pages/index.astro` (landing), `gateways.astro` (table+sidebar), `compare.astro`, `gateway/[slug].astro` (detail), `choose.astro` (wizard), `learn/*` (hub + guides), `best/[profile].astro` + `vs/[pair].astro` (programmatic SEO, spec 10), `contribute.astro` (Clerk-gated apply, spec 11), `api/*.json.ts` (static JSON API), `404.astro`
- Components: `src/components/` (GatewayTable, Sidebar, FeeCell, FeatureBadge, Logo, LogoCycle, FlowDiagram)
- Client scripts: `src/scripts/` (`table.ts` sort/filter/search, `compare.ts`, `choose.ts`, `auth.ts`, `contribute.ts`, `progress.ts`)
- Logic: `src/lib/` (`fees.ts` fee math + rankable gating, `api.ts` ApiGateway shape, `recommend.ts` needs→shortlist engine, `seo-pages.ts` SEO profile/pair registries + copy builders, `access.ts`, `learn.ts`, `name.ts`, `fpx-banks.ts`)
- Schema extras: `banks`/`methods` (optional string[]), `category: gateway|bank|ewallet|bnpl|infrastructure`. Methods (e-wallets) + banks shown on detail + `/compare`.
- Default table order = lowest estimated blended fee on RM100 (gated `rankable`, spec 07); non-rankable rows follow by popularity. Single source: `src/lib/fees.ts`.
- Layout: `src/layouts/Base.astro` · Logos: `src/assets/logos/<slug>.{svg,png,webp}` (real marks for all 59; monogram fallback in `Logo.astro`)
- Adding a `/best/` SEO profile = one `PROFILES` entry in `src/lib/seo-pages.ts` (+ tests keep it honest); the vs-pair list is derived, not hand-listed.

## Invariants
- Content pages are static (`prerender`/static). No SSR adapter (would break — see below).
- Fee values are strings; unknown → `"Contact sales"`, not-offered → `"—"`. Sortable numbers come from `parseFee()`.
- Every gateway: `source` (URL) + `verified_date`. `category: gateway|bnpl|infrastructure`.
- Secrets only in `.env` (gitignored). Publishable key may be embedded client-side (it is public); secret key must never reach the client/repo.

## Known compatibility traps (Astro 7, June 2026)
- `@clerk/astro` peer-deps cap at Astro 6 → does not install/run on Astro 7.
- `@astrojs/cloudflare` dev runtime (workerd) errors on Astro 7 ("return statement…") and on Astro 6 hit Vite-7/Tailwind resolution hell.
- **Resolution:** stay on Astro 7 static + Clerk browser SDK via CDN. Do not reintroduce those adapters until upstream supports Astro 7.

## Built / planned
- Phase 2 favourites was built then **removed at the owner's request** (see
  `feature-specs/01`, status rejected). No server/DB in the repo — it stays a pure
  static site. Clerk sign-in/up is kept but currently gates no feature.
- Phase 3 public gateway submission → still planned; would need a server + DB
  (revisit Pages Functions + D1 then). See `feature-specs/02-submit-gateway.md`.
