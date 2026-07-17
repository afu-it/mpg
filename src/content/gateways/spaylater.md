---
name: SPayLater (ShopeePayLater)
website: https://shopee.com.my
tagline: "Shariah-compliant Buy Now Pay Later, built into Shopee"
logo: /logos/spaylater.svg
fees:
  fpx: "—"
  card: "—"
  ewallet: "—"
  duitnowqr: "—"
  bnpl: "4.5% (5% for 3-mo plans)"
  setup: "RM0"
  monthly: "RM0"
settlement: "Paid in full on order completion"
min_txn: "—"
category: bnpl
channels: [bnpl]
features:
  no_code: true
  api: true
  recurring: false
popularity: 70
plans:
  - name: "Standard"
    eligibility: "All sellers"
    rows:
      - { label: "Transaction fee (3-month instalment)", value: "5% before SST (from 1 Feb 2026)" }
      - { label: "Transaction fee (other tenures)", value: "4.5% before SST" }
    source: "https://seller.shopee.com.my/edu/article/16542"
  - name: "Special SPayLater Programme"
    eligibility: "Selected sellers, opt-in via Seller Centre"
    rows:
      - { label: "Programme fee (3-month)", value: "0% (from 6 May 2026)" }
      - { label: "Programme fee (6-month)", value: "3%" }
      - { label: "On top of", value: "4.5% transaction fee, before 8% SST" }
    source: "https://seller.shopee.com.my/edu/article/16542"
verified_date: "2026-07-17"
source: "https://seller.shopee.com.my/edu/article/16542"
notes: "Merchant transaction fee 4.5% before SST; from 1 Feb 2026 the 3-month instalment tenure is 5% (others stay 4.5%). Fees subject to 8% SST. Auto-enabled for eligible Shopee sellers (no setup step). Sellers receive sales proceeds in full on order completion. Now operated with Monee Capital Malaysia (Shopee financial affiliate)."
---

SPayLater is Shopee's Shariah-compliant Buy Now, Pay Later option, built directly into the Shopee marketplace. Shoppers can choose Pay Next Month (1 month, interest-free) or instalments of 3 to 48 months, with a buyer processing fee of about 1.5%/month (0% for up to 6 months under the Special SPayLater Programme).

For sellers, the merchant fee is publicly published and structured as a flat SPayLater transaction fee deducted on completed orders: 4.5% before SST across tenures, rising to 5% for 3-month instalments from 1 February 2026, plus 8% SST on top. There is no setup or monthly fee on the marketplace, and the seller receives the sales amount in full regardless of the buyer's tenure.

On the Shopee marketplace, SPayLater is auto-enabled with zero integration (no-code). For external or in-store merchants, SPayLater is accepted through payment gateways that offer no-code plugins and APIs, but in that channel the per-transaction rate is quoted on request rather than published.
