// How a merchant actually gets onto a provider. Two broad paths:
//  - "integrate": developer self-serve. Sign up, get API keys, drop in a plugin.
//  - "account": apply for a business/merchant account first (banks, e-wallets).
// Derived from the entry's category so it stays in sync with no per-entry data.
export type AccessKey = "integrate" | "account" | "infrastructure";

export interface AccessInfo {
  key: AccessKey;
  short: string;
  hint: string;
}

export function accessInfo(category: string): AccessInfo {
  switch (category) {
    case "bank":
      return {
        key: "account",
        short: "Merchant account",
        hint: "Apply for a business/merchant account with the bank, then integrate its hosted payment gateway.",
      };
    case "ewallet":
      return {
        key: "account",
        short: "Merchant account",
        hint: "Register as a merchant to accept the e-wallet and DuitNow QR payments.",
      };
    case "infrastructure":
      return {
        key: "infrastructure",
        short: "Infrastructure",
        hint: "Shared national rails behind FPX and DuitNow. You connect through a gateway, not directly.",
      };
    case "bnpl":
      return {
        key: "integrate",
        short: "Integrate",
        hint: "Add it at checkout through its merchant integration, or via a gateway that bundles it.",
      };
    default:
      return {
        key: "integrate",
        short: "Integrate",
        hint: "Sign up, get API keys, then integrate via the API/SDK or a CMS plugin (WooCommerce, Shopify and more).",
      };
  }
}
