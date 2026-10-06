/* Welcome page, 3-step sign up and log in. */

SCR.welcome = () => ({
  html: `<div class="auth welcome">
  <div class="wscene">${gardenBG(390).replace('class="gbg"', 'class="gbg" preserveAspectRatio="xMidYMax slice" style="width:100%;height:100%"')}
    <div class="wplants">${["sunflower", "tomato", "lavender"].map((k, i) => plantSVG(k, 3, "", ["terra", "tin", "glaze"][i])).join("")}</div></div>
  <div class="wbody stack">
    <div><div class="tiny bold" style="letter-spacing:.08em;color:var(--green)">ENVIRONMENTALLYABLED</div>
    <h1 class="wtitle">EA Sprout</h1>
    <p class="muted" style="margin:6px 0 0;line-height:1.5">Join local eco activities, collect seeds and grow a garden with your community.</p></div>
    <button class="btn" data-a="authgo" data-v="su1">Create an account</button>
    <button class="btn line" data-a="authgo" data-v="login">I already have an account</button>
    <button class="small bold" style="color:var(--green);padding:6px" data-a="quickjamie">Skip and use the test account (Jamie)</button>
    <div class="tiny muted center">Test version for Interaction Design Studio. Don’t use a real password.</div>
  </div></div>`,
});

SCR.su1 = () => {
  const e = S.form._e || {};
  return {
    html: authShell(
      `
  <div class="stack"><h2 class="atitle">Create your account</h2><p class="muted small" style="margin:0">You’ll log in with your email. It stays private unless you choose to show it in Privacy settings.</p></div>
  <div class="stack" data-form="su1">
    ${field("email", "Email", { type: "email", ph: "you@example.com", err: e.email, ac: "email" })}
    ${field("pw", "Password", { type: "password", ph: "At least 6 characters", err: e.pw, ac: "new-password" })}
    ${field("pw2", "Confirm password", { type: "password", ph: "Type it again", err: e.pw2, ac: "new-password" })}
    <button class="btn" data-a="submit" data-v="su1">Next</button>
  </div>
  <div class="small center muted">Already have one? <button class="bold" style="color:var(--green)" data-a="authgo" data-v="login">Log in</button></div>`,
      { step: 1, backTo: "welcome" },
    ),
  };
};

SCR.su2 = () => {
  const e = S.form._e || {};
  const av = S.form.av || "sprout";
  const up = S.form.avImg;
  return {
    html: authShell(
      `
  <div class="stack"><h2 class="atitle">Make it yours</h2><p class="muted small" style="margin:0">This is how other members see you.</p></div>
  <div class="center" style="margin:4px 0;display:flex;justify-content:center">${avatarFor({ av, avImg: up }, 92)}</div>
  <div class="avgrid" role="radiogroup" aria-label="Choose an avatar">
    <label class="avopt avup ${av === "upload" ? "on" : ""}" for="avfile" role="radio" aria-checked="${av === "upload"}" aria-label="Upload your own photo">${up ? avatarFor({ av: "upload", avImg: up }, 52) : `<span class="upcirc">${ic("camera")}<span>Upload</span></span>`}</label>
    <input id="avfile" type="file" accept="image/*" data-file="avatar" hidden>
    ${AVATARS.slice(0, 7)
      .map(
        (a) =>
          `<button class="avopt ${a.id === av ? "on" : ""}" data-a="pickav" data-v="${a.id}" role="radio" aria-checked="${a.id === av}" aria-label="${a.id}">${avatarSVG(a.id, 52)}</button>`,
      )
      .join("")}</div>
  ${up ? `<div class="tiny muted center">Tap the first circle again to choose a different photo.</div>` : ""}
  <div class="stack" data-form="su2">
    ${field("name", "Display name", { ph: "e.g. Lin", err: e.name, max: 24, hint: "You can use a nickname" })}
    <button class="btn" data-a="submit" data-v="su2">Next</button>
  </div>`,
      { step: 2, backTo: "su1" },
    ),
  };
};

SCR.su3 = () => {
  const e = S.form._e || {};
  const m = S.form.member;
  return {
    html: authShell(
      `
  <div class="stack"><h2 class="atitle">A bit about you</h2><p class="muted small" style="margin:0">Helps us show you the right things first.</p></div>
  <div class="stack" data-form="su3">
    <div class="stack" style="gap:8px"><span class="flabel">Have you been to an EnvironmentallyAbled activity before?</span>
      <button type="button" class="choice ${m === "existing" ? "on" : ""}" data-a="member" data-v="existing"><b>Yes, I’ve been before</b><span>You can collect seeds at your next activity</span></button>
      <button type="button" class="choice ${m === "new" ? "on" : ""}" data-a="member" data-v="new"><b>No, I’m new</b><span>We’ll show you how it works</span></button>
      ${e.member ? `<span class="ferr">${e.member}</span>` : ""}</div>
    <button class="btn" data-a="submit" data-v="su3">Create account</button>
  </div>`,
      { step: 3, backTo: "su2" },
    ),
  };
};

SCR.login = () => {
  const e = S.form._e || {};
  return {
    html: authShell(
      `
  <div class="stack"><h2 class="atitle">Welcome back</h2><p class="muted small" style="margin:0">Log in to see your garden.</p></div>
  <div class="stack" data-form="login">
    ${field("lu", "Email", { type: "email", ph: "you@example.com", ac: "email" })}
    ${field("lp", "Password", { type: "password", ph: "Your password", ac: "current-password" })}
    ${e.login ? `<div class="ferr" role="alert">${e.login}</div>` : ""}
    <button class="btn" data-a="submit" data-v="login">Log in</button>
  </div>
  <div class="note">Test account: <b>jamie.lee@email.com</b>, password <b>123456</b></div>
  <div class="small center muted">New here? <button class="bold" style="color:var(--green)" data-a="authgo" data-v="su1">Create an account</button></div>`,
      { backTo: "welcome" },
    ),
  };
};
