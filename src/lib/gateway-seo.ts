/**
 * SERP title + meta description for a gateway detail page (/gateway/<slug>/),
 * built from the gateway's own published fees so the search snippet shows the
 * numbers people search for ("<brand> fees", "<brand> charges").
 *
 * Pure: no Astro imports, so the Vitest suite can run it over every gateway file.
 * Only real published values are used: a value must contain a digit and must not
 * be "Contact sales", "—" or an indicative third-party rate (marked "*").
 * Targets: title 30-65 chars, description 110-160 chars, in both locales.
 */
import type { Locale } from "../i18n/locale";

export interface GatewaySeoInput {
  brand: string; // display base name, no parenthetical note (splitName().base)
  tagline: string; // localized tagline
  settlement: string; // localized settlement text
  verified_date: string; // ISO date, the year goes in the title
  fees: { fpx: string; card: string; ewallet: string; setup: string; monthly: string };
  others: number; // how many other gateways the site compares against
}

export const TITLE_MIN = 30;
export const TITLE_MAX = 65;
export const DESC_MIN = 110;
export const DESC_MAX = 160;

const dashes = (s: string) => s.replace(/\s*[–—]\s*/g, (m) => (m.trim() === m ? "-" : " - "));

/** A published value: has a digit, is not on request, not an indicative "*" rate. */
export function isPublished(v: string | undefined): v is string {
  if (!v) return false;
  const t = v.trim();
  if (!/\d/.test(t) || t.includes("*")) return false;
  return !/contact sales|hubungi jualan/i.test(t);
}

/** Per-transaction fee, cut to its headline figure: no parenthetical notes, first clause only. */
function shortRate(v: string, locale: Locale): string {
  let s = v.replace(/\s*\([^)]*\)/g, "").split(/[,;]/)[0].trim();
  s = dashes(s).replace(/^From /, "from ");
  if (locale === "ms") {
    s = s
      .replace(/\bfrom /g, "dari ")
      .replace(/ or /g, " atau ")
      .replace(/\bcredit\b/g, "kredit");
  }
  return s;
}

/** Setup/annual fee: only clean values (a parenthetical like "(waived)" changes the meaning, so skip those). */
function cleanFixed(v: string, locale: Locale): string | null {
  if (!isPublished(v) || v.includes("(")) return null;
  let s = dashes(v.trim());
  if (locale === "ms") {
    s = s
      .replace(/^from /i, "dari ")
      .replace(/\/(yr|year)\b/g, "/tahun")
      .replace(/\/month\b/g, "/bulan");
  }
  return s;
}

function shortSettlement(v: string): string | null {
  if (!isPublishedText(v)) return null;
  let s = v.replace(/\s*\([^)]*\)/g, "").split(/[,;]/)[0].trim();
  s = dashes(s);
  if (/^[A-Z][a-z]/.test(s)) s = s[0].toLowerCase() + s.slice(1);
  return s.length && s.length <= 30 ? s : null;
}

// settlement can be words ("Same-day", "Next business day"), so no digit check here
function isPublishedText(v: string | undefined): v is string {
  if (!v) return false;
  const t = v.trim();
  return t !== "" && t !== "—" && !t.includes("*") && !/contact sales|hubungi jualan/i.test(t);
}

const W = {
  en: {
    card: "card",
    ewallet: "e-wallet",
    noFixed: "no setup or monthly fee",
    noSetup: "no setup fee",
    noMonthly: "no monthly fee",
    setup: (v: string) => `setup fee ${v}`,
    monthly: (v: string) => `platform fee ${v}`,
    settle: (s: string) => (/^T\+/.test(s) ? `${s} settlement` : `settlement ${s}`),
    titleFees: (b: string, y: string, list: string) => `${b} fees ${y}: ${list}`,
    titleFallback: [
      (b: string) => `${withMy(b)} fees, features and setup | MPG`,
      (b: string) => `${b} fees, features and setup | MPG`,
      (b: string) => `${b} fees and features | MPG`,
    ],
    descLead: (b: string, y: string) => `${b} fees ${y}: `,
    onRequest: "Rates not published (contact sales)",
    tails: (n: number) => [
      `Compared with ${n} other Malaysian payment gateways, verified from official sources.`,
      `Compared with ${n} other Malaysian payment gateways on MPG.`,
      `Compared with ${n} other Malaysian gateways.`,
    ],
    noFeeTails: (b: string, n: number) => [
      `See ${b} setup, settlement and features compared with ${n} other Malaysian payment gateways.`,
      `${b} features compared with ${n} other Malaysian payment gateways.`,
      `Compared with ${n} other Malaysian gateways.`,
    ],
  },
  ms: {
    card: "kad",
    ewallet: "e-wallet",
    noFixed: "tiada fee setup atau bulanan",
    noSetup: "tiada fee setup",
    noMonthly: "tiada fee bulanan",
    setup: (v: string) => `fee setup ${v}`,
    monthly: (v: string) => `fee platform ${v}`,
    settle: (s: string) => `duit masuk ${s}`,
    titleFees: (b: string, y: string, list: string) => `Fee ${b} ${y}: ${list}`,
    titleFallback: [
      (b: string) => `Fee ${withMy(b)}, ciri dan cara setup | MPG`,
      (b: string) => `Fee ${b}, ciri dan cara setup | MPG`,
      (b: string) => `Fee dan ciri ${b} | MPG`,
    ],
    descLead: (b: string, y: string) => `Caj ${b} ${y}: `,
    onRequest: "Caj tidak disiarkan (hubungi jualan)",
    tails: (n: number) => [
      `Banding dengan ${n} payment gateway lain di Malaysia, disemak dari sumber rasmi.`,
      `Banding dengan ${n} payment gateway lain di Malaysia.`,
      `Banding dengan ${n} gateway lain di Malaysia.`,
    ],
    noFeeTails: (b: string, n: number) => [
      `Lihat setup, duit masuk dan ciri ${b} berbanding ${n} payment gateway lain di Malaysia.`,
      `Ciri ${b} berbanding ${n} payment gateway lain di Malaysia.`,
      `Banding dengan ${n} gateway lain di Malaysia.`,
    ],
  },
} as const;

