import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔍',
    title: 'Situasjonsanalyse og SWOT',
    quote: 'Du kan ikke bestemme deg for hvor du skal gå hvis du ikke vet hvor du er.',
    content: 'Før du kan lage en markedsplan, må du forstå nåsituasjonen. En SWOT-analyse gir deg et strukturert bilde av bedriftens interne styrker og svakheter, samt eksterne muligheter og trusler i markedet. Tenk deg en kaffebar i Bergen som skal åpne sin første lokasjon: internt har de en erfaren barista og en unik husbrenning som styrker, men begrenset kapital og ingen kjent merkevare som svakheter. Eksternt er det muligheter i det voksende spesialkaffe-markedet og turister som søker autentiske opplevelser, men trusler som kjedekafeer som Espresso House og høye leiekostnader i sentrum. Det kritiske skillet er at styrker og svakheter er noe bedriften kontrollerer, mens muligheter og trusler er faktorer i omgivelsene som bedriften må reagere på.',
    subpoints: [
      { label: 'STYRKER', text: 'Interne ressurser og fordeler bedriften allerede har — for eksempel erfarne ansatte, sterk merkevare eller effektiv logistikk.' },
      { label: 'SVAKHETER', text: 'Interne begrensninger som trekker bedriften ned — begrenset kapital, høy turnover eller utdatert teknologi.' },
      { label: 'MULIGHETER', text: 'Eksterne faktorer i markedet bedriften kan dra nytte av — ny målgruppe, konkurrent som forsvinner eller endrede forbrukertrender.' },
      { label: 'TRUSLER', text: 'Eksterne faktorer som kan skade bedriften — nye konkurrenter, lovendringer eller prispress fra leverandører.' },
    ],
    practical: 'Lag alltid en SWOT-analyse som første steg i markedsplanen — det sparer tid og penger ved å sikre at alle aktiviteter er forankret i virkeligheten.',
    glossaryTerm: 'SWOT-analyse',
    exercises: [
      {
        id: 'mp-1-1',
        question: 'En butikk har lojale stamkunder og dyktige ansatte. Dette er eksempler på...',
        choices: [
          { id: 'a', text: 'Muligheter' },
          { id: 'b', text: 'Styrker' },
          { id: 'c', text: 'Trusler' },
          { id: 'd', text: 'Svakheter' },
        ],
        correctId: 'b',
        explanation: 'Styrker er interne faktorer bedriften kontrollerer og som gir et fortrinn — lojale kunder og dyktige ansatte er begge interne fordeler.',
      },
      {
        id: 'mp-1-2',
        question: 'En ny konkurrent åpner rett ved siden av din butikk. Dette er en...',
        choices: [
          { id: 'a', text: 'Svakhet' },
          { id: 'b', text: 'Mulighet' },
          { id: 'c', text: 'Trussel' },
          { id: 'd', text: 'Styrke' },
        ],
        correctId: 'c',
        explanation: 'En ny konkurrent er en ekstern trussel — noe i omgivelsene du ikke kontrollerer, men som kan skade bedriften.',
      },
      {
        id: 'mp-1-3',
        question: 'Hva skiller styrker fra muligheter i en SWOT-analyse?',
        choices: [
          { id: 'a', text: 'Styrker er positive, muligheter er negative' },
          { id: 'b', text: 'Styrker er interne faktorer bedriften kontrollerer, muligheter er eksterne faktorer i markedet' },
          { id: 'c', text: 'Styrker handler om produktet, muligheter handler om markedet' },
          { id: 'd', text: 'Det er ingen forskjell' },
        ],
        correctId: 'b',
        explanation: 'Intern/ekstern-skillet er det viktigste i SWOT: styrker og svakheter er innenfor bedriftens kontroll, muligheter og trusler er utenfor.',
      },
      {
        id: 'mp-1-4',
        question: 'En kaffebar har begrenset kapital og ingen etablert merkevare. Dette er eksempler på...',
        choices: [
          { id: 'a', text: 'Trusler' },
          { id: 'b', text: 'Muligheter' },
          { id: 'c', text: 'Svakheter' },
          { id: 'd', text: 'Styrker' },
        ],
        correctId: 'c',
        explanation: 'Svakheter er interne begrensninger — begrenset kapital og ukjent merkevare er begge interne faktorer som trekker bedriften ned.',
      },
      {
        id: 'mp-1-5',
        question: 'Voksende interesse for spesialkaffe blant norske forbrukere er for en kaffebar en...',
        choices: [
          { id: 'a', text: 'Styrke' },
          { id: 'b', text: 'Svakhet' },
          { id: 'c', text: 'Trussel' },
          { id: 'd', text: 'Mulighet' },
        ],
        correctId: 'd',
        explanation: 'En positiv ekstern trend som bedriften kan utnytte er en mulighet — markedsvekst er noe bedriften ikke skapte selv, men kan dra nytte av.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🎯',
    title: 'Mål og SMART-modellen',
    quote: 'Et vagt mål er en drøm. Et SMART-mål er en plan.',
    content: 'Markedsplaner feiler ofte ikke fordi ideene er dårlige, men fordi målene er for vage til å styre arbeidet. «Vi vil bli mer kjent» gir ingen retning og ingen måte å vite om du lykkes. SMART-modellen tvinger deg til å formulere mål som faktisk er handlingsorienterte: Spesifikt, Målbart, Oppnåelig, Relevant og Tidsbestemt.',
    subpoints: [
      { label: 'SPESIFIKT', text: 'Målet skal beskrive nøyaktig hva som skal oppnås — ikke «mer salg» men «øke salg av vinterjakkekolleksjonen med 20%».' },
      { label: 'MÅLBART', text: 'Du må kunne telle eller måle fremgangen — antall kunder, kroner i omsetning, prosent markedsandel.' },
      { label: 'OPPNÅELIG', text: 'Målet skal strekke bedriften, men ikke være urealistisk — å gå fra 0 til 10 000 følgere på én måned uten budsjett er ikke oppnåelig.' },
      { label: 'RELEVANT', text: 'Målet må henge sammen med bedriftens overordnede strategi — flere Instagram-følgere har liten verdi hvis målgruppen ikke er på Instagram.' },
      { label: 'TIDSBESTEMT', text: 'Alle mål skal ha en konkret frist — uten frist er det ingen urgency og arbeidet drifter.' },
    ],
    practical: 'Skriv alle markedsplanmål i SMART-format fra dag én — det gjør det enklere å delegere, prioritere og evaluere.',
    glossaryTerm: 'SMART-mål',
    exercises: [
      {
        id: 'mp-2-1',
        question: 'Hvilket av disse er et SMART-mål?',
        choices: [
          { id: 'a', text: 'Vi vil bli bedre kjent i markedet' },
          { id: 'b', text: 'Øke Instagram-følgere fra 500 til 2000 innen 1. mars gjennom daglige innlegg' },
          { id: 'c', text: 'Selge mer neste kvartal' },
          { id: 'd', text: 'Forbedre kundetilfredsheten' },
        ],
        correctId: 'b',
        explanation: 'Alternativ B er spesifikt (Instagram-følgere), målbart (500→2000), har frist (1. mars) og metode (daglige innlegg) — et ekte SMART-mål.',
      },
      {
        id: 'mp-2-2',
        question: 'Hva er problemet med målet «vi vil ha flere kunder»?',
        choices: [
          { id: 'a', text: 'Det er ikke relevant nok' },
          { id: 'b', text: 'Det er ikke spesifikt eller målbart — «flere» kan bety én ekstra' },
          { id: 'c', text: 'Det er ikke tidsbestemt alene' },
          { id: 'd', text: 'Både B og C' },
        ],
        correctId: 'd',
        explanation: '«Flere kunder» er verken spesifikt (hvor mange?) eller tidsbestemt (når?) — det gir ingen retning eller mulighet til å vurdere om man lykkes.',
      },
      {
        id: 'mp-2-3',
        question: 'Hva betyr «Oppnåelig» i SMART-modellen?',
        choices: [
          { id: 'a', text: 'At målet er enkelt å nå' },
          { id: 'b', text: 'At målet er ambisiøst men realistisk gitt ressurser og marked' },
          { id: 'c', text: 'At alle i teamet er enige om målet' },
          { id: 'd', text: 'At målet er relevant for strategien' },
        ],
        correctId: 'b',
        explanation: 'Oppnåelig betyr at målet strekker bedriften uten å være urealistisk — ikke for lett, ikke for ambisiøst gitt tilgjengelige ressurser.',
      },
      {
        id: 'mp-2-4',
        question: 'En restaurant setter målet «øke antall lunsjgjester fra 40 til 65 per dag innen 1. juni». Hvilken SMART-egenskap mangler?',
        choices: [
          { id: 'a', text: 'Spesifikt' },
          { id: 'b', text: 'Målbart' },
          { id: 'c', text: 'Tidsbestemt' },
          { id: 'd', text: 'Ingen — dette er et fullstendig SMART-mål' },
        ],
        correctId: 'd',
        explanation: 'Dette målet er spesifikt (lunsjgjester), målbart (40→65), tidsbestemt (1. juni) — det er et godt eksempel på et SMART-mål.',
      },
      {
        id: 'mp-2-5',
        question: 'Hvorfor er «Relevant» en viktig del av SMART-modellen?',
        choices: [
          { id: 'a', text: 'For å sikre at målet er teknisk gjennomførbart' },
          { id: 'b', text: 'For å sikre at målet faktisk bidrar til bedriftens overordnede strategi og ikke bare er en aktivitet for aktivitetens skyld' },
          { id: 'c', text: 'For å gjøre målet enklere å kommunisere' },
          { id: 'd', text: 'For å redusere kostnader' },
        ],
        correctId: 'b',
        explanation: 'Relevans sikrer at ressursene brukes på ting som faktisk betyr noe — 10 000 TikTok-følgere er irrelevant hvis målgruppen er 60-åringer.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '👥',
    title: 'Målgruppe og posisjonering',
    quote: 'Prøver du å selge til alle, selger du til ingen.',
    content: 'Segmentering handler om å dele et marked inn i grupper med felles kjennetegn, slik at du kan tilpasse budskap og aktiviteter til de som faktisk vil kjøpe av deg. Kiwi og Meny selger begge dagligvarer, men de har gjort fundamentalt forskjellige segmenteringsvalg.',
    subpoints: [
      { label: 'DEMOGRAFISK', text: 'Alder, kjønn, inntekt, utdanning og geografi — Rema 1000 vet at kjernemålgruppen bor i by og forsteder, og planlegger butikklokalisering deretter.' },
      { label: 'PSYKOGRAFISK', text: 'Livsstil, verdier og interesser — Norrøna målretter seg mot friluftsentusiaster med høy betalingsvillighet, ikke bare folk som er ute av og til.' },
      { label: 'ATFERDSMESSIG', text: 'Kjøpsmønster og lojalitet — mange norske supermarkeder segmenterer etter handlevaner og sender tilpassede tilbud via kundeklubb.' },
    ],
    practical: 'Definer én primær målgruppe med navn, alder, behov og hva de leser — jo mer konkret, desto mer treffsikre aktiviteter.',
    glossaryTerm: 'Segmentering',
    exercises: [
      {
        id: 'mp-3-1',
        question: 'Kiwi posisjonerer seg mot prisbevisste barnefamilier, Meny mot kvalitetsbevisste forbrukere. Hva viser dette?',
        choices: [
          { id: 'a', text: 'At en av dem tar feil' },
          { id: 'b', text: 'At tydelig segmentering og posisjonering skaper konkurransefortrinn' },
          { id: 'c', text: 'At alle dagligvarebutikker bør ha samme posisjonering' },
          { id: 'd', text: 'At pris alltid er viktigst' },
        ],
        correctId: 'b',
        explanation: 'Begge selskaper lykkes fordi de er krystallklare på hvem de er for — ingen prøver å treffe alle og ender opp med å overbevise ingen.',
      },
      {
        id: 'mp-3-2',
        question: 'Hva er psykografisk segmentering?',
        choices: [
          { id: 'a', text: 'Segmentering basert på alder og kjønn' },
          { id: 'b', text: 'Segmentering basert på livsstil, verdier og interesser' },
          { id: 'c', text: 'Segmentering basert på geografisk plassering' },
          { id: 'd', text: 'Segmentering basert på kjøpsmønster' },
        ],
        correctId: 'b',
        explanation: 'Psykografisk segmentering deler markedet etter livsstil, verdier og interesser — Norrøna målretter mot friluftsentusiaster, ikke bare folk basert på alder.',
      },
      {
        id: 'mp-3-3',
        question: 'Hva er posisjonering?',
        choices: [
          { id: 'a', text: 'Hvor produktet plasseres i butikkhyllen' },
          { id: 'b', text: 'Hva bedriften vil at kundene skal tenke om dem sammenlignet med konkurrentene' },
          { id: 'c', text: 'Den geografiske lokasjonen til bedriften' },
          { id: 'd', text: 'Produktets plassering i markedet basert på pris' },
        ],
        correctId: 'b',
        explanation: 'Posisjonering er det mentale bildet du vil at kunder skal ha av merkevaren din relativt til konkurrentene — det er en strategisk beslutning om identitet.',
      },
      {
        id: 'mp-3-4',
        question: 'En kundeklubb sender ulike tilbud til kunder basert på hva de kjøpte sist. Hva slags segmentering er dette?',
        choices: [
          { id: 'a', text: 'Demografisk segmentering' },
          { id: 'b', text: 'Psykografisk segmentering' },
          { id: 'c', text: 'Atferdsmessig segmentering' },
          { id: 'd', text: 'Geografisk segmentering' },
        ],
        correctId: 'c',
        explanation: 'Segmentering basert på kjøpshistorikk og adferd er atferdsmessig segmentering — det er svært effektivt fordi det bruker faktisk adferd, ikke antagelser.',
      },
      {
        id: 'mp-3-5',
        question: 'Hva menes med «prøver du å selge til alle, selger du til ingen»?',
        choices: [
          { id: 'a', text: 'At man kun bør selge til én kunde om gangen' },
          { id: 'b', text: 'At et udefinert budskap som skal passe alle, ikke resonnerer sterkt med noen spesifikk gruppe' },
          { id: 'c', text: 'At massemarkedsføring aldri fungerer' },
          { id: 'd', text: 'At man bør ha færre produkter' },
        ],
        correctId: 'b',
        explanation: 'Et budskap som er utvannet for å treffe alle, treffer ingen sterkt — tydelig segmentering gir mulighet til et presist budskap som virkelig resonnerer.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💰',
    title: 'Virkemidler og budsjett',
    quote: 'Strategi uten budsjett er bare ønsketenkning.',
    content: 'De klassiske 4P-ene — Produkt, Pris, Plass og Påvirkning (Promotion) — er rammeverket for å velge hvilke virkemidler du skal bruke i markedsplanen. Men i praksis handler mye av arbeidet om å prioritere innenfor et begrenset budsjett.',
    subpoints: [
      { label: 'PRODUKT', text: 'Hvordan produktet møter målgruppens behov — emballasje, kvalitet, sortiment og produktutvikling er alle markedsføringsbeslutninger.' },
      { label: 'PRIS', text: 'Prissetting sender et signal om posisjonering — Diplom-Is og Hennig-Olsen bruker pris aktivt for å skille premium-serien fra volumprodukter.' },
      { label: 'PLASS', text: 'Distribusjon og tilgjengelighet — å få plass i Rema 1000 eller COOP gir enorm rekkevidde, men krever store volumer og marginkompromisser.' },
      { label: 'PÅVIRKNING', text: 'All kommunikasjon mot markedet — fra sosiale medier og annonser til messer, PR og muntlig-til-muntlig (word of mouth).' },
    ],
    practical: 'Sett opp en enkel budsjetttabell der hver krone er øremerket en aktivitet — det gjør det lettere å si nei til fristende men irrelevante muligheter.',
    exercises: [
      {
        id: 'mp-4-1',
        question: 'Hva er de fire P-ene i markedsføringsmiksen?',
        choices: [
          { id: 'a', text: 'Planlegging, Prioritering, Posisjonering, Profilering' },
          { id: 'b', text: 'Produkt, Pris, Plass, Påvirkning' },
          { id: 'c', text: 'Produksjon, Profilering, Publisering, Promotering' },
          { id: 'd', text: 'Produkt, People, Prosess, Presentasjon' },
        ],
        correctId: 'b',
        explanation: 'De klassiske 4P-ene er Produkt, Pris, Plass (distribusjon) og Påvirkning (Promotion) — rammeverket for markedsføringsbeslutninger.',
      },
      {
        id: 'mp-4-2',
        question: 'En bedrift med 50 000 kr markedsføringsbudsjett velger å bruke 20 000 kr på profesjonelt fotosett. Hva er logikken bak dette?',
        choices: [
          { id: 'a', text: 'Bilder er dyrest å produsere' },
          { id: 'b', text: 'Godt innhold kan gjenbrukes mange ganger og gi avkastning over tid' },
          { id: 'c', text: 'Fotografering er alltid den beste investeringen' },
          { id: 'd', text: 'Det er ingen annen god investering for dette budsjettet' },
        ],
        correctId: 'b',
        explanation: 'Innhold med høy kvalitet (bilder, video) kan gjenbrukes i mange kanaler og over lang tid — høy ROI sammenlignet med engangsannonser.',
      },
      {
        id: 'mp-4-3',
        question: 'Hvilken P handler om å velge riktige distribusjonskanaler?',
        choices: [
          { id: 'a', text: 'Produkt' },
          { id: 'b', text: 'Pris' },
          { id: 'c', text: 'Plass' },
          { id: 'd', text: 'Påvirkning' },
        ],
        correctId: 'c',
        explanation: 'Plass handler om distribusjon — hvor og hvordan produktet gjøres tilgjengelig for kunden, enten i butikk, nett, eller begge deler.',
      },
      {
        id: 'mp-4-4',
        question: 'Prissetting kommuniserer noe til kundene om produktets posisjonering. Et høyt priset produkt signaliserer...',
        choices: [
          { id: 'a', text: 'At bedriften er grådig' },
          { id: 'b', text: 'Kvalitet og eksklusivitet — og tiltrekker kunder som søker nettopp dette' },
          { id: 'c', text: 'At produktet er av dårlig kvalitet' },
          { id: 'd', text: 'At produktet er rettet mot alle' },
        ],
        correctId: 'b',
        explanation: 'Pris er et signal: høy pris kommuniserer kvalitet og eksklusivitet, lav pris kommuniserer tilgjengelighet og verdi. Begge kan være riktig strategi.',
      },
      {
        id: 'mp-4-5',
        question: 'Valg av kanal bør alltid henge sammen med...',
        choices: [
          { id: 'a', text: 'Det som er rimeligst' },
          { id: 'b', text: 'Det som konkurrenten bruker' },
          { id: 'c', text: 'Målgruppen — der de faktisk er og søker informasjon' },
          { id: 'd', text: 'Det som er mest populært akkurat nå' },
        ],
        correctId: 'c',
        explanation: 'Kanalvalg skal alltid styres av målgruppen — det nytter ikke å bruke TikTok hvis målgruppen er 60-åringer som leser lokalavisen.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📊',
    title: 'Evaluering og KPI-er',
    quote: 'Det du ikke måler, kan du ikke forbedre.',
    content: 'En markedsplan uten evaluering er som å kjøre bil med bind for øynene — du vet ikke om du er på rett vei. KPI-er (Key Performance Indicators) er de konkrete tallene som forteller deg om markedsaktivitetene fungerer.',
    subpoints: [
      { label: 'KVANTITATIVE KPI-ER', text: 'Tall du kan måle direkte — antall nye kunder, omsetning per kampanje, konverteringsrate, kostnad per klikk (CPC) og e-poståpningsrate.' },
      { label: 'KVALITATIVE KPI-ER', text: 'Vurderinger og tilbakemeldinger — kundetilfredshet (NPS), merkevareoppfatning fra spørreundersøkelser og sentimentanalyse i kommentarfelt.' },
      { label: 'EVALUERINGSFREKVENS', text: 'Ukentlig sjekk av nøkkeltall, månedlig dybdegjennomgang og kvartalsvis strategijustering er et godt rytme for de fleste SMB-er.' },
    ],
    practical: 'Velg 3–5 KPI-er du måler konsekvent heller enn 20 KPI-er du måler tilfeldig — konsistens over tid gir deg det datagrunnlaget du trenger for å ta gode beslutninger.',
    glossaryTerm: 'KPI (Key Performance Indicators)',
    exercises: [
      {
        id: 'mp-5-1',
        question: 'Hva er en KPI?',
        choices: [
          { id: 'a', text: 'Et kommunikasjonsverktøy for markedsplanen' },
          { id: 'b', text: 'En nøkkelindikator som måler om markedsaktiviteter fungerer etter planen' },
          { id: 'c', text: 'Et SMART-mål' },
          { id: 'd', text: 'En type markedsundersøkelse' },
        ],
        correctId: 'b',
        explanation: 'KPI (Key Performance Indicator) er et konkret tall som måler fremdrift mot et mål — de forteller om aktivitetene faktisk gir ønsket resultat.',
      },
      {
        id: 'mp-5-2',
        question: 'Hva er forskjellen på forfengelighetsmål og handlingsmål?',
        choices: [
          { id: 'a', text: 'Forfengelighetsmål er kvantitative, handlingsmål er kvalitative' },
          { id: 'b', text: 'Forfengelighetsmål ser bra ut (likes, følgere) men korrelerer ikke med forretningsresultater; handlingsmål måler faktisk forretningspåvirkning' },
          { id: 'c', text: 'Det er samme ting' },
          { id: 'd', text: 'Forfengelighetsmål er dyre å måle' },
        ],
        correctId: 'b',
        explanation: 'Tusenvis av likes betyr ingenting hvis ingen kjøper — handlingsmål som konverteringsrate og kostnad per ny kunde er det som faktisk betyr noe.',
      },
      {
        id: 'mp-5-3',
        question: 'Hvor ofte bør en SMB typisk gjøre en dybdegjennomgang av markedsplan-KPI-er?',
        choices: [
          { id: 'a', text: 'Daglig' },
          { id: 'b', text: 'Ukentlig' },
          { id: 'c', text: 'Månedlig' },
          { id: 'd', text: 'Kun en gang i året' },
        ],
        correctId: 'c',
        explanation: 'Månedlig dybdegjennomgang gir god balanse — nok data til å se trender, men ikke for sjelden til å miste muligheten til å justere kursen.',
      },
      {
        id: 'mp-5-4',
        question: 'En nettbutikk har 50 000 Instagram-følgere men svak omsetning. Hva bør de fokusere mer på?',
        choices: [
          { id: 'a', text: 'Å få enda flere følgere' },
          { id: 'b', text: 'Konverteringsrate — andelen besøkende som faktisk kjøper' },
          { id: 'c', text: 'Antall likes per innlegg' },
          { id: 'd', text: 'Rekkevidde per innlegg' },
        ],
        correctId: 'b',
        explanation: 'Mange følgere med lav omsetning er et konverteringsproblem — nettbutikken klarer ikke å omsette oppmerksomhet til kjøp.',
      },
      {
        id: 'mp-5-5',
        question: 'Hvorfor anbefales det å velge 3–5 KPI-er fremfor 20?',
        choices: [
          { id: 'a', text: 'Fordi færre KPI-er alltid er bedre' },
          { id: 'b', text: 'Fordi konsistent måling over tid gir bedre datagrunnlag enn mange tilfeldig målte indikatorer' },
          { id: 'c', text: 'Fordi det er for dyrt å måle 20 KPI-er' },
          { id: 'd', text: 'Fordi 20 KPI-er er ulovlig' },
        ],
        correctId: 'b',
        explanation: 'Konsistens er nøkkelen — det er bedre å følge 3–5 KPI-er nøye over tid enn å måle 20 ting sporadisk og aldri bygge opp sammenlignbart historisk data.',
      },
    ],
  },
]

export default function MarkedsplanModule() {
  return (
    <DrawerModule
      moduleCode="MFI3"
      moduleTitle="Markedsplan og SMART-mål"
      moduleIcon="📋"
      storageKey="learning-mfi-markedsplan"
      completeRoute="/learning/mfi/markedsplan/complete"
      phases={PHASES}
      intro="En markedsplan er ikke et dokument du skriver én gang og legger i skuffen — det er et levende verktøy som styrer alle markedsaktiviteter i en bedrift. Uten en god markedsplan bruker bedrifter penger på feil aktiviteter, snakker til feil mennesker og klarer ikke å måle om de lykkes. I dette modulet lærer du hvordan du bygger en markedsplan fra bunnen av, fra situasjonsanalyse til evaluering."
      vissteduAt="Forskning viser at bedrifter med en skriftlig markedsplan er 313% mer sannsynlige til å lykkes enn de uten. Allikevel har under 40% av norske SMB-er en dokumentert markedsplan — de fleste tar beslutninger basert på magefølelse og hva konkurrentene gjør."
      espenSier="Jeg ser det om og om igjen: bedrifter bruker penger på markedsføring uten å ha svart på de grunnleggende spørsmålene først. Hvem er kunden? Hva skiller deg fra konkurrentene? Hva er suksess? En god markedsplan tvinger deg til å svare på disse spørsmålene — og det er egentlig den viktigste jobben den gjør."
      presentationLink={{ route: '/learning/presentations/markedsplan', description: 'Markedsplan — en visuell gjennomgang av SOFT-analyse og strategi' }}
    />
  )
}
