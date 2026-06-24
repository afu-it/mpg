# SESSION — working memory

_2026-06-24_

## Carry Forward
- Live: https://mpg-1hw.pages.dev · auto-deploy on **push** to master.
- Auth = Clerk **browser SDK via CDN** (client-side). Do NOT add `@clerk/astro` or `@astrojs/cloudflare` on Astro 7.
- Phase 2 (favourites) is **code complete** (commits up to 7ad305a, local-only — not pushed). To go live, run the 3 Cloudflare steps in `feature-specs/01` / BACKLOG, then flip spec 01 → `done`.
- Backend pattern: Pages Functions in `/functions` + D1; `/functions` has its own tsconfig (Workers types). Functions 503 until `DB` + `CLERK_SECRET_KEY` set.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
