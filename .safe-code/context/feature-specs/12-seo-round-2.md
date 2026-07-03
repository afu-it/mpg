---
status: in-progress   # suggested | approved | in-progress | done | rejected — approved by AFU 2026-07-03 ("buatlah jugak spec 12 tu")
created: 2026-07-03
---

# SEO round 2 backlog — remaining specialist recommendations

Source: 2026-07-03 SEO session (squirrel audit + 3-specialist pass: content/keyword,
schema, GEO). Everything CHEAP from those reports was already built that same day
(robots.txt AI-bot allows, llms.txt, BreadcrumbList sitewide, detail-page WebPage/
FinancialService schema, /vs/ hub + homepage comparisons block, retitles, /about
/privacy /contact, security headers, canonical/trailing-slash discipline). This
spec holds what was deliberately deferred.

## Deferred items (rough priority order)

1. **Bahasa Malaysia content + hreflang** (content agent's biggest gap). BM
   variants of the money pages ("payment gateway murah malaysia", "cara pilih
   payment gateway", "payment gateway untuk bisnes online"). Weakest competition,
   largest untapped demand. Needs a URL scheme (/ms/ prefix?) + hreflang pairs.
2. **Glossary terms as individual URLs** (/learn/glossary/fpx/ etc.). Each term is
   a featured-snippet candidate ("what is FPX", "MDR meaning").
3. **How-to content**: "How to register for FPX as a merchant" (cara daftar FPX),
   per-platform guides (Shopify Malaysia, WooCommerce) reusing plugin data.
4. **Fee-change news page** ("Recent fee changes") derived from verified_date
   deltas; recurring freshness signal. Could be generated at build time.
5. **Fee calculator page** exposing effectiveCost() with user-entered ticket size
   ("payment gateway fee calculator malaysia").
6. **Settlement-time ranked page** ("fastest settlement") from existing field.
7. **"Stripe Malaysia alternatives" listicle** intent page (and possibly per-big-brand
   alternatives pages) reusing recommend().
8. **Dataset + WebAPI JSON-LD on /learn/api** (Google Dataset Search eligibility) and
   `/llms-full.txt` generated from the content collection (one section per gateway).
9. **TechArticle schema on /learn/* guides**; Organization node emitted sitewide
   (dedupe against homepage graph if done).
10. **Entity corroboration off-site** (GEO agent): Wikidata item for the site, GitHub
    README with domain, MCP registry listings (modelcontextprotocol registry, PulseMCP,
    Smithery, mcp.so), Bing Webmaster Tools + IndexNow (Cloudflare one-click), community
    posts (Lowyat, r/malaysia). Mostly AFU-driven, not code.
11. **Citability dated answer-sentences** on /best pages ("As of <date>, X is the
    cheapest...") including the date inside FAQ JSON-LD answers; per-item headline
    rates in ranked lists.
12. **Move the "cheapest" FAQ** off /best/payment-gateway-malaysia (cannibalizes the
    cheapest page); differentiated FAQs per profile.
13. **Thin tool pages**: methodology copy below the /choose and /compare tools + 2-3
    H2s/FAQ. (Homepage got its retitle already; a "what is a payment gateway in
    Malaysia" paragraph is still open.)
14. **PDF/HTML audit report** via squirrel or seo-audit tooling if AFU wants a
    shareable artifact.

## Done in the 2026-07-03 session (do not re-suggest)
robots.txt explicit AI-bot allows; public/llms.txt; rel=alternate JSON links
(home, /gateways, detail); BreadcrumbList JSON-LD on best/vs/gateway/compare/
about/privacy/contact/contribute; WebPage+about(FinancialService)+dateModified on
all 63 detail pages; fee-table "Fees verified <date>" caption; /vs/ hub page (71
pairs + popular + guides); homepage "Popular comparisons" block + retitle
("Compare Malaysian payment gateway fees: N providers"); /gateways H1 fee-focused;
"More guides" lists all profiles; footer Comparisons link; ItemList urls trailing
slash. Cloudflare AI-crawler unblock = dashboard action (AFU), see progress notes.

## Rejected / cautioned (schema agent)
- NO Product/Offer/AggregateOffer on fees (misrepresents seller; spam risk).
- NO AggregateRating/Review anywhere (no real user ratings; manual-action bait).
- NO SearchAction (no crawlable search results URL; deprecated display anyway).
- FAQPage kept but expect zero rich-result display (Google limits FAQ rich results
  to authority gov/health sites since 2023); do not spread FAQPage chasing it.
