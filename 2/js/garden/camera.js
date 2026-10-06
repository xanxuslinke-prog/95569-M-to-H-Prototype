/* Garden layout and camera: pot positions, depth, zooming between the whole garden and one plant. */

const GH = 400,
  GY0 = 232,
  GY1 = 392;

const depth = (y) => 0.62 + 0.5 * Math.max(0, Math.min(1, (y - GY0) / (GY1 - GY0)));

function potBox(p) {
  const w = 120 * depth(p.y);
  const h = (w * 140) / 120;
  return { x: p.x, y: p.y, w, h };
}

function worldW() {
  return Math.max(420, ...S.plots.map((p) => p.x + 90));
}

function freeSpot() {
  for (let x = 64, k = 0; x < 6000; x += 34, k++) {
    if (S.plots.every((p) => Math.abs(p.x - x) > 74)) return { x, y: [330, 372, 296, 352][k % 4] };
  }
  return { x: 70, y: 330 };
}

function ensurePos() {
  S.plots.forEach((p) => {
    if (p.x == null) {
      const f = freeSpot();
      p.x = f.x;
      p.y = f.y;
    }
  });
}

let SCW = 360;

function camFor(mode, i) {
  const W = worldW(),
    cw = SCW;
  if (mode === "focus" && S.plots[i]) {
    const b = potBox(S.plots[i]);
    let z = Math.max(1.5, Math.min(3, 200 / b.w));
    let tx = cw / 2 - b.x * z,
      ty = GH - 28 - b.y * z;
    tx = Math.min(0, Math.max(cw - W * z, tx));
    ty = Math.min(0, Math.max(GH - GH * z, ty));
    return { tx, ty, z };
  }
  S.panX = Math.max(0, Math.min(Math.max(0, W - cw), S.panX));
  return { tx: -S.panX, ty: 0, z: 1 };
}

const camCSS = (c) => `translate(${c.tx}px,${c.ty}px) scale(${c.z})`;
