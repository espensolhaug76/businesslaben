/**
 * /om — marketing-landingsside for Businesslaben.
 *
 * Tilgjengelig uten innlogging. Bruker kun Tailwind (ingen tema-avhengig
 * styling). Mockups er definert lokalt som funksjons-komponenter.
 */
import { Link } from 'react-router-dom'

// ── Mockup-komponenter ──────────────────────────────────────────────────────

function LiveQuizMockup() {
  const opts = [
    { label: 'A', text: 'Bosted', pct: 12 },
    { label: 'B', text: 'Livsstil', pct: 67, correct: true },
    { label: 'C', text: 'Alder', pct: 15 },
    { label: 'D', text: 'Inntekt', pct: 6 },
  ]
  return (
    <div className="relative">
      <div className="rounded-2xl bg-slate-900 text-slate-100 p-5 shadow-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-slate-300 font-medium">Live · Klasse 2A · Markedsføring</span>
          </span>
          <span className="text-xs text-slate-400">22 av 24 svart</span>
        </div>
        <div className="bg-slate-800/70 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 mb-2">Spørsmål 4 av 10</p>
          <p className="text-base font-semibold leading-snug text-white">
            Hvilken segmenteringsvariabel er psykografisk?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {opts.map(o => (
            <div
              key={o.label}
              className={`px-3 py-3 rounded-lg border ${o.correct ? 'border-teal-500 bg-teal-500/10' : 'border-slate-700 bg-slate-800/50'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-slate-400">{o.label}</span>
                <span className={`text-sm font-medium ${o.correct ? 'text-teal-200' : 'text-slate-200'}`}>{o.text}</span>
              </div>
              <div className="h-1 rounded bg-slate-700 overflow-hidden">
                <div
                  className={`h-1 ${o.correct ? 'bg-teal-400' : 'bg-slate-500'}`}
                  style={{ width: `${o.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-teal-500/10 border-l-2 border-teal-400 px-3 py-2 rounded-r-lg">
          <p className="text-xs leading-relaxed text-teal-100">
            <span className="font-semibold text-teal-300">Forklaring:</span> Psykografiske variabler handler om personlighet, verdier og hvordan folk lever livene sine.
          </p>
        </div>
      </div>
      <div className="absolute -bottom-3 -right-3 bg-white rounded-lg shadow-lg border border-slate-200 px-3 py-1.5 text-xs hidden sm:block">
        <p className="text-slate-500 text-[10px]">Lærerens skjerm</p>
        <p className="font-semibold text-slate-800">Sanntidsoppdatering</p>
      </div>
    </div>
  )
}

function ModuleMockup() {
  const fases = [
    { n: 1, title: 'Hva er kalkulasjon?', done: true },
    { n: 2, title: 'Selvkost vs. bidragsmetoden', done: true },
    { n: 8, title: 'Avanse vs. dekningsgrad', active: true },
    { n: 9, title: 'Hotelleksempel: Yield management' },
    { n: 10, title: 'Prøv selv: Lag en prisstrategi' },
  ]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700">Modul 8 av 28</p>
        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">+15 XP</span>
      </div>
      <p className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Pris og kalkulasjon</p>
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Fremgang</span>
          <span className="font-semibold text-slate-700">7 / 10 faser</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-2 rounded-full bg-teal-500" style={{ width: '70%' }} />
        </div>
      </div>
      <div className="space-y-1.5 mb-4">
        {fases.map(f => (
          <div
            key={String(f.n)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              f.active ? 'border border-teal-400 bg-teal-50' :
              f.done ? 'bg-emerald-50/60' : 'bg-slate-50'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
              f.done ? 'bg-emerald-500 text-white' :
              f.active ? 'bg-teal-600 text-white font-semibold' :
              'bg-slate-200 text-slate-500'
            }`}>
              {f.done ? '✓' : f.n}
            </span>
            <span className={`text-sm flex-1 ${f.done ? 'text-emerald-800' : f.active ? 'text-teal-900 font-semibold' : 'text-slate-700'}`}>{f.title}</span>
            {f.active && <span className="text-[10px] font-bold text-teal-700">Aktiv</span>}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
        <div className="flex items-center gap-2">
          <span className="text-base">🏅</span>
          <div>
            <p className="text-xs font-semibold text-amber-900">3 av 5 mestre</p>
            <p className="text-[10px] text-amber-700">Fortsett for å låse opp neste</p>
          </div>
        </div>
        <span className="text-xs font-semibold bg-teal-600 text-white px-3 py-1.5 rounded-md">Fortsett →</span>
      </div>
    </div>
  )
}

function ExamCaseMockup() {
  const sidebar = [
    { n: '7', title: 'Case: Bærekraft som strategi', active: true },
    { n: '✓', title: 'Hva betyr posisjonering?', done: true },
    { n: '✓', title: 'USP-definisjonen', done: true },
    { n: '8', title: 'Forklar AIDA-modellen' },
    { n: '9', title: 'Velg riktig segmenteringsvariabel' },
  ]
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
      <div className="bg-slate-900 text-slate-100 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span>🔒</span>
          <span className="font-semibold">Prøve: Markedsføring og innovasjon</span>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <span className="text-slate-300">Tid igjen: <span className="font-mono text-teal-400 font-bold">38:24</span></span>
          <span className="text-slate-300">Besvart: <span className="font-bold text-teal-400">7 av 12</span></span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
        <div className="bg-slate-50 border-r border-slate-200 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Spørsmål</p>
          <div className="space-y-1">
            {sidebar.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                  s.active ? 'bg-teal-100 text-teal-900 font-semibold' :
                  s.done ? 'text-emerald-700' : 'text-slate-600'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                  s.active ? 'bg-teal-600 text-white' :
                  s.done ? 'bg-emerald-500 text-white' :
                  'bg-slate-200 text-slate-500'
                }`}>{s.n}</span>
                <span className="truncate">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
            <span className="font-bold text-teal-700 uppercase tracking-wide">Case</span>
            <span className="text-slate-500">Spørsmål 7 · 4 poeng</span>
            <span className="text-teal-600 font-medium">Anti-juks aktiv</span>
          </div>
          <p className="font-bold text-slate-900 mb-3">Bærekraft som strategi</p>
          <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r p-3 mb-4 text-xs text-slate-700 leading-relaxed">
            En lokal kafé i Trondheim ønsker å posisjonere seg som «byens mest bærekraftige». De vurderer å bytte til økologiske bønner (40% dyrere) og bare bruke gjenbruksbeger (10% høyere kostnad). Eieren er bekymret for at prisen blir for høy.
          </div>
          <div className="space-y-3 mb-3">
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1">a) Hvilke målgrupper kan denne strategien tiltrekke? (1 poeng)</p>
              <div className="bg-slate-50 rounded px-3 py-2 text-xs italic text-slate-400 border border-slate-200">
                Miljøbevisste forbrukere, særlig studenter og unge voksne i Trondheim som verdsetter etisk forbruk…
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1">b) Hvordan kan kaféen forsvare en høyere pris? (2 poeng)</p>
              <div className="bg-white rounded px-3 py-2 text-xs text-slate-400 border-2 border-teal-400">
                Kursoren blinker her |
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1">c) Hva er den største risikoen ved denne posisjoneringen? (1 poeng)</p>
              <div className="bg-slate-50 rounded px-3 py-2 text-xs text-slate-400 border border-slate-200">
                Skriv svaret ditt her…
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">← Forrige spørsmål</span>
            <span className="text-xs font-semibold bg-teal-600 text-white px-4 py-2 rounded">Lagre og gå videre →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeaderboardMockup() {
  const rows = [
    { rank: 1, school: 'Bergen Handelsgymnas',     klasse: 'Klasse 3MK', date: 'gjennomført 14. april', students: 28, score: 14.2, pct: 94.7 },
    { rank: 2, school: 'Sandefjord vgs',           klasse: 'Klasse 2B',  date: 'gjennomført 9. april',  students: 24, score: 13.8, pct: 92.0 },
    { rank: 3, school: 'Trondheim Katedralskole',  klasse: 'Klasse 2A',  date: 'gjennomført 22. april', students: 26, score: 13.4, pct: 89.3 },
    { rank: 4, school: 'Kongsvinger vgs',          klasse: 'Klasse 2A',  date: 'gjennomført i dag',     students: 22, score: 13.1, pct: 87.3, mine: true },
    { rank: 5, school: 'Stavanger Katedralskole',  klasse: 'Klasse 3SS', date: 'gjennomført 18. april', students: 19, score: 12.9, pct: 86.0 },
  ]
  const medals = ['🥇', '🥈', '🥉']
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
      <div className="bg-slate-900 text-white p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-bold flex items-center gap-2">
            <span>🏆</span> Nasjonalt lederbord
          </p>
          <span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded">Live</span>
        </div>
        <p className="text-xs text-slate-400 mb-3">Markedsføring og innovasjon · April 2026</p>
        <div className="flex flex-wrap gap-1.5">
          {['Mitt fag', 'Alle fag', 'Denne måneden', 'Hele året'].map((f, i) => (
            <span
              key={f}
              className={`text-[11px] px-2.5 py-1 rounded-full border ${i === 0 ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="space-y-1.5">
          {rows.map(r => (
            <div
              key={r.rank}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${r.mine ? 'border border-teal-300 bg-teal-50' : 'border border-slate-100 bg-slate-50/50'}`}
            >
              <span className="text-base w-6 text-center">{medals[r.rank - 1] ?? r.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span className="truncate">{r.klasse} · {r.school}</span>
                  {r.mine && <span className="text-[9px] font-bold tracking-wider bg-teal-600 text-white px-1.5 py-0.5 rounded">DIN KLASSE</span>}
                </p>
                <p className="text-[10px] text-slate-500">{r.students} elever · {r.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-slate-900">{r.score} <span className="text-[10px] text-slate-400 font-normal">/ 15</span></p>
                <p className="text-[10px] text-slate-500">{r.pct}%</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3 text-[10px] text-slate-500">
          + 47 andre klasser · <span className="text-teal-600 font-semibold">Se hele listen</span>
        </div>
        <div className="border-t border-slate-100 mt-3 pt-2 text-center text-[10px] text-slate-500">
          🔒 Kun aggregerte snitt deles. Ingen individuelle elevdata forlater klasserommet.
        </div>
      </div>
    </div>
  )
}

function AdventureMockup() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/60 border border-white/20 backdrop-blur p-8 h-full flex flex-col items-center justify-center text-center min-h-[300px] relative">
      <div className="text-6xl mb-3">🏙️</div>
      <p className="text-base font-semibold text-white/95 mb-1">Konseptbilder kommer</p>
      <p className="text-xs text-white/60">Hayday-inspirert grafikk · Supercell-kvalitet som ambisjon</p>
      <div className="absolute bottom-4 right-4 text-xs bg-white text-slate-800 px-3 py-1.5 rounded-md font-semibold shadow">Sneak peek →</div>
    </div>
  )
}

// ── Hovedside ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 antialiased scroll-smooth" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/om" className="flex items-center gap-2 font-bold text-slate-900 tracking-tight">
            <span className="w-7 h-7 rounded-md bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center text-xs font-bold">B</span>
            Businesslaben
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-slate-600">
            <a href="#funksjoner" className="hover:text-slate-900 transition-colors">Funksjoner</a>
            <a href="#provemodus" className="hover:text-slate-900 transition-colors">Prøvemodus</a>
            <a href="#fag" className="hover:text-slate-900 transition-colors">Fagdekning</a>
            <a href="#adventure" className="hover:text-slate-900 transition-colors">AdVenture</a>
            <a href="#kontakt" className="hover:text-slate-900 transition-colors">Pilot</a>
          </div>
          <a
            href="mailto:espen@businesslaben.no?subject=Be%20om%20tilgang%20til%20pilot"
            className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Be om tilgang
          </a>
        </div>
      </nav>

      {/* Hero med subtilt grid-bakgrunn */}
      <section className="relative px-6 pt-20 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0f766e 1px, transparent 1px), linear-gradient(to bottom, #0f766e 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            Lærerdrevet · Pilot åpen for høsten 2026
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Ett verktøy for{' '}
            <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
              hele
            </span>{' '}
            det merkantile programfaget.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-10">
            Læringsmoduler, live klasseromsøkter, ferdige konkurranser, prøvemodus med AI-vern — og fra 2026 en bedriftssimulator. Alt i én sammenhengende plattform. Bygget av en lærer, for lærere.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-3 mb-14">
            <a
              href="mailto:espen@businesslaben.no?subject=Be%20om%20pilot-tilgang"
              className="bg-teal-700 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-teal-800 transition-colors shadow-sm"
            >
              Be om pilot-tilgang
            </a>
            <a
              href="#funksjoner"
              className="px-7 py-3.5 rounded-lg font-semibold text-slate-700 border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition-colors"
            >
              Se hva som er inkludert
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl pt-8 border-t border-slate-100">
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">43+</p>
              <p className="text-sm text-slate-500 mt-1">Læringsmoduler</p>
            </div>
            <div>
              <p className="text-3xl">🏆</p>
              <p className="text-sm text-slate-500 mt-1">Nasjonalt lederbord</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">360</p>
              <p className="text-sm text-slate-500 mt-1">Quiz-spørsmål</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">10</p>
              <p className="text-sm text-slate-500 mt-1">Programfag dekket</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Løsning */}
      <section id="hvorfor" className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">Problemet</p>
            <h2 className="text-3xl font-bold tracking-tight mb-5">Lærerens hverdag er fragmentert.</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Ett system for presentasjoner. Et annet for quiz. Et tredje for klasseromsdialog. Et fjerde for prøver. Og siden ChatGPT kom, må man tenke nytt om hvordan man måler hva elevene faktisk har lært.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Resultatet: den gode pedagogikken — den som binder fag sammen og lar elevene bruke kunnskapen i praksis — drukner i logistikk og bekymring for juks.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">Løsningen</p>
            <h2 className="text-3xl font-bold tracking-tight mb-5">Én plattform. Hele faget.</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Businesslaben er bygget rundt læreplanen — ikke rundt teknologien. Hver modul, hver konkurranse, hver presentasjon er knyttet direkte til kompetansemål i SSR02-01, ML1/2 eller ENT1/2.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Du logger inn én gang. Elevene blir med på klasserommet med en firesifret kode. Resten skjer der det skal — i dialogen mellom dere.
            </p>
          </div>
        </div>
      </section>

      {/* Live klasseromsøkt */}
      <section id="funksjoner" className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">Live klasseromsøkt</p>
          <h2 className="text-4xl font-bold tracking-tight mb-5 leading-tight">
            Presentasjon med innebygd quiz — som skaper engasjement i undervisningen.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Du styrer presentasjonen fra din PC. Elevene følger med på sine egne enheter. Når du kommer til en quiz, pauses sesjonen automatisk: alle elevene svarer samtidig, og resultatet vises på storskjerm før dere går videre.
          </p>
          <ul className="space-y-3 text-slate-700">
            {[
              'Klassekode-isolering — ingen utenforstående kan kople seg på',
              'Pause når som helst, gå tilbake, hopp fram',
              'Quiz-resultater i sanntid — se hvor mange som svarer riktig før du forklarer',
              'Pedagogiske forklaringer på hvert spørsmål — automatisk vist etterpå',
            ].map(t => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 text-teal-600 flex-shrink-0">✓</span>
                <span className="leading-relaxed text-sm">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <LiveQuizMockup />
      </section>

      {/* Læringsmoduler */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14 items-center">
          <ModuleMockup />
          <div>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">Læringsmoduler</p>
            <h2 className="text-4xl font-bold tracking-tight mb-5 leading-tight">
              Eleven lærer i sitt eget tempo — med motivasjonen bygget inn.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              43+ moduler strukturert etter kompetansemålene. Hver modul deler stoffet inn i 10 faser med teori, eksempler og øvelser. Eleven får poeng for fullførte faser, mestringsmerker for gjennomførte moduler, og kan se sin egen progresjon over tid.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Lærer beholder oversikten gjennom dashboardet — hvem har kommet hvor langt, hvem har sluttet å jobbe, hvem trenger en samtale.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '📘', title: 'Teori',   desc: 'Korte, leselige bolker' },
                { icon: '✏️', title: 'Øvelser', desc: '30-40 per modul' },
                { icon: '🏆', title: 'Mestre',  desc: 'Synlig progresjon' },
              ].map(c => (
                <div key={c.title} className="bg-white border border-slate-100 rounded-xl p-3">
                  <div className="text-xl mb-1">{c.icon}</div>
                  <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                  <p className="text-[11px] text-slate-500 leading-snug">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prøvemodus */}
      <section id="provemodus" className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-semibold mb-5">
            🛡️ AI-bevisst vurdering
          </span>
          <h2 className="text-4xl font-bold tracking-tight mb-5 leading-tight">
            Prøvemodus som faktisk måler hva eleven kan.
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            ChatGPT-revolusjonen har gjort hjemmeoppgaver vanskelige å vurdere. Businesslabens prøvemodus gir deg trygghet: kontrollerte forhold, varierte oppgavetyper, og automatisk oppdagelse av juks-forsøk.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            {
              icon: '🔒',
              title: 'Låst skjerm',
              desc: 'Eleven kan ikke kopiere, lime inn, høyreklikke eller bruke utviklerverktøy under prøven. Fane-bytte logges med tidsstempel.',
              tag: 'Aktiv under hele prøven',
            },
            {
              icon: '🧩',
              title: 'Tre oppgavetyper',
              desc: 'Flervalg for begrepskontroll. Kortsvar for refleksjon. Caser for anvendelse. AI klarer flervalg, men sliter når man kombinerer alle tre i én vurderingssituasjon.',
              tag: 'Bygget inn fra start',
            },
            {
              icon: '⚡',
              title: 'Rettes automatisk',
              desc: 'Flervalg rettes umiddelbart med konfigurerbar feilstraff. Kortsvar og case markeres «venter på retting» — du gir karakter manuelt med kriteriene foran deg.',
              tag: 'Sparer timer på retting',
            },
          ].map(c => (
            <div key={c.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="text-2xl mb-3">{c.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{c.desc}</p>
              <p className="text-xs font-semibold text-teal-700">{c.tag}</p>
            </div>
          ))}
        </div>
        <ExamCaseMockup />
        <p className="text-center text-xs text-slate-500 mt-4 max-w-2xl mx-auto">
          Eksempel på en case-oppgave i prøvemodus. Eleven kan ikke kopiere fra eksterne kilder, og fane-bytter logges automatisk for læreren.
        </p>
      </section>

      {/* Konkurranse mot skoler */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-5 gap-14 items-center">
          <div className="lg:col-span-2">
            <span className="inline-block bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              🏆 NYTT · Cross-school
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
              Konkurrer mot klasser i hele Norge.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Klassen din kjører en konkurranse på 15 spørsmål — og snittet havner på et nasjonalt lederbord. Hvor ligger 2A på markedsføring? Hvilken skole topper HMS-tabellen denne måneden?
            </p>
            <p className="text-lg text-slate-700 font-medium mb-6">
              Plutselig blir læring noe man heier på.
            </p>
            <ul className="space-y-3 text-slate-700">
              {[
                { bold: '24 ferdige konkurranser, 360 spørsmål', rest: ' — start med ett klikk' },
                { bold: 'Aldri elevnavn',                          rest: ' — kun klassenavn og skole på lederbordet' },
                { bold: 'Opt-in deling',                           rest: ' — du velger om resultatet skal deles' },
                { bold: 'Filter per fag',                          rest: ', per måned, per landsdel' },
              ].map(item => (
                <li key={item.bold} className="flex items-start gap-3">
                  <span className="mt-1 text-teal-600 flex-shrink-0">✓</span>
                  <span className="leading-relaxed text-sm">
                    <strong>{item.bold}</strong>{item.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <LeaderboardMockup />
          </div>
        </div>
      </section>

      {/* Mer som er klart */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">Mer som er klart</p>
        <h2 className="text-4xl font-bold tracking-tight mb-12">Det du trenger fra første time.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '📊',
              title: 'Lærerdashboard',
              desc: 'Se klassene dine, kjør live-økter, opprett konkurranser og prøver, og følg med på resultater — alt på én skjerm. Hver klasse er knyttet til ett fag, så det er aldri tvil om hva som vises for hvem.',
              bullets: [
                'Flere klasser per bruker',
                'Filter på mitt fag',
                'Bygget i samråd med praktiserende lærere',
              ],
            },
            {
              icon: '📚',
              title: '43+ læringsmoduler',
              desc: 'Ferdig pedagogisk innhold strukturert etter kompetansemålene. Hver modul kombinerer teori, norske eksempler, refleksjonsoppgaver og innebygde øvelser. Klare til bruk eller som utgangspunkt for egne tilpasninger.',
              bullets: [
                'Hele SSR02-01 (ny læreplan 2026)',
                'Markedsføring og ledelse 1 og 2',
                'Entreprenørskap og bedriftsutvikling 1 og 2',
              ],
            },
            {
              icon: '🎯',
              title: 'Lærerstyrte presentasjoner',
              desc: '26 ferdige presentasjoner med rene visuelle layout og innebygde quizer. Du presenterer fra din PC; elevene følger med fra sine. Quizer pauser sesjonen, samler svar og viser forklaringen.',
              bullets: [
                'Sanntids-synkronisering',
                'Klikkbare fagbegreper med definisjoner',
                'Stilrent design som tåler å vises på storskjerm',
              ],
            },
          ].map(f => (
            <div key={f.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">{f.desc}</p>
              <ul className="space-y-1.5 text-sm text-slate-500">
                {f.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Slik fungerer det — dark section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-teal-400 uppercase font-semibold text-xs tracking-wider mb-3">Slik fungerer det</p>
          <h2 className="text-4xl font-bold tracking-tight mb-14">Tre steg fra pålogging til klasserom.</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                n: '01',
                title: 'Opprett klasse',
                desc: 'Logg inn med epost. Lag en klasse, koble den til ett fag (f.eks. Markedsføring og ledelse 1), og du får en firesifret klassekode.',
              },
              {
                n: '02',
                title: 'Del koden med elevene',
                desc: 'Elevene går til samme nettside, taster inn klassekoden og fornavnet sitt. Ingen kontoopprettelse. Ingen passord. Ingen epost.',
              },
              {
                n: '03',
                title: 'Start økten',
                desc: 'Velg en presentasjon, konkurranse eller prøve. Klikk start. Det elevene ser, styres av deg. Sanntids — ingen lag, ingen forsinkelser.',
              },
            ].map(s => (
              <div key={s.n}>
                <div className="text-teal-400 text-5xl font-bold mb-4">{s.n}</div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fagdekning */}
      <section id="fag" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-3">Fagdekning</p>
        <h2 className="text-4xl font-bold tracking-tight mb-3">Bygget for læreplanen — ny og gammel.</h2>
        <p className="text-slate-600 mb-12 max-w-2xl">
          Ny SSR02-01 trer i kraft 1. august 2026. Businesslaben er allerede tilpasset.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              label: 'YRKESFAG · VG1',
              title: 'Salg, service og reiseliv',
              fag: ['Forretningsdrift', 'Markedsføring og innovasjon', 'Kultur og samhandling'],
            },
            {
              label: 'YRKESFAG · VG2 · SSR02-01',
              title: 'Salg, service og reiseliv',
              fag: ['Økonomi og administrasjon', 'Kommunikasjon og markedsføring', 'Helse, miljø og sikkerhet'],
            },
            {
              label: 'STUDIESPES · VG2/VG3',
              title: 'Programfag',
              fag: ['Markedsføring og ledelse 1 og 2', 'Entreprenørskap og bedriftsutvikling 1 og 2', 'Tverrfaglig ledelse VG1/VG2'],
            },
          ].map(c => (
            <div key={c.label} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <p className="text-[10px] font-semibold text-teal-700 uppercase tracking-wider mb-2">{c.label}</p>
              <h3 className="font-bold text-lg tracking-tight mb-4">{c.title}</h3>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {c.fag.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* AdVenture sneak peek */}
      <section id="adventure" className="bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(45,212,191,0.6) 0%, transparent 50%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-100 px-3 py-1 rounded-full text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Under utvikling · Lansering 2026
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
              AdVenture — bedriftssimulatoren.
            </h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Elevene starter sin egen bedrift i en fiktiv by inspirert av Kongsvinger. De velger strategi, setter pris, ansetter folk, lanserer produkter og navigerer 4P-rammeverket — mens læreren styrer dagens fokustema fra dashboardet.
            </p>
            <p className="text-white/90 leading-relaxed mb-8">
              Konkurs er en gyldig læringserfaring. Profitt er ikke det eneste målet. Spillet handler om å forstå hvorfor — ikke bare hva.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Isometrisk by', '8 startstrategier', '32 hendelser', 'Business Model Canvas', 'Lærerstyrt tema-fokus'].map(tag => (
                <span key={tag} className="bg-white/10 border border-white/20 text-sm rounded-full px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <AdventureMockup />
        </div>
      </section>

      {/* Hvorfor / About — ny vinkling: motivasjon og engasjement */}
      <section id="om" className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wider text-center mb-3">Hvorfor</p>
        <h2 className="text-4xl font-bold tracking-tight text-center mb-12 leading-tight">
          Bygget for motivasjon. Designet for engasjement.
        </h2>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8">
          <p className="text-slate-700 leading-relaxed mb-4">
            Plattformen finnes fordi pedagogikken trenger ett felles sted å skje. Når læreren slipper å hoppe mellom seks ulike systemer i samme dobbelttime, frigjøres tid til det som faktisk driver læring: gode forklaringer, riktig spørsmål til riktig tid, og samtaler som tar utgangspunkt i hvor eleven faktisk er.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Engasjementet vokser ikke av seg selv — det dyrkes fram. Live-quizer som skaper trykk i klasserommet. Konkurranser som gjør at elevene begynner å pugge på fritiden. Læringsmoduler som måler progresjon synlig nok til at de selv heier på den. Teknologien skal være usynlig. Det elevene skal merke, er at faget plutselig er noe man har lyst til å være god i.
          </p>
          <div className="border-t border-slate-200 mt-6 pt-5 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-bold text-sm">ES</div>
            <div>
              <p className="font-semibold text-slate-900">Espen Solhaug</p>
              <p className="text-xs text-slate-500">Lærer · Initiativtaker · Pilot-ansvarlig</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — bli med i piloten */}
      <section id="kontakt" className="bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Bli med i piloten for skoleåret 2026/27.
          </h2>
          <p className="text-white/85 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            Vi tar inn et begrenset antall lærere og klasser i pilotfasen. Tilgang er gratis. Til gjengjeld håper vi på løpende tilbakemelding underveis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="mailto:espen@businesslaben.no?subject=Be%20om%20pilot-tilgang"
              className="bg-white text-teal-700 px-7 py-3.5 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-sm"
            >
              Send en epost
            </a>
            <Link
              to="/teacher"
              className="border border-white/40 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Prøv plattformen direkte
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-left text-sm">
            <div className="bg-teal-800/40 rounded-lg p-4">
              <div className="font-semibold mb-1">For hvem</div>
              <div className="text-teal-100 text-xs">Lærere i SSR, ML eller ENT på videregående</div>
            </div>
            <div className="bg-teal-800/40 rounded-lg p-4">
              <div className="font-semibold mb-1">Pris</div>
              <div className="text-teal-100 text-xs">Gratis under pilot. Skoleavtaler fra høsten 2027.</div>
            </div>
            <div className="bg-teal-800/40 rounded-lg p-4">
              <div className="font-semibold mb-1">Personvern</div>
              <div className="text-teal-100 text-xs">GDPR-respekterende. Ingen elevnavn deles på tvers.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-xs">B</div>
            <span>Businesslaben · 2026</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#funksjoner" className="hover:text-teal-700">Funksjoner</a>
            <a href="#provemodus" className="hover:text-teal-700">Prøvemodus</a>
            <a href="#fag" className="hover:text-teal-700">Fag</a>
            <a href="#adventure" className="hover:text-teal-700">AdVenture</a>
            <a href="#kontakt" className="hover:text-teal-700">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
