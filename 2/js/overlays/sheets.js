/* Bottom sheets: shop, plant picker, rewards, welcome gift, share, block, WhatsApp. */

function sheetHTML() {
  const sh = S.sheet;
  if (!sh) {
    S._sheetOpen = null;
    return "";
  }
  let h = "";
  if (sh.n === "shop") {
    const cost = { sun: 5, water: 5, fert: 15 };
    const total = Object.keys(cost).reduce((a, k) => a + cost[k] * S.shop[k], 0);
    h = `<h3>Care shop</h3><div class="small muted">Swap points for care items.</div>
    <div class="card row" style="margin:12px 0;background:var(--cream);border-color:#F1E3B7"><div class="grow"><div class="tiny bold" style="color:#8A5B00">YOUR POINTS</div><div style="font-size:24px;font-weight:800;font-variant-numeric:tabular-nums">${S.points.toLocaleString()}</div></div>${ic("spark").replace("<svg", '<svg style="width:28px;height:28px;color:var(--sun)"')}</div>
    <div class="stack" style="gap:8px">${[
      ["sun", "Sun", "sun", "#FDEBC4", "#8A5B00"],
      ["water", "Water", "drop", "#DDEFF7", "#1F6A8A"],
      ["fert", "Fertiliser", "fert", "#EDE3D5", "#7A5334"],
    ]
      .map(
        ([k, n, i, bg, fg]) => `<div class="card row" style="padding:10px 12px">
      <span class="avatar" style="background:${bg};color:${fg};width:36px;height:36px">${ic(i).replace("<svg", '<svg style="width:18px;height:18px"')}</span>
      <div class="grow"><div class="bold small">${n}</div><div class="tiny muted">${cost[k]} pts each · you have ${S.res[k]}</div></div>
      <button class="iconbtn" style="width:30px;height:30px;background:var(--bg)" data-a="shopm" data-hold="1" data-v="${k}" aria-label="Less ${n}" ${S.shop[k] ? "" : "disabled"}>${ic("minus")}</button>
      <b style="width:18px;text-align:center;font-variant-numeric:tabular-nums">${S.shop[k]}</b>
      <button class="iconbtn" style="width:30px;height:30px;background:var(--green);color:#fff" data-a="shopp" data-hold="1" data-v="${k}" aria-label="More ${n}" ${S.points - total >= cost[k] ? "" : "disabled"}>${ic("plus")}</button></div>`,
      )
      .join("")}</div>
    ${S.points < 5 ? `<div class="note" style="margin-top:12px">Not enough points yet. Check in daily or log an eco action in Check-in to earn more.</div>` : ""}
    <div class="row" style="margin:12px 2px"><span class="grow small muted">Total · ${(S.points - total).toLocaleString()} pts left after</span><b style="font-size:18px">${total} pts</b></div>
    <button class="btn" data-a="shopok" ${total ? "" : "disabled"}>Swap ${total} points</button>`;
  } else if (sh.n === "plantpick") {
    const ks = Object.keys(S.qty).filter((k) => S.qty[k] > 0);
    h = `<h3>Plant a seed</h3><div class="small muted">Each seed goes into a new pot. There’s no limit.</div>
    ${
      ks.length
        ? `<div class="grid3" style="margin-top:12px">${ks.map((k) => `<button class="seedcard" data-a="doplant" data-v="${k}"><div class="art"><div class="ribbon">${SEEDS[k].name}</div>${plantSVG(k, 3)}</div><div class="foot"><span>×${S.qty[k]}</span><span class="src ${sm(k).src !== "daily" ? "ev" : ""}">${srcTag(sm(k).src)}</span></div></button>`).join("")}</div>`
        : `<div class="card small muted" style="margin-top:12px">No seeds left. Check in daily or come to an EA event to get more.</div>`
    }`;
  } else if (sh.n === "full") {
    h = `<div class="bigico">${ic("leaf")}</div><h3 class="center">Your 3 plots are full</h3><div class="small muted center" style="margin-bottom:14px">Harvest a fully grown plant to free a plot. Your seed stays saved.</div><button class="btn" data-a="closego" data-v="garden">Go to garden</button>`;
  } else if (sh.n === "reward") {
    const s = sm(sh.k);
    h = `<div class="center stack" style="gap:6px"><div class="chip ${sh.src === "event" ? "sun" : ""}" style="align-self:center">${sh.src === "event" ? "Event seed" : "Daily seed"}</div><h3>You got a ${s.name} seed</h3>
    <div style="width:130px;margin:6px auto">${seedCard(sh.k)}</div>
    <div class="small muted">+${sh.pts} pts${sh.src === "event" ? " · checked in to " + EVENT.title : " · 7-day streak complete"}</div></div>
    <div class="row" style="margin-top:14px"><button class="btn alt" data-a="closego" data-v="seeds">See my seeds</button><button class="btn" data-a="plantseed" data-v="${sh.k}">Plant now</button></div>`;
  } else if (sh.n === "already") {
    h = `<div class="bigico">${ic(sh.via === "nfc" ? "nfc" : "qr")}</div><h3 class="center">This badge has already been used</h3>
    <div class="card stack" style="gap:6px;margin:12px 0">
      <div class="row small"><span class="grow muted">Badge</span><b style="font-variant-numeric:tabular-nums">${EVENT.badge}</b></div>
      <div class="row small"><span class="grow muted">Event</span><b>${EVENT.title}</b></div>
      <div class="row small"><span class="grow muted">Collected</span><b>${S.claimedAt || "Today"}</b></div>
    </div>
    <div class="small muted center" style="margin-bottom:14px;line-height:1.5">The QR code and the NFC tag on a badge are linked, so each badge works once. You can still get the same seed again from other events or daily check-ins.</div>
    <button class="btn" data-a="close">OK</button>`;
  } else if (sh.n === "dup") {
    const s = SEEDS[sh.k];
    const n = S.qty[sh.k] || 0;
    h = `<div class="center stack" style="gap:6px"><div class="chip ${sh.src === "event" ? "sun" : ""}" style="align-self:center">${sh.src === "event" ? "Event seed" : "Daily seed"} · +${sh.pts} pts</div>
      <div style="width:120px;margin:6px auto">${seedCard(sh.k)}</div>
      <h3>You already have a ${s.name} seed</h3>
      <div class="small muted" style="line-height:1.5">Keep it to plant another one, or swap it for points.${n ? ` You have ${n} waiting to be planted.` : ""}</div></div>
    <div class="row" style="margin-top:14px"><button class="btn alt" data-a="keepdup">Keep the seed</button><button class="btn" data-a="swapdup">Swap for ${DUP_VALUE[sh.src]} pts</button></div>`;
  } else if (sh.n === "share") {
    const u = encodeURIComponent(me().uid);
    const link =
      sh.k === "event"
        ? "easprout.app/e/seed-swap?from=" + u
        : sh.k === "garden"
          ? "easprout.app/g/" + u
          : "easprout.app/join?from=" + u;
    h = `<h3>${sh.k === "event" ? "Share this activity" : sh.k === "garden" ? "Share your garden" : "Invite friends"}</h3>
    <div class="small muted" style="margin-bottom:12px">Anyone with the link can see ${sh.k === "event" ? "the activity and join EA Sprout" : sh.k === "garden" ? "your plants. They can’t see your email or reminders" : "what EA Sprout is and sign up"}.</div>
    <div class="linkbox">${ic("link").replace("<svg", '<svg style="width:16px;height:16px;color:var(--green);flex:none"')}<code id="sharelink">${link}</code><button class="btn sm" data-a="copy" data-v="${link}">${sh.copied ? "Copied" : "Copy"}</button></div>
    <button class="btn line" style="margin-top:12px" data-a="invite" data-v="${sh.k}">${ic("eye")} Preview what they’ll see</button>`;
  } else if (sh.n === "fmenu") {
    const f = FRIENDS.find((x) => x.id === sh.id);
    h = sh.confirm
      ? `<h3>Block ${f.name}?</h3><div class="small muted" style="margin-bottom:14px">They won’t see your garden or posts, and you won’t see theirs. They won’t be told. You can unblock them in Privacy.</div><div class="row"><button class="btn alt" data-a="close">Cancel</button><button class="btn warn" data-a="block" data-v="${f.id}">${ic("ban")} Block</button></div>`
      : `<h3>${f.name}</h3><div class="card list" style="padding:2px 14px;margin-top:10px"><button class="item" style="width:100%;text-align:left;color:var(--danger)" data-a="blockask">${ic("ban").replace("<svg", '<svg style="width:18px;height:18px"')}<span class="grow bold small">Block ${f.name}</span></button></div>`;
  } else if (sh.n === "gift") {
    h = `<div class="gift center stack">
      <div class="giftstage"><div class="giftrays"></div>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<i class="conf" style="--a:${i * 45}deg;--d:${(i % 3) * 0.08}s;background:${["#F2B63C", "#E27A9A", "#6FA35E", "#3F8FA8"][i % 4]}"></i>`).join("")}
        <div class="giftcard"><div class="art"><div class="cloud"></div><div class="ribbon">Sunflower</div>${plantSVG("sunflower", 3)}</div><div class="foot"><span>Flower</span><span class="src ev">Welcome gift</span></div></div></div>
      <div class="chip sun" style="align-self:center">${ic("spark")} Welcome gift</div>
      <h3 style="font-size:22px">Congratulations, ${esc(firstName())}!</h3>
      <div class="small muted" style="line-height:1.5">Thank you for joining EA Sprout. Here is your first seed, a <b>Sunflower</b>, plus <b>150 points</b> for sun, water and fertiliser. That’s enough to grow it all the way to bloom.</div>
      <button class="btn" data-a="giftplant">${ic("leaf")} Plant my sunflower</button>
      <button class="btn line" data-a="close">Later</button>
      <div class="tiny muted">You can find it any time in Garden, My seeds.</div>
    </div>`;
  } else if (sh.n === "wa") {
    h = `<div class="bigico">${ic("chat")}</div><h3 class="center">EnvironmentallyAbled 🌱</h3><div class="small muted center">WhatsApp community · 2 groups</div>
    <div class="note" style="margin:14px 0">Only admins can add members to this community. We’ll send your request with your name (${esc(me().name)}) so an admin can invite you. This is a test version, so nothing is actually sent.</div>
    <div class="row"><button class="btn alt" data-a="close">Not now</button><button class="btn" data-a="waok">Ask to join</button></div>`;
  } else if (sh.n === "leave") {
    h = `<h3>Cancel your spot?</h3><div class="small muted" style="margin-bottom:14px">The reminder will be removed from your Profile. You can join again later.</div><div class="row"><button class="btn alt" data-a="close">Keep my spot</button><button class="btn warn" data-a="leaveok">Cancel spot</button></div>`;
  }
  const fresh = S._sheetOpen !== sh.n;
  S._sheetOpen = sh.n;
  return `<div class="scrim" data-a="scrim"><div class="sheet ${fresh ? "in" : ""}" role="dialog" aria-modal="true"><div class="grab"></div>${h}</div></div>`;
}
