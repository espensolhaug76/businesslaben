      /**
       * ENT1 · EB1 — Kapittel 7: Økonomisk planlegging og budsjett
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
          Hvorfor budsjettere?
        </h2>
        <p style={bodyText}>
          Forutsi fremtiden, styre driften, dokumentere behov for kapital. Et godt budsjett gir deg svar før spørsmålene oppstår — banken, investorer, deg selv. Det er strategi i tallform.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hvorfor budsjettere?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Resultatbudsjett" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Resultatbudsjett
        </h2>
        <p style={bodyText}>
          Planlagt inntekt minus planlagte kostnader over en periode (typisk ett år). Viser om bedriften vil gå med overskudd. Kunst: ikke være for optimistisk — pessimistiske scenarioer gir mer realistisk planlegging.
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
          Likviditetsbudsjett
        </h2>
        <p style={bodyText}>
          Oversikt over innbetalinger og utbetalinger måned for måned. Har vi penger i kassa til å betale regninger? Mange lønnsomme bedrifter går konkurs av likviditetskrise — du kan ikke betale lønn med fakturaer.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Likviditetsbudsjett" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Faste og variable kostnader" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Faste og variable kostnader
        </h2>
        <p style={bodyText}>
          Faste: uavhengige av salg (husleie, fastlønn). Variable: følger salget (råvarer, provisjon). Forstå skillet — det er nøkkelen til alle videre lønnsomhetsberegninger.
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
          Nullpunktanalyse
        </h2>
        <p style={bodyText}>
          Hvor mye må vi selge for å gå i null? Faste kostnader / dekningsbidrag per enhet. Eksempel: 200 000 kr i faste kostnader / 100 kr dekningsbidrag = 2 000 enheter. Hvis du tror du selger 1 500, er det røde lys.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Nullpunktanalyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Dekningsbidrag" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Dekningsbidrag
        </h2>
        <p style={bodyText}>
          Salgspris minus variable kostnader. Hva sitter vi igjen med per solgte enhet til å dekke faste kostnader og fortjeneste? Selger du for 200 og det koster 80 i råvarer, er DB 120 — det er pengene du har å jobbe med.
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
          Prissetting i oppstarten
        </h2>
        <p style={bodyText}>
          Selvkostmetoden: alle kostnader + påslag for fortjeneste (rasjonelt, men kan undervurdere markedsverdi). Markedsbasert prissetting: hva er kunden villig til å betale (riktigere, men krever testing).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Prissetting i oppstarten" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Økonomisk kontroll" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Økonomisk kontroll
        </h2>
        <p style={bodyText}>
          Sammenlign budsjett mot faktiske tall hver måned. Avvik gir signal: revider budsjettet, eller endre driften. Mange gründere lager budsjett én gang og ignorerer det — det er sløsing av tid.
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
          Case — Kahoots tidlige budsjett
        </h2>
        <p style={bodyText}>
          Kahoot startet med begrenset kapital. Stram likviditetsstyring (cash burn) ble fulgt månedlig — én forsinket investering kunne tatt livet av selskapet i tidlig fase. God økonomistyring var like viktig som produktet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Kahoots tidlige budsjett" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 7 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er økonomistyring kritisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        God økonomistyring er forskjellen på suksess og konkurs. Bedriften kan ha en fantastisk idé, godt team og lojale kunder — men hvis pengene tar slutt, er alt over.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er et likviditetsbudsjett?',
  options: [
    'Plan for forventet overskudd',
    'Oversikt over innbetalinger og utbetalinger måned for måned',
    'Plan for hvor mye vi vil tjene',
    'Antall ansatte budsjett',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er nullpunkt?',
  options: [
    'Punktet der du går konkurs',
    'Punktet der inntekter dekker totale kostnader — verken tap eller fortjeneste',
    'Når lageret er tomt',
    'Når kapitalen er brukt opp',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor går mange lønnsomme bedrifter konkurs?',
  options: [
    'De har for store overskudd',
    'Likviditetskrise — fakturaer kan ikke betale lønn',
    'Loven krever det',
    'De vokser for sakte',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function OkonomiskPlanleggingBudsjettPresentation() {
        return (
          <PresentationShell
            presentationName="Økonomisk planlegging og budsjett"
            subjectLabel="ENT1 · EB1"
            titleLine1="Økonomisk"
    titleLine2="planlegging"
            subtitle="Kontroll på kronene — budsjett, dekningsbidrag og likviditet for nye gründere."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
