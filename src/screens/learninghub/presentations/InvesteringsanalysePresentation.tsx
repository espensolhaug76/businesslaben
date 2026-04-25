      /**
       * ENT2 · EB2 — Kapittel 16: Investeringsanalyse og lønnsomhet
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
        <SlideLabel>Kapittel 16 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Tidsverdien av penger
        </h2>
        <p style={bodyText}>
          100 kr i dag er verdt mer enn 100 kr om ett år — fordi du kan investere dagens 100 kr og få mer tilbake. Diskonteringsrenten reflekterer både inflasjon og alternativ avkastning.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Tidsverdien av penger" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Nåverdimetoden (NPV)" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Nåverdimetoden (NPV)
        </h2>
        <p style={bodyText}>
          Beregn om fremtidige innbetalinger forsvarer investeringen i dag. Diskonter alle fremtidige kontantstrømmer tilbake til nåverdi, trekk fra investeringen. Positiv NPV = lønnsomt prosjekt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Internrentemetoden (IRR)
        </h2>
        <p style={bodyText}>
          Finn den renten som gir NPV = 0. Sammenlign med kapitalkostnaden — IRR over kapitalkostnad betyr lønnsomhet. Eksempel: IRR 18 %, kapitalkostnad 8 % → 10 % verdiskaping per år.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Internrentemetoden (IRR)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Tilbakebetalingsmetoden (Payback)" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Tilbakebetalingsmetoden (Payback)
        </h2>
        <p style={bodyText}>
          Hvor lang tid tar det før vi får pengene tilbake? Enkel og populær, men ignorerer tidsverdien og kontantstrømmer etter payback-tidspunktet. Brukes ofte som første sortering.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Risiko og kravavkastning
        </h2>
        <p style={bodyText}>
          Jo høyere risiko, jo høyere avkastning krever vi. Statsobligasjoner: 3 % (lav risiko). Aksjefond: 7–10 %. Venture capital: 25 %+. Risikopremien kompenserer for usikkerheten.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Risiko og kravavkastning" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Følsomhetsanalyse" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Følsomhetsanalyse
        </h2>
        <p style={bodyText}>
          Hva skjer hvis salget blir 10 % lavere enn forventet? Eller råvareprisene 20 % høyere? Test prosjektet under verre scenarioer — robuste prosjekter holder seg lønnsomme også under negative forutsetninger.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Investering i immaterielle verdier
        </h2>
        <p style={bodyText}>
          Regne på lønnsomhet av FoU, merkevare og kompetanse. Vanskeligere enn maskiner og bygninger, men ofte mer lønnsomt. Apples investering i merkevarebygging gir høyere avkastning enn investeringer i fabrikker.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Investering i immaterielle verdier" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Avskrivninger" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Avskrivninger
        </h2>
        <p style={bodyText}>
          Hvordan fordele kostnaden av en maskin over levetiden. En maskin på 1 million med 10 års levetid avskrives med 100 000 per år. Påvirker både regnskap og skatt — men ikke kontantstrøm.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Equinors Johan Sverdrup-felt
        </h2>
        <p style={bodyText}>
          Equinor brukte detaljert investeringsanalyse for Johan Sverdrup-feltet — en investering på over 100 milliarder kroner. NPV-modellen viste lønnsomhet ved oljepriser ned til 25 dollar per fat (terskelpris). Sikkerhetsmargin gjorde prosjektet robust.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Equinors Johan Sverdrup-felt" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 16 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva gir investeringsanalyse?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Bruk tall for å fjerne følelser fra tunge investeringsvalg. Magefølelse er nyttig for hverdagsbeslutninger, men 100-millionersbeslutninger må kunne forsvares med modeller — ikke bare karisma.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr NPV?',
  options: [
    'Net Profit Volume',
    'Net Present Value — nåverdi av fremtidige kontantstrømmer minus investering',
    'New Product Verification',
    'National Production Value',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sier en positiv NPV?',
  options: [
    'Prosjektet skal kanselleres',
    'Prosjektet er lønnsomt — verdier skapes',
    'Prosjektet trenger mer kapital',
    'Risikoen er for høy',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor er payback-metoden populær men ufullstendig?',
  options: [
    'Den er for komplisert',
    'Enkel å forstå, men ignorerer tidsverdien og kontantstrømmer etter payback-tidspunktet',
    'Den krever kun én beregning',
    'Loven krever den',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function InvesteringsanalysePresentation() {
        return (
          <PresentationShell
            presentationName="Investeringsanalyse og lønnsomhet"
            subjectLabel="ENT2 · EB2"
            titleLine1="Investerings-"
    titleLine2="analyse"
            subtitle="Er det verdt pengene? NPV, internrente og payback som beslutningsverktøy for store investeringer."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
