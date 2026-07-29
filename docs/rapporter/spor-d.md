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

---

## Runde 5 — synkronisering av prøver

### RTDB-nøkkelstruktur

Samme navnekonvensjon som `/competitions/{code}/…` i `firebaseCompetitions.ts`:

```
/exams/{examCode}/
  definition               — Exam (kun publiserte prøver; utkast blir liggende lokalt)
  progress/{elevId}        — { studentName, startedAt, answeredCount,
                               totalQuestions, status, examVersion }
  submissions/{elevId}     — ExamSubmission (+ manualScores fra læreren)
```

`elevId` er `sanitizeKey(navn)` — samme deterministiske nøkkel som `playerId()`
bruker i konkurransene, så én elev får én entry og en ny innlevering overskriver
den forrige i stedet for å hope seg opp.

**Personvern:** `progress` inneholder bare *antall* besvarte spørsmål. Svarene
skrives ikke før eleven leverer, og da til `submissions`. Læreren ser altså
fremdrift uten å kunne lese svar underveis.

**Migrering:** utkast (`status: 'draft'`) skrives aldri til RTDB, så gamle prøver
i `adventure-exams` blir liggende som før. Publiserer læreren en av dem, skrives
den til RTDB da — `publishExam()` er idempotent.

### Jobb 1 — stopp-punktet

**Bestått.** Lærer og elev i samme nettleser på port 5176, elev i egen kontekst
(inkognito-ekvivalent):

| Steg | Resultat |
| --- | --- |
| Lærer publiserer kopi av standardprøve | kode `EXAM-CECW`, status `active`, versjon 1 |
| Elev åpner `/exam/EXAM-CECW` | finner «Forretningsdrift VG1» |
| Elev svarer på 3 spørsmål | «3 av 30 besvart» |
| **Lærer, uten å laste siden på nytt** | «Pågår nå (1 elev) — Kari Testelev, startet 19:15, 3 av 30 besvart, Pågår» |
| Elev leverer | kvittering «Prøven er levert!» |
| **Lærer, uten å laste siden på nytt** | «1 innlevering», 1 rad i resultattabellen |

Ingen konsollfeil i noen av vinduene.

En feil jeg gjorde først, verdt å nevne: testskriptet mitt nullstilte
`adventure-exams` ved *hver* navigasjon, så lærerens resultatside fant ingen
prøve. Det var testen, ikke koden.

### Jobb 2 — versjonering av en publisert prøve som redigeres

Løsningen bygger på at **eleven henter definisjonen én gang** med
`fetchExamByCode()` når økta åpnes, og holder den i komponent-state resten av
prøven. Det finnes bevisst *ingen* `subscribeToExamDefinition` på elevsiden.
Dermed kan ikke en lærerendring bytte prøven under føttene på noen som er i gang
— de har allerede sin kopi i minnet.

`publishExam()` teller opp `version` ved hver skriving, og `registerExamStart()`
lagrer `examVersion` på elevens progress-node, slik at læreren kan se hvilken
versjon hver elev svarte på.

Verifisert:

| Steg | Resultat |
| --- | --- |
| Publisert prøve | versjon 1, 30 spørsmål, kode `EXAM-PNHS` |
| Elev A starter | «0 av 30 besvart» |
| Lærer tar ut 5 spørsmål og lagrer | versjon 2, 25 spørsmål, **samme kode**, status fortsatt `active` |
| Elev A etter endringen | fortsatt 30 spørsmål — **uendret** |
| Elev B starter etterpå | ser 25 spørsmål — **den nye versjonen** |

En publisert prøve kan ikke falle tilbake til utkast ved redigering:
«Lagre som utkast» skjules, og knappen heter «Lagre og publiser endringene».

Ruten `/exam/build/:examId` er lagt til ved siden av `/exam/build`. Uten
`examId` oppfører byggeren seg nøyaktig som før. Hver rad i «Mine prøver» har
fått «Rediger».

### Jobb 3 — spørsmålsvelger med vekting

