# Changelog — MPG

## [Unreleased]
### Added
- **Custom domain**: the site is now live at `https://malaysiapg.com.my` (Cloudflare Pages + SSL); `mpg-1hw.pages.dev` remains a working alias. Astro `site` set for canonical URLs / SEO.
- **Production authentication**: Clerk switched to a production instance on `clerk.malaysiapg.com.my` (`pk_live`), with email code + password and Google sign-in (GitHub disabled).
- **"Help me choose" wizard** (`/choose`): a 4-question, fit-first flow (integration style, channels, recurring, onboarding type) that returns a ranked shortlist of matching gateways, cheapest first, with reasons and a "Compare these" deep link. Powered by a new pure `recommend()` engine (reused by the planned SEO pages). Linked from the landing page, footer, and `/learn`.
- **Static JSON API**: `GET /api/gateways.json` (the whole directory, machine-readable, with `est_fee_rm100`, `rankable`, `verified_date`, `source` and a disclaimer) and `GET /api/gateways/<slug>.json` (one gateway). Built at deploy time — no server. Documented at `/learn/api`.
- **MCP server** (`mcp/`, a standalone Cloudflare Worker — deploy separately) so AI coding agents can query the directory live: `list_gateways`, `get_gateway`, `compare_gateways`, `recommend_gateway`.
- **Est. fee / RM100** column on the gateway table (a unit-correct blended cost on a RM100 transaction, beside Fixed fee), plus **Lowest FPX / Card / E-wallet** per-channel sort options. Detail pages show the same "Est. fee on a RM100 sale".
- 22 more gateways (directory now 59): local acquirers (Boost, Ampersand Pay, Axaipay, Fasspay, PayCools, gomobi, SecurePay, SwiF, bayarlah, J&C Pacific, FINEXUS), Touch 'n Go eWallet, and 10 bank gateways (Maybank2u Pay, CIMB e-Commerce, Public Bank, RHB, Hong Leong, AmBank, Alliance, UOB, OCBC OneCollect, HSBC Omni Collect). Boost + CIMB publish rates; the rest mostly "Contact sales".
- New categories **Bank** and **E-wallet** (sidebar filter, table/detail/compare badges).
- Access model: per-entry "Integrate (API/plugin)" vs "Merchant account" indicator (detail + compare), a /learn "Which type do you need?" explainer, and `/gateways?category=` deep-links.
- Sort dropdown on /gateways (Popularity / Lowest fees / Name A-Z / Name Z-A).
- Compare method/plugin/bank cells: lone badge centered, long-name chips drop to a full-width row, and show-more toggles all providers at once.
- Directory of 34 Malaysian payment gateways (incl. 8 BNPL) with sourced, dated fees.
- Pages: landing `/`, `/gateways` (sort/filter/search + sidebar), `/compare` (side-by-side, shareable), per-gateway detail, custom 404.
- Client-side Clerk authentication (sign up / sign in / user button), dark-themed.
- GitHub Actions auto-deploy to Cloudflare Pages.
- safe-code project brain (`.safe-code/`).
- Supported-banks (via FPX) + Other-payment-methods (e-wallets) on detail + `/compare`.
- Default gateway table ranked by popularity (most-used in Malaysia first), then best value.
- More gateways: M1Pay, CardBizPay, Airwallex; PayNet as infrastructure. Logos for all entries.
- Deeper fee data sourced from provider rate cards/docs; third-party/indicative rates marked with `*` (legend on table/compare/detail).
- Compare "Other methods" cell shows 2 chips with a `+N more` toggle.
- Developer-experience dimension: MCP/AI-agent support, webhooks, e-commerce plugins, API-docs link (detail section, table MCP badge, compare rows).
- `/learn` section for devs/vibe-coders: hub + glossary, safe integration flow, build-with-AI-agents (skills install + MCP/API explainer), production checklist; ASCII payment-flow and setup-flow diagrams; per-gateway "Copy prompt" button auto-generated from `skill:`.
- Top NProgress-style loading bar on page navigation.
- Logo-cycle animation in the Browse-gateways button.
- Per-gateway logo shape handling: rounded corners for square logos, circle-crop (`logo_round`) for circular marks.

### Changed
- **Default sort is now lowest estimated fee** (was popularity). A researched audit found the old "Lowest fees" mean mixed flat ringgit with percentages, dropped "+RM" add-ons, and rewarded gateways that hid pricing. Replaced with a unit-correct effective cost (RM100 basket, FPX/card/e-wallet weighted 50/30/20); only gateways with comparable published rates are ranked, the rest show "On request" below.
- Corrected editorial **popularity** from researched market signals: filled 16 gateways that were silently unranked (incl. listed companies RevPay, ManagePay), and adjusted brand-halo over/under-rates (Fiuu up; Billplz, toyyibPay, senangPay, Stripe, Curlec, Boost down).
- Logo quality overhaul: every logo QA'd on the dark theme; 30+ fixed (dark-on-transparent recoloured, tiny favicons replaced with real brand marks, marketing banners removed, wide wordmarks cropped to square symbol marks), 8 circular marks circle-cropped. Now 59 real logos, no monogram fallbacks.
- Re-themed to a Jalur Gemilang (Malaysia flag) dark palette: blue primary buttons, lighter flag-blue accent, brand red/yellow accents, deeper surface `#0a0a0a` / panel `#141416`. FPX and DuitNow QR labels use their brand colours.
- Refreshed logos: NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster.
- Removed em-dashes from all prose copy (house style).

### Fixed
- iPay88 corrected to NTTDataPay (formerly iPay88): the iPay88 site is retired, now NTT DATA Payment Services / ADAPTIS. Fees set to quote-only (ADAPTIS publishes none). eGHL noted as now under NTT DATA.

### Removed
- myIOU (BNPL) — dormant: domain dead (NXDOMAIN), socials quiet since ~Jun 2023.
- Split and Pace (BNPL) — defunct in Malaysia.
