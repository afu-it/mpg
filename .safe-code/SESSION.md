# SESSION — working memory

_2026-07-03 (post-save #2, security + seo-round-2 + mobile session)_

## Carry Forward
- **Live: https://malaysiapg.com.my** but 12+ local commits UNPUSHED (classifier blocks agent pushes to master; AFU must say "push" or push himself).
- Pure **static** Astro 7 + Clerk CDN + Tailwind v4 + @astrojs/sitemap. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **63 gateways, 191 pages** now (glossary terms, calculator, fee-changes, fastest-settlement, alternatives x12 added this session). vitest 83/83.
- **Security (spec 13)**: canonical doc `context/security.md`. CSP Report-Only (flip after AFU clean smoke). TM-001 trigger before inviting any collaborator.
- **Mobile (spec 14)**: nav drawer + filter drawer + card-list table live in code; card transform is pure CSS in GatewayTable.astro over the SAME table DOM (don't "simplify" it away; table.ts depends on that DOM). Emulation-verified; AFU real-device smoke pending.
- Theme = Jalur Gemilang on dark. **No em-dashes in prose**; `"—"` fee placeholder is data. Fees: official plain / third-party ` *` / else "Contact sales". Never fabricate.
- **Astro whitespace trap**: inline tags on their own source line glue to text; use {" "}.
- SERP windows: title 30-65, desc 110-160 — glossary + seo-pages registries are test-enforced.
- **Don't chrome-devtools verify unless AFU asks** (AFU asked this session for mobile).

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
