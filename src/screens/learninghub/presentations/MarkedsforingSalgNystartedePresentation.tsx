      /**
       * ENT1 · EB1 — Kapittel 8: Markedsføring og salg for nystartede
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
          Guerilla Marketing
        </h2>
        <p style={bodyText}>
          Kreativ markedsføring med lavt budsjett — skape oppmerksomhet uten dyre annonser. Stunts, gateteater, viral video, uvanlige plasseringer. Kahoot ble kjent ved å gi det gratis til lærere — som så solgte det videre til skolene sine.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Guerilla Marketing" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Sosiale medier for gründere" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sosiale medier for gründere
        </h2>
        <p style={bodyText}>
          Bygge fellesskap og dialog med kundene gjennom TikTok, Instagram, LinkedIn. Velg én eller to plattformer der målgruppen er, ikke prøv å være overalt. Konsistens er viktigere enn frekvens.
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
          Innholdsmarkedsføring
        </h2>
        <p style={bodyText}>
          Del kunnskap som er nyttig for kunden for å bygge tillit. Gründer-blogger, video-tutorials, gratis e-bøker. «Hjelp, ikke selg» — over tid blir du den foretrukne eksperten.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Innholdsmarkedsføring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Personlig salg" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Personlig salg
        </h2>
        <p style={bodyText}>
          Den viktigste kanalen for nystartede. «Banking on doors» — direkte kontakt med potensielle kunder. Hver salgssamtale gir læring om hva som virker og hva som ikke virker. Outsource ikke salget — som gründer må DU selge selv først.
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
          Referansemarkedsføring
        </h2>
        <p style={bodyText}>
          Bruk fornøyde kunder for å skaffe nye (Word of Mouth). Anbefalingen fra en venn er kraftigere enn alle annonser sammen. Be aktivt om henvisninger — de fleste fornøyde kunder anbefaler ikke uten å bli spurt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Referansemarkedsføring" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Nettverksbygging" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Nettverksbygging
        </h2>
        <p style={bodyText}>
          Bruk eksisterende kontakter og delta på gründer-treff (StartupLab, MESH, Innovasjon Norge events). Mange forretningsmuligheter starter ved en samtale ved kaffemaskinen — ikke en LinkedIn-melding.
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
          Digital synlighet (SEO)
        </h2>
        <p style={bodyText}>
          Sørg for at folk finner deg når de søker etter problemet du løser. Google Søkekonsoll, Google Analytics — gratis verktøy som forteller hva folk faktisk søker etter. Skriv innhold som svarer på de spørsmålene.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Digital synlighet (SEO)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Salgstrakt" />
      <div>
        <SlideLabel>Kapittel 8 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Salgstrakt
        </h2>
        <p style={bodyText}>
          Oppmerksomhet → interesse → vurdering → kjøp. Mål antall personer i hver fase. Hvis 1000 ser annonsen din, 100 klikker, 10 ber om demo, 1 kjøper — er konvertering 0,1 %. Tall som dette gjør markedsføringen styrbar.
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
          Case — Klarna sin gründerfase
        </h2>
        <p style={bodyText}>
          Klarna brukte ikke betalt reklame i starten. De gikk direkte til nettbutikker og solgte fakturabetaling én og én. Når de fikk noen suksesser, brukte de dem som referanser for neste salg. Tre år med ren gründer-salg før de skalerte.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Klarna sin gründerfase" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 8 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvem er de første markedsførerne?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        I starten er eierne de viktigste markedsførerne og selgerne. Ingen kjenner produktet bedre, ingen har sterkere insentiv. Outsourcing kommer senere — først må gründerne lære markedet selv.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er guerilla marketing?',
  options: [
    'Aggressiv pressereklame',
    'Kreativ markedsføring med lavt budsjett — stunts, viral, uvanlige plasseringer',
    'Krigsmetafor i reklame',
    'Markedsføring kun via militære kanaler',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvorfor må gründeren selv selge i begynnelsen?',
  options: [
    'Det er billigere',
    'Lærer mest om markedet og hva som virker — kan ikke outsources i tidlig fase',
    'Loven krever det',
    'Investorer krever det',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er en salgstrakt?',
  options: [
    'En fysisk butikkmodell',
    'Modell som måler konvertering: oppmerksomhet → interesse → vurdering → kjøp',
    'Et CRM-system',
    'En type rabatt',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function MarkedsforingSalgNystartedePresentation() {
        return (
          <PresentationShell
            presentationName="Markedsføring og salg for nystartede"
            subjectLabel="ENT1 · EB1"
            titleLine1="Markedsføring"
    titleLine2="for nystartede"
            subtitle="Nå ut til de første kundene når merkevaren er ukjent og budsjettet lite."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
