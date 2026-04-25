      /**
       * ENT1 · EB1 — Kapittel 10: Samarbeid og teambygging
       * Kilde: master-manus i .manus/.
       */
      import PresentationShell, { Glass, SlideImg, SlideLabel, twoCol, bodyText } from './_lib/PresentationShell'
      import type { ContentSlide } from './_lib/PresentationShell'
      import type { QuizQuestion } from './QuizSlide'

      const SLIDES: ContentSlide[] = [
        ({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hvorfor team?
        </h2>
        <p style={bodyText}>
          Utfyllende kompetanse. Klassisk modell: «Hacker» (teknisk), «Hustler» (forretning) og «Hipster» (design). De fleste vellykkede oppstartsbedrifter har minst to gründere — én alene har sjelden alle ferdighetene som trengs.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hvorfor team?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Team-modning (Tuckman)" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Team-modning (Tuckman)
        </h2>
        <p style={bodyText}>
          Bruce Tuckmans fire faser: forming (oppstart, høflig), storming (konflikter, posisjoneringer), norming (regler etableres), performing (full effektivitet). Mange team gir opp i storming-fasen — det er normalt og må gjennomleves.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Roller i teamet (Belbin)
        </h2>
        <p style={bodyText}>
          Meredith Belbin identifiserte 9 team-roller: idéskaperen, iverksetteren, koordinatoren, analytikeren m.fl. Alle roller er nødvendige; team som mangler én rolle kompenserer dårlig. Belbin-test kan brukes for å analysere ditt team.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Roller i teamet (Belbin)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjon i teamet" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kommunikasjon i teamet
        </h2>
        <p style={bodyText}>
          Åpenhet, aktiv lytting og konstruktiv tilbakemelding. Slack, Teams, Notion gjør den daglige kommunikasjonen lett — men ingen verktøy erstatter ærlige samtaler. Etablér rutiner for både formell og uformell kontakt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Konflikthåndtering
        </h2>
        <p style={bodyText}>
          Hvordan løse uenigheter før de ødelegger bedriften. Lytt aktivt, fokuser på problemet (ikke personen), søk felles interesser, kompromiss eller mekling. Aksjonæravtalen (kap 5) er førstelinjeforsvar mot eskalering.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Konflikthåndtering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Motivasjon" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Motivasjon
        </h2>
        <p style={bodyText}>
          Indre motivasjon (mestring, mening) varer lenger enn ytre (lønn, bonus). Daniel Pinks bok «Drive» viser at autonomi, mestring og formål driver høy ytelse mer enn pengebelønning. Lønn er nødvendig men ikke tilstrekkelig.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Virtuelle team
        </h2>
        <p style={bodyText}>
          Samarbeid via digitale verktøy (Slack, Teams, Trello, Notion). Pandemien viste at det funker — men krever klarere prosesser, regelmessige videosamtaler, og bevisst innsats for å bygge team-følelsen som kommer naturlig på kontoret.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Virtuelle team" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Lederrollen i oppstarten" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lederrollen i oppstarten
        </h2>
        <p style={bodyText}>
          Gründerens rolle endrer seg. I starten er du «doer» (gjør alt selv). Etter hvert «enabler» (lar andre gjøre). Mange gründere klarer ikke overgangen — og blir flaskehalsen som hindrer veksten.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Snapchat-stiftelsen
        </h2>
        <p style={bodyText}>
          Snapchat ble stiftet av Evan Spiegel, Bobby Murphy og Reggie Brown. Brown ble skviset ut i tidlig fase — over 150 millioner dollar i rettssak senere. Konflikt om eierskap er en hovedårsak til at gründerteam kollapser. Skriv aksjonæravtale TIDLIG.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Snapchat-stiftelsen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 10 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva slår alt annet i en oppstartsbedrift?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        En middels idé med et fantastisk team vinner over en fantastisk idé med et middels team. Investorer satser ofte mer på team enn på produkt — fordi en sterkt team kan endre produkt, men et svakt team kan ikke endre seg selv.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er Tuckmans fire faser for team-utvikling?',
  options: [
    'Idé, prototype, lansering, vekst',
    'Forming, storming, norming, performing',
    'Plan, gjennomføring, evaluering, justering',
    'Start, midt, slutt, oppsummering',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sier \'Drive\'-teorien om motivasjon?',
  options: [
    'Lønn er det viktigste',
    'Autonomi, mestring og formål driver høyere ytelse enn pengebelønning',
    'Trusler funker best',
    'Bonus avgjør alt',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor satser investorer ofte mer på team enn på produkt?',
  options: [
    'Team er billigere å vurdere',
    'Et sterkt team kan endre produkt, men et svakt team kan ikke endre seg selv',
    'Team er mer stabile',
    'Det er en uskreven regel',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function SamarbeidTeambyggingPresentation() {
        return (
          <PresentationShell
            presentationName="Samarbeid og teambygging"
            subjectLabel="ENT1 · EB1"
            titleLine1="Teamarbeid"
            subtitle="Sammen er vi sterkere — utfyllende kompetanse og god dynamikk er ofte viktigere enn ideen."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
