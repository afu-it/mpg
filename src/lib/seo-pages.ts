// Programmatic SEO pages (spec 10): pure registries + page builders for
// /best/<profile> and /vs/<a>-vs-<b>. All ranking goes through recommend()
// and the ApiGateway shape, so these pages can never contradict the table,
// API, wizard, or MCP tools. No DOM, no fee math of its own.
import type { ApiGateway } from "./api";
import { recommend, recommendOrClosest, CHANNEL_LABEL, type Channel, type Match, type Needs } from "./recommend";
import type { Locale } from "../i18n/locale";
import { splitName } from "./name";
import { formatDate } from "../i18n/locale";
import { CHANNEL_WEIGHTS, REF_TICKET, effectiveCost, gatewayCost, parseFeeShape } from "./fees";

// ---------------------------------------------------------------------------
// Need-profile pages (/best/<profile>)
// ---------------------------------------------------------------------------

/** reader-facing copy of a profile page, one per language */
export interface ProfileCopy {
  h1: string;
  title: string;
  description: string;
  intro: string;
  faqNoun: string;
}

export interface ProfileDef {
  slug: string;
  needs: Needs;
  /** extra filter: only gateways that ship e-commerce plugins */
  pluginsOnly?: boolean;
  h1: string;
  title: string;
  description: string;
  intro: string;
  /** noun used in generated FAQ copy, e.g. "payment gateway with FPX" */
  faqNoun: string;
  /**
   * Skip the "What is the cheapest…" FAQ. Set on the generic profile so it
   * does not cannibalise /best/cheapest-payment-gateway-malaysia (spec 12).
   */
  noCheapestFaq?: boolean;
  /**
   * Generic page only: show the top published-rate pick for each of these
   * other profiles ("best for FPX: X"), so "best" is answered per need and the
   * page does not duplicate the cheapest list (SEO round 2026-10).
   */
  byNeed?: Array<{ slug: string; label: string; labelMs: string }>;
  /** cheapest published-rate provider at each of these sale sizes (RM) */
  tickets?: number[];
  /**
   * Build the meta description from the data (top pick, its RM100 cost, the
   * next two). Falls back to `description` when the result leaves 110-160 chars.
   */
  answerMeta?: {
    en: (top: string, rm: string, next: string) => string;
    ms: (top: string, rm: string, next: string) => string;
  };
  /** add the "how is the RM100 cost worked out" FAQ */
  costFaq?: boolean;
  /** add the lowest published DuitNow QR rates FAQ */
  qrFaq?: boolean;
  /** add the webhooks / plugins / MCP coverage FAQ */
  devFaq?: boolean;
  /** the same copy in Bahasa Malaysia (shown on /ms/best/...) */
  ms: ProfileCopy;
}

/** the profile's h1/title/description/intro/faqNoun in the page language */
export function profileCopy(def: ProfileDef, locale: Locale = "en"): ProfileCopy {
  if (locale === "ms") return def.ms;
  const { h1, title, description, intro, faqNoun } = def;
  return { h1, title, description, intro, faqNoun };
}

