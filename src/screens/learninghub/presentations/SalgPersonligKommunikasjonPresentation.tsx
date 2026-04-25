      /**
       * ML1 · Visjon 1 — Kapittel 11: Salg og personlig kommunikasjon
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
          Salgsprosessen
        </h2>
        <p style={bodyText}>
          Steg-for-steg: planlegging → kontakt → behovsanalyse → presentasjon → innvendingsbehandling → avslutning → etterarbeid. Hvert steg krever forskjellige ferdigheter og verktøy.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Salgsprosessen" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Behovsanalyse" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Behovsanalyse
        </h2>
        <p style={bodyText}>
          Kunsten å lytte. 70/30-regelen: kunden snakker 70 %, du snakker 30 %. Du kan ikke selge en god løsning uten å forstå problemet — og du forstår problemet bare ved å spørre og høre etter.
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
          Innvendingsbehandling
        </h2>
        <p style={bodyText}>
          Et «nei» eller en innvending er en mulighet, ikke en blokkering. «Det er for dyrt» betyr ofte «jeg har ikke forstått verdien». Lytt, bekreft, gjenta, løs.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Innvendingsbehandling" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Ikke-verbal kommunikasjon" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Ikke-verbal kommunikasjon
        </h2>
        <p style={bodyText}>
          Kroppsspråk, blikkontakt, tonefall og pauser teller ofte mer enn ordene du sier. Et selvsikkert blikk og avslappet kropp signaliserer trygghet — som smitter på kunden.
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
          Mersalg og oppsalg
        </h2>
        <p style={bodyText}>
          Mersalg: tilby noe ekstra (en kake til kaffen). Oppsalg: tilby en bedre versjon (espresso i stedet for vanlig kaffe). Begge øker ordreverdien — men må gi reell verdi for kunden, ikke bare for selger.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Mersalg og oppsalg" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Selgerens egenskaper" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Selgerens egenskaper
        </h2>
        <p style={bodyText}>
          Empati (forstår kunden), ego-drive (vil vinne salget), produktkunnskap (kan svare på spørsmål) og integritet (lover kun det som holdes). Manglende én av disse, faller hele bygget.
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
          Etterarbeid
        </h2>
        <p style={bodyText}>
          Salget slutter ikke ved kassen. Oppfølging, takkemelding, feedback-spørsmål og påminnelse om service eller gjenkjøp. Gjenkjøp koster 5-7 ganger mindre enn nykunde-salg.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Etterarbeid" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Relasjonsmarkedsføring" />
      <div>
        <SlideLabel>Kapittel 11 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Relasjonsmarkedsføring
        </h2>
        <p style={bodyText}>
          Langsiktig vinning av kundens tillit gjennom gjentatte gode opplevelser. Spesielt viktig i B2B og høyverdige B2C (eiendom, biler, finansrådgivning). En lojal kunde er en gående reklame.
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
          Case — Bilforhandleren som lytter
        </h2>
        <p style={bodyText}>
          En god bilselger spør ikke «hvilken bil vil du ha?». Hun spør om familiestørrelse, daglig kjørerute, hytte i fjellet eller på sjøen, viktigheten av miljø, ladeforhold hjemme. Svarene styrer modellforslaget — kunden føler seg forstått, ikke selget til.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Bilforhandleren som lytter" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 11 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva er moderne salg?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Moderne salg handler om å hjelpe kunden å løse et problem. Den gamle bildet av påtrengende «pågående selger» er erstattet med rådgiver — den som tar seg tid til å forstå før hun anbefaler.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er 70/30-regelen i salg?',
  options: [
    '70 % rabatt, 30 % fortjeneste',
    '70 % fast lønn, 30 % bonus',
    'Kunden snakker 70 %, selger snakker 30 %',
    '70 % av kundene kjøper, 30 % avslår',
  ],
  correct: 2,
  timeSeconds: 45,
},
{
  question: 'Hva er forskjellen på mersalg og oppsalg?',
  options: [
    'De er det samme',
    'Mersalg er noe ekstra (kake til kaffen), oppsalg er en bedre versjon (espresso i stedet for kaffe)',
    'Mersalg er mer verdifullt',
    'Oppsalg er kun for B2B',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er den viktigste egenskapen i moderne salg?',
  options: [
    'Pågåenhet og press',
    'Evnen til å lytte og forstå kundens behov',
    'Lavest pris',
    'Mest reklame',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function SalgPersonligKommunikasjonPresentation() {
        return (
          <PresentationShell
            presentationName="Salg og personlig kommunikasjon"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Personlig"
    titleLine2="salg"
            subtitle="Relasjonsbygging ansikt til ansikt — den dyreste, men ofte mest effektive formen for markedskommunikasjon."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
