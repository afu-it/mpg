import { describe, it, expect } from "vitest";
import { toApiGateway, buildApiPayload } from "./api";

// minimal content-entry-like fixtures (only the fields the mapper reads)
const chip = {
  id: "chip",
  data: {
    name: "CHIP",
    category: "gateway",
    website: "https://www.chip-in.asia",
    tagline: "Pay-per-use gateway",
    fees: { fpx: "RM1.00", card: "2%", ewallet: "1.40%", duitnowqr: "—", setup: "RM0", monthly: "RM0" },
    settlement: "T+2",
    min_txn: "—",
    channels: ["fpx", "card", "ewallet"],
    features: { no_code: true, api: true, recurring: true },
    mcp: "official",
    webhooks: true,
    plugins: ["WooCommerce"],
    dev_docs: "https://docs.chip-in.asia/",
    skill: "setup-chip",
    popularity: 78,
    verified_date: "2026-06-24",
    source: "https://www.chip-in.asia/collect",
  },
};

const tng = {
  id: "tng-ewallet",
  data: {
    name: "Touch 'n Go eWallet",
    category: "ewallet",
    website: "https://x",
    tagline: "wallet",
    fees: { fpx: "—", card: "—", ewallet: "0.5%", duitnowqr: "—", setup: "RM0", monthly: "RM0" },
    settlement: "Contact sales",
    min_txn: "—",
    channels: ["ewallet"],
    features: { no_code: true, api: false, recurring: false },
    mcp: "none",
    popularity: 70,
    verified_date: "2026-06-26",
    source: "https://x",
  },
};

describe("toApiGateway", () => {
  it("maps core fields and computes the effective fee + access", () => {
    const g = toApiGateway(chip);
    expect(g.slug).toBe("chip");
    expect(g.name).toBe("CHIP");
    expect(g.category).toBe("gateway");
    expect(g.est_fee_rm100).toBe(1.38);
    expect(g.rankable).toBe(true);
    expect(g.access).toMatchObject({ key: "integrate", short: "Integrate" });
    expect(g.mcp).toBe("official");
    expect(g.skill).toBe("setup-chip");
    expect(g.verified_date).toBe("2026-06-24");
    expect(g.source).toBe("https://www.chip-in.asia/collect");
  });

  it("passes the raw fee strings through unchanged (sourcing discipline)", () => {
    const g = toApiGateway(chip);
    expect(g.fees.fpx).toBe("RM1.00");
    expect(g.fees.card).toBe("2%");
  });

  it("returns null est_fee + rankable false for an un-rankable gateway", () => {
    const g = toApiGateway(tng);
    expect(g.rankable).toBe(false);
    expect(g.est_fee_rm100).toBeNull();
    expect(g.access).toMatchObject({ key: "account", short: "Merchant account" });
  });

  it("defaults optional list fields to empty arrays / null", () => {
    const g = toApiGateway(tng);
    expect(g.plugins).toEqual([]);
    expect(g.webhooks).toBeNull();
    expect(g.skill).toBeNull();
  });
});

describe("buildApiPayload", () => {
  it("wraps gateways with schema, count, disclaimer and weighting", () => {
    const p = buildApiPayload([chip, tng], "2026-06-27");
    expect(p.schema).toBe("mpg.gateways/v1");
    expect(p.generated_at).toBe("2026-06-27");
    expect(p.count).toBe(2);
    expect(typeof p.disclaimer).toBe("string");
    expect(p.weighting).toMatchObject({ fpx: 0.5, card: 0.3, ewallet: 0.2 });
    expect(p.gateways).toHaveLength(2);
  });

  it("orders rankable gateways (by cost) before un-rankable ones", () => {
    const p = buildApiPayload([tng, chip], "2026-06-27");
    expect(p.gateways[0].slug).toBe("chip"); // rankable first, despite input order
    expect(p.gateways[1].slug).toBe("tng-ewallet");
  });
});
