# Changelog — MPG

## [Unreleased]
### Added
- Directory of 34 Malaysian payment gateways (incl. 8 BNPL) with sourced, dated fees.
- Pages: landing `/`, `/gateways` (sort/filter/search + sidebar), `/compare` (side-by-side, shareable), per-gateway detail, custom 404.
- Client-side Clerk authentication (sign up / sign in / user button), dark-themed.
- GitHub Actions auto-deploy to Cloudflare Pages.
- safe-code project brain (`.safe-code/`).
- Phase 2 (code complete, pre-provisioning): save favourite gateways and saved comparisons — Cloudflare Pages Functions + D1, Clerk-verified server-side; ♥ on the table/detail, a `/favourites` page, and "save this comparison" on `/compare`.

### Removed
- Split and Pace (BNPL) — defunct in Malaysia.
