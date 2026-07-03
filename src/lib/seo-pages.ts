// Programmatic SEO pages (spec 10): pure registries + page builders for
// /best/<profile> and /vs/<a>-vs-<b>. All ranking goes through recommend()
// and the ApiGateway shape, so these pages can never contradict the table,
// API, wizard, or MCP tools. No DOM, no fee math of its own.
import type { ApiGateway } from "./api";
import { recommend, recommendOrClosest, CHANNEL_LABEL, type Channel, type Match, type Needs } from "./recommend";
import { splitName } from "./name";

// ---------------------------------------------------------------------------
// Need-profile pages (/best/<profile>)
// ---------------------------------------------------------------------------

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
}

export const PROFILES: ProfileDef[] = [
  {
    slug: "payment-gateway-malaysia",
    needs: {},
    h1: "Best payment gateways in Malaysia",
    title: "Best payment gateways in Malaysia, ranked by real cost | MPG",
    description:
      "Ranked list of Malaysian payment gateways by estimated blended cost on a RM100 transaction, using officially published FPX, card and e-wallet rates.",
    intro:
      "Every provider below is ranked by the same estimated blended cost we use across this site: the officially published FPX, card and e-wallet rates applied to a RM100 transaction. Providers that only quote on request are listed after the ranked ones, by market presence.",
    faqNoun: "payment gateway in Malaysia",
    noCheapestFaq: true,
  },
  {
    slug: "cheapest-payment-gateway-malaysia",
    needs: {},
    h1: "Cheapest payment gateways in Malaysia",
    title: "Cheapest payment gateway in Malaysia (published rates) | MPG",
    description:
      "The cheapest Malaysian payment gateways by estimated cost per RM100 transaction. Only providers with officially published rates are ranked.",
    intro:
      "Cheapest is measured, not guessed: we parse each provider's officially published FPX, card and e-wallet rates and compute the blended cost of a RM100 transaction. Providers without comparable published rates cannot be ranked honestly, so they appear separately as quote-based.",
    faqNoun: "payment gateway in Malaysia",
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
  },
  {
    slug: "payment-gateway-api",
    needs: { developer: true },
    h1: "Payment gateways with a developer API",
    title: "Best developer-friendly payment gateways in Malaysia | MPG",
    description:
      "Malaysian payment gateways with a proper developer API, ranked by estimated cost. See also webhook, plugin and MCP support per provider.",
    intro:
      "Every provider below exposes a developer API for custom integrations. Check each detail page for webhooks, e-commerce plugins, API docs and AI-agent (MCP) support, and see the Learn section for a safe integration flow.",
    faqNoun: "developer-friendly payment gateway",
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
}

const fmtRM = (v: number) => `RM${v.toFixed(2)}`;

export function buildProfilePage(gateways: ApiGateway[], def: ProfileDef, limit = 8, asOf?: string): ProfilePage {
  const pool = def.pluginsOnly ? gateways.filter((g) => g.plugins.length > 0) : gateways;
  const totalMatches = recommend(pool, def.needs, Number.POSITIVE_INFINITY).length;
  const { matches, relaxed } = recommendOrClosest(pool, def.needs, limit);
  const ranked = matches.filter((m) => m.gateway.rankable);
  const onRequest = matches.filter((m) => !m.gateway.rankable);

  const faqs: Faq[] = [];
  const top = ranked[0]?.gateway;
  let answerLine: string | undefined;
  if (top && top.est_fee_rm100 != null && asOf) {
    answerLine = `As of ${asOf}, ${top.name} is the cheapest ${def.faqNoun} with officially published rates, at about ${fmtRM(top.est_fee_rm100)} per RM100 transaction.`;
  }
  if (top && top.est_fee_rm100 != null && !def.noCheapestFaq) {
    faqs.push({
      q: `What is the cheapest ${def.faqNoun}?`,
      a: `${asOf ? `As of ${asOf}, ` : "Among providers with officially published rates, "}${top.name} has the lowest estimated blended cost at about ${fmtRM(top.est_fee_rm100)} per RM100 transaction${asOf ? ", among providers with officially published rates" : ""}. Quote-based providers may negotiate lower, but publish no comparable rates.`,
    });
  }
  if (def.noCheapestFaq) {
    faqs.push({
      q: `How do I choose a ${def.faqNoun}?`,
      a: `Match by the payment channels your customers use (FPX, card, e-wallet, DuitNow QR), then compare officially published rates on a like-for-like basket. This directory ranks providers by estimated blended cost per RM100 transaction; the "Help me choose" wizard narrows it to your needs in four questions.`,
    });
  }
  faqs.push({
    q: `What are my options for a ${def.faqNoun}?`,
    a: `${totalMatches} of the ${gateways.length} Malaysian providers in this directory match this need. ${ranked.length ? `${ranked.length} of the top matches publish comparable official rates; the rest quote on request.` : `None of them publish comparable official rates, so they are listed by market presence.`}`,
  });
  faqs.push({
    q: "Are these fees official?",
    a: "Fees without a marker come from the provider's official pricing page (see the source and verified date on each detail page). Values with a trailing * are third-party or indicative and are excluded from the ranking. Where nothing is published we say \"Contact sales\" instead of inventing a number.",
  });

  return { def, ranked, onRequest, totalMatches, relaxed, faqs, answerLine };
}

const HEADLINE_CHANNELS: Array<[key: string, label: string]> = [
  ["fpx", "FPX"],
  ["card", "Card"],
  ["ewallet", "E-wallet"],
  ["duitnowqr", "DuitNow QR"],
];

/**
 * Compact per-item headline rates for ranked lists ("FPX RM1.25 · Card 1.8%"),
 * straight from the published fee strings — no math, `*`/Contact-sales rows
 * are skipped so only official headline rates surface (spec 12 item 11).
 */
export function headlineRates(g: ApiGateway, max = 3): string {
  const parts: string[] = [];
  for (const [key, label] of HEADLINE_CHANNELS) {
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
      name: page.def.h1,
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

const bool = (v: boolean | null | undefined) => (v == null ? "—" : v ? "Yes" : "No");
const mcpLabel = (v: string) => (v === "official" ? "Official" : v === "community" ? "Community" : "—");
const estFee = (g: ApiGateway) =>
  g.rankable && g.est_fee_rm100 != null ? `~${fmtRM(g.est_fee_rm100)}` : "On request";
const channelNames = (list: string[]) =>
  list.map((c) => CHANNEL_LABEL[c as Channel] ?? c).join(", ");

function verdictsFor(a: ApiGateway, b: ApiGateway): string[] {
  const v: string[] = [];

  if (a.rankable && b.rankable && a.est_fee_rm100 != null && b.est_fee_rm100 != null) {
    if (a.est_fee_rm100 === b.est_fee_rm100) {
      v.push(`Both estimate to about ${fmtRM(a.est_fee_rm100)} per RM100 on our blended basket of published rates.`);
    } else {
      const [cheap, dear] = a.est_fee_rm100 < b.est_fee_rm100 ? [a, b] : [b, a];
      v.push(
        `${cheap.name} is cheaper on our blended RM100 estimate (${fmtRM(cheap.est_fee_rm100!)} vs ${fmtRM(dear.est_fee_rm100!)}), using officially published rates.`,
      );
    }
  } else if (a.rankable !== b.rankable) {
    const [pub, quote] = a.rankable ? [a, b] : [b, a];
    v.push(
      `${pub.name} publishes comparable official rates (about ${fmtRM(pub.est_fee_rm100!)} per RM100); ${quote.name} does not publish enough official rates for a like-for-like estimate, so confirm their full pricing with sales.`,
    );
  } else {
    v.push("Neither publishes comparable official rates; both quote on request.");
  }

  const extraA = a.channels.filter((c) => !b.channels.includes(c));
  const extraB = b.channels.filter((c) => !a.channels.includes(c));
  if (extraA.length) v.push(`${a.name} also supports ${channelNames(extraA)}, which ${b.name} does not list.`);
  if (extraB.length) v.push(`${b.name} also supports ${channelNames(extraB)}, which ${a.name} does not list.`);

  if (a.features.no_code !== b.features.no_code)
    v.push(`${(a.features.no_code ? a : b).name} offers no-code payment links; the other side needs a developer.`);
  if (a.features.recurring !== b.features.recurring)
    v.push(`${(a.features.recurring ? a : b).name} supports recurring / subscription billing; the other does not.`);
  if ((a.mcp === "official") !== (b.mcp === "official"))
    v.push(`${(a.mcp === "official" ? a : b).name} runs an official MCP server, so AI agents can integrate it directly.`);

  return v;
}

export function buildVsPage(pair: VsPair): VsPage {
  const { a, b } = pair;
  const fee = (g: ApiGateway, key: string) => g.fees[key] ?? "—";

  const feeRows: VsRow[] = [
    { label: "Est. fee / RM100", a: estFee(a), b: estFee(b) },
    { label: "FPX", a: fee(a, "fpx"), b: fee(b, "fpx") },
    { label: "Cards (local)", a: fee(a, "card"), b: fee(b, "card") },
    { label: "Cards (international)", a: fee(a, "card_intl"), b: fee(b, "card_intl") },
    { label: "E-wallets", a: fee(a, "ewallet"), b: fee(b, "ewallet") },
    { label: "DuitNow QR", a: fee(a, "duitnowqr"), b: fee(b, "duitnowqr") },
    { label: "BNPL", a: fee(a, "bnpl"), b: fee(b, "bnpl") },
    { label: "Setup fee", a: fee(a, "setup"), b: fee(b, "setup") },
    { label: "Monthly fee", a: fee(a, "monthly"), b: fee(b, "monthly") },
    { label: "Settlement", a: a.settlement, b: b.settlement },
  ];

  const featureRows: VsRow[] = [
    { label: "Access", a: a.access.short, b: b.access.short },
    { label: "Channels", a: channelNames(a.channels), b: channelNames(b.channels) },
    { label: "No-code payment links", a: bool(a.features.no_code), b: bool(b.features.no_code) },
    { label: "Developer API", a: bool(a.features.api), b: bool(b.features.api) },
    { label: "Recurring billing", a: bool(a.features.recurring), b: bool(b.features.recurring) },
    { label: "Webhooks", a: bool(a.webhooks), b: bool(b.webhooks) },
    { label: "MCP (AI agents)", a: mcpLabel(a.mcp), b: mcpLabel(b.mcp) },
    { label: "Plugins", a: a.plugins.length ? a.plugins.join(", ") : "—", b: b.plugins.length ? b.plugins.join(", ") : "—" },
  ];

  // brand base names keep titles inside the ~60-char SERP window; notes like
  // "(formerly Razer Merchant Services)" stay in the page body only
  const baseA = splitName(a.name).base;
  const baseB = splitName(b.name).base;
  return {
    pair,
    title: `${baseA} vs ${baseB}: fees compared | MPG`,
    description: `${baseA} vs ${baseB} for Malaysian merchants: published FPX, card and e-wallet fees, settlement, no-code and developer features, side by side.`,
    verdicts: verdictsFor(a, b),
    feeRows,
    featureRows,
  };
}
