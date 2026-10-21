// Maps payment-method and plugin names (as written in gateway frontmatter) to an
// official brand mark. "brands/x" = src/assets/brands/x.svg (simple-icons, CC0);
// "logos/x" = an existing provider logo in src/assets/logos. Names with no entry
// (generic ones like "Hosted checkout") stay as text chips.

const BRAND_BY_NAME: Record<string, string> = {
  // cards
  visa: "brands/visa",
  mastercard: "brands/mastercard",
  "american express": "brands/americanexpress",
  jcb: "brands/jcb",
  unionpay: "brands/unionpay",
  mydebit: "brands/mydebit",
  // wallets and QR
  "touch 'n go ewallet": "logos/tng-ewallet",
  boost: "logos/boost",
  "boost ewallet": "logos/boost",
  "boost payflex": "logos/boost",
  grabpay: "brands/grabpay",
  shopeepay: "logos/shopeepay-gateway",
  alipay: "brands/alipay",
  "alipay+": "brands/alipay",
  "alipay+ network": "brands/alipay",
  "wechat pay": "brands/wechat",
  "apple pay": "brands/applepay",
  "google pay": "brands/googlepay",
  kakaopay: "brands/kakaotalk",
  "duitnow qr": "brands/duitnow",
  duitnow: "brands/duitnow",
  "duitnow qr (qrpaybiz)": "brands/duitnow",
  "maybank qrpay": "logos/maybank2u-pay",
  "maybank2u qr": "logos/maybank2u-pay",
  mae: "logos/maybank2u-pay",
  "online banking (maybank account debit)": "logos/maybank2u-pay",
  kiplepay: "logos/kiple",
  // bank transfer
  fpx: "brands/fpx",
  "fpx online banking": "brands/fpx",
  jompay: "brands/jompay",
  // BNPL
  atome: "logos/atome",
  spaylater: "brands/spaylater",
  "paylater by grab": "logos/grab-paylater",
  "pay later by grab": "logos/grab-paylater",
  "grabpay later": "logos/grab-paylater",
  mobypay: "logos/moby",
  klarna: "brands/klarna",
  // e-commerce plugins
  woocommerce: "brands/woocommerce",
  shopify: "brands/shopify",
  prestashop: "brands/prestashop",
  opencart: "brands/opencart",
  magento: "brands/magento",
  whmcs: "brands/whmcs",
  easystore: "brands/easystore",
  wix: "brands/wix",
  bigcommerce: "brands/bigcommerce",
  wordpress: "brands/wordpress",
};

// dark marks that vanish on the dark theme; only these sit on a white tile
const NEEDS_LIGHT_TILE = new Set([
  "brands/visa",
  "brands/americanexpress",
  "brands/jcb",
  "brands/fpx",
  "brands/duitnow",
  "brands/mydebit",
  "brands/jompay",
  "brands/whmcs",
  "brands/applepay",
  "brands/wix",
  "brands/bigcommerce",
]);

export function needsLightTile(key: string): boolean {
  return NEEDS_LIGHT_TILE.has(key);
}

/** asset key ("brands/visa", "logos/boost") for a method or plugin name, or null */
export function brandKey(name: string): string | null {
  return BRAND_BY_NAME[name.trim().toLowerCase()] ?? null;
}
