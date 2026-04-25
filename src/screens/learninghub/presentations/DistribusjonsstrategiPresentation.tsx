      /**
       * ML1 · Visjon 1 — Kapittel 9: Konkurransemiddelet Distribusjon
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
        <SlideLabel>Kapittel 9 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hva er distribusjon?
        </h2>
        <p style={bodyText}>
          Distribusjon handler om å gjøre varen tilgjengelig på rett sted, til rett tid, i rett mengde. Hvis kunden ikke kan få tak i den når hun vil ha den, betyr alt det andre lite.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er distribusjon?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kanalvalg" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kanalvalg
        </h2>
        <p style={bodyText}>
          Direkte distribusjon: produsent selger rett til sluttkunde (Tesla, Apple Store). Indirekte distribusjon: salget går via mellomledd (Coca-Cola → REMA 1000 → kunde). Trade-off mellom kontroll og rekkevidde.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Mellomleddenes rolle
        </h2>
        <p style={bodyText}>
          Grossister og detaljister forenkler logistikk og samler sortiment. Uten dem måtte hver kunde forhandle direkte med hver produsent — totalt kaos. Mellomleddet forsvinner sjelden, men endrer form.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Mellomleddenes rolle" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Distribusjonsgrad" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Distribusjonsgrad
        </h2>
        <p style={bodyText}>
          Intensiv: overalt (tyggegummi, Coca-Cola). Selektiv: utvalgte butikker (Levi's, Apple). Eksklusiv: kun få utvalgte (Rolex, Hermès). Distribusjonsgraden må passe merkevarens posisjonering.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Fysisk distribusjon
        </h2>
        <p style={bodyText}>
          Lagerstyring, ordbehandling og transportvalg. Effektivitet her kan være konkurransefortrinn (Amazons ettdagslevering, IKEA-flatpakke). Logistikk er ofte usynlig — men avgjørende.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Fysisk distribusjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Beliggenhet" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Beliggenhet
        </h2>
        <p style={bodyText}>
          Fysiske butikker står og faller på beliggenhet. Makrobeliggenhet er hvilken by/bydel. Mikrobeliggenhet er hvilken side av gata, hvilken etasje i kjøpesenteret. Begge teller.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Digital distribusjon
        </h2>
        <p style={bodyText}>
          Nettbutikker og omnikanal-løsninger som «click & collect» har vokst eksplosivt. Kunden forventer å kunne starte handlingen på mobil, fortsette på PC og hente i butikk — sømløst.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Digital distribusjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Makt i kanalen" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Makt i kanalen
        </h2>
        <p style={bodyText}>
          Hvem styrer? Tidligere produsenten (Tine bestemte hvilke meieri-produkter butikken fikk). Nå kjedene (NorgesGruppen, Coop, REMA). Kjedene har egne merkevarer (First Price) og truer produsentenes posisjon.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Tesla uten forhandlere
        </h2>
        <p style={bodyText}>
          Tesla solgte direkte fra dag én — ingen bilforhandlere, kun nettbutikk og noen showrooms. Dette gir full kontroll over pris, opplevelse og kundedata. Tradisjonelle bilprodusenter har slitt med å kopiere modellen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Tesla uten forhandlere" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 9 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva oppnår god distribusjon?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Distribusjonen bygger bro mellom produksjon og forbruk. Den avgjør om kunden faktisk får produktet i hånda — og dermed om all annen markedsføringsinnsats er bortkastet eller verdifull.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er forskjellen på direkte og indirekte distribusjon?',
  options: [
    'Direkte er raskere, indirekte er tregere',
    'Direkte selger rett til sluttkunde, indirekte går via mellomledd',
    'Direkte er kun for nettbutikker',
    'Direkte er kun for B2B',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva betyr eksklusiv distribusjon?',
  options: [
    'Produktet er for dyrt for vanlige folk',
    'Salget skjer kun via få utvalgte forhandlere',
    'Produktet selges kun på nett',
    'Bedriften har monopol',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvem har vanligvis mest makt i den norske dagligvarekjeden i dag?',
  options: [
    'Produsentene (TINE, Orkla)',
    'Forbrukerne',
    'De store kjedene (NorgesGruppen, Coop, REMA)',
    'Det offentlige',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function DistribusjonsstrategiPresentation() {
        return (
          <PresentationShell
            presentationName="Konkurransemiddelet Distribusjon"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Distribusjon"
            subtitle="Tilgjengelighet og logistikk — produktet må være på rett sted, til rett tid, i rett mengde."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
