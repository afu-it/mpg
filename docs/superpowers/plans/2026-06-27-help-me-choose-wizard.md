# "Help me choose" Wizard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/choose` page: a fit-first 4-question wizard that returns a ranked shortlist of matching Malaysian payment gateways, driven by a new pure `recommend()` engine.

**Architecture:** A new pure, unit-tested `src/lib/recommend.ts` (filter by needs → rank by the existing effective-cost) is the core. `src/pages/choose.astro` embeds the gateway data as JSON (the `compare.astro` pattern) and renders a static 4-step form + results container; `src/scripts/choose.ts` runs the wizard client-side and renders the shortlist. Entry points link in from the landing page, footer, and `/learn`. No backend (stays static).

**Tech Stack:** Astro 7 (static), TypeScript, Tailwind v4, Vitest. Reuses `src/lib/api.ts` (`toApiGateway`, `ApiGateway`) and `src/lib/fees.ts` (`gatewayCost`) — no new deps.

## Global Constraints

- Pure static site — `prerender = true` on the page; no SSR adapter, no `@astrojs/cloudflare`.
- Fees are sourced — never fabricate; recommendations reuse `est_fee_rm100`/`rankable` from `gatewayCost`. Indicative `*` and "Contact sales" preserved.
- No em-dashes in prose copy (house style); the standalone `"—"` fee placeholder is data.
- Recommendations must agree with `/gateways` and `/api/gateways.json` for the same gateway.
- After editing a `src/scripts/*.ts` client script, hard-refresh the browser (NTFS HMR lag).
- Verify with `npm test`, `npx astro check`, `npm run build` — not chrome-devtools unless asked.

---

### Task 1: `recommend()` engine (pure, TDD)

**Files:**
- Create: `src/lib/recommend.ts`
- Test: `src/lib/recommend.test.ts`

**Interfaces:**
- Consumes: `ApiGateway` type from `src/lib/api.ts` (fields used: `slug, name, category, channels, features {no_code,api,recurring}, est_fee_rm100, rankable, popularity`).
- Produces:
  - `type Channel = "fpx" | "card" | "ewallet" | "duitnowqr" | "bnpl"`
  - `interface Needs { channels?: Channel[]; recurring?: boolean; noCode?: boolean; developer?: boolean; access?: "integrate" | "account" | "bnpl" }`
  - `interface Match { gateway: ApiGateway; reasons: string[] }`
  - `recommend(gateways: ApiGateway[], needs: Needs, limit?: number): Match[]`
  - `recommendOrClosest(gateways: ApiGateway[], needs: Needs, limit?: number): { matches: Match[]; relaxed: string[] }`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/recommend.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { recommend, recommendOrClosest, type Needs } from "./recommend";
import type { ApiGateway } from "./api";

// minimal ApiGateway fixture factory (only fields recommend() reads)
function gw(p: Partial<ApiGateway> & { slug: string }): ApiGateway {
  return {
    slug: p.slug,
    name: p.name ?? p.slug,
    category: p.category ?? "gateway",
    website: "https://x",
    tagline: "",
    access: { key: "integrate", short: "Integrate" },
    fees: {},
    est_fee_rm100: p.est_fee_rm100 ?? null,
    rankable: p.rankable ?? (p.est_fee_rm100 != null),
    channels: p.channels ?? [],
    features: p.features ?? { no_code: false, api: false, recurring: false },
    methods: [],
    banks: [],
    mcp: "none",
    webhooks: null,
    plugins: [],
    dev_docs: null,
    skill: null,
    popularity: p.popularity ?? 0,
    verified_date: "2026-06-27",
    source: "https://x",
  };
}

const chip = gw({ slug: "chip", channels: ["fpx", "card", "ewallet"], est_fee_rm100: 1.38, features: { no_code: true, api: true, recurring: true } });
const billplz = gw({ slug: "billplz", channels: ["fpx", "card", "ewallet"], est_fee_rm100: 1.47, features: { no_code: true, api: true, recurring: true } });
const ipay88 = gw({ slug: "ipay88", channels: ["fpx", "card"], est_fee_rm100: null, popularity: 100, features: { no_code: true, api: true, recurring: true } });
const cimb = gw({ slug: "cimb", category: "bank", channels: ["card"], est_fee_rm100: null, popularity: 52 });
const atome = gw({ slug: "atome", category: "bnpl", channels: ["bnpl"], est_fee_rm100: null, popularity: 75 });
const paynet = gw({ slug: "paynet", category: "infrastructure", channels: [] });
const all = [chip, billplz, ipay88, cimb, atome, paynet];

