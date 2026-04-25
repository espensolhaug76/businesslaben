      /**
       * ML2 · Visjon 2 — Kapittel 11: Kommunikasjonsstrategier
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
        <SlideLabel>Kapittel 11 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Integrert markedskommunikasjon (IMC)
        </h2>
        <p style={bodyText}>
          «En stemme utad» — alle kanaler, fra TV-reklame til kundeservice, leverer samme budskap. Konsistens bygger merkevare; sprik forvirrer kunden.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Integrert markedskommunikasjon (IMC)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kommunikasjonsmål" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kommunikasjonsmål
        </h2>
        <p style={bodyText}>
          Fra kjennskap (vet de at vi finnes?) til kunnskap (forstår de hva vi gjør?) til holdning (liker de oss?) til handling (kjøper de?). Hvert mål krever ulik strategi og budskap.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Påvirkningsmiksen
        </h2>
        <p style={bodyText}>
          Strategisk vekting mellom reklame (massekjennskap), PR (troverdighet), salgsfremming (kortsiktig boost), personlig salg (B2B og dyre kjøp), direkte markedsføring (lojalitet). Få bedrifter bruker bare én.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Påvirkningsmiksen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Den digitale kundereisen" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Den digitale kundereisen
        </h2>
        <p style={bodyText}>
          Oppdage → vurdere → konvertere → beholde. Tradisjonell trakt er ikke lineær lenger — kundene hopper inn og ut, sammenligner, leser anmeldelser, sjekker sosiale medier. Markedsføringen må være tilstede i alle ledd.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Innholdsstrategi
        </h2>
        <p style={bodyText}>
          Content Marketing bygger autoritet og tillit gjennom verdifulle artikler, videoer, podcaster. DnB sin Magma-blogg, Hubspot sine guider og Patagonia sine miljøreportasjer tjener langsiktig merkebygging — ikke direkte salg.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Innholdsstrategi" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Sosiale medier og dialog" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sosiale medier og dialog
        </h2>
        <p style={bodyText}>
          Fra enveiskommunikasjon til aktivt samspill. Kunden kan kommentere, kritisere, dele og kjøpe direkte i samme kanal. Krever respons-tid, evne til å håndtere ros og ris i sanntid.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Budsjettering
        </h2>
        <p style={bodyText}>
          Mål- og oppgavemetoden er det strategiske valget: definer kommunikasjonsmål, beregn aktivitetsbehov, allokér budsjett. Mer disiplinert enn «la oss ta 5 % av omsetningen» — men også vanskeligere å forsvare internt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Budsjettering" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Effektmåling (KPI)" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Effektmåling (KPI)
        </h2>
        <p style={bodyText}>
          Hvordan vet vi at det virker? ROI (return on investment), klikkrate (CTR), konverteringsgrad, brand recall, NPS (Net Promoter Score). Digitalt = presist, tradisjonelt = estimert.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 11 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Telenor sin sport-sponsing
        </h2>
        <p style={bodyText}>
          Telenor har sponset norsk fotball, ski og håndball i over 30 år. Synlighet, lokal forankring og emosjonell kobling til Norge bygger en posisjon penger alene ikke kan kjøpe — det er strategisk merkebygging i praksis.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Telenor sin sport-sponsing" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 11 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er strategisk kommunikasjon?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Kommunikasjon er mer enn støy — det er bygging av langsiktige verdier. En konsistent stemme over år bygger merkekapital; sprikende budskap eroderer den.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva betyr IMC?',
  options: [
    'International Marketing Council',
    'Integrated Marketing Communications — én stemme utad',
    'Internet Marketing Channel',
    'Internal Management Committee',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvilken budsjetteringsmetode er mest strategisk?',
  options: [
    'Prosent av omsetning',
    'Mål- og oppgavemetoden — definer mål, beregn behov, allokér budsjett',
    'Følg konkurrentene',
    'Bruk samme budsjett som i fjor',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er kjernen i \'Den digitale kundereisen\'?',
  options: [
    'At alle kunder er på TikTok',
    'Oppdage → vurdere → konvertere → beholde, ikke-lineær prosess',
    'At kunden kjøper alt på nett',
    'At reklamen er gratis',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function KommunikasjonsstrategierPresentation() {
        return (
          <PresentationShell
            presentationName="Kommunikasjonsstrategier"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Kommunikasjons-"
    titleLine2="strategi"
            subtitle="Integrert markedskommunikasjon — én stemme utad, gjennom alle kanaler, gjennom hele kundereisen."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
