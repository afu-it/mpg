---
status: suggested
created: 2026-06-24
---
# Learn section (for devs & vibe coders)

> PLAN ONLY for now (owner: "kita plan je, nanti bila2 kita sambung"). Do not build yet.

## Why
The directory compares gateways, but a dev / vibe-coder landing here still has to
figure out HOW to integrate, the jargon, the safe flow, and what to hand an AI agent.
A `/learn` section turns MPG from "compare fees" into "compare + understand + ship".

## Audience
- Malaysian devs integrating a gateway for the first time.
- "Vibe coders" using AI agents (Claude Code, Cursor, Codex) who want copy-paste prompts.

## Key resource (owner's own repo)
`https://github.com/afu-it/malaysia-payment-gateway` — AFU's **agent-skills** collection.
One gateway-agnostic skill (`malaysia-payment-gateway`) + 11 `setup-<gateway>` skills
(chip, curlec, xendit, bayarcash, bcl, toyyibpay, billplz, fiuu, senangpay, hitpay,
stripe-malaysia). These map 1:1 to our `skill:` field in each gateway `.md`.
→ Learn section should surface/link these, and each gateway detail page should link
its `skill:` to the matching repo folder.

## Content outline (proposed)
1. **Glossary** — plain-language terms: FPX, DuitNow QR, e-wallet, BNPL, MDR/discount rate,
   settlement (T+1/T+2), webhook/callback, signature/checksum verification, idempotent
   settlement, sandbox vs live, tokenisation, recurring, **MCP**, **agent skill**.
2. **The safe integration flow** (from the repo's Agent Rules):
   create local pending payment → redirect/checkout → **verify webhook signature** →
   re-fetch state from provider → match provider+ref+amount+currency+status →
   mark paid **idempotently** → tests (invalid sig, duplicate event, wrong amount).
   Emphasise: never unlock paid access from a redirect alone; keep secrets server-side.
3. **Setup with AI agents** — install AFU's skills:
   `npx skills@latest add afu-it/malaysia-payment-gateway --skill setup-<gateway>`
   then copy-paste a ready prompt (the repo's "How To Ask Your Agent" block has one per
   gateway, e.g. "Use $setup-curlec to implement Curlec checkout, callback verification,
   webhook settlement, and tests in this Next.js project.").
4. **MCP / API / AI-agent** — explain the Developer-experience dimension we already ship:
   MCP official (Stripe, Curlec, HitPay, Airwallex) vs API+webhooks+plugins for the rest;
   what MCP unlocks for AI coding tools.
5. **Per-gateway prompt** — on each gateway detail page, a "Copy prompt for your AI agent"
   button generating `Use $setup-<slug> to integrate <name> ...` from its `skill:` field.
6. **Production checklist** — env vars, migrations, webhook URLs set in sandbox+live,
   sandbox success, replay-safe, no fake-redirect unlock, keys separated.

## Scope / shape (decide at build time)
- New `/learn` page (static Astro), linked in the nav.
- Reuse existing `skill:` + new `mcp`/`dev_docs` fields; no new heavy schema.
- Per-gateway "copy prompt" is the highest-value, smallest addition — could ship first.

## Open questions for build time
- One long `/learn` page vs a few sections? Language: EN, or EN+BM?
- Auto-generate the copy-prompt from `skill:`, or curate per gateway?
