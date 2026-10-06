/* Meet EnvironmentallyAbled page (shown to new members after sign up, and from Profile). */

SCR.aboutea = () => {
  const first = cur().first;
  return {
    tab: first ? null : "profile",
    light: true,
    html: `
  ${first ? `<div class="hero">${leafDeco()}<div class="sunball"></div><p style="margin:0">Welcome, ${esc(firstName())}</p><h1>Meet EnvironmentallyAbled</h1></div>` : bar("About EnvironmentallyAbled")}
  <div class="pad stack">
    <div class="card stack" style="gap:10px;line-height:1.55;font-size:14px">
      <div class="row">${avatarSVG("sprout", 40)}<div class="grow"><div class="bold">Kumkum Dubey</div><div class="tiny muted">Founder, EnvironmentallyAbled</div></div></div>
      <p style="margin:0">Hi! I am Kumkum :)</p>
      <p style="margin:0">I created EnvironmentallyAbled to bring together people from diverse professions to explore one simple idea:<br><b>The environment is everyone’s responsibility.</b></p>
      <p style="margin:0">Through conversations, storytelling, and shared experiences, this platform aims to make environmental awareness more personal, relatable, and collective.</p>
      <p style="margin:0">Because caring for the environment isn't just a role — it's a shared responsibility.</p>
      <p style="margin:0">Environmentally Yours,<br>Kumkum Dubey<br>Stay connected with nature!</p>
      <div class="tiny muted">From EnvironmentallyAbled’s Humanitix page</div>
    </div>
    <div class="label">Stay connected</div>
    ${EA_LINKS.map((l) => `<a class="eco" href="${l.u}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><span class="ic">${ic(l.ic)}</span><span class="grow"><span class="bold small" style="display:block">${l.n}</span><span class="tiny muted">${l.d}</span></span>${ic("chev").replace("<svg", '<svg style="width:16px;height:16px;color:var(--muted)"')}</a>`).join("")}
    <button class="eco" data-a="wa" ${S.waReq ? "disabled" : ""}><span class="ic">${ic("chat")}</span><span class="grow"><span class="bold small" style="display:block">WhatsApp community</span><span class="tiny muted">${S.waReq ? "Request sent. An admin will add you." : "Admins add new members. Ask to join."}</span></span>${S.waReq ? `<span class="chip">${ic("check")} Sent</span>` : `<span class="chip">Ask to join</span>`}</button>
    ${first ? `<button class="btn" data-a="startapp">Start growing</button><div class="tiny muted center">You can find this page again in Profile.</div>` : ""}
  </div>`,
  };
};
