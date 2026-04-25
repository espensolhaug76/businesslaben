      /**
       * ML1 · Visjon 1 — Kapittel 6: Markedssegmentering og målgruppevalg (STP)
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
        <SlideLabel>Kapittel 6 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Segmentering
        </h2>
        <p style={bodyText}>
          Å dele opp markedet i mindre grupper med like behov og egenskaper. I stedet for å snakke til alle på en gang, snakker du til en spesifikk gruppe som faktisk vil høre hva du har å si.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Segmentering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kriterier B2C" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kriterier B2C
        </h2>
        <p style={bodyText}>
          Demografi (alder, kjønn, inntekt), geografi (sted, klima), psykografi (livsstil, verdier) og atferd (lojalitet, bruksmønster). De fleste bedrifter kombinerer flere kriterier.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kriterier B2B
        </h2>
        <p style={bodyText}>
          Type virksomhet (bransjekode), størrelse (omsetning, ansatte), geografi (region) og innkjøpsvaner (volum, hyppighet). Færre kriterier, men hver kunde betyr mer.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Kriterier B2B" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Krav til et segment" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Krav til et segment
        </h2>
        <p style={bodyText}>
          Et brukbart segment må være målbart (du kan telle det), tilgjengelig (du kan nå det), stort nok (det lønner seg) og håndterbart (du kan betjene det). Mangler ett av kravene, er det ikke et segment.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Målgruppevalg
        </h2>
        <p style={bodyText}>
          Tre strategier: udifferensiert (ett produkt til alle), differensiert (ulike produkter til ulike segmenter) eller konsentrert (alt fokus på ett nisjesegment). Valget styrer hele forretningsmodellen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Målgruppevalg" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Posisjonering" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Posisjonering
        </h2>
        <p style={bodyText}>
          Skape en unik plass i kundens hode sammenlignet med konkurrentene. Volvo = sikkerhet, Ferrari = fart, IKEA = rimelig design. Posisjonen må være enkel å forklare med ett ord.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Posisjonskart
        </h2>
        <p style={bodyText}>
          Et 2-aksers diagram som visualiserer merker basert på to viktige dimensjoner — typisk pris (lav-høy) og kvalitet (lav-høy). Hjelper deg se hvor det er ledig posisjon i markedet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Posisjonskart" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="USP og ESP" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          USP og ESP
        </h2>
        <p style={bodyText}>
          USP (Unique Selling Point) er den faktiske fordelen: «det varer dobbelt så lenge». ESP (Emotional Selling Point) er den følelsesmessige: «det får deg til å føle deg trygg». Sterke merker har begge.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 6 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Stormberg og Tesla
        </h2>
        <p style={bodyText}>
          Stormberg har valgt et tydelig segment: voksne nordmenn som vil ha rimelige turklær med god kvalitet og sosial profil. Tesla valgte premium-segmentet med fokus på teknologi og bærekraft. Begge sa nei til store deler av markedet — og lykkes derfor i sitt valgte segment.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Stormberg og Tesla" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 6 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor velge bort kunder?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Ved å velge bort noen kunder, blir vi mer attraktive for de vi faktisk vil ha. Et selskap som prøver å selge til alle ender ofte med å selge effektivt til ingen — fordi budskapet blir for generelt.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr STP-prosessen?',
  options: [
    'Strategi, Taktikk, Plan',
    'Salg, Tilbud, Pris',
    'Segmentering, Målgruppevalg (Targeting), Posisjonering',
    'Sluttbruker, Tilbyder, Produsent',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva er kjennetegn ved et brukbart segment?',
  options: [
    'Det består kun av ungdom',
    'Det er målbart, tilgjengelig, stort nok og håndterbart',
    'Det krever ingen reklame',
    'Det dekker hele befolkningen',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på USP og ESP?',
  options: [
    'USP er for B2B, ESP for B2C',
    'USP er den faktiske fordelen, ESP er den følelsesmessige',
    'USP er for produkt, ESP for tjeneste',
    'Det er to navn på samme ting',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function StpPresentation() {
        return (
          <PresentationShell
            presentationName="Markedssegmentering og målgruppevalg (STP)"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="STP-prosessen"
            subtitle="Segmentering, målgruppevalg og posisjonering — verktøyet som gjør generelle markeder til lønnsomme kundegrupper."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
