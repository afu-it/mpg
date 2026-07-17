---
status: done   # shipped 2026-07-17: 16 gateways / 46 plans live; follow-ups (unpublished rates, HLB/Kiple re-verify) in BACKLOG
created: 2026-07-17
---
# Per-plan pricing on gateway detail pages

## Goal
The single fee table flattens providers that publish MULTIPLE plans (e.g.
toyyibPay Santai RM0 B2C FPX for NPOs w/ 10-day settlement vs Standard RM1 w/
1-4 days; Billplz Basic vs Premium). Show every published plan side by side so
users never have to open 63 provider websites themselves — that comparison IS
the product.

## Approach
- Schema: optional `plans[]` on the gateways collection:
  `{ name, eligibility?, rows: [{label, value}], settlement?, source? }`.
  Generic label/value rows absorb any plan shape (B2C/B2B splits, tiers).
- UI: "Plans" section on the detail page (left data column, under the fee
  table): one quiet column per plan (grid sm:grid-cols-2/3), name + eligibility
  + divide-y rows + settlement, minimalist (no heavy cards). Renders only when
  `plans` exists; the main fee table stays the canonical blended view.
- Data: 7 parallel research subagents sweep ALL 63 gateways' official
  pricing pages (2026-07-17). HARD RULE unchanged: officially published plans
  only; unpublished = not recorded; every plan carries its exact source URL.
  Single-plan / no-published gateways simply don't get a `plans` block.
- Ranking is untouched: est fee / RM100 keeps using the default (standard)
  plan's fees fields.

## Acceptance criteria
- Every `plans` entry sourced from the provider's own domain with URL.
- Detail pages without plans render exactly as before.
- Build green, vitest green; plans render check on toyyibPay + Billplz.

## Notes
- Idea confirmed against AFU's own toyyibPay example (Santai/Standard).
- Follow-up candidates: surface "has multiple plans" as a table badge; use
  cheapest-eligible plan in /choose when eligibility matches (needs thought —
  eligibility is conditional, must not distort the general ranking).
