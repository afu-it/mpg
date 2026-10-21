// Client behaviour for /calculator: recompute per-gateway effective cost from
// the user's ticket size, via the same fees.ts engine the whole site uses.
// DOM is built with createElement/textContent only (no innerHTML with data).
import { parseFeeShape, effectiveCost, gatewayCost } from "../lib/fees";
import { pageLocale, tr, href } from "../i18n/client";

const T = tr(pageLocale(), {
  en: {
    mix: "FPX/card/e-wallet mix",
    blendedLabel: "a blended FPX/card/e-wallet mix (50/30/20)",
    note: (n: number, ch: string, unpriced: number, amt: string) =>
      `${n} gateways publish comparable official rates for ${ch}; ${unpriced} quote on request or publish no official figure and are not shown. Estimated cost on a RM${amt} sale.`,
  },
  ms: {
    mix: "Campuran FPX/kad/e-wallet",
    blendedLabel: "campuran FPX/kad/e-wallet (50/30/20)",
    note: (n: number, ch: string, unpriced: number, amt: string) =>
      `${n} gateway siarkan kadar rasmi untuk ${ch} yang boleh dibandingkan. ${unpriced} lagi cuma beri harga atas permintaan atau tiada angka rasmi, jadi tidak ditunjukkan. Anggaran caj bagi jualan RM${amt}.`,
  },
});

interface Row {
  slug: string;
  name: string;
  fees: Record<string, string | undefined>;
  popularity: number;
  logo: string | null;
  round: boolean;
}

type ChannelKey = "blended" | "fpx" | "card" | "ewallet" | "duitnowqr";

const raw = document.getElementById("gw-data")?.textContent;
const amountInput = document.getElementById("calc-amount") as HTMLInputElement | null;
const tbody = document.getElementById("calc-rows");
const top = document.getElementById("calc-top");
const note = document.getElementById("calc-note");
const presets = [...document.querySelectorAll<HTMLButtonElement>(".calc-preset")];
const channelInput = () => document.querySelector<HTMLInputElement>('input[name="calc-ch"]:checked');

if (raw && amountInput && tbody && top && note) {
  const gateways = JSON.parse(raw) as Row[];

  function el(tag: string, cls: string, text?: string) {
    const e = document.createElement(tag);
    e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // logo image, or a monogram chip when the provider has no logo file
  function logo(g: Row, size: number) {
    if (g.logo) {
      const img = document.createElement("img");
      img.src = g.logo;
      img.alt = "";
      img.loading = "lazy";
      img.style.height = `${size}px`;
      img.className = g.round ? "shrink-0 rounded-full object-cover" : "w-auto max-w-[96px] shrink-0 rounded-[22%] object-contain";
      if (g.round) img.style.width = `${size}px`;
      return img;
    }
    const s = el("span", "grid shrink-0 place-items-center rounded-sm bg-raised font-semibold text-accent", g.name.charAt(0).toUpperCase());
    s.style.cssText = `width:${size}px;height:${size}px;font-size:${Math.round(size * 0.48)}px`;
    s.setAttribute("aria-hidden", "true");
    return s;
  }

  function readAmount(): number {
    const v = Number.parseFloat(amountInput!.value);
    if (!Number.isFinite(v)) return 100;
    return Math.min(Math.max(v, 0.1), 1_000_000);
  }

  function render() {
    const amt = readAmount();
    const chInput = channelInput();
    const ch = (chInput?.value || "blended") as ChannelKey;

    const priced: Array<{ g: Row; cost: number; feeText: string }> = [];
    let unpriced = 0;

    for (const g of gateways) {
      if (ch === "blended") {
        const { rankable, cost } = gatewayCost(g.fees, amt);
        if (rankable) priced.push({ g, cost, feeText: "blended" });
        else unpriced++;
      } else {
        const value = g.fees[ch] ?? "";
        const shape = parseFeeShape(value);
        if (shape.known && !shape.indicative) {
          priced.push({ g, cost: effectiveCost(shape, amt), feeText: value });
        } else {
          unpriced++;
        }
      }
    }

    priced.sort((a, b) => a.cost - b.cost || b.g.popularity - a.g.popularity);

    top!.textContent = "";
    priced.slice(0, 3).forEach((row, i) => {
      const li = el("li", "");
      const a = el("a", `flex h-full flex-col gap-3 rounded-xl border bg-panel p-4 hover:border-muted ${i === 0 ? "border-accent" : "border-line"}`) as HTMLAnchorElement;
      a.href = href(`/gateway/${row.g.slug}/`);
      const head = el("span", "flex items-center gap-2");
      head.appendChild(el("span", "text-xs font-medium text-muted", `#${i + 1}`));
      head.appendChild(logo(row.g, 24));
      head.appendChild(el("span", "truncate font-semibold text-fg", row.g.name));
      a.appendChild(head);
      const cost = el("span", "text-2xl font-semibold text-fg", `RM${row.cost.toFixed(2)}`);
      cost.appendChild(el("span", "ml-1 text-xs font-normal text-muted", top!.dataset.perSale ?? ""));
      a.appendChild(cost);
      a.appendChild(el("span", "text-xs text-muted", ch === "blended" ? T.mix : row.feeText));
      li.appendChild(a);
      top!.appendChild(li);
    });

    tbody!.textContent = "";
    priced.forEach((row, i) => {
      const tr = el("tr", i === 0 ? "bg-raised" : "");
      tr.appendChild(el("td", "px-3 py-2 text-right text-muted", String(i + 1)));
      const nameTd = el("td", "px-3 py-2");
      const link = el("a", "inline-flex items-center gap-2 text-fg hover:underline") as HTMLAnchorElement;
      link.appendChild(logo(row.g, 18));
      link.appendChild(document.createTextNode(row.g.name));
      link.href = href(`/gateway/${row.g.slug}/`);
      nameTd.appendChild(link);
      tr.appendChild(nameTd);
      tr.appendChild(
        el("td", "px-3 py-2 text-muted", ch === "blended" ? T.mix : row.feeText),
      );
      tr.appendChild(el("td", "px-3 py-2 text-right font-medium text-fg", `RM${row.cost.toFixed(2)}`));
      tr.appendChild(el("td", "hidden px-3 py-2 text-right text-muted sm:table-cell", `${((row.cost / amt) * 100).toFixed(2)}%`));
      tbody!.appendChild(tr);
    });

    const chLabel = ch === "blended" ? T.blendedLabel : (chInput?.dataset.label ?? ch);
    note!.textContent = T.note(priced.length, chLabel, unpriced, amt.toFixed(2));
  }

  const syncPresets = () =>
    presets.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.amount) === readAmount())));
  amountInput.addEventListener("input", () => {
    syncPresets();
    render();
  });
  presets.forEach((b) =>
    b.addEventListener("click", () => {
      amountInput.value = b.dataset.amount ?? "100";
      syncPresets();
      render();
    }),
  );
  document.querySelectorAll('input[name="calc-ch"]').forEach((r) => r.addEventListener("change", render));
  render();
}
