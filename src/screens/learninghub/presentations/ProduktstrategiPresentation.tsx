      /**
       * ML1 · Visjon 1 — Kapittel 7: Konkurransemiddelet Produkt
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
        <SlideLabel>Kapittel 7 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Tre produktnivåer
        </h2>
        <p style={bodyText}>
          Kjerneproduktet er behovet kunden løser (du kjøper ikke en bor — du kjøper et hull i veggen). Det konkrete produktet er selve varen. Det utvidede produktet er service, garanti og opplevelse rundt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Tre produktnivåer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Produktets livssyklus (PLC)" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Produktets livssyklus (PLC)
        </h2>
        <p style={bodyText}>
          Alle produkter går gjennom fire faser: introduksjon (lavt salg, høye kostnader), vekst (rask økning), modning (stabilt og lønnsomt), tilbakegang (fall). Ulike strategier passer i hver fase.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sortiment
        </h2>
        <p style={bodyText}>
          Bredde er antall produktgrupper (Nestlé har sjokolade, kaffe og dyrefôr). Dybde er varianter innen samme gruppe (Nescafé har Gold, Original, Espresso). Bredde og dybde må balanseres mot kapasitet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Sortiment" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Merkevarebygging" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Merkevarebygging
        </h2>
        <p style={bodyText}>
          Brand equity er den ekstra verdien navnet tilfører produktet. To identiske skjorter — den ene med Lacoste-logoen koster 1500 kr, den andre fra No Brand 200 kr. Forskjellen er ren merkevare.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Emballasje
        </h2>
        <p style={bodyText}>
          Emballasje har tre roller: beskytte (gjøre transport mulig), informere (innhold, opphav, bruk) og selge (den «tause selgeren» i butikkhylla). Emballasjedesign er strategi, ikke pynt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Emballasje" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Innovasjon" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Innovasjon
        </h2>
        <p style={bodyText}>
          Helt nye løsninger. Kan være produktinnovasjon (ny vare), prosessinnovasjon (ny måte å lage på) eller markedsinnovasjon (ny måte å selge på). Apple har ofte gjort alle tre samtidig.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Service og ettermarked
        </h2>
        <p style={bodyText}>
          Hva skjer etter at kunden har betalt? Gode opplevelser etter kjøpet sikrer lojalitet og gjenkjøp. Tesla bruker bilens app som ettermarked — software-oppdateringer holder bilen «ny» i flere år.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Service og ettermarked" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Kvalitetsstyring" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kvalitetsstyring
        </h2>
        <p style={bodyText}>
          Sikre at produktet lever opp til kundens forventninger hver gang. ISO-sertifisering, kvalitetskontroller og kundetilbakemelding. Én dårlig opplevelse kan ødelegge mange års merkebygging.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — iPhone-livssyklus
        </h2>
        <p style={bodyText}>
          Hver iPhone-modell går gjennom hele PLC-en på ett år. Lansering med stor markedsføring, vekst gjennom høst-julehandelen, modning ved nyttår og tilbakegang når neste modell annonseres. Apple planlegger livssyklusen som en del av strategien.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — iPhone-livssyklus" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 7 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er produktet fundamentet?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Uten et produkt som faktisk gir verdi til kunden, hjelper ingen mengde reklame. Strategi handler om å bygge produkter folk vil ha — så er resten av markedsmiksen distribusjon, kommunikasjon og pris.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er kjerneproduktet?',
  options: [
    'Selve den fysiske varen',
    'Behovet kunden faktisk vil ha dekket',
    'Garantien som følger med',
    'Emballasjen',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er de fire fasene i produktets livssyklus?',
  options: [
    'Idé, prototyp, salg, levering',
    'Introduksjon, vekst, modning, tilbakegang',
    'Planlegging, produksjon, salg, evaluering',
    'Forskning, utvikling, lansering, oppfølging',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er brand equity?',
  options: [
    'Bedriftens egenkapital',
    'Antall kunder bedriften har',
    'Den verdien navnet tilfører produktet utover det fysiske',
    'Produktets pris i butikken',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function ProduktstrategiPresentation() {
        return (
          <PresentationShell
            presentationName="Konkurransemiddelet Produkt"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Produktet"
            subtitle="Konseptutvikling og merkevare — fundamentet i markedsmiksen. Uten verdi her hjelper ingen reklame."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
