      /**
       * ENT1 · EB1 — Kapittel 4: Forretningsmodellen (BMC)
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
        <SlideLabel>Kapittel 4 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hva er en forretningsmodell?
        </h2>
        <p style={bodyText}>
          En beskrivelse av hvordan bedriften skaper, leverer og kaprer verdi. Forretningsmodellen forklarer logikken bak hvordan bedriften tjener penger — uavhengig av selve produktet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er en forretningsmodell?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kundesegmenter og verdiløfte" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kundesegmenter og verdiløfte
        </h2>
        <p style={bodyText}>
          Kjernen i Business Model Canvas: Hvem hjelper vi (kundesegmenter), og med hva (verdiløfte)? Disse to byggestenene må passe perfekt sammen — ellers kollapser hele modellen.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kanaler og kunderelasjoner
        </h2>
        <p style={bodyText}>
          Kanaler: hvordan vi når kunden (nettbutikk, butikk, partnere). Kunderelasjoner: hvordan vi beholder kontakten (selvbetjening, personlig hjelp, abonnement). Sammen styrer de kundeopplevelsen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Kanaler og kunderelasjoner" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Inntektsstrømmer" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Inntektsstrømmer
        </h2>
        <p style={bodyText}>
          Hvordan skal vi faktisk få betalt? Salg av produkt, abonnement, leie/leasing, lisensiering, reklame, megling. De fleste vellykkede bedrifter har flere inntektsstrømmer for å spre risiko.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Nøkkelressurser og nøkkelaktiviteter
        </h2>
        <p style={bodyText}>
          Ressurser: hva vi MÅ ha (mennesker, fysiske midler, immaterielle rettigheter, kapital). Aktiviteter: hva vi MÅ gjøre hver dag (produksjon, salg, service). Definerer hva som ikke kan settes ut.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Nøkkelressurser og nøkkelaktiviteter" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Nøkkelpartnere" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Nøkkelpartnere
        </h2>
        <p style={bodyText}>
          Hvem må vi samarbeide med for å lykkes? Leverandører, allianser, joint ventures. Strategiske partnerskap kan være forskjellen på å klare alt selv (dyrt og sakte) eller skalere raskt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kostnadsstruktur
        </h2>
        <p style={bodyText}>
          Hva er de største utgiftene våre? Faste kostnader (lokale, lønninger) vs. variable kostnader (råvarer, frakt). Forstå strukturen — det avgjør hvor sårbar du er ved svingninger i salget.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Kostnadsstruktur" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Lean Startup og pivot" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lean Startup og pivot
        </h2>
        <p style={bodyText}>
          Bruk BMC til å teste hypoteser. Hver byggesten er en antakelse — test den med ekte kunder. Hvis antakelsen feiler, må du «pivotere» (endre retning). Snapchat startet som geo-tagged bilder før de pivoterte til selvslettende meldinger.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Spotify sin BMC
        </h2>
        <p style={bodyText}>
          Kundesegment: musikkfans. Verdiløfte: ubegrenset musikk billig. Kanaler: app, web. Inntekter: abonnement + reklame. Ressurser: musikkrettigheter. Partnere: plateselskaper. BMC visualiserer hele modellen på én side — gjør det enkelt å se sammenhengene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Spotify sin BMC" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 4 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er BMC nyttig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        BMC er et levende dokument som utvikler seg med bedriften. På én side ser du hvordan alle delene henger sammen — og endrer du én del, ser du raskt om resten fortsatt fungerer.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva står BMC for?',
  options: [
    'Business Marketing Channel',
    'Business Model Canvas',
    'Best Marketing Communication',
    'Brand Management Cycle',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er kjernen i en god forretningsmodell?',
  options: [
    'Lavest mulig pris',
    'Verdiløfte som matcher et reelt kundesegment',
    'Mest mulig reklame',
    'Største produktportefølje',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en pivot?',
  options: [
    'En type investor',
    'En endring av retning når antakelsene viser seg å være feil',
    'Et juridisk dokument',
    'En type forretningsmodell',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function ForretningsmodellBmcPresentation() {
        return (
          <PresentationShell
            presentationName="Forretningsmodellen (BMC)"
            subjectLabel="ENT1 · EB1"
            titleLine1="Forretnings-"
    titleLine2="modell-lerretet"
            subtitle="Visualisering av din bedrift — Business Model Canvas på én side."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
