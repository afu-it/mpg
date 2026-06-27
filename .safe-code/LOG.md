# LOG — safe diary (append above)

## 2026-06-27 · type: feat
**Ranking redesign A→D** (spec 07), after AFU approved the full rework. A 12-agent + adversarial audit (workflow) proved the old "Lowest fees" `valueScore` (mean of first-%-match per channel) was broken on 3 counts: it averaged flat RM against percentages, dropped "+RM" add-ons, and rewarded opaque/single-channel disclosure (TNG ranked #1 on one 0.5% figure; Stripe ranked last for publishing honest pricing; 34/59 had no comparable score). Rewrote `src/lib/fees.ts` with TDD (28 vitest): `parseFeeShape` → `{pct,fixed,floor,known,indicative}`, `effectiveCost`/`effectiveCostAt` (cost = max(ticket·pct, floor) + fixed), and `gatewayCost` (blended FPX/card/e-wallet 50/30/20 on RM100, with eligibility gating). New default sort = lowest effective fee among the 18 rankable gateways; single-channel / indicative-`*` / "Contact sales" gateways move to an "On request" zone below. Added an "Est. fee / RM100" column (beside Fixed fee) + Lowest FPX/Card/E-wallet sort options; detail page + compare highlight use the same cost. Also corrected editorial popularity on 34 `.md` files from researched market signals (filled 16 silently-0 incl. listed RevPay/ManagePay; Fiuu 86→90; Billplz/toyyibPay/senangPay/Stripe/Curlec/Boost deflated). astro check 0, build 68 pages, vitest 28/28.
plain: Baiki cara website kira "yuran termurah" — dulu salah (campur RM dengan %, bagi pahala pada yang sorok harga). Sekarang kira kos sebenar atas jualan RM100, susun yang termurah dulu, yang tak published harga letak "On request". Tambah column "Est. fee/RM100" + sort ikut FPX/kad/e-wallet. Betulkan juga nombor "popularity" ikut data pasaran sebenar.

## 2026-06-27 · type: decision
**Payex rejected** — AFU found payex.io now redirects/rebrands to Xendit Malaysia (verified: page title "Payex is now Xendit"). Xendit is already listed with sourced data; no Payex content file ever existed (it was only a `.safe-code` open question). The earlier "Maybank-owned" note in spec 04 was inaccurate. Closed the open question so it is not re-litigated.
plain: Payex sebenarnya dah jadi Xendit (yang memang dah ada dalam senarai), jadi tak payah tambah — tutup soalan tu.

## 2026-06-27 · type: chore
Resumed via `/safe-code --continue` (prior session was `completed`, repo verified green). **Pushed the 6 local commits** (`14fe9c8..d6ccd9c`) to origin/master at AFU's go-ahead → GitHub Actions run 28278599282 succeeded in 39s → the 59-gateway expansion + logo overhaul + Bank/E-wallet categories went **live** (had been local-only; live site was stale at 38).
plain: Hantar kerja besar yang dah siap (59 gateway + logo + kategori) ke server — sekarang dah naik live.

## 2026-06-26 · type: feat
Big expansion session. (1) Liveness + social-recency sweep on all 38 gateways via multi-agent workflows: removed dormant **myIOU** (site myiou.com.my = NXDOMAIN, socials dead since ~Jun 2023); all others confirmed live + active. senangPay noted as "A DOKU Company". (2) Deep discovery (363 raw → 185 deduped, BNM-corroborated) → added **22 gateways** across Tier 1 local acquirers (Boost w/ published rates, Ampersand Pay, Axaipay, Fasspay, PayCools, gomobi, SecurePay, SwiF, bayarlah, J&C Pacific, FINEXUS), Tier 3 (TNG eWallet), Tier 4 banks (Maybank2u Pay, CIMB w/ published card rates, Public Bank, RHB, Hong Leong, AmBank, Alliance, UOB, OCBC, HSBC). Excluded Affin/Bank Islam/Bank Rakyat (no distinct online gateway) + non-gateways (EOS, Infinitium, Sinopay, Presto Pay, Merchantrade). Skipped Tier 2 international PSPs per AFU. Directory 38 → **59**. (3) New **Bank** + **E-wallet** categories (schema, sidebar filter, badges, compare). (4) **Access model** (lib/access.ts): per-entry Integrate-vs-Merchant-account indicator (detail + compare) + /learn "Which type do you need?" block + `?category=` deep-links. (5) **Sort dropdown** on /gateways (Popularity/Lowest fees/Name). (6) Compare list cells: lone-badge centering, wide chips drop to full-width row, global show-more across providers. (7) **Logo overhaul:** fee-verify-grade QA of all 59 logos via workflow; fixed/replaced 30+ (dark-on-transparent recolored, 16px favicons → real marks, banners removed, wide wordmarks squared to symbol marks, 8 circle-crops); official art for J&C/Fasspay/RHB/Public Bank/HLB. astro check 0, build 68 pages, vitest 11/11.
plain: Tambah 22 gateway baru (acquirer tempatan + bank + TNG), buang myIOU yang dah mati, tambah kategori Bank & E-wallet, butang sort, penjelasan "jenis mana untuk kau" dalam /learn, dan baiki semua logo supaya kemas & sama saiz.

## 2026-06-26 · type: chore
Hygiene pass (safe-code Audit profile). Removed a stray 1.2M vite/astro build cache nested in the source tree at `src/pages/{node_modules,.astro}` (untracked + gitignored, regenerates) — a recurrence of the `src/content/gateways` stray from an earlier session; root cause is `astro dev` + `CHOKIDAR_USEPOLLING` on the NTFS mount writing its vite deps cache relative to the wrong cwd. Dead-code audit clean (all 7 components, 5 scripts, 4 lib files referenced); agent-config trust audit clean (no `.claude/`, no `.mcp.json`; CLAUDE/GEMINI/copilot/cursor bridges are pointer-only; `deploy.yml` uses GitHub secrets; no committed keys; no tracked `.env`); orphan-logo check clean (38 logos ↔ 38 gateways, 1:1). Context brain verified fresh. astro check 0 errors, build 47 pages, vitest 11/11. No tracked files changed by the cleanup → docs commit only.
plain: Bersihkan sampah cache yang tersilap masuk dalam folder kod, semak tiada kod mati / kunci rahsia bocor, dan pastikan website masih build elok (47 page, semua test lulus).

## 2026-06-25 · type: feat
Built the `/learn` section (spec 06, done): hub + glossary, safe integration-flow, AI-agents (skills install + MCP/API explainer), production checklist. Per-gateway "Copy prompt" button auto-generated from `skill:` (`src/lib/learn.ts`). Two auto-aligned ASCII flow diagrams (`FlowDiagram.astro`) for payment-flow + setup-flow. Top NProgress-style loading bar on navigation (`scripts/progress.ts`). Logo-cycle Browse-gateways button (`LogoCycle.astro`). astro check 0, build 47 pages, vitest 11/11.
plain: Tambah bahagian "Learn" untuk developer (cara integrate, glossary, prompt AI sedia-salin, checklist), diagram aliran, dan bar loading kat atas.

## 2026-06-25 · type: style
Re-themed to **Jalur Gemilang on dark**: blue primary buttons (deep flag blue + white text), lighter flag-blue accent `#4f86f5` (links/focus), brand red/yellow tokens, surface `#0a0a0a` / panel `#141416`. FPX (`#6f83cc`) + DuitNow QR (`#e61f65`) brand-coloured labels. Logo system: rounded corners for square logos, `logo_round` circle-crop for circular marks; refreshed bizappay/payhalal/ringgitpay/asiapay/revenue-monster + NTT DATA logo. Removed em-dashes from ALL prose site-wide (house style; standalone `"—"` fee placeholder kept).
plain: Tukar tema ikut warna bendera Malaysia (biru utama), warnakan label FPX/DuitNow, kemaskan logo (bulat/segi empat), dan buang semua em-dash dalam ayat.

## 2026-06-25 · type: fix
Corrected iPay88: site is dead (502), now NTT DATA Payment Services / ADAPTIS (consolidates iPay88 + eGHL). Renamed to "NTTDataPay (formerly iPay88)", website → my.nttdatapay.com, kept slug `/gateway/ipay88`. ADAPTIS publishes no rates → all fees set to "Contact sales" (legacy iPay88 rates NOT reused, nothing fabricated). eGHL verified still live (eghl.my) → kept separate, noted as now under NTT DATA.
plain: Betulkan iPay88 (dah tutup, jadi NTT DATA) — buang harga lama, letak "hubungi sales"; eGHL masih hidup, cuma nota dia bawah NTT DATA sekarang.

## 2026-06-25 · type: chore
Saved + committed (65e192b code, then docs) and **pushed to master** at AFU's request → GitHub Actions → Cloudflare Pages deploy triggered. Atomic split consolidated to code + docs commits (the session's changes cross-cut many shared files — em-dash + theme + colour + logo edits in the same .astro/.md files — so feature-level hunk splitting wasn't clean).
plain: Simpan, commit, dan push ke GitHub — website live dikemaskini automatik.

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
