// Footer ASCII wake (vanilla port of 21st.dev "background-ascii-wake" by
// nikolas-sapa). A faint, seeded scatter of monospace glyphs sits behind the
// footer; the pointer stamps "heat" into the cells it crosses and each cell
// decays back to the ambient floor. Fast passes leave thin, quick-fading
// trails; slow passes leave fat, lingering blobs. The rAF loop only runs while
// some cell is still warm, so an idle footer costs nothing.

const RAMP = " .:-=+*#%@";
const CELL = 12;

// deterministic PRNG so the ambient scatter is stable within a session
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const canvas = document.getElementById("footer-wake") as HTMLCanvasElement | null;
const host = canvas?.parentElement;
const ctx = canvas?.getContext("2d");

if (canvas && host && ctx) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fg = getComputedStyle(canvas).color;

  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let heat = new Float32Array(0);
  let rate = new Float32Array(0);
  let ambient = new Float32Array(0);
  let raf = 0;
  let last = 0;
  const pointer = { x: 0, y: 0, t: 0, has: false };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ({ width, height } = canvas.getBoundingClientRect());
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${CELL * 0.85}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    cols = Math.max(1, Math.ceil(width / CELL));
    rows = Math.max(1, Math.ceil(height / CELL));
    const n = cols * rows;
    heat = new Float32Array(n);
    rate = new Float32Array(n).fill(1.4);
    ambient = new Float32Array(n);
    const rand = mulberry32(0xa53f9c1 ^ (cols * 71 + rows));
    for (let i = 0; i < n; i++) {
      if (rand() < 0.035) ambient[i] = 0.08 + rand() * 0.14;
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = fg;
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const idx = gy * cols + gx;
        const lum = Math.max(ambient[idx], heat[idx]);
        if (lum <= 0.03) continue;
        const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(lum * (RAMP.length - 1)))];
        if (ch === " ") continue;
        ctx.globalAlpha = Math.min(1, 0.15 + lum * 0.85);
        ctx.fillText(ch, gx * CELL + CELL / 2, gy * CELL + CELL / 2);
      }
    }
    ctx.globalAlpha = 1;
  };

  // soft circular blot of heat around a point, recording this pass's decay rate
  const stamp = (px: number, py: number, radius: number, decay: number) => {
    const cx = px / CELL;
    const cy = py / CELL;
    const r = Math.max(0.6, radius);
    for (let gy = Math.max(0, Math.floor(cy - r)); gy <= Math.min(rows - 1, Math.ceil(cy + r)); gy++) {
      for (let gx = Math.max(0, Math.floor(cx - r)); gx <= Math.min(cols - 1, Math.ceil(cx + r)); gx++) {
        const d = Math.hypot(gx + 0.5 - cx, gy + 0.5 - cy);
        if (d > r) continue;
        const falloff = 1 - d / r;
        const idx = gy * cols + gx;
        if (falloff > heat[idx]) {
          heat[idx] = falloff;
          rate[idx] = decay;
        }
      }
    }
  };

  const loop = (now: number) => {
    const dt = last ? Math.min(64, now - last) / 1000 : 1 / 60;
    last = now;
    let warm = false;
    for (let i = 0; i < heat.length; i++) {
      if (heat[i] > 0) {
        heat[i] = Math.max(0, heat[i] - rate[i] * dt);
        if (heat[i] > 0) warm = true;
      }
    }
    draw();
    if (warm) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = 0;
      last = 0;
    }
  };

  const wake = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  // listen on the footer itself: the canvas sits behind the links
  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    if (pointer.has) {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      const speed = dist / Math.max(1, now - pointer.t); // px/ms
      const radius = Math.max(0.6, Math.min(2.6, 2.4 / (1 + speed * 1.6)));
      const decay = Math.max(0.8, Math.min(4.5, 1.0 + speed * 3.2));
      // sample along the path so a fast pass doesn't leave gaps between frames
      const steps = Math.max(1, Math.ceil(dist / (CELL * 0.5)));
      for (let s = 1; s <= steps; s++) {
        stamp(pointer.x + (dx * s) / steps, pointer.y + (dy * s) / steps, radius, decay);
      }
    } else {
      stamp(x, y, 1.4, 1.4);
    }
    pointer.x = x;
    pointer.y = y;
    pointer.t = now;
    pointer.has = true;
    wake();
  };

  resize();
  draw();
  if (!reduced) {
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", () => {
      pointer.has = false;
    });
  }

  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      draw();
    }, 150);
  });
}
