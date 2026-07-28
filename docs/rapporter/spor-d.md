# Spor D — lærerdashboard-UX

Gren: `spor-d/laerer-ux`. Frist: lærerdemo 11. august 2026.

Jobben er en **skall-endring**: nytt navigasjonslag rundt de åtte eksisterende
innholdskomponentene, global klasselinje, pluss fire avgrensede endringer inne i
faner (steg 4–7). Innholdskomponentene skrives ikke om.

---

## STEG 0 — kartlegging

### Rotkomponent og fanelista

| Hva | Hvor |
| --- | --- |
| Rute `/teacher` | `src/App.tsx:477` → `<ErrorBoundary><TeacherDashboard /></ErrorBoundary>` |
| Rotkomponent | `src/screens/TeacherDashboard.tsx:638` `export default function TeacherDashboard()` (fila er 2812 linjer og inneholder både skallet og flere av innholdsfanene inline) |
| Fanelista (ID-ene) | `TeacherDashboard.tsx:994` — array-literal `['live', 'laeringsinnhold', 'sporsmal', 'spillet', 'elever', 'prover', 'konkurranser', 'leaderboard']` |
| Faneetiketter | `TeacherDashboard.tsx:995` — `labels`-record inne i `.map()` |
| Fane-tooltips | `TeacherDashboard.tsx:996–1005` — `tooltips`-record, rendret som svart boks på hover i `TeacherDashboard.tsx:1036–1069` (`hoveredTab`-state, linje 658) |
| Sidebredde | `TeacherDashboard.tsx:899` — `max-w-4xl` (896 px) på innholds-wrapperen; toppmenyen har egen `max-w-4xl` på linje 878 |

### De åtte fanenes innholdskomponent

| Fane-ID | Etikett i dag | Innholdskomponent |
| --- | --- | --- |
| `live` | Live økt | `src/screens/teacher/LiveOktTab.tsx` (480 l) — montert `TeacherDashboard.tsx:1755` |
| `laeringsinnhold` | Læringsinnhold | Inline i `TeacherDashboard.tsx:1167–1366`. Har egne underfaner (`learningSubTab`, state på linje 675): **Minileksjoner** → `MinileksjonsTab` (`TeacherDashboard.tsx:2492`), **Presentasjoner** → inline hardkodet lenkeliste (`1217–1364`) |
| `sporsmal` | Spørsmål | Inline i `TeacherDashboard.tsx:1368–1743` |
| `spillet` | Spillet | Inline i `TeacherDashboard.tsx:1075–1165`; øverst `TemaAktiveringPanel` (`src/screens/teacher/TemaAktiveringPanel.tsx`, 257 l), deretter «Velg fag / bok», stats-bar og `LessonCard`-liste (`TeacherDashboard.tsx:2627`) |
| `elever` | Klasser | `KlasserTab` — inline i `TeacherDashboard.tsx:304–634`, montert linje 1745 |
| `prover` | 📝 Prøver | `ProverTab` — inline i `TeacherDashboard.tsx:1779`, montert linje 1747 |
| `konkurranser` | 🏆 Konkurranser | `src/screens/teacher/KonkurranserTab.tsx` (386 l) — montert linje 1751 |
| `leaderboard` | 📊 Nasjonalt leaderboard | `src/screens/teacher/LeaderboardTab.tsx` (260 l) — montert linje 1759 |

### Hvordan aktiv fane lagres

Ren React-state: `const [activeTab, setActiveTab] = useState<...>('laeringsinnhold')`
(`TeacherDashboard.tsx:657`). **Ikke** i URL, ikke i localStorage, ingen route-params.

**Dyplenker:** ingen. Alle 14 treffene på `navigate('/teacher')` i kodebasen
(LandingPage, CompetitionBuilder, CompetitionLive, Leaderboard, ExamBuilder,
ExamResults, LearningHub, TeacherForum, AboutPage) går til bar `/teacher` uten
query eller hash. Ingen eksterne lenker peker på en enkeltfane, så ingenting
kan brekke. Interne hopp mellom faner skjer via `setActiveTab`-kall:
- linje 840 — `handleOpenSporsmalWithModule` → `sporsmal`
- linje 975 / 987 — velkomst-tomtilstand → `elever` / `laeringsinnhold`
- linje 1745 — `KlasserTab.onStartLiveOkt` → `live`

### Aktiv klasse og klassekode

Sannheten er **`localStorage['teacher-classroom-code']`** — en flat streng. Ingen
React-context, ingen store, ingen event-buss.

| Sted | Hvordan den leses/skrives |
| --- | --- |
| `TeacherDashboard.tsx:681–687` | `classroomCode` — `useState`-initializer, leses **én gang** ved mount. Genererer og lagrer ny kode hvis nøkkelen mangler. Har ingen setter → oppdateres aldri i denne komponenten |
| `TeacherDashboard.tsx:276–302` | `loadClasses()` / `saveClasses()` / `setActiveClassroomCode()` mot `localStorage['teacher-classes']` (array av `{code, name, subject, schoolName?, teacherName?}`, maks 4) |
| `KlasserTab` (`304`) | Egen `activeIdx`-state. Klassechipsene (linje 425) kaller `setActiveIdx(i)` + `setActiveClassroomCode(cls.code)` |
| `LiveOktTab.tsx:57` | `localStorage.getItem('teacher-classroom-code')` lest på hver render |
| `KonkurranserTab.tsx:52` | `readActiveClass()` i `useMemo(..., [])` — leses én gang ved mount |
| `TemaAktiveringPanel.tsx:14` | `useState`-initializer — leses **én gang ved mount**, kommentert «Leses ved (re)mount» |
| `LeaderboardTab.tsx` | Matcher klassekoder mot `teacher-classes` for å markere «DIN KLASSE» |

