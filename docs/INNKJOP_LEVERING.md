# Innkjøp og leveringstid — designdokument

## Kjerneidé
Innkjøp er i dag øyeblikkelig (bestill → varer på lager samme sekund). Med
dagssyklusen skal bestilling få LEVERINGSTID: bestill dag N → varene ankommer
morgenen dag N+leadTime. Pedagogikk: planlegging framover — innkjøpsmengde ×
timing mot forventet salg, svinn og utsolgt-risiko.

## Datamodell
- Bestilling { productId, qty, bestiltDag, ankomstDag, costKr }
- state.incomingOrders: Bestilling[] — synlig for eleven («Underveis»)
- Ved OPEN_DAY (morgen): ordrer med ankomstDag <= dayNumber → stock += qty,
  fjernes fra incomingOrders. Varene er på plass FØR dagen åpner.
- Penger trekkes ved bestilling (som i dag).

## leadTime som leverandør-egenskap (kobler til BRANSJE2_LEVERANDORER.md)
- Kafé v1: én felles leadTime = 1 dag (bestill i dag → i disken i morgen).
  Enkelt, lærer prinsippet.
- Med leverandørkatalogen: leadTime per leverandør/merke — lokal/rask/dyr vs.
  grossist/treg/billig. Enda en akse i innkjøpsvalget.
- Hastebestilling (samme dag, gebyr) = senere mottrekk-mekanikk.

## UI
- Produkter-fanen: «Underveis»-seksjon (vare, antall, ankommer dag N)
- Dagsoppgjør/morgen: «📦 Varer ankommet: 40 × Croissant»
- Utsolgt-hintet i oppgjøret kan nå peke framover: «Bestill i kveld — levering
  i morgen tidlig»

## Avgrensning v1
leadTime=1 for alt, ingen hastebestilling, ingen leverandør-differensiering.
Bygges ETTER at dagssyklusen (runde 1) er validert — den er fundamentet.

## Tutorial-arv (fra Unity-designet)
Tutorialens steg 3 («bestill varer → varer ankommer på lageret») får nå ekte
mening: bestilling dag 1, åpning dag 2. Mentor-flyten kan bruke ventetiden
pedagogisk.
