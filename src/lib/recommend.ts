// Pure recommendation engine: filter gateways by a merchant's needs, then rank by the
// same effective cost the rest of the site uses. No DOM. Reused by /choose and (later)
// the programmatic SEO pages.
import type { ApiGateway } from "./api";

export type Channel = "fpx" | "card" | "ewallet" | "duitnowqr" | "bnpl";

export interface Needs {
  channels?: Channel[]; // gateway must support ALL of these
  recurring?: boolean;
  noCode?: boolean;
  developer?: boolean;
  access?: "integrate" | "account" | "bnpl";
}

export interface Match {
  gateway: ApiGateway;
  reasons: string[];
}

const CHANNEL_LABEL: Record<Channel, string> = {
  fpx: "FPX",
  card: "cards",
  ewallet: "e-wallets",
  duitnowqr: "DuitNow QR",
  bnpl: "BNPL",
};

function accessMatches(g: ApiGateway, access: NonNullable<Needs["access"]>): boolean {
  if (access === "integrate") return g.category === "gateway";
  if (access === "account") return g.category === "bank" || g.category === "ewallet";
  return g.category === "bnpl";
}

function matchesNeeds(g: ApiGateway, n: Needs): boolean {
  if (g.category === "infrastructure") return false;
  if (n.channels) for (const c of n.channels) if (!g.channels.includes(c)) return false;
  if (n.recurring && !g.features.recurring) return false;
  if (n.noCode && !g.features.no_code) return false;
  if (n.developer && !g.features.api) return false;
  if (n.access && !accessMatches(g, n.access)) return false;
  return true;
}

function reasonsFor(g: ApiGateway, n: Needs): string[] {
  const r: string[] = [];
  if (n.channels && n.channels.length)
    r.push("Supports " + n.channels.map((c) => CHANNEL_LABEL[c]).join(", "));
  if (n.recurring) r.push("Recurring billing");
  if (n.noCode) r.push("No-code (payment links)");
  if (n.developer) r.push("Developer API");
  if (n.access === "integrate") r.push("Integrate yourself");
  if (n.access === "account") r.push("Merchant account");
  if (n.access === "bnpl") r.push("BNPL at checkout");
  return r;
}

function rank(a: ApiGateway, b: ApiGateway): number {
  if (a.rankable !== b.rankable) return a.rankable ? -1 : 1;
  if (a.rankable && b.rankable)
    return (a.est_fee_rm100 ?? Infinity) - (b.est_fee_rm100 ?? Infinity);
  return b.popularity - a.popularity;
}

export function recommend(gateways: ApiGateway[], needs: Needs, limit = 5): Match[] {
  return gateways
    .filter((g) => matchesNeeds(g, needs))
    .sort(rank)
    .slice(0, limit)
    .map((g) => ({ gateway: g, reasons: reasonsFor(g, needs) }));
}

// If nothing matches, drop constraints in priority order until something does,
// reporting which constraints were relaxed.
export function recommendOrClosest(
  gateways: ApiGateway[],
  needs: Needs,
  limit = 5,
): { matches: Match[]; relaxed: string[] } {
  let matches = recommend(gateways, needs, limit);
  if (matches.length) return { matches, relaxed: [] };

  const relaxed: string[] = [];
  const n: Needs = { ...needs, channels: needs.channels ? [...needs.channels] : undefined };
  const retry = (label: string) => {
    relaxed.push(label);
    matches = recommend(gateways, n, limit);
    return matches.length > 0;
  };

  if (n.access) { delete n.access; if (retry("access type")) return { matches, relaxed }; }
  if (n.developer || n.noCode) { delete n.developer; delete n.noCode; if (retry("integration style")) return { matches, relaxed }; }
  if (n.recurring) { delete n.recurring; if (retry("recurring")) return { matches, relaxed }; }
  while (n.channels && n.channels.length) {
    const dropped = n.channels[n.channels.length - 1];
    n.channels = n.channels.slice(0, -1);
    if (!n.channels.length) delete n.channels;
    if (retry(`${CHANNEL_LABEL[dropped]} channel`)) return { matches, relaxed };
  }
  return { matches: recommend(gateways, {}, limit), relaxed: ["all filters"] };
}
