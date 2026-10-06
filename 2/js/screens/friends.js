/* Friends list and a friend's garden. */

SCR.friends = () => {
  const q = S.fsearch.trim().toLowerCase();
  const list = FRIENDS.filter(
    (f) =>
      S.friends.includes(f.id) &&
      !S.blocked.includes(f.id) &&
      (!q || f.name.toLowerCase().includes(q)),
  ).sort((a, b) => b.lv - a.lv);
  return {
    tab: "garden",
    light: true,
    html: `
  ${bar("Friends’ gardens")}
  <div class="pad stack">
    <label class="search" for="friendsearch">${ic("search")}<input id="friendsearch" data-in="fsearch" placeholder="Search friends" value="${esc(S.fsearch)}"></label>
    <div class="small muted">Ranked by garden level. Watering a friend’s garden gives you 5 pts once a day.</div>
    ${
      list
        .map(
          (f, i) => `<div class="card row">
      <span class="small bold muted" style="width:14px;font-variant-numeric:tabular-nums">${i + 1}</span>
      <div class="avatar" style="background:${f.col}">${initials(f.name)}</div>
      <div class="grow"><div class="row" style="gap:6px"><span class="bold">${f.name}</span><span class="chip">Lv ${f.lv}</span></div><div class="small muted">${f.plants.length} plant${f.plants.length > 1 ? "s" : ""} growing</div></div>
      <button class="btn sm" data-a="friend" data-v="${f.id}">Visit</button></div>`,
        )
        .join("") ||
      `<div class="card center stack small"><div class="bigico">${ic("users")}</div><div class="bold">${S.friends.length ? "No friends found" : "No friends yet"}</div><div class="muted">${S.friends.length ? "Try another name." : "Invite friends, or visit gardens from the Home feed."}</div></div>`
    }
    <button class="btn line" data-a="share" data-v="app">${ic("users")} Invite a friend</button>
  </div>`,
  };
};

SCR.friend = () => {
  const f = FRIENDS.find((x) => x.id === cur().id);
  const w = S.watered[f.id];
  return {
    tab: "garden",
    light: true,
    html: `
  ${bar(f.name + "’s garden", { right: `<button class="iconbtn ghost" data-a="fmenu" aria-label="More">${ic("more")}</button>` })}
  <div class="pad stack">
    <div class="row"><div class="avatar" style="background:${f.col}">${initials(f.name)}</div><div class="grow"><div class="bold">${f.name}</div><div class="small muted">Level ${f.lv} · ${f.plants.length} plant${f.plants.length > 1 ? "s" : ""}</div></div></div>
    <div class="bed"><div class="sunny"></div>
      <div class="plots" style="grid-template-columns:repeat(${Math.min(3, f.plants.length)},1fr)">${f.plants.map(([k, st], j) => `<div class="plot">${plantSVG(k, st, "", POTS[(j + f.lv) % POTS.length])}<span class="nm">${SEEDS[k].name}</span><span class="st">${["Seed", "Sprout", "Growing", "Grown"][st]}</span></div>`).join("")}</div></div>
    <button class="btn" data-a="waterfriend" data-v="${f.id}" ${w ? "disabled" : ""}>${ic("drop")} ${w ? "Watered today" : "Water their garden (+5 pts)"}</button>
  </div>`,
  };
};
