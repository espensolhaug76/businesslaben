/**
 * ML1 — Kapittel 2: Markeder
 * Kilde: .manus/ml1-ml2.md, Visjon 1, kapittel 2.
 */
import PresentationShell, { Glass, SlideImg, SlideLabel, makeTerm, twoCol, bodyText } from './_lib/PresentationShell'
import type { ContentSlide } from './_lib/PresentationShell'
import type { QuizQuestion } from './QuizSlide'

const TERMS: Record<string, string> = {
  'Marked': 'En gruppe av kjøpere og selgere som utveksler varer eller tjenester. Kan være fysisk (et torg) eller digitalt (Finn.no).',
  'B2C': 'Business-to-Consumer. Bedrift selger til privatpersoner. Mange kunder, små beløp, ofte følelsesstyrte kjøp.',
  'B2B': 'Business-to-Business. Bedrift selger til bedrift. Få kunder, store beløp, rasjonelle og langsiktige beslutninger.',
  'Mellomhandlere': 'Grossister og detaljister som kjøper for å selge videre uten å bearbeide produktet. Eks: REMA 1000, NorgesGruppen.',
  'Det offentlige marked': 'Stat, fylke og kommune som kjøper varer og tjenester. Reguleres av Lov om offentlige anskaffelser. Anbud lyses ut på Doffin.',
  'Organisasjonsmarkedet': 'Ideelle aktører som Røde Kors og idrettslag. Målet er å tjene en sak eller medlemsmasse — ikke profitt.',
  'Globalisering': 'Verden vokser tettere sammen gjennom teknologi, transport og frihandel. Skaper både muligheter og lokal konkurranse.',
}

const Term = makeTerm(TERMS)

