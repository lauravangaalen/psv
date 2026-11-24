const $ = (s, r = document) => r.querySelector(s);
const fmtDatum = (iso, lang = "nl-NL") =>
  new Date(iso + "T12:00:00").toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const kort = iso => new Date(iso + "T12:00:00").toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" });
const badgeKlasse = c => c === "Champions League" ? "cl" : c === "KNVB Beker" ? "bk" : "er";
const wedstrijdTekst = m => m.thuis ? `PSV – ${m.tegenstander}` : `${m.tegenstander} – PSV`;
const esc = s => String(s)
  .replace(/&/g, "&")
  .replace(/</g, "<")
  .replace(/>/g, ">")
  .replace(/"/g, """);

/* ---------- Tabs ---------- */
document.querySelectorAll("#nav button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("#nav button").forEach(x => x.classList.toggle("active", x === b));
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.id === b.dataset.tab));
  window.scrollTo({ top: 0, behavior: "smooth" });
}));

/* ---------- Volgende wedstrijd ---------- */
(function volgende() {
  const vandaag = new Date().toISOString().slice(0, 10);
  const m = PROGRAMMA.find(x => x.datum >= vandaag) || PROGRAMMA[0];
  $("#next").innerHTML = `<small>Volgende wedstrijd</small><br><b>${esc(wedstrijdTekst(m))}</b><br>
    ${fmtDatum(m.datum)}${m.tijd ? " · " + m.tijd + " uur" : ""}<br><span class="badge ${badgeKlasse(m.comp)}">${esc(m.comp)}</span>`;
})();

/* ---------- Spelers ---------- */
const posities = ["Alle", "Keeper", "Verdediger", "Middenvelder", "Aanvaller"];
let gekozenPos = "Alle";
const initialen = n => n.split(" ").map(w => w[0]).slice(0, 2).join("");

function foto(s) {
  const tekst = s.nr ?? initialen(s.naam);
  const klein = String(tekst).length > 2 ? ' style="font-size:2.2rem"' : "";
  const key = s.nr ?? s.naam.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]+/g, "-");
  const fotoImg = `<img class="spelerfoto" src="spelers/${key}.jpg" alt="${esc(s.naam)}"
    onerror="if(!this.dataset.t){this.dataset.t=1;this.src='spelers/${key}.png'}else{this.remove()}"
    onload="this.closest('.photo').classList.add('has-photo')">`;
  return `${fotoImg}<div class="shield-wrap">
    <svg class="shield" viewBox="0 0 100 120" aria-hidden="true">
      <defs><clipPath id="sc"><path d="M50 4 L94 16 V58 C94 86 74 106 50 116 C26 106 6 86 6 58 V16 Z"/></clipPath></defs>
      <g clip-path="url(#sc)">
        <rect width="100" height="120" fill="#fff"/>
        <rect x="6" width="17" height="120" fill="#e2001a"/><rect x="40" width="17" height="120" fill="#e2001a"/><rect x="74" width="17" height="120" fill="#e2001a"/>
      </g>
      <path d="M50 4 L94 16 V58 C94 86 74 106 50 116 C26 106 6 86 6 58 V16 Z" fill="none" stroke="#9d0012" stroke-width="5"/>
    </svg>
    <img class="logo-img" src="logo.png" alt="" onload="this.parentNode.classList.add('has-logo')" onerror="this.remove()">
    <span class="shield-nr"${klein}>${tekst}</span></div>`;
}

