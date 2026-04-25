      /**
       * ENT1 · EB1 — Kapittel 3: Behov, marked og segmentering
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
          Kundebehov
        </h2>
        <p style={bodyText}>
          Maslows behovspyramide brukes for å forstå hva som driver kunden til kjøp. De fleste produkter dekker mer enn ett nivå — en sportsbil dekker både transport (fysiologi) og status (anerkjennelse).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Kundebehov" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Markedet" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Markedet
        </h2>
        <p style={bodyText}>
          Summen av potensielle kunder som har et behov OG evne til å betale. En gründer må kunne kvantifisere markedet: antall potensielle kunder × gjennomsnittlig forbruk = total adresserbar marked (TAM).
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
          Segmentering
        </h2>
        <p style={bodyText}>
          Oppdeling av markedet i mindre grupper med fellestrekk. Fire vanlige kriterier: demografi (alder, kjønn, inntekt), geografi (sted), psykografi (livsstil, verdier) og atferd (lojalitet, bruksmønster).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Segmentering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Målgruppevalg" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Målgruppevalg
        </h2>
        <p style={bodyText}>
          Velg de mest attraktive segmentene for bedriftens ressurser. En gründer kan ikke betjene alle — fokus på ett segment gir bedre resultater enn å spre seg tynt utover hele markedet.
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
          Posisjonering
        </h2>
        <p style={bodyText}>
          Hvordan du ønsker at kunden skal oppfatte bedriften sammenlignet med konkurrentene. «Den raskeste», «den billigste», «den mest miljøvennlige» — én tydelig posisjon er bedre enn å være alt for alle.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Posisjonering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Markedsundersøkelser" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Markedsundersøkelser
        </h2>
        <p style={bodyText}>
          Enkle metoder for oppstartsbedrifter: 10–20 dybdeintervjuer med potensielle kunder, observasjon av eksisterende løsninger, og enkle digitale spørreskjemaer. Trenger ikke være store undersøkelser — innsikten teller.
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
          Konkurrentanalyse
        </h2>
        <p style={bodyText}>
          Hvem er de andre, og hva er deres styrker og svakheter? Lag en enkel matrise: konkurrenter på radene, dimensjoner (pris, kvalitet, service, brand) på kolonnene. Hvor er det åpning for deg?
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Konkurrentanalyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Verdiløfte (Value Proposition)" />
      <div>
        <SlideLabel>Kapittel 3 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Verdiløfte (Value Proposition)
        </h2>
        <p style={bodyText}>
          Den unike fordelen kunden får ved å velge akkurat deg. Skal kunne forklares på 30 sekunder, og må være forskjellig nok fra konkurrentene til at kunden faktisk velger annerledes.
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
          Case — Kahoot sin målgruppe
        </h2>
        <p style={bodyText}>
          Kahoot kunne valgt mange målgrupper: bedrifter, konferanser, familier. De valgte lærere — én klar målgruppe, ett tydelig behov (engasjerende undervisning). Fokus ga eksplosiv vekst — først blant lærere, så ekspansjon til andre segmenter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Kahoot sin målgruppe" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 3 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor må du kjenne kunden?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Kjenn din kunde bedre enn du kjenner deg selv. Gründere som baserer seg på antakelser i stedet for kundekontakt, ender ofte med produkter ingen vil ha — uansett hvor smart løsningen er teknisk.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er kjernen i et marked?',
  options: [
    'Alle som har internett',
    'Summen av potensielle kunder som har et behov OG evne til å betale',
    'Alle som kjenner produktet',
    'Alle i Norge',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en god strategi for en oppstartsbedrift?',
  options: [
    'Selge til alle samtidig',
    'Velge ett tydelig segment og fokusere',
    'Vente til markedet er stort nok',
    'Ha minst tre forskjellige produkter',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er et verdiløfte (Value Proposition)?',
  options: [
    'En garanti for kvaliteten',
    'Den unike fordelen kunden får ved å velge nettopp deg',
    'Et reklamebudsjett',
    'En pris-rabatt',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function BehovMarkedSegmenteringPresentation() {
        return (
          <PresentationShell
            presentationName="Behov, marked og segmentering"
            subjectLabel="ENT1 · EB1"
            titleLine1="Behov"
    titleLine2="og marked"
            subtitle="Finn din plass i markedet — kjenn kunden bedre enn du kjenner deg selv."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
