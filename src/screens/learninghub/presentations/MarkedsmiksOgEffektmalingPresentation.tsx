      /**
       * ML2 · Visjon 2 — Kapittel 12: Markedsmiks og effektmåling
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
          Synergieffekter
        </h2>
        <p style={bodyText}>
          1 + 1 kan bli 3. Når produkt, pris, plass og kommunikasjon virker sammen, blir totaleffekten større enn summen av delene. Apple er paradigmet: produktet, prisen, butikkene og kommunikasjonen forsterker hverandre.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Synergieffekter" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Markedsplanen som styringsverktøy" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Markedsplanen som styringsverktøy
        </h2>
        <p style={bodyText}>
          Det dokumentet som holder alt sammen. Skal binde sammen mål, strategi, taktikk, budsjett og oppfølging. En markedsplan på 200 sider som ingen leser er verdiløs — én side som alle handler etter er gull.
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
          Hvorfor måle?
        </h2>
        <p style={bodyText}>
          Læring (hva virker?), kontroll (er vi på sporet?), bevis (legitimerer markedsføringsbudsjettet for ledelsen). Uten måling er markedsføring magi — med måling er det forretningsdisiplin.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Hvorfor måle?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjonseffekt" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kommunikasjonseffekt
        </h2>
        <p style={bodyText}>
          Ble vi husket? (recall, recognition). Endret vi holdninger? (preferanse, sympati). Brand tracking-undersøkelser måler dette over tid. Tar måneder å se utslag — men resultatene er strategiske.
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
          Salgseffekt
        </h2>
        <p style={bodyText}>
          Hvor mye økte omsetningen direkte? ROAS (Return on Ad Spend) er nøkkeltallet for digitale kampanjer. ROAS 3.0 betyr at hver krone i annonser ga 3 kroner i salg.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Salgseffekt" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="ROI i markedsføring" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          ROI i markedsføring
        </h2>
        <p style={bodyText}>
          Avkastning på investert markedskapital. Total inntekt fra kampanjen minus alle kostnader (inkludert internt arbeid), delt på kostnadene. Hvis ROI er 30 %, er hver krone investert verdt 1,30.
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
          Digital sporing (Analytics)
        </h2>
        <p style={bodyText}>
          Følg kunden fra første klikk til ferdig kjøp. Google Analytics, Hubspot, Mixpanel. Multi-touch attribution — hvilken annonse, hvilken e-post, hvilket sosial medieinnlegg førte til salget? Sjelden bare én.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Digital sporing (Analytics)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Feilkilder ved måling" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Feilkilder ved måling
        </h2>
        <p style={bodyText}>
          Sesong (julehandel ≠ januarsalg), konkurrenter (deres kampanjer påvirker dine resultater), eksterne sjokk (pandemi, krig, valuta). Tolking krever fagforståelse, ikke bare tallene.
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
          Case — H&M og effektmåling
        </h2>
        <p style={bodyText}>
          H&M kombinerer salgsdata med Google Analytics for å se hvilke produkter som responderer på hvilke kampanjer i hvilke land. Resultat: dynamiske kampanjer som tilpasses i sanntid — produkter som selger godt får mer reklame.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — H&M og effektmåling" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 12 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er kontrollfasen viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Kontrollfasen er starten på neste planleggingsperiode. Læring fra forrige runde bygger inn i neste års strategi — det er hvordan markedsføring vokser fra håndverk til vitenskap.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr ROAS?',
  options: [
    'Rate of Annual Sales',
    'Return on Ad Spend — avkastning per annonsekrone',
    'Rate of Average Service',
    'Risk of Average Sales',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en synergieffekt i markedsmiksen?',
  options: [
    'Når kostnadene øker',
    'Når 1 + 1 blir 3 — produktet, prisen, plassen og kommunikasjonen forsterker hverandre',
    'Når flere bedrifter slår seg sammen',
    'Når reklamen blir billigere',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor måler man markedsføringseffekt?',
  options: [
    'Loven krever det',
    'For læring, kontroll og bevis for ledelsen',
    'Det er en akademisk øvelse',
    'For å konkurrere med andre bedrifter',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MarkedsmiksOgEffektmalingPresentation() {
        return (
          <PresentationShell
            presentationName="Markedsmiks og effektmåling"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Markedsmiks"
    titleLine2="og effektmåling"
            subtitle="Synergi og resultater — KPI, ROI, ROAS og analytics som gjør markedsføringen målbar."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
