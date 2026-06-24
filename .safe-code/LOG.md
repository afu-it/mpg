# LOG — safe diary (append above)

## 2026-06-24 · type: feat
Default ranking switched from value → **popularity** (curated `popularity` field; most-used MY gateways first, value as tiebreaker): iPay88, Billplz, toyyibPay, senangPay, Stripe, Fiuu, eGHL, Curlec… Also reviewed the owner's agent-skills repo (github.com/afu-it/malaysia-payment-gateway) and drafted spec 06 (`/learn` section for devs/vibe-coders — PLAN ONLY per owner) built around those skills + their ready agent prompts + security/production checklist. astro check 0 errors; build 42 pages.
plain: Tukar susunan default jadi ikut gateway paling popular dulu, dan plan satu "Learn" section untuk developer (belum bina).

## 2026-06-24 · type: feat
Developer-experience dimension (spec 05, done) — sparked by a Threads thread on MCP/AI-agent support. New schema fields `mcp` (official/community/none, default none), `webhooks`, `plugins[]`, `dev_docs`; data for ~24 gateways via 5 research agents. MCP official = Stripe, Curlec, HitPay, Airwallex; community = Xendit, Bayarcash; rest none. UI: detail Developer-experience section (MCP badge + API-docs link + plugin chips), table MCP badge, compare Webhooks/MCP/Plugins rows. astro check 0 errors; build 42 pages; tests pass.
plain: Tambah info "gateway mana AI-agent/developer friendly" (MCP, webhook, plugin WooCommerce/Shopify, link docs) untuk setiap gateway.

## 2026-06-24 · type: feat
Deep fee-sourcing pass + provenance system. Compare "Other methods" cell → 2-per-row grid with `+N more` toggle; dropped redundant "FPX online banking" from methods (Banks row covers it). Filled many "Contact sales" fees from provider rate cards/docs (CHIP, BCL, Stripe T+7, Fiuu & iPay88 fee PDFs, RinggitPay, ManagePay, Riipay, senangPay BNPL); third-party/indicative figures (eGHL, Revenue Monster, Gkash, Atome, Grab, myIOU, AsiaPay, Curlec settlement) carry a `*` marker + legend on table/compare/detail. toyyibPay RM100 setup/yearly downgraded to Contact sales (cited source was a 404). Remaining all-quote gateways (OxPay/RevPay/Paydee/M1Pay/CommercePay) left as Contact sales — no data anywhere. astro check 0 errors; build 42 pages; tests pass.
plain: Cari harga sebenar setiap gateway dari laman rasmi; yang dari blog ditanda bintang (*); yang memang rahsia kekal "hubungi sales".

## 2026-06-24 · type: feat
Default table order now ranks by value (mean of published FPX/card/e-wallet rates; unknowns sink) instead of alphabetical. Removed the favourites feature at owner's request — deleted /functions, D1 schema, FavButton, favourites client, /favourites page, save-comparison form; uninstalled @clerk/backend + @cloudflare/workers-types; reverted D1 binding + root tsconfig (Clerk sign-in/up kept). Force-fetched logos for 9 logo-less gateways (Google favicon). Cleaned a stray node_modules/.astro left under src/content/gateways. astro check 0 errors; build 42 pages; vitest 11/11.
plain: Susun gateway paling berbaloi di atas, buang fungsi "simpan kegemaran" yang tak dipakai, dan dapatkan logo untuk semua gateway.

## 2026-06-24 · type: feat
Added "Supported banks" + "Other payment methods" dimension (spec 03, done): `banks`/`methods` schema fields, shared PayNet FPX bank list (`src/lib/fpx-banks.ts`), detail + `/compare` UI. Expanded directory (spec 04): +M1Pay, +CardBizPay, +Airwallex, +PayNet (infrastructure category) — all sourced via 4 parallel research agents; backfilled e-wallet methods for 8 existing gateways. OnPay excluded (sales-page SaaS, not an acquirer). 43 pages build; astro check 0 errors; vitest 11/11. Payex + 2C2P flagged as further candidates pending AFU.
plain: Tambah maklumat "bank & e-wallet apa yang disokong" dalam perbandingan, dan tambah 4 gateway baru (M1Pay, CardBizPay, Airwallex, PayNet) — semua bersumber, tiada fee direka.

## 2026-06-24 · type: feat
Phase 2 (save favourites) code-complete: Cloudflare Pages Functions (`/functions/api/favourites`, `/compares`) + D1 schema, Clerk session verified server-side via `@clerk/backend`; client ♥ toggle on table/detail, `/favourites` page, save-comparison on `/compare`. Functions 503 until D1+secret provisioned, so the deploy stays safe. Scoped `functions/tsconfig.json` (Workers types) away from the Astro/DOM root tsconfig. Verified: astro check 0 errors, functions tsc clean, build 39 pages, vitest 11/11. Live activation still needs owner CF account steps (d1 create, run schema.sql, set DB binding + CLERK_SECRET_KEY).
plain: Built the "save your favourite gateways" feature end-to-end. It's ready in code; going live just needs three setup clicks in the Cloudflare account.

## 2026-06-24 · type: feat
Built MPG from scratch: 34 MY payment gateways (sourced fees) → landing + /gateways (sort/filter/search) + /compare + detail + 404; GitHub Actions auto-deploy to Cloudflare Pages; client-side Clerk auth (CDN, dark-themed, WCAG contrast).
plain: Built the whole payment-gateway comparison website, put it online, and added login.

## 2026-06-24 · type: decision
Astro 7 incompatible with @clerk/astro + @astrojs/cloudflare → use Clerk browser SDK via CDN, keep site fully static. Removed defunct Split & Pace BNPL.
plain: Chose a login method that works with our setup; dropped two payment options that had shut down.

## 2026-06-24 · type: chore
Removed unused @clerk/clerk-js dependency (auth loads from CDN). Wired Clerk publishable key into the deploy build. Initialized safe-code project brain.
plain: Tidied an unused package, made login work on the live site, and saved project notes for next time.
