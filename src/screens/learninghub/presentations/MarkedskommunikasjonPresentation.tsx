      /**
       * ML1 · Visjon 1 — Kapittel 10: Konkurransemiddelet Markedskommunikasjon
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
        <SlideLabel>Kapittel 10 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kommunikasjonsprosessen
        </h2>
        <p style={bodyText}>
          Sender → koder budskapet → sendes via en kanal → mottaker avkoder. Støy er fienden — alt som forstyrrer signalet (annen reklame, distrahert kunde, dårlig lyd).
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjonsprosessen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Påvirkningsmiksen" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Påvirkningsmiksen
        </h2>
        <p style={bodyText}>
          Fem hovedverktøy: reklame, salgsfremming (rabatter, konkurranser), PR (omtale i media), personlig salg og direkte markedsføring (e-post, SMS). Riktig miks varierer med produkt og målgruppe.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          AIDA-modellen
        </h2>
        <p style={bodyText}>
          Klassisk modell for hvordan reklame virker: Attention (få oppmerksomhet), Interest (skap interesse), Desire (vekk ønske), Action (få handling). Alle steg må fungere — bryter ett, brister hele kjeden.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="AIDA-modellen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Push- og pull-strategi" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Push- og pull-strategi
        </h2>
        <p style={bodyText}>
          Push: dytt varen ut via forhandler (rabatter til butikkene). Pull: skap kundeetterspørsel slik at butikkene må føre varen (TV-reklame). Coca-Cola bruker pull, generiske vaskemidler bruker push.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kanalvalg i media
        </h2>
        <p style={bodyText}>
          Tradisjonelle medier (TV, radio, avis) gir bred rekkevidde, men er dyrt. Digitale flater (Google, Meta, TikTok) gir presisjon og målbarhet. De fleste store bedrifter bruker begge.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Kanalvalg i media" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Kreativ strategi" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kreativ strategi
        </h2>
        <p style={bodyText}>
          Hva skal vi si (innhold) og hvordan (form)? Humor, frykt, sex, pris, kvalitet — ulike grep for ulike målgrupper. En reklame uten klar idé er sjelden minneverdig, uansett hvor stort budsjettet er.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Budsjettering
        </h2>
        <p style={bodyText}>
          Tre vanlige metoder: prosent av omsetning (enkelt, men reaktivt), konkurransemetoden (følg de andre), eller mål- og oppgavemetoden (regn ut hva som faktisk trengs for å nå målet). Den siste er strategisk, men krever disiplin.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Budsjettering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Effektmåling" />
      <div>
        <SlideLabel>Kapittel 10 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Effektmåling
        </h2>
        <p style={bodyText}>
          Ble vi lagt merke til? (oppmerksomhet, recall). Endret vi holdninger? (preferanse, kjennskap). Solgte vi mer? (ROI). For digitale kanaler er målingene presise; for TV mer estimerte.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 10 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Telenor og julekampanjen
        </h2>
        <p style={bodyText}>
          Telenor har bygget en konsekvent julestil over mange år: emosjonelle historier om familie og tilhørighet, pakket inn i Telenor-blå. Det er ikke salget av enkeltabonnementer som måles — det er merkebyggingen som blir investert i.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Telenor og julekampanjen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 10 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor må kommunikasjon være integrert?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Kommunikasjon må være integrert og konsistent for å bygge merkevare. Hvis Facebook-reklamen sier én ting og butikken en annen, forvirres kunden — og merkevaren blir svakere, ikke sterkere.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva står AIDA for?',
  options: [
    'Action, Interest, Desire, Attention',
    'Attention, Interest, Desire, Action',
    'Average Internet Daily Audience',
    'Annonsering, Innholdsmarkedsføring, Direktesalg, Analyse',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på push og pull i markedsføring?',
  options: [
    'Push er på nett, pull er fysisk',
    'Push dytter varen via forhandler, pull skaper kundeetterspørsel',
    'Push er for B2B, pull for B2C',
    'Det er to navn på samme strategi',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvilken budsjetteringsmetode er mest strategisk men krever mest disiplin?',
  options: [
    'Prosent av omsetning',
    'Følg konkurrentene',
    'Mål- og oppgavemetoden — regn ut hva som faktisk kreves for å nå målet',
    'Bruk det samme som i fjor',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function MarkedskommunikasjonPresentation() {
        return (
          <PresentationShell
            presentationName="Konkurransemiddelet Markedskommunikasjon"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Markedskommunikasjon"
            subtitle="Påvirkning og budskap — hvordan bedriften snakker til markedet og bygger merkevare over tid."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