export const PROFILES: ProfileDef[] = [
  {
    slug: "payment-gateway-malaysia",
    needs: {},
    h1: "Best payment gateways in Malaysia",
    title: "Best payment gateway in Malaysia: picks by need and cost | MPG",
    description:
      "The best payment gateway in Malaysia depends on how you sell. Top picks for FPX, cards, e-wallets, DuitNow QR, shops and SaaS, from published rates.",
    intro:
      "There is no single best payment gateway: the right one depends on how your customers pay and how you sell. Start with the top pick for your need, then see every provider ranked by the same estimated cost we use across this site: officially published FPX, card and e-wallet rates applied to a RM100 transaction. Providers that only quote on request follow, by market presence.",
    faqNoun: "payment gateway in Malaysia",
    ms: {
      h1: "Pilih payment gateway di Malaysia ikut keperluan",
      title: "Pilih payment gateway di Malaysia ikut keperluan dan kos | MPG",
      description: "Payment gateway yang sesuai bergantung pada cara anda menjual. Pilihan utama untuk FPX, kad, e-wallet, DuitNow QR, kedai dan SaaS, dari kadar rasmi.",
      intro: "Payment gateway ialah perkhidmatan yang terima bayaran online untuk bisnes anda. Tiada satu gateway yang paling sesuai untuk semua orang: pilihan bergantung pada cara pelanggan anda bayar dan cara anda menjual. Mula dengan pilihan utama untuk keperluan anda. Selepas itu, semua gateway disusun ikut anggaran caj campuran yang sama yang kami guna di seluruh laman ini: kadar rasmi FPX (bayar terus dari akaun bank online), kad dan e-wallet dikira atas transaksi RM100. Gateway yang hanya beri harga atas permintaan disenaraikan selepas itu, ikut tahap popular.",
      faqNoun: "payment gateway di Malaysia",
    },
    noCheapestFaq: true,
    costFaq: true,
    byNeed: [
      { slug: "payment-gateway-fpx", label: "FPX", labelMs: "FPX" },
      { slug: "payment-gateway-credit-card", label: "cards", labelMs: "kad" },
      { slug: "payment-gateway-ewallet", label: "e-wallets", labelMs: "e-wallet" },
      { slug: "payment-gateway-duitnow-qr", label: "DuitNow QR", labelMs: "DuitNow QR" },
      { slug: "payment-gateway-no-code", label: "no-code payment links", labelMs: "link bayaran tanpa kod" },
      { slug: "payment-gateway-recurring", label: "recurring billing", labelMs: "caj berulang automatik" },
      { slug: "payment-gateway-physical-store", label: "physical stores", labelMs: "kedai fizikal" },
      { slug: "payment-gateway-saas", label: "SaaS", labelMs: "SaaS" },
    ],
  },
  {
    slug: "cheapest-payment-gateway-malaysia",
    needs: {},
    h1: "Cheapest payment gateways in Malaysia",
    title: "Cheapest payment gateway in Malaysia: lowest fees compared | MPG",
    description:
      "The cheapest Malaysian payment gateways by estimated cost per RM100 transaction. Only providers with officially published rates are ranked.",
    intro:
      "Cheapest is measured, not guessed: we parse each provider's officially published FPX, card and e-wallet rates and compute the blended cost of a RM100 transaction. Providers without comparable published rates cannot be ranked honestly, so they appear separately as quote-based.",
    faqNoun: "payment gateway in Malaysia",
    ms: {
      h1: "Payment gateway paling murah di Malaysia",
      title: "Payment gateway paling murah di Malaysia: banding caj | MPG",
      description: "Payment gateway Malaysia paling murah ikut anggaran caj bagi setiap transaksi RM100. Hanya gateway yang siarkan kadar rasmi diberi kedudukan.",
      intro: "Paling murah di sini diukur, bukan diteka. Kami baca kadar rasmi FPX (bayar terus dari akaun bank online), kad dan e-wallet setiap gateway, kemudian kira caj campuran bagi satu transaksi RM100. Gateway yang tiada kadar rasmi untuk dibandingkan tak boleh disusun dengan adil, jadi kami asingkan mereka sebagai harga atas permintaan.",
      faqNoun: "payment gateway di Malaysia",
    },
    costFaq: true,
    tickets: [20, 100, 500],
    answerMeta: {
      en: (top, rm, next) =>
        `Cheapest payment gateway in Malaysia on published rates: ${top} at about ${rm} per RM100 sale${next}. Compare FPX, card and e-wallet fees.`,
      ms: (top, rm, next) =>
        `Payment gateway paling murah di Malaysia ikut kadar rasmi: ${top}, sekitar ${rm} bagi jualan RM100${next}. Banding caj FPX, kad, e-wallet.`,
    },
  },
  {
    slug: "payment-gateway-fpx",
    needs: { channels: ["fpx"] },
    h1: "Payment gateways with FPX",
    title: "Best FPX payment gateways in Malaysia | MPG",
    description:
      "Malaysian payment gateways that support FPX online banking, ranked by estimated cost per RM100 transaction from published rates.",
    intro:
      "FPX (online banking transfer) is the default way Malaysians pay online. Every gateway below supports FPX; ranked entries publish official rates, quote-based entries follow.",
    faqNoun: "FPX payment gateway",
    ms: {
      h1: "Payment gateway dengan FPX",
      title: "Bandingkan payment gateway FPX di Malaysia | MPG",
      description: "Payment gateway Malaysia yang sokong FPX (perbankan online), disusun ikut anggaran caj bagi setiap transaksi RM100 dari kadar rasmi.",
      intro: "FPX (bayar terus dari akaun bank online) ialah cara biasa rakyat Malaysia bayar online. Semua gateway di bawah terima FPX. Yang diberi kedudukan ialah gateway yang siarkan kadar rasmi, dan yang beri harga atas permintaan disenaraikan selepas itu.",
      faqNoun: "payment gateway FPX",
    },
  },
  {
    slug: "payment-gateway-credit-card",
    needs: { channels: ["card"] },
    h1: "Payment gateways for credit and debit cards",
    title: "Best card payment gateways in Malaysia | MPG",
    description:
      "Malaysian payment gateways that accept credit and debit cards, ranked by estimated blended cost from officially published rates.",
    intro:
      "All providers below accept Visa and Mastercard payments. Card rates in Malaysia typically run higher than FPX, so check the per-channel fees on each provider's detail page before deciding.",
    faqNoun: "card payment gateway",
    ms: {
      h1: "Payment gateway untuk kad kredit dan debit",
      title: "Bandingkan payment gateway untuk kad di Malaysia | MPG",
      description: "Payment gateway Malaysia yang terima kad kredit dan debit, disusun ikut anggaran caj campuran dari kadar rasmi yang disiarkan setiap gateway.",
      intro: "Semua gateway di bawah terima bayaran Visa dan Mastercard. Caj kad di Malaysia biasanya lebih tinggi daripada FPX (bayar terus dari akaun bank online), jadi semak caj setiap cara bayaran di halaman gateway sebelum buat keputusan.",
      faqNoun: "payment gateway untuk kad",
    },
  },
  {
    slug: "payment-gateway-ewallet",
    needs: { channels: ["ewallet"] },
    h1: "Payment gateways with e-wallet support",
    title: "Best e-wallet payment gateways in Malaysia | MPG",
    description:
      "Malaysian payment gateways that accept e-wallets such as Touch 'n Go eWallet, GrabPay, Boost and ShopeePay, ranked by estimated cost.",
    intro:
      "Every gateway below lets your customers pay with Malaysian e-wallets (Touch 'n Go eWallet, GrabPay, Boost, ShopeePay and others). See each detail page for exactly which wallets are supported.",
    faqNoun: "e-wallet payment gateway",
    ms: {
      h1: "Payment gateway yang terima e-wallet",
      title: "Bandingkan payment gateway e-wallet di Malaysia | MPG",
      description: "Payment gateway Malaysia yang terima e-wallet seperti Touch 'n Go eWallet, GrabPay, Boost dan ShopeePay, disusun ikut anggaran caj.",
      intro: "Setiap gateway di bawah benarkan pelanggan anda bayar guna e-wallet (dompet digital dalam telefon) Malaysia, seperti Touch 'n Go eWallet, GrabPay, Boost, ShopeePay dan lain-lain. Semak halaman setiap gateway untuk tahu e-wallet mana yang disokong.",
      faqNoun: "payment gateway e-wallet",
    },
  },
  {
    slug: "payment-gateway-duitnow-qr",
    needs: { channels: ["duitnowqr"] },
    h1: "Payment gateways with DuitNow QR",
    title: "Payment gateways with DuitNow QR in Malaysia | MPG",
    description:
      "Malaysian payment gateways that support DuitNow QR payments, ranked by estimated cost from officially published rates. One QR, every bank and e-wallet.",
    intro:
      "DuitNow QR is Malaysia's national QR standard: one code accepts payment from banking apps and e-wallets alike. These gateways support it at checkout or in person.",
    faqNoun: "DuitNow QR payment gateway",
    ms: {
      h1: "Payment gateway dengan DuitNow QR",
      title: "Payment gateway dengan DuitNow QR di Malaysia | MPG",
      description: "Payment gateway Malaysia yang sokong bayaran DuitNow QR, disusun ikut anggaran caj dari kadar rasmi. Satu QR untuk semua bank dan e-wallet.",
      intro: "DuitNow QR ialah standard QR kebangsaan Malaysia: satu kod boleh terima bayaran dari app bank dan juga e-wallet. Gateway di bawah terima DuitNow QR di checkout online (halaman bayar) atau di kedai.",
      faqNoun: "payment gateway DuitNow QR",
    },
    qrFaq: true,
  },
  {
    slug: "payment-gateway-recurring",
    needs: { recurring: true },
    h1: "Payment gateways for recurring billing",
    title: "Best recurring / subscription payment gateways in Malaysia | MPG",
    description:
      "Malaysian payment gateways that support recurring and subscription billing, ranked by estimated cost from published rates.",
    intro:
      "Charging customers automatically every month needs explicit recurring support (usually card-on-file, sometimes FPX direct debit). Every provider below supports recurring billing.",
    faqNoun: "recurring-billing payment gateway",
    ms: {
      h1: "Payment gateway untuk caj berulang automatik",
      title: "Payment gateway untuk langganan bulanan di Malaysia | MPG",
      description: "Payment gateway Malaysia yang sokong caj berulang automatik dan langganan, disusun ikut anggaran caj dari kadar rasmi yang disiarkan.",
      intro: "Untuk caj pelanggan secara automatik setiap bulan, gateway perlu sokong bayaran berulang (biasanya guna kad yang disimpan, kadang-kadang potongan terus melalui FPX). Semua gateway di bawah ada caj berulang automatik.",
      faqNoun: "payment gateway untuk caj berulang",
    },
  },
  {
    slug: "payment-gateway-no-code",
    needs: { noCode: true },
    h1: "No-code payment gateways (payment links)",
    title: "Best no-code payment gateways in Malaysia | MPG",
    description:
      "Malaysian payment gateways you can use without writing code: payment links, hosted checkout pages and dashboards. Ranked by estimated cost.",
    intro:
      "No developer needed: every provider below lets you create payment links or a hosted checkout from a dashboard and share them over WhatsApp, Instagram or email.",
    faqNoun: "no-code payment gateway",
    ms: {
      h1: "Payment gateway tanpa kod (link bayaran)",
      title: "Payment gateway tanpa kod di Malaysia, ikut caj | MPG",
      description: "Payment gateway Malaysia yang anda boleh guna tanpa tulis kod: link bayaran, halaman bayar siap dan dashboard. Disusun ikut anggaran caj.",
      intro: "Tak perlu developer. Dengan semua gateway di bawah, anda boleh buat link bayaran atau halaman bayar siap dari dashboard (papan kawalan online), kemudian kongsi melalui WhatsApp, Instagram atau email.",
      faqNoun: "payment gateway tanpa kod",
    },
  },
  {
    slug: "payment-gateway-api",
    needs: { developer: true },
    h1: "Payment gateway APIs for developers in Malaysia",
    title: "Payment gateway API in Malaysia: developer options compared | MPG",
    description:
      "Malaysian payment gateway APIs ranked by cost on published rates, plus which ones send webhooks, ship WooCommerce or Shopify plugins and run an MCP server.",
    intro:
      "Building your own checkout, app or booking system? Every provider below has a developer API for custom integrations, ranked by estimated cost. The FAQ counts webhook, plugin and MCP (AI agent) coverage; each detail page links the API docs, and the Learn section walks through a safe integration flow.",
    faqNoun: "payment gateway API",
    ms: {
      h1: "API payment gateway untuk developer di Malaysia",
      title: "API payment gateway di Malaysia untuk developer | MPG",
      description: "API payment gateway Malaysia disusun ikut caj dari kadar rasmi, serta mana yang hantar webhook, ada plugin WooCommerce atau Shopify dan server MCP.",
      intro: "Nak bina checkout, app atau sistem tempahan sendiri? Semua gateway di bawah ada API, iaitu cara untuk developer sambungkan sistem anda, dan disusun ikut anggaran caj. Soalan lazim di bawah kira berapa yang ada webhook (notifikasi automatik bila bayaran berjaya), plugin kedai online dan MCP (sokongan AI agent). Halaman setiap gateway ada link dokumentasi API, dan bahagian Belajar terangkan cara integrasi yang selamat.",
      faqNoun: "API payment gateway",
    },
    devFaq: true,
  },
  {
    slug: "payment-gateway-online-store",
    needs: { noCode: true, channels: ["fpx"] },
    h1: "Payment gateways for small online stores",
    title: "Best payment gateways for a small online store in Malaysia | MPG",
    description:
      "Payment gateways that fit a small Malaysian online store: FPX support plus no-code payment links, ranked by estimated cost per RM100.",
    intro:
      "A small store's sensible baseline: FPX (how most Malaysians pay) plus no-code payment links so you can start selling before writing any code. Every provider below covers both.",
    faqNoun: "payment gateway for a small online store",
    ms: {
      h1: "Payment gateway untuk kedai online kecil",
      title: "Payment gateway untuk kedai online kecil di Malaysia | MPG",
      description: "Payment gateway yang sesuai untuk kedai online kecil di Malaysia: sokong FPX dan link bayaran tanpa kod, disusun ikut anggaran caj bagi RM100.",
      intro: "Untuk kedai kecil, mula dengan dua perkara: FPX (cara kebanyakan rakyat Malaysia bayar, terus dari akaun bank online) dan link bayaran tanpa kod, supaya anda boleh mula menjual sebelum tulis sebarang kod. Semua gateway di bawah ada kedua-duanya.",
      faqNoun: "payment gateway untuk kedai online kecil",
    },
  },
  {
    slug: "bnpl-malaysia",
    needs: { access: "bnpl" },
    h1: "Buy now, pay later (BNPL) providers in Malaysia",
    title: "BNPL providers in Malaysia for merchants | MPG",
    description:
      "Buy-now-pay-later providers Malaysian merchants can add at checkout: Atome, SPayLater, Grab PayLater and more. Merchant rates are mostly quote-based.",
    intro:
      "BNPL lets customers split a purchase into instalments while you get paid upfront, in exchange for a higher merchant fee. Most BNPL merchant rates are negotiated, so this list is ordered by market presence where rates are unpublished.",
    faqNoun: "BNPL provider in Malaysia",
    ms: {
      h1: "Penyedia BNPL (beli sekarang, bayar kemudian) di Malaysia",
      title: "Penyedia BNPL di Malaysia untuk peniaga | MPG",
      description: "Penyedia BNPL (beli dulu, bayar kemudian) untuk checkout peniaga Malaysia: Atome, SPayLater, Grab PayLater dan lain-lain. Kadar biasanya ikut rundingan.",
      intro: "BNPL (beli sekarang, bayar kemudian) benarkan pelanggan bahagikan pembelian kepada beberapa ansuran, manakala anda terima bayaran penuh terus, tolak caj peniaga yang lebih tinggi. Kebanyakan kadar BNPL untuk peniaga ikut rundingan, jadi bila kadar tidak disiarkan, senarai ini disusun ikut tahap popular penyedia.",
      faqNoun: "penyedia BNPL di Malaysia",
    },
  },
  {
    slug: "payment-gateway-ecommerce-plugins",
    needs: { developer: true },
    pluginsOnly: true,
    h1: "Payment gateways with e-commerce plugins",
    title: "Payment gateways with WooCommerce/Shopify plugins | MPG",
    description:
      "Malaysian payment gateways with ready-made e-commerce plugins (WooCommerce, Shopify, OpenCart and more), ranked by estimated cost.",
    intro:
      "Running a store on WooCommerce, Shopify or another platform? Every provider below ships a ready-made plugin, so accepting Malaysian payments is configuration, not custom code.",
    faqNoun: "payment gateway with e-commerce plugins",
    ms: {
      h1: "Payment gateway dengan plugin kedai online",
      title: "Payment gateway dengan plugin WooCommerce/Shopify | MPG",
      description: "Payment gateway Malaysia dengan plugin kedai online siap pakai (WooCommerce, Shopify, OpenCart dan lain-lain), disusun ikut anggaran caj.",
      intro: "Kedai anda guna WooCommerce, Shopify atau platform lain? Semua gateway di bawah ada plugin (tambahan siap pakai untuk kedai online), jadi anda cuma perlu buat tetapan untuk terima bayaran tempatan, tak perlu tulis kod sendiri.",
      faqNoun: "payment gateway dengan plugin kedai online",
    },
  },
  // Business-type profiles (2026-07-17, owner request): who-you-are framing
  // over the same recommend() engine. Physical = in-person QR/wallet
  // acceptance; digital = links-first selling; SaaS = recurring + API.
  {
    slug: "payment-gateway-physical-store",
    needs: { channels: ["duitnowqr", "ewallet"], noCode: true },
    h1: "Payment gateways for physical stores and restaurants",
    title: "Best payment options for physical stores in Malaysia | MPG",
    description:
      "Accept DuitNow QR and e-wallets at your kedai, cafe or restaurant: providers ranked by published cost, plus terminal and QR options worth comparing.",
    intro:
      "Walk-in customers pay by scanning: DuitNow QR and e-wallets cover almost every Malaysian phone. Every provider below supports both without code. Also compare terminal-first options on their detail pages (Qashier, Revenue Monster) and the banks' QR packages, where CIMB and Hong Leong currently advertise zero-MDR DuitNow QR tiers.",
    faqNoun: "payment provider for a physical store",
    ms: {
      h1: "Payment gateway untuk kedai fizikal dan restoran",
      title: "Pilihan bayaran untuk kedai fizikal di Malaysia | MPG",
      description: "Terima DuitNow QR dan e-wallet di kedai, kafe atau restoran anda: penyedia disusun ikut caj rasmi, dengan pilihan terminal dan QR untuk dibandingkan.",
      intro: "Pelanggan di kedai biasanya bayar dengan imbas kod: DuitNow QR dan e-wallet boleh guna di hampir semua telefon di Malaysia. Semua penyedia di bawah terima kedua-duanya tanpa perlu tulis kod. Bandingkan juga penyedia yang fokus pada mesin terminal (Qashier, Revenue Monster) di halaman mereka, dan pakej QR bank: CIMB dan Hong Leong kini iklankan pakej DuitNow QR tanpa MDR (caj setiap transaksi sifar).",
      faqNoun: "penyedia bayaran untuk kedai fizikal",
    },
    qrFaq: true,
  },
  {
    slug: "payment-gateway-digital-products",
    needs: { noCode: true, channels: ["fpx"] },
    h1: "Payment gateways for digital products and services",
    title: "Payment gateways for digital products & services | MPG",
    description:
      "Sell ebooks, courses and services with payment links and instant FPX checkout: no-code Malaysian gateways ranked by real cost on published rates.",
    intro:
      "Selling ebooks, templates, courses or client services needs a payment link and a receipt, not a storefront. Every provider below does this from a dashboard with FPX support; flat-fee providers win on typical digital-product tickets, and most can auto-deliver via webhooks if you later add code.",
    faqNoun: "payment gateway for digital products",
    ms: {
      h1: "Payment gateway untuk produk digital dan servis",
      title: "Payment gateway untuk produk digital & servis | MPG",
      description: "Jual ebook, kursus dan servis dengan link bayaran dan checkout FPX segera: payment gateway Malaysia tanpa kod, disusun ikut caj sebenar.",
      intro: "Untuk jual ebook, templat, kursus atau servis kepada klien, anda cuma perlukan link bayaran dan resit, bukan kedai online. Semua gateway di bawah boleh buat ini dari dashboard, dengan FPX. Gateway yang caj jumlah tetap (sama nilai setiap transaksi) lebih jimat untuk harga biasa produk digital, dan kebanyakannya boleh hantar produk secara automatik melalui webhook (notifikasi automatik bila bayaran berjaya) jika anda tambah kod kemudian.",
      faqNoun: "payment gateway untuk produk digital",
    },
  },
  {
    slug: "payment-gateway-saas",
    needs: { recurring: true, developer: true },
    h1: "Payment gateways for SaaS and subscriptions",
    title: "Best payment gateways for SaaS products in Malaysia | MPG",
    description:
      "Malaysian gateways with recurring billing and a developer API for SaaS: automatic monthly charging, webhooks and costs from published rates.",
    intro:
      "SaaS needs card-on-file recurring charging plus a real API for provisioning and dunning. Every provider below supports both. Compare each one's webhook support on its detail page, and weigh settlement speed: subscription cash flow compounds the difference.",
    faqNoun: "SaaS payment gateway",
    ms: {
      h1: "Payment gateway untuk SaaS dan langganan",
      title: "Payment gateway untuk produk SaaS di Malaysia | MPG",
      description: "Payment gateway Malaysia dengan caj berulang automatik dan API untuk SaaS: caj bulanan automatik, webhook dan kos dari kadar rasmi yang disiarkan.",
      intro: "SaaS (perisian yang dijual secara langganan) perlukan caj berulang automatik guna kad yang disimpan, serta API sebenar untuk buka akaun pelanggan dan kejar bayaran yang gagal. Semua gateway di bawah ada kedua-duanya. Bandingkan sokongan webhook setiap gateway di halaman mereka, dan ambil kira tempoh duit masuk: dalam langganan, beza kecil ini terkumpul dari bulan ke bulan.",
      faqNoun: "payment gateway untuk SaaS",
    },
  },
];