**Propagering ved klassebytte: finnes ikke.** Klassebytte i Klasser-fanen skriver
kun til localStorage. Andre faner plukker opp den nye koden bare fordi de
av-/remonteres når `activeTab` endres (betinget rendring). `classroomCode` i
`TeacherDashboard` selv oppdateres aldri før full page reload — det er dette som
gjør en global, delt klassetilstand nødvendig (steg 2).

### «Mine fag»-chippen

`TeacherDashboard.tsx:906–954` — knapp + `AnimatePresence`-panel øverst til høyre
i tittelraden. State: `mySubjects` (linje 719, persistert i
`localStorage['adventure-teacher-subjects']`) og `showMineFagPanel` (linje 726).
Valgene kommer fra `MINE_FAG_OPTIONS` i `src/lib/teacherSubjects.ts`.

Avledet filtrering (linje 728–743) — dette er alt «Mine fag» faktisk styrer:
- `filteredLessonSubjects` → «Velg fag / bok» i Spillet-fanen
- `activeModuleKeys` → `MinileksjonsTab.mineFagModuleKeys`
- `activeSporsmalFags` → Spørsmål-fanen

### «Klassens nivå» (skal flyttes i steg 2)

`TemaAktiveringPanel.tsx:183–204`. Verdi i `klasseNivaa`-state (linje 17),
persistert i Firebase RTDB `klasser/{kode}/klasseNivaa` (`vg1` | `vg2`), lest via
`onValue` (linje 44–49), skrevet med `skrivNivaa()` (linje 58–61).

### Mikroteksten «klasse JXXUEY» (skal fjernes i steg 2)

`TemaAktiveringPanel.tsx:90` — `<span className="text-[11px] text-gray-400 font-mono">klasse {kode}</span>`.

### Klassekode-linja i Live økt (skal fjernes i steg 2)

`LiveOktTab.tsx:184–186` bygger `classLabel`; rendres to steder:
linje 199–203 (før økt) og linje 343–345 (under aktiv økt).

### Det store klassekode-kortet i Spørsmål (skal fjernes i steg 2)

`TeacherDashboard.tsx:1371–1395`. Merk at «Oppdater»-knappen (`refreshAnswers`)
ligger inni dette kortet og må reddes ut før kortet slettes.
Kortet som **beholdes** er Klasser-fanens eget: `TeacherDashboard.tsx:494–534`.

### Den grønne «Live økt»-pillen (steg 6)

`src/components/ui/LiveBar.tsx` — `position: fixed; top: 70; right: 20`, montert
globalt i `src/App.tsx:869`, altså også over `/teacher`. Vises når
`useLiveSync()` gir `isLive && isStudentLive`; `isStudentLive` er sann på
`/teacher` fordi den bare er usann for lærerens storskjerm (`?live-code`-param).
Uavhengig av denne finnes en grønn prikk på selve Live-fanen, styrt av
`liveSessionActive` (`TeacherDashboard.tsx:667–674`, poller
`localStorage['live-session-active']` hvert 2. sekund).

### Innholdspakke (steg 5)

Finnes ikke i dag — ingen treff på «Innholdspakke» i `src/`. Seksjonen er ny og
skal romme «Velg fag / bok» (`TeacherDashboard.tsx:1087–1113`).

### Temaradene (steg 5)

`TemaAktiveringPanel.tsx:206–254`. Nivåvelgeren (linje 226–239) rendres i dag
sammen med av/på-bryteren (linje 240–248) uansett om temaet er av. Nivåene per
tema kommer fra `tema.nivaaer` i `src/game/data/temaer.ts`; lagret verdi er
`{aktiv, nivaa}` i RTDB `klasser/{kode}/temaAktivering/{temaId}` — det finnes
ingen «følger klassen»-tilstand ennå.

---

## Hva som ble endret, per steg

Alle åtte innholdskomponenter er beholdt og montert som før. Endringene under
er i skallet, pluss de fire avgrensede inngrepene i steg 4–7.

### Steg 1 — fire hovedområder med underfaner

`TeacherDashboard.tsx`: den flate 8-fanelista er erstattet av `OMRADER`
(nivå 1, understrek på aktivt område) + `aktivtOmrade.subs` (nivå 2, piller).
Fane-IDene er beholdt, så alle interne `setActiveTab`-kall virker uendret.

| Hovedområde | Underfaner |
| --- | --- |
| I timen | Live økt · Konkurranser |
| Innhold | Læringsinnhold · Spillstyring |
| Vurdering | Prøver · Spørsmål |
| Klassen | Klasser · Nasjonalt leaderboard |

Klikk på et hovedområde åpner `subs[0]`. Standard ved innlasting er
`I timen / Live økt` (var `Læringsinnhold`).

**Dyplenker:** ingen fantes (se kartlegging). `LEGACY_FANE_MAP` er likevel lagt
inn og leses fra `?fane=<id>` ved mount, slik at gamle fanenavn — inkludert
`spillet`, som nå heter Spillstyring — lander på riktig underfane. Parameteren
skrives ikke tilbake til URL-en.

### Steg 2 — global klasselinje

Ny `TeacherClassProvider` (`src/screens/teacher/TeacherClassContext.tsx`) eier
klasselista, aktiv klassekode, elevenes nivå, «Mine fag» og live-status.
Ny `KlasseLinje` (`src/screens/teacher/KlasseLinje.tsx`) rendres rett under H1,
over nivå 1: **Klasse** (nedtrekk) · **Kode** (monospace + kopier-ikon) ·
**Elevenes nivå** (VG1/VG2) · **Mine fag (bare mitt utvalg)** (nedtrekk).

Gjennomført:
- Klassekode-linja «Klasse: 1SSR (kode: JXXUEY)» fjernet i Live økt — begge
  stedene (før økt og under aktiv økt).
- Det store klassekode-kortet i Spørsmål fjernet. «Oppdater»-knappen som lå
  inni kortet er reddet ut og står nå alene som «Oppdater svar».
