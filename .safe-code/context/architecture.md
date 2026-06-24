# Architecture — MPG

## Stack
- **Astro 7** (static output) + **Tailwind CSS v4** (`@tailwindcss/vite`, tokens in `src/styles/global.css` via `@theme`).
- **Astro Content Collections** for data: one markdown file per gateway in `src/content/gateways/`, validated by a Zod schema in `src/content.config.ts` (z imported from `zod` directly to avoid Astro's deprecated re-export).
- **Vitest** for the one piece of pure logic: fee parsing (`src/lib/fees.ts`).
- **Auth:** `@clerk/clerk-js` (browser SDK) loaded **from Clerk's CDN** in `src/scripts/auth.ts` — client-side only. Frontend-API host is derived from the publishable key.
- **Hosting:** Cloudflare Pages (static assets). CI: GitHub Actions (`.github/workflows/deploy.yml`) → build + test + `wrangler pages deploy`.
- **Backend (Phase 2):** Cloudflare **Pages Functions** in `/functions` (Workers runtime, separate from the Astro build) + **D1**. Endpoints verify the Clerk session token server-side with `@clerk/backend`. `/functions` has its own `tsconfig.json` (Workers types, no DOM); the root Astro tsconfig excludes it.

## Navigation map (where things live)
- Data: `src/content/gateways/<slug>.md` · schema `src/content.config.ts`
- Pages: `src/pages/index.astro` (landing), `gateways.astro` (table+sidebar), `compare.astro` (side-by-side), `gateway/[slug].astro` (detail), `404.astro`
- Components: `src/components/` (GatewayTable, Sidebar, FeeCell, FeatureBadge, Logo)
- Client scripts: `src/scripts/` (`table.ts` sort/filter/search, `compare.ts`, `auth.ts`)
- Logic: `src/lib/` (`fees.ts` parse/compare, `name.ts` split name+note)
- Layout: `src/layouts/Base.astro` · Logos: `src/assets/logos/<slug>.{svg,png}`
- API (Phase 2): `functions/api/favourites.ts`, `functions/api/compares.ts`; shared `functions/_lib/clerk.ts`; D1 schema `schema.sql`
- Favourites client: `src/scripts/favourites.ts` (loaded in Base) + `src/components/FavButton.astro`; page `src/pages/favourites.astro`

## Invariants
- Content pages are static (`prerender`/static). No SSR adapter (would break — see below).
- Fee values are strings; unknown → `"Contact sales"`, not-offered → `"—"`. Sortable numbers come from `parseFee()`.
- Every gateway: `source` (URL) + `verified_date`. `category: gateway|bnpl`.
- Secrets only in `.env` (gitignored). Publishable key may be embedded client-side (it is public); secret key must never reach the client/repo. `CLERK_SECRET_KEY` lives only as a Cloudflare Pages encrypted secret, read by Functions.
- Phase 2 Functions degrade to HTTP 503 when `DB`/`CLERK_SECRET_KEY` are unset → the static site and a key-less deploy stay safe. All D1 writes are keyed to the Clerk-verified `userId`.

## Known compatibility traps (Astro 7, June 2026)
- `@clerk/astro` peer-deps cap at Astro 6 → does not install/run on Astro 7.
- `@astrojs/cloudflare` dev runtime (workerd) errors on Astro 7 ("return statement…") and on Astro 6 hit Vite-7/Tailwind resolution hell.
- **Resolution:** stay on Astro 7 static + Clerk browser SDK via CDN. Do not reintroduce those adapters until upstream supports Astro 7.

## Built / planned
- Phase 2 favourites — **code complete** (Functions + D1 + client). Awaiting live D1
  provisioning (owner's Cloudflare account: `wrangler d1 create`, run `schema.sql`,
  set `DB` binding + `CLERK_SECRET_KEY`). See `feature-specs/01-save-favourites.md`.
- Phase 3 public gateway submission → still planned; same Functions + D1 backend
  (moderated → curated into `.md`). See `feature-specs/02-submit-gateway.md`.
