// Blog registry (spec 15): topic clusters (pillar pages) + the author entity.
// Pillar pages are literal routes under src/pages/blog/ so they win over the
// dynamic [slug] post route; a cluster goes `live` only when its pillar page
// file ships, so the footer never links a 404.
import type { Locale } from "../i18n/locale";

export interface BlogCluster {
  slug: string;
  name: string; // short label (footer, chips)
  nameMs: string; // the same label in Bahasa Malaysia
  title: string; // pillar <title>, SERP window 30-65 (test-enforced)
  description: string; // pillar meta description, SERP window 110-160 (test-enforced)
  blurb: string; // one-liner shown on the blog hub
  titleMs: string; // the same three in Bahasa Malaysia (same SERP windows)
  descriptionMs: string;
  blurbMs: string;
  live: boolean; // pillar page exists at /blog/<slug>/
}

export const CLUSTERS: BlogCluster[] = [
  {
    slug: "fees-pricing",
    name: "Fees & pricing",
    nameMs: "Fee & harga",
    title: "Payment gateway fees in Malaysia: pricing guides | MPG",
    description:
      "How Malaysian payment gateway pricing really works: per-provider fee breakdowns for FPX, cards, e-wallets and DuitNow QR, verified from official rate cards.",
    blurb: "Per-provider fee breakdowns and how gateway pricing works.",
    titleMs: "Fee payment gateway di Malaysia: panduan harga | MPG",
    descriptionMs:
      "Bagaimana harga payment gateway Malaysia sebenarnya dikira: pecahan fee setiap gateway untuk FPX, kad, e-wallet dan DuitNow QR, disemak dari kadar rasmi.",
    blurbMs: "Pecahan fee setiap gateway, dan cara harganya dikira.",
    live: true,
  },
  {
    slug: "recurring-payments",
    name: "Recurring payments",
    nameMs: "Bayaran berulang",
    title: "Recurring payments in Malaysia: guides | MPG",
    description:
      "Subscription and recurring billing in Malaysia explained: which gateways support card-on-file charging, what it costs, and how auto-debit works.",
    blurb: "Subscription billing and auto-charging in Malaysia.",
    titleMs: "Bayaran berulang di Malaysia: panduan | MPG",
    descriptionMs:
      "Langganan dan caj berulang automatik di Malaysia: gateway mana boleh caj kad yang disimpan, berapa kosnya, dan cara auto-debit berfungsi.",
    blurbMs: "Langganan dan caj automatik setiap bulan di Malaysia.",
    live: true,
  },
  {
    slug: "fpx-duitnow",
    name: "FPX & DuitNow",
    nameMs: "FPX & DuitNow",
    title: "FPX and DuitNow QR guides for merchants | MPG",
    description:
      "Malaysia's national payment rails explained for merchants: how FPX online banking and DuitNow QR work, what they cost, and how to accept them.",
    blurb: "Malaysia's national payment rails, explained for merchants.",
    titleMs: "Panduan FPX dan DuitNow QR untuk peniaga | MPG",
    descriptionMs:
      "Sistem bayaran negara Malaysia, diterangkan untuk peniaga: cara FPX (bayar terus dari akaun bank online) dan DuitNow QR berfungsi, kosnya, dan cara terimanya.",
    blurbMs: "Sistem bayaran negara Malaysia, diterangkan untuk peniaga.",
    live: false,
  },
  {
    slug: "ewallet-bnpl",
    name: "E-wallets & BNPL",
    nameMs: "E-wallet & BNPL",
    title: "E-wallet and BNPL merchant guides Malaysia | MPG",
    description:
      "Accepting Touch 'n Go eWallet, GrabPay, ShopeePay and BNPL in Malaysia: merchant rates, settlement times and which gateways support each wallet.",
    blurb: "Wallet and buy-now-pay-later acceptance costs.",
    titleMs: "Panduan e-wallet dan BNPL untuk peniaga Malaysia | MPG",
    descriptionMs:
      "Terima Touch 'n Go eWallet, GrabPay, ShopeePay dan BNPL di Malaysia: kadar untuk peniaga, tempoh duit masuk dan gateway mana sokong setiap wallet.",
    blurbMs: "Kos untuk terima bayaran e-wallet dan BNPL (beli dulu, bayar kemudian).",
    live: false,
  },
];

export function clusterBySlug(slug: string): BlogCluster | undefined {
  return CLUSTERS.find((c) => c.slug === slug);
}

/** a cluster's reader-facing text in the page language */
export function clusterText(c: BlogCluster, locale: Locale) {
  return locale === "ms"
    ? { name: c.nameMs, title: c.titleMs, description: c.descriptionMs, blurb: c.blurbMs }
    : { name: c.name, title: c.title, description: c.description, blurb: c.blurb };
}

export function blogPath(slug: string): string {
  return `/blog/${slug}/`;
}

// Author entity (EEAT interview with the owner, 2026-07-17): honest claims only.
// He built the open-source gateway agent-skills repo and verifies directory data
// against official sources; MPG makes no production-integration claims.
export const AUTHOR = {
  name: "Afu",
  role: "Developer & founder of MPG",
  roleMs: "Developer & pengasas MPG",
  bio:
    "Afu is the developer and founder of MPG. He maintains the open-source Malaysia payment gateway agent-skills repo on GitHub and verifies every fee in this directory against official provider pages before it is published.",
  bioMs:
    "Afu ialah developer dan pengasas MPG. Dia jaga repo sumber terbuka agent-skills untuk payment gateway Malaysia di GitHub, dan semak setiap fee dalam direktori ini dengan laman rasmi gateway sebelum ia disiarkan.",
  sameAs: [
    "https://github.com/afu-it",
    "https://www.threads.com/@afwzn",
  ],
} as const;

export function authorLd(site: string, locale: Locale = "en"): object {
  const base = site.replace(/\/$/, "");
  return {
    "@type": "Person",
    "@id": `${base}/#author-afu`,
    name: AUTHOR.name,
    jobTitle: locale === "ms" ? AUTHOR.roleMs : AUTHOR.role,
    description: locale === "ms" ? AUTHOR.bioMs : AUTHOR.bio,
    sameAs: [...AUTHOR.sameAs],
    worksFor: { "@id": `${base}/#organization` },
  };
}

export function articleLd(
  site: string,
  path: string,
  headline: string,
  description: string,
  pubDate: string,
  updatedDate?: string,
  image?: { url: string; alt?: string },
  locale: Locale = "en",
): object {
  const base = site.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${base}${path}`,
    mainEntityOfPage: `${base}${path}`,
    inLanguage: locale === "ms" ? "ms" : "en",
    datePublished: pubDate,
    dateModified: updatedDate ?? pubDate,
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: `${base}${image.url}`,
            width: 1200,
            height: 630,
            ...(image.alt ? { caption: image.alt } : {}),
          },
        }
      : {}),
    author: authorLd(site, locale),
    publisher: { "@id": `${base}/#organization` },
  };
}
