// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// Static site. Auth is client-side via @clerk/clerk-js (see src/scripts/auth.ts).
// English at /, Bahasa Malaysia at /ms/ (see i18n below and src/i18n/).
export default defineConfig({
  site: "https://malaysiapg.com.my",
  // Bahasa Malaysia: every page is rendered again at /ms/<path> from the same
  // source (fallback rewrite); pages pick their strings via src/i18n/locale.ts
  i18n: {
    locales: ["en", "ms"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false, fallbackType: "rewrite" },
    fallback: { ms: "en" },
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: "en", locales: { en: "en-MY", ms: "ms-MY" } } }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
