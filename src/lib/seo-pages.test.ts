import { describe, it, expect } from "vitest";
import {
  PROFILES,
  buildProfilePage,
  profileJsonLd,
  profilePath,
  vsPairs,
  buildVsPage,
  headlineRates,
  alternativesTargets,
  buildAlternativesPage,
  alternativesJsonLd,
} from "./seo-pages";
import type { ApiGateway } from "./api";

// minimal ApiGateway fixture factory (same pattern as recommend.test.ts)
function gw(p: Partial<ApiGateway> & { slug: string }): ApiGateway {
  return {
    slug: p.slug,
    name: p.name ?? p.slug,
    category: p.category ?? "gateway",
    website: "https://x",
    tagline: "",
    access: p.access ?? { key: "integrate", short: "Integrate" },
    fees: p.fees ?? {},
    settlement: p.settlement ?? "T+1",
    min_txn: "—",
    est_fee_rm100: p.est_fee_rm100 ?? null,
    rankable: p.rankable ?? (p.est_fee_rm100 != null),
    channels: p.channels ?? [],
    features: p.features ?? { no_code: false, api: false, recurring: false },
    methods: [],
    banks: [],
    mcp: p.mcp ?? "none",
    webhooks: p.webhooks ?? null,
    plugins: p.plugins ?? [],
    dev_docs: null,
    skill: null,
    popularity: p.popularity ?? 0,
    verified_date: "2026-07-02",
    source: "https://x",
  };
}

const allFeatures = { no_code: true, api: true, recurring: true };
const cheap = gw({ slug: "cheap", channels: ["fpx", "card", "ewallet"], est_fee_rm100: 1.1, features: allFeatures, plugins: ["WooCommerce"], popularity: 50 });
const mid = gw({ slug: "mid", channels: ["fpx", "card"], est_fee_rm100: 2.2, features: allFeatures, popularity: 60 });
const quote = gw({ slug: "quote", channels: ["fpx", "card", "ewallet", "duitnowqr"], popularity: 100, features: allFeatures });
const bank = gw({ slug: "bank", category: "bank", channels: ["fpx"], popularity: 40, access: { key: "account", short: "Merchant account" } });
const bnplA = gw({ slug: "abnpl", category: "bnpl", channels: ["bnpl"], popularity: 75 });
const bnplB = gw({ slug: "bbnpl", category: "bnpl", channels: ["bnpl"], popularity: 70 });
const infra = gw({ slug: "infra", category: "infrastructure" });
const all = [cheap, mid, quote, bank, bnplA, bnplB, infra];

describe("PROFILES registry", () => {
  it("has unique, url-safe slugs and complete copy", () => {
    const slugs = PROFILES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of PROFILES) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.h1.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
      expect(p.intro.length).toBeGreaterThan(0);
      expect(p.faqNoun.length).toBeGreaterThan(0);
    }
  });

  it("holds no em-dashes in prose (house style)", () => {
    for (const p of PROFILES)
      for (const s of [p.h1, p.title, p.description, p.intro, p.faqNoun]) expect(s).not.toMatch(/[—–]/);
  });

  it("carries complete Bahasa Malaysia copy inside the SERP windows", () => {
    for (const p of PROFILES) {
      for (const s of [p.ms.h1, p.ms.title, p.ms.description, p.ms.intro, p.ms.faqNoun]) {
        expect(s.length, p.slug).toBeGreaterThan(0);
        expect(s, p.slug).not.toMatch(/[—–]/);
      }
      expect(p.ms.title.length, p.slug).toBeGreaterThanOrEqual(30);
      expect(p.ms.title.length, p.slug).toBeLessThanOrEqual(65);
      expect(p.ms.description.length, p.slug).toBeGreaterThanOrEqual(110);
      expect(p.ms.description.length, p.slug).toBeLessThanOrEqual(160);
    }
  });

  it("profilePath builds the /best/ url with a trailing slash", () => {
    expect(profilePath("payment-gateway-fpx")).toBe("/best/payment-gateway-fpx/");
  });
});