Høyre kolonne i byggeren viser nå alle spørsmålene med avkrysning, poengfelt,
vanskegrad og fasit. Ikke-avkryssede gråes ut (`opacity: 0.45`) men blir
liggende, så læreren kan angre. Filter på vanskegrad og søk på spørsmålstekst.

Verifisert på en 30-spørsmåls standardprøve: «Prøven (30 av 30 med), Maks poeng:
30» → ta ut ett → «29 av 30, Maks poeng: 29» → hake på igjen → «30 av 30,
Maks poeng: 30». Poeng 1 → 4 på ett spørsmål ga «Maks poeng: 33». Filter
«Vanskelig» ga 10 rader, søk «mva» ga 4.

Poengreglene for prøven som helhet (+1 / −0,5) ligger fortsatt øverst i steg 1.
Per-spørsmål-poeng overstyrer, slik `getMaxPoints()` allerede regnet det.

### Jobb 4 — kortsvar og langsvar

**Byggeren hadde allerede veien til begge.** Oppdraget sier at «byggeren har
ingen vei til dem», men `questionTab` med `'flervalg' | 'aapent' | 'case'` og
komplette skjemaer for begge har ligget der hele tiden. Jeg bygde dem derfor
ikke på nytt. Det jeg gjorde:

- fanene fikk overskriften «+ Legg til oppgave» og ordlyden fra oppdraget:
  Flervalg · Kortsvar · Langsvar/case (het «Åpent spørsmål» og «Case»).
- verifiserte hele veien fra bygger til manuell retting.

Verifisert med en prøve som har alle tre typene (`multiple_choice, open, case`),
maks 11 poeng: eleven besvarte 3 av 3, og rettevisningen viste **2 manuelle
poengfelt** — ett for kortsvaret og ett for case-delspørsmålet. Poengsummen gikk
fra `-0.5 / 11` til `3.5 / 11` da læreren ga 4 poeng, og verdien var der
fortsatt etter full sidelasting (lest tilbake fra RTDB, ikke lokal state).

Ingen forslagsbank med ferdige oppgaver er laget, og ingen oppgavetekster er
skrevet.

### Jobb 5 — «Pågår nå»

Seksjonen over resultatlista abonnerer på `subscribeToExamProgress`. Én rad per
elev som har startet, med navn, starttidspunkt, «7 av 30 besvart» og status i
TEKST: «Pågår», «Levert», «Tiden ute». Uten publisering eller uten elever:
«Ingen elever har startet ennå.» Har alle levert, forsvinner seksjonen helt.

Verifisert med to elever samtidig: «Pågår nå (2 elever) — Kari Nordmann, startet
19:29, 7 av 30 besvart, Pågår / Ola Hansen, startet 19:29, 3 av 30 besvart,
Pågår».

### Antall RTDB-skrivinger per elev på en 30-spørsmåls prøve

| Hendelse | Skrivinger |
| --- | --- |
| `registerExamStart` ved oppstart | 1 |
| `updateExamProgress` — én per spørsmål som går fra ubesvart til besvart | 30 |
| `submitExamAnswers` ved innlevering | 1 |
| `markExamProgressDone` ved innlevering | 1 |
| **Sum** | **33** |

Ingen timer, ingen intervall. Fremdriften skrives i en `useEffect` som
sammenligner mot forrige rapporterte tall og hopper over når det er uendret —
å skrive mer i et tekstsvar gir altså ingen ny skriving. Eneste vei til flere
enn 33 er om en elev tømmer et svar og fyller det inn igjen; da går tellingen
ned og opp, med én skriving hver vei.

### Jobb 6 — publiser og slett

Hver utkast-rad har «Publiser», som gjenbruker samme vei som byggeren: genererer
kode med `generateExamCode()`, setter status `active`, skriver til localStorage
og til RTDB. Koden vises i rada etterpå.

Hver rad har «Slett» med bekreftelsesdialog. Dialogen abonnerer på
innleveringene, så teksten er riktig i hvert tilfelle: utkast får «Utkastet
slettes for godt», en publisert prøve uten innleveringer får «Elever som har
koden mister tilgangen», og en publisert prøve med innleveringer får en tydelig
advarsel om at *alle elevresultatene forsvinner*. Sletting fjerner både den
lokale raden og hele `/exams/{kode}` i RTDB.

