// ====== PSV-gegevens (hier kun je alles makkelijk aanpassen) ======
// Gegevens verzameld op 24 nov 2026 van o.a. UEFA, ESPN, FotMob, voetbalkrant. Controleer ze gerust!

const SPELERS = [
  // nr, naam, positie, land, leeftijd
  { nr: 1,  naam: "Nick Olij",            pos: "Keeper",        land: "Nederland",       leeftijd: 31 },
  { nr: 32, naam: "Matěj Kovář",          pos: "Keeper",        land: "Tsjechië",        leeftijd: 26 },
  { nr: 51, naam: "Tijn Smolenaars",      pos: "Keeper",        land: "Nederland",       leeftijd: 21 },
  { nr: null, naam: "Khadim Ngom",        pos: "Keeper",        land: "Nederland",       leeftijd: null },
  { nr: 2,  naam: "Lutsharel Geertruida", pos: "Verdediger",    land: "Nederland",       leeftijd: 26 },
  { nr: 3,  naam: "Yarek Gasiorowski",    pos: "Verdediger",    land: "Spanje",          leeftijd: 21 },
  { nr: 4,  naam: "Armando Obispo",       pos: "Verdediger",    land: "Curaçao",         leeftijd: 27 },
  { nr: 6,  naam: "Ryan Flamingo",        pos: "Verdediger",    land: "Nederland",       leeftijd: 23 },
  { nr: 8,  naam: "Sergiño Dest",         pos: "Verdediger",    land: "Verenigde Staten",leeftijd: 26 },
  { nr: 17, naam: "Mauro Júnior",         pos: "Verdediger",    land: "Brazilië",        leeftijd: 27 },
  { nr: 18, naam: "Filip Kostić",         pos: "Verdediger",    land: "Servië",          leeftijd: 34 },
  { nr: 25, naam: "Kiliann Sildillia",    pos: "Verdediger",    land: "Frankrijk",       leeftijd: 24 },
  { nr: 38, naam: "Fabian Merién",        pos: "Verdediger",    land: "Nederland",       leeftijd: 18 },
  { nr: 10, naam: "Paul Wanner",          pos: "Middenvelder",  land: "Oostenrijk",      leeftijd: 20 },
  { nr: 20, naam: "Guus Til",             pos: "Middenvelder",  land: "Nederland",       leeftijd: 28 },
  { nr: 21, naam: "Sven Mijnans",         pos: "Middenvelder",  land: "Nederland",       leeftijd: 26 },
  { nr: 24, naam: "Kodai Sano",           pos: "Middenvelder",  land: "Japan",           leeftijd: 23 },
  { nr: 31, naam: "Noah Fernandez",       pos: "Middenvelder",  land: "België",          leeftijd: 18 },
  { nr: 35, naam: "Ayoni Santos",         pos: "Middenvelder",  land: "Nederland",       leeftijd: 21 },
  { nr: 5,  naam: "Ivan Perišić",         pos: "Aanvaller",     land: "Kroatië",         leeftijd: 37 },
  { nr: 7,  naam: "Ruben van Bommel",     pos: "Aanvaller",     land: "Nederland",       leeftijd: 22 },
  { nr: 9,  naam: "Ricardo Pepi",         pos: "Aanvaller",     land: "Verenigde Staten",leeftijd: 23 },
  { nr: 11, naam: "Sami Ouaissa",         pos: "Aanvaller",     land: "Nederland",       leeftijd: 22 },
  { nr: 19, naam: "Esmir Bajraktarević",  pos: "Aanvaller",     land: "Bosnië-Herzegovina", leeftijd: 21 },
  { nr: 23, naam: "Mikkel Bro Hansen",    pos: "Aanvaller",     land: "Denemarken",      leeftijd: 17 },
  { nr: 27, naam: "Dennis Man",           pos: "Aanvaller",     land: "Roemenië",        leeftijd: 28 },
  { nr: 29, naam: "Sam Lammers",          pos: "Aanvaller",     land: "Nederland",       leeftijd: 29 },
  { nr: null, naam: "Seb Huntelaar",      pos: "Aanvaller",     land: "Nederland",       leeftijd: null },
];

