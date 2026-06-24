# SESSION — working memory

_2026-06-24_

## Carry Forward
- Live: https://mpg-1hw.pages.dev · auto-deploy on **push** to master (commits so far are local-only, not pushed).
- Auth = Clerk **browser SDK via CDN**. Do NOT add `@clerk/astro` / `@astrojs/cloudflare` on Astro 7.
- Phase 2 (favourites) code-complete — needs the 3 Cloudflare provisioning steps (see `feature-specs/01`) to go live.
- Banks + Other-Methods dimension shipped (spec 03 done). Directory now 38 entries (+M1Pay, +CardBizPay, +Airwallex, +PayNet infra). FPX banks live in `src/lib/fpx-banks.ts` (shared). Never fabricate fees/methods.
- Pending AFU decision: add Payex + 2C2P? (spec 04 / BACKLOG).

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
