      /**
       * ML2 · Visjon 2 — Kapittel 4: Lederens rolle og funksjon
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
        <SlideLabel>Kapittel 4 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Ledelse vs. administrasjon
        </h2>
        <p style={bodyText}>
          Administrasjon opprettholder eksisterende systemer (planer, regler, rutiner). Ledelse skaper endring (visjon, motivasjon, retning). Begge er nødvendige — ingen organisasjon klarer seg uten.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Ledelse vs. administrasjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Mintzbergs lederroller" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Mintzbergs lederroller
        </h2>
        <p style={bodyText}>
          Henry Mintzberg identifiserte 10 lederroller delt i tre kategorier: interpersonale (galionsfigur, leder, kontaktperson), informasjon (overvåker, sender, talsperson) og beslutning (entreprenør, problemløser, ressursfordeler, forhandler).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Fayols funksjoner
        </h2>
        <p style={bodyText}>
          Henri Fayol beskrev fem klassiske lederfunksjoner: planlegge, organisere, lede, samordne og kontrollere. Modellen er over 100 år gammel, men brukes fortsatt som ramme i ledelseslitteratur.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Fayols funksjoner" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Strategisk ledelse" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategisk ledelse
        </h2>
        <p style={bodyText}>
          Evnen til å se de lange linjene og ta upopulære valg. Strategiske ledere må noen ganger si nei til dagens lønnsomhet for å sikre morgendagens overlevelse.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lederstiler
        </h2>
        <p style={bodyText}>
          Fra autoritær (sjefen bestemmer alene) via demokratisk (felles beslutninger) til delegerende (medarbeider bestemmer selv). Hver stil har sine bruksområder — krise krever annen stil enn kreativt teamarbeid.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Lederstiler" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Situasjonsbestemt ledelse" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Situasjonsbestemt ledelse
        </h2>
        <p style={bodyText}>
          Hersey og Blanchards modell: tilpass lederstilen etter medarbeiderens kompetanse og motivasjon. Ny og motivert = instruere. Erfaren og motivert = delegere.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Intern kommunikasjon
        </h2>
        <p style={bodyText}>
          Lederen er budbringer av visjon og strategi inn i organisasjonen. Hvis ledelsen ikke kan forklare strategien på 30 sekunder, vil ingen lenger ned i organisasjonen huske den.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Intern kommunikasjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Beslutningsprosesser" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Beslutningsprosesser
        </h2>
        <p style={bodyText}>
          Hvordan ta gode valg under usikkerhet? Rasjonelle modeller (vurder alternativer, velg det beste), intuitiv beslutning (magefølelse), eller kollektive prosesser (involvere flere perspektiver).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Jonas Gahr Støre vs. Erna Solberg
        </h2>
        <p style={bodyText}>
          Begge er statsministre, men med ulike lederstiler. Erna preges av rolig, koordinerende stil — flink til å dempe konflikter. Jonas mer analytisk og forhandlende. Begge stilene har gitt resultater i ulike situasjoner.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Jonas Gahr Støre vs. Erna Solberg" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 4 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er god ledelse?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        God ledelse er broen mellom en god plan og et godt resultat. Den beste strategien blir ingenting hvis lederen ikke evner å mobilisere folka til å gjennomføre den.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er forskjellen på ledelse og administrasjon?',
  options: [
    'De er det samme',
    'Ledelse skaper endring, administrasjon opprettholder systemer',
    'Ledelse er for store bedrifter, administrasjon for små',
    'Ledelse er for staten, administrasjon for private',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvor mange lederroller identifiserte Mintzberg?',
  options: [
    'Fem',
    'Syv',
    'Ti',
    'Tolv',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva er kjernen i situasjonsbestemt ledelse?',
  options: [
    'Lederen bytter jobb ofte',
    'Lederen tilpasser stilen etter medarbeiderens kompetanse og motivasjon',
    'Lederen har én stil for hele karrieren',
    'Lederen velger team selv',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function LederensRollePresentation() {
        return (
          <PresentationShell
            presentationName="Lederens rolle og funksjon"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Lederens"
    titleLine2="rolle"
            subtitle="Styring og inspirasjon — hva som skiller en god leder fra en effektiv leder."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
