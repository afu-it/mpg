---
name: Adyen
website: https://www.adyen.com/
tagline: "Global enterprise acquirer with Interchange++ card pricing and FPX"
fees:
  fpx: "Contact sales"
  card: "Interchange++"
  card_intl: "Interchange++"
  ewallet: "Contact sales"
  duitnowqr: "Contact sales"
  bnpl: "Contact sales"
  setup: "RM0"
  monthly: "RM0 (minimum invoice may apply)"
settlement: "T+2 (FPX) / T+5 (DuitNow)"
min_txn: "—"
category: gateway
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Visa
  - Mastercard
  - American Express
  - JCB
  - UnionPay
  - Apple Pay
  - Google Pay
  - GrabPay
  - Touch 'n Go eWallet
  - Boost
  - Alipay
  - WeChat Pay
  - Atome
  - 7-Eleven Malaysia
features:
  no_code: true
  api: true
  recurring: true
mcp: "official"
webhooks: true
plugins:
  - Adobe Commerce (Magento 2)
  - Salesforce Commerce Cloud
  - Shopify
  - WooCommerce
  - PrestaShop
dev_docs: "https://docs.adyen.com/"
popularity: 34
plans:
  - name: "Published list prices"
    eligibility: "Indicative, quoted in $ (currency not stated); custom pricing on request"
    rows:
      - { label: "Processing fee (every transaction)", value: "$0.13" }
      - { label: "Visa / Mastercard (Global)", value: "$0.13 + Interchange+ + 0.60%" }
      - { label: "JCB (Global)", value: "$0.13 + 3.75%" }
      - { label: "UnionPay (Global)", value: "$0.13 + 3%" }
      - { label: "Online banking Malaysia (FPX)", value: "$0.13 + $0.52" }
      - { label: "GrabPay (online, Malaysia)", value: "$0.13 + 1.5%" }
      - { label: "Touch 'n Go (Malaysia)", value: "$0.13 + 1.60%" }
      - { label: "Boost", value: "$0.13 + 2.5%" }
      - { label: "DuitNow", value: "$0.13 + 1.5%" }
      - { label: "Atome", value: "$0.13 + 5%" }
      - { label: "Setup / monthly fee", value: "None (minimum invoice by industry)" }
    source: "https://www.adyen.com/pricing"
verified_date: "2026-10-21"
source: "https://www.adyen.com/pricing"
bnm:
  roles: [merchant-acquirer]
  entity: "Adyen Malaysia Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://www.bnm.gov.my/regulations/fsp-directory?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_jXC730NRlqU0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_tag=merchant-acquirer-nonbank"
notes: "Verified 2026-10-21 on https://www.adyen.com/pricing. Every transaction pays a $0.13 processing fee plus a payment method fee. Prices are shown in $ with no currency named and no MYR figures, and Adyen calls them indicative (\"The fees outlined above are indicative; please get in touch to discuss pricing options\"), so the non-card fee columns stay Contact sales and the exact list prices sit in the plan table. Visa and Mastercard (Global): $0.13 + Interchange+ + 0.60% (Interchange++ passes the card scheme's interchange and scheme fees through at cost). JCB $0.13 + 3.75%, UnionPay $0.13 + 3%. Online banking Malaysia (FPX by PayNet): $0.13 + $0.52. GrabPay online Malaysia $0.13 + 1.5%, Touch 'n Go Malaysia $0.13 + 1.60%, Boost $0.13 + 2.5%, DuitNow $0.13 + 1.5%, Atome $0.13 + 5%, 7-Eleven Malaysia $0.13 + 4%. No setup, monthly, integration or closure fees, but a minimum invoice applies depending on industry or business model. Settlement delay per Adyen's payment method pages: FPX 2 days, DuitNow 5 days; settles in MYR or USD. Adyen Malaysia Sdn Bhd is on Bank Negara Malaysia's list of non-bank merchant acquirers (checked 2026-10-21). Official MCP server (alpha) at github.com/Adyen/adyen-mcp. Adyen builds the Adobe Commerce and Salesforce Commerce Cloud plugins; Shopify, WooCommerce and PrestaShop are partner-built."
---

Adyen is a global payments company used by large online and omnichannel
merchants. Its Malaysian company, Adyen Malaysia Sdn Bhd, is registered with
Bank Negara Malaysia as a non-bank merchant acquirer, and it supports FPX,
cards, Touch 'n Go, GrabPay, Boost, DuitNow and Atome alongside its global
methods.

Adyen does publish list prices: every transaction pays a $0.13 processing fee
plus a method fee. Visa and Mastercard are priced on **Interchange++** (the card
scheme costs passed through, plus 0.60%), FPX is $0.13 + $0.52, and Malaysian
e-wallets run from $0.13 + 1.5% (GrabPay, DuitNow) to $0.13 + 2.5% (Boost).
The page gives no currency and no MYR figures and calls the prices indicative,
so treat them as a starting point for a quote.

There are no setup or monthly fees, but Adyen applies a minimum invoice that
depends on industry, which makes it a fit for high-volume businesses rather
than small shops. Settlement delay is 2 days for FPX and 5 days for DuitNow,
paid out in MYR or USD.
