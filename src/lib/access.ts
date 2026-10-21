// How a merchant actually gets onto a provider. Two broad paths:
//  - "integrate": developer self-serve. Sign up, get API keys, drop in a plugin.
//  - "account": apply for a business/merchant account first (banks, e-wallets).
// Derived from the entry's category so it stays in sync with no per-entry data.
// `locale` only changes the reader-facing words; the key is the same in both.
import type { Locale } from "../i18n/locale";

export type AccessKey = "integrate" | "account" | "infrastructure";

export interface AccessInfo {
  key: AccessKey;
  short: string;
  hint: string;
}

type Text = { short: string; hint: string };

const TEXT: Record<"bank" | "ewallet" | "infrastructure" | "bnpl" | "default", { en: Text; ms: Text }> = {
  bank: {
    en: {
      short: "Merchant account",
      hint: "Apply for a business/merchant account with the bank, then integrate its hosted payment gateway.",
    },
    ms: {
      short: "Akaun peniaga",
      hint: "Mohon akaun peniaga (akaun bisnes) dengan bank dulu, kemudian pasang payment gateway bank itu di laman anda.",
    },
  },
  ewallet: {
    en: {
      short: "Merchant account",
      hint: "Register as a merchant to accept the e-wallet and DuitNow QR payments.",
    },
    ms: {
      short: "Akaun peniaga",
      hint: "Daftar sebagai peniaga untuk terima bayaran e-wallet dan DuitNow QR.",
    },
  },
  infrastructure: {
    en: {
      short: "Infrastructure",
      hint: "Shared national rails behind FPX and DuitNow. You connect through a gateway, not directly.",
    },
    ms: {
      short: "Infrastruktur",
      hint: "Rangkaian bayaran negara di sebalik FPX dan DuitNow. Anda sambung melalui payment gateway, bukan terus.",
    },
  },
  bnpl: {
    en: {
      short: "Integrate",
      hint: "Add it at checkout through its merchant integration, or via a gateway that bundles it.",
    },
    ms: {
      short: "Integrasi",
      hint: "Pasang di checkout (halaman bayar) melalui integrasi peniaga mereka sendiri, atau guna payment gateway yang sudah ada BNPL ini.",
    },
  },
  default: {
    en: {
      short: "Integrate",
      hint: "Sign up, get API keys, then integrate via the API/SDK or a CMS plugin (WooCommerce, Shopify and more).",
    },
    ms: {
      short: "Integrasi",
      hint: "Daftar, dapatkan API key, kemudian integrasi melalui API/SDK atau plugin CMS (WooCommerce, Shopify dan lain-lain).",
    },
  },
};

const KEY: Record<keyof typeof TEXT, AccessKey> = {
  bank: "account",
  ewallet: "account",
  infrastructure: "infrastructure",
  bnpl: "integrate",
  default: "integrate",
};

export function accessInfo(category: string, locale: Locale = "en"): AccessInfo {
  const k = (category in TEXT && category !== "default" ? category : "default") as keyof typeof TEXT;
  return { key: KEY[k], ...TEXT[k][locale] };
}
