      /**
       * ML2 · Visjon 2 — Kapittel 9: Prisstrategier (avansert)
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
        <SlideLabel>Kapittel 9 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Prisens rolle i strategien
        </h2>
        <p style={bodyText}>
          Pris er mer enn en prislapp — det er et signal om verdi, posisjonering og målgruppe. Premium-pris signaliserer kvalitet (selv om kvaliteten er den samme), lavpris signaliserer tilgjengelighet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Prisens rolle i strategien" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kalkulasjonsmetoder" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kalkulasjonsmetoder
        </h2>
        <p style={bodyText}>
          Selvkostmetoden (alle kostnader + påslag) og bidragsmetoden (variable kostnader + dekningsbidrag). Selvkost passer for langsiktige beslutninger, bidragsmetoden for kortsiktige (skal vi ta neste ordre?).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Priselastisitet og volum
        </h2>
        <p style={bodyText}>
          Finn «the sweet spot» mellom pris og antall solgte. Senker du prisen 10 % og selger 30 % mer, øker omsetningen — men ikke alltid lønnsomheten. Marginal-analyse er nødvendig.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Priselastisitet og volum" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Skumming vs. inntrenging" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Skumming vs. inntrenging
        </h2>
        <p style={bodyText}>
          Skumming: høy startpris, høyt dekningsbidrag, fokus på premium-kunder. Inntrenging: lav startpris for å vinne markedsandel raskt og bygge nettverkseffekter. Apple skummer, Spotify trenger inn.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Yield Management
        </h2>
        <p style={bodyText}>
          Dynamisk prising basert på sanntidsdata om etterspørsel. Flyselskaper, hoteller og leiebiler bruker det — samme rom kan koste 800 kr én natt og 3000 kr neste. Maksimerer inntekt per enhet kapasitet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Yield Management" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Avansert prisdifferensiering" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Avansert prisdifferensiering
        </h2>
        <p style={bodyText}>
          Ulik pris til ulike grupper basert på betalingsvilje. Studentrabatter, seniorpriser, geografisk prising (samme tjeneste i Norge dyrere enn i Polen), tidspriser (matinéer billigere enn kveldskino).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Psykologisk prissetting
        </h2>
        <p style={bodyText}>
          Terskeleffekter (199 vs 200), ankring (en dyr versjon i menyen får mellomprisen til å virke billig), bundling (3 for 99 kr), lokkeffekt (en åpenbart dårlig deal får alternativene til å virke gode).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Psykologisk prissetting" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Pris som konkurransefortrinn" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Pris som konkurransefortrinn
        </h2>
        <p style={bodyText}>
          Kostnadslederskap (Porter): bli den billigste i bransjen ved å ha lavest kostnadsstruktur. Krever skala og effektivitet. Eksempel: Ryanair, IKEA, Amazon. Få bransjer kan ha mer enn én reell kostnadsleder.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Norwegian sin prisstrategi
        </h2>
        <p style={bodyText}>
          Norwegian bruker dynamisk prising på flybilletter. Samme rute kan koste 99 kr én dag og 4990 kr neste — basert på etterspørselsdata. Resultat: høyere belegg på fly enn tradisjonelle selskaper, men også uforutsigbarhet for kundene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Norwegian sin prisstrategi" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 9 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er pris så strategisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Pris er det konkurransemiddelet som påvirker bunnlinjen raskest. 1 % høyere pris = ofte 5–10 % høyere overskudd. Ingen annen variabel har samme direkte effekt — derfor er prisstrategi alltid et toppledelses-tema.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er Yield Management?',
  options: [
    'En metode for høsting i landbruket',
    'Dynamisk prising basert på sanntidsdata om etterspørsel',
    'En modell for ansatt-belønning',
    'Et kostnadssystem',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva kjennetegner skummestrategi?',
  options: [
    'Lav startpris for å vinne markedsandel raskt',
    'Høy startpris, høyt dekningsbidrag, fokus på premium-kunder',
    'Samme pris i alle kanaler',
    'Pris som varierer per kunde',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor er pris så viktig for bunnlinjen?',
  options: [
    'Kunder bryr seg mest om pris',
    '1 % høyere pris gir ofte 5–10 % høyere overskudd — ingen annen variabel har samme effekt',
    'Det er enklest å endre',
    'Loven krever det',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function PrisstrategiAvansertPresentation() {
        return (
          <PresentationShell
            presentationName="Prisstrategier (avansert)"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Pris-"
    titleLine2="strategi"
            subtitle="Pris som strategisk styringsverktøy — verdibasert prising, dynamiske modeller og prisdiskriminering."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
