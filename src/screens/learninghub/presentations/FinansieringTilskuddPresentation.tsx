      /**
       * ENT1 · EB1 — Kapittel 6: Finansiering og tilskudd
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
          Kapitalbehov
        </h2>
        <p style={bodyText}>
          Hvor mye penger trenger vi før vi begynner å tjene penger? Beregn likviditetsbehovet måned for måned: lønn, husleie, utstyr, markedsføring, mva. Mange undervurderer behovet og må hente nye penger i en svak posisjon.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Kapitalbehov" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Egenkapital" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Egenkapital
        </h2>
        <p style={bodyText}>
          Penger gründerne selv spytter inn eller henter fra venner og familie («love money»). Risiko deles ofte med personlige relasjoner — sørg for klare avtaler selv med mor og far. Egenkapital signaliserer commitment til andre investorer.
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
          Lån og kreditt
        </h2>
        <p style={bodyText}>
          Banklån (krever sikkerhet og personlig garanti for små bedrifter), kassekreditt (fleksibilitet på løpende konto), leverandørkreditt (utsatt betaling). Banker er konservative — de vil sjelden finansiere ren oppstartsrisiko.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Lån og kreditt" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Offentlige tilskudd" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Offentlige tilskudd
        </h2>
        <p style={bodyText}>
          Innovasjon Norge tilbyr markedsavklaringstilskudd (opp til 100 000 kr), kommersialiseringstilskudd og lån. Forskningsrådet finansierer FoU. Søknadsprosessen er omfattende — men gratis penger er verdt arbeidet.
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
          Crowdfunding (folkefinansiering)
        </h2>
        <p style={bodyText}>
          Hente små beløp fra mange mennesker via plattformer som Kickstarter, Indiegogo eller norske Folkeinvest. Gir både penger og første kundebase samtidig — perfekt validering av produktidé.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Crowdfunding (folkefinansiering)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Business Angels (engleinvestorer)" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Business Angels (engleinvestorer)
        </h2>
        <p style={bodyText}>
          Private investorer som bidrar med både kapital (typisk 500 000 — 5 millioner) og kompetanse. De forventer ofte 10–30 % eierandel og aktiv styreplass. Bra for bedrifter som trenger mer enn penger.
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
          Bootstrapping
        </h2>
        <p style={bodyText}>
          Drive for egne midler uten ekstern kapital. Fokus på lav kostnad og rask inntjening. Mange suksesser startet bootstrapped (Mailchimp, GitHub, Basecamp) — gir full kontroll, men begrenser veksttakten.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Bootstrapping" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Pitching for kapital" />
      <div>
        <SlideLabel>Kapittel 6 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Pitching for kapital
        </h2>
        <p style={bodyText}>
          Hvordan presentere ideen for å overbevise investorer. Standard pitch er 3–10 minutter: problem, løsning, marked, forretningsmodell, team, traksjon, behov. Øv mange ganger — du får bare ett møte per investor.
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
          Case — No Isolation sin reise
        </h2>
        <p style={bodyText}>
          No Isolation lager teknologi mot ensomhet (AV1-roboten for kronisk syke barn). Startet med crowdfunding (validering + penger), så Innovasjon Norge (utvikling), deretter venture capital (skalering). Klassisk kapitaltrappestige fra idé til vekst.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — No Isolation sin reise" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 6 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva gir riktig finansiering?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Riktig finansiering gir bedriften nødvendig «runway» til å ta av — tid til å bevise modellen før pengene tar slutt. For lite penger gir desperate beslutninger; for mye gir slappe vaner.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er \'love money\'?',
  options: [
    'Penger fra romantiske partnere',
    'Investeringer fra venner og familie',
    'Sponsorpenger fra bedrifter',
    'Penger fra crowdfunding',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er typisk for engleinvestorer?',
  options: [
    'De gir kun lån',
    'Bidrar med kapital og kompetanse, forventer 10–30 % eierandel',
    'Krever full eierkontroll',
    'Kun for store bedrifter',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er bootstrapping?',
  options: [
    'En crowdfunding-plattform',
    'Drive for egne midler uten ekstern kapital',
    'En bestemt forretningsmodell',
    'Et statlig støtteprogram',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function FinansieringTilskuddPresentation() {
        return (
          <PresentationShell
            presentationName="Finansiering og tilskudd"
            subjectLabel="ENT1 · EB1"
            titleLine1="Finansiering"
            subtitle="Kapital til oppstarten — fra egne sparepenger til engleinvestorer."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
