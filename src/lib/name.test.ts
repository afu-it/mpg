import { describe, expect, it } from "vitest";
import { stripParens } from "./name";

describe("stripParens", () => {
  it("drops every parenthetical aside from a table value", () => {
    expect(stripParens("RM1.00 (B2C), RM1.50 (B2B)")).toBe("RM1.00, RM1.50");
    expect(stripParens("RM199 promo (normally RM500)")).toBe("RM199 promo");
    expect(stripParens("From 1.80% (min RM0.60)")).toBe("From 1.80%");
    expect(stripParens("T+3 (T+1 at +0.25%)")).toBe("T+3");
    expect(stripParens("1.5% credit / 1.0% debit (local)")).toBe("1.5% credit / 1.0% debit");
  });

  it("keeps values without parentheses, and the third-party marker", () => {
    expect(stripParens("1.5%")).toBe("1.5%");
    expect(stripParens("T+2 (QR T+1) *")).toBe("T+2 *");
    expect(stripParens("Contact sales")).toBe("Contact sales");
  });

  it("never returns an empty cell", () => {
    expect(stripParens("(waived)")).toBe("(waived)");
  });
});
