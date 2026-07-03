// BM page pairs (spec 12 slice G): the scoped Bahasa Malaysia money pages and
// their closest English equivalents. Base.astro reads this to emit reciprocal
// hreflang tags automatically on BOTH sides (en, ms, x-default = en).
// This is deliberately a small curated set, not a full /ms/ site mirror.

export interface I18nPair {
  /** English page path, trailing slash */
  en: string;
  /** Bahasa Malaysia page path under /ms/, trailing slash */
  ms: string;
}

export const I18N_PAIRS: I18nPair[] = [
  { en: "/", ms: "/ms/" },
  { en: "/best/cheapest-payment-gateway-malaysia/", ms: "/ms/payment-gateway-murah/" },
  { en: "/choose/", ms: "/ms/cara-pilih-payment-gateway/" },
  { en: "/best/payment-gateway-online-store/", ms: "/ms/payment-gateway-untuk-bisnes-online/" },
];

/** Pair for a canonical path (trailing slash), or null when the page has no variant. */
export function pairFor(path: string): I18nPair | null {
  return I18N_PAIRS.find((p) => p.en === path || p.ms === path) ?? null;
}