### Verifisering runde 5

- `tsc -b` grønn før hver commit.
- All testing i én nettleser på port 5176, lærer i én kontekst og elev i en egen.
  Aldri på tvers av porter.
- Testet mot klasse **ZJ58D8**.
- Skjermbilder i `docs/rapporter/bilder/spor-d/`: `bygger-vekting.png`,
  `bygger-kortsvar.png`, `pagar-na.png`, `resultater-etter.png`,
  `manuell-retting.png`.
- Auth-vakta midlertidig omgått for testøkta og gjenopprettet etterpå.

---

## Runde 6 — klaghandtering-hullet, fikset i generatoren

### Årsaken

Generatoren som header-kommentaren pekte på, `/tmp/gen_pres_registry.py`, fantes
ikke lenger — verken på disk eller i git-historikken. Den ble skrevet til `/tmp`
og aldri sjekket inn, så den var borte i det øyeblikket maskinen ryddet `/tmp`.

Selve årsaken lot seg likevel fastslå. Av de 109 presentasjonsrutene er
`klaghandtering` den **eneste** med et ikke-ASCII tegn i komponent- og filnavnet:

```
import KlagehåndteringPresentation from './screens/learninghub/presentations/KlagehåndteringPresentation'
<Route path="/learning/presentations/klaghandtering" element={<KlagehåndteringPresentation />} />
```

Alle de andre 108 er ren ASCII. Generatoren koblet rute til presentasjonsfil via
komponentnavnet — det er slik `title` ble hentet fra `presentationName` i fila —
og det er nøyaktig den koblingen som brøt på `å`-en. Om det var et
`[A-Za-z]`-basert regex eller en filnavn-utledning som feilet, kan jeg ikke slå
fast uten skriptet, men feilklassen er entydig: **ruter med ikke-ASCII i
komponent- eller filnavnet ble ikke koblet til fila si, og ble stille hoppet
over.** 109 ruter inn, 108 oppføringer ut, uten et eneste varsel.

### Fiksen

Ny generator: `scripts/build-presentation-registry.mjs` — sjekket inn denne
gangen, ikke i `/tmp`. To ting er endret bevisst:

1. **Rute → fil slås opp via import-setningen i App.tsx**, ikke ved å utlede
   filnavnet fra komponentnavnet. Da spiller det ingen rolle hvilke tegn navnet
   inneholder. Regexen som fanger komponentnavnet er `[^\s/>]+` — den stopper på
   mellomrom, `/` og `>`, ikke på bokstaver.
2. **Skriptet feiler høylytt.** Mangler en rute import, fil, `presentationName`
   eller klassifisering, skrives registeret ikke i det hele tatt, og skriptet
   avslutter med kode 1 og lister hva som mangler. Det var den stille
   overhoppingen som gjorde at hullet fikk ligge.

Verifisert med en påtatt rute `tullerute-æøå`:

```
❌ 2 rute(r) kunne ikke behandles:
  - tullerute-æøå: fant ingen import for komponenten <TulleÆøåPresentation>
  - tullerute-æøå: mangler klassifisering — legg den inn i SSR_KLASSIFISERING
Registeret er IKKE skrevet. Ingen ruter droppes stille.
```

Klassifiseringen (nivå/fag/ssr-fag) kan ikke utledes av rutestien — VG1-blokka
og VG2-blokka i App.tsx blander fag om hverandre — så SSR-rutene ligger i en
eksplisitt tabell i skriptet. ML- og ENT-rutene klassifiseres av en regel på
første ledd i stien (`ml1/` → vg2|ml, `ml2/` → vg3|ml, osv.). Titlene hentes
fortsatt fra `presentationName` i presentasjonsfila; det er kontrollert at
regelen reproduserer **alle 108 eksisterende titler eksakt**, uten et eneste
avvik.

### Resultat