- Mikroteksten «klasse JXXUEY» fjernet fra Spillstyring.
- «Mine fag»-chippen fjernet fra tittelraden.
- «Klassens nivå» flyttet ut av Spillstyring og inn i klasselinja som
  «Elevenes nivå». Samme RTDB-node (`klasser/{kode}/klasseNivaa`); temapanelet
  leser verdien derfra via konteksten.
- Klasser-fanens store klassekode-kort er **beholdt**.
- `KlasserTab` bruker nå samme tilstand som klasselinja. Verifisert begge veier:
  klikk på klassechip → nedtrekket bytter; bytte i nedtrekket → chipen får
  aktiv ramme (`rgb(13, 148, 136)`).

`LiveOktTab` og `KonkurranserTab` leser aktiv klasse fra konteksten i stedet for
å lese localStorage i en mount-initializer. Det var den gamle mekanismen som
gjorde at et klassebytte ikke nådde fram uten remount.

### Steg 3 — navnegrep og beskrivelseslinjer

- «Spillet» → «Spillstyring» i lærerdashboardet. Toppmenyens «Spillet»
  (elevlenken til `/desktop`) er urørt.
- FD/M/KS-bryterne har fått overskriften «Fag elevene ser».
- De svarte hover-tooltipene (`hoveredTab`-state + tooltip-boks) er slettet.
  Erstattet av én grå setning under nivå 2-pillene, én per underfane, med
  ordlyden fra oppdraget.

### Steg 4 — tom tilstand i Læringsinnhold

**Funn: det var fag-filteret, ikke en lastefeil.** Modullista er en statisk
import (`ALL_MODULES` fra `LearningHub.tsx`) — det finnes ingen asynkron
lasting som kan feile, og ingen konsollfeil ble observert.

Rotårsaken er et nøkkelformat-avvik. `MinileksjonsTab` filtrerte seksjoner slik:

```
MODULE_SECTIONS.filter(s => mineFagModuleKeys.has(`${s.subject}-${s.level}`))
```

som gir nøkler av typen `ssr-vg1`, `ssr-vg2`, `ml-vg2`. Men verdiene i settet
kom fra `MINE_FAG_OPTIONS[].moduleKey`, som er `forretningsdrift-vg1`,
`mfi-vg1`, `kultur-vg1`, `okonomi`, `kommunikasjon`, `hms`, `ml1-vg2`, …
Kun `ent-vg2` og `ml-vg3` matchet ved et sammentreff. For alle andre fagvalg —
altså for de aller fleste lærere — ble settet tomt, lista tom og telleren
«0/108 synlige».

Fikset ved å bruke seksjonsnøkler (`${level}|${subject}|${ssrSubject}`) via den
eksisterende `subjectToSectionKey()`, som allerede returnerer nøyaktig dette
formatet. To følgefeil ble ryddet i samme slengen:
- nevneren i telleren var `ALL_MODULES.length` (108) mens telleren var filtrert;
  nå teller begge det samme utvalget.
- seksjonslista filtrerte modulene på `level + subject` uten `ssrSubject`, så
  de tre VG1 SSR-seksjonene viste alle VG1 SSR-modulene hver. Nå matches
  `ssrSubject` også.

Tom tilstand (filtrert til null): listekolonnen viser «Ingen minileksjoner i
\<fagkode\>.» med knappen «Vis alle fag» som nullstiller «Mine fag», og
detaljfeltet viser samme melding i stedet for «← Velg en minileksjon fra listen».
Verifisert med `Mine fag = TVERR-VG1`: «Ingen minileksjoner i TVERR-VG1.», og
«Vis alle fag» tømmer `adventure-teacher-subjects`.

Ingen «Fikk ikke lastet innholdet.»-tilstand er lagt inn, siden det ikke finnes
en lastevei som kan feile — en slik gren ville vært død kode. Se tvilspunkt 1.

Presentasjoner: samme håndtering. Den femdobbelt duplikerte JSX-en er samlet i
`PRESENTASJON_GRUPPER` (samme innhold, samme ruter, samme rekkefølge), hvert
element merket med seksjonsnøkkel, og visningen respekterer nå «Mine fag» med
tilsvarende tom tilstand.

### Steg 5 — temaradene i Spillstyring

- «På»/«Av» i tekst ved siden av hver bryter (både fag-, Espen spør- og
  temabryterne). Farge alene er ikke lenger eneste signal.
- VG1/VG2-chipsene skjules når temaet er AV.
- Nivåvelgeren har tre tilstander når temaet er PÅ: **«Følger klassen»**
  (standard for temaer uten lagret verdi), VG1, VG2. Temaer som allerede har et
  lagret nivå beholder det (`folgerKlassen` mangler → fast nivå).
  Nytt valgfritt felt `folgerKlassen?: boolean` på `TemaAktivering`. Når det er
  satt, holdes `nivaa` automatisk i takt med klasselinja, slik at spillklienten
  kan lese `nivaa` uendret — den trenger ikke kjenne flagget. Verifisert: med
  «Følger klassen» valgt og klasselinja satt til VG2 ble temaets nivå VG2.
  Hvis temaet ikke finnes for klassens nivå, brukes temaets første nivå.
- Panelet er delt i tre seksjoner med overskrift: **«Fag elevene ser»** —
  **«Temaer»** — **«Innholdspakke»**. «Velg fag / bok» (med statuslinje og
  leksjonsliste) ligger under Innholdspakke.

### Steg 6 — live-økt-status

Den grønne pillen kom fra `LiveBar` (`position: fixed; top: 70; right: 20`),
montert globalt i `App.tsx` og derfor også over `/teacher`. `LiveBar` returnerer
nå `null` på `/teacher`; i stedet ligger pillen i tittelraden, på linje med H1 og
høyrejustert. Klikk går til I timen / Live økt. Statusen leses fra RTDB
`sessions/{klassekode}/active` — den gamle `liveSessionActive`-pollingen mot
`localStorage['live-session-active']` er fjernet fordi ingen skrev den nøkkelen;
grønnprikken på Live-fanen var derfor alltid av. Nå virker den.

