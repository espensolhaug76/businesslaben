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
            <a href="#problem" className="hover:text-slate-900 transition-colors">Hvorfor</a>
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
      <section id="problem" className="bg-slate-50 border-y border-slate-100">
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
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
          <LeaderboardMockup />
          <div>
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">Konkurranse mot andre skoler</p>
            <h2 className="text-3xl font-bold tracking-tight mb-5">Klasse mot klasse — på tvers av landet</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              24 ferdiglagde konkurranser dekker SSR-FD, SSR-MI, SSR-KS, ØK, KOM, HMS, ML1/ML2 og ENT1/ENT2. Du klikker «Start», elevene blir med via en kode.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Klassens snitt sendes til et nasjonalt leaderboard — kun aggregerte tall, GDPR-vennlig. Elevene ser hvor de havner mot 36 andre klasser uten at noen elevnavn deles.
            </p>
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
              desc: 'Følg klassens fremgang, se elevsvar med kommentarer og styr hva som er synlig per klasse.',
            },
            {
              icon: '📚',
              title: 'Læringsmoduler',
              desc: 'Strukturerte teori-moduler med innebygde øvelser og automatisk vurdering.',
            },
            {
              icon: '🎤',
              title: 'Lærerstyrte presentasjoner',
              desc: 'Ferdige presentasjoner per kompetansemål — start på storskjerm og naviger med piltastene.',
            },
          ].map(f => (
            <div
              key={f.title}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg tracking-tight text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Slik fungerer det — dark section */}
      <section className="bg-slate-900 text-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-wide text-center mb-3">Slik fungerer det</p>
          <h2 className="text-3xl font-bold tracking-tight text-center mb-14">Tre steg fra første time til halvtårsprøve</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: '1',
                title: 'Opprett en klasse',
                desc: 'Velg fag, generer kode, del med elevene. Tar 30 sekunder.',
              },
              {
                n: '2',
                title: 'Hold timene dine',
                desc: 'Live-økter, presentasjoner eller la elevene jobbe selvstendig med moduler. Du velger.',
              },
              {
                n: '3',
                title: 'Test og konkurrer',
                desc: 'Prøvemodus eller standardkonkurranse. Klassens snitt vises både lokalt og nasjonalt.',
              },
            ].map(s => (
              <div key={s.n} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-600 text-white text-xl font-bold flex items-center justify-center">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold text-lg tracking-tight mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
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
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-100 mb-3">Kommer snart</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">AdVenture — bedriftssimulator­en</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Elevene driver sin egen butikk i en virtuell by. De setter pris, bemanner skift, kjører kampanjer og ser resultatet i månedsregnskapet — alt knyttet til kompetansemålene.
            </p>
            <p className="text-white/90 leading-relaxed">
              Bygges parallelt med plattformen og rulles ut til pilotskolene utover 2026.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { v: '23', l: 'butikker bygget' },
                { v: '156k', l: 'kr i omsetning' },
                { v: '8', l: 'måneder spilt' },
                { v: '4.7★', l: 'kundetilfredshet' },
              ].map(s => (
                <div key={s.l} className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-extrabold tracking-tight">{s.v}</p>
                  <p className="text-xs text-white/80 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
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
      <section className="bg-teal-700 text-white">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-white">Business<span className="text-teal-400">laben</span></span>
            <span className="ml-3 text-slate-500">© 2026 — Bygget av en norsk lærer</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:espen@businesslaben.no" className="hover:text-white transition-colors">E-post</a>
            <Link to="/teacher" className="hover:text-white transition-colors">Logg inn</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