`node scripts/build-presentation-registry.mjs` → **109 ruter inn, 109
oppføringer ut.** Diffen mot det gamle registeret inneholder nøyaktig to
endringer i `ALL_PRESENTATIONS`:

- `klaghandtering` lagt til: «Klagehåndtering», vg1 | ssr | kultur.
- `forbrukeratferd` flyttet — linja er identisk, men lå utenfor sin egen
  faggruppe i det gamle registeret. Ingen konsument bryr seg om rekkefølgen i
  arrayet (både Læringsinnhold og Live økt grupperer selv på seksjon), så
  flyttingen er ufarlig.

Nivået `vg1 | ssr | kultur` er ikke gjettet: det er det samme som `ModuleCard`-en
for ruta har i `LearningHub.tsx`, og det samme som den gamle hardkodede
lærerlista grupperte den under.

Kontrollert i appen: Læringsinnhold → Presentasjoner viser nå **109/109
synlige**, og med «Mine fag = SSR-KS» står Klagehåndtering på rett alfabetisk
plass i Kultur og samhandling-gruppa (7 av 109). Live økt finner den også ved
søk. Skjermbilde: `klaghandtering.png`.

### Står andre ruter i fare for samme feil?

**Ingen i dag**, og feilen kan ikke gjenta seg stille.

- Ikke-ASCII i komponent- eller filnavn: `KlagehåndteringPresentation` er
  fortsatt den eneste. Alle 108 andre er ren ASCII.
- Alle 109 ruter har `path` og `element` på samme linje, ingen bruker et
  wrapper-element (f.eks. `<ErrorBoundary>`), og alle komponentene importeres
  fra `./screens/learninghub/presentations/`. Regexene i den nye generatoren
  dekker altså hele bestanden.

Restrisikoen ligger i mønstre generatoren ennå ikke kjenner: en rute som deles
over flere linjer, et element pakket i en wrapper, eller en presentasjon som
importeres fra en annen mappe. Alle tre gir nå **exit 1** i stedet for en stille
mangel, så de blir oppdaget ved første kjøring i stedet for måneder senere. En
ny presentasjon med æ/ø/å i navnet går derimot rett gjennom — det er nettopp det
som er fikset.

Én ting til er verdt å merke seg: generatoren kjøres manuelt og er ikke koblet
til noe byggesteg. Blir en rute lagt til uten at noen kjører skriptet, henger
registeret etter igjen — bare uten å miste noe stille. En sjekk i CI som kjører
generatoren og feiler hvis `git diff` ikke er tom, ville lukket det hullet helt.

---

## Runde 7 — synk-sjekk på registeret, og status for de andre genererte filene

### Sjekken

`scripts/build-presentation-registry.mjs` har fått en `--check`-modus. Den
genererer registeret **til minne**, sammenligner med fila på disk og avslutter
med kode 1 hvis de avviker. Den skriver aldri noe i denne modusen.

Sammenligningen går på generert innhold, ikke på `git diff`. En diff-basert
sjekk ville slått ut på urelaterte lokale endringer og på et skittent
arbeidstre — den ville vært ubrukelig midt i en arbeidsøkt.

Koblet til `prebuild` i `package.json`, én linje:

```json
"prebuild": "node scripts/build-presentation-registry.mjs --check",
```

`npm` kjører `prebuild` automatisk før `build`, så feilen treffer lokalt ved
`npm run build`, ikke først i CI.

Feilmeldingen sier hva som må gjøres, og hvilke ruter det gjelder:

```
presentationRegistry.ts er ikke i synk med rutene i App.tsx.
Kjør: node scripts/build-presentation-registry.mjs

  Mangler i fila (1): ml1/paatatt-kapittel
```

Den lister «Mangler i fila» og «Ligger i fila uten rute» hver for seg, og sier
fra hvis rutene er de samme men innholdet avviker (tittel, nivå, fag eller
rekkefølge).

### Verifisering

