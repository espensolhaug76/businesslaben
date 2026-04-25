      /**
       * ENT2 · EB2 — Kapittel 15: Personaladministrasjon og HRM (strategisk)
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
        <SlideLabel>Kapittel 15 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Rekruttering på strategisk nivå
        </h2>
        <p style={bodyText}>
          Employer Branding: hvordan bli en attraktiv arbeidsgiver. Konkurranse om talent er like hard som konkurranse om kunder. Equinor, DnB og Telenor bruker millioner på å fremstå som førstevalg for de beste kandidatene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Rekruttering på strategisk nivå" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kompetansestyring" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kompetansestyring
        </h2>
        <p style={bodyText}>
          Kartlegging, utvikling og utnyttelse av ansattes kunnskap. Verktøy: kompetansematrise (hva har vi/hva trenger vi), individuell utviklingsplan, intern jobbrotasjon, mentor-program.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Belønningssystemer
        </h2>
        <p style={bodyText}>
          Lønn, bonus, eierandeler (opsjoner) og frynsegoder. Opsjoner er kraftige i startups — ansatte deler oppside av suksessen. Krevde kompliserte regler for skatteoptimalisering.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Belønningssystemer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Arbeidsrett (avansert)" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Arbeidsrett (avansert)
        </h2>
        <p style={bodyText}>
          Håndtering av oppsigelser, omstilling og konflikter i tråd med loven. Krav til saklig grunn, drøftingsmøte, dokumentasjon, klagerett. Bryter du arbeidsmiljøloven, kan retten opprettholde stillingen — selv etter oppsigelse.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          HMS og psykososialt arbeidsmiljø
        </h2>
        <p style={bodyText}>
          Forebygge utbrenthet og sikre trivsel i en vekstbedrift. Ansatte i raskvoksende selskaper har høyere risiko for stress og utbrenthet. Aktive tiltak: arbeidstid-grenser, ferieplikt, profesjonell støtte.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="HMS og psykososialt arbeidsmiljø" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Medbestemmelse" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Medbestemmelse
        </h2>
        <p style={bodyText}>
          Samarbeid med tillitsvalgte og ansattrepresentasjon i styret. Norge har lov-pålagt ansattrepresentasjon i AS over 30 ansatte. Brukt riktig: bedre beslutninger og lavere konfliktnivå.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Endringsledelse og personal
        </h2>
        <p style={bodyText}>
          Hvordan ivareta folk når bedriften endrer strategi. Endringer skaper usikkerhet — informasjon, deltagelse og forutsigbarhet er nøkkelen til å beholde nøkkelpersoner gjennom omstilling.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Endringsledelse og personal" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Kvalitetssikring av HR-prosesser" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kvalitetssikring av HR-prosesser
        </h2>
        <p style={bodyText}>
          Bruk av digitale HR-systemer (Workday, BambooHR, Personio) for bedre oversikt over ansatte, kompetanse, lønninger og utvikling. Manuell HR fungerer ikke når bedriften har 100+ ansatte.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Equinors employer branding
        </h2>
        <p style={bodyText}>
          Equinor har bygget Norges sterkeste employer brand i ingeniørbransjen. Studenter ved NTNU rangerer Equinor som drømmearbeidsgiver. Resultat: tilgang til de beste kandidatene, lavere rekrutteringskostnader og høyere innovasjonskraft.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Equinors employer branding" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 15 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er HRM strategisk?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Folk er bedriftens eneste ressurs som kan tenke selv. Maskiner gjør hva de programmeres til; mennesker innoverer og tilpasser seg. HRM-strategien avgjør hvem som er med på reisen videre.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er employer branding?',
  options: [
    'Bedriftens logo',
    'Hvordan bli en attraktiv arbeidsgiver i konkurransen om talent',
    'Et merke for ansatte',
    'Reklame mot egne ansatte',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er fordelen med opsjoner som belønningssystem?',
  options: [
    'De er gratis for bedriften',
    'Ansatte deler oppside av bedriftens suksess — bygger commitment',
    'De er enklere enn lønn',
    'Loven krever det',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Når kreves ansattrepresentasjon i AS-styre i Norge?',
  options: [
    'Alltid',
    'Bedrifter med 30 ansatte eller mer',
    'Kun børsnoterte selskaper',
    'Aldri',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function PersonaladministrasjonHrmStrategiskPresentation() {
        return (
          <PresentationShell
            presentationName="Personaladministrasjon og HRM (strategisk)"
            subjectLabel="ENT2 · EB2"
            titleLine1="Strategisk"
    titleLine2="HRM"
            subtitle="Utvikling av menneskelig kapital — employer branding, kompetansestyring og fornyelse av HR-prosesser."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
