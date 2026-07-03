// Platform guide registry (spec 12 slice H): gateways with an official plugin
// for an e-commerce platform. Add a platform by adding an entry here.

export interface PlatformDef {
  slug: string;
  plugin: string; // exact value in gateway plugins[]
  name: string;
  title: string;
  description: string;
  intro: string;
  note: string;
}

export const PLATFORMS: PlatformDef[] = [
  {
    slug: "woocommerce-payment-gateways",
    plugin: "WooCommerce",
    name: "WooCommerce",
    title: "WooCommerce payment gateways for Malaysia, compared | MPG",
    description:
      "Malaysian payment gateways with a WooCommerce plugin: FPX, card and e-wallet support out of the box, ranked by estimated cost from official rates.",
    intro:
      "WooCommerce is the best-served platform in Malaysia: most local gateways ship an official plugin, so FPX, cards and e-wallets work without custom code. Every provider below lists a WooCommerce plugin; ranked entries publish official rates.",
    note: "Install the provider's plugin from their docs (not a third-party fork), paste your API keys, and run a sandbox order end-to-end, including the webhook, before going live. The plugin handles checkout; settlement still follows the provider's schedule.",
  },
  {
    slug: "shopify-payment-gateways-malaysia",
    plugin: "Shopify",
    name: "Shopify",
    title: "Shopify payment gateways for Malaysia, compared | MPG",
    description:
      "Malaysian payment gateways that integrate with Shopify: local FPX and e-wallet support beyond Shopify Payments, ranked by estimated cost from official rates.",
    intro:
      "Shopify controls its checkout more tightly than WooCommerce, so fewer Malaysian gateways integrate with it, and they do so as third-party payment providers. Every provider below lists Shopify support; ranked entries publish official rates.",
    note: "On Shopify, third-party gateways are added under Settings then Payments. Note that Shopify may charge extra transaction fees when you use a third-party provider instead of Shopify Payments; weigh that against the local gateway's lower FPX rates and local wallet support.",
  },
];
