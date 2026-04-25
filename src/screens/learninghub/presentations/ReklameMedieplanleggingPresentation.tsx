      /**
       * ML1 · Visjon 1 — Kapittel 12: Reklame og medieplanlegging
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
        <SlideLabel>Kapittel 12 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Betalt oppmerksomhet
        </h2>
        <p style={bodyText}>
          Reklame er ikke gratis. Du kjøper plass i andres kanaler — TV-spott, Google-annonse, Instagram-feed. Pris og rekkevidde må alltid balanseres mot målet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Betalt oppmerksomhet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Medieplanleggingens faser" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Medieplanleggingens faser
        </h2>
        <p style={bodyText}>
          Mål → målgruppe → medievalg → budsjett → kontroll. Strukturen er den samme om du har 50 000 kroner eller 50 millioner — bare detaljnivået skiller.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 12 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Dekning og frekvens
        </h2>
        <p style={bodyText}>
          Dekning: hvor mange unike personer som ser annonsen. Frekvens: hvor mange ganger hver person ser den. For å skape kjennskap kreves vanligvis 3-7 visninger per person.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Dekning og frekvens" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kreativ utforming" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kreativ utforming
        </h2>
        <p style={bodyText}>
          Tekst, bilde, lyd og video som fanger oppmerksomheten i støyen. De første 3 sekundene avgjør om publikum scroller forbi. En sterk visuell idé er ofte verdt mer enn en stor produksjonsbudsjett.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 12 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Digital annonsering
        </h2>
        <p style={bodyText}>
          Programmatiske kjøp: algoritmer kjøper annonseplass i sanntid basert på målgrupp-data. Google Ads og Meta Ads dominerer. Presisjonen er enorm, men personvern (GDPR) setter grenser.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Digital annonsering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Influencer marketing" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Influencer marketing
        </h2>
        <p style={bodyText}>
          Bruk av troverdige tredjeparter for å nå nisjemålgrupper. En micro-influencer med 10 000 engasjerte følgere kan gi bedre resultat enn én med en million passive.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 12 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kostnadseffektivitet
        </h2>
        <p style={bodyText}>
          CPM (Cost per Mille — pris per 1000 visninger) for kjennskap. CPC (Cost per Click) for trafikk. CPA (Cost per Acquisition) for faktiske kunder. Mål alltid det som faktisk teller for forretningsmålet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Kostnadseffektivitet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Reklame-etikk" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Reklame-etikk
        </h2>
        <p style={bodyText}>
          Forbrukertilsynet håndhever forbud mot villedende reklame, skjult markedsføring og manipulering av barn. Influencere må merke betalt innhold med #reklame. Brudd kan gi store bøter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 12 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Spotify Wrapped
        </h2>
        <p style={bodyText}>
          Spotifys årlige «Wrapped»-kampanje er reklame som ikke ser ut som reklame. Brukerne deler frivillig egne lytterstatistikker på sosiale medier. Resultat: massiv organisk eksponering uten å betale for medieplass.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Spotify Wrapped" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 12 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva kjennetegner god reklame?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        God reklame kombinerer en sterk kreativ idé med presis medieplassering. Idéen alene er ikke nok om den når feil målgruppe — og presis plassering hjelper lite uten et budskap som biter.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er forskjellen på dekning og frekvens?',
  options: [
    'Dekning er TV, frekvens er digitalt',
    'Dekning er antall unike personer, frekvens er antall ganger hver person ser annonsen',
    'Dekning er pris, frekvens er kvalitet',
    'De er to navn på samme ting',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva betyr CPM?',
  options: [
    'Cost per Marketing',
    'Cost per Mille — pris per 1000 visninger',
    'Customer Performance Measurement',
    'Click Per Minute',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva må influencere etter norsk lov gjøre med betalt innhold?',
  options: [
    'Ikke vise det offentlig',
    'Merke det med #reklame eller #annonse',
    'Bare gjøre det privat',
    'Bruke kun produkter de selv eier',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function ReklameMedieplanleggingPresentation() {
        return (
          <PresentationShell
            presentationName="Reklame og medieplanlegging"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Reklame"
            subtitle="Strategisk synlighet — hvordan kjøpe, plassere og måle reklamen i et fragmentert mediebilde."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
