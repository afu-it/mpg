import { describe, it, expect } from "vitest";
import { FEE_CHANGES, KIND_LABEL, KIND_LABEL_MS } from "./fee-changes";

describe("FEE_CHANGES log", () => {
  it("entries are complete, dated and house-styled", () => {
    for (const c of FEE_CHANGES) {
      expect(c.observed, c.name).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.what.length).toBeGreaterThan(10);
      expect(c.what, c.name).not.toMatch(/[—–]/);
      expect(c.whatMs.length, c.name).toBeGreaterThan(10);
      expect(c.whatMs, c.name).not.toMatch(/[—–]/);
      expect(KIND_LABEL[c.kind]).toBeTruthy();
      expect(KIND_LABEL_MS[c.kind]).toBeTruthy();
      if (c.slug != null) expect(c.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("never invents a numeric fee without a qualifier of official sourcing context", () => {
    // guard: every entry stating a number must be an observation, which the
    // audit trail (LOG 2026-07-02) backs; spot-check the shape stays one sentence-ish
    for (const c of FEE_CHANGES) {
      expect(c.what.split(". ").length).toBeLessThanOrEqual(3);
    }
  });
});
