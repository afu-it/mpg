// Bank Negara Malaysia (BNM) regulatee lists: which gateways appear on them
// under their own legal entity. Data lives in each gateway's `bnm` field and is
// only set when an official source ties the brand to the BNM-listed company.
// We link to BNM's public directory pages and never use BNM's crest or logo:
// a listing is a regulatory status, not an endorsement.

import { formatDate, type Locale } from "../i18n/locale";

export const BNM_ROLES = ["merchant-acquirer", "emoney-issuer", "bank", "payment-system-operator"] as const;
export type BnmRole = (typeof BNM_ROLES)[number];

export interface BnmListing {
  roles: BnmRole[];
  entity: string; // legal name exactly as BNM lists it
  checked: string; // ISO date the BNM list was checked
  evidence: string; // official page tying the brand to that entity
}

const DIRECTORY =
  "https://www.bnm.gov.my/regulations/fsp-directory?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_jXC730NRlqU0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_tag=";

/** BNM FSP directory page that lists each role. Banks link to the bank merchant-acquirer list, where they appear. */
export const BNM_LIST_URL: Record<BnmRole, string> = {
  "merchant-acquirer": `${DIRECTORY}merchant-acquirer-nonbank`,
  "emoney-issuer": `${DIRECTORY}nonbank-emoney-issuer`,
  bank: `${DIRECTORY}merchant-acquirer`,
  "payment-system-operator": `${DIRECTORY}approved-payment-system-operator`,
};

// "registered" for merchant acquirers, "approved" for e-money issuers and
// payment system operators, "licensed" for banks: BNM's own wording.
const ROLE_LABEL: Record<Locale, Record<BnmRole, string>> = {
  en: {
    "merchant-acquirer": "Registered merchant acquirer (non-bank)",
    "emoney-issuer": "Approved e-money issuer (non-bank)",
    bank: "Licensed bank",
    "payment-system-operator": "Approved payment system operator",
  },
  ms: {
    "merchant-acquirer": "Merchant acquirer berdaftar (bukan bank): boleh terima bayaran untuk peniaga",
    "emoney-issuer": "Pengeluar e-wallet yang diluluskan (bukan bank)",
    bank: "Bank berlesen",
    "payment-system-operator": "Pengendali sistem pembayaran yang diluluskan",
  },
};

export function bnmRoleLabel(role: BnmRole, locale: Locale): string {
  return ROLE_LABEL[locale][role];
}

/** Short badge text, the tooltip/aria text and the BNM list to link to. */
export function bnmBadge(bnm: BnmListing, locale: Locale): { text: string; title: string; href: string } {
  const roles = bnm.roles.map((r) => bnmRoleLabel(r, locale)).join(" · ");
  const date = formatDate(bnm.checked, locale);
  return locale === "ms"
    ? { text: "Dalam senarai BNM", title: `${roles} · Bank Negara Malaysia, disemak ${date}`, href: BNM_LIST_URL[bnm.roles[0]] }
    : { text: "On BNM register", title: `${roles} · Bank Negara Malaysia, checked ${date}`, href: BNM_LIST_URL[bnm.roles[0]] };
}
