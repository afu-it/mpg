# SESSION — working memory

_2026-07-02 (post-save, late night)_

## Carry Forward
- **Live: https://malaysiapg.com.my**. Auto-deploy on push to master, **owner-gated** (collaborator pushes never deploy). Clerk PRODUCTION; local `.env` stays `pk_test`.
- Pure **static** Astro 7 + Clerk CDN + Tailwind v4 + @astrojs/sitemap. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **63 gateways** (gateway 44, bank 10, ewallet 1, bnpl 7, infra 1), **all fees re-verified against official sources 2026-07-02**; 21 rankable; build 158 pages. Discovery round 2 rejected-list lives in spec 04 (never re-suggest).
- Brand: `logo.svg` colour source of truth; header `logo-white.svg`; `favicon.svg` adaptive; icons derive from SVG (`?v=2` on links, bump on brand change).
- Contribution (spec 11): private repo + GitHub invite after email application via /contribute. Never suggest public repo again without asking.
- Theme = Jalur Gemilang on dark. **No em-dashes in prose**; `"—"` fee placeholder is data. Fees: official plain / third-party ` *` / else "Contact sales". Never fabricate.
- **Don't chrome-devtools verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
