# Architecture — MPG

## Stack
- **Astro 7** (static output) + **Tailwind CSS v4** (`@tailwindcss/vite`, tokens in `src/styles/global.css` via `@theme`).
- **Astro Content Collections** for data: one markdown file per gateway in `src/content/gateways/`, validated by a Zod schema in `src/content.config.ts` (z imported from `zod` directly to avoid Astro's deprecated re-export).
- **Vitest** for the one piece of pure logic: fee parsing (`src/lib/fees.ts`).
- **Auth:** `@clerk/clerk-js` (browser SDK) loaded **from Clerk's CDN** in `src/scripts/auth.ts` — client-side only. Frontend-API host is derived from the publishable key.
- **Hosting:** Cloudflare Pages (static assets). CI: GitHub Actions (`.github/workflows/deploy.yml`) → build + test + `wrangler pages deploy`.

## Navigation map (where things live)
- Data: `src/content/gateways/<slug>.md` · schema `src/content.config.ts`
- Pages: `src/pages/index.astro` (landing), `gateways.astro` (table+sidebar), `compare.astro` (side-by-side), `gateway/[slug].astro` (detail), `404.astro`
- Components: `src/components/` (GatewayTable, Sidebar, FeeCell, FeatureBadge, Logo)
- Client scripts: `src/scripts/` (`table.ts` sort/filter/search, `compare.ts`, `auth.ts`)
- Logic: `src/lib/` (`fees.ts` parse/compare, `name.ts` split name+note)
- Layout: `src/layouts/Base.astro` · Logos: `src/assets/logos/<slug>.{svg,png}`

## Invariants
- Content pages are static (`prerender`/static). No SSR adapter (would break — see below).
- Fee values are strings; unknown → `"Contact sales"`, not-offered → `"—"`. Sortable numbers come from `parseFee()`.
- Every gateway: `source` (URL) + `verified_date`. `category: gateway|bnpl`.
- Secrets only in `.env` (gitignored). Publishable key may be embedded client-side (it is public); secret key must never reach the client/repo.

## Known compatibility traps (Astro 7, June 2026)
- `@clerk/astro` peer-deps cap at Astro 6 → does not install/run on Astro 7.
- `@astrojs/cloudflare` dev runtime (workerd) errors on Astro 7 ("return statement…") and on Astro 6 hit Vite-7/Tailwind resolution hell.
- **Resolution:** stay on Astro 7 static + Clerk browser SDK via CDN. Do not reintroduce those adapters until upstream supports Astro 7.

## Planned (not built)
- Phase 2 favourites + Phase 3 public gateway submission → need server + DB.
  Plan: **Cloudflare Pages Functions + D1**, kept separate from the static
  Astro build (since the Astro CF adapter dev is broken).
