      /**
       * ML1 · Visjon 1 — Kapittel 3: Psykologi og kjøpsatferd
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
        <SlideLabel>Kapittel 3 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Motivasjon (Maslow)
        </h2>
        <p style={bodyText}>
          Vi prioriterer behov i en pyramide: fra fysiologi og trygghet på bunnen til status og selvrealisering på toppen. Vi går vanligvis ikke videre til neste nivå før det forrige er dekket — men sosiale medier roter med rekkefølgen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Motivasjon (Maslow)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Persepsjon" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Persepsjon
        </h2>
        <p style={bodyText}>
          Hjernen velger, organiserer og tolker sanseinntrykk. Selektiv oppmerksomhet betyr at vi bare ser det vi forventer eller bryr oss om. Reklamen må derfor bryte mønsteret før den når frem.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Læring
        </h2>
        <p style={bodyText}>
          Læring er endring i atferd som følge av erfaring. Klassisk betinging (Pavlov) og operant læring (belønning og straff) brukes daglig i markedsføring — fra lojalitetspoeng til skuffelse over et dårlig kjøp.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Læring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Holdninger" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Holdninger
        </h2>
        <p style={bodyText}>
          En holdning er en lært tendens til å reagere positivt eller negativt. Den har tre deler: kognitiv (hva jeg vet), affektiv (hva jeg føler) og konativ (hva jeg gjør). Holdninger er trege å endre — derfor er ferske kunder gull verdt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Personlighet og selvbilde
        </h2>
        <p style={bodyText}>
          Vi kjøper merker som reflekterer hvem vi er, eller hvem vi ønsker å være. En Tesla sier noe annet om eieren enn en Volvo, selv om begge frakter folk fra A til B.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Personlighet og selvbilde" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Referansegrupper" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Referansegrupper
        </h2>
        <p style={bodyText}>
          Andre mennesker påvirker våre valg. Primærgrupper er familie og nære venner; sekundærgrupper er kolleger og influencere. Aspirasjonsgrupper er de vi ser opp til og prøver å ligne.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kjøpsprosessen
        </h2>
        <p style={bodyText}>
          Fem trinn: problemerkjennelse, informasjonssøking, vurdering av alternativer, kjøpsbeslutning og bedømming etter kjøp. Markedsføringen må treffe kunden i alle fasene — ikke bare ved selve kjøpet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Kjøpsprosessen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Kjøpsroller" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kjøpsroller
        </h2>
        <p style={bodyText}>
          Et kjøp involverer ofte flere roller: initiativtaker (foreslår), påvirker (anbefaler), beslutningstaker (velger), kjøper (betaler) og bruker (forbruker). I familien kan barn være initiativtaker og forelderen kjøper.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 3 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — TikTok-trendene
        </h2>
        <p style={bodyText}>
          Hvorfor kjøper tenåringer plutselig samme drikke, sko eller skinpleie? Referansegrupper (influencere) + selektiv oppmerksomhet (algoritmen viser samme ting igjen og igjen) + emosjonell appell. Holdninger formes raskt når alle rundt deg har samme produkt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — TikTok-trendene" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 3 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva kan man oppnå med psykologisk innsikt?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Forståelse av psykologi er nøkkelen til treffsikker markedsføring. Du kan lage budskap som faktisk når frem, gi kunden den informasjonen som teller, og bygge merkevare som kunden identifiserer seg med over tid.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr selektiv oppmerksomhet i markedsføring?',
  options: [
    'Hjernen velger ut hva den legger merke til, basert på interesser og forventninger',
    'Markedsføringen velger ut hvilke kunder den vil nå',
    'Reklamen velger ut bestemte produkter å fremheve',
    'Hjernen ignorerer all reklame automatisk',
  ],
  correct: 0,
  timeSeconds: 45,
},
{
  question: 'Hvilke tre komponenter består en holdning av?',
  options: [
    'Pris, kvalitet og tilgjengelighet',
    'Kognitiv, affektiv og konativ',
    'Reklame, produkt og salgsbud',
    'Kunde, selger og produkt',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en primær referansegruppe?',
  options: [
    'Influencere på Instagram',
    'Familie og nære venner',
    'Markedsavdelingen i bedriften',
    'Konkurrentenes kunder',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function ForbrukeratferdMl1Presentation() {
        return (
          <PresentationShell
            presentationName="Psykologi og kjøpsatferd"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Psykologi"
    titleLine2="og kjøpsatferd"
            subtitle="Hva skjer i hodet på kunden? Motivasjon, persepsjon, læring og holdninger styrer kjøpsbeslutninger mer enn vi tror."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