describe("recommend", () => {
  it("matches only gateways that support ALL requested channels", () => {
    const r = recommend(all, { channels: ["fpx", "card"] });
    const slugs = r.map((m) => m.gateway.slug);
    expect(slugs).toContain("chip");
    expect(slugs).toContain("billplz");
    expect(slugs).not.toContain("cimb"); // no fpx
    expect(slugs).not.toContain("atome");
  });

  it("ranks rankable gateways by est_fee, then non-rankable by popularity", () => {
    const r = recommend(all, { channels: ["fpx", "card"] });
    expect(r.map((m) => m.gateway.slug)).toEqual(["chip", "billplz", "ipay88"]);
  });

  it("filters by recurring / no-code / developer", () => {
    expect(recommend([chip, cimb], { recurring: true }).map((m) => m.gateway.slug)).toEqual(["chip"]);
    expect(recommend([chip, cimb], { developer: true }).map((m) => m.gateway.slug)).toEqual(["chip"]);
  });

  it("maps access: integrate→gateway, account→bank/ewallet, bnpl→bnpl", () => {
    expect(recommend(all, { access: "integrate" }).every((m) => m.gateway.category === "gateway")).toBe(true);
    expect(recommend(all, { access: "account" }).map((m) => m.gateway.slug)).toEqual(["cimb"]);
    expect(recommend(all, { access: "bnpl" }).map((m) => m.gateway.slug)).toEqual(["atome"]);
  });

  it("never returns infrastructure", () => {
    expect(recommend(all, {}).some((m) => m.gateway.slug === "paynet")).toBe(false);
  });

  it("builds human reasons from the satisfied needs", () => {
    const m = recommend(all, { channels: ["fpx", "card"], recurring: true })[0];
    expect(m.reasons).toContain("Supports FPX, cards");
    expect(m.reasons).toContain("Recurring billing");
  });
});

