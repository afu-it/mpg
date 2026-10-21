// Client behaviour for the /choose wizard: step navigation, collect Needs, render shortlist.
import { recommendOrClosest, relaxedLabelMs, type Needs, type Channel } from "../lib/recommend";
import type { ApiGateway } from "../lib/api";
import { pageLocale, tr, href } from "../i18n/client";

const locale = pageLocale();
const T = tr(locale, {
  en: {
    next: "Next",
    seeResults: "See results",
    relaxed: (list: string) => `No exact match, so we relaxed: ${list}.`,
    fit: (n: number) => `${n} gateway${n === 1 ? "" : "s"} fit your needs, cheapest first.`,
    onRequest: "Pricing on request",
    logoAlt: (name: string) => `${name} logo`,
    details: "View details",
    none: "No gateways found.",
    browseAll: "Browse all",
    compare: "Compare these →",
    restart: "Start over",
  },
  ms: {
    next: "Seterusnya",
    seeResults: "Lihat hasil",
    relaxed: (list: string) => `Tiada yang betul-betul padan, jadi kami longgarkan syarat ini: ${list}.`,
    fit: (n: number) => `${n} gateway sesuai dengan keperluan anda, yang paling murah di atas.`,
    onRequest: "Harga atas permintaan",
    logoAlt: (name: string) => `Logo ${name}`,
    details: "Lihat butiran",
    none: "Tiada gateway dijumpai.",
    browseAll: "Lihat semua",
    compare: "Bandingkan semua →",
    restart: "Mula semula",
  },
});

type Row = ApiGateway & { logo: string | null };

const raw = document.getElementById("gw-data")?.textContent;
const form = document.getElementById("choose-form") as HTMLFormElement | null;
const results = document.getElementById("choose-results");
const nav = document.getElementById("choose-nav");
const nextBtn = document.getElementById("choose-next") as HTMLButtonElement | null;
const backBtn = document.getElementById("choose-back") as HTMLButtonElement | null;

if (raw && form && results && nav && nextBtn && backBtn) {
  const gateways = JSON.parse(raw) as Row[];
  const steps = Array.from(form.querySelectorAll<HTMLElement>("[data-step]"));
  let step = 0;

  function show(i: number) {
    steps.forEach((s, idx) => (s.hidden = idx !== i));
    backBtn!.hidden = i === 0;
    nextBtn!.textContent = i === steps.length - 1 ? T.seeResults : T.next;
  }

  function readNeeds(): Needs {
    const fd = new FormData(form!);
    const n: Needs = {};
    const channels = fd.getAll("channel").map(String) as Channel[];
    if (channels.length) n.channels = channels;
    if (fd.get("recurring") === "yes") n.recurring = true;
    const integration = fd.get("integration");
    if (integration === "nocode") n.noCode = true;
    if (integration === "developer") n.developer = true;
    const access = fd.get("access");
    if (access === "integrate" || access === "account" || access === "bnpl") n.access = access;
    return n;
  }

  function esc(s: string) {
    return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  }

  function render() {
    const needs = readNeeds();
    const { matches, relaxed } = recommendOrClosest(gateways as ApiGateway[], needs, 5);
    const ids = matches.map((m) => m.gateway.slug).join(",");
    const relaxedText = (locale === "ms" ? relaxed.map(relaxedLabelMs) : relaxed).join(", ");
    const note = relaxed.length
      ? `<p class="mb-3 text-sm text-muted">${esc(T.relaxed(relaxedText))}</p>`
      : `<p class="mb-3 text-sm text-muted">${esc(T.fit(matches.length))}</p>`;

    const cards = matches
      .map((m) => {
        const g = m.gateway as Row;
        const fee = g.rankable ? `RM${g.est_fee_rm100!.toFixed(2)} / RM100` : T.onRequest;
        const chips = (locale === "ms" ? m.reasonsMs : m.reasons).map((r) => `<span class="rounded-full border border-line px-2 py-0.5 text-xs text-muted">${esc(r)}</span>`).join(" ");
        const logo = g.logo ? `<img src="${esc(g.logo)}" alt="${esc(T.logoAlt(g.name))}" width="24" height="24" class="rounded" />` : "";
        return `<div class="rounded-md border border-line bg-panel p-4">
          <div class="flex items-center gap-2.5">
            ${logo}<a href="${esc(href(`/gateway/${g.slug}/`))}" class="font-medium text-fg hover:text-accent">${esc(g.name)}</a>
            <span class="ml-auto text-sm ${g.rankable ? "text-fg" : "text-muted"}">${esc(fee)}</span>
          </div>
          <div class="mt-2 flex flex-wrap gap-1.5">${chips}</div>
          <div class="mt-3 flex gap-3 text-sm">
            <a href="${esc(href(`/gateway/${g.slug}/`))}" class="text-accent hover:underline">${esc(T.details)}</a>
          </div>
        </div>`;
      })
      .join("");

    const empty = matches.length ? "" : `<p class="text-muted">${esc(T.none)} <a href="${href("/gateways/")}" class="text-accent hover:underline">${esc(T.browseAll)}</a>.</p>`;
    const compare = matches.length ? `<a href="${href("/compare/")}?ids=${encodeURIComponent(ids)}" class="text-accent hover:underline">${esc(T.compare)}</a>` : "";

    results!.innerHTML = `${note}<div class="space-y-3">${cards}</div>${empty}
      <div class="mt-5 flex gap-4 text-sm">${compare}
        <button type="button" id="choose-restart" class="text-muted hover:text-fg">${esc(T.restart)}</button>
        <a href="${href("/gateways/")}" class="text-muted hover:text-fg">${esc(T.browseAll)}</a></div>`;
    results!.hidden = false;
    document.getElementById("choose-restart")?.addEventListener("click", restart);
  }

  function restart() {
    form!.reset();
    results!.hidden = true;
    results!.innerHTML = "";
    step = 0;
    show(0);
    form!.hidden = false;
    nav!.hidden = false;
  }

  nextBtn.addEventListener("click", () => {
    if (step < steps.length - 1) {
      step++;
      show(step);
    } else {
      form!.hidden = true;
      nav!.hidden = true;
      render();
    }
  });
  backBtn.addEventListener("click", () => {
    if (step > 0) {
      step--;
      show(step);
    }
  });

  show(0);
}