describe("buildProfilePage", () => {
  it("splits ranked (cheapest first) from on-request matches", () => {
    const page = buildProfilePage(all, PROFILES[0]);
    expect(page.ranked.map((m) => m.gateway.slug)).toEqual(["cheap", "mid"]);
    expect(page.onRequest.map((m) => m.gateway.slug)).toContain("quote");
    expect(page.relaxed).toEqual([]);
  });

  it("counts total matches beyond the limit", () => {
    const page = buildProfilePage(all, PROFILES[0], 2);
    expect(page.ranked.length + page.onRequest.length).toBe(2);
    expect(page.totalMatches).toBeGreaterThan(2);
  });

  it("pluginsOnly keeps only gateways that ship plugins", () => {
    const def = PROFILES.find((p) => p.pluginsOnly)!;
    const page = buildProfilePage(all, def);
    const slugs = [...page.ranked, ...page.onRequest].map((m) => m.gateway.slug);
    expect(slugs).toEqual(["cheap"]);
  });

  it("cheapest FAQ names the top ranked gateway with its fee", () => {
    const def = PROFILES.find((p) => p.slug === "cheapest-payment-gateway-malaysia")!;
    const page = buildProfilePage(all, def);
    expect(page.faqs[0].q).toContain("cheapest");
    expect(page.faqs[0].a).toContain("cheap");
    expect(page.faqs[0].a).toContain("RM1.10");
  });

  it("generic profile swaps the cheapest FAQ for a how-to-choose FAQ (de-cannibalised)", () => {
    expect(PROFILES[0].noCheapestFaq).toBe(true);
    const page = buildProfilePage(all, PROFILES[0]);
    expect(page.faqs.some((f) => f.q.includes("cheapest"))).toBe(false);
    expect(page.faqs[0].q).toContain("How do I choose");
  });

  it("dates the cheapest FAQ and emits a citable answerLine when asOf is given", () => {
    const def = PROFILES.find((p) => p.slug === "cheapest-payment-gateway-malaysia")!;
    const page = buildProfilePage(all, def, 8, "2026-07-02");
    expect(page.faqs[0].a).toMatch(/^As of 2026-07-02, /);
    expect(page.answerLine).toContain("As of 2026-07-02");
    expect(page.answerLine).toContain("cheap");
    expect(page.answerLine).toContain("RM1.10");
    // no date, no answerLine (backwards compatible)
    expect(buildProfilePage(all, def).answerLine).toBeUndefined();
  });

  it("headlineRates lists official rates only, in channel order, capped", () => {
    const g = gw({
      slug: "hr",
      fees: { fpx: "RM1.25", card: "1.8%", ewallet: "1.5% *", duitnowqr: "1.2%", bnpl: "6%" },
    });
    expect(headlineRates(g)).toBe("FPX RM1.25 · Card 1.8% · DuitNow QR 1.2%");
    expect(headlineRates(gw({ slug: "cs", fees: { fpx: "Contact sales", card: "—" } }))).toBe("");
  });

  it("omits the cheapest FAQ when nothing is rankable", () => {
    const def = PROFILES.find((p) => p.slug === "bnpl-malaysia")!;
    const page = buildProfilePage(all, def);
    expect(page.ranked).toEqual([]);
    expect(page.faqs.some((f) => f.q.includes("cheapest"))).toBe(false);
    // BNPL list ordered by popularity when nothing publishes rates
    expect(page.onRequest.map((m) => m.gateway.slug)).toEqual(["abnpl", "bbnpl"]);
  });

  it("never includes infrastructure", () => {
    for (const def of PROFILES) {
      const page = buildProfilePage(all, def);
      const slugs = [...page.ranked, ...page.onRequest].map((m) => m.gateway.slug);
      expect(slugs).not.toContain("infra");
    }
  });
});

describe("profileJsonLd", () => {
  it("emits an ItemList with sequential positions and a FAQPage", () => {
    const page = buildProfilePage(all, PROFILES[0]);
    const [list, faq] = profileJsonLd(page, "https://malaysiapg.com.my") as any[];
    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement[0]).toMatchObject({
      position: 1,
      name: "cheap",
      url: "https://malaysiapg.com.my/gateway/cheap/",
    });
    expect(list.itemListElement.map((i: any) => i.position)).toEqual(
      list.itemListElement.map((_: any, idx: number) => idx + 1),
    );
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity.length).toBe(page.faqs.length);
  });
});

