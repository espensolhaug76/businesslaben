      /**
       * ENT2 · EB2 — Kapittel 11: Strategisk planlegging og vekst
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
        <SlideLabel>Kapittel 11 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategibegrepet
        </h2>
        <p style={bodyText}>
          Strategi er valgene som sikrer langsiktig overlevelse og konkurransefortrinn. For en vekstbedrift handler det om å utvide forspranget, ikke bare beholde det.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Strategibegrepet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Visjon og verdier" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Visjon og verdier
        </h2>
        <p style={bodyText}>
          Ledestjernen og det etiske fundamentet for vekst. Når bedriften vokser fra 5 til 50 ansatte, er det visjonen som holder kursen — uten den drar alle i hver sin retning.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          PESTEL-analyse
        </h2>
        <p style={bodyText}>
          Kartlegging av makroforhold: Politikk, Økonomi, Sosialt, Teknologi, Miljø, Lovverk. For en vekstbedrift som skal inn i nye markeder, er PESTEL første steg av landanalysen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="PESTEL-analyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="SWOT-analyse (strategisk)" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          SWOT-analyse (strategisk)
        </h2>
        <p style={bodyText}>
          Koble interne styrker til eksterne muligheter — TOWS-matrisen. Spør: hvordan kan styrke A utnytte mulighet B? Hvordan beskytte svakhet C mot trussel D?
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Vekststrategier (Ansoff)
        </h2>
        <p style={bodyText}>
          Ansoffs vekstmatrise gir fire valg: markedsinntrenging (mer salg av eksisterende produkt i eksisterende marked), produktutvikling (nytt produkt i kjent marked), markedsutvikling (eksisterende produkt i nytt marked), diversifikasjon (nytt produkt i nytt marked — risikabelt).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Vekststrategier (Ansoff)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Skalering" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Skalering
        </h2>
        <p style={bodyText}>
          Å øke inntektene uten at kostnadene øker like mye. Kjernen i programvarebedrifter (Spotify, Adobe) — én ekstra bruker koster nesten ingenting. Krever god infrastruktur og automatisering.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Organisk vs. oppkjøpsvekst
        </h2>
        <p style={bodyText}>
          Organisk: vokse selv (slowere, billigere, behold kultur). Oppkjøp: kjøp andre bedrifter (raskere, dyrere, integrasjons-risiko). Telenor har vokst mye via oppkjøp; Toyota mest organisk.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Organisk vs. oppkjøpsvekst" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Ressursbasert perspektiv (VRIO)" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Ressursbasert perspektiv (VRIO)
        </h2>
        <p style={bodyText}>
          Har vi ressurser som er Verdifulle, Sjeldne, vanskelig å Imitere og Organisert for utnyttelse? Ressurser som oppfyller alle fire (f.eks. Apple sin merkevare) gir varig konkurransefortrinn.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Tomras tre vekstfaser
        </h2>
        <p style={bodyText}>
          Fase 1: pant i Norge (markedsinntrenging). Fase 2: pant til Tyskland og Sverige (markedsutvikling). Fase 3: sortering for matvareindustri (produktutvikling). Hver fase var bygget på den forrige — og krevde ulike strategier.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Tomras tre vekstfaser" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 11 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er essensen i strategi?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Strategi er å velge hva man IKKE skal gjøre. Vekstbedrifter har mange muligheter; de fleste må velges bort. Disiplinert prioritering skiller suksesser fra utvannet drift.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er Ansoffs vekstmatrise basert på?',
  options: [
    'Pris og kvalitet',
    'Eksisterende vs. nye produkter, eksisterende vs. nye markeder',
    'Lokal vs. global vekst',
    'Organisk vs. oppkjøpsvekst',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva betyr \'skalering\' i vekstkontekst?',
  options: [
    'Å åpne flere fysiske butikker',
    'Å øke inntektene uten at kostnadene øker like mye',
    'Å ansette flere folk',
    'Å investere i mer reklame',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sier strategi-eksperten om hva strategi egentlig er?',
  options: [
    'Å gjøre alt bedre',
    'Å velge hva man IKKE skal gjøre — disiplinert prioritering',
    'Å maksimere overskudd',
    'Å kopiere konkurrentene',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function StrategiskPlanleggingVekstPresentation() {
        return (
          <PresentationShell
            presentationName="Strategisk planlegging og vekst"
            subjectLabel="ENT2 · EB2"
            titleLine1="Strategi"
    titleLine2="og vekst"
            subtitle="Kursen mot fremtiden — valgene som sikrer langsiktig overlevelse og konkurransefortrinn for vekstbedriften."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
