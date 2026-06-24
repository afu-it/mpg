# Changelog — MPG

## [Unreleased]
### Added
- Directory of 34 Malaysian payment gateways (incl. 8 BNPL) with sourced, dated fees.
- Pages: landing `/`, `/gateways` (sort/filter/search + sidebar), `/compare` (side-by-side, shareable), per-gateway detail, custom 404.
- Client-side Clerk authentication (sign up / sign in / user button), dark-themed.
- GitHub Actions auto-deploy to Cloudflare Pages.
- safe-code project brain (`.safe-code/`).
- Supported-banks (via FPX) + Other-payment-methods (e-wallets) on detail + `/compare`.
- Default gateway table ranked by value (lowest core fees) instead of alphabetical.
- More gateways: M1Pay, CardBizPay, Airwallex; PayNet as infrastructure. Logos for all entries.
- Deeper fee data sourced from provider rate cards/docs; third-party/indicative rates marked with `*` (legend on table/compare/detail).
- Compare "Other methods" cell shows 2 chips with a `+N more` toggle.

### Removed
- Split and Pace (BNPL) — defunct in Malaysia.
