      /**
       * ML1 · Visjon 1 — Kapittel 4: Profesjonelle markeder
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
        <SlideLabel>Kapittel 4 · Slide 1</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kjennetegn ved B2B
        </h2>
        <p style={bodyText}>
          Profesjonelle innkjøpere, store volumer per ordre, avledet etterspørsel og tette relasjoner over tid. En norsk stålprodusent har kanskje 30 kunder — men hver kunde betyr millioner i året.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" alt="Kjennetegn ved B2B" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Avledet etterspørsel" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 2</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Avledet etterspørsel
        </h2>
        <p style={bodyText}>
          B2B-etterspørselen er avledet av B2C-etterspørselen. Etterspørselen etter stål henger av etterspørselen etter biler. Faller bilsalget, faller ståletterspørselen — selv om stålprisen er uendret.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 3</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kjøpssentralen (DMU)
        </h2>
        <p style={bodyText}>
          Beslutninger tas i team kalt Decision Making Unit: brukere, påvirkere, beslutningstakere og portvakter. Selgeren må forstå hvem som spiller hvilken rolle, ellers selger man til feil person.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Kjøpssentralen (DMU)" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Kjøpsprosessen på B2B" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 4</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Kjøpsprosessen på B2B
        </h2>
        <p style={bodyText}>
          Mer formell enn B2C: spesifikasjon → anbud → forhandling → kontrakt → evaluering. En komplett salgsprosess kan ta 6–18 måneder for store kontrakter.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 5</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Valgkriterier
        </h2>
        <p style={bodyText}>
          Pris alene avgjør sjelden. Driftsikkerhet, service, leveringspresisjon, garanti og total kostnad over levetiden teller mer. En billig leverandør som leverer for sent kan koste kunden mer enn besparelsen.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Valgkriterier" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Anbud i det offentlige" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 6</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Anbud i det offentlige
        </h2>
        <p style={bodyText}>
          Stat og kommune må følge Lov om offentlige anskaffelser. Likebehandling, transparens og etterprøvbarhet er bærebjelker. Store summer på spill — én enkelt anbudsrunde kan gå over hundre millioner.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 7</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Sponsing på organisasjonsmarkedet
        </h2>
        <p style={bodyText}>
          Bedrifter sponser ideelle organisasjoner for å bygge omdømme og nå målgrupper. Det er en byttehandel: organisasjonen får penger, bedriften får eksponering og verdiassosiasjon.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Sponsing på organisasjonsmarkedet" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <SlideImg src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80" alt="Relasjonsbygging" />
      <div>
        <SlideLabel>Kapittel 4 · Slide 8</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Relasjonsbygging
        </h2>
        <p style={bodyText}>
          Massekommunikasjon virker dårlig i B2B. Personlig salg, messer, bransjepublikasjoner og CRM-systemer er viktigere. En god salgsperson er ofte verdt mer enn et reklamebudsjett på millioner.
        </p>
      </div>
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={twoCol}>
      <div>
        <SlideLabel>Kapittel 4 · Slide 9</SlideLabel>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
          Case — Doffin-anbud
        </h2>
        <p style={bodyText}>
          Når kommunen skal kjøpe nye datamaskiner til skolen, lyses anbudet ut på Doffin. Leverandører må levere skriftlig tilbud med pris, garanti og leveringsbetingelser. Den som vinner er ikke alltid billigst — men har best totalpakke.
        </p>
      </div>
      <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Case — Doffin-anbud" />
    </div>
  </Glass>
),
({ show: _show }) => (
  <Glass>
    <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
      <SlideLabel>Kapittel 4 · Oppsummering</SlideLabel>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
        Hva kreves for å lykkes på profesjonelle markeder?
      </h2>
      <p style={{ ...bodyText, fontSize: 20 }}>
        Spesialkompetanse, fokus på kundens lønnsomhet og evne til å tenke langsiktig. B2B-salg er aldri en enkelt-transaksjon — det er begynnelsen på et samarbeid som skal vare i mange år.
      </p>
    </div>
  </Glass>
),
      ]

      const QUIZ_SLIDES: QuizQuestion[] = [
        {
  question: 'Hva er avledet etterspørsel?',
  options: [
    'Etterspørsel som ble forbudt av lovverket',
    'Etterspørsel som henger av etterspørselen etter et annet produkt',
    'Etterspørsel som er styrt av reklame',
    'Etterspørsel etter brukte varer',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hva er DMU?',
  options: [
    'Direct Marketing Unit',
    'Decision Making Unit — kjøpssentralen i bedriften',
    'Digital Marketing Universe',
    'Department of Market Understanding',
  ],
  correct: 1,
  timeSeconds: 45,
},
{
  question: 'Hvilken lov regulerer offentlige anbud i Norge?',
  options: [
    'Markedsføringsloven',
    'Lov om offentlige anskaffelser',
    'Forbrukerkjøpsloven',
    'Avtaleloven',
  ],
  correct: 1,
  timeSeconds: 45,
},
      ]

      export default function ProfesjonelleMarkederPresentation() {
        return (
          <PresentationShell
            presentationName="Profesjonelle markeder"
            subjectLabel="ML1 · Visjon 1"
            titleLine1="Profesjonelle"
    titleLine2="markeder"
            subtitle="B2B, det offentlige og organisasjoner — markeder med profesjonelle innkjøpere, store volumer og lange relasjoner."
            contentSlides={SLIDES}
            quizSlides={QUIZ_SLIDES}
          />
        )
      }
