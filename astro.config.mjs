// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// Static site. Auth is client-side via @clerk/clerk-js (see src/scripts/auth.ts).
export default defineConfig({
  site: "https://malaysiapg.com.my",
  vite: {
    plugins: [tailwindcss()],
  },
});