| Steg | Resultat |
| --- | --- |
| `npm run build` som det står | **grønn** — «✓ presentationRegistry.ts er i synk med 109 ruter i App.tsx», deretter vellykket vite-build |
| Påtatt rute `paatatt-rute` (uten klassifisering) | **exit 1** — «mangler klassifisering — legg den inn i SSR_KLASSIFISERING». Vite kjørte ikke |
| Påtatt rute `ml1/paatatt-kapittel` (klassifiseres av regel, mangler i registeret) | **exit 1** med den spesifiserte meldingen over |
| Registeret etter begge feilkjøringene | **urørt** — `git diff` tom, ingenting skrevet i `--check` |
| `npm run build` etter at ruta ble fjernet | **grønn igjen** |

De to påtatte rutene treffer hver sin vakt: den første klassifiseringsvakta
(ruta lar seg ikke plassere), den andre synk-vakta (ruta er grei, men registeret
henger etter). Begge stopper bygget.

### Punkt 4 — de andre auto-genererte filene

`grep -rl "IKKE ENDRE MANUELT" src` gir tre treff. **Ingen av dem har
klaghandtering-bomben** — alle tre generatorene finnes og er sjekket inn, og
ingen peker på `/tmp`:

| Fil | Generator | Sjekket inn? | Inndata | Idempotent? |
| --- | --- | --- | --- | --- |
| `src/lib/presentationRegistry.ts` | `scripts/build-presentation-registry.mjs` | ja | `src/App.tsx` + presentasjonsfilene | ja |
| `src/data/standardExams.ts` | `scripts/build-standard-exams.mjs` | ja | `src/data/standardCompetitions.ts` | ja |
| `src/data/standardCompetitions.ts` | `scripts/parse-standard-competitions.mjs` | ja | `.manus/quiz-konkurranser.md` — **sporet i git** | **nei** |

Jeg kjørte alle tre og sammenlignet mot fila før kjøringen (og gjenopprettet
etterpå). To av tre gir identisk output. Det ene funnet:

**`parse-standard-competitions.mjs` er ikke deterministisk.** Linje 184
stempler `const NOW = '${new Date().toISOString()}'` på hver kjøring, så fila
endrer seg hver gang selv om innholdet ellers er likt — én linje inn, én ut.
Konsekvensen er at den **ikke kan få en `--check`-vakt slik den står**: sjekken
ville feilet ved hver eneste `npm run build`. Fiksen er liten — les det
eksisterende `NOW` fra fila og behold det, slik `build-standard-exams.mjs`
allerede gjør (linje 53) — men den ligger utenfor denne jobben, som avtalt.

Verdt å merke seg at `standardExams.ts` arver tidsstempelet fra
`standardCompetitions.ts` i stedet for å lage sitt eget. Det er nettopp derfor
den er idempotent, og hvorfor den kunne fått en `--check`-vakt uten videre.

To ting som ikke er dekket av noen vakt i dag:

- `standardExams.ts` og `standardCompetitions.ts` har ingen synk-sjekk. Endres
  `.manus/quiz-konkurranser.md` uten at parseren kjøres, oppdager ingenting det.
  `standardExams.ts` kan få `--check` med det samme mønsteret som registeret;
  `standardCompetitions.ts` må gjøres deterministisk først.
- Vakta på registeret dekker bare `npm run build`. `npm run dev` og
  `tsc -b` går fortsatt gjennom med et register som henger etter.

---

## Runde 8 — deterministisk parser og synk-vakt på alle tre

### 1. `parse-standard-competitions.mjs` er nå deterministisk

Tidsstempelet leses fra `standardCompetitions.ts` hvis fila finnes, og settes
bare ved førstegangsgenerering:

```js
function lesEllerLagTidsstempel() {
  if (existsSync(OUT)) {
    const m = readFileSync(OUT, 'utf-8').match(/const NOW = '([^']+)'/)
    if (m) return m[1]
  }
  return new Date().toISOString()
}
```

Samme mønster som `build-standard-exams.mjs` allerede brukte.

**Verifisert:** to kjøringer på rad gir **byte-identiske** filer (`cmp` uten
avvik), og resultatet er også identisk med den som allerede lå i git — ingen
utilsiktet endring av innholdet.

### 2. `--check` på begge, koblet til `prebuild`

