# MEMORY — temporary audit/architecture notes

_2026-06-24_

## Astro 7 ecosystem traps (June 2026)
- `@clerk/astro` peer-deps cap at Astro ≤6 → won't install/run on Astro 7.
- `@astrojs/cloudflare` dev (workerd) breaks on Astro 7 ("return statement…"); downgrading to Astro 6 hit Vite-7 + `@tailwindcss/vite` resolution hell.
- **Working combo:** Astro 7 static + `@clerk/clerk-js` via CDN hotload + Tailwind v4 (`@tailwindcss/vite`). No SSR adapter.
- Dev gotcha: `astro dev` daemonizes → stale daemons serve old code; use `CHOKIDAR_USEPOLLING=true` on the NTFS mount; hard-refresh after client-script edits.

## Banks + methods dimension (2026-06-24)
- FPX participating banks are a national PayNet standard → stored ONCE in `src/lib/fpx-banks.ts` (B2C list, sourced PayNet KB + FI-code PDF), shown for any `fpx` gateway. Do NOT duplicate per-gateway bank lists.
- `methods` (e-wallets/other rails) DO differ per gateway → sourced per file. Generic "e-wallets" mentions (asiapay/payhalal/xendit in listicles) were too vague to map to brands → left empty rather than guessed.
- Research provenance: sitegiant comparison + easystore + rebrand + justsimple + veecotech (sitegiant 2026 blog was Cloudflare-blocked). CardBizPay + Airwallex publish real rates; M1Pay = contact-sales. OnPay is a sales-page SaaS (not an acquirer) → excluded. PayNet = infrastructure entry.

## Phase 2/3 backend (Phase 2 built 2026-06-24)
- Cloudflare **Pages Functions** (`/functions/api/*`) + **D1**, kept separate from the static Astro build. Verify Clerk sessions server-side with `@clerk/backend` (`verifyToken`, networked JWKS via `secretKey`).
- **Type isolation:** `/functions` needs its own `tsconfig.json` (`lib: ES2022`, `types: @cloudflare/workers-types`, `exclude: []`) and the root tsconfig must `exclude: ["functions"]`. Otherwise the DOM `Request`/`Response`/`Headers` clash with Workers types (`getAll`/`webSocket` errors). Don't add the `WebWorker` lib — it reintroduces conflicting `Response`.
- **Safe-deploy pattern:** Functions check `env.DB && env.CLERK_SECRET_KEY` → 503 when unset, so committing the inert binding never breaks the live `wrangler pages deploy`.
- Pages picks up `/functions` at the repo root automatically; `@clerk/backend` is bundled because it's a normal dependency installed by `npm ci`.
