/* Draws the current screen, tab bar, overlays and toast into the phone frame. */

const app = document.getElementById("app");

let lastKey = "";

function render() {
  const c = cur();
  const scr = SCR[c.n]();
  const key = c.n + (c.k || c.id || "");
  const oldSheet = app.querySelector(".sheet");
  const sheetTop = oldSheet ? oldSheet.scrollTop : 0;
  const old = app.querySelector(".screen");
  const top = old && key === lastKey ? old.scrollTop : 0;
  const act = document.activeElement;
  const fid = act && act.id;
  const sel = act && act.selectionStart;
  const dark = !!(S.cam && S.cam.mode === "qr") || !!S.ar;
  app.innerHTML = `<div class="status ${scr.light || dark ? "light" : ""}"><span>9:41</span><span>●●● ▮</span></div>
   <div class="screen">${scr.html}</div>
   ${
     scr.tab
       ? `<nav class="tabbar">${[
           ["home", "home", "Home"],
           ["garden", "leaf", "Garden"],
           ["checkin", "scan", "Check-in"],
           ["profile", "user", "Profile"],
         ]
           .map(
             ([t, i, l]) =>
               `<button class="tab ${scr.tab === t ? "on" : ""}" data-a="tab" data-v="${t}" aria-current="${scr.tab === t ? "page" : "false"}">${ic(i)}${l}</button>`,
           )
           .join("")}</nav>`
       : ""
   }
   ${camHTML()}${verifyHTML()}${arHTML()}${sheetHTML()}
   ${S.toast ? `<div class="toast ${S._toastShown === S.toast ? "still" : ""}" role="status">${ic("spark")}${esc(S.toast)}</div>` : ""}`;
  const ns = app.querySelector(".screen");
  if (ns) ns.scrollTop = top;
  lastKey = key;
  saveData();
  S._toastShown = S.toast;
  const nsh = app.querySelector(".sheet");
  if (nsh && !nsh.classList.contains("in")) nsh.scrollTop = sheetTop;
  if (fid) {
    const el = document.getElementById(fid);
    if (el && el.tagName === "INPUT" && el.type !== "file" && el.type !== "range") {
      el.focus();
      try {
        el.setSelectionRange(sel, sel);
      } catch (e) {}
    }
  }
  if (S.anim !== null) {
    setTimeout(() => {
      S.anim = null;
    }, 600);
  }
  if (S.ar && !S.ar.shot) bindAR();
  bindGarden();
}
