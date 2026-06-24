# safe-refactor-code — flagged candidates

_2026-06-24_

## Resolved
- Removed unused dependency `@clerk/clerk-js` (auth loads Clerk from CDN via `window.Clerk`; the npm package was never imported). High-confidence: zero imports.

## Open candidates
- (none)

## Guardrails
- Do not "optimize" by re-adding `@clerk/astro` / `@astrojs/cloudflare` (Astro 7 incompatible).
- Keep `parseFee()` the single source of fee→number logic (used server-side for `data-sort-value` and in compare).
