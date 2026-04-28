/**
 * /om — marketing-landingsside for Businesslaben.
 *
 * Tilgjengelig uten innlogging. Bruker kun Tailwind (ingen tema-avhengig
 * styling) — dette er en lett å lese «one-pager» for lærere som vurderer
 * piloten. Mockups er definert lokalt i samme fil som funksjons-komponenter.
 */
import { Link } from 'react-router-dom'

// ── Mockup-komponenter (vises på siden som visuelt bevis) ────────────────────

function LiveQuizMockup() {
  const opts = [
    { label: 'A', color: 'bg-teal-600',    text: 'Markedsføringsmiks',       count: 18 },
    { label: 'B', color: 'bg-orange-500',  text: 'Forretningsmodell',        count: 24, correct: true },
    { label: 'C', color: 'bg-purple-600',  text: 'Salgsstrategi',            count: 7 },
    { label: 'D', color: 'bg-blue-600',    text: 'Markedssegmentering',      count: 3 },
  ]
  const total = opts.reduce((s, o) => s + o.count, 0)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Live-quiz</span>
        <span className="text-xs text-slate-500">52 av 52 har svart</span>
      </div>
      <p className="font-semibold text-slate-900 text-sm leading-snug mb-4">
        Hva er BMC en forkortelse for?
      </p>
      <div className="space-y-2">
        {opts.map(o => {
          const pct = Math.round((o.count / total) * 100)
          return (
            <div key={o.label}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`flex items-center gap-2 ${o.correct ? 'font-semibold text-emerald-700' : 'text-slate-700'}`}>
                  <span className={`w-5 h-5 rounded ${o.color} text-white text-[10px] font-bold flex items-center justify-center`}>{o.label}</span>
                  {o.text} {o.correct && '✓'}
                </span>
                <span className="text-slate-500">{o.count} ({pct}%)</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full ${o.correct ? 'bg-emerald-500' : o.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ModuleProgressMockup() {
  const modules = [
    { title: 'Forretningsidé', pct: 100 },
    { title: 'Markedsanalyse', pct: 80 },
    { title: 'Segmentering & posisjonering', pct: 45 },
    { title: 'Prissetting', pct: 0 },
  ]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Klasse 1MKA — Markedsføring & innovasjon</p>
          <p className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">Klassens fremgang</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-teal-700">56%</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide">snitt</p>
        </div>
      </div>
      <div className="space-y-3">
        {modules.map(m => (
          <div key={m.title}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-800">{m.title}</span>
              <span className="text-xs text-slate-500">{m.pct}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full ${m.pct === 100 ? 'bg-emerald-500' : 'bg-teal-600'}`}
                style={{ width: `${m.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExamScreenMockup() {
  return (
    <div className="rounded-2xl bg-slate-900 text-slate-100 p-5 shadow-sm border border-slate-800">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-400">Prøve · Forretningsdrift VG1</p>
          <p className="text-sm font-semibold mt-0.5">Spørsmål 7 av 15</p>
        </div>
        <div className="font-mono text-xl text-teal-400">23:45</div>
      </div>
      <p className="text-sm leading-relaxed mb-4">
        Marit driver en kafé som ENK. Hun vurderer å ansette to deltidsmedarbeidere. Hvilken arbeidsrettslig forpliktelse oppstår først?
      </p>
      <div className="space-y-2 mb-4">
        {['Skriftlig arbeidsavtale før tiltredelse', 'Innmelding i Brønnøysund', 'Tegne yrkesskadeforsikring', 'Sende A-melding'].map((t, i) => (
          <div key={i} className={`px-3 py-2 rounded-lg border text-sm ${i === 0 ? 'border-teal-500 bg-teal-500/10 text-teal-200' : 'border-slate-700 text-slate-300'}`}>
            <span className="font-mono text-xs mr-2 text-slate-500">{String.fromCharCode(65 + i)}</span>
            {t}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>🔒 Anti-juks aktivt</span>
        <span>6 av 15 besvart</span>
      </div>
    </div>
  )
}

function LeaderboardMockup() {
  const rows = [
    { rank: 1, school: 'Sandvika VGS', klasse: '1MKA', score: 87, mine: false },
    { rank: 2, school: 'Bergen handelsgym', klasse: '1ENT', score: 82, mine: false },
    { rank: 3, school: 'Trondheim Katedralskole', klasse: '1SSR', score: 79, mine: true },
    { rank: 4, school: 'Stavanger VGS', klasse: '1ML', score: 74, mine: false },
    { rank: 5, school: 'Oslo Handelsgym', klasse: '1MKB', score: 71, mine: false },
  ]
  const medals = ['🥇', '🥈', '🥉']
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Nasjonalt leaderboard</p>
          <p className="text-base font-bold text-slate-900 mt-0.5 tracking-tight">Forretningsdrift VG1 — Variant A</p>
        </div>
        <span className="text-xs text-slate-500">37 klasser</span>
      </div>
      <div className="space-y-2">
        {rows.map(r => (
          <div
            key={r.rank}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${r.mine ? 'border-teal-300 bg-teal-50' : 'border-slate-100 bg-slate-50'}`}
          >
            <span className="text-lg w-7 text-center">{medals[r.rank - 1] ?? `${r.rank}.`}</span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${r.mine ? 'text-teal-900' : 'text-slate-900'}`}>
                {r.klasse}
                {r.mine && <span className="ml-2 text-[10px] font-bold tracking-wider text-teal-700">DIN KLASSE</span>}
              </p>
              <p className="text-xs text-slate-500 truncate">{r.school}</p>
            </div>
            <p className="text-base font-bold text-teal-700">{r.score}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Hovedside ─────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 antialiased scroll-smooth" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/om" className="font-bold text-slate-900 tracking-tight">
            Business<span className="text-teal-700">laben</span>
          </Link>
          <div className="hidden sm:flex items-center gap-7 text-sm text-slate-600">
            <a href="#hvorfor" className="hover:text-slate-900 transition-colors">Hvorfor</a>
            <a href="#funksjoner" className="hover:text-slate-900 transition-colors">Funksjoner</a>
            <a href="#fag" className="hover:text-slate-900 transition-colors">Fagdekning</a>
            <a href="#om" className="hover:text-slate-900 transition-colors">Om</a>
          </div>
          <a
            href="mailto:espen@businesslaben.no?subject=Be%20om%20tilgang%20til%20pilot"
            className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
          >
            Be om tilgang
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-24 max-w-5xl mx-auto text-center">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-widest mb-5">Pilotperiode 2026</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Ett verktøy for{' '}
          <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 bg-clip-text text-transparent">
            HELE
          </span>{' '}
          det merkantile programfaget
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
          Live-økter, læringsmoduler, prøvemodus og nasjonale konkurranser — bygget for VG1–VG3 SSR, ML og ENT. Norsk fra første klikk.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:espen@businesslaben.no?subject=Be%20om%20tilgang%20til%20pilot"
            className="bg-teal-700 text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-teal-800 transition-colors shadow-sm"
          >
            Be om tilgang →
          </a>
          <Link
            to="/teacher"
            className="px-7 py-3.5 rounded-lg font-semibold text-slate-700 border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition-colors"
          >
            Logg inn
          </Link>
        </div>
      </section>

      {/* Problem / Løsning */}
      <section id="hvorfor" className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-wide mb-3">Problemet</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Lærere bytter mellom seks–åtte forskjellige verktøy hver uke</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              PowerPoint til presentasjoner. Kahoot til quiz. Google Forms til prøver. Excel til klasselister. Random YouTube til teori. Forskjellige nettsteder for hvert fag.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Resultat: ingen felles oversikt, ingen sammenligning på tvers av klasser, og dobbeltarbeid hver gang en ny gruppe begynner.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">Løsningen</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Én plattform fra første presentasjon til siste prøve</h2>
            <ul className="space-y-3 text-slate-700">
              {[
                'Live-økter med presentasjon, quiz og elev-spørsmål i én flyt',
                'Læringsmoduler dekker hvert kompetansemål i SSR/ML/ENT',
                'Prøvemodus med anti-juks og automatisk poenggivning',
                '24 ferdiglagde standardkonkurranser med nasjonalt leaderboard',
                'Spillet AdVenture for praktisk forretnings­drift (kommer)',
              ].map(t => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 text-teal-600 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Live-økt */}
      <section id="funksjoner" className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">Live-økt</p>
          <h2 className="text-3xl font-bold tracking-tight mb-5">Klasserommet på storskjerm — elevene følger med på sin enhet</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Start en presentasjon på storskjerm, send live-quiz til elevene og se svarene komme inn i sanntid. Elevene kan stille spørsmål uten å rekke opp hånda.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Når økten slutter, har du en oversikt over hvem som forsto, hvem som svarte feil og hvem som spurte om hva.
          </p>
        </div>
        <LiveQuizMockup />
      </section>

      {/* Læringsmoduler */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
          <ModuleProgressMockup />
          <div>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">Læringsmoduler</p>
            <h2 className="text-3xl font-bold tracking-tight mb-5">43+ moduler dekker hele kompetansemålslista</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Hver modul har teori, eksempler, øvelser og oppgaver — strukturert slik at en elev kan jobbe selvstendig hjemme eller en lærer kan kjøre en hel time fra modulen.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Klassens fremgang vises som progressbarer per modul. Du ser hvem som er ferdig, hvem som har stoppet på halvveien, og hvor det er behov for ekstra forklaring.
            </p>
          </div>
        </div>
      </section>

      {/* Prøvemodus */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">Prøvemodus</p>
          <h2 className="text-3xl font-bold tracking-tight mb-5">Halvtårsprøver med anti-juks i én klikk</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Generer en prøvekode. Elevene skriver inn koden, får 15 spørsmål med tidskontroll og varsel hvis de bytter fane.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Du får poengfordeling, karakterforslag og mulighet til å se hvilke svar som ble gitt på hvilke spørsmål — uten manuell retting.
          </p>
        </div>
        <ExamScreenMockup />
      </section>

      {/* Konkurranse mot skoler */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-5 gap-14 items-center">
          <div className="lg:col-span-2">
            <span className="inline-block bg-teal-700 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
              🏆 NYTT · Cross-school
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
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
                { bold: 'Aldri elevnavn', rest: ' — kun klassenavn og skole på lederbordet' },
                { bold: 'Opt-in deling', rest: ' — du velger om resultatet skal deles' },
                { bold: 'Filter per fag', rest: ', per måned, per landsdel' },
              ].map(item => (
                <li key={item.bold} className="flex items-start gap-3">
                  <span className="mt-1 text-teal-600 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">
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

      {/* Andre funksjoner grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide text-center mb-3">Andre funksjoner</p>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Bygget for hvordan du faktisk underviser</h2>
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
            <div
              key={f.title}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl mb-5">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">{f.desc}</p>
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
          <p className="text-teal-400 uppercase font-semibold text-sm tracking-wide mb-3">Slik fungerer det</p>
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
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fagdekning */}
      <section id="fag" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide text-center mb-3">Fagdekning</p>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">10 programfag, ny læreplan, 360 spørsmål</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'VG1 SSR',
              tags: ['SSR-FD', 'SSR-MI', 'SSR-KS'],
              desc: 'Forretningsdrift, Markedsføring & innovasjon, Kultur & samhandling. Dekket i sin helhet.',
            },
            {
              title: 'VG2 SSR',
              tags: ['SSR-OA', 'SSR-KM', 'SSR-HMS'],
              desc: 'Økonomi & administrasjon, Kommunikasjon & markedsføring, HMS — etter ny læreplan SSR02-01.',
            },
            {
              title: 'Studiespesialisering',
              tags: ['ML1', 'ML2', 'ENT1', 'ENT2'],
              desc: 'Markedsføring & ledelse 1+2, Entreprenørskap 1+2 — pluss tverrfaglig ledelse for VG1 og VG2.',
            },
          ].map(c => (
            <div key={c.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg tracking-tight mb-3">{c.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {c.tags.map(t => (
                  <span key={t} className="text-xs font-semibold bg-teal-50 text-teal-700 px-2 py-1 rounded-md">{t}</span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AdVenture sneak peek */}
      <section className="bg-gradient-to-br from-teal-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-100 mb-3">Kommer snart</p>
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-100 px-3 py-1 rounded-full text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Under utvikling · Lansering 2026
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">AdVenture — bedriftssimulatoren</h2>
          <p className="text-white/90 leading-relaxed mb-4 max-w-3xl">
            Elevene driver sin egen butikk i en virtuell by. De setter pris, bemanner skift, kjører kampanjer og ser resultatet i månedsregnskapet — alt knyttet til kompetansemålene.
          </p>
          <p className="text-white/90 leading-relaxed mb-8 max-w-3xl">
            Spillet er fortsatt under utvikling og rulles ut til pilotskolene utover 2026. Det som er bestemt så langt:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Isometrisk by',
              '8 startstrategier',
              '32 hendelser',
              'Business Model Canvas',
              'Lærerstyrt tema-fokus',
            ].map(tag => (
              <span
                key={tag}
                className="bg-white/10 border border-white/20 text-sm rounded-full px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bygget av en lærer som var lei */}
      <section id="om" className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">Om</p>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Bygget av en lærer som var lei</h2>
        <p className="text-slate-600 leading-relaxed text-lg mb-4">
          Espen Solhaug har undervist økonomi og markedsføring siden 2019. Etter å ha brukt ti forskjellige verktøy hver uke begynte han å bygge sitt eget — først som et helgeprosjekt, nå som plattform for hele det merkantile programfaget.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Businesslaben er bygget side om side med kollegaer og pilotklasser. Alle endringer kommer fra reelle problemer i klasserommet, ikke fra et produktteam i et hjørnekontor.
        </p>
      </section>

      {/* CTA — bli med i piloten */}
      <section id="kontakt" className="bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Bli med i piloten</h2>
          <p className="text-white/85 leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
            10 skoler får tilgang i pilotperioden 2026. Send oss en e-post med skole, fag du underviser og hvor mange klasser du tenker å bruke det med.
          </p>
          <a
            href="mailto:espen@businesslaben.no?subject=Be%20om%20tilgang%20til%20pilot"
            className="inline-block bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-sm"
          >
            Send e-post →
          </a>
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-left text-sm">
            <div className="bg-teal-800/30 rounded-lg p-4">
              <div className="font-semibold mb-1">For hvem</div>
              <div className="text-teal-100">Lærere i SSR, ML eller ENT på videregående</div>
            </div>
            <div className="bg-teal-800/30 rounded-lg p-4">
              <div className="font-semibold mb-1">Pris</div>
              <div className="text-teal-100">Gratis under pilot. Skoleavtaler fra høsten 2027.</div>
            </div>
            <div className="bg-teal-800/30 rounded-lg p-4">
              <div className="font-semibold mb-1">Personvern</div>
              <div className="text-teal-100">GDPR-respekterende. Ingen elevnavn deles på tvers.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-xs">B</div>
            <span>Businesslaben · 2026 · Bygget av en norsk lærer</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#hvorfor" className="hover:text-teal-700">Hvorfor</a>
            <a href="#funksjoner" className="hover:text-teal-700">Funksjoner</a>
            <a href="#fag" className="hover:text-teal-700">Fag</a>
            <a href="#kontakt" className="hover:text-teal-700">Kontakt</a>
            <Link to="/login" className="hover:text-teal-700">Logg inn</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