Begge har fått samme mønster som registergeneratoren: generer til minne,
sammenlign med disk, skriv aldri noe, exit 1 ved avvik. Feilmeldingene navngir
sin egen fil og sitt eget skript:

```
standardExams.ts er ikke i synk med standardCompetitions.ts.
Kjør: node scripts/build-standard-exams.mjs
```

```
standardCompetitions.ts er ikke i synk med .manus/quiz-konkurranser.md.
Kjør: node scripts/parse-standard-competitions.mjs
```

Begge lister «Mangler i fila» og «Ligger i fila uten kilde» hver for seg, og
sier fra hvis nøklene er de samme men innholdet avviker.

I begge skriptene er valideringen (quizer med ≠15 spørsmål, prøver med ≠30)
flyttet **før** skrive-/sjekkegrenen, slik at et ødelagt datagrunnlag stopper
kjøringen uansett modus. I parseren fjernet jeg samtidig en `process.exit(0)`
som lå i advarselsgrenen og som ville hoppet over skrivingen helt.

`prebuild` kjører alle tre i avhengighetsrekkefølge:

```json
"prebuild": "node scripts/parse-standard-competitions.mjs --check && node scripts/build-standard-exams.mjs --check && node scripts/build-presentation-registry.mjs --check",
```

Kilden først, så det som er avledet av den. `&&` gjør at den første feilen
stopper resten — du fikser rota før du ser følgefeilene.

### 3. Ingen sjekk i `dev` eller `tsc -b`

`"dev": "vite"` og `"build": "tsc -b && vite build"` er urørt. Vaktene henger
kun på `prebuild`.

### Verifisering

| Steg | Resultat |
| --- | --- |
| `parse-standard-competitions.mjs` kjørt to ganger | byte-identisk output ✓ |
| `npm run build` som det står | **exit 0** — alle tre ✓, deretter vellykket vite-build |
| `timeMinutes: 45` → `46` i `standardExams.ts` (ett tegn) | **exit 1**, «standardExams.ts er ikke i synk med standardCompetitions.ts. Kjør: node scripts/build-standard-exams.mjs — Samme prøver, men innholdet avviker» |
| Registersjekken i samme kjøring | kjørte ikke — `&&` kortsluttet på første feil, som tiltenkt |
| Etter `git checkout src/data/standardExams.ts` | byte-identisk med utgangspunktet, `npm run build` **exit 0** igjen |
| Genererte filer etter alle feilkjøringene | urørt — `git status` tom for `src/data/` og `src/lib/` |

En felle verdt å nevne: første forsøk på å måle exit-koden ga falsk rødt fordi
`npm run build | head -14` brøt pipen og drepte npm. Målingene over er gjort med
output til fil.

---

## Runde 9 — live-synk fikset i roten

### Hva som erstattet `fromFirebaseRef`

Det boolske flagget er borte. Det som står der nå er tre ting, og ingen av dem
kan settes av innkommende data:

**1. Eleven har ingen slide-tilstand i det hele tatt.** `current` utledes:

```ts
const current = isStudentLive ? (liveSlide ?? 0) : lokalSlide
```

Det er ingenting å forsone. Firebase er eneste sannhet for hva eleven ser, og
`gaaTil()` returnerer tidlig for elever, så det finnes ingen vei til lokal
avdrift. Mekanisme 4 i diagnosen — «lokal state konkurrerer med Firebase» — er
dermed ikke løst, men fjernet: konkurrenten finnes ikke lenger.

**2. Læreren skriver ubetinget, i selve navigasjonshandlingen.** Skrivingen lå
før i en `useEffect` på `[current]`, altså et sted der innkommende data kunne
rekke å sette et flagg først. Nå skjer den i `gaaTil()`, som er eneste vei til
en ny slide:

```ts
const gaaTil = useCallback((mal: number) => {
  if (isStudentLive) return
  const n = Math.max(0, Math.min(mal, TOTAL_SLIDES_WITH_TEACHER - 1))
  harNavigert.current = true
  naaRef.current = n
  setLokalSlide(n)
  skrivSlide(n)
}, [...])
```

