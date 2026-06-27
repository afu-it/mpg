import { describe, it, expect } from "vitest";
import {
  parseFeeShape,
  effectiveCost,
  effectiveCostAt,
  gatewayCost,
} from "./fees";

// parseFeeShape turns a human fee string into structured components:
//   { pct, fixed, floor, known, indicative }
// so cost can be computed correctly instead of averaging RM and % together.
describe("parseFeeShape", () => {
  it("parses a flat ringgit fee as a fixed amount, not a percentage", () => {
    expect(parseFeeShape("RM1.00")).toMatchObject({ pct: 0, fixed: 1, floor: 0, known: true });
  });

  it("parses a percentage fee", () => {
    expect(parseFeeShape("2.0%")).toMatchObject({ pct: 2, fixed: 0, floor: 0, known: true });
  });

  it("keeps the additive '+ RMx' fixed component (not dropped)", () => {
    expect(parseFeeShape("1.2% + RM1.00")).toMatchObject({ pct: 1.2, fixed: 1, floor: 0 });
  });

  it("parses 'RMx + y%' (fixed plus percent)", () => {
    expect(parseFeeShape("RM1.00 + 1%")).toMatchObject({ pct: 1, fixed: 1, floor: 0 });
  });

  it("treats 'X% / RMy' as whichever-greater (RM is a floor, not additive)", () => {
    expect(parseFeeShape("1.5% / RM1.00")).toMatchObject({ pct: 1.5, fixed: 0, floor: 1 });
  });

  it("treats 'X% or RMy (Basic)' as a floor", () => {
    expect(parseFeeShape("2.00% or RM1.50 (Basic)")).toMatchObject({ pct: 2, floor: 1.5 });
  });

  it("reads 'min RMy' as a floor", () => {
    expect(parseFeeShape("From 1.80% (min RM0.60)")).toMatchObject({ pct: 1.8, floor: 0.6 });
  });

  it("uses the midpoint of a percentage range", () => {
    expect(parseFeeShape("1.6%–2.4%")).toMatchObject({ pct: 2, known: true });
  });

  it("flags a trailing * as indicative", () => {
    expect(parseFeeShape("from 0.8% *")).toMatchObject({ pct: 0.8, indicative: true, known: true });
  });

  it("takes the B2C/first amount for tiered flat fees", () => {
    expect(parseFeeShape("RM1.20 (B2C) / RM2.20 (B2B)")).toMatchObject({ fixed: 1.2, pct: 0 });
  });

  it("takes the first rate when credit/debit alternatives are given (not a floor)", () => {
    expect(parseFeeShape("1.5% credit / 1.0% debit (local)")).toMatchObject({ pct: 1.5, floor: 0 });
  });

  it("marks 'Contact sales' as not known", () => {
    expect(parseFeeShape("Contact sales").known).toBe(false);
  });

  it("marks em dash as not known", () => {
    expect(parseFeeShape("—").known).toBe(false);
  });

  it("marks empty string as not known", () => {
    expect(parseFeeShape("").known).toBe(false);
  });
});

// effectiveCost(shape, ticket): real ringgit cost for a transaction of `ticket` size.
//   cost = max(ticket*pct/100, floor) + fixed
describe("effectiveCost", () => {
  it("a flat RM1 fee costs RM1 regardless of ticket", () => {
    expect(effectiveCost(parseFeeShape("RM1.00"), 100)).toBeCloseTo(1);
    expect(effectiveCost(parseFeeShape("RM1.00"), 50)).toBeCloseTo(1);
  });

  it("a 2% fee scales with the ticket", () => {
    expect(effectiveCost(parseFeeShape("2.0%"), 100)).toBeCloseTo(2);
    expect(effectiveCost(parseFeeShape("2.0%"), 50)).toBeCloseTo(1);
  });

  it("counts the dropped add-on: HitPay '1.2% + RM1.00' is RM2.20 on RM100", () => {
    expect(effectiveCost(parseFeeShape("1.2% + RM1.00"), 100)).toBeCloseTo(2.2);
  });

  it("counts Stripe '3% + RM1.00' as RM4.00 on RM100", () => {
    expect(effectiveCost(parseFeeShape("3% + RM1.00"), 100)).toBeCloseTo(4);
  });

  it("applies a whichever-greater floor on small tickets", () => {
    // 1.5% of RM50 = RM0.75, floor RM1.00 wins
    expect(effectiveCost(parseFeeShape("1.5% / RM1.00"), 50)).toBeCloseTo(1);
    // 1.5% of RM100 = RM1.50 beats the floor
    expect(effectiveCost(parseFeeShape("1.5% / RM1.00"), 100)).toBeCloseTo(1.5);
  });

  it("returns Infinity for unknown fees", () => {
    expect(effectiveCost(parseFeeShape("Contact sales"), 100)).toBe(Infinity);
  });

  it("effectiveCostAt parses + computes in one call", () => {
    expect(effectiveCostAt("2%", 100)).toBeCloseTo(2);
    expect(effectiveCostAt("—", 100)).toBe(Infinity);
  });
});

// gatewayCost: blended, weighted (FPX .5 / card .3 / e-wallet .2) RM cost on RM100,
// with eligibility gating so single-channel / indicative-only gateways are NOT ranked.
describe("gatewayCost", () => {
  it("ranks a fully-published gateway (CHIP) by blended RM100 cost", () => {
    const r = gatewayCost({ fpx: "RM1.00", card: "2%", ewallet: "1.40%" });
    expect(r.rankable).toBe(true);
    // (1.0*.5 + 2.0*.3 + 1.4*.2) = 1.38
    expect(r.cost).toBeCloseTo(1.38);
  });

  it("ranks Stripe as expensive once add-ons count (not dead last by transparency)", () => {
    const r = gatewayCost({ fpx: "3% + RM1.00", card: "3% + RM1.00", ewallet: "3%" });
    expect(r.rankable).toBe(true);
    // (4.0*.5 + 4.0*.3 + 3.0*.2) = 3.8
    expect(r.cost).toBeCloseTo(3.8);
  });

  it("does NOT rank a single-channel gateway (TNG: e-wallet only)", () => {
    const r = gatewayCost({ fpx: "—", card: "—", ewallet: "0.5%" });
    expect(r.rankable).toBe(false);
    expect(r.cost).toBe(Infinity);
  });

  it("does NOT rank a gateway whose only number is indicative (Revenue Monster)", () => {
    const r = gatewayCost({ fpx: "Contact sales", card: "Contact sales", ewallet: "from 0.8% *" });
    expect(r.rankable).toBe(false);
  });

  it("does NOT rank an all-indicative gateway (eGHL)", () => {
    const r = gatewayCost({ fpx: "1.6%–2.4% *", card: "1.4%–2.4% *", ewallet: "1.2%–1.5% *" });
    expect(r.rankable).toBe(false);
  });

  it("does NOT rank a card-only bank (CIMB)", () => {
    const r = gatewayCost({ fpx: "Contact sales", card: "1.50%-1.80%", ewallet: "Contact sales" });
    expect(r.rankable).toBe(false);
  });

  it("ranks an FPX + card gateway even without e-wallet (Bayarcash)", () => {
    const r = gatewayCost({ fpx: "RM1.00", card: "RM1.00 + 1%", ewallet: "—" });
    expect(r.rankable).toBe(true);
    // fpx RM1.00 -> 1.0 ; card 'RM1.00 + 1%' on RM100 -> 1.0 + 1.0 = 2.0
    // weights present renormalised: (1.0*.5 + 2.0*.3)/(.8) = 1.1/.8 = 1.375
    expect(r.cost).toBeCloseTo(1.375);
  });
});
