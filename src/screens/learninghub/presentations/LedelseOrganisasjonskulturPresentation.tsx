      /**
       * ENT2 · EB2 — Kapittel 14: Ledelse og organisasjonskultur
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
        <SlideLabel>Kapittel 14 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Situasjonsbestemt ledelse
        </h2>
        <p style={bodyText}>
          Hersey og Blanchards modell: tilpass lederstil etter oppgave og medarbeiderens modenhet. En ny medarbeider trenger instruks; en erfaren trenger autonomi. Samme leder må kunne begge.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Situasjonsbestemt ledelse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Transformasjonsledelse" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Transformasjonsledelse
        </h2>
        <p style={bodyText}>
          Inspirere og motivere ansatte til å nå felles visjoner og endring. Steve Jobs, Nelson Mandela, Margrete Vestager — ledere som endret bransjer, land eller globale regler gjennom inspirasjon, ikke ordre.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Bedriftskultur som konkurransefortrinn
        </h2>
        <p style={bodyText}>
          Peter Drucker: «Culture eats strategy for breakfast». Sterk kultur gjør strategien gjennomførbar. Apple, Patagonia og Google har bygget sin suksess like mye på kultur som på produkt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Bedriftskultur som konkurransefortrinn" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Teamledelse i vekst" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Teamledelse i vekst
        </h2>
        <p style={bodyText}>
          Hvordan lede team når de blir mange og komplekse. 1 leder kan effektivt lede 7–10 personer. Når bedriften vokser til 100, må ledere lede ledere — helt annet ferdighetsbehov.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Makt og innflytelse
        </h2>
        <p style={bodyText}>
          Ulike typer makt i organisasjonen: posisjonsmakt (formell rolle), ekspertmakt (kunnskap), referansemakt (personlig respekt), belønningsmakt (kontroll over goder). De beste lederne kombinerer flere typer.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Makt og innflytelse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Beslutningsprosesser" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Beslutningsprosesser
        </h2>
        <p style={bodyText}>
          Rasjonelle beslutninger (analyse, faktagrunnlag, tid til å vurdere) vs. intuitive (magefølelse, raske valg under usikkerhet). Erfaring gjør intuisjon mer pålitelig — men kan også gi blindsoner.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lederens emosjonelle intelligens (EQ)
        </h2>
        <p style={bodyText}>
          Daniel Golemans fem komponenter: selvbevissthet, selvkontroll, motivasjon, empati og sosiale ferdigheter. Forskning viser at EQ er viktigere enn IQ for lederprestasjon over tid.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Lederens emosjonelle intelligens (EQ)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="HR-strategi" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          HR-strategi
        </h2>
        <p style={bodyText}>
          Planlegging av fremtidig kompetansebehov. Hvilke ferdigheter trenger vi om 3 år? Hvor henter vi dem? Hvordan beholder vi nøkkeltalentene? Strategiske spørsmål som ikke kan løses akutt — krever 2–5 års horisont.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Hurtigrutens kulturreise
        </h2>
        <p style={bodyText}>
          Hurtigruten endret seg fra ren ferge-leverandør til premium-cruiseselskap. Krevde fundamental endring av kultur (fra 'vi er ferje' til 'vi er opplevelse'). Tok år med opplæring, rekruttering og lederskifte før kulturen kom på plass.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Hurtigrutens kulturreise" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 14 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er kjernen i god ledelse?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        En leders viktigste jobb er å få frem det beste i andre. Mål kan ikke nås av lederen alene — det er gjennom å mobilisere, utvikle og frigjøre andre at strategi blir resultat.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er kjernen i situasjonsbestemt ledelse?',
  options: [
    'Lederen bytter rolle ofte',
    'Tilpass lederstil etter oppgave og medarbeiderens modenhet',
    'Bare i krisesituasjoner',
    'En spesiell type ledelseskurs',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvilke fem komponenter har emosjonell intelligens (EQ) ifølge Goleman?',
  options: [
    'Pris, produkt, plass, promosjon, person',
    'Selvbevissthet, selvkontroll, motivasjon, empati, sosiale ferdigheter',
    'Mål, strategi, tiltak, kontroll, evaluering',
    'Tenke, føle, handle, snakke, lytte',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sa Peter Drucker om kultur?',
  options: [
    'Kultur er overvurdert',
    'Culture eats strategy for breakfast — kultur slår strategi',
    'Kultur kan kjøpes',
    'Kultur har ingen effekt',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function LedelseOrganisasjonskulturPresentation() {
        return (
          <PresentationShell
            presentationName="Ledelse og organisasjonskultur"
            subjectLabel="ENT2 · EB2"
            titleLine1="Strategisk"
    titleLine2="ledelse"
            subtitle="Styre skuta gjennom storm — situasjonsledelse, transformasjonsledelse og kultur som konkurransefortrinn."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
