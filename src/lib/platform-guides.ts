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
  /** Bahasa Malaysia twins of the reader-facing copy (shown on /ms/ pages) */
  ms: { title: string; description: string; intro: string; note: string };
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
    ms: {
      title: "Bandingkan payment gateway untuk WooCommerce di Malaysia | MPG",
      description:
        "Payment gateway Malaysia yang ada plugin WooCommerce: FPX, kad dan e-wallet terus boleh guna. Disusun ikut anggaran caj dari kadar rasmi.",
      intro:
        "WooCommerce (plugin kedai online untuk WordPress) paling banyak disokong gateway di Malaysia. Kebanyakan gateway tempatan ada plugin rasmi, jadi FPX, kad dan e-wallet boleh guna tanpa tulis kod. Semua gateway di bawah ada plugin WooCommerce. Gateway yang disusun ikut kedudukan ialah yang siarkan kadar rasmi.",
      note: "Pasang plugin dari dokumentasi rasmi gateway itu, bukan versi ubah suai orang lain. Tampal API key anda. Kemudian buat satu pesanan ujian dalam sandbox (mod ujian tanpa duit sebenar) dari mula sampai habis, termasuk webhook (mesej automatik dari gateway bila bayaran berjaya). Buat semua ini sebelum terima bayaran sebenar. Plugin cuma uruskan checkout. Bila duit masuk ke akaun tetap ikut jadual gateway.",
    },
  },
  {
    slug: "shopify-payment-gateways-malaysia",
    plugin: "Shopify",
    name: "Shopify",
    title: "Shopify payment gateway in Malaysia: local options compared | MPG",
    description:
      "Which payment gateway to use on Shopify in Malaysia: local providers that add FPX, cards or e-wallets to your checkout, ranked by cost on published rates.",
    intro:
      "Shopify controls its checkout more tightly than WooCommerce, so fewer Malaysian gateways integrate with it, and they do so as third-party payment providers. Every provider below lists Shopify support; ranked entries publish official rates.",
    note: "On Shopify, third-party gateways are added under Settings then Payments. Note that Shopify may charge extra transaction fees when you use a third-party provider instead of Shopify Payments; weigh that against the local gateway's lower FPX rates and local wallet support.",
    ms: {
      title: "Payment gateway Shopify di Malaysia: banding pilihan | MPG",
      description:
        "Payment gateway untuk kedai Shopify di Malaysia yang tambah FPX, kad atau e-wallet tempatan pada checkout, disusun ikut anggaran caj dari kadar rasmi.",
      intro:
        "Shopify (platform kedai online siap guna) kawal halaman checkout lebih ketat dari WooCommerce. Jadi tak banyak gateway Malaysia boleh guna dengan Shopify, dan yang ada pun masuk sebagai gateway pihak ketiga. Semua gateway di bawah menyokong Shopify. Gateway yang disusun ikut kedudukan ialah yang siarkan kadar rasmi.",
      note: "Di Shopify, gateway pihak ketiga ditambah di Settings, kemudian Payments. Ingat: Shopify mungkin kenakan caj transaksi tambahan kalau anda guna gateway pihak ketiga, bukan Shopify Payments. Timbang caj itu dengan caj FPX gateway tempatan yang lebih rendah dan sokongan e-wallet tempatan.",
    },
  },
];
