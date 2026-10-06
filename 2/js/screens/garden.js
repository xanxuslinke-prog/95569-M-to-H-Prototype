/* Garden tab: the scene, My garden toggle, floating buttons and the care panel. */

SCR.garden = () => {
  ensurePos();
  const n = S.plots.length;
  if (S.focus >= n) S.focus = Math.max(0, n - 1);
  const mode = n && S.gview === "focus" ? "focus" : "all";
  const f = S.plots[S.focus];
  const W = worldW();
  const pots = S.plots
    .map((p, i) => {
      const b = potBox(p);
      const isF = mode === "focus" && i === S.focus;
      return `<div class="gpot ${mode === "focus" && !isF ? "dim" : ""} ${isF ? "focused" : ""}" data-i="${i}" role="button" tabindex="0" aria-label="${SEEDS[p.seed].name}, ${stageName(p.g, p.seed)}" style="left:${b.x - b.w / 2}px;top:${b.y - b.h}px;width:${b.w}px;z-index:${Math.round(b.y)}">
      ${plantSVG(p.seed, isF && S.fx === "plant" ? -1 : stageOf(p.g), isF && S.anim === "f" ? "pop" : "", p.pot)}<span class="gtag">${SEEDS[p.seed].name}</span></div>`;
    })
    .join("");
  const fabs = `<div class="gfabs">
      <button class="gfab" data-a="go" data-v="friends">${ic("users")}<span>Friends</span></button>
      <button class="gfab" data-a="go" data-v="seeds">${ic("grid")}<span>My seeds</span></button>
      <button class="gfab" data-a="ar" ${n || S.grown.length ? "" : "disabled"}>${ic("camera")}<span>AR photo</span></button></div>`;
  const toggle = n
    ? mode === "focus"
      ? `<button class="gmode" data-a="gview" data-v="all" aria-label="See my whole garden"><span class="gthumb">${miniGarden()}</span><span class="glab">My garden</span></button>`
      : `<button class="gmode" data-a="gview" data-v="focus" aria-label="Back to ${SEEDS[f.seed].name}"><span class="gthumb plantthumb">${plantSVG(f.seed, stageOf(f.g), "", f.pot)}</span><span class="glab">Back to plant</span></button>`
    : "";
  const empty = !n
    ? `<div class="gempty"><div class="bold">Your garden is empty</div><div class="small muted">Plant a seed to get your first pot.</div><button class="btn sm" data-a="plantpick">${ic("leaf")} Plant a seed</button></div>`
    : "";
  let panel = "";
  if (mode === "focus") {
    const st = stageOf(f.g),
      within = st >= 3 ? 100 : f.g % 100;
    panel = `<div class="gpanel">
      <div class="row">
        <button class="iconbtn" data-a="fprev" aria-label="Previous plant" ${n < 2 || S.fx ? "disabled" : ""}>${ic("back")}</button>
        <div class="grow center"><div class="bold" style="font-size:17px">${SEEDS[f.seed].name}</div><div class="small muted">${stageName(f.g, f.seed)} · ${S.focus + 1} of ${n}</div></div>
        <button class="iconbtn" data-a="fnext" aria-label="Next plant" ${n < 2 || S.fx ? "disabled" : ""}>${ic("chev")}</button></div>
      ${
        st >= 3
          ? `<div class="note">Fully grown. Harvest it for 20 pts. It moves to Grown plants in My seeds, and you can still use it in AR photos. Or keep it in your garden.</div><button class="btn" data-a="harvest">Harvest (+20 pts)</button>`
          : `<div class="stack" style="gap:6px"><div class="row small"><span class="grow bold">Growth to ${["Sprout", "Growing", SEEDS[f.seed].cat === "flower" ? "Blooming" : "Grown"][st]}</span><span class="muted" style="font-variant-numeric:tabular-nums">${within}/100</span></div><div class="progress"><i style="width:${within}%"></i></div></div>
        <div class="care">${careBtn("sun", "Sun", 10, "#FDEBC4", "#8A5B00")}${careBtn("water", "Water", 15, "#DDEFF7", "#1F6A8A")}${careBtn("fert", "Fertiliser", 30, "#EDE3D5", "#7A5334")}</div>`
      }
    </div>`;
  } else if (n) {
    panel = `<div class="gpanel">
      <div class="small muted center" style="line-height:1.5">Drag to look around. Tap a plant to look after it.<br>Press and hold a pot to pick it up and put it anywhere.</div>
      <div class="row"><button class="btn alt" data-a="plantpick">${ic("plus")} Plant a seed</button><button class="btn alt" data-a="share" data-v="garden">${ic("share")} Share</button></div>
    </div>`;
  }
  return {
    tab: "garden",
    html: `
  <div class="ghead stack" style="gap:10px">
    <div class="row"><h1 style="margin:0;font-size:26px;letter-spacing:-.02em" class="grow">Garden</h1><button class="chip dark" data-a="shop">${ic("bag")} Shop</button></div>
    ${resBar()}
  </div>
  <div class="gwrap">
    <div class="gscene ${mode}" id="gscene">
      <div class="gworld" id="gworld" style="width:${W}px">${gardenBG(W)}${pots}</div>
      <div id="gfx"></div>
      ${fabs}${toggle}${empty}
    </div>
  </div>
  <div class="pad stack" style="padding-top:12px">${panel}</div>`,
  };
};
