import { describe, it, expect } from "vitest";
import { GLOSSARY, glossaryPath } from "./glossary";

describe("GLOSSARY registry", () => {
  it("has unique, url-safe slugs and complete copy", () => {
    const slugs = GLOSSARY.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const t of GLOSSARY) {
      expect(t.slug).toMatch(/^[a-z0-9-]+$/);
      expect(t.term.length).toBeGreaterThan(0);
      expect(t.question.length).toBeGreaterThan(0);
      expect(t.def.length).toBeGreaterThan(0);
      expect(t.body.length).toBeGreaterThan(0);
      expect(t.related.length).toBeGreaterThan(0);
    }
  });

  it("keeps every title and description inside the SERP windows", () => {
    for (const t of GLOSSARY) {
      expect(t.title.length, `${t.slug} title (${t.title.length})`).toBeGreaterThanOrEqual(30);
      expect(t.title.length, `${t.slug} title (${t.title.length})`).toBeLessThanOrEqual(65);
      expect(t.description.length, `${t.slug} desc (${t.description.length})`).toBeGreaterThanOrEqual(110);
      expect(t.description.length, `${t.slug} desc (${t.description.length})`).toBeLessThanOrEqual(160);
    }
  });

  it("holds no em-dashes in prose (house style)", () => {
    for (const t of GLOSSARY) {
      const prose = [t.term, t.question, t.title, t.description, t.def, ...t.body].join(" ");
      expect(prose, t.slug).not.toMatch(/[—–]/);
    }
  });

  it("related links are site-relative and glossary cross-links carry trailing slashes", () => {
    for (const t of GLOSSARY) {
      for (const r of t.related) {
        expect(r.href, t.slug).toMatch(/^\//);
        if (r.href.startsWith("/learn/glossary/")) expect(r.href, t.slug).toMatch(/\/$/);
        if (r.href.startsWith("/best/")) expect(r.href, t.slug).toMatch(/\/$/);
      }
    }
  });

  it("glossaryPath builds the url with a trailing slash", () => {
    expect(glossaryPath("fpx")).toBe("/learn/glossary/fpx/");
  });
});
