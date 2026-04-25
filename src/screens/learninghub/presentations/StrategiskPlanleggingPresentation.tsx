      /**
       * ML2 · Visjon 2 — Kapittel 1: Strategisk planlegging
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
        <SlideLabel>Kapittel 1 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategibegrepet
        </h2>
        <p style={bodyText}>
          Strategi er valgene som sikrer overlevelse og vekst på lang sikt. Det handler om hva bedriften skal gjøre — og minst like viktig: hva den IKKE skal gjøre.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Strategibegrepet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Strategisk vs. taktisk" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Strategisk vs. taktisk
        </h2>
        <p style={bodyText}>
          Strategi handler om lange linjer (3–10 år), taktikk om kortsiktige tiltak (uker og måneder). En kampanje er taktikk, valget av forretningsmodell er strategi.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Planleggingsprosessen
        </h2>
        <p style={bodyText}>
          Visjon → analyse → mål → strategi → implementering. Hvert steg bygger på det forrige. Hopper du over analysen, ender du med ambisjoner uten kontakt med virkeligheten.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Planleggingsprosessen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Visjon og verdier" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Visjon og verdier
        </h2>
        <p style={bodyText}>
          Visjonen er ledestjernen — det inspirerende bildet av fremtiden. Verdiene er de moralske grensene for hvordan vi når dit. «Hvor vil vi» og «hvordan skal vi oppføre oss».
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          PESTEL-analyse
        </h2>
        <p style={bodyText}>
          Kartlegging av seks ytre makroforhold: Politiske, Økonomiske, Sosiale, Teknologiske, Environmental (miljø) og Lovverk. PESTEL gir et systematisk bilde av terrenget bedriften opererer i.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="PESTEL-analyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Arbeidsbetingelser" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Arbeidsbetingelser
        </h2>
        <p style={bodyText}>
          Indre arbeidsbetingelser er bedriftens egne styrker og svakheter. Ytre arbeidsbetingelser er muligheter og trusler i markedet. SWOT-analysen kobler disse sammen.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          SWOT-analyse
        </h2>
        <p style={bodyText}>
          Oppsummering av situasjonen i en 2x2-matrise: Strengths, Weaknesses, Opportunities, Threats. Strategiske tiltak skal bygge på styrkene, dekke svakhetene, gripe mulighetene og forsvare seg mot truslene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="SWOT-analyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Kritiske suksessfaktorer" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kritiske suksessfaktorer
        </h2>
        <p style={bodyText}>
          De få tingene som MÅ gå bra for at strategien skal lykkes. For en kafé: beliggenhet, kvalitet på kaffe, dyktige baristaer, lojale kunder. Identifiser dem og beskytt dem.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Tomras pivot
        </h2>
        <p style={bodyText}>
          Tomra startet med pantemaskiner i Norge. Ved å analysere globale trender (resirkulering, EU-direktiver) så de muligheten i sortiering og food-sortering. Strategisk planlegging gjorde Tomra fra norsk pant-leverandør til global teknologileder.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Tomras pivot" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 1 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor planlegge strategisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Strategisk planlegging reduserer tilfeldigheter i markedsføringen. Uten plan styrer du etter dagens vær — med plan bygger du for et helt års klima.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva står PESTEL for?',
  options: [
    'Pris, Etterspørsel, Salg, Teknologi, Etikk, Lovverk',
    'Politisk, Økonomisk, Sosialt, Teknologisk, Environmental, Lovverk',
    'Produksjon, Eksport, Salg, Transport, Energi, Logistikk',
    'Press, Effekt, Strategi, Tiltak, Evaluering, Læring',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva betyr \'O\' i SWOT?',
  options: [
    'Operasjonell',
    'Omsetning',
    'Opportunities (muligheter)',
    'Organisering',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på strategi og taktikk?',
  options: [
    'Strategi gjelder for hele bedriften, taktikk kun for en avdeling',
    'Strategi er lange linjer (år), taktikk er kortsiktige tiltak (uker/måneder)',
    'Strategi er for små bedrifter, taktikk for store',
    'De er to navn på samme ting',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function StrategiskPlanleggingPresentation() {
        return (
          <PresentationShell
            presentationName="Strategisk planlegging"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Strategisk"
    titleLine2="planlegging"
            subtitle="Kursen mot fremtiden — valgene som sikrer overlevelse og vekst på lang sikt."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
