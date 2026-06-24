---
status: done
created: 2026-06-24
---
> Shipped 2026-06-24: `banks`/`methods` schema fields; `src/lib/fpx-banks.ts` shared
> PayNet FPX B2C list; detail page "Supported banks (via FPX)" + "Other payment methods"
> sections; `/compare` Banks + Other-methods rows. Methods backfilled for 8 gateways
> (billplz, senangpay, ipay88, eghl, commercepay, hitpay, stripe-malaysia, fiuu) — more
> can be backfilled as sources are found.

# Supported banks + Other Payment Methods in comparison

## Goal
Let users see, per gateway, **which banks** (online banking) and **which e-wallets /
other payment methods** are supported — visible on the detail page and in `/compare`.

## Scope
- In: new optional schema fields `banks` (string[]) and `methods` (string[]); display
  as chips on the gateway detail page + rows in `/compare`; a compact indicator in the table.
- Banks: FPX uses a national, standardised participating-bank list (PayNet). Store it
  ONCE as a shared sourced constant and show it for any gateway with the `fpx` channel —
  do NOT duplicate 34 near-identical lists. Per-gateway `banks` only when it genuinely
  differs (e.g. card acquirer, non-FPX direct bank rails).
- Methods: e-wallets + extra rails differ per gateway → sourced per gateway
  (Boost, TNG eWallet, GrabPay, ShopeePay, Apple/Google Pay, PayPal, Atome, DuitNow…).
- Out: per-bank fee breakdowns; bank logos.

## Approach
- `src/lib/fpx-banks.ts` — sourced PayNet FPX participating-bank list (B2C), one source.
- Schema: `banks: z.array(z.string()).optional()`, `methods: z.array(z.string()).optional()`.
- Detail page: "Supported banks (via FPX)" section (shared list when `fpx` in channels,
  plus any `banks` override) + "Other payment methods" chips from `methods`.
- `/compare`: add "Banks" + "Other methods" rows.

## Hard rule
Never fabricate. A method is listed only if cited from the provider/source. Unknown →
omit (don't guess). FPX bank list carries its own PayNet source + verified_date.

## Acceptance
- Detail + compare show banks (via FPX) and the gateway's e-wallets, each traceable to a source.
- Existing content without the new fields still validates (fields are optional).
