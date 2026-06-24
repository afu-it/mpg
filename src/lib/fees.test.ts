import { describe, it, expect } from "vitest";
import { parseFee, compareFee } from "./fees";

describe("parseFee", () => {
  it("parses a flat ringgit fee", () => expect(parseFee("RM1.00")).toBe(1));
  it("parses ringgit without decimals", () => expect(parseFee("RM199/year")).toBe(199));
  it("parses a percentage fee", () => expect(parseFee("2.0%")).toBe(2));
  it("parses percent + flat by the percent", () =>
    expect(parseFee("2.0% + RM0.50")).toBe(2));
  it("parses percent-first when both present (e.g. 3% + RM1.00)", () =>
    expect(parseFee("3% + RM1.00")).toBe(3));
  it("parses 'or' style by the percent (1.5% / RM1.00)", () =>
    expect(parseFee("1.5% / RM1.00")).toBe(1.5));
  it("parses RM0 as zero", () => expect(parseFee("RM0")).toBe(0));
  it("treats 'Contact sales' as Infinity (sorts last)", () =>
    expect(parseFee("Contact sales")).toBe(Infinity));
  it("treats em dash as Infinity (sorts last)", () =>
    expect(parseFee("—")).toBe(Infinity));
  it("treats empty string as Infinity", () => expect(parseFee("")).toBe(Infinity));
});

describe("compareFee", () => {
  it("orders ascending with unknowns last", () => {
    const sorted = ["—", "RM1.20", "0.5%", "Contact sales", "RM1.00"].sort(compareFee);
    expect(sorted).toEqual(["0.5%", "RM1.00", "RM1.20", "—", "Contact sales"]);
  });
});
