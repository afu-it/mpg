# MPG — Malaysia Payment Gateway

A minimalist, dark-mode website that lists Malaysian payment gateways in one
**comparison table** (sortable, filterable, searchable), with a **detail page**
per gateway. Built with Astro + Tailwind, deployed as a static site.

## Stack

- **Astro** (static output) + **Tailwind CSS v4**
- Data via **Astro Content Collections** (one markdown file per gateway, Zod-validated)
- **Vitest** for the fee-parsing logic
- Deploy: **Cloudflare Pages**

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # build static site to dist/
npm run preview    # preview the built site
npm test           # run unit tests (fee parsing)
npx astro check    # type + content-schema check
```

## Add a new gateway

This is the whole point of the data model — **no code changes needed**:

1. Create `src/content/gateways/<slug>.md` (copy an existing one).
2. Fill the frontmatter (validated against `src/content.config.ts`):
   - `fees`: `fpx`, `card`, optional `card_intl`, `ewallet`, `duitnowqr`, `setup`, `monthly`
   - `settlement`, `min_txn`, `channels`, `features` (`no_code`/`api`/`recurring`)
   - `website`, `source` (URL of where the fees came from), `verified_date`
   - Use `"Contact sales"` for unpublished/negotiated, `"—"` for not offered.
3. Write a short overview in the markdown body (shown on the detail page).
4. (Optional) drop an SVG logo at `src/assets/logos/<slug>.svg` — otherwise a
   monogram chip is shown automatically.
5. `npm run build` — the table row and `/gateway/<slug>` page appear automatically.

## Data & fees disclaimer

Fees were collected from each provider's **official pricing page** (see each
gateway's `source` + `verified_date`). They are **indicative** and may change or
be negotiable by volume — always confirm with the provider before deciding.
Nothing here is fabricated; unknown values are marked `Contact sales` or `—`.

## Deploy (Cloudflare Pages)

**Dashboard (recommended):** connect the git repo in Cloudflare Pages →
framework preset **Astro** → build command `npm run build` → output dir `dist`.

**CLI:**

```bash
npm run build
npx wrangler pages deploy dist --project-name=mpg
```

## Project layout

```
src/
├── content/gateways/   # one .md per gateway (the data)
├── content.config.ts   # Zod schema
├── components/         # GatewayTable, TableControls, FeeCell, FeatureBadge, Logo
├── scripts/table.ts    # sort / filter / search behaviour
├── lib/fees.ts         # tested fee parsing
├── layouts/Base.astro
└── pages/              # index.astro + gateway/[slug].astro
```
