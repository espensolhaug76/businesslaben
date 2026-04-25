      /**
       * ENT1 · EB1 — Kapittel 9: Lovverk, avtaler og HMS
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
        <SlideLabel>Kapittel 9 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Relevante lover
        </h2>
        <p style={bodyText}>
          Avtaleloven (når er en avtale bindende?), kjøpsloven (B2B-handel), forbrukerkjøpsloven (B2C-handel) og markedsføringsloven (reklamens grenser). En gründer trenger ikke være jurist, men må kjenne grunnleggende regler.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Relevante lover" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Kontrakter" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kontrakter
        </h2>
        <p style={bodyText}>
          Skriftlige avtaler med kunder, leverandører og ansatte. «Avtaler er bindende» selv om de er muntlige — men bevisbyrden er enorm. En enkel skriftlig kontrakt sparer deg for konflikter senere.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Helse, miljø og sikkerhet (HMS)
        </h2>
        <p style={bodyText}>
          Internkontrollforskriften krever at alle bedrifter har systematisk HMS-arbeid. Selv en énmannsbedrift må ha skrevne prosedyrer for risikovurdering, opplæring og oppfølging. Arbeidstilsynet kan kontrollere uanmeldt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Helse, miljø og sikkerhet (HMS)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Risikovurdering" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Risikovurdering
        </h2>
        <p style={bodyText}>
          Identifiser farer og iverksett tiltak for å forebygge ulykker eller sykdom. Fysiske farer (brann, fall), psykososiale (stress, mobbing), kjemiske (allergi). Skriv det ned — udokumentert HMS er som ingen HMS.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Personvern (GDPR)
        </h2>
        <p style={bodyText}>
          Regler for håndtering av kunde- og ansattopplysninger. Krev samtykke før innsamling, dokumenter formål, slett data når formålet er oppfylt. Brudd kan gi 4 % av global omsetning i bot — også for små bedrifter.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Personvern (GDPR)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Immaterielle rettigheter (IPR)" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Immaterielle rettigheter (IPR)
        </h2>
        <p style={bodyText}>
          Beskyttelse av oppfinnelser (patent), design (designregistrering) og navn/logo (varemerke). Patent koster 50 000–500 000 kr og varer 20 år. Varemerke er billigere og varer evig så lenge det fornyes.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Arbeidsgiveransvar
        </h2>
        <p style={bodyText}>
          Plikter når du ansetter første medarbeider: skriftlig kontrakt, lønnsavregning, skattetrekk, arbeidsgiveravgift, OTP-pensjon, yrkesskadeforsikring, oppsigelsesvern. Bruk gjerne lønnssystem som Tripletex eller Conta.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Arbeidsgiveransvar" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Etikk i entreprenørskap" />
      <div>
        <SlideLabel>Kapittel 9 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Etikk i entreprenørskap
        </h2>
        <p style={bodyText}>
          Å gjøre det rette, selv når ingen ser på. Korrupsjon, misvisende reklame, urettferdig konkurranse — alt dette kan være lønnsomt på kort sikt, men ødelegger merkevaren og kan gi straffeforfølgelse på lang sikt.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 9 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Boligbygg-skandalen
        </h2>
        <p style={bodyText}>
          Boligbygg Oslo måtte tilbakebetale millioner etter å ha brutt anskaffelsesreglene. Konsekvenser: rettssaker, ledelsens avgang, omdømmetap. Selv en offentlig aktør går ned hvis lovverket ikke følges. Privat sektor er ikke mindre sårbar.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Boligbygg-skandalen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 9 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvorfor er orden viktig?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Orden i sysakene gir troverdighet og trygghet for vekst. Investorer, banker og store kunder forventer dokumentert HMS, GDPR-compliance og rene avtaler. Uten det stoppes mange dører — uansett hvor god ideen er.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hvilken lov regulerer alminnelig HMS i norske bedrifter?',
  options: [
    'Markedsføringsloven',
    'Internkontrollforskriften',
    'Forbrukerkjøpsloven',
    'Aksjeloven',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er den maksimale boten for GDPR-brudd?',
  options: [
    '10 000 kr',
    '100 000 kr',
    '4 % av global omsetning eller 20 millioner euro',
    'Det er ingen bot for små bedrifter',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hvorfor må man ha skriftlige kontrakter selv om muntlige er bindende?',
  options: [
    'Loven krever det',
    'Bevisbyrden er enorm med kun muntlige avtaler — skriftlig sparer konflikter',
    'Det er kun krav i B2B',
    'Det er bare en god vane',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function LovverkAvtalerHmsPresentation() {
        return (
          <PresentationShell
            presentationName="Lovverk, avtaler og HMS"
            subjectLabel="ENT1 · EB1"
            titleLine1="Lovverk"
    titleLine2="og HMS"
            subtitle="Sikkerhet og juridisk trygghet — rammene som beskytter bedriften og gjør vekst mulig."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
