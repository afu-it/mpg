# SESSION — working memory

_2026-07-02 (post-save)_

## Carry Forward
- **Live: https://malaysiapg.com.my** (CF Pages + SSL; `mpg-1hw.pages.dev` alias). Auto-deploy on **push** to master. Clerk PRODUCTION (`pk_live`, Google + email); local `.env` stays `pk_test`.
- Pure **static** Astro 7 + Clerk browser SDK (CDN) + Tailwind v4 + `@astrojs/sitemap` (build-time only). Never `@clerk/astro` / `@astrojs/cloudflare`.
- **59 gateways**; default sort = lowest estimated fee (gated), `src/lib/fees.ts` is the single fee-math source; `recommend.ts` powers /choose; **`seo-pages.ts` powers /best (12) + /vs (69) — add a profile = one PROFILES entry; vs pairs are derived (top-12 gateway + top-4 BNPL), not hand-listed.**
- Sitemap at `/sitemap-index.xml`, `public/robots.txt` points to it. Build = 151 pages.
- Theme = Jalur Gemilang on dark. **No em-dashes in prose**; standalone `"—"` fee placeholder is data. Fees: official plain / third-party ` *` / else "Contact sales". Never fabricate.
- **Don't chrome-devtools verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
