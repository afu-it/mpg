# SESSION — working memory

_2026-06-24_

## Carry Forward
- Live: https://mpg-1hw.pages.dev · auto-deploy on **push** to master (commits this session are local-only, not pushed).
- Pure **static** site again — favourites/Phase 2 (Functions + D1 + Clerk backend) was built then removed at owner's request. Do NOT re-add. Clerk sign-in/up kept but gates nothing.
- Astro 7 static + Clerk browser SDK (CDN) + Tailwind v4. Never `@clerk/astro` / `@astrojs/cloudflare`.
- Table defaults to **value rank** (`valueScore` in `GatewayTable.astro`). Banks via shared `src/lib/fpx-banks.ts`; methods per gateway. Never fabricate fees/methods.
- 38 entries, all have a logo. Clerk auth **kept** (owner bought a domain → real deploy + `pk_live` later). Pending AFU decision: add Payex + 2C2P?
- `/compare` "Other methods" cell: 2 chips by default, stacked vertically, `+N more` toggle.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
