---
status: in-progress   # suggested | approved | in-progress | done | rejected
created: 2026-06-27
---

> **Built 2026-06-27 (both phases).**
> Phase 1 (LIVE-able on push): `src/lib/api.ts` (+ api.test.ts, 6 tests), static endpoints
> `src/pages/api/gateways.json.ts` + `src/pages/api/gateways/[slug].json.ts` → `dist/api/*.json`,
> docs `src/pages/learn/api.astro` linked from the `/learn` hub. astro check 0, build 69, vitest 34/34.
> Phase 2 (built, needs AFU deploy): standalone Worker in `mcp/` (McpAgent + McpServer, Streamable
> HTTP `/mcp`, DO `MpgMCP` SQLite migration, var `MPG_API_BASE`). Tools: list_gateways, get_gateway,
> compare_gateways, recommend_gateway — read from the Phase-1 JSON API (cached). `tsc --noEmit` 0,
> `wrangler deploy --dry-run` OK (360 KiB gzip). NOT auto-deployed (GitHub Actions only deploys the
> Pages `dist`); AFU runs `cd mcp && npx wrangler login && npm run deploy`, then connects clients to
> `https://mpg-mcp.<account>.workers.dev/mcp`. Root `tsconfig.json` excludes `mcp/` (own tsconfig).
> Live MCP handshake unverified here (needs deploy + an MCP client) — to confirm post-deploy.

# Machine-readable API + MCP for the gateway directory

## Goal
Let developers AND AI coding agents consume the MPG directory programmatically, so
"pick the right Malaysian gateway" can be automated (queried, embedded, or asked of
an AI agent). AFU approved a phased build: **JSON API first, then MCP on top**.

## Scope (in / out)
IN:
- Phase 1 (this session): static, build-time **JSON API** + a `/learn/api` docs page.
- Phase 2 (next): **MCP server** (separate Cloudflare Worker, not the Astro app) exposing
  list/get/recommend/compare tools over the same data.
OUT: a live/dynamic backend for the Astro app (stays static — hard rule); auth/rate-limiting
(public read-only data); write endpoints.

## Approach

### Phase 1 — Static JSON API (no server)
The site is static, so the "API" is JSON emitted at build time to `dist/api/…` via Astro
static endpoints (`prerender = true`). No runtime, RM0, fits "content stays static".
- `src/lib/api.ts`: `toApiGateway(entry)` maps a content entry → a clean API object
  (slug, name, category, website, tagline, access {key,short}, fees, **est_fee_rm100** +
  **rankable** (from `gatewayCost`), channels, features, methods, banks, mcp, webhooks,
  plugins, dev_docs, skill, popularity, verified_date, source). `buildApiPayload(entries, date)`
  wraps them with `schema`, `generated_at`, `count`, `disclaimer`, `weighting`, and a
  `gateways[]` sorted like the table default (rankable by cost, then popularity).
- `src/pages/api/gateways.json.ts` → `/api/gateways.json` (all 59).
- `src/pages/api/gateways/[slug].json.ts` → `/api/gateways/<slug>.json` (one gateway).
- `src/pages/learn/api.astro` → docs: endpoints, field table, example queries (curl/fetch +
  "cheapest FPX gateway"), and the sourcing disclaimer (verified_date/source/`*` indicative).
- Link the docs page from the `/learn` hub.

### Phase 2 — MCP server (next session)
- A standalone Cloudflare Worker (own folder/repo) serving MCP over Streamable HTTP. NOT
  `@astrojs/cloudflare` (Astro 7 incompatible) — a separate Worker keeps the static app clean.
- Tools: `list_gateways(filter)`, `get_gateway(slug)`, `compare_gateways(slugs[])`,
  `recommend_gateway({channels, features, budget_sensitivity})` using the effective-cost rank.
- Data source = the same `gateways.json` build artifact (fetch or bundle), so one source of truth.
- Add an MCP entry/badge on `/learn/ai-agents` (already explains MCP).

## Acceptance criteria (Phase 1)
- `dist/api/gateways.json` and per-slug files build; valid JSON; include `est_fee_rm100`,
  `rankable`, `verified_date`, `source`, and a disclaimer.
- `/learn/api` page documents endpoints + fields + a disclaimer; linked from `/learn`.
- `toApiGateway` unit-tested. astro check 0, build green, vitest green.
- No fabricated data; indicative `*` and "Contact sales" preserved as-is.

## Notes
- Data is already semi-public (the table embeds `<script id="gw-data">`); the API just
  formalises it as machine-readable. Low risk.
- est_fee_rm100 mirrors the site ranking (RM100 basket, FPX/card/e-wallet 50/30/20); consumers
  must treat fees as indicative (disclaimer + verified_date). Keep the sourcing discipline.
- Phase 2 MCP is the bigger lift (needs a runtime) but is on-brand (MPG already leans into
  AI agents: /learn/ai-agents, `skill:`, MCP badges, Copy-prompt).
