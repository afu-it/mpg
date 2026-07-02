# SESSION — working memory

_2026-07-02_

## Carry Forward
- **Live: https://malaysiapg.com.my** (custom domain, CF Pages + SSL) with `mpg-1hw.pages.dev` as a working alias. Auto-deploy on **push** to master (GitHub Actions → CF Pages). safe-code --save never pushes.
- Pure **static** Astro 7 + Clerk browser SDK (CDN) + Tailwind v4. Never `@clerk/astro` / `@astrojs/cloudflare`. Astro `site` = `https://malaysiapg.com.my` (canonical/SEO).
- **Clerk PRODUCTION live:** app "Malaysia Payment Gateway" (`app_3FZd3mHzTBeSp0ufdwueJaORgP2`), prod instance `ins_3FvlB7gGDEHgTNV12mP6YFQQqBM`, `pk_live` for `clerk.malaysiapg.com.my`. Sign-in = email code + password + **Google** (GitHub disabled). GH secret `PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live`; **local `.env` stays `pk_test`** for `npm run dev`. Clerk instance-config changes apply at runtime (no rebuild); only a publishable-key change needs a redeploy.
- **MCP Worker** redeployed with `MPG_API_BASE` = `https://malaysiapg.com.my` (`mpg-mcp.afuitdev.workers.dev/mcp`). Deploy: `cd mcp && npm run deploy`.
- **59 gateways**: gateway 40, bank 10, ewallet 1 (TNG), bnpl 7, infrastructure 1 (PayNet). Ranking (spec 07, live): default = lowest estimated fee, gated; `src/lib/fees.ts` is the single fee-math source. `src/lib/recommend.ts` powers `/choose` and is the engine the planned **Spec B (SEO pages)** must reuse.
- Theme = Jalur Gemilang on dark. **No em-dashes in prose** (house style); standalone `"—"` fee placeholder is data. Fees: official = no marker; third-party = trailing ` *`; else `Contact sales`. Never fabricate.
- **Don't chrome-devtools verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
