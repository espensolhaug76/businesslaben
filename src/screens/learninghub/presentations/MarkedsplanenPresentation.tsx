      /**
       * ML2 · Visjon 2 — Kapittel 17: Markedsplanen
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
        <SlideLabel>Kapittel 17 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hva er en markedsplan?
        </h2>
        <p style={bodyText}>
          Et styringsdokument som samler analyse, mål og tiltak for ett år. Brukt riktig: kompass og målbevis for hele organisasjonen. Brukt feil: et dokument i en skuff ingen leser.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er en markedsplan?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Situasjonsanalysen (SWOT)" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Situasjonsanalysen (SWOT)
        </h2>
        <p style={bodyText}>
          Hvor er vi nå? Indre arbeidsbetingelser (styrker/svakheter), ytre arbeidsbetingelser (muligheter/trusler). Grunnlaget for alle videre valg — uten ærlig analyse blir resten skinnplanlegging.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Målsetting
        </h2>
        <p style={bodyText}>
          Hvor skal vi? SMART-mål (Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt). «Øke markedsandelen i Trondheim fra 12 % til 18 % innen 31.12» er SMART. «Vokse litt» er det ikke.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Målsetting" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Strategivalg (STP)" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategivalg (STP)
        </h2>
        <p style={bodyText}>
          Hvem skal vi satse på, og hvordan skille oss ut? Valg av segmenter, målgruppestrategi (udifferensiert/differensiert/konsentrert), posisjonering. Strategien er broen mellom mål og tiltak.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Handlingsplan (markedsmiksen)
        </h2>
        <p style={bodyText}>
          Hva skal vi gjøre konkret? Detaljert beskrivelse av tiltak innen produkt, pris, plass, kommunikasjon (og folk i tjenestebedrifter). Hvert tiltak må knyttes til ansvarlig person og frist.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Handlingsplan (markedsmiksen)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Budsjett" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Budsjett
        </h2>
        <p style={bodyText}>
          Hva vil det koste, og hva forventer vi å tjene? Kostnader per tiltak. Forventet inntekts-effekt. ROI-beregning. Ledelsen vil se tall — ikke bare ord.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Oppfølging og kontroll
        </h2>
        <p style={bodyText}>
          Hvordan skal vi måle om vi lykkes? KPI-er definert per mål. Rapporteringsfrekvens (månedlig/kvartalsvis). Hvem rapporterer hva til hvem. Avviksanalyse: hvorfor ble det annerledes enn planlagt?
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Oppfølging og kontroll" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Implementering" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Implementering
        </h2>
        <p style={bodyText}>
          Hvordan få planen ut i livet og engasjere organisasjonen? Internkommunikasjon, opplæring, ansvarsfordeling. Mange planer dør fordi de aldri kommer ut av møterommet og inn i hverdagen.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Tine sin årlige markedsplan
        </h2>
        <p style={bodyText}>
          Tine lager årlig markedsplan med konkrete mål per produktkategori (yoghurt, ost, drikke). Hver plan inkluderer historisk analyse, markedsmål, kampanjeplaner, lanseringer og budsjett. Følges opp månedlig — og avvik utløser konkrete tiltak.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Tine sin årlige markedsplan" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 17 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er markedsplanen så viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Markedsplanen er det viktigste verktøyet for en markedsleder. Den binder strategi til handling, gir alle samme retning, og gjør markedsføring til forretningsdisiplin — ikke kreativ aktivitet.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er hovedhensikten med en markedsplan?',
  options: [
    'Å imponere ledelsen',
    'Et styringsdokument som samler analyse, mål og tiltak for én periode',
    'Å erstatte regnskapet',
    'Å øke reklamebudsjettet',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er SMART-mål?',
  options: [
    'Smarte ideer fra ledelsen',
    'Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt',
    'Strategi, Marked, Aktivitet, Resultat, Tiltak',
    'Salg, Markedsføring, Administrasjon, Regnskap, Tilbakemelding',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor mislykkes mange markedsplaner?',
  options: [
    'De er for korte',
    'De er for ambisiøse',
    'De kommer aldri ut av møterommet og inn i hverdagen',
    'De har for høye budsjetter',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function MarkedsplanenPresentation() {
        return (
          <PresentationShell
            presentationName="Markedsplanen"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Markeds-"
    titleLine2="planen"
            subtitle="Veikartet til suksess — det styringsdokumentet som binder sammen analyse, mål, strategi, tiltak og budsjett."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