### Steg 7 — bredde

Maksbredde 1000px på både toppmenyen og innholdskolonnen (var `max-w-4xl`, 896px).
Konkurranser og Spillstyring har ingen egen breddebegrensning og bruker plassen.
Verifisert horisontal overflow = 0px på alle åtte underfaner ved 1440px, og på
Spillstyring / Konkurranser / Læringsinnhold / Live økt ved 1280px.

## Verifisering

- `tsc -b` grønn før hver commit. (`npx tsc --noEmit` ikke brukt.)
- Skjermbilder av alle åtte underfanene i `docs/rapporter/bilder/spor-d/`,
  tatt med headless Chromium mot dev-serveren på `--port 5176 --strictPort`,
  klasse **DTEST** (aldri JXXUEY). Kontrollert mot dem selv.
- Ekstra: `x1-tom-minileksjoner.png` (tom tilstand), `x9-temaer-detalj.png`
  (tre-tilstands nivåvelger + På/Av), `x6-live-pille.png` (pillen i tittelraden).
- Auth-vakta i `/teacher` redirigerer til `/` når `auth.currentUser` er null,
  så den ble midlertidig omgått for skjermbildeøkta og **gjenopprettet etterpå**
  — ingen spor i commit-ene. Omgåelsen påvirket kun redirect, ikke utseendet.
- Playwright er kun diagnostikk; visuell godkjenning er fortsatt din.

## Ting jeg var i tvil om

1. **«Fikk ikke lastet innholdet.»-grenen i steg 4.** Modul- og
   presentasjonslistene er statiske importer, så jeg fant ingen lastevei som kan
   feile. Jeg valgte å ikke legge inn en feiltilstand som aldri kan trigges. Sier
   du fra, legger jeg den inn (f.eks. hvis lista skal hentes fra Firebase senere).
2. ~~**Fag-filter på Presentasjoner.**~~ **RETTET — konklusjonen var feil.**
   Jeg skrev at «det ikke finnes presentasjonsgrupper for ØK/KOM/HMS VG2».
   Det stemmer ikke: de finnes, 26 stykker, i `src/lib/presentationRegistry.ts`.
   Den faktiske årsaken var at Presentasjoner-visningen ikke leste registeret i
   det hele tatt, men en hardkodet inline-liste i `TeacherDashboard.tsx` med bare
   VG1-fagene. Jeg tok den lista for å være hele katalogen, sjekket ikke mot
   registeret, og gjettet feil årsak. Rettet i jobb 1 under.
3. **Hvor «Espen spør» hører hjemme.** Steg 5 nevner tre seksjoner og sier ikke
   hvor Espen spør skal stå. Jeg lot den bli i «Fag elevene ser», siden den
   styres per fag. Den kan flyttes til en egen seksjon hvis du vil.
4. **«Spillet» som live-økt-modus.** `LiveOktTab` har tre moduser:
   Presentasjon / Minileksjon / **Spillet** («Elevene spiller bedriftssimulatoren»).
   Det er en modus, ikke fanen, så jeg lot navnet stå. Endres gjerne hvis det
   forvirrer sammen med «Spillstyring».
5. **`folgerKlassen`-flagget.** Alternativet var å la «Følger klassen» bety
   «ingen lagret rad», men det ville gjort det umulig å ha et aktivt tema som
   følger klassen. Jeg valgte et valgfritt felt og holder `nivaa` synkronisert,
   så spillklienten er uberørt. Ingen Firebase-migrasjon kreves.
6. **Velkomst-tomtilstanden** («Opprett din første klasse») viste seg å avhenge
   av at `teacher-classes` ikke er skrevet ennå. Konteksten oppretter en klasse
   ved mount, så jeg fanger tilstanden *før* det og eksponerer den som
   `ingenKlasserVedStart`. Uten dette ville velkomstboksen aldri vist seg igjen.
7. **Underfanenes egne breddegrenser.** Live økt (720px), Klasser (800px) og
   Nasjonalt leaderboard (760px) har egne `maxWidth` i sine komponenter. Oppdraget
   nevnte bare Konkurranser og Spillstyring, så jeg lot dem stå — de ser nå litt
   smalere ut enn resten. Si fra hvis de også skal fylle 1000px.

---

## Runde 2 — én kilde for presentasjoner, nivåfilter, ryddet klasselinje

### Jobb 1 — Læringsinnhold → Presentasjoner leser nå registeret

Fanen leser `ALL_PRESENTATIONS` og `PRESENTATION_SECTIONS` fra
`src/lib/presentationRegistry.ts` — samme kilde som `LiveOktTab`. Den hardkodede
inline-lista i `TeacherDashboard.tsx` (som runde 1 flyttet inn i
`PRESENTASJON_GRUPPER`) er slettet. Ny komponent `PresentasjonerVisning` gjør
grupperingen etter `PRESENTATION_SECTIONS`' egen rekkefølge og titler, og
«Mine fag» filtrerer via `subjectToSectionKey()` — samme mekanisme som
minileksjonene, ingen egen mapping.

**Antall presentasjoner per seksjon etter kildebyttet** (lest ut av UI-et, ikke
av kildekoden — tallene under er det fanen faktisk viser):

| Seksjon | Antall |
| --- | --- |
| Forretningsdrift — VG1 | 8 |
| Markedsføring og innovasjon — VG1 | 11 |
| Kultur og samhandling — VG1 | 6 |
| Økonomi og administrasjon — VG2 | 10 |
| Kommunikasjon og markedsføring — VG2 | 10 |
| Helse, miljø og sikkerhet — VG2 | 6 |
| Markedsføring og ledelse 1 — VG2 | 16 |
| Entreprenørskap 1 — VG2 | 11 |
| Markedsføring og ledelse 2 — VG3 | 18 |
| Entreprenørskap 2 — VG3 | 12 |
| **Totalt** | **108** |

Registeret inneholder 108 oppføringer, ikke 109. Alle ti seksjoner vises nå;
før viste fanen 25 presentasjoner fordelt på fem VG1-grupper.

