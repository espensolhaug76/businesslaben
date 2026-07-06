# Bransje 2: Leverandør-/merkekatalog — designdokument

## Kjerneidé
Kvalitet er en egenskap ved LEVERANDØREN, ikke en meny (erstatter tier-systemet
Premium/Standard/Budget som er parkert i industries.ts). Eleven leser markedet:
innkjøpspris + merkeposisjon = kvalitetssignal. Innkjøpsvalgene BLIR butikkens
posisjonering.

## Fire fiktive merker (ALDRI ekte merkenavn — varemerkerisiko)
| Merke | Segment | Innkjøp | Status/brandPull | Persona-affinitet |
|---|---|---|---|---|
| Basiq | Billigvolum | Lav | Ingen | Prisbevisste |
| Strøm & Berg | Norsk midt | Middels | Moderat | Bred (familie/karriere) |
| Nordheim Atelier | Premium | Høy | Sterk — trekker kunder | Trendsettere/karriere |
| Fjellrev Works | Nisje norsk kvalitet | Middels-høy | Sterk hos SINE | Miljøbevisste/helse |

## Datamodell
Brand { id, navn, segment, brandPull, personaAffinity[] }
Katalogvarer får brandId; SAMME plaggtype kan finnes fra flere merker med ulik
costPrice — eleven sammenligner i innkjøpskatalogen.

## Mekanikker
1. INNKJØP: katalogen grupperes/filtreres per merke; sammenlign samme vare på
   tvers. Margin-regnestykket blir synlig per valg.
2. PERSONA-MATCH: sortimentets merkemiks vs. målgruppens personaAffinity —
   gjenoppliver den nøytraliserte premium/budget-aksen i calcPersonaMatchScore
   med EKTE data (merkemiks, ikke tier-ratio).
3. BRANDPULL: sterke merker i EKSPONERING (vindu/dukker) øker trafikk fra
   matchende personas — kobles på kunde-spawn/dagssyklus senere.
4. NEDSKRIVNINGSRISIKO: dyre merker usolgt ved sesongslutt = større tap
   (kobles på sesong-svinnregelen, eget designdok).

## Pedagogikk
Innkjøp som fag: pris/kvalitet/målgruppe/margin i én beslutning. Elevene lærer
MEKANISMEN (merkeposisjon som signal) — ikke merkegjenkjenning.

## Avgrensning v1
4 merker, klesbutikk først. Kafé kan få 2 leverandører som påbygg senere.
Interiørpakkene (BRANSJE2_KLESBUTIKK.md) er posisjoneringsvalgets andre halvdel.
