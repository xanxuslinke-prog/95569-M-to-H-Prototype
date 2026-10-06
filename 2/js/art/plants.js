/* Drawing plants at each growth stage and the six pot styles. */

function potSVG(style) {
  const soil = `<ellipse cx="60" cy="104" rx="26" ry="3.5" fill="#5A3B28"/>`;
  switch (style) {
    case "glaze":
      return `<path d="M36 108h48l-4 30H40z" fill="#3F7EA6"/><path d="M37 118h46" stroke="#6FB0D6" stroke-width="3"/><rect x="31" y="101" width="58" height="10" rx="5" fill="#5A9BC4"/>${soil}`;
    case "white":
      return `<path d="M38 108h44c0 14-4 30-22 30S38 122 38 108z" fill="#F4F1EA" stroke="#D6D0C2" stroke-width="1.5"/><path d="M44 120h32" stroke="#E0D9C9" stroke-width="2"/><rect x="33" y="101" width="54" height="9" rx="4.5" fill="#FFFFFF" stroke="#D6D0C2" stroke-width="1.5"/>${soil}`;
    case "tin":
      return `<rect x="36" y="104" width="48" height="34" rx="3" fill="#B7C0C3"/><rect x="36" y="114" width="48" height="13" fill="#E8A33D"/><path d="M40 114v13M46 114v13" stroke="#F6C77A" stroke-width="1.2"/><rect x="34" y="101" width="52" height="6" rx="2" fill="#98A3A7"/><path d="M36 132h48" stroke="#98A3A7" stroke-width="1.5"/>${soil}`;
    case "crate":
      return `<rect x="30" y="104" width="60" height="34" rx="2" fill="#B98556"/><path d="M30 115h60M30 126h60" stroke="#8E6038" stroke-width="2"/><path d="M34 104v34M86 104v34" stroke="#8E6038" stroke-width="3"/><rect x="28" y="100" width="64" height="6" rx="2" fill="#C99566"/>${soil}`;
    case "basket":
      return `<path d="M33 106h54l-5 32H38z" fill="#D2AE72"/>${[112, 119, 126, 133].map((y) => `<path d="M${35 + (y - 106) / 6} ${y}h${50 - (y - 106) / 3}" stroke="#A9884F" stroke-width="1.6"/>`).join("")}${[44, 52, 60, 68, 76].map((x) => `<path d="M${x} 106v32" stroke="#B89457" stroke-width="1.2"/>`).join("")}<rect x="30" y="101" width="60" height="7" rx="3.5" fill="#B89457"/>${soil}`;
    default:
      return `<path d="M34 108h52l-6 30H40z" fill="#C9744D"/><rect x="30" y="102" width="60" height="10" rx="3" fill="#D98A5F"/>${soil}`;
  }
}

const POTS = ["terra", "tin", "glaze", "white", "basket", "crate"];

