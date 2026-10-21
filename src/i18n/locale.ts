// Two locales: English at the root, Bahasa Malaysia under /ms/. Astro's i18n
// fallback (astro.config.mjs) renders every English page again at /ms/<path>,
// so a page only has to pick its strings by locale; src/middleware.ts then
// points the internal links of a /ms/ page at their /ms/ twins.

export type Locale = "en" | "ms";

export function toLocale(v: string | undefined | null): Locale {
  return v === "ms" ? "ms" : "en";
}

/** Locale of the page being rendered (Astro.currentLocale). */
export function getLocale(astro: { currentLocale?: string | undefined }): Locale {
  return toLocale(astro.currentLocale);
}

/** Pick a page's strings; ms must carry exactly the same keys as en. */
export function tr<T>(locale: Locale, dict: { en: T; ms: T }): T {
  return dict[locale];
}

// API files, build assets and anything with a file extension stay unprefixed
const NOT_A_PAGE = /^\/(?:api|_astro|ms)(?:\/|$)|\.[a-z0-9]+(?:[?#]|$)/i;

/** "/gateways/" -> "/ms/gateways/" on a BM page; external and asset paths pass through. */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en" || !path.startsWith("/") || path.startsWith("//")) return path;
  if (NOT_A_PAGE.test(path)) return path;
  return `/ms${path}`;
}

/** "/ms/gateways/" -> "/gateways/" (the shared, locale-free path). */
export function stripLocale(path: string): string {
  if (path === "/ms" || path === "/ms/") return "/";
  return path.startsWith("/ms/") ? path.slice(3) : path;
}

/** Date in the reader's language: "17 Jul 2026" / "17 Jul 2026" (ms uses Malay month names). */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === "ms" ? "ms-MY" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
