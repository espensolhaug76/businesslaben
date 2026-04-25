      /**
       * ML2 · Visjon 2 — Kapittel 8: Produktstrategi (avansert)
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
        <SlideLabel>Kapittel 8 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategisk produktbeslutning
        </h2>
        <p style={bodyText}>
          Hva skal vi tilby? Hvilke segmenter satser vi på? Strategiske produktvalg avgjør bedriftens identitet — og kan ikke endres uten store kostnader.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Strategisk produktbeslutning" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="PLC i strategisk perspektiv" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          PLC i strategisk perspektiv
        </h2>
        <p style={bodyText}>
          Produktets livssyklus styrer hvilke tiltak som lønner seg: innovasjons-investering i introduksjonsfasen, distribusjonsvekt i vekstfasen, kostnadskutt i modningen, exit-strategi i tilbakegang.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Porteføljematriser
        </h2>
        <p style={bodyText}>
          BCG-matrisen klassifiserer produkter som stjerner (vekst+stor andel), spørsmålstegn (vekst+liten andel), melkekyr (stabilt+stor andel) og hunder (lavt på begge). Strategi: melk kuene, dyrk stjernene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Porteføljematriser" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Sortimentstrategi" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sortimentstrategi
        </h2>
        <p style={bodyText}>
          Bredde (antall produktgrupper) vs. dybde (varianter innen gruppe). Fokus = smal og dyp, full-line = bred og dyp, butikk = bred og grunn. Strategien må følge kundens forventning.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Merkevarearkitektur
        </h2>
        <p style={bodyText}>
          Hvordan produktene grupperes under merkenavn. House of Brands (P&G — egne navn per produkt) vs. Branded House (Microsoft — alt heter Microsoft). Hybrid-løsninger er vanlige.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Merkevarearkitektur" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Innovasjon" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Innovasjon
        </h2>
        <p style={bodyText}>
          Inkrementell innovasjon (forbedre eksisterende) vs. radikal (helt nytt). Inkrementell er billig og lavrisiko, radikal er dyr men kan forandre bransjer (iPhone, Tesla, Netflix).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Open Innovation
        </h2>
        <p style={bodyText}>
          Hente innovasjonskraft utenfra — kunder, akademia, oppstartsbedrifter. Procter & Gamble sitt «Connect+Develop»-program henter inn tusenvis av eksterne ideer i året, og lanserer flere av dem som suksessprodukter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Open Innovation" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Ettermarked og tjenestetilbud" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Ettermarked og tjenestetilbud
        </h2>
        <p style={bodyText}>
          Service, vedlikehold, oppgraderinger og forbruksmateriell. Rolls-Royce tjener mer på vedlikehold av flymotorer enn på selve motorene. Ettermarkedet er ofte mer lønnsomt enn førstesalget.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Apple iPhone-økosystemet
        </h2>
        <p style={bodyText}>
          iPhone selger godt — men det virkelige tjenestelivet ligger i App Store, iCloud, Apple Music, AppleCare og Apple Pay. Hver iPhone-bruker genererer abonnementsinntekter i mange år. Det er strategisk porteføljebygging.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Apple iPhone-økosystemet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 8 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er strategisk produktledelse viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Strategisk produktledelse handler om å bygge en portefølje som gir både nåværende inntjening (melkekyr) og fremtidig vekst (stjerner) — samtidig. Det er kunsten å holde mange baller i lufta over tid.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er en \'melkeku\' i BCG-matrisen?',
  options: [
    'Et produkt med høy vekst og lav markedsandel',
    'Et produkt med lav vekst og høy markedsandel — gir stabil inntjening',
    'Et produkt som ikke selger',
    'Et produkt for landbruk',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på inkrementell og radikal innovasjon?',
  options: [
    'Inkrementell er billig, radikal er dyr men kan forandre bransjer',
    'Inkrementell er for små bedrifter, radikal for store',
    'Inkrementell er for produkt, radikal for tjeneste',
    'De er det samme',
  ],
  correct: 0,
  timeSeconds: 45,
},
{
  question: 'Hva er Open Innovation?',
  options: [
    'Innovasjon i åpne kontorlandskap',
    'Hente innovasjonskraft utenfra — kunder, akademia, startups',
    'Patentert teknologi som er gratis',
    'Konkurranse mellom designere',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function ProduktstrategiAvansertPresentation() {
        return (
          <PresentationShell
            presentationName="Produktstrategi (avansert)"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Produkt-"
    titleLine2="strategi"
            subtitle="Strategisk produktledelse — PLC, sortiment, innovasjon og porteføljeteknikk på VG3-nivå."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