// Wedstrijden die nog moeten komen. tijd: null = nog niet bekend
const PROGRAMMA = [
  { datum: "2026-11-24", tijd: "21:00", comp: "Champions League", thuis: false, tegenstander: "Real Madrid", plaats: "Estadio Santiago Bernabéu, Madrid" },
  { datum: "2026-11-28", tijd: null,    comp: "Eredivisie",       thuis: true,  tegenstander: "Go Ahead Eagles", plaats: "Philips Stadion, Eindhoven" },
  { datum: "2026-12-02", tijd: null,    comp: "KNVB Beker",       thuis: true,  tegenstander: "Vitesse", plaats: "Philips Stadion, Eindhoven" },
  { datum: "2026-12-05", tijd: null,    comp: "Eredivisie",       thuis: false, tegenstander: "AZ", plaats: "Alkmaar" },
  { datum: "2026-12-09", tijd: "21:00", comp: "Champions League", thuis: true,  tegenstander: "Atlético Madrid", plaats: "Philips Stadion, Eindhoven" },
  { datum: "2026-12-13", tijd: null,    comp: "Eredivisie",       thuis: true,  tegenstander: "Telstar", plaats: "Philips Stadion, Eindhoven" },
  { datum: "2026-12-20", tijd: "20:00", comp: "Eredivisie",       thuis: true,  tegenstander: "PEC Zwolle", plaats: "Philips Stadion, Eindhoven" },
];

// Uitslagen. psv = doelpunten PSV, tg = doelpunten tegenstander
const UITSLAGEN = {
  "2026/27 (dit seizoen)": [
    { datum: "2026-11-21", comp: "Eredivisie",       thuis: false, tegenstander: "NEC",             psv: 4, tg: 1 },
  ],
  "2025/26": [
    { datum: "2026-05-18", comp: "Eredivisie",       thuis: true,  tegenstander: "Sparta Rotterdam",psv: 3, tg: 1 },
    { datum: "2026-05-14", comp: "Eredivisie",       thuis: false, tegenstander: "Ajax",            psv: 2, tg: 2 },
    { datum: "2026-05-10", comp: "Eredivisie",       thuis: true,  tegenstander: "FC Twente",       psv: 4, tg: 0 },
    { datum: "2026-05-03", comp: "Eredivisie",       thuis: false, tegenstander: "Feyenoord",       psv: 1, tg: 0 },
    { datum: "2026-04-26", comp: "Eredivisie",       thuis: true,  tegenstander: "AZ",              psv: 2, tg: 1 },
    { datum: "2026-04-13", comp: "Eredivisie",       thuis: false, tegenstander: "Utrecht",         psv: 3, tg: 1 },
    { datum: "2026-04-05", comp: "Eredivisie",       thuis: true,  tegenstander: "Heerenveen",      psv: 5, tg: 0 },
    { datum: "2026-03-29", comp: "Eredivisie",       thuis: false, tegenstander: "Go Ahead Eagles", psv: 2, tg: 1 },
    { datum: "2026-03-15", comp: "Eredivisie",       thuis: true,  tegenstander: "NEC",             psv: 3, tg: 0 },
    { datum: "2026-03-08", comp: "Eredivisie",       thuis: false, tegenstander: "Fortuna Sittard", psv: 4, tg: 1 },
    { datum: "2026-03-01", comp: "Eredivisie",       thuis: true,  tegenstander: "Excelsior",       psv: 2, tg: 0 },
    { datum: "2026-02-22", comp: "Eredivisie",       thuis: false, tegenstander: "Heracles",        psv: 1, tg: 1 },
    { datum: "2026-02-15", comp: "Eredivisie",       thuis: true,  tegenstander: "PEC Zwolle",      psv: 3, tg: 0 },
    { datum: "2026-02-08", comp: "Eredivisie",       thuis: false, tegenstander: "RKC Waalwijk",    psv: 2, tg: 1 },
    { datum: "2026-02-01", comp: "Eredivisie",       thuis: true,  tegenstander: "Almere City",     psv: 4, tg: 0 },
    { datum: "2026-01-25", comp: "Eredivisie",       thuis: false, tegenstander: "Willem II",       psv: 3, tg: 1 },
    { datum: "2026-01-18", comp: "Eredivisie",       thuis: true,  tegenstander: "Groningen",       psv: 2, tg: 0 },
    { datum: "2026-01-11", comp: "Eredivisie",       thuis: false, tegenstander: "Twente",          psv: 1, tg: 0 },
    { datum: "2025-12-21", comp: "Eredivisie",       thuis: true,  tegenstander: "Ajax",            psv: 3, tg: 1 },
    { datum: "2025-12-14", comp: "Eredivisie",       thuis: false, tegenstander: "Feyenoord",       psv: 2, tg: 2 },
    { datum: "2025-12-11", comp: "Champions League", thuis: true,  tegenstander: "Atlético Madrid", psv: 2, tg: 3 },
    { datum: "2025-12-06", comp: "Eredivisie",       thuis: false, tegenstander: "Heerenveen",      psv: 2, tg: 0 },
    { datum: "2025-11-30", comp: "Eredivisie",       thuis: true,  tegenstander: "FC Volendam",     psv: 3, tg: 0 },
    { datum: "2025-11-26", comp: "Champions League", thuis: false, tegenstander: "Liverpool",       psv: 4, tg: 1 },
    { datum: "2025-11-22", comp: "Eredivisie",       thuis: false, tegenstander: "NAC Breda",       psv: 1, tg: 0 },
    { datum: "2025-11-09", comp: "Eredivisie",       thuis: false, tegenstander: "AZ",              psv: 5, tg: 1 },
    { datum: "2025-11-04", comp: "Champions League", thuis: false, tegenstander: "Olympiacos",      psv: 1, tg: 1 },
    { datum: "2025-10-31", comp: "Eredivisie",       thuis: true,  tegenstander: "Fortuna Sittard", psv: 5, tg: 2 },
    { datum: "2025-10-26", comp: "Eredivisie",       thuis: false, tegenstander: "Feyenoord",       psv: 3, tg: 2 },
    { datum: "2025-10-01", comp: "Champions League", thuis: false, tegenstander: "Bayer Leverkusen",psv: 1, tg: 1 },
    { datum: "2025-09-27", comp: "Eredivisie",       thuis: false, tegenstander: "Excelsior",       psv: 2, tg: 1 },
    { datum: "2025-09-13", comp: "Eredivisie",       thuis: false, tegenstander: "NEC",             psv: 5, tg: 3 },
    { datum: "2025-08-17", comp: "Eredivisie",       thuis: false, tegenstander: "FC Twente",       psv: 2, tg: 0 },
    { datum: "2025-08-09", comp: "Eredivisie",       thuis: true,  tegenstander: "Sparta Rotterdam",psv: 6, tg: 1 },
  ],
};

