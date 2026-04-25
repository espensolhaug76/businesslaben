      /**
       * ENT1 · EB1 — Kapittel 1: Innovatøren og entreprenøren
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
        <SlideLabel>Kapittel 1 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hva er entreprenørskap?
        </h2>
        <p style={bodyText}>
          Å identifisere muligheter og mobilisere ressurser for å skape verdi — økonomisk, sosialt eller kulturelt. Entreprenørskap handler ikke bare om å starte bedrifter, men om en arbeidsmåte og holdning til problemløsning.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er entreprenørskap?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Innovasjonstyper" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Innovasjonstyper
        </h2>
        <p style={bodyText}>
          Joseph Schumpeter identifiserte fire typer: produktinnovasjon (ny vare), prosessinnovasjon (ny måte å lage på), markedsinnovasjon (ny måte å selge på) og organisasjonsinnovasjon (ny struktur). Apple kombinerer ofte alle fire.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Egenskaper hos en gründer
        </h2>
        <p style={bodyText}>
          Forskning peker på fire kjerneegenskaper: utholdenhet (slå seg gjennom motgang), risikovilje (tåle usikkerhet), kreativitet (se nye løsninger) og sosiale ferdigheter (selge ideen til andre). Ingen er født med alt — det meste kan trenes.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Egenskaper hos en gründer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Intraprenørskap" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Intraprenørskap
        </h2>
        <p style={bodyText}>
          Innovasjon innad i eksisterende bedrifter. Ansatte som tenker som gründere, men har ressursene og sikkerheten i en stor organisasjon. 3M sin Post-it kom fra et intraprenørskapsprosjekt — ansatte fikk 15 % av tiden til egne prosjekter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Verdiskaping
        </h2>
        <p style={bodyText}>
          Tre former: økonomisk verdi (overskudd, lønninger, skatt), sosial verdi (samfunnsnytte, jobber, folkehelse) og kulturell verdi (opplevelser, mangfold, identitet). Bedrifter skaper alle tre — ofte samtidig.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Verdiskaping" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Entreprenørskap i Norge" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Entreprenørskap i Norge
        </h2>
        <p style={bodyText}>
          Norge har gode rammevilkår: stabilt politisk system, godt utdannet befolkning, sterke støtteordninger via Innovasjon Norge. Likevel er småbedrifters andel av sysselsettingen lavere enn i USA og Sverige.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Bærekraftig entreprenørskap
        </h2>
        <p style={bodyText}>
          Å løse sosiale eller miljømessige utfordringer gjennom en forretningsmodell. Tomra (resirkulering), Allmenn Praksis (tilgjengelig helse), Kahoot (digital læring) — bedrifter bygget rundt et samfunnsproblem.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Bærekraftig entreprenørskap" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Feiling som læring" />
      <div>
        <SlideLabel>Kapittel 1 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Feiling som læring
        </h2>
        <p style={bodyText}>
          «Fail fast, learn faster.» Silicon Valley feirer feilsuksess fordi de fleste vellykkede gründere har minst én konkurs i bagasjen. Hver feil gir dyrebar læring som neste forsøk drar nytte av.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 1 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Erna Solberg som intraprenør
        </h2>
        <p style={bodyText}>
          Da Erna Solberg ble Høyre-leder, drev hun en form for intraprenørskap: hentet nye velgergrupper, modernisert kommunikasjon, fornyet politikken. Hun var ikke gründer, men endret partiet innenfra — det er essensen i intraprenørskap.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Erna Solberg som intraprenør" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 1 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er kjernen i entreprenørskap?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Entreprenørskap er en arbeidsmåte og en holdning til problemløsning. Det handler mer om å se muligheter og handle enn om å starte bedrift — du kan være entreprenør i et stort selskap, en kommune eller en frivillig organisasjon.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hvilke fire innovasjonstyper definerte Joseph Schumpeter?',
  options: [
    'Liten, mellomstor, stor og global',
    'Produkt, prosess, marked og organisasjon',
    'Vekst, modning, tilbakegang og død',
    'Lokal, regional, nasjonal og internasjonal',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er intraprenørskap?',
  options: [
    'Internasjonal entreprenørskap',
    'Innovasjon innad i eksisterende bedrifter',
    'Internett-bedrifter',
    'Investering i andre gründere',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er kjernen i \'fail fast, learn faster\'?',
  options: [
    'Å mislykkes raskest mulig',
    'Å lære av feil og bruke den læringen i neste forsøk',
    'Å ikke ta sjanser',
    'Å bare prøve én gang',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function InnovatorenOgEntreprenorenPresentation() {
        return (
          <PresentationShell
            presentationName="Innovatøren og entreprenøren"
            subjectLabel="ENT1 · EB1"
            titleLine1="Innovatøren"
    titleLine2="og entreprenøren"
            subtitle="Fra idé til virkelighet — hvem starter for seg selv, hvorfor, og hva skiller en gründer fra en ansatt."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
