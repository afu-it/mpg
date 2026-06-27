import { describe, it, expect } from "vitest";
import { recommend, recommendOrClosest, type Needs } from "./recommend";
import type { ApiGateway } from "./api";

// minimal ApiGateway fixture factory (only fields recommend() reads)
function gw(p: Partial<ApiGateway> & { slug: string }): ApiGateway {
  return {
    slug: p.slug,
    name: p.name ?? p.slug,
    category: p.category ?? "gateway",
    website: "https://x",
    tagline: "",
    access: { key: "integrate", short: "Integrate" },
    fees: {},
    settlement: "T+1",
    min_txn: "—",
    est_fee_rm100: p.est_fee_rm100 ?? null,
    rankable: p.rankable ?? (p.est_fee_rm100 != null),
    channels: p.channels ?? [],
    features: p.features ?? { no_code: false, api: false, recurring: false },
    methods: [],
    banks: [],
    mcp: "none",
    webhooks: null,
    plugins: [],
    dev_docs: null,
    skill: null,
    popularity: p.popularity ?? 0,
    verified_date: "2026-06-27",
    source: "https://x",
  };
}

const chip = gw({ slug: "chip", channels: ["fpx", "card", "ewallet"], est_fee_rm100: 1.38, features: { no_code: true, api: true, recurring: true } });
const billplz = gw({ slug: "billplz", channels: ["fpx", "card", "ewallet"], est_fee_rm100: 1.47, features: { no_code: true, api: true, recurring: true } });
const ipay88 = gw({ slug: "ipay88", channels: ["fpx", "card"], est_fee_rm100: null, popularity: 100, features: { no_code: true, api: true, recurring: true } });
const cimb = gw({ slug: "cimb", category: "bank", channels: ["card"], est_fee_rm100: null, popularity: 52 });
const atome = gw({ slug: "atome", category: "bnpl", channels: ["bnpl"], est_fee_rm100: null, popularity: 75 });
const paynet = gw({ slug: "paynet", category: "infrastructure", channels: [] });
const all = [chip, billplz, ipay88, cimb, atome, paynet];

describe("recommend", () => {
  it("matches only gateways that support ALL requested channels", () => {
    const r = recommend(all, { channels: ["fpx", "card"] });
    const slugs = r.map((m) => m.gateway.slug);
    expect(slugs).toContain("chip");
    expect(slugs).toContain("billplz");
    expect(slugs).not.toContain("cimb"); // no fpx
    expect(slugs).not.toContain("atome");
  });

  it("ranks rankable gateways by est_fee, then non-rankable by popularity", () => {
    const r = recommend(all, { channels: ["fpx", "card"] });
    expect(r.map((m) => m.gateway.slug)).toEqual(["chip", "billplz", "ipay88"]);
  });

  it("filters by recurring / no-code / developer", () => {
    expect(recommend([chip, cimb], { recurring: true }).map((m) => m.gateway.slug)).toEqual(["chip"]);
    expect(recommend([chip, cimb], { developer: true }).map((m) => m.gateway.slug)).toEqual(["chip"]);
  });

  it("maps access: integrate→gateway, account→bank/ewallet, bnpl→bnpl", () => {
    expect(recommend(all, { access: "integrate" }).every((m) => m.gateway.category === "gateway")).toBe(true);
    expect(recommend(all, { access: "account" }).map((m) => m.gateway.slug)).toEqual(["cimb"]);
    expect(recommend(all, { access: "bnpl" }).map((m) => m.gateway.slug)).toEqual(["atome"]);
  });

  it("never returns infrastructure", () => {
    expect(recommend(all, {}).some((m) => m.gateway.slug === "paynet")).toBe(false);
  });

  it("builds human reasons from the satisfied needs", () => {
    const m = recommend(all, { channels: ["fpx", "card"], recurring: true })[0];
    expect(m.reasons).toContain("Supports FPX, cards");
    expect(m.reasons).toContain("Recurring billing");
  });
});

describe("recommendOrClosest", () => {
  it("returns strict matches with no relaxation when matches exist", () => {
    const out = recommendOrClosest(all, { channels: ["fpx"] });
    expect(out.relaxed).toEqual([]);
    expect(out.matches.length).toBeGreaterThan(0);
  });

  it("relaxes the access filter first when nothing matches", () => {
    // bank + needs e-wallet channel → no bank has ewallet here, so access gets relaxed
    const out = recommendOrClosest(all, { access: "account", channels: ["fpx"] });
    expect(out.relaxed).toContain("access type");
    expect(out.matches.length).toBeGreaterThan(0);
  });
});
