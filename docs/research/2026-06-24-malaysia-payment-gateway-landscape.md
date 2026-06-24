# Malaysia Payment Gateway Landscape — Deep Research

**Date:** 2026-06-24
**Method:** 4 parallel research agents (local gateways · international PSPs · bank/BNPL · long-tail listicle sweep), cross-checked against official sites + BNM regulatee references.
**Purpose:** Discover *all* Malaysian payment acceptance providers to expand the MPG comparison site beyond the initial 11.

> Authoritative source for licensed acquirers: BNM "List of Regulatees → Registered Merchant Acquirers" (https://www.bnm.gov.my/list-of-regulatees) — blocks automated fetch; confirm in a browser for compliance-grade accuracy.

## Already on the site (11)

toyyibPay · Billplz · senangPay · CHIP · Curlec · Xendit · Bayarcash · BCL · Fiuu · HitPay · Stripe Malaysia

## A. Local gateways / aggregators (new candidates)

| Name | Website | Note |
|---|---|---|
| iPay88 | ipay88.com | Largest legacy gateway; now NTT Data-owned (entity renamed NTT Data eCommerce Solutions, umbrella brand "Adaptis") |
| eGHL | eghl.my | GHL's online gateway; also NTT Data-owned / Adaptis |
| Revenue Monster | revenuemonster.my | Unified online + in-store, POS, loyalty |
| Paydibs | paydibs.com | SME gateway/acquirer; Shopify/Woo/Magento plugins |
| PayHalal | payhalal.my | Shariah-compliant gateway (Souqa Fintech) |
| Kiple (KiplePay) | kiplepay.com | e-wallet + gateway + acquirer (ex-Green Packet) |
| AsiaPay (PayDollar) | asiapay.com.my | Local subsidiary; cards + FPX/DuitNow/e-wallets/BNPL |
| ManagePay (MPay) | mpay.my | Listed fintech; gateway + acquiring + e-money |
| Gkash | gkash.com | BNM acquirer + e-money; cards/FPX/QR/e-wallets |
| Bizappay | bizappay.my | Low-cost FPX-focused gateway + payment links |
| RevPay | revpay.com.my | BNM-registered PSO; FPX/direct debit/cards/recurring |
| RinggitPay | ringgitpay.biz | Gateway + invoicing; FPX + Visa/MC |
| CommercePay (Commerce.Asia) | commercepay.asia | BNM acquirer; DuitNow/FPX/cards/e-wallets/BNPL |
| OxPay Malaysia | oxpay.com.my | Licensed processor (ex-MC Payment) |
| Paydee | paydee.co | Gateway + acquirer; cards/bank transfer |
| Soft Space (Fasspay) | softspace.com.my | SoftPOS pioneer; acquiring via Fasspay (more infra) |
| Ozopay | ozopay.com | Lesser-known local gateway (low confidence) |
| S Pay Global | spayglobal.my | Sarawak wallet w/ merchant QR (regional) |

> Uncertain: **PayEx** (payex.io) — may be Xendit's local entity ("Payex PLT"); verify before adding to avoid a duplicate of Xendit.

## B. International PSPs serving Malaysian merchants (new candidates)

Mainstream / self-serve-ish: **PayPal**, **Airwallex**, **2C2P** (by Antom), **Antom** (Alipay+), **Braintree**, **Tazapay**, **Rapyd**.
Enterprise (mostly "Contact sales", manual onboarding): **Adyen**, **Checkout.com**, **Worldpay (FIS)**, **Nuvei**, **PayerMax**, **dLocal**, **Aleta Planet**.
Cross-border / China-wallet focus: **Ksher**, **Nomu Pay**, **Omise/Opn**, **Sinopay**, **OceanPayment**, **Directa24**, **2Checkout/Verifone**.

## C. Bank-owned merchant gateways

Maybank (Maybank2u Pay / eBPG) · CIMB e-Commerce · Public Bank (PBe/IPG) · RHB · AmBank · Hong Leong · Alliance · OCBC · UOB · HSBC Omni Collect · Standard Chartered Straight2Bank Pay · Affin.
(Bank Islam BIMB Biz & Bank Rakyat = DuitNow QR only, not full online gateways. Fees usually negotiated / not public.)

## D. BNPL providers merchants can integrate

Atome · SPayLater/ShopeePayLater · PayLater by Grab · myIOU (IOUpay) · Split · Riipay · FavePay Later (Pine Labs) · MOBY (ex-MobyPay) · AhaPay · Pace/Pacenow.
(Defunct: Hoolah, ShopBack PayLater MY, Rely. Consumer-only, not merchant-integrable: Boost PayFlex, TNG PayLater.)

## Rebrands / duplicates collapsed (do NOT list separately)

- MOLPay → Razer Merchant Services → **Fiuu** (only Fiuu is current)
- iPay88 + eGHL + GHL → **NTT Data / Adaptis** umbrella (iPay88 & eGHL still distinct products)
- senangPay = Simplepay Gateway = senangPay-DOKU
- Kiple = KiplePay = KipleBiz ; AsiaPay = PayDollar ; OxPay = ex-MC Payment ; Mobile88 = iPay88 ; MOBY = MobyPay

## Excluded (out of scope / unverifiable)

National rails/infra (FPX, DuitNow, PayNet/MEPS) · pure consumer wallets (TNG eWallet, GrabPay, ShopeePay) · not-in-Malaysia (Kredivo, Midtrans, DOKU-ID, TapPay, PesoPay) · unverifiable brands (Fpay, Ginepay, Fortpay, Wonria, Spaypay, Yoolk Pay, Pesonapay, Sycarda, Macropay).
