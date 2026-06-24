# MEMORY — temporary audit/architecture notes

_2026-06-24_

## Astro 7 ecosystem traps (June 2026)
- `@clerk/astro` peer-deps cap at Astro ≤6 → won't install/run on Astro 7.
- `@astrojs/cloudflare` dev (workerd) breaks on Astro 7 ("return statement…"); downgrading to Astro 6 hit Vite-7 + `@tailwindcss/vite` resolution hell.
- **Working combo:** Astro 7 static + `@clerk/clerk-js` via CDN hotload + Tailwind v4 (`@tailwindcss/vite`). No SSR adapter.
- Dev gotcha: `astro dev` daemonizes → stale daemons serve old code; use `CHOKIDAR_USEPOLLING=true` on the NTFS mount; hard-refresh after client-script edits.

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