Telleren over lista viser filtrert/totalt av registeret: `108/108` uten filter,
`25/108` på VG1, `53/108` på VG2, `30/108` på VG3 (25 + 53 + 30 = 108).

To små konsekvenser av kildebyttet:
- Registeret har ikke noe `desc`-felt, så undertekstene på presentasjonskortene
  («Arbeidsmiljøloven, Forbrukerkjøp, …») er borte. De fantes bare i den
  hardkodede lista og for VG1-fagene. Skal de tilbake, hører de hjemme i
  registeret slik at Live økt får dem også.
- Enkelte titler skiller seg fra de gamle håndskrevne (f.eks. «Roller og
  organisasjon» mot «Ansvarsfordeling, roller og organisasjonskart»). Nå er de
  identiske med det Live økt viser.

Observert i registerdataene, ikke rørt: Entreprenørskap 1 — VG2 har to
oppføringer med samme tittel «Innovatøren og entreprenøren» (ulike ruter).
Registeret er autogenerert, så dette bør fikses i generatoren.

### Jobb 2 — død kode slettet

`grep -rn "presentationsData" src` ga null treff. `src/lib/presentationsData.ts`
er **slettet**.

### Jobb 3 — nivåfilter i Læringsinnhold

Alle · VG1 · VG2 · VG3 ved siden av Minileksjoner/Presentasjoner-bryteren,
standard «Alle». Filtrerer på `level` i både `MODULE_SECTIONS` og
`PRESENTATION_SECTIONS`. Vises kun når «Mine fag» står på «Alle fag»; er et fag
valgt, skjules det og behandles som «Alle» (verifisert: med `SSR-FD` valgt er
nivåbryteren borte fra DOM-en). Rent visningsfilter — ingen skriving til
Firebase, ingen berøring av «Nivå i spillet».

Tom-tilstanden sier nå hvilket filter som tømte lista: «Ingen presentasjoner i
\<fagkode\>.» med «Vis alle fag», eller «Ingen presentasjoner på VG3.» med
«Vis alle nivåer».

Merk: minileksjontelleren («55/55 synlige») betyr fortsatt *synlig for elevene*
av *det filtrerte utvalget* — minileksjoner har en skjul-bryter, det har ikke
presentasjoner. De to tellerne har derfor bevisst ulik betydning.

### Jobb 4 — klasselinja

- «Elevenes nivå» → **«Nivå i spillet»**, med hjelpeteksten «VG2 gir elevene
  ekstra oppgaver i spillet.» både synlig ved siden av bryteren og som tooltip.
- Klasse, Kode og Nivå i spillet står samlet til venstre med tynne skillelinjer
  mellom seg. «Mine fag (bare mitt utvalg)» er skjøvet helt til høyre uten
  skillelinje, siden den ikke beskriver klassen men bare lærerens egen visning.

**Lagringstest (klasse ZJ58D8), resultat:**

| Steg | Nivå |
| --- | --- |
| Utgangspunkt | VG1 |
| Etter klikk på VG2 | VG2 |
| Frisk nettleserøkt (kun lest fra Firebase) | **VG2** |
| Etter tilbakestilling til VG1, frisk økt | **VG1** |

Verdien lagres altså korrekt i `klasser/ZJ58D8/klasseNivaa` og overlever full
sidelasting i begge retninger. Ingen fiks var nødvendig.

### Verifisering runde 2

- `tsc -b` grønn før commit.
- Skjermbilder: `pres-alle.png`, `pres-vg1.png`, `pres-vg2.png` (Alle fag +
  nivåfilter Alle/VG1/VG2) og `klasselinje.png`, i
  `docs/rapporter/bilder/spor-d/`.
- Testet kun mot klasse **ZJ58D8**.
- Auth-vakta ble igjen midlertidig omgått for skjermbildeøkta og gjenopprettet
  etterpå — ikke i noen commit.

---

## Runde 3 — live-navigasjon, diagnose, bredder, Espen spør, ingen auto-klasse

### Jobb 1 — elevens navigasjon låst i live-modus

**Flagget som ble gjenbrukt:** `isStudentLive` fra `useLiveSync()` — nøyaktig
samme flagg som allerede skjuler navigasjonsknappene. Det settes inn i
modulvariabelen `_isLive` (`PresentationShell.tsx:214`, tilsvarende i hver
frittstående presentasjon), som `NavBtn` sjekker på linje 156 for å returnere
`null`. Jeg opprettet ikke noe nytt flagg.

**Håndtereren som ble koblet fra:** `window.addEventListener('keydown', onKey)`
inne i presentasjonene. Den fantes i **57 filer** — 56 frittstående
presentasjoner pluss `_lib/PresentationShell.tsx` — i to nesten like varianter,
alle med `ArrowRight → next()` og `ArrowLeft → prev()`. Alle 57 har fått samme
vakt rett etter modal-sjekkene:

```
if (isStudentLive) {
  if (erNavigasjonstast(e.key)) e.preventDefault()
  else if (e.key === 'Escape') navigate(-1)
  return
}
```

`erNavigasjonstast` kommer fra den nye
`src/screens/learninghub/presentations/_lib/navLock.ts` og dekker
`ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`, `PageDown`, `PageUp`,
`Home`, `End`, `' '`/`Spacebar`. `isStudentLive` er lagt til i effektens
dependency-array i alle 57 filene.

**Escape er bevisst ikke blokkert.** Den er ikke bla-navigasjon: den lukker
term- og PIN-modalen og lar eleven forlate presentasjonen. Å sperre den ville
låst eleven inne i presentasjonen.

**Swipe:** ingen. `grep` på `touchstart`, `touchend`, `onTouchStart`, `swipe` og
`wheel` i hele presentasjonsmappa og `LiveSession.tsx` gir null treff.

**Verifisert** med lærer og elev i samme nettleser på samme port (5176), elev i
egen kontekst (inkognito-ekvivalent):