function tekenFilter() {
  $("#posFilter").innerHTML = posities.map(p => `<button class="${p === gekozenPos ? "active" : ""}" data-p="${p}">${p}</button>`).join("");
  $("#posFilter").querySelectorAll("button").forEach(b => b.onclick = () => { gekozenPos = b.dataset.p; tekenFilter(); tekenSpelers(); });
}
function tekenSpelers() {
  const lijst = SPELERS.filter(s => gekozenPos === "Alle" || s.pos === gekozenPos);
  $("#spelerGrid").innerHTML = lijst.map(s => {
    const i = SPELERS.indexOf(s);
    return `<div class="player" tabindex="0" data-i="${i}">
      <div class="photo">${foto(s)}</div>
      <div class="nm">${esc(s.naam)}</div><div class="ps">${s.pos}</div></div>`;
  }).join("");
  $("#spelerGrid").querySelectorAll(".player").forEach(el => {
    const open = () => toonSpeler(SPELERS[el.dataset.i]);
    el.onclick = open; el.onkeydown = e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open());
  });
}
function toonSpeler(s) {
  $("#modalBody").innerHTML = `<div class="photo">${foto(s)}</div>
    <div class="body"><h3>${esc(s.naam)}</h3><dl>
      <dt>Rugnummer</dt><dd>${s.nr ?? "–"}</dd>
      <dt>Positie</dt><dd>${s.pos}</dd>
      <dt>Land</dt><dd>${esc(s.land)}</dd>
      <dt>Leeftijd</dt><dd>${s.leeftijd ?? "–"}</dd>
      <dt>Club</dt><dd>PSV</dd></dl></div>`;
  $("#modal").hidden = false;
}
$("#closeModal").onclick = () => $("#modal").hidden = true;
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") $("#modal").hidden = true; });
document.addEventListener("keydown", e => e.key === "Escape" && ($("#modal").hidden = true));

/* ---------- Wedstrijden ---------- */
$("#programma").innerHTML = PROGRAMMA.map(m => `<div class="match">
  <div class="d">${kort(m.datum)}<small>${m.tijd ? m.tijd + " uur" : "tijd nog niet bekend"}</small></div>
  <div class="t"><b>${esc(wedstrijdTekst(m))}</b><br><small class="muted">${esc(m.plaats || "")}</small></div>
  <span class="badge ${badgeKlasse(m.comp)}">${esc(m.comp)}</span></div>`).join("");

/* ---------- Uitslagen ---------- */
const seizoenen = Object.keys(UITSLAGEN);
let gekozenSeizoen = seizoenen[0];
function tekenUitslagen() {
  $("#seizoenFilter").innerHTML = seizoenen.map(s => `<button class="${s === gekozenSeizoen ? "active" : ""}" data-s="${esc(s)}">${esc(s)}</button>`).join("");
  $("#seizoenFilter").querySelectorAll("button").forEach(b => b.onclick = () => { gekozenSeizoen = b.dataset.s; tekenUitslagen(); });
  const rijen = UITSLAGEN[gekozenSeizoen];
  let w = 0, g = 0, v = 0, vo = 0, te = 0;
  const html = rijen.map(m => {
    const k = m.psv > m.tg ? "w" : m.psv === m.tg ? "g" : "v";
    k === "w" ? w++ : k === "g" ? g++ : v++; vo += m.psv; te += m.tg;
    const score = m.thuis ? `${m.psv} - ${m.tg}` : `${m.tg} - ${m.psv}`;
    return `<div class="match"><div class="d">${kort(m.datum)}<small>${m.thuis ? "Thuis" : "Uit"}</small></div>
      <div class="t"><b>${esc(wedstrijdTekst(m))}</b> <span class="badge ${badgeKlasse(m.comp)}">${esc(m.comp)}</span></div>
      <div class="res ${k}">${score}</div></div>`;
  }).join("");
  $("#uitslagStats").innerHTML = `<div class="stat">${rijen.length} gespeeld</div><div class="stat">${w} gewonnen</div><div class="stat">${g} gelijk</div><div class="stat">${v} verloren</div><div class="stat">Doelsaldo ${vo}–${te}</div>`;
  $("#uitslagen-lijst").innerHTML = html;
}

/* ---------- Opstelling ---------- */
function tekenOpstelling() {
  $("#opsInfo").innerHTML = `<b>${esc(OPSTELLING.wedstrijd)}</b> · formatie ${OPSTELLING.formatie}<br>` +
    (OPSTELLING.officieel ? "Officiële opstelling." : "Verwachte opstelling (voorbeeld) – de echte opstelling komt ongeveer een uur voor de wedstrijd.");
  $("#pitch").innerHTML = OPSTELLING.spelers.map(p => `<div class="pl" style="left:${p.x}%;top:${p.y}%" data-nr="${p.nr}">
    <div class="shirt">${p.nr}</div><span class="n">${esc(p.naam)}</span></div>`).join("");
  $("#pitch").querySelectorAll(".pl").forEach(el => el.onclick = () => {
    const s = SPELERS.find(x => x.nr === Number(el.dataset.nr)); if (s) toonSpeler(s);
  });
}

tekenFilter(); tekenSpelers(); tekenUitslagen(); tekenOpstelling();

