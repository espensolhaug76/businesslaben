      /**
       * ML2 · Visjon 2 — Kapittel 2: Visjon, mål og overordnede strategier
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
        <SlideLabel>Kapittel 2 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Forretningsidé (virksomhetsidé)
        </h2>
        <p style={bodyText}>
          Svarer på fire spørsmål: Hva skal vi gjøre? For hvem? Hvordan? Hvorfor oss? En klar forretningsidé skiller seg fra konkurrentene og er enkel å forklare.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Forretningsidé (virksomhetsidé)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Visjon" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Visjon
        </h2>
        <p style={bodyText}>
          Et inspirerende bilde av bedriftens drømmesituasjon i fremtiden. Bør være ambisiøs nok til å motivere, men ikke så vag at ingen forstår hva den betyr i praksis.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Målhierarkiet
        </h2>
        <p style={bodyText}>
          Strukturert nedbryting: visjon → hovedmål → delmål → handlingsmål. Hvert nivå skal gjøre det neste nivået konkret. Visjonen «verdens beste» blir til handlingsmål «levere innen 24 timer».
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Målhierarkiet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="SMART-mål" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          SMART-mål
        </h2>
        <p style={bodyText}>
          Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt. «Vi skal vokse» er ikke SMART. «Øke omsetningen i Norge med 15 % innen 31.12» er SMART.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Vekststrategier
        </h2>
        <p style={bodyText}>
          Valg av retning for å øke omsetningen: nye markeder, nye produkter, ny prising, oppkjøp. Ansoffs vekstmatrise visualiserer fire strategier (markedsinntrenging, produktutvikling, markedsutvikling, diversifikasjon).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Vekststrategier" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Konkurransestrategier" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Konkurransestrategier
        </h2>
        <p style={bodyText}>
          Tre generiske strategier (Porter): kostnadslederskap (vær billigst), differensiering (vær unik) og fokusering (vær best i en nisje). Den som prøver alt blir best i ingenting.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          GAP-analyse
        </h2>
        <p style={bodyText}>
          Forskjellen mellom der vi er nå og der vi vil være. Identifiserer hvor stort gapet er i omsetning, markedsandel, kompetanse — og hvilke tiltak som må til for å lukke det.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="GAP-analyse" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Verdigrunnlag" />
      <div>
        <SlideLabel>Kapittel 2 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Verdigrunnlag
        </h2>
        <p style={bodyText}>
          De etiske reglene som styrer ansattes hverdag. «Vi gjør alltid det rette, også når ingen ser» er et verdigrunnlag — ikke en visjon. Verdier brukes til å luke ut ansatte og leverandører som ikke passer kulturen.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 2 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Equinor sin reise
        </h2>
        <p style={bodyText}>
          Statoil endret navn til Equinor i 2018 for å signalisere bevegelsen fra ren olje- og gasselskap til energiselskap. Ny visjon, nye mål og nye konkurransestrategier — tilpasset en verden i overgang til fornybart.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Equinor sin reise" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 2 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er klare mål viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Uten tydelige mål er det umulig å vite om strategien virker. SMART-mål gir både retning, måling og motivasjon — alle nivåer i organisasjonen vet hva som forventes og når.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva står M-en i SMART-mål for?',
  options: [
    'Markedsorientert',
    'Målbart',
    'Motivasjon',
    'Multinasjonal',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvilke tre generiske konkurransestrategier ga Michael Porter oss?',
  options: [
    'Vekst, stabilitet, oppsigelse',
    'Kostnadslederskap, differensiering, fokusering',
    'Produkt, pris, plass',
    'Lokal, nasjonal, internasjonal',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en GAP-analyse?',
  options: [
    'Analyse av prisforskjeller mellom konkurrenter',
    'Forskjellen mellom hvor vi er nå og hvor vi vil være',
    'Analyse av kjønnsfordeling blant kunder',
    'En metode for å beregne overskudd',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function VisjonOgMalPresentation() {
        return (
          <PresentationShell
            presentationName="Visjon, mål og overordnede strategier"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Visjon"
    titleLine2="og mål"
            subtitle="Hvor skal vi? Forretningsidé, visjon, SMART-mål og overordnede strategier — bedriftens kompass."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
