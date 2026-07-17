---
status: in-progress   # approved by AFU 2026-07-17 ("buat lah semua"); slices A-C + images DONE same day; D-G remain
created: 2026-07-17
---
# SEO Round 3 — Blog content layer + topic pillars (GSC-driven)

## Goal
Convert the site's ~190 zero-click GSC impressions into clicks by adding the one
layer MPG lacks: editorial content (blog) organised into pillar/topic clusters,
targeting the exact queries GSC already shows us ranking for (page 2+), plus
EEAT author signals. Inspired by the borjafat playbook (2026-07-17) but adapted:
MPG already has sitemap/canonicals/FAQ-LD/hreflang/llms.txt from specs 10+12,
so this round is ONLY the missing pieces.

## Evidence (GSC 2026-07-17, site ~2 weeks indexed)
- 1 click / ~190 queries with impressions. Head terms impress at position deep
  ("payment gateway malaysia" 24 imp, 0 clicks).
- Query clusters visible in real data:
  1. **Per-gateway pricing**: billplz pricing, toyyibpay pricing, hitpay fees/charges,
     chip fees, fiuu pricing, senangpay pricing, curlec pricing, xendit pricing,
     stripe malaysia pricing — highest intent, we have the data.
  2. **Recurring payments**: recurring billing malaysia, recurring payment gateway
     malaysia, "maksud recurring payment" (BM!), many "what is recurring" variants.
  3. **FPX education**: what is fpx, fpx meaning, fpx api, why businesses should
     offer fpx, fpx payment for ecommerce in malaysia.
  4. **E-wallet merchant + BNPL fees**: ewallet merchant, spaylater fee/processing
     fee, atome, favepay later, tng ewallet.
- Indexing report: "Page with redirect" 104 + "Alternative page w/ canonical" 78 =
  benign (variants resolving to canonical). "Discovered/crawled not indexed" 10 =
  normal for young site; internal links from new content help.
- Real wart: **clerk.malaysiapg.com.my indexed** ("Page indexed without content").
  Clerk-hosted subdomain, DNS-only CNAME → we cannot inject noindex; use GSC
  removal request + accept as cosmetic.

## Scope (in)
- **Blog as Astro content collection** `src/content/posts/` (Zod schema: title,
  description, pubDate, updatedDate, cluster, tags, sources[], faq[], author).
  NOT "JSON + generator script" from the tweet — content collections ARE that,
  build = generator, same pattern as gateways. One .md per post.
- Pages: `/blog/<slug>/` with Article JSON-LD (author, dates), BreadcrumbList,
  FAQPage from frontmatter faq[]; `/blog/` index.
- **4 pillar pages** `/blog/<cluster>/` (fees-pricing, recurring-payments,
  fpx-duitnow, ewallet-bnpl) summarising + linking their posts; pillars listed in
  the footer nav (standardized bottom bar, per playbook).
- **Cross-linking**: RelatedPosts component (same cluster/tags); inbound links
  from matching /gateway/<slug> detail pages, /learn guides and glossary terms
  into posts; posts link back to /best, /vs, /calculator money pages.
- **Per-gateway fee posts pull live numbers from the gateways collection +
  fees.ts** (est fee on RM100, verified_date) so blog numbers can never drift
  from the directory. Never fabricate; "Contact sales" semantics preserved.
- **EEAT**: interview AFU (experience, credentials, review process) → author
  bio component on posts + /about upgrade (Person JSON-LD linked to Organization).
- Seed batch: ~8-12 posts across the 4 clusters, EN first; BM versions for the
  clusters where BM queries exist (recurring, murah) wired into i18n-pages
  hreflang registry.
- Fix the 1x 404 + 1x redirect error from GSC; GSC removal request for the
  Clerk subdomain (AFU-side).

## Scope (out)
- claude-seo third-party installer (supply-chain risk; we already have the local
  seo-* agent suite for research/audit).
- Image SEO round (tweet item): MPG images are provider logos, near-zero Google
  Images opportunity; only keep filenames/alt/compression discipline as-is.
- News-style posting cadence / content farm. Small, sourced, evergreen set only.
- Any server/DB. Blog stays static.

## Approach
Slices: (A) collection + layout + Article/FAQ LD + author component; (B) pillar
pages + footer pillar list; (C) seed posts cluster 1 (pricing, data-driven);
(D) clusters 2-4 posts; (E) cross-link modules + inbound links from existing
pages; (F) BM subset + hreflang; (G) GSC hygiene (404/redirect error, removal
request). EEAT interview with AFU happens before (A) ships.

### Editorial pipeline (per post — adapted from the 7-step quality-gate playbook)
1. **Keyword backlog** = the GSC query clusters above (a real backlog, not
   invented topics). Backlog empty → stop, ask AFU; never drift to nearby topics.
2. **Intent classification** before writing: comparison / how-to / definition /
   buying guide / list — the intent picks the template, not the keyword count.
3. **Product-truth validation**: MPG's equivalent of a "product definition file"
   already exists = the Zod-validated gateways collection + fees.ts. Every fee,
   settlement or feature claim in a post must render from or be checked against
   it; what the data doesn't contain may not be claimed (anti-hallucination gate,
   same spirit as the "fees are sourced" hard rule).
4. **Structure per post**: keyword title → short answer near the top → longer
   dated answer block (for AI engines) → clear sections → FAQ → internal links →
   directory CTA (/choose, /compare, /calculator).
5. **Two anti-slop passes**: (i) hype words, corporate verbs, fake hook
   questions, empty marketing, unsupported claims; (ii) repetitive sentence
   openings, missing contractions, weak transitions, bloated paragraphs,
   em-dashes (already a house rule sitewide).
6. **Quality gate before merge**: sounds human + every product claim true
   (checked against the collection); fails → rewrite from step 4. Score noted
   in the PR/commit message.
7. **Publish** = normal MPG flow: build (registry scans enforce SERP windows on
   blog frontmatter), AFU's push → CF Pages deploy, GSC Request Indexing for the
   first posts while the site is young.

## Acceptance criteria
- Build stays green (astro check 0, vitest green, SERP-window scans cover blog).
- Every post: sourced claims, dated, author attributed, in exactly 1 cluster,
  ≥2 internal links in + out; pillar pages link every child post.
- Fee numbers in posts render from the same data as /gateways (no hardcoding).
- Sitemap picks up /blog/ automatically; footer lists 4 pillars sitewide.

## Notes
- Playbook source: https://x.com/borjafat/status/2077046673553965231 (saved
  2026-07-17). Items already covered by earlier specs: meta/canonicals (site-wide
  since spec 12), sitemap (spec 10), GEO/FAQ + llms.txt (spec 12), hreflang
  (spec 12 G), standardized top nav (Base.astro).
- Blog freshness also feeds /fee-changes: fee-change observations can become
  short posts later (append-only log stays canonical).