// "<brand> Malaysia", without doubling it for names like "UOB Malaysia"
const withMy = (b: string) => (/\bMalaysia$/.test(b) ? b : `${b} Malaysia`);
const sentence = (s: string) => {
  const t = s.trim().replace(/[.\s]+$/, "");
  return t ? `${t}.` : "";
};
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const inTitle = (s: string) => s.length >= TITLE_MIN && s.length <= TITLE_MAX;
const inDesc = (s: string) => s.length >= DESC_MIN && s.length <= DESC_MAX;
const closest = (c: string[], min: number, max: number) =>
  c.reduce((best, s) => {
    const off = (x: string) => Math.max(0, min - x.length, x.length - max);
    return off(s) < off(best) ? s : best;
  });

/** Per-transaction channels with a published fee, in SERP priority order. */
function channels(i: GatewaySeoInput, locale: Locale): string[] {
  const w = W[locale];
  const out: string[] = [];
  if (isPublished(i.fees.fpx)) out.push(`FPX ${shortRate(i.fees.fpx, locale)}`);
  if (isPublished(i.fees.card)) out.push(`${w.card} ${shortRate(i.fees.card, locale)}`);
  if (isPublished(i.fees.ewallet)) out.push(`${w.ewallet} ${shortRate(i.fees.ewallet, locale)}`);
  return out;
}

/** Setup/monthly fee phrases ("no setup or monthly fee" when both are a plain RM0). */
function fixedFees(i: GatewaySeoInput, locale: Locale): string[] {
  const w = W[locale];
  const setup = cleanFixed(i.fees.setup, locale);
  const monthly = cleanFixed(i.fees.monthly, locale);
  if (setup === "RM0" && monthly === "RM0") return [w.noFixed];
  const out: string[] = [];
  if (setup) out.push(setup === "RM0" ? w.noSetup : w.setup(setup));
  if (monthly) out.push(monthly === "RM0" ? w.noMonthly : w.monthly(monthly));
  return out;
}

export function gatewaySeoTitle(i: GatewaySeoInput, locale: Locale): string {
  const w = W[locale];
  const year = i.verified_date.slice(0, 4);
  const ch = channels(i, locale);
  const candidates: string[] = [];
  for (let k = ch.length; k >= 1; k--) {
    const list = ch.slice(0, k).join(", ");
    candidates.push(`${w.titleFees(i.brand, year, list)} | MPG`);
    candidates.push(`${w.titleFees(withMy(i.brand), year, list)} | MPG`); // pads a short title
    candidates.push(w.titleFees(i.brand, year, list));
  }
  for (const f of w.titleFallback) candidates.push(f(i.brand));
  candidates.splice(0, candidates.length, ...new Set(candidates));
  // prefer more channels; within a channel count, the short-brand form unless it is under the minimum
  return candidates.find(inTitle) ?? closest(candidates, TITLE_MIN, TITLE_MAX);
}

export function gatewaySeoDescription(i: GatewaySeoInput, locale: Locale): string {
  const w = W[locale];
  const year = i.verified_date.slice(0, 4);
  const ch = channels(i, locale);
  const settle = shortSettlement(i.settlement);
  const tagline = sentence(dashes(i.tagline));
  const candidates: string[] = [];

  if (ch.length) {
    // FPX, card, e-wallet, setup/monthly, settlement; shorten by dropping from the end
    const parts = [...ch, ...fixedFees(i, locale), ...(settle ? [w.settle(settle)] : [])];
    const tails = w.tails(i.others);
    const bodies: string[] = [];
    for (let k = parts.length; k >= 1; k--) bodies.push(sentence(w.descLead(i.brand, year) + parts.slice(0, k).join(", ")));
    for (const b of bodies) for (const t of tails) candidates.push(`${b} ${t}`);
    // too short even with every figure: add the tagline as context
    for (const b of bodies) for (const t of tails) candidates.push(`${b} ${tagline} ${t}`);
  } else {
    const anyOnRequest = Object.values(i.fees).some((v) => /contact sales/i.test(v));
    const extras = [
      ...(anyOnRequest ? [w.onRequest] : []),
      // skip "no setup fee" when the tagline already says it
      ...(/setup/i.test(i.tagline) ? [] : fixedFees(i, locale)),
      ...(settle ? [w.settle(settle)] : []),
    ];
    const tails = w.noFeeTails(i.brand, i.others);
    for (let k = extras.length; k >= 0; k--) {
      const mid = k ? ` ${sentence(cap(extras.slice(0, k).join(", ")))}` : "";
      for (const t of tails) candidates.push(`${tagline}${mid} ${t}`);
    }
  }
  return candidates.find(inDesc) ?? closest(candidates, DESC_MIN, DESC_MAX);
}
