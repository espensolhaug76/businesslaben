      /**
       * ML1 · Visjon 1 — Kapittel 14: Markedsføringens lovverk og etikk
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
        <SlideLabel>Kapittel 14 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Markedsføringsloven
        </h2>
        <p style={bodyText}>
          Den sentrale loven for hva som er lov i reklame og salg. Forbyr urimelig handelspraksis, villedende reklame og aggressive metoder. Forbrukertilsynet håndhever loven.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Markedsføringsloven" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="God markedsføringsskikk" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          God markedsføringsskikk
        </h2>
        <p style={bodyText}>
          Reklamen skal ikke stride mot allmenne etiske og moralske verdier. Reklame som spiller på frykt, kroppspress eller utnyttelse av sårbare grupper kan være lovlig — men er sjelden god.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Angrerettloven
        </h2>
        <p style={bodyText}>
          Kunden har rett til å returnere varen innen 14 dager når kjøpet skjedde utenom fast utsalgssted (nett, telefonsalg, dørsalg). Bedriften må informere tydelig om angreretten — ellers utvides fristen til 12 måneder.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Angrerettloven" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="E-handelsloven" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          E-handelsloven
        </h2>
        <p style={bodyText}>
          Krav om informasjon på nettside: foretaksnavn, adresse, kontaktinfo, MVA-nummer. Klare bestillingsregler. Bekreftelse skal sendes umiddelbart etter kjøp. Brudd kan gi bøter og pålegg.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Åpenhetsloven
        </h2>
        <p style={bodyText}>
          Krever at norske virksomheter dokumenterer kontroll med menneskerettigheter og anstendige arbeidsforhold i hele leverandørkjeden. Forbrukere kan be om innsyn — bedriften må svare innen 3 uker.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Åpenhetsloven" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Beskyttelse av barn" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Beskyttelse av barn
        </h2>
        <p style={bodyText}>
          Spesielt strenge regler mot reklame rettet mot barn og unge under 18. Forbud mot å bruke barn til å påvirke foreldrenes kjøp. Reklame for usunn mat, alkohol og spill mot mindreårige er sterkt regulert.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Grønnvasking
        </h2>
        <p style={bodyText}>
          Det er ulovlig å lyve om miljøgevinster eller bruke vage, ikke-dokumenterte miljøpåstander. Forbrukertilsynet har slått ned på flyselskaper, bilprodusenter og klesmerker som bruker «klimanøytral» uten dokumentasjon.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Grønnvasking" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Samfunnsansvar (CSR)" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Samfunnsansvar (CSR)
        </h2>
        <p style={bodyText}>
          Å gå lenger enn loven krever for å bidra positivt til samfunnet. Investering i lokalsamfunn, forbedring av leverandørkjede, frivillige miljøtiltak. Drives ofte av kunde- og medarbeiderforventninger, ikke krav.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 14 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — SAS og «klimanøytral flyvning»
        </h2>
        <p style={bodyText}>
          Forbrukertilsynet slo ned på SAS for påstander om «klimanøytrale» flyvninger som var basert på CO2-kompensasjon, ikke faktiske utslippskutt. Saken viser at grønne påstander må være konkrete, dokumenterte og målbare — ellers er det grønnvasking.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — SAS og «klimanøytral flyvning»" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 14 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor lønner det seg å være etisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Etisk drift bygger omdømme; uetisk drift ødelegger det for alltid. Sosiale medier har gjort hver bedrift transparent — det som gjøres i mørket, kommer raskt frem i lyset.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hvor lang er angrefristen ved kjøp på nett i Norge?',
  options: [
    '7 dager',
    '14 dager',
    '30 dager',
    '12 måneder',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva regulerer Åpenhetsloven?',
  options: [
    'Personvern på nett',
    'Kontroll av menneskerettigheter i leverandørkjeden',
    'Reklame mot barn',
    'Pris og avgifter',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er grønnvasking?',
  options: [
    'Å vaske produkter med miljøvennlige midler',
    'Å lyve eller bruke vage, ikke-dokumenterte miljøpåstander',
    'Å sertifisere et produkt som økologisk',
    'Å redusere energiforbruket i butikken',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MarkedsforingsLovverkEtikkPresentation() {
        return (
          <PresentationShell
            presentationName="Markedsføringens lovverk og etikk"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Lov"
    titleLine2="og etikk"
            subtitle="Spillereglene i markedet — fra markedsføringsloven til grønnvasking og samfunnsansvar."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
