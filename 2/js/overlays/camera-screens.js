/* Full-screen camera views: QR scan, NFC tap, eco photo check, AR photo. */

function camHTML() {
  const c = S.cam;
  if (!c) return "";
  if (c.mode === "qr") {
    return `<div class="cam"><div class="view"><div class="fakecam"></div>
      <div class="camtop"><button class="iconbtn ghost" data-a="camclose" aria-label="Close">${ic("close")}</button><h2>Scan badge QR</h2></div>
      <div class="frame" style="display:grid;place-items:center"><div class="qrfake">${qrCells()}</div>${c.phase === "scan" ? '<div class="scanline"></div>' : ""}</div></div>
      <div class="cambottom"><div class="row"><div style="width:44px;flex:none">${seedMini("bottlebrush")}</div><div class="grow"><div class="bold small">${EVENT.title}</div><div class="tiny muted">You’ll get: Bottlebrush event seed · +${EVENT.pts} pts</div></div></div>
      <div class="tiny muted">Point your camera at the QR code on your badge card.</div>
      <button class="btn" data-a="dosim">${c.phase === "busy" ? "Reading code…" : "Simulate a successful scan"}</button></div></div>`;
  }
  if (c.mode === "nfc") {
    return `<div class="cam" style="background:var(--bg);color:var(--ink)">
      <div class="camtop" style="color:var(--ink)"><button class="iconbtn" data-a="camclose" aria-label="Close">${ic("close")}</button><h2>Tap your badge</h2></div>
      <div class="view vtop" style="flex-direction:column;gap:18px;padding-inline:22px;align-content:center">
        ${
          c.phase === "intro"
            ? `<div class="bigico" style="width:88px;height:88px">${ic("nfc").replace("<svg", '<svg style="width:44px;height:44px"')}</div>
           <div class="center"><h3 style="margin:0 0 6px;font-size:20px">Before you tap</h3><div class="small muted" style="line-height:1.5">Hold the top of your phone against the back of your badge. This only checks you in and adds your event seed. <b>Nothing is paid or charged.</b></div></div>
           <div class="note">No NFC on your phone? Use Scan QR instead. Both do the same thing.</div>`
            : `<div class="nfcpulse" style="background:rgba(78,122,79,.12)">${ic("nfc")}</div><div class="center small muted">Hold your phone near the badge…</div>`
        }
      </div>
      <div class="cambottom">${c.phase === "intro" ? `<button class="btn" data-a="nfcready">I’m ready</button><button class="btn line" data-a="scan" data-v="qr">${ic("qr")} Scan QR instead</button>` : `<button class="btn" data-a="dosim">${c.phase === "busy" ? "Reading badge…" : "Simulate a tap"}</button>`}</div></div>`;
  }
  return "";
}

function verifyHTML() {
  const v = S.verify;
  if (!v) return "";
  const e = ECO.find((x) => x.id === v.id);
  if (!e.photo) {
    return `<div class="scrim" data-a="vclose"><div class="sheet"><div class="grab"></div><div class="bigico">${ic(e.icon)}</div><h3 class="center">${e.name}</h3>
      <div class="small muted center" style="margin-bottom:14px">${e.hint}. Be honest, it’s for you and your garden.</div>
      <div class="row"><button class="btn alt" data-a="vclose">Not today</button><button class="btn" data-a="vself">I did this today (+${e.pts})</button></div></div></div>`;
  }
  return `<div class="cam" style="background:var(--bg);color:var(--ink)">
    <div class="camtop" style="color:var(--ink)"><button class="iconbtn" data-a="vclose" aria-label="Close">${ic("close")}</button><h2>${e.name}</h2></div>
    <div class="view vtop" style="padding-inline:18px;padding-bottom:12px;display:block;overflow-y:auto">
      <div class="stack">
        <div class="photo">${v.img ? `<img src="${v.img}" alt="Your photo">` : `<div style="position:absolute;inset:0;display:grid;place-items:center;color:var(--muted);text-align:center;padding:20px" class="small">${ic("image").replace("<svg", '<svg style="width:40px;height:40px;display:block;margin:0 auto 8px"')}${e.hint}</div>`}
          ${v.phase === "checking" ? '<div class="scanline"></div>' : ""}</div>
        ${
          v.phase === "done"
            ? `<div class="card row" style="background:var(--green-soft);border-color:#CFE0C6">${ic("check").replace("<svg", '<svg style="width:22px;height:22px;color:var(--green)"')}<div class="grow"><div class="bold">Looks good</div><div class="small muted">+${e.pts} pts added. Photos are checked automatically and then deleted.</div></div></div>`
            : v.phase === "checking"
              ? `<div class="card small center">Checking your photo…</div>`
              : `<div class="note">We only check that the photo matches the action. It isn’t shared with anyone.</div>`
        }
      </div>
    </div>
    <div class="cambottom">${
      v.phase === "done"
        ? `<button class="btn" data-a="vclose">Done</button>`
        : `
      <label class="btn" for="vfile" style="cursor:pointer">${ic("camera")} Take or upload a photo</label><input id="vfile" type="file" accept="image/*" data-file="verify" hidden>
      <div class="row"><button class="btn alt" data-a="vsample">Use a sample photo</button><button class="btn" data-a="vsubmit" ${v.img && v.phase === "ready" ? "" : "disabled"}>Submit</button></div>`
    }</div></div>`;
}

