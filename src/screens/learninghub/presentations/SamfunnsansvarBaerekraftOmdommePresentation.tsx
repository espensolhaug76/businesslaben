      /**
       * ML2 · Visjon 2 — Kapittel 5: Samfunnsansvar, bærekraft og omdømme
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
        <SlideLabel>Kapittel 5 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Triple Bottom Line
        </h2>
        <p style={bodyText}>
          Måle suksess på tre dimensjoner: Miljø (Planet), Sosial (People), Økonomi (Profit). Tradisjonelt regnskap måler bare Profit. Moderne bedrifter rapporterer på alle tre.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Triple Bottom Line" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Interessentanalyse" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Interessentanalyse
        </h2>
        <p style={bodyText}>
          Hvem påvirker vi, og hvem påvirker oss? Eiere, ansatte, kunder, leverandører, lokalsamfunn, miljø, myndigheter. Strategien må balansere ulike interessenters krav.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          CSR (Corporate Social Responsibility)
        </h2>
        <p style={bodyText}>
          Bedriftens frivillige bidrag til en bedre verden. Investering i lokalsamfunn, etiske leverandørkjeder, miljøtiltak utover lovkravene. CSR drives ofte av forventninger fra kunder og ansatte.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="CSR (Corporate Social Responsibility)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="FNs bærekraftsmål" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          FNs bærekraftsmål
        </h2>
        <p style={bodyText}>
          17 mål vedtatt i 2015 som rammeverk for bærekraftig utvikling innen 2030. Bedrifter velger ut de målene de faktisk kan påvirke vesentlig — ikke alle 17 samtidig.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Omdømmebygging
        </h2>
        <p style={bodyText}>
          Omdømme er kapitalen vi ikke eier, men forvalter. Bygges over år gjennom konsistent oppførsel — kan ødelegges på minutter ved en skandale. Tillit er fundamentet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Omdømmebygging" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Grønnvasking" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Grønnvasking
        </h2>
        <p style={bodyText}>
          Faren ved å lyve om miljøprofil. Forbrukertilsynet i Norge har slått ned på flyselskap, bilprodusenter og klesmerker som har brukt vage eller udokumenterte miljøpåstander.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sirkulær økonomi
        </h2>
        <p style={bodyText}>
          Designe produkter for gjenbruk og reparasjon, ikke for å bli kastet. Eksempler: Patagonia reparerer klær gratis, Apple resirkulerer iPhones, Vestre møbler designet for å vare i 50+ år.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Sirkulær økonomi" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Etisk handel" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etisk handel
        </h2>
        <p style={bodyText}>
          Ansvar for hele verdikjeden, helt tilbake til råvarene. Åpenhetsloven krever dokumentasjon av menneskerettigheter hos leverandører. H&M og Zara har fått kritikk for tekstilarbeidere i Bangladesh.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Patagonia og Black Friday
        </h2>
        <p style={bodyText}>
          Patagonia har annonsert «Don't buy this jacket» — bedt kundene la være å kjøpe. Et tilsynelatende paradoks: ved å vise respekt for miljø og overforbruk, har de bygget en svært lojal kundebase som kjøper mer fra dem.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Patagonia og Black Friday" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 5 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er bærekraft viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Bærekraft er ikke lenger en kostnad, men en forutsetning for overlevelse. Investorer (ESG-fond), kunder (yngre generasjoner) og lovverk (EU Taxonomy) presser alle i samme retning.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva står Triple Bottom Line for?',
  options: [
    'Tre måleenheter for omsetning',
    'People, Planet, Profit — tre bunnlinjer',
    'Tre konkurransestrategier',
    'Tre lederstil',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvor mange bærekraftsmål har FN?',
  options: [
    '10',
    '15',
    '17',
    '20',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva er grønnvasking?',
  options: [
    'Å vaske med miljøvennlige midler',
    'Å lyve om miljøprofil eller bruke udokumenterte miljøpåstander',
    'Å sertifisere produkter som økologiske',
    'Å redusere energiforbruket',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function SamfunnsansvarBaerekraftOmdommePresentation() {
        return (
          <PresentationShell
            presentationName="Samfunnsansvar, bærekraft og omdømme"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Samfunnsansvar"
            subtitle="Bedriftens rolle i samfunnet — Triple Bottom Line, FNs bærekraftsmål og omdømmebygging i en transparent verden."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
