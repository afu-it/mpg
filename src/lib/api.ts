// Maps the gateway content collection into a stable, machine-readable shape for
// the static JSON API (dist/api/*.json). Reuses the same effective-cost ranking
// and access model as the site so the API never drifts from the UI.
import { gatewayCost, REF_TICKET } from "./fees";
import { accessInfo } from "./access";

interface GatewayData {
  name: string;
  category: string;
  website: string;
  tagline: string;
  fees: Record<string, string | undefined>;
  settlement: string;
  min_txn: string;
  channels: string[];
  features: { no_code: boolean; api: boolean; recurring: boolean };
  methods?: string[];
  banks?: string[];
  mcp: string;
  webhooks?: boolean;
  plugins?: string[];
  dev_docs?: string;
  skill?: string;
  popularity: number;
  verified_date: string;
  source: string;
}

export interface GatewayEntryLike {
  id: string;
  data: GatewayData;
}

export interface ApiGateway {
  slug: string;
  name: string;
  category: string;
  website: string;
  tagline: string;
  access: { key: string; short: string };
  fees: Record<string, string | undefined>;
  /** blended effective cost on a RM100 transaction; null when not comparably published */
  est_fee_rm100: number | null;
  rankable: boolean;
  settlement: string;
  min_txn: string;
  channels: string[];
  features: { no_code: boolean; api: boolean; recurring: boolean };
  methods: string[];
  banks: string[];
  mcp: string;
  webhooks: boolean | null;
  plugins: string[];
  dev_docs: string | null;
  skill: string | null;
  popularity: number;
  verified_date: string;
  source: string;
}

export function toApiGateway(entry: GatewayEntryLike): ApiGateway {
  const d = entry.data;
  const { rankable, cost } = gatewayCost(d.fees, REF_TICKET);
  const access = accessInfo(d.category);
  return {
    slug: entry.id,
    name: d.name,
    category: d.category,
    website: d.website,
    tagline: d.tagline,
    access: { key: access.key, short: access.short },
    fees: d.fees,
    est_fee_rm100: rankable ? Number(cost.toFixed(2)) : null,
    rankable,
    settlement: d.settlement,
    min_txn: d.min_txn,
    channels: d.channels,
    features: d.features,
    methods: d.methods ?? [],
    banks: d.banks ?? [],
    mcp: d.mcp,
    webhooks: d.webhooks ?? null,
    plugins: d.plugins ?? [],
    dev_docs: d.dev_docs ?? null,
    skill: d.skill ?? null,
    popularity: d.popularity,
    verified_date: d.verified_date,
    source: d.source,
  };
}

export interface ApiPayload {
  schema: string;
  generated_at: string;
  count: number;
  disclaimer: string;
  weighting: { note: string; fpx: number; card: number; ewallet: number };
  gateways: ApiGateway[];
}

export function buildApiPayload(entries: GatewayEntryLike[], generatedAt: string): ApiPayload {
  const gateways = entries.map(toApiGateway).sort((a, b) => {
    if (a.rankable !== b.rankable) return a.rankable ? -1 : 1;
    if (a.rankable && b.rankable && a.est_fee_rm100! !== b.est_fee_rm100!)
      return a.est_fee_rm100! - b.est_fee_rm100!;
    if (b.popularity !== a.popularity) return b.popularity - a.popularity;
    return a.name.localeCompare(b.name);
  });
  return {
    schema: "mpg.gateways/v1",
    generated_at: generatedAt,
    count: gateways.length,
    disclaimer:
      "Fees are indicative and may change; values shown with a trailing '*' are third-party/indicative, not officially published. Always confirm with the provider, and check verified_date and source on each gateway.",
    weighting: {
      note: "est_fee_rm100 = blended effective cost on a RM100 transaction (null when no comparable published rates)",
      fpx: 0.5,
      card: 0.3,
      ewallet: 0.2,
    },
    gateways,
  };
}
