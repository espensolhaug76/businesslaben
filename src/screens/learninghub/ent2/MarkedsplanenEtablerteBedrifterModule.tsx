import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'Hensikten med markedsplanen',
    quote: 'Veikartet for kommende periode.',
    content: 'Markedsplanen er et strategisk dokument som binder sammen markedsføring med bedriftens overordnede mål. Hensikt: 1) Koordinere innsats mellom team og avdelinger, 2) Kommunisere mål og prioriteringer, 3) Styringsverktøy for ledelsen, 4) Grunnlag for budsjett og ressursallokering, 5) Mål-tracking gjennom året. Etablerte bedrifter (DNB, Telenor) lager årlige planer per forretningsområde. Mindre bedrifter trenger lettere versjon, men samme prinsipper gjelder. Plan uten oppfølging = ingen plan.',
    subpoints: [
      { label: 'KOORDINERING', text: 'Felles retning på tvers av team.' },
      { label: 'STYRING', text: 'Måler progresjon mot mål gjennom året.' },
    ],
    practical: 'Har bedriften din en skriftlig markedsplan for inneværende år?',
    exercises: [
      {
        id: 'ent221-1-1',
        icon: '📋',
        title: 'Hensikt',
        question: 'Hovedhensikten med markedsplan?',
        choices: [
          { id: 'a', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk verktøy.' },
          { id: 'b', label: 'Koordinere, kommunisere, styre og måle markedsarbeidet', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
        ],
        espenTip: 'Plan uten oppfølging er bare papir. Plan med oppfølging er styringsverktøy.',
      },
      {
        id: 'ent221-1-2',
        icon: '📋',
        title: 'Periode',
        question: 'Hvor lang er typisk markedsplan?',
        choices: [
          { id: 'a', label: '10 år', isCorrect: false, feedback: 'For lang.' },
          { id: 'b', label: '1 år, ofte med 3-årig strategisk perspektiv', isCorrect: true, feedback: 'Riktig! Standard.' },
          { id: 'c', label: 'Bare 1 mnd', isCorrect: false, feedback: 'For kort.' },
          { id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
        ],
        espenTip: 'Strategisk plan 3-5 år. Operasjonell plan 1 år. Begge nødvendige.',
      },
      {
        id: 'ent221-1-3',
        icon: '📋',
        title: 'Levende',
        question: 'Skal markedsplanen være statisk?',
        choices: [
          { id: 'a', label: 'Ja, fast', isCorrect: false, feedback: 'Tvert imot.' },
          { id: 'b', label: 'Nei — levende dokument som justeres ved endringer', isCorrect: true, feedback: 'Riktig! Adaptiv.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert syn.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Pragmatisk.' },
        ],
        espenTip: 'Pandemien viste at markedsplaner må kunne pivotere. Kvartalsvis revisjon er ofte best.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📑',
    title: 'Innholdet i markedsplanen',
    quote: 'Fra situasjon til kontroll.',
    content: 'Standardstruktur: 1) Situasjonsanalyse (hvor står vi nå? Marked, konkurrenter, intern situasjon), 2) Mål (hva vil vi oppnå? SMART-formulert), 3) Strategi (hvordan? Posisjonering, segmenter), 4) Tiltak (hvilke aktiviteter? 5P-er), 5) Budsjetter (hvor mye? Per kanal/aktivitet), 6) Kontroll (hvordan måler vi? KPIer, oppfølgingsrytme). Dette er grunnstrukturen — Philip Kotlers klassiske mal. Norske bedrifter bruker variasjoner men alltid disse seks elementene.',
    subpoints: [
      { label: 'SEKS DELER', text: 'Situasjon, mål, strategi, tiltak, budsjett, kontroll.' },
      { label: 'KOTLER', text: 'Klassisk struktur — fortsatt standard.' },
    ],
    practical: 'Hvilken del av denne strukturen mangler oftest i ad hoc-planer?',
    exercises: [
      {
        id: 'ent221-2-1',
        icon: '📑',
        title: 'Struktur',
        question: 'Standardelementer i markedsplan?',
        choices: [
          { id: 'a', label: 'Bare mål', isCorrect: false, feedback: 'Mer.' },
          { id: 'b', label: 'Situasjon, mål, strategi, tiltak, budsjett, kontroll', isCorrect: true, feedback: 'Riktig! Klassiske seks.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Standardstruktur.' },
        ],
        espenTip: 'Mange hopper over kontrollen. Da blir planen aldri evaluert — og ny plan basert på antakelser.',
      },
      {
        id: 'ent221-2-2',
        icon: '📑',
        title: 'Logikk',
        question: 'Hvorfor starte med situasjonsanalyse?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Logisk grunnlag.' },
          { id: 'b', label: 'Fakta-grunnlag for realistiske mål og treffsikre strategier', isCorrect: true, feedback: 'Riktig! Solid base.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Metodisk.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Analyse-grunnlag.' },
        ],
        espenTip: 'Vanlig feil: Sette mål uten å forstå utgangspunktet. Resulterer i urealistiske eller for forsiktige mål.',
      },
      {
        id: 'ent221-2-3',
        icon: '📑',
        title: 'Kontroll',
        question: 'Hva er kontroll-delen?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'b', label: 'KPIer, måleperioder, ansvarlige, beslutningspunkter for justering', isCorrect: true, feedback: 'Riktig! Operasjonell oppfølging.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Styringsfunksjon.' },
        ],
        espenTip: 'Uten kontroll er plan = ønsketenkning. Med kontroll = styringsverktøy.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔄',
    title: 'TOWS-matrisen (avansert SWOT)',
    quote: 'SWOT viser status — TOWS gir handling.',
    content: 'SWOT identifiserer styrker, svakheter, muligheter, trusler. TOWS-matrise (utvidet SWOT) kobler disse til konkrete strategier: SO-strategier (utnytt styrker for muligheter — offensivt), WO-strategier (overkomme svakheter for å gripe muligheter), ST-strategier (bruk styrker mot trusler — defensivt), WT-strategier (minimere svakheter og trusler — overlevelse). Norske bedrifter som DNB og Equinor bruker TOWS i strategi-utvikling. Tvinger fram konkrete strategier i stedet for analyser som ender på papiret.',
    subpoints: [
      { label: 'AKSJON', text: 'TOWS gir konkrete strategier, ikke bare beskrivelse.' },
      { label: 'FIRE FELT', text: 'SO, WO, ST, WT — fire strategiretninger.' },
    ],
    practical: 'Hvilke styrker har din bedrift som matcher en aktuell mulighet?',
    exercises: [
      {
        id: 'ent221-3-1',
        icon: '🔄',
        title: 'TOWS',
        question: 'Forskjell SWOT vs TOWS?',
        choices: [
          { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
          { id: 'b', label: 'TOWS kobler analysen til konkrete strategier', isCorrect: true, feedback: 'Riktig! Aksjonsorientert.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert utvidelse.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
        ],
        espenTip: 'SWOT alene blir lett "interessant analyse uten konsekvens". TOWS tvinger handling.',
      },
      {
        id: 'ent221-3-2',
        icon: '🔄',
        title: 'SO',
        question: 'Hva er SO-strategier?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert kategori.' },
          { id: 'b', label: 'Bruk styrker (S) til å gripe muligheter (O) — offensiv vekst', isCorrect: true, feedback: 'Riktig! Offensiv.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategitype.' },
          { id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Alle størrelser.' },
        ],
        espenTip: 'Tomras styrke (panteautomat-teknologi) møter mulighet (sirkulær økonomi-trend) = sterk SO-strategi.',
      },
      {
        id: 'ent221-3-3',
        icon: '🔄',
        title: 'WT',
        question: 'Hva er WT-strategier?',
        choices: [
          { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Spesifikk type.' },
          { id: 'b', label: 'Defensiv: Minimere svakheter og unngå trusler — overlevelse', isCorrect: true, feedback: 'Riktig! Defensiv.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategikategori.' },
          { id: 'd', label: 'Bare offensiv', isCorrect: false, feedback: 'Defensiv variant.' },
        ],
        espenTip: 'Når svakheter møter trusler er nedbemanning eller exit ofte rett valg — ubehagelig men nødvendig.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🎯',
    title: 'SMART-mål og KPIer',
    quote: 'Mål må kunne måles.',
    content: 'SMART: Spesifikt, Målbart, Akseptert, Realistisk, Tidsbestemt. Eksempel: "Øke salget" er ikke SMART. "Øke omsetning på produkt X med 15% i Norden innen 31.12.2026" er SMART. KPIer (Key Performance Indicators) operasjonaliserer mål: Salgs-KPIer (omsetning, vekst, marginer), markeds-KPIer (kjennskap, posisjon, NPS), kanal-KPIer (kostnad per ledd, konvertering, CAC, LTV). Norske bedrifter måler ofte for mye — fokuser på 5-10 viktige KPIer per nivå.',
    subpoints: [
      { label: 'SMART', text: 'Klar formulering muliggjør måling og oppfølging.' },
      { label: 'FÅ KPIer', text: 'Bedre med 5 viktige enn 50 du ikke følger opp.' },
    ],
    practical: 'Hvilke 3-5 KPIer er viktigst for bedriften din?',
    exercises: [
      {
        id: 'ent221-4-1',
        icon: '🎯',
        title: 'SMART',
        question: 'Hva står SMART for?',
        choices: [
          { id: 'a', label: 'Bare smart', isCorrect: false, feedback: 'Akronym.' },
          { id: 'b', label: 'Spesifikt, Målbart, Akseptert, Realistisk, Tidsbestemt', isCorrect: true, feedback: 'Riktig! Klassisk akronym.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Definert akronym.' },
        ],
        espenTip: 'Doran 1981 — fortsatt grunnstein i målstyring. Andre varianter eksisterer (SMARTER inkluderer Evaluert og Revidert).',
      },
      {
        id: 'ent221-4-2',
        icon: '🎯',
        title: 'KPI',
        question: 'Hva er en KPI?',
        choices: [
          { id: 'a', label: 'Bare omsetning', isCorrect: false, feedback: 'Spesifikt verktøy.' },
          { id: 'b', label: 'Key Performance Indicator — målbar indikator på resultat', isCorrect: true, feedback: 'Riktig! Målestørrelse.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Måleverktøy.' },
        ],
        espenTip: 'KPIer skal være linkede til mål — ikke bare "tall vi har tilgjengelig".',
      },
      {
        id: 'ent221-4-3',
        icon: '🎯',
        title: 'Marked',
        question: 'Eksempel på markeds-KPI?',
        choices: [
          { id: 'a', label: 'Bare omsetning', isCorrect: false, feedback: 'Salgs-KPI.' },
          { id: 'b', label: 'Merkekjennskap, NPS, posisjonsgrad i kundens bevissthet', isCorrect: true, feedback: 'Riktig! Markeds-spesifikke.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkrete eksempler.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Marketing-mål.' },
        ],
        espenTip: 'NPS (Net Promoter Score) er en av de mest brukte markeds-KPIer globalt.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🛠️',
    title: 'Markedsmiksen (5P-er strategisk)',
    quote: 'Helhet skaper effekt.',
    content: 'Klassisk 4P + utvidet til 5: Produkt (hva tilbyr vi), Pris (kostnadssituasjon, oppfattet verdi), Plass/distribusjon (hvor selges det), Påvirkning/promotion (hvordan kommuniserer vi), People (de menneskene som leverer tjenesten). Tjenestebedrifter legger til Process og Physical evidence (7P). Strategisk bruk: Alle P-er må samkjøres for å skape ønsket posisjonering. Premium-merke krever premium-pris, premium-distribusjon, premium-kommunikasjon. Inkonsistens forvirrer kunden.',
    subpoints: [
      { label: 'KONSISTENS', text: 'Alle P-er må fortelle samme historie.' },
      { label: '7P', text: 'Tjenester krever Process og Physical evidence i tillegg.' },
    ],
    practical: 'Hvilken P er sterkest i din markedsmiks — og hvilken svakest?',
    exercises: [
      {
        id: 'ent221-5-1',
        icon: '🛠️',
        title: '5P',
        question: 'Hvilke P-er i utvidet markedsmiks?',
        choices: [
          { id: 'a', label: 'Bare 2', isCorrect: false, feedback: 'Flere.' },
          { id: 'b', label: 'Produkt, Pris, Plass, Påvirkning, People', isCorrect: true, feedback: 'Riktig! 5P.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Marketing-rammeverk.' },
        ],
        espenTip: 'McCarthys originale 4P fra 1960. Utvidet til 7P av Booms og Bitner 1981 for tjenester.',
      },
      {
        id: 'ent221-5-2',
        icon: '🛠️',
        title: 'Konsistens',
        question: 'Hvorfor må P-er samkjøres?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk grunn.' },
          { id: 'b', label: 'Inkonsistens forvirrer kunden og svekker posisjonering', isCorrect: true, feedback: 'Riktig! Posisjonsbygging.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Posisjoneringskonsekvens.' },
        ],
        espenTip: 'Premium-bil i lavpris-distribusjon = forvirring. Mercedes selges ikke på Rema 1000.',
      },
      {
        id: 'ent221-5-3',
        icon: '🛠️',
        title: 'Tjenester',
        question: 'Hvorfor 7P for tjenester?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret behov.' },
          { id: 'b', label: 'Process og Physical evidence er kritisk i tjenester', isCorrect: true, feedback: 'Riktig! Tjeneste-spesifikt.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare flere bokstaver', isCorrect: false, feedback: 'Reell utvidelse.' },
        ],
        espenTip: 'I tjenester er prosessen produktet. Frisørs salongmiljø er en stor del av opplevelsen.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '💰',
    title: 'Ressursallokering',
    quote: 'Penger og folk der det gir mest.',
    content: 'Ressursallokering: Hvordan fordele begrenset budsjett og bemanning mellom segmenter, kanaler og aktiviteter. Verktøy: ROI per kanal (return on investment), kunde-akkvisisjonskostnad (CAC), customer lifetime value (LTV), Pareto-prinsippet (80/20). Klassisk problem: Markedsavdeling vil ha mer overalt. Løsning: Tving prioritering — hvis vi måtte kutte 30%, hvilke aktiviteter ville stå igjen? Norske scaleups gjør dette ofte i kvartalsvise prioriterings-økter med toppledelsen.',
    subpoints: [
      { label: 'ROI', text: 'Velg det som gir mest avkastning per krone.' },
      { label: '80/20', text: '20% av aktivitetene gir 80% av effekten.' },
    ],
    practical: 'Hvor mye av markedsbudsjettet ditt går til de 20% mest effektive aktivitetene?',
    exercises: [
      {
        id: 'ent221-6-1',
        icon: '💰',
        title: 'ROI',
        question: 'Hva er ROI på markedsføring?',
        choices: [
          { id: 'a', label: 'Bare budsjett', isCorrect: false, feedback: 'Avkastningsmål.' },
          { id: 'b', label: 'Avkastning per investert krone i markedsføringsaktivitet', isCorrect: true, feedback: 'Riktig! Effektmål.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Måleparameter.' },
        ],
        espenTip: 'Digitale kanaler gir ofte best ROI-måling. TV-reklame mye vanskeligere å attribuere.',
      },
      {
        id: 'ent221-6-2',
        icon: '💰',
        title: 'CAC vs LTV',
        question: 'Hva må gjelde mellom CAC og LTV?',
        choices: [
          { id: 'a', label: 'CAC > LTV', isCorrect: false, feedback: 'Da taper du.' },
          { id: 'b', label: 'LTV > CAC, ofte minst 3:1 forhold', isCorrect: true, feedback: 'Riktig! Lønnsomhetstest.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Lønnsomhetsregel.' },
        ],
        espenTip: 'SaaS-bedrifter ser ofte 3:1 eller 5:1. Hvis CAC nærmer seg LTV: Bremse vekst og forbedre.',
      },
      {
        id: 'ent221-6-3',
        icon: '💰',
        title: 'Pareto',
        question: 'Hva sier 80/20-regelen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert prinsipp.' },
          { id: 'b', label: '80% av effekten kommer fra 20% av aktivitetene', isCorrect: true, feedback: 'Riktig! Pareto-prinsippet.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Statistisk.' },
          { id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Generelt.' },
        ],
        espenTip: 'Identifiser dine 20% — fokuser ressurser der. Mange bedrifter sprer for tynt.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '📅',
    title: 'Årshjul for aktiviteter',
    quote: 'Riktig aktivitet til riktig tid.',
    content: 'Årshjul visualiserer markedsaktiviteter over året: Sesongkampanjer (jul, sommer, Black Friday), produktlanseringer, messer og konferanser, salgsperioder, content-publisering, e-mail-kampanjer. Norske bedrifter har bransjespesifikke mønstre: Bygg topper vår-sommer, mote har sesonglanseringer, B2B har messer, fagstoff i Q1 og Q4. Verktøy: Excel/Google Sheets, Asana, Trello, dedikerte planleggingsverktøy som Notion, Hubspot. Sentralt: Synkronisering med produktutvikling og salg.',
    subpoints: [
      { label: 'SESONG', text: 'Tilpass aktiviteter til kjøpsmønstre.' },
      { label: 'KOORDINERT', text: 'Synkroniser med produkt og salg.' },
    ],
    practical: 'Når kjøper kundene dine mest — og bruker du dette aktivt?',
    exercises: [
      {
        id: 'ent221-7-1',
        icon: '📅',
        title: 'Hva',
        question: 'Hva inneholder et årshjul?',
        choices: [
          { id: 'a', label: 'Bare datoer', isCorrect: false, feedback: 'Mer.' },
          { id: 'b', label: 'Kampanjer, lanseringer, messer, salgsperioder, content-publisering', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Aktivitetsplan.' },
        ],
        espenTip: 'Inkluder også eksterne datoer som påvirker dere — branding-events, valg, store konferanser.',
      },
      {
        id: 'ent221-7-2',
        icon: '📅',
        title: 'Sesong',
        question: 'Hvorfor matche sesong?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'b', label: 'Treff kunden når de er i kjøpsmodus — høyere konvertering', isCorrect: true, feedback: 'Riktig! Adferdstilpasning.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsføringsprinsipp.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Black Friday-kampanjer i juni er bortkastet. Treff når kunden faktisk leter.',
      },
      {
        id: 'ent221-7-3',
        icon: '📅',
        title: 'Verktøy',
        question: 'Hvilke verktøy brukes for årshjul?',
        choices: [
          { id: 'a', label: 'Bare papir', isCorrect: false, feedback: 'Også digitalt.' },
          { id: 'b', label: 'Excel, Notion, Asana, Trello, Hubspot, Monday.com', isCorrect: true, feedback: 'Riktig! Mange muligheter.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Verktøy.' },
        ],
        espenTip: 'Start enkelt med Google Sheets. Skaler til dedikert verktøy når kompleksiteten krever det.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🔍',
    title: 'Oppfølging og revidering',
    quote: 'Plan + oppfølging = resultat.',
    content: 'Oppfølgingsrytme: Ukentlig (operasjonelle tall), månedlig (ledergruppe), kvartalsvis (styre/dyptgående gjennomgang), halvårlig (revisjon av plan). Sentrale spørsmål: Når mål? Hvilke tiltak fungerer? Hva må justeres? Norske bedrifter bruker ofte rolling forecast — kontinuerlig oppdatering av prognose 12 måneder fram. Plan må kunne pivotere ved store endringer (pandemi, kriser). Forutsetninger som var sanne i januar kan være falske i juni.',
    subpoints: [
      { label: 'RYTME', text: 'Ukentlig drift, kvartal strategi, halvårlig plan-revisjon.' },
      { label: 'PIVOT', text: 'Ved store endringer må planen kunne snus.' },
    ],
    practical: 'Hvor ofte gjennomgås markedsplanen i din bedrift?',
    exercises: [
      {
        id: 'ent221-8-1',
        icon: '🔍',
        title: 'Rytme',
        question: 'Anbefalt oppfølgingsrytme?',
        choices: [
          { id: 'a', label: 'Bare årlig', isCorrect: false, feedback: 'For sjelden.' },
          { id: 'b', label: 'Ukentlig drift, månedlig leder, kvartalsvis strategisk gjennomgang', isCorrect: true, feedback: 'Riktig! Multi-nivå.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Standard rytme.' },
        ],
        espenTip: 'For sjelden = mister kontroll. For ofte = bruker tid på rapportering i stedet for å gjøre.',
      },
      {
        id: 'ent221-8-2',
        icon: '🔍',
        title: 'Rolling',
        question: 'Hva er rolling forecast?',
        choices: [
          { id: 'a', label: 'Bare prognose', isCorrect: false, feedback: 'Spesifikk metode.' },
          { id: 'b', label: 'Kontinuerlig oppdatert 12-måneders prognose', isCorrect: true, feedback: 'Riktig! Rullerende.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert metode.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Prognose-form.' },
        ],
        espenTip: 'Replacer ofte tradisjonelt fast årsbudsjett. Mer dynamisk og relevant.',
      },
      {
        id: 'ent221-8-3',
        icon: '🔍',
        title: 'Pivot',
        question: 'Når må planen revideres dramatisk?',
        choices: [
          { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Iblant nødvendig.' },
          { id: 'b', label: 'Ved store endringer i marked, teknologi, regulering eller kriser', isCorrect: true, feedback: 'Riktig! Pivot-utløser.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
        ],
        espenTip: 'Pandemien tvang massiv pivot for restaurant- og reisebransjen. Plan = levende dokument.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '📢',
    title: 'Kommunikasjonsplan',
    quote: 'Best plan kommuniseres godt.',
    content: 'Markedsplanen må kommuniseres internt og eksternt. Internt: Hele organisasjonen må forstå retningen — bruk all-hands, intranet, lederopplæring. Salgsteamet må kjenne posisjonering. Eksternt: Kommunikasjon mot kunder (verdiløftet), partnere (samarbeid), investorer (strategi). Kriseberedskap: Hvilken plan har dere ved omdømmekrise? Hvem snakker? Hva sier vi? Norske bedrifter har ofte god strategi men dårlig kommunikasjon — folk vet ikke hva planen er. Klar kommunikasjon = klar utførelse.',
    subpoints: [
      { label: 'INTERNT', text: 'Alle ansatte må kjenne planen og sin rolle i den.' },
      { label: 'KRISE', text: 'Forbered krise-scenarier — det er for sent når krisen kommer.' },
    ],
    practical: 'Hvor mange ansatte i din bedrift kunne forklart strategien for en kunde?',
    exercises: [
      {
        id: 'ent221-9-1',
        icon: '📢',
        title: 'Internt',
        question: 'Hvorfor intern kommunikasjon?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'b', label: 'Felles forståelse av retning gir konsistent utførelse', isCorrect: true, feedback: 'Riktig! Alignment.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt behov.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Internt formål.' },
        ],
        espenTip: 'Studier viser at <30% av ansatte forstår bedriftens strategi. Stor mulighet for forbedring.',
      },
      {
        id: 'ent221-9-2',
        icon: '📢',
        title: 'Krise',
        question: 'Hva er krise-kommunikasjonsplan?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Forberedelse.' },
          { id: 'b', label: 'Forhåndsdefinerte ansvar og kanaler ved omdømmekriser', isCorrect: true, feedback: 'Riktig! Beredskap.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Beredskapsverktøy.' },
        ],
        espenTip: 'Tide-bussulykken 2014 — selskaper med planer kom seg gjennom raskere enn de uten.',
      },
      {
        id: 'ent221-9-3',
        icon: '📢',
        title: 'Salg',
        question: 'Hvorfor må salg kjenne markedsplanen?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Operasjonelt.' },
          { id: 'b', label: 'Konsistent budskap og posisjonering ut til kunde', isCorrect: true, feedback: 'Riktig! Touchpoint.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
          { id: 'd', label: 'Bare lønn', isCorrect: false, feedback: 'Utførelse.' },
        ],
        espenTip: 'Salg er ofte kundens viktigste kontakt. Hvis salg sier én ting, marketing en annen — forvirring.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🏆',
    title: 'Fra plan til resultat',
    quote: 'Utførelse slår strategi.',
    content: 'Forskning på vellykkede bedrifter viser: Det er ikke planen som skiller vinnere fra tapere — det er utførelsen. Sentralt: 1) Klart eierskap (hvem er ansvarlig for hvert tiltak), 2) Konkrete deadlines, 3) Tydelige beslutningspunkter, 4) Disiplinert oppfølging, 5) Læring fra resultater. Norske eksempler: DNB Markets-strategi 2020-2025 — fokusert utførelse. Cognite scaler systematisk basert på data. Tomra brukte 30 år på å bygge global posisjon. Plan er hypotese, utførelse er virkelighet. Begge må være på plass.',
    subpoints: [
      { label: 'EIERSKAP', text: 'Hvert tiltak må ha en navngitt eier.' },
      { label: 'DISIPLIN', text: 'Konsistent oppfølging er forskjellen mellom plan og resultat.' },
    ],
    practical: 'Hva er den ene endringen som ville løftet utførelsen mest i din bedrift?',
    exercises: [
      {
        id: 'ent221-10-1',
        icon: '🏆',
        title: 'Eierskap',
        question: 'Hvorfor klart eierskap?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt behov.' },
          { id: 'b', label: 'Felles ansvar = ingen ansvar. Navngitt eier sikrer fremdrift', isCorrect: true, feedback: 'Riktig! Klassisk innsikt.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
          { id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Ledelseprinsipp.' },
        ],
        espenTip: 'Hvis "alle" er ansvarlige, er ingen ansvarlige. Hver linje i planen trenger ett navn.',
      },
      {
        id: 'ent221-10-2',
        icon: '🏆',
        title: 'Disiplin',
        question: 'Hva skiller vinnere fra tapere?',
        choices: [
          { id: 'a', label: 'Bare flaks', isCorrect: false, feedback: 'Disiplin.' },
          { id: 'b', label: 'Disiplinert utførelse av god plan over tid', isCorrect: true, feedback: 'Riktig! Forskningsbasert.' },
          { id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
          { id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
        ],
        espenTip: 'Boken "Execution" av Bossidy — bestselger nettopp fordi utførelse er undervurdert.',
      },
      {
        id: 'ent221-10-3',
        icon: '🏆',
        title: 'Læring',
        question: 'Hva er post mortem?',
        choices: [
          { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert metode.' },
          { id: 'b', label: 'Strukturert evaluering etter prosjekt for læring', isCorrect: true, feedback: 'Riktig! Læringsverktøy.' },
          { id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Metodisk.' },
          { id: 'd', label: 'Bare regnskap', isCorrect: false, feedback: 'Læringsfokusert.' },
        ],
        espenTip: 'Alternativet er pre-mortem: Tenk gjennom på forhånd hvordan prosjektet kan feile. Forebyggende.',
      },
    ],
  },
]

export default function MarkedsplanenEtablerteBedrifterModule() {
  return (
    <DrawerModule
      moduleCode="ENT2-21"
      moduleTitle="Markedsplanen for etablerte bedrifter"
      moduleIcon="📋"
      storageKey="learning-ent2-markedsplanen-etablerte-bedrifter"
      completeRoute="/learning/ent2/markedsplanen-etablerte-bedrifter/complete"
      phases={phases}
      intro="Den strategiske markedsplanen — hensikt, innhold, TOWS-matrise, SMART-mål med KPIer, ressursallokering, årshjul og oppfølging."
      vissteduAt="Norske selskaper bruker ofte 100+ timer på å lage årsplan, men under 10 timer på oppfølging. Resultatet er at planen blir glemt etter Q1."
      espenSier="Plan er hypotese. Utførelse er virkelighet. Bruk planen som styringsverktøy, ikke som et dokument som arkiveres etter januar."
      presentationLink={{ route: '/learning/presentations/ent2/markedsplanen-etablerte-bedrifter', description: 'Markedsplanen for etablerte bedrifter — 10 slides' }}
    />
  )
}
