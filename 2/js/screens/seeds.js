/* My seeds collection and seed detail. */

SCR.seeds = () => {
  const keys = Object.keys(S.owned).filter((k) => S.owned[k]);
  let list = keys.filter(
    (k) =>
      S.filter === "all" ||
      SEEDS[k].cat === S.filter ||
      (S.filter === "event" && sm(k).src === "event"),
  );
  if (S.search.trim())
    list = list.filter((k) => SEEDS[k].name.toLowerCase().includes(S.search.trim().toLowerCase()));
  list.sort((a, b) =>
    S.sort === "date" ? sm(b).order - sm(a).order : SEEDS[a].days - SEEDS[b].days,
  );
  const lockedAll = LOCKED.filter(
    ([c, src]) => S.filter === "all" || c === S.filter || (S.filter === "event" && src === "event"),
  ).slice(0, S.search.trim() ? 0 : 6);
  const total = Object.keys(SEEDS).length + LOCKED.length;
  return {
    tab: "garden",
    light: true,
    html: `
  ${bar("My seeds")}
  <div class="pad stack">
    <div class="card row"><div class="grow"><div style="font-size:26px;font-weight:800;font-variant-numeric:tabular-nums">${keys.length}<span class="muted" style="font-size:14px;font-weight:600"> of ${total} seed types</span></div>
      <div class="small muted">${keys.filter((k) => sm(k).src === "event").length} from events · ${keys.filter((k) => sm(k).src === "daily").length} from daily check-ins${keys.some((k) => sm(k).src === "gift") ? " · 1 welcome gift" : ""}</div></div></div>
    ${
      S.grown.length
        ? `<div class="row"><div class="label grow">Grown plants · ${S.grown.length}</div><span class="tiny muted">Tap one for an AR photo</span></div>
    <div class="grownrow">${S.grown
      .map(
        (g, i) =>
          `<button class="grownitem" data-a="ar" data-v="g${i}" aria-label="AR photo with your ${SEEDS[g.seed].name}"><span class="gsky">${plantSVG(g.seed, 3, "", g.pot)}</span><b>${SEEDS[g.seed].name}</b><span class="tiny muted">${g.date}</span><span class="archip">${ic("camera")} AR</span></button>`,
      )
      .join("")}</div>`
        : ""
    }
    <label class="search" for="seedsearch">${ic("search")}<input id="seedsearch" data-in="search" placeholder="Search your seeds" value="${esc(S.search)}"></label>
    <div class="pills">${[
      ["all", "All"],
      ["event", "Event only"],
      ["flower", "Flowers"],
      ["tree", "Trees"],
      ["fruit", "Fruits"],
      ["herb", "Herbs"],
      ["shrub", "Shrubs"],
    ]
      .map(
        ([v, l]) =>
          `<button class="pill ${S.filter === v ? "on" : ""}" data-a="filter" data-v="${v}">${l}</button>`,
      )
      .join("")}</div>
    <div class="row"><div class="grow small muted">${list.length} collected</div><div class="seg" style="width:auto"><button class="${S.sort === "date" ? "on" : ""}" data-a="sort" data-v="date">Newest</button><button class="${S.sort === "grow" ? "on" : ""}" data-a="sort" data-v="grow">Fastest to grow</button></div></div>
    ${list.length ? `<div class="grid3">${list.map((k) => seedCard(k)).join("")}</div>` : `<div class="card center small muted">No seeds match. Try another filter.</div>`}
    ${lockedAll.length ? `<div class="label">Not collected yet</div><div class="grid3">${lockedAll.map(([c, src]) => `<div class="lockcard">${ic("lock")}<span class="tiny bold">${CATS[c]}</span><span class="tiny">${src === "event" ? "From an event" : "From daily check-in"}</span></div>`).join("")}</div>` : ""}
  </div>`,
  };
};

SCR.seed = () => {
  const k = cur().k,
    s = sm(k),
    n = S.qty[k] || 0;
  const open = cur().about;
  return {
    tab: "garden",
    light: true,
    html: `
  ${bar(s.name)}
  <div class="pad stack">
    <div class="seedcard" style="padding:8px"><div class="art"><div class="cloud"></div><div class="ribbon" style="font-size:13px;padding:5px 14px">${s.name}</div>${plantSVG(k, 3)}</div>
      <div class="foot" style="font-size:12px;padding:4px 6px"><span>${CATS[s.cat]}</span><span class="src ${s.src !== "daily" ? "ev" : ""}" style="font-size:11px">${srcTag(s.src, 1)}</span></div></div>
    <div class="card row">${ic(s.src === "event" ? "cal" : "check").replace("<svg", '<svg style="width:20px;height:20px;color:var(--green)"')}
      <div class="grow"><div class="small bold">${s.src === "event" ? "Collected at " + s.from : s.src === "gift" ? "Welcome gift for joining EA Sprout" : "Reward for a 7-day check-in streak"}</div><div class="tiny muted">${s.date || "Today"}</div></div></div>
    <button class="card" style="text-align:left" data-a="about" aria-expanded="${!!open}">
      <div class="row"><div class="grow"><div class="bold small">About this seed</div><div class="tiny muted">${s.sun} · ${s.type} · about ${s.days} days to grow</div></div>${ic("chev").replace("<svg", '<svg style="width:16px;height:16px;transform:rotate(' + (open ? 90 : 0) + 'deg)"')}</div>
      ${open ? `<div class="small" style="margin-top:10px;line-height:1.5">${s.about}</div>` : ""}
    </button>
    <button class="btn" data-a="plantseed" data-v="${k}" ${n ? "" : "disabled"}>${ic("leaf")} ${n ? "Plant in garden" : "No seeds left to plant"}</button>
    <div class="tiny muted center">${n ? `You have ${n} ${s.name.toLowerCase()} seed${n > 1 ? "s" : ""}. Planting uses 1.` : "This one is already growing in your garden."}</div>
  </div>`,
  };
};
