import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🗂️',
    title: 'De 4 segmenteringskriteriene',
    quote: 'Et marked er aldri homogent — del det opp, og du finner grupper med felles behov',
    practical:
      'Geografisk (land, by, klima). Demografisk (alder, kjønn, inntekt, utdanning). Psykografisk (livsstil, verdier, personlighet). Adferdsbasert (kjøpsfrekvens, lojalitet, bruksanledning). Eks: Spotify bruker psykografisk (musikksmak) og adferdsbasert (lyttefrekvens) segmentering.',
    glossaryTerm: 'Segmentering',
    exercises: [
      {
        id: 'mg-1-1',
        icon: '🗂️',
        title: 'Typer segmentering',
        question: 'En sportskjede vil nå kunder basert på om de trener regelmessig, av og til, eller aldri. Hvilket segmenteringskriterium benytter de?',
        choices: [
          { id: 'a', label: 'Demografisk segmentering', isCorrect: false, feedback: 'Demografisk segmentering deler markedet etter målbare kjennetegn som alder, kjønn og inntekt — ikke etter atferdsmønstre.' },
          { id: 'b', label: 'Geografisk segmentering', isCorrect: false, feedback: 'Geografisk segmentering handler om bosted, region eller klima — ikke om treningsvaner.' },
          { id: 'c', label: 'Adferdsbasert segmentering', isCorrect: true, feedback: 'Riktig! Adferdsbasert segmentering deler kundene etter atferd som kjøpsfrekvens, bruksmønster og lojalitet — her: treningshyppighet.' },
          { id: 'd', label: 'Psykografisk segmentering', isCorrect: false, feedback: 'Psykografisk segmentering fokuserer på verdier og livsstil, ikke på konkret atferd som treningsfrekvens.' },
        ],
        espenTip: 'Huskeregel: adferdsbasert handler om hva folk gjør, psykografisk om hvem de er innvendig.',
      },
      {
        id: 'mg-1-2',
        icon: '🌍',
        title: 'Geografisk segmentering',
        question: 'En norsk vinprodusent vil selge mer vin i fylker med høy gjennomsnittsinntekt. Hvilket kriterium kombinerer de primært?',
        choices: [
          { id: 'a', label: 'Geografisk og demografisk', isCorrect: true, feedback: 'Riktig! De bruker geografi (fylke) kombinert med demografi (inntekt) for å avgrense markedet.' },
          { id: 'b', label: 'Psykografisk og adferdsbasert', isCorrect: false, feedback: 'Psykografisk dreier seg om verdier og livsstil, adferdsbasert om kjøpsmønstre — verken geografi eller inntekt er inkludert her.' },
          { id: 'c', label: 'Kun geografisk', isCorrect: false, feedback: 'Geografi alene (fylke) uten å ta hensyn til inntektsnivå forklarer bare halvparten av segmenteringsvalgene i eksempelet.' },
          { id: 'd', label: 'Demografisk og psykografisk', isCorrect: false, feedback: 'Demografi er riktig (inntekt), men psykografisk er ikke nevnt — det er geografisk lokasjon (fylke), ikke livsstil, som er den andre faktoren.' },
        ],
        espenTip: 'I praksis kombinerer de fleste bedrifter to eller flere segmenteringskriterier for et mer presist bilde av målgruppen.',
      },
      {
        id: 'mg-1-3',
        icon: '🧠',
        title: 'Psykografisk segmentering',
        question: 'Patagonia retter markedsføringen sin mot folk som er opptatt av friluftsliv, miljø og autentisk livsstil. Dette er et eksempel på:',
        choices: [
          { id: 'a', label: 'Adferdsbasert segmentering', isCorrect: false, feedback: 'Adferdsbasert segmentering handler om konkret kjøpsatferd og bruksmønstre — ikke om verdier og livssyn.' },
          { id: 'b', label: 'Demografisk segmentering', isCorrect: false, feedback: 'Demografi handler om målbare kjennetegn som alder og inntekt — ikke om holdninger, verdier og livsstil.' },
          { id: 'c', label: 'Psykografisk segmentering', isCorrect: true, feedback: 'Riktig! Psykografisk segmentering bruker verdier, livsstil og personlighet som kriterier — akkurat det Patagonia gjør.' },
          { id: 'd', label: 'Geografisk segmentering', isCorrect: false, feedback: 'Geografisk segmentering deler markedet etter bosted og region — Patagonias tilnærming handler om livssyn, ikke geografi.' },
        ],
        espenTip: 'Psykografisk segmentering er kraftig fordi folk med lik livsstil kjøper lignende produkter, uavhengig av alder eller bosted.',
      },
      {
        id: 'mg-1-4',
        icon: '📊',
        title: 'Demografisk segmentering',
        question: 'En barnekleskjede velger å fokusere på familier med barn i alderen 0–12 år. Primært hvilket kriterium bruker de?',
        choices: [
          { id: 'a', label: 'Adferdsbasert segmentering', isCorrect: false, feedback: 'Atferdsbasert ville fokusert på kjøpsfrekvens eller lojalitet — ikke på familiesituasjon og barnas alder.' },
          { id: 'b', label: 'Demografisk segmentering', isCorrect: true, feedback: 'Riktig! Demografisk segmentering inkluderer alder, familiestørrelse og livsfase — her definert ved barnas aldersgruppe.' },
          { id: 'c', label: 'Psykografisk segmentering', isCorrect: false, feedback: 'Psykografisk handler om verdier og livsstil — barnets alder er en demografisk variabel, ikke en livsstilsvariabel.' },
          { id: 'd', label: 'Geografisk segmentering', isCorrect: false, feedback: 'Geografisk segmentering handler om bosted og region — det er ikke det primære kriteriet her, selv om de gjerne kombinerer det med demografi.' },
        ],
        espenTip: 'Demografisk segmentering er lettest å måle og koster minst å analysere — det er derfor de fleste bedrifter starter der.',
      },
      {
        id: 'mg-1-5',
        icon: '🎵',
        title: 'Spotify-eksempelet',
        question: 'Spotify analyserer lyttefrekvens, sjangre du hører mest på og tidspunkt du lytter. Disse dataene brukes til å sende deg personaliserte anbefalinger. Hvilke segmenteringskriterier benytter Spotify primært?',
        choices: [
          { id: 'a', label: 'Geografisk og demografisk', isCorrect: false, feedback: 'Spotify bruker selvfølgelig geografi og demografi også, men personaliserte musikanbefalinger baserer seg på faktisk lytteatferd og musikksmak, ikke bosted.' },
          { id: 'b', label: 'Psykografisk og adferdsbasert', isCorrect: true, feedback: 'Riktig! Psykografisk (musikksmak, verdier) og adferdsbasert (lyttefrekvens, tidspunkt) er kjernen i Spotifys personalisering.' },
          { id: 'c', label: 'Kun adferdsbasert', isCorrect: false, feedback: 'Adferdsbasert er delvis riktig (lyttefrekvens og tidspunkt), men sjangre og musikksmak er psykografisk — Spotify kombinerer begge.' },
          { id: 'd', label: 'Demografisk og adferdsbasert', isCorrect: false, feedback: 'Demografi er mindre sentralt i anbefalingsalgoritmen — to 20-åringer med ulik musikksmak får helt ulike anbefalinger, noe som viser at psykografi og atferd er viktigere.' },
        ],
        espenTip: 'Spotify er et fremragende eksempel på at moderne bedrifter kombinerer psykografisk og adferdsbasert segmentering ved hjelp av data.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🥇',
    title: 'Primær vs sekundær målgruppe',
    quote: 'Primærmålgruppen kjøper — sekundærmålgruppen påvirker kjøpet',
    practical:
      'Primær: de du retter all kommunikasjon mot og som er mest sannsynlig å kjøpe. Sekundær: de som påvirker primærmålgruppen (eks: foreldre som kjøper til barn). Spotify Premium: primær = dagliglyttende studenter, sekundær = yrkesaktive som vil ha offline-avspilling.',
    exercises: [
      {
        id: 'mg-2-1',
        icon: '🥇',
        title: 'Primær vs sekundær',
        question: 'Et leketøysmerke lager reklame som primært appellerer til 6-åringer, men foreldrene er de som faktisk kjøper produktet. Hvem er primær- og sekundærmålgruppen?',
        choices: [
          { id: 'a', label: 'Primær: foreldre, sekundær: barn', isCorrect: false, feedback: 'I dette tilfellet er barna de som skal overbevises gjennom reklamen — de er primærmålgruppen for kommunikasjonen, selv om foreldrene betaler.' },
          { id: 'b', label: 'Primær: barn, sekundær: foreldre', isCorrect: true, feedback: 'Riktig! Reklamen er laget for å nå barna (primær), som deretter påvirker foreldrene (sekundær) til å kjøpe produktet.' },
          { id: 'c', label: 'Begge er primærmålgrupper', isCorrect: false, feedback: 'En bedrift kan ikke ha to likestilte primærmålgrupper — da blir kommunikasjonen uklar og treffer ingen av dem godt.' },
          { id: 'd', label: 'Barn er ikke en gyldig målgruppe', isCorrect: false, feedback: 'Barn er absolutt en gyldig målgruppe, selv om de ikke selv betaler — de påvirker kjøpsbeslutningen som i klassisk "pester power".' },
        ],
        espenTip: 'Legg merke til at leketyvreklamer bruker lyse farger, hurtige klipp og barnestemmer — alt designet for å appellere til primærmålgruppen (barn).',
      },
      {
        id: 'mg-2-2',
        icon: '📱',
        title: 'Spotify Premium-eksempelet',
        question: 'Spotify identifiserer dagliglyttende studenter som sin primærmålgruppe. Hva kjennetegner en god primærmålgruppe?',
        choices: [
          { id: 'a', label: 'Størst mulig gruppe med bredest mulig interesse', isCorrect: false, feedback: 'En stor, bred gruppe er vanskeligere å treffe med målrettet kommunikasjon — tydeligere segmentering gir bedre resultater.' },
          { id: 'b', label: 'Den gruppen som er enklest å nå med reklame', isCorrect: false, feedback: 'Tilgjengelighet for reklame er ikke det primære kriteriet — primærmålgruppen bør defineres av kjøpspotensial og fit med produktet.' },
          { id: 'c', label: 'Den gruppen med høyest sannsynlighet for kjøp og som produktet passer best for', isCorrect: true, feedback: 'Riktig! Primærmålgruppen er de med størst kjøpspotensial og best match med produktets verdiforslag — for Spotify Premium er det hyppige brukere.' },
          { id: 'd', label: 'Den gruppen som allerede kjøper fra deg', isCorrect: false, feedback: 'Eksisterende kunder er en viktig gruppe, men primærmålgruppen kan også inkludere de som ennå ikke har kjøpt — nybegynnere med høy kjøpssannsynlighet.' },
        ],
        espenTip: 'Primærmålgruppen er det segmentet der budsjettene dine gir mest avkastning — fokuser kommunikasjonen dit.',
      },
      {
        id: 'mg-2-3',
        icon: '👨‍👩‍👧',
        title: 'Påvirkere i kjøpsbeslutningen',
        question: 'En norsk videregående skole markedsfører seg mot ungdom i 10. klasse, men legger også stor vekt på å informere foreldrene. Hvorfor er dette smart segmenteringsstrategi?',
        choices: [
          { id: 'a', label: 'Fordi foreldre alltid vet best og bør ta avgjørelsen', isCorrect: false, feedback: 'Det handler ikke om hvem som "vet best" — det handler om at foreldre er sentrale beslutningspåvirkere i valg av videregående skole.' },
          { id: 'b', label: 'Fordi å nå foreldre er billigere enn å nå ungdom', isCorrect: false, feedback: 'Kostnadseffektivitet er ikke årsaken — det er at foreldre er sekundærmålgruppen som aktivt påvirker utdanningsvalget.' },
          { id: 'c', label: 'Fordi foreldre er sekundærmålgruppe som påvirker ungdommens valg', isCorrect: true, feedback: 'Riktig! Foreldre er en typisk sekundærmålgruppe ved utdanningsvalg — de er ikke primærkjøpere, men de påvirker ungdommens beslutning sterkt.' },
          { id: 'd', label: 'Fordi ungdom ikke kan inngå juridiske avtaler', isCorrect: false, feedback: 'Den juridiske siden er ikke relevant for segmenteringsstrategien — det handler om at foreldre er reelle påvirkere i valget av skole.' },
        ],
        espenTip: 'Identifiser alltid hvem som er kjøper og hvem som er influencer i kjøpsprosessen — de krever ofte ulik kommunikasjon.',
      },
      {
        id: 'mg-2-4',
        icon: '🚗',
        title: 'Sekundærmålgruppe i praksis',
        question: 'En bilforhandler selger familiebiler. Reklamen viser trygge, romslige biler for familier. Hvem er sannsynligvis sekundærmålgruppen?',
        choices: [
          { id: 'a', label: 'Unge sjåfører mellom 18 og 25 år', isCorrect: false, feedback: 'Unge sjåfører er ikke en typisk sekundærmålgruppe for familiebiler — de er heller en separat målgruppe for andre bilsegmenter.' },
          { id: 'b', label: 'Barn i familien', isCorrect: false, feedback: 'Barn påvirker sjelden bilkjøp direkte — de er ikke en relevant sekundærmålgruppe for et slikt produkt.' },
          { id: 'c', label: 'Partner/ektefelle som ikke er primær beslutningstaker', isCorrect: true, feedback: 'Riktig! Ved familiebilanskaffelse er partneren ofte medbeslutter — de er sekundærmålgruppen som reklamen også bør treffe.' },
          { id: 'd', label: 'Mekanikerverksteder i nærheten', isCorrect: false, feedback: 'Mekanikere er en B2B-kontakt, ikke en sekundærmålgruppe i et B2C-kjøp som familiebil.' },
        ],
        espenTip: 'Bilreklame som "Du trenger mer plass til familien" henvender seg til begge foreldrene — det er sekundærmålgruppe-tenking i praksis.',
      },
      {
        id: 'mg-2-5',
        icon: '💊',
        title: 'Sekundærmålgruppe i helsesektoren',
        question: 'Et farmasøytisk selskap markedsfører et vitamintilskudd til eldre over 70 år. Reklamen er imidlertid primært rettet mot de eldres voksne barn. Hva er årsaken til denne strategien?',
        choices: [
          { id: 'a', label: 'Eldre er ikke en lønnsom målgruppe', isCorrect: false, feedback: 'Eldre er faktisk en svært kjøpekraftig målgruppe — dette handler ikke om lønnsomhet, men om hvem som aktivt anbefaler og initier kjøpet.' },
          { id: 'b', label: 'Eldre ser ikke på TV og kan ikke nås med reklame', isCorrect: false, feedback: 'Dette stemmer ikke — eldre er faktisk blant de mest aktive TV-seerne i Norge. Strategien handler om kjøpspåvirkning, ikke rekkevidde.' },
          { id: 'c', label: 'Voksne barn er sekundærmålgruppe som ofte kjøper produkter til sine foreldre', isCorrect: true, feedback: 'Riktig! Voksne barn er typisk de som kjøper vitamintilskudd og helseprodukter til sine eldre foreldre — de er sekundærmålgruppen som initierer kjøpet.' },
          { id: 'd', label: 'Fordi produktet egentlig er rettet mot voksne barn, ikke eldre', isCorrect: false, feedback: 'Produktet er designet for eldre (primær), men voksne barn er de som oppdager behovet og initierer kjøpet — derav sekundærmålgruppe-strategien.' },
        ],
        espenTip: 'I mange kategorier er den som kjøper og den som bruker to ulike personer — identifiser begge og kommuniser til dem ulikt.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🧑‍💼',
    title: 'Persona-bygging',
    quote: 'Skriv til én person, ikke til en statistikk — da treffer du alle som ligner på den personen',
    practical:
      'En persona er en semi-fiktiv representasjon av din ideelle kunde basert på data. Inkluder: navn, alder, yrke, mål, frustrasjonspunkter, medievaner og kjøpsmotivasjon. Nike Women bruker personaen "Marte, 32, Oslo, trener 4x/uke, følger treningsinfluencere".',
    glossaryTerm: 'Persona',
    exercises: [
      {
        id: 'mg-3-1',
        icon: '🧑‍💼',
        title: 'Hva er en persona?',
        question: 'Hva skiller en persona fra en vanlig målgruppebeskrivelse?',
        choices: [
          { id: 'a', label: 'En persona er basert på fiksjon, mens en målgruppebeskrivelse er basert på data', isCorrect: false, feedback: 'En god persona er semi-fiktiv, men bygget på ekte data og forskning — ikke ren fiksjon.' },
          { id: 'b', label: 'En persona personifiserer segmentet med konkret navn, bakgrunn og behov', isCorrect: true, feedback: 'Riktig! En persona gjør det abstrakte segmentet menneskelig og konkret — det gjør det lettere å lage treffsikker kommunikasjon.' },
          { id: 'c', label: 'En persona brukes kun i kreative yrker, ikke i markedsføring', isCorrect: false, feedback: 'Persona-bygging er et kjerneverktøy i markedsføring og produktutvikling — det brukes av de fleste profesjonelle markedsavdelinger.' },
          { id: 'd', label: 'En persona er et kundeprofil fra CRM-systemet', isCorrect: false, feedback: 'En persona er ikke et spesifikt kundedokument fra systemet — det er et arketypisk portrett basert på et segment, ikke en enkelt faktisk kunde.' },
        ],
        espenTip: 'En god persona er så detaljert at du kan forestille deg hva personen gjør på en lørdag morgen — og om de da ville brukt produktet ditt.',
      },
      {
        id: 'mg-3-2',
        icon: '📋',
        title: 'Elementer i en persona',
        question: 'Hvilke elementer er de viktigste å inkludere i en persona for en ny treningsapp?',
        choices: [
          { id: 'a', label: 'Navn, favorittfarge og hårfarge', isCorrect: false, feedback: 'Favorittfarge og hårfarge er uviktige for markedsføring — en persona skal beskrive behov, frustrasjoner og atferd, ikke utseende.' },
          { id: 'b', label: 'Navn, alder, treningsmål, frustrasjonspunkter og medievaner', isCorrect: true, feedback: 'Riktig! Disse elementene gir innsikt i hva personen vil oppnå, hva som hindrer dem og hvordan de best nås — kjernen i en nyttig persona.' },
          { id: 'c', label: 'Utdanning, sivilstatus og politisk ståsted', isCorrect: false, feedback: 'Sivilstatus og politisk ståsted er sjelden relevant for en treningsapp — fokuser på treningsatferd, mål og medievaner.' },
          { id: 'd', label: 'Bostedsadresse og bankkontonummer', isCorrect: false, feedback: 'Personopplysninger som adresse og kontonummer hører ikke hjemme i en markedsføringspersona — det ville vært et brudd på personvernet.' },
        ],
        espenTip: 'Frustrasjonspunkter er ofte de mest verdifulle elementene — de avslører hva produktet ditt skal løse.',
      },
      {
        id: 'mg-3-3',
        icon: '👟',
        title: 'Nike Women-personaen',
        question: 'Nike Women bruker personaen "Marte, 32, Oslo, trener 4x/uke, følger treningsinfluencere". Hvorfor er det nyttig å gi personaen et navn?',
        choices: [
          { id: 'a', label: 'For å gjøre det lettere å søke etter reelle kunder med det navnet', isCorrect: false, feedback: 'Personaen er semi-fiktiv og er ikke ment for å søke opp spesifikke individer — det er et analytisk verktøy, ikke et register.' },
          { id: 'b', label: 'For å oppfylle GDPR-krav om identifiserbarhet', isCorrect: false, feedback: 'GDPR handler om ekte personopplysninger — en fiktiv persona-navn er ikke en GDPR-sak.' },
          { id: 'c', label: 'For å gjøre personaen menneskelig og lett å referere til i team-diskusjoner', isCorrect: true, feedback: 'Riktig! Et navn gjør personaen konkret og lett å visualisere — "hva ville Marte synes om denne reklamen?" er en mye bedre diskusjon enn "hva ville segment 3b synes?".' },
          { id: 'd', label: 'Fordi norsk markedsføringslov krever at alle personas har et norsk navn', isCorrect: false, feedback: 'Det finnes ingen slik lovpålegg — navn på personas er et metodisk valg for å gjøre arbeidet mer intuitivt.' },
        ],
        espenTip: 'Et godt persona-navn er kulturelt passende for målgruppen — det gjør det lettere for hele teamet å identifisere seg med kunden.',
      },
      {
        id: 'mg-3-4',
        icon: '🎯',
        title: 'Persona i praksis',
        question: 'En bedrift lager én enkelt persona for hele kundebasen, men oppdager at halvparten av kundene er studenter og halvparten er pensjonister. Hva er problemet?',
        choices: [
          { id: 'a', label: 'En persona er alltid tilstrekkelig uansett kundebase', isCorrect: false, feedback: 'Én persona som skal dekke vidt forskjellige segmenter blir enten for vag eller misvisende — det er bedre med en persona per segment.' },
          { id: 'b', label: 'Studenter og pensjonister har så ulike behov at én persona ikke kan representere begge', isCorrect: true, feedback: 'Riktig! To så ulike segmenter krever to ulike personas — ellers blir kommunikasjonen et kompromiss som treffer ingen av dem godt.' },
          { id: 'c', label: 'Problemet er at pensjonister ikke er en lovlig målgruppe å bruke i markedsføring', isCorrect: false, feedback: 'Det er ingen juridisk begrensning på å målrette kommunikasjon mot pensjonister — problemet er metodisk, ikke juridisk.' },
          { id: 'd', label: 'Bedriften bør fjerne pensjonistene fra kundebasen', isCorrect: false, feedback: 'Det gir ingen mening å ekskludere en betalende kundegruppe — løsningen er heller å lage en separat persona og kommunikasjon for hvert segment.' },
        ],
        espenTip: 'De fleste bedrifter bør ha 2–4 personas — én for hvert distinkt kundersegment med ulike behov og atferd.',
      },
      {
        id: 'mg-3-5',
        icon: '💡',
        title: 'Persona og kommunikasjon',
        question: 'Bedriften har laget personaen "Lars, 45, byggmester, prissensitiv, leser fagblader og ser lite på sosiale medier". Hvilken kommunikasjonskanal passer best?',
        choices: [
          { id: 'a', label: 'TikTok og Instagram Reels', isCorrect: false, feedback: 'Lars ser lite på sosiale medier ifølge personaen — å investere i TikTok for å nå ham er sannsynligvis feil prioritering.' },
          { id: 'b', label: 'Fagblader og bransjemesser', isCorrect: true, feedback: 'Riktig! Personaen forteller at Lars leser fagblader — kommunikasjonen bør møte ham der han faktisk er, og fagblader og bransjemesser er riktige kanaler.' },
          { id: 'c', label: 'Snapchat og podkast', isCorrect: false, feedback: 'Snapchat er primært for unge brukere, og personaen nevner ikke podkast som medievane — dette er sannsynligvis feil match.' },
          { id: 'd', label: 'Influencer-markedsføring via fitness-influencere', isCorrect: false, feedback: 'Fitness-influencere appellerer til et helt annet segment — Lars som byggmester og fagbladleser vil ikke identifisere seg med den typen kommunikasjon.' },
        ],
        espenTip: 'Medievanene i personaen er gull: de forteller deg direkte hvilke kanaler du bør investere i for å nå det segmentet.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '👟',
    title: 'Segmentering i praksis',
    quote: 'Nike selger ikke sko — de selger identiteter til spesifikke segmenter',
    practical:
      'Nike bruker differensiert segmentering: Nike Women (inkludering, alle kropper, velvære), Nike Running (ytelse, hastighet, maratonløpere), Nike SB (skate-kultur). Tre ulike budskap, tre ulike estetikker — men ett overordnet Nike-merke.',
    exercises: [
      {
        id: 'mg-4-1',
        icon: '👟',
        title: 'Differensiert segmentering',
        question: 'Nike lager separate kampanjer for Nike Women, Nike Running og Nike SB — samme merkevare, ulike budskap. Dette kalles:',
        choices: [
          { id: 'a', label: 'Udifferensiert segmentering', isCorrect: false, feedback: 'Udifferensiert segmentering betyr ett budskap til alle — Nike gjør det motsatte ved å skreddersy budskapet til hvert segment.' },
          { id: 'b', label: 'Differensiert segmentering', isCorrect: true, feedback: 'Riktig! Differensiert segmentering betyr å nå flere segmenter med tilpassede tilbud og budskap — nøyaktig det Nike gjør.' },
          { id: 'c', label: 'Konsentrert segmentering', isCorrect: false, feedback: 'Konsentrert segmentering betyr å fokusere på kun ett segment — Nike henvender seg til mange segmenter, men med ulikt budskap til hver.' },
          { id: 'd', label: 'Mikrosegmentering', isCorrect: false, feedback: 'Mikrosegmentering er svært detaljert segmentering ned på individnivå — Nikes strategi er bredere enn det.' },
        ],
        espenTip: 'Differensiert segmentering krever mer ressurser, men gir bedre treffsikkerhet og sterkere merkelojalitet i hvert segment.',
      },
      {
        id: 'mg-4-2',
        icon: '🎨',
        title: 'Merkevare og segmentering',
        question: 'Nike Women bruker budskap om inkludering og velvære for alle kropper, mens Nike Running fokuserer på ytelse og hastighet. Hvilken risiko medfører dette?',
        choices: [
          { id: 'a', label: 'Ingen risiko — jo flere budskap desto bedre', isCorrect: false, feedback: 'For mange ulike budskap kan svekke merkevareidentiteten — det er alltid en risiko for forvirring ved differensiert segmentering.' },
          { id: 'b', label: 'Risikoen for at ulike budskap svekker den overordnede merkevareidentiteten', isCorrect: true, feedback: 'Riktig! Differensiert segmentering innebærer alltid en risiko for at de ulike budskapet ikke henger godt nok sammen under ett merke.' },
          { id: 'c', label: 'Risikoen for at produktene blir for like hverandre', isCorrect: false, feedback: 'Det er budskapet og posisjoneringa som er ulik — produktene er faktisk svært like i design. Risikoen er merkevareforvirring, ikke produktlikhet.' },
          { id: 'd', label: 'Risikoen for at loven forbyr ulik kommunikasjon til ulike grupper', isCorrect: false, feedback: 'Det er ingen lov mot differensiert kommunikasjon til ulike målgrupper — så lenge den er sannferdig og ikke diskriminerende.' },
        ],
        espenTip: 'Nike løser dette ved å ha et sterkt felles merkevare-DNA (Just Do It, prestasjon, inspirasjon) som binder alle sub-segments-kampanjene sammen.',
      },
      {
        id: 'mg-4-3',
        icon: '🛹',
        title: 'Nike SB og subkultur-segmentering',
        question: 'Nike SB (Skateboarding) retter seg mot skate-kulturen med helt eget design, kommunikasjonsstil og distribusjon (skate-shops). Hva er fordelen med denne dype spesialisering?',
        choices: [
          { id: 'a', label: 'Det er billigere å lage spesialiserte produkter enn generelle', isCorrect: false, feedback: 'Spesialiserte produkter er generelt dyrere å produsere, ikke billigere — fordelen er posisjoneringsmessig, ikke kostnadsmessig.' },
          { id: 'b', label: 'Det gjør det mulig å ta høyere pris for alle Nike-produkter', isCorrect: false, feedback: 'Nike SB er en nisje-satsing og påvirker ikke direkte prissettingen på hele Nikes sortiment.' },
          { id: 'c', label: 'Autentisitet og troverdighet i segmentet — skate-kulturen avviser merker som ikke "forstår" dem', isCorrect: true, feedback: 'Riktig! Subkulturer som skate er svært autentisitetskritiske — Nike SBs dedikerte linje og distribusjon gjennom skate-shops gir dem troverdighet.' },
          { id: 'd', label: 'Skate-kulturen er den eneste voksende målgruppen for sportsutstyr', isCorrect: false, feedback: 'Skate er én av mange voksende segmenter — dette er ikke årsaken til Nike SBs spesialisering.' },
        ],
        espenTip: 'Subkulturer belønner autentisitet og straffer opportunisme — Nike SB er et eksempel på hvordan en storbedrift kan lykkes i en nisje ved å ta den på alvor.',
      },
      {
        id: 'mg-4-4',
        icon: '📈',
        title: 'Fra produkt til identitet',
        question: 'Påstanden "Nike selger ikke sko — de selger identiteter til spesifikke segmenter" betyr at:',
        choices: [
          { id: 'a', label: 'Nike lyver om hva de selger og bør informere forbrukerne bedre', isCorrect: false, feedback: 'Dette er ikke villedende markedsføring — det er en beskrivelse av at produktet er bærer av en identitet og livsstil, noe forbrukerne ønsker.' },
          { id: 'b', label: 'Nike differensierer seg på merkevare og identitet, ikke bare produktfunksjonalitet', isCorrect: true, feedback: 'Riktig! Nikes unike verdiforslag er ikke at skoen løper raskere enn konkurrentens — det er at den signaliserer en identitet (løper, skater, fitnessentusiast).' },
          { id: 'c', label: 'Selgere hos Nike er forbudt å snakke om skoens tekniske egenskaper', isCorrect: false, feedback: 'Tekniske egenskaper er absolutt relevante å kommunisere — poenget er at merkevare og identitet er en like viktig del av kjøpsmotivasjonen.' },
          { id: 'd', label: 'Nike bør slutte å fokusere på sko og heller selge livsstilsprodukter', isCorrect: false, feedback: 'Nike selger nettopp sko — men skoen er pakket inn i en identitet. Det er ikke et argument for å endre produktkategorien.' },
        ],
        espenTip: 'Når et produkt bærer en identitet, er det nesten umulig for konkurrenter å kopiere — merkevare som identitetsbærer er den sterkeste formen for differensiering.',
      },
      {
        id: 'mg-4-5',
        icon: '🏢',
        title: 'Segmentering i norsk kontekst',
        question: 'En norsk sportskjede vil kopiere Nikes differensierte segmenteringsstrategi. Hva er den viktigste forutsetningen for at dette skal fungere?',
        choices: [
          { id: 'a', label: 'Et budsjett på minst 100 millioner kroner', isCorrect: false, feedback: 'Store budsjetter hjelper, men differensiert segmentering krever primært innsikt og strategi — ikke nødvendigvis enormt budsjett.' },
          { id: 'b', label: 'At bedriften har ressurser og kompetanse til å skape genuint ulik kommunikasjon for hvert segment', isCorrect: true, feedback: 'Riktig! Differensiert segmentering krever at bedriften faktisk forstår og kan kommunisere autentisk til hvert segment — ellers blir det overfladisk og ineffektivt.' },
          { id: 'c', label: 'At alle segmentene de retter seg mot er like store', isCorrect: false, feedback: 'Segmentene behøver ikke være like store — de bør derimot være lønnsomme og nåbare med tilgjengelige ressurser.' },
          { id: 'd', label: 'At de selger nøyaktig de samme produktene som Nike', isCorrect: false, feedback: 'Produktene trenger ikke kopiere Nike — strategien handler om differensiert kommunikasjon, ikke om å kopiere produktene.' },
        ],
        espenTip: 'Mange norske SMB-er lykkes bedre med konsentrert segmentering (én segment, gjort bra) enn med differensiert (mange segmenter, alle halvhjertet).',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🎯',
    title: 'Nisje vs masse-marked',
    quote: 'En smal nisje med lojale kunder kan være mer lønnsom enn et bredt marked med likegyldige',
    practical:
      'Masse-marked: nå flest mulig med ett tilbud (Grandiosa original). Nisje-marked: spesialisere seg på én smal gruppe med særegne behov (håndlaget naturvin, vegansk fastfood). Risiko: nisje-markeder er sårbare om trenden endrer seg.',
    exercises: [
      {
        id: 'mg-5-1',
        icon: '🎯',
        title: 'Nisje vs masse',
        question: 'Grandiosa original er tilgjengelig i alle butikker i Norge og kjøpes av alle typer forbrukere. Dette er et eksempel på:',
        choices: [
          { id: 'a', label: 'Nisjemarkedsføring', isCorrect: false, feedback: 'Nisjemarkedsføring betyr å fokusere på en smal, spesialisert gruppe — Grandiosa gjør det motsatte ved å ha bredest mulig distribusjon og appell.' },
          { id: 'b', label: 'Massemarkedsføring', isCorrect: true, feedback: 'Riktig! Massemarkedsføring betyr ett tilbud til bredest mulig marked — Grandiosa er et klassisk eksempel med bred tilgjengelighet og universell appell.' },
          { id: 'c', label: 'Differensiert segmentering', isCorrect: false, feedback: 'Differensiert segmentering betyr ulike tilbud til ulike segmenter — Grandiosa original er ett produkt til alle, ikke ulike produkter til ulike grupper.' },
          { id: 'd', label: 'Konsentrert segmentering', isCorrect: false, feedback: 'Konsentrert segmentering betyr å fokusere på ett spesifikt segment — Grandiosa fokuserer ikke på ett segment, men forsøker å appellere til alle.' },
        ],
        espenTip: 'Massemarkedsføring fungerer best for universalprodukter som tilfredsstiller grunnleggende behov på en standardisert måte.',
      },
      {
        id: 'mg-5-2',
        icon: '🍷',
        title: 'Næringslivet i nisje',
        question: 'Et lite norsk selskap selger håndlaget naturvin fra Frankrike til restauranter og vin-entusiaster. Hva er den største fordelen med denne nisjestrategien?',
        choices: [
          { id: 'a', label: 'De kan selge til lavere pris enn større aktører', isCorrect: false, feedback: 'Nisjeaktører selger typisk til høyere pris, ikke lavere — det er nettopp premiumposisjonering og spesialisering som gjør nisjen lønnsom.' },
          { id: 'b', label: 'De unngår konkurranse fra store aktører ved å spesialisere seg på noe de fleste ikke tilbyr', isCorrect: true, feedback: 'Riktig! I en nisje er det færre konkurrenter og kundene er villige til å betale mer — spesialisering gir konkurransefordel mot volum-aktørene.' },
          { id: 'c', label: 'De kan selge til alle vindrikkere i Norge', isCorrect: false, feedback: 'Håndlaget naturvin er nettopp et nisjeprodukter — det er ikke for alle vindrikkere, men for en spesifikk entusiast-gruppe.' },
          { id: 'd', label: 'De trenger ikke å markedsføre seg fordi nisjen markedsfører seg selv', isCorrect: false, feedback: 'Alle bedrifter trenger markedsføring — nisjer er heller enklere å nå fordi målgruppen er mer definert og engasjert.' },
        ],
        espenTip: 'I en nisje konkurrerer du ikke på pris — du konkurrerer på spesialisering, ekspertise og produktkvalitet.',
      },
      {
        id: 'mg-5-3',
        icon: '⚠️',
        title: 'Risiko ved nisjemarkeder',
        question: 'En norsk butikk spesialiserte seg utelukkende på CBD-produkter i 2020. I 2023 ble regelverket rundt CBD strammet inn i Norge. Hvilken risiko ved nisjemarkeder illustrerer dette?',
        choices: [
          { id: 'a', label: 'Nisjemarkeder tiltrekker seg alltid for mange konkurrenter', isCorrect: false, feedback: 'Konkurranse er en risiko i alle markeder, ikke spesifikt ved nisje — lovregulering er risikoen som illustreres i dette eksempelet.' },
          { id: 'b', label: 'Nisjemarkeder er sårbare for endringer i trender, regelverk og forbrukerpreferanser', isCorrect: true, feedback: 'Riktig! Nisjemarkeder er mer sårbare fordi bedriften er avhengig av et smalt marked — om det endrer seg, er det lite å falle tilbake på.' },
          { id: 'c', label: 'Nisjemarkeder mangler alltid kunder med kjøpekraft', isCorrect: false, feedback: 'Mange nisjemarkeder har svært kjøpekraftige kunder — CBD er ikke et eksempel på manglende kjøpekraft, men på regulatorisk risiko.' },
          { id: 'd', label: 'Nisjemarkeder har ikke nok volum til å dekke faste kostnader', isCorrect: false, feedback: 'Mange nisjeaktører er lønnsomme fordi de tar høyere marginer — volumet trenger ikke å være stort for å dekke kostnadene.' },
        ],
        espenTip: 'En god nisje-strategi inkluderer alltid en vurdering av om nisjen er varig — er trenden bærekraftig eller forbigående?',
      },
      {
        id: 'mg-5-4',
        icon: '💪',
        title: 'Lønnsomhet i nisje',
        question: 'Hvorfor kan en bedrift i en smal nisje ofte være mer lønnsom enn en bedrift i et bredere massemarked?',
        choices: [
          { id: 'a', label: 'Fordi nisjer alltid har lavere produksjonskostnader', isCorrect: false, feedback: 'Nisjer har typisk høyere produksjonskostnader per enhet, ikke lavere — lønnsomheten kommer fra høyere priser og sterkere lojalitet.' },
          { id: 'b', label: 'Fordi kunder i nisjer er villige til å betale premiumpriser og er mer lojale', isCorrect: true, feedback: 'Riktig! Nisje-kunder søker noe spesifikt, er lite prissensitive og bytter sjelden merkevare — dette gir høyere marginer og lavere kundetap.' },
          { id: 'c', label: 'Fordi nisjer har statlige subsidier fra næringslivsordninger', isCorrect: false, feedback: 'Det finnes ingen generelle statlige subsidier for nisjeaktører — lønnsomheten skyldes markedsdynamikken, ikke subsidier.' },
          { id: 'd', label: 'Fordi massemarkeder alltid er overfylte med konkurrenter', isCorrect: false, feedback: 'Massemarkeder kan ha mange konkurrenter, men det finnes også svært lønnsomme massemarkedsaktører — Grandiosa er et eksempel. Nisje er ikke alltid mer lønnsomt.' },
        ],
        espenTip: 'I en nisje er kundene "dine" — de søkte deg opp fordi du er spesialist. I massemarket er du én av mange tilfeldig valgte alternativer.',
      },
      {
        id: 'mg-5-5',
        icon: '🌱',
        title: 'Fra nisje til masse',
        question: 'Oatly (havremelk) startet som en nisje-produkt for laktoseintolerante og veganer. I dag finnes det i alle norske dagligvarebutikker. Hvilken utfordring kan dette medføre?',
        choices: [
          { id: 'a', label: 'De kan ikke lenger ta premiumpriser og mister marginer', isCorrect: false, feedback: 'Dette er delvis riktig, men den viktigste utfordringen ved å bevege seg fra nisje til masse er merkevareposisjonering, ikke bare prising.' },
          { id: 'b', label: 'De mister autentisiteten og troverdigheten hos den opprinnelige nisje-målgruppen', isCorrect: true, feedback: 'Riktig! Hardcore veganer og miljøbevisste kunder kan oppleve at Oatly har "solgt seg ut" ved å bli masseprodukt — det er en klassisk nisje-til-masse-utfordring.' },
          { id: 'c', label: 'De må endre navn for å appellere til et bredere marked', isCorrect: false, feedback: 'Navneskifte er ikke nødvendig — Oatly har beholdt sitt navn. Utfordringen handler om merkevarepersepsjon, ikke om navn.' },
          { id: 'd', label: 'De får lovpålegg om å selge til alle butikker i hele landet', isCorrect: false, feedback: 'Det finnes ingen lov om at en bedrift må selge til alle butikker — distribusjonsvalg er en strategisk beslutning, ikke en lovpålegg.' },
        ],
        espenTip: 'Fra nisje til masse er en krevende overgang — bedriften kan tjene mer på kort sikt, men risikerer å miste sin mest lojale kjerne-målgruppe.',
      },
    ],
  },
]

export default function MalgruppeModule() {
  return (
    <DrawerModule
      moduleCode="MFI-MG"
      moduleTitle="Målgrupper og segmentering"
      moduleIcon="🎯"
      storageKey="learning-mfi-malgruppe"
      completeRoute="/learning/mfi/malgruppe/complete"
      phases={PHASES}
      intro="Ingen bedrift kan nå alle — og de som prøver, treffer ingen godt. Segmentering handler om å velge hvem du vil snakke til, forstå dem dypt, og tilpasse alt til dem. Fra de fire segmenteringskriteriene til persona-bygging: slik finner du din målgruppe."
      vissteduAt="Bedrifter som bruker data-drevet segmentering øker konverteringsraten med gjennomsnittlig 73% sammenlignet med bedrifter som bruker én-størrelse-passer-alle-tilnærming."
      espenSier="Neste gang du ser en annonse, tenk: hvem er persona-en denne er laget for? Stemmer den med deg? Det er fascinerende å se markedsføring gjennom segmenteringsbrillene!"
      presentationLink={{ route: '/learning/presentations/forbrukeratferd', description: 'Forbrukeratferd — en visuell gjennomgang av målgrupper og segmentering' }}
    />
  )
}
