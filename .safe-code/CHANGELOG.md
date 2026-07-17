# Changelog — MPG

## [Unreleased]

### Added (2026-07-17, evening)
- Official logos for all 11 newly added gateways.
- Three business-type guides: best payment options for physical stores, for digital products and services, and for SaaS subscriptions.
- Developer filter on the gateway table: show only providers with an API or an MCP server.

### Changed (2026-07-17, evening)
- Homepage hero spacing tightened; full fee re-verification of all 74 providers (fees now dated 2026-07-17 sitewide).

### Added (2026-07-17, second sitting)
- 11 new gateways (74 total): Herepay (new cheapest ranked, RM1.07/RM100), KineticPay, LeanX, SMAP Pay, Payright, LekirPay, AffanPay, edxaPay, Tulus Digital, Qashier, ShopeePay (Direct).
- Plans: 16 gateways now show every published pricing plan side by side (46 plans, all sourced).

### Changed (2026-07-17, second sitting)
- Minimalist redesign: sparse homepage with live cheapest-5 list, calmer gateway pages with the estimated fee as the headline number and a two-column desktop layout, grouped footer, collapsible filters.

### Added (2026-07-17)
- Guides/blog section: `/blog/` hub, fees & pricing pillar, and 5 sourced fee guides (Billplz, toyyibPay, HitPay, Stripe Malaysia, how-fees-work) with live fee tables, dated answer boxes, FAQ, author bio and hero images. Site is 205 pages.
- "Guides" in the header nav and drawer; topic pillars listed in the footer.

### Changed (2026-07-17)
- Content-Security-Policy is now enforcing (was Report-Only).
- All internal links use trailing slashes (removes a redirect hop per click).