function plantSVG(key, stage, cls = "", potStyle = "terra") {
  const s = SEEDS[key] || { cat: "flower", color: "#E07A3A" };
  const c = s.color,
    g = "#4F8F46",
    g2 = "#6FAE5C";
  let body = "";
  const pot = potSVG(potStyle);
  if (stage < 0) {
    body = "";
  } else if (stage === 0) {
    body = `<ellipse cx="60" cy="101" rx="5" ry="3.4" fill="#7A5334"/><ellipse cx="58.5" cy="100" rx="1.6" ry="1" fill="#A77A54"/>`;
  } else if (stage === 1) {
    body = `<path d="M60 103V86" stroke="${g}" stroke-width="3" stroke-linecap="round"/><ellipse cx="52" cy="85" rx="9" ry="4.5" fill="${g2}" transform="rotate(-25 52 85)"/><ellipse cx="68" cy="84" rx="9" ry="4.5" fill="${g}" transform="rotate(25 68 84)"/>`;
  } else if (stage === 2) {
    body = `<path d="M60 103V58" stroke="${g}" stroke-width="3.4" stroke-linecap="round"/>
    <ellipse cx="49" cy="88" rx="12" ry="5.5" fill="${g2}" transform="rotate(-25 49 88)"/><ellipse cx="71" cy="80" rx="12" ry="5.5" fill="${g}" transform="rotate(25 71 80)"/>
    <ellipse cx="50" cy="70" rx="10" ry="5" fill="${g}" transform="rotate(-30 50 70)"/><circle cx="60" cy="55" r="6" fill="${c}"/>`;
  } else {
    if (s.cat === "flower") {
      let petals = "";
      for (let i = 0; i < 10; i++)
        petals += `<ellipse cx="60" cy="27" rx="6" ry="13" fill="${c}" transform="rotate(${i * 36} 60 40)"/>`;
      body = `<path d="M60 103V44" stroke="${g}" stroke-width="3.6" stroke-linecap="round"/>
      <ellipse cx="46" cy="86" rx="15" ry="6.5" fill="${g2}" transform="rotate(-28 46 86)"/><ellipse cx="74" cy="76" rx="15" ry="6.5" fill="${g}" transform="rotate(28 74 76)"/>
      ${petals}<circle cx="60" cy="40" r="9" fill="#5B3A1E"/><circle cx="57" cy="37" r="2.5" fill="#7D5430"/>`;
    } else if (s.cat === "tree") {
      body = `<rect x="56" y="62" width="8" height="42" rx="3" fill="#8A5A36"/>
      <circle cx="60" cy="44" r="26" fill="${g}"/><circle cx="42" cy="54" r="16" fill="${g2}"/><circle cx="78" cy="54" r="16" fill="${g2}"/><circle cx="60" cy="30" r="16" fill="${g2}"/>
      <circle cx="48" cy="46" r="5" fill="${c}"/><circle cx="70" cy="40" r="5" fill="${c}"/><circle cx="62" cy="58" r="5" fill="${c}"/><circle cx="80" cy="56" r="4.5" fill="${c}"/><circle cx="40" cy="60" r="4.5" fill="${c}"/>`;
    } else if (s.cat === "fruit") {
      body = `<path d="M60 103V30" stroke="${g}" stroke-width="3.4" stroke-linecap="round"/><path d="M60 70 44 58M60 55l17-10M60 85l16-9" stroke="${g}" stroke-width="2.6" stroke-linecap="round"/>
      <ellipse cx="44" cy="52" rx="11" ry="5" fill="${g2}" transform="rotate(-20 44 52)"/><ellipse cx="76" cy="40" rx="11" ry="5" fill="${g2}" transform="rotate(20 76 40)"/><ellipse cx="48" cy="80" rx="11" ry="5" fill="${g}" transform="rotate(-20 48 80)"/><ellipse cx="72" cy="30" rx="9" ry="4.5" fill="${g}" transform="rotate(-30 72 30)"/>
      <circle cx="46" cy="66" r="7" fill="${c}"/><circle cx="77" cy="52" r="7" fill="${c}"/><circle cx="74" cy="84" r="6.5" fill="${c}"/><circle cx="60" cy="44" r="5.5" fill="${c}"/>`;
    } else if (s.cat === "herb") {
      let lv = "";
      const pts = [
        [60, 40, 0],
        [46, 52, -35],
        [74, 52, 35],
        [40, 70, -50],
        [80, 70, 50],
        [52, 64, -15],
        [68, 64, 15],
        [60, 78, 0],
        [46, 86, -40],
        [74, 86, 40],
      ];
      pts.forEach(
        ([x, y, r], i) =>
          (lv += `<ellipse cx="${x}" cy="${y}" rx="8" ry="14" fill="${i % 2 ? g2 : c}" transform="rotate(${r} ${x} ${y})"/>`),
      );
      body = `<path d="M60 103V48M60 90 46 70M60 90l14-20" stroke="${g}" stroke-width="2.6" stroke-linecap="round"/>${lv}`;
    } else {
      // shrub
      body = `<circle cx="60" cy="70" r="28" fill="${g}"/><circle cx="38" cy="82" r="18" fill="${g2}"/><circle cx="82" cy="82" r="18" fill="${g2}"/><circle cx="60" cy="50" r="18" fill="${g2}"/>
      ${[
        [44, 62],
        [60, 44],
        [76, 60],
        [52, 82],
        [70, 80],
        [36, 86],
        [86, 84],
        [62, 64],
      ]
        .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.5" ry="7" fill="${c}"/>`)
        .join("")}`;
    }
  }
  return `<svg class="${cls}" viewBox="0 0 120 140" aria-hidden="true">${body}${pot}</svg>`;
}
