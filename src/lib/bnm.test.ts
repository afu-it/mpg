import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { BNM_ROLES, BNM_LIST_URL, bnmBadge, bnmRoleLabel, type BnmRole } from "./bnm";

const GATEWAYS_DIR = join(__dirname, "../content/gateways");

// the `bnm:` block of each gateway's frontmatter (indented lines under it)
function bnmBlocks(): { file: string; block: string }[] {
  return readdirSync(GATEWAYS_DIR)
    .filter((f) => f.endsWith(".md"))
    .flatMap((file) => {
      const raw = readFileSync(join(GATEWAYS_DIR, file), "utf8");
      const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
      const m = fm.match(/^bnm:\n((?: {2}.*\n?)+)/m);
      return m ? [{ file, block: m[1] }] : [];
    });
}

describe("gateway bnm data", () => {
  const blocks = bnmBlocks();

  it("finds badged gateways", () => {
    expect(blocks.length).toBeGreaterThan(0);
  });

  it.each(blocks)("$file has a valid bnm block", ({ block }) => {
    const roles = block.match(/^ {2}roles: \[(.*)\]$/m)?.[1].split(",").map((r) => r.trim()) ?? [];
    expect(roles.length).toBeGreaterThan(0);
    for (const r of roles) expect(BNM_ROLES).toContain(r);
    const entity = block.match(/^ {2}entity: "(.*)"$/m)?.[1] ?? "";
    expect(entity.trim().length).toBeGreaterThan(0);
    expect(block).toMatch(/^ {2}checked: "\d{4}-\d{2}-\d{2}"$/m);
    expect(block).toMatch(/^ {2}evidence: "https:\/\/[^"]+"$/m);
  });
});

describe("bnm wording", () => {
  const all = BNM_ROLES.flatMap((r) => [bnmRoleLabel(r, "en"), bnmRoleLabel(r, "ms")]);

  it("never implies endorsement", () => {
    for (const s of all) expect(s).not.toMatch(/endors|guarant|sokong|jamin/i);
  });

  it("uses BNM's status words per role", () => {
    expect(bnmRoleLabel("merchant-acquirer", "en")).toMatch(/^Registered/);
    expect(bnmRoleLabel("emoney-issuer", "en")).toMatch(/^Approved/);
    expect(bnmRoleLabel("bank", "en")).toMatch(/^Licensed/);
  });

  it("links every role to the BNM directory", () => {
    for (const r of BNM_ROLES) expect(BNM_LIST_URL[r as BnmRole]).toMatch(/^https:\/\/www\.bnm\.gov\.my\//);
  });

  it("builds badge text and tooltip in both languages", () => {
    const bnm = { roles: ["merchant-acquirer"] as BnmRole[], entity: "X Sdn Bhd", checked: "2026-10-21", evidence: "https://x.my" };
    expect(bnmBadge(bnm, "en")).toEqual({
      text: "On BNM register",
      title: "Registered merchant acquirer (non-bank) · Bank Negara Malaysia, checked 21 Oct 2026",
      href: BNM_LIST_URL["merchant-acquirer"],
    });
    expect(bnmBadge(bnm, "ms").text).toBe("Dalam senarai BNM");
  });
});
