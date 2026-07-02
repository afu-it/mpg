# SESSION — working memory

_2026-07-02 (post-save, evening)_

## Carry Forward
- **Live: https://malaysiapg.com.my** (CF Pages + SSL). Auto-deploy on **push** to master. Clerk PRODUCTION (`pk_live`); local `.env` stays `pk_test`.
- Pure **static** Astro 7 + Clerk browser SDK (CDN) + Tailwind v4 + `@astrojs/sitemap`. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **Brand:** `public/logo.svg` = source of truth (shield + arrow, flag colours); ALL icons derive from it (regenerate via rsvg-convert + magick, never hand-edit the PNGs). Header = mark + "Malaysia Payment Gateway".
- **59 gateways**; `fees.ts` = fee math, `recommend.ts` = engine, `seo-pages.ts` = /best (12) + /vs (69) registries. Build = 151 pages. Sitemap live + submitted to GSC (Success).
- Theme = Jalur Gemilang on dark. **No em-dashes in prose**; `"—"` fee placeholder is data. Fees: official plain / third-party ` *` / else "Contact sales". Never fabricate.
- **Don't chrome-devtools verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
