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
