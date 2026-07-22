# Spillets motorer — en lærerveiledning

Dette dokumentet forklarer hvordan automatikken i AdVenture-spillet virker, på
vanlig norsk og uten kode. Målgruppen er **lærere** som skal forstå og forklare
hvorfor elevens butikk går som den gjør — hvorfor kom det så få kunder, hvorfor
tapte hun salg, hvorfor ble det svinn. Alle tallene under er hentet direkte fra
spillets innstillingsfil (`src/game/data/balance.ts`) og gjelder kafé-bransjen,
som er den aktive bransjen i dag.

Hver seksjon avsluttes med **«Hva eleven kan påvirke»** — den korte versjonen du
kan gi videre til klassen.

> Parkerte mekanikker: *stamkunder* og *turistsesong* er ferdig kodet, men slått
> AV i dagens spill og beskrives ikke her.

---

## 1. Kundestrømmen

Kundene kommer i to strømmer:

1. **Bakgrunnskunder** — den jevne strømmen av folk som kommer innom, handler
   selv og går. Disse ser eleven som salgstall, ikke som ansikter.
2. **Kundemøter** — enkeltkunder eleven snakker med (se §7).

Antall bakgrunnskunder for en dag regnes ut når butikken åpner, og «drypper» inn
gjennom åpningstiden **09:00–17:00** (480 spillminutter; klokka går av seg selv,
ett tikk hvert 0,75 sekund). Grunntallet avhenger av **lokasjonen**: det billigste
sentrumslokalet gir rundt 118 forbipasserende, referanselokalet «Gågata 12» rundt
150, og de dyreste rundt 175–195. Utenfor sentrum er tallene lavere (70–118).

Grunntallet ganges så med fire forhold eleven styrer:

- **Rykte:** faktoren er `0,5 + rykte/100`. Rykte 50 gir faktor 1,0 (nøytralt),
  rykte 100 gir 1,5 (50 % flere), rykte 0 gir 0,5 (halvparten).
- **Prisnivå:** ligger prisene i snitt langt over markedet, demper det trafikken.
- **Vareeksponering:** varer som er stilt ut i disken/vinduet trekker folk inn.
  Er ingenting utstilt, kommer det færre — og de som kommer, finner ingenting å
  kjøpe (se §3).
- **Markedsføring:** løpende markedsbudsjett i riktige kanaler mot riktig
  målgruppe løfter strømmen (se §2).

**Hva eleven kan påvirke:** bedre rykte, fornuftige priser, fulle disker og
målrettet markedsføring gir flere kunder forbi og inn.

---

## 2. Målgruppe og persona

I Målgruppe-fanen velger eleven geografi, aldersgrupper, kjønn og inntil tre
psykografiske egenskaper. Ut fra dette genererer spillet automatisk en **persona**
— «din typiske kunde» — med en besøksfrekvens og et beløp per besøk.

Det valgene FAKTISK endrer i tallene:

- **Markedsføringens treff:** de valgte segmentene bestemmer hvor godt et
  markedsbudsjett i en gitt kanal treffer. Riktig kanal mot valgt målgruppe gir
  fullt trafikkløft; feil kanal gir svakt løft.
- **Persona-match i kundemøter:** når sortimentet passer de valgte
  psykografiske egenskapene, gir det en liten bonus i kundemøtene (kunden føler
  seg truffet).

Det valgene IKKE endrer: de justerer ikke grunntrafikken direkte, ikke
markedsprisene og ikke priselastisiteten. Målgruppe er altså et **presisjons**-
verktøy (treffe bedre), ikke en trafikkbryter i seg selv.

**Hva eleven kan påvirke:** en tydelig, gjennomtenkt målgruppe gjør at
markedsføringen og sortimentet treffer — bredt og vagt treffer dårligere.

---

## 3. Pris og marked

Hver vare har en **markedspris** — det «gata» tar for en tilsvarende vare (kaffe
50 kr, te 29 kr, smoothie 45 kr osv.). Eleven setter sin egen **utsalgspris** i
Priser-fanen. Forholdet mellom de to (`din pris ÷ markedspris`) avgjør hvor mange
som faktisk kjøper, gjennom en **priselastisitet**:

- Setter eleven prisen **under** markedet, kjøper litt flere (opp til et tak).
- Setter eleven prisen **over** markedet, faller andelen som kjøper — og noen
  **avstår** («priset over marked»-tap).
- Hvor bratt fallet er, avhenger av varetypen: drikke og brød er
  **prisfølsomme** (dagligvarer med alternativer), kaker er **lite følsomme**
  (signatur/kos), øvrig mat ligger i midten.

En vare **uten** pris selges ikke i det hele tatt — den gir «mangler pris»-tap
til den prissettes.