### Fixed (2026-07-17)
- Duplicate "Malaysia Malaysia" in Stripe/OxPay/UOB page titles; decorative logo alt text; two short meta descriptions; two under-linked pages (PayNet, fastest-settlement).
### Added
- **About, Privacy and Contact pages**: who runs MPG, how fees are sourced and ranked, what data the site does (and does not) collect, and how to reach the maintainer. Linked from the footer.
- **Comparisons hub** (`/vs/`): every head-to-head page in one index, plus a "Popular comparisons" block on the homepage.
- **Est. fee / RM100 on /compare**: a blended-cost row (lowest highlighted) and "≈ RM" annotations under percentage fees, so flat and % rates compare fairly. The gateway table also gained a "Pricing on request" divider between ranked and unranked rows.
- **AI-crawler access**: robots.txt now explicitly welcomes AI crawlers (GPTBot, ClaudeBot, Perplexity, Google-Extended, CCBot and more) and a new `llms.txt` gives AI systems a guided tour of the data with attribution guidance. (Cloudflare's managed AI-bot block, which had been silently locking them all out, was switched off.)
- **Structured data**: breadcrumbs on all major page types, entity markup on every gateway detail page (with the fee-verification date), and site/organization markup on the homepage. Detail pages also show "Fees verified <date> against the official source" right under the fee table.
- **Security headers**: HSTS, clickjacking protection, referrer policy, and long-lived caching for build assets.
### Fixed (2026-07-03)
- Words no longer glue to links ("thecontribute page") anywhere on the site.
- Canonical URLs sitewide (Google had picked the http:// duplicate of the homepage); footer "Last updated" now reflects the newest fee-verification date automatically.
- Accessibility: readable red on the landing cards, always-underlined inline links, proper heading order; logos carry explicit dimensions (no layout shift) and the text font preloads (faster headline paint).
- AsiaPay and J&C Pacific logos were 200KB+; now 36KB and 117KB.
- Kiple: developer-docs link pointed at a dead domain (removed); website updated to kiple.com.
- **4 more gateways** (directory now 63): BetterPay (instant-settlement gateway with a fully published rate card), BOLD.Pay by MACROKIOSK (multichannel incl. direct carrier billing), Share Commerce (BNM-registered acquirer, white-label + terminals), and Antom by Ant International (Alipay+ network, official MCP server).
- **Contribute page** (`/contribute`): rules, the 4-step contributor flow, and an application form that unlocks after signing in and sends a prefilled email. Production deploys are now owner-only, so future collaborators can never publish the site by accident.
- **Dark-mode branding**: the header logo is now pure white on the dark theme, and the browser-tab icon adapts automatically (white on dark browsers, brand colours on light ones).
- **Site logo + favicon**: real brand mark (Jalur Gemilang shield + growth arrow) as a crisp SVG in the header next to "Malaysia Payment Gateway", plus a full icon set (browser favicon, Google search icon, iPhone home-screen icon, WhatsApp/Telegram share image).
- **Programmatic SEO pages** (spec 10): 12 `/best/<profile>` guide pages (cheapest, FPX, cards, e-wallets, DuitNow QR, recurring, no-code, developer API, online store, BNPL, plugins) ranked by the same cost engine as the rest of the site, and 69 curated `/vs/<a>-vs-<b>` head-to-head pages (fees + features side by side with data-derived verdicts). Linked from the Learn hub and footer.
- **Sitemap + robots.txt**: `sitemap-index.xml` generated at build (`@astrojs/sitemap`) and referenced from a new `robots.txt`.
- **Custom domain**: the site is now live at `https://malaysiapg.com.my` (Cloudflare Pages + SSL); `mpg-1hw.pages.dev` remains a working alias. Astro `site` set for canonical URLs / SEO.
- **Production authentication**: Clerk switched to a production instance on `clerk.malaysiapg.com.my` (`pk_live`), with email code + password and Google sign-in (GitHub disabled).
- **"Help me choose" wizard** (`/choose`): a 4-question, fit-first flow (integration style, channels, recurring, onboarding type) that returns a ranked shortlist of matching gateways, cheapest first, with reasons and a "Compare these" deep link. Powered by a new pure `recommend()` engine (reused by the planned SEO pages). Linked from the landing page, footer, and `/learn`.
- **Static JSON API**: `GET /api/gateways.json` (the whole directory, machine-readable, with `est_fee_rm100`, `rankable`, `verified_date`, `source` and a disclaimer) and `GET /api/gateways/<slug>.json` (one gateway). Built at deploy time — no server. Documented at `/learn/api`.
- **MCP server** (`mcp/`, a standalone Cloudflare Worker — deploy separately) so AI coding agents can query the directory live: `list_gateways`, `get_gateway`, `compare_gateways`, `recommend_gateway`.
- **Est. fee / RM100** column on the gateway table (a unit-correct blended cost on a RM100 transaction, beside Fixed fee), plus **Lowest FPX / Card / E-wallet** per-channel sort options. Detail pages show the same "Est. fee on a RM100 sale".
- 22 more gateways (directory now 59): local acquirers (Boost, Ampersand Pay, Axaipay, Fasspay, PayCools, gomobi, SecurePay, SwiF, bayarlah, J&C Pacific, FINEXUS), Touch 'n Go eWallet, and 10 bank gateways (Maybank2u Pay, CIMB e-Commerce, Public Bank, RHB, Hong Leong, AmBank, Alliance, UOB, OCBC OneCollect, HSBC Omni Collect). Boost + CIMB publish rates; the rest mostly "Contact sales".
- New categories **Bank** and **E-wallet** (sidebar filter, table/detail/compare badges).
- Access model: per-entry "Integrate (API/plugin)" vs "Merchant account" indicator (detail + compare), a /learn "Which type do you need?" explainer, and `/gateways?category=` deep-links.
- Sort dropdown on /gateways (Popularity / Lowest fees / Name A-Z / Name Z-A).
- Compare method/plugin/bank cells: lone badge centered, long-name chips drop to a full-width row, and show-more toggles all providers at once.
- Directory of 34 Malaysian payment gateways (incl. 8 BNPL) with sourced, dated fees.
- Pages: landing `/`, `/gateways` (sort/filter/search + sidebar), `/compare` (side-by-side, shareable), per-gateway detail, custom 404.
- Client-side Clerk authentication (sign up / sign in / user button), dark-themed.
- GitHub Actions auto-deploy to Cloudflare Pages.
- safe-code project brain (`.safe-code/`).
- Supported-banks (via FPX) + Other-payment-methods (e-wallets) on detail + `/compare`.
- Default gateway table ranked by popularity (most-used in Malaysia first), then best value.
- More gateways: M1Pay, CardBizPay, Airwallex; PayNet as infrastructure. Logos for all entries.
- Deeper fee data sourced from provider rate cards/docs; third-party/indicative rates marked with `*` (legend on table/compare/detail).
- Compare "Other methods" cell shows 2 chips with a `+N more` toggle.
- Developer-experience dimension: MCP/AI-agent support, webhooks, e-commerce plugins, API-docs link (detail section, table MCP badge, compare rows).
- `/learn` section for devs/vibe-coders: hub + glossary, safe integration flow, build-with-AI-agents (skills install + MCP/API explainer), production checklist; ASCII payment-flow and setup-flow diagrams; per-gateway "Copy prompt" button auto-generated from `skill:`.
- Top NProgress-style loading bar on page navigation.
- Logo-cycle animation in the Browse-gateways button.
- Per-gateway logo shape handling: rounded corners for square logos, circle-crop (`logo_round`) for circular marks.

### Changed
- **Every fee re-audited against official sources (2 Jul 2026).** 26 entries corrected, including Xendit's repricing (flat RM0.90 processing fee on every method), toyyibPay's newly published card/DuitNow QR rates (now ranked), SwiF's new 4-tier rate card, HitPay's official per-wallet and BNPL rates, and SPayLater's 3-month tenure rising to 5% from Feb 2026. Figures providers no longer publish were downgraded to "Contact sales" instead of being kept stale. gomobi renamed to Mobi (rebrand).
- **Default sort is now lowest estimated fee** (was popularity). A researched audit found the old "Lowest fees" mean mixed flat ringgit with percentages, dropped "+RM" add-ons, and rewarded gateways that hid pricing. Replaced with a unit-correct effective cost (RM100 basket, FPX/card/e-wallet weighted 50/30/20); only gateways with comparable published rates are ranked, the rest show "On request" below.
- Corrected editorial **popularity** from researched market signals: filled 16 gateways that were silently unranked (incl. listed companies RevPay, ManagePay), and adjusted brand-halo over/under-rates (Fiuu up; Billplz, toyyibPay, senangPay, Stripe, Curlec, Boost down).
- Logo quality overhaul: every logo QA'd on the dark theme; 30+ fixed (dark-on-transparent recoloured, tiny favicons replaced with real brand marks, marketing banners removed, wide wordmarks cropped to square symbol marks), 8 circular marks circle-cropped. Now 59 real logos, no monogram fallbacks.
- Re-themed to a Jalur Gemilang (Malaysia flag) dark palette: blue primary buttons, lighter flag-blue accent, brand red/yellow accents, deeper surface `#0a0a0a` / panel `#141416`. FPX and DuitNow QR labels use their brand colours.
- Refreshed logos: NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster.
- Removed em-dashes from all prose copy (house style).

### Fixed
- iPay88 corrected to NTTDataPay (formerly iPay88): the iPay88 site is retired, now NTT DATA Payment Services / ADAPTIS. Fees set to quote-only (ADAPTIS publishes none). eGHL noted as now under NTT DATA.

### Removed
- myIOU (BNPL) — dormant: domain dead (NXDOMAIN), socials quiet since ~Jun 2023.
- Split and Pace (BNPL) — defunct in Malaysia.
