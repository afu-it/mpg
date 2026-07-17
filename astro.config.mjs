// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
// Static site. Auth is client-side via @clerk/clerk-js (see src/scripts/auth.ts).
export default defineConfig({
  site: "https://malaysiapg.com.my",
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});