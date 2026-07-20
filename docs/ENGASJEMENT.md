# ENGASJEMENTSLAGET — kroker og byggerekkefølge (v2 — 20.07.2026)

> Erstatter v1. Inkluderer designrundene 20.07: revidert Krok 1
> (Klassens gate), Krok 6 (Espen spør), Krok 7 (Levende innboks) og
> Distribusjonstrappa. Prinsipp uendret: krokene FORSTERKER
> konsekvens-pedagogikken, aldri konkurrerer med den.

## Rammer (ufravikelige)

- Ingen XP-grinding eller poeng for klikking. Fremgang = mestring i drift.
- Ingen individuelle drifts-leaderboards (press + GDPR). Unntak: quiz-
  leaderboardet (finnes, frivillig) og «ukas mest besøkte» som TOPP 3 —
  aldri full rangering, aldri økonomi.
- Ingen streaks/påloggingsbelønning. Dette er skole.
- Verdiladet innhold får aldri score-målere (bærekraft-regelen).
- Lærer-gating av temaer røres ikke — krokene lever i eget lag.
- Alt deterministisk seedet (samme mønster som bakgrunnssalget).
- Kosmetiske belønninger gir ALDRI gameplay-fordel.

## Systemet i én setning

Innboksen gir PLANENE (fremover i tid), kundene og stamkundene gir NÅET,
dagsoppgjøret gir AVSLUTNINGEN, avisen og Klassens gate gir PUBLIKUM,
Espen spør gir DYBDEN, milepælene og distribusjonstrappa gir VEKSTEN.

---

## KROK 1: KLASSENS GATE 🏙️ — den sosiale kroken

Egen horisontal-scrollende visning der hver elevs butikkfront ligger på rad.
Bydelsbildet røres IKKE — ingen 25 lokaler trengs: alle kafé-elever deler
samme NB-fasade, det som skiller er skiltet (butikknavn) og vinduet, som
allerede rendres som data-overlay. 25 butikker = samme bilde + 25
vindu-datasett. Null nye assets.

- **V1 (nå): vindushopping.** Besøk = se klassekameratens fasade, skilt og
  vindu — det eleven styler fritt og er stolt av. Ærlig: en ekte kunde ser
  også vinduet først.
- **Besøk synes hjemme:** besøkstall i HUD/dashbord («3 besøk i dag, 12
  denne uka»), og besøkende kan dukke opp som ekstra kunde-sprite i
  butikken din. Kombinert med «kunde trenger ekstra hjelp»-varsel
  (mentor-badge → klikk → scenario) får butikken puls.
- **Topp 3 «ukas mest besøkte»** — feirer topp uten å henge ut bunn.
- **V2 (høst): kundeperspektiv-interiør** — ett NB-generert interiør sett
  fra kundesiden per bransje, besøkendes disk-data rendres inn. Én
  bakt-interiør-jobb, samme pipeline som alt annet.
- **Personvern:** butikknavn synlig, aldri elevnavn; kun visuell butikk
  deles, aldri økonomi; lærer kan slå av deling per klasse (tema-bryter-
  mønsteret). RTDB: `klasser/{kode}/butikker/{elevId}` (snapshot).

**Innsats:** MIDDELS (V1) · HØY (V2, høst).

## KROK 2: STAMKUNDER 👋 — den emosjonelle kroken

Kunder KOMMER TILBAKE. Godt behandlet i et scenario → dukker opp igjen,
hilser, refererer til forrige møte, handler mer. Dårlig behandlet → kjølig
eller uteblir. 3–4 stamkunder per butikk, med navn, bygget av elevens egen
servicehistorikk. Konsekvens-pedagogikken gjort FØLBAR: service får et
ansikt som husker deg. Relasjonsbygging-kompetansemålet får spillmekanikk
gratis. Bygger på scenariomotor + eksisterende sprites; nytt er
stamkunde-state per kunde-id, 2–3 gjenkjennings-dialoger per stamkunde,
vekting i dagens kundemiks. Mater Lokalavisen (Krok 7) og Klassens gate.

**Innsats:** MIDDELS. Ingen nye assets.

## KROK 3: MILEPÆLER MED VISUELL BELØNNING 🏆 — progresjonskroken

Hay Day-opplåsing der valutaen er DRIFTSMESTRING, ikke XP: «Første
lønnsomme måned» → ny skiltstil. «Fem fornøyde scenarioutfall på rad» →
vinduspynt. «Lån nedbetalt 25 %» → interiøroppgradering. 8–10 milepæler,
hver med SYNLIG belønning i butikken (som Klassens gate viser frem —
krokene forsterker hverandre). Neste milepæl alltid synlig som ETT gråtonet
hint med tekstlabel (aldri kun farge). Kosmetisk, aldri fordel; feirer det
du fikk til, sier aldri hva du skulle gjort. Milepæler gater også
distribusjonstrappa (se prinsipp nederst). Pilot: 2 NB-bilder før batch.

