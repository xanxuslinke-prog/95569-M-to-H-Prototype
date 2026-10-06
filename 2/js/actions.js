/* What every button does. Each key matches a data-a="..." attribute in the screens. */

const A = {
  back: () => back(),
  authgo: (v) => {
    S.form = { _e: {} };
    S.showPw = false;
    S.stack = [{ n: v }];
  },
  authback: (v) => {
    S.form._e = {};
    S.showPw = false;
    S.stack = [{ n: v }];
  },
  showpw: () => {
    S.showPw = !S.showPw;
  },
  wa: () => {
    S.sheet = { n: "wa" };
  },
  waok: () => {
    S.waReq = true;
    S.sheet = null;
    toast("Request sent. An EA admin will add you.");
  },
  startapp: () => {
    S.stack = [{ n: "home" }];
    if (!S.giftShown) showGift();
  },
  giftplant: () => {
    S.sheet = null;
    plantInto("sunflower");
  },
  submit: (v) => {
    submitForm(v);
  },
  quickjamie: () => {
    signIn(
      ACCOUNTS.find((a) => a.uid === "jamie"),
      false,
    );
  },
  pickav: (v) => {
    S.form.av = v;
  },
  member: (v) => {
    S.form.member = v;
    if (S.form._e) delete S.form._e.member;
  },
  hidenew: () => {
    S.newbie = false;
  },
  logout: () => {
    S.user = null;
    S.form = { _e: {} };
    S.stack = [{ n: "welcome" }];
    toast("Logged out");
  },

  tab: (v) => tabTo(v),
  go: (v) => go(v),
  close: () => {
    S.sheet = null;
  },
  scrim: (v, el, e) => {
    if (e.target === el) S.sheet = null;
  },
  closego: (v) => {
    S.sheet = null;
    tabTo("garden");
    if (v !== "garden") go("seeds");
  },
  like: (v) => {
    S.likes[v] = !S.likes[v];
  },
  friend: (v) => {
    if (cur().n !== "friends") {
      tabTo("garden");
      go("friends");
    }
    go("friend", { id: v });
  },
  join: () => {
    S.joined = true;
    toast("You’re going. Reminder added to your Profile.");
  },
  leave: () => {
    S.sheet = { n: "leave" };
  },
  leaveok: () => {
    S.joined = false;
    S.sheet = null;
    toast("Spot cancelled");
  },
  share: (v) => {
    S.sheet = { n: "share", k: v };
  },
  copy: (v) => {
    try {
      navigator.clipboard.writeText("https://" + v).catch(() => {});
    } catch (e) {}
    S.sheet.copied = true;
    toast("Link copied");
  },
  invite: (v) => {
    S.sheet = null;
    go("invite", { kind: v });
  },
  scan: (v) => {
    S.lastScan = v;
    S.sheet = null;
    S.cam = { mode: v, phase: v === "qr" ? "scan" : "intro" };
  },
  camclose: () => {
    S.cam = null;
  },
  keepdup: () => {
    const k = S.sheet.k;
    S.qty[k] = (S.qty[k] || 0) + 1;
    S.sheet = null;
    toast(
      "Kept. You have " +
        S.qty[k] +
        " " +
        SEEDS[k].name.toLowerCase() +
        " seed" +
        (S.qty[k] > 1 ? "s" : "") +
        " to plant",
    );
  },
  swapdup: () => {
    const v = DUP_VALUE[S.sheet.src];
    S.points += v;
    S.sheet = null;
    toast("Swapped for " + v + " pts");
  },
  nfcready: () => {
    S.cam.phase = "wait";
  },
  dosim: () => {
    S.cam.phase = "busy";
    setTimeout(() => {
      S.cam = null;
      if (S.claimed) {
        // The QR code and NFC tag on a badge share one code, so a used badge stays used.
        S.sheet = { n: "already", via: S.lastScan };
      } else {
        S.claimed = true;
        S.claimedAt = todayStr();
        giveSeed(EVENT.seed, "event", EVENT.pts, EVENT.title);
      }
      render();
    }, 1200);
  },
  daily: () => {
    if (S.checked) return;
    S.checked = true;
    S.streak = Math.min(7, S.streak + 1);
    S.points += 10;
    if (S.streak === 7) {
      const k = DAILY_SEEDS[S.week % DAILY_SEEDS.length];
      S.week++;
      giveSeed(k, "daily", 10, "7-day check-in");
    } else toast("+10 pts · day " + S.streak + " of 7");
  },
  eco: (v) => {
    S.verify = { id: v, phase: "ready", img: null };
  },
  vclose: (v, el, e) => {
    if (el.classList.contains("scrim") && e.target !== el) return;
    S.verify = null;
  },
  vself: () => {
    const e = ECO.find((x) => x.id === S.verify.id);
    S.eco[e.id] = true;
    S.points += e.pts;
    S.verify = null;
    toast("+" + e.pts + " pts for " + e.name.toLowerCase());
  },
  vsample: () => {
    S.verify.img = samplePhoto(S.verify.id);
  },
  vsubmit: () => {
    S.verify.phase = "checking";
    setTimeout(() => {
      if (!S.verify) return;
      const e = ECO.find((x) => x.id === S.verify.id);
      S.verify.phase = "done";
      S.eco[e.id] = true;
      S.points += e.pts;
      render();
    }, 1600);
  },
  gview: (v) => {
    flyTo(v === "all" ? "all" : "focus", S.focus);
    return false;
  },
  plot: (v) => {
    S.focus = +v;
    S.gview = "focus";
  },
  fprev: () => {
    if (S.fx || S.plots.length < 2) return false;
    flyTo("focus", (S.focus - 1 + S.plots.length) % S.plots.length);
    return false;
  },
  fnext: () => {
    if (S.fx || S.plots.length < 2) return false;
    flyTo("focus", (S.focus + 1) % S.plots.length);
    return false;
  },
  care: (v) => {
    const p = S.plots[S.focus];
    if (S.fx) return;
    if (!S.res[v]) {
      S.shop = { sun: 0, water: 0, fert: 0 };
      if (S.points >= COST[v]) S.shop[v] = 1;
      S.sheet = { n: "shop", need: v };
      return;
    }
    const gain = { sun: 10, water: 15, fert: 30 }[v];
    S.res[v]--;
    S.fx = v;
    setTimeout(() => {
      const before = stageOf(p.g);
      p.g = Math.min(300, p.g + gain);
      S.fx = null;
      S.anim = "f";
      if (stageOf(p.g) > before)
        toast(SEEDS[p.seed].name + " is now " + stageName(p.g, p.seed).toLowerCase());
      else toast("+" + gain + " growth");
      render();
    }, 1500);
  },
  harvest: () => {
    const p = S.plots[S.focus];
    toast(SEEDS[p.seed].name + " harvested · +20 pts");
    S.points += 20;
    S.harvested++;
    S.grown.unshift({ seed: p.seed, pot: p.pot, date: todayStr() });
    S.plots.splice(S.focus, 1);
    S.focus = Math.max(0, S.focus - 1);
    if (!S.plots.length) S.gview = "all";
  },
  shop: () => {
    S.shop = { sun: 0, water: 0, fert: 0 };
    S.sheet = { n: "shop" };
  },
  shopp: (v) => {
    if (S.points - shopTotal() >= COST[v]) S.shop[v]++;
  },
  shopm: (v) => {
    if (S.shop[v]) S.shop[v]--;
  },
  shopok: () => {
    const t = shopTotal();
    if (!t || t > S.points) return;
    for (const k in COST) S.res[k] += S.shop[k];
    S.points = Math.max(0, S.points - t);
    S.sheet = null;
    toast("Swapped " + t + " pts for care items");
  },
  plantpick: () => {
    S.sheet = { n: "plantpick" };
  },
  doplant: (v) => {
    plantInto(v);
  },
  plantseed: (v) => {
    plantInto(v);
  },
  seed: (v) => {
    if (S.sheet && (S.sheet.n === "reward" || S.sheet.n === "dup")) {
      return;
    }
    go("seed", { k: v });
  },
  about: () => {
    cur().about = !cur().about;
  },
  filter: (v) => {
    S.filter = v;
  },
  sort: (v) => {
    S.sort = v;
  },
  waterfriend: (v) => {
    S.watered[v] = true;
    S.points += 5;
    toast("Watered · +5 pts");
  },
  fmenu: () => {
    S.sheet = { n: "fmenu", id: cur().id };
  },
  blockask: () => {
    S.sheet.confirm = true;
  },
  block: (v) => {
    S.blocked.push(v);
    S.sheet = null;
    S.stack.pop();
    toast("Blocked. You can undo this in Privacy.");
  },
  unblock: (v) => {
    S.blocked = S.blocked.filter((x) => x !== v);
    toast("Unblocked");
  },
  pemail: () => {
    S.privacy.email = !S.privacy.email;
  },
  pgarden: (v) => {
    S.privacy.garden = v;
  },
  notif: (v) => {
    S.notif[v] = !S.notif[v];
  },
  rdone: (v) => {
    const r = S.reminders.find((x) => x.id == v);
    r.done = !r.done;
  },
  rdel: (v) => {
    S.reminders = S.reminders.filter((x) => x.id != v);
  },
  ar: (v) => {
    const items = arItems();
    if (!items.length) {
      toast("Plant something first");
      return;
    }
    // start on the plant you were looking at, or the grown plant you tapped
    let sel = 0;
    if (v && v.startsWith("g")) sel = S.plots.length + +v.slice(1);
    else if (S.plots[S.focus]) sel = S.focus;
    S.ar = { sel, x: 50, y: 58, size: 170, bg: null, shot: false };
  },
  arclose: () => {
    S.ar = null;
  },
  arshot: () => {
    S.ar.flash = true;
    S.ar.shot = true;
    setTimeout(() => {
      if (S.ar) {
        S.ar.flash = false;
        render();
      }
    }, 500);
  },
  arpick: (v) => {
    S.ar.sel = +v;
  },
  arretake: () => {
    S.ar.shot = false;
  },
};

