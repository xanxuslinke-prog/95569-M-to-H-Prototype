/* Activity details page with join / cancel. */

SCR.event = () => ({
  light: true,
  html: `
  ${bar("Activity", { right: `<button class="iconbtn ghost" data-a="share" data-v="event" aria-label="Share activity">${ic("share")}</button>` })}
  ${eventBanner(170)}
  <div class="pad stack">
    <div><h2 style="margin:0;font-size:22px;letter-spacing:-.01em">${EVENT.title}</h2>
    <div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap"><span class="chip sun">+${EVENT.pts} pts</span><span class="chip">${ic("clock")} ${EVENT.dur}</span><span class="chip">${S.joined ? EVENT.going + 1 : EVENT.going} going</span></div></div>
    <div class="card stack" style="gap:10px">
      <div class="row small">${ic("cal").replace("<svg", '<svg style="width:18px;height:18px;color:var(--green)"')}<b>${EVENT.date}</b><span class="muted">${EVENT.time}</span></div>
      <div class="row small">${ic("pin").replace("<svg", '<svg style="width:18px;height:18px;color:var(--green)"')}<b>${EVENT.place}</b></div>
      <div class="row small muted">${ic("users").replace("<svg", '<svg style="width:18px;height:18px;color:var(--green)"')}Organised by EnvironmentallyAbled</div>
    </div>
    <div class="card row" style="background:var(--cream);border-color:#F1E3B7">
      <div style="width:64px;flex:none">${seedMini("bottlebrush")}</div>
      <div class="grow"><div class="tiny bold" style="color:#8A5B00;letter-spacing:.06em">EVENT SEED</div><div class="bold">Bottlebrush</div><div class="small muted">Only given out at this event. Check in with your badge to collect it.</div></div>
    </div>
    <div class="small" style="line-height:1.5">${EVENT.desc}</div>
    <div class="label">Schedule</div>
    <div class="sched">${EVENT.sched.map(([t, d]) => `<b>${t}</b><span>${d}</span>`).join("")}</div>
    <div class="label">What to bring</div>
    <div class="row" style="flex-wrap:wrap;gap:6px">${EVENT.bring.map((b) => `<span class="chip">${b}</span>`).join("")}</div>
    <div class="label">Location</div>
    <div class="map">${mapSVG()}</div>
    ${
      S.joined
        ? `<div class="note">${ic("check").replace("<svg", '<svg style="width:14px;height:14px;vertical-align:-2px"')} You’re going. A reminder is on your Profile.</div><button class="btn line" data-a="leave">Cancel my spot</button>`
        : `<button class="btn" data-a="join">Join activity</button><div class="tiny muted center">Adds a reminder to your Profile. You can cancel any time.</div>`
    }
  </div>`,
});
