# MPG — Malaysia Payment Gateway Site Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimalist, dark-mode static website that lists Malaysian payment gateways in a sortable/filterable/searchable comparison table, plus a detail page per gateway, deployed to Cloudflare Pages.

**Architecture:** Astro static site. Each gateway is one markdown file in an Astro Content Collection validated by a Zod schema; the collection drives both the index table and the per-gateway detail pages (`getStaticPaths`). Table interactions (sort/filter/search) are vanilla JS over the static DOM. Design tokens are taken from the OpenRouter `models` dark-mode extraction.

**Tech Stack:** Astro, Tailwind CSS, Astro Content Collections + Zod, Vitest (for pure fee-parsing logic), Cloudflare Pages.

**Design reference:** `docs/plans/2026-06-24-mpg-payment-gateway-comparison-design.md`

---

## Conventions & Notes

- **Verification model for a static site:** the primary gates are `astro check` (type + content-schema validation) and `astro build` (must succeed). Unit tests (Vitest) are used only for the one piece of pure logic worth testing: fee-string parsing/sorting. Components are verified by build + visual check in the browser.
- **No fabricated fees.** Every gateway's fees come from its official pricing page (URLs in Task 5). Unknown/negotiated → `"Contact sales"`; not offered → `"—"`.
- **Commit after every task** (messages shown per task).
- Run all `npm`/`astro` commands from the repo root: `/run/media/user/Windows-SSD/Users/User/Documents/PROJEK/MPG`.

---

## File Structure (decomposition lock-in)

```
MPG/
├── astro.config.mjs              # Astro + Tailwind + site url
├── tailwind.config.mjs           # tokens mapped to Tailwind theme
├── tsconfig.json
├── vitest.config.ts
├── package.json
├── public/
│   ├── favicon.svg
│   └── logos/<slug>.svg          # official logos
├── src/
│   ├── content/
│   │   ├── config.ts             # Zod schema (gateways collection)
│   │   └── gateways/<slug>.md    # 11 data files
│   ├── lib/
│   │   ├── fees.ts               # parseFee() + compareFee() (pure, tested)
│   │   └── fees.test.ts          # Vitest unit tests
│   ├── components/
│   │   ├── GatewayTable.astro    # renders <table> from collection
│   │   ├── TableControls.astro   # search + filter UI
│   │   ├── FeeCell.astro         # formats a fee value
│   │   ├── FeatureBadge.astro    # ✓ / — badge
│   │   └── Logo.astro            # logo with monogram fallback
│   ├── layouts/
│   │   └── Base.astro            # html shell, fonts, global tokens, footer disclaimer
│   ├── pages/
│   │   ├── index.astro           # hero + table
│   │   └── gateway/[slug].astro  # detail page
│   ├── scripts/
│   │   └── table.ts              # sort/filter/search behavior (client)
│   └── styles/
│       └── global.css            # tokens + base styles
└── docs/...
```

---

## Chunk 1: Scaffold & Design System

### Task 1: Scaffold the Astro project

**Files:** Create `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro` (placeholder).

- [ ] **Step 1:** Scaffold an empty Astro project in-place.

```bash
cd /run/media/user/Windows-SSD/Users/User/Documents/PROJEK/MPG
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --skip-houston
```

If the prompt complains the directory is non-empty, keep existing files (docs/, .git, .gitignore) and continue.

- [ ] **Step 2:** Add Tailwind via the official integration.

```bash
npx astro add tailwind --yes
```

- [ ] **Step 3:** Install dependencies and the test runner.

```bash
npm install
npm install -D vitest
```

- [ ] **Step 4:** Verify the dev toolchain builds.

Run: `npx astro check && npx astro build`
Expected: completes with 0 errors (placeholder page builds).

- [ ] **Step 5:** Commit.

```bash
git add -A
git commit -m "chore: scaffold Astro + Tailwind project"
```

### Task 2: Design tokens (global CSS + Tailwind theme)

**Files:** Create `src/styles/global.css`; Modify `tailwind.config.mjs`.

- [ ] **Step 1:** Write `src/styles/global.css` with the OpenRouter dark tokens as CSS variables and base resets:

```css
:root {
  --surface-base: #000000;
  --surface-muted: #090a0b;
  --surface-raised: #212225;
  --surface-strong: #27272a;
  --border-default: #3d3d42;
  --text-primary: #dfe1e2;
  --text-secondary: #a1a1aa;
  --text-accent: #818df8;
  --radius-sm: 6px;
  --radius-md: 8px;
}
html { color-scheme: dark; }
body {
  background: var(--surface-base);
  color: var(--text-primary);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; }
*:focus-visible { outline: 2px solid var(--text-accent); outline-offset: 2px; }
```

