      /**
       * ENT2 · EB2 — Kapittel 18: Bedriftens samfunnsansvar (CSR) og etikk
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
        <SlideLabel>Kapittel 18 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Triple Bottom Line (dypdykk)
        </h2>
        <p style={bodyText}>
          Profit, People, Planet integrert i strategien. Ikke et CSR-vedlegg, men en del av forretningsmodellen. Patagonia, Unilever og Tomra har alle bygget hele selskaper på TBL-prinsipper.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Triple Bottom Line (dypdykk)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Interessentmodellen (Stakeholder)" />
      <div>
        <SlideLabel>Kapittel 18 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Interessentmodellen (Stakeholder)
        </h2>
        <p style={bodyText}>
          Hvordan balansere kravene fra eiere, ansatte, kunder, lokalsamfunn og miljø. Klassisk shareholder-fokus (kun aksjonærer) kritiseres; stakeholder-modellen ser bedrifter som del av en bredere kontrakt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 18 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          FNs Bærekraftsmål (strategisk)
        </h2>
        <p style={bodyText}>
          Velg ut 2–4 mål bedriften faktisk kan påvirke vesentlig. Ikke alle 17 — det blir uforpliktende. Equinor fokuserer på mål 7 (energi) og 13 (klima); Tomra på mål 12 (ansvarlig forbruk).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="FNs Bærekraftsmål (strategisk)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Etiske dilemmaer i ledelse" />
      <div>
        <SlideLabel>Kapittel 18 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etiske dilemmaer i ledelse
        </h2>
        <p style={bodyText}>
          Når økonomiske hensyn krasjer med moralske verdier. Skal vi ta en lukrativ ordre fra et autoritært regime? Akseptere kortsiktig forurensing for å vinne nybygg? Etiske rammeverk hjelper med strukturert vurdering.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 18 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Grønnvasking og omdømme
        </h2>
        <p style={bodyText}>
          Risikoen ved å ikke være ekte i sitt samfunnsansvar. Forbrukertilsynet og kunder gjennomskuer raskere enn før — én avsløring kan ødelegge årevis med merkebygging.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Grønnvasking og omdømme" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Etiske retningslinjer (Code of Conduct)" />
      <div>
        <SlideLabel>Kapittel 18 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etiske retningslinjer (Code of Conduct)
        </h2>
        <p style={bodyText}>
          Bedriftens egne kjøreregler for ansatte og leverandører. Forbud mot korrupsjon, gaver over visse verdier, interessekonflikter. Skriftlig dokumentasjon er beskyttelse hvis problemer oppstår.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 18 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sosialt entreprenørskap
        </h2>
        <p style={bodyText}>
          Bedrifter der samfunnsmålet er viktigere enn økonomisk profitt. Allmenn Praksis (lavterskel helse), Skobi (jobbskaping for utsatte unge), Nordic Choice Hotels (rehabilitering gjennom hotellarbeid). Profitt finansierer formålet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Sosialt entreprenørskap" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Transparens og rapportering" />
      <div>
        <SlideLabel>Kapittel 18 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Transparens og rapportering
        </h2>
        <p style={bodyText}>
          ESG-rapportering (Environmental, Social, Governance) blir lovkrav i EU fra 2024. Bedrifter må dokumentere klimagassutslipp, mangfold, lønnsforskjeller, korrupsjonstiltak. Slutten på frivillig CSR-rapportering.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 18 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Patagonia gir bort selskapet
        </h2>
        <p style={bodyText}>
          I 2022 overførte Yvon Chouinard hele Patagonia (verdt 3 milliarder dollar) til en stiftelse som finansierer miljøkamp. «Earth is now our only shareholder». Ekstremt eksempel på TBL-integrering — fortjenesten brukes til formålet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Patagonia gir bort selskapet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 18 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor lønner ansvarlighet seg?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Ansvarlighet er en forutsetning for langsiktig lønnsomhet. Investorer (ESG-fond), kunder (yngre generasjoner), ansatte (verdidrevet rekruttering) og lovverk (EU-direktiv) presser alle i samme retning.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er ESG-rapportering?',
  options: [
    'Et type regnskap',
    'Environmental, Social, Governance — blir lovkrav i EU fra 2024',
    'European Securities Group',
    'Earnings, Salary, Growth',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er sosialt entreprenørskap?',
  options: [
    'Å være sosial på jobb',
    'Bedrifter der samfunnsmålet er viktigere enn økonomisk profitt',
    'Markedsføring i sosiale medier',
    'Aktivisme i bedrifter',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor lønner ansvarlighet seg på lang sikt?',
  options: [
    'Loven krever det alene',
    'Investorer, kunder, ansatte og lovverk presser alle i samme retning — ansvarlighet er forutsetning for overlevelse',
    'Det er gratis',
    'Konkurrentene gjør det',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function CsrEtikkPresentation() {
        return (
          <PresentationShell
            presentationName="Bedriftens samfunnsansvar (CSR) og etikk"
            subjectLabel="ENT2 · EB2"
            titleLine1="CSR"
    titleLine2="og etikk"
            subtitle="Ansvar for helheten — Triple Bottom Line, interessentmodellen og ESG-rapportering for vekstbedriften."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