**Hva eleven kan påvirke:** prisen. For lavt = jobber nesten gratis; for høyt =
kundene går til naboen. Prisfølsomme varer tåler minst overpris.

---

## 4. Kapasitet og kø

Å betjene kunder tar tid. Hver person på gulvet har en **kapasitet per time**:
eleven selv (som daglig leder) og en junior klarer 20 kunder i timen, en senior
28, en ekspert 38. Kapasiteten bygges opp løpende gjennom dagen ut fra hvem som
er satt på vakt.

Kommer det flere kunder enn det er kapasitet til akkurat da, stiller de seg i en
**kø** og venter i inntil **20 spillminutter**. Frigjøres kapasitet innen den
tiden (en travel topp gir seg), betjenes de ventende — eldste først. Venter de
lenger enn 20 minutter, gir de opp og går, og telles som **tapt salg (kø)**.

**Fagfilter-unntaket:** er Personale-fanen skjult fordi faget Forretningsdrift er
slått av for klassen, finnes ikke bemanning som noe eleven kan styre. Da settes
kapasiteten effektivt ubegrenset — ingen kø, ingen kø-tap, ingen kø-linje i
oppgjøret. Bemanningen er ikke «borte», bare satt på vent til faget slås på igjen.

**Hva eleven kan påvirke:** sette nok — og gode nok — folk på vakt i de travle
timene. For få på gulvet = kø og tapte salg.

---

## 5. Lager, bestilling og svinn

Eleven bestiller varer i Produkter-fanen. Pengene trekkes med en gang, men varene
kommer først **neste morgen** (leveringstid 1 dag). Flere bestillinger av samme
vare samme dag slås sammen til én leveranse. En måned er 12 handledager.

Kafeen selger **ferskvare**: det som er stilt ut og ikke solgt når butikken
stenger, kastes ved dagens slutt og bokføres som **svinn** (tap). Bestiller
eleven mye mer enn hun rekker å selge, spiser svinnet av overskuddet; bestiller
hun for lite, går varen tom og hun taper salg hun aldri får igjen.

**Hva eleven kan påvirke:** bestille i takt med etterspørselen — nok til å unngå
tomt, men ikke så mye at det ender i søpla neste kveld.

---

## 6. Rykte og XP

To «poeng-systemer» går parallelt:

- **Rykte** styrer kundestrømmen (§1) og endres mest av kundemøter. Et godt møte
  løfter ryktet, et dårlig trekker det ned; en klage som håndteres godt kan koste
  penger her og nå, men berger ryktet.
- **XP (erfaring)** er elevens progresjon som butikkdriver. God kundebehandling
  og riktige svar på Espens spørsmål gir XP.

I hvert kundemøte regnes en tilfredshet ut fra valgene: gode valg løfter mye,
advarsler trekker litt, dårlige valg trekker mye, og å treffe kundens skjulte
behov gir en ekstra bonus. Tilfredsheten oversettes så til rykte-endring.

**Hva eleven kan påvirke:** møte kundene ordentlig. Rykte er ikke pynt — det er
antall kunder i morgen.

---

## 7. Scenariomøter (kundemøtene)

Gjennom dagen dukker det opp enkeltkunder eleven må snakke med. Antallet er
høyest i **opplæringen** (4 møter dag 1–2) og faller til **2 møter** fra dag 3, så
eleven ikke drukner. Møtene fordeles utover dagen mellom **10:00 og 16:00** med
en liten tilfeldig spredning (± 25 minutter).

Noen kunder har et **tidsvindu** som passer innholdet: morgenkunden (pendleren på
vei til jobb) kommer 09:00–11:00, lunsjkunden 11:00–14:00. Resten kan komme når
som helst.

Alt dette er **deterministisk** (seedet): møterekkefølgen og bakgrunnssalget
regnes ut fra dagens dato, ikke fra tilfeldig flaks. Det betyr at **samme dag
spilt med samme valg gir nøyaktig samme utfall** — nyttig når en elev vil prøve
et valg på nytt, og når du som lærer vil vise det samme for hele klassen. Ingen
elev får en «heldigere» dag enn en annen.

**Hva eleven kan påvirke:** valgene i samtalen — ikke hvem som kommer eller når.

---

## 8. Mentoren (Espen)

Espen er læringslaget. Han snakker i tre «klasser» av situasjoner:

- **Engangs-hendelser:** første gang noe skjer (første åpning, første svinn,
  første lån osv.) — én gang, så aldri igjen.
- **Scene-orienteringer:** første gang eleven går inn i en ny skjerm (bykart,
  bydel, disk, dashbord) — en kort «hva er dette til».
