/**
 * ML1 — Kapittel 1: Markedsføring som fag og tankesett
 * Kilde: .manus/ml1-ml2.md, Visjon 1, kapittel 1.
 */
import PresentationShell, { Glass, SlideImg, SlideLabel, makeTerm, twoCol, listStyle, bodyText } from './_lib/PresentationShell'
import type { ContentSlide } from './_lib/PresentationShell'
import type { QuizQuestion } from './QuizSlide'

const TERMS: Record<string, string> = {
  'Markedsføring': 'Prosessen med å skape verdi for kunden og bygge sterke relasjoner for å få verdi tilbake. Mer enn bare salg og reklame.',
  'Behov': 'En grunnleggende mangelfølelse — fysiologisk (mat, søvn), trygghet, tilhørighet, anerkjennelse eller selvrealisering. Markedsføringen kan ikke skape behov, kun synliggjøre dem.',
  'Ønsker': 'Hvordan vi velger å dekke et behov. Formes av kultur, personlighet og påvirkning. Markedsføringen kan endre ønsker — fra Coca-Cola til Pepsi.',
  'Etterspørsel': 'Et ønske som er støttet av kjøpekraft og betalingsvilje. Ingen etterspørsel = ingen marked.',
  'MANGO-modellen': 'Helhetlig markedsføring drevet av Mennesker, Ansvar, Nettverk, Gjennomføring og Overvåking. Skiller god markedsføring fra ren salgstaktikk.',
  'Triple Bottom Line': 'Bedriftens tre bunnlinjer: økonomisk overskudd, sosial nytte og miljømessig avtrykk. People, Planet, Profit.',
  'Byttehandel': 'En transaksjon der begge parter opplever å få mer verdi enn det de gir fra seg. Grunnlaget for all markedsføring.',
  'Ledelsesprosessen': 'Den sirkulære arbeidsmåten: Analyse → Mål → Strategi → Tiltak → Kontroll → ny analyse. Aldri en lineær prosess.',
}

const Term = makeTerm(TERMS)

