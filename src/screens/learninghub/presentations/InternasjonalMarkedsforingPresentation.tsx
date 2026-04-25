      /**
       * ML2 · Visjon 2 — Kapittel 15: Markedsføring på internasjonale markeder
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
        <SlideLabel>Kapittel 15 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Hvorfor gå utenlands?
        </h2>
        <p style={bodyText}>
          Vekst (norsk marked er begrenset til 5,5 millioner), stordriftsfordeler (samme produkt selges flere ganger), risikospredning (ikke avhengig av norsk konjunktur), tilgang til ressurser eller kompetanse.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Hvorfor gå utenlands?" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Etableringsstrategier" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etableringsstrategier
        </h2>
        <p style={bodyText}>
          Fra lavt til høyt engasjement: eksport (selg fra Norge), lisensiering (la andre produsere), franchising (la andre drifte), joint venture (sammen med lokal partner), heleid datterselskap (full kontroll, men full risiko).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kulturelle barrierer
        </h2>
        <p style={bodyText}>
          Forståelse av normer, verdier, språk og religion. Norske direkte kommunikasjon kan oppleves uhøflig i Asia. Pepsi mistet milliarder i Kina på en feilmeldt tagline. Kultur er ofte den største barrieren — ikke språk.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Kulturelle barrierer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Standardisering vs. adaptasjon" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Standardisering vs. adaptasjon
        </h2>
        <p style={bodyText}>
          Lik markedsmiks overalt (lavere kostnad, sterkere global merkevare) eller lokal tilpasning (bedre kulturell relevans, høyere kostnad). De fleste store merkevarer kombinerer: McDonalds har både Big Mac globalt og McSpicy Paneer i India.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Landanalysen (PESTEL)
        </h2>
        <p style={bodyText}>
          Kartlegging av risiko før inntreden. Politisk stabilitet, økonomisk styrke, sosiale normer, teknologi-modenhet, miljølovgivning, lovverk. Et 50-siders PESTEL-dokument er standard før store internasjonale satsninger.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Landanalysen (PESTEL)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Internasjonal prising" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Internasjonal prising
        </h2>
        <p style={bodyText}>
          Dumping (selge under selvkost for å vinne marked — ofte ulovlig), valutasvingninger (kronesvekkelse gir norske eksportører fordel), transfer pricing (interne priser mellom bedriftens enheter — strengt regulert).
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Global kommunikasjon
        </h2>
        <p style={bodyText}>
          Språkbarrierer og kulturelle koder i reklame. Engelske slagord oversettes ikke alltid godt. Bilder av kvinner uten hijab vil ikke fungere i Saudi-Arabia. Lokale byråer er uvurderlige.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Global kommunikasjon" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Logistikk over landegrenser" />
      <div>
        <SlideLabel>Kapittel 15 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Logistikk over landegrenser
        </h2>
        <p style={bodyText}>
          Toll, frakt, lokale distributører, sertifiseringer (CE-merking, FDA-godkjenning). Pakker som krysser grense kan stoppes i flere uker. Logistikk-kostnader kan utgjøre 15–30 % av sluttprisen i fjerne markeder.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 15 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Norwegian sin USA-satsing
        </h2>
        <p style={bodyText}>
          Norwegian satset hardt på lavprisflyvninger til USA. Manglende lokalkunnskap, hard konkurranse, valutarisiko og pandemi førte til konkurs i 2020. Lærdom: lokal innsikt og finansielt bærekraftig modell må være på plass før internasjonal vekst.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Norwegian sin USA-satsing" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 15 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor krever internasjonal suksess ydmykhet?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Internasjonal suksess krever ydmykhet overfor lokale forskjeller. Det som virker hjemme er ikke automatisk overførbart — kulturen, kjøpsadferden og konkurransen er alltid annerledes.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er en lavrisiko-strategi for internasjonal etablering?',
  options: [
    'Heleid datterselskap',
    'Eksport — selg fra hjemmemarkedet',
    'Joint venture',
    'Direkte investering',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er transfer pricing?',
  options: [
    'Frakt over landegrenser',
    'Interne priser mellom bedriftens enheter — strengt regulert av skattemyndigheter',
    'Valutaomregning',
    'Eksport-rabatter',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er den største barrieren i internasjonalisering ifølge erfaring?',
  options: [
    'Språk',
    'Kultur og lokale skikker — ikke språk',
    'Toll',
    'Tidsforskjell',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function InternasjonalMarkedsforingPresentation() {
        return (
          <PresentationShell
            presentationName="Markedsføring på internasjonale markeder"
            subjectLabel="ML2 · Visjon 2"
            titleLine1="Internasjonal"
    titleLine2="markedsføring"
            subtitle="Verden som lekeplass — kulturforståelse, etableringsstrategier og global merkebygging."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
