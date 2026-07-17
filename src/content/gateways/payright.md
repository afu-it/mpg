---
name: Payright
website: https://www.payright.my
logo: /logos/payright.png
tagline: "Affordable FPX gateway with plans from RM1 per transaction"
fees:
  fpx: "RM1.50"
  card: "Contact sales"
  ewallet: "1.7%"
  duitnowqr: "—"
  bnpl: "Contact sales"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1"
min_txn: "—"
channels: [fpx, card, bnpl]
features:
  no_code: false
  api: true
  recurring: false
popularity: 38
plans:
  - name: "Lite"
    eligibility: "RM0 setup, RM0 annual"
    rows:
      - { label: "FPX", value: "RM1.50 per transaction" }
      - { label: "E-wallet", value: "1.7%" }
    settlement: "Next business day"
    source: "https://www.payright.my/en"
  - name: "Growth"
    eligibility: "RM250 setup fee"
    rows:
      - { label: "FPX", value: "RM1.00 per transaction" }
      - { label: "E-wallet", value: "1.5%" }
      - { label: "Credit card", value: "2.0%" }
    settlement: "Next business day"
    source: "https://www.payright.my/en"
  - name: "Enterprise"
    eligibility: "Coming soon"
    rows:
      - { label: "FPX", value: "Sub-RM1 rate teased, real-time FPX settlement" }
    source: "https://www.payright.my/en"
verified_date: "2026-07-17"
source: "https://www.payright.my/en/pricing"
notes: "Re-verified 2026-07-17 at /en/pricing: FPX RM1.50 Lite / RM1.00 Growth; e-wallet 1.7% Lite / 1.5% Growth; credit card 2.0% on Growth (Lite card rate unpublished); yearly subscription RM0 both plans; settlement 1 business day FPX (Enterprise teases real-time). KL-based gateway claiming 500+ brands; positions itself on affordability. Published FPX plans: Lite RM1.50/transaction (RM0 setup, RM0 annual) and Growth RM1.00/transaction (RM250 setup); an Enterprise tier with real-time FPX settlement is marked coming soon. Cards and BNPL instalments are offered but rates are not published. Settlement next business day with daily/weekly/monthly payout options. Developer API with public GitHub repos and plugins; referral program with recurring commissions. Bilingual EN/BM site."
---

Payright is a Kuala Lumpur gateway that leads with price transparency on FPX:
RM1.50 per transaction on the free Lite plan, RM1.00 on Growth after a RM250
setup fee, and a teased Enterprise tier with real-time FPX settlement. Card
and BNPL acceptance exist but without published rates.

It claims more than 500 brands and courts developers with a documented API,
public GitHub repositories and e-commerce plugins, plus an affiliate program
paying recurring commissions. Settlement runs next business day, with payout
scheduling options.