/* Plants you can put in an AR photo: everything in your garden, plus plants you have harvested. */
function arItems() {
  return [
    ...S.plots.map((p) => ({
      seed: p.seed,
      pot: p.pot,
      stage: stageOf(p.g),
      label: stageName(p.g, p.seed),
    })),
    ...S.grown.map((g) => ({ seed: g.seed, pot: g.pot, stage: 3, label: "Grown" })),
  ];
}

/* Give a seed. A seed you don't have yet is added straight away.
   A seed you already have opens a choice: keep it to plant another, or swap it for points. */
function giveSeed(k, src, pts, from) {
  S.points += pts;
  if (S.owned[k]) {
    S.sheet = { n: "dup", k, src, pts };
    return;
  }
  S.owned[k] = 1;
  S.qty[k] = (S.qty[k] || 0) + 1;
  S.meta[k] = { src, from, date: todayStr(), order: Date.now() };
  S.sheet = { n: "reward", k, pts, src };
}

function plantInto(k) {
  if (!S.qty[k]) return;
  S.qty[k]--;
  const sp = freeSpot();
  S.plots.push({ seed: k, g: 0, pot: POTS[S.plots.length % POTS.length], x: sp.x, y: sp.y });
  const i = S.plots.length - 1;
  S.sheet = null;
  tabTo("garden");
  S.gview = "focus";
  S.focus = i;
  S.fx = "plant";
  setTimeout(() => {
    S.fx = null;
    S.anim = "f";
    toast(SEEDS[k].name + " planted in a new pot");
    render();
  }, 1700);
}