describe("recommendOrClosest", () => {
  it("returns strict matches with no relaxation when matches exist", () => {
    const out = recommendOrClosest(all, { channels: ["fpx"] });
    expect(out.relaxed).toEqual([]);
    expect(out.matches.length).toBeGreaterThan(0);
  });

  it("relaxes the access filter first when nothing matches", () => {
    // bank + needs e-wallet channel → no bank has ewallet here, so access gets relaxed
    const out = recommendOrClosest(all, { access: "account", channels: ["fpx"] });
    expect(out.relaxed).toContain("access type");
    expect(out.matches.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the tests and watch them fail**

Run: `npm test -- recommend`
Expected: FAIL — `Cannot find module './recommend'` (or "recommend is not a function").

- [ ] **Step 3: Write `src/lib/recommend.ts`**

```ts
// Pure recommendation engine: filter gateways by a merchant's needs, then rank by the
// same effective cost the rest of the site uses. No DOM. Reused by /choose and (later)
// the programmatic SEO pages.
import type { ApiGateway } from "./api";

export type Channel = "fpx" | "card" | "ewallet" | "duitnowqr" | "bnpl";

export interface Needs {
  channels?: Channel[]; // gateway must support ALL of these
  recurring?: boolean;
  noCode?: boolean;
  developer?: boolean;
  access?: "integrate" | "account" | "bnpl";
}

export interface Match {
  gateway: ApiGateway;
  reasons: string[];
}

const CHANNEL_LABEL: Record<Channel, string> = {
  fpx: "FPX",
  card: "cards",
  ewallet: "e-wallets",
  duitnowqr: "DuitNow QR",
  bnpl: "BNPL",
};

function accessMatches(g: ApiGateway, access: NonNullable<Needs["access"]>): boolean {
  if (access === "integrate") return g.category === "gateway";
  if (access === "account") return g.category === "bank" || g.category === "ewallet";
  return g.category === "bnpl";
}

function matchesNeeds(g: ApiGateway, n: Needs): boolean {
  if (g.category === "infrastructure") return false;
  if (n.channels) for (const c of n.channels) if (!g.channels.includes(c)) return false;
  if (n.recurring && !g.features.recurring) return false;
  if (n.noCode && !g.features.no_code) return false;
  if (n.developer && !g.features.api) return false;
  if (n.access && !accessMatches(g, n.access)) return false;
  return true;
}

function reasonsFor(g: ApiGateway, n: Needs): string[] {
  const r: string[] = [];
  if (n.channels && n.channels.length)
    r.push("Supports " + n.channels.map((c) => CHANNEL_LABEL[c]).join(", "));
  if (n.recurring) r.push("Recurring billing");
  if (n.noCode) r.push("No-code (payment links)");
  if (n.developer) r.push("Developer API");
  if (n.access === "integrate") r.push("Integrate yourself");
  if (n.access === "account") r.push("Merchant account");
  if (n.access === "bnpl") r.push("BNPL at checkout");
  return r;
}

function rank(a: ApiGateway, b: ApiGateway): number {
  if (a.rankable !== b.rankable) return a.rankable ? -1 : 1;
  if (a.rankable && b.rankable)
    return (a.est_fee_rm100 ?? Infinity) - (b.est_fee_rm100 ?? Infinity);
  return b.popularity - a.popularity;
}

export function recommend(gateways: ApiGateway[], needs: Needs, limit = 5): Match[] {
  return gateways
    .filter((g) => matchesNeeds(g, needs))
    .sort(rank)
    .slice(0, limit)
    .map((g) => ({ gateway: g, reasons: reasonsFor(g, needs) }));
}

// If nothing matches, drop constraints in priority order until something does,
// reporting which constraints were relaxed.
export function recommendOrClosest(
  gateways: ApiGateway[],
  needs: Needs,
  limit = 5,
): { matches: Match[]; relaxed: string[] } {
  let matches = recommend(gateways, needs, limit);
  if (matches.length) return { matches, relaxed: [] };

  const relaxed: string[] = [];
  const n: Needs = { ...needs, channels: needs.channels ? [...needs.channels] : undefined };
  const retry = (label: string) => {
    relaxed.push(label);
    matches = recommend(gateways, n, limit);
    return matches.length > 0;
  };

  if (n.access) { delete n.access; if (retry("access type")) return { matches, relaxed }; }
  if (n.developer || n.noCode) { delete n.developer; delete n.noCode; if (retry("integration style")) return { matches, relaxed }; }
  if (n.recurring) { delete n.recurring; if (retry("recurring")) return { matches, relaxed }; }
  while (n.channels && n.channels.length) {
    const dropped = n.channels[n.channels.length - 1];
    n.channels = n.channels.slice(0, -1);
    if (!n.channels.length) delete n.channels;
    if (retry(`${CHANNEL_LABEL[dropped]} channel`)) return { matches, relaxed };
  }
  return { matches: recommend(gateways, {}, limit), relaxed: ["all filters"] };
}
```

- [ ] **Step 4: Run the tests and watch them pass**

Run: `npm test -- recommend`
Expected: PASS (all recommend + recommendOrClosest cases).

- [ ] **Step 5: Commit**

```bash
git add src/lib/recommend.ts src/lib/recommend.test.ts
git commit -m "feat: recommend() engine for the choose wizard (pure, tested)"
```

---

### Task 2: `/choose` page shell + embedded data

**Files:**
- Create: `src/pages/choose.astro`

**Interfaces:**
- Consumes: `getCollection("gateways")`, `toApiGateway` from `src/lib/api.ts`, `Logo` resolution pattern from `src/pages/compare.astro` (the `import.meta.glob` logo map).
- Produces: a static page at `/choose` with `<script type="application/json" id="gw-data">` (array of `ApiGateway & { logo: string | null }`), a 4-step `<form>` (each step a `<fieldset hidden>` except the first), and an empty `<div id="choose-results" hidden>`. The client script (Task 3) drives it.

- [ ] **Step 1: Create the page**

Create `src/pages/choose.astro` (mirror the data + logo embedding from `compare.astro`):

```astro
---
export const prerender = true;

import { getCollection } from "astro:content";
import Base from "../layouts/Base.astro";
import { toApiGateway, type GatewayEntryLike } from "../lib/api";

const entries = (await getCollection("gateways")) as unknown as GatewayEntryLike[];

const logos = import.meta.glob("/src/assets/logos/*.{svg,png,webp}", {
  eager: true, query: "?url", import: "default",
});
const logoBySlug: Record<string, string> = {};
for (const [path, url] of Object.entries(logos)) {
  const key = path.split("/").pop()!.replace(/\.\w+$/, "");
  if (!logoBySlug[key] || path.endsWith(".svg")) logoBySlug[key] = url as string;
}

const data = entries.map((e) => ({ ...toApiGateway(e), logo: logoBySlug[e.id] ?? null }));

const channels = [
  { key: "fpx", label: "FPX (online banking)" },
  { key: "card", label: "Cards" },
  { key: "ewallet", label: "E-wallets" },
  { key: "duitnowqr", label: "DuitNow QR" },
  { key: "bnpl", label: "BNPL (instalments)" },
];
const card = "rounded-md border border-line bg-panel p-4 cursor-pointer hover:border-accent";
---

<Base title="Help me choose a Malaysia payment gateway | MPG" description="Answer a few questions and get a ranked shortlist of Malaysian payment gateways that fit your needs, cheapest first.">
  <div class="mx-auto max-w-2xl">
    <h1 class="text-2xl font-semibold tracking-tight text-fg">Help me choose</h1>
    <p class="mt-2 text-muted">Answer up to four questions. We will shortlist the gateways that fit, cheapest first.</p>

    <form id="choose-form" class="mt-8 space-y-4">
      <!-- Step 1: integration style -->
      <fieldset data-step="0" class="space-y-3">
        <legend class="text-base font-medium text-fg">How do you want to integrate?</legend>
        {[{v:"any",l:"No preference"},{v:"nocode",l:"No-code (payment links)"},{v:"developer",l:"Developer (API / plugin)"}].map((o) => (
          <label class={card}><input type="radio" name="integration" value={o.v} checked={o.v === "any"} class="mr-2" />{o.l}</label>
        ))}
      </fieldset>

      <!-- Step 2: channels (multi) -->
      <fieldset data-step="1" hidden class="space-y-3">
        <legend class="text-base font-medium text-fg">Which payment methods do you need?</legend>
        {channels.map((c) => (
          <label class={card}><input type="checkbox" name="channel" value={c.key} class="mr-2" />{c.label}</label>
        ))}
      </fieldset>

      <!-- Step 3: recurring -->
      <fieldset data-step="2" hidden class="space-y-3">
        <legend class="text-base font-medium text-fg">Do you need recurring / subscriptions?</legend>
        {[{v:"any",l:"No preference"},{v:"yes",l:"Yes"},{v:"no",l:"No"}].map((o) => (
          <label class={card}><input type="radio" name="recurring" value={o.v} checked={o.v === "any"} class="mr-2" />{o.l}</label>
        ))}
      </fieldset>

      <!-- Step 4: access type -->
      <fieldset data-step="3" hidden class="space-y-3">
        <legend class="text-base font-medium text-fg">How do you want to onboard?</legend>
        {[{v:"any",l:"No preference"},{v:"integrate",l:"Integrate yourself (gateway)"},{v:"account",l:"Merchant account (bank / e-wallet)"},{v:"bnpl",l:"BNPL at checkout"}].map((o) => (
          <label class={card}><input type="radio" name="access" value={o.v} checked={o.v === "any"} class="mr-2" />{o.l}</label>
        ))}
      </fieldset>

      <div class="flex items-center gap-3 pt-2">
        <button type="button" id="choose-back" hidden class="rounded-md border border-line px-4 py-2 text-sm text-muted hover:text-fg">Back</button>
        <button type="button" id="choose-next" class="ml-auto rounded-md bg-accent px-4 py-2 text-sm font-medium text-white">Next</button>
      </div>
    </form>

    <div id="choose-results" hidden class="mt-8"></div>
  </div>

  <script type="application/json" id="gw-data" set:html={JSON.stringify(data)} />
  <script>
    import "../scripts/choose.ts";
  </script>
</Base>
```

- [ ] **Step 2: Verify it builds and renders the form**

Run: `npx astro check && npm run build`
Expected: 0 errors; build includes `/choose`; `dist/choose/index.html` exists with the four `<fieldset>`s and the `gw-data` script.

- [ ] **Step 3: Commit**

```bash
git add src/pages/choose.astro
git commit -m "feat: /choose wizard page shell + embedded gateway data"
```

---

### Task 3: `/choose` wizard script (interactivity + results)

**Files:**
- Create: `src/scripts/choose.ts`

**Interfaces:**
- Consumes: the DOM from Task 2 (`#choose-form`, `[data-step]`, `#choose-next`, `#choose-back`, `#choose-results`, `#gw-data`), and `recommendOrClosest`, `Needs`, `Channel` from `src/lib/recommend.ts`.
- Produces: client behaviour only (no exports). Renders shortlist cards into `#choose-results`.

- [ ] **Step 1: Create the script**

Create `src/scripts/choose.ts`:

```ts
// Client behaviour for the /choose wizard: step navigation, collect Needs, render shortlist.
import { recommendOrClosest, type Needs, type Channel } from "../lib/recommend";
import type { ApiGateway } from "../lib/api";

type Row = ApiGateway & { logo: string | null };

const raw = document.getElementById("gw-data")?.textContent;
const form = document.getElementById("choose-form");
const results = document.getElementById("choose-results");
const nextBtn = document.getElementById("choose-next") as HTMLButtonElement | null;
const backBtn = document.getElementById("choose-back") as HTMLButtonElement | null;

if (raw && form && results && nextBtn && backBtn) {
  const gateways = JSON.parse(raw) as Row[];
  const steps = Array.from(form.querySelectorAll<HTMLElement>("[data-step]"));
  let step = 0;

  function show(i: number) {
    steps.forEach((s, idx) => (s.hidden = idx !== i));
    backBtn!.hidden = i === 0;
    nextBtn!.textContent = i === steps.length - 1 ? "See results" : "Next";
  }

  function readNeeds(): Needs {
    const fd = new FormData(form as HTMLFormElement);
    const n: Needs = {};
    const channels = fd.getAll("channel").map(String) as Channel[];
    if (channels.length) n.channels = channels;
    if (fd.get("recurring") === "yes") n.recurring = true;
    const integration = fd.get("integration");
    if (integration === "nocode") n.noCode = true;
    if (integration === "developer") n.developer = true;
    const access = fd.get("access");
    if (access === "integrate" || access === "account" || access === "bnpl") n.access = access;
    return n;
  }

  function esc(s: string) {
    return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  }

  function render() {
    const needs = readNeeds();
    const { matches, relaxed } = recommendOrClosest(gateways as ApiGateway[], needs, 5);
    const ids = matches.map((m) => m.gateway.slug).join(",");
    const note = relaxed.length
      ? `<p class="mb-3 text-sm text-muted">No exact match, so we relaxed: ${esc(relaxed.join(", "))}.</p>`
      : `<p class="mb-3 text-sm text-muted">${matches.length} gateway${matches.length === 1 ? "" : "s"} fit your needs, cheapest first.</p>`;

    const cards = matches.map((m) => {
      const g = m.gateway as Row;
      const fee = g.rankable ? `RM${g.est_fee_rm100!.toFixed(2)} / RM100` : "Pricing on request";
      const chips = m.reasons.map((r) => `<span class="rounded-full border border-line px-2 py-0.5 text-xs text-muted">${esc(r)}</span>`).join(" ");
      const logo = g.logo ? `<img src="${esc(g.logo)}" alt="" width="24" height="24" class="rounded" />` : "";
      return `<div class="rounded-md border border-line bg-panel p-4">
        <div class="flex items-center gap-2.5">
          ${logo}<a href="/gateway/${esc(g.slug)}" class="font-medium text-fg hover:text-accent">${esc(g.name)}</a>
          <span class="ml-auto text-sm ${g.rankable ? "text-fg" : "text-muted"}">${esc(fee)}</span>
        </div>
        <div class="mt-2 flex flex-wrap gap-1.5">${chips}</div>
        <div class="mt-3 flex gap-3 text-sm">
          <a href="/gateway/${esc(g.slug)}" class="text-accent hover:underline">View details</a>
        </div>
      </div>`;
    }).join("");

    const empty = matches.length ? "" : `<p class="text-muted">No gateways found. <a href="/gateways" class="text-accent hover:underline">Browse all</a>.</p>`;
    const compare = matches.length ? `<a href="/compare?ids=${encodeURIComponent(ids)}" class="text-accent hover:underline">Compare these →</a>` : "";

    results!.innerHTML = `${note}<div class="space-y-3">${cards}</div>${empty}
      <div class="mt-5 flex gap-4 text-sm">${compare}
        <button type="button" id="choose-restart" class="text-muted hover:text-fg">Start over</button>
        <a href="/gateways" class="text-muted hover:text-fg">Browse all</a></div>`;
    results!.hidden = false;
    document.getElementById("choose-restart")?.addEventListener("click", restart);
  }

  function restart() {
    (form as HTMLFormElement).reset();
    results!.hidden = true;
    results!.innerHTML = "";
    step = 0;
    show(0);
    form!.hidden = false;
    (nextBtn!.parentElement as HTMLElement).hidden = false;
  }

  nextBtn.addEventListener("click", () => {
    if (step < steps.length - 1) { step++; show(step); }
    else { form!.hidden = true; (nextBtn.parentElement as HTMLElement).hidden = true; render(); }
  });
  backBtn.addEventListener("click", () => { if (step > 0) { step--; show(step); } });

  show(0);
}
```

- [ ] **Step 2: Verify build + types**

Run: `npx astro check && npm run build`
Expected: 0 errors; `/choose` builds. (No unit test — DOM script.)

- [ ] **Step 3: Manual smoke (record result)**

Run the dev server and open `/choose`: step through (e.g. FPX + cards, recurring yes), confirm a ranked shortlist appears (chip / billplz near the top), "Compare these" links to `/compare?ids=...`, "Start over" resets. Hard-refresh after edits (NTFS HMR).

- [ ] **Step 4: Commit**

```bash
git add src/scripts/choose.ts
git commit -m "feat: /choose wizard interactivity + ranked shortlist rendering"
```

---

### Task 4: Entry points (landing CTA, footer, /learn)

**Files:**
- Modify: `src/pages/index.astro` (landing — add a CTA)
- Modify: `src/layouts/Base.astro:73` (footer — add a link next to the existing API link)
- Modify: `src/pages/learn/index.astro` (add a `/choose` card to the hub `sections` array)

**Interfaces:**
- Consumes: nothing new. Produces: three links pointing to `/choose`.

- [ ] **Step 1: Add the landing CTA**

In `src/pages/index.astro`, add near the primary hero actions (follow the existing button styles in that file — a prominent secondary CTA):

```astro
<a href="/choose" class="inline-flex items-center gap-1.5 rounded-md border border-line bg-panel px-4 py-2 text-sm font-medium text-fg hover:border-accent">
  Not sure? Help me choose →
</a>
```

- [ ] **Step 2: Add the footer link**

In `src/layouts/Base.astro`, extend the developer footer line (the `<a href="/learn/api">` added earlier) so it reads two links:

```astro
<p class="pt-1">
  <a href="/choose" class="text-muted underline-offset-2 hover:text-fg hover:underline">Help me choose</a>
  <span class="px-1">·</span>
  <a href="/learn/api" class="text-muted underline-offset-2 hover:text-fg hover:underline">API &amp; MCP for developers</a>
</p>
```

- [ ] **Step 3: Add the /learn hub card**

In `src/pages/learn/index.astro`, add to the `sections` array:

```ts
{
  href: "/choose",
  title: "Help me choose",
  desc: "Answer a few questions and get a ranked shortlist of gateways that fit your needs, cheapest first.",
},
```

- [ ] **Step 4: Verify + commit**

Run: `npx astro check && npm run build && npm test`
Expected: 0 errors; build green; vitest green.

```bash
git add src/pages/index.astro src/layouts/Base.astro src/pages/learn/index.astro
git commit -m "feat: surface /choose from landing, footer and /learn"
```

---

## Self-Review

**Spec coverage:** page `/choose` (Task 2/3) ✓; pure `recommend()` lib + tests (Task 1) ✓; client script (Task 3) ✓; entry points landing+footer+/learn (Task 4) ✓; 4 questions → Needs (Task 2/3) ✓; access mapping (Task 1 `accessMatches`) ✓; rank cost→popularity (Task 1 `rank`) ✓; reasons (Task 1 `reasonsFor`) ✓; empty/relaxation (Task 1 `recommendOrClosest`) ✓; all-on-request shown by popularity (Task 1 rank + Task 3 "Pricing on request") ✓; Compare-these deep link (Task 3) ✓; testing (Task 1 vitest; Tasks 2-4 build) ✓. No spec requirement left unimplemented.

**Placeholder scan:** none — every code step has complete code; commands have expected output.

**Type consistency:** `Needs`, `Match`, `Channel`, `recommend`, `recommendOrClosest` defined in Task 1 and consumed with the same names/signatures in Task 3; `ApiGateway`/`toApiGateway`/`GatewayEntryLike` come from `src/lib/api.ts` (existing) and are used consistently; `Row = ApiGateway & { logo }` matches the embed shape from Task 2.

**Notes:** Spec B (programmatic SEO pages) reuses `recommend()` from Task 1 — out of scope here.