`naaRef` speiler lærerens slide synkront, så et raskt trykk nummer to regner ut
neste slide fra riktig utgangspunkt uten å vente på en render. Ingen debounce,
ingen throttle, ingen timer.

**3. Læreren adopterer remote på VERDI, én gang.** Storskjermen skal kunne
gjenoppta en pågående økt, så første ikke-null `liveSlide` anvendes — men bare
hvis læreren ikke allerede har navigert. Etter det er læreren skriveren, og et
forsinket ekko av hennes egen skriving kan ikke flytte henne bakover.

`_lastWritten` er gått fra modulvariabel til `useRef` (`sistSkrevet`), så den
nullstilles ved remount. Den brukes utelukkende til å hoppe over en skriving som
er identisk med den forrige — aldri til å gate navigasjon. `_isLive`, den andre
modulvariabelen, er samtidig blitt en `skjult`-prop på `NavBtn`.

I `useLiveSync.ts` er undertrykkingen av elevens første snapshot fjernet
(mekanisme 3). Økta er bare `active` mens den faktisk pågår, så det finnes ingen
gammel `currentSlide` å bli kapret av — og en elev som logger seg på midt i økta
lander nå der læreren står.

Tastaturvakta fra runde 3 er urørt (`git diff` viser null treff på
`erNavigasjonstast`), og de 56 frittstående presentasjonsfilene er ikke rørt.

### Verifisering — lærer og elev i samme nettleser, port 5176

Kjørt mot `ent1/behov-marked-segmentering` (14 slides), som bruker
`PresentationShell`. Se forbeholdet under.

**A) Læreren blar rolig 1 → 8.** BESTÅTT. Eleven fulgte hvert eneste steg:
2→2, 3→3, 4→4, 5→5, 6→6, 7→7, 8→8.

**B) Læreren blar RASKT 1 → 12 uten pause.** BESTÅTT. 11 tastetrykk uten
opphold: lærer 12/14, elev 12/14, `currentSlide` i RTDB = 12. Dette er testen
som avdekket feilen i runde 3; da endte læreren på 3 og eleven på 2.

**C) Læreren står på 7, ny elev logger seg på.** BESTÅTT. Eleven landet på
7/14, ikke 0.

**D) Læreren går bakover 7 → 4.** BESTÅTT. Eleven fulgte: 6→6, 5→5, 4→4.

**E) Eleven laster siden på nytt midt i økta.** BESTÅTT. Læreren sto på 4/14,
eleven kom tilbake på 4/14.

Ingen konsollfeil i noen av vinduene. Kontrollert i samme slengen at eleven
fortsatt er låst: fem navigasjonstrykk (ArrowRight ×2, PageDown, mellomrom, End)
flyttet ingenting, og nav-knappene er ikke i DOM-en.

### Forbehold: fiksen dekker 53 av 109 presentasjoner

Første testrunde så ut som om fiksen ikke virket i det hele tatt — helt til
sporingen jeg la inn ikke ga et eneste utslag. Årsaken:
**`beredskapsplaner`, presentasjonen runde 3 testet med, er en av de 56
frittstående filene og bruker ikke `PresentationShell`.** Koden min kjørte
aldri der.

Oppdraget sa eksplisitt at de 56 ikke skulle røres, så det står slik. Men det
betyr at feilen lever videre i dem. Kontrollmåling på `beredskapsplaner` etter
fiksen: læreren står på 7/12 mens RTDB har `currentSlide` 6 — den droppede
skrivingen er der fortsatt.

Én ting bedret seg likevel for alle 109: `useLiveSync.ts` er delt, så en elev som
logger seg på midt i økta lander nå på lærerens sist skrevne slide i stedet for
å bli stående på slide 1. I målingen over landet eleven på 6/12 — lærerens siste
vellykkede skriving, ikke 1.

For å få A, B og D riktige i de frittstående filene må den samme endringen inn
der. De har identisk kode, så det er et mekanisk sveip på linje med
tastaturvakta i runde 3 — men det er en egen jobb.
