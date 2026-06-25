# MEMORY — temporary audit/architecture notes

_2026-06-25_

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
