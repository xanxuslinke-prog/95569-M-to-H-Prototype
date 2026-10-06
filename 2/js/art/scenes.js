/* Drawn backgrounds: garden scene, event banner, map, mini garden icon, sample photo, QR pattern. */

function leafDeco() {
  return `<svg class="leafbg" viewBox="0 0 100 100" fill="#fff"><path d="M10 90C10 40 40 10 95 5 90 60 60 90 10 90z"/></svg>`;
}

function eventBanner(h, sq) {
  return `<svg viewBox="0 0 360 ${sq ? 360 : 130}" preserveAspectRatio="xMidYMid slice" style="display:block;width:100%;height:${h}px" aria-hidden="true">
   <rect width="360" height="400" fill="#CDE7F1"/><circle cx="300" cy="34" r="20" fill="#F2B63C"/>
   <rect y="${sq ? 200 : 70}" width="360" height="200" fill="#8DBE71"/><rect y="${sq ? 240 : 98}" width="360" height="200" fill="#6FA35E"/>
   <rect x="120" y="${sq ? 220 : 82}" width="120" height="30" rx="4" fill="#E9C8A0" transform="rotate(-4 180 ${sq ? 235 : 97})"/>
   <circle cx="60" cy="${sq ? 180 : 58}" r="26" fill="#4F8A45"/><circle cx="36" cy="${sq ? 196 : 70}" r="18" fill="#5E9A4F"/><rect x="56" y="${sq ? 196 : 70}" width="7" height="30" fill="#7A5334"/>
   ${[150, 178, 206].map((x, i) => `<circle cx="${x}" cy="${sq ? 205 : 66}" r="7" fill="${["#D96B4A", "#3F8FA8", "#C49A2B"][i]}"/><rect x="${x - 7}" y="${sq ? 213 : 74}" width="14" height="16" rx="6" fill="${["#D96B4A", "#3F8FA8", "#C49A2B"][i]}"/>`).join("")}
   ${sq ? "" : `<rect x="12" y="12" width="44" height="46" rx="10" fill="#fff"/><text x="34" y="30" text-anchor="middle" font-size="10" font-weight="800" fill="#4E7A4F" font-family="Plus Jakarta Sans,sans-serif">${EVENT.day}</text><text x="34" y="50" text-anchor="middle" font-size="19" font-weight="800" fill="#1F2A1D" font-family="Plus Jakarta Sans,sans-serif">${EVENT.num}</text>`}
  </svg>`;
}

function mapSVG() {
  return `<svg viewBox="0 0 340 150" aria-hidden="true"><rect width="340" height="150" fill="#E9EFE3"/><path d="M0 0h340v60c-40 10-70-10-110 5s-60 30-110 20S20 70 0 80z" fill="#BFDDEA"/><path d="M40 150 120 90l80 20 70-40 70 10" stroke="#fff" stroke-width="7" fill="none"/><path d="M180 150V95" stroke="#fff" stroke-width="5"/><rect x="200" y="100" width="70" height="30" rx="6" fill="#CFE3BF"/><circle cx="232" cy="108" r="11" fill="#4E7A4F"/><circle cx="232" cy="108" r="4" fill="#fff"/><text x="248" y="140" font-size="10" font-weight="700" fill="#3A5E3C" font-family="Plus Jakarta Sans,sans-serif">Bennelong Lawn</text></svg>`;
}

function miniGarden() {
  return `<svg viewBox="0 0 60 60" aria-hidden="true"><rect width="60" height="60" fill="#CDE7F1"/><circle cx="46" cy="14" r="6" fill="#F2B63C"/><rect y="34" width="60" height="26" fill="#8DBE71"/><path d="M0 30h60v5H0z" fill="#E7D2B0"/>${[
    [14, 46, "#C9744D"],
    [30, 52, "#3F7EA6"],
    [46, 46, "#D2AE72"],
  ]
    .map(
      ([x, y, c]) =>
        `<path d="M${x - 6} ${y}h12l-2 7h-8z" fill="${c}"/><circle cx="${x}" cy="${y - 5}" r="5" fill="#4F8F46"/>`,
    )
    .join("")}</svg>`;
}

function gardenBG(W) {
  let fence = "";
  for (let x = 6; x < W; x += 26)
    fence += `<rect x="${x}" y="138" width="14" height="66" rx="3" fill="#E7D2B0"/><path d="M${x} 138l7-8 7 8z" fill="#E7D2B0"/>`;
  let flowers = "";
  let r = 7;
  for (let x = 14; x < W; x += 19) {
    r = (r * 37 + 11) % 97;
    const y = 212 + (r % 150);
    const c = ["#F2B63C", "#E27A9A", "#FFFFFF", "#B79BE0"][r % 4];
    if (r % 3) flowers += `<circle cx="${x}" cy="${y}" r="2.6" fill="${c}"/>`;
  }
  let clouds = "";
  for (let x = 40; x < W; x += 190)
    clouds += `<g fill="#fff" opacity=".85"><ellipse cx="${x}" cy="${46 + (x % 3) * 10}" rx="30" ry="11"/><ellipse cx="${x + 22}" cy="${40 + (x % 3) * 10}" rx="20" ry="12"/></g>`;
  return `<svg class="gbg" width="${W}" height="${GH}" viewBox="0 0 ${W} ${GH}" aria-hidden="true">
   <defs><linearGradient id="gsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE2F2"/><stop offset="1" stop-color="#E9F5EC"/></linearGradient>
   <linearGradient id="ggrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9D18E"/><stop offset="1" stop-color="#7FB069"/></linearGradient></defs>
   <rect width="${W}" height="${GH}" fill="url(#gsky)"/>${clouds}
   <circle cx="${Math.min(W - 50, 300)}" cy="52" r="24" fill="#F2B63C"/>
   <path d="M0 150 C ${W * 0.15} 110, ${W * 0.3} 125, ${W * 0.45} 140 S ${W * 0.8} 105, ${W} 135 V200 H0z" fill="#B7D9A3"/>
   ${fence}<rect x="0" y="152" width="${W}" height="7" fill="#D9C19A"/><rect x="0" y="182" width="${W}" height="7" fill="#D9C19A"/>
   <rect x="0" y="198" width="${W}" height="${GH - 198}" fill="url(#ggrass)"/>
   <path d="M0 300 C ${W * 0.25} 285, ${W * 0.5} 318, ${W * 0.75} 296 S ${W} 305, ${W} 305 V322 C ${W * 0.7} 330, ${W * 0.45} 305, ${W * 0.2} 326 S 0 318, 0 320z" fill="#D8C29A" opacity=".75"/>
   ${flowers}</svg>`;
}

function qrCells() {
  let s = "";
  const pat =
    "111011111101010010111001011000110111010100110101011101000110110010111110101010011011110101011011111001";
  for (let i = 0; i < 81; i++) s += `<i class="${pat[i] === "1" ? "" : "o"}"></i>`;
  return s;
}

function samplePhoto(id) {
  const col = {
    recycle: ["#3F8FA8", "#F2B63C"],
    transport: ["#D96B4A", "#6FA35E"],
    swap: ["#8E6CC0", "#F2B63C"],
  }[id] || ["#4E7A4F", "#F2B63C"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#D7E6CF"/><rect y="200" width="400" height="100" fill="#B7CFA8"/><rect x="120" y="90" width="80" height="130" rx="10" fill="${col[0]}"/><rect x="210" y="110" width="80" height="110" rx="10" fill="${col[1]}"/><rect x="130" y="80" width="60" height="14" rx="6" fill="#2B332A" opacity=".5"/><rect x="220" y="100" width="60" height="14" rx="6" fill="#2B332A" opacity=".5"/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
