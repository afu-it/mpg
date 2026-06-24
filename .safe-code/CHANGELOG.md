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

### Removed
- Split and Pace (BNPL) — defunct in Malaysia.