| | |
| --- | --- |
| Elev, slide ved start | 1 / 12 |
| Elev, etter ArrowRight ×2, PageDown, mellomrom, End, ArrowLeft | **1 / 12 — låst** |
| Elev, navigasjonsknapper i DOM | 0 |
| Lærer på storskjerm (`?live-code=`), etter ArrowRight ×2 | 1 / 12 → **3 / 12** |

### Jobb 2 — diagnose: hengende slides (ingen kode endret)

Samme testkjøring reproduserte feilen: **læreren sto på 3 / 12 mens eleven
stoppet på 2 / 12.** Én av to overganger ble aldri skrevet.

Filnavn og linjenummer under gjelder `_lib/PresentationShell.tsx`; de 56
frittstående presentasjonene har identisk kode (i `ReglerLovverkPresentation.tsx`
ligger den på linje 110–111 og 376–388).

**Hvor læreren skriver** — `PresentationShell.tsx:216–222`, en `useEffect` med
`[current, teacherLiveCode]`. Den skriver `currentSlide: current + 1` med
`fbUpdate` til `sessions/{kode}`. Altså på hver endring av `current`, ikke på
en eksplisitt «neste»-hendelse.

**Hvor eleven abonnerer** — `useLiveSync.ts:32–69`, en løpende `onValue`-lytter
(ikke engangslesing) på `sessions/{classCode}`. Verdien mates inn i
`PresentationShell.tsx:213`, som speiler den inn i lokal `current`.

**Fire mekanismer som gjør at overganger forsvinner:**

1. **`_lastWritten` er en modulvariabel** (`PresentationShell.tsx:153`), ikke
   per komponent eller per økt. Vakten `if (current + 1 === _lastWritten) return`
   (`:219`) hopper derfor over skrivingen hvis verdien tilfeldigvis er lik noe
   som ble skrevet av en *tidligere* presentasjon eller en tidligere montering i
   samme fane. Åpner læreren en presentasjon på nytt, står `current` på 0 og
   første skriving (`1`) blir stille droppet hvis `_lastWritten` allerede er 1.
   `_isLive` (`:152`) har samme modul-problem, men rammer bare knappesynlighet.

2. **`fromFirebaseRef`-vakten er ikke knyttet til en verdi** —
   `PresentationShell.tsx:212–218`. *Hver* innkommende `liveSlide` setter flagget
   til `true`, og skrive-effekten nullstiller det ved neste kjøring uansett hvilken
   slide den gjelder. Kommer ekkoet av lærerens egen skriving inn etter at
   `current` allerede har flyttet seg videre, spiser ekkoet flagget, og skrivingen
   for den *nye* sliden droppes. Dette er en ren kappløpssituasjon: utfallet
   avhenger av om ekkoet rekker fram før neste tastetrykk. Nøyaktig hvilken
   overgang som forsvinner varierer derfor fra gang til gang — det er dette som
   gir «noen slides henger, andre kommer opp».

3. **Elevens første snapshot undertrykkes** — `useLiveSync.ts:47–53`. En elev som
   kobler seg på midt i en presentasjon får `liveSlide: null` og blir stående på
   slide 0 til læreren blar neste gang. For eleven ser det ut som at presentasjonen
   henger.

4. **Lokal state konkurrerer med Firebase** — `PresentationShell.tsx:203–205`.
   `current` er egen `useState(0)` med en mount-reset (`useEffect(() => setCurrent(0), [])`)
   som kan kjøre etter at en `liveSlide` alt er mottatt. Sammen med feil A (eleven
   kunne bla selv) kunne eleven i tillegg havne på en helt annen slide enn læreren,
   uten å bli hentet inn igjen før neste lærerskriving.

**Anbefalt fiks** (ikke utført):
- Fjern begge modulvariablene. `_lastWritten` bør være en `useRef` i komponenten,
  og `_isLive` bør sendes som prop til `NavBtn`.
- Bytt ut ekko-undertrykkingen med en verdisammenligning: ta vare på sist
  *mottatte* slide i en ref og hopp bare over skrivingen når `current + 1` er lik
  den. Da spiller rekkefølgen ingen rolle.
- La eleven adoptere gjeldende slide ved påkobling i stedet for å undertrykke
  første snapshot. Skal en fersk økt starte på 0, bør det avgjøres av et
  `startetAt`-felt i økta, ikke av «første snapshot».
- For eleven: utled `current` direkte fra `liveSlide` (`current = liveSlide ?? 0`)
  i stedet for å speile den inn i lokal state. Da finnes det ingen konkurrerende
  kilde.

Rekkefølge: punkt 2 er den som faktisk gir ujevnheten og bør tas først.

### Jobb 3 — slide-antall 15 mot 14

**Det har ikke gått tapt innhold på grunn av slettingen, og forskjellen ligger
ikke i koden.**

`ReglerLovverkPresentation.tsx` er byte-identisk med `origin/main`
(`git diff origin/main...HEAD` viser kun sletting av `presentationsData.ts`).
Slideantallet i UI-et er `TOTAL_SLIDES_WITH_TEACHER = ORIGINAL_SLIDES (9) +
QUIZ_SLIDES (5) + teacherSlides.length`. **14 er kodens grunntall.** Det femtende
lysbildet er et lærer-lagt lysbilde som ligger i `localStorage` under
`teacherSlides:<rute>` (`src/types/TeacherSlide.ts:24`) — altså per nettleserprofil.
Main-vinduet ditt har ett slikt lysbilde lagret; testprofilen har ingen.
Live-modus legger ikke til noen venteslide.

`presentationsData.ts` kan ikke ha påvirket noe: ingen fil importerte den, og den
inneholdt et parallelt, forenklet tekstdatasett (24 IDer × 6 slides) som aldri ble
rendret. 23 av de 24 IDene finnes i `presentationRegistry.ts`.

