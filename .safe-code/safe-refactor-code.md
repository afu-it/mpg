# safe-refactor-code — flagged candidates

_2026-06-24 (rev 2)_

## Resolved
- Removed unused dependency `@clerk/clerk-js` (auth loads Clerk from CDN via `window.Clerk`; the npm package was never imported). High-confidence: zero imports.

## Open candidates
- (none)

## Guardrails
- Do not "optimize" by re-adding `@clerk/astro` / `@astrojs/cloudflare` (Astro 7 incompatible).
- Keep `parseFee()` the single source of fee→number logic (used server-side for `data-sort-value` and in compare).
- Do not "simplify" `functions/tsconfig.json` into the root tsconfig — Workers vs DOM `Request`/`Response` types must stay isolated (see MEMORY.md). Root tsconfig keeps `exclude: ["functions"]`.
- Keep `functions/_lib/clerk.ts` as the single place that verifies Clerk tokens + the `isReady`/503 guard; both API routes reuse it.
- Keep `src/lib/fpx-banks.ts` as the single FPX bank source — never inline/duplicate the list in a gateway `.md` or component.