const SLIDES: ContentSlide[] = [
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 2 · Slide 1</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Hva er et <Term word="Marked" onShow={show} />?
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Et marked er en gruppe kjøpere og selgere som utveksler varer eller tjenester. Det kan være fysisk (et torg, et kjøpesenter) eller digitalt (Finn.no, Amazon).
          </p>
          <p style={bodyText}>
            Bedriften må først velge <strong style={{ color: '#f1f5f9' }}>hvilket marked</strong> den vil betjene før den kan utforme produkter, priser og kommunikasjon.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" alt="Marked" />
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80" alt="Forbrukermarked" />
        <div>
          <SlideLabel>Kapittel 2 · Slide 2</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="B2C" onShow={show} /> — forbrukermarkedet
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Privatpersoner som handler til eget bruk. Markedet er kjennetegnet av <strong style={{ color: '#f1f5f9' }}>mange kunder</strong>, relativt små beløp per transaksjon, og kjøp som ofte er <strong style={{ color: '#f1f5f9' }}>følelsesstyrte</strong>.
          </p>
          <p style={bodyText}>
            Eksempler: dagligvare, klesbutikker, restauranter, streamingtjenester. Markedsføringen jobber gjerne med bred reklame, sterk merkevare og emosjonell appell.
          </p>
        </div>
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 2 · Slide 3</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="B2B" onShow={show} /> — bedriftsmarkedet
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Virksomheter som handler av hverandre. Få kunder, store beløp, og <strong style={{ color: '#f1f5f9' }}>rasjonelle beslutningsprosesser</strong> der flere personer er involvert.
          </p>
          <p style={bodyText}>
            Salget skjer ofte gjennom personlig kontakt, anbud og langsiktige avtaler. Merkevaren betyr mindre enn pålitelighet, totalpris og leveringssikkerhet.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="B2B" />
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Mellomhandler" />
        <div>
          <SlideLabel>Kapittel 2 · Slide 4</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Mellomhandlere" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Grossister og detaljister kjøper varer for å selge dem videre uten å bearbeide dem. Eksempler: REMA 1000, NorgesGruppen, Asko.
          </p>
          <p style={bodyText}>
            Mellomhandlere har <strong style={{ color: '#f1f5f9' }}>betydelig forhandlingsmakt</strong> i Norge fordi få aktører kontrollerer store deler av distribusjonen i dagligvare.
          </p>
        </div>
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 2 · Slide 5</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Det offentlige marked" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Stat, fylker og kommuner kjøper varer og tjenester for over 700 milliarder kroner i året. Et enormt og stabilt marked, men strengt regulert.
          </p>
          <p style={bodyText}>
            Lov om offentlige anskaffelser krever <strong style={{ color: '#f1f5f9' }}>likebehandling, transparens og etterprøvbarhet</strong>. Anbud lyses ut på <em>Doffin</em>.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80" alt="Stat" />
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80" alt="Frivillighet" />
        <div>
          <SlideLabel>Kapittel 2 · Slide 6</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Organisasjonsmarkedet" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Ideelle aktører som Røde Kors, Redd Barna og idrettslag. Disse organisasjonene <strong style={{ color: '#f1f5f9' }}>tjener en sak eller medlemsmasse</strong>, ikke aksjonærer.
          </p>
          <p style={bodyText}>
            Markedsføringen handler om å bygge omdømme, rekruttere medlemmer og hente inn donasjoner — ikke å maksimere overskudd.
          </p>
        </div>
      </div>
    </Glass>
  ),
  ({ show: _show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 2 · Slide 7</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Internasjonale markeder
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Å selge utenlands krever forståelse for kultur, språk, lover og tollbarrierer. Det som virker i Norge kan være tabu i Japan eller forbudt i Saudi-Arabia.
          </p>
          <p style={bodyText}>
            Bedrifter må velge mellom å <strong style={{ color: '#f1f5f9' }}>standardisere</strong> (samme produkt overalt) eller <strong style={{ color: '#f1f5f9' }}>tilpasse</strong> (egen variant per land).
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80" alt="Globalt" />
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Globalt nettverk" />
        <div>
          <SlideLabel>Kapittel 2 · Slide 8</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Globalisering" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Verden vokser tettere sammen gjennom tre drivkrefter: <strong style={{ color: '#f1f5f9' }}>teknologi</strong> (internett, oversettelser), <strong style={{ color: '#f1f5f9' }}>transport</strong> (containerskip, fly) og <strong style={{ color: '#f1f5f9' }}>frihandel</strong> (EØS, WTO).
          </p>
          <p style={bodyText}>
            For en norsk bedrift betyr det både større muligheter — og hardere konkurranse fra Amazon, Shein og Temu.
          </p>
        </div>
      </div>
    </Glass>
  ),
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 2 · Slide 9 — Case</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
            Stormberg på fire markeder
          </h2>
          <div style={{ ...bodyText, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            Stormberg selger turklær til <Term word="B2C" onShow={show} /> (egen butikk og nett), til <Term word="B2B" onShow={show} /> (bedriftsuniformer), gjennom <Term word="Mellomhandlere" onShow={show} /> (Sport 1) og leverer på anbud til <Term word="Det offentlige marked" onShow={show} /> (Forsvaret). Samme produkt — fire ulike markedsstrategier.
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80" alt="Turklær" />
      </div>
    </Glass>
  ),
  ({ show: _show }) => (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <SlideLabel>Kapittel 2 · Oppsummering</SlideLabel>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
          Hvilket marked passer din bedrift?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          Bedriften må velge marked basert på ressurser og virksomhetsidé. Hvert marked har egne spilleregler — B2C krever bred kommunikasjon, B2B krever relasjoner, det offentlige krever anbudskompetanse, det internasjonale krever kulturforståelse.
        </p>
      </div>
    </Glass>
  ),
]

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva kjennetegner et B2B-marked sammenlignet med et B2C-marked?',
    options: [
      'B2B har mange kunder med små beløp, B2C har få kunder med store beløp',
      'B2B har få kunder med store beløp og rasjonelle beslutninger',
      'B2B er kun for offentlig sektor',
      'B2B og B2C er to navn på samme ting',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er Doffin?',
    options: [
      'En norsk bank for små bedrifter',
      'En lov om personvern',
      'Den offisielle plattformen for offentlige anbud i Norge',
      'En forening for industribedrifter',
    ],
    correct: 2,
    timeSeconds: 45,
  },
  {
    question: 'Hva er kjernen i organisasjonsmarkedet?',
    options: [
      'Maksimal profitt',
      'Bedrift-til-bedrift-handel',
      'Å tjene en sak eller medlemsmasse, ikke aksjonærer',
      'Internasjonal eksport',
    ],
    correct: 2,
    timeSeconds: 45,
  },
]

export default function MarkederPresentation() {
  return (
    <PresentationShell
      presentationName="Markeder"
      subjectLabel="ML1 · Visjon 1"
      titleLine1="Markeder"
      titleLine2="og målgrupper"
      subtitle="Forbrukermarked, bedriftsmarked, mellomhandlere, offentlig sektor, organisasjoner og internasjonale flater — hvert marked har sine egne spilleregler."
      contentSlides={SLIDES}
      quizSlides={QUIZ_SLIDES}
    />
  )
}
