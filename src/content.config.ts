import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const gateways = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gateways" }),
  schema: z.object({
    name: z.string(),
    // optional: routing uses entry.id (filename); kept for documentation/override
    slug: z.string().optional(),
    logo: z.string().optional(),
    // logo artwork is a circle -> crop to a full circle instead of a rounded square
    logo_round: z.boolean().optional(),
    website: z.string().url(),
    tagline: z.string(),
    fees: z.object({
      fpx: z.string(), // online banking
      card: z.string(), // local credit/debit
      card_intl: z.string().optional(), // international card
      ewallet: z.string(), // GrabPay / TNG / Boost / ShopeePay
      duitnowqr: z.string(),
      bnpl: z.string().optional(), // buy-now-pay-later merchant rate
      setup: z.string(), // one-time setup fee
      monthly: z.string(), // monthly/annual platform fee
    }),
    settlement: z.string(), // e.g. "T+1"
    min_txn: z.string(),
    // "gateway" (default), "bank" (bank-run gateway), "ewallet" (e-wallet merchant
    // acceptance), "bnpl", or "infrastructure" (national rails operator, not a merchant gateway)
    category: z.enum(["gateway", "bank", "ewallet", "bnpl", "infrastructure"]).default("gateway"),
    channels: z.array(z.enum(["fpx", "card", "ewallet", "duitnowqr", "bnpl"])),
    // online-banking banks supported beyond the standard FPX set (FPX banks come from src/lib/fpx-banks.ts)
    banks: z.array(z.string()).optional(),
    // other payment methods / e-wallets (Boost, TNG eWallet, GrabPay, ShopeePay, Apple Pay, …)
    methods: z.array(z.string()).optional(),
    // editorial popularity / market presence (higher = more widely used); default order key
    popularity: z.number().default(0),
    // developer experience
    mcp: z.enum(["official", "community", "none"]).default("none"), // AI-agent MCP server
    webhooks: z.boolean().optional(), // documents webhooks/callbacks
    plugins: z.array(z.string()).optional(), // e-commerce plugins (WooCommerce, Shopify, …)
    dev_docs: z.string().url().optional(), // API documentation URL
    features: z.object({
      no_code: z.boolean(), // payment links / no-code checkout
      api: z.boolean(), // developer API
      recurring: z.boolean(), // recurring / subscription billing
    }),
    skill: z.string().optional(), // related setup-* integration skill
    verified_date: z.string(),
    source: z.string().url(),
    notes: z.string().optional(),
  }),
});

// Blog posts (spec 15): editorial layer over the same gateway data. Fee claims
// in prose stay evergreen; live numbers render from the gateways collection via
// the post template's answer box + fee table, so posts can never drift from the
// directory. Cluster slugs must exist in src/lib/blog.ts CLUSTERS.
const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(), // SERP window 30-65 (test-enforced)
    description: z.string(), // SERP window 110-160 (test-enforced)
    pubDate: z.string(), // ISO date
    updatedDate: z.string().optional(),
    cluster: z.enum(["fees-pricing", "recurring-payments", "fpx-duitnow", "ewallet-bnpl"]),
    tags: z.array(z.string()).default([]),
    // gateway slugs whose live fees render in the answer box + fee table
    gateways: z.array(z.string()).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // hero/OG image (site-relative, e.g. /blog/billplz-fees-malaysia.webp),
    // 1200x630; screenshots of our own pages, so no licensing concerns
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { gateways, posts };
