/* Event listeners: taps, press-and-hold, typing, Enter key, file uploads. */

let holdT = null,
  holdI = null,
  held = false;

const stopHold = () => {
  clearTimeout(holdT);
  clearInterval(holdI);
  holdT = holdI = null;
};

document.addEventListener("pointerdown", (e) => {
  const el = e.target.closest("[data-hold]");
  if (!el || el.disabled) return;
  const a = el.dataset.a,
    v = el.dataset.v;
  held = false;
  stopHold();
  holdT = setTimeout(() => {
    held = true;
    holdI = setInterval(() => {
      A[a](v);
      render();
    }, 110);
  }, 380);
});

["pointerup", "pointercancel", "pointerleave"].forEach((t) =>
  document.addEventListener(t, stopHold),
);

document.addEventListener("click", (e) => {
  if (held && e.target.closest("[data-hold]")) {
    held = false;
    e.preventDefault();
    return;
  }
  const el = e.target.closest("[data-a]");
  if (!el || !app.contains(el)) return;
  if (el.disabled) return;
  const fn = A[el.dataset.a];
  if (!fn) return;
  e.preventDefault();
  if (fn(el.dataset.v, el, e) !== false) render();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const box = e.target.closest && e.target.closest("[data-form]");
  if (!box || e.target.tagName !== "INPUT") return;
  e.preventDefault();
  const k = e.target.dataset.in;
  if (k === "form") S.form[e.target.dataset.k] = e.target.value;
  if (k === "newrem") S.newrem = e.target.value;
  submitForm(box.dataset.form);
  render();
});

document.addEventListener("input", (e) => {
  const k = e.target.dataset && e.target.dataset.in;
  if (!k) return;
  if (k === "form") {
    S.form[e.target.dataset.k] = e.target.value;
    return;
  }
  if (k === "newrem") {
    S.newrem = e.target.value;
    return;
  }
  if (k === "search") S.search = e.target.value;
  else if (k === "fsearch") S.fsearch = e.target.value;
  else if (k === "arsize") {
    S.ar.size = +e.target.value;
    const p = document.getElementById("arplant");
    if (p) p.style.width = S.ar.size + "px";
    return;
  }
  render();
});

document.addEventListener("change", (e) => {
  const k = e.target.dataset && e.target.dataset.file;
  if (!k) return;
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  if (k === "avatar") {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d");
      const m = Math.min(img.width, img.height);
      x.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, 256, 256);
      S.form.avImg = c.toDataURL("image/jpeg", 0.82);
      S.form.av = "upload";
      URL.revokeObjectURL(url);
      render();
    };
    img.onerror = () => {
      toast("That file isn’t an image we can use. Try a JPG or PNG.");
      render();
    };
    img.src = url;
    e.target.value = "";
    return;
  }
  if (k === "verify" && S.verify) {
    S.verify.img = url;
  }
  if (k === "ar" && S.ar) {
    S.ar.bg = url;
  }
  render();
});
