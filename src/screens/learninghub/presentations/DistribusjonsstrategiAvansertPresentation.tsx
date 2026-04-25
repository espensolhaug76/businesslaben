      /**
       * ML2 · Visjon 2 — Kapittel 10: Distribusjonsstrategier (avansert)
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
        <SlideLabel>Kapittel 10 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Verdikjeden
        </h2>
        <p style={bodyText}>
          Fra råvare til ferdig produkt i kundens hånd. Porters verdikjedeanalyse identifiserer hvor verdien skapes — og hvor det kan effektiviseres. Hver etappe er en mulighet for konkurransefortrinn.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Verdikjeden" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kanalvalg og kontroll" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kanalvalg og kontroll
        </h2>
        <p style={bodyText}>
          Direkte salg gir høy kontroll (pris, opplevelse, data) men lav rekkevidde. Indirekte salg gir lav kontroll men stor rekkevidde. Strategisk valg basert på merkeposisjonering og produkttype.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Maktbalansen i kanalen
        </h2>
        <p style={bodyText}>
          Tidligere produsentdominans (Tine bestemte hvilke produkter butikken fikk). Nå kjededominans (NorgesGruppen forhandler ned priser, krever hyllepenger). Detaljistmakt har omformet hele norsk dagligvare.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Maktbalansen i kanalen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Distribusjonsgrad" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Distribusjonsgrad
        </h2>
        <p style={bodyText}>
          Strategisk valg: intensiv (overalt — Coca-Cola, tyggegummi), selektiv (utvalgte forhandlere — Levis, Apple), eksklusiv (kun få utvalgte — Rolex, Tesla). Distribusjonsgraden må passe merkets posisjon.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Supply Chain Management (SCM)
        </h2>
        <p style={bodyText}>
          Integrert styring av hele forsyningskjeden — fra leverandør til sluttkunde. SAP, Oracle og Salesforce leverer SCM-systemer som kan spore en vare gjennom 50 ledd og fem land i sanntid.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Supply Chain Management (SCM)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Omnikanal-strategi" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Omnikanal-strategi
        </h2>
        <p style={bodyText}>
          Sømløs kundeopplevelse på tvers av alle plattformer. Kunden starter handlingen på mobil, fortsetter på PC, henter i butikk, returnerer via post. Krever integrert IT-system, lager og kundeservice.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Fysisk logistikk
        </h2>
        <p style={bodyText}>
          Effektivitet som konkurransefortrinn. Amazon sin én-dagers-levering, IKEA sin flatpakke, Zalando sin gratis returrett — alle er logistikk-revolusjoner som har endret hva kundene forventer.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Fysisk logistikk" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Internasjonal distribusjon" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Internasjonal distribusjon
        </h2>
        <p style={bodyText}>
          Agenter, importører, joint ventures, datterselskaper. Lange kjeder gir høyere kostnader og mindre kontroll. Nye markeder krever ofte lokale partnere som forstår kultur, lover og forhandlingsskikker.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Amazon sin logistikkrevolusjon
        </h2>
        <p style={bodyText}>
          Amazon brukte over 100 milliarder dollar på logistikk for å etablere én-dags-levering. Dette skaper en uoverkommelig barriere for konkurrenter. Walmart, Target og andre må følge med — eller miste markedet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Amazon sin logistikkrevolusjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 10 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er distribusjon strategisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Distribusjon handler om å vinne kampen om hylleplassen og kundens tid. I et marked med hundretusener av produkter er tilgjengelighet selve forskjellen mellom å eksistere og å ikke eksistere for kunden.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er omnikanal?',
  options: [
    'Salg kun via TV',
    'Sømløs kundeopplevelse på tvers av alle plattformer (mobil, PC, butikk)',
    'Salg av tyggegummi i alle butikker',
    'Internasjonal distribusjon',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvem har mest makt i den norske dagligvarekjeden i dag?',
  options: [
    'Produsentene (TINE, Orkla)',
    'Forbrukerne via apper',
    'De store kjedene (NorgesGruppen, Coop, REMA)',
    'Det offentlige',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva betyr SCM?',
  options: [
    'Sales Channel Management',
    'Supply Chain Management — integrert styring av forsyningskjeden',
    'Strategic Customer Marketing',
    'Single Channel Method',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function DistribusjonsstrategiAvansertPresentation() {
        return (
          <PresentationShell
            presentationName="Distribusjonsstrategier (avansert)"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Distribusjons-"
    titleLine2="strategi"
            subtitle="Makt og tilgjengelighet — fra verdikjeden via omnikanal til plattformøkonomi."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
