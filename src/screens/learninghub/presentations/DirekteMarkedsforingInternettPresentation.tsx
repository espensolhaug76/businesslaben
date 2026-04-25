      /**
       * ML1 · Visjon 1 — Kapittel 13: Direkte markedsføring og internett
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
          Direkte markedsføring (DM)
        </h2>
        <p style={bodyText}>
          Kommunikasjon sendt rett til en identifisert person — e-post, SMS, push-varsel. Krever samtykke etter GDPR for personlige data, men er presist og målbart når det er gjort riktig.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Direkte markedsføring (DM)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="SEO — Søkemotoroptimalisering" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          SEO — Søkemotoroptimalisering
        </h2>
        <p style={bodyText}>
          Gjøre seg fortjent til å ligge øverst på Google (organisk treff). Krever god innhold, teknisk fungerende nettside og lenker fra andre nettsteder. Resultatene tar måneder, men holder lenge.
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
          SEM — Søkemotormarkedsføring
        </h2>
        <p style={bodyText}>
          Betale for synlighet på spesifikke søkeord. Du betaler bare når noen klikker (CPC). Resultatet er øyeblikkelig — men forsvinner samme dag du slutter å betale.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="SEM — Søkemotormarkedsføring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Innholdsmarkedsføring" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Innholdsmarkedsføring
        </h2>
        <p style={bodyText}>
          Skape verdi gjennom artikler, videoer, podkaster og veiledere. «Hjelp, ikke selg» — bygg autoritet og tillit over tid. DnB sin Magma-blogg og Equinor sin Energi-podkast er eksempler.
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
          Sosiale medier
        </h2>
        <p style={bodyText}>
          Dialog og samhandling, ikke monolog. Kunden kan svare, kritisere, dele og kjøpe direkte i samme kanal. Krever tilstedeværelse og evne til å håndtere både ros og ris i sanntid.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Sosiale medier" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Konvertering (CRO)" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Konvertering (CRO)
        </h2>
        <p style={bodyText}>
          Conversion Rate Optimization — gjøre besøkende om til betalende kunder. A/B-testing av knapper, farger, tekst, layout. Små endringer kan gi store utslag — en bedre «Kjøp»-knapp kan øke salget med 20 %.
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
          Big data og algoritmer
        </h2>
        <p style={bodyText}>
          Bruk av store datamengder for å forutse hva kunden vil ha. Spotifys forslag, Netflix sine anbefalinger, TikToks feed — alle er drevet av algoritmer som lærer fra adferd.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Big data og algoritmer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="GDPR og personvern" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          GDPR og personvern
        </h2>
        <p style={bodyText}>
          EU og Norge har strenge regler for innsamling og bruk av personopplysninger. Krav om samtykke, retten til innsyn og sletting, plikt til å melde datainnbrudd innen 72 timer. Brudd kan gi 4 % av global omsetning i bot.
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
          Case — Algoritmen som ble for god
        </h2>
        <p style={bodyText}>
          Da det amerikanske Target sendte babyklær-tilbud til en jente, ringte den sinte faren og spurte hva som foregikk. Det viste seg at hun var gravid — algoritmen hadde regnet det ut basert på endrede kjøpsmønstre, før faren visste det. Personvern ble plutselig veldig konkret.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Algoritmen som ble for god" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 13 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva har internett gjort med markedsføring?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Internett har flyttet makten fra bedriften til kunden. Kunden kan sammenligne priser, lese anmeldelser, dele opplevelser og bytte leverandør med ett klikk. Bedrifter må fortjene oppmerksomhet — ikke kjøpe seg til den.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er forskjellen på SEO og SEM?',
  options: [
    'SEO er gratis, SEM er betalt søkesynlighet',
    'SEO er for B2B, SEM for B2C',
    'De er to navn på samme ting',
    'SEO er kun for nettbutikker',
  ],
  correct: 0,
  timeSeconds: 45,
},
{
  question: 'Hva betyr CRO?',
  options: [
    'Customer Retention Office',
    'Conversion Rate Optimization — gjøre besøkende til kunder',
    'Content Rating Organization',
    'Click Response Operation',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvor raskt må et datainnbrudd meldes til Datatilsynet etter GDPR?',
  options: [
    'Samme dag',
    'Innen 72 timer',
    'Innen en uke',
    'Innen 30 dager',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function DirekteMarkedsforingInternettPresentation() {
        return (
          <PresentationShell
            presentationName="Direkte markedsføring og internett"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Digital"
    titleLine2="markedsføring"
            subtitle="En-til-en-kommunikasjon — internett har flyttet makten fra bedriften til kunden."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