// trailing slash matches the served URL form; Cloudflare Pages 308-redirects
// the slashless variant, which costs a hop and splits incoming-link counts
export function profilePath(slug: string): string {
  return `/best/${slug}/`;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ProfilePage {
  def: ProfileDef;
  /** def's copy in the language the page was built for */
  copy: ProfileCopy;
  /** matches with published comparable rates, cheapest first */
  ranked: Match[];
  /** matching but quote-based providers, by market presence */
  onRequest: Match[];
  /** matching providers before the limit was applied */
  totalMatches: number;
  /** constraints recommendOrClosest() had to drop (normally empty) */
  relaxed: string[];
  faqs: Faq[];
  /**
   * Citable dated answer sentence ("As of <date>, X is the cheapest…"),
   * present when a ranked top exists and an as-of date was supplied (spec 12).
   */
  answerLine?: string;
  /** meta description: data-built when `answerMeta` fits 110-160 chars, else the copy's */
  description: string;
  /** top published-rate pick per need (generic page, `byNeed`) */
  byNeed: Array<{ slug: string; label: string; top: ApiGateway }>;
  /** cheapest published-rate provider per sale size (`tickets`) */
  byTicket: Array<{ ticket: number; top: ApiGateway; cost: number }>;
}

const fmtRM = (v: number) => `RM${v.toFixed(2)}`;
const base = (g: ApiGateway) => splitName(g.name).base;

/** first published-rate match for a profile's needs (same pool rules as the page) */
function topPick(gateways: ApiGateway[], def: ProfileDef): ApiGateway | undefined {
  const pool = def.pluginsOnly ? gateways.filter((g) => g.plugins.length > 0) : gateways;
  return recommend(pool, def.needs, Number.POSITIVE_INFINITY).find((m) => m.gateway.rankable)?.gateway;
}

/**
 * Cheapest published-rate gateway at each sale size, using the site's own
 * blended cost (fees.ts). RM100 reuses the ranked order so it always agrees
 * with the list on the page.
 */
function cheapestByTicket(
  rankable: ApiGateway[],
  tickets: number[],
): Array<{ ticket: number; top: ApiGateway; cost: number }> {
  const out: Array<{ ticket: number; top: ApiGateway; cost: number }> = [];
  for (const ticket of tickets) {
    if (ticket === REF_TICKET && rankable[0]?.est_fee_rm100 != null) {
      out.push({ ticket, top: rankable[0], cost: rankable[0].est_fee_rm100 });
      continue;
    }
    let best: { top: ApiGateway; cost: number } | undefined;
    for (const g of rankable) {
      const cost = Number(gatewayCost(g.fees, ticket).cost.toFixed(2));
      if (!Number.isFinite(cost)) continue;
      if (!best || cost < best.cost) best = { top: g, cost };
    }
    if (best) out.push({ ticket, ...best });
  }
  return out;
}

/** lowest published (non-indicative) DuitNow QR rates on a RM100 sale */
function lowestQr(gateways: ApiGateway[], n = 4): ApiGateway[] {
  return gateways
    .map((g) => ({ g, shape: parseFeeShape(g.fees.duitnowqr ?? "") }))
    .filter((x) => x.shape.known && !x.shape.indicative)
    .sort((a, b) => effectiveCost(a.shape, REF_TICKET) - effectiveCost(b.shape, REF_TICKET) || b.g.popularity - a.g.popularity)
    .slice(0, n)
    .map((x) => x.g);
}

/** "A, B and C" / "A, B dan C" */
function joinList(items: string[], and: string): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${and} ${items.at(-1)}`;
}

const pct = (w: number) => Math.round(w * 100);

/**
 * `asOf` is interpolated as given, so a BM page passes an already formatted
 * date; `locale` picks the language of the FAQ and answer-line prose.
 */
export function buildProfilePage(
  gateways: ApiGateway[],
  def: ProfileDef,
  limit = 8,
  asOf?: string,
  locale: Locale = "en",
): ProfilePage {
  const pool = def.pluginsOnly ? gateways.filter((g) => g.plugins.length > 0) : gateways;
  const all = recommend(pool, def.needs, Number.POSITIVE_INFINITY);
  const totalMatches = all.length;
  const { matches, relaxed } = recommendOrClosest(pool, def.needs, limit);
  const ranked = matches.filter((m) => m.gateway.rankable);
  const onRequest = matches.filter((m) => !m.gateway.rankable);
  const copy = profileCopy(def, locale);
  const noun = copy.faqNoun;
  const ms = locale === "ms";

  const faqs: Faq[] = [];
  const top = ranked[0]?.gateway;
  const next = ranked.slice(1, 3).map((m) => m.gateway);
  let answerLine: string | undefined;

  const byNeed: ProfilePage["byNeed"] = [];
  for (const n of def.byNeed ?? []) {
    const other = PROFILES.find((p) => p.slug === n.slug);
    const pick = other && topPick(gateways, other);
    if (other && pick) byNeed.push({ slug: other.slug, label: ms ? n.labelMs : n.label, top: pick });
  }
  const byTicket = def.tickets
    ? cheapestByTicket(all.filter((m) => m.gateway.rankable).map((m) => m.gateway), def.tickets)
    : [];

  // data-built meta description, only when it lands inside the SERP window
  let description = copy.description;
  if (def.answerMeta && top && top.est_fee_rm100 != null) {
    const names = next.map(base);
    const tail = names.length ? (ms ? `, diikuti ${joinList(names, "dan")}` : `, then ${joinList(names, "and")}`) : "";
    const make = ms ? def.answerMeta.ms : def.answerMeta.en;
    // with the runners-up first, then without them, else keep the static copy
    const built = [make(base(top), fmtRM(top.est_fee_rm100), tail), make(base(top), fmtRM(top.est_fee_rm100), "")].find(
      (d) => d.length >= 110 && d.length <= 160,
    );
    if (built) description = built;
  }

  // names from `list` that fail this page's needs, so readers know why they are missing below
  const outside = (list: ApiGateway[], lang: Locale): string => {
    const out = list.filter((g) => !all.some((m) => m.gateway.slug === g.slug)).map(base);
    if (!out.length) return "";
    return lang === "ms"
      ? ` ${joinList(out, "dan")} tidak penuhi semua keperluan halaman ini, jadi tiada dalam senarai di atas.`
      : ` ${joinList(out, "and")} ${out.length > 1 ? "do" : "does"} not meet every need on this page, so ${out.length > 1 ? "they are" : "it is"} not in the list above.`;
  };

  const runnersUp = next
    .filter((g) => g.est_fee_rm100 != null)
    .map((g) => `${base(g)} (${fmtRM(g.est_fee_rm100!)})`);

  if (ms) {
    if (top && top.est_fee_rm100 != null && asOf) {
      answerLine = `Sehingga ${asOf}, ${top.name} ialah pilihan paling murah untuk ${noun} yang ada kadar rasmi, kira-kira ${fmtRM(top.est_fee_rm100)} bagi setiap transaksi RM100${
        runnersUp.length ? `, diikuti ${joinList(runnersUp, "dan")}` : ""
      }.`;
    }
    if (top && top.est_fee_rm100 != null && !def.noCheapestFaq) {
      faqs.push({
        q: `Apakah ${noun} yang paling murah?`,
        a: `${asOf ? `Sehingga ${asOf}, ` : "Antara penyedia yang ada kadar rasmi, "}${top.name} ada anggaran caj campuran paling rendah, kira-kira ${fmtRM(top.est_fee_rm100)} bagi setiap transaksi RM100${asOf ? ", antara penyedia yang ada kadar rasmi" : ""}. Penyedia yang beri harga atas permintaan mungkin boleh runding lebih rendah, tapi mereka tidak siarkan kadar yang boleh dibandingkan.`,
      });
    }
    if (def.noCheapestFaq) {
      faqs.push({
        q: `Macam mana nak pilih ${noun}?`,
        a: `Mula dengan cara bayaran yang pelanggan anda guna (FPX, kad, e-wallet, DuitNow QR), kemudian bandingkan kadar rasmi pada nilai transaksi yang sama. Direktori ini susun gateway ikut anggaran caj campuran bagi setiap transaksi RM100. Alat "Bantu saya pilih" pula tapis senarai ikut keperluan anda dengan empat soalan.`,
      });
    }
    if (byNeed.length) {
      faqs.push({
        q: `${noun.charAt(0).toUpperCase()}${noun.slice(1)} mana yang sesuai untuk FPX, kad atau e-wallet?`,
        a: `Ikut anggaran caj paling rendah dari kadar rasmi: ${byNeed
          .map((b) => `untuk ${b.label}, ${b.top.name} (${fmtRM(b.top.est_fee_rm100!)})`)
          .join("; ")}. Angka ialah anggaran bagi setiap jualan RM100.`,
      });
    }
    if (byTicket.length > 1) {
      faqs.push({
        q: "Adakah gateway paling murah sama untuk jualan kecil dan besar?",
        a: `${byTicket.map((b) => `Untuk jualan RM${b.ticket}, ${b.top.name} paling murah (sekitar ${fmtRM(b.cost)})`).join(". ")}. Caj rata FPX lebih berat untuk jualan kecil, manakala caj peratusan naik bila jualan makin besar.`,
      });
    }
    if (def.qrFaq) {
      const qr = lowestQr(gateways);
      if (qr.length)
        faqs.push({
          q: "Penyedia mana yang ada caj DuitNow QR paling rendah?",
          a: `Antara kadar DuitNow QR yang disiarkan, yang paling rendah ialah ${joinList(
            qr.map((g) => `${g.name} (${g.fees.duitnowqr})`),
            "dan",
          )}.${outside(qr, "ms")} Semak syarat di halaman setiap penyedia, contohnya akaun yang perlu dibuka dan berapa lama caj sifar itu kekal.`,
        });
    }
    if (def.devFaq) {
      const gs = all.map((m) => m.gateway);
      const mcp = gs.filter((g) => g.mcp === "official");
      faqs.push({
        q: "Berapa banyak yang ada webhook, plugin dan MCP?",
        a: `Daripada ${gs.length} penyedia yang ada API, ${gs.filter((g) => g.webhooks).length} hantar webhook (notifikasi automatik bila bayaran berjaya), ${gs.filter((g) => g.plugins.length).length} ada plugin kedai online siap pakai dan ${mcp.length} ada server MCP rasmi untuk AI agent${
          mcp.length ? ` (${mcp.length > 5 ? `${mcp.slice(0, 5).map(base).join(", ")} dan lain-lain` : joinList(mcp.map(base), "dan")})` : ""
        }.`,
      });
    }
    faqs.push({
      q: `Apa pilihan yang ada untuk ${noun}?`,
      a: `${totalMatches} daripada ${gateways.length} penyedia Malaysia dalam direktori ini padan dengan keperluan ini. ${ranked.length ? `${ranked.length} daripada pilihan yang paling padan siarkan kadar rasmi yang boleh dibandingkan, selebihnya beri harga atas permintaan.` : `Tiada satu pun yang siarkan kadar rasmi yang boleh dibandingkan, jadi semuanya disusun ikut tahap popular.`}`,
    });
    if (def.costFaq) {
      faqs.push({
        q: "Macam mana caj bagi RM100 dikira?",
        a: `Kami guna kadar rasmi setiap penyedia pada jualan RM100, dan campurkan cara bayar ikut nisbah ${pct(CHANNEL_WEIGHTS.fpx)}% FPX, ${pct(CHANNEL_WEIGHTS.card)}% kad dan ${pct(CHANNEL_WEIGHTS.ewallet)}% e-wallet, iaitu campuran biasa PKS di Malaysia. Caj rata dan caj peratusan dikira berasingan: caj FPX RM1.00 dikira RM1.00, dan 1.5% dikira RM1.50. Cara bayar yang tiada kadar rasmi tidak dimasukkan dalam campuran penyedia itu. Cuba kalkulator caj dengan nilai jualan anda sendiri.`,
      });
    }
    faqs.push({
      q: "Adakah fee ini rasmi?",
      a: 'Fee tanpa tanda diambil dari halaman harga rasmi gateway (sumber dan tarikh semakan ada di halaman setiap gateway). Angka bertanda * datang dari pihak ketiga atau cuma anggaran, dan tidak dikira dalam susunan. Kalau tiada apa-apa yang disiarkan, kami tulis "Hubungi jualan" dan tidak reka angka.',
    });
    return { def, copy, ranked, onRequest, totalMatches, relaxed, faqs, answerLine, description, byNeed, byTicket };
  }

  if (top && top.est_fee_rm100 != null && asOf) {
    answerLine = `As of ${asOf}, ${top.name} is the cheapest ${noun} with officially published rates, at about ${fmtRM(top.est_fee_rm100)} per RM100 transaction${
      runnersUp.length ? `, followed by ${joinList(runnersUp, "and")}` : ""
    }.`;
  }
  if (top && top.est_fee_rm100 != null && !def.noCheapestFaq) {
    faqs.push({
      q: `What is the cheapest ${noun}?`,
      a: `${asOf ? `As of ${asOf}, ` : "Among providers with officially published rates, "}${top.name} has the lowest estimated blended cost at about ${fmtRM(top.est_fee_rm100)} per RM100 transaction${asOf ? ", among providers with officially published rates" : ""}. Quote-based providers may negotiate lower, but publish no comparable rates.`,
    });
  }
  if (def.noCheapestFaq) {
    faqs.push({
      q: `How do I choose a ${noun}?`,
      a: `Match by the payment channels your customers use (FPX, card, e-wallet, DuitNow QR), then compare officially published rates on a like-for-like basket. This directory ranks providers by estimated blended cost per RM100 transaction; the "Help me choose" wizard narrows it to your needs in four questions.`,
    });
  }
  if (byNeed.length) {
    faqs.push({
      q: `Which ${noun} is best for FPX, cards or e-wallets?`,
      a: `By lowest estimated cost on published rates: ${byNeed
        .map((b) => `for ${b.label}, ${b.top.name} (${fmtRM(b.top.est_fee_rm100!)})`)
        .join("; ")}. Figures are estimates per RM100 sale.`,
    });
  }
  if (byTicket.length > 1) {
    faqs.push({
      q: "Is the cheapest gateway the same for small and large sales?",
      a: `${byTicket.map((b) => `On a RM${b.ticket} sale, ${b.top.name} is cheapest (about ${fmtRM(b.cost)})`).join(". ")}. A flat FPX fee weighs more on a small sale, while a percentage fee grows with the sale.`,
    });
  }
  if (def.qrFaq) {
    const qr = lowestQr(gateways);
    if (qr.length)
      faqs.push({
        q: "Which provider has the lowest DuitNow QR fee?",
        a: `Among published DuitNow QR rates, the lowest are ${joinList(
          qr.map((g) => `${g.name} (${g.fees.duitnowqr})`),
          "and",
        )}.${outside(qr, "en")} Check each provider's page for conditions, such as the account you need and how long a zero rate lasts.`,
      });
  }
  if (def.devFaq) {
    const gs = all.map((m) => m.gateway);
    const mcp = gs.filter((g) => g.mcp === "official");
    faqs.push({
      q: "How many of them support webhooks, plugins and MCP?",
      a: `Of the ${gs.length} providers with a developer API, ${gs.filter((g) => g.webhooks).length} send webhooks, ${gs.filter((g) => g.plugins.length).length} ship ready-made e-commerce plugins and ${mcp.length} run an official MCP server for AI coding agents${
        mcp.length ? ` (${mcp.length > 5 ? `${mcp.slice(0, 5).map(base).join(", ")} and others` : joinList(mcp.map(base), "and")})` : ""
      }.`,
    });
  }
  faqs.push({
    q: `What are my options for a ${noun}?`,
    a: `${totalMatches} of the ${gateways.length} Malaysian providers in this directory match this need. ${ranked.length ? `${ranked.length} of the top matches publish comparable official rates; the rest quote on request.` : `None of them publish comparable official rates, so they are listed by market presence.`}`,
  });
  if (def.costFaq) {
    faqs.push({
      q: "How is the cost per RM100 worked out?",
      a: `We apply each provider's officially published rates to a RM100 sale and blend the channels as ${pct(CHANNEL_WEIGHTS.fpx)}% FPX, ${pct(CHANNEL_WEIGHTS.card)}% card and ${pct(CHANNEL_WEIGHTS.ewallet)}% e-wallet, a typical Malaysian SME mix. Flat and percentage fees are costed separately: a flat RM1.00 FPX fee counts as RM1.00 and 1.5% counts as RM1.50. Channels a provider does not publish are left out of its blend. Try the fee calculator with your own sale size.`,
    });
  }
  faqs.push({
    q: "Are these fees official?",
    a: "Fees without a marker come from the provider's official pricing page (see the source and verified date on each detail page). Values with a trailing * are third-party or indicative and are excluded from the ranking. Where nothing is published we say \"Contact sales\" instead of inventing a number.",
  });

  return { def, copy, ranked, onRequest, totalMatches, relaxed, faqs, answerLine, description, byNeed, byTicket };
}

