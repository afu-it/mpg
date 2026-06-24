# MPG — Malaysia Payment Gateway Comparison — Design

**Date:** 2026-06-24
**Status:** Approved (brainstorming complete)
**Owner:** AFU · drafted with JARVIS

---

## 1. Goal

A minimalist, content-first website that lists every major Malaysian payment
gateway in a single comparison **table**, so a user can see and compare fees
(FPX, card, e-wallet, DuitNow QR), settlement time, fixed fees, and feature
support at a glance — then drill into a **detail page** per gateway.

Visual target: `https://openrouter.ai/models` in **dark mode** (tokens already
extracted into the provided design.md and captured in §7).

Non-goals are listed in §12.

## 2. Tech Stack

- **Astro** (static site generator) + **Tailwind CSS**
- 100% static HTML output (no server, no DB) — fast, cheap, easy to host
- Client-side JS only for table interactions (sort / filter / search)
- **Deploy:** Cloudflare Pages (free, git-driven auto-deploy)

## 3. Architecture & Data Storage

Use **Astro Content Collections**. Each gateway = one markdown file in
`src/content/gateways/<slug>.md`:

- **Frontmatter** = structured data (fees, channels, settlement, flags) — drives the table.
- **Body** = long-form detail (pros/cons, notes, setup guidance) — drives the detail page.

A typed **Zod schema** (`src/content/config.ts`) validates every file at build
time, so a malformed entry fails the build loudly instead of shipping silently.

**Why:** adding a new provider later = drop in one new `.md` file. The table and
its detail page regenerate automatically — no code changes. This directly serves
AFU's requirement "later we will add more provider".

Proposed project layout:

```
MPG/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── public/
│   └── logos/                # official provider logos (SVG)
├── src/
│   ├── content/
│   │   ├── config.ts         # Zod schema for the gateways collection
│   │   └── gateways/         # one .md per gateway
│   │       ├── toyyibpay.md
│   │       ├── billplz.md
│   │       └── ...
│   ├── components/
│   │   ├── GatewayTable.astro
│   │   ├── TableControls.astro   # search + filters + sort
│   │   ├── FeeCell.astro
│   │   └── Badge.astro
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro           # comparison table
│   │   └── gateway/[slug].astro  # detail page (getStaticPaths)
│   └── styles/
│       └── tokens.css            # design tokens from §7
└── docs/plans/                   # this design doc
```

## 4. Data Model (per-gateway schema)

```yaml
# src/content/gateways/toyyibpay.md  (frontmatter)
name: toyyibPay
slug: toyyibpay
logo: /logos/toyyibpay.svg
website: https://toyyibpay.com
tagline: "Affordable FPX & DuitNow QR for SMEs"
fees:
  fpx:        "RM1.00"          # online banking, flat or %
  card:       "2.0% + RM0.50"   # local credit/debit
  card_intl:  "3.5% + RM0.50"   # international card (optional)
  ewallet:    "1.5%"            # GrabPay / TNG / Boost / ShopeePay
  duitnowqr:  "0.5%"
  setup:      "RM0"             # one-time setup fee
  monthly:    "RM0"             # monthly / annual recurring platform fee
settlement:   "T+1"            # when funds reach the merchant
min_txn:      "RM1.00"
channels:     [fpx, card, ewallet, duitnowqr]
features:
  no_code:    true             # payment links / no-code checkout
  api:        true             # developer API available
  recurring:  true             # supports recurring / subscription billing
skill:        setup-toyyibpay  # related integration skill in the MY-PG skill repo
verified_date: 2026-06-24
source:       "https://toyyibpay.com/pricing"
notes:        ""               # any caveat shown on the detail page
```

Rules:
- A fee that is not publicly published → value `"Contact sales"` (never invented).
- Unknown / not offered → `"—"` (em dash) and the channel omitted from `channels`.
- `verified_date` + `source` recorded for every gateway → traceable & auditable.

## 5. Pages

**Index `/`** — short hero + the comparison table (§6).

**Detail `/gateway/[slug]`** (one per gateway, via `getStaticPaths`):
- Header: logo, name, tagline, "Visit website" + "Register" buttons.
- Full fee breakdown (all channels, setup/monthly, intl card, min/max).
- Settlement time, supported channels, feature badges (no-code, API, recurring).
- Pros / cons, notes/caveats.
- Link to the related integration skill (`setup-<gateway>`).
- `Source` + `Last verified` line.

## 6. Comparison Table — columns & interactions

Columns:

| Gateway (logo + name) | FPX | Card | E-wallet | DuitNow QR | Settlement | Fixed fee (setup/monthly) | Recurring |
|---|---|---|---|---|---|---|---|

- **Recurring** rendered as ✓ (accent `#818df8`) / `—` (muted).
- **Sort:** click any column header (fees parsed to a comparable number; "Contact sales"/"—" sort last).
- **Search:** free-text filter on gateway name.
- **Filter:** by channel (FPX / Card / E-wallet / DuitNow QR) and by feature (No-code / API / Recurring).
- Sticky header, row hover highlight, whole row links to the detail page.
- **Responsive:** horizontal scroll on small screens; gateway column stays sticky-left.
- Implemented with vanilla JS over the static DOM (no heavy table library) to stay minimalist.

## 7. Design System (tokens)

From the OpenRouter `models` dark-mode extraction:

- **Font:** Inter; base 14px / 400 / line-height 20px. Scale: xs 12, sm 14, md 16, lg 24.
- **Surfaces:** base `#000000`, muted `#090a0b`, raised `#212225`, strong `#27272a`.
- **Text:** primary `#dfe1e2`, secondary `#a1a1aa`, accent `#818df8`, inverse `#b0b4ba`.
- **Border:** default `#3d3d42`.
- **Spacing:** 4 / 6 / 8 / 12 / 16 / 24. **Radius:** xs 4, sm 6, md 8, pill.
- **Motion:** 150ms instant transitions.
- **Mode:** dark only.
- **A11y:** WCAG 2.2 AA, keyboard-first, visible focus rings, sufficient contrast.

## 8. Fee Research Plan & Accuracy

- Collect fees from each provider's **official website / pricing page**.
- Public published rates (e.g. toyyibPay, Billplz) → used directly.
- Negotiated / enterprise pricing (e.g. parts of Fiuu, Stripe enterprise) →
  `"Contact sales"`. **No fabricated numbers.**
- Every gateway carries `source` + `verified_date`.
- Site-wide **disclaimer**: *"Fees are indicative and may change or be negotiable
  by volume — confirm with the provider before deciding."*

## 9. Logos

- Official provider logos as **SVG** in `public/logos/<slug>.svg`, sourced from
  each provider's brand/press assets where available.
- Missing logo → graceful **monogram** fallback (first letter on a muted chip).
- Used for identification/comparison (nominative). Keep original artwork; do not recolor marks.

## 10. Deployment

- **Cloudflare Pages**, connected to the git repo, auto-build on push.
- Build command `astro build`, output dir `dist/`.

## 11. Gateways (initial 11)

CHIP · Curlec (Razorpay) · Xendit · Bayarcash · BCL Pay · toyyibPay · Billplz ·
Fiuu · senangPay · HitPay · Stripe Malaysia.

(Matches the existing `malaysia-payment-gateway` skill repo; more can be added later.)

## 12. Out of Scope (YAGNI for V1)

- No user accounts / login, no backend, no database.
- No live fee fetching / API integration — data is static & manually verified.
- No light mode.
- No multi-currency — MYR focus.
- No affiliate/referral tracking (may revisit later).
