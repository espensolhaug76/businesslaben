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
2. **Fag-filter på Presentasjoner.** Oppdraget sier «samme håndtering for
   Presentasjoner-visningen», men fanen hadde ikke noe fag-filter i det hele
   tatt — uten filter kunne tomtilstanden aldri oppstå. Jeg la derfor «Mine
   fag»-filteret på presentasjonene også. Konsekvens: en lærer som bare har valgt
   VG2-fagene (ØK/KOM/HMS) ser ingen presentasjoner, fordi det ikke finnes
   presentasjonsgrupper for dem — men får «Vis alle fag» som utvei. Si fra hvis
   presentasjonene heller skal vise alt uansett.
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
