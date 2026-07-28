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
