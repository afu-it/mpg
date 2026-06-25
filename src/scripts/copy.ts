// Generic copy-to-clipboard for any element with `data-copy="<text>"`.
// On click, copies the text and briefly swaps the element's label to "Copied!".
// Used by the per-gateway "Copy prompt" button and /learn install commands.

function flash(el: HTMLElement, done: string) {
  const label = el.querySelector<HTMLElement>("[data-copy-label]") ?? el;
  const original = label.textContent;
  label.textContent = done;
  window.setTimeout(() => {
    label.textContent = original;
  }, 1500);
}

document.addEventListener("click", async (e) => {
  const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-copy]");
  if (!target) return;
  const text = target.getAttribute("data-copy");
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    flash(target, "Copied!");
  } catch {
    flash(target, "Copy failed");
  }
});
