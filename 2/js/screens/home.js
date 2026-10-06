/* Home: greeting, pinned EA activity, new-member guide and community feed. */

SCR.home = () => {
  const posts = POSTS.filter((p) => !p.fid || !S.blocked.includes(p.fid));
  return {
    tab: "home",
    light: true,
    html: `
  <div class="hero" style="padding-bottom:70px">${leafDeco()}
    <div class="row"><div class="grow"><p style="margin:0">${greet()}</p><h1>${esc(firstName())}</h1></div>
    <button data-a="tab" data-v="profile" aria-label="Profile" style="border-radius:50%;box-shadow:0 0 0 3px rgba(255,255,255,.35)">${avatarFor(me(), 46)}</button></div>
  </div>
  <div class="pad stack" style="margin-top:-66px;position:relative;z-index:2">
    <button class="card" style="text-align:left;padding:0;overflow:hidden" data-a="go" data-v="event">
      ${eventBanner(130)}
      <div style="padding:12px 14px 14px" class="stack" >
        <div class="row" style="gap:6px;flex-wrap:wrap"><span class="chip dark">Pinned · EA official</span>${S.joined ? '<span class="chip">' + ic("check") + " You’re going</span>" : ""}</div>
        <div><div class="bold" style="font-size:16px">${EVENT.title}</div>
        <div class="small muted" style="margin-top:3px">${EVENT.date} · ${EVENT.time} · ${EVENT.place}</div></div>
        <div class="row small bold" style="color:var(--green)">See details ${ic("chev", "").replace("<svg", '<svg style="width:14px;height:14px"')}</div>
      </div>
    </button>
    ${
      S.newbie && me().member === "new"
        ? `<div class="card stack" style="gap:10px;background:var(--cream);border-color:#F1E3B7">
      <div class="row"><div class="grow bold">New to EnvironmentallyAbled?</div><button data-a="hidenew" aria-label="Dismiss" style="color:var(--muted)">${ic("close").replace("<svg", '<svg style="width:16px;height:16px"')}</button></div>
      <div class="sched" style="grid-template-columns:22px 1fr;font-size:12.5px"><b>1</b><span>Join an activity near you. They’re free and usually 2 hours.</span><b>2</b><span>Check in on the day with your badge to collect an event seed.</span><b>3</b><span>Plant it and look after it with friends.</span></div>
      <button class="btn sm" style="align-self:flex-start" data-a="go" data-v="event">Find my first activity</button></div>`
        : ""
    }
    <div class="row"><div class="label grow">Community</div><button class="chip" data-a="share" data-v="app">${ic("share")} Invite friends</button></div>
    ${posts
      .map(
        (p) => `<div class="card post">
      <div class="stack" style="gap:8px;min-width:0">
        <div class="row"><div class="avatar" style="background:${p.col};width:30px;height:30px;font-size:11px">${p.official ? "EA" : initials(p.who)}</div>
          <div class="grow"><div class="bold small">${p.who}</div><div class="tiny muted">${p.time}</div></div></div>
        <div class="small" style="line-height:1.45">${p.text}</div>
        <div class="row" style="gap:6px"><button class="like ${S.likes[p.id] ? "on" : ""}" data-a="like" data-v="${p.id}" aria-pressed="${!!S.likes[p.id]}">${ic("heart")} ${p.likes + (S.likes[p.id] ? 1 : 0)}</button>
        ${p.fid ? `<button class="like" data-a="friend" data-v="${p.fid}">${ic("leaf")} Visit garden</button>` : ""}</div>
      </div>
      <div class="thumb">${p.plant ? `<div class="art" style="aspect-ratio:1;height:100%">${plantSVG(p.plant, 3)}</div>` : eventBanner(92, true)}</div>
    </div>`,
      )
      .join("")}
  </div>`,
  };
};
