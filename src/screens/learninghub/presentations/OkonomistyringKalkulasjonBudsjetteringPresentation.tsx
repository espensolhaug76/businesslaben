      /**
       * ML2 · Visjon 2 — Kapittel 16: Økonomistyring, kalkulasjon og budsjettering
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
        <SlideLabel>Kapittel 16 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Økonomi og markedsføring
        </h2>
        <p style={bodyText}>
          Markedsføreren må forstå regnskapet for å få budsjetter. Argumentet «kampanjen var kreativ» faller flatt i toppledelsen. Argumentet «ROI 4,2 og bidragsmargin 32 %» åpner kassen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Økonomi og markedsføring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kalkulasjonsmetoder" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kalkulasjonsmetoder
        </h2>
        <p style={bodyText}>
          Bidragsmetoden: variable kostnader + dekningsbidrag. Brukes for kortsiktige beslutninger (skal vi ta neste ordre?). Selvkostmetoden: alle kostnader + påslag. Brukes for langsiktige beslutninger (er produktet lønnsomt?).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Dekningsbidrag
        </h2>
        <p style={bodyText}>
          Salgspris minus variable kostnader. Hvor mye sitter vi igjen med per solgte enhet til å dekke faste kostnader og fortjeneste? Avgjør hvilke produkter som er verdt å selge.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Dekningsbidrag" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Nullpunktsanalyse" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Nullpunktsanalyse
        </h2>
        <p style={bodyText}>
          Hvor mye må vi selge for å gå i null? Faste kostnader delt på dekningsbidrag per enhet. Eksempel: faste kostnader 1 mill, dekningsbidrag 100 kr/enhet → må selge 10 000 enheter for å gå i null.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Budsjettering
        </h2>
        <p style={bodyText}>
          Planlegging av fremtidige inntekter og kostnader. Resultatbudsjett (lønnsomhet), likviditetsbudsjett (kontanter), investeringsbudsjett (anleggsmidler). Alle tre må stemme — kan være lønnsom, men gå konkurs av likviditetsmangel.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Budsjettering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Likviditetsstyring" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Likviditetsstyring
        </h2>
        <p style={bodyText}>
          Sikre at bedriften alltid har penger til å betale regninger. Kunder som betaler sent + leverandører som krever rask betaling = likviditetskrise selv om regnskapet ser bra ut. Cash is king — også for vekstbedrifter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Investeringsanalyse
        </h2>
        <p style={bodyText}>
          Er det lønnsomt å starte dette prosjektet? Nåverdimetoden (NPV), internrente, payback-periode. Tidsverdien av penger er sentralt: 100 kr i dag er verdt mer enn 100 kr om fem år.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Investeringsanalyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Nøkkeltall" />
      <div>
        <SlideLabel>Kapittel 16 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Nøkkeltall
        </h2>
        <p style={bodyText}>
          Rentabilitet (avkastning på investert kapital), likviditet (evne til å betale løpende), soliditet (egenkapital som andel av totalkapital). Nøkkeltall gir rask vurdering av økonomisk helse.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 16 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Norwegians regnskap 2019 vs. 2020
        </h2>
        <p style={bodyText}>
          Norwegian rapporterte rekordtall i 2019 — sterk vekst, ekspansjon. Likviditet var imidlertid sterkt presset. Pandemien i 2020 senket etterspørselen, og Norwegian måtte til skifteretten — selv om regnskapet året før så bra ut. Likviditet er konge.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Norwegians regnskap 2019 vs. 2020" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 16 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor må markedsføreren forstå tall?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Uten økonomisk kontroll dør selv den beste markedsstrategi. Markedsføring som ikke kan begrunnes med tall, mister først budsjett — så stemme i ledelsen — så plass.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er dekningsbidrag?',
  options: [
    'Total inntekt fra salget',
    'Salgspris minus variable kostnader',
    'Forskjell på pris og selvkost',
    'Bedriftens overskudd etter skatt',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er nullpunkt?',
  options: [
    'Når bedriften går konkurs',
    'Punktet der inntekter og totale kostnader er like — verken tap eller fortjeneste',
    'Når lageret er tomt',
    'Når reklamebudsjettet er brukt opp',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor er likviditetsstyring kritisk?',
  options: [
    'Det er lovpålagt',
    'En bedrift kan være lønnsom på papiret, men gå konkurs av mangel på kontanter',
    'Det er enklere enn regnskap',
    'Det måler reklameeffekt',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function OkonomistyringKalkulasjonBudsjetteringPresentation() {
        return (
          <PresentationShell
            presentationName="Økonomistyring, kalkulasjon og budsjettering"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Økonomi-"
    titleLine2="styring"
            subtitle="Tallenes tale — kalkulasjon, dekningsbidrag og budsjett som beslutningsgrunnlag for markedsføreren."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
