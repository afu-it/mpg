/**
 * Fee math for the gateway directory.
 *
 * A fee string like "1.2% + RM1.00" or "RM1.00" or "1.5% / RM1.00" is parsed
 * into structured components, then turned into a real ringgit COST for a given
 * transaction size. This avoids the old trap of averaging a flat ringgit fee
 * and a percentage together as if they shared a unit.
 *
 *   cost(ticket) = max(ticket * pct/100, floor) + fixed
 *
 * Unknown ("Contact sales", "—") and indicative ("* ") values are handled
 * explicitly so they can be excluded from a trustworthy ranking.
 */

export interface FeeShape {
  /** percentage component, e.g. 2.0 for "2%". Range strings use the midpoint. */
  pct: number;
  /** additive flat ringgit, e.g. the RM1.00 in "1.2% + RM1.00". */
  fixed: number;
  /** minimum charge / "whichever greater" floor, e.g. RM1.00 in "1.5% / RM1.00". */
  floor: number;
  /** false for "Contact sales", "—", "", or anything unparseable. */
  known: boolean;
  /** true when the source string carries a trailing "*" (third-party/indicative). */
  indicative: boolean;
}

const UNKNOWN: FeeShape = { pct: 0, fixed: 0, floor: 0, known: false, indicative: false };

/** Representative ticket size (RM) used for the headline blended cost. */
export const REF_TICKET = 100;

/** Channel weights for the blended gateway cost (FPX-dominant Malaysian SME mix). */
export const CHANNEL_WEIGHTS = { fpx: 0.5, card: 0.3, ewallet: 0.2 } as const;

/** Parse a human fee string into structured {pct, fixed, floor, known, indicative}. */
export function parseFeeShape(value: string): FeeShape {
  if (!value) return { ...UNKNOWN };
  let s = value.trim();
  if (!s) return { ...UNKNOWN };

  // indicative marker: trailing "*"
  const indicative = /\*/.test(s);
  s = s.replace(/\*/g, " ").trim();

  // not offered / unpublished / quote-only
  if (/contact|quote|n\/a/i.test(s) || s === "—" || s === "-") return { ...UNKNOWN };

  // percentage: a range "a% – b%" uses the midpoint; else the first percentage.
  let pct = 0;
  const range = s.match(/([\d.]+)\s*%\s*[-–—]\s*([\d.]+)\s*%/);
  if (range) {
    pct = (parseFloat(range[1]) + parseFloat(range[2])) / 2;
  } else {
    const pctMatch = s.match(/([\d.]+)\s*%/);
    if (pctMatch) pct = parseFloat(pctMatch[1]);
  }

  let fixed = 0;
  let floor = 0;

  if (pct > 0) {
    // additive flat: "+ RMx" or "RMx +"
    const additive = s.match(/\+\s*RM\s*([\d.]+)/i) || s.match(/RM\s*([\d.]+)\s*\+/i);
    // floor ("whichever greater" / min): "/ RMx", "or RMx", "min RMx"
    const floorMatch = s.match(/(?:\/|\bor\b|\bmin\b)\s*RM\s*([\d.]+)/i);
    if (additive) fixed = parseFloat(additive[1]);
    else if (floorMatch) floor = parseFloat(floorMatch[1]);
  } else {
    // no percentage -> a flat ringgit fee; take the FIRST RM amount (B2C / lower tier)
    const rm = s.match(/RM\s*([\d.]+)/i);
    if (!rm) return { ...UNKNOWN };
    fixed = parseFloat(rm[1]);
  }

  return { pct, fixed, floor, known: true, indicative };
}

/** Real ringgit cost of a single channel for a transaction of `ticket` size. */
export function effectiveCost(shape: FeeShape, ticket: number): number {
  if (!shape.known) return Infinity;
  const pctCost = (ticket * shape.pct) / 100;
  return Math.max(pctCost, shape.floor) + shape.fixed;
}

/** Parse and compute the effective ringgit cost in one call. */
export function effectiveCostAt(value: string, ticket: number): number {
  return effectiveCost(parseFeeShape(value), ticket);
}

/**
 * Blended, weighted ringgit cost for a gateway on a reference ticket, with
 * eligibility gating: a gateway is only `rankable` when it publishes official
 * (non-indicative) rates for FPX + at least one of card/e-wallet, OR for both
 * card and e-wallet. Single-channel, indicative-only, and "Contact sales"
 * gateways are not rankable (cost = Infinity) so they never lead a fee ranking.
 */
export function gatewayCost(
  fees: { fpx?: string; card?: string; ewallet?: string },
  ticket: number = REF_TICKET,
): { rankable: boolean; cost: number } {
  const fpx = parseFeeShape(fees.fpx ?? "");
  const card = parseFeeShape(fees.card ?? "");
  const ewallet = parseFeeShape(fees.ewallet ?? "");
  const ok = (s: FeeShape) => s.known && !s.indicative;
  const fpxOk = ok(fpx);
  const cardOk = ok(card);
  const ewOk = ok(ewallet);

  const eligible = (fpxOk && (cardOk || ewOk)) || (cardOk && ewOk);
  if (!eligible) return { rankable: false, cost: Infinity };

  let weight = 0;
  let weighted = 0;
  if (fpxOk) { weight += CHANNEL_WEIGHTS.fpx; weighted += CHANNEL_WEIGHTS.fpx * effectiveCost(fpx, ticket); }
  if (cardOk) { weight += CHANNEL_WEIGHTS.card; weighted += CHANNEL_WEIGHTS.card * effectiveCost(card, ticket); }
  if (ewOk) { weight += CHANNEL_WEIGHTS.ewallet; weighted += CHANNEL_WEIGHTS.ewallet * effectiveCost(ewallet, ticket); }

  return { rankable: true, cost: weighted / weight };
}
