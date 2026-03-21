import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📖',
    title: 'Hva er markedsføring?',
    quote: 'Fra salg til relasjonstenkning',
    content: 'AMA-definisjonen: "Markedsføring er aktiviteten, settet med institusjoner og prosesser for å skape, kommunisere, levere og utveksle tilbud som har verdi for kunder, klienter, partnere og samfunnet." Markedsføring handler ikke om å manipulere folk til å kjøpe — det handler om å forstå hva folk trenger og skape ekte verdi.',
    subpoints: [
      {
        label: 'SALGSORIENTERING',
        text: 'Fokus på å selge det vi produserer. Henry Ford: "Du kan velge hvilken farge du vil, så lenge den er svart." Produksjonen styrte hva som fantes — kundene måtte tilpasse seg.',
      },
      {
        label: 'MARKEDSORIENTERING',
        text: 'Forstå hva markedet vil ha, så produsere det. Apple: Hvert produkt startet med kundebehov — iPod fra "1000 sanger i lomma". Ikke "vi har harddisker, hvem vil ha dem?"',
      },
    ],
    practical: 'Spør alltid "hvem vil ha dette og hvorfor?" før "hva skal vi selge?"',
    glossaryTerm: 'Markedsføring',
    exercises: [
      {
        id: 'mf-1-1',
        icon: '📖',
        title: 'AMA-definisjonen',
        question: 'Hva er kjernebudskapet i AMAs definisjon av markedsføring?',
        choices: [
          { id: 'a', label: 'Å bruke reklame for å overtale flest mulig til å kjøpe produkter', isCorrect: false, feedback: 'Feil. Overtalelse og reklame er ikke kjernen i moderne markedsføring — AMA-definisjonen handler om å skape og levere ekte verdi, ikke manipulere.' },
          { id: 'b', label: 'Å skape, kommunisere og levere verdi til kunder og samfunnet', isCorrect: true, feedback: 'Riktig! AMA legger vekt på verdiskaping for kunder, klienter, partnere og samfunnet — ikke salg eller overtalelse.' },
          { id: 'c', label: 'Å produsere varer så effektivt at prisen blir lavest mulig', isCorrect: false, feedback: 'Feil. Effektiv produksjon er et mål for operasjoner/logistikk, ikke for markedsføring. Markedsføring handler om verdi, ikke om produksjonskostnader.' },
          { id: 'd', label: 'Å øke omsetningen på kort sikt gjennom kampanjer og salgsfremmende tiltak', isCorrect: false, feedback: 'Feil. Kortsiktig omsetningsvekst er et salgsresultat, ikke markedsføringens formål. Moderne markedsføring fokuserer på langsiktig verdiskaping og relasjoner.' },
        ],
        espenTip: 'Husk: verdi = nytte for kunden minus kostnad for kunden. Ekte markedsføring handler om å maksimere verdi, ikke salgsvolum.',
      },
      {
        id: 'mf-1-2',
        icon: '🏭',
        title: 'Salgsorientering vs. markedsorientering',
        context: 'Henry Ford sa: "Du kan velge hvilken farge du vil, så lenge den er svart."',
        question: 'Hva illustrerer dette sitatet om Fords forretningsfilosofi?',
        choices: [
          { id: 'a', label: 'Ford hadde ikke råd til å male bilene i flere farger', isCorrect: false, feedback: 'Feil. Sitatet handler ikke om økonomi, men om maktforhold. Ford hadde ressursene, men valgte å standardisere fordi produksjonslogikken styrte — ikke kundenes preferanser.' },
          { id: 'b', label: 'Ford hadde en salgsorientert filosofi der produksjonen bestemte tilbudet', isCorrect: true, feedback: 'Riktig! Fords filosofi er klassisk salgsorientering: produser effektivt, selg det du lager — kundene tilpasser seg produktet, ikke omvendt.' },
          { id: 'c', label: 'Ford hadde en markedsorientert tilnærming der effektivitet var kundeverdien', isCorrect: false, feedback: 'Feil. Markedsorientering betyr å la kundenes behov styre produksjonen. Ford gjorde det stikk motsatte — han lot produksjonslinjen bestemme hva kundene fikk.' },
          { id: 'd', label: 'Ford brukte posisjonering for å differensiere Model T fra konkurrentene', isCorrect: false, feedback: 'Feil. Posisjonering handler om å skille seg ut i kundens sinn på en ønsket måte. Ford tenkte ikke på differensiering — han tenkte på effektivitet og standardisering.' },
        ],
        espenTip: 'Ford vs. Apple er den klassiske kontrasten: Ford sa "ta det eller la det"; Apple spør "hva trenger du?" De fleste bedrifter som feiler, har Fords tankesett.',
      },
      {
        id: 'mf-1-3',
        icon: '🍎',
        title: 'Apple og markedsorientering',
        question: 'iPod ble lansert med slagordet "1000 sanger i lomma". Hva viser dette om Apples tilnærming?',
        choices: [
          { id: 'a', label: 'Apple kommuniserte produktets tekniske spesifikasjoner på en forenklet måte', isCorrect: false, feedback: 'Feil. "1000 sanger i lomma" er ikke teknisk kommunikasjon — det er kundebehovskommunikasjon. Apple sa ikke "1 GB lagring", de sa hva det betyr for deg som lytter.' },
          { id: 'b', label: 'Apple fokuserte på produktets fysiske størrelse og design', isCorrect: false, feedback: 'Feil. Slagordet handler ikke om størrelse eller estetikk, men om kundeverdi: musikken du ønsker å ha tilgjengelig, alltid og overalt.' },
          { id: 'c', label: 'Apple startet med kundebehov (musikk tilgjengelig) og skapte et produkt rundt det', isCorrect: true, feedback: 'Riktig! Dette er markedsorientering i praksis: identifiser kundebehov ("jeg vil ha musikken min overalt"), deretter bygg produktet som dekker det behovet.' },
          { id: 'd', label: 'Apple kopierte konkurrenter og forbedret produktet teknisk', isCorrect: false, feedback: 'Feil. Selv om MP3-spillere fantes, var Apples tilnærming ikke kopiering men nyfortolkning fra et kundebehovs-perspektiv — "hva trenger musikkelskeren?" ikke "hva lager konkurrentene?"' },
        ],
        espenTip: 'Legg merke til at Apple alltid kommuniserer konsekvensen for kunden, ikke egenskapene til produktet. "Hva betyr dette for deg?" er markedsorienteringens spørsmål.',
      },
      {
        id: 'mf-1-4',
        icon: '🎯',
        title: 'Definere markedsføringens formål',
        question: 'En bedrift har laget et nytt produkt og ber deg hjelpe med markedsføringen. Hva bør det FØRSTE spørsmålet i prosessen være?',
        choices: [
          { id: 'a', label: 'Hvilken pris skal vi sette for å maksimere inntektene?', isCorrect: false, feedback: 'Feil. Pris er ett av mange elementer i markedsmiksen, men den bør settes basert på verdi for kunden — ikke settes før du vet hvem kunden er og hva produktet betyr for dem.' },
          { id: 'b', label: 'Hvem trenger dette produktet og hvilken verdi gir det dem?', isCorrect: true, feedback: 'Riktig! Markedsorienteringens grunnspørsmål: hvem er kunden og hvilken verdi skaper produktet for dem? Alt annet — pris, kanal, kommunikasjon — avhenger av svaret.' },
          { id: 'c', label: 'Hvilke sosiale medier bruker målgruppen mest?', isCorrect: false, feedback: 'Feil. Valg av kommunikasjonskanal er et taktisk spørsmål som kommer etter at du har svart på strategiske spørsmål om hvem kunden er og hvilken verdi du leverer.' },
          { id: 'd', label: 'Hva koster det å produsere produktet og hva er break-even?', isCorrect: false, feedback: 'Feil. Kostnadsanalyse er viktig, men det er et operasjonelt spørsmål. Markedsføringen starter med kunden, ikke med kostnadskalkylen.' },
        ],
        espenTip: 'Innen norsk markedsføringsfag er dette et nøkkelprinsipp: Start alltid med kunden — aldri med produktet eller prisen.',
      },
      {
        id: 'mf-1-5',
        icon: '💡',
        title: 'Markedsføring vs. salg',
        question: 'Hva er den viktigste forskjellen mellom salg og markedsføring?',
        choices: [
          { id: 'a', label: 'Markedsføring bruker digitale kanaler, salg bruker personlige møter', isCorrect: false, feedback: 'Feil. Skillet mellom markedsføring og salg handler ikke om kanalvalg. Begge kan foregå digitalt eller fysisk.' },
          { id: 'b', label: 'Salg fokuserer på å selge det som er produsert, markedsføring på å forstå hva kunden vil ha', isCorrect: true, feedback: 'Riktig! Salg er transaksjonsbasert: konverter kunden nå. Markedsføring er strategisk: forstå markedet og skap produkter/tjenester kunden faktisk vil ha.' },
          { id: 'c', label: 'Markedsføring koster mer enn salg i de fleste bedrifter', isCorrect: false, feedback: 'Feil. Budsjett er ikke det som skiller salg fra markedsføring. Det er filosofien og tilnærmingen som er forskjellig, ikke kostnadsnivået.' },
          { id: 'd', label: 'Salg er langsiktig, markedsføring er kortsiktig', isCorrect: false, feedback: 'Feil. Det er faktisk omvendt: Markedsføring er den langsiktige strategien for å bygge merkevare og relasjoner; salg er det kortsiktige resultatet av gode markedsføringsbeslutninger.' },
        ],
        espenTip: 'Peter Drucker sa det best: "Formålet med markedsføring er å gjøre salg unødvendig." Når produktet er perfekt posisjonert og kommunisert, selger det seg selv.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📈',
    title: 'Markedsføringens utvikling',
    quote: 'Fra produksjon til relasjoner — fire epoker',
    content: 'Markedsføring som fag har gjennomgått fire tydelige epoker: 1920–1950 Produksjonsorientering (produser mye = vinn). 1950–1970 Salgsorientering (selg mer med reklame og push). 1970–1990 Markedsorientering (forstå kunden, la det styre produktet). 1990–nå Relasjonsmarkedsføring (bygg langsiktig lojalitet og livstidsverdi).',
    subpoints: [
      {
        label: 'KODAK (feilet)',
        text: 'Produksjons-/salgsorientert. Visste at digitale foto kom, men beskyttet filmrullene fremfor å følge kunden. Gikk konkurs 2012 — det ironiske: de oppfant det digitale kameraet selv i 1975.',
      },
      {
        label: 'INSTAGRAM (lyktes)',
        text: 'Markedsorientert fra dag én. Forstod at folk ville dele øyeblikk enkelt, ikke lagre på PC. Bygde et produkt rundt det kundene faktisk ville gjøre — og ble kjøpt av Facebook for 1 milliard dollar.',
      },
    ],
    practical: 'Relasjonsmarkedsføring handler om livstidsverdi (CLV) — det koster 5x mer å skaffe ny kunde enn å beholde eksisterende.',
    glossaryTerm: 'Relasjonsmarkedsføring',
    exercises: [
      {
        id: 'mf-2-1',
        icon: '📅',
        title: 'Markedsføringens fire epoker',
        question: 'I hvilken rekkefølge utviklet markedsføringsfaget seg historisk?',
        choices: [
          { id: 'a', label: 'Salgsorientering → Produksjonsorientering → Markedsorientering → Relasjonsmarkedsføring', isCorrect: false, feedback: 'Feil. Produksjonsorientering kom først (1920–1950), da industrien ekspanderte og fokus var på å produsere mye til lav kostnad.' },
          { id: 'b', label: 'Produksjonsorientering → Salgsorientering → Markedsorientering → Relasjonsmarkedsføring', isCorrect: true, feedback: 'Riktig! Fra masseproduktion (1920s) via salgspush (1950s) til kundeforståelse (1970s) og til slutt langsiktige relasjoner (1990s–nå).' },
          { id: 'c', label: 'Markedsorientering → Salgsorientering → Produksjonsorientering → Relasjonsmarkedsføring', isCorrect: false, feedback: 'Feil. Markedsorientering er en relativt ny tilnærming som kom etter at markeder ble mettet og konkurransen økte. Det er ikke startpunktet.' },
          { id: 'd', label: 'Produksjonsorientering → Markedsorientering → Salgsorientering → Relasjonsmarkedsføring', isCorrect: false, feedback: 'Feil. Salgsorientering (push-salg og hard reklame) kom historisk sett FØR markedsorienteringen, ikke etter den.' },
        ],
        espenTip: 'Husketips: PrSaMaRe — Produksjon → Salg → Marked → Relasjoner. Tenk på det som modenhet: etterhvert som markeder ble mer konkurranseutsatte, måtte bedriftene bli mer sofistikerte.',
      },
      {
        id: 'mf-2-2',
        icon: '📷',
        title: 'Kodak og strategisk svikt',
        question: 'Kodak oppfant det digitale kameraet i 1975, men gikk likevel konkurs i 2012. Hva er den beste forklaringen?',
        choices: [
          { id: 'a', label: 'Kodak manglet teknisk kompetanse til å utvikle digitale produkter videre', isCorrect: false, feedback: 'Feil. Kodak hadde teknologien — de oppfant den! Problemet var ikke teknisk kapasitet, men strategisk orientering: de valgte å beskytte filmforretningen fremfor å følge kunden.' },
          { id: 'b', label: 'Kodak hadde salgsorientering og beskyttet eksisterende produkt fremfor å følge kunden', isCorrect: true, feedback: 'Riktig! Kodak er lærebokeksempelet på innovatørens dilemma: de hadde svaret, men var for produksjons-/salgsorienterte til å kanibalisere sin egen filmvirksomhet.' },
          { id: 'c', label: 'Kodak var for lite og hadde ikke kapital til å konkurrere med digitalkamera-produsenter', isCorrect: false, feedback: 'Feil. Kodak var en gigant med enorme ressurser og kapital. Problemet var ikke størrelse eller kapital, men mangel på markedsorientering og vilje til endring.' },
          { id: 'd', label: 'Digital foto-markedet var for lite til å kompensere for tapte filmomsetninger', isCorrect: false, feedback: 'Feil. Digitalt foto ble raskt det dominerende formatet og et enormt marked. Kodak undervurderte ikke markedet — de prioriterte feil ut fra produksjonsorientert tenkning.' },
        ],
        espenTip: 'Kodak illustrerer "the innovator\'s dilemma" perfekt. Norske bedrifter som er for avhengige av én inntektsstrøm gjør samme feil. Alltid spør: hva vil kunden ha om 5 år?',
      },
      {
        id: 'mf-2-3',
        icon: '💝',
        title: 'Relasjonsmarkedsføring og CLV',
        question: 'Hva er det strategiske poenget med Customer Lifetime Value (CLV) i relasjonsmarkedsføring?',
        choices: [
          { id: 'a', label: 'CLV hjelper bedriften å sette riktig pris på hvert enkelt salg', isCorrect: false, feedback: 'Feil. CLV er ikke et prisverktøy. Det er et strategisk mål som måler den totale verdien av en kunde over hele relasjonsperioden — ikke per transaksjon.' },
          { id: 'b', label: 'CLV viser at det er lønnsomt å investere i å beholde eksisterende kunder fremfor alltid å skaffe nye', isCorrect: true, feedback: 'Riktig! Relasjonsmarkedsføring er basert på innsikten at kundelojalitet og livstidsverdi er mer lønnsomt enn konstant kundeakvisjon — det koster 5x mer å skaffe ny kunde.' },
          { id: 'c', label: 'CLV er et verktøy for å beregne lønnsomheten til enkeltprodukter', isCorrect: false, feedback: 'Feil. CLV handler om lønnsomheten til en kundeRelasjon, ikke til et produkt. Det er et relasjonsfokusert mål, ikke et produktfokusert.' },
          { id: 'd', label: 'CLV brukes primært i B2B-markedsføring, ikke i forbrukermarkedet', isCorrect: false, feedback: 'Feil. CLV er like relevant i B2C. Starbucks Rewards, Trumf-kortet og alle lojalitetsprogrammer er CLV-drevne strategier i forbrukermarkedet.' },
        ],
        espenTip: 'Norsk eksempel: Trumf-programmet til NorgesGruppen er et klassisk CLV-tiltak. De investerer i lojalitet fordi de vet at en fast Meny-kunde over 10 år er verdt langt mer enn rabatten de gir.',
      },
      {
        id: 'mf-2-4',
        icon: '📱',
        title: 'Instagram og markedsorientering',
        question: 'Instagram ble kjøpt av Facebook for 1 milliard dollar i 2012 — bare 2 år etter lansering. Hva forklarer denne suksessen fra et markedsføringsperspektiv?',
        choices: [
          { id: 'a', label: 'Instagram hadde den beste teknologien for bildebehandling på markedet', isCorrect: false, feedback: 'Feil. Teknologi var ikke Instagrams differensiator — det var kundeinnsikten. Mange konkurrenter hadde like god teknologi. Instagram forstod hva brukerne faktisk ønsket å gjøre.' },
          { id: 'b', label: 'Instagram brukte aggressiv markedsføring og store reklamekampanjer for å nå brukere', isCorrect: false, feedback: 'Feil. Instagram vokste organisk gjennom nettverkseffekter — ikke gjennom betalt reklame. Produktet ble markedsføringen fordi det dekket et ekte behov.' },
          { id: 'c', label: 'Instagram forstod at folk vil dele øyeblikk enkelt og bygget produktet rundt det behovet', isCorrect: true, feedback: 'Riktig! Markedsorientering i praksis: identifiser udekket behov (enkel bildedeling med stil), bygg produkt rundt det. Resultatet er et selvselgende produkt.' },
          { id: 'd', label: 'Instagram var billigere å utvikle enn konkurrenter og hadde dermed lavere priser', isCorrect: false, feedback: 'Feil. Instagram var gratis for brukerne — prising var ikke suksessfaktoren. Det var den markedsorienterte tilnærmingen som skapte verdi for brukerne og dermed for investorene.' },
        ],
        espenTip: 'Instagram, Snapchat og TikTok er alle bygget på samme prinsipp: forstå hva unge mennesker faktisk vil gjøre med teknologi, bygg det, og de kommer av seg selv.',
      },
      {
        id: 'mf-2-5',
        icon: '🔄',
        title: 'Epoke-identifisering',
        context: 'En norsk møbelbedrift sier: "Vi fokuserer på å bygge langvarige relasjoner med kundene våre, tilby personlig oppfølging etter kjøp, og sikre at de kommer tilbake."',
        question: 'Hvilken markedsføringsepoke representerer denne tankegangen?',
        choices: [
          { id: 'a', label: 'Produksjonsorientering (1920–1950)', isCorrect: false, feedback: 'Feil. Produksjonsorientering handler om å produsere effektivt og selge det som lages — ikke om relasjoner og oppfølging etter kjøp.' },
          { id: 'b', label: 'Salgsorientering (1950–1970)', isCorrect: false, feedback: 'Feil. Salgsorientering handler om push-salg og kortsiktig konvertering — ikke om langsiktige relasjoner og gjenkjøp.' },
          { id: 'c', label: 'Markedsorientering (1970–1990)', isCorrect: false, feedback: 'Feil. Markedsorientering handler om å forstå kundebehov og skape riktige produkter — men fokuset er ikke like eksplisitt på langsiktige relasjoner og lojalitet.' },
          { id: 'd', label: 'Relasjonsmarkedsføring (1990–nå)', isCorrect: true, feedback: 'Riktig! Relasjonsmarkedsføring handler nettopp om langsiktige kundeforhold, ettersalg og å øke Customer Lifetime Value gjennom lojalitet og tillit.' },
        ],
        espenTip: 'I norsk møbelbransje er relasjonsmarkedsføring spesielt viktig fordi kjøpsfrekvensen er lav — du kjøper sofa hvert 10. år. Da er det langsiktige relasjoner og vareprat som driver salget.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🎯',
    title: 'Markedsorientert vs produktorientert',
    quote: 'Blockbuster vs Netflix — to filosofier, én vinner',
    content: 'Produktorientert tenkning: "Vi har dette produktet — hvem kan vi selge det til?" Markedsorientert tenkning: "Hva trenger kunden — hva kan vi lage?" Det høres likt ut, men er fundamentalt forskjellig. Spørsmålet du stiller FØRST avgjør alt.',
    subpoints: [
      {
        label: 'BLOCKBUSTER',
        text: 'Produktorientert. Hadde videobutikker overalt, men forstod ikke at kunden hatet sene gebyrer og ville ha bekvemmelighet hjemme. Da Netflix løste det kundene faktisk ville ha, valgte Blockbuster å beskytte butikkmodellen fremfor å følge kunden.',
      },
      {
        label: 'NETFLIX',
        text: 'Markedsorientert. Startet med å sende DVD i posten (kundebehov: ingen sen-gebyrer), gikk til streaming (bekvemmelighet), produserer nå egne serier (innholdsbehovet). De fulgte alltid kundebehov — ikke produktformater.',
      },
    ],
    practical: 'Markedsorienterte bedrifter overlever disrupsjon fordi de følger kunden, ikke produktet.',
    glossaryTerm: 'Markedsorientering',
    exercises: [
      {
        id: 'mf-3-1',
        icon: '📼',
        title: 'Blockbuster vs. Netflix',
        question: 'Hva var Blockbusters grunnleggende strategiske feil ifølge markedsorienteringsperspektivet?',
        choices: [
          { id: 'a', label: 'De investerte for mye i fysiske butikker og hadde for høye driftskostnader', isCorrect: false, feedback: 'Feil. Kostnadsstrukturen var et symptom, ikke årsaken. Den underliggende feilen var at de beskyttet en forretningsmodell fremfor å lytte til hva kunden faktisk ville ha.' },
          { id: 'b', label: 'De forstod ikke at kunden ville ha bekvemmelighet hjemme og hatet sene gebyrer', isCorrect: true, feedback: 'Riktig! Markedsorientering handler om å lytte til kunden. Blockbuster visste om klagene på sene gebyrer men ignorerte dem fordi gebyrinntektene var for gode — en klassisk produktorientert feil.' },
          { id: 'c', label: 'De hadde for dårlig teknologi til å konkurrere med Netflix i streaming', isCorrect: false, feedback: 'Feil. Blockbuster hadde faktisk mulighet til å kjøpe Netflix for 50 millioner dollar i 2000, men avslo. Problemet var ikke teknologi, men manglende markedsorientering.' },
          { id: 'd', label: 'De fokuserte for mye på unge kunder og mistet de eldre lojale kundene', isCorrect: false, feedback: 'Feil. Segmentering var ikke problemet. Blockbuster mistet ALLE kunder fordi de ikke fulgte kundenes ønske om bekvemmelighet — uavhengig av alder.' },
        ],
        espenTip: 'Blockbuster avsto Netflix for 50 millioner dollar i 2000. Netflix er i dag verdt over 200 milliarder dollar. Det er hva det koster å være produktorientert i et markedsorientert marked.',
      },
      {
        id: 'mf-3-2',
        icon: '🎬',
        title: 'Netflix sin markedsorientering',
        question: 'Netflix startet med DVD-post, gikk til streaming, og produserer nå egne serier. Hva viser denne utviklingen?',
        choices: [
          { id: 'a', label: 'Netflix kopierte konkurrenter på hvert steg og forbedret teknologien', isCorrect: false, feedback: 'Feil. Netflix var en innovatør, ikke en kopiator. Hvert steg var drevet av kundens behov — tilgjengelighet, bekvemmelighet, eksklusivt innhold — ikke av hva konkurrenter gjorde.' },
          { id: 'b', label: 'Netflix fulgte konstant kundebehov, ikke produktformater — fra post til streaming til innhold', isCorrect: true, feedback: 'Riktig! Netflix er en masterclass i markedsorientering: de har aldri vært "et DVD-selskap" eller "et streaming-selskap" — de er "et selskap som gir deg underholdning du vil ha."' },
          { id: 'c', label: 'Netflix hadde en teknologistrategi og fulgte den konsekvent', isCorrect: false, feedback: 'Feil. Netflix fulgte en kundestrategi, ikke en teknologistrategi. Teknologi var middelet; kundens underholdningsbehov var målet.' },
          { id: 'd', label: 'Netflix var heldige med timing — streaming-teknologi dukket opp akkurat da DVD-markedet falt', isCorrect: false, feedback: 'Feil. Netflix skapte i stor grad sin egen timing ved å investere i streaming tidlig. Markedsorienterte bedrifter er ikke passive; de forutser kundebehov og bygger kapabiliteter.' },
        ],
        espenTip: 'Legg merke til at Netflix aldri definerte seg selv som et "format" (DVD, streaming). De definerte seg som en løsning på et kundebehov. Det er den avgjørende forskjellen.',
      },
      {
        id: 'mf-3-3',
        icon: '❓',
        title: 'Startspørsmålet avgjør alt',
        question: 'Hva er det avgjørende skillet mellom produkt- og markedsorientert tenkning?',
        choices: [
          { id: 'a', label: 'Produktorienteringen prioriterer kvalitet; markedsorienteringen prioriterer pris', isCorrect: false, feedback: 'Feil. Skillet handler ikke om kvalitet vs. pris, men om retning: starter du med produktet (og leter etter kunder) eller med kunden (og lager produkt til dem)?' },
          { id: 'b', label: 'Produktorienteringen starter med "hva har vi?", markedsorienteringen starter med "hva trenger kunden?"', isCorrect: true, feedback: 'Riktig! Det er startspørsmålet som avgjør alt. Samme ressurser, same teknologi — men ett tankesett fører til relevans, det andre til irrelevans.' },
          { id: 'c', label: 'Produktorienteringen er best for nye bedrifter; markedsorienteringen er best for etablerte bedrifter', isCorrect: false, feedback: 'Feil. Det er ingen sammenheng mellom bedriftens alder og hvilken orientering som er hensiktsmessig. Begge typer kan brukes av både nye og etablerte bedrifter — med ulike resultater.' },
          { id: 'd', label: 'Markedsorienteringen er mer kostbar enn produktorienteringen fordi den krever mer markedsundersøkelser', isCorrect: false, feedback: 'Feil. Kostnadsforskjellen er ikke det avgjørende skillet. En produktorientert bedrift kan faktisk tape mye mer på å lage produkter ingen vil ha enn hva markedsundersøkelser koster.' },
        ],
        espenTip: 'I norsk næringslivseksamen brukes Blockbuster og Kodak hyppig som eksempler på produktorientering. Husk: begge visste om trusselen — de valgte feil.',
      },
      {
        id: 'mf-3-4',
        icon: '🏪',
        title: 'Norsk kontekst',
        context: 'En norsk bokhandel merker at salget av fysiske bøker faller, mens e-bøker og lydebøker vokser raskt.',
        question: 'Hva ville en markedsorientert bokhandel gjøre i denne situasjonen?',
        choices: [
          { id: 'a', label: 'Investere mer i markedsføring av fysiske bøker for å reversere trenden', isCorrect: false, feedback: 'Feil. Å investere mer i å selge et produkt folk i mindre grad vil ha, er produktorientert tenkning. Det adresserer symptomet (fallende salg) men ikke årsaken (endrede kundbehov).' },
          { id: 'b', label: 'Tilby bredere sortiment av digitale alternativer og se seg selv som en "leseopplevelse"-leverandør', isCorrect: true, feedback: 'Riktig! Markedsorientering: følg kundens behov (lese og lytte til historier) uavhengig av format. Definer virksomheten som "leseopplevelse", ikke "fysiske bøker".' },
          { id: 'c', label: 'Senke prisene på fysiske bøker for å bli mer konkurransedyktige mot nettbutikker', isCorrect: false, feedback: 'Feil. Prisreduksjon alene løser ikke det underliggende problemet: kundene skifter ikke fra fysiske bøker på grunn av pris, men på grunn av bekvemmelighet og format-preferanser.' },
          { id: 'd', label: 'Spesialisere seg kun på sjeldne og samlerverdige bøker', isCorrect: false, feedback: 'Feil. Nisjeposisjonering kan være en strategi, men det svarer ikke på spørsmålet om markedsorientering. Problemet er å forstå hva de eksisterende kundene trenger, ikke å bytte til et helt annet segment.' },
        ],
        espenTip: 'Norsk eksempel: Norli og Ark-bokhandlerne sliter nettopp med dette. De som overlever vil definere seg som "opplevelsesleverandører" — kaféer, arrangementer, digitalt — ikke bare bokselgere.',
      },
      {
        id: 'mf-3-5',
        icon: '🔍',
        title: 'Identifisere orientering',
        context: 'Et norsk sportsutstyrsmerke sier i sin årsrapport: "Vi fortsetter å produsere og markedsføre de produktene som har gitt oss suksess de siste 20 årene. Markedet vil alltid trenge kvalitetssportstøy."',
        question: 'Hvilken risiko løper denne bedriften ifølge markedsorienteringsperspektivet?',
        choices: [
          { id: 'a', label: 'De risikerer å miste leverandørkontrakter dersom konkurrenter tilbyr bedre priser', isCorrect: false, feedback: 'Feil. Leverandørrelasjoner er en operasjonell risiko, ikke den strategiske risikoen som markedsorientering adresserer. Den strategiske risikoen er at markedet endrer seg.' },
          { id: 'b', label: 'De risikerer å miste relevans dersom kundenes behov og preferanser endrer seg', isCorrect: true, feedback: 'Riktig! "Markedet vil alltid trenge X" er en farlig antakelse. Kundenes behov endrer seg. Bedrifter som ikke tilpasser seg — som Kodak — risikerer å bli irrelevante.' },
          { id: 'c', label: 'De risikerer å tape markedsandel til utenlandske aktører med lavere produksjonskostnader', isCorrect: false, feedback: 'Feil. Kostnad-konkurranse er en reell utfordring, men det er ikke den strategiske risikoen markedsorienteringsperspektivet peker på. Det handler om å lytte til kunden, ikke om kostnadsstruktur.' },
          { id: 'd', label: 'De risikerer å overbemanne salgsavdelingen fremfor å investere i produktutvikling', isCorrect: false, feedback: 'Feil. Bemanning er et organisatorisk spørsmål, ikke det sentrale problemet som markedsorienteringsperspektivet fokuserer på.' },
        ],
        espenTip: 'Sitatet "markedet vil alltid trenge X" er et rødt flagg i enhver forretningsanalyse. Kodak, Nokia og Blockbuster trodde alle det samme om sin bransje — rett før de falt.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🤝',
    title: 'Interessenter og samfunnsansvar',
    quote: 'Hvem påvirker og påvirkes av bedriften?',
    content: 'Interessenter (stakeholders) er alle som påvirker eller påvirkes av bedriftens aktiviteter. En moderne bedrift kan ikke bare optimere for aksjonærene — den må balansere interessene til et bredt spekter av parter.',
    subpoints: [
      {
        label: 'INTERNE INTERESSENTER',
        text: 'Ansatte, ledelse, eiere. Ansatte krever lønn, arbeidsglede og utvikling. Ledelse vil ha handlefrihet. Eiere vil ha overskudd og verdistigning. Disse interessene er ikke alltid sammenfallende.',
      },
      {
        label: 'EKSTERNE INTERESSENTER',
        text: 'Kunder, leverandører, lokalsamfunn, myndigheter, medier. Kunder vil ha kvalitet og rettferdige priser. Myndigheter krever lovlydighet. Lokalsamfunn ønsker arbeidsplasser og ansvarlig drift.',
      },
      {
        label: 'SAMFUNNSANSVAR (CSR)',
        text: 'Corporate Social Responsibility — bedriften tar ansvar utover det å tjene penger. Eksempel: Patagonia donerer 1% av omsetning til miljøsaker og kommuniserer dette i all markedsføring. Resultat: millioner av lojale kunder som føler at kjøpet betyr noe.',
      },
    ],
    practical: 'Interessentanalyse er første steg i strategisk planlegging — hvem MÅ vi tilfredsstille, hvem BØR vi hensynta?',
    glossaryTerm: 'Interessenter',
    exercises: [
      {
        id: 'mf-4-1',
        icon: '👥',
        title: 'Interessent-kategorier',
        question: 'Hvilken av disse er et eksempel på en INTERN interessent i en bedrift?',
        choices: [
          { id: 'a', label: 'En leverandør som leverer råvarer til produksjonen', isCorrect: false, feedback: 'Feil. Leverandører er eksterne interessenter — de er utenfor bedriften og har egne interesser i transaksjonen, men er ikke en del av den interne organisasjonen.' },
          { id: 'b', label: 'En ansatt i produksjonsavdelingen', isCorrect: true, feedback: 'Riktig! Ansatte er interne interessenter — de er en del av organisasjonen og har direkte interesse i bedriftens beslutninger om lønn, arbeidsforhold og fremtid.' },
          { id: 'c', label: 'Et lokalt media som dekker bedriftens aktiviteter', isCorrect: false, feedback: 'Feil. Medier er eksterne interessenter som påvirker bedriftens omdømme men ikke er en del av organisasjonen.' },
          { id: 'd', label: 'En kunde som jevnlig kjøper fra bedriften', isCorrect: false, feedback: 'Feil. Kunder er den viktigste eksterne interessenten, men de er ikke en del av den interne organisasjonen.' },
        ],
        espenTip: 'Huskeregel: Interne interessenter = innenfor bedriftens vegger (ansatte, ledelse, eiere). Eksterne = alle utenfor (kunder, leverandører, samfunn, myndigheter, medier).',
      },
      {
        id: 'mf-4-2',
        icon: '⚖️',
        title: 'Balansering av interessenter',
        context: 'Et norsk industriselskap vurderer å flytte produksjonen til Polen for å redusere kostnader. Dette vil øke aksjonærenes avkastning men medføre masseoppsigelser lokalt.',
        question: 'Hvilken interessentkonflikt illustrerer dette scenariet?',
        choices: [
          { id: 'a', label: 'Konflikt mellom aksjonærenes finansielle interesser og ansattes/lokalsamfunnets interesser', isCorrect: true, feedback: 'Riktig! Dette er en klassisk interessentkonflikt: eierinteresser (høyere avkastning) vs. interne/eksterne interessenter (ansatte og lokalsamfunn som mister arbeidsplasser).' },
          { id: 'b', label: 'Konflikt mellom produktkvalitet og kostnadskontroll', isCorrect: false, feedback: 'Feil. Scenariet handler primært om interessentkonflikt — hvem sine interesser skal prioriteres — ikke om produktkvalitet.' },
          { id: 'c', label: 'Konflikt mellom markedsorienteringsstrategien og salgsorienteringsstrategien', isCorrect: false, feedback: 'Feil. Dette er ikke en strategikonflikt om markedsorientering — det er en etisk og strategisk avveining mellom ulike interessegruppers behov.' },
          { id: 'd', label: 'Konflikt mellom kortsiktig og langsiktig prissettingsstrategi', isCorrect: false, feedback: 'Feil. Prissetting er ikke temaet her. Scenariet handler om bedriftens ansvar overfor ulike grupper som påvirkes av dens beslutninger.' },
        ],
        espenTip: 'I Norge er slike beslutninger ekstra politisk sensitive pga. velferdsstaten og fagforeningene. Norsk Hydros nedleggelse av Karmøy-verket (aluminiumsproduksjon) skapte stor offentlig debatt av akkurat denne grunnen.',
      },
      {
        id: 'mf-4-3',
        icon: '🌱',
        title: 'CSR og markedsføring',
        question: 'Patagonia donerer 1% av omsetningen til miljøsaker. Hvordan skiller dette seg fra tradisjonell veldedighet?',
        choices: [
          { id: 'a', label: 'Det skiller seg ikke — bedriften gir bort penger til gode formål i begge tilfeller', isCorrect: false, feedback: 'Feil. Det er en viktig forskjell: Patagonia integrerer miljøengasjementet i sin merkevareidentitet og markedsføring — det er ikke stille veldedighet men en kommunikert del av verdiforslagot til kunden.' },
          { id: 'b', label: 'Patagonia integrerer samfunnsansvar i merkevareidentiteten og bruker det aktivt som markedsføringsargument', isCorrect: true, feedback: 'Riktig! CSR som markedsføringsstrategi betyr at samfunnsansvaret er kjernen i merkevarekommunikasjonen — ikke bare en skattefradragspost. Kundene kjøper Patagonia FORDI de støtter miljøsaken.' },
          { id: 'c', label: 'Patagonia er et non-profit selskap, tradisjonelle bedrifter er profittdrevne', isCorrect: false, feedback: 'Feil. Patagonia er et profittdrevet selskap. De har valgt å donere deler av profitten til miljøformål som en bevisst strategisk og merkevaredecisjon.' },
          { id: 'd', label: 'Tradisjonell veldedighet er mer effektiv enn CSR fordi pengene går direkte til formålet', isCorrect: false, feedback: 'Feil. Spørsmålet handler ikke om effektivitet, men om integrasjon i forretningsstrategi. CSR som markedsføring skaper merkevardeverdi og lojalitet utover selve pengebeløpet.' },
        ],
        espenTip: 'Norsk eksempel: Stormberg integrerer sosiale og miljømessige hensyn i hele forretningsmodellen. Dette tiltrekker bevisste forbrukere som vil at kjøpet deres skal bety noe.',
      },
      {
        id: 'mf-4-4',
        icon: '📊',
        title: 'Prioritering av interessenter',
        question: 'Hvilken interessent MÅ en bedrift tilfredsstille for å overleve på kort sikt?',
        choices: [
          { id: 'a', label: 'Lokalsamfunnet, fordi omdømme avgjør langsiktig overlevelse', isCorrect: false, feedback: 'Feil. Lokalsamfunn er viktig for langsiktig legitimitet, men en bedrift kan overleve kortssiktig uten at lokalsamfunnet er tilfredsstilt.' },
          { id: 'b', label: 'Kunder, fordi uten kjøpende kunder er det ingen inntekter og ingen virksomhet', isCorrect: true, feedback: 'Riktig! Kunder er den eneste interessenten som direkte skaper inntekter. Uten kunder er det ingen business. Alle andre interessenter er viktige, men kunden er eksistensgrunnlaget.' },
          { id: 'c', label: 'Aksjonærene, fordi de eier selskapet og kan legge det ned', isCorrect: false, feedback: 'Feil. Aksjonærer er svært viktige, men en bedrift uten kunder vil ha tomme aksjonærkrav. Aksjonærenes avkastning avhenger av at kundene er tilfredsstilte.' },
          { id: 'd', label: 'Myndighetene, fordi regulatorisk godkjennelse er nødvendig for drift', isCorrect: false, feedback: 'Feil. Myndighetsoverholdelse er en minimumskrav for å drive lovlig, men tilfredsstillelse av myndigheter alene sikrer ikke bedriftens overlevelse.' },
        ],
        espenTip: 'Huskeregel for eksamen: Prioriter interessenter ved å spørre "hvem sin misnøye stopper virksomheten umiddelbart?" Kunden er altid svar 1 — uten salg, ingen bedrift.',
      },
      {
        id: 'mf-4-5',
        icon: '🏭',
        title: 'Interessentanalyse i praksis',
        question: 'Hva er formålet med å gjennomføre en interessentanalyse tidlig i en strategisk planleggingsprosess?',
        choices: [
          { id: 'a', label: 'Å identifisere hvem som kan saksøke bedriften dersom noe går galt', isCorrect: false, feedback: 'Feil. Interessentanalyse er ikke primært et juridisk verktøy. Det handler om strategisk forståelse av hvem som kan påvirke og påvirkes — og hvordan bedriften best kan navigere disse relasjonene.' },
          { id: 'b', label: 'Å kartlegge hvem sine interesser som må hensyntas for at strategien skal lykkes', isCorrect: true, feedback: 'Riktig! Interessentanalyse hjelper bedriften å forstå det strategiske landskapet: hvem kan hindre suksess? Hvem kan støtte? Hvem må konsulteres? Dette informerer hele strategiprosessen.' },
          { id: 'c', label: 'Å sette opp et PR-program for å kommunisere med alle interessenter', isCorrect: false, feedback: 'Feil. Kommunikasjon er ett tiltak som kan følge av interessentanalysen, men det er ikke formålet med analysen i seg selv.' },
          { id: 'd', label: 'Å beregne lønnsomheten av å tilfredsstille ulike interessenter', isCorrect: false, feedback: 'Feil. Interessentanalyse er primært en strategisk og relasjonell øvelse, ikke en finansiell kalkyle. Selv om interessentrelasjoner har finansielle konsekvenser, er det ikke analysens formål.' },
        ],
        espenTip: 'I norsk næringsliv er interessentanalyse spesielt viktig i store prosjekter (vindparker, gruveprosjekter, byutvikling) der motstand fra lokalsamfunn kan stoppe hele prosjektet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📱',
    title: 'Markedsføring i digital tid',
    quote: 'Algoritmer, data og personalisering',
    content: 'Digital markedsføring er ikke ny markedsføring — det er de samme grunnleggende prinsippene med nye kanaler og verktøy. Behovet for å forstå kunden, skape verdi og kommunisere tydelig gjelder like mye digitalt.',
    subpoints: [
      {
        label: 'DATAINNSAMLING',
        text: 'Google vet hva du søker. Facebook vet hvem du kjenner. Spotify vet hva du føler. Amazon vet hva du kjøper. Alt dette er data til segmentering og personalisering — men med GDPR følger juridisk ansvar.',
      },
      {
        label: 'ALGORITMISK TARGETING',
        text: 'Bedrifter kan nå nøyaktig de kundene de vil. En reklame for treningssko kan vises kun til folk som søkte "maraton" siste 30 dager, bor i Oslo og har inntekt over 600 000 kr. Presisjon som massemediene aldri kunne tilby.',
      },
      {
        label: 'INNHOLDSMARKEDSFØRING',
        text: 'Skape nyttig innhold som tiltrekker kunder organisk, uten betalt reklame. Red Bull publiserer mer innhold enn et mediehus — action-sport, musikk, gaming. De selger ikke energidrikk, de selger en livsstil.',
      },
    ],
    practical: 'Digital markedsføring krever forståelse av GDPR — persondata er ikke gratis å bruke i EU/Norge.',
    glossaryTerm: 'Digital markedsføring',
    exercises: [
      {
        id: 'mf-5-1',
        icon: '📱',
        title: 'Digitalt og tradisjonelt',
        question: 'Hva er den viktigste likheten mellom digital markedsføring og tradisjonell markedsføring?',
        choices: [
          { id: 'a', label: 'Begge bruker de samme reklamekanalene — bare på ulike plattformer', isCorrect: false, feedback: 'Feil. Digital og tradisjonell markedsføring bruker fundamentalt ulike kanaler (TV vs. Instagram). Likheten handler ikke om kanaler, men om grunnprinsippene.' },
          { id: 'b', label: 'Grunnprinsippene er de samme: forstå kunden, skape verdi, kommunisere tydelig', isCorrect: true, feedback: 'Riktig! Digital markedsføring er ikke en ny disiplin — det er de samme prinsippene om kundeinnsikt, verdiskaping og kommunikasjon, bare med nye og kraftigere verktøy.' },
          { id: 'c', label: 'Begge er like effektive for alle typer produkter og målgrupper', isCorrect: false, feedback: 'Feil. Digital markedsføring er mer effektiv for noen produkter og målgrupper (yngre, digitalt aktive), mens tradisjonelle kanaler kan fungere bedre for andre. De er ikke identiske i effektivitet.' },
          { id: 'd', label: 'Begge krever store budsjetter for å nå bred dekning', isCorrect: false, feedback: 'Feil. Digital markedsføring kan faktisk være svært kostnadseffektiv sammenlignet med tradisjonell massereklame. Presisjonstargeting lar bedrifter nå riktig målgruppe uten å betale for eksponering mot irrelevante mottakere.' },
        ],
        espenTip: 'Mange tror digital markedsføring er "noe annet" — men det er bare nye verktøy. Forstår du kunden, kan du markedsføre effektivt uansett kanal.',
      },
      {
        id: 'mf-5-2',
        icon: '📋',
        title: 'GDPR og markedsføring',
        question: 'Hva betyr GDPR for digital markedsføring i Norge?',
        choices: [
          { id: 'a', label: 'Digital markedsføring er forbudt i Norge pga. personvernregler', isCorrect: false, feedback: 'Feil. Digital markedsføring er ikke forbudt — men GDPR setter klare regler for hvordan persondata kan samles inn og brukes. Lovlig digital markedsføring krever samtykke og gjennomsiktighet.' },
          { id: 'b', label: 'Bedrifter kan ikke bruke persondata i markedsføring uten samtykke fra den registrerte', isCorrect: true, feedback: 'Riktig! GDPR gir forbrukere rett til å kontrollere sine data. Bedrifter MÅ ha gyldig grunnlag (typisk samtykke) for å samle inn og bruke persondata til markedsføringsformål.' },
          { id: 'c', label: 'GDPR gjelder bare for store internasjonale selskaper, ikke norske SMBer', isCorrect: false, feedback: 'Feil. GDPR gjelder for ALLE bedrifter som behandler personopplysninger om EU/EØS-borgere, uavhengig av bedriftens størrelse eller nasjonalitet.' },
          { id: 'd', label: 'GDPR er bare relevant for teknologiselskaper, ikke for tradisjonelle norske bedrifter', isCorrect: false, feedback: 'Feil. Enhver bedrift som samler inn e-postadresser, kjøpshistorikk eller andre personopplysninger omfattes av GDPR — baker, konsulent, og teknologiselskap alike.' },
        ],
        espenTip: 'GDPR er et viktig tema i norsk markedsføring. Huskeregel: Persondata er ikke "fri ressurs" — bruk av data krever juridisk grunnlag. Samtykke er det vanligste grunnlaget i markedsføringssammenheng.',
      },
      {
        id: 'mf-5-3',
        icon: '🎯',
        title: 'Algoritmisk targeting',
        question: 'En bedrift kan vise reklame kun til personer som søkte "maraton" siste 30 dager, bor i Oslo og har høy inntekt. Hva er den viktigste fordelen med slik targeting?',
        choices: [
          { id: 'a', label: 'Reklamen kan lages rimeligere fordi det trengs mindre innhold', isCorrect: false, feedback: 'Feil. Produksjonskostnad for selve reklamen endres ikke av targeting. Fordelen med presisjons-targeting er at budsjettet brukes mer effektivt — ikke at kreativ produksjon blir billigere.' },
          { id: 'b', label: 'Reklamebudsjettet brukes mer effektivt ved å nå relevante kunder, ikke irrelevante', isCorrect: true, feedback: 'Riktig! Presisjonstargeting betyr at du ikke betaler for å eksponere reklamen for folk som aldri vil kjøpe produktet. Høyere relevans = høyere konverteringsrate = bedre ROI.' },
          { id: 'c', label: 'Reklamen kan kjøres uten konkurrentenes kunnskap', isCorrect: false, feedback: 'Feil. Konkurrenter kan også bruke de samme targeting-verktøyene. Presisjonstargeting gir ikke hemmeligholdelse — det gir relevans og effektivitet.' },
          { id: 'd', label: 'Algoritmisk targeting eliminerer behovet for å forstå målgruppen på forhånd', isCorrect: false, feedback: 'Feil. Targeting-algoritmer er verktøy — du må fortsatt definere hvem du vil nå og hvorfor. Algoritmer optimerer leveringen, men erstatter ikke kundeinnsikt og strategisk tenkning.' },
        ],
        espenTip: 'En tommelfingerregel i digital markedsføring: en relevant annonse til 100 personer konverterer bedre enn en irrelevant annonse til 10 000. Presisjon slår volum.',
      },
      {
        id: 'mf-5-4',
        icon: '🐂',
        title: 'Innholdsmarkedsføring',
        question: 'Red Bull publiserer ekstremsporthendelser, dokumentarer og musikk — og tjener penger på energidrikk. Hva er strategien?',
        choices: [
          { id: 'a', label: 'Red Bull er et mediehus som tilfeldigvis selger energidrikk som biprodukt', isCorrect: false, feedback: 'Feil. Red Bull er primært et drikkeselskap — innholdsproduksjon er en markedsføringsstrategi, ikke kjernevirksomheten. Målet er å selge energidrikk ved å skape livsstilsassosiasjoner.' },
          { id: 'b', label: 'Red Bull bruker innholdsmarkedsføring for å knytte merkevaren til en livsstil og tiltrekke kunder organisk', isCorrect: true, feedback: 'Riktig! Innholdsmarkedsføring handler om å skape verdifullt innhold som tiltrekker målgruppen uten betalt reklame. Red Bull selger ikke energidrikk i innholdet — de bygger livsstilsassosiasjonen som driver kjøp.' },
          { id: 'c', label: 'Red Bull bruker PR-stunts for å skape medieomtale og øke merkevarebevissthet', isCorrect: false, feedback: 'Feil. Noen av Red Bulls aktiviteter er PR-stunts, men strateg samlet sett er innholdsmarkedsføring — systematisk innholdsproduksjon som bygger merkevare over tid, ikke enkelt-hendelser.' },
          { id: 'd', label: 'Red Bull sponser idrettshendelser for å nå en ung, aktiv målgruppe', isCorrect: false, feedback: 'Feil. Sponsing er en del av bildet, men Red Bull eier og produserer mye av innholdet selv (Red Bull Media House). Det er en mer forpliktende og helhetlig strategi enn tradisjonell sponsing.' },
        ],
        espenTip: 'Norsk innholdsmarkedsføring: DNB sin "Din økonomi"-blogg tiltrekker folk som leter etter finansiell rådgivning — og bygger tillit til DNB som bank. Innhold som hjelper, ikke selger.',
      },
      {
        id: 'mf-5-5',
        icon: '📊',
        title: 'Data og personalisering',
        question: 'Spotify bruker lyttedata til å lage personaliserte spillelister som "Din ukemix". Hva er den markedsstrategiske verdien av dette?',
        choices: [
          { id: 'a', label: 'Det reduserer Spotifys kostnader fordi de trenger færre kuratorer', isCorrect: false, feedback: 'Feil. Kostnadreduksjon er en intern operasjonell fordel, men den strategiske markedsføringsverdien av personalisering er langt viktigere: det øker kundelojalitet og gjør det vanskeligere for kunden å bytte til konkurrenter.' },
          { id: 'b', label: 'Det øker kundelojalitet ved å gi en personalisert opplevelse som er vanskelig å kopiere', isCorrect: true, feedback: 'Riktig! Personalisering basert på data skaper "sticky" produkter. Jo mer Spotify vet om deg, jo mer relevant blir opplevelsen — og jo vanskeligere er det å bytte til Apple Music.' },
          { id: 'c', label: 'Det gjør det mulig for Spotify å sette høyere priser fordi tjenesten oppleves som mer verdifull', isCorrect: false, feedback: 'Feil. Spotify har ikke økt prisene vesentlig basert på personalisering alene. Verdien er primært i økt lojalitet og redusert churn, ikke i direkte prisøkning.' },
          { id: 'd', label: 'Det gir Spotify en juridisk rettighet til å selge brukerdata til tredjepart', isCorrect: false, feedback: 'Feil. GDPR forbyr salg av persondata til tredjepart uten eksplisitt samtykke. Spotifys bruk av lyttedata er internt for å forbedre brukeropplevelsen, ikke et datadelingsarrangement.' },
        ],
        espenTip: 'Personalisering er fremtidens markedsføring — men det krever data, teknologi og GDPR-compliance. Bedrifter som mestrer dette kombinasjonen bygger konkurransemessige fortrinn som er svært vanskelige å kopiere.',
      },
    ],
  },
]

export default function MarkedsforingFagModule() {
  return (
    <DrawerModule
      moduleCode="ML1-01"
      moduleTitle="Markedsføring som fag og tankesett"
      moduleIcon="📚"
      storageKey="learning-ml1-markedsforingfag"
      completeRoute="/learning/ml1/markedsforingfag/complete"
      phases={PHASES}
      intro="Markedsføring er langt mer enn reklame og salgstriks. Det er en helhetlig forretningsfilosofi om å skape, kommunisere og levere verdi til kunder — og å forstå markedet så godt at produktene selger seg selv."
      vissteduAt="84% av markedssjefene mener de leverer god kundeopplevelse. Kun 8% av kundene er enige. Denne &quot;experience gap&quot; koster norske bedrifter milliarder hvert år."
      espenSier="Markedsføring er ikke manipulasjon — det er kommunikasjon av ekte verdi. Den beste markedsføringen er et godt produkt som folk frivillig forteller venner om."
      presentationLink={{ route: '/learning/presentations/forbrukeratferd', description: 'Forbrukeratferd — en visuell gjennomgang av markedsføring som fag og tankesett' }}
    />
  )
}