function arHTML() {
  const a = S.ar;
  if (!a) return "";
  const items = arItems();
  const p = items[Math.min(a.sel, items.length - 1)];
  return `<div class="cam">
    <div class="view" id="arview"><div class="arscene" ${a.bg ? `style="background-image:url('${a.bg}')"` : ""}>${a.bg ? "" : '<div class="tree1"></div><div class="tree2"></div>'}</div>
      <div class="arplant" id="arplant" style="left:${a.x}%;top:${a.y}%;width:${a.size}px;transform:translate(-50%,-50%)">${plantSVG(p.seed, p.stage, "", p.pot)}</div>
      ${a.flash ? '<div class="flash"></div>' : ""}
      <div class="camtop"><button class="iconbtn ghost" data-a="arclose" aria-label="Close">${ic("close")}</button><h2>AR photo · ${SEEDS[p.seed].name}</h2></div>
    </div>
    <div class="cambottom">
      ${
        a.shot
          ? `<div class="card row" style="background:var(--green-soft);border-color:#CFE0C6">${ic("check").replace("<svg", '<svg style="width:22px;height:22px;color:var(--green)"')}<div class="grow"><div class="bold">Photo saved</div><div class="small muted">Your ${SEEDS[p.seed].name.toLowerCase()} is in your garden album.</div></div></div>
        <div class="row"><button class="btn alt" data-a="arretake">Take another</button><button class="btn" data-a="arclose">Done</button></div>`
          : `<div class="tiny muted">Drag the plant to place it. The background stands in for your camera. Upload a photo to try a real place.</div>
      <div class="arpick" role="radiogroup" aria-label="Choose a plant">${items
        .map(
          (it, i) =>
            `<button class="aropt ${i === a.sel ? "on" : ""}" data-a="arpick" data-v="${i}" role="radio" aria-checked="${i === a.sel}">${plantSVG(it.seed, it.stage, "", it.pot)}<span>${SEEDS[it.seed].name}</span><em>${it.label}</em></button>`,
        )
        .join("")}</div>
      <div class="row small"><span class="muted">Size</span><input id="arsize" type="range" min="80" max="260" value="${a.size}" data-in="arsize" style="flex:1;accent-color:#4E7A4F" aria-label="Plant size"></div>
      <div class="row" style="justify-content:space-between">
        <label class="iconbtn" for="arfile" style="cursor:pointer;background:var(--green-soft)" aria-label="Choose background photo">${ic("image")}</label><input id="arfile" type="file" accept="image/*" data-file="ar" hidden>
        <button class="shutter" data-a="arshot" aria-label="Take photo"></button>
        <div style="width:36px"></div></div>`
      }
    </div></div>`;
}

function bindAR() {
  const pl = document.getElementById("arplant"),
    view = document.getElementById("arview");
  if (!pl || !view) return;
  pl.onpointerdown = (ev) => {
    pl.setPointerCapture(ev.pointerId);
    const r = view.getBoundingClientRect();
    pl.onpointermove = (m) => {
      S.ar.x = Math.max(5, Math.min(95, ((m.clientX - r.left) / r.width) * 100));
      S.ar.y = Math.max(10, Math.min(95, ((m.clientY - r.top) / r.height) * 100));
      pl.style.left = S.ar.x + "%";
      pl.style.top = S.ar.y + "%";
    };
    pl.onpointerup = () => {
      pl.onpointermove = null;
    };
  };
}
