      /**
       * ENT1 · EB1 — Kapittel 5: Etablering og selskapsformer
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
        <SlideLabel>Kapittel 5 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Valg av selskapsform
        </h2>
        <p style={bodyText}>
          Enkeltpersonforetak (ENK) vs. Aksjeselskap (AS) er hovedvalget. ENK er enkelt og billig, men gir personlig ansvar. AS gir begrenset ansvar, men krever 30 000 kr i aksjekapital og mer formalitet.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Valg av selskapsform" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Aksjeselskap (AS)" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Aksjeselskap (AS)
        </h2>
        <p style={bodyText}>
          Krav: minst 30 000 kr i aksjekapital, registrert styre, revisor (over visse grenser). Begrenset ansvar — eierne risikerer kun aksjekapitalen, ikke privat formue. Du kan jobbe som ansatt i ditt eget AS.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Enkeltpersonforetak (ENK)
        </h2>
        <p style={bodyText}>
          Lav etableringsterskel: kun registrering i Brønnøysund (gratis i Foretaksregisteret). Men: fullt personlig ansvar for gjeld og forpliktelser. Bedriften = du. Banken kan ta huset hvis det går galt.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Enkeltpersonforetak (ENK)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Registreringsprosessen" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Registreringsprosessen
        </h2>
        <p style={bodyText}>
          Samordnet registermelding via Altinn — én utfylling registrerer deg i alle relevante registre (Foretaksregisteret, Enhetsregisteret, MVA hvis omsetning &gt; 50 000). Får organisasjonsnummer på dagen ofte.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Navn og merkevare
        </h2>
        <p style={bodyText}>
          Foretaksnavnet må være unikt i Norge (sjekk på Brønnøysund). Vil du beskytte logo og merke, må du registrere varemerke hos Patentstyret. Internasjonalt kan beskyttelsen utvides via WIPO.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Navn og merkevare" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Skatter og avgifter" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Skatter og avgifter
        </h2>
        <p style={bodyText}>
          Mva-registeret kreves når omsetningen passerer 50 000 kr/år (årlig). Skattetrekk: 15 % forskuddsskatt for ENK, AS-eiere får utbytte med 35,2 % skatt. Arbeidsgiveravgift om du har ansatte.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Forsikringer
        </h2>
        <p style={bodyText}>
          Yrkesskadeforsikring er lovpålagt for alle ansatte. Ansvarsforsikring beskytter bedriften mot erstatningskrav fra kunder. Pensjonsordning (OTP) er pålagt fra 1 ansatt med over 20 % stilling.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Forsikringer" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Avtaler mellom gründere" />
      <div>
        <SlideLabel>Kapittel 5 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Avtaler mellom gründere
        </h2>
        <p style={bodyText}>
          Aksjonæravtale er gull verdt før konflikten oppstår. Regulerer hvem som bestemmer hva, hvordan utbytter fordeles, hva som skjer hvis en gründer slutter eller dør. Mange gründere venter til det er for sent.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 5 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — To gründere uten aksjonæravtale
        </h2>
        <p style={bodyText}>
          To venner startet sammen, eide 50/50, ingen avtale. Etter to år ville den ene satse alt, den andre ville selge. Resultat: rettssak i tre år, bedriften gikk konkurs underveis. En aksjonæravtale på 10 000 kr ville unngått alt sammen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — To gründere uten aksjonæravtale" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 5 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hvilken form skal du velge?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Velg form som gir nødvendig trygghet og rom for vekst. Ikke overinvester i AS hvis du tester en sideforretning — ENK er ofte rett start. Vurder å bytte til AS når omsetningen vokser.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er hovedforskjellen på ENK og AS?',
  options: [
    'AS er for store bedrifter, ENK for små',
    'ENK gir personlig ansvar, AS gir begrenset ansvar (kun aksjekapitalen)',
    'AS er bare for industri',
    'ENK krever flere ansatte',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvor mye aksjekapital må et AS ha minimum?',
  options: [
    '10 000 kr',
    '30 000 kr',
    '100 000 kr',
    '1 million kr',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Når må man være registrert i mva-registeret?',
  options: [
    'Fra første salg',
    'Når omsetningen passerer 50 000 kr per år',
    'Bare ved B2B-salg',
    'Aldri for små bedrifter',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function EtableringSelskapsformerPresentation() {
        return (
          <PresentationShell
            presentationName="Etablering og selskapsformer"
            subjectLabel="ENT1 · EB1"
            titleLine1="Etablering"
            subtitle="Fra idé til juridisk enhet — selskapsformer, registrering og første praktiske steg."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
