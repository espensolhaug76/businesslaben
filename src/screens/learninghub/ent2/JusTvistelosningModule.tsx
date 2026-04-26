import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📝',
    title: 'Avtalerettslige prinsipper',
    quote: 'Avtaler er bindende — kjenn vilkårene.',
    content: 'Avtaleloven (1918) regulerer hvordan avtaler inngås og tolkes. Hovedprinsipp: Tilbud + aksept = bindende avtale. Ingen krav til skriftlighet, men sterkt anbefalt for bedrifter. Sentrale temaer: Fullmakter (hvem kan binde bedriften?), urimelige avtalevilkår (§36 — kan settes til side), ugyldighet (svik, tvang, mindreårige). Norske bedrifter kan inngå avtaler muntlig — men hvis det blir konflikt, har dokumentasjon avgjørende verdi. E-post og SMS er ofte gyldig dokumentasjon.',
    subpoints: [
      { label: 'BINDENDE', text: 'Tilbud + aksept = avtale, uavhengig av skriftlighet.' },
      { label: 'BEVIS', text: 'Skriftlig dokumentasjon er gull verdt ved konflikt.' },
    ],
    practical: 'Har bedriften din rutiner for skriftlig kontraktinngåelse?',
    exercises: [
      {
        id: 'ent220-1-1',
        icon: '📝',
        title: 'Bindende',
        question: 'Når er en avtale bindende?',
        choices: [
          { id: 'a', label: 'Bare skriftlig', isCorrect: false, feedback: 'Også muntlig.' },
          { id: 'b', label: 'Når tilbud møter aksept — uavhengig av form', isCorrect: true, feedback: 'Riktig! Hovedregel.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert prinsipp.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Avtalerett.' },
        ],
        espenTip: 'Unntak: Eiendomssalg krever skriftlig form. Forbrukerkjøp har spesielle regler.',
      },
      {
        id: 'ent220-1-2',
        icon: '📝',
        title: 'Fullmakter',
        question: 'Hva er en fullmakt?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Annet.' },
          { id: 'b', label: 'Rett til å binde annen part juridisk', isCorrect: true, feedback: 'Riktig! Avtalemyndighet.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert begrep.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Juridisk konsept.' },
        ],
        espenTip: 'Daglig leder har stillingsfullmakt for daglig drift. Større saker krever styrebeslutning.',
      },
      {
        id: 'ent220-1-3',
        icon: '📝',
        title: '§36',
        question: 'Hva regulerer avtaleloven §36?',
        choices: [
          { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'Avtaleregulering.' },
          { id: 'b', label: 'Urimelige avtalevilkår — kan settes til side av domstol', isCorrect: true, feedback: 'Riktig! Beskyttelsesregel.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Spesifikk paragraf.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkret regel.' },
        ],
        espenTip: 'Brukes mest mot urimelig sterke parter — banker, store leverandører.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🛒',
    title: 'Kjøpsrett (B2B)',
    quote: 'Mellom profesjonelle gjelder andre regler.',
    content: 'Kjøpsloven (1988) regulerer B2B-kjøp. Forbrukerkjøpsloven gjelder mellom næringsdrivende og forbruker — strengere mot selger. Sentrale temaer: Mangler (selgers ansvar), reklamasjonsfrister (B2B: 2 år, forbruker: 5 år for varige varer), erstatning, heving. Mellom profesjonelle: Større ansvar for kjøper å undersøke, mindre beskyttelse. Internasjonal handel: CISG (FN-kjøpsloven) gjelder ofte automatisk — kan velges bort i avtale.',
    subpoints: [
      { label: 'B2B vs B2C', text: 'Forbrukerkjøpsloven er strengere mot selger.' },
      { label: 'CISG', text: 'Internasjonal kjøpslov — vurder om dere vil bruke den.' },
    ],
    practical: 'Bruker bedriften din standardvilkår i sine salg?',
    exercises: [
      {
        id: 'ent220-2-1',
        icon: '🛒',
        title: 'Forskjell',
        question: 'Kjøpsloven vs forbrukerkjøpsloven?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
          { id: 'b', label: 'Kjøpsloven = B2B. Forbrukerkjøpsloven = B2C, strengere mot selger', isCorrect: true, feedback: 'Riktig! Ulikt vern.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkret skille.' },
        ],
        espenTip: 'Bedrift som selger til både B2B og B2C må ha to sett vilkår.',
      },
      {
        id: 'ent220-2-2',
        icon: '🛒',
        title: 'Reklamasjon',
        question: 'Reklamasjonsfrist B2B vs forbruker?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjellig.' },
          { id: 'b', label: 'B2B: 2 år. Forbruker varige varer: 5 år', isCorrect: true, feedback: 'Riktig! Ulike frister.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkrete frister.' },
        ],
        espenTip: 'Begge har også relativ frist: Reklamere "uten ugrunnet opphold" etter oppdagelse.',
      },
      {
        id: 'ent220-2-3',
        icon: '🛒',
        title: 'CISG',
        question: 'Hva er CISG?',
        choices: [
          { id: 'a', label: 'Bare valuta', isCorrect: false, feedback: 'Lov.' },
          { id: 'b', label: 'FN-kjøpsloven — internasjonal kjøpslov for B2B over landegrenser', isCorrect: true, feedback: 'Riktig! Multilateral lov.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret regelverk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Internasjonal lov.' },
        ],
        espenTip: 'Norge ratifiserte CISG. Gjelder automatisk ved kjøp mellom selskaper i ratifiserende land — med mindre den velges bort.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '⚖️',
    title: 'Erstatningsrett',
    quote: 'Den som forvolder skade må erstatte.',
    content: 'Erstatningsrett: Fire vilkår må oppfylles — skade, ansvarsgrunnlag, årsakssammenheng, økonomisk tap. Ansvarsgrunnlag: Skyld (uaktsomhet eller forsett) eller objektivt ansvar (uten skyld — f.eks. produktansvar). Skadeerstatningsloven setter rammen. Bedrifter har solidaransvar for ansatte (arbeidsgiveransvar). Forsikring (ansvarsforsikring, produktansvar) er essensielt. Norske bedrifter blir oftest saksøkt for kontraktbrudd, ikke direkte erstatning. Konkrete eksempler: Mangler i bygg, dataservere ned, produktfeil.',
    subpoints: [
      { label: 'FIRE VILKÅR', text: 'Skade, ansvarsgrunnlag, årsakssammenheng, tap.' },
      { label: 'FORSIKRING', text: 'Ansvarsforsikring beskytter mot store erstatningskrav.' },
    ],
    practical: 'Har bedriften din ansvarsforsikring som dekker virksomheten?',
    exercises: [
      {
        id: 'ent220-3-1',
        icon: '⚖️',
        title: 'Vilkår',
        question: 'Fire vilkår for erstatning?',
        choices: [
          { id: 'a', label: 'Bare skade', isCorrect: false, feedback: 'Fire vilkår.' },
          { id: 'b', label: 'Skade, ansvarsgrunnlag, årsakssammenheng, økonomisk tap', isCorrect: true, feedback: 'Riktig! Klassisk firevilkårs-test.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Erstatningsrett.' },
        ],
        espenTip: 'Alle fire må være tilstede for at erstatning skal idømmes.',
      },
      {
        id: 'ent220-3-2',
        icon: '⚖️',
        title: 'Objektivt',
        question: 'Hva er objektivt ansvar?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret.' },
          { id: 'b', label: 'Ansvar uten skyld — f.eks. ved farlig virksomhet eller produktfeil', isCorrect: true, feedback: 'Riktig! Strengt ansvar.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk type.' },
          { id: 'd', label: 'Bare flaks', isCorrect: false, feedback: 'Lovbestemt.' },
        ],
        espenTip: 'Produktansvarsloven: Produsent ansvarlig for skade fra defekt produkt — uavhengig av skyld.',
      },
      {
        id: 'ent220-3-3',
        icon: '⚖️',
        title: 'Arbeidsgiver',
        question: 'Hva er arbeidsgiveransvar?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret regel.' },
          { id: 'b', label: 'Solidaransvar for skade voldt av ansatte i tjenesten', isCorrect: true, feedback: 'Riktig! Skadeserstatningsloven.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Konkret prinsipp.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Erstatningsregel.' },
        ],
        espenTip: 'Bedriften erstatter — kan kreve regress fra ansatt ved grov uaktsomhet/forsett.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🚫',
    title: 'Konkurranserett',
    quote: 'Konkurranse skal være rettferdig.',
    content: 'Konkurranseloven forbyr: Karteller (prissamarbeid mellom konkurrenter), markedsdeling, anbudssamarbeid, misbruk av dominerende stilling. Konkurransetilsynet håndhever — bøter opp til 10% av global omsetning. Sentrale norske saker: Møller-saken (bilbransjen), Yara-saken (gjødsel-priser med Hydro Agri 2002), bok-prissamarbeid. Spesielt streng håndheving siden 2010-tallet. Nye fokusområder: Big tech (Google, Apple), digitalplattformer. EU har lignende regelverk — gjelder også for norske bedrifter.',
    subpoints: [
      { label: 'NULLTOLERANSE', text: 'Karteller straffes hardt — bøter, fengsel.' },
      { label: 'BREDT', text: 'Også prissamtaler i kantine kan utløse undersøkelse.' },
    ],
    practical: 'Vet alle ansatte hva de IKKE kan diskutere med konkurrenter?',
    exercises: [
      {
        id: 'ent220-4-1',
        icon: '🚫',
        title: 'Karteller',
        question: 'Hva er kartell?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk overtredelse.' },
          { id: 'b', label: 'Avtale mellom konkurrenter om pris, mengde eller markedsdeling', isCorrect: true, feedback: 'Riktig! Klassisk kartell.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert begrep.' },
          { id: 'd', label: 'Bare salg', isCorrect: false, feedback: 'Ulovlig samarbeid.' },
        ],
        espenTip: 'Trenger ikke skriftlig avtale — informell forståelse er nok. Tale med konkurrent om pris er rødt flagg.',
      },
      {
        id: 'ent220-4-2',
        icon: '🚫',
        title: 'Bøter',
        question: 'Hvor høye bøter kan ilegges?',
        choices: [
          { id: 'a', label: '1000 kr', isCorrect: false, feedback: 'Mye høyere.' },
          { id: 'b', label: 'Opp til 10% av global omsetning', isCorrect: true, feedback: 'Riktig! Eksistensielt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovbestemt.' },
          { id: 'd', label: 'Bare advarsel', isCorrect: false, feedback: 'Tunge sanksjoner.' },
        ],
        espenTip: 'EU har bøtelagt Google og Microsoft milliarder. Norge mindre, men proporsjonalt streng.',
      },
      {
        id: 'ent220-4-3',
        icon: '🚫',
        title: 'Dominans',
        question: 'Hva er misbruk av dominerende stilling?',
        choices: [
          { id: 'a', label: 'Bare være stor', isCorrect: false, feedback: 'Misbruk er problemet.' },
          { id: 'b', label: 'Stor aktør utnytter posisjon — ekskluderer konkurrenter, ekstrem pris', isCorrect: true, feedback: 'Riktig! Konkret regel.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk overtredelse.' },
        ],
        espenTip: 'Å være dominerende er greit — å misbruke posisjonen er ulovlig. Skille er ofte komplisert.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '💡',
    title: 'Immaterialrett (avansert)',
    quote: 'Beskytt det som gjør deg unik.',
    content: 'Immaterielle rettigheter (IPR): Patent (oppfinnelser, 20 år), varemerke (navn/logo, fornybart 10-årig), design (utseende, 25 år), opphavsrett (verk, livet+70 år), forretningshemmeligheter. Patentstyret håndterer registrering. Internasjonalt: PCT for patenter, Madrid-protokollen for varemerker. Håndheving: Sivilrettslige søksmål, bevissikring (politianmeldelse), grensekontroll. Norske eksempler: Stormberg-vs-Norrøna varemerkesak. Patenttvist Cisco-Tandberg. Beskytt strategisk — eller mister du det.',
    subpoints: [
      { label: 'STRATEGISK', text: 'Velg hvilke rettigheter som er verdt å beskytte.' },
      { label: 'GLOBAL', text: 'Norsk patent gjelder bare i Norge — søk internasjonalt for utenlandsmarkeder.' },
    ],
    practical: 'Hvilke immaterielle rettigheter har bedriften din?',
    exercises: [
      {
        id: 'ent220-5-1',
        icon: '💡',
        title: 'Typer',
        question: 'Hovedtyper IPR?',
        choices: [
          { id: 'a', label: 'Bare patent', isCorrect: false, feedback: 'Flere.' },
          { id: 'b', label: 'Patent, varemerke, design, opphavsrett, forretningshemmelighet', isCorrect: true, feedback: 'Riktig! Hele spekteret.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'IPR-typer.' },
        ],
        espenTip: 'Mange tror bare patent — men varemerke og opphavsrett er ofte viktigere for bedrifter.',
      },
      {
        id: 'ent220-5-2',
        icon: '💡',
        title: 'Patent',
        question: 'Hva beskytter et patent?',
        choices: [
          { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'Det er varemerke.' },
          { id: 'b', label: 'Tekniske oppfinnelser i 20 år fra søknad', isCorrect: true, feedback: 'Riktig! Patentloven.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk rettighet.' },
        ],
        espenTip: 'Krav: Nytt, oppfinnerisk, industrielt anvendbart. Patentstyret behandler søknaden.',
      },
      {
        id: 'ent220-5-3',
        icon: '💡',
        title: 'Varemerke',
        question: 'Hvorfor registrere varemerke?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'b', label: 'Eksklusiv rett til navn/logo, beskytter mot kopiering', isCorrect: true, feedback: 'Riktig! Strategisk verdi.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Reell beskyttelse.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Juridisk verktøy.' },
        ],
        espenTip: 'Innen 5 år ofte avgjørende: Stormberg, Tomra, Posten har sterke varemerker — kan håndheves.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🤝',
    title: 'Tvisteløsning — forhandling og mekling',
    quote: 'Best forhandling slår alltid retten.',
    content: 'Tvisteløsning: Først forsøk forhandling (direkte mellom parter), deretter mekling (nøytral tredjepart hjelper), så rettssak/voldgift. Mekling er ofte mer effektivt: Konfliktrådet for små saker, profesjonelle meklere for større. Norske rettsmekling integrert i tingrettsprosess — dommer mekler før hovedforhandling. Fordeler: Raskere, billigere, bevarer relasjoner. Ofte 70%+ av meklinger ender med forlik. For bedrifter: Vurder mekling før rettssak.',
    subpoints: [
      { label: 'TRAPPETRINN', text: 'Forhandling → mekling → rettssak.' },
      { label: 'FORLIK', text: 'Mekling gir oftere fred enn dom — begge parter får noe.' },
    ],
    practical: 'Hvilken konflikt har bedriften din løst utenfor retten?',
    exercises: [
      {
        id: 'ent220-6-1',
        icon: '🤝',
        title: 'Trapp',
        question: 'Riktig rekkefølge i tvisteløsning?',
        choices: [
          { id: 'a', label: 'Bare retten', isCorrect: false, feedback: 'Først forhandling.' },
          { id: 'b', label: 'Forhandling → mekling → rettssak/voldgift', isCorrect: true, feedback: 'Riktig! Eskalering.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Prosessuelt.' },
        ],
        espenTip: 'Hopp over forhandling og direkte til retten = fryktelig dyrt og ødelegger relasjoner.',
      },
      {
        id: 'ent220-6-2',
        icon: '🤝',
        title: 'Mekling',
        question: 'Hva er mekling?',
        choices: [
          { id: 'a', label: 'Bare dom', isCorrect: false, feedback: 'Ikke samme.' },
          { id: 'b', label: 'Nøytral tredjepart hjelper partene finne enighet — frivillig', isCorrect: true, feedback: 'Riktig! Frivillig prosess.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Prosess.' },
        ],
        espenTip: 'Mekleren tar ikke avgjørelser — partene bestemmer selv om de vil forlikes.',
      },
      {
        id: 'ent220-6-3',
        icon: '🤝',
        title: 'Fordeler',
        question: 'Hvorfor velge mekling?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Mange grunner.' },
          { id: 'b', label: 'Raskere, billigere, bevarer relasjoner, fleksible løsninger', isCorrect: true, feedback: 'Riktig! Klare fordeler.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte fordeler.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Praktiske grunner.' },
        ],
        espenTip: 'Rettssak koster ofte 200-500.000 kr i advokatutgifter. Mekling gjerne 20-50.000 kr.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🏛️',
    title: 'Voldgift',
    quote: 'Privat domstol — raskere og konfidensielt.',
    content: 'Voldgift er privat tvisteløsning hvor partene velger dommere selv (voldgiftsdommer). Avgjørelsen er bindende — kan tvangsfullbyrdes som dom. Brukes mye i internasjonal handel og store kontrakter. Fordeler: Konfidensialitet, rask, ekspertise (velg dommere med fagkompetanse), internasjonal anerkjennelse (New York-konvensjonen — 165 land). Ulemper: Dyrt for små saker, begrenset ankerett. Internasjonale: ICC, LCIA. Norge: Oslo Chamber of Commerce. Voldgiftsklausul vanlig i internasjonale kontrakter.',
    subpoints: [
      { label: 'PRIVAT', text: 'Velg dommere, ikke staten gjør det.' },
      { label: 'INTERNASJONAL', text: 'Lett å håndheve på tvers av landegrenser via NY-konvensjonen.' },
    ],
    practical: 'Har dine internasjonale kontrakter voldgiftsklausul?',
    exercises: [
      {
        id: 'ent220-7-1',
        icon: '🏛️',
        title: 'Definisjon',
        question: 'Hva er voldgift?',
        choices: [
          { id: 'a', label: 'Bare offentlig retten', isCorrect: false, feedback: 'Privat.' },
          { id: 'b', label: 'Privat tvisteløsning med valgte dommere — bindende avgjørelse', isCorrect: true, feedback: 'Riktig! Privat domstol.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert prosess.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Tvisteløsning.' },
        ],
        espenTip: 'Avgjørelsen er like bindende som rettsdom — kan tvangsfullbyrdes umiddelbart.',
      },
      {
        id: 'ent220-7-2',
        icon: '🏛️',
        title: 'Fordeler',
        question: 'Hovedfordeler ved voldgift?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Konkrete fordeler.' },
          { id: 'b', label: 'Konfidensialitet, ekspertise, raskere, internasjonal håndheving', isCorrect: true, feedback: 'Riktig! Klare fordeler.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare billigst', isCorrect: false, feedback: 'Ofte dyrere for små saker.' },
        ],
        espenTip: 'Rettssaker er offentlige. Voldgift er privat — viktig for bedrifter med konkurransesensitiv informasjon.',
      },
      {
        id: 'ent220-7-3',
        icon: '🏛️',
        title: 'NY-konvensjonen',
        question: 'Hva er New York-konvensjonen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret avtale.' },
          { id: 'b', label: 'FN-traktat som sikrer at voldgiftsavgjørelser anerkjennes i 165 land', isCorrect: true, feedback: 'Riktig! Sentral traktat.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Internasjonal traktat.' },
          { id: 'd', label: 'Bare bank', isCorrect: false, feedback: 'Voldgiftsverktøy.' },
        ],
        espenTip: 'Klar fordel over rettsdommer ved internasjonal håndheving — domstolskjennelser kan være vanskelige å fullbyrde i utlandet.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '💀',
    title: 'Gjeldsforfølgning og konkurs',
    quote: 'Når regningene ikke betales.',
    content: 'Inkassoprosess: 1) Purring, 2) Inkassovarsel, 3) Inkassosak (Lindorff, Kredinor), 4) Forliksrådet, 5) Tvangsfullbyrdelse via namsmyndighet. Konkursloven: Når selskap er insolvent (kan ikke betale forpliktelser når de forfaller, og ikke har tilstrekkelig dekning). Konkursbegjæring kan komme fra: Selskapet selv, kreditorer, bostyrer. Konsekvenser: Boet overtar alt, daglig leder må samarbeide, mulig personlig ansvar ved uforsvarlig drift. Selskapsbegjæring (gjeldsordning) som alternativ — strenge vilkår.',
    subpoints: [
      { label: 'TRAPP', text: 'Purring → inkasso → namsmann → konkurs.' },
      { label: 'PERSONLIG', text: 'Daglig leder kan bli personlig ansvarlig ved uforsvarlig drift.' },
    ],
    practical: 'Hva er bedriftens rutiner for inkasso av gamle krav?',
    exercises: [
      {
        id: 'ent220-8-1',
        icon: '💀',
        title: 'Inkasso',
        question: 'Riktig rekkefølge i inkasso?',
        choices: [
          { id: 'a', label: 'Bare retten', isCorrect: false, feedback: 'Trinnvis.' },
          { id: 'b', label: 'Purring → inkassovarsel → inkassosak → namsmyndighet', isCorrect: true, feedback: 'Riktig! Standard prosess.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Lovregulert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Inkassoloven setter strenge krav til varsling og gebyrer — feil kan ugyldiggjøre kravet.',
      },
      {
        id: 'ent220-8-2',
        icon: '💀',
        title: 'Konkurs',
        question: 'Vilkår for konkurs?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkrete vilkår.' },
          { id: 'b', label: 'Insolvens — kan ikke betale ved forfall OG ikke tilstrekkelig dekning', isCorrect: true, feedback: 'Riktig! Dobbelt vilkår.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Lovbestemt.' },
          { id: 'd', label: 'Bare ett krav', isCorrect: false, feedback: 'Begge må være oppfylt.' },
        ],
        espenTip: 'Likviditetsproblem alene = ikke konkurs. Også soliditeten må svikte.',
      },
      {
        id: 'ent220-8-3',
        icon: '💀',
        title: 'Personlig',
        question: 'Når kan daglig leder bli personlig ansvarlig?',
        choices: [
          { id: 'a', label: 'Aldri i AS', isCorrect: false, feedback: 'Kan skje.' },
          { id: 'b', label: 'Ved uforsvarlig drift, fortsatt drift etter insolvens, brudd på spesifikke plikter', isCorrect: true, feedback: 'Riktig! Klassiske utløsere.' },
          { id: 'c', label: 'Bare ved konkurs', isCorrect: false, feedback: 'Bredere.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Hvis selskapet er insolvent og du fortsetter å pådra ny gjeld = personlig erstatningsansvar.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '🌍',
    title: 'Internasjonale avtaler og jurisdiksjon',
    quote: 'Hvilken lov gjelder, og hvor går saken?',
    content: 'I internasjonale avtaler må man avklare: Lovvalg (hvilket lands lov gjelder?) og verneting (hvor skal tvister behandles?). Norske bedrifter kan velge norsk lov og norske domstoler — eller motsatt. Praksis: Sterk part dikterer ofte. Sentrale konvensjoner: CISG (kjøpslov), Roma I (lovvalg), Brüssel I (verneting). EØS gjør håndheving lettere innen Europa. Utenfor: Kan være vanskelig å fullbyrde norsk dom. Voldgift løser ofte dette via NY-konvensjonen.',
    subpoints: [
      { label: 'LOVVALG', text: 'Hvilket lands lov skal tolke avtalen?' },
      { label: 'VERNETING', text: 'Hvor skal eventuell tvist behandles?' },
    ],
    practical: 'Har dine utenlandske kontrakter klar lov- og vernetingsklausul?',
    exercises: [
      {
        id: 'ent220-9-1',
        icon: '🌍',
        title: 'Lovvalg',
        question: 'Hva avklares ved lovvalg?',
        choices: [
          { id: 'a', label: 'Bare valuta', isCorrect: false, feedback: 'Annet.' },
          { id: 'b', label: 'Hvilket lands lov skal anvendes på avtalen', isCorrect: true, feedback: 'Riktig! Materiell lov.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert begrep.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkret valg.' },
        ],
        espenTip: 'Norsk og engelsk avtalerett er ulike. Velg bevisst — det styrer hvordan avtalen tolkes.',
      },
      {
        id: 'ent220-9-2',
        icon: '🌍',
        title: 'Verneting',
        question: 'Hva er verneting?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikt.' },
          { id: 'b', label: 'Hvor en eventuell tvist skal behandles (domstol/voldgift)', isCorrect: true, feedback: 'Riktig! Prosessuelt.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare valuta', isCorrect: false, feedback: 'Stedsvalg.' },
        ],
        espenTip: 'Vil du føre sak i Norge? Da må verneting i avtalen sette norsk domstol/Oslo voldgiftsinstitutt.',
      },
      {
        id: 'ent220-9-3',
        icon: '🌍',
        title: 'Håndheving',
        question: 'Hvorfor velge voldgift internasjonalt?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
          { id: 'b', label: 'Voldgiftsavgjørelser anerkjennes i 165 land via NY-konvensjonen', isCorrect: true, feedback: 'Riktig! Lett håndhevbart.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Praktisk fordel.' },
          { id: 'd', label: 'Bare bank', isCorrect: false, feedback: 'Håndheving.' },
        ],
        espenTip: 'Norsk dom kan være vanskelig å fullbyrde i Kina. Voldgiftsavgjørelse mye enklere.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🛡️',
    title: 'Forebygging — bygg juridisk forsvar',
    quote: 'Best forsvar er å unngå konflikter.',
    content: 'Forebygging: 1) Klare skriftlige avtaler med viktige parter, 2) Standard salgsvilkår på alle salg, 3) Compliance-program (antikorrupsjon, GDPR, konkurranserett), 4) IPR-strategi (registrer det viktige), 5) Forsikringer (ansvar, produkt, cyber), 6) Bruk advokat tidlig — ikke når problemet er der. Mange juridiske kostnader er unngåelige med god forberedelse. Norske gründere spør for sjelden om juridisk hjelp tidlig. Mal-avtaler fra Standard Norge eller bransjeforeninger gir god start.',
    subpoints: [
      { label: 'PROAKTIV', text: 'Forebygg med klare avtaler og rutiner.' },
      { label: 'TIDLIG', text: 'Kontakt advokat før problem — ikke etter.' },
    ],
    practical: 'Hvor mye av bedriftens drift er dekket av skriftlige standardavtaler?',
    exercises: [
      {
        id: 'ent220-10-1',
        icon: '🛡️',
        title: 'Avtaler',
        question: 'Hvorfor skriftlige avtaler?',
        choices: [
          { id: 'a', label: 'Bare formelle krav', isCorrect: false, feedback: 'Praktisk verdi.' },
          { id: 'b', label: 'Bevis ved konflikt + klargjør forventninger', isCorrect: true, feedback: 'Riktig! Dual verdi.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Praktisk.' },
        ],
        espenTip: 'Mange konflikter skyldes uklare avtaler. Skriving tvinger deg til å tenke gjennom detaljer.',
      },
      {
        id: 'ent220-10-2',
        icon: '🛡️',
        title: 'Compliance',
        question: 'Hva er compliance-program?',
        choices: [
          { id: 'a', label: 'Bare regler', isCorrect: false, feedback: 'Aktivt program.' },
          { id: 'b', label: 'Systematisk arbeid for å sikre etterlevelse av lover', isCorrect: true, feedback: 'Riktig! Aktiv prosess.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Inkluderer policy, opplæring, varslingskanaler, internkontroll, oppfølging.',
      },
      {
        id: 'ent220-10-3',
        icon: '🛡️',
        title: 'Advokat',
        question: 'Når bruke advokat?',
        choices: [
          { id: 'a', label: 'Bare ved rettssak', isCorrect: false, feedback: 'For sent ofte.' },
          { id: 'b', label: 'Tidlig — ved utforming av avtaler, strategiske valg, før problem', isCorrect: true, feedback: 'Riktig! Forebyggende.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: '5000 kr i advokat-rådgivning på forhånd kan spare 500.000 kr i tvist senere. Stort kost-/nytteforhold.',
      },
    ],
  },
]

export default function JusTvistelosningModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-20"
      moduleTitle="Jus og tvisteløsning"
      moduleIcon="⚖️"
      storageKey="learning-ent2-jus-tvistelosning"
      completeRoute="/learning/ent2/jus-tvistelosning/complete"
      phases={phases}
      intro="Avtalerett, immaterielle rettigheter og tvisteløsning når konflikter oppstår — fra forhandling og mekling til voldgift og konkursrett."
      vissteduAt="Norske bedrifter taper milliarder årlig på rettstvister og inkassosaker. Forebyggende juridisk arbeid har enormt høy avkastning."
      espenSier="Best advokat er den som forhindrer tvist — ikke vinner den. Bruk juridisk kompetanse forebyggende, ikke bare brannslukking."
      presentationLink={{ route: '/learning/presentations/ent2/jus-tvistelosning', description: 'Jus og tvisteløsning — 10 slides' }}
    />
  )
}
