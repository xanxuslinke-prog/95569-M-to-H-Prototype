/* Profile, privacy and blocking, notifications, invite preview. */

SCR.profile = () => ({
  tab: "profile",
  light: true,
  html: `
  <div class="hero">${leafDeco()}<div class="sunball"></div><h1>Profile</h1><p>Your activities and settings</p></div>
  <div class="pad stack">
    <div class="card row">${avatarFor(me(), 48)}
      <div class="grow" style="min-width:0"><div class="bold">${esc(me().name)}</div><div class="small muted">${S.privacy.email ? esc(me().email) : "Email hidden from others"}</div></div><span class="chip">${me().member === "new" ? "New member" : "Lv 8"}</span></div>
    <div class="grid3" style="text-align:center">
      ${[
        [Object.keys(S.owned).filter((k) => S.owned[k]).length, "Seed types"],
        [S.grown.length, "Plants grown"],
        [S.events + (S.claimed ? 1 : 0), "Events attended"],
      ]
        .map(
          ([n, l]) =>
            `<div class="card" style="padding:10px"><div style="font-size:20px;font-weight:800">${n}</div><div class="tiny muted">${l}</div></div>`,
        )
        .join("")}
    </div>
    <div class="label">Next activity</div>
    ${
      S.joined
        ? `<button class="card" style="text-align:left;background:var(--cream);border-color:#F1E3B7" data-a="go" data-v="event"><div class="row"><div class="grow"><div class="chip sun">You’re going</div><div class="bold" style="margin-top:6px">${EVENT.title}</div><div class="small muted">${EVENT.date} · ${EVENT.time}</div><div class="small muted">${EVENT.place}</div></div>${ic("chev").replace("<svg", '<svg style="width:18px;height:18px;color:var(--muted)"')}</div></button>`
        : `<div class="card small muted">No activity joined yet. <button class="bold" style="color:var(--green)" data-a="go" data-v="event">See what’s on</button></div>`
    }
    <div class="label">My reminders</div>
    <div class="card stack" style="gap:8px">
      <div class="tiny muted">Personal notes. Only you can see them.</div>
      ${S.reminders.map((r) => `<div class="row"><button class="toggle-box" data-a="rdone" data-v="${r.id}" aria-label="Mark done" style="width:22px;height:22px;border-radius:7px;border:1.5px solid var(--green);display:grid;place-items:center;background:${r.done ? "var(--green)" : "#fff"};color:#fff">${r.done ? ic("check").replace("<svg", '<svg style="width:14px;height:14px"') : ""}</button><span class="grow small" style="${r.done ? "text-decoration:line-through;color:var(--muted)" : ""}">${esc(r.text)}</span><button data-a="rdel" data-v="${r.id}" aria-label="Delete" style="color:var(--muted)">${ic("trash").replace("<svg", '<svg style="width:16px;height:16px"')}</button></div>`).join("")}
      <div class="row" data-form="rem"><input id="newrem" data-in="newrem" enterkeyhint="done" placeholder="Add a reminder" value="${esc(S.newrem || "")}" style="flex:1;min-width:0;border:1px solid var(--line);border-radius:10px;padding:9px 11px;background:var(--bg);font-size:16px"><button class="btn sm" data-a="submit" data-v="rem">Add</button></div>
    </div>
    <div class="label">Settings</div>
    <div class="card list" style="padding:2px 14px">
      <button class="item" style="width:100%;text-align:left" data-a="go" data-v="aboutea">${ic("leaf").replace("<svg", '<svg style="width:20px;height:20px;color:var(--green)"')}<span class="grow bold small">About EnvironmentallyAbled</span>${ic("chev", "chev")}</button>
      <button class="item" style="width:100%;text-align:left" data-a="go" data-v="privacy">${ic("shield").replace("<svg", '<svg style="width:20px;height:20px;color:var(--green)"')}<span class="grow bold small">Privacy and blocking</span>${ic("chev", "chev")}</button>
      <button class="item" style="width:100%;text-align:left" data-a="go" data-v="notifs">${ic("bell").replace("<svg", '<svg style="width:20px;height:20px;color:var(--green)"')}<span class="grow bold small">Notifications</span>${ic("chev", "chev")}</button>
      <button class="item" style="width:100%;text-align:left" data-a="share" data-v="app">${ic("users").replace("<svg", '<svg style="width:20px;height:20px;color:var(--green)"')}<span class="grow bold small">Invite friends to EA Sprout</span>${ic("chev", "chev")}</button>
      <button class="item" style="width:100%;text-align:left;color:var(--danger)" data-a="logout">${ic("back").replace("<svg", '<svg style="width:20px;height:20px"')}<span class="grow bold small">Log out</span></button>
    </div>
  </div>`,
});

SCR.privacy = () => ({
  tab: "profile",
  light: true,
  html: `
  ${bar("Privacy and blocking")}
  <div class="pad stack">
    <div class="card list" style="padding:2px 14px">
      <div class="item"><div class="grow"><div class="bold small">Show my email on my profile</div><div class="tiny muted">Off: friends only see your name and garden</div></div><button class="toggle ${S.privacy.email ? "on" : ""}" data-a="pemail" role="switch" aria-checked="${S.privacy.email}" aria-label="Show email"></button></div>
      <div class="item" style="flex-direction:column;align-items:stretch;gap:8px"><div><div class="bold small">Who can visit my garden</div><div class="tiny muted">Controls who sees your plants and can water them</div></div>
        <div class="seg">${[
          ["friends", "Friends"],
          ["everyone", "Everyone"],
          ["nobody", "Only me"],
        ]
          .map(
            ([v, l]) =>
              `<button class="${S.privacy.garden === v ? "on" : ""}" data-a="pgarden" data-v="${v}">${l}</button>`,
          )
          .join("")}</div></div>
    </div>
    <div class="label">Blocked people</div>
    <div class="card stack" style="gap:10px">
      ${
        S.blocked.length
          ? S.blocked
              .map((id) => {
                const f = FRIENDS.find((x) => x.id === id);
                return `<div class="row"><div class="avatar" style="background:${f.col};width:32px;height:32px;font-size:12px">${initials(f.name)}</div><span class="grow bold small">${f.name}</span><button class="btn sm alt" data-a="unblock" data-v="${id}">Unblock</button></div>`;
              })
              .join("")
          : '<div class="small muted">No one blocked. Open a friend’s garden and use the ••• menu to block them. They won’t be told.</div>'
      }
    </div>
  </div>`,
});

SCR.notifs = () => ({
  tab: "profile",
  light: true,
  html: `
  ${bar("Notifications")}
  <div class="pad"><div class="card list" style="padding:2px 14px">
    ${[
      ["events", "New EA activities", "When EA posts something near you"],
      ["friends", "Friend activity", "When friends water your garden"],
      ["daily", "Daily check-in reminder", "One reminder in the evening"],
    ]
      .map(
        ([k, t, d]) =>
          `<div class="item"><div class="grow"><div class="bold small">${t}</div><div class="tiny muted">${d}</div></div><button class="toggle ${S.notif[k] ? "on" : ""}" data-a="notif" data-v="${k}" role="switch" aria-checked="${S.notif[k]}" aria-label="${t}"></button></div>`,
      )
      .join("")}
  </div></div>`,
});

SCR.invite = () => {
  const k = cur().kind;
  return {
    light: true,
    html: `
  ${bar("Invite preview")}
  <div class="pad stack">
    <div class="note">This is what your friend sees when they open your link.</div>
    <div class="card stack center" style="padding:20px 16px">
      <div style="margin:0 auto">${avatarFor(me(), 52)}</div>
      <div class="bold" style="font-size:18px">${esc(firstName())} invited you to ${k === "event" ? EVENT.title : k === "garden" ? "see their garden" : "EA Sprout"}</div>
      <div class="small muted" style="line-height:1.5">${k === "event" ? `${EVENT.date} · ${EVENT.time} · ${EVENT.place}. Free, ${EVENT.dur}. You’ll get a Bottlebrush seed for coming.` : k === "garden" ? `${esc(firstName())} is growing a tomato and basil from EA activities and check-ins.` : "EA Sprout is EnvironmentallyAbled’s community app. Join local eco activities, collect seeds and grow a garden with friends."}</div>
      ${
        k === "garden"
          ? `<div class="bed" style="padding:10px"><div class="plots" style="margin-top:6px">${S.plots
              .filter((p) => p.seed)
              .map(
                (p) =>
                  `<div class="plot">${plantSVG(p.seed, stageOf(p.g), "", p.pot)}<span class="nm">${SEEDS[p.seed].name}</span></div>`,
              )
              .join("")}</div></div>`
          : k === "event"
            ? eventBanner(120)
            : ""
      }
      <button class="btn" data-a="back">Join EA Sprout</button>
      <div class="tiny muted">No download needed. Opens in the browser.</div>
    </div>
  </div>`,
  };
};