**Men jeg fant en ekte mangel, som jeg ikke har fikset:**
`presentasjonen «klaghandtering»` (Klagehåndtering og konfliktforebygging)
mangler i `presentationRegistry.ts`. Den har både rute
(`App.tsx:518`) og komponent (`KlagehåndteringPresentation.tsx`), og ligger i
elevenes LearningHub — men ikke i registeret. Kryss-sjekk: **109 ruter under
`/learning/presentations/` i `App.tsx`, 108 oppføringer i registeret, nøyaktig
ett avvik.** Konsekvensen er at presentasjonen ikke lar seg velge i Live økt
(har alltid lest registeret) og ikke vises i Læringsinnhold etter runde 2.
Registeret er autogenerert, så hullet bør tettes i generatoren — ikke for hånd.
Dette er også forklaringen på «109 presentasjoner» i oppdraget mot 108 i registeret.

### Jobb 4 — bredder

Live økt 720 → 1000, Klasser 800 → 1000, Nasjonalt leaderboard 760 → 1000.
Horisontal overflow målt til **0 px på alle åtte underfaner ved 1280 px**
vindusbredde.

### Jobb 5 — «Espen spør» ut av fag-lista

Flyttet ut av seksjonen «Fag elevene ser» og fått egen seksjon med skillelinje
over, mellom fag-bryterne og «Temaer». Hjelpeteksten er beholdt ordrett, og
funksjonen — `espenSpor/aktiv` og `espenSpor/fag/{fag}` i RTDB, med fag-chips som
bare dukker opp når den er på — er uendret.

### Jobb 6 — ingen automatisk klasse

`loadClasses()` opprettet før en «Klasse 1» med generert kode når lista var tom.
Nå returnerer den tom liste. Legacy-migreringen er beholdt: har læreren den gamle
enkeltnøkkelen `teacher-classroom-code` uten klasseliste, er det en reell klasse.

**Test A — fersk lærer, tom lagring:**

| Sjekk | Resultat |
| --- | --- |
| `teacher-classes` etter lasting | `null` — ingen klasse opprettet |
| `teacher-classroom-code` etter lasting | `null` |
| Klasselinja | «Ingen klasse valgt» + «Opprett klasse»; kode- og nivåfelt skjult |
| Velkomst-tomtilstand | vises |
| Live økt / Spørsmål / Spillstyring / Nasjonalt leaderboard | «Opprett en klasse for å bruke denne fanen.» med knapp — ingen krasj, ingen konsollfeil |

**Test A, fortsettelse — opprett klasse manuelt:** knappen i klasselinja går til
Klassen → Klasser, som åpner «Ny klasse»-skjemaet direkte (ingen «Avbryt» når det
ikke finnes klasser fra før). Etter lagring står klassen i `teacher-classes` med
egen kode, `teacher-classroom-code` peker på den, og Live økt viser normalt
innhold igjen.

**Test B — lærer som allerede har klasser:** ingen velkomstboks, klassekoden vises
i klasselinja, alle faner som før. Ingen konsollfeil.

### Verifisering runde 3

- `tsc -b` grønn før hver commit.
- Nye skjermbilder i `docs/rapporter/bilder/spor-d/`:
  `klasselinje-uten-klasse.png`, `uten-klasse-live.png`, `spillstyring-espen.png`.
- Live-økt testet i én nettleser på port 5176, lærer i én kontekst og elev i en
  egen — aldri på tvers av porter.
- Testet kun mot klasse **ZJ58D8**.
- Auth-vakta midlertidig omgått for testøkta og gjenopprettet etterpå.

---

## Runde 4 — standardprøver

### Jobb 4 — tallkontroll (avviket, avklart før generering)

Kontrollen slo ut, men **ikke** av grunnen oppdraget forutså. Grupperingen er
nøyaktig som antatt: hvert fag har 2 varianter à 15 spørsmål, uten unntak.
Avviket er at konkurransene har **12 fag-grupper, ikke 10**. De to ekstra er
`tverrfaglig_vg1` og `tverrfaglig_vg2`, som i `src/lib/teacherSubjects.ts` er
merket «ikke et reelt fag — brukes for grupperinger på tvers av SSR-fagene».
12 × 30 = 360, som stemmer med totalen i konkurransefila.

Espen valgte **10 prøver** — tverrfaglig VG1/VG2 droppes. De 60 tverrfaglige
spørsmålene ligger fortsatt i Konkurranser-fanen.

**Resultat etter generering:**

| Prøve | ID | Spørsmål | Fordeling |
| --- | --- | --- | --- |
| Forretningsdrift VG1 | `std-exam-ssr-fd` | 30 | 10 lett / 10 middels / 10 vanskelig |
| Markedsføring og innovasjon VG1 | `std-exam-ssr-mi` | 30 | 10 / 10 / 10 |
| Kultur og samhandling VG1 | `std-exam-ssr-ks` | 30 | 10 / 10 / 10 |
| Økonomi og administrasjon VG2 | `std-exam-ok-vg2` | 30 | 10 / 10 / 10 |
| Kommunikasjon og markedsføring VG2 | `std-exam-kom-vg2` | 30 | 10 / 10 / 10 |
| HMS VG2 | `std-exam-hms-vg2` | 30 | 10 / 10 / 10 |
| Markedsføring og ledelse 1 | `std-exam-ml1` | 30 | 10 / 10 / 10 |
| Markedsføring og ledelse 2 | `std-exam-ml2` | 30 | 10 / 10 / 10 |
| Entreprenørskap 1 | `std-exam-ent1` | 30 | 10 / 10 / 10 |
| Entreprenørskap 2 | `std-exam-ent2` | 30 | 10 / 10 / 10 |
| **Sum** | **10 prøver** | **300** | |

Kontrollert mot kilden: samme 300 spørsmål-IDer inn som ut, ingen duplikater,
og alle 78 forklaringene for disse ti fagene er med. (Kilden har 93 forklaringer
totalt; de resterende 15 hører til de tverrfaglige.)

### Jobb 1 — generatoren

