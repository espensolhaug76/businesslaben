      /**
       * ENT2 · EB2 — Kapittel 17: Likviditetsstyring og finansrisiko
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
        <SlideLabel>Kapittel 17 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Likviditetsutfordringer ved vekst
        </h2>
        <p style={bodyText}>
          «Vokse seg til døde» — når salget øker raskere enn pengene kommer inn. Lager må kjøpes, ansatte må lønnes, fakturaer må betales — alt før kunden betaler. Mange suksesser har gått konkurs midt i veksten.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Likviditetsutfordringer ved vekst" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Arbeidskapital" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Arbeidskapital
        </h2>
        <p style={bodyText}>
          Styring av varelager (mindre = mindre bundet kapital), kundefordringer (raskere betaling = bedre likviditet) og leverandørgjeld (lengre kredittid = mer luft). Sammen utgjør de arbeidskapitalen — ofte den største kapitalbindingen i selskapet.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Finansieringskilder (avansert)
        </h2>
        <p style={bodyText}>
          Venture Capital (eierandel mot kapital og kompetanse), Private Equity (oppkjøp av modne selskaper) og Børsnotering (IPO — Initial Public Offering). Hver kilde har egne regler, kostnader og forventninger.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Finansieringskilder (avansert)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Lånefinansiering" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Lånefinansiering
        </h2>
        <p style={bodyText}>
          Obligasjonslån (selges til mange investorer på markedet) vs. banklån (én långiver, mer fleksibel). Pant og kausjon brukes som sikkerhet. Børsnoterte selskaper bruker ofte obligasjoner til store summer.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Leasing og factoring
        </h2>
        <p style={bodyText}>
          Leasing: leie av utstyr i stedet for å kjøpe — sparer kapital, men ofte dyrere på sikt. Factoring: selg fakturaer til en factoring-selskap som krever inn — gir umiddelbar likviditet, men koster i avgifter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Leasing og factoring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Kapitalstruktur" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kapitalstruktur
        </h2>
        <p style={bodyText}>
          Balansen mellom egenkapital (egne penger, ingen tilbakebetalingsplikt) og gjeld (lånt kapital, må betales tilbake). Mer gjeld = høyere avkastning på egenkapital, men også høyere risiko (giring).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Finansiell risiko
        </h2>
        <p style={bodyText}>
          Valutarisiko (eksportbedrifter rammes når kronen styrkes), renterisiko (lånekostnader øker når renten stiger), kredittrisiko (kunder kan ikke betale). Hver risiko kan sikres med finansielle instrumenter — men det koster.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Finansiell risiko" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Rapportering til investorer" />
      <div>
        <SlideLabel>Kapittel 17 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Rapportering til investorer
        </h2>
        <p style={bodyText}>
          Hvordan holde eiere informert og fornøyde. Kvartalsrapporter, årsrapporter, kapitalmarkedsdager. Transparens bygger tillit; overraskelser ødelegger den. Børsnoterte selskaper har strenge informasjonsplikter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 17 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Norwegian sin likviditetskrise
        </h2>
        <p style={bodyText}>
          Norwegian rapporterte rekordtall i 2019 — sterk vekst, ekspansjon. Likviditeten var imidlertid sterkt presset. Pandemien i 2020 senket etterspørselen, og Norwegian måtte til skifteretten — selv om regnskapet året før så bra ut. Klassisk eksempel på 'vokse seg til døde'.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Norwegian sin likviditetskrise" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 17 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er kongen for vekstbedrifter?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Overskudd er en mening, kontanter er et faktum. Du kan ha overskudd på papiret, men hvis kontoen er tom, går du konkurs. Likviditet er kongen — særlig under vekst.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr \'å vokse seg til døde\'?',
  options: [
    'Å bli for stor til å håndtere',
    'Salget øker raskere enn pengene kommer inn — likviditetskrise i vekst',
    'Å miste markedsandelen',
    'Å bli oppkjøpt',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er factoring?',
  options: [
    'En type produksjonsmetode',
    'Selge fakturaer til et factoring-selskap for umiddelbar likviditet',
    'En matematisk operasjon',
    'En markedsføringsstrategi',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er kjernen i \'Overskudd er en mening, kontanter er et faktum\'?',
  options: [
    'Regnskap er upålitelig',
    'Lønnsomhet på papiret betyr ingenting hvis kontantene er borte — likviditet styrer overlevelse',
    'Bedrifter bør ikke ha overskudd',
    'Kontanter er ulovlig',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function LikviditetsstyringFinansrisikoPresentation() {
        return (
          <PresentationShell
            presentationName="Likviditetsstyring og finansrisiko"
            subjectLabel="ENT2 · EB2"
            titleLine1="Likviditet"
    titleLine2="og kapital"
            subtitle="Bedriftens blodtilførsel — hvordan unngå å vokse seg til døde og styre finansiell risiko."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
