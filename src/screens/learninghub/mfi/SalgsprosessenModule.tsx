import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🎯',
    title: 'Forberedelse',
    quote: 'En god selger møter aldri en kunde uforberedt. Kjenn produktet, kjenn kunden, kjenn konkurrentene.',
    practical: 'Studer produktinfo, sjekk kundens historikk, forbered mulige innvendinger.',
    exercises: [
      {
        id: 'sp-1-1',
        question: 'Hva bør en selger gjøre i forberedelsesfasen?',
        choices: [
          { id: 'a', text: 'Vente på at kunden tar kontakt' },
          { id: 'b', text: 'Studere produktinfo, sjekke kundens historikk og forberede svar på mulige innvendinger' },
          { id: 'c', text: 'Lage tilbud og prisliste' },
          { id: 'd', text: 'Ringe alle kunder for å varsle om besøk' },
        ],
        correctId: 'b',
        explanation: 'God forberedelse betyr at selgeren kjenner produktet, vet noe om kunden og har tenkt gjennom hvilke innvendinger som kan komme.',
      },
      {
        id: 'sp-1-2',
        question: 'Hvorfor er forberedelse den viktigste fasen i salgsprosessen?',
        choices: [
          { id: 'a', text: 'Fordi det tar lengst tid' },
          { id: 'b', text: 'Fordi alle andre faser bygger på kunnskapen og planleggingen fra forberedelsen' },
          { id: 'c', text: 'Fordi kunden setter pris på forberedte selgere' },
          { id: 'd', text: 'Fordi det er lovpålagt' },
        ],
        correctId: 'b',
        explanation: 'Forberedelse er fundamentet — uten produktkunnskap kan du ikke bruke FAB, uten kunnskaper om kunden kan du ikke avdekke behov, uten å kjenne innvendinger kan du ikke håndtere dem.',
      },
      {
        id: 'sp-1-3',
        question: 'En selger i en sportsbutikk bør forberede seg på hvilke innvendinger for terrengsykler?',
        choices: [
          { id: 'a', text: '«Den er for dyr» og «Jeg trenger ikke terrengsykkel»' },
          { id: 'b', text: 'Kun tekniske spørsmål' },
          { id: 'c', text: 'Kun prispørsmål' },
          { id: 'd', text: 'Det er ikke nødvendig å forberede innvendinger' },
        ],
        correctId: 'a',
        explanation: 'De vanligste innvendingene er pris og relevans — en forberedt selger har gode svar klare for disse uten å nøle.',
      },
      {
        id: 'sp-1-4',
        question: 'Hva betyr det å «kjenne konkurrentene» som del av forberedelsen?',
        choices: [
          { id: 'a', text: 'Å spionere på konkurrenter' },
          { id: 'b', text: 'Å vite hva konkurrerende produkter tilbyr slik du kan argumentere for ditt produkts fordeler' },
          { id: 'c', text: 'Å selge til konkurrentenes kunder' },
          { id: 'd', text: 'Å kopiere konkurrentenes priser' },
        ],
        correctId: 'b',
        explanation: 'Kunnskap om konkurrenter gjør at selgeren kan svare på sammenligningsspørsmål og tydelig kommunisere hva som skiller produktet positivt fra alternativer.',
      },
      {
        id: 'sp-1-5',
        question: 'En selger sjekker CRM-systemet og ser at kunden kjøpte løpesko for 6 måneder siden. Hva er den smarteste måten å bruke denne informasjonen på?',
        choices: [
          { id: 'a', text: 'Ikke bruke den — kunden vil ikke ha det påpekt' },
          { id: 'b', text: 'Anbefale nye produkter som passer til løpesko, f.eks. treningsklær eller sportstape' },
          { id: 'c', text: 'Fortelle kunden at han bør kjøpe nye sko' },
          { id: 'd', text: 'Gi rabatt på neste kjøp' },
        ],
        correctId: 'b',
        explanation: 'Kundehistorikk er gull — den gir selgeren mulighet til å gjøre relevante, personlige anbefalinger fremfor generisk salg.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '👋',
    title: 'Kontakt og velkomst',
    quote: 'Førsteinntrykket skapes på 7 sekunder. Smil, blikkontakt og åpent kroppsspråk signaliserer profesjonalitet.',
    practical: 'Ikke spør «Kan jeg hjelpe deg?» (svaret er alltid «Nei takk, jeg bare ser»). Spør heller: «Hva kan jeg finne frem til deg i dag?»',
    exercises: [
      {
        id: 'sp-2-1',
        question: 'Hvorfor er «Kan jeg hjelpe deg?» en dårlig åpningsfrase?',
        choices: [
          { id: 'a', text: 'Det høres uprofesjonelt ut' },
          { id: 'b', text: 'Det er et lukket spørsmål som inviterer til «Nei takk» og stopper samtalen' },
          { id: 'c', text: 'Det er for direkte' },
          { id: 'd', text: 'Det er for høflig' },
        ],
        correctId: 'b',
        explanation: 'Et lukket ja/nei-spørsmål gir kunden en enkel rømningsvei — de svarer automatisk «Nei takk, jeg bare ser» og selger mister muligheten til kontakt.',
      },
      {
        id: 'sp-2-2',
        question: 'Hva er et bedre alternativ til «Kan jeg hjelpe deg?»?',
        choices: [
          { id: 'a', text: '«Trenger du noe?»' },
          { id: 'b', text: '«Hva kan jeg finne frem til deg i dag?»' },
          { id: 'c', text: '«Er du ny her?»' },
          { id: 'd', text: '«Hva koster det du leter etter?»' },
        ],
        correctId: 'b',
        explanation: '«Hva kan jeg finne frem til deg?» er et åpent spørsmål som forutsetter at kunden trenger hjelp og inviterer til samtale, fremfor å gi dem mulighet til å avvise.',
      },
      {
        id: 'sp-2-3',
        question: 'Innen hvor mange sekunder sier man at et førsteinntrykk dannes?',
        choices: [
          { id: 'a', text: '30 sekunder' },
          { id: 'b', text: '60 sekunder' },
          { id: 'c', text: '7 sekunder' },
          { id: 'd', text: '2 minutter' },
        ],
        correctId: 'c',
        explanation: 'Forskning viser at vi danner oss et inntrykk av andre på 7 sekunder — det er lite tid til å gjøre et godt førsteinntrykk.',
      },
      {
        id: 'sp-2-4',
        question: 'Hva signaliserer åpent kroppsspråk i en salgssituasjon?',
        choices: [
          { id: 'a', text: 'At selgeren er opptatt' },
          { id: 'b', text: 'Tilgjengelighet, vennlighet og profesjonalitet — det inviterer kunden inn' },
          { id: 'c', text: 'At selgeren er autoritativ' },
          { id: 'd', text: 'At selgeren er ny' },
        ],
        correctId: 'b',
        explanation: 'Åpent kroppsspråk (smil, blikkontakt, kroppen vendt mot kunden) kommuniserer «du er velkommen og jeg er her for deg» — det senker terskelen for samtale.',
      },
      {
        id: 'sp-2-5',
        question: 'En kunde ser irritert ut og skynder seg gjennom butikken. Hva er den beste tilnærmingen?',
        choices: [
          { id: 'a', text: 'La dem være og ikke ta kontakt' },
          { id: 'b', text: 'Si «Hei, om du leter etter noe spesifikt kan jeg hjelpe deg raskt» — tilby hjelp uten å bremse dem' },
          { id: 'c', text: 'Følg etter dem gjennom hele butikken' },
          { id: 'd', text: 'Tilby rabatt umiddelbart' },
        ],
        correctId: 'b',
        explanation: 'Les kunden — en stresset kunde trenger et tilbud om rask, effektiv hjelp, ikke en lang salgssamtale. Tilpass kontaktstilen til kundens tilstand.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🔍',
    title: 'Behovsavdekking',
    quote: 'Still åpne spørsmål (hva, hvordan, hvorfor) — lytt 70%, snakk 30%.',
    practical: '«Hva skal sekken brukes til?» «Hva er viktigst for deg?» «Hva har du brukt tidligere?»',
    exercises: [
      {
        id: 'sp-3-1',
        question: 'Hva er et åpent spørsmål?',
        choices: [
          { id: 'a', text: 'Et spørsmål med ja eller nei som svar' },
          { id: 'b', text: 'Et spørsmål som begynner med «hva», «hvordan», «hvorfor» og inviterer til utfyllende svar' },
          { id: 'c', text: 'Et spørsmål om pris' },
          { id: 'd', text: 'Et spørsmål som kunden ikke trenger å svare på' },
        ],
        correctId: 'b',
        explanation: 'Åpne spørsmål begynner med spørreord som hva, hvordan, hvorfor — de inviterer til detaljerte svar som avdekker kundens faktiske behov.',
      },
      {
        id: 'sp-3-2',
        question: 'Hvorfor bør en selger lytte 70% og snakke 30% i behovsavdekkingsfasen?',
        choices: [
          { id: 'a', text: 'For å spare energi' },
          { id: 'b', text: 'For å gi kunden rom til å fortelle om sine behov — du kan ikke selge riktig løsning uten å forstå problemet' },
          { id: 'c', text: 'For å virke ydmyk' },
          { id: 'd', text: 'Det er et lovkrav i service' },
        ],
        correctId: 'b',
        explanation: 'Behovsavdekking handler om å forstå, ikke å overbevise — den selgeren som lytter mest, selger best fordi de kan tilby løsninger som faktisk passer.',
      },
      {
        id: 'sp-3-3',
        question: 'En kunde sier at de vil ha «en god sekk». Hva er det beste oppfølgingsspørsmålet?',
        choices: [
          { id: 'a', text: '«Vil du ha sort eller blå?»' },
          { id: 'b', text: '«Hva skal sekken brukes til?»' },
          { id: 'c', text: '«Hva er budsjetten din?»' },
          { id: 'd', text: '«Vi har mange gode sekker, la meg vise deg»' },
        ],
        correctId: 'b',
        explanation: '«God sekk» er vagt — selgeren trenger å forstå bruket (fjelltur, skole, jogging) for å anbefale riktig produkt. Åpent spørsmål om bruk er første steg.',
      },
      {
        id: 'sp-3-4',
        question: 'Hva er risikoen ved å hoppe over behovsavdekking og gå rett til produktpresentasjon?',
        choices: [
          { id: 'a', text: 'Kunden får et for godt tilbud' },
          { id: 'b', text: 'Selgeren presenterer feil produkt og kunden føler seg ikke forstått — lav konvertering og dårlig kundetilfredshet' },
          { id: 'c', text: 'Salget tar for lang tid' },
          { id: 'd', text: 'Det er ingen risiko — presentasjon er alltid det viktigste' },
        ],
        correctId: 'b',
        explanation: 'Uten behovsavdekking skyter selgeren i blinde — de presenterer kanskje et flott produkt som ikke passer kunden, noe som resulterer i tap av salg og tillit.',
      },
      {
        id: 'sp-3-5',
        question: 'Hva betyr ««Hva har du brukt tidligere?»» i behovsavdekking?',
        choices: [
          { id: 'a', text: 'Det er et forsøk på å kritisere kundens gamle produkt' },
          { id: 'b', text: 'Det avdekker kundens erfaringer — hva de likte og ikke likte — og gir verdifulle holdepunkter for anbefalingen' },
          { id: 'c', text: 'Det handler om å selge tilbehør' },
          { id: 'd', text: 'Det er bare høflig prat' },
        ],
        correctId: 'b',
        explanation: 'Spørsmål om tidligere erfaring er gull — kunden forteller deg hva de verdsetter og hva de vil unngå, uten at du trenger å gjette.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💼',
    title: 'Produktpresentasjon med FAB',
    quote: 'Koble produktets egenskaper til kundens spesifikke behov.',
    practical: 'Feature → Advantage → Benefit',
    glossaryTerm: 'FAB-modellen',
    exercises: [
      {
        id: 'sp-4-1',
        question: 'Hva står FAB for?',
        choices: [
          { id: 'a', text: 'Funksjon, Appell, Budsjett' },
          { id: 'b', text: 'Feature, Advantage, Benefit' },
          { id: 'c', text: 'Fakta, Argument, Budskap' },
          { id: 'd', text: 'Fordel, Alternativ, Bevis' },
        ],
        correctId: 'b',
        explanation: 'FAB er Feature (egenskapen), Advantage (fordelen med egenskapen) og Benefit (nytteverdien for denne spesifikke kunden).',
      },
      {
        id: 'sp-4-2',
        question: '«Denne sekken har et aluminiumsramme (F), som gjør den stiv og støttende (A), slik at din rygg ikke blir sliten på lange turer (B).» Hva er «Benefit» her?',
        choices: [
          { id: 'a', text: 'Aluminiumsrammen' },
          { id: 'b', text: 'At sekken er stiv og støttende' },
          { id: 'c', text: 'At ryggen ikke blir sliten på lange turer' },
          { id: 'd', text: 'Prisen på sekken' },
        ],
        correctId: 'c',
        explanation: 'Benefit er den personlige nytteverdien for kunden — «ryggen din blir ikke sliten» er direkte relevant for kunden som skal på lange turer.',
      },
      {
        id: 'sp-4-3',
        question: 'Hvorfor er FAB mer effektivt enn å bare liste opp egenskaper?',
        choices: [
          { id: 'a', text: 'Fordi det tar kortere tid' },
          { id: 'b', text: 'Fordi kunder kjøper nytte og løsning, ikke tekniske specs — FAB kobler egenskapen til kundens faktiske behov' },
          { id: 'c', text: 'Fordi det er enklere å huske' },
          { id: 'd', text: 'Fordi ledelsen krever det' },
        ],
        correctId: 'b',
        explanation: 'Kunder bryr seg ikke om tekniske detaljer — de bryr seg om hva produktet gjør for dem. FAB oversetter egenskaper til konkret verdi for kunden.',
      },
      {
        id: 'sp-4-4',
        question: 'En kunde har sagt at de ønsker en rolig, stille opplevelse på fjellet. Hvilken FAB-presentasjon passer best?',
        choices: [
          { id: 'a', text: '«Denne teltet veier kun 1,2 kg»' },
          { id: 'b', text: '«Teltet koster 3000 kr»' },
          { id: 'c', text: '«Teltet har dobbelt vegger (F), som demper vind og lyd (A), slik at du sover godt selv i blåst (B)»' },
          { id: 'd', text: '«Dette er vårt mest populære telt»' },
        ],
        correctId: 'c',
        explanation: 'FAB er effektivt fordi det kobler produktegenskapen til det kunden faktisk ønsker — ro og stillhet — gjennom alle tre ledd.',
      },
      {
        id: 'sp-4-5',
        question: 'Hva er «Feature» i FAB-modellen?',
        choices: [
          { id: 'a', text: 'Kundens behov' },
          { id: 'b', text: 'Produktets objektive egenskaper og spesifikasjoner' },
          { id: 'c', text: 'Prisen på produktet' },
          { id: 'd', text: 'Kundens fordel av produktet' },
        ],
        correctId: 'b',
        explanation: 'Feature er den objektive egenskapen — f.eks. «aluminiumsramme», «vanntett membran» eller «lithium-batteri» — det som faktisk er i produktet.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🛡️',
    title: 'Innvendingshåndtering',
    quote: 'En innvending er ikke et nei — det er et ønske om mer informasjon.',
    practical: 'Teknikk: Anerkjenn → Spør → Svar → Bekreft. Eks: «Den er dyr» → «Jeg forstår. Hva sammenligner du den med?»',
    exercises: [
      {
        id: 'sp-5-1',
        question: 'En kunde sier «Den er for dyr». Hva er den beste responsen?',
        choices: [
          { id: 'a', text: 'Gi dem rabatt umiddelbart' },
          { id: 'b', text: 'Anerkjenne, spørre hva de sammenligner med, og deretter forklare verdien' },
          { id: 'c', text: 'Si at prisen ikke er forhandlingsbar' },
          { id: 'd', text: 'Vis dem et billigere alternativ' },
        ],
        correctId: 'b',
        explanation: 'Innvendingshåndtering starter med anerkjennelse, ikke forsvar. Spørsmålet «hva sammenligner du med?» avdekker hva de faktisk mener med «dyr».',
      },
      {
        id: 'sp-5-2',
        question: 'Hva er den fire-stegs teknikken for innvendingshåndtering?',
        choices: [
          { id: 'a', text: 'Avvis → Ignorer → Overtal → Selg' },
          { id: 'b', text: 'Anerkjenn → Spør → Svar → Bekreft' },
          { id: 'c', text: 'Lytt → Avbryt → Forklar → Lukk' },
          { id: 'd', text: 'Spør → Selg → Rabatt → Fullfør' },
        ],
        correctId: 'b',
        explanation: 'Anerkjenn (vis at du hørte dem), Spør (forstå hva som ligger bak), Svar (adresser den faktiske bekymringen), Bekreft (sjekk at svaret hjalp).',
      },
      {
        id: 'sp-5-3',
        question: 'Hvorfor er «Jeg forstår» en viktig åpning i innvendingshåndtering?',
        choices: [
          { id: 'a', text: 'Fordi det bekrefter at kunden har rett' },
          { id: 'b', text: 'Fordi det anerkjenner kundens perspektiv og senker forsvarsnivået — kunden føler seg hørt' },
          { id: 'c', text: 'Fordi det er høflig' },
          { id: 'd', text: 'Fordi det gir selgeren tid til å tenke' },
        ],
        correctId: 'b',
        explanation: 'Anerkjennelse er empatisk og senker kundens forsvar — det signaliserer at selgeren er på lag med kunden, ikke mot dem.',
      },
      {
        id: 'sp-5-4',
        question: 'Hva betyr «bekreft» som det siste steget i innvendingshåndteringen?',
        choices: [
          { id: 'a', text: 'Bekreft at prisen er korrekt' },
          { id: 'b', text: 'Bekreft med kunden at svaret ditt faktisk adresserte bekymringen deres' },
          { id: 'c', text: 'Bekreft ordren' },
          { id: 'd', text: 'Bekreft at de vil kjøpe' },
        ],
        correctId: 'b',
        explanation: 'Bekreft-steget er en «lukk»-sjekk: «Har dette besvart det du lurte på?» — det sikrer at innvendingen faktisk er adressert og kunden er klar for å gå videre.',
      },
      {
        id: 'sp-5-5',
        question: 'En kunde sier «Jeg må tenke på det». Hva kan ligge bak denne innvendingen?',
        choices: [
          { id: 'a', text: 'Alltid pris' },
          { id: 'b', text: 'Usikkerhet, manglende informasjon, behov for å rådføre seg med noen, eller at de ikke er overbevist om at produktet løser behovet' },
          { id: 'c', text: 'De liker ikke selgeren' },
          { id: 'd', text: 'De er aldri interessert' },
        ],
        correctId: 'b',
        explanation: '«Jeg må tenke» er sjelden et endelig nei — det er en kodert innvending. Spørr forsiktig hva de trenger mer tid til å tenke på, for å avdekke den reelle bekymringen.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '✅',
    title: 'Avslutning',
    quote: 'Be om ordren — de fleste kunder bestemmer seg ikke uten en gentle push.',
    practical: 'Direkte: «Vil du ha den?» / Alternativ: «Vil du ha den i sort eller blå?» / Antatt: «Skal jeg pakke den inn?»',
    exercises: [
      {
        id: 'sp-6-1',
        question: 'Hva er en «alternativ avslutning»?',
        choices: [
          { id: 'a', text: 'Å spørre om kunden vil kjøpe eller ikke' },
          { id: 'b', text: 'Å gi kunden valget mellom to alternativer som begge forutsetter kjøp — f.eks. «sort eller blå?»' },
          { id: 'c', text: 'Å tilby et billigere alternativ' },
          { id: 'd', text: 'Å avslutte salgssamtalen' },
        ],
        correctId: 'b',
        explanation: 'Alternativ avslutning er subtil: «Vil du ha den i sort eller blå?» forutsetter at kunden kjøper og gir dem et valg om detalj, ikke om selve kjøpet.',
      },
      {
        id: 'sp-6-2',
        question: 'Hvorfor bør selgere eksplisitt be om ordren?',
        choices: [
          { id: 'a', text: 'Fordi det er obligatorisk' },
          { id: 'b', text: 'Fordi de fleste kunder trenger en gentle push for å ta det endelige steget — de bestemmer seg ikke alltid selv' },
          { id: 'c', text: 'For å presse kunden' },
          { id: 'd', text: 'For å vise at selgeren er flink' },
        ],
        correctId: 'b',
        explanation: 'Mange kunder er interesserte men ubeslutsomme — uten en tydelig avslutning kan salget henge i luften selv om kunden egentlig vil ha produktet.',
      },
      {
        id: 'sp-6-3',
        question: 'En selger sier «Skal jeg pakke det inn?» etter en god demonstrasjon. Hva slags avslutning er dette?',
        choices: [
          { id: 'a', text: 'Direkte avslutning' },
          { id: 'b', text: 'Alternativ avslutning' },
          { id: 'c', text: 'Antatt avslutning' },
          { id: 'd', text: 'Myk avslutning' },
        ],
        correctId: 'c',
        explanation: 'Antatt avslutning forutsetter at kunden kjøper og hopper rett til praktiske detaljer — det er en selvsikker teknikk som fungerer godt når kunden er positiv.',
      },
      {
        id: 'sp-6-4',
        question: 'Hva er risikoen ved å aldri eksplisitt be om ordren?',
        choices: [
          { id: 'a', text: 'Det er ingen risiko — selgeren virker mer høflig' },
          { id: 'b', text: 'Mange potensielle salg avsluttes ikke fordi verken selger eller kunde tar initiativet' },
          { id: 'c', text: 'Kunden kjøper alltid likevel' },
          { id: 'd', text: 'Det tar for lang tid' },
        ],
        correctId: 'b',
        explanation: 'Statistisk sett faller mange salg i gulvet fordi selgeren aldri spurte direkte — kunden forlater butikken «for å tenke» og returnerer aldri.',
      },
      {
        id: 'sp-6-5',
        question: 'Når er det riktig tidspunkt å avslutte salget?',
        choices: [
          { id: 'a', text: 'Alltid så tidlig som mulig' },
          { id: 'b', text: 'Etter at kunden har vist klare kjøpssignaler og innvendinger er håndtert' },
          { id: 'c', text: 'Alltid mot slutten av butikkdagen' },
          { id: 'd', text: 'Kun etter 30 minutters samtale' },
        ],
        correctId: 'b',
        explanation: 'Avslutt når kunden er klar — etter at du har avdekket behov, presentert løsning og håndtert innvendinger. Kjøpssignaler som «dette ser bra ut» eller «hva koster det?» er grønne lys.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '📞',
    title: 'Oppfølging',
    quote: 'Salget slutter ikke ved kassen. En fornøyd kunde er din beste markedsføring.',
    practical: 'Send kvittering på e-post, spør om tilfredshet, inviter til neste besøk.',
    exercises: [
      {
        id: 'sp-7-1',
        question: 'Forskning viser at 80% av salg skjer etter 5 oppfølginger. Hva forteller dette oss?',
        choices: [
          { id: 'a', text: 'At man bør gi opp etter 4 forsøk' },
          { id: 'b', text: 'At vedvarende, respektfull oppfølging lønner seg — de fleste selgere gir opp for tidlig' },
          { id: 'c', text: 'At pågående selgere er de beste' },
          { id: 'd', text: 'At kunder alltid trenger fem møter' },
        ],
        correctId: 'b',
        explanation: '44% av selgere gir opp etter første avslag, men de fleste salg krever flere kontaktpunkter — tålmodig, respektfull oppfølging er en viktig egenskap.',
      },
      {
        id: 'sp-7-2',
        question: 'Hva er hensikten med å sende kvittering på e-post etter et kjøp?',
        choices: [
          { id: 'a', text: 'For å spare papir' },
          { id: 'b', text: 'Det er en lovpålagt dokumentasjonsplikt' },
          { id: 'c', text: 'For å gi kunden bevis for kjøpet og opprettholde kontakten etter salget' },
          { id: 'd', text: 'For å sende markedsføring' },
        ],
        correctId: 'c',
        explanation: 'En e-postkvittering gir kunden dokumentasjon og holder kommunikasjonskanalen åpen — det er første steg i å bygge et langsiktig kundeforhold.',
      },
      {
        id: 'sp-7-3',
        question: 'Hva er den beste måten å spørre om kundetilfredshet etter et salg?',
        choices: [
          { id: 'a', text: 'Aldri — det er påtrengende' },
          { id: 'b', text: 'En kort, åpen samtale eller enkel undersøkelse som lar kunden dele sin erfaring uten press' },
          { id: 'c', text: 'En lang detaljert spørreundersøkelse' },
          { id: 'd', text: 'Be dem gi 5 stjerner på Google umiddelbart' },
        ],
        correctId: 'b',
        explanation: 'En enkel, opriktig henvendelse som «Hvordan gikk det med produktet?» viser at du bryr deg og gir verdifull informasjon — uten å presse kunden.',
      },
      {
        id: 'sp-7-4',
        question: 'Hva menes med at «en fornøyd kunde er din beste markedsføring»?',
        choices: [
          { id: 'a', text: 'At kunder driver med gratis reklame' },
          { id: 'b', text: 'At fornøyde kunder anbefaler bedriften til venner — word of mouth er mer troverdig og effektivt enn betalt reklame' },
          { id: 'c', text: 'At kunder jobber for bedriften gratis' },
          { id: 'd', text: 'At man ikke trenger å markedsføre' },
        ],
        correctId: 'b',
        explanation: 'Word of mouth (muntlige anbefalinger) er den mest effektive markedsføringen — folk stoler langt mer på vennens anbefaling enn på en reklame.',
      },
      {
        id: 'sp-7-5',
        question: 'En kunde kjøpte ski i november. Hva er en smart oppfølging i februar?',
        choices: [
          { id: 'a', text: 'Ingen oppfølging er nødvendig etter et salg' },
          { id: 'b', text: 'En personlig melding som spør om skiene fungerer bra og informerer om vinterservice eller vokstips' },
          { id: 'c', text: 'Sende en generell nyhetsbrevkampanje' },
          { id: 'd', text: 'Tilby rabatt på nye ski' },
        ],
        correctId: 'b',
        explanation: 'Relevant, personlig oppfølging på riktig tidspunkt (midt i skivinteren) viser at du husker kunden og bryr deg om opplevelsen deres — det bygger lojalitet.',
      },
    ],
  },
]

export default function SalgsprosessenModule() {
  return (
    <DrawerModule
      moduleCode="MFI1"
      moduleTitle="Salgsprosessen"
      moduleIcon="🤝"
      storageKey="learning-mfi-salgsprosessen"
      completeRoute="/learning/mfi/salgsprosessen/complete"
      phases={PHASES}
      intro="Salgsprosessen er en strukturert fremgangsmåte for å hjelpe en kunde fra første kontakt til kjøp. En profesjonell selger følger disse stegene for å forstå kundens behov og tilby riktig løsning."
      vissteduAt="Forskning viser at 80% av salg skjer etter 5 oppfølginger, men 44% av selgere gir opp etter første avslag."
      espenSier="Tenk på sist du kjøpte noe dyrt. Hvilke spørsmål stilte selgeren deg? Brukte de FAB-metoden uten å vite det?"
      presentationLink={{ route: '/learning/presentations/salg', description: 'Salg — en visuell gjennomgang av salgsprosessen' }}
    />
  )
}
