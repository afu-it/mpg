import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { BNM_ROLES } from "./lib/bnm";

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
    // published pricing plans/tiers (spec 17): only officially published plans,
    // each with its exact source URL. Generic label/value rows absorb any plan
    // shape. The top-level `fees` stay = the default/standard plan (ranking).
    plans: z
      .array(
        z.object({
          name: z.string(),
          eligibility: z.string().optional(),
          rows: z.array(z.object({ label: z.string(), value: z.string() })),
          settlement: z.string().optional(),
          source: z.string().url().optional(), // defaults to the gateway source
        }),
      )
      .optional(),
    verified_date: z.string(),
    source: z.string().url(),
    notes: z.string().optional(),
    // Bank Negara Malaysia regulatee lists (src/lib/bnm.ts). Set ONLY when an
    // official source ties this brand to the BNM-listed company (its own site,
    // terms or footer, or the BNM row naming the brand). Inferred links and
    // regulated partners do not count. Absent = not found under its own name.
    bnm: z
      .object({
        roles: z.array(z.enum(BNM_ROLES)).min(1),
        entity: z.string().min(1), // legal name exactly as BNM lists it
        checked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // date the BNM list was checked
        evidence: z.string().url(), // official page confirming brand -> entity
      })
      .optional(),
    // Reader requests (2026-10-21). Set ONLY when the gateway's own page says so,
    // quoted verbatim; absent = not stated or not allowed (never inferred).
    // no_ssm: an individual can sign up without SSM business registration.
    no_ssm: z
      .object({
        detail: z.string().min(1), // plain English, incl. limits (caps, fewer methods)
        detail_ms: z.string().min(1),
        quote: z.string().min(1), // verbatim official sentence
        source: z.string().url(),
        checked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
      .optional(),
    // instant_settlement: real-time, instant or same-day payout to the merchant's
    // bank, even if only on a plan, add-on or for some methods (say which in detail)
    instant_settlement: z
      .object({
        detail: z.string().min(1),
        detail_ms: z.string().min(1),
        quote: z.string().min(1),
        source: z.string().url(),
        checked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
      .optional(),
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

// Bahasa Malaysia text for a gateway (same filename as src/content/gateways/).
// Only the reader-facing prose is translated; fees, rails, dates and sources
// always come from the English entry, so the two languages can never disagree
// on a number. A missing file or field falls back to English.
const gatewaysMs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gateways-ms" }),
  schema: z.object({
    tagline: z.string(),
    settlement: z.string().optional(),
    min_txn: z.string().optional(),
    notes: z.string().optional(),
    // matched to the English plans by position: same count, same order
    plans: z
      .array(
        z.object({
          name: z.string().optional(),
          eligibility: z.string().optional(),
          // one label/value per English row, in order (omit value to keep the English figure)
          rows: z.array(z.object({ label: z.string(), value: z.string().optional() })).optional(),
          settlement: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Bahasa Malaysia version of a blog post (same filename as src/content/posts/).
// Dates, cluster, gateways and sources come from the English post.
const postsMs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts-ms" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { gateways, posts, gatewaysMs, postsMs };