**Innsats:** MIDDELS. Motoren er liten; kosmetikk-assets er jobben.

## KROK 4: GAME FEEL-PAKKEN ✨ — den billigste kroken

Fra migrasjonsplanens fase 3, aldri bygget:
- Lyd: kasse-pling ved salg, dempet oppgjørs-fanfare ved overskudd
  (av-bryter i innstillinger).
- Animerte tall: penger teller opp/ned.
- Dagsoppgjøret som seremoni: 2 sekunders oppsummeringskort («Dag 14:
  38 kunder · beste dag denne uka») før tallene.
- Mikro-animasjon ved levering (esker inn døra) og fornøyd kunde
  (💚 + tekstlabel i dagspulsen — aldri kun farge/emoji).

Forskjellen på «skoleoppgave i nettleser» og «spill». Billigst per følt
kvalitet av alt her.

**Innsats:** LAV. Én CC-jobb.

## KROK 5: UKAS UTFORDRING 🎯 — den lærerdrevne kroken

Læreren trykker én knapp → hele klassen får samme utfordring samme uke med
samme seed («Regnvær hele uka — hold svinnet nede», «Turistbuss-uke»).
Fredag: klassens FELLES-resultat på storskjerm (aggregert, aldri
individuelt). Felles fiende, ikke innbyrdes rangering; gir læreren et
ukeritual (mandag utfordring, fredag oppsummering). Kan senere kobles til
nasjonalt leaderboard-mønsteret (opt-in, klassesnitt — bygget for quiz).
Klassekollektiv-scoreboardet BOR her. Bygger på seedet salg, EVENT_POOL,
TemaAktiveringPanel-mønsteret, live-økt-infra.

**Innsats:** MIDDELS.

## KROK 6: ESPEN SPØR 🎓 — kunnskapskroken (fra brettspillet)

Gjenoppstandelsen av quiz-med-belønning fra det opprinnelige brettspillet
og Unity-designet (questions.json med penge-belønning) — redesignet:
- **Mentoren er quizmaster:** spørsmål kommer som N-badge i mentor-køen,
  eleven klikker når hen vil. Ingen popup, ingen tvang.
- **Elevens egne tall i spørsmålene:** fagord-motoren genererer dynamiske
  spørsmål fra elevens data («Du satte prisen til 55 kr, varekost 20 kr —
  hva er dekningsbidraget ditt?»). Kan ikke pugges forbi.
- **Belønning = penger** (tro mot brettspillet), men SMÅ beløp tunbart i
  balance.ts (≈ en god times salg), tak per dag. Quiz skal aldri redde en
  dårlig drevet butikk. Feil svar: gratis, forklaring vises, spørsmålet
  returnerer i variant. (Fasit ETTER svar følger brannalarm-modellen —
  beslutning først, sannheten etterpå.)
- **Tema-gatet automatisk:** spørsmålspool registreres per tema/nivå i
  temadefinisjonen; læreren som aktiverer Budsjett får budsjettspørsmål
  uten ekstra klikk. Hvert spørsmål 📚-lenker hub-modulen sin.
- **Råstoff finnes:** marketing-dokumentets spørsmålsbank, hub-quizene,
  konkurransespørsmålene.

**Innsats:** LAV–MIDDELS. Mentor-UI, fagord-motor og spørsmålsdata finnes.

## KROK 7: DEN LEVENDE INNBOKSEN 📧 — puls- og fremtidskroken

Innboksen (finnes, reaktiv) blir spillets puls. Tre e-posttyper, hver med
egen jobb — hver e-post er noe å GJØRE eller noe som SKJEDDE, aldri støy:

- **7a Bestillinger (quest-mekanikken):** «Kan dere sette av 12 boller og
  kaffe til personalmøtet fredag kl. 10?» Ja = forpliktelse frem i tid:
  bestille nok varer, holde kapasitet, levere → betaling, eller skuffet
  kunde ved tomt trau. Ordrehåndtering, kapasitetsplanlegging, kalkyle
  («rabatt ved 30 stk?»). VG2: skriftlig pristilbud. GRUNNEN til å logge
  inn i morgen.
- **7b Leverandørtilbud (frist-beslutninger):** «15 % på bakevarer ved
  kjøp over 40 enheter — denne uka.» Noen tilbud er dårlige (regn etter!),
  ett og annet er lureri (forbereder personvern-temaets phishing). Frist
  2–3 spilldager.
