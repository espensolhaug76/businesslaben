      /**
       * ML1 · Visjon 1 — Kapittel 8: Konkurransemiddelet Pris
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
        <SlideLabel>Kapittel 8 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Pris som verdimåler
        </h2>
        <p style={bodyText}>
          Pris er det eneste elementet i markedsmiksen som gir inntekt — alt annet (produkt, distribusjon, kommunikasjon) er kostnader. Riktig prising er derfor den kraftigste enkeltfaktoren for lønnsomhet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Pris som verdimåler" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Prissettingsmetoder" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Prissettingsmetoder
        </h2>
        <p style={bodyText}>
          Tre hovedretninger: kostnadsbasert (selvkost + påslag), markedsbasert (hva er kunden villig til å betale?) og konkurransebasert (hva tar de andre?). De fleste bedrifter kombinerer alle tre.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Selvkostkalkyle
        </h2>
        <p style={bodyText}>
          Inntakskost + indirekte kostnader + fortjeneste = salgspris. Passer best i situasjoner med stabile kostnader og lite konkurranse — som offentlige anbud eller monopol.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Selvkostkalkyle" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Priselastisitet" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Priselastisitet
        </h2>
        <p style={bodyText}>
          Hvor mye salget endrer seg når prisen går opp eller ned. Elastisk vare: 10 % prisøkning gir 20 % salgsfall (klær). Uelastisk vare: 10 % prisøkning gir 2 % salgsfall (insulin).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Skumming vs. penetrering
        </h2>
        <p style={bodyText}>
          Skummestrategi: høy startpris for status og rask fortjeneste (Apple iPhone). Penetreringsstrategi: lav startpris for å vinne markedsandel raskt (Spotify Premium).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Skumming vs. penetrering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Prisdifferensiering" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Prisdifferensiering
        </h2>
        <p style={bodyText}>
          Ulik pris til ulike grupper: geografisk (dyrere i Norge enn Sverige), tidsbasert (sommerferie vs lavsesong), etter bruk (familie vs single), eller målgruppe (student-rabatt).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Psykologisk prissetting
        </h2>
        <p style={bodyText}>
          Terskeleffekten: 199,- føles mye billigere enn 200,-. Prispakking: 3 for 100,- selger bedre enn 33,33,- per stykk. Ankerpris: en dyr versjon i menyen får mellomprisen til å virke billig.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Psykologisk prissetting" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Priskrig" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Priskrig
        </h2>
        <p style={bodyText}>
          Når konkurrenter senker prisen, og du må følge med, ødelegges marginene for hele bransjen. Få tjener på priskrig — det taper både butikker og produsenter. Differensiering er bedre forsvar.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 8 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Black Friday-prisene
        </h2>
        <p style={bodyText}>
          Mange butikker hever prisene i oktober for å «sette dem ned» igjen i november. Forbrukertilsynet slår ned på dette. Reell prisreduksjon må sammenlignes med laveste pris siste 30 dager.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Black Friday-prisene" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 8 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvordan finne riktig pris?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Prisen må reflektere verdien kunden føler de får, samtidig som den dekker kostnader og gir profitt. Test, mål, juster — det finnes sjelden én riktig pris, men en rekke prøvinger som lærer deg hva markedet aksepterer.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hvorfor sier man at pris er det viktigste P-et i markedsmiksen?',
  options: [
    'Det er det letteste å endre',
    'Det er det eneste som gir inntekt — resten er kostnader',
    'Kunden bryr seg mest om pris',
    'Det er det første kunden ser',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva kjennetegner en uelastisk vare?',
  options: [
    'Salget faller dramatisk når prisen øker',
    'Salget endrer seg lite når prisen øker',
    'Varen kan strekkes mye',
    'Kunden bryr seg mye om pris',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er skummestrategi?',
  options: [
    'Å bruke skum i emballasjen for å redusere kostnader',
    'Lav startpris for å vinne markedsandel',
    'Høy startpris for status og rask fortjeneste tidlig',
    'Å rabattere produktene',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function PrisstrategiMl1Presentation() {
        return (
          <PresentationShell
            presentationName="Konkurransemiddelet Pris"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Pris"
            subtitle="Strategisk prissetting og lønnsomhet — det eneste P-et som gir inntekt. Resten er kostnader."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