const SLIDES: ContentSlide[] = [
  // Slide 1 — Definisjon
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 · Slide 1</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Hva er <Term word="Markedsføring" onShow={show} />?
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Markedsføring er prosessen med å <strong style={{ color: '#f1f5f9' }}>skape verdi for kunden</strong> og bygge sterke relasjoner for å få verdi tilbake. Det er en helhetlig forretningsfilosofi, ikke en samling reklametriks.
          </p>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Kjernen er en <Term word="Byttehandel" onShow={show} />: kunden gir penger eller oppmerksomhet, bedriften leverer en løsning på et behov. Begge parter må sitte igjen med opplevd verdi.
          </p>
          <p style={bodyText}>
            En god markedsfører forstår markedet så godt at produktene «selger seg selv» — som Peter Drucker formulerte det.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Møterom" />
      </div>
    </Glass>
  ),
  // Slide 2 — Behov vs ønsker
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80" alt="Behov og ønsker" />
        <div>
          <SlideLabel>Kapittel 1 · Slide 2</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Behov" onShow={show} /> vs. <Term word="Ønsker" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            <strong style={{ color: '#f1f5f9' }}>Behov</strong> er en grunnleggende mangelfølelse — sult, trygghet, tilhørighet. De er biologisk og kulturelt gitt og kan ikke «skapes» av reklame.
          </p>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            <strong style={{ color: '#f1f5f9' }}>Ønsker</strong> er hvordan vi velger å dekke behovet. Sulten kan dekkes av sushi, lefse eller grandis — kultur, identitet og merkevare bestemmer.
          </p>
          <p style={bodyText}>
            Markedsføringen påvirker <em>ønsker</em>, ikke <em>behov</em>. Det er en viktig etisk grense.
          </p>
        </div>
      </div>
    </Glass>
  ),
  // Slide 3 — Etterspørsel
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 · Slide 3</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Etterspørsel" onShow={show} /> = ønsker + kjøpekraft
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Et ønske om en Tesla blir bare etterspørsel hvis du faktisk kan betale for den. Uten kjøpekraft og betalingsvilje, intet marked.
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <p style={{ ...bodyText, color: '#38bdf8', fontWeight: 700, textAlign: 'center', fontSize: 20 }}>
              Behov + Ønske + Kjøpekraft = Etterspørsel
            </p>
          </div>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Markedsføringens jobb er å vekke ønsket, og samtidig sørge for at prisen og finansieringen passer kjøpekraften.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1556742400-b5b7c5121f5e?auto=format&fit=crop&w=800&q=80" alt="Penger" />
      </div>
    </Glass>
  ),
  // Slide 4 — Fagets utvikling
  ({ show: _show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80" alt="Utvikling" />
        <div>
          <SlideLabel>Kapittel 1 · Slide 4</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Fagets utvikling
          </h2>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>1900: Produksjonsorientering</strong> — «Folk kjøper det vi lager». Henry Ford og samlebåndet.
            </li>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>1950: Salgsorientering</strong> — «Hvis vi presser, kjøper de». Selger fokuserer på avslutning.
            </li>
            <li style={{ ...bodyText, marginBottom: 8 }}>
              <strong style={{ color: '#f1f5f9' }}>1970: Markedsorientering</strong> — «Kunden vet best». Behov styrer produksjonen.
            </li>
            <li style={bodyText}>
              <strong style={{ color: '#f1f5f9' }}>2000+: Samfunnsorientering</strong> — «Bærekraft og etikk teller». Hele samfunnet er kunde.
            </li>
          </ul>
        </div>
      </div>
    </Glass>
  ),
  // Slide 5 — MANGO
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 · Slide 5</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="MANGO-modellen" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            Helhetlig markedsføring drives av fem byggesteiner som alle må være på plass:
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong style={{ color: '#38bdf8' }}>M</strong>ennesker — kunder, ansatte, samfunn</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong style={{ color: '#38bdf8' }}>A</strong>nsvar — etisk og bærekraftig drift</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong style={{ color: '#38bdf8' }}>N</strong>ettverk — partnere, leverandører, allianser</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong style={{ color: '#38bdf8' }}>G</strong>jennomføring — kompetanse til å levere</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}><strong style={{ color: '#38bdf8' }}>O</strong>vervåking — måling og læring</li>
            </ul>
          </div>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="MANGO" />
      </div>
    </Glass>
  ),
  // Slide 6 — Bærekraftig markedsføring
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" alt="Bærekraft" />
        <div>
          <SlideLabel>Kapittel 1 · Slide 6</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Triple Bottom Line" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            Moderne bedrifter måles på <strong style={{ color: '#f1f5f9' }}>tre bunnlinjer</strong>, ikke bare overskuddet:
          </p>
          <ul style={listStyle}>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#38bdf8' }}>Profit</strong> — økonomisk lønnsomhet og overlevelse</li>
            <li style={{ ...bodyText, marginBottom: 8 }}><strong style={{ color: '#38bdf8' }}>People</strong> — sosial nytte og rettferdighet</li>
            <li style={bodyText}><strong style={{ color: '#38bdf8' }}>Planet</strong> — miljømessig avtrykk</li>
          </ul>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Bedrifter som bare måler én dimensjon får problemer på sikt — investorer, kunder og lovverk krever helhet.
          </p>
        </div>
      </div>
    </Glass>
  ),
  // Slide 7 — Byttehandelen
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 · Slide 7</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Byttehandel" onShow={show} /> som kjerne
          </h2>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            All markedsføring bygger på frivillig bytte. Begge parter må oppleve at de får mer verdi enn de gir fra seg, ellers gjentas ikke transaksjonen.
          </p>
          <p style={{ ...bodyText, marginBottom: 12 }}>
            En vellykket byttehandel skaper grunnlag for <strong style={{ color: '#f1f5f9' }}>gjenkjøp og lojalitet</strong>. Det er vanligvis 5–7 ganger billigere å beholde en kunde enn å skaffe en ny.
          </p>
          <p style={bodyText}>
            Derfor handler god markedsføring om langsiktige relasjoner, ikke enkeltsalg.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80" alt="Handshake" />
      </div>
    </Glass>
  ),
  // Slide 8 — Ledelsesprosessen
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <SlideImg src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Sirkulær prosess" />
        <div>
          <SlideLabel>Kapittel 1 · Slide 8</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            <Term word="Ledelsesprosessen" onShow={show} />
          </h2>
          <p style={{ ...bodyText, marginBottom: 16 }}>
            En sirkulær prosess i fem steg som aldri stopper:
          </p>
          <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem' }}>
            <ul style={listStyle}>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>1. <strong>Analyse</strong> — hvor er vi nå?</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>2. <strong>Mål</strong> — hvor skal vi?</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>3. <strong>Strategi</strong> — hvordan kommer vi dit?</li>
              <li style={{ ...bodyText, color: '#f1f5f9' }}>4. <strong>Tiltak</strong> — hva gjør vi konkret?</li>
              <li style={{ ...bodyText, color: '#38bdf8', fontWeight: 700 }}>5. Kontroll → tilbake til analyse</li>
            </ul>
          </div>
        </div>
      </div>
    </Glass>
  ),
  // Slide 9 — Case
  ({ show }) => (
    <Glass>
      <div style={twoCol}>
        <div>
          <SlideLabel>Kapittel 1 · Slide 9 — Case</SlideLabel>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
            Tine vs. Q-Meieriene
          </h2>
          <div style={{ ...bodyText, background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: 16 }}>
            Begge dekker det samme <Term word="Behov" onShow={show} /> (sult/næring), men de spiller på ulike <Term word="Ønsker" onShow={show} />: Tine = tradisjon og trygghet, Q = friskhet og utfordrer-merke. Samme behov, ulike løsninger — det er <Term word="Markedsføring" onShow={show} /> i praksis.
          </div>
          <p style={bodyText}>
            Når du ser melk i butikken neste gang: spør deg selv hvilket «ønske» hvert merke prøver å vekke i deg.
          </p>
        </div>
        <SlideImg src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80" alt="Melk i butikken" />
      </div>
    </Glass>
  ),
  // Slide 10 — Oppsummering
  ({ show: _show }) => (
    <Glass>
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <SlideLabel>Kapittel 1 · Oppsummering</SlideLabel>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 32, lineHeight: 1.2 }}>
          Hvorfor er markedsføring mer enn salg?
        </h2>
        <p style={{ ...bodyText, fontSize: 20 }}>
          Markedsføring handler om langsiktig verdiskaping for både bedrift, kunde og samfunn. Det er en sirkulær prosess som balanserer de tre bunnlinjene Profit, People og Planet — og bygger relasjoner, ikke enkeltsalg.
        </p>
      </div>
    </Glass>
  ),
]

