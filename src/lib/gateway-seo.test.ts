import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { splitName } from "./name";
import {
  gatewaySeoTitle,
  gatewaySeoDescription,
  isPublished,
  TITLE_MIN,
  TITLE_MAX,
  DESC_MIN,
  DESC_MAX,
  type GatewaySeoInput,
} from "./gateway-seo";
import type { Locale } from "../i18n/locale";

const GATEWAYS_DIR = join(__dirname, "../content/gateways");
const GATEWAYS_MS_DIR = join(__dirname, "../content/gateways-ms");

function frontmatter(path: string): string {
  if (!existsSync(path)) return "";
  return readFileSync(path, "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
}

// top-level `key: value` (quoted or bare); `indent` reads a nested key like the fees block
function fmValue(fm: string, key: string, indent = ""): string | undefined {
  const m = fm.match(new RegExp(`^${indent}${key}: (.*)$`, "m"));
  if (!m) return undefined;
  const v = m[1].trim();
  return v.startsWith('"') ? JSON.parse(v) : v;
}

function feesBlock(fm: string): string {
  return fm.match(/^fees:\n((?: {2}.*\n?)+)/m)?.[1] ?? "";
}

const files = readdirSync(GATEWAYS_DIR).filter((f) => f.endsWith(".md"));

function input(file: string, locale: Locale): GatewaySeoInput {
  const fm = frontmatter(join(GATEWAYS_DIR, file));
  const ms = locale === "ms" ? frontmatter(join(GATEWAYS_MS_DIR, file)) : "";
  const fees = feesBlock(fm);
  const fee = (k: string) => fmValue(fees, k, " {2}") ?? "";
  return {
    brand: splitName(fmValue(fm, "name")!).base,
    tagline: fmValue(ms, "tagline") ?? fmValue(fm, "tagline")!,
    settlement: fmValue(ms, "settlement") ?? fmValue(fm, "settlement")!,
    verified_date: fmValue(fm, "verified_date")!,
    fees: { fpx: fee("fpx"), card: fee("card"), ewallet: fee("ewallet"), setup: fee("setup"), monthly: fee("monthly") },
    others: files.length - 1,
  };
}

describe("isPublished", () => {
  it("accepts real figures only", () => {
    expect(isPublished("RM1.00")).toBe(true);
    expect(isPublished("1.5%")).toBe(true);
    expect(isPublished("Contact sales")).toBe(false);
    expect(isPublished("—")).toBe(false);
    expect(isPublished("Interchange++")).toBe(false);
    expect(isPublished("1.6%–2.4% *")).toBe(false);
  });
});

describe.each(["en", "ms"] as const)("gateway detail SEO (%s)", (locale) => {
  const rows = files.map((file) => {
    const i = input(file, locale);
    return { file, i, title: gatewaySeoTitle(i, locale), desc: gatewaySeoDescription(i, locale) };
  });

  it("reads every gateway", () => {
    expect(rows.length).toBeGreaterThan(50);
  });

  it.each(rows)("$file title and description sit inside the SERP windows", ({ title, desc }) => {
    expect(title.length, title).toBeGreaterThanOrEqual(TITLE_MIN);
    expect(title.length, title).toBeLessThanOrEqual(TITLE_MAX);
    expect(desc.length, desc).toBeGreaterThanOrEqual(DESC_MIN);
    expect(desc.length, desc).toBeLessThanOrEqual(DESC_MAX);
  });

  it.each(rows)("$file never shows an unpublished fee or a dash", ({ i, title, desc }) => {
    for (const s of [title, desc]) expect(s).not.toMatch(/[–—*]/);
    expect(title).not.toMatch(/Interchange|Contact sales|Hubungi jualan/);
    expect(title).toContain(i.brand);
    expect(desc).toContain(String(i.others));
  });

  it("titles and descriptions are unique", () => {
    expect(new Set(rows.map((r) => r.title)).size).toBe(rows.length);
    expect(new Set(rows.map((r) => r.desc)).size).toBe(rows.length);
  });
});

describe("gateway detail SEO examples", () => {
  it("puts herepay's published fees in the title", () => {
    const i = input("herepay.md", "en");
    expect(gatewaySeoTitle(i, "en")).toBe("Herepay fees 2026: FPX RM0.70, card RM0.70 + 1% | MPG");
    expect(gatewaySeoTitle(input("herepay.md", "ms"), "ms")).toBe("Fee Herepay 2026: FPX RM0.70, kad RM0.70 + 1% | MPG");
  });

  it("falls back to a fee-free title when nothing is published", () => {
    expect(gatewaySeoTitle(input("2c2p.md", "en"), "en")).toBe("2C2P Malaysia fees, features and setup | MPG");
  });
});