describe("vsPairs", () => {
  it("pairs same-category entries with alphabetical canonical slugs, no dupes or self-pairs", () => {
    const pairs = vsPairs(all);
    expect(new Set(pairs.map((p) => p.slug)).size).toBe(pairs.length);
    for (const p of pairs) {
      expect(p.a.slug < p.b.slug).toBe(true);
      expect(p.slug).toBe(`${p.a.slug}-vs-${p.b.slug}`);
      expect(p.a.category).toBe(p.b.category);
    }
  });

  it("keeps a gateway pair only when at least one side is rankable", () => {
    const pairs = vsPairs(all).filter((p) => p.a.category === "gateway");
    expect(pairs.map((p) => p.slug).sort()).toEqual(["cheap-vs-mid", "cheap-vs-quote", "mid-vs-quote"]);
  });

  it("includes all pairs among the top BNPL providers", () => {
    const pairs = vsPairs(all);
    expect(pairs.some((p) => p.slug === "abnpl-vs-bbnpl")).toBe(true);
  });

  it("is deterministic and sorted", () => {
    const a = vsPairs(all).map((p) => p.slug);
    const b = vsPairs([...all].reverse()).map((p) => p.slug);
    expect(a).toEqual(b);
    expect(a).toEqual([...a].sort());
  });

  it("never pairs infrastructure or banks outside the curated sets", () => {
    const pairs = vsPairs(all);
    for (const p of pairs) {
      expect(["gateway", "bnpl"]).toContain(p.a.category);
    }
  });
});

describe("buildVsPage", () => {
  const pair = vsPairs(all).find((p) => p.slug === "cheap-vs-mid")!;

  it("names the cheaper side when both publish rates", () => {
    const page = buildVsPage(pair);
    expect(page.verdicts[0]).toContain("cheap is cheaper");
    expect(page.verdicts[0]).toContain("RM1.10");
    expect(page.verdicts[0]).toContain("RM2.20");
  });

  it("marks the quote-based side when only one publishes rates", () => {
    const p = vsPairs(all).find((x) => x.slug === "cheap-vs-quote")!;
    const page = buildVsPage(p);
    expect(page.verdicts[0]).toContain("cheap publishes comparable official rates");
    expect(page.verdicts[0]).toContain("quote does not publish enough official rates");
  });

  it("says so when neither publishes rates", () => {
    const p = vsPairs(all).find((x) => x.slug === "abnpl-vs-bbnpl")!;
    expect(buildVsPage(p).verdicts[0]).toContain("Neither publishes");
  });

  it("calls out channel differences both ways", () => {
    const page = buildVsPage(pair); // cheap has ewallet, mid does not
    expect(page.verdicts.join(" ")).toContain("cheap also supports e-wallets");
  });

  it("passes fee strings through untouched (no fabrication)", () => {
    const withFees = { ...pair, a: { ...pair.a, fees: { fpx: "RM1.00", card: "Contact sales" } } };
    const page = buildVsPage(withFees);
    const fpx = page.feeRows.find((r) => r.label === "FPX")!;
    expect(fpx.a).toBe("RM1.00");
    const card = page.feeRows.find((r) => r.label === "Cards (local)")!;
    expect(card.a).toBe("Contact sales");
    const intl = page.feeRows.find((r) => r.label === "Cards (international)")!;
    expect(intl.a).toBe("—");
  });

  it("shows est fee row as ~RM or On request", () => {
    const page = buildVsPage(pair);
    const est = page.feeRows[0];
    expect(est.a).toBe("~RM1.10");
    const p2 = buildVsPage(vsPairs(all).find((x) => x.slug === "abnpl-vs-bbnpl")!);
    expect(p2.feeRows[0].a).toBe("On request");
  });

  it("title and description carry both names, no em-dashes", () => {
    const page = buildVsPage(pair);
    expect(page.title).toContain("cheap vs mid");
    expect(page.description).toContain("cheap vs mid");
    expect(page.title).not.toMatch(/[—–]/);
    expect(page.description).not.toMatch(/[—–]/);
  });
});

