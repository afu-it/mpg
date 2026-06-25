# Progress Tracker — MPG

last_synced_commit: 65e192b
context_synced_at: 2026-06-25
context_selftest: skipped (not first-run)

## Current Phase
Pure static directory, polished, with a **/learn** section for devs and a
**Jalur Gemilang (Malaysia flag)** dark theme. 38 entries with sourced fees,
e-wallet methods, FPX banks, developer-experience dimension; popularity-ranked
by default. No server/DB. Now deployed (pushed to master → Cloudflare Pages).

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table, popularity-ranked), `/compare` (shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- **/learn** (spec 06, done): hub + `/learn/glossary`, `/learn/integration-flow` (safe flow + ASCII payment-flow diagram), `/learn/ai-agents` (skills install + MCP/API explainer + ASCII setup-flow diagram), `/learn/checklist`. Per-gateway "Copy prompt" button auto-generated from `skill:` (`src/lib/learn.ts`). "Learn" in nav.
- 38 entries (incl. 8 BNPL + PayNet infrastructure) with sourced fees; every entry has a logo. Per-gateway e-wallet methods + FPX banks. Developer-experience (MCP/webhooks/plugins/dev_docs).
- **Jalur Gemilang theme:** blue primary buttons (deep flag blue + white text), lighter flag-blue accent `#4f86f5` for links/focus, brand red/yellow tokens, surface `#0a0a0a` / panel `#141416`. FPX (`#6f83cc`) + DuitNow QR (`#e61f65`) brand-coloured labels. Top NProgress-style loading bar (`#001bcf`). Logo-cycle Browse-gateways button. (See `ui-context.md`.)
- **Logo system:** square logos rounded corners; `logo_round` crop-to-circle for circular marks (bizappay, payhalal, ringgitpay, myiou, paydee, riipay, senangpay).
- All prose is em-dash-free (house style).
- Clerk sign up / sign in / UserButton (CDN), themed blue. Auto-deploy: push master → GitHub Actions → Cloudflare Pages.

## Current Goal / Next Up
- Custom domain: owner bought a domain → connect to the CF Pages project + switch Clerk to `pk_live` (production instance) when going live.
- Decide whether to add Payex + 2C2P (spec 04).
- Phase 3: public "submit a gateway" (would need a server + DB; revisit then).
- Optional: liveness pass on all gateway websites (iPay88 was found dead → NTT DATA; others may have shifted).

## Open Questions
- Add **Payex** (payex.io, Maybank-owned) and/or **2C2P**? (spec 04, awaiting AFU.)
- Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, …) once specific e-wallet lists are sourced.
- Remaining all-"Contact sales" gateways are genuinely quote-only — leave unless they publish.

## Reference
- Owner's agent-skills repo: https://github.com/afu-it/malaysia-payment-gateway — maps 1:1 to our `skill:` field; backbone of the `/learn` section.
- Brand assets used this session were provided by the owner (NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster logos).

## Decisions (safe summary)
- Stay on **Astro 7 static**; auth via Clerk **browser SDK (CDN)**. No SSR adapter.
- `/learn` built as **hub + sub-pages**, **English only**, copy-prompt **auto-generated from `skill:`**.
- Theme = **Jalur Gemilang on dark**: blue is primary (buttons); accent is a lightened flag-blue (pure `#0031a0` fails text contrast on dark, so deep blue is fills-only); red/yellow are accents; per-brand label colours (FPX, DuitNow) kept readable on dark.
- **No em-dashes in prose** (AFU: reads as AI). Standalone `"—"` fee placeholder stays (data).
- **iPay88 retired → NTTDataPay (formerly iPay88):** ipay88.com is down; now NTT DATA Payment Services / ADAPTIS (consolidates iPay88 + eGHL). Kept slug `/gateway/ipay88`. ADAPTIS publishes no rates → all fees "Contact sales" (legacy iPay88 rates NOT reused). eGHL still live under own brand (eghl.my) → kept separate, noted NTT DATA link.
- Default table order = popularity, then value, then name (unchanged).
- Fees never fabricated; third-party values carry trailing `*`.