// Opstelling (4-3-3). x = links→rechts (0-100), y = boven (aanval) → onder (keeper).
// LET OP: dit is een VERWACHTE opstelling (voorbeeld). De echte opstelling komt ~1 uur voor de wedstrijd.
const OPSTELLING = {
  wedstrijd: "Real Madrid – PSV (Champions League, di 24 november 2026, 21:00)",
  formatie: "4-3-3",
  officieel: false,
  spelers: [
    { nr: 9,  naam: "Pepi",         x: 50, y: 12 },
    { nr: 19, naam: "Bajraktarević",x: 20, y: 20 },
    { nr: 27, naam: "Man",          x: 80, y: 20 },
    { nr: 21, naam: "Mijnans",      x: 30, y: 42 },
    { nr: 20, naam: "Til",          x: 50, y: 48 },
    { nr: 24, naam: "Sano",         x: 70, y: 42 },
    { nr: 18, naam: "Kostić",       x: 14, y: 68 },
    { nr: 4,  naam: "Obispo",       x: 38, y: 72 },
    { nr: 2,  naam: "Geertruida",   x: 62, y: 72 },
    { nr: 8,  naam: "Dest",         x: 86, y: 68 },
    { nr: 32, naam: "Kovář",        x: 50, y: 90 },
  ],
};

// Technische staf & medische staf (seizoen 2026/27)
const STAF = {
  trainers: [
    { naam: "Peter Bosz",       functie: "Hoofdtrainer",        info: "Sinds juli 2023 · contract tot medio 2028 · 2× landskampioen met PSV" },
    { naam: "Rob Maas",         functie: "Assistent-trainer",   info: "Sinds juli 2023 · rechterhand van Bosz" },
    { naam: "Theo Lucius",      functie: "Assistent-trainer",   info: "Sinds juli 2024 · oud-PSV-speler" },
    { naam: "Bas Sibum",        functie: "Assistent-trainer",   info: "Sinds juli 2026 · eerder hoofdtrainer bij Heracles en Roda JC" },
    { naam: "Colin Bergmans",   functie: "Assistent-trainer",   info: "Sinds juli 2026" },
    { naam: "Kevin Begois",     functie: "Keeperstrainer",      info: "Sinds juli 2024" },
  ],
  medisch: [
    { naam: "Wart van Zoest",   functie: "Hoofd medische staf", info: "Medisch manager" },
    { naam: "Rob Bogie",        functie: "Teamarts",            info: "Clubarts" },
    { naam: "Tom Wiggers",      functie: "Teamarts",            info: "Sportarts · overgekomen vanuit de academy" },
    { naam: "Tom de Rooij",     functie: "Huisarts",            info: "" },
    { naam: "Remie Blom",       functie: "Fysiotherapeut",      info: "" },
    { naam: "Maarten Brecko",   functie: "Fysiotherapeut",      info: "" },
    { naam: "Martin Cruijff",   functie: "Fysiotherapeut",      info: "" },
    { naam: "Leon Peters",      functie: "Fysiotherapeut",      info: "" },
  ],
  performance: [
    { naam: "Terry Peters",             functie: "Performance coach", info: "" },
    { naam: "Jermaine McCubbine",       functie: "Performance coach", info: "" },
    { naam: "Rainer van Gaal Appelhof", functie: "Performance coach", info: "" },
  ],
};
