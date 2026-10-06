/* Sign up, log in, avatars and the welcome gift. */

function avatarSVG(id, size = 38) {
  const a = AVATARS.find((x) => x.id === id) || AVATARS[0];
  return `<svg viewBox="0 0 64 64" width="${size}" height="${size}" style="border-radius:50%;background:${a.bg};flex:none;display:block" aria-hidden="true">${a.art}</svg>`;
}

const me = () => S.user || { name: "Guest", uid: "guest", av: "sprout", email: "" };

function avatarFor(u, size = 38) {
  if (u.av === "upload" && u.avImg)
    return `<img src="${u.avImg}" alt="" width="${size}" height="${size}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;display:block;flex:none">`;
  return avatarSVG(u.av === "upload" ? "sprout" : u.av, size);
}

const firstName = () => me().name.split(" ")[0];

const greet = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning," : h < 18 ? "Good afternoon," : "Good evening,";
};

function hashPw(p) {
  let h = 5381;
  for (const c of p) h = ((h << 5) + h + c.charCodeAt(0)) | 0;
  return "h" + (h >>> 0).toString(36);
}

function loadAccounts() {
  try {
    return JSON.parse(localStorage.getItem("eas-accounts") || "[]");
  } catch (e) {
    return [];
  }
}

function saveAccounts(a) {
  try {
    localStorage.setItem("eas-accounts", JSON.stringify(a));
  } catch (e) {}
}

let ACCOUNTS = loadAccounts();

ACCOUNTS = ACCOUNTS.filter((a) => a.email && a.uid && a.uid !== "jamie");

ACCOUNTS.push({
  uid: "jamie",
  pw: hashPw("123456"),
  name: "Jamie Lee",
  av: "sun",
  email: "jamie.lee@email.com",
  member: "existing",
});

function submitForm(k) {
  if (k === "rem") {
    const t = (S.newrem || "").trim();
    if (t) {
      S.reminders.push({ id: Date.now(), text: t, done: false });
      S.newrem = "";
    }
    return;
  }
  const F = S.form;
  const er = {};
  if (k === "su1") {
    const u = (F.email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(u)) er.email = "Enter an email like name@example.com";
    else if (ACCOUNTS.find((a) => a.email === u))
      er.email = "That email already has an account. Try logging in.";
    if ((F.pw || "").length < 6) er.pw = "Use at least 6 characters";
    if (!er.pw && F.pw !== F.pw2) er.pw2 = "Passwords don’t match";
    F._e = er;
    if (!Object.keys(er).length) {
      F.email = u;
      S.showPw = false;
      S.stack = [{ n: "su2" }];
    }
  } else if (k === "su2") {
    if (!(F.name || "").trim()) er.name = "Add a name so friends know it’s you";
    F._e = er;
    if (!Object.keys(er).length) S.stack = [{ n: "su3" }];
  } else if (k === "su3") {
    if (!F.member) er.member = "Choose one";
    F._e = er;
    if (!Object.keys(er).length) {
      const acc = {
        uid: Math.random().toString(36).slice(2, 8),
        email: F.email,
        pw: hashPw(F.pw),
        name: F.name.trim(),
        av: F.av || "sprout",
        avImg: F.av === "upload" ? F.avImg : null,
        member: F.member,
      };
      ACCOUNTS.push(acc);
      saveAccounts(ACCOUNTS.filter((a) => a.uid !== "jamie"));
      signIn(acc, true);
    }
  } else if (k === "login") {
    const u = (F.lu || "").trim().toLowerCase();
    const a = ACCOUNTS.find((x) => x.email === u);
    if (!a || a.pw !== hashPw(F.lp || ""))
      er.login = "Email or password is wrong. Check and try again.";
    F._e = er;
    if (!a || er.login) {
    } else signIn(a, false);
  }
}

function showGift() {
  S.giftShown = true;
  S.sheet = { n: "gift" };
}

function signIn(acc, isNew) {
  S.user = {
    uid: acc.uid,
    name: acc.name,
    av: acc.av,
    avImg: acc.avImg || null,
    email: acc.email,
    member: acc.member,
  };
  const d = acc.uid === "jamie" ? jamieData() : loadData(acc.uid) || newData();
  Object.assign(S, clone(d));
  if (isNew) {
    S.privacy.email = false;
    S.newbie = acc.member === "new";
  }
  S.gview = "focus";
  S.panX = 0;
  S.filter = "all";
  S.search = "";
  S.fsearch = "";
  S.form = {};
  S.showPw = false;
  S.stack = [
    { n: isNew && acc.member === "new" ? "aboutea" : "home", first: isNew && acc.member === "new" },
  ];
  if (!(isNew && acc.member === "new")) {
    if (!S.giftShown) showGift();
    else toast("Welcome back, " + acc.name.split(" ")[0]);
  }
}
