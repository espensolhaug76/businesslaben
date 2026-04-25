      /**
       * ML2 · Visjon 2 — Kapittel 13: Organisering og ledelse (strategisk nivå)
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
        <SlideLabel>Kapittel 13 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Organisasjonsstruktur
        </h2>
        <p style={bodyText}>
          Funksjonell, produktbasert, markedsbasert eller matriseorganisering — hva passer strategien? Strukturen må følge strategien, ikke omvendt. Endrer du strategi, må strukturen vurderes på nytt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Organisasjonsstruktur" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Bedriftskultur" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Bedriftskultur
        </h2>
        <p style={bodyText}>
          De usynlige reglene som styrer atferden. «Slik gjør vi det her» — uten at noen sier det høyt. Sterk kultur er konkurransefortrinn (Apple, Patagonia), men kan også bli en bremsekloss for endring.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Endringsledelse
        </h2>
        <p style={bodyText}>
          Hvordan få med de ansatte på en ny markedsstrategi. Kotters åtte-stegs modell: skap nødfølelse, bygg en ledende koalisjon, kommuniser visjon, fjern hindringer, feire seire underveis, forankre kulturen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Endringsledelse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Lederstiler på strategisk nivå" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lederstiler på strategisk nivå
        </h2>
        <p style={bodyText}>
          Inspirerende ledelse (Jobs, Musk) skaper engasjement og innovasjon. Kontrollbasert ledelse (mange traditionelle CEOer) gir presis utførelse. Begge har sin plass — feil stil i feil situasjon kan være katastrofal.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Internmarkedsføring
        </h2>
        <p style={bodyText}>
          Selg strategien til de ansatte før den selges til kunden. Hvis ikke ansatte tror på merkevaren, klarer de heller ikke formidle den. SAS, Hurtigruten og IKEA bruker betydelige ressurser på ansatt-engasjement.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Internmarkedsføring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Kompetansestrategi" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kompetansestrategi
        </h2>
        <p style={bodyText}>
          Sikre at bedriften har hodene som trengs for fremtiden. Krever ofte aktivt arbeid: kompetansekartlegging, læring og utvikling, rekruttering på lang sikt. Tek-bedrifter bruker mer på rekruttering enn på reklame.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Agil organisering
        </h2>
        <p style={bodyText}>
          Evnen til å snu seg raskt i et digitalt marked. Spotifys squad/tribe-modell, Amazon's «two pizza teams» — små, autonome enheter som kan beslutte og utføre raskt. Motsatt av tradisjonell hierarkisk struktur.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Agil organisering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Samarbeid og team" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Samarbeid og team
        </h2>
        <p style={bodyText}>
          Bryte ned «siloer» mellom avdelinger. Cross-funksjonelle team, felles målbevis, samlokalisering — alt for å sikre at marked, IT, salg og produkt jobber mot samme mål, ikke konkurrerer internt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Hurtigrutens kulturreise
        </h2>
        <p style={bodyText}>
          Hurtigruten gikk fra lokal ferge-leverandør til globalt premium-cruiseselskap. Krevde fundamental endring av kultur (fra «vi er ferje» til «vi er opplevelse»), ny rekruttering og betydelig internopplæring. Strategi mislyktes flere ganger før kulturen kom på plass.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Hurtigrutens kulturreise" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 13 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor må strategi og organisasjon henge sammen?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Strategien dør uten en organisasjon som er rigget for å gjennomføre den. «Culture eats strategy for breakfast» — men strategi uten kultur eter seg selv.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er internmarkedsføring?',
  options: [
    'Reklame plassert internt i bedriften',
    'Selge strategien til de ansatte før den selges til kunden',
    'Markedsføring kun for ansatte-rabatter',
    'Internasjonal markedsføring',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva kjennetegner agil organisering?',
  options: [
    'Hierarkisk struktur med mange lag',
    'Små, autonome team som kan beslutte og utføre raskt',
    'Sentralisert beslutning fra toppen',
    'Lange planleggingssykluser',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sier Peter Druckers berømte sitat om kultur?',
  options: [
    'Kultur er overvurdert',
    'Culture eats strategy for breakfast — kultur slår strategi',
    'Kultur er kun for store bedrifter',
    'Kultur har ingen sammenheng med resultater',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function OrganiseringOgLedelseStrategiskPresentation() {
        return (
          <PresentationShell
            presentationName="Organisering og ledelse (strategisk nivå)"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Strategisk"
    titleLine2="ledelse"
            subtitle="Kultur og struktur — hvordan organisasjonen rigges for å gjennomføre strategien."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