// Titler for sidepanel-editoren — index 0 = forsiden, 1–10 = innholds-slidene.
const SLIDE_TITLES: string[] = [
  'Forside — Markedsføring og ledelse',
  '1 · Definisjon',
  '2 · Behov vs. ønsker',
  '3 · Etterspørsel',
  '4 · Fagets utvikling',
  '5 · MANGO-modellen',
  '6 · Triple Bottom Line',
  '7 · Byttehandelen',
  '8 · Ledelsesprosessen',
  '9 · Case — Tine vs. Q',
  '10 · Oppsummering',
]

const QUIZ_SLIDES: QuizQuestion[] = [
  {
    question: 'Hva er forskjellen på et behov og et ønske?',
    options: [
      'Behov er noe man kan betale for, ønsker er gratis',
      'Behov er grunnleggende mangelfølelser, ønsker er hvordan vi velger å dekke dem',
      'Behov og ønsker betyr det samme',
      'Behov gjelder kun mat og søvn, ønsker gjelder alt annet',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva står MANGO-modellen for?',
    options: [
      'Markedsføring, Annonser, Nettverk, Gjennomføring, Overskudd',
      'Mennesker, Ansvar, Nettverk, Gjennomføring, Overvåking',
      'Mål, Analyse, Nasjonalitet, Globalt, Omstilling',
      'Marked, Aksjonærer, Nytte, Gevinst, Omdømme',
    ],
    correct: 1,
    timeSeconds: 45,
  },
  {
    question: 'Hva er Triple Bottom Line?',
    options: [
      'Tre måleenheter for omsetning: brutto, netto og total',
      'Et regnskapsbegrep for tre nivåer av kostnader',
      'Profit, People og Planet — bedriftens tre bunnlinjer',
      'Strategier for tre konkurrerende markeder',
    ],
    correct: 2,
    timeSeconds: 45,
  },
]

export default function MarkedsforingFagPresentation() {
  return (
    <PresentationShell
      presentationName="Markedsføring som fag og tankesett"
      subjectLabel="ML1 · Visjon 1"
      titleLine1="Markedsføring"
      titleLine2="og ledelse"
      subtitle="Mer enn salg — å skape verdi for kunden, bygge relasjoner og styre bedriften mot bærekraftige mål."
      contentSlides={SLIDES}
      quizSlides={QUIZ_SLIDES}
      slideTitles={SLIDE_TITLES}
    />
  )
}
