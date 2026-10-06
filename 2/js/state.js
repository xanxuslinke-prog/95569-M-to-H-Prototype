/* App state, per-account data (Jamie test data vs new account), saving, navigation and small helpers. */

const S = {
  points: 0,
  res: { sun: 0, water: 0, fert: 0 },
  qty: {},
  owned: {},
  meta: {},
  plots: [],
  grown: [],
  harvested: 0,
  events: 0,
  joined: false,
  claimed: false,
  streak: 0,
  checked: false,
  eco: {},
  blocked: [],
  likes: {},
  watered: {},
  reminders: [],
  friends: [],
  waReq: false,
  privacy: { email: false, garden: "friends" },
  notif: { events: true, friends: true, daily: false },
  panX: 0,
  filter: "all",
  sort: "date",
  search: "",
  fsearch: "",
  gview: "focus",
  focus: 0,
  shop: { sun: 0, water: 0, fert: 0 },
  fx: null,
  stack: [{ n: "welcome" }],
  user: null,
  form: {},
  showPw: false,
  newbie: true,
  sheet: null,
  toast: null,
  cam: null,
  ar: null,
  verify: null,
  anim: null,
};

const DATA_KEYS = [
  "points",
  "res",
  "qty",
  "owned",
  "meta",
  "plots",
  "harvested",
  "events",
  "joined",
  "claimed",
  "streak",
  "checked",
  "eco",
  "blocked",
  "likes",
  "watered",
  "reminders",
  "friends",
  "waReq",
  "privacy",
  "notif",
  "focus",
  "newbie",
  "giftShown",
  "claimedAt",
  "week",
  "grown",
];

const todayStr = () =>
  new Date().toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });

function jamieData() {
  return {
    points: 1240,
    res: { sun: 4, water: 4, fert: 2 },
    qty: {
      sunflower: 0,
      hibiscus: 1,
      orchid: 1,
      lemon: 1,
      basil: 1,
      tomato: 0,
      lavender: 0,
      marigold: 0,
      bottlebrush: 0,
    },
    owned: { sunflower: 1, hibiscus: 1, orchid: 1, lemon: 1, basil: 1, tomato: 1, lavender: 1 },
    meta: {},
    plots: [
      { seed: "tomato", g: 170, pot: "terra", x: 84, y: 338 },
      { seed: "basil", g: 300, pot: "tin", x: 170, y: 278 },
      { seed: "sunflower", g: 40, pot: "glaze", x: 236, y: 372 },
      { seed: "lavender", g: 220, pot: "white", x: 326, y: 300 },
    ],
    harvested: 2,
    events: 3,
    joined: false,
    claimed: false,
    streak: 6,
    checked: false,
    eco: {},
    blocked: [],
    likes: {},
    watered: {},
    reminders: [{ id: 1, text: "Bring a reusable cup", done: false }],
    friends: ["priya", "maya", "sam", "theo"],
    waReq: false,
    privacy: { email: false, garden: "friends" },
    notif: { events: true, friends: true, daily: false },
    focus: 0,
    newbie: false,
    giftShown: true,
    claimedAt: null,
    week: 1,
    grown: [
      { seed: "orchid", pot: "white", date: "14 Sep 2026" },
      { seed: "basil", pot: "tin", date: "20 Sep 2026" },
    ],
  };
}

function newData() {
  return {
    points: 150,
    res: { sun: 0, water: 0, fert: 0 },
    qty: { sunflower: 1 },
    owned: { sunflower: 1 },
    meta: { sunflower: { src: "gift", from: "Welcome gift", date: todayStr(), order: 0 } },
    plots: [],
    harvested: 0,
    events: 0,
    joined: false,
    claimed: false,
    streak: 0,
    checked: false,
    eco: {},
    blocked: [],
    likes: {},
    watered: {},
    reminders: [],
    friends: [],
    waReq: false,
    privacy: { email: false, garden: "friends" },
    notif: { events: true, friends: true, daily: false },
    focus: 0,
    newbie: true,
    giftShown: false,
    claimedAt: null,
    week: 0,
    grown: [],
  };
}

const clone = (o) => JSON.parse(JSON.stringify(o));

function loadData(u) {
  try {
    const d = JSON.parse(localStorage.getItem("eas-st-" + u) || "null");
    return d;
  } catch (e) {
    return null;
  }
}

function saveData() {
  if (!S.user || S.user.uid === "jamie") return;
  const d = {};
  DATA_KEYS.forEach((k) => (d[k] = S[k]));
  try {
    localStorage.setItem("eas-st-" + S.user.uid, JSON.stringify(d));
  } catch (e) {}
}

const sm = (k) => ({ ...SEEDS[k], ...(S.meta[k] || {}) });

const srcTag = (src, long) =>
  src === "event"
    ? long
      ? "Event seed"
      : "Event"
    : src === "gift"
      ? long
        ? "Welcome gift"
        : "Gift"
      : long
        ? "Daily seed"
        : "Daily";

const cur = () => S.stack[S.stack.length - 1];

const go = (n, p = {}) => {
  S.stack.push({ n, ...p });
  S.sheet = null;
};

const back = () => {
  if (S.stack.length > 1) S.stack.pop();
  S.sheet = null;
};

const tabTo = (n) => {
  S.stack = [{ n }];
  S.sheet = null;
  S.cam = null;
};

let toastT;

function toast(msg) {
  S.toast = msg;
  clearTimeout(toastT);
  toastT = setTimeout(() => {
    S.toast = null;
    render();
  }, 2600);
}

const stageOf = (g) => Math.min(3, Math.floor(g / 100));

const stageName = (g, key) =>
  ["Seed", "Sprout", "Growing", SEEDS[key] && SEEDS[key].cat === "flower" ? "Blooming" : "Grown"][
    stageOf(g)
  ];

const esc = (t) =>
  String(t).replace(
    /[&<>"]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m],
  );

const initials = (n) =>
  n
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2);

const shopTotal = () => Object.keys(COST).reduce((a, k) => a + COST[k] * S.shop[k], 0);
