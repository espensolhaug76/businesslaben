      /**
       * ML1 · Visjon 1 — Kapittel 5: Markedsinformasjon og MIS
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
          Hva er MIS?
        </h2>
        <p style={bodyText}>
          Markedsinformasjonssystemet er en strukturert metode for innsamling, sortering og analyse av data. MIS gir ledelsen et faktabasert grunnlag for beslutninger, i stedet for magefølelse alene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er MIS?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="De fire delene" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          De fire delene
        </h2>
        <p style={bodyText}>
          Et MIS består av interne rapporter (egne salgstall), markedsovervåking (bransjenytt), markedsundersøkelser (egne studier) og støttesystemer (statistikk, AI). Sammen gir de et komplett bilde.
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
          Sekundærdata
        </h2>
        <p style={bodyText}>
          Informasjon som finnes fra før — SSB, Brønnøysundregistrene, Google, årsrapporter. Billig, raskt og bredt, men ikke alltid spesifikt nok for ditt prosjekt. Start alltid her.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Sekundærdata" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Primærdata" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Primærdata
        </h2>
        <p style={bodyText}>
          Nye data du samler inn selv for et spesifikt formål: spørreskjemaer, intervjuer, observasjoner. Dyrt og tidkrevende, men presist tilpasset spørsmålet du må ha svar på.
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
          Kvalitativ metode
        </h2>
        <p style={bodyText}>
          Dybdeforståelse — svarer på «hvorfor?». Dybdeintervju og fokusgrupper avdekker motiver, følelser og barrierer som tall ikke fanger opp. Ofte få respondenter, mye tekst.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Kvalitativ metode" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Kvantitativ metode" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kvantitativ metode
        </h2>
        <p style={bodyText}>
          Bredde og tall — svarer på «hvor mange?». Spørreskjemaer til et representativt utvalg gir prosenter og statistikk. Mange respondenter, lite tekst per person.
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
          Undersøkelsesprosessen
        </h2>
        <p style={bodyText}>
          Fem steg: definer problemstilling → velg design → samle data → analyser → rapporter. Den vanligste feilen er å hoppe rett til datainnsamling før problemstillingen er klar.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Undersøkelsesprosessen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Validitet og reliabilitet" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Validitet og reliabilitet
        </h2>
        <p style={bodyText}>
          Validitet: måler vi det vi tror vi måler? Reliabilitet: er resultatene konsistente og til å stole på? Et dårlig spørsmål kan gi presise svar på feil ting.
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
          Case — TINE og forbrukerpaneler
        </h2>
        <p style={bodyText}>
          TINE bruker faste forbrukerpaneler som tester nye varianter (yoghurt, ostetyper) før lansering. Kombinasjon av kvalitative dybdeintervju og kvantitative smaksprøver gir både «hvorfor» og «hvor mange».
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — TINE og forbrukerpaneler" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 5 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er markedsinformasjon viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Riktig informasjon reduserer risiko og øker sjansen for strategisk suksess. Bedrifter som beslutter med data taper sjeldnere store summer enn de som baserer seg på magefølelse.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er sekundærdata?',
  options: [
    'Data man har samlet inn selv',
    'Informasjon som finnes fra før — SSB, rapporter, statistikk',
    'Data fra konkurrenter',
    'Data fra sosiale medier kun',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva svarer kvalitativ metode best på?',
  options: [
    'Hvor mange?',
    'Hvor mye?',
    'Hvorfor?',
    'Når?',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva betyr validitet i en undersøkelse?',
  options: [
    'Resultatene er konsistente over tid',
    'Vi måler det vi faktisk tror vi måler',
    'Undersøkelsen er godkjent av Datatilsynet',
    'Vi har mange respondenter',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function SituasjonsanalyseMl1Presentation() {
        return (
          <PresentationShell
            presentationName="Markedsinformasjon og MIS"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Markedsinformasjon"
    titleLine2="og MIS"
            subtitle="Grunnlaget for gode beslutninger — kvalitative og kvantitative metoder for å forstå markedet."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
