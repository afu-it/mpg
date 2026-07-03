# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-07-03 (second save, mega session)
completed:
  - Spec 13 security hardening BUILT: security.md (ownership map + TM-001..008), actions SHA-pinned, CSP Report-Only + CF-insights beacon allowed, ACAO scoped to /api/*. Pre-push live check: Lighthouse a11y/BP/SEO 100, squirrel 81/B (was 69/D).
  - Spec 12 SEO round 2 slices A-F BUILT (6 atomic commits): schema/citability pass, glossary term URLs, /calculator, /fee-changes, /best/fastest-settlement/, /alternatives/<slug>/ x12. Build 162 → 191 pages, vitest 83/83.
  - Spec 14 mobile redesign BUILT + emulation-verified: nav drawer, filter drawer (badge), card-list table, sticky compare labels, 44px targets. Desktop unchanged.
pending:
  - **PUSH still blocked** by the permission classifier (production deploy needs AFU's explicit word). 12 local commits on master ahead of origin: adf4dfe 5ceff6c 8265869 63748b5 0d511ce (security) + 2b56bcc 21ee3f1 06b8558 9037825 08a642c a286fdd (spec 12) + 24a15b3 (spec 14) + docs commits. AFU: say "push" or run `git push origin master`.
  - After deploy: verify live headers (CSP-RO, ACAO off HTML/on /api), securityheaders.com re-scan (expect ≥A-); AFU smoke on real phone (drawers, cards, compare) + signed-in auth smoke with console open → then flip CSP to enforcing + close specs 13/14.
  - AFU security items: 2FA on GitHub/Cloudflare/YeahHost/Clerk/Google; rotate Google OAuth client secret.
  - Spec 12 remaining: slice G (BM money pages + hreflang, /ms/ prefix) + slice H (how-to guides); item 10 entity corroboration is AFU-driven.
  - Spec 02 decision: recommend demote approved → suggested (superseded by spec 11); awaiting AFU word.
  - AFU (SEO): GSC Request Indexing; AI Overview + favicon fix on recrawl.
next_action: Get AFU's "push" (or he pushes) → deploy → live verification chain above. Then spec 12 slice G (BM content) is the warmest build unit.