const HEADLINE_CHANNELS: Array<[key: string, label: string, labelMs: string]> = [
  ["fpx", "FPX", "FPX"],
  ["card", "Card", "Kad"],
  ["ewallet", "E-wallet", "E-wallet"],
  ["duitnowqr", "DuitNow QR", "DuitNow QR"],
];

/**
 * Compact per-item headline rates for ranked lists ("FPX RM1.25 · Card 1.8%"),
 * straight from the published fee strings — no math, `*`/Contact-sales rows
 * are skipped so only official headline rates surface (spec 12 item 11).
 */
export function headlineRates(g: ApiGateway, max = 3, locale: Locale = "en"): string {
  const parts: string[] = [];
  for (const [key, en, ms] of HEADLINE_CHANNELS) {
    const label = locale === "ms" ? ms : en;
    const v = g.fees[key];
    if (!v || v === "—" || v === "Contact sales" || v.includes("*")) continue;
    parts.push(`${label} ${v}`);
    if (parts.length >= max) break;
  }
  return parts.join(" · ");
}

/** JSON-LD for a profile page: ItemList of the ranked matches + FAQPage. */
export function profileJsonLd(page: ProfilePage, site: string): object[] {
  // trailing slash: JSON-LD urls must match the canonical/sitemap URL form
  const items = [...page.ranked, ...page.onRequest].map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.gateway.name,
    url: `${site}/gateway/${m.gateway.slug}/`,
  }));
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: page.copy.h1,
      itemListElement: items,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}

