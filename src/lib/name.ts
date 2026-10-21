/**
 * Split a display name into its base and a trailing parenthetical note,
 * e.g. "Fiuu (formerly Razer Merchant Services)" -> { base: "Fiuu", note: "(formerly Razer Merchant Services)" }.
 * Names without a parenthetical return an empty note.
 */
export function splitName(name: string): { base: string; note: string } {
  const m = name.match(/^(.+?)\s+(\(.+\).*)$/);
  if (m) return { base: m[1], note: m[2] };
  return { base: name, note: "" };
}

/**
 * Drop every "(...)" aside from a table cell value, e.g.
 * "RM1.00 (B2C), RM1.50 (B2B)" -> "RM1.00, RM1.50". The full text stays on the
 * gateway detail page; the comparison table shows only the figure.
 */
export function stripParens(value: string): string {
  const out = value
    .replace(/\s*\([^()]*\)/g, "")
    .replace(/\s+([,;])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
  return out || value;
}
