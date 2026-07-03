// Settlement-speed parsing (spec 12 item 6): turn the free-text official
// settlement strings into a comparable worst-case business-day count.
// Conservative on purpose: a range or multi-channel string ranks by its
// SLOWEST stated leg, so a provider can never rank faster than it promises.
// Returns null (excluded from ranking) for third-party figures (trailing *),
// "Contact sales", "—" and qualitative strings with no day count.

export function parseSettlementDays(value: string): number | null {
  const v = value.trim();
  if (!v || v === "—" || /contact sales/i.test(v)) return null;
  if (v.includes("*")) return null; // third-party/indicative: not official

  const days: number[] = [];

  // T+n (T+1, W+4), possibly several across channels or ranges
  for (const m of v.matchAll(/[TW]\s*\+\s*(\d+)/gi)) days.push(Number(m[1]));

  // "1-4 business days", "1 to 2 business days", "within 5 working days"
  for (const m of v.matchAll(/(\d+)(?:\s*(?:-|–|to)\s*(\d+))?\s*(?:business|working)\s+days?/gi)) {
    days.push(Number(m[2] ?? m[1]));
  }

  if (/next business day/i.test(v)) days.push(1);
  if (/same day|instant/i.test(v) && days.length === 0) days.push(0);

  // weekly cycles: worst wait is a full cycle; "3x weekly" roughly every 2-3
  // business days, count the slowest gap
  if (/weekly/i.test(v)) days.push(/\d+\s*x\s*weekly/i.test(v) ? 3 : 7);

  if (days.length === 0) return null;
  return Math.max(...days);
}
