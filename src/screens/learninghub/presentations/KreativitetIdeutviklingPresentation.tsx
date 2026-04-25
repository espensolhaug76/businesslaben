      /**
       * ENT1 · EB1 — Kapittel 2: Kreativitet og idéutvikling
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
        <SlideLabel>Kapittel 2 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hva er kreativitet?
        </h2>
        <p style={bodyText}>
          Evnen til å skape noe som er både nytt og nyttig i en gitt kontekst. Bare nytt = ubrukelig kunst. Bare nyttig = standardvare. Kreativitet er kombinasjonen — og den kan trenes opp.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er kreativitet?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kreative prosesser" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kreative prosesser
        </h2>
        <p style={bodyText}>
          Forberedelse (samle materiale), inkubasjon (la underbevisstheten jobbe), illuminasjon (aha-opplevelsen), verifikasjon (test og videreutvikle). Mange tror kreativitet bare er punkt 3, men de andre er like viktige.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Idémyldring (brainstorming)
        </h2>
        <p style={bodyText}>
          Tre regler: ingen kritikk under idéfasen, kvantitet foran kvalitet, og bygg videre på andres ideer. Klassisk i grupper, men også effektiv individuelt — sett en timer på 15 minutter og skriv ned alt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Idémyldring (brainstorming)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="SCAMPER-metoden" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          SCAMPER-metoden
        </h2>
        <p style={bodyText}>
          Sjekkliste for å transformere eksisterende ideer: Substitute (bytte ut), Combine (kombinere), Adapt (tilpasse), Modify (modifisere), Put to another use (annet bruk), Eliminate (fjerne), Reverse (snu). En time med SCAMPER gir ofte 50+ varianter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Design Thinking
        </h2>
        <p style={bodyText}>
          Brukersentrert metode i fem faser: empati (forstå brukeren), definere (klart problem), idéutvikling, prototype, testing. Brukt av Apple, IDEO og Stanford d.school. Tester alltid med ekte brukere før investering.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Design Thinking" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Fra idé til mulighet" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Fra idé til mulighet
        </h2>
        <p style={bodyText}>
          Vurder om ideen løser et faktisk problem for en betalingsvillig målgruppe. Tre spørsmål: Er problemet reelt? Er målgruppen stor nok? Er de villige til å betale? Hvis ett svaret er nei, går du tilbake til tegnebrettet.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kreativitetens fiender
        </h2>
        <p style={bodyText}>
          Frykt for å «drite seg ut» (selvkritikk), rutine-tenkning («slik gjør vi det her») og for tidlig evaluering («det vil aldri funke»). Sterke kulturer i bedrifter kan kvele kreativitet i fødselen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Kreativitetens fiender" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Prototype" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Prototype
        </h2>
        <p style={bodyText}>
          En enkel modell av produktet for å teste funksjon og få tilbakemelding tidlig. Trenger ikke være perfekt — papirskisser, Lego-modeller eller PowerPoint-mockup gir mer læring per krone enn ferdige prototyper.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Airbnb sin kreative reise
        </h2>
        <p style={bodyText}>
          Brian Chesky og Joe Gebbia kunne ikke betale husleia i 2007. De blåste opp luftmadrasser og leide ut til konferansegjester. Det enkle prototypen ble til Airbnb — verdt 100+ milliarder dollar i dag. Stor idé født av lite problem.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Airbnb sin kreative reise" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 2 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Kan kreativitet trenes?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Alle kan trene opp sin kreativitet gjennom teknikker og riktig miljø. Det er ingen «kreativ gen» — det er øvelse, eksponering for mange ideer, og en kultur som tør å feile.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er en god regel for idémyldring?',
  options: [
    'Vurder hver idé nøye før neste',
    'Ingen kritikk under idéfasen — kvantitet foran kvalitet',
    'Bare ledere får komme med ideer',
    'Alle ideer må være realistiske',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva står S i SCAMPER for?',
  options: [
    'Sale',
    'Strategy',
    'Substitute (bytte ut)',
    'Solve',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hvorfor er prototyper viktige?',
  options: [
    'For å imponere investorer',
    'For å teste funksjon og få tilbakemelding tidlig — billig læring',
    'For å ferdigstille produktet',
    'For å patentere ideen',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function KreativitetIdeutviklingPresentation() {
        return (
          <PresentationShell
            presentationName="Kreativitet og idéutvikling"
            subjectLabel="ENT1 · EB1"
            titleLine1="Kreativitet"
    titleLine2="og idéutvikling"
            subtitle="Kunsten å tenke nytt — teknikker som hjelper deg fra hvit ark til konkret forretningsidé."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