- [ ] **Step 2:** Map tokens into `tailwind.config.mjs` `theme.extend` (colors `surface.*`, `border.default`, `text.*` accent `#818df8`; fontFamily sans = Inter stack; borderRadius sm/md). Set `content` globs to `./src/**/*.{astro,html,js,ts}`.

- [ ] **Step 3:** Self-host Inter via `@fontsource/inter` (avoids external request, faster, privacy):

```bash
npm install @fontsource/inter
```

- [ ] **Step 4:** Verify build still passes.

Run: `npx astro build`
Expected: success.

- [ ] **Step 5:** Commit.

```bash
git add -A
git commit -m "feat: add dark design tokens + Tailwind theme + Inter font"
```

### Task 3: Base layout

**Files:** Create `src/layouts/Base.astro`.

- [ ] **Step 1:** Create `Base.astro`: imports `@fontsource/inter` + `global.css`; `<html lang="en">`; `<head>` with title/description props, `<meta name="viewport">`, favicon; `<body>` with a max-width container (`max-w-6xl mx-auto px-4`), `<slot/>`, and a `<footer>` containing the indicative-fees disclaimer (§8 of design):
  *"Fees are indicative and may change or be negotiable by volume — confirm with the provider before deciding. Last updated 2026-06-24."*

- [ ] **Step 2:** Point `src/pages/index.astro` at `Base` with a temporary `<h1>MPG</h1>` to confirm wiring.

- [ ] **Step 3:** Verify visually.

Run: `npm run dev`, open the printed localhost URL.
Expected: black page, white Inter heading, footer disclaimer visible.

- [ ] **Step 4:** Commit.

```bash
git add -A
git commit -m "feat: add Base layout with disclaimer footer"
```

---

## Chunk 2: Data Layer

### Task 4: Content collection schema

**Files:** Create `src/content/config.ts`.

- [ ] **Step 1:** Define the `gateways` collection with a Zod schema matching §4 of the design:

```ts
import { defineCollection, z } from "astro:content";

const gateways = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    logo: z.string().optional(),
    website: z.string().url(),
    tagline: z.string(),
    fees: z.object({
      fpx: z.string(),
      card: z.string(),
      card_intl: z.string().optional(),
      ewallet: z.string(),
      duitnowqr: z.string(),
      setup: z.string(),
      monthly: z.string(),
    }),
    settlement: z.string(),
    min_txn: z.string(),
    channels: z.array(z.enum(["fpx", "card", "ewallet", "duitnowqr"])),
    features: z.object({
      no_code: z.boolean(),
      api: z.boolean(),
      recurring: z.boolean(),
    }),
    skill: z.string().optional(),
    verified_date: z.string(),
    source: z.string().url(),
    notes: z.string().optional(),
  }),
});

export const collections = { gateways };
```

- [ ] **Step 2:** Verify schema compiles.

Run: `npx astro sync && npx astro check`
Expected: no errors (collection types generated).

- [ ] **Step 3:** Commit.

```bash
git add -A
git commit -m "feat: add gateways content collection schema"
```

### Task 5: Research fees + create 11 gateway data files

**Files:** Create `src/content/gateways/{chip,curlec,xendit,bayarcash,bcl,toyyibpay,billplz,fiuu,senangpay,hitpay,stripe-malaysia}.md`.

**Sources to fetch & verify (official pricing pages):**
- CHIP — https://www.chip-in.asia/ (pricing)
- Curlec — https://curlec.com/pricing/
- Xendit — https://www.xendit.co/en-my/pricing/
- Bayarcash — https://bayarcash.com/ (pricing)
- BCL — https://www.bcl.my/
- toyyibPay — https://toyyibpay.com/ (pricing)
- Billplz — https://www.billplz.com/pricing
- Fiuu — https://fiuu.com/
- senangPay — https://senangpay.my/pricing/
- HitPay — https://www.hitpayapp.com/pricing
- Stripe Malaysia — https://stripe.com/en-my/pricing

- [ ] **Step 1:** For each gateway, fetch the official pricing page (WebFetch / jina). Record FPX, card (local + intl if shown), e-wallet, DuitNow QR, setup, monthly/annual, settlement, min txn, channels, features (no_code/api/recurring), `source` URL, `verified_date: 2026-06-24`. Use `"Contact sales"` where not public; `"—"` where not offered. **Do not guess numbers.**