- **Daglig refleksjon:** når dagsoppgjøret lukkes leser Espen dagens tall og
  kommenterer **det største signalet** — i prioritert rekkefølge: kø-tap (mer enn
  5 kunder gikk) → samme vare i svinn to dager på rad → priset over marked (minst
  3 kunder avsto) → tomt for minst 2 varer → ellers en kort anerkjennelse ved en
  plussdag. Maks én slik refleksjon per dag.

To viktige regler:

- **Datavakten:** Espen kommenterer **aldri på tomt grunnlag**. Er det ingenting
  å si (rolig dag uten tydelig signal), sier han ingenting. Kø-refleksjonen fyrer
  dessuten bare når Personale-fanen er synlig — ellers er det ikke noe eleven kan
  gjøre med det (jf. §4).
- **«Espen spør»** er lærerstyrt: du kan slå på korte kunnskapsspørsmål og velge
  hvilke fag de hentes fra. Er det av, spør Espen ikke.

**Hva eleven kan påvirke:** ingenting direkte — men Espen peker på det eleven
KAN gjøre noe med, og stiller spørsmål framfor å gi fasit.

---

## 9. Fagfilteret

Læreren velger hvilke av de tre programfagene som er PÅ for klassen. Fag som er
AV skjules HELT for eleven — faner, temaer, innbokstyper og «Espen spør»-spørsmål
i det faget forsvinner. Står alt på (standard), er spillet fritt.

| Fag | Kort | Styrer blant annet |
|-----|------|--------------------|
| Forretningsdrift | FD | Økonomi, Personale (og dermed kø/bemanning, §4), HMS |
| Markedsføring og innovasjon | M | Målgruppe, Markedsføring, Distribusjon, Utstilling |
| Kultur og samhandling | KS | Reiseliv-temaet (parkert) |

Noen faner er **delte** og vises når MINST ett av fagene er på: Produkter, Priser,
Forretningsplan og Lokasjon hører til både FD og M. En delt fane forsvinner først
når begge fagene er av.

Prinsippet er det samme som datavakten: **konsekvenser eleven ikke kan handle
på, skal ikke dukke opp.** Er bemanning skjult, forsvinner både køen, kø-tapet og
Espens bemanningsspørsmål.

**Hva eleven kan påvirke:** ingenting — dette styrer læreren. Men eleven ser bare
det som hører til fagene klassen har.

---

## 10. Dagsoppgjøret

Når dagen stenger (17:00, eller tidligere hvis eleven stenger selv) kommer
oppgjøret. Linjene:

- **Kundemøter / bakgrunnssalg:** omsetningen fra hver strøm.
- **Varekostnad:** hva de solgte varene kostet i innkjøp.
- **Svinn:** usolgt ferskvare som ble kastet (§5).
- **Tapte salg**, delt på årsak: *tomt lager*, *mangler pris*, *priset over
  marked*, og *kø* (bare når bemanning er i spill, §4). Tapte salg er penger som
  gikk tapt, ikke penger ut av kassa.
- **Rykte og XP i dag:** dagens endring (§6).

**Dagsresultatet** regnes slik:

> resultat = kundemøtesalg + bakgrunnssalg + kunnskapsbonus − varekostnad − svinn

Røde tall betyr at noe må endres: pris, kostnader, bemanning eller volum. Faste
kostnader (husleie, lønn, eierlønn, renter) trekkes ikke i dagsoppgjøret — de
kommer i **månedsoppgjøret**.

**Hva eleven kan påvirke:** alle de fire justeringsknappene over. Oppgjøret er
fasiten på gårsdagens valg — og utgangspunktet for dagens.

---

## Appendiks — kildeoversikt (for utviklere)

Alle tall og terskler er samlet i innstillingsfilen; motorene leser fra den.

| Motor | Hovedfiler |
|-------|-----------|
| Alle tall/terskler | `src/game/data/balance.ts` |
| Kundestrøm + kapasitet/kø + scenarioplanlegging | `src/game/data/backgroundSales.ts` |
| Spill-loop (klokke, TICK, dagsoppgjør) | `src/game/GameContext.tsx` |
| Bransje- og varekatalog | `src/game/data/industries.ts`, `industryDefinition.ts`, `dayConfig.ts` |
| Persona/målgruppe | `src/game/data/personas.ts` |
| Kundemøter (scenarier + motor) | `src/game/sales/scenarios.ts`, `engine.ts` |
| Mentoren | `src/game/ui/Mentor.tsx`, `data/mentorTriggers.ts`, `data/mentorDaglig.ts` |
| Fagfilter | `src/game/data/fag.ts`, `ui/DashboardOverlay.tsx` |
| Geometri/soner (kalibrert) | `src/data/districts.ts` |
