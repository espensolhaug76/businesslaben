      /**
       * ML2 · Visjon 2 — Kapittel 7: Merkevarestrategier
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
        <SlideLabel>Kapittel 7 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hva er merkeverdi?
        </h2>
        <p style={bodyText}>
          Brand Equity er den ekstra verdien navnet tilfører produktet. Coca-Cola-formelen alene er ingenting verdt — Coca-Cola-merket er verdsatt til over 80 milliarder dollar.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hva er merkeverdi?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Aakers merkevaremodell" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Aakers merkevaremodell
        </h2>
        <p style={bodyText}>
          David Aaker definerte fire pilarer: kjennskap (kjenner kundene merket?), kvalitetsoppfatning (er det godt?), assosiasjoner (hva tenker man på?) og lojalitet (kommer kunden tilbake?).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Paraplymerke vs. individuelle merker
        </h2>
        <p style={bodyText}>
          Paraplymerke (Apple, Samsung) bruker samme navn på alle produkter — billig markedsføring, men én skandale rammer alt. Individuelle merker (P&G med Pampers, Tide, Gillette) gir fleksibilitet men koster mer.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Paraplymerke vs. individuelle merker" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Merkeutvidelse" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Merkeutvidelse
        </h2>
        <p style={bodyText}>
          Bruke et kjent navn i en ny kategori. Caterpillar gravemaskiner → Caterpillar arbeidssko. Suksessfullt fordi assosiasjonene «robust og slitesterk» overføres. Mindre vellykket: Colgate frosne måltider.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Merkets personlighet
        </h2>
        <p style={bodyText}>
          Gi merket menneskelige egenskaper kunden kan relatere til. Volvo = ansvarlig, trygg. Harley-Davidson = opprørsk, fri. Apple = kreativ, smart. Personlighet bygger emosjonell kobling.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Merkets personlighet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Private merker (EMV)" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Private merker (EMV)
        </h2>
        <p style={bodyText}>
          Egne merkevarer fra detaljistene. First Price (NorgesGruppen), Coop X-tra, REMA Mer. Truer produsentmerker, fordi prisen er lavere — men kvaliteten er ofte sammenlignbar.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Brand Equity Management
        </h2>
        <p style={bodyText}>
          Hvordan pleie og vedlikeholde merkeverdien over tid. Konsistent kommunikasjon, beskytte merkets posisjonering, oppfølging av kvalitet, krisehåndtering når noe går galt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Brand Equity Management" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Juridisk merkevern" />
      <div>
        <SlideLabel>Kapittel 7 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Juridisk merkevern
        </h2>
        <p style={bodyText}>
          Registrering av varemerke hos Patentstyret beskytter mot piratkopier. Internasjonal beskyttelse via WIPO. Uten registrering kan andre kopiere navn og logo lovlig.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 7 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Apple sin merkevarestrategi
        </h2>
        <p style={bodyText}>
          Apple er verdens mest verdifulle merkevare. Verdi: rundt 500 milliarder dollar. Bygget gjennom 40 år konsekvent kommunikasjon: enkelhet, design, kreativitet. Apple-effekt: kunder betaler 30–50 % premie for samme tekniske spesifikasjon som konkurrenter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Apple sin merkevarestrategi" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 7 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er en sterk merkevare verdt?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        En sterk merkevare er bedriftens viktigste immaterielle eiendel. Den gir prising-makt, kundelojalitet og motstandskraft mot kriser — verdier som regnskapet ofte ikke fanger opp.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er brand equity?',
  options: [
    'Bedriftens egenkapital',
    'Den ekstra verdien navnet tilfører produktet utover det fysiske',
    'Antall ansatte i markedsavdelingen',
    'Reklamebudsjettet for året',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvilke fire pilarer består Aakers merkevaremodell av?',
  options: [
    'Pris, produkt, plass, promosjon',
    'Kjennskap, kvalitetsoppfatning, assosiasjoner, lojalitet',
    'Bredde, dybde, høyde, volum',
    'Mål, strategi, tiltak, kontroll',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er EMV?',
  options: [
    'Et type ledelsesverktøy',
    'Egne merkevarer fra detaljisten — First Price, Coop X-tra',
    'European Marketing Vision',
    'Energi, Marked, Vekst',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MerkevarestrategiPresentation() {
        return (
          <PresentationShell
            presentationName="Merkevarestrategier"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Merkevare-"
    titleLine2="strategi"
            subtitle="Bygge Brand Equity — verdien navnet tilfører det fysiske produktet."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