- [ ] **Step 2:** Write each `.md` file. Frontmatter per schema; body = 2–4 short paragraphs (overview, who it's for, pros/cons, any caveat). Example shape (`toyyibpay.md`):

```markdown
---
name: toyyibPay
slug: toyyibpay
logo: /logos/toyyibpay.svg
website: https://toyyibpay.com
tagline: "Affordable FPX & DuitNow QR for SMEs"
fees:
  fpx: "RM1.00"
  card: "Contact sales"
  ewallet: "—"
  duitnowqr: "0.5%"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1"
min_txn: "RM1.00"
channels: [fpx, duitnowqr]
features: { no_code: true, api: true, recurring: false }
skill: setup-toyyibpay
verified_date: 2026-06-24
source: "https://toyyibpay.com/"
---

toyyibPay is a Malaysian payment gateway focused on low-cost FPX collection...
```

- [ ] **Step 3:** Validate all data files against the schema.

Run: `npx astro check`
Expected: 0 content errors. Fix any schema violations.

- [ ] **Step 4:** Commit.

```bash
git add -A
git commit -m "data: add 11 Malaysian payment gateways with verified fees + sources"
```

### Task 6: Logos + fallback component

**Files:** Create `public/logos/<slug>.svg` (where obtainable); Create `src/components/Logo.astro`.

- [ ] **Step 1:** Create `Logo.astro` taking `{ src?, name }`. If `src` resolves, render `<img>` (height ~20px, `loading="lazy"`, `alt="{name} logo"`). If absent, render a monogram chip: first letter of `name` on `surface-raised` with `text-accent`, `radius-sm`.

- [ ] **Step 2:** Add official SVG logos to `public/logos/` for providers whose brand assets are readily available; leave the rest to the monogram fallback (do not recolor official marks). Track which are missing in `notes`.

- [ ] **Step 3:** Verify build.

Run: `npx astro build`
Expected: success.

- [ ] **Step 4:** Commit.

```bash
git add -A
git commit -m "feat: add Logo component with monogram fallback + available logos"
```

---

## Chunk 3: Comparison Table (Index)

### Task 7: Fee parsing logic (TDD)

**Files:** Create `src/lib/fees.ts`, `src/lib/fees.test.ts`, `vitest.config.ts`.

- [ ] **Step 1: Write the failing test** `src/lib/fees.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { parseFee, compareFee } from "./fees";

describe("parseFee", () => {
  it("parses a flat ringgit fee", () => expect(parseFee("RM1.00")).toBe(1));
  it("parses a percentage fee", () => expect(parseFee("2.0%")).toBe(2));
  it("parses percent + flat by percent first", () => expect(parseFee("2.0% + RM0.50")).toBe(2));
  it("treats 'Contact sales' as Infinity (sorts last)", () => expect(parseFee("Contact sales")).toBe(Infinity));
  it("treats '—' as Infinity (sorts last)", () => expect(parseFee("—")).toBe(Infinity));
});

describe("compareFee", () => {
  it("orders numbers ascending, unknowns last", () => {
    const sorted = ["—", "RM1.00", "0.5%"].sort(compareFee);
    expect(sorted).toEqual(["0.5%", "RM1.00", "—"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails.**

Run: `npx vitest run src/lib/fees.test.ts`
Expected: FAIL (`fees.ts` not found / functions undefined).

- [ ] **Step 3: Write minimal implementation** `src/lib/fees.ts`:

```ts
export function parseFee(value: string): number {
  if (!value) return Infinity;
  const pct = value.match(/([\d.]+)\s*%/);
  if (pct) return parseFloat(pct[1]);
  const rm = value.match(/RM\s*([\d.]+)/i);
  if (rm) return parseFloat(rm[1]);
  return Infinity; // "Contact sales", "—", unknown → sort last
}

export function compareFee(a: string, b: string): number {
  return parseFee(a) - parseFee(b);
}
```

- [ ] **Step 4: Run test to verify it passes.**

Run: `npx vitest run src/lib/fees.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit.**

```bash
git add -A
git commit -m "feat: add tested fee parsing + comparison helpers"
```

### Task 8: Cell + badge components

**Files:** Create `src/components/FeeCell.astro`, `src/components/FeatureBadge.astro`.

- [ ] **Step 1:** `FeeCell.astro` — prop `value`; render value; if value is `"—"` or `"Contact sales"`, render in `text-secondary` (muted) so real numbers stand out.
- [ ] **Step 2:** `FeatureBadge.astro` — prop `on:boolean`; render `✓` in `text-accent` when true, `—` muted when false; include `aria-label`.
- [ ] **Step 3:** Verify build. Run: `npx astro build` → success.
- [ ] **Step 4:** Commit. `git commit -m "feat: add FeeCell + FeatureBadge components"`

### Task 9: GatewayTable + TableControls

**Files:** Create `src/components/GatewayTable.astro`, `src/components/TableControls.astro`, `src/scripts/table.ts`.

- [ ] **Step 1:** `GatewayTable.astro` — `getCollection("gateways")`, render a semantic `<table>`:
  columns Gateway (Logo + name, links to `/gateway/{slug}`) | FPX | Card | E-wallet | DuitNow QR | Settlement | Fixed fee (`setup` / `monthly`) | Recurring.
  - Each `<th>` for a fee column gets `data-sort-key` and `role="button"`/`tabindex="0"`.
  - Each `<tr>` gets `data-name`, `data-channels`, `data-no_code`, `data-api`, `data-recurring` attributes for filtering.
  - Fee `<td>`s use `FeeCell`; Recurring `<td>` uses `FeatureBadge`.
  - Sticky `<thead>`; gateway column sticky-left; row hover `bg-surface-muted`.

- [ ] **Step 2:** `TableControls.astro` — search `<input>` (name), channel filter chips (FPX/Card/E-wallet/DuitNow QR), feature chips (No-code/API/Recurring). All controls carry stable `id`/`data-*` for the script.

- [ ] **Step 3:** `src/scripts/table.ts` — vanilla TS, imported with `<script>` in the table component:
  - **search:** hide rows whose `data-name` doesn't include the query (case-insensitive).
  - **filter:** AND across active channel/feature chips against row `data-*`.
  - **sort:** click/Enter on a `<th data-sort-key>` toggles asc/desc; reorder rows using `compareFee` from `src/lib/fees.ts` on the matching cell text; show a ▲/▼ indicator.
  - Re-apply search+filter after sort.

- [ ] **Step 4:** Verify build + type check. Run: `npx astro check && npx astro build` → success.
- [ ] **Step 5:** Commit. `git commit -m "feat: add comparison table with sort/filter/search"`

### Task 10: Index page

**Files:** Modify `src/pages/index.astro`.

- [ ] **Step 1:** Compose `Base` + a compact hero (title "Malaysia Payment Gateways", one-line subtitle, count of gateways) + `TableControls` + `GatewayTable`.
- [ ] **Step 2:** Verify visually. Run `npm run dev`: table renders all 11 rows; search/filter/sort work; rows link to detail; layout matches dark tokens.
- [ ] **Step 3:** Commit. `git commit -m "feat: build index page with hero + comparison table"`

---

## Chunk 4: Detail Pages

### Task 11: Per-gateway detail page

**Files:** Create `src/pages/gateway/[slug].astro`.

- [ ] **Step 1:** `getStaticPaths()` from `getCollection("gateways")`, mapping `params.slug` → entry.
- [ ] **Step 2:** Render: header (Logo, name, tagline, "Visit website" + "Register" buttons → `website`); full fee breakdown table (all channels incl. `card_intl`, setup, monthly, min_txn, settlement); feature badges (no-code/API/recurring); rendered markdown body (`<Content />`); "Integration skill: `{skill}`" line; `Source` link + `Last verified {verified_date}`; back-to-table link.
- [ ] **Step 3:** Verify. Run `npx astro build`: confirm 11 `/gateway/*` pages generated; spot-check one in dev.
- [ ] **Step 4:** Commit. `git commit -m "feat: add per-gateway detail pages"`

---

## Chunk 5: Build, Verify, Deploy

### Task 12: Final verification pass

- [ ] **Step 1:** Run full test + check + build:

```bash
npx vitest run && npx astro check && npx astro build
```

Expected: tests pass, 0 check errors, build succeeds, `dist/` contains `index.html` + `gateway/<slug>/index.html` ×11.

- [ ] **Step 2:** Preview the production build. Run: `npx astro preview` → click through table → detail → back. Confirm sort/filter/search and links work on the built output.
- [ ] **Step 3:** Add a short `README.md` (what it is, how to run, how to add a new gateway = "drop a new file in `src/content/gateways/`"). Commit. `git commit -m "docs: add README"`

### Task 13: Cloudflare Pages deploy

**Files:** Create `wrangler.toml` (optional) / document dashboard settings.

- [ ] **Step 1:** Confirm `astro.config.mjs` has `output: "static"` (default) — no adapter needed for a pure static Pages deploy.
- [ ] **Step 2:** Document deploy in README — two options:
  - **Dashboard (recommended):** connect the git repo in Cloudflare Pages → Framework preset **Astro** → build command `npm run build` → output dir `dist`.
  - **CLI:** `npx wrangler pages deploy dist --project-name=mpg`.
- [ ] **Step 3:** (AFU-run, needs Cloudflare auth) push the repo to a git remote and connect it in Cloudflare Pages, or run the wrangler command.
- [ ] **Step 4:** Verify the deployed URL loads (dark table, detail pages reachable). Commit any config. `git commit -m "chore: add Cloudflare Pages deploy config + docs"`

---

## Done when

- `npx vitest run && npx astro check && npx astro build` all green.
- 11 gateways render in the comparison table with working sort/filter/search.
- Each gateway has a detail page with full fees, source, and verified date.
- Site live on Cloudflare Pages.
- Adding a provider later = one new `.md` file, no code changes.