describe("alternativesTargets + buildAlternativesPage", () => {
  const many = [
    ...all,
    ...Array.from({ length: 10 }, (_, i) =>
      gw({ slug: `g${i}`, category: "gateway", channels: ["fpx", "card"], popularity: 90 - i, est_fee_rm100: 2 + i * 0.1 }),
    ),
  ];

  it("targets are the top popular gateway-category entries only", () => {
    const targets = alternativesTargets(many);
    expect(targets.length).toBe(12);
    expect(targets.every((g) => g.category === "gateway")).toBe(true);
    expect(targets[0].slug).toBe("quote"); // popularity 100
  });

  it("page excludes the target, ranks cheapest first, dates the answer", () => {
    const target = many.find((g) => g.slug === "g0")!;
    const page = buildAlternativesPage(many, target, 8, "2026-07-02");
    const slugs = [...page.ranked, ...page.onRequest].map((m) => m.gateway.slug);
    expect(slugs).not.toContain("g0");
    expect(page.ranked[0].gateway.est_fee_rm100).toBeLessThanOrEqual(page.ranked.at(-1)!.gateway.est_fee_rm100!);
    expect(page.answerLine).toContain("As of 2026-07-02");
    expect(page.faqs[0].q).toContain("cheapest alternative");
  });

  it("title and description stay inside the SERP windows for long brand names", () => {
    const target = gw({ slug: "long", name: "Curlec by Razorpay", category: "gateway", channels: ["fpx", "card"], popularity: 99 });
    const page = buildAlternativesPage([...many, target], target);
    expect(page.title.length).toBeGreaterThanOrEqual(30);
    expect(page.title.length).toBeLessThanOrEqual(65);
    expect(page.description.length).toBeGreaterThanOrEqual(110);
    expect(page.description.length).toBeLessThanOrEqual(160);
    expect(page.title).not.toMatch(/[—–]/);
  });

  it("jsonld emits ItemList + FAQPage with trailing-slash urls", () => {
    const target = many.find((g) => g.slug === "g0")!;
    const page = buildAlternativesPage(many, target, 8, "2026-07-02");
    const [list, faq] = alternativesJsonLd(page, "https://x.test") as any[];
    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement[0].url).toMatch(/\/$/);
    expect(faq["@type"]).toBe("FAQPage");
  });
});

describe("buildProfilePage data-built answers (SEO round 2026-10)", () => {
  const fees = (fpx: string, card: string, ewallet: string, duitnowqr?: string) => ({ fpx, card, ewallet, duitnowqr });
  const flat = gw({ slug: "flat", channels: ["fpx", "card", "ewallet"], fees: fees("RM1.00", "1.5%", "1.5%"), est_fee_rm100: 1.25, features: allFeatures });
  const pctGw = gw({ slug: "pct", channels: ["fpx", "card", "ewallet"], fees: fees("0.5%", "1.6%", "1.6%"), est_fee_rm100: 1.05, features: allFeatures });
  const qrBank = gw({ slug: "qrbank", category: "bank", channels: ["duitnowqr"], fees: { duitnowqr: "RM0" } });
  const pool = [flat, pctGw, qrBank, infra];
  const cheapest = PROFILES.find((p) => p.slug === "cheapest-payment-gateway-malaysia")!;

  it("generic page lists a top pick per need, and keeps the how-to-choose FAQ first", () => {
    const page = buildProfilePage(pool, PROFILES[0]);
    expect(page.byNeed.length).toBeGreaterThan(0);
    expect(page.byNeed.every((b) => b.top.rankable)).toBe(true);
    expect(page.faqs[0].q).toContain("How do I choose");
  });

  it("cheapest page costs the same rates at each sale size", () => {
    const page = buildProfilePage(pool, cheapest);
    expect(page.byTicket.map((b) => b.ticket)).toEqual([20, 100, 500]);
    // RM100 always agrees with the ranked list
    expect(page.byTicket[1].top.slug).toBe(page.ranked[0].gateway.slug);
    // a flat RM1 FPX fee loses to 0.5% on RM20 (RM0.10) and wins on RM500 (RM2.50)
    expect(page.byTicket[0].top.slug).toBe("pct");
    expect(page.byTicket[2].top.slug).toBe("flat");
  });

  it("cheapest page meta names the top pick inside the SERP window", () => {
    for (const locale of ["en", "ms"] as const) {
      const page = buildProfilePage(pool, cheapest, 8, undefined, locale);
      expect(page.description).toContain("pct");
      expect(page.description.length).toBeGreaterThanOrEqual(110);
      expect(page.description.length).toBeLessThanOrEqual(160);
    }
    // profiles without answerMeta keep their static copy
    expect(buildProfilePage(pool, PROFILES[0]).description).toBe(PROFILES[0].description);
  });

  it("QR FAQ quotes only published DuitNow QR rates, and says who is outside the list", () => {
    const def = PROFILES.find((p) => p.slug === "payment-gateway-physical-store")!;
    const faq = buildProfilePage(pool, def).faqs.find((f) => f.q.includes("DuitNow QR"))!;
    expect(faq.a).toContain("qrbank (RM0)");
    expect(faq.a).toContain("not in the list above");
  });
});
