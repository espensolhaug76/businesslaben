      /**
       * ML1 · Visjon 1 — Kapittel 15: Organisering av markedsføringen
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
        <SlideLabel>Kapittel 15 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hvorfor organisere?
        </h2>
        <p style={bodyText}>
          Fordeling av oppgaver, ansvar og myndighet. Uten klar struktur ender alle med å gjøre litt av alt — eller ingenting. God organisering er broen mellom strategi og resultat.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hvorfor organisere?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Funksjonell organisering" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Funksjonell organisering
        </h2>
        <p style={bodyText}>
          Delt etter fag: Marked, Økonomi, HR, IT. Enkelt og spesialisert — men «siloer» kan oppstå når avdelinger ikke snakker sammen. Passer for små og mellomstore bedrifter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Produktbasert organisering
        </h2>
        <p style={bodyText}>
          Egne avdelinger for hver produktgruppe. Orkla har egne ledere for sjokolade, frosne måltider og dagligvare. Hver gruppe kan optimere for sitt marked, men kan dublere ressurser.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Produktbasert organisering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Markedsbasert organisering" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Markedsbasert organisering
        </h2>
        <p style={bodyText}>
          Egne team for B2C, B2B og det offentlige. Hver gruppe har spesialisert innsikt i sin kundetype. Brukes mye av store IT- og finansbedrifter (DnB har egne team for privat, bedrift og offentlig).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Linje- og stabsorganisasjon
        </h2>
        <p style={bodyText}>
          Linjen er de operative som leverer (selgere, butikkmedarbeidere). Staben er eksperter som støtter (jurister, analytikere, designere). Klart skille mellom hvem som beslutter og hvem som rådgir.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Linje- og stabsorganisasjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Prosjektorganisering" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Prosjektorganisering
        </h2>
        <p style={bodyText}>
          Midlertidig gruppe satt sammen for å løse en spesifikk oppgave — f.eks. lansering av nytt produkt eller en stor kampanje. Folk lånes fra ulike avdelinger og går tilbake når prosjektet er ferdig.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Bedriftskultur
        </h2>
        <p style={bodyText}>
          De felles verdiene som preger hvordan ansatte jobber. «Vi gjør slik fordi det er sånn vi alltid har gjort det.» Sterk kultur kan være konkurransefortrinn — eller en bremsekloss for endring.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Bedriftskultur" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Endringsledelse" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Endringsledelse
        </h2>
        <p style={bodyText}>
          Evnen til å tilpasse organisasjonen til nye markedskrav. Krever god kommunikasjon, tydelig visjon og tålmodighet. De fleste endringsprogrammer mislykkes fordi de undervurderer den menneskelige siden.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Tine sin omorganisering
        </h2>
        <p style={bodyText}>
          Tine omorganiserte fra produksjonsorientering til markedsorientering på 2010-tallet. Egne team ble bygget rundt forbruker (yoghurt, ost), foodservice (restauranter) og industri. Resultat: raskere innovasjon og bedre tilpasning til hvert markedssegment.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Tine sin omorganisering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 15 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er den riktige organiseringen?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Riktig organisering er broen mellom strategi og resultat. Det finnes ikke én løsning som passer alle — strukturen må følge strategien, og endres når strategien endres.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er funksjonell organisering?',
  options: [
    'Hver kunde har egen ansvarlig',
    'Bedriften deles etter fag — Marked, Økonomi, HR, IT',
    'Kun ledelsen tar beslutninger',
    'Alle gjør alt',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på linje og stab?',
  options: [
    'Linje er for produksjon, stab er for salg',
    'Linjen er operative som leverer, staben er eksperter som støtter',
    'Linje er fast ansatt, stab er konsulenter',
    'Det er to navn på samme ting',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor mislykkes mange endringsprogrammer?',
  options: [
    'De koster for mye penger',
    'De undervurderer den menneskelige siden',
    'De har for små mål',
    'De er for raskt utført',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function OrganiseringMarkedsforingPresentation() {
        return (
          <PresentationShell
            presentationName="Organisering av markedsføringen"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Organisering"
            subtitle="Struktur for gjennomføring — hvordan bedriften organiserer markedsfunksjonen for å sette strategi ut i praksis."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
