---
status: done
created: 2026-06-24
---
> Shipped 2026-06-24 as a full "Developer experience" dimension. Schema: `mcp`
> (official/community/none, default none), `webhooks`, `plugins[]`, `dev_docs`.
> MCP official: Stripe, Curlec, HitPay, Airwallex; community: Xendit, Bayarcash.
> UI: detail-page Developer-experience section, MCP badge in the table, and
> Webhooks/MCP/Plugins rows in `/compare`. Data sourced via 5 research agents.

# MCP / AI-agent support dimension

## Why
Source: a Threads thread (yusufsuhair, 2026-06) on MY payment gateways. Key insight
the directory doesn't capture yet: **MCP / AI-agent readiness**. Stripe, PayPal and
Adyen ship official MCP servers; most Malaysian gateways don't (they offer API docs,
webhooks, WooCommerce/Shopify plugins, manual integration). For a developer-facing
directory this is a strong differentiator — "which gateway is AI-agent-friendly".

## Goal
Show, per gateway, how AI-agent / developer friendly it is — at minimum whether it
has an official MCP server.

## Scope (proposed)
- New optional schema field `mcp: "official" | "community" | "none"` (or a simple
  boolean + notes). Maybe a companion `dev_docs` URL.
- Display: a small badge/column ("MCP", "AI-ready") on table + a line on detail +
  a row in `/compare`.
- Optional broader "developer experience" note (clear API, stable webhooks, recurring,
  refunds, reconciliation) — but keep it factual/sourced, not opinion.

## Data (to verify before building — do NOT assume)
- Stripe (stripe-malaysia): official MCP server → likely "official".
- Curlec (Razorpay): Razorpay has shipped MCP tooling → verify.
- Others (Billplz, senangPay, toyyibPay, Fiuu, iPay88, eGHL, HitPay, Xendit, CHIP…):
  check each for an official MCP server; default "none" with API/plugin notes.

## Hard rule
Same as fees — never fabricate. "official" only if the provider actually ships an
MCP server (cite it). Unknown/none → "none". Don't overstate.

## Open question for AFU
Build it? And how rich — a simple MCP badge (official/none), or a fuller
"developer experience" section (MCP + API + webhooks + recurring)?
