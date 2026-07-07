# Innkjøp og leveringstid — designdokument

## Kjerneidé
Bestilling har LEVERINGSTID: bestill dag N → varene er klare morgenen dag
N+leadTime. Pedagogikk: planlegging framover — innkjøpsmengde × timing mot
forventet salg, svinn og utsolgt-risiko.

## Bærende prinsipp: leveringstid er ALDRI død ventetid
Butikken har ALLTID varer å selge — leveringstiden er en planleggings-horisont,
ikke en periode der disken står tom:
- **Åpningsbestilling** (se under) sikrer at eleven aldri åpner dag 1 uten
  sortiment (med mindre hun bevisst velger det).
- Fra dag 2 bestiller eleven inn til NESTE dag mens hun fortsatt selger fra
  dagens lager — hun venter aldri på å kunne handle, hun planlegger neste
  runde.
- **Horisonten er bransjens egen tidsskala**, ikke en generisk «leveringsbil»:
  - Bakeri/kafé: natt → morgen. Varene *bakes ferske* over natten og står
    klare ved åpning («bakes til i morgen tidlig», ikke «leveres»).
  - Klesbutikk (bransje 2): ordre mot **sesong/kolleksjon** — lengre horisont,
    innkjøp bindes opp mot en hel sesong (se BRANSJE2_SESONG.md /
    BRANSJE2_LEVERANDORER.md).
- Ordlyden er derfor bransje-spesifikk DATA (`IndustryDefinition.forsyning`),
  mens koden holder seg generisk (Bestilling/incomingOrders/leadTime/
  ankomstDag). Kafeen sier «ferske varer klare», en klesbutikk «bestilt mot
  sesong» — uten at motoren endres.

## Åpningsbestilling (elevens selvvalgte startlager)
Ved leie av lokale (`RENT_LOCATION`) seedes IKKE et fast startlager. I stedet
gjør eleven en ÅPNINGSBESTILLING selv (`OpeningOrderOverlay`, action
`PLACE_OPENING_ORDER`):
- Hele katalogen med antall-velgere, **forhåndsutfylt** med bransjens forslag
  (`IndustryDefinition.oppstartssortiment`) — kan justeres/fjernes/utvides.
- Summen trekkes fra startkapitalen; «Bekreft» sperres hvis sum > kapital.
- Varene ligger **FERDIG på lager dag 1** (ingen ventetid — dette ER
  åpningsdagen; for kafé «bakes ferske til åpningsdagen»).
- **Tomt valg advares** («Åpner du uten varer?») men **tillates** — eleven kan
  åpne tom og bestille inn til dag 2.
- Gate: `rentedLocationId && !openingOrderPlaced` (settes av handlingen).

## Datamodell
- Bestilling { productId, qty, bestiltDag, ankomstDag, costKr }
- state.incomingOrders: Bestilling[] — synlig for eleven («Underveis»)
- state.openingOrderPlaced: boolean — gater åpningsbestillings-skjermen.
- Ved OPEN_DAY (morgen): ordrer med ankomstDag <= dayNumber → stock += qty,
  fjernes fra incomingOrders. Varene er på plass FØR dagen åpner.
- Penger trekkes ved bestilling.

## leadTime som leverandør-egenskap (kobler til BRANSJE2_LEVERANDORER.md)
- Kafé v1: én felles leadTime = 1 dag (bestill i dag → i disken i morgen).
  Enkelt, lærer prinsippet.
- Med leverandørkatalogen: leadTime per leverandør/merke — lokal/rask/dyr vs.
  grossist/treg/billig. Enda en akse i innkjøpsvalget.
- Hastebestilling (samme dag, gebyr) = senere mottrekk-mekanikk.

## UI (bransje-ordlyd via `IndustryDefinition.forsyning`)
Koden er generisk; teksten er kafé-flavored data (klesbutikk får sin egen):
- Åpningsbestilling: tittel/løfte/knapp («🥐 Åpningsbestilling», «bakes ferske
  til åpningsdagen», «Bak til åpningsdagen»).
- Produkter-fanen «Underveis»-seksjon: header + linje-etikett («🥐 BAKES TIL I
  MORGEN», «Ferskt dag N») — IKKE «🚚 Underveis / Ankommer».
- Morgenpille (OPEN_DAY): «🥐 Ferske varer klare: 15 × Blåbærmuffins» — ikke
  «Varer ankommet / leveres».
- Dagsoppgjørets utsolgt-hint peker framover: «Bestill i kveld, så er varene
  ferske i disken i morgen tidlig».

## Avgrensning v1
leadTime=1 for alt, ingen hastebestilling, ingen leverandør-differensiering.
Bygges ETTER at dagssyklusen (runde 1) er validert — den er fundamentet.

## Tutorial-arv (fra Unity-designet)
Tutorialens steg 3 («bestill varer → varer ankommer på lageret») får nå ekte
mening i to trinn: (1) åpningsbestillingen fyller disken til dag 1 — eleven
kjenner innkjøp-mot-kapital med en gang, uten ventetid; (2) fra dag 2 lærer
hun planleggings-horisonten (bestill i kveld → ferskt i morgen). Mentor-flyten
kan bruke overgangen pedagogisk: «i dag baker vi til åpning, fra i morgen
planlegger du selv».