`scripts/build-standard-exams.mjs`, samme mønster som
`scripts/parse-standard-competitions.mjs`: build-time-skript, «IKKE ENDRE
MANUELT»-header i utdata, verifisering til slutt med `process.exit(1)` hvis en
prøve ikke har 30 spørsmål eller antallet prøver avviker.

Skriptet leser `src/data/standardCompetitions.ts` som tekst i stedet for å dra
inn en TS-loader i byggsteget — fila er autogenerert med fast formatering, så
det er trygt, og parseren feiler høylytt hvis `NOW` mangler.

Detaljer som forespurt: én prøve per fag av de to variantene, sortert
lett → middels → vanskelig med intern rekkefølge bevart (`Array.sort` er stabil
i Node), `std-exam-`-prefiks på både `id` og `code`, tittel uten «Variant A/B»,
45 minutter, +1 for riktig, −0,5 for galt, `timeSeconds` droppet,
`explanation` beholdt.

### Felt lagt til i `src/types/Exam.ts`

Ingen parallell type — `Exam` og `ExamQuestion` er utvidet:

| Hva | Hvor | Hvorfor |
| --- | --- | --- |
| `explanation?: string` | `ExamQuestion` | fasitforklaringen fra konkurransene |
| `difficulty?: 'lett' \| 'middels' \| 'vanskelig'` | `ExamQuestion` | styrer rekkefølgen, og gjør den synlig for senere sortering |
| `StandardExam` | ny type | en MAL: har `code` og `subject`, men verken `classCode`, `status` eller `examCode` — de hører til lærerens kopi |
| `DEFAULT_GRADE_THRESHOLDS` | ny konstant | samme verdier som ExamBuilder bruker (90/75/60/45/30) |
| `examFromStandard()` | ny hjelpefunksjon | lager kopien, med ny ID og fersk `createdAt` |

`StandardExam` er bevisst ikke en `Exam`. En mal uten klasse ville måttet ha
`classCode: ''`, og da kunne den ved et uhell blitt lagret som en ekte prøve.

**Merk:** `explanation` brukes **ikke** i ExamResults i dag — `grep -rn
"explanation" src/screens/exam/` gir null treff. Feltet følger med i dataene og
er klart til bruk, men noen må rendre det. Jeg la det ikke inn, siden det ikke
var en del av oppdraget.

### Jobb 2 — standardprøvene i Prøver-fanen

Ny seksjon «Standardprøver» øverst, over «Mine prøver» (som har fått egen
overskrift). Ti rader med tittel, fag-badge, antall spørsmål og varighet.
«Mine fag» filtrerer via `subjectToSectionKey()` — samme logikk som
minileksjoner og presentasjoner. Verifisert: med «Alle fag» vises 10; med
`SSR-FD + ML1` vises 2, og det er de riktige to.

«Bruk denne» lager en kopi med `examFromStandard()`, lagrer den i
`adventure-exams`, og hopper til den i «Mine prøver» — raden får grønn ramme,
merket «Kopiert fra standardprøve» og `scrollIntoView`. Verifisert på en kopi
av Forretningsdrift VG1:

| Felt | Verdi |
| --- | --- |
| ID | `y1qt6xq4` — ny, ikke `std-exam-*` |
| Spørsmål | 30, med forklaringene i behold |
| Klassekode | `ZJ58D8` (aktiv klasse) |
| Status | `draft` — læreren kan redigere før tildeling |
| Tid / poeng | 45 min, +1 / −0,5 |
| Standardprøvelista etterpå | fortsatt 10 rader, uendret |

### Jobb 3 — Builder trekker fra fag-tagget bank

`CompetitionBuilder.tsx` bruker nå `bankForFag(subject)`, som henter spørsmål
fra `STANDARD_COMPETITIONS` filtrert på faget læreren har valgt. Advarselen
«Spørsmålsbanken er ikke fag-tagget ennå» er slettet og erstattet av en nøytral
hjelpetekst som bare vises før et fag er valgt. Hele banken byttet — ikke bare
tilfeldig-trekket — fordi avkrysningslista, «Velg 15 tilfeldige» og lagringen
må se samme spørsmål for å henge sammen. Skifter læreren fag, nullstilles
utvalget, siden de valgte spørsmålene ikke lenger finnes i banken.

Verifisert: 360 spørsmål uten fag valgt, 30 med SSR-FD valgt, «Velg 15
tilfeldige» gir 15/15 avkrysset, og fagbytte til ML1 gir 30 spørsmål og 0 valgt.
Ingen konsollfeil.

`ExamBuilder.tsx` har **ingen** tilsvarende tilfeldig-trekking — den bygger
spørsmål manuelt og importerer ingen spørsmålsbank. Ingenting å endre der.

### Er `questions.json` ubrukt?

**Ja — og den var det allerede før denne jobben.** `grep -rn "questions.json"`
over `src/`, `scripts/` og `tests/` gir null treff. Fila (57 spørsmål) er ikke
importert noe sted.

Banken Builder faktisk brukte, var `QUESTION_BANK` i `src/types/Competition.ts`
— 30 hardkodede spørsmål uten fag-felt. Den er nå ubrukt i UI-et; kun typen
`CompetitionQuestion` importeres derfra. Begge kan slettes, men jeg lot dem stå
som instruert. Merk at `QUESTION_BANK` er eksportert fra en delt typefil, så en
sletting bør sjekkes mot Firebase-lagrede konkurranser som kan referere
`q1`–`q30`-IDene.

### Verifisering runde 4

- `tsc -b` grønn før commit. Generatoren kjører grønn: `10 standardprøver,
  300 spørsmål totalt`.
- Skjermbilder i `docs/rapporter/bilder/spor-d/`: `prover-standard.png`,
  `prover-kopiert.png`, `builder-fagbank.png`.
- Testet mot klasse **ZJ58D8**.
- `standardCompetitions.ts` og `.manus/quiz-konkurranser.md` er ikke rørt.
