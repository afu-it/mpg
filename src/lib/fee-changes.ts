// Fee-change log (spec 12 item 4): human-curated, sourced observations from
// fee audits. APPEND a new entry whenever an audit finds a provider changed,
// published or de-published an official figure; never edit history. Every
// entry must reflect a fact verified against the provider's official pages on
// the observed date (the gateway file carries the source URL). No guesses.

export type ChangeKind = "increase" | "decrease" | "published" | "unpublished" | "correction" | "listing";

export interface FeeChange {
  /** date our audit verified the change on official pages (YYYY-MM-DD) */
  observed: string;
  /** gateway slug (matches /gateway/<slug>) or null for directory-level news */
  slug: string | null;
  name: string;
  kind: ChangeKind;
  /** one-sentence, data-true description; no em-dashes */
  what: string;
}

export const FEE_CHANGES: FeeChange[] = [
  {
    observed: "2026-07-02",
    slug: "xendit",
    name: "Xendit Malaysia",
    kind: "increase",
    what: "Repriced: a flat RM0.90 now stacks on every method fee, and the full rate card is officially published (previously third-party figures).",
  },
  {
    observed: "2026-07-02",
    slug: "toyyibpay",
    name: "toyyibPay",
    kind: "published",
    what: "Now publishes card 1.5% (foreign 3.5%) and DuitNow QR 1% or RM1, joining FPX RM1.00; enough official coverage to enter the ranking near the top.",
  },
  {
    observed: "2026-07-02",
    slug: "spaylater",
    name: "SPayLater",
    kind: "increase",
    what: "The 3-month tenure merchant rate rises to 5% effective 1 February 2026, per the official seller notice.",
  },
  {
    observed: "2026-07-02",
    slug: "swif",
    name: "SwiF",
    kind: "published",
    what: "Published a full 4-tier rate card covering FPX, cards and e-wallets on its official pricing page.",
  },
  {
    observed: "2026-07-02",
    slug: "hitpay",
    name: "HitPay",
    kind: "published",
    what: "Per-wallet and BNPL rates are now on the official pricing page, and settlement is T+2 to T+3 (previously understood as faster).",
  },
  {
    observed: "2026-07-02",
    slug: "fiuu",
    name: "Fiuu",
    kind: "published",
    what: "DuitNow QR 1% and the RM99 signup fee are now stated on official pages.",
  },
  {
    observed: "2026-07-02",
    slug: "billplz",
    name: "Billplz",
    kind: "published",
    what: "DuitNow QR at 1.5% added to the official rate card.",
  },
  {
    observed: "2026-07-02",
    slug: "chip",
    name: "CHIP",
    kind: "published",
    what: "DuitNow QR 1% (minimum RM0.15) and Atome BNPL 5.3% published officially.",
  },
  {
    observed: "2026-07-02",
    slug: "kiple",
    name: "Kiple",
    kind: "published",
    what: "DuitNow QR 1.2% published on the official site.",
  },
  {
    observed: "2026-07-02",
    slug: "tng-ewallet",
    name: "TNG eWallet",
    kind: "published",
    what: "Merchant signup confirmed free on official merchant pages.",
  },
  {
    observed: "2026-07-02",
    slug: "stripe-malaysia",
    name: "Stripe Malaysia",
    kind: "published",
    what: "A RM2 minimum charge amount is documented officially.",
  },
  {
    observed: "2026-07-02",
    slug: "curlec",
    name: "Curlec by Razorpay",
    kind: "correction",
    what: "T+2 settlement confirmed on official documentation (previously a third-party figure).",
  },
  {
    observed: "2026-07-02",
    slug: "riipay",
    name: "Riipay",
    kind: "unpublished",
    what: "Previously published rates (2.5%, T+7) are no longer on the official site; fees now shown as Contact sales.",
  },
  {
    observed: "2026-07-02",
    slug: "gkash",
    name: "Gkash",
    kind: "unpublished",
    what: "Setup and annual fees no longer published officially; downgraded to Contact sales.",
  },
  {
    observed: "2026-07-02",
    slug: "bcl",
    name: "BCL Pay",
    kind: "unpublished",
    what: "Setup fee and T+1 settlement no longer stated officially; downgraded to Contact sales.",
  },
  {
    observed: "2026-07-02",
    slug: "securepay",
    name: "SecurePay",
    kind: "unpublished",
    what: "Rates removed from the official site; fees now shown as Contact sales.",
  },
  {
    observed: "2026-07-02",
    slug: "gomobi",
    name: "Mobi (formerly gomobi)",
    kind: "correction",
    what: "Rebranded from gomobi to Mobi (mobi.xyz); same provider, updated identity.",
  },
  {
    observed: "2026-07-02",
    slug: "betterpay",
    name: "BetterPay",
    kind: "listing",
    what: "Added to the directory with a fully published rate card; enters the fee ranking on official rates.",
  },
];

export const KIND_LABEL: Record<ChangeKind, string> = {
  increase: "Fee increase",
  decrease: "Fee decrease",
  published: "Rates published",
  unpublished: "Rates withdrawn",
  correction: "Correction",
  listing: "New listing",
};
