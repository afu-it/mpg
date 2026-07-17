---
title: "Billplz pricing explained: FPX, card and e-wallet fees"
description: "What Billplz charges in Malaysia: flat RM1.25 FPX on the free plan, 1.8% local cards, 1.5% e-wallets. The full fee structure from the official rate card."
pubDate: "2026-07-17"
cluster: "fees-pricing"
image: "/blog/billplz-pricing-fees-malaysia.webp"
imageAlt: "Billplz fee card on MPG showing FPX, card and e-wallet rates"
tags: ["billplz", "fpx", "pricing"]
gateways:
  - billplz
sources:
  - label: "Billplz official pricing page"
    url: "https://main.billplz.com/pricing"
faq:
  - q: "Does Billplz have a setup or monthly fee?"
    a: "No. The Basic plan has no setup fee and no monthly fee. You only pay per transaction. A paid Premium annual membership exists, and its only job is to lower the per-transaction FPX rates."
  - q: "How fast does Billplz pay out?"
    a: "FPX collections settle the next business day (T+1), and Billplz markets the payout as guaranteed. Card payments take one day longer (T+2)."
  - q: "Is Billplz cheaper than toyyibPay?"
    a: "For FPX, toyyibPay's flat RM1.00 undercuts Billplz's RM1.25 on the free plans. Billplz Premium (RM0.75 per B2C transaction) flips that if your volume justifies the annual membership. Compare both against your real ticket size before deciding."
  - q: "Does Billplz support recurring billing?"
    a: "Not as card-on-file auto-charging. Billplz is built for collection: bills, payment links and API-driven invoicing. If you need true subscription billing, look at gateways with recurring support in the directory."
---

Billplz is one of the names Malaysian SMEs reach for first, and its pricing is
genuinely simple: a flat ringgit fee for FPX, a percentage for everything else,
and nothing upfront. Here is the whole structure, and where it does and does not
make sense.

## How Billplz pricing works

Billplz runs two plans. **Basic is free**: no setup fee, no monthly fee, you pay
per transaction only. **Premium** is a paid annual membership whose only purpose
is lowering your FPX rate.

The rates that matter, from the official pricing page:

- **FPX (B2C)**: RM1.25 flat per transaction on Basic, RM0.75 on Premium.
- **FPX (B2B)**: RM3.00 on Basic, RM2.00 on Premium. B2B means the payer uses a
  corporate banking account, and most stores never see these.
- **Local cards (MYR)**: 1.8%.
- **Non-MYR cards**: 3.8%, with payout at T+2.
- **E-wallets**: 1.5%.
- **BNPL** (3 to 4 month plans): 6% to 6.5%.

The flat FPX fee is the headline. A percentage-based gateway gets more expensive
as your ticket grows; RM1.25 on a RM500 invoice is 0.25%. On small tickets the
logic flips: RM1.25 on a RM15 sale is over 8%, and a percentage-based rival wins.
You can test your own ticket size in the [fee calculator](/calculator/).

## When the flat rate wins

Billplz suits invoice-style collection with meaningful ticket sizes: tuition
fees, club memberships, agency invoices, event registrations. That is also why
its tooling leans toward bills and payment links rather than storefront
checkouts, with plugins for WooCommerce, Shopify, OpenCart, Magento, PrestaShop
and WHMCS when you do run a store.

Two honest caveats. First, there is no card-on-file recurring billing, so
subscription businesses should look at the
[recurring-capable gateways](/best/payment-gateway-recurring/) instead. Second,
the BNPL rate is on the high side; if instalments matter to you, compare the
[BNPL providers](/best/bnpl-malaysia/) directly.

## Settlement and the fine print

FPX money lands the next business day (T+1), and Billplz markets that payout as
guaranteed. Cards take an extra day (T+2). There is no minimum transaction
amount, and the current published rates carry no hidden add-on fee per
transaction.

The numbers in the box above render from the same verified dataset as the whole
[directory](/gateways/), so if Billplz changes its rate card, this page changes
with it. For the side-by-side view, see
[Billplz vs toyyibPay](/vs/billplz-vs-toyyibpay/) or the full
[Billplz profile](/gateway/billplz/).
