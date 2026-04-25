      /**
       * ENT2 · EB2 — Kapittel 20: Jus og tvisteløsning i forretningslivet
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
        <SlideLabel>Kapittel 20 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Avtalerettslige prinsipper
        </h2>
        <p style={bodyText}>
          Når er en avtale bindende? Tilbud + aksept + samsvar = bindende avtale. Muntlige avtaler er bindende men vanskelige å bevise. Fullmakter regulerer hvem som kan binde bedriften juridisk.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Avtalerettslige prinsipper" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kjøpsrett (B2B)" />
      <div>
        <SlideLabel>Kapittel 20 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kjøpsrett (B2B)
        </h2>
        <p style={bodyText}>
          Kjøpsloven gjelder mellom næringsdrivende. Forbrukerkjøpsloven gjelder kun for B2C — den gir forbrukere mye sterkere vern enn bedrifter har overfor hverandre. B2B-bedrifter må passe på selv.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 20 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Erstatningsrett
        </h2>
        <p style={bodyText}>
          Ansvar for skade på person eller ting i næringsvirksomhet. Tre vilkår: skade, ansvarsgrunnlag (uaktsomhet eller objektivt ansvar), årsakssammenheng. Ansvarsforsikring beskytter bedriften mot store krav.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Erstatningsrett" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Konkurranserett" />
      <div>
        <SlideLabel>Kapittel 20 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Konkurranserett
        </h2>
        <p style={bodyText}>
          Forbud mot prissamarbeid (karteller — kan gi 10 % av omsetning i bot), markedsdeling og misbruk av dominerende stilling. Konkurransetilsynet har inspeksjonsmyndighet — uanmeldte besøk forekommer.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 20 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Immaterialrett (avansert)
        </h2>
        <p style={bodyText}>
          Håndheving av patenter, varemerker, design og opphavsrett. Beskyttelse mot piratkopiering — særlig viktig i internasjonal handel. Kostnad: patent 50 000–500 000 kr per land, varemerke billigere.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Immaterialrett (avansert)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Tvisteløsning" />
      <div>
        <SlideLabel>Kapittel 20 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Tvisteløsning
        </h2>
        <p style={bodyText}>
          Trinnvis: forhandling (billigst, raskest), mekling (nøytral tredjepart), rettssak (dyrt og langsomt — Tingretten). De fleste tvister bør løses uten rettssak hvis mulig — kostnader og tid er enorme.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 20 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Voldgift
        </h2>
        <p style={bodyText}>
          Privat domstol for raskere og konfidensiell løsning av tvister mellom bedrifter. Avgjørelsen er bindende. Brukes mye internasjonalt fordi den unngår nasjonale rettssystemer som kan favorisere lokale parter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Voldgift" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Gjeldsforfølgning" />
      <div>
        <SlideLabel>Kapittel 20 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Gjeldsforfølgning
        </h2>
        <p style={bodyText}>
          Inkasso (profesjonell innkrevning av gjeld), utlegg (rettslig sikring av krav i debitorens eiendeler), konkurs (når gjelden er ubetalbar). Konkurslovgivningen beskytter både kreditorer og skyldnere.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 20 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Ola Vs. Næringslivet
        </h2>
        <p style={bodyText}>
          Norske bedrifter taper milliarder i året på dårlige kontrakter, manglende avtaler og forsinket inkasso. En enkel kontrakt på 5 000 kr kan beskytte mot tap på flere millioner. Likevel sparer mange gründere på akkurat dette punktet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Ola Vs. Næringslivet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 20 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er juridisk kunnskap viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Juridisk kunnskap er et skjold som beskytter bedriftens verdier. Du trenger ikke være jurist, men må kjenne grunnreglene — eller hyre noen som gjør det. Sparing på advokatkostnader er ofte falsk økonomi.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er forskjellen på Kjøpsloven og Forbrukerkjøpsloven?',
  options: [
    'De er det samme',
    'Kjøpsloven gjelder B2B, Forbrukerkjøpsloven gir forbrukere sterkere vern i B2C-handel',
    'Kjøpsloven er for små bedrifter',
    'Forbrukerkjøpsloven er gammel og avskaffet',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er voldgift?',
  options: [
    'En type voldskriminalitet',
    'Privat domstol for raskere og konfidensiell tvisteløsning mellom bedrifter',
    'Et politisk parti',
    'En forsikringstype',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvor høy bot kan et kartell maksimalt få i Norge?',
  options: [
    '100 000 kr',
    '1 million kr',
    'Opptil 10 % av bedriftens omsetning',
    'Det er ingen øvre grense',
  ],
  correct: 2,
  timeSeconds: 45,
},
      ]

      export default function JusTvistelosningPresentation() {
        return (
          <PresentationShell
            presentationName="Jus og tvisteløsning i forretningslivet"
            subjectLabel="ENT2 · EB2"
            titleLine1="Forretnings-"
    titleLine2="jus"
            subtitle="Trygge juridiske rammer — fra avtalerett til tvisteløsning og gjeldsforfølgning."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
