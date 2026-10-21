---
name: Luminarix
website: https://www.lmnrx.com
tagline: "New Malaysian gateway for FPX, cards, e-wallets and DuitNow QR"
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  card_intl: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "Contact sales"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "T+1"
min_txn: "—"
category: gateway
channels: [fpx, card, ewallet, duitnowqr]
methods:
  - Visa
  - Mastercard
  - American Express
  - Touch 'n Go eWallet
  - GrabPay
  - Boost
  - ShopeePay
  - MAE
  - DuitNow Transfer
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
popularity: 8
plans:
  - name: "Starter"
    eligibility: "Small businesses, startups and sole proprietors"
    rows:
      - { label: "Channels", value: "FPX, e-wallets, DuitNow QR" }
      - { label: "MDR", value: "Contact sales" }
    settlement: "T+1"
    source: "https://www.lmnrx.com/#pricing"
  - name: "Business"
    eligibility: "Growing SMEs and mid-market merchants"
    rows:
      - { label: "Channels", value: "Starter channels plus cards (Visa, Mastercard, AmEx)" }
      - { label: "Includes", value: "Recurring billing, payment links" }
      - { label: "MDR", value: "Contact sales" }
    settlement: "T+1"
    source: "https://www.lmnrx.com/#pricing"
  - name: "Enterprise"
    eligibility: "High-volume merchants, corporates and platforms"
    rows:
      - { label: "MDR", value: "Contact sales" }
      - { label: "Includes", value: "Dedicated account manager, custom integration, SLA" }
    settlement: "T+1 with flexible options"
    source: "https://www.lmnrx.com/#pricing"
verified_date: "2026-10-21"
source: "https://www.lmnrx.com/#pricing"
notes: "Verified 2026-10-21 on https://www.lmnrx.com/ (the site sits behind a bot check, so it was read in a browser). Run by Luminarix Sdn. Bhd., Petaling Jaya. The pricing section lists Starter, Business and Enterprise plans with no published rates (\"MDR rates based on industry and volume. Contact us for a quote.\"); cards are only on Business and above. The site states T+1 settlement and supports FPX, DuitNow QR, DuitNow Transfer, Visa, Mastercard, American Express, Touch 'n Go, GrabPay, Boost, MAE and ShopeePay. Hosted payment page, payment links, recurring billing and webhooks are listed. Only the WooCommerce plugin could be confirmed (WordPress.org, v1.6.0, October 2026, fewer than 10 installs); the site also names Shopify, Magento, OpenCart and PrestaShop plugins. No public developer docs were found, and the company was not found on BNM's merchant-acquirer or e-money lists under its own name."
---

Luminarix is a new Malaysian online payment gateway run by Luminarix Sdn. Bhd. in
Petaling Jaya. It offers one API, a hosted payment page and payment links for
FPX, DuitNow QR, cards (Visa, Mastercard, American Express) and the main local
e-wallets (Touch 'n Go, GrabPay, Boost, ShopeePay, MAE).

It publishes three plans (Starter, Business, Enterprise) but no rates: every
fee is quoted per merchant based on industry and volume. Card acceptance starts
on the Business plan. The site states next-business-day (T+1) settlement.

It is very new and small: its WooCommerce plugin has fewer than 10 active
installs, no public developer docs were found, and it does not appear on Bank
Negara's merchant-acquirer or e-money lists under its own name. Ask for a quote
and check its licensing before signing up.
