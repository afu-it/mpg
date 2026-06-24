/**
 * Turn a human fee string into a comparable number for sorting.
 *
 * Strategy: prefer the percentage if present (the variable part of most fees),
 * else the ringgit amount, else Infinity so unknown/"Contact sales"/"—" sort last.
 * This is a sortable proxy, not a true cost calculation.
 */
export function parseFee(value: string): number {
  if (!value) return Infinity;
  const pct = value.match(/([\d.]+)\s*%/);
  if (pct) return parseFloat(pct[1]);
  const rm = value.match(/RM\s*([\d.]+)/i);
  if (rm) return parseFloat(rm[1]);
  return Infinity; // "Contact sales", "—", or anything unparseable → sort last
}

/** Array-sort comparator (ascending; unknown values sink to the bottom). */
export function compareFee(a: string, b: string): number {
  return parseFee(a) - parseFee(b);
}