// ---------------------------------------------------------------------------
// Head-to-head pages (/vs/<a>-vs-<b>)
// ---------------------------------------------------------------------------

const TOP_GATEWAYS = 12; // most popular "gateway"-category entries considered
const TOP_BNPL = 4; // most popular BNPL providers considered

export interface VsPair {
  slug: string;
  a: ApiGateway;
  b: ApiGateway;
}

const byPopularity = (x: ApiGateway, y: ApiGateway) =>
  y.popularity - x.popularity || x.name.localeCompare(y.name);

/**
 * Curated, deterministic pair list (AFU-approved scope 2026-07-02):
 * same-category pairs only, from the top 12 gateway-category entries
 * (keeping a pair only when at least one side has published comparable rates)
 * plus all pairs among the top 4 BNPL providers. Slugs are alphabetical, so
 * each pair has exactly one canonical page.
 */
export function vsPairs(gateways: ApiGateway[]): VsPair[] {
  const topGateways = gateways.filter((g) => g.category === "gateway").sort(byPopularity).slice(0, TOP_GATEWAYS);
  const topBnpl = gateways.filter((g) => g.category === "bnpl").sort(byPopularity).slice(0, TOP_BNPL);

  const pairs: VsPair[] = [];
  const push = (x: ApiGateway, y: ApiGateway) => {
    const [a, b] = x.slug < y.slug ? [x, y] : [y, x];
    pairs.push({ slug: `${a.slug}-vs-${b.slug}`, a, b });
  };

  for (let i = 0; i < topGateways.length; i++)
    for (let j = i + 1; j < topGateways.length; j++)
      if (topGateways[i].rankable || topGateways[j].rankable) push(topGateways[i], topGateways[j]);

  for (let i = 0; i < topBnpl.length; i++)
    for (let j = i + 1; j < topBnpl.length; j++) push(topBnpl[i], topBnpl[j]);

  return pairs.sort((x, y) => x.slug.localeCompare(y.slug));
}

