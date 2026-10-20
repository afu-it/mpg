// Blog registry (spec 15): topic clusters (pillar pages) + the author entity.
// Pillar pages are literal routes under src/pages/blog/ so they win over the
// dynamic [slug] post route; a cluster goes `live` only when its pillar page
// file ships, so the footer never links a 404.

export interface BlogCluster {
  slug: string;
  name: string; // short label (footer, chips)
  title: string; // pillar <title>, SERP window 30-65 (test-enforced)
  description: string; // pillar meta description, SERP window 110-160 (test-enforced)
  blurb: string; // one-liner shown on the blog hub
  live: boolean; // pillar page exists at /blog/<slug>/
}

export const CLUSTERS: BlogCluster[] = [
  {
    slug: "fees-pricing",
    name: "Fees & pricing",
    title: "Payment gateway fees in Malaysia: pricing guides | MPG",
    description:
      "How Malaysian payment gateway pricing really works: per-provider fee breakdowns for FPX, cards, e-wallets and DuitNow QR, verified from official rate cards.",
    blurb: "Per-provider fee breakdowns and how gateway pricing works.",
    live: true,
  },
  {
    slug: "recurring-payments",
    name: "Recurring payments",
    title: "Recurring payments in Malaysia: guides | MPG",
    description:
      "Subscription and recurring billing in Malaysia explained: which gateways support card-on-file charging, what it costs, and how auto-debit works.",
    blurb: "Subscription billing and auto-charging in Malaysia.",
    live: true,
  },
  {
    slug: "fpx-duitnow",
    name: "FPX & DuitNow",
    title: "FPX and DuitNow QR guides for merchants | MPG",
    description:
      "Malaysia's national payment rails explained for merchants: how FPX online banking and DuitNow QR work, what they cost, and how to accept them.",
    blurb: "Malaysia's national payment rails, explained for merchants.",
    live: false,
  },
  {
    slug: "ewallet-bnpl",
    name: "E-wallets & BNPL",
    title: "E-wallet and BNPL merchant guides Malaysia | MPG",
    description:
      "Accepting Touch 'n Go eWallet, GrabPay, ShopeePay and BNPL in Malaysia: merchant rates, settlement times and which gateways support each wallet.",
    blurb: "Wallet and buy-now-pay-later acceptance costs.",
    live: false,
  },
];

export function clusterBySlug(slug: string): BlogCluster | undefined {
  return CLUSTERS.find((c) => c.slug === slug);
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
  bio:
    "Afu is the developer and founder of MPG. He maintains the open-source Malaysia payment gateway agent-skills repo on GitHub and verifies every fee in this directory against official provider pages before it is published.",
  sameAs: [
    "https://github.com/afu-it",
    "https://www.threads.com/@afwzn",
  ],
} as const;

export function authorLd(site: string): object {
  const base = site.replace(/\/$/, "");
  return {
    "@type": "Person",
    "@id": `${base}/#author-afu`,
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    description: AUTHOR.bio,
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
): object {
  const base = site.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${base}${path}`,
    mainEntityOfPage: `${base}${path}`,
    inLanguage: "en",
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
    author: authorLd(site),
    publisher: { "@id": `${base}/#organization` },
  };
}
