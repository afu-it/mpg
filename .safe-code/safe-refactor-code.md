# safe-refactor-code — flagged candidates

_2026-06-24 (rev 5)_

## Resolved
- Removed unused dependency `@clerk/clerk-js` (auth loads Clerk from CDN via `window.Clerk`).
- Removed favourites feature + its deps (`@clerk/backend`, `@cloudflare/workers-types`) and the whole `/functions` tree — owner's call. Repo is pure static again.

## Open candidates
- (none) — Clerk sign-in/up is intentionally kept (owner's call) for a future account feature, even though favourites was removed. Do NOT flag it as dead.

## Guardrails
- Do not "optimize" by re-adding `@clerk/astro` / `@astrojs/cloudflare` (Astro 7 incompatible).
- Keep `parseFee()` the single source of fee→number logic (used by `valueScore`, `data-sort-value`, compare).
- Keep `src/lib/fpx-banks.ts` as the single FPX bank source — never inline/duplicate the list in a gateway `.md` or component.
- Never strip the trailing ` *` from a fee value as "cleanup" — it marks third-party/indicative data and is explained by a legend. Removing it would misrepresent unofficial rates as official.
- `popularity` is the primary default-sort key (DESC) in `GatewayTable.astro`, with `valueScore` as tiebreaker — don't "simplify" it back to value-only or alphabetical. It's editorial; changing numbers is fine, removing the field is not.
