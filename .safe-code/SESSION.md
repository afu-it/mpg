# SESSION — working memory

_2026-07-17 malam (post-save #3: redesign + plans + discovery round 3)_

## Carry Forward
- Live: https://malaysiapg.com.my · **74 gateways · 216 pages** · vitest 95/95 · CSP ENFORCING.
- Design = DARK SPARSE minimalism (locked by AFU): fold/move copy, never delete SEO text; desktop uses full width (2-col grids); est-fee number is the detail-page hero. Rollout to /compare /choose /best /vs /learn-subpages/blog PENDING.
- plans[] layer live (spec 17 done): official-source plans only, each with source URL; top-level fees = default plan = ranking input.
- 10 of the 11 new gateways have NO logo (monogram fallback) — logo round is the top quality item.
- Blog (spec 15): posts = content collection, live answer box + PostFeeBox, blog.test.ts enforces style; slices D-G pending.
- Tooling prefs (user-preferences.md): curl+UA → Playwright/Lightpanda/Firecrawl; NO chrome-devtools unless asked; Firecrawl key from AFU in-chat only, never stored.
- IndexNow: key file hosted; after each deploy, POST changed URLs to api.indexnow.org + bing.com/indexnow (payload in LOG).
- House rules: static Astro 7 + Clerk CDN; no em-dashes; fees sourced or "Contact sales"; trailing slashes on all internal links.

## Task List
- [x] Post-save fixes (all pushed + deployed + verified live): bordered plan cards (8bbf0f8), /vs winner highlight bold+accent when both sides publish (dc2be31; class HTML-escapes to [&amp;_span]), centered footer grid (17b8d74 — was hugging left edge, AFU "mengarut"), hero stat line → "74 providers · every fee from official sources · free and independent" (d211440, AFU picked official-sources option; dead vars removed)
- [x] AFU CAUGHT A REAL MISS: AffanPay publishes a FULL rate card low on its homepage — my scrape truncated at 2.6k chars and concluded "Contact sales". LESSON (locked): NEVER truncate scraped content before reading; save full output and search all of it. Fixed from verified source: FPX RM1.00/RM2.00 B2B, DNQR 0.8%, ewallet 1.5%, card 1.75%/2.4% foreign, monthly RM0 → AffanPay now RANKABLE #8 (RM1.32) · type: fix · files: src/content/gateways/affanpay.md (BUILT, not yet committed)
- [x] FULL FEE RE-VERIFICATION COMPLETE (7/7 agents, all 74 gateways, Firecrawl full-page rule): ~55 CONFIRMED exactly; corrections applied to 20 files. Headlines: M1Pay full MDR published -> RANKED #3 (RM1.16); MOBY full rate card published (was all Contact sales; B2C RM2/B2B RM0.70 confirmed as-published); AffanPay confirmed (AFU's catch); Qashier MY rates found at /my/mdr-rates; RinggitPay DE-PUBLISHED its rate card -> deranked; Revenue Monster from-0.8% figures removed; Xendit splits published (personal/corporate FPX + debit/credit) + DuitNow OB new; TNG DNQR + Paydibs settlement + Fasspay T+1 downgraded (no longer published); Kiple verified via Firecrawl (CF bypass) + Starter/Standard plans added; HLB DNQR RM0 verified; SwiF Starter RM300/RM300; Bayarcash T+2 amb.; 9 entries appended to /fee-changes; verified_date=2026-07-17 on ALL 74 (whole directory re-verified). Rankable 24 -> 27. Top-10: herepay 1.07, fasspay 1.12, m1pay 1.16, toyyibpay/cardbizpay 1.19, gkash 1.24, kiple 1.28, bizappay/affanpay 1.32, boost 1.35 · type: fix · files: 20+ gateway .md + src/lib/fee-changes.ts

## Draft updates
- user-preferences/ai-workflow-rules draft: hard rule — never truncate scraped pages before extracting facts (AffanPay incident 2026-07-17)
