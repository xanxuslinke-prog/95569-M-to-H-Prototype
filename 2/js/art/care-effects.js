/* Planting, watering, sun and fertiliser animations. */

function fxSVG(t) {
  let g = "";
  const spark = [
    [110, 150],
    [196, 140],
    [150, 110],
    [92, 200],
    [210, 196],
  ]
    .map(
      ([x, y], i) =>
        `<path class="fx-spark" style="animation-delay:${i * 0.05}s;transform-origin:${x}px ${y}px" d="M${x} ${y - 7}l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F2B63C"/>`,
    )
    .join("");
  if (t === "plant") {
    g = `<g class="fx-hand"><path d="M150 12c-14 0-26 8-30 22l-4 16c-2 7 4 12 10 10l8-3 4 10c2 6 10 7 13 1l4-8 10 3c6 2 11-4 9-10l-4-14c-3-16-10-27-20-27z" fill="#F2C6A8" stroke="#D9A07F" stroke-width="2"/><path d="M130 58c4 4 10 6 16 5" stroke="#D9A07F" stroke-width="2" fill="none"/></g>
    <ellipse class="fx-seed" cx="150" cy="150" rx="6" ry="4" fill="#7A5334"/>
    <g class="fx-puff"><circle cx="138" cy="234" r="6" fill="#8A6A4E"/><circle cx="162" cy="234" r="6" fill="#8A6A4E"/><circle cx="150" cy="228" r="5" fill="#A7825F"/></g>`;
  } else if (t === "water") {
    g = `<g class="fx-can"><path d="M205 58h46v38h-46z" fill="#6FA7C2" rx="6"/><path d="M251 66c14 0 16 22 0 22" stroke="#5B8FA8" stroke-width="5" fill="none"/><path d="M205 66l-34 12 3 8 31-6z" fill="#5B8FA8"/><rect x="203" y="54" width="50" height="8" rx="3" fill="#5B8FA8"/></g>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<ellipse class="fx-drop" cx="${160 + (i % 4) * 9}" cy="${100 + (i % 3) * 6}" rx="2.6" ry="5" fill="#4FA3D1" style="animation-delay:${0.35 + i * 0.09}s"/>`).join("")}`;
  } else if (t === "sun") {
    g = `<polygon class="fx-beam" points="290,36 120,250 190,250" fill="#F7D57A"/>
    <g class="fx-rays">${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => `<line x1="290" y1="8" x2="290" y2="-6" stroke="#F2B63C" stroke-width="4" stroke-linecap="round" transform="rotate(${a} 290 36)"/>`).join("")}<circle cx="290" cy="36" r="24" fill="#F2B63C"/></g>`;
  } else if (t === "fert") {
    g = `<g class="fx-bag"><path d="M130 30h40l6 50h-52z" fill="#D2B48C" stroke="#A98A62" stroke-width="2"/><rect x="128" y="24" width="44" height="10" rx="3" fill="#A98A62"/><path d="M142 52h16" stroke="#7A5334" stroke-width="3" stroke-linecap="round"/></g>
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `<circle class="fx-grain" cx="${136 + (i % 5) * 7}" cy="${86 + (i % 2) * 6}" r="2.4" fill="#7A5334" style="animation-delay:${0.35 + i * 0.07}s"/>`).join("")}`;
  }
  return `<div class="fx"><svg viewBox="0 0 300 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true">${g}${spark}</svg></div>`;
}
