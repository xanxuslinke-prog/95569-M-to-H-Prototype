/* Reusable pieces shared by several screens. */

function bar(title, opt = {}) {
  return `<div class="bar ${opt.plain ? "plain" : ""}"><button class="iconbtn ${opt.plain ? "" : ""}" data-a="back" aria-label="Back">${ic("back")}</button><h2>${esc(title)}</h2>${opt.right || ""}</div>`;
}

function resBar() {
  return `<div class="bar-res">
   <span class="res" title="Points">${ic("spark")} ${S.points.toLocaleString()} pts</span>
   <button class="res" data-a="shop" aria-label="Get more sun">${ic("sun")} ${S.res.sun}<span class="plus">${ic("plus")}</span></button>
   <button class="res" data-a="shop" aria-label="Get more water">${ic("drop")} ${S.res.water}<span class="plus">${ic("plus")}</span></button>
   <button class="res" data-a="shop" aria-label="Get more fertiliser">${ic("fert")} ${S.res.fert}<span class="plus">${ic("plus")}</span></button></div>`;
}

function seedCard(k, opts = {}) {
  const s = sm(k);
  return `<button class="seedcard" data-a="seed" data-v="${k}" aria-label="${s.name}">
    <div class="art"><div class="cloud"></div><div class="ribbon">${s.name}</div>${plantSVG(k, 3)}${(S.qty[k] || 0) > 1 ? `<span class="qty">×${S.qty[k]}</span>` : ""}</div>
    <div class="foot"><span>${CATS[s.cat]}</span><span class="src ${s.src !== "daily" ? "ev" : ""}">${srcTag(s.src)}</span></div></button>`;
}

const SCR = {};

function field(id, label, opts = {}) {
  const v = S.form[id] || "";
  const err = opts.err;
  const pw = opts.type === "password";
  return `<label class="field" for="f-${id}"><span class="flabel">${label}${opts.optional ? ' <span class="muted" style="font-weight:600">(optional)</span>' : ""}</span>
    <span class="finput ${err ? "bad" : ""}"><input id="f-${id}" data-in="form" data-k="${id}" type="${pw && !S.showPw ? "password" : opts.type === "email" ? "email" : "text"}" ${opts.type === "email" ? 'inputmode="email"' : ""} value="${esc(v)}" placeholder="${opts.ph || ""}" autocomplete="${opts.ac || "off"}" ${opts.max ? `maxlength="${opts.max}"` : ""} autocapitalize="off" spellcheck="false">
    ${pw ? `<button type="button" class="pwbtn" data-a="showpw" aria-label="${S.showPw ? "Hide" : "Show"} password">${ic(S.showPw ? "ban" : "eye")}</button>` : ""}</span>
    ${err ? `<span class="ferr">${err}</span>` : opts.hint ? `<span class="tiny muted">${opts.hint}</span>` : ""}</label>`;
}

function authShell(inner, { step, backTo } = {}) {
  return `<div class="auth">
    <div class="authtop">${backTo ? `<button class="iconbtn" data-a="authback" data-v="${backTo}" aria-label="Back">${ic("back")}</button>` : "<span></span>"}
    ${step ? `<div class="steps">${[1, 2, 3].map((i) => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div><span class="tiny bold muted">Step ${step} of 3</span>` : ""}</div>
    ${inner}</div>`;
}

function seedMini(k) {
  return `<div class="art" style="aspect-ratio:3/4">${plantSVG(k, 3)}</div>`;
}

function careBtn(k, name, gain, bg, fg) {
  const left = S.res[k];
  return `<button class="carebtn" data-a="care" data-v="${k}" ${S.fx ? "disabled" : ""}><span class="ic" style="background:${bg};color:${fg}">${ic(k === "fert" ? "fert" : k === "water" ? "drop" : "sun")}</span><b>${name}</b><span>+${gain} growth<br>${left ? left + " left" : "None left · get more"}</span></button>`;
}
