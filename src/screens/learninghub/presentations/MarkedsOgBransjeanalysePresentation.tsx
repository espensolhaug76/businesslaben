      /**
       * ML2 · Visjon 2 — Kapittel 3: Markeds- og bransjeanalyse
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
        <SlideLabel>Kapittel 3 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Porters fem krefter
        </h2>
        <p style={bodyText}>
          Modell for å analysere bransjens attraktivitet og lønnsomhetspotensial. Jo sterkere kreftene er, jo lavere er typisk fortjeneste. Modellen tvinger frem en strukturert vurdering av konkurranselandskapet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Porters fem krefter" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kraft 1: Rivalisering" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kraft 1: Rivalisering
        </h2>
        <p style={bodyText}>
          Hvor hardt kjemper de eksisterende bedriftene mot hverandre? Mange like aktører + lav vekst = priskrig og lave marginer. Få aktører + høy differensiering = bedre lønnsomhet.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kraft 2: Nyetablerere
        </h2>
        <p style={bodyText}>
          Hvor høye er barrierene for å starte opp i bransjen? Lave inngangsbarrierer (web-startups) gir konstant trussel om nye konkurrenter. Høye barrierer (oljeleting, banker) beskytter etablerte aktører.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Kraft 2: Nyetablerere" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kraft 3: Substitutter" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kraft 3: Substitutter
        </h2>
        <p style={bodyText}>
          Finnes det helt andre produkter som løser samme behov? Hjemmelaget mat er substitutt til restaurant. Sykling er substitutt til buss. Substitutter setter et tak på hva du kan ta i pris.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kraft 4: Leverandørmakt
        </h2>
        <p style={bodyText}>
          Kan leverandørene presse oss på pris eller kvalitet? Få store leverandører = stor leverandørmakt (chip-produksjon). Mange små leverandører = lav leverandørmakt (frukt og grønt).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Kraft 4: Leverandørmakt" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Kraft 5: Kundemakt" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kraft 5: Kundemakt
        </h2>
        <p style={bodyText}>
          Kan kundene presse oss på pris eller kreve mer service? Store kunder med mange alternativer (NorgesGruppen mot småprodusenter) = stor kundemakt. Små, fragmenterte kunder = lav kundemakt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategiske grupper
        </h2>
        <p style={bodyText}>
          Bedrifter i samme bransje som følger like strategier. SAS, Norwegian og KLM er én gruppe. Lavprisselskaper som Wizz Air og Ryanair er en annen. De konkurrerer mest innenfor sin gruppe.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Strategiske grupper" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Bransjeglidning" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Bransjeglidning
        </h2>
        <p style={bodyText}>
          Når bransjer smelter sammen. Bank og forsikring (DNB selger forsikring), telekom og medier (Telenor + TV2-eierskap), tech og bil (Apple Car-prosjektet). Skaper både muligheter og trusler.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Norsk dagligvare
        </h2>
        <p style={bodyText}>
          Tre kjeder kontrollerer 96 % av norsk dagligvarehandel: NorgesGruppen, Coop, REMA 1000. Lav rivalisering (få aktører), enorme inngangsbarrierer, høy kundemakt for kjedene mot leverandørene. Strukturen forklarer hvorfor norske matpriser er som de er.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Norsk dagligvare" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 3 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva forteller bransjeanalysen oss?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Bransjeanalysen forteller oss om vi kan tjene penger over tid i denne bransjen. Sterke krefter = vanskelig å være lønnsom. Svake krefter = lukrativ posisjon.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hvor mange krefter er det i Porters modell?',
  options: [
    'Tre',
    'Fire',
    'Fem',
    'Syv',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva er et substitutt?',
  options: [
    'En billigere kopi av samme produkt',
    'Et helt annet produkt som løser samme behov',
    'Et produkt fra konkurrenten',
    'Et produkt som er forbudt',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er bransjeglidning?',
  options: [
    'Når en bransje krymper i størrelse',
    'Når bransjer smelter sammen — bank+forsikring, telekom+medier',
    'Når bedrifter flytter til utlandet',
    'Når en bransje blir ulønnsom',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MarkedsOgBransjeanalysePresentation() {
        return (
          <PresentationShell
            presentationName="Markeds- og bransjeanalyse"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Markeds-"
    titleLine2="og bransjeanalyse"
            subtitle="Konkurransekreftene — Porters fem krefter og verktøyene som forteller om bransjen kan tjene penger over tid."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
