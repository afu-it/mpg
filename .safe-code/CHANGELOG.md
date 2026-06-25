# Changelog — MPG

## [Unreleased]
### Added
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
- Re-themed to a Jalur Gemilang (Malaysia flag) dark palette: blue primary buttons, lighter flag-blue accent, brand red/yellow accents, deeper surface `#0a0a0a` / panel `#141416`. FPX and DuitNow QR labels use their brand colours.
- Refreshed logos: NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster.
- Removed em-dashes from all prose copy (house style).

### Fixed
- iPay88 corrected to NTTDataPay (formerly iPay88): the iPay88 site is retired, now NTT DATA Payment Services / ADAPTIS. Fees set to quote-only (ADAPTIS publishes none). eGHL noted as now under NTT DATA.

### Removed
- Split and Pace (BNPL) — defunct in Malaysia.
