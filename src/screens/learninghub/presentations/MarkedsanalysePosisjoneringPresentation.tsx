      /**
       * ENT2 · EB2 — Kapittel 13: Markedsanalyse og posisjonering
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
        <SlideLabel>Kapittel 13 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Konkurrentanalyse (Porter)
        </h2>
        <p style={bodyText}>
          Porters fem konkurransekrefter bestemmer lønnsomheten i bransjen: rivalisering, nyetablerere, substitutter, leverandørmakt, kundemakt. Sterke krefter = lave marginer for alle aktører.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Konkurrentanalyse (Porter)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Posisjonskart (perceptual mapping)" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Posisjonskart (perceptual mapping)
        </h2>
        <p style={bodyText}>
          Visualiser hvor merket ligger i forhold til konkurrenter på to dimensjoner — typisk pris og kvalitet, eller tradisjonell vs. moderne. Avdekker ledige posisjoner i markedet.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Blue Ocean Strategy
        </h2>
        <p style={bodyText}>
          Finn markeder uten konkurranse i stedet for å slåss i 'rødt hav'. Cirque du Soleil reinvented sirkus uten dyr og med teaterelementer — ny posisjon, ingen direkte konkurrenter, høyere marginer.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Blue Ocean Strategy" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kundereisen (Customer Journey)" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kundereisen (Customer Journey)
        </h2>
        <p style={bodyText}>
          Kartlegg alle kontaktpunkter kunden har med bedriften: fra første eksponering i sosiale medier til kjøp, oppfølging og gjenkjøp. Hvert kontaktpunkt er en mulighet til å løfte eller miste opplevelsen.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Big Data og analyse
        </h2>
        <p style={bodyText}>
          Bruk store datamengder for å forstå trender og atferd. Spotifys 'Discover Weekly' bygger på milliarder av lyttehandlinger. Den som har data, har innsikt — og den som har innsikt, har konkurransefortrinn.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Big Data og analyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="B2B-markedsføring" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          B2B-markedsføring
        </h2>
        <p style={bodyText}>
          Strategier for salg til andre bedrifter krever forståelse av DMU (Decision Making Unit), lange beslutningsprosesser og personlige relasjoner. Account-Based Marketing (ABM) er moderne tilnærming.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Brand Equity (merkeverdi)
        </h2>
        <p style={bodyText}>
          Den økonomiske verdien av merkenavnet. Coca-Cola-merket alene er verdsatt til over 80 milliarder dollar. Sterke merker gir prising-makt, kundelojalitet og inngangsbarrierer for konkurrenter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Brand Equity (merkeverdi)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Omnikanal-strategi" />
      <div>
        <SlideLabel>Kapittel 13 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Omnikanal-strategi
        </h2>
        <p style={bodyText}>
          Sømløs opplevelse på tvers av nett, mobil og fysisk butikk. Kunden starter på Instagram, fortsetter på nettside, henter i butikk, returnerer via post. Krever integrert IT, lager og kundeservice.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 13 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Apple sin Blue Ocean i smartklokker
        </h2>
        <p style={bodyText}>
          Da Apple Watch ble lansert, fantes det smartklokker — men de var teknologi-fokuserte og maskuline. Apple posisjonerte seg som mote- og helse-produkt, fanget en ny kundegruppe (kvinner, mote-bevisste). Resultat: dominerer kategorien de selv definerte.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Apple sin Blue Ocean i smartklokker" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 13 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er strategisk posisjonering?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Posisjonering handler om å eie et ord i kundens bevissthet. Volvo = sikkerhet. Tesla = innovasjon. IKEA = rimelig design. Én tydelig posisjon slår «alt for alle» hver gang.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er Blue Ocean Strategy?',
  options: [
    'Strategier for marin industri',
    'Finne markeder uten konkurranse i stedet for å slåss i \'rødt hav\'',
    'Eksport til havlandene',
    'En miljøvennlig strategi',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en kundereise (Customer Journey)?',
  options: [
    'Kundens fysiske reise til butikken',
    'Kartlegging av alle kontaktpunkter kunden har med bedriften',
    'En ferie sponset av bedriften',
    'Kundens årlige forbruksvaner',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er kjernen i strategisk posisjonering?',
  options: [
    'Å være billigst',
    'Å eie et ord i kundens bevissthet — ett tydelig konsept',
    'Å ha størst markedsandel',
    'Å selge mest mulig',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MarkedsanalysePosisjoneringPresentation() {
        return (
          <PresentationShell
            presentationName="Markedsanalyse og posisjonering"
            subjectLabel="ENT2 · EB2"
            titleLine1="Avansert"
    titleLine2="markedsanalyse"
            subtitle="Dypere innsikt i markedet — Porter, Blue Ocean og kundereisen som strategiske verktøy."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
