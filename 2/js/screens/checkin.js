/* Check-in: event check-in (QR or badge tap), daily streak and eco actions. */

SCR.checkin = () => {
  const ev = SEEDS.bottlebrush;
  return {
    tab: "checkin",
    light: true,
    html: `
  <div class="hero">${leafDeco()}<div class="sunball"></div><h1>Check-in</h1><p>Collect seeds and points</p></div>
  <div class="pad stack">
    <div class="card stack" style="background:var(--cream);border-color:#F1E3B7">
      <div class="row"><div style="width:52px;flex:none">${seedMini("bottlebrush")}</div>
        <div class="grow"><div class="tiny bold" style="color:#8A5B00;letter-spacing:.06em">${S.claimed ? "CHECKED IN" : "NEXT EVENT"}</div><div class="bold">${EVENT.title}</div><div class="small muted">Event seed: ${ev.name} · +${EVENT.pts} pts</div></div></div>
      <div class="row" style="gap:8px"><button class="btn" data-a="scan" data-v="qr">${ic("qr")} Scan QR</button><button class="btn alt" data-a="scan" data-v="nfc">${ic("nfc")} Tap badge</button></div>
      <div class="tiny muted">Use this at every EA event. Scan the code on your badge card, or tap the badge if your phone has NFC. Each event’s seed can be collected once.</div>
      ${S.claimed ? `<div class="row small" style="gap:8px;padding-top:2px">${ic("check").replace("<svg", '<svg style="width:16px;height:16px;color:var(--green)"')}<span class="grow"><b>${EVENT.title}</b> · collected today</span></div>` : ""}
    </div>
    <div class="card stack">
      <div class="row"><div class="grow"><div class="bold">Daily check-in</div><div class="small muted">${S.checked ? "Done for today. See you tomorrow." : "Day 7 gives a daily seed."}</div></div><span class="chip sun">+10 pts</span></div>
      <div class="days">${[1, 2, 3, 4, 5, 6, 7]
        .map((d) => {
          const done = d <= S.streak,
            today = (d === S.streak + 1 && !S.checked) || (S.checked && d === S.streak);
          return `<div class="day ${done ? "done" : ""} ${d === 7 && !done ? "reward" : ""} ${today && !S.checked ? "today" : ""}"><span>Day ${d}</span><span class="dot">${done ? ic("check") : d === 7 ? ic("leaf") : ""}</span><span>${d === 7 ? "Seed" : "+10"}</span></div>`;
        })
        .join("")}</div>
      <button class="btn" data-a="daily" ${S.checked ? "disabled" : ""}>${S.checked ? ic("check") + " Checked in" : "Check in for today"}</button>
      <div class="tiny muted">Daily seeds are common plants. Event seeds can only be collected at EA activities.</div>
    </div>
    <div class="label">Everyday eco actions</div>
    ${ECO.map((e) => {
      const done = S.eco[e.id];
      return `<button class="eco ${done ? "done" : ""}" data-a="eco" data-v="${e.id}" ${done ? "disabled" : ""}>
      <span class="ic">${ic(e.icon)}</span><span class="grow"><span class="bold small" style="display:block">${e.name}</span><span class="tiny muted">${e.photo ? "Photo check" : "Self-report"} · once a day</span></span>
      ${done ? `<span class="chip">${ic("check")} +${e.pts}</span>` : `<span class="chip sun">+${e.pts} pts</span>`}</button>`;
    }).join("")}
    <div class="tiny muted center">Eco actions give points, not seeds.</div>
  </div>`,
  };
};
