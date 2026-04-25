      /**
       * ENT2 · EB2 — Kapittel 12: Forretningsutvikling og skalering
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
          Fra produkt til plattform
        </h2>
        <p style={bodyText}>
          Hvordan skape økosystemer rundt produktet. Apple er ikke bare en mobilprodusent — App Store, iCloud, AirPods, Apple Watch danner et økosystem som gjør det dyrt for kunden å bytte.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Fra produkt til plattform" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Forretningsmodell-innovasjon" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Forretningsmodell-innovasjon
        </h2>
        <p style={bodyText}>
          Endre måten man tjener penger på. Microsoft pivoterte fra produktsalg (Office-pakker) til abonnement (Microsoft 365). Adobe gjorde det samme med Creative Cloud. Modellen ble mer lønnsom og predikerbar.
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
          Nettverkseffekter
        </h2>
        <p style={bodyText}>
          Verdien av tjenesten øker med antall brukere. Facebook uten venner = ubrukelig. Med 1 milliard brukere = uomgåelig. Klassiske nettverkseffekter: telefoner, sosiale medier, markedsplasser.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Nettverkseffekter" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Grip sjansene" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Grip sjansene
        </h2>
        <p style={bodyText}>
          Evnen til å utnytte endringer i markedet eller teknologien. Når COVID kom, økte Zoom fra 10 til 300 millioner brukere på fire måneder. Beredskap til å skalere RASKT er en konkurransefordel — én du ikke kan kjøpe.
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
          Lean Scale-up
        </h2>
        <p style={bodyText}>
          Behold smidigheten fra oppstartsfasen når bedriften blir stor. Spotify, Amazon og Google har alle bevisste systemer for å unngå byråkrati — autonome team, tydelige beslutningsmandater, raske eksperimenter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Lean Scale-up" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Internasjonal skalering" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Internasjonal skalering
        </h2>
        <p style={bodyText}>
          Utfordringer ved å flytte modellen til nye land. Oppvasksåpe selger likt overalt, finansielle tjenester må tilpasses hvert lands lovverk. Modellen må ofte bryte ned og bygges opp på nytt for hvert land.
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
          Automatisering
        </h2>
        <p style={bodyText}>
          Bruk av teknologi for å fjerne flaskehalser i veksten. Når salget tidobles, kan kundeservicen ikke tidobles — den må automatiseres. Chatbots, self-service, AI er ikke valgfritt for vekstbedrifter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Automatisering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Kultur for vekst" />
      <div>
        <SlideLabel>Kapittel 12 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kultur for vekst
        </h2>
        <p style={bodyText}>
          Ansette folk som trives i endring og høyt tempo. Statiske «vi har alltid gjort det slik»-personer er forutsigbare, men passer dårlig i bedrifter som vokser 50–100 % i året.
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
          Case — Kahoots vei til 1 milliard brukere
        </h2>
        <p style={bodyText}>
          Kahoot vokste fra norsk skoleprogram til global edtech på under 10 år. Nøkkel: produkt som spredte seg viralt (lærere viste hverandre), automatisert kundeservice, og bevisst kulturbygging i takt med ansettelser.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Kahoots vei til 1 milliard brukere" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 12 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva krever skalering?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Skalering krever systemer, ikke bare hardt arbeid. Hvis bedriften kan tidobles bare ved at gründerne jobber tre ganger hardere, er ikke modellen skalerbar — det er bare hardt arbeid.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er nettverkseffekter?',
  options: [
    'At bedriften har mange ansatte',
    'Verdien av tjenesten øker med antall brukere',
    'Antall sosiale medier-kontoer',
    'At bedriften har mange leverandører',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva karakteriserer \'Lean Scale-up\'?',
  options: [
    'Streng kostnadskontroll',
    'Behold smidighet og raske beslutninger selv når bedriften blir stor',
    'Lavere lønninger',
    'Færre ansatte',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor er automatisering viktig for vekstbedrifter?',
  options: [
    'Det er billigere enn ansatte',
    'Når salget tidobles, kan ikke kundeservice tidobles — automatisering fjerner flaskehalser',
    'Det imponerer investorer',
    'Det er på mote',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function ForretningsutviklingSkaleringPresentation() {
        return (
          <PresentationShell
            presentationName="Forretningsutvikling og skalering"
            subjectLabel="ENT2 · EB2"
            titleLine1="Forretnings-"
    titleLine2="utvikling"
            subtitle="Optimalisering for vekst — fra produkt til plattform, automatisering og kultur for endring."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