export interface VsRow {
  /** stable row id (labels change with the page language) */
  key: string;
  label: string;
  a: string;
  b: string;
}

export interface VsPage {
  pair: VsPair;
  title: string;
  description: string;
  /** data-derived one-liners, never fabricated */
  verdicts: string[];
  feeRows: VsRow[];
  featureRows: VsRow[];
}

// Bahasa Malaysia twin of CHANNEL_LABEL for the generated vs copy
const CHANNEL_LABEL_MS: Record<Channel, string> = {
  fpx: "FPX",
  card: "kad",
  ewallet: "e-wallet",
  duitnowqr: "DuitNow QR",
  bnpl: "BNPL",
};

const VS_TEXT = {
  en: {
    yes: "Yes",
    no: "No",
    official: "Official",
    community: "Community",
    onRequest: "On request",
    access: { integrate: "Integrate", account: "Merchant account", infrastructure: "Infrastructure" } as Record<string, string>,
    rows: {
      est: "Est. fee / RM100",
      fpx: "FPX",
      card: "Cards (local)",
      card_intl: "Cards (international)",
      ewallet: "E-wallets",
      duitnowqr: "DuitNow QR",
      bnpl: "BNPL",
      setup: "Setup fee",
      monthly: "Monthly fee",
      settlement: "Settlement",
      access: "Access",
      channels: "Channels",
      no_code: "No-code payment links",
      api: "Developer API",
      recurring: "Recurring billing",
      webhooks: "Webhooks",
      mcp: "MCP (AI agents)",
      plugins: "Plugins",
    },
    same: (rm: string) => `Both estimate to about ${rm} per RM100 on our blended basket of published rates.`,
    cheaper: (cheap: string, c: string, d: string) =>
      `${cheap} is cheaper on our blended RM100 estimate (${c} vs ${d}), using officially published rates.`,
    pubOnly: (pub: string, rm: string, quote: string) =>
      `${pub} publishes comparable official rates (about ${rm} per RM100); ${quote} does not publish enough official rates for a like-for-like estimate, so confirm their full pricing with sales.`,
    neither: "Neither publishes comparable official rates; both quote on request.",
    extra: (x: string, ch: string, y: string) => `${x} also supports ${ch}, which ${y} does not list.`,
    noCode: (x: string) => `${x} offers no-code payment links; the other side needs a developer.`,
    recurringV: (x: string) => `${x} supports recurring / subscription billing; the other does not.`,
    mcpV: (x: string) => `${x} runs an official MCP server, so AI agents can integrate it directly.`,
    title: (a: string, b: string) => `${a} vs ${b}: fees compared | MPG`,
    description: (a: string, b: string) =>
      `${a} vs ${b} for Malaysian merchants: published FPX, card and e-wallet fees, settlement, no-code and developer features, side by side.`,
    channel: CHANNEL_LABEL,
  },
  ms: {
    yes: "Ya",
    no: "Tidak",
    official: "Rasmi",
    community: "Komuniti",
    onRequest: "Atas permintaan",
    access: { integrate: "Integrasi", account: "Akaun peniaga", infrastructure: "Infrastruktur" } as Record<string, string>,
    rows: {
      est: "Anggaran caj / RM100",
      fpx: "FPX",
      card: "Kad (tempatan)",
      card_intl: "Kad (luar negara)",
      ewallet: "E-wallet",
      duitnowqr: "DuitNow QR",
      bnpl: "BNPL",
      setup: "Fee setup",
      monthly: "Fee bulanan",
      settlement: "Duit masuk",
      access: "Cara mula",
      channels: "Cara bayar",
      no_code: "Link bayaran tanpa kod",
      api: "API untuk developer",
      recurring: "Caj berulang automatik",
      webhooks: "Webhook",
      mcp: "MCP (AI agent)",
      plugins: "Plugin",
    },
    same: (rm: string) =>
      `Anggaran kedua-duanya sama, sekitar ${rm} bagi setiap RM100, ikut campuran kadar rasmi yang kami guna.`,
    cheaper: (cheap: string, c: string, d: string) =>
      `${cheap} lebih murah ikut anggaran caj RM100 kami (${c} berbanding ${d}), dikira dari kadar rasmi yang disiarkan.`,
    pubOnly: (pub: string, rm: string, quote: string) =>
      `${pub} siarkan kadar rasmi yang boleh dibandingkan (sekitar ${rm} bagi setiap RM100). ${quote} tidak siarkan kadar rasmi yang cukup untuk dibandingkan secara adil, jadi tanya harga penuh mereka dengan pasukan jualan.`,
    neither: "Kedua-duanya tidak siarkan kadar rasmi yang boleh dibandingkan. Harga diberi atas permintaan.",
    extra: (x: string, ch: string, y: string) => `${x} juga terima ${ch}, yang tidak disenaraikan oleh ${y}.`,
    noCode: (x: string) => `${x} ada link bayaran tanpa kod. Yang satu lagi perlukan developer.`,
    recurringV: (x: string) => `${x} sokong caj berulang automatik (langganan). Yang satu lagi tidak.`,
    mcpV: (x: string) =>
      `${x} ada server MCP rasmi, jadi AI agent (pembantu AI yang menulis kod) boleh integrasi terus.`,
    title: (a: string, b: string) => `${a} vs ${b}: bandingkan fee | MPG`,
    description: (a: string, b: string) =>
      `${a} vs ${b} untuk peniaga Malaysia: caj FPX, kad dan e-wallet yang disiarkan, tempoh duit masuk, serta ciri tanpa kod dan ciri developer, sebelah-menyebelah.`,
    channel: CHANNEL_LABEL_MS,
  },
};
type VsText = (typeof VS_TEXT)["en"];

