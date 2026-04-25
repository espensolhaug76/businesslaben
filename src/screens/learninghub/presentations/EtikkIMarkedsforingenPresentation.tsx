      /**
       * ML2 · Visjon 2 — Kapittel 6: Etikk i markedsføringen
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
        <SlideLabel>Kapittel 6 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etiske dilemmaer
        </h2>
        <p style={bodyText}>
          Situasjoner der det ikke finnes ett enkelt rett svar. Skal du selge sukkerholdig brus til barn? Akseptere en lukrativ leverandøravtale med tvilsomme arbeidsforhold? Etikk handler om å reflektere før du beslutter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Etiske dilemmaer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Lovlighet vs. moral" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lovlighet vs. moral
        </h2>
        <p style={bodyText}>
          Selv om noe er lovlig, kan det være uetisk. Spillselskaper opererer innenfor loven, men kan utnytte spillavhengighet. Etisk lederskap krever ofte at man går lenger enn loven krever.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Produktetikk
        </h2>
        <p style={bodyText}>
          Farlige produkter, overdreven emballasje, planlagt foreldelse. Produsenter som med vilje gjør telefoner vanskelig å reparere, eller bygger inn slitasje for å tvinge frem nyt kjøp, kritiseres stadig oftere.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Produktetikk" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Prisetikk" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Prisetikk
        </h2>
        <p style={bodyText}>
          Prissamarbeid (karteller) er forbudt. Like alvorlig: utnyttelse av kunders nød — sterkt prisstigning av nødvendighetsvarer i krise (smittevernutstyr, drivstoff under naturkatastrofer) gir omdømmetap.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kommunikasjonsetikk
        </h2>
        <p style={bodyText}>
          Kroppspress, urealistiske idealer og skjult reklame. Influencere som ikke merker betalt innhold, photoshoppede kropper i klesreklame, og manipulerende nøkkeltall i finansreklame er alle etiske gråsoner.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjonsetikk" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Digital etikk" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Digital etikk
        </h2>
        <p style={bodyText}>
          Bruk av data, overvåking og algoritmer som manipulerer. Sosiale medier-plattformer kan bevisst optimere for engasjement på bekostning av brukernes velvære. AI-genererte deepfakes utfordrer hva som er sant.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etisk beslutningsmodell
        </h2>
        <p style={bodyText}>
          Et navigasjonsverktøy: Er det lovlig? Er det rettferdig? Tåler det dagens lys i media? Vil jeg være stolt av valget om 10 år? Hvis ett av svarene er nei, bør valget revurderes.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Etisk beslutningsmodell" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Whistleblowing" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Whistleblowing
        </h2>
        <p style={bodyText}>
          Kulturen for å si fra om uetiske forhold internt. Norge har lov om varsling som beskytter ansatte mot represalier. Gode bedrifter har etablerte kanaler for varsling — uten frykt for konsekvenser.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Cambridge Analytica
        </h2>
        <p style={bodyText}>
          Brukerdata fra 87 millioner Facebook-profiler ble brukt uten samtykke til politisk profilering i USA-valget 2016. Saken ble vendepunkt for personvern globalt og førte til strengere regler i mange land — og GDPR i EU.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Cambridge Analytica" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 6 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor lønner etikk seg?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Langsiktig lønnsomhet krever en høy etisk standard. Sosiale medier har gjort all uetisk atferd potensielt offentlig — én skandale kan ødelegge merkevarekapital bygget over tiår.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er forskjellen på lovlighet og moral?',
  options: [
    'De er det samme',
    'Noe kan være lovlig, men likevel uetisk',
    'Lovlighet gjelder bedrifter, moral gjelder personer',
    'Moral kreves av loven',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva betyr \'planlagt foreldelse\'?',
  options: [
    'At produkter skal være tidløse',
    'At produsenten med vilje bygger inn slitasje for å tvinge frem nyt kjøp',
    'At eldre folk får rabatt',
    'At produkter blir resirkulert',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er whistleblowing?',
  options: [
    'Reklame i radio',
    'En type konkurranse mellom bedrifter',
    'Å si fra om uetiske forhold internt — beskyttet av loven i Norge',
    'En markedsføringsteknikk',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function EtikkIMarkedsforingenPresentation() {
        return (
          <PresentationShell
            presentationName="Etikk i markedsføringen"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Etikk"
            subtitle="Rett og galt i markedet — etiske dilemmaer i produkter, priser, kommunikasjon og data."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
