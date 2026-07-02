# SESSION — working memory

_2026-07-02 (post-save, night)_

## Carry Forward
- **Live: https://malaysiapg.com.my** (CF Pages + SSL). Auto-deploy on push to master, **owner-gated**: only AFU's pushes deploy (collaborators never auto-deploy). Clerk PRODUCTION (`pk_live`); local `.env` stays `pk_test`.
- Pure **static** Astro 7 + Clerk browser SDK (CDN) + Tailwind v4 + `@astrojs/sitemap`. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **Brand:** `logo.svg` = colour source of truth (light mode later); header uses `logo-white.svg`; `favicon.svg` adaptive via prefers-color-scheme; ico/png fallbacks coloured; regenerate icons from SVG, never hand-edit.
- **Contribution (spec 11):** repo PRIVATE + GitHub invite after email application via /contribute (Clerk-gated form). Never suggest making the repo public again without asking (AFU declined).
- **59 gateways**; `fees.ts` fee math, `recommend.ts` engine, `seo-pages.ts` /best+/vs registries. Build = 152 pages. Sitemap live + in GSC.
- Theme = Jalur Gemilang on dark. **No em-dashes in prose**; `"—"` fee placeholder is data. Fees: official plain / third-party ` *` / else "Contact sales". Never fabricate.
- **Don't chrome-devtools verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
