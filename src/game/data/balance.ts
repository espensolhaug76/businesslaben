// ─── BALANSE — bakgrunnssalg (BAKGRUNNSSALG-oppgaven) ─────────────────────────
// ÉN fil å justere. Alle tall som styrer den passive kundestrømmen bor her, så
// Espen kan finpusse balansen ETTER spilltest uten å røre motoren
// (backgroundSales.ts / GameContext). MÅL: en rimelig drevet kafé (godt lager,
// fornuftige priser, rykte ~55, sentrum-l2) skal lande ~3 000–5 000 kr i
// dagsmargin → månedsresultat rundt null mot ~47 000 faste.

export const BALANCE = {
  /** Global skala for HELE bakgrunnstrafikken — skru volumet opp/ned samlet. */
  baseMultiplier: 1.0,

  /** Bakgrunnstrafikk (kunder/dag) per lokale FØR faktorer. Sentral/dyr
   *  beliggenhet = høyere; sentrum-l2 (midt i gågata) høyest. Ukjent lokale
   *  faller til basetrafikkDefault. Nøklet på lokale-id (se districts.ts). */
  basetrafikk: {
    'sentrum-l2': 110, // Gågata 12 — mest gjennomgangstrafikk
    'sentrum-l5': 100, // Torggata 1 (premium hjørne)
    'sentrum-l1': 95,  // Hjørnelokalet ved torget
    'sentrum-l6': 78,  // Torggata 3
    'sentrum-l3': 72,  // Gågata 14
    'sentrum-l7': 58,  // Torggata 5
    'sentrum-l4': 52,  // Gågata 16
    'stasjon-l1': 72, 'stasjon-l5': 70, 'stasjon-l2': 60, 'stasjon-l6': 56,
    'stasjon-l3': 52, 'stasjon-l7': 48, 'stasjon-l4': 44, 'stasjon-l8': 42,
  } as Record<string, number>,
  basetrafikkDefault: 50,

  /** Prisfaktor = klem(snitt recommended / snitt retail, min, max). Priser LIK
   *  anbefalt ⇒ 1,0; dyrere ⇒ færre kunder; billigere ⇒ flere. */
  prisMin: 0.7,
  prisMax: 1.15,

  /** Eksponeringsfaktor fra andel fylte display-plasser (trau + vindu med
   *  lager). eksponeringReferanse = antall fylte plasser som gir FULL
   *  eksponering (klemt mot max). */
  eksponeringMin: 0.7,
  eksponeringMax: 1.15,
  eksponeringReferanse: 4,

  // MERK: markedsforingMin/Max/Skala er FJERNET. Den løpende markedsføringens
  // trafikkeffekt bor nå per kanal i `kampanje.lopende` (under) — Tema 8 DEL D
  // erstattet den gamle flate skala-faktoren (se backgroundSales.ts). De gamle
  // feltene hadde da null lesere.

  /** Hver bakgrunnskunde kjøper 1–2 varer: P(2 varer), ellers 1. */
  sannsynlighetToVarer: 0.5,

  /** PERSONALE / DEL 5 (fiksrunde 2): fast månedskostnad når regnskapet er satt
   *  ut til en regnskapsfører («Outsourcet»-boksen i «Hvem gjør hva?»). Trekkes
   *  i månedsoppgjøret som egen linje. Realistisk størrelsesorden for en liten
   *  norsk bedrift (regnskapsfører ~3 000–6 000 kr/mnd). Tunbar. */
  regnskapOutsourcingMnd: 4000,

  /** TEMA 2 BUDSJETT (VG2): en budsjettlinje regnes som «stort avvik» (utløser
   *  avviks-notatfeltet + mentor-spørsmålet) når faktisk avviker fra budsjett med
   *  MINST `prosent` % OG minst `minKr` kroner. Tunbar. */
  budsjettAvvikTerskel: { prosent: 25, minKr: 1000 },

  /** TEMA 8 KAMPANJE: kanaldagspriser (relative nivåer — SoMe lavest, Facebook
   *  midt, radio høyere, lokalavis høyest) + trafikkmodellens tuning. ALT tunbart. */
  kampanje: {
    dagspris: { tiktok: 300, instagram: 300, snapchat: 300, facebook: 500, 'radio-innlandet': 800, byposten: 1200 } as Record<string, number>,
    dagsprisDefault: 500,
    /** kr/dag der budsjett-effekten begynner å mette (avtagende avkastning). */
    budsjettMetning: 800,
    /** Maks løft-bidrag per kanal ved full treff + mettet budsjett. */
    maksLoftPerKanal: 0.6,
    /** Tak på trafikk-multiplikatoren (godt kanalvalg = merkbart, aldri urimelig). */
    maksFaktor: 2.2,
    /** Førpris-regelen: ordinær pris må ha stått i minst så mange spilldager før
     *  en salgskampanje (2 spilluker). Brudd → tilsynsbrev + moderat bot. */
    forprisDager: 14,
    forprisBot: 3000,
    /** LØPENDE synlighet (DEL D): svakere, jevn effekt av det MÅNEDLIGE
     *  markedsbudsjettet (vs. kampanjens kortvarige støt). Lavere tak/løft. */
    lopende: {
      metning: 8000,          // kr/mnd der budsjett-effekten begynner å mette
      maksLoftPerKanal: 0.15,  // maks jevnt løft-bidrag per kanal
      maksFaktor: 1.3,         // tak på den løpende multiplikatoren
    },
  },

  /** SPILLKLOKKE — klokka eier den åpne dagen (09:00–17:00). Tempo: tickMs
   *  sanntid per tikk, minutterPerTick spillminutter per tikk. Default:
   *  480 spillminutter / (1 min pr 0,75 s) = 360 s ≈ 6 min åpen dag
   *  (~45 sek per spilltime). */
  klokke: {
    apneMinutt: 9 * 60,   // 09:00
    stengMinutt: 17 * 60, // 17:00 ⇒ automatisk stenging
    tickMs: 750,
    minutterPerTick: 1,
  },

  /** Kundemøter planlegges på klokkeslett ved OPEN_DAY, spredt mellom
   *  moteForste og moteSiste (klokkeslett), med lett jitter fra dagseed. */
  moteForste: 10 * 60, // 10:00
  moteSiste: 16 * 60,  // 16:00
  moteJitterMinutt: 25,

  /** Antall kundemøter per dag — avtagende: opplæring de første dagene, så
   *  færre (dagen domineres av bakgrunnssalget). */
  moterOpplaering: 4,   // dag 1..opplaeringsDager
  moterSenere: 2,       // fra dag (opplaeringsDager + 1)
  opplaeringsDager: 2,

  /** BEMANNING (docs/BEMANNING.md): hvor mange bakgrunnskunder ÉN person på
   *  vakt rekker å betjene per klokketime, stigende med nivå. Spilleren
   *  (daglig leder) teller som Junior. Kunder utover samlet kapasitet på vakt
   *  i en time → tapte salg med årsak «kø». Referanse: en velbesøkt dag ligger
   *  på ~15–20 kunder/time, så én Junior holder en rolig dag alene, men en
   *  travel dag (høyt rykte + markedsføring) krever flere/bedre folk på gulvet.
   *  Espen finpusser etter spilltest — ALT her, ikke i motoren. */
  kapasitetPerTime: { junior: 15, senior: 22, ekspert: 30 } as Record<string, number>,
}
