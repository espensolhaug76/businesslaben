      /**
       * ENT2 · EB2 — Kapittel 19: Internasjonalisering og eksport
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
        <SlideLabel>Kapittel 19 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hvorfor internasjonalisere?
        </h2>
        <p style={bodyText}>
          Markedsvekst (Norge er begrenset til 5,5 millioner), stordriftsfordeler (mer salg uten proporsjonal kostnadsøkning), tilgang på ressurser (kompetanse, råvarer, kapital). For å vokse mer enn 100x må de fleste norske bedrifter ut.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hvorfor internasjonalisere?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Etableringsstrategier (strategisk)" />
      <div>
        <SlideLabel>Kapittel 19 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etableringsstrategier (strategisk)
        </h2>
        <p style={bodyText}>
          Fra lavt til høyt engasjement: eksport (selg fra Norge), lisensiering (selg rettighetene), franchising (la andre drive), Joint Venture (sammen med lokal partner), heleid datterselskap (full kontroll, full risiko).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 19 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kulturell forståelse
        </h2>
        <p style={bodyText}>
          Hofstedes dimensjoner: maktavstand, individualisme/kollektivisme, maskulinitet/femininitet, usikkerhetsunngåelse, langtidsorientering. Norge skiller seg sterkt fra Asia på flere dimensjoner — som påvirker både salgssamtaler og lederstil.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Kulturell forståelse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Global markedsmiks" />
      <div>
        <SlideLabel>Kapittel 19 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Global markedsmiks
        </h2>
        <p style={bodyText}>
          Standardisering vs. lokal tilpasning ('Glocal'). McDonald's bruker samme branding overalt, men har lokale produkter (McSpicy Paneer i India, Rejmyre Burger i Sverige). Hybridtilnærming dominerer.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 19 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Logistikk og toll
        </h2>
        <p style={bodyText}>
          Incoterms (internasjonale leveransestandarder), tollbarrierer (varierer per land), handelsavtaler (EØS gir Norge full markedsadgang i EU). Toll og avgifter kan utgjøre 20–40 % av varens pris i nye markeder.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Logistikk og toll" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Internasjonal prising" />
      <div>
        <SlideLabel>Kapittel 19 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Internasjonal prising
        </h2>
        <p style={bodyText}>
          Valutasvingninger (kronen styrker = norsk eksport blir dyrere), prisdumping (selge under selvkost — ofte ulovlig), transfer pricing (interne priser mellom datterselskaper — strengt skattemessig regulert).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 19 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Digital internasjonalisering
        </h2>
        <p style={bodyText}>
          Bruk av netthandel for å nå globale kunder raskt. Shopify, Amazon, Etsy gjør det mulig å selge til 100 land uten lokale kontorer. Digital eksport vokser raskere enn tradisjonell.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Digital internasjonalisering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Risiko ute" />
      <div>
        <SlideLabel>Kapittel 19 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Risiko ute
        </h2>
        <p style={bodyText}>
          Politisk risiko (regimer endres, eiendeler kan eksproprieres), korrupsjon (nødvendig i noen markeder, ulovlig hjemme), juridiske forskjeller (kontrakter kan være verdiløse i visse land). Forsikringer mot disse finnes (GIEK, Atradius).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 19 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Norwegians USA-satsing
        </h2>
        <p style={bodyText}>
          Norwegian satset hardt på lavprisflyvninger til USA. Manglende lokalkunnskap, hard konkurranse, valutarisiko og pandemi førte til konkurs i 2020. Lærdom: lokal innsikt og finansiell bærekraft må være på plass før internasjonal vekst.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Norwegians USA-satsing" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 19 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er internasjonalisering vanskelig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Verden er ett marked, men med mange lokale sannheter. Det som virker hjemme er ikke automatisk overførbart — kulturen, kjøpsadferden og konkurransen er alltid annerledes. Ydmykhet er en strategisk dyd.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr \'Glocal\' markedsmiks?',
  options: [
    'Kun global standardisering',
    'Kombinasjon av global standardisering og lokal tilpasning',
    'Kun lokal tilpasning',
    'Kun for Globale konsern',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er Hofstedes dimensjoner brukt til?',
  options: [
    'Beregne valuta',
    'Forstå kulturelle forskjeller mellom land — maktavstand, individualisme osv.',
    'Måle BNP',
    'Finne nye markeder',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er Incoterms?',
  options: [
    'Et IT-system',
    'Internasjonale standarder for leveransebetingelser i internasjonal handel',
    'Tollavgifter',
    'En type valuta',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function InternasjonaliseringEksportPresentation() {
        return (
          <PresentationShell
            presentationName="Internasjonalisering og eksport"
            subjectLabel="ENT2 · EB2"
            titleLine1="Ut"
    titleLine2="i verden"
            subtitle="Global ekspansjon — etableringsstrategier, kultur og digitale veier til nye markeder."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
