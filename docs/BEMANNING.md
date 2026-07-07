# Bemanning — org-kart, vaktliste og kapasitet

## Pedagogisk mål (kv1011)
Organisering og bemanningsplanlegging: eleven skal erfare avveiningen
mellom kapasitet og lønnskost. For få på vakt = kø og tapte salg; for
mange = lønna spiser dagsresultatet. En ansatt uten vakter koster fullt
og bidrar null.

## Flyt
Ansett (Personale-fanen) → kort på PERSONALBENKEN → dras inn i ORG-KARTET
(hvem er hva) → dras inn i VAKTLISTEN (når jobber de). Eleven bygger
organisasjonen fysisk med drag'n'drop.

## Org-kart
Daglig leder (eleven) fast på topp. Grener: Salg, Markedsføring, Økonomi.
Rollenavn per bransje via IndustryDefinition. Auto-rendres fra
plasseringene. Udisponerte står synlig på benken.

## Vaktliste
Timegrid 09:00–17:00, én dagsmal som gjelder alle dager (ingen ukedager i
spillet). Kun Selger-stilling + eleven selv går på gulvvakt. Eleven er
gratis arbeidskraft men har Junior-kapasitet.

## Kapasitet (kobling til bakgrunnssalget)
Hver person på vakt betjener N bakgrunnskunder per time (kapasitetPerTime
i balance.ts, stigende med nivå). Kunder over samlet kapasitet i en time
→ tapte salg med årsak «kø», synlig live i dagspulsen og i dagsoppgjøret
(skilt fra «tomt lager»). Markedsfører/Økonom går ikke på gulvvakt; de
beholder månedseffektene sine.

## Lønn
Månedslønn trekkes via economy.ts (eksisterende flyt). Vises i
månedsoppgjøret. Ingen ansatte = 0 kr (eleven driver alene).

## Bevisst utelatt (v1)
Sykefravær/hendelser · opplæring/utvikling · AML-detaljer (pausekrav kan
bli HMS-oppgave senere) · oppsigelsesprosess (kun «avslutt
arbeidsforhold») · ukedager/helgevakter · timelønn (månedslønn beholdes).