function verdictsFor(a: ApiGateway, b: ApiGateway, t: VsText): string[] {
  const v: string[] = [];
  const channelNames = (list: string[]) => list.map((c) => t.channel[c as Channel] ?? c).join(", ");

  if (a.rankable && b.rankable && a.est_fee_rm100 != null && b.est_fee_rm100 != null) {
    if (a.est_fee_rm100 === b.est_fee_rm100) {
      v.push(t.same(fmtRM(a.est_fee_rm100)));
    } else {
      const [cheap, dear] = a.est_fee_rm100 < b.est_fee_rm100 ? [a, b] : [b, a];
      v.push(t.cheaper(cheap.name, fmtRM(cheap.est_fee_rm100!), fmtRM(dear.est_fee_rm100!)));
    }
  } else if (a.rankable !== b.rankable) {
    const [pub, quote] = a.rankable ? [a, b] : [b, a];
    v.push(t.pubOnly(pub.name, fmtRM(pub.est_fee_rm100!), quote.name));
  } else {
    v.push(t.neither);
  }

  const extraA = a.channels.filter((c) => !b.channels.includes(c));
  const extraB = b.channels.filter((c) => !a.channels.includes(c));
  if (extraA.length) v.push(t.extra(a.name, channelNames(extraA), b.name));
  if (extraB.length) v.push(t.extra(b.name, channelNames(extraB), a.name));

  if (a.features.no_code !== b.features.no_code) v.push(t.noCode((a.features.no_code ? a : b).name));
  if (a.features.recurring !== b.features.recurring) v.push(t.recurringV((a.features.recurring ? a : b).name));
  if ((a.mcp === "official") !== (b.mcp === "official")) v.push(t.mcpV((a.mcp === "official" ? a : b).name));

  return v;
}

export function buildVsPage(pair: VsPair, locale: Locale = "en"): VsPage {
  const { a, b } = pair;
  const t = VS_TEXT[locale];
  const L = t.rows;
  const fee = (g: ApiGateway, key: string) => g.fees[key] ?? "—";
  const bool = (v: boolean | null | undefined) => (v == null ? "—" : v ? t.yes : t.no);
  const mcpLabel = (v: string) => (v === "official" ? t.official : v === "community" ? t.community : "—");
  const estFee = (g: ApiGateway) =>
    g.rankable && g.est_fee_rm100 != null ? `~${fmtRM(g.est_fee_rm100)}` : t.onRequest;
  const channelNames = (list: string[]) => list.map((c) => t.channel[c as Channel] ?? c).join(", ");
  const access = (g: ApiGateway) => t.access[g.access.key] ?? g.access.short;
  const row = (key: keyof typeof L, va: string, vb: string): VsRow => ({ key, label: L[key], a: va, b: vb });

  const feeRows: VsRow[] = [
    row("est", estFee(a), estFee(b)),
    row("fpx", fee(a, "fpx"), fee(b, "fpx")),
    row("card", fee(a, "card"), fee(b, "card")),
    row("card_intl", fee(a, "card_intl"), fee(b, "card_intl")),
    row("ewallet", fee(a, "ewallet"), fee(b, "ewallet")),
    row("duitnowqr", fee(a, "duitnowqr"), fee(b, "duitnowqr")),
    row("bnpl", fee(a, "bnpl"), fee(b, "bnpl")),
    row("setup", fee(a, "setup"), fee(b, "setup")),
    row("monthly", fee(a, "monthly"), fee(b, "monthly")),
    row("settlement", a.settlement, b.settlement),
  ];

  const featureRows: VsRow[] = [
    row("access", access(a), access(b)),
    row("channels", channelNames(a.channels), channelNames(b.channels)),
    row("no_code", bool(a.features.no_code), bool(b.features.no_code)),
    row("api", bool(a.features.api), bool(b.features.api)),
    row("recurring", bool(a.features.recurring), bool(b.features.recurring)),
    row("webhooks", bool(a.webhooks), bool(b.webhooks)),
    row("mcp", mcpLabel(a.mcp), mcpLabel(b.mcp)),
    row("plugins", a.plugins.length ? a.plugins.join(", ") : "—", b.plugins.length ? b.plugins.join(", ") : "—"),
  ];

  // brand base names keep titles inside the ~60-char SERP window; notes like
  // "(formerly Razer Merchant Services)" stay in the page body only
  const baseA = splitName(a.name).base;
  const baseB = splitName(b.name).base;
  return {
    pair,
    title: t.title(baseA, baseB),
    description: t.description(baseA, baseB),
    verdicts: verdictsFor(a, b, t),
    feeRows,
    featureRows,
  };
}

