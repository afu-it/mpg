# SESSION — working memory

_2026-07-03 (post-save, security session)_

## Carry Forward
- **Live: https://malaysiapg.com.my**. Auto-deploy on push to master, owner-gated. Clerk PRODUCTION; local `.env` stays `pk_test`.
- Pure **static** Astro 7 + Clerk CDN + Tailwind v4 + @astrojs/sitemap. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **63 gateways**, 162 pages. All fees verified 2026-07-02; 21 rankable.
- **Security (spec 13, in-progress)**: canonical doc = `context/security.md`. CSP is **Report-Only** — flip to enforcing only after AFU's clean signed-in smoke. ACAO detached from HTML (CF Pages default), kept on /api/*. Actions SHA-pinned. **TM-001 trigger**: before inviting any collaborator, remove CF token from GH secrets or fork+PR only.
- Theme = Jalur Gemilang on dark. **No em-dashes in prose**; `"—"` fee placeholder is data. Fees: official plain / third-party ` *` / else "Contact sales". Never fabricate.
- **Astro whitespace trap**: inline tags on their own source line glue to text — keep same-line or use {" "}.
- **Don't chrome-devtools verify unless AFU asks.** Use build / astro check / npm test.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
