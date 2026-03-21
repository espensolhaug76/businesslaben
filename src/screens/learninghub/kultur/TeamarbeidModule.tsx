import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Hva gjør et team effektivt?',
    quote: 'Fem stjerner kan lage et elendig lag — fem gode lagspillere kan vinne alt.',
    content: 'Forskjellen mellom en gruppe og et team ligger i tre ting: felles mål, gjensidig avhengighet og delt ansvarlighet. Et restaurantkjøkken er det klassiske eksempelet — selv om hver kokk er fremragende, vil gjestene vente lenge og maten bli kald dersom koordineringen svikter.',
    subpoints: [
      { label: 'FELLES MÅL', text: 'Alle i teamet vet hva de jobber mot og forstår sin rolle i å nå det — ikke bare sin individuelle oppgave, men helheten.' },
      { label: 'GJENSIDIG AVHENGIGHET', text: 'Resultatet til én påvirker de andres arbeid, noe som skaper naturlig koordinasjon og omsorg for hverandres suksess.' },
      { label: 'DELT ANSVARLIGHET', text: 'Teamet eier resultatet i fellesskap — suksess og feil tilhører laget, ikke bare enkeltpersoner.' },
    ],
    practical: 'Spør teamet ditt: «Kan vi si med én setning hva vi jobber mot?» Hvis svarene spriker, er det på tide å justere.',
    exercises: [
      {
        id: 'ta-1-1',
        question: 'Hva skiller et team fra en gruppe?',
        choices: [
          { id: 'a', text: 'Et team er større enn en gruppe' },
          { id: 'b', text: 'Et team har felles mål, gjensidig avhengighet og delt ansvarlighet — en gruppe er bare folk på samme sted' },
          { id: 'c', text: 'Et team har en formell leder, en gruppe ikke' },
          { id: 'd', text: 'Grupper er uformelle, team er formelle' },
        ],
        correctId: 'b',
        explanation: 'Teamets essens er samspillet: felles mål, gjensidig avhengighet og delt ansvar. En gruppe kan bestå av dyktige individer som jobber parallelt uten koordinasjon.',
      },
      {
        id: 'ta-1-2',
        question: 'Hva betyr gjensidig avhengighet i et team?',
        choices: [
          { id: 'a', text: 'At alle er venner privat' },
          { id: 'b', text: 'At resultatet til én påvirker andres arbeid — man er avhengige av hverandres bidrag for å lykkes' },
          { id: 'c', text: 'At man alltid jobber på samme sted' },
          { id: 'd', text: 'At alle har samme kompetanse' },
        ],
        correctId: 'b',
        explanation: 'Gjensidig avhengighet skaper naturlig koordinasjon — når jeg vet at mine kollegaer er avhengige av meg, bryr jeg meg om kvaliteten på det jeg leverer til dem.',
      },
      {
        id: 'ta-1-3',
        question: 'Hva betyr «delt ansvarlighet» og hvorfor er det viktig?',
        choices: [
          { id: 'a', text: 'At alle er ansvarlige for alt — ingen spesialisering' },
          { id: 'b', text: 'At teamet eier resultatet i fellesskap — suksess og feil tilhører laget, ikke bare enkeltpersoner' },
          { id: 'c', text: 'At alle er like mye til stede på jobben' },
          { id: 'd', text: 'At lederen er ansvarlig for alt' },
        ],
        correctId: 'b',
        explanation: 'Delt ansvarlighet eliminerer «det er ikke mitt problem»-kulturen — alle er investert i teamets samlede resultat.',
      },
      {
        id: 'ta-1-4',
        question: 'Fem svært dyktige individer kan utgjøre et dårlig team. Hva er den vanligste årsaken?',
        choices: [
          { id: 'a', text: 'De er for gode til å samarbeide' },
          { id: 'b', text: 'Manglende koordinasjon, uklare roller eller ulike mål som gjør at dyktigheten ikke omsettes til teamresultater' },
          { id: 'c', text: 'De konkurrerer for mye' },
          { id: 'd', text: 'Det er for mange ledere' },
        ],
        correctId: 'b',
        explanation: 'Individuelle ferdigheter er ikke nok — uten koordinasjon, tydelige roller og felles mål arbeider talentene forbi hverandre i stedet for med hverandre.',
      },
      {
        id: 'ta-1-5',
        question: 'Hva er den enkleste måten å sjekke om et team har et ekte felles mål?',
        choices: [
          { id: 'a', text: 'Se på teamets presentasjoner' },
          { id: 'b', text: 'Be hvert teammedlem si med én setning hva de jobber mot — spriker svarene, er målet ikke felles' },
          { id: 'c', text: 'Gjennomføre en spørreundersøkelse' },
          { id: 'd', text: 'Sjekke møtereferatene' },
        ],
        correctId: 'b',
        explanation: 'En rask «ett-setnings test» avslører raskt om alle peker i samme retning eller har ulike oppfatninger av hva teamet egentlig jobber mot.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🧩',
    title: 'Belbins teamroller',
    quote: 'Et team av bare kreative genier er et kaos — du trenger gjennomførerne like mye som idealistene.',
    content: 'Meredith Belbin identifiserte ni komplementære roller som til sammen utgjør et komplett og balansert team: handlingsorienterte (Shaper, Implementer, Completer Finisher), personorienterte (Co-ordinator, Teamworker, Resource Investigator) og tankemessige (Plant, Monitor Evaluator, Specialist).',
    subpoints: [
      { label: 'PLANT', text: 'Kreativ og idérik, men kan miste fokus på detaljer og praktisk gjennomføring.' },
      { label: 'SHAPER', text: 'Driver teamet fremover under press, men kan virke aggressiv og skade stemningen.' },
      { label: 'COMPLETER FINISHER', text: 'Kvalitetssikrer som påser at ingenting glipper — perfeksjonist som kan holde tilbake fremdrift.' },
    ],
    practical: 'La teammedlemmene ta en Belbin-test og del resultatene åpent. Diskuter hvilke roller som er godt dekket og hvilke dere mangler.',
    exercises: [
      {
        id: 'ta-2-1',
        question: 'Hva er en «Plant» i Belbins teamrollemodell?',
        choices: [
          { id: 'a', text: 'En person som passer på planter på kontoret' },
          { id: 'b', text: 'Den kreative og idérike personen som tenker nytt — men kan miste fokus på detaljer' },
          { id: 'c', text: 'Den som implementerer andres ideer' },
          { id: 'd', text: 'Teamets koordinator' },
        ],
        correctId: 'b',
        explanation: 'Plant er den kreative ressursen som genererer nye ideer og løsninger — verdifull for innovasjon, men trenger balanseres av mer strukturorienterte roller.',
      },
      {
        id: 'ta-2-2',
        question: 'Hva skjer i et team der alle er «Plants» (kreative idémennesker)?',
        choices: [
          { id: 'a', text: 'Teamet er svært innovativt og produktivt' },
          { id: 'b', text: 'Idéene flommer over men ingen gjennomfører dem — kaos uten resultater' },
          { id: 'c', text: 'Det er det ideelle teamet' },
          { id: 'd', text: 'Teamet trenger bare én leder' },
        ],
        correctId: 'b',
        explanation: 'Et team av kun kreative uten gjennomførere er kaotisk — ideene genereres men aldri realiseres. Man trenger balanse mellom kreativitet og struktur.',
      },
      {
        id: 'ta-2-3',
        question: 'En «Completer Finisher» i Belbin-modellen kjennetegnes av:',
        choices: [
          { id: 'a', text: 'Å fullføre møter raskt' },
          { id: 'b', text: 'Å sikre kvalitet og detaljer — perfeksjonisten som sørger for at ingenting glipper' },
          { id: 'c', text: 'Å koordinere teamet' },
          { id: 'd', text: 'Å drive teamet fremover' },
        ],
        correctId: 'b',
        explanation: 'Completer Finisher er den som ikke er ferdig før alt er på plass — uvurderlig for kvalitet, men kan bremse fremdrift med perfeksjonisme.',
      },
      {
        id: 'ta-2-4',
        question: 'Hvorfor er det viktig å ha ulike Belbin-roller i et team?',
        choices: [
          { id: 'a', text: 'For å unngå kjedelige møter' },
          { id: 'b', text: 'Fordi ulike roller dekker ulike nødvendige funksjoner — kreativitet, gjennomføring, koordinasjon og kvalitetssikring trenger alle å ivaretas' },
          { id: 'c', text: 'For å tilfredsstille HR-krav' },
          { id: 'd', text: 'Det er ingen grunn — alle bør ha samme rolle' },
        ],
        correctId: 'b',
        explanation: 'Et komplett team trenger balanse mellom kreativitet og struktur, handling og analyse — det er kombinasjonen av roller som skaper effektivitet.',
      },
      {
        id: 'ta-2-5',
        question: 'Hva er hensikten med at teamet tar en Belbin-test og deler resultatene?',
        choices: [
          { id: 'a', text: 'For å rangere hvem som er best' },
          { id: 'b', text: 'For å bli bevisst teamets styrker og mangler, og fordele roller mer bevisst' },
          { id: 'c', text: 'Det er kun et teambuilding-leker' },
          { id: 'd', text: 'For å tilfredsstille lederskapskrav' },
        ],
        correctId: 'b',
        explanation: 'Belbin-bevissthet hjelper teamet å forstå seg selv — hvilke roller er sterke, hvilke mangler vi, og hvem bør ta ansvar for hvilke aspekter av arbeidet.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📈',
    title: 'Tuckman-modellen: forming, storming, norming, performing',
    quote: 'Hvert team som aldri har stormet, har aldri egentlig blitt et ekte team.',
    content: 'Bruce Tuckmans modell beskriver den naturlige utviklingen alle team går gjennom i fire faser. Forming (høflighet og forsiktighet), Storming (konflikter og markering), Norming (spilleregler etableres), Performing (teamet er selvgående og høyproduktivt).',
    subpoints: [
      { label: 'FORMING', text: 'Teamet er nytt og forsiktig. Leder bør gi tydelig retning, sette rammer og hjelpe folk å bli kjent med hverandre.' },
      { label: 'STORMING', text: 'Konflikter og uenigheter dukker opp. Leder bør fasilitere åpen dialog og hjelpe teamet finne løsninger uten å undertrykke spenningene.' },
      { label: 'NORMING', text: 'Spilleregler etableres og tillit bygges gradvis. Leder kan delegere mer og begynne å fokusere på resultater fremfor prosess.' },
      { label: 'PERFORMING', text: 'Teamet er selvgående og høyproduktivt. Leder fokuserer på å fjerne hindringer og opprettholde motivasjonen over tid.' },
    ],
    practical: 'Spør deg selv: «I hvilken Tuckman-fase er teamet mitt akkurat nå?» Tilpass lederatferden din til svaret — én stil passer ikke alle faser.',
    exercises: [
      {
        id: 'ta-3-1',
        question: 'Hva kjennetegner «forming»-fasen i Tuckman-modellen?',
        choices: [
          { id: 'a', text: 'Høy produktivitet og sterk teamånd' },
          { id: 'b', text: 'Høflighet og forsiktighet — folk er usikre og avventende' },
          { id: 'c', text: 'Åpne konflikter og markering' },
          { id: 'd', text: 'Etablerte spilleregler og tillit' },
        ],
        correctId: 'b',
        explanation: 'I forming er teamet nytt — alle er høflige og forsiktige, ingen vil trå feil eller markere revir. Det er en polert men lite produktiv fase.',
      },
      {
        id: 'ta-3-2',
        question: 'Hvorfor er «storming» en nødvendig fase?',
        choices: [
          { id: 'a', text: 'Det er ikke nødvendig — storming bør unngås' },
          { id: 'b', text: 'Konflikter og spenninger må komme til overflaten for å kunne løses — team som hopper over storming lagrer spenningene til et verre tidspunkt' },
          { id: 'c', text: 'For å avgjøre hvem som er leder' },
          { id: 'd', text: 'Det er kun en teori' },
        ],
        correctId: 'b',
        explanation: 'Undertrykkede konflikter er tidsinnstilte bomber — storming er smertefullt men nødvendig for at teamet kan oppnå ekte norming og performing.',
      },
      {
        id: 'ta-3-3',
        question: 'Hva kjennetegner et team i «performing»-fasen?',
        choices: [
          { id: 'a', text: 'De trenger konstant lederinngripen' },
          { id: 'b', text: 'Teamet er selvgående og høyproduktivt — de løser problemer selv og trenger minimal veiledning' },
          { id: 'c', text: 'De er fremdeles i ferd med å etablere tillit' },
          { id: 'd', text: 'De er ennå ikke fullt koordinerte' },
        ],
        correctId: 'b',
        explanation: 'Performing er målet — teamet fungerer som en velsmurt maskin, løser problemer autonomt og leverer konsekvent gode resultater.',
      },
      {
        id: 'ta-3-4',
        question: 'Et hotell har åpnet for tre uker siden. Kjøkken og resepsjon diskuterer prosedyrer og det er spenninger mellom avdelingene. Hvilken fase er de i?',
        choices: [
          { id: 'a', text: 'Performing' },
          { id: 'b', text: 'Norming' },
          { id: 'c', text: 'Storming' },
          { id: 'd', text: 'Adjourning' },
        ],
        correctId: 'c',
        explanation: 'Spenninger om prosedyrer og ansvar etter en initial høflighetsperiode er klassisk storming — nødvendig for å komme videre til norming og performing.',
      },
      {
        id: 'ta-3-5',
        question: 'Hva bør en leder gjøre i «storming»-fasen?',
        choices: [
          { id: 'a', text: 'Undertrykke konfliktene for å opprettholde ro' },
          { id: 'b', text: 'Fasilitere åpen dialog og hjelpe teamet finne løsninger — ikke ignorere eller undertrykke spenningene' },
          { id: 'c', text: 'La teamet løse det selv uten innblanding' },
          { id: 'd', text: 'Bytte ut de mest konfliktsøkende personene' },
        ],
        correctId: 'b',
        explanation: 'En god leder i storming er fasilitator — hjelper teamet å snakke gjennom konfliktene produktivt, ikke dikterer eller undertrykker dem.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⚠️',
    title: 'Konflikter i team — tidlige tegn og forebygging',
    quote: 'En konflikt løst tidlig koster én samtale. En konflikt ignorert koster et team.',
    content: 'Konflikter starter sjelden med høylytte krangler — de begynner med subtile signaler: stillhet i møter, bilaterale sidesamtaler og gradvis økt skylddistribuering. Kostnaden av å la konflikter gro er konkret og målbar: økt sykefravær, høy turnover og tap av fagkompetanse.',
    subpoints: [
      { label: 'TIDLIGE TEGN', text: 'Observer hvem som slutter å delta aktivt i møter, hvem som snakker negativt om kollegaer i sidesamtaler, og hvem som virker sint uten åpenbar grunn.' },
      { label: 'TIDLIG INTERVENSJON', text: 'En kort en-til-en-samtale («Jeg la merke til at du virket frustrert i møtet — er alt OK?») kan avvæpne en konflikt lenge før den eskalerer til noe alvorlig.' },
      { label: 'STRUKTURELLE TILTAK', text: 'Tydelige roller, klare beslutningsmyndigheter og regelmessige tilbakemeldingsrunder reduserer gnisning betraktelig og forhindrer mange konflikter.' },
    ],
    practical: 'Sett av 10 minutter i slutten av hvert teammøte til en rask «temperatursjekk»: alle svarer på skala 1–5 på hvordan samarbeidet føles. Anonymt gjør det tryggere.',
    exercises: [
      {
        id: 'ta-4-1',
        question: 'Hva er de tidligste tegnene på en brewing konflikt i et team?',
        choices: [
          { id: 'a', text: 'Høylytte diskusjoner i møter' },
          { id: 'b', text: 'Stillhet fra aktive bidragsytere, sidesamtaler som erstatter åpen diskusjon, økt skylddistribuering' },
          { id: 'c', text: 'Lavere produktivitet' },
          { id: 'd', text: 'Økt sykefravær' },
        ],
        correctId: 'b',
        explanation: 'Konflikter starter subtilt — det er de stille signalene (passivitet, sidesamtaler) som varsler tidligst, lenge før åpne krangler.',
      },
      {
        id: 'ta-4-2',
        question: 'Hva er den konkrete kostnaden av uløste konflikter for en bedrift?',
        choices: [
          { id: 'a', text: 'Ingen — folk gjør jobben sin uansett' },
          { id: 'b', text: 'Økt sykefravær, høy turnover og tap av fagkompetanse — kan koste opptil tre ganger årslønn per mistet ansatt' },
          { id: 'c', text: 'Kun moralsk kostnad' },
          { id: 'd', text: 'Kun lavere produktivitet' },
        ],
        correctId: 'b',
        explanation: 'Turnover er svært kostbart — rekruttering, opplæring, tapt kunnskap og midlertidig produktivitetstap. Konfliktforebygging er en direkte investering.',
      },
      {
        id: 'ta-4-3',
        question: 'Hva er den billigste måten å håndtere en konflikt på?',
        choices: [
          { id: 'a', text: 'Etter at den er eskalert til full krig' },
          { id: 'b', text: 'Tidlig — en rask en-til-en samtale kan avvæpne en konflikt som ellers ville kostet måneder og folk' },
          { id: 'c', text: 'Ved å bytte ut den konfliktsøkende personen' },
          { id: 'd', text: 'Gjennom HR-prosesser' },
        ],
        correctId: 'b',
        explanation: 'Tidlig intervensjon er billigst — jo tidligere man tar samtalen, jo enklere er det å løse og jo lavere er kostnadene i form av tapt produktivitet og folk.',
      },
      {
        id: 'ta-4-4',
        question: 'Hva er «strukturelle tiltak» for å forebygge konflikter?',
        choices: [
          { id: 'a', text: 'Fysisk separasjon av teammedlemmene' },
          { id: 'b', text: 'Tydelige roller, klare beslutningsmyndigheter og regelmessige tilbakemeldingsrunder som reduserer gnisning' },
          { id: 'c', text: 'Strenge regler mot diskusjon' },
          { id: 'd', text: 'Hyppige teambuilding-aktiviteter' },
        ],
        correctId: 'b',
        explanation: 'Mange konflikter oppstår av uklare roller og beslutningsprosesser — tydelig struktur forebygger de fleste konflikter før de starter.',
      },
      {
        id: 'ta-4-5',
        question: 'Hva er en «temperatursjekk» og hva er hensikten?',
        choices: [
          { id: 'a', text: 'En fysisk helsesjekk for teammedlemmene' },
          { id: 'b', text: 'En rask, gjerne anonym vurdering av samarbeidsklimaet som gir tidlig signal om spenninger' },
          { id: 'c', text: 'En evaluering av teamets produktivitet' },
          { id: 'd', text: 'En gjennomgang av feil gjort i uken' },
        ],
        correctId: 'b',
        explanation: 'Temperatursjekken er et verktøy for å fange opp spenninger tidlig — anonymitet senker terskelen for å si fra, og det gir leder et datasignal om teamklima.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🛡️',
    title: 'Psykologisk trygghet',
    quote: 'Folk gjør sitt beste arbeid når de ikke er redd for å gjøre feil.',
    content: 'Googles Project Aristotle studerte over 180 interne team og fant at den viktigste enkeltfaktoren var psykologisk trygghet — opplevelsen av at man kan snakke åpent, stille spørsmål og innrømme feil uten å bli straffet eller latterliggjort.',
    subpoints: [
      { label: 'GOOGLE-FUNNET', text: 'Av fem faktorer Google identifiserte i effektive team, var psykologisk trygghet den klart viktigste — viktigere enn individuelle ferdigheter, erfaring eller IQ.' },
      { label: 'LEDERENS ROLLE', text: 'Lederen setter tonen: del egne feil åpent, spør om råd fra teamet, og vis genuin interesse for andres perspektiver selv når de utfordrer deg.' },
      { label: '«INGEN DUMME SPØRSMÅL»', text: 'Avslutt hvert møte med å takke eksplisitt for ett spørsmål eller innspill som overrasket deg positivt — det signaliserer at nysgjerrighet er verdsatt.' },
    ],
    practical: 'Prøv «feilrapport»-formatet i neste teammøte: alle deler én ting som ikke gikk som planlagt siste uke og hva de lærte. Lederen starter alltid.',
    glossaryTerm: 'Psykologisk trygghet',
    exercises: [
      {
        id: 'ta-5-1',
        question: 'Hva fant Google i Project Aristotle om de beste teamene?',
        choices: [
          { id: 'a', text: 'De hadde høyest gjennomsnittlig IQ' },
          { id: 'b', text: 'Den viktigste faktoren var psykologisk trygghet — ikke individuelle ferdigheter eller erfaring' },
          { id: 'c', text: 'De hadde tydeligst hierarki' },
          { id: 'd', text: 'De hadde flest seniorer' },
        ],
        correctId: 'b',
        explanation: 'Project Aristotle avdekket at teamsammensetning (IQ, erfaring) mattered langt mindre enn tryggheten til å snakke åpent, innrømme feil og ta sjanser.',
      },
      {
        id: 'ta-5-2',
        question: 'Hva er psykologisk trygghet?',
        choices: [
          { id: 'a', text: 'At ansatte ikke er redde for å si opp seg' },
          { id: 'b', text: 'Opplevelsen av at man kan snakke åpent, stille spørsmål og innrømme feil uten å bli straffet eller latterliggjort' },
          { id: 'c', text: 'At alle er enige med hverandre' },
          { id: 'd', text: 'At arbeidsplassen er fysisk trygg' },
        ],
        correctId: 'b',
        explanation: 'Psykologisk trygghet handler om interpersonlig risiko — kan jeg si hva jeg mener, innrømme at jeg ikke vet, og ta feil uten negative konsekvenser?',
      },
      {
        id: 'ta-5-3',
        question: 'En leder responderer irritert når noen stiller et «dumt spørsmål» i et møte. Hva er konsekvensen?',
        choices: [
          { id: 'a', text: 'Ingenting — folk er profesjonelle' },
          { id: 'b', text: 'Den psykologiske tryggheten ødelegges raskt og folk begynner å holde tilbake spørsmål og ideer' },
          { id: 'c', text: 'Folk stiller bedre forberedte spørsmål neste gang' },
          { id: 'd', text: 'Det er et positivt signal om høye standarder' },
        ],
        correctId: 'b',
        explanation: 'Psykologisk trygghet er skjør — én negativ reaksjon på et spørsmål kan signalisere til hele rommet at det er risikabelt å bidra.',
      },
      {
        id: 'ta-5-4',
        question: 'Hva er hensikten med at lederen deler egne feil i «feilrapport»-formatet?',
        choices: [
          { id: 'a', text: 'For å vise at lederen er menneskelig' },
          { id: 'b', text: 'For å signalisere at det er trygt å innrømme feil — ledere som går foran normaliserer feil-som-læringsmulighet' },
          { id: 'c', text: 'For å vise transparens til aksjonærene' },
          { id: 'd', text: 'Fordi lederen er påkrevd å dele dette' },
        ],
        correctId: 'b',
        explanation: 'Lederen setter kultur — ved å dele egne feil åpent signaliserer de at dette er trygt og ønsket. Teamet imiterer lederens åpenhet.',
      },
      {
        id: 'ta-5-5',
        question: 'Hva betyr «et team med middels individuelle ferdigheter og høy psykologisk trygghet utklasser et team med høye ferdigheter og lav trygghet»?',
        choices: [
          { id: 'a', text: 'At ferdigheter ikke betyr noe' },
          { id: 'b', text: 'At samspill og tillit gjør at middels talenter realiserer sitt fulle potensial, mens flinke folk i et utrygt miljø holder tilbake' },
          { id: 'c', text: 'At man bør ansette middels folk' },
          { id: 'd', text: 'At trygghet er viktigere enn kompetanse alltid' },
        ],
        correctId: 'b',
        explanation: 'Psykologisk trygghet frigjør potensial — i et trygt miljø deler folk kunnskap, tar sjanser og hjelper hverandre. I et utrygt miljø skjuler talenter seg.',
      },
    ],
  },
]

export default function TeamarbeidModule() {
  return (
    <DrawerModule
      moduleCode="KS5"
      moduleTitle="Teamarbeid og roller"
      moduleIcon="👥"
      storageKey="learning-kultur-teamarbeid"
      completeRoute="/learning/kultur/teamarbeid/complete"
      phases={PHASES}
      intro="Et team er ikke det samme som en gruppe mennesker som jobber på samme sted. Et ekte team har felles mål, gjensidig avhengighet og delt ansvar for resultater — og det er nettopp denne dynamikken som skaper enten fantastiske prestasjoner eller frustrerende kaos. Å forstå hva som gjør team effektive er avgjørende for alle som leder eller deltar i arbeidslivet."
      vissteduAt="Googles Project Aristotle fant at det beste teamet hos Google ikke bestod av de klokeste hodene i selskapet — det bestod av folk som stolte nok på hverandre til å ta sjanser og innrømme feil høyt. Et team med middels individuelle ferdigheter og høy psykologisk trygghet utklasser konsekvent et team med høye individuelle ferdigheter og lav trygghet."
      espenSier="Jeg har fulgt mange norske bedrifter over år, og det som oftest skiller de som vokser fra de som stagnerer, er ikke strategi eller kapital — det er teamkvalitet. Invester i menneskene og samspillet mellom dem, og resten faller på plass mye lettere enn du tror."
      presentationLink={{ route: '/learning/presentations/partene-arbeidslivet', description: 'Partene i arbeidslivet — en visuell gjennomgang av den norske modellen' }}
    />
  )
}
