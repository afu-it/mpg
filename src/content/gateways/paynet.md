---
name: PayNet (DuitNow / FPX)
website: https://www.paynet.my
tagline: "Malaysia's national payments backbone: FPX, DuitNow & DuitNow QR"
category: infrastructure
fees:
  fpx: "—"
  card: "—"
  ewallet: "—"
  duitnowqr: "—"
  setup: "—"
  monthly: "—"
settlement: "—"
min_txn: "—"
channels: [fpx, duitnowqr]
methods:
  - FPX
  - DuitNow
  - DuitNow QR
  - JomPAY
  - MyDebit
features:
  no_code: false
  api: false
  recurring: false
popularity: 0
verified_date: "2026-06-24"
source: "https://www.paynet.my"
notes: "Payments Network Malaysia Sdn Bhd is the national payments infrastructure majority-owned by Bank Negara Malaysia, NOT a merchant gateway. Merchants do not sign up with PayNet directly; they connect to FPX / DuitNow / DuitNow QR through a bank or a licensed payment gateway (PSP). Listed here for context only; fees are set by the connecting gateway, so all fee fields are not applicable."
---

PayNet (**Payments Network Malaysia Sdn Bhd**) operates Malaysia's shared
payment rails: **FPX** (direct-to-bank online payments), **DuitNow** (instant
transfers), **DuitNow QR** (the national QR standard), **JomPAY** and
**MyDebit**. It is majority-owned by Bank Negara Malaysia.

It is included here as **infrastructure, not a merchant gateway**: a business
cannot "sign up with PayNet" to accept payments. Instead, the payment gateways
elsewhere in this directory connect to PayNet's rails on a merchant's behalf, and
those gateways set the actual fees. This entry exists so the rails behind FPX and
DuitNow are documented; its fee fields are intentionally left blank ("—").
