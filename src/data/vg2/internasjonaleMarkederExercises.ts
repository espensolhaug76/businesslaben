import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '⚠️ Det som er høflig i Norge kan være fornærmende i Japan. Kulturell kompetanse er konkurransefortrinn!'

export const INTERNASJONALE_MARKEDER_EXERCISES: QuizExercise[] = [
  {
    id: 'int-01',
    icon: '🇪🇺',
    title: 'Norge og EØS',
    context: 'Din bedrift produserer sportsutstyr i Norge og vil selge til EU-land.',
    question: 'Hva betyr EØS-avtalen for norske eksportbedrifter til EU?',
    choices: [
      {
        id: 'a',
        label: 'Full toll på alle varer — Norge er ikke EU-medlem.',
        isCorrect: false,
        feedback: 'Feil. EØS-avtalen gir fri flyt av varer mellom Norge og EU uten toll på industrivarer.',
      },
      {
        id: 'b',
        label: 'Fri vareflyt uten toll, men norske bedrifter må følge EUs produktstandarder og -regelverk.',
        isCorrect: true,
        feedback: 'Riktig! EØS = fri flyt av varer, tjenester, kapital og personer. Men Norge MÅ implementere EUs produktdirektiver og standarder for å selge i markedet.',
      },
      {
        id: 'c',
        label: 'Norske bedrifter kan selge fritt uten å forholde seg til EUs regelverk.',
        isCorrect: false,
        feedback: 'Feil. EØS innebærer at Norge implementerer EUs indre markeds-regelverk. CE-merking, produktsikkerhet og andre standarder gjelder.',
      },
      {
        id: 'd',
        label: 'Kun norsk fisk og landbruksprodukter er inkludert i EØS-avtalen.',
        isCorrect: false,
        feedback: 'Feil. Landbruk og fisk er delvis unntatt, men industrivarer (inkl. sportsutstyr) er fullt inkludert i den frie vareflyten.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'int-02',
    icon: '🇯🇵',
    title: 'Japansk forretningsetikette',
    context: 'Du skal møte en japansk forretningspartner fra Toyota for første gang i Tokyo for å diskutere et samarbeid.',
    question: 'Hva er viktigst å huske i det japanske forretningskulturen?',
    choices: [
      {
        id: 'a',
        label: 'Vær direkte og kom raskt til poenget — japanere respekterer effektivitet.',
        isCorrect: false,
        feedback: 'Feil. Japan er en høy-kontekst kultur med indirekte kommunikasjon. Direkte konfrontasjon eller "rett på sak" kan oppfattes som uhøflig.',
      },
      {
        id: 'b',
        label: 'Bukk lett ved hilsen, gi visittkort med to hender, unngå direkte "nei", vær tålmodig med beslutninger.',
        isCorrect: true,
        feedback: 'Riktig! Japan: formell hilsen (lett bukk), visittkort mottatt og gitt med to hender og respekt, "nei" sies indirekte ("det er vanskelig"), beslutninger tar tid pga. consensus-kultur (nemawashi).',
      },
      {
        id: 'c',
        label: 'Ta med en flaske norsk akevitt som gave — alkohol er alltid populært.',
        isCorrect: false,
        feedback: 'Farlig antagelse. Noen japanere er ​ikke-drikkere av religiøse grunner. Sjekk alltid gavetradisjonene og preferanser på forhånd.',
      },
      {
        id: 'd',
        label: 'Adresser partneren ved fornavn for å vise vennlighet.',
        isCorrect: false,
        feedback: 'Feil. I Japan brukes etternavnet + "-san" (f.eks. "Tanaka-san") til du eksplisitt inviteres til å bruke fornavn. Fornavn for tidlig er respektløst.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'int-03',
    icon: '💱',
    title: 'Valutarisiko',
    context: 'Din bedrift selger fiskeutstyr til USA og fakturerer i USD. En ordre er på 100 000 USD. USD/NOK-kursen er 10,80 ved kontraktsinngåelse, men faller til 9,90 ved betaling.',
    question: 'Hva er den faktiske norske inntekten, og hva er konsekvensen?',
    choices: [
      {
        id: 'a',
        label: '1 080 000 NOK — kursen er låst ved kontraktsinngåelse.',
        isCorrect: false,
        feedback: 'Feil. Kursen er IKKE låst med mindre dere har inngått en terminkontrakt. Uten sikring gjelder spotpris ved betaling.',
      },
      {
        id: 'b',
        label: '990 000 NOK — et tap på 90 000 NOK pga. valutakursrisiko. Løsning: terminkontrakt eller fakturering i NOK.',
        isCorrect: true,
        feedback: 'Riktig! Uten valutasikring taper dere 90 000 NOK. Løsning: 1) Terminkontrakt (lock in kurs), 2) Fakturere i NOK (overfører risikoen til kjøper), 3) Naturlig sikring (kjøp USD-kostnader).',
      },
      {
        id: 'c',
        label: '1 035 000 NOK — et gjennomsnitt av de to kursene.',
        isCorrect: false,
        feedback: 'Feil beregning. Betalingen skjer ved én kurs — spotprisen på betalingsdagen (9,90). Ingen gjennomsnitt.',
      },
      {
        id: 'd',
        label: 'Det spiller ingen rolle — valutarisiko er bare for store selskaper.',
        isCorrect: false,
        feedback: 'Feil. Valutarisiko påvirker alle bedrifter som handler internasjonalt, uavhengig av størrelse.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'int-04',
    icon: '📄',
    title: 'Internasjonal kontrakt',
    context: 'Du skal inngå en 2-årig leverandørkontrakt med en kinesisk produsent for 5 millioner NOK.',
    question: 'Hva er de viktigste punktene å inkludere?',
    choices: [
      {
        id: 'a',
        label: 'Kun pris og leveringsdato — resten ordner seg.',
        isCorrect: false,
        feedback: 'Svært risikabelt. Uten kvalitetsstandarder og tvisteløsning har du ingen beskyttelse hvis noe går galt.',
      },
      {
        id: 'b',
        label: 'Pris, leveringsdato, kvalitetsstandarder med inspeksjonsrett, betalingsbetingelser (Letter of Credit), tvisteløsning (ICC-voldgift), IP-beskyttelse.',
        isCorrect: true,
        feedback: 'Riktig! En god internasjonal kontrakt inkluderer alle disse elementene. Letter of Credit beskytter begge parter. ICC-voldgift er nøytral og internasjonal anerkjent.',
      },
      {
        id: 'c',
        label: 'En muntlig avtale er nok — det bygger tillit.',
        isCorrect: false,
        feedback: 'Feil. Muntlige avtaler er juridisk svake, spesielt på tvers av jurisdiksjoner. Kinesisk og norsk kontraktsrett er ulike.',
      },
      {
        id: 'd',
        label: 'Kun norsk lov skal gjelde — det er enklest.',
        isCorrect: false,
        feedback: 'Problematisk. Kinesiske motparter vil sjelden akseptere norsk jurisdiksjon. Nøytral voldgift (ICC eller UNCITRAL) er standarden.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'int-05',
    icon: '🌍',
    title: 'WTO og Norge',
    context: 'Et land innfører 35% toll på norsk laks uten saklig begrunnelse. Din eksportbedrift er hardt rammet.',
    question: 'Hva er WTOs viktigste funksjon i denne situasjonen?',
    choices: [
      {
        id: 'a',
        label: 'WTO kan sende militærstyrker for å tvinge frem åpent marked.',
        isCorrect: false,
        feedback: 'Feil. WTO har ingen militær myndighet. Det er en handelsorganisasjon som løser tvister gjennom rettslige prosesser.',
      },
      {
        id: 'b',
        label: 'WTO gir en tvisteløsningsmekanisme — Norge kan klage og få panelvedtak som forplikter landet til å fjerne tollen.',
        isCorrect: true,
        feedback: 'Riktig! WTOs tvisteløsningsorgan (DSB) behandler handelsklager mellom land. Norge (som WTO-medlem) kan bringe saken inn, og et panel kan pålegge landet å endre tolltariffsene.',
      },
      {
        id: 'c',
        label: 'WTO sørger for at alle land automatisk fjerner toll på fisk.',
        isCorrect: false,
        feedback: 'Feil. WTO setter regler og behandler tvister, men toll finnes fortsatt. Tollreduksjoner forhandles i runder (som Doha-runden).',
      },
      {
        id: 'd',
        label: 'WTO er kun for u-land — Norge er for rikt til å bruke det.',
        isCorrect: false,
        feedback: 'Feil. Alle 164 WTO-medlemmer, inkludert Norge, kan bruke tvisteløsningsmekanismen. Norge har benyttet den flere ganger for laks og andre eksportvarer.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
