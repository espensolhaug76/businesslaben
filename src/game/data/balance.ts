// ─── BALANSE — bakgrunnssalg (BAKGRUNNSSALG-oppgaven) ─────────────────────────
// ÉN fil å justere. Alle tall som styrer den passive kundestrømmen bor her, så
// Espen kan finpusse balansen ETTER spilltest uten å røre motoren
// (backgroundSales.ts / GameContext). MÅL: en rimelig drevet kafé (godt lager,
// fornuftige priser, rykte ~55, sentrum-l2) skal lande ~3 000–5 000 kr i
// dagsmargin → månedsresultat rundt null mot ~47 000 faste.

export const BALANCE = {
  /** Global skala for HELE bakgrunnstrafikken — skru volumet opp/ned samlet. */
  baseMultiplier: 1.0,

  /** Bakgrunnstrafikk (kunder/dag) per lokale FØR faktorer. REKALIBRERING
   *  (pkt. 35): skalert til VERDENSMODELL-målbildet (fornuftig solo på sentrum-l2
   *  ~150–165 demand → ~150 servert = 12 000–14 000 kr/dag). LOKAL-STIGEN
   *  (DEL 5): basetrafikk stiger SAMMEN med husleie (rentFactor i districts.ts),
   *  så dyrere lokale = mer trafikk. Sentrum-stigen (rentFactor → basetrafikk):
   *  l4 0.8→115, l3 0.9→130, l2 1.0→145, l1 1.2→175, l5 1.25→195. Se
   *  docs/VERDENSMODELL.md §3. Ukjent lokale → basetrafikkDefault. */
  basetrafikk: {
    // Sentrum — MONOTON med rentFactor (districts.ts): dyrere = mer trafikk.
    'sentrum-l5': 195, // Torggata 1 (rentFactor 1.25) — premium, krever bemanning
    'sentrum-l1': 175, // Hjørnelokalet ved torget (1.2) — krever bemanning
    'sentrum-l2': 150, // Gågata 12 (1.0) — REFERANSE; solo på taket
    'sentrum-l6': 140, // Torggata 3 (0.95)
    'sentrum-l3': 132, // Gågata 14 (0.9) — solo-viable
    'sentrum-l7': 125, // Torggata 5 (0.85)
    'sentrum-l4': 118, // Gågata 16 (0.8) — billigst, solo-viable under taket
    'stasjon-l5': 118, 'stasjon-l1': 112, 'stasjon-l2': 100, 'stasjon-l6': 92,
    'stasjon-l3': 85, 'stasjon-l7': 80, 'stasjon-l4': 74, 'stasjon-l8': 70,
  } as Record<string, number>,
  basetrafikkDefault: 85,

  /** DEMPET samlet prisfaktor på kundestrømmen = klem(snitt markedsPris / snitt
   *  retail, min, max), deretter halvert utslag (prisfaktorDemping). Hovedeffekten
   *  av pris ligger nå PER VARE (priselastisitet under). */
  prisMin: 0.7,
  prisMax: 1.15,
  prisfaktorDemping: 0.5,

  /** PRISELASTISITET per vare (DEL 7f-b). ratio = utsalgspris / markedsPris.
   *  Kurvepunkter [ratio, faktor] fra 1,0 og opp — lineær interpolasjon mellom,
   *  ≥ siste = siste, gulv 0. Under 1,0: billigsalg, tak `billigTak` (avtagende).
   *  Tre profiler mappes fra varekategori (se elastisitetsprofil i
   *  backgroundSales). ALT tunbart. */
  priselastisitet: {
    billigTak: 1.15,      // maks løft under markedspris
    billigStigning: 0.5,  // hvor bratt gevinsten stiger under marked (klemt mot billigTak)
    // HØY (dagligvare m/alternativer: kaffe, te, rundstykker, brød)
    hoy:     [[1.0, 1.00], [1.3, 0.50], [1.6, 0.10], [2.0, 0.00]] as [number, number][],
    // MIDDELS (kos/impuls: boller, croissant, skolebrød) — default for nye varer
    middels: [[1.0, 1.00], [1.3, 0.70], [1.6, 0.30], [2.0, 0.05]] as [number, number][],
    // LAV (signatur/spesial: kaker, gulrotkake, sesongvarer)
    lav:     [[1.0, 1.00], [1.3, 0.85], [1.6, 0.50], [2.0, 0.20]] as [number, number][],
  },

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

  /** Hver bakgrunnskunde kjøper 1–2 varer: P(2 varer), ellers 1. Ved 0,5 er
   *  snitt 1,5 varer/kunde → snittkjøp = 1,5 × snittpris (~52 kr) ≈ 78 kr, jf.
   *  VERDENSMODELL-målbildet (70–85 kr). Tunbar. */
  sannsynlighetToVarer: 0.5,

  /** EIERLØNN (REKALIBRERING, pkt. 35) — eierens egen lønn som FAST månedskostnad,
   *  trukket hver måned som husleie. Pedagogisk kjerne: eierens arbeid er aldri
   *  gratis, så «overskudd» måles ETTER eierlønn. VG1-forenkling: ETT tall, ingen
   *  arbeidsgiveravgift/feriepenger (se docs/VERDENSMODELL.md §4). Tunbar. */
  eierlonnMnd: 40000,

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
    // REKALIBRERING (pkt. 35): satt bevisst så MODERAT løpende markedsføring gir
    // et merkbart, men avtagende løft — nok til at mkf + en godt målrettet
    // kampanje kan gi positiv netto NÅR kapasiteten er bemannet for kundene.
    // Tunbart mot balansespilleren (godt-drevet-strategien).
    lopende: {
      metning: 5000,          // kr/mnd der budsjett-effekten begynner å mette
      maksLoftPerKanal: 0.25,  // maks jevnt løft-bidrag per kanal
      maksFaktor: 1.45,        // tak på den løpende multiplikatoren
    },
  },

  /** TEMA 15 REISELIV — turistsesong. Lillehammer-klasse småby med sesongturisme
   *  (vinter/sommer): i sesong løftes trafikken og en tredjedel av kundene er
   *  tilreisende som vrir etterspørselen mot kaffe/kaker (grab-and-go). Se
   *  docs/VERDENSMODELL.md §1 (sesong-antagelsen). ALT tunbart. */
  turistsesong: {
    /** Sesongens varighet i HANDLEDAGER (~2–3 spilluker; en spilluke ≈ 6
     *  handledager, halv spillmåned). */
    varighet: 14,
    /** Andel av dagens bakgrunnskunder som er TURISTER i sesong. */
    turistandel: 0.30,
    /** Ekstra trafikkløft i sesong (tilreisende oppå den vanlige strømmen). */
    trafikkLoft: 0.20,
    /** Per-kategori pick-vekt for turister (vrir etterspørsel; drikke=kaffe,
     *  kaker). Kategorier ikke nevnt = vekt 1,0. */
    vareVekt: { drikke: 1.6, kaker: 1.5 } as Record<string, number>,
    /** DEL 5 — byhotellets gjestepakke: hotellet tar denne andelen av
     *  pakkesalget, mot ekstra turisttrafikk (multiplikator) ved aksept. */
    hotellKutt: 0.15,
    hotellTrafikkBonus: 0.25,
    /** DEL 5 — «Opplev byen»-gjestepakke (turistkontor): løfter frekvensen av
     *  anbefal-opplevelse-scenarier (multiplikator på turistandelen av møter). */
    opplevByenScenarioLoft: 1.5,
    /** DEL 7 — pakkebyggeren (reiselivsprodukt): match-vekter mot besøksprofilen.
     *  treff = klem((Σ matchende egenskaper × egenskapVekt) − prisstraff −
     *  timerstraff, 0, maksTreff) / maksTreff. Egen kafé i pakken gir
     *  `kafeTrafikkBonus` ekstra trafikk i sesongen. ALT tunbart. */
    pakke: {
      egenskapVekt: 1,          // poeng per opplevelses-egenskap som treffer profilen
      prisStraff: 1,            // straff per prisklasse over profilens preferanse
      timerStraff: 0.6,         // straff per time pakken er over profilens timebudsjett
      maksTreff: 6,             // normalisering (poeng / maksTreff → treff 0–1)
      turisterMultiplikator: 0.5, // «X kjøpte pakken» = round(sesongturister/dag × treff × dette)
      kafeTrafikkBonus: 0.15,   // ekstra kafé-trafikk i sesongen når egen kafé er i pakken
    },
    /** BØLGE 3 — ambient turist-gjester i KAFÉ-interiøret: i sesong kan inntil
     *  `maks` seedede turist-sprites vises på ledige kundeposisjoner. REN visuell
     *  tilstedeværelse (ingen interaksjon, påvirker ikke salg/fasit).
     *  AV SOM STANDARD (Espens beslutning bølge 3 v2): turistene hører hjemme på
     *  REISELIVSSTEDENE, ikke i kaféen — de vises nå i TuristkontorPanel-heroen
     *  (og skal inn i hotellobbyen, spor-c). Systemet beholdes bygget; slå på
     *  igjen med `aktiv: true` etter pilot-erfaring. */
    ambient: {
      aktiv: false,
      maks: 2,        // antall ambient-gjester samtidig (≤ antall traced slots)
      opacity: 0.5,   // dimming så de leser som bakgrunnsliv, ikke aktiv kunde
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
  // REKALIBRERING (pkt. 35): solo-kapasitetstaket = junior × 8 timer ≈ 160
  // kunder/dag, så en fornuftig solo-drift (sentrum-l2) ligger PÅ taket og
  // «godt drevet» (250–300 kunder) er UMULIG uten ansatte — man driver ikke en
  // kafé alene. Se docs/VERDENSMODELL.md §2.
  kapasitetPerTime: { junior: 20, senior: 28, ekspert: 38 } as Record<string, number>,
}