// ---------------------------------------------------------------------------
// Alternatives pages (/alternatives/<slug>) — spec 12 item 7
// ---------------------------------------------------------------------------

const TOP_ALTERNATIVE_TARGETS = 12; // most popular "gateway" entries get a page (same window as the vs-pair curation)

export interface AlternativesPage {
  target: ApiGateway;
  /** display base name (parenthetical notes stripped) */
  base: string;
  /** page heading, also the JSON-LD ItemList name */
  h1: string;
  title: string;
  description: string;
  intro: string;
  ranked: Match[];
  onRequest: Match[];
  faqs: Faq[];
  answerLine?: string;
}

/** The big-brand gateways worth an alternatives page: top-N by popularity. */
export function alternativesTargets(gateways: ApiGateway[]): ApiGateway[] {
  return gateways
    .filter((g) => g.category === "gateway")
    .sort(byPopularity)
    .slice(0, TOP_ALTERNATIVE_TARGETS);
}

/**
 * Alternatives = recommend() over the same core channels the target serves
 * (all-of, so every alternative covers the target's rails), minus the target.
 * Falls back to no channel constraint when the target's channels are unusual.
 */
export function buildAlternativesPage(
  gateways: ApiGateway[],
  target: ApiGateway,
  limit = 8,
  asOf?: string,
  locale: Locale = "en",
): AlternativesPage {
  const CORE: Channel[] = ["fpx", "card", "ewallet", "duitnowqr"];
  const channels = target.channels.filter((c): c is Channel => (CORE as string[]).includes(c));
  const pool = gateways.filter((g) => g.slug !== target.slug);
  const needs: Needs = channels.length ? { channels, access: "integrate" } : { access: "integrate" };
  const { matches } = recommendOrClosest(pool, needs, limit);
  const ranked = matches.filter((m) => m.gateway.rankable);
  const onRequest = matches.filter((m) => !m.gateway.rankable);

  const base = splitName(target.name).base;
  const top = ranked[0]?.gateway;
  const ms = locale === "ms";
  const date = asOf && ms ? formatDate(asOf, "ms") : asOf;
  const targetVs = target.rankable && target.est_fee_rm100 != null ? fmtRM(target.est_fee_rm100) : null;

  let answerLine: string | undefined;
  if (top && top.est_fee_rm100 != null && asOf) {
    answerLine = ms
      ? `Setakat ${date}, pilihan selain ${base} yang paling murah dengan kadar rasmi ialah ${top.name}, sekitar ${fmtRM(top.est_fee_rm100)} bagi setiap transaksi RM100${
          targetVs ? ` (berbanding sekitar ${targetVs} untuk ${base})` : ""
        }.`
      : `As of ${asOf}, the cheapest ${base} alternative with officially published rates is ${top.name}, at about ${fmtRM(top.est_fee_rm100)} per RM100 transaction${
          targetVs ? ` (vs about ${targetVs} on ${base})` : ""
        }.`;
  }

  const faqs: Faq[] = [];
  if (top && top.est_fee_rm100 != null) {
    faqs.push(
      ms
        ? {
            q: `Apakah pilihan paling murah selain ${base}?`,
            a: `${asOf ? `Setakat ${date}, ` : ""}${top.name} ialah pilihan paling murah dengan kadar rasmi, sekitar ${fmtRM(top.est_fee_rm100)} bagi setiap transaksi RM100, untuk cara bayar utama yang sama.`,
          }
        : {
            q: `What is the cheapest alternative to ${base}?`,
            a: `${asOf ? `As of ${asOf}, ` : ""}${top.name} is the cheapest alternative with officially published rates, at about ${fmtRM(top.est_fee_rm100)} per RM100 transaction covering the same core channels.`,
          },
    );
  }
  faqs.push(
    ms
      ? {
          q: `Kenapa perlu tengok selain ${base}?`,
          a: `Fee, tempoh duit masuk dan e-wallet yang disokong berbeza ikut gateway, dan ${
            target.rankable
              ? "kadar utama yang disiarkan tidak semestinya beri caj campuran paling rendah untuk cara bayar pelanggan anda"
              : `${base} tidak siarkan kadar yang boleh dibandingkan, jadi anda tak boleh kira kosnya tanpa minta sebut harga`
          }. Bila dibandingkan pada transaksi RM100 yang sama, barulah nampak kos sebenar setiap gateway.`,
        }
      : {
          q: `Why look beyond ${base}?`,
          a: `Fees, settlement speed and supported e-wallets differ by provider, and ${
            target.rankable ? "a published headline rate is not always the lowest blended cost for your mix of channels" : `${base} does not publish comparable rates, so you cannot price it without a quote`
          }. Comparing on the same RM100 basket shows what each provider really costs.`,
        },
  );
  faqs.push(
    ms
      ? {
          q: "Adakah fee ini rasmi?",
          a: "Ya. Hanya kadar yang disiarkan di laman web gateway itu sendiri diberi kedudukan. Angka pihak ketiga ditanda dan tidak dikira, dan harga yang tidak disiarkan ditunjukkan sebagai Hubungi jualan. Setiap halaman butiran ada sumber dan tarikh semakan.",
        }
      : {
          q: "Are these fees official?",
          a: "Yes. Only rates published on each provider's own site are ranked; third-party figures are marked and excluded, and unpublished pricing shows as Contact sales. Every detail page carries the source and verified date.",
        },
  );

  return {
    target,
    base,
    h1: ms ? `Pilihan lain selain ${base} di Malaysia` : `${base} alternatives in Malaysia`,
    title: ms ? `Bandingkan pilihan selain ${base} di Malaysia | MPG` : `${base} alternatives in Malaysia, compared | MPG`,
    description: ms
      ? `Pilihan selain ${base} untuk peniaga Malaysia, disusun ikut anggaran caj bagi setiap RM100 dari kadar rasmi FPX, kad dan e-wallet.`
      : `Alternatives to ${base} for Malaysian merchants, ranked by estimated cost per RM100 from officially published FPX, card and e-wallet rates.`,
    intro: ms
      ? `Semua gateway di bawah terima cara bayar utama yang sama seperti ${base}. Semuanya disusun ikut anggaran caj campuran yang kami guna di seluruh laman ini: kadar rasmi yang disiarkan, dikira atas satu transaksi RM100. Gateway yang beri harga atas permintaan disenaraikan selepas itu, ikut tahap popular.`
      : `Every provider below covers the same core payment channels as ${base} and is ranked by the same estimated blended cost used across this site: officially published rates applied to a RM100 transaction. Quote-based providers follow, by market presence.`,
    ranked,
    onRequest,
    faqs,
    answerLine,
  };
}

/** JSON-LD for an alternatives page: ItemList + FAQPage. */
export function alternativesJsonLd(page: AlternativesPage, site: string): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: page.h1,
      itemListElement: [...page.ranked, ...page.onRequest].map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: m.gateway.name,
        url: `${site}/gateway/${m.gateway.slug}/`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}
