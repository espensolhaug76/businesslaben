# Bransje 2: Klesbutikk — designdokument

## Kjerneidé
Klesbutikkens vareeksponering er INNREDNINGSBYGGING i to lag:
1. INVENTARVALG: eleven velger møbler/fixtures til sonene sine (via interiørpakke, se Økonomi)
2. VAREFYLLING: hvert inventar fylles med førte plagg — drag-and-drop med justeringspanel (størrelse/vinkel/tetthet, som disken)

## Soner (to per butikk)
- VINDU (mot gata): payoff-sløyfe som kafeen — det du bygger vises på fasaden
- BUTIKKVEGG/-OMRÅDE (inne): hovedeksponeringen kunden møter

## Inventar-typer med motor-mapping (gjenbruk!)
| Inventar | Motor | Fylling |
|---|---|---|
| Klesstativ | LAGER-flate (trau-motoren) | speiler beholdning, overflyt |
| Hylle (brettet) | LAGER-flate | speiler beholdning |
| Bord (stablet) | LAGER-flate | speiler beholdning |
| Dukke | STYLING-flate (vindusmotoren) | fri komposisjon, lagvis plagg |
| Skostativ | LAGER-flate | speiler beholdning |
| Veskekroker / brillerack | LAGER-flate (lav kapasitet) | speiler beholdning |
Prinsipp: lager-flater speiler alltid beholdning (svinn/lager-kobling); styling-flater er fri komposisjon.

## Økonomi: interiørpakker
Innredning er en OPPSTARTSINVESTERING. To pakker ved etablering:
- Basispakke (~25 000 kr): standard stativer, enkle bord, 1 dukke, grunnhyller — volum-uttrykk
- Konseptpakke (~60 000 kr): flere dukker, podier, spotbelysning, eksklusive displayer — premium-uttrykk
Pakkevalget er et posisjoneringsvalg (henger sammen med leverandør-/merkekatalogen).
Senere: enkeltmøbler som tilleggskjøp/oppgradering.

## Assets (pipeline: NB-ark → splitter)
- Møbel-sprites: frittstående utklipp per inventar-type, plasseres i sone-bildet
- Plagg-sprites per kontekst: hengende (stativ), brettet (hylle/bord), ghost-mannequin (dukke — alle i SAMME dukke-positur), sko/vesker/briller frittstående
- Dukke: én base-sprite + lagvise ghost-plagg
- PILOT FØRST: én sone, ett stativ + én dukke, 2–3 plagg — før noe batches

## Sesong = klesbutikkens «svinn»
Plagg har sesong (kolleksjon). Ute-av-sesong i eksponering = dårlig eksponering;
usolgt ved sesongslutt = nedskrivning (salg/rabatt-mekanikk senere).
Kobles på svinnRegel-feltet i IndustryDefinition ('sesong' vs 'ferskvare-daglig').

## Krav til IndustryDefinition (fra refaktoreringen)
- flater-feltet må bære: soner → inventarplasser → inventar-instans → fylling
- interiørpakker som data (innhold + pris)
- personaBudsjett: FASHION_BUDGETS (finnes)
- scenariePool: egne scenarier (prøverom, bytterett, størrelsesråd — egen runde)

## Pilotrekkefølge
1. IndustryDefinition-refaktorering ferdig (kjører)
2. NB: klesbutikk-fasade + én innescene (stilanker: bydelsbildet)
3. Møbel-pilot: 1 stativ + 1 dukke som sprites
4. Plagg-pilot: 2–3 plagg i stativ-kontekst + ghost-kontekst
5. CC: sone m/inventarplassering + fylling (gjenbruk motorene)
6. Valider → batch.