- **7c Lokalavisen (byen forteller om deg):** ukentlig, mandager, generert
  fra faktiske data: elevens butikk (stamkunde-nyhet), klassens butikker
  (ukas mest besøkte), og FORHÅNDSVARSLEDE byhendelser («Turistbuss ventes
  lørdag») — PEST-hendelsene gjenfødt som journalistikk, så hendelser blir
  planleggingsoppgaver i stedet for overraskelser.

Rammer: 1–3 e-poster per spilldag, seedet, tunbart tak (VG1 skal ikke
drukne). Mentor varsler ulest post med frist.

**Innsats:** 7a LAV–MIDDELS · 7b LAV · 7c MIDDELS (trenger Krok 1+2 som
kilder).

---

## PRINSIPP: DISTRIBUSJONSTRAPPA 🪜 (går på tvers av kroker og temaer)

Distribusjonskanaler åpnes gradvis utover i spillet — hvert trinn er både
spillbelønning og kompetansemål (Plass i 4P; hub-modul Distribusjon VG1):

1. **Disken** (start) — fysisk butikk, dagens spill.
2. **Bestillinger** (Krok 7a) — salg utenom disk, avtalt tid og pris.
3. **Fast leveringsavtale** (engros) — stående avtale («20 boller hver
   fredag — fast pris?»): forhandlet lavere pris mot volum/forutsigbarhet;
   garantert inntekt, bundet kapasitet, lavere margin. Hotell-gjestepakken
   i Tema 15 er en slik avtale.
4. **Nettbutikk** — investeringen i Tema 13 trinn 2: plattformkostnad,
   bestillingsstrøm inn i dagsoppgjøret, to kanaler samtidig.

**Dobbel gating (bevisst):** Læreren styrer tilgjengelighet via tema
(pedagogisk kontroll); trinnet må FORTJENES via milepæl (Krok 3): fast
avtale krever f.eks. tre feilfrie bestillingsleveranser; nettbutikk krever
første lønnsomme måned + investeringen. Opplåsingen ankommer diegetisk som
en e-post i innboksen. Ingen ny tema-rad — trappa fordeler seg på Krok 7a,
Tema 15 og Tema 13, med krysspeker fra temakartet.

---

## BYGGEREKKEFØLGE (bestemt)

| # | Jobb | Innsats | Når | Hvorfor her |
|---|------|---------|-----|-------------|
| 1 | Krok 4 Game feel-pakken | LAV | NÅ, parallelt med Tema 2 | Løfter ALT umiddelbart for minst innsats |
| 2 | Krok 6 Espen spør | LAV–MIDDELS | Før skolestart | Billig, pedagogisk synlig gevinst fra dag én, gjenbruker eksisterende spørsmålsbank |
| 3 | Krok 7a Bestillinger | LAV–MIDDELS | Før skolestart | Billigste kroken som skaper GJENTATT spilling; kobles rett på levering/lager; åpner trappa trinn 2 |
| 4 | Krok 2 Stamkunder | MIDDELS | Før skolestart | Gjør uke 1-inntrykket varmt; ingen nye assets |
| 5 | Krok 1 Klassens gate V1 | MIDDELS | Skolestart-mål, tåler uke 2–3 | Den store sosiale motoren; V1 = null nye assets |
| 6 | Krok 7b Leverandørtilbud | LAV | Uke 2–3 | Liten påbygning på 7a-mønsteret |
| 7 | Krok 3 Milepæler | MIDDELS | Etter 5 | Belønninger trenger publikum (Klassens gate) |
| 8 | Krok 5 Ukas utfordring | MIDDELS | Tidlig høst | Trenger levende klasser for å bety noe |
| 9 | Krok 7c Lokalavisen | MIDDELS | Høst | Trenger 2 og 5 (stamkunder, besøk) som kilder |
| 10 | Trappa trinn 3 (fast avtale) | MIDDELS | Høst, m/Tema 15 | Krever 7a + milepælmotor |
| 11 | Krok 1 V2 kundeperspektiv | HØY | Høst | Én bakt-interiør-jobb per bransje |
| 12 | Trappa trinn 4 (nettbutikk) | HØY | Sen høst, m/Tema 13 | Størst jobb, minst tidskritisk |

Skolestart-pakken er #1–5: game feel + Espen spør + bestillinger +
stamkunder + Klassens gate V1. Det er fem grunner til å åpne spillet
frivillig — bygget nesten utelukkende på infrastruktur som allerede finnes.
