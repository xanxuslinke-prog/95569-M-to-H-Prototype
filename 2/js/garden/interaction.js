/* Garden touch handling: drag to look around, tap to zoom in, hold to pick up and move a pot. */

function bindGarden() {
  const sc = document.getElementById("gscene"),
    w = document.getElementById("gworld");
  if (!sc || !w) return;
  SCW = sc.clientWidth || SCW;
  const mode = sc.classList.contains("focus") ? "focus" : "all";
  let cam = camFor(mode, S.focus);
  w.style.transform = camCSS(cam);
  placeFx();
  function placeFx() {
    const fx = document.getElementById("gfx");
    if (!fx) return;
    if (mode !== "focus" || !S.fx || !S.plots[S.focus]) {
      fx.innerHTML = "";
      return;
    }
    const b = potBox(S.plots[S.focus]),
      k = (b.w * cam.z) / 210;
    const cx = cam.tx + b.x * cam.z,
      top = cam.ty + (b.y - b.h) * cam.z - 61 * k;
    fx.innerHTML = `<div style="position:absolute;left:${cx - 150 * k}px;top:${top}px;width:${300 * k}px;height:${300 * k}px">${fxSVG(S.fx)}</div>`;
  }
  let st = null,
    raf = null;
  const toWorld = (e) => {
    const r = sc.getBoundingClientRect();
    return { x: (e.clientX - r.left - cam.tx) / cam.z, y: (e.clientY - r.top - cam.ty) / cam.z };
  };
  sc.onpointerdown = (e) => {
    if (e.target.closest(".gfab,.gmode,.gempty")) return;
    cancelAnimationFrame(raf);
    const el = e.target.closest(".gpot");
    st = {
      x: e.clientX,
      y: e.clientY,
      pan: S.panX,
      el,
      mode: "idle",
      lx: e.clientX,
      lt: performance.now(),
      v: 0,
    };
    try {
      sc.setPointerCapture(e.pointerId);
    } catch (_) {}
    if (el && mode === "all") {
      st.timer = setTimeout(() => {
        if (st && st.mode === "idle") {
          st.mode = "lift";
          el.classList.add("lift");
          sc.classList.add("lifting");
          if (navigator.vibrate)
            try {
              navigator.vibrate(15);
            } catch (_) {}
        }
      }, 360);
    }
  };
  sc.onpointermove = (e) => {
    if (!st) return;
    const dx = e.clientX - st.x,
      dy = e.clientY - st.y;
    if (st.mode === "idle" && Math.hypot(dx, dy) > 7) {
      clearTimeout(st.timer);
      st.mode = mode === "all" ? "pan" : "none";
      if (st.mode === "pan") sc.classList.add("panning");
    }
    if (st.mode === "pan") {
      S.panX = st.pan - dx;
      cam = camFor("all");
      w.style.transform = camCSS(cam);
      const now = performance.now();
      st.v = (e.clientX - st.lx) / Math.max(1, now - st.lt);
      st.lx = e.clientX;
      st.lt = now;
    } else if (st.mode === "lift") {
      const r = sc.getBoundingClientRect();
      if (e.clientX < r.left + 40) {
        S.panX -= 6;
        cam = camFor("all");
        w.style.transform = camCSS(cam);
      } else if (e.clientX > r.right - 40) {
        S.panX += 6;
        cam = camFor("all");
        w.style.transform = camCSS(cam);
      }
      const pt = toWorld(e),
        p = S.plots[+st.el.dataset.i];
      p.x = Math.max(40, Math.min(worldW() + 40, pt.x));
      p.y = Math.max(GY0, Math.min(GY1, pt.y + potBox(p).h * 0.3));
      const b = potBox(p);
      Object.assign(st.el.style, {
        left: b.x - b.w / 2 + "px",
        top: b.y - b.h + "px",
        width: b.w + "px",
        zIndex: 999,
      });
    }
  };
  const end = (e) => {
    if (!st) return;
    clearTimeout(st.timer);
    sc.classList.remove("panning", "lifting");
    const s0 = st;
    st = null;
    if (s0.mode === "pan") {
      let v = -s0.v * 16;
      const step = () => {
        if (Math.abs(v) < 0.4) return;
        S.panX += v;
        cam = camFor("all");
        w.style.transform = camCSS(cam);
        v *= 0.92;
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return;
    }
    if (s0.mode === "lift") {
      toast("Moved " + SEEDS[S.plots[+s0.el.dataset.i].seed].name);
      render();
      return;
    }
    if (e.type === "pointercancel" || s0.mode !== "idle" || !s0.el) return;
    const i = +s0.el.dataset.i;
    if (mode === "focus" && i === S.focus) return;
    flyTo("focus", i);
  };
  sc.onpointerup = end;
  sc.onpointercancel = end;
  sc.onkeydown = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest(".gpot");
    if (!el) return;
    e.preventDefault();
    flyTo("focus", +el.dataset.i);
  };
}

/* smooth camera move, then swap the panel underneath */
let flying = false;

function flyTo(mode, i) {
  const sc = document.getElementById("gscene"),
    w = document.getElementById("gworld");
  if (!sc || !w || flying || S.fx) return;
  if (mode === "all" && S.plots[S.focus]) {
    const b = potBox(S.plots[S.focus]);
    S.panX = b.x - SCW / 2;
  }
  const target = camFor(mode, i);
  flying = true;
  sc.classList.add("flying");
  sc.classList.toggle("to-all", mode === "all");
  sc.querySelectorAll(".gpot").forEach((el) => {
    const j = +el.dataset.i;
    el.classList.toggle("dim", mode === "focus" && j !== i);
    el.classList.toggle("focused", mode === "focus" && j === i);
  });
  w.classList.add("cam");
  w.style.transform = camCSS(target);
  const panel = app.querySelector(".gpanel");
  if (panel) panel.classList.add("fadeout");
  setTimeout(() => {
    flying = false;
    S.gview = mode;
    if (mode === "focus") S.focus = i;
    render();
    const np = app.querySelector(".gpanel");
    if (np) np.classList.add("fadein");
  }, 620);
}
