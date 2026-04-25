import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🔄',
    title: 'Kjøpsprosessens 5 faser',
    quote: 'Fra behovstrigger til etterkjøp',
    content: 'Forbrukeres kjøpsprosess er ikke tilfeldig — den følger et mønster som markedsføringen kan påvirke i alle ledd. Å forstå i hvilken fase kunden befinner seg er avgjørende for å velge riktig budskap og kanal.',
    subpoints: [
      {
        label: 'FASE 1 — BEVISSTGJØRING',
        text: 'Kunden innser at de har et behov. Kan trigges av utilfredshet (telefonen er treg), reklame (ny iPhone), eller sosial påvirkning (vennen kjøpte ny jakke). Markedsførerens oppgave: trigge relevant behov.',
      },
      {
        label: 'FASE 2 — INFORMASJONSSØK',
        text: 'Kunden samler informasjon. Intern søk (hukommelse og erfaring) og ekstern søk (Google, anmeldelser, venner). Amazon og Google dominerer denne fasen — 93% av kjøpsreiser begynner med et online søk.',
      },
      {
        label: 'FASE 3 — VURDERING',
        text: 'Kunden sammenligner alternativer mot kriterier (pris, kvalitet, merkevare, garanti). Her er posisjonering avgjørende — kunden har nå et vurderingssett av 2-5 aktuelle merker.',
      },
      {
        label: 'FASE 4 — KJØPSBESLUTNING',
        text: 'Selve kjøpet. Kan forstyrres av holdningsendring ("Jeg bør spare penger") eller uventet hendelse (produktet er utsolgt, butikken er stengt). Markedsførerens oppgave: gjør kjøpet enkelt og friksjonsfritt.',
      },
      {
        label: 'FASE 5 — ETTERKJØP',
        text: 'Kunden evaluerer om kjøpet var riktig. Kognitiv dissonans ("kjøpsangst") = markedsførerens fiende. Amazon bekjemper dette med raske leveranser, enkel retur og bekreftelses-e-poster. Fornøyde kunder = gjenkjøp og anbefaling.',
      },
    ],
    practical: 'Markedsføring bør støtte kunden i ALLE 5 faser — ikke bare i kjøpsøyeblikket. Den som er synlig i søkefasen vinner.',
    glossaryTerm: 'Kjøpsprosessen',
    exercises: [
      {
        id: 'fa-1-1',
        icon: '🔄',
        title: 'Kjøpsprosessens faser',
        question: 'En potensiell kunde googler "beste støvsuger 2024 test". Hvilken fase av kjøpsprosessen er vedkommende i?',
        choices: [
          { id: 'a', label: 'Bevisstgjøring — kunden oppdager behovet for en støvsuger', isCorrect: false, feedback: 'Feil. I bevisstgjøringsfasen innser kunden at de HAR et behov — de googler ikke ennå. Å søke aktivt betyr at kunden allerede vet de vil ha en støvsuger.' },
          { id: 'b', label: 'Informasjonssøk — kunden samler informasjon om mulige alternativer', isCorrect: true, feedback: 'Riktig! Aktivt søk ("test", "beste") er et klart tegn på informasjonssøk-fasen. Kunden vet de vil ha støvsuger, og leter nå etter fakta for å sammenligne.' },
          { id: 'c', label: 'Vurdering — kunden sammenligner konkrete merkevarer mot hverandre', isCorrect: false, feedback: 'Feil. I vurderingsfasen har kunden allerede samlet informasjon og holder på å sammenligne konkrete alternativer. Søk på "beste støvsuger" er fortsatt i informasjonsinnsamlingsfasen.' },
          { id: 'd', label: 'Kjøpsbeslutning — kunden er klar til å kjøpe', isCorrect: false, feedback: 'Feil. Kjøpsbeslutningsfasen kommer etter at kunden har vurdert alternativer. Å søke etter "test" antyder at kunden fortsatt er i informasjonsinnsamling, ikke klar til kjøp.' },
        ],
        espenTip: 'For bedrifter er det avgjørende å være synlig i søkefasen. 93% av kjøpsreiser starter online — er ikke bedriften din der, finnes du ikke for kunden i denne kritiske fasen.',
      },
      {
        id: 'fa-1-2',
        icon: '😟',
        title: 'Kognitiv dissonans',
        question: 'Hva er kognitiv dissonans i en kjøpskontekst, og hvilken fase tilhører det?',
        choices: [
          { id: 'a', label: 'Tvil om man virkelig trenger produktet — oppstår i bevisstgjøringsfasen', isCorrect: false, feedback: 'Feil. Bevisstgjøringsfasen handler om å oppdage behovet, ikke om å tvile på et kjøp man allerede har gjort. Kognitiv dissonans er en etterkjøps-opplevelse.' },
          { id: 'b', label: 'Usikkerhet etter at kjøpet er gjort — "kjøpsangst" om valget var riktig', isCorrect: true, feedback: 'Riktig! Kognitiv dissonans er den ubehagelige følelsen etter et kjøp der kunden tviler på om valget var riktig. Markedsføringen bør bekjempe dette med bekreftelsesmeldinger og god kundeservice.' },
          { id: 'c', label: 'Konflikt mellom to produkter man vurderer i evalueringsfasen', isCorrect: false, feedback: 'Feil. Å sammenligne produkter i evalueringsfasen er en normal del av prosessen, ikke kognitiv dissonans. Begrepet refererer til post-kjøps tvil, ikke pre-kjøps sammenligning.' },
          { id: 'd', label: 'Frustrasjon når det ønskede produktet er utsolgt i kjøpsbeslutningsfasen', isCorrect: false, feedback: 'Feil. Utsolgt produkt forstyrrer kjøpsbeslutningsprosessen, men det er ikke kognitiv dissonans. Kognitiv dissonans er den spesifikke angsten som oppstår ETTER man har kjøpt noe.' },
        ],
        espenTip: 'Amazon bekjemper kognitiv dissonans med en ordre-bekreftelses-e-post som fremhever fordelene med kjøpet. Enkle grep som dette kan øke kundetilfredshet og redusere returer dramatisk.',
      },
      {
        id: 'fa-1-3',
        icon: '🛒',
        title: 'Kjøpsbarrierer i fase 4',
        question: 'En kunde er klar til å kjøpe et nytt kamera på nett, men forlater handlekurven. Hva er den mest sannsynlige årsaken ifølge kjøpsprosessens fase 4?',
        choices: [
          { id: 'a', label: 'Kunden fant ikke kameraet interessant nok i informasjonssøksfasen', isCorrect: false, feedback: 'Feil. At kunden har lagt produktet i handlekurven betyr at de allerede har passert informasjonssøk og vurderingsfasen. Problemet oppstår i selve kjøpsøyeblikket — fase 4.' },
          { id: 'b', label: 'Kjøpsprosessen var for komplisert, prisen uventet høy, eller et uforutsett hinder dukket opp', isCorrect: true, feedback: 'Riktig! Fase 4 kan forstyrres av friksjon i kjøpsprosessen (lang checkout), høyere total pris enn forventet (frakt), eller ytre faktorer ("jeg bør spare"). Markedsføringens oppgave: fjern friksjon.' },
          { id: 'c', label: 'Kunden ble påvirket av en referansegruppe til å velge et annet merke', isCorrect: false, feedback: 'Feil. Referansegruppeeffekter er typisk del av vurderingsfasen der kunden sammenligner merker. I fase 4 er kunden allerede klar til å kjøpe — hindringene er mer praktiske.' },
          { id: 'd', label: 'Kunden opplevde kognitiv dissonans og angret på vurderingsprosessen', isCorrect: false, feedback: 'Feil. Kognitiv dissonans oppstår ETTER kjøpet, ikke som årsak til å forlate handlekurven. Det er selve kjøpet som ikke er gjennomført ennå.' },
        ],
        espenTip: 'Cart abandonment rate (andel som forlater handlekurven) er ca. 70% globalt. De beste e-handelsbedriftene sender en automatisk e-post innen 1 time: "Du glemte noe!" Dette gjenoppretter fase 4.',
      },
      {
        id: 'fa-1-4',
        icon: '📣',
        title: 'Markedsføring i alle faser',
        question: 'Hvilken kommunikasjonsstrategi passer best i BEVISSTGJØRINGSFASEN av kjøpsprosessen?',
        choices: [
          { id: 'a', label: 'Detaljerte produktspesifikasjoner og tekniske sammenligninger', isCorrect: false, feedback: 'Feil. Detaljerte spesifikasjoner er relevant i informasjonssøk- og vurderingsfasen. I bevisstgjøringsfasen er kunden ikke klar for detaljer — de trenger først å bli klar over at de har et behov.' },
          { id: 'b', label: 'Brede bevissthetskampanjer som trigger behov og skaper merkevarebevissthet', isCorrect: true, feedback: 'Riktig! Bevisstgjøring krever bred dekning: TV, sosiale medier, outdoor — kanaler som når mange og planter ideen om at de kanskje trenger produktet.' },
          { id: 'c', label: 'Personaliserte tilbud og rabatter til eksisterende kunder', isCorrect: false, feedback: 'Feil. Personaliserte tilbud er mer relevant i vurderings- eller kjøpsfasen, og spesielt for eksisterende kunder i etterkjøpsfasen. I bevisstgjøringsfasen kjenner kunden ikke engang til behovet ennå.' },
          { id: 'd', label: 'Anmeldelser og testimonials fra andre kunder', isCorrect: false, feedback: 'Feil. Anmeldelser er mest effektive i informasjonssøk- og vurderingsfasen der kunden aktivt søker informasjon. I bevisstgjøringsfasen trenger kunden først å bli oppmerksom på at de har et behov.' },
        ],
        espenTip: 'Huskeregel: Bevisstgjøring = bred dekning (TV, outdoor, virale kampanjer). Informasjonssøk = SEO og innholdsmarkedsføring. Vurdering = anmeldelser og sammenligningsverktøy. Kjøp = enkel checkout. Etterkjøp = kundeservice og lojalitetsprogram.',
      },
      {
        id: 'fa-1-5',
        icon: '⭐',
        title: 'Etterkjøpsfasen strategisk',
        question: 'Hvorfor er det strategisk viktig å investere i etterkjøpsfasen av kjøpsprosessen?',
        choices: [
          { id: 'a', label: 'Fordi det er den billigste fasen å påvirke', isCorrect: false, feedback: 'Feil. Etterkjøpsfasen er ikke nødvendigvis billigst — god kundeservice, returordninger og lojalitetsprogrammer koster penger. Verdien er i gjenkjøp og vareprat, ikke i kostnadsbesparelse.' },
          { id: 'b', label: 'Fornøyde etterkjøpskunder gjentar kjøp og anbefaler til andre — to kraftige og billige vekstmotorer', isCorrect: true, feedback: 'Riktig! Fornøyde kunder er den mest kostnadseffektive markedskanalen: de kjøper igjen (øker CLV) og anbefaler til venner (gratis vareprat). Det koster 5x mer å skaffe ny kunde enn å beholde eksisterende.' },
          { id: 'c', label: 'Fordi myndigheter krever at bedrifter kommuniserer med kunder etter kjøp', isCorrect: false, feedback: 'Feil. Det finnes ingen generell lovplikt til etterkjøpskommunikasjon (utover garantiregler). Investeringen er strategisk motivert, ikke regulatorisk.' },
          { id: 'd', label: 'Fordi konkurrenter ikke kan kopierer etterkjøpsstrategier', isCorrect: false, feedback: 'Feil. Konkurrenter kan absolutt kopiere etterkjøpsstrategier. Verdien av investering i etterkjøpsfasen handler om lojalitet og CLV, ikke om å ha en ukopierbar strategi.' },
        ],
        espenTip: 'Amazon Prime er et etterkjøpsprogram som øker CLV dramatisk. Prime-kunder kjøper 4x mer enn ikke-Prime-kunder. Det er etterkjøpsfasen som gjør Amazon til verdens mest verdifulle handelsbedrift.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧠',
    title: 'Indre påvirkningsfaktorer',
    quote: 'Motivasjon, persepsjon, læring og holdning',
    content: 'Hva skjer inne i kundehodet? Fire psykologiske faktorer former hvordan vi oppfatter, tolker og reagerer på markedsføring. Å forstå disse er nøkkelen til effektiv kommunikasjon.',
    subpoints: [
      {
        label: 'MOTIVASJON',
        text: 'Drivkraft bak atferd. Maslows behovspyramide: Mennesker dekker lavere behov (mat, trygghet) før høyere (status, selvrealisering). Reklame appellerer til relevant behovsnivå — Rolls-Royce appellerer til toppen av pyramiden, ikke bunnen.',
      },
      {
        label: 'PERSEPSJON',
        text: 'Hvordan vi tolker sanseinntrykk — og to kunder kan tolke samme annonse svært ulikt. Coca-Cola bruker rød farge bevisst for å skape assosiasjoner til varme, glede og energi. Apple bruker hvit for renhet og enkelhet.',
      },
      {
        label: 'LÆRING',
        text: 'Erfaring endrer fremtidig atferd. Positiv erfaring = gjenkjøp og lojalitet (Starbucks Rewards). Negativ erfaring = frafall, dårlige anmeldelser og advarsel til venner. Én dårlig opplevelse veier tyngre enn fem gode.',
      },
      {
        label: 'HOLDNING',
        text: 'Kombinasjon av kunnskap (kognitiv), følelse (affektiv) og handlingstilbøyelighet (konativ). Holdninger er stabile — men de kan endres gjennom re-branding. Old Spice gikk fra "bestefars deodorant" til viral ungdomshumor.',
      },
    ],
    practical: 'Det er 6x lettere å selge til en eksisterende kunde enn en ny — fordi holdning og læring allerede er positiv.',
    glossaryTerm: 'Kognitiv dissonans',
    exercises: [
      {
        id: 'fa-2-1',
        icon: '🧠',
        title: 'Maslows behovspyramide',
        question: 'En merkevarekampanje for Rolls-Royce fremhever eksklusivitet og prestisje. Hvilket nivå i Maslows pyramide appellerer den til?',
        choices: [
          { id: 'a', label: 'Fysiologiske behov (mat, vann, søvn)', isCorrect: false, feedback: 'Feil. Fysiologiske behov er det mest grunnleggende nivået — mat og vann. En Rolls-Royce er ikke nødvendig for overlevelse.' },
          { id: 'b', label: 'Trygghetsbehov (sikkerhet, stabilitet)', isCorrect: false, feedback: 'Feil. Trygghetsbehov handler om beskyttelse og stabilitet. Selv om en bil kan ha sikkerhetsaspekter, er Rolls-Royce-kampanjen rettet mot noe mye høyere i pyramiden.' },
          { id: 'c', label: 'Sosiale behov (tilhørighet, venner)', isCorrect: false, feedback: 'Feil. Sosiale behov handler om tilhørighet og kjærlighet. Rolls-Royce appellerer ikke primært til ønsket om å tilhøre en gruppe, men til noe enda høyere.' },
          { id: 'd', label: 'Selvaktualiseringsbehov og esteem (status, anerkjennelse, selvrealisering)', isCorrect: true, feedback: 'Riktig! Rolls-Royce appellerer til toppen av pyramiden: behov for anerkjennelse, status og selvrealisering. Eksklusivitet og prestisje er toppsegments-signaler.' },
        ],
        espenTip: 'Huskeregel for reklame: Jo dyrere og mer eksklusivt produktet er, jo høyere i Maslows pyramide appellerer reklamen. Dagligvarer appellerer til bunnen; luksus appellerer til toppen.',
      },
      {
        id: 'fa-2-2',
        icon: '👁️',
        title: 'Persepsjon og farger',
        question: 'Coca-Cola bruker rød farge konsekvent i all kommunikasjon. Hva er den markedsstrategiske begrunnelsen?',
        choices: [
          { id: 'a', label: 'Rød er den billigste fargen å trykke og produsere i emballasje', isCorrect: false, feedback: 'Feil. Fargevalg i merkevarebygging er aldri basert på produksjonskostnad. Rød er valgt for sine psykologiske assosiasjoner — ikke for å spare penger.' },
          { id: 'b', label: 'Rød farge skaper assosiasjoner til varme, glede og energi — konsistent persepsjon hos kunden', isCorrect: true, feedback: 'Riktig! Persepsjon er nøkkelen: farger skaper ubevisste assosiasjoner. Coca-Cola har i over 100 år bygget assosiasjonen rød = glede og energi gjennom konsistent bruk.' },
          { id: 'c', label: 'Rød skiller Coca-Cola fra Pepsi som bruker blå — ren differensiering', isCorrect: false, feedback: 'Feil. Selv om differensiering fra Pepsi er en bieffekt, er ikke det den primære begrunnelsen. Coca-Cola valgte rød for de positive psykologiske assosiasjonene, ikke primært for å unngå Pepsis blå.' },
          { id: 'd', label: 'Rød farge øker lesbarheten av tekst og gjør produktet lettere å se i butikkhyllen', isCorrect: false, feedback: 'Feil. Synlighet er en fordel, men ikke den primære begrunnelsen. Persepsjonspsykologien bak fargevalget handler om emosjonelle assosiasjoner, ikke om optisk synlighet.' },
        ],
        espenTip: 'Farge er et kraftig persepsjonsverktøy: Grønn = natur/bærekraft, blå = tillit/teknologi, rød = energi/lidenskap, svart = luksus/eksklusivitet. Tine bruker blå av akkurat denne grunnen — tillit og norsk natur.',
      },
      {
        id: 'fa-2-3',
        icon: '📚',
        title: 'Læring og kjøpsatferd',
        question: 'En kunde hadde en svært dårlig opplevelse med en norsk nettbutikk — sent pakke, dårlig kundeservice. Hva forutsier læringsteorien om fremtidig atferd?',
        choices: [
          { id: 'a', label: 'Kunden glemmer opplevelsen over tid og vil sannsynligvis kjøpe igjen', isCorrect: false, feedback: 'Feil. Læringsteorien viser at negative erfaringer har sterkere og mer varig innvirkning enn positive. "Negativity bias" betyr at vi husker dårlige opplevelser lenger enn gode.' },
          { id: 'b', label: 'Kunden unngår fremtidig bruk av butikken og advarer sannsynligvis andre', isCorrect: true, feedback: 'Riktig! Negativ læring fører til unngåelsesatferd og advarsler til andre. Én dårlig opplevelse veier tyngre enn fem gode — dette er "negativity bias" i praksis.' },
          { id: 'c', label: 'Kunden gir butikken én ny sjanse fordi alle gjør feil', isCorrect: false, feedback: 'Feil. Læringsteorien predikerer ikke automatisk tilgivelse. De fleste kunder som har en dårlig opplevelse med en nettbutikk bytter til konkurrenter — de gir ikke automatisk en ny sjanse.' },
          { id: 'd', label: 'Kunden søker aktivt etter lignende tilbud hos konkurrenter i informasjonssøksfasen', isCorrect: false, feedback: 'Feil. Selv om kunden kan gjøre dette, er det ikke det læringsteorien predikerer. Teorien handler om at negativ erfaring skaper negative assosiasjoner til merkevaren — ikke nødvendigvis aktiv søking.' },
        ],
        espenTip: 'I norsk e-handel: en negativ anmeldelse på Trustpilot leses av 10+ potensielle kunder. Én dårlig kundeoppplevelse koster ikke bare den ene kunden, men alle som leser anmeldelsen.',
      },
      {
        id: 'fa-2-4',
        icon: '💡',
        title: 'Holdningsendring',
        question: 'Old Spice klarte å endre sin merkevare fra "bestefars deodorant" til viral ungdomshumor. Hvilken av holdningenes tre komponenter ble primært endret?',
        choices: [
          { id: 'a', label: 'Den kognitive komponenten — kunnskap om produktet ble oppdatert', isCorrect: false, feedback: 'Feil. Selve deodoranten endret seg ikke vesentlig. Old Spice endret ikke kunnskap om produktets egenskaper, men assosiasjoner og følelser knyttet til det.' },
          { id: 'b', label: 'Den affektive komponenten — de emosjonelle assosiasjonene til merkevaren ble endret', isCorrect: true, feedback: 'Riktig! Old Spice endret den emosjonelle assosiasjonen: fra "gammeldags og trist" til "morsom og selvsikker". Den affektive (følelsesmessige) komponenten er oftest det kraftigste endringsverktøyet.' },
          { id: 'c', label: 'Den konative komponenten — handlingstilbøyeligheten ble direkte endret gjennom rabatter', isCorrect: false, feedback: 'Feil. Old Spice brukte ikke rabatter for å drive atferdsendring. De endret assosiasjoner og følelser (affektiv) — som deretter påvirket kjøpsintensjonen (konativ).' },
          { id: 'd', label: 'Ingen komponenter ble endret — veksten skyldtes økt distribusjon, ikke holdningsendring', isCorrect: false, feedback: 'Feil. Old Spice omsetning doblet seg på ett år etter kampanjen "The Man Your Man Could Smell Like" — dette var tydelig merkevare-drevet vekst, ikke distribusjonsendring.' },
        ],
        espenTip: 'Holdningsendring er vanskelig og dyrt. Old Spice brukte hundrevis av millioner kroner og en genial kreativ kampanje. De fleste merkevarer klarer aldri å endre sine kjerneassosiasjoner.',
      },
      {
        id: 'fa-2-5',
        icon: '🎯',
        title: 'Indre faktorer i praksis',
        context: 'Et norsk forsikringsselskap reklamerer: "Sov godt — vi tar oss av det uforutsette."',
        question: 'Hvilken indre påvirkningsfaktor appellerer reklamen primært til?',
        choices: [
          { id: 'a', label: 'Persepsjon — reklamen skaper visuelle assosiasjoner til søvn og ro', isCorrect: false, feedback: 'Feil. Persepsjon handler om tolkning av sanseinntrykk. Selv om søvn-metaforen er visuell, er den primære appellen til et underliggende psykologisk behov — ikke til sanseopplevelse.' },
          { id: 'b', label: 'Motivasjon — reklamen appellerer til trygghetsbehov i Maslows pyramide', isCorrect: true, feedback: 'Riktig! "Sov godt" og "vi tar oss av det uforutsette" appellerer direkte til trygghetsbehov — det andre nivået i Maslows pyramide. Forsikring dekker akkurat dette behovet.' },
          { id: 'c', label: 'Læring — reklamen minner kunden om positive erfaringer med selskapet', isCorrect: false, feedback: 'Feil. Reklamen refererer ikke til tidligere erfaringer. Primærappellen er til et grunnleggende behov for trygghet — motivasjon, ikke læring.' },
          { id: 'd', label: 'Holdning — reklamen forsøker å endre kundens negative holdning til forsikring', isCorrect: false, feedback: 'Feil. Reklamen forsøker ikke primært å endre en negativ holdning — den appellerer til et universelt behov for trygghet og forutsigbarhet som er drivkraften bak kjøp av forsikring.' },
        ],
        espenTip: 'Forsikring, alarmsystemer og helsekost appellerer nesten alltid til trygghetsbehov. Det er det nest laveste behovet i Maslows pyramide — og dermed svært kraftfullt fordi vi alle har det.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '👥',
    title: 'Ytre påvirkningsfaktorer',
    quote: 'Kultur, referansegrupper og familie',
    content: 'Vi tar aldri kjøpsbeslutninger i et vakuum — sosiale faktorer er kraftige og ofte ubevisste påvirkere. Bedrifter som forstår dette kan bruke de sosiale kreftene til sin fordel.',
    subpoints: [
      {
        label: 'KULTUR',
        text: 'Delte verdier og normer i et samfunn. Norsk kultur verdsetter likestilling og nøkternhet — Rolex-reklame som fungerer i Dubai fungerer ikke i Bergen. Merkevarer som ikke forstår lokal kultur feiler globalt.',
      },
      {
        label: 'REFERANSEGRUPPER',
        text: 'Grupper vi sammenligner oss med og ønsker tilhørighet til. Venner, idrettshelter, influencere. Nike bruker idrettsutøvere som referansegrupper for å knytte sko til prestasjon og status.',
      },
      {
        label: 'FAMILIE',
        text: 'Den sterkeste påvirkningsfaktoren for de fleste kjøp. Hvem bestemmer? Fem roller: Initiativtaker (foreslår), påvirker (anbefaler), beslutningstaker (velger), kjøper (betaler), bruker (anvender). Reklame for barnemat retter seg mot foreldrene — ikke barnet.',
      },
      {
        label: 'SOSIAL KLASSE',
        text: 'Inntekt og utdanning påvirker kjøpsatferd. Diskret luksus (Bottega Veneta — ingen synlig logo) vs. synlig luksus (Gucci-logo overalt). To ulike segmenter innen luksus med helt ulik psykologi.',
      },
    ],
    practical: 'Sosiale medier har gjort referansegruppe-påvirkning globalt og instant — en TikTok-trend kan endre kjøpsatferd for millioner av mennesker på timer.',
    glossaryTerm: 'Referansegrupper',
    exercises: [
      {
        id: 'fa-3-1',
        icon: '🌍',
        title: 'Kultur og markedsføring',
        question: 'Burger King tilpasser menyen i India (ingen biff) og Japan (teriyaki). Hva er den underliggende grunnen?',
        choices: [
          { id: 'a', label: 'Det er lovpålagt at internasjonale matselskaper tilpasser menyer til lokale råvarer', isCorrect: false, feedback: 'Feil. Det finnes ingen generell lovplikt til menytilpasning. Tilpasningen er strategisk motivert av kulturforståelse — ikke av regulatoriske krav.' },
          { id: 'b', label: 'Kultur former matpreferanser og verdier — uten kulturell tilpasning vil produktet avvises', isCorrect: true, feedback: 'Riktig! Kulturell kontekst er avgjørende: I India er kua hellig og biff tabu for mange. Uten tilpasning mislykkes produktet — ikke pga. smak, men pga. kulturelle verdier.' },
          { id: 'c', label: 'Lokale råvarer er billigere og gir høyere marginer i hvert land', isCorrect: false, feedback: 'Feil. Selv om lokale råvarer kan redusere kostnader, er dette en operasjonell fordel, ikke den primære grunnen. Den strategiske grunnen er kulturell relevans og aksept.' },
          { id: 'd', label: 'Burger King differensierer seg fra McDonald\'s ved å tilby lokale menyer globalt', isCorrect: false, feedback: 'Feil. McDonald\'s gjør det samme (McAloo Tikki i India, Teriyaki Burger i Japan). Meny-tilpasning er ikke et differensieringstrekk fra konkurrenter, men et kulturelt nødvendig tilpasnings-grep.' },
        ],
        espenTip: 'Kulturforståelse er avgjørende for global markedsføring. Norsk kultur er særlig likhetsorientert og nøktern — reklame som fremhever overdådig luksus slår sjelden an i Norge slik det gjør i andre kulturer.',
      },
      {
        id: 'fa-3-2',
        icon: '👟',
        title: 'Referansegrupper og Nike',
        question: 'Nike bruker eliteidrettsutøvere som Cristiano Ronaldo og Simone Biles i reklamen. Hvilken mekanisme utnytter de?',
        choices: [
          { id: 'a', label: 'Kjendiseffekten — kjente ansikter skaper oppmerksomhet og øker reklamens rekkevidde', isCorrect: false, feedback: 'Feil. Oppmerksomhet er en bieffekt, men den strategiske mekanismen er dypere: idrettsutøvere er referansegrupper — grupper forbrukere ønsker å identifisere seg med og ligne på.' },
          { id: 'b', label: 'Referansegruppeeffekten — forbrukere ønsker å tilhøre eller ligne på gruppene de ser opp til', isCorrect: true, feedback: 'Riktig! Referansegrupper er grupper vi ønsker tilhørighet til. Nikes melding: "Verdensklasseutøvere bruker Nike — hvis du vil prestere som dem, bruk det de bruker."' },
          { id: 'c', label: 'Sosial klasse-appellen — luksusassosiasjoner fra eliteidrett øker produktets prestisjeverdi', isCorrect: false, feedback: 'Feil. Nike er ikke et luksusmerke — de selger bredt. Mekanismen er referansegrupper, ikke sosial klasse-signalering. Nike vil at alle skal identifisere seg med prestasjonskultur.' },
          { id: 'd', label: 'Familietilhørighet — foreldre kjøper Nikes fordi barna ønsker å ligne idrettsutøverne', isCorrect: false, feedback: 'Feil. Selv om barn kan ønske Nike fordi de beundrer idrettsutøvere, er den primære psykologiske mekanismen referansegrupper — ikke familierelasjoner.' },
        ],
        espenTip: 'Influencer-markedsføring på Instagram og TikTok er moderne referansegruppemarketing. Norske treningsinfluencere som @erikaalm eller @caroline_berg_eriksen er referansegrupper for treningsrelaterte produkter.',
      },
      {
        id: 'fa-3-3',
        icon: '👨‍👩‍👧',
        title: 'Familieroller i kjøpsbeslutninger',
        question: 'Reklame for barnematprodukter (for eksempel Nestlé babymat) retter seg nesten alltid mot foreldrene, ikke mot barna. Hva er grunnen?',
        choices: [
          { id: 'a', label: 'Barn ser ikke TV og kan ikke påvirkes av reklame', isCorrect: false, feedback: 'Feil. Barn ser TV og påvirkes av reklame. Den reelle grunnen er rollene i familiens kjøpssenter: foreldren er beslutningstaker og kjøper for barnematvarer.' },
          { id: 'b', label: 'Foreldre er beslutningstakere og kjøpere — de velger og betaler for barnematprodukter', isCorrect: true, feedback: 'Riktig! I familiens kjøpssenter er foreldre beslutningstaker og kjøper for barnematvarer. Barnet er bruker men kan ikke kjøpe. Reklamen retter seg mot den som faktisk tar beslutningen og betaler.' },
          { id: 'c', label: 'Det er ulovlig å reklamere direkte til barn under 12 år i Norge', isCorrect: false, feedback: 'Feil. Selv om det er restriksjoner på visse typer reklame rettet mot barn i Norge (spesielt tobakk og alkohol), er den primære grunnen til å rette barnematreklame mot foreldre strategisk, ikke juridisk.' },
          { id: 'd', label: 'Foreldre har høyere kjøpekraft og er mer verdifulle som kunder', isCorrect: false, feedback: 'Feil. Det er ikke kjøpekraften alene som avgjør. Det er rollene i beslutningsprosessen: foreldrene er de som faktisk velger og kjøper barnematprodukter, uavhengig av kjøpekraft.' },
        ],
        espenTip: 'Familierollene i ML1 er viktige å kjenne: Initiativtaker → Påvirker → Beslutningstaker → Kjøper → Bruker. Ofte er det ulike familiemedlemmer i ulike roller — reklamen skal treffe den som tar beslutningen.',
      },
      {
        id: 'fa-3-4',
        icon: '👜',
        title: 'Sosial klasse og luksus',
        question: 'Bottega Veneta (BV) bruker ingen synlig logo på produktene sine. Gucci har logo overalt. Hvilken sosial dynamikk reflekterer dette?',
        choices: [
          { id: 'a', label: 'Bottega Veneta er et nytt merke og har ikke etablert en gjenkjennelig logo ennå', isCorrect: false, feedback: 'Feil. Bottega Veneta er et ekstremt etablert luksusmerke (grunnlagt 1966). Fraværet av logo er et bevisst strategisk valg, ikke en mangel.' },
          { id: 'b', label: 'To segmenter innen luksus: "quiet luxury" (diskret) for svært velstående vs. synlig statusmarkering for aspirerende', isCorrect: true, feedback: 'Riktig! "Quiet luxury" (BV, Loro Piana) signalerer status til de som kjenner koden — uten at "outsiders" forstår det. Gucci-segmentet ønsker eksplisitt synlig statusmarkering. To ulike sosiale klasse-psykologier.' },
          { id: 'c', label: 'Bottega Veneta fokuserer på produktkvalitet; Gucci fokuserer på merkevarebygging', isCorrect: false, feedback: 'Feil. Begge merker har høy produktkvalitet og sterk merkevarebygging. Forskjellen handler om sosial signalering, ikke om kvalitet vs. merkevare.' },
          { id: 'd', label: 'Norske forbrukere foretrekker diskrete merkevarer fremfor synlige logoer', isCorrect: false, feedback: 'Feil. Norsk Jantelov kan trekke i den retning, men dette er et globalt fenomen i luksussegmentet, ikke spesifikt norsk. Og mange norske forbrukere kjøper gjerne synlige logoer.' },
        ],
        espenTip: 'I norsk kontekst er Janteloven relevant: mange nordmenn foretrekker diskret luksus fremfor synlig statusmarkering. Men yngre forbrukere bryter ofte med Janteloven og ønsker synlige merker.',
      },
      {
        id: 'fa-3-5',
        icon: '📱',
        title: 'Sosiale medier og referansegrupper',
        question: 'En TikTok-trend om en spesifikk produkttype (for eksempel "stanley cup") fører til dramatisk salgsøkning på timer. Hva forklarer dette fenomenet?',
        choices: [
          { id: 'a', label: 'TikTok-algoritmen promoterer betalte annonser fra produsenter til relevante brukere', isCorrect: false, feedback: 'Feil. Viral spredning på TikTok er primært organisk (delt av brukere), ikke betalt promotering. Mekanismen er sosial påvirkning og referansegruppeeffekter, ikke algoritmisk promotering av betalt innhold.' },
          { id: 'b', label: 'Digitale plattformer har gjort referansegruppeeffekter globale og momentane — millioner ser og ønsker det samme umiddelbart', isCorrect: true, feedback: 'Riktig! TikTok-trender er referansegruppeeffekter i en global og digital kontekst. Når mange i din referansegruppe har/ønsker noe, vil du også ha det — og nå skjer dette globalt på sekunder.' },
          { id: 'c', label: 'Produktet er objektivt sett bedre enn alternativer og forbrukere tar rasjonelle kjøpsbeslutninger', isCorrect: false, feedback: 'Feil. Viral popularitet driver ikke alltid objektivt bedre produkter. Stanley cup er funksjonelt ikke overlegen alternative termoser — det er sosial tilhørighet og trend som driver kjøpet.' },
          { id: 'd', label: 'Prisnedgang som følge av stordrift gjør produktet tilgjengelig for alle', isCorrect: false, feedback: 'Feil. TikTok-trender oppstår ikke pga. prisfall. Stanley cups ble faktisk dyrere under trenden. Det er den sosiale dynamikken — alle har det, jeg vil også ha det — som driver salget.' },
        ],
        espenTip: 'TikTok har komprimert referansegruppeeffekter fra dager/uker til timer. For norske markedsførere betyr dette at viralitet er en ny og kraftig kanal — men den er vanskelig å kontrollere og planlegge.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🏢',
    title: 'B2B vs. B2C kjøpsatferd',
    quote: 'Profesjonelt vs. privat kjøp — to verdener',
    content: 'Bedrifter kjøper fundamentalt annerledes enn private forbrukere. B2B-kjøp er drevet av forretningsrasjonale, involverer mange mennesker og tar lang tid. B2C-kjøp er raskere, mer emosjonelle og tas av individer.',
    subpoints: [
      {
        label: 'B2C (Business to Consumer)',
        text: 'Ofte emosjonelt drevet. Rask beslutning (sekunder til dager). Enkelt kjøpssenter: deg selv, eventuelt med familie. Lavere gjennomsnittlig kjøpsbeløp. Bred målgruppe som krever massekommunikasjon.',
      },
      {
        label: 'B2B (Business to Business)',
        text: 'Rasjonelt drevet (ROI, produktivitet, risiko, totalkostnad). Lengre beslutningsprosess (3–18 måneder for store innkjøp). Kjøpssenter (buying center) med mange involverte roller. Relasjonsbasert salg.',
      },
      {
        label: 'KJØPSSITUASJONER B2B',
        text: 'Rutinekjøp (toner til printer — automatisk gjenbestilling uten analyse). Modifisert gjenbestilling (ny leverandør av samme produkttype — noe analyse). Nytt kjøp (investering i nytt CRM-system — full prosess med kjøpssenter og lang tid).',
      },
      {
        label: 'SALGSPROSESSEN B2B',
        text: '"Løsningsalg" — forstå kundens forretningsproblem og selg løsningen, ikke produktet. IBM selger ikke datamaskiner — de selger økt produktivitet og lavere driftskostnader. Produktet er bare midlet.',
      },
    ],
    practical: 'I B2B-salg er relasjoner alt. Et godt B2B-salg starter med å forstå kundens forretningsproblem — ikke med å presentere produktet.',
    glossaryTerm: 'B2B',
    exercises: [
      {
        id: 'fa-4-1',
        icon: '🏢',
        title: 'B2B vs. B2C',
        question: 'Hva er den viktigste forskjellen i beslutningsprosessen mellom B2B og B2C?',
        choices: [
          { id: 'a', label: 'B2B-kjøp er alltid dyrere enn B2C-kjøp', isCorrect: false, feedback: 'Feil. Selv om mange B2B-kjøp er store, er ikke kostnad den avgjørende forskjellen. Noen B2C-kjøp (luksusbiler, eiendommer) er svært dyre. Prosessen og motivasjonen er det sentrale skillet.' },
          { id: 'b', label: 'B2B-kjøp involverer et kjøpssenter med mange roller; B2C er individuelle, raskere og mer emosjonelle', isCorrect: true, feedback: 'Riktig! B2B-prosessen er lengre, mer rasjonell og involverer mange beslutningstakere (buying center). B2C er raskere, mer emosjonell og typisk ett individ eller én familie.' },
          { id: 'c', label: 'B2C-kjøp er alltid rasjonelle og basert på objektiv produktanalyse', isCorrect: false, feedback: 'Feil. B2C er faktisk typisk mer emosjonelt drevet enn B2B. B2B bruker ROI-kalkyler og rasjonell analyse; B2C er mer påvirket av følelser, merkevare og sosiale faktorer.' },
          { id: 'd', label: 'B2B bruker alltid digitale kanaler; B2C bruker tradisjonelle medier', isCorrect: false, feedback: 'Feil. Begge markedssektorer bruker en blanding av digitale og tradisjonelle kanaler. Kanalvalget er ikke det som skiller B2B fra B2C.' },
        ],
        espenTip: 'Huskeregel: B2B = Business logikk (ROI, produktivitet, risiko). B2C = Emosjonell logikk (ønske, tilhørighet, glede). Begge er rasjonelle — men rasjonalitetene er svært ulike.',
      },
      {
        id: 'fa-4-2',
        icon: '👔',
        title: 'Kjøpssenterets roller',
        question: 'Et norsk sykehus kjøper nytt MR-utstyr. Hvem er trolig BRUKER i buying center?',
        choices: [
          { id: 'a', label: 'Innkjøpsavdelingen som håndterer kontrakten', isCorrect: false, feedback: 'Feil. Innkjøpsavdelingen er typisk kjøper (håndterer transaksjonen) eller portvakt (håndterer leverandørkontakt). De bruker ikke MR-utstyret klinisk.' },
          { id: 'b', label: 'Radiologene og sykehuspersonalet som skal bruke utstyret klinisk', isCorrect: true, feedback: 'Riktig! Brukere i buying center er de som faktisk anvender produktet. Radiologer og teknikere bruker MR-maskinen daglig og har viktig innflytelse på valg av tekniske spesifikasjoner.' },
          { id: 'c', label: 'Pasientene som skal undersøkes med utstyret', isCorrect: false, feedback: 'Feil. Pasienter er sluttbrukere av helsetjenesten, men de er ikke deltakere i sykehusenes buying center for medisinsk utstyr. De er ikke del av innkjøpsbeslutningen.' },
          { id: 'd', label: 'Sykehusdirektøren som godkjenner budsjettet', isCorrect: false, feedback: 'Feil. Direktøren er typisk beslutningstaker (endelig godkjenning) eller influencer. De bruker ikke utstyret klinisk og er dermed ikke i bruker-rollen.' },
        ],
        espenTip: 'I B2B-salg er det avgjørende å kartlegge ALLE rollene i buying center. Salgspersonen som kun snakker med innkjøpssjefen og overser brukernes innflytelse taper oftest til den som forstår hele kjøpssenteret.',
      },
      {
        id: 'fa-4-3',
        icon: '🔄',
        title: 'B2B kjøpssituasjoner',
        question: 'En bedrift bytter leverandør av kontorrekvisita (papir, kulepennker) etter å ha brukt samme leverandør i 5 år. Hva slags B2B-kjøpssituasjon er dette?',
        choices: [
          { id: 'a', label: 'Rutinekjøp — automatisk gjenbestilling av kjente produkter', isCorrect: false, feedback: 'Feil. Rutinekjøp innebærer automatisk gjenbestilling fra eksisterende leverandør uten ny analyse. At bedriften bytter leverandør indikerer at det er gjort en viss analyse og sammenligning.' },
          { id: 'b', label: 'Modifisert gjenbestilling — ny leverandør vurderes for samme produkttype', isCorrect: true, feedback: 'Riktig! Modifisert gjenbestilling er når bedriften fortsatt kjøper samme type produkt, men vurderer nye leverandører eller vilkår. En begrenset kjøpsprosess med noe analyse.' },
          { id: 'c', label: 'Nytt kjøp — ukjent produktkategori som krever full kjøpsprosess', isCorrect: false, feedback: 'Feil. Nytt kjøp er for produkter bedriften aldri har kjøpt før (for eksempel nytt CRM-system). Kontorrekvisita er en kjent kategori — dette er ikke et nytt kjøp.' },
          { id: 'd', label: 'Rutinekjøp — produktene er like, bare leverandøren er annerledes', isCorrect: false, feedback: 'Feil. Leverandørbytte er per definisjon ikke et rutinekjøp — rutinekjøp er automatisk gjenbestilling fra eksisterende leverandør. Bytte innebærer vurdering og analyse.' },
        ],
        espenTip: 'B2B kjøpssituasjoner bestemmer salgsinnsatsen: Rutinekjøp = automatisk, liten innsats. Modifisert = noe innsats. Nytt kjøp = full salgsprosess med kjøpssenter og lang tid.',
      },
      {
        id: 'fa-4-4',
        icon: '💼',
        title: 'Løsningsalg i B2B',
        question: 'IBM sier "Vi selger ikke datamaskiner — vi selger økt produktivitet og lavere driftskostnader." Hva er strategien bak?',
        choices: [
          { id: 'a', label: 'IBM ønsker å skjule at de selger datamaskiner fordi konkurrenter har bedre produkter', isCorrect: false, feedback: 'Feil. IBM skjuler ingenting. De re-framer tilbudet fra produkt til løsning, fordi B2B-kunder kjøper resultater og verdi — ikke tekniske spesifikasjoner.' },
          { id: 'b', label: 'Løsningsalg: selg forretningsresultater (ROI, produktivitet) heller enn produktets egenskaper', isCorrect: true, feedback: 'Riktig! B2B-kunder kjøper ikke datamaskiner — de kjøper løsningen på et forretningsproblem. Når du selger forretningsverdi i stedet for produktegenskaper, er du i kundens verden, ikke din egen.' },
          { id: 'c', label: 'IBM differensierer seg fra PC-produsenter ved å posisjonere seg som et konsulenthus', isCorrect: false, feedback: 'Feil. Selv om IBM har konsulentvirksomhet, er det strategiske poenget med løsningsalg å fokusere på kundens forretningsproblem og -resultat — ikke å skifte industrikategori.' },
          { id: 'd', label: 'IBM bruker verdibasert prising og setter pris etter kundens betalingsvilje for resultater', isCorrect: false, feedback: 'Feil. Verdibasert prising er relatert, men det er ikke det sentrale poenget i dette sitatet. Løsningsalg handler om hvordan du presenterer og selger tilbudet, ikke primært om prissetting.' },
        ],
        espenTip: 'Løsningsalg er gullstandarden i B2B. Norsk eksempel: et regnskapssystem selger ikke "software" men "spar 10 timer per måned på bokføring og unngå skattefeil." Det er løsningsalg.',
      },
      {
        id: 'fa-4-5',
        icon: '⏱️',
        title: 'Beslutningshastighet',
        question: 'Hvorfor tar B2B-kjøpsbeslutninger gjennomsnittlig mye lenger tid (måneder til år) enn B2C (sekunder til dager)?',
        choices: [
          { id: 'a', label: 'B2B-bedrifter er mindre effektive enn private forbrukere i beslutningsprosessen', isCorrect: false, feedback: 'Feil. Lengre prosess er ikke et effektivitetsproblem — det er et nødvendig resultat av at beslutningene er mer komplekse, involverer mange mennesker og har større finansielle og operasjonelle konsekvenser.' },
          { id: 'b', label: 'B2B-kjøp er mer komplekse, involverer mange beslutningstakere og har høyere risiko ved feil valg', isCorrect: true, feedback: 'Riktig! Høyere kjøpsbeløp, flere involverte parter (buying center) og større konsekvenser ved feill valg (et dårlig ERP-system kan koste bedriften millioner) nødvendiggjør lengre prosess.' },
          { id: 'c', label: 'B2B-bedrifter har strengere innkjøpsregler og mer byråkrati enn forbrukere', isCorrect: false, feedback: 'Feil. Prosedyrer og regler er en del av bildet, men de er ikke den grunnleggende årsaken. Reglene eksisterer nettopp FORDI beslutningene er komplekse og risikofulle — ikke omvendt.' },
          { id: 'd', label: 'B2B-leverandører leverer langsommere og krever lengre forhandlingstid', isCorrect: false, feedback: 'Feil. Leverandørenes leveringstid er separat fra kjøpsbeslutningsprosessen. Prosessen er lang fordi KJØPEREN trenger tid til analyse, ikke fordi leverandørene er trege.' },
        ],
        espenTip: 'I B2B-salg: tålmodighet er en kjernekompetanse. Et godt B2B-salg kan ta 6-18 måneder. Selgere som presser for raskt mister troverdigheten — B2B-kunder trenger tid og de har gode grunner for det.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📱',
    title: 'Digital atferd og algoritmer',
    quote: 'Hvordan digitale plattformer påvirker kjøpsatferd',
    content: 'Den digitale forbrukeren er informert, utålmodig og forventer personalisering. Digitale plattformer har fundamentalt endret alle 5 faser av kjøpsprosessen — spesielt søke- og vurderingsfasen.',
    subpoints: [
      {
        label: 'CUSTOMER JOURNEY (digital)',
        text: 'Awareness (ser annonse på Instagram) → Consideration (googler produktet, leser anmeldelser) → Purchase (kjøper i appen) → Post-purchase (får push-notifikasjon om tilbehør og en ny kjøpssyklus starter).',
      },
      {
        label: 'ALGORITMER SKAPER KJØPSBEHOV',
        text: 'Amazon-algoritmen: "Kunder som kjøpte X, kjøpte også Y" — 35% av Amazons omsetning er algoritmestyrt. Netflix-algoritmen holder deg engasjert for å forhindre frafall fra abonnementet. Algoritmer forutser og skaper behov.',
      },
      {
        label: 'IMPULSKJØP DIGITAL',
        text: 'IKEAs fysiske butikker er designet for impulskjøp (lang vei ut = mange spontane valg). Instagram Shopping gjenskaper dette digitalt — ett klikk fra inspirasjon til kjøp. Friksjonsfri betalingsopplevelse øker impulskjøp dramatisk.',
      },
      {
        label: 'SØKEATFERD',
        text: '93% av kjøpsreiser starter med en online søk. Position 1 i Google = 28% av klikkene. Position 10 = 2,5% av klikkene. Synlighet i søkemotorer er ikke markedsføring — det er eksistens i det digitale markedet.',
      },
    ],
    practical: 'Digitale plattformer er ikke nøytrale — de er designet for å øke kjøp. Forbrukere bør forstå dette; markedsførere kan bruke det etisk.',
    glossaryTerm: 'Customer journey',
    exercises: [
      {
        id: 'fa-5-1',
        icon: '📱',
        title: 'Digital customer journey',
        question: 'En forbruker ser en Instagram-annonse, googler produktet, leser anmeldelser, og kjøper i appen. Hva er dette et eksempel på?',
        choices: [
          { id: 'a', label: 'Multikanal-markedsføring der bedriften er synlig på mange plattformer', isCorrect: false, feedback: 'Feil. Multikanal beskriver bedriftens tilstedeværelse, ikke kundereisen. Det som beskrives er en digital customer journey — sekvensen av kontaktpunkter kunden passerer på veien til kjøp.' },
          { id: 'b', label: 'En digital customer journey der kunden berører multiple touchpoints før kjøp', isCorrect: true, feedback: 'Riktig! Digital customer journey kartlegger alle kontaktpunktene en kunde passerer fra bevisstgjøring til kjøp. Moderne kjøpsreiser er sjelden lineære og involverer mange digitale touchpoints.' },
          { id: 'c', label: 'Impulskjøp — kunden kjøper uten gjennomtenkt analyse', isCorrect: false, feedback: 'Feil. Impulskjøp er spontane og uten analyse. Her har kunden googlet, lest anmeldelser og vurdert — dette er en gjennomtenkt prosess, selv om den er rask.' },
          { id: 'd', label: 'Algoritmestyrt kjøp der Amazon-algoritmen bestemmer valget', isCorrect: false, feedback: 'Feil. Algoritmer kan påvirke hva kunden ser, men selve kjøpsprosessen beskrevet er en aktiv, kundestyrt digital journey — ikke en ren algoritmestyrt prosess.' },
        ],
        espenTip: 'Gjennomsnittlig norsk forbruker berører 6-8 touchpoints før et netthandel-kjøp. Bedrifter som er synlige i alle fasene av customer journey vinner mot dem som kun fokuserer på ett punkt.',
      },
      {
        id: 'fa-5-2',
        icon: '🤖',
        title: 'Algoritmer og kjøpsatferd',
        question: '35% av Amazons omsetning er algoritmestyrt gjennom "Kunder kjøpte også X"-anbefalinger. Hva er den forbrukerspsykologiske mekanismen?',
        choices: [
          { id: 'a', label: 'Algoritmen manipulerer forbrukere til å kjøpe unødvendige produkter mot sin vilje', isCorrect: false, feedback: 'Feil. Algoritmer anbefaler, de tvinger ikke. Mekanismen er at anbefalingene er relevante og triggern et reelt (latent) behov — ikke manipulering av vilje.' },
          { id: 'b', label: 'Anbefalingene er basert på atferdsdata og avdekker latente behov forbrukeren ikke visste de hadde', isCorrect: true, feedback: 'Riktig! "Kunder kjøpte også Y" er effektivt fordi det bruker reell atferdsdata fra millioner av kunder til å forutse behov — og trigger kjøp av produkter kunden faktisk trenger men ikke tenkte på.' },
          { id: 'c', label: 'Amazon betaler for høy plassering og anbefalingene er i virkeligheten betalt reklame', isCorrect: false, feedback: 'Feil. Amazons produktanbefalinger er primært algoritme-drevet basert på faktisk kjøpsatferd, ikke betalt plassering (selv om betalt annonsering finnes på Amazon separat).' },
          { id: 'd', label: 'Forbrukere er for late til å søke selv og takker ja til første og beste anbefaling', isCorrect: false, feedback: 'Feil. Effektiviteten av anbefalingene handler ikke om latskap — det handler om relevans og timing. Riktig produkt, riktig person, riktig øyeblikk er kombinasjonen som skaper konvertering.' },
        ],
        espenTip: 'Amazon-algoritmen er trolig verdens beste forretningsalgoritme. Norske nettbutikker kan kopiere prinsippet: vis relaterte produkter basert på kjøpshistorikk. Selv enkle "Andre kjøpte også"-seksjoner øker gjennomsnittlig ordrestørrelse.',
      },
      {
        id: 'fa-5-3',
        icon: '⚡',
        title: 'Impulskjøp digitalt',
        question: 'Instagram Shopping lar brukere kjøpe produkter de ser i feed med to klikk. Hva er den psykologiske mekanismen som øker impulskjøp?',
        choices: [
          { id: 'a', label: 'Instagram-annonser er mer overbevisende enn andre reklameforme', isCorrect: false, feedback: 'Feil. Overbevisningsevnen er ikke den primære mekanismen. Det er friksjonsfri kjøpsprosess som er nøkkelen — jo enklere å kjøpe, jo mer sannsynlig at impulsen omsettes til handling.' },
          { id: 'b', label: 'Friksjonsfri kjøpsprosess — fra inspirasjon til kjøp med minst mulig motstand', isCorrect: true, feedback: 'Riktig! Impulskjøp fordamper når det er friksjon (mange klikk, manuell informasjon, lang leveringstid). Jo enklere og raskere kjøpsprosessen er, jo mer sannsynlig at impulsen resulterer i kjøp.' },
          { id: 'c', label: 'Instagram-brukere er mer kjøpevillige enn brukere av andre plattformer', isCorrect: false, feedback: 'Feil. Kjøpvilligheten er ikke plattform-spesifikk. Mekanismen er universell: friksjonsfri prosess øker konvertering uavhengig av plattform. TikTok Shop og Pinterest Shopping utnytter nøyaktig samme prinsipp.' },
          { id: 'd', label: 'Instagram algoritmen velger ut kun produkter kunden allerede planla å kjøpe', isCorrect: false, feedback: 'Feil. Impulskjøp er per definisjon uplanlagte. Algoritmen øker relevans, men impulskjøpets natur er at det ikke var planlagt — det er den plutselige trangen + enkel tilgang som driver kjøpet.' },
        ],
        espenTip: 'IKEA har perfeksjonert impulskjøp fysisk i 50 år: lang vei ut = mange spontane valg. Instagram Shopping er den digitale versjonen av IKEA-butikk-designen.',
      },
      {
        id: 'fa-5-4',
        icon: '🔍',
        title: 'Søkeatferd og synlighet',
        question: 'Position 1 i Google gir 28% av klikk; Position 10 gir 2,5%. Hva er konsekvensen for norske bedrifter?',
        choices: [
          { id: 'a', label: 'Norske bedrifter bør investere maksimalt i TV-reklame fremfor søkemotoroptimalisering', isCorrect: false, feedback: 'Feil. Med 93% av kjøpsreiser som starter online, er søkemotorsynlighet kritisk. TV-reklame er effektivt for bevisstgjøring, men kan ikke erstatte søkemotorsynlighet i informasjons- og vurderingsfasen.' },
          { id: 'b', label: 'Synlighet i søkemotorer er eksistensielt — er du ikke på første side, er du i praksis usynlig', isCorrect: true, feedback: 'Riktig! Med kun 2,5% klikk-andel på position 10 vs. 28% på position 1 er forskjellen dramatisk. For de fleste produktkategorier i Norge er søkemotorsynlighet ikke valgfritt — det er overlevelse.' },
          { id: 'c', label: 'Det er tilstrekkelig å være synlig på sosiale medier — søkemotorer er ikke så viktige for norske forbrukere', isCorrect: false, feedback: 'Feil. Sosiale medier og søkemotorer er komplementære, ikke alternativer. 93% søker — det er ikke et valg mellom kanalene men en erkjennelse av at søk er der kjøpsprosessen ofte starter.' },
          { id: 'd', label: 'Norske bedrifter bør fokusere på avisannonser fordi norske forbrukere er mer mediebevisste', isCorrect: false, feedback: 'Feil. Norske forbrukere er svært digitale — Norway er blant Europas ledende land for digitalt forbruk og netthandel. Søkemotorsynlighet er kritisk for norske bedrifter på tvers av bransjer.' },
        ],
        espenTip: 'Norsk statistikk: Over 90% av nordmenn bruker internett daglig, og Google er dominerende søkemotor. For de aller fleste norske bedrifter er Google den viktigste markedskanalen — anerkjenn det og invester deretter.',
      },
      {
        id: 'fa-5-5',
        icon: '🎯',
        title: 'Personalisering og forventninger',
        question: '71% av forbrukere forventer personalisert kommunikasjon, og 76% blir frustrert uten det. Hva er den strategiske konsekvensen?',
        choices: [
          { id: 'a', label: 'Personalisering er en luksus for store bedrifter — SMBer kan ikke konkurere', isCorrect: false, feedback: 'Feil. Personalisering er tilgjengelig for bedrifter av alle størrelser gjennom digitale verktøy (e-postverktøy, CRM, nettbutikkplattformer). Det er ikke lenger kun for store aktører.' },
          { id: 'b', label: 'Personalisering er ikke lenger et konkurransefortrinn — det er en grunnleggende forventning fra kundene', isCorrect: true, feedback: 'Riktig! Personalisering har gått fra å være en differensiator til å bli en hygienefaktor — noe kundene forventer som minimum. Bedrifter som ikke personaliserer, skuffer kundene aktivt.' },
          { id: 'c', label: 'Bedrifter bør heller fokusere på pris enn personalisering i et prisbevisst norsk marked', isCorrect: false, feedback: 'Feil. Norske forbrukere er prisorienterte, men personalisering og god kundeopplevelse er like viktig. Dessuten er personalisering et verktøy for å øke kjøpsfrekvens og CLV — det handler ikke kun om pris.' },
          { id: 'd', label: 'GDPR gjør det umulig å personalisere kommunikasjon i Norge og EU', isCorrect: false, feedback: 'Feil. GDPR setter rammer, men forbyr ikke personalisering. Med gyldig samtykke og lovlig grunnlag kan bedrifter personalisere effektivt innenfor GDPR-regelverket.' },
        ],
        espenTip: 'Enkle personaliseringstiltak: Bruk kundens navn i e-post. Send relevant innhold basert på tidligere kjøp. Send fødselsdagstilbud. Disse enkle grepene øker åpningsrater og konvertering dramatisk.',
      },
    ],
  },
]

export default function ForbrukeratferdModule() {
  return (
    <DrawerModule
      moduleCode="ML1-03"
      moduleTitle="Forbrukeratferd"
      moduleIcon="🛒"
      storageKey="learning-ml1-forbrukeratferd"
      completeRoute="/learning/ml1/forbrukeratferd/complete"
      phases={PHASES}
      intro="Hvorfor kjøper folk det de kjøper? Forbrukeratferd er studiet av prosessene som leder til kjøpsbeslutninger — og de er langt mer komplekse (og fascinerende) enn &quot;vi ser reklame og kjøper&quot;."
      vissteduAt="71% av forbrukere forventer personalisert kommunikasjon fra bedrifter — og 76% blir frustrert når dette ikke skjer. Personalisering er ikke lenger en fordel, men en forventning."
      espenSier="Neste gang du legger noe i handlekurven på nett — observer din egen kjøpsprosess. Hvilken fase er du i? Hva trigget behovet? Du vil aldri shoppe på autopilot igjen."
      presentationLink={{ route: '/learning/presentations/ml1/forbrukeratferd', description: 'Psykologi og kjøpsatferd — 10 slides' }}
    />
  )
}
