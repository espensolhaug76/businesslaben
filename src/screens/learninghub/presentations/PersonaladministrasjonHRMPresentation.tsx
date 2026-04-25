      /**
       * ML2 · Visjon 2 — Kapittel 14: Personaladministrasjon og HRM
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
          Hva er HRM?
        </h2>
        <p style={bodyText}>
          Human Resource Management er strategisk arbeid med mennesker: planlegge fremtidig kompetansebehov, anskaffe rett folk, utvikle dem over tid. Mer enn lønnsutbetaling — det er bygging av organisasjonens fremtid.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er HRM?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Rekrutteringsprosessen" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Rekrutteringsprosessen
        </h2>
        <p style={bodyText}>
          Fire steg: jobbanalyse (hva skal personen gjøre?), utlysning (hvem vil vi nå?), seleksjon (intervjuer, tester, referanser), ansettelse (kontrakt, onboarding). Feil ansettelse er dyrt — opp til 6 ganger årslønn.
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
          Motivasjonsteori
        </h2>
        <p style={bodyText}>
          Herzbergs to-faktor-teori: hygienefaktorer (lønn, arbeidsmiljø, sjefen) må være på plass — men gir ikke motivasjon. Motivasjonsfaktorer (mestring, anerkjennelse, ansvar, vekst) skaper faktisk engasjement.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Motivasjonsteori" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kompetanseutvikling" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kompetanseutvikling
        </h2>
        <p style={bodyText}>
          Kurs, etterutdanning, mentoring, jobbrotasjon. Læring i hverdagen — ikke bare formelle kurs. 70-20-10-modellen: 70 % læring fra arbeidet, 20 % fra andre, 10 % fra formelle kurs.
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
          Arbeidsmiljøloven
        </h2>
        <p style={bodyText}>
          De juridiske rammene for et trygt arbeidsliv i Norge. Regulerer arbeidstid, ferie, oppsigelse, varsling, diskriminering. Bryter du den, kan Arbeidstilsynet stenge driften — i tillegg til erstatningsansvar.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Arbeidsmiljøloven" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Belønningssystemer" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Belønningssystemer
        </h2>
        <p style={bodyText}>
          Mer enn lønn: bonus, opsjoner, frynsegoder, anerkjennelse. Ekstreme bonusordninger kan gi vridde insentiver (banksektoren før 2008). Best er ofte balansert grunnlønn pluss beskjeden, predikerbar bonus.
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
          Medarbeidersamtalen
        </h2>
        <p style={bodyText}>
          Strukturert dialog om trivsel, prestasjon og mål. Skjer minst en gang i året, helst oftere. Brukt riktig: utvikling og engasjement. Brukt feil: tidssløsing og frustrasjon.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Medarbeidersamtalen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Personalavvikling" />
      <div>
        <SlideLabel>Kapittel 14 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Personalavvikling
        </h2>
        <p style={bodyText}>
          Oppsigelse og avskjed på en ryddig og lovlig måte. Krav til saklig grunn, drøftingsmøte, rett til advokat. Slurv her gir både rettssaker og dårlig omdømme.
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
          Case — Statoils nedbemanning 2014–2016
        </h2>
        <p style={bodyText}>
          Da oljeprisen falt, måtte Statoil nedbemanne 8 000 stillinger. Selskapet brukte en ryddig prosess: åpenhet, sluttpakker, omplasseringskurs. Resultat: lave rettssaker, bevart omdømme — og ansatte som senere kom tilbake da markedet snudde.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Statoils nedbemanning 2014–2016" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 14 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er HRM strategisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Menneskene er bedriftens eneste ressurs som kan tenke selv. Maskiner gjør hva de programmeres til; mennesker innoverer, tilpasser og bygger relasjoner. HRM-strategien avgjør hvem som er med på reisen videre.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er Herzbergs to-faktor-teori?',
  options: [
    'To måter å beregne lønn på',
    'Hygienefaktorer (må være på plass) vs. motivasjonsfaktorer (skaper engasjement)',
    'To måter å rekruttere på',
    'To typer ansettelseskontrakter',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er 70-20-10-modellen?',
  options: [
    'En lønnsfordeling mellom ledelse, mellomledere og ansatte',
    '70 % læring fra arbeidet, 20 % fra andre, 10 % fra formelle kurs',
    'Tre nivåer av rekruttering',
    'Tre nivåer av bonus',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva sier loven om personalavvikling?',
  options: [
    'Bedrifter kan si opp uten begrunnelse',
    'Krav til saklig grunn, drøftingsmøte og rett til advokat',
    'Oppsigelse må alltid godkjennes av Arbeidstilsynet',
    'Det er fritt frem',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function PersonaladministrasjonHRMPresentation() {
        return (
          <PresentationShell
            presentationName="Personaladministrasjon og HRM"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Personal-"
    titleLine2="administrasjon"
            subtitle="Human Resource Management — planlegge, anskaffe og utvikle bedriftens viktigste ressurs."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