/* ---------- Tenues 2026/27 ---------- */
const SHIRT = "M30 14 L10 28 L20 52 L34 46 L34 118 H86 V46 L100 52 L110 28 L90 14 Q60 32 30 14 Z";

function shirt(t) {
  let body = `<rect width="120" height="130" fill="${t.basis}"/>`;
  if (t.id === "thuis") {
    const banen = [34, 46, 58, 70, 82].map((x, i) =>
      `<rect x="${x}" y="10" width="12" height="110" fill="${i % 2 === 0 ? "#fff" : "#e2001a"}"/>`
    ).join("");
    body = `<rect width="120" height="130" fill="#e2001a"/>${banen}`;
  }
  if (t.id === "derde") {
    const pattern = `
      <rect x="38" y="30" width="14" height="14" fill="#1a3a5c" opacity=".7"/>
      <rect x="56" y="30" width="14" height="14" fill="#16324f" opacity=".7"/>
      <rect x="74" y="30" width="14" height="14" fill="#1a3a5c" opacity=".7"/>
      <rect x="38" y="48" width="14" height="14" fill="#16324f" opacity=".7"/>
      <rect x="56" y="48" width="14" height="14" fill="#1a3a5c" opacity=".7"/>
      <rect x="74" y="48" width="14" height="14" fill="#16324f" opacity=".7"/>
      <rect x="38" y="66" width="14" height="14" fill="#1a3a5c" opacity=".7"/>
      <rect x="56" y="66" width="14" height="14" fill="#16324f" opacity=".7"/>
      <rect x="74" y="66" width="14" height="14" fill="#1a3a5c" opacity=".7"/>
      <rect x="38" y="84" width="14" height="14" fill="#16324f" opacity=".7"/>
      <rect x="56" y="84" width="14" height="14" fill="#1a3a5c" opacity=".7"/>
      <rect x="74" y="84" width="14" height="14" fill="#16324f" opacity=".7"/>`;
    body = `<rect width="120" height="130" fill="#0d1f33"/>${pattern}`;
  }
  const mouw = t.mouw || t.basis;
  const rand = t.rand || "#222";
  const kraag = t.kraag || "#222";
  return `<svg viewBox="0 0 120 130" aria-hidden="true">
    <defs><clipPath id="c-${t.id}"><path d="${SHIRT}"/></clipPath></defs>
    <g clip-path="url(#c-${t.id})">
      ${body}
      <path d="M30 14 L10 28 L20 52 L34 46 Z M90 14 L110 28 L100 52 L86 46 Z" fill="${mouw}"/>
      ${t.zij ? `<rect x="34" y="70" width="5" height="48" fill="${t.zij}"/><rect x="81" y="70" width="5" height="48" fill="${t.zij}"/>` : ""}
      <path d="M12 31 L20 52 L27 49 L19 27 Z M108 31 L100 52 L93 49 L101 27 Z" fill="${rand}"/>
    </g>
    <path d="${SHIRT}" fill="none" stroke="#222" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M44 16 Q60 34 76 16" fill="none" stroke="${kraag}" stroke-width="6" stroke-linecap="round"/>
  </svg>`;
}

const TENUES = [
  { id: "thuis", naam: "Thuisshirt", info: "Rood-wit gestreept · zwarte kraag & manchetten", basis: "#e2001a", mouw: "#e2001a", rand: "#111", kraag: "#111" },
  { id: "uit", naam: "Uitshirt", info: "Wit · oranje kraag · roze & paarse accenten", basis: "#ffffff", mouw: "#ffffff", rand: "#ff7a1a", kraag: "#ff7a1a", zij: "#7b3fa0" },
  { id: "derde", naam: "Derde shirt", info: "Navy met geometrisch patroon · cyan accenten", basis: "#0d1f33", mouw: "#0d1f33", rand: "#17c3c3", kraag: "#17c3c3" },
];

$("#kitGrid").innerHTML = TENUES.map(t =>
  `<div class="kit"><div class="art" id="art-${t.id}">${shirt(t)}</div><b>${t.naam}</b><small>${t.info}</small></div>`
).join("");

TENUES.forEach(t => {
  const img = new Image();
  img.alt = t.naam;
  img.onload = () => { $("#art-" + t.id).replaceChildren(img); };
  img.src = "tenues/" + t.id + ".png";
});
