import { describe, it, expect } from "vitest";
import { I18N_PAIRS, pairFor } from "./i18n-pages";

describe("I18N_PAIRS", () => {
  it("paths are unique, trailing-slashed, and ms pages live under /ms/", () => {
    const all = I18N_PAIRS.flatMap((p) => [p.en, p.ms]);
    expect(new Set(all).size).toBe(all.length);
    for (const p of I18N_PAIRS) {
      expect(p.en).toMatch(/\/$/);
      expect(p.ms).toMatch(/^\/ms\/.*\/$|^\/ms\/$/);
    }
  });

  it("pairFor resolves from either side and misses cleanly", () => {
    expect(pairFor("/ms/payment-gateway-murah/")?.en).toBe("/best/cheapest-payment-gateway-malaysia/");
    expect(pairFor("/best/cheapest-payment-gateway-malaysia/")?.ms).toBe("/ms/payment-gateway-murah/");
    expect(pairFor("/gateways/")).toBeNull();
  });
});
