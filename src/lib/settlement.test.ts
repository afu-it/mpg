import { describe, it, expect } from "vitest";
import { parseSettlementDays } from "./settlement";

describe("parseSettlementDays", () => {
  it("parses plain T+n", () => {
    expect(parseSettlementDays("T+1")).toBe(1);
    expect(parseSettlementDays("T+7")).toBe(7);
  });

  it("takes the slowest leg of ranges and multi-channel strings", () => {
    expect(parseSettlementDays("T+1–T+2")).toBe(2);
    expect(parseSettlementDays("T+1 or T+2")).toBe(2);
    expect(parseSettlementDays("T+2 (T+3 cards)")).toBe(3);
    expect(parseSettlementDays("T+1 (FPX); T+3 (card/e-wallet/BNPL)")).toBe(3);
    expect(parseSettlementDays("T+1 to T+2 (1-2 business days)")).toBe(2);
    expect(parseSettlementDays("1-4 business days (FPX)")).toBe(4);
  });

  it("handles word forms", () => {
    expect(parseSettlementDays("Next business day")).toBe(1);
    expect(parseSettlementDays("Within 5 working days")).toBe(5);
    expect(parseSettlementDays("Weekly (W+4 business days)")).toBe(7);
    expect(parseSettlementDays("Weekly (Thu); e-wallets T+2")).toBe(7);
    expect(parseSettlementDays("3x weekly (Tue/Wed/Fri)")).toBe(3);
  });

  it("excludes unknown, indicative and qualitative strings", () => {
    expect(parseSettlementDays("Contact sales")).toBeNull();
    expect(parseSettlementDays("—")).toBeNull();
    expect(parseSettlementDays("T+2–T+3 *")).toBeNull();
    expect(parseSettlementDays("Paid in full on order completion")).toBeNull();
    expect(parseSettlementDays("")).toBeNull();
  });

  it("reads hyphenated same-day and real-time, but a slower stated leg wins", () => {
    expect(parseSettlementDays("Same-day")).toBe(0);
    expect(parseSettlementDays("Real-time")).toBe(0);
    expect(parseSettlementDays("Real-time or next day (depends on payment mode)")).toBe(1);
  });

  it("plan-gated instant does not beat the stated primary leg", () => {
    expect(parseSettlementDays("T+1 (FPX) / T+2; instant on Pro")).toBe(2);
  });
});
