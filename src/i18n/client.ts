// Browser side of src/i18n/locale.ts: client scripts read the page language
// from <html lang> (set by Base.astro) and build /ms/ links the same way.
import { localizePath, toLocale, type Locale } from "./locale";

export { tr, formatDate } from "./locale";
export type { Locale } from "./locale";

export function pageLocale(): Locale {
  return toLocale(document.documentElement.lang);
}

export function href(path: string): string {
  return localizePath(path, pageLocale());
}
