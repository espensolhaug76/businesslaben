import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🚑',
    title: 'Hvorfor livreddende førstehjelp er din oppgave',
    quote: '"De første minuttene er avgjørende — ambulansen er på vei, men du er allerede der."',
    content: 'Fagarbeidere i salg, service og reiseliv møter gjester og kunder daglig. Statistisk vil de fleste oppleve en alvorlig hendelse i løpet av karrieren. Hjertestans, besvimelse, fall og forbrenning er ikke uvanlig på hoteller, butikker eller restauranter. Grunnregelen er enkel: jo raskere riktig førstehjelp gis, jo bedre er overlevelsessjansen.',
    subpoints: [
      { label: 'Innen 2 minutter', text: 'er sjansen for overlevelse ved hjertestans over 90 % med tidlig HLR' },
      { label: 'For hvert minutt uten HLR', text: 'synker sjansen med ca. 10 % — etter 10 minutter er den minimal' },
      { label: 'Ambulansetid i Norge', text: 'er gjennomsnittlig 8–12 minutter i byer, lengre i distriktene' },
      { label: 'Alle på arbeidsplassen', text: 'bør kjenne BLÅ-koden og hvor hjertestarteren henger' },
    ],
    practical: 'Finn ut nå: Vet du hvor nærmeste hjertestarter er på arbeidsplassen din? Spør lederen din om det finnes en beredskapsplan for medisinske nødsituasjoner.',
    exercises: [
      {
        id: 'fa1-1',
        icon: '🎯',
        title: 'Vurder situasjonen',
        question: 'En gjest faller bevisstløs i lobbyen. Hva er det aller første du gjør?',
        choices: [
          { id: 'a', label: 'Ringer 113 umiddelbart uten å sjekke gjesten', isCorrect: false, feedback: 'Du bør alltid sjekke om personen er bevisst og puster før du ringer — 20 sekunder tar det.' },
          { id: 'b', label: 'Sjekker bevisstheten (BLÅ), deretter varsler 113 og starter HLR', isCorrect: true, feedback: 'Riktig! BLÅ-sjekk, varsle og gi førstehjelp er rekkefølgen.' },
          { id: 'c', label: 'Venter på leder fordi du er usikker', isCorrect: false, feedback: 'Å vente kan koste personen livet. Alle har hjelpeplikt.' },
          { id: 'd', label: 'Ber gjesten ligge stille og ikke bevege seg', isCorrect: false, feedback: 'En bevisstløs person kan ikke følge instruksjoner. Du må handle.' },
        ],
        espenTip: 'Husk: "Se, sjekk, varsle, hjelp" — fire ord som gir deg en mental huskeliste i stressede situasjoner.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔵',
    title: 'BLÅ-koden — din raske bevissthetsvurdering',
    quote: '"BLÅ er huske-verktøyet som forteller deg hva som haster mest."',
    content: 'BLÅ-koden er en strukturert vurdering i tre trinn som gjennomføres på sekunder. Den gir deg informasjonen du trenger for å prioritere riktig tiltak og informere 113-operatøren nøyaktig om tilstanden til den skadede.',
    subpoints: [
      { label: 'B — Bevissthet', text: 'Rist forsiktig i skuldrene og si høyt: "Hva er det du heter?" Responderer vedkommende?' },
      { label: 'L — Luftveier', text: 'Bøy hodet bakover og løft haken. Dette hindrer tungen i å blokkere luftveiene' },
      { label: 'Å — Åndedrett', text: 'Se, hør og kjenn etter pust i 10 sekunder. Puster normalt = stabil sideleie. Puster ikke = HLR' },
      { label: 'Stabil sideleie', text: 'Bevisstløs men pustende? Legg i sideleie for å sikre frie luftveier' },
    ],
    practical: 'Øv deg i hodet: Du finner noen bevisstløs. Gå gjennom BLÅ mentalt — hva gjør du ved hvert steg? Prøv å gjøre det på under 15 sekunder.',
    exercises: [
      {
        id: 'fa2-1',
        icon: '🔵',
        title: 'BLÅ-koden i rekkefølge',
        question: 'Hva betyr "Å" i BLÅ-koden?',
        choices: [
          { id: 'a', label: 'Åpne øynene til den skadede', isCorrect: false, feedback: '"Å" handler om deg, ikke den skadede — du sjekker åndedrettet.' },
          { id: 'b', label: 'Årsaken til ulykken', isCorrect: false, feedback: 'Årsaken er viktig for rapportering, men ikke del av BLÅ-koden.' },
          { id: 'c', label: 'Åndedrett — sjekk om personen puster', isCorrect: true, feedback: 'Riktig! Se, hør og kjenn etter pust i 10 sekunder.' },
          { id: 'd', label: 'Åpne luftveiene ved å bøye hodet', isCorrect: false, feedback: '"L — Luftveier" dekker det. "Å" er selve sjekken av om de puster.' },
        ],
        espenTip: 'BLÅ = Bevissthet, Luftveier, Åndedrett. Husk dette som "blu" — blå som fargen på oksygen og ambulansen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '❤️',
    title: 'HLR — hjerte- og lungeredning',
    quote: '"30 kompresjoner, 2 innblåsninger — og gjenta til hjelpen kommer."',
    content: 'Hjerte- og lungeredning (HLR) holder blodsirkulasjonen i gang når hjertet har stanset. Metoden er internasjonalt standardisert til 30:2-forholdet, og du kan gjøre det riktig nok selv uten opplæring bare ved å følge grunnreglene. Norsk Resuscitasjonsråd (NRR) oppdaterer retningslinjene jevnlig.',
    subpoints: [
      { label: 'Plassering', text: 'Hendene legges midt på brystkassen — to fingrer over brystbenet' },
      { label: '30 kompresjoner', text: 'Press ned 5–6 cm med rett arm og full kroppsvekt, ca. 100 slag per minutt' },
      { label: '2 innblåsninger', text: 'Lukk neseboren, pust inn i munnen til brystet hever seg' },
      { label: 'Bytt utøver', text: 'Skift person etter 2 minutter — HLR er fysisk krevende og kvaliteten faller raskt' },
    ],
    practical: 'Øv på en pute: Press ned med rett arm 30 ganger i riktig tempo. Tell høyt. Kjenner du at 100 slag per minutt er raskere enn du trodde?',
    exercises: [
      {
        id: 'fa3-1',
        icon: '❤️',
        title: 'HLR-forholdet',
        question: 'Hva er det korrekte forholdet mellom brystkompresjoner og innblåsninger i HLR?',
        choices: [
          { id: 'a', label: '15 kompresjoner og 1 innblåsning', isCorrect: false, feedback: 'Det eldre 15:1-forholdet er ikke lenger standard. NRR anbefaler 30:2.' },
          { id: 'b', label: '30 kompresjoner og 2 innblåsninger', isCorrect: true, feedback: 'Riktig! 30:2 er den internasjonale standarden anbefalt av NRR.' },
          { id: 'c', label: '10 kompresjoner og 1 innblåsning', isCorrect: false, feedback: 'Dette er verken standard eller effektivt — blodsirkulasjonen ivaretas ikke tilstrekkelig.' },
          { id: 'd', label: '20 kompresjoner og 4 innblåsninger', isCorrect: false, feedback: 'Ikke standard. Hold deg til 30:2.' },
        ],
        espenTip: 'Husk: "30 ned, 2 inn" — si det som en mantra når du utfører HLR. Det holder deg i riktig rytme.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⚡',
    title: 'Hjertestarter (AED) — maskinen som analyserer selv',
    quote: '"Hjertestarteren er idiotsikker — den gir støt bare hvis det er nødvendig."',
    content: 'En hjertestarter (AED — Automated External Defibrillator) er utviklet for å brukes av alle, ikke bare helsepersonell. Apparatet gir tydelige stemme- og bildeinstruksjoner. Det analyserer hjerterytmen automatisk og gir kun støt hvis det er medisinsk nødvendig. Å bruke en hjertestarter er aldri farlig for den som hjelper.',
    subpoints: [
      { label: 'Slå på', text: 'Åpne lokket — mange starter automatisk. Følg lydanvisningene' },
      { label: 'Fest elektrodene', text: 'Plasser plasterelektrodene som vist på bildene på apparatet' },
      { label: 'Analyser', text: 'Hold alle unna — apparatet analyserer hjerterytme automatisk' },
      { label: 'Støt eller ikke', text: 'Maskinen bestemmer. Følg instruksjonene og fortsett HLR mellom støtene' },
    ],
    practical: 'Sjekk: Vet du hva AED-symbolet ser ut som? Det er et hjerte med en lynnedslag og en grønn pil. Gå nå og finn nærmeste AED på arbeids- eller læringssted.',
    exercises: [
      {
        id: 'fa4-1',
        icon: '⚡',
        title: 'Hjertestarter — hvem bestemmer støtet?',
        question: 'Du setter på en hjertestarter på en bevisstløs gjest. Hvem bestemmer om støt skal gis?',
        choices: [
          { id: 'a', label: 'Du bestemmer basert på hva 113-operatøren sier', isCorrect: false, feedback: 'Du trenger ikke å bestemme — det er hjertestarterens jobb.' },
          { id: 'b', label: 'Hjertestarteren analyserer automatisk og bestemmer', isCorrect: true, feedback: 'Riktig! AED analyserer hjerterytmen og gir kun støt om nødvendig.' },
          { id: 'c', label: 'Du trykker på støt-knappen uavhengig av situasjon', isCorrect: false, feedback: 'Du trykker KUN når maskinen sier det er nødvendig og ber deg gjøre det.' },
          { id: 'd', label: 'Du venter til lege ankommer', isCorrect: false, feedback: 'Ikke vent. Bruk hjertestarteren med en gang — hvert minutt teller.' },
        ],
        espenTip: 'AED = Automated = automatisert. Maskinen er smarter enn deg i dette øyeblikket — stol på den og følg instruksjonene.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📋',
    title: 'Skadestedsledelse — varsle, sikre, hjelp',
    quote: '"En leder på skadestedet redder liv — ikke ved å gjøre alt selv, men ved å koordinere."',
    content: 'Ved store ulykker eller nødsituasjoner er det avgjørende at noen inntar rollen som skadestedsleder. Dette handler ikke om rang — det er den første personen på stedet som tar ansvar. Tre enkle handlinger i riktig rekkefølge: Varsle, Sikre, Gi førstehjelp.',
    subpoints: [
      { label: 'Varsle (113)', text: 'Ring umiddelbart. Gi adressen, beskriv situasjonen, oppgi ditt navn. Legg IKKE på før operatøren sier det' },
      { label: 'Sikre stedet', text: 'Hindre at ulykken eskalerer. Er det trafikk? Brannfare? Send noen ut for å stoppe trafikken' },
      { label: 'Gi førstehjelp', text: 'Prioriter de alvorligst skadede. Delegér oppgaver: "Du henter hjertestarteren", "Du tar mot ambulansen"' },
      { label: 'Pek på spesifikke personer', text: 'Si "DU med den røde jakken — ring 113" — ikke "noen ring 113". Diffust ansvar = ingen handler' },
    ],
    practical: 'Øv deg i hodet: Du er resepsjonist. En gjest faller bevisstløs i lobbyen. Hvem peker du på? Hva sier du nøyaktig? Hva gjør du selv?',
    exercises: [
      {
        id: 'fa5-1',
        icon: '📋',
        title: 'Riktig rekkefølge på skadestedet',
        question: 'Hva er riktig prioriteringsrekkefølge på et skadested?',
        choices: [
          { id: 'a', label: 'Gi førstehjelp → Varsle 113 → Sikre stedet', isCorrect: false, feedback: 'Å gi førstehjelp først kan bety at hjelpen ikke varsles i det hele tatt hvis situasjonen forverres.' },
          { id: 'b', label: 'Sikre stedet → Varsle 113 → Gi førstehjelp', isCorrect: false, feedback: 'Nær riktig, men varsling bør skje parallelt med sikring eller umiddelbart etter.' },
          { id: 'c', label: 'Varsle 113 → Sikre stedet → Gi førstehjelp', isCorrect: true, feedback: 'Riktig rekkefølge. 113 varsles alltid først, så sikres stedet, deretter førstehjelp.' },
          { id: 'd', label: 'Finn nærmeste leder → Varsle internt → Varsle 113', isCorrect: false, feedback: 'Ikke vent på leder. Du har hjelpeplikt og 113 varsles direkte.' },
        ],
        espenTip: 'Husk: "Varsle – Sikre – Hjelp". Lik rekkefølge som brannvern: "Varsle – Redde – Slokke". Livreddende tjenester bruker alltid varsling som første steg.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '🏨',
    title: 'Radisson Blu-eksemplet — å lede et skadested',
    quote: '"Pek på én person om gangen. Diffust ansvar er ingenansvars."',
    content: 'En resepsjonslærling på Radisson Blu er på jobb en ettermiddag når en middelaldrende gjest plutselig ramler av stolen i lobbyen og blir liggende stille. Resepsjonslærlingen er den første til å reagere.',
    subpoints: [
      { label: 'Steg 1', text: 'Lærlingen løper bort, roper på gjesten, får ikke svar → bevisstløs' },
      { label: 'Steg 2', text: 'Roper til hotelltelefonisten: "Kari, ring 113 NÅ — en gjest er bevisstløs!" (peker på spesifikk person)' },
      { label: 'Steg 3', text: 'Roper til vaktmester: "Johan, hent hjertestarteren i gangen — gul kasse!" (delegerer konkret oppgave)' },
      { label: 'Steg 4', text: 'Bøyer hodet bakover (fri luftvei), sjekker pust — ingen pust → starter HLR 30:2' },
      { label: 'Steg 5', text: 'Holder på til ambulansen ankommer 8 minutter senere. Gjesten overlever.' },
    ],
    practical: 'Diskuter: Hva ville skjedd om lærlingen hadde ropt til alle: "Noen ring 113"? Hva er den psykologiske grunnen til at diffust ansvar fører til handlingslammelse?',
    exercises: [
      {
        id: 'fa6-1',
        icon: '🏨',
        title: 'Lærdom fra Radisson Blu',
        question: 'Hva er den viktigste læreplanen fra Radisson Blu-eksemplet?',
        choices: [
          { id: 'a', label: 'At hotellansatte alltid bør ha medisinsk utdanning', isCorrect: false, feedback: 'Medisinsk utdanning er ikke nødvendig — grunnleggende HLR og koordinering er nok.' },
          { id: 'b', label: 'At man skal peke på spesifikke personer for å sikre at oppgaver utføres', isCorrect: true, feedback: 'Riktig! Å peke på én spesifikk person eliminerer "bystander effect" — alle tror noen andre tar ansvar.' },
          { id: 'c', label: 'At lærlingen skulle ha ventet på hotelldirektøren', isCorrect: false, feedback: 'Å vente koster liv. Alle har hjelpeplikt uavhengig av stilling.' },
          { id: 'd', label: 'At hjertestarteren alltid er i resepsjonen', isCorrect: false, feedback: 'AED kan henge mange steder. Poenget er at noen delegeres til å hente den.' },
        ],
        espenTip: '"Bystander effect" — jo flere som er til stede, jo mindre sannsynlig er det at noen handler, fordi alle tror de andre tar ansvar. Løsningen: pek på én person.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🔄',
    title: 'Stabil sideleie og bevissthetsvurdering',
    quote: '"Bevisstløs men pustende? Sideleie sikrer at personen ikke kvelnes."',
    content: 'Ikke alle nødsituasjoner krever HLR. En person som er bevisstløs men puster normalt, trenger stabil sideleie — ikke hjerte-lungeredning. Dette er en av de vanligste feilene i førstehjelp: å starte HLR på noen som faktisk puster.',
    subpoints: [
      { label: 'Sjekk først', text: 'Bevissthet (BLÅ-kode) og åndedrett før du gjør noe' },
      { label: 'Stabil sideleie', text: 'Bøy det øverste benet, trekk arm mot deg og vipp forsiktig. Hodet bakover for fri luftvei' },
      { label: 'Hvorfor sideleie?', text: 'Hindrer at oppkast eller blod blokkerer luftveiene — redder liv' },
      { label: 'Overvåk', text: 'Bli hos personen. Ring 113 hvis du er usikker. Kontroller pust regelmessig til hjelpen ankommer' },
    ],
    practical: 'Huskeregel: BLÅ → puster = sideleie. BLÅ → puster ikke = HLR. Øv dette skillet til det sitter.',
    exercises: [
      {
        id: 'fa7-1',
        icon: '🔄',
        title: 'Sideleie eller HLR?',
        question: 'En person er bevisstløs og du hører normal pusting. Hva gjør du?',
        choices: [
          { id: 'a', label: 'Starter umiddelbart HLR for sikkerhets skyld', isCorrect: false, feedback: 'HLR på en pustende person kan forstyrre hjertets normale rytme. Sjekk alltid pust først!' },
          { id: 'b', label: 'Lar personen ligge på ryggen og venter', isCorrect: false, feedback: 'Å la en bevisstløs person ligge på ryggen er farlig — oppkast kan blokkere luftveiene.' },
          { id: 'c', label: 'Legger personen i stabil sideleie og ringer 113', isCorrect: true, feedback: 'Riktig! Sideleie sikrer frie luftveier, og 113 varsles for videre oppfølging.' },
          { id: 'd', label: 'Prøver å vekke personen med kaldtvann', isCorrect: false, feedback: 'Ikke korrekt protokoll. Sjekk BLÅ og legg i sideleie.' },
        ],
        espenTip: 'Puster → sideleie. Puster ikke → HLR. To situasjoner, to tydelige tiltak. Husk dette skillet.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Vanlig misforståelse — frykten for å gjøre noe feil',
    quote: '"Et brukket ribbein etter HLR er mye bedre enn å dø av hjertestans."',
    content: 'Den vanligste årsaken til at folk ikke starter HLR er frykt: for å skade personen, for å gjøre noe feil, for at det er legens jobb. Norsk førstehjelpsopplæring er tydelig: å gjøre noe er alltid bedre enn ingenting når personen ikke puster. Gjeldende retningslinjer fra NRR aksepterer at brystkompresjonene kan brekke ribbein — personen overlever det. Hjertestans overlever man ikke uten hjelp.',
    subpoints: [
      { label: 'Myte 1', text: '"Jeg kan brekke et ribbein." Svar: Ja, det kan skje. Personen overlever det.' },
      { label: 'Myte 2', text: '"Jeg er ikke opplært." Svar: 113-operatøren leder deg steg for steg over telefon' },
      { label: 'Myte 3', text: '"Det er legens ansvar." Svar: Straffeloven gir deg hjelpeplikt uavhengig av yrke' },
      { label: 'Myte 4', text: '"Hjertestarteren kan gi meg støt." Svar: AED gir kun støt til personen, aldri til den som hjelper' },
    ],
    practical: 'Refleksjon: Hva er din største frykt knyttet til å gi førstehjelp? Diskuter dette i klassen. Å erkjenne frykten er første steg mot å overvinne den.',
    exercises: [
      {
        id: 'fa8-1',
        icon: '🚫',
        title: 'Riktig respons på passivitet',
        question: 'En kollega sier: "Jeg tør ikke gi HLR fordi jeg ikke er opplært." Hva er det beste svaret?',
        choices: [
          { id: 'a', label: '"Da er det best å vente på ambulansen."', isCorrect: false, feedback: 'Å vente uten handling reduserer sjansen for overlevelse drastisk.' },
          { id: 'b', label: '"113-operatøren vil guide deg steg for steg — du trenger ikke kunne det fra før."', isCorrect: true, feedback: 'Riktig! 113 tilbyr sanntidsveiledning. Ingen trenger å kunne det perfekt på forhånd.' },
          { id: 'c', label: '"Bare start hjertestarter, du trenger ikke røre personen."', isCorrect: false, feedback: 'HLR og hjertestarter jobber sammen — AED erstatter ikke HLR.' },
          { id: 'd', label: '"Du har rett, det er best å la profesjonelle ta seg av det."', isCorrect: false, feedback: 'Dette er den misforståelsen vi bekjemper. Alle har hjelpeplikt.' },
        ],
        espenTip: '113-operatøren er trent til å veilede ikke-medisinsk personell. Du er aldri alene — bare ring, og de guider deg.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '⚖️',
    title: 'Lovverk — hjelpeplikt og NRR-retningslinjer',
    quote: '"Straffeloven gjør det til en plikt å hjelpe — ikke bare en god gjerning."',
    content: 'I Norge er det ikke frivillig å la være å hjelpe ved alvorlige ulykker. Straffeloven § 287 pålegger enhver borger en alminnelig hjelpeplikt. Norsk Resuscitasjonsråd (NRR) er fagmyndigheten som fastsetter og oppdaterer retningslinjene for HLR og førstehjelp i tråd med internasjonal forskning.',
    subpoints: [
      { label: 'Straffeloven § 287', text: 'Den som unnlater å hjelpe noen som er i åpenbar fare for livet, kan straffes med bøter eller fengsel inntil 6 måneder' },
      { label: 'NRR-retningslinjene', text: 'Norsk Resuscitasjonsråd oppdaterer HLR-standarden hvert 5. år basert på internasjonal forskning' },
      { label: 'Ansvarsfrihet', text: 'Den som gir førstehjelp etter beste evne, er beskyttet mot ansvar selv om utfallet er negativt' },
      { label: '113.no', text: 'Registrerer alle hjertestarterlokasjoner i Norge — nyttig for arbeidsplasser' },
    ],
    practical: 'Sjekk: Er arbeidsplassen din registrert på 113.no med hjertestarter-lokasjon? Hvis ikke, kan du foreslå det til leder.',
    exercises: [
      {
        id: 'fa9-1',
        icon: '⚖️',
        title: 'Hjelpeplikten',
        question: 'Kan en ansatt i salg og service juridisk sett velge å ikke hjelpe ved en livstruende situasjon på jobb?',
        choices: [
          { id: 'a', label: 'Ja, hjelpeplikt gjelder bare for helsepersonell', isCorrect: false, feedback: 'Feil. Straffeloven § 287 gjelder for alle borgere, uavhengig av yrke.' },
          { id: 'b', label: 'Ja, men bare hvis man er under opplæring', isCorrect: false, feedback: 'Ingen unntak for lærlinger eller uerfarne. Hjelpeplikten gjelder alle.' },
          { id: 'c', label: 'Nei, Straffeloven § 287 pålegger alle en alminnelig hjelpeplikt', isCorrect: true, feedback: 'Riktig! Å unnlate å hjelpe er straffbart. Og husk: 113 veileder deg.' },
          { id: 'd', label: 'Ja, hvis man ikke har HLR-kurs', isCorrect: false, feedback: 'Mangel på formell opplæring er ikke et unntak fra hjelpeplikten.' },
        ],
        espenTip: 'Hjelpeplikt = moralsk og juridisk forpliktelse. Du behøver ikke gjøre det perfekt — du plikter å prøve og ringe 113.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — du kan redde et liv',
    quote: '"Kunnskap uten handling er ingenting. Handling uten kunnskap er farlig. Kunnskap med handling redder liv."',
    content: 'Du har nå lært de viktigste prinsippene for livreddende førstehjelp i arbeidslivet. Disse ferdighetene skiller seg fra de fleste fagkunnskaper: de kan brukes direkte, uten utstyr, på sekunder — og kan bokstavelig talt redde et menneskeliv.',
    subpoints: [
      { label: 'BLÅ-koden', text: 'Bevissthet, Luftveier, Åndedrett — vurder alltid dette først' },
      { label: 'HLR', text: '30 kompresjoner og 2 innblåsninger — hold på til ambulansen ankommer' },
      { label: 'AED', text: 'Bruk hjertestarteren uten frykt — den gir støt kun når det er riktig' },
      { label: 'Skadestedsledelse', text: 'Varsle → Sikre → Hjelp. Pek på spesifikke personer for konkrete oppgaver' },
      { label: 'Hjelpeplikt', text: 'Straffeloven § 287 — alle er forpliktet til å hjelpe ved livstruende situasjoner' },
    ],
    practical: 'Neste steg: Book et HLR-kurs gjennom Røde Kors eller et annet kurssenter. Teoretisk kunnskap er grunnlaget — praktisk øving gjør deg klar.',
    exercises: [
      {
        id: 'fa10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'Du er alene med en bevisstløs gjest på et hotell. Personen puster ikke. Du har tilgang til hjertestarter. Hva er riktig rekkefølge?',
        choices: [
          { id: 'a', label: 'Start HLR → Hent AED → Ring 113', isCorrect: false, feedback: 'Ring 113 tidlig — de kan hjelpe deg med veiledning mens du arbeider.' },
          { id: 'b', label: 'Ring 113 → Start HLR → Bruk AED når den ankommer', isCorrect: true, feedback: 'Riktig! Ring først (113 veileder deg), start HLR, og bruk AED. Ideelt: delegate begge til andre.' },
          { id: 'c', label: 'Hent AED → Bruk AED → Ring 113', isCorrect: false, feedback: 'Ring 113 umiddelbart — forsinkelse kan koste minutter som koster liv.' },
          { id: 'd', label: 'Vent på ambulansen — det er for farlig å starte HLR alene', isCorrect: false, feedback: 'Aldri vent passivt. Hjelpeplikten krever handling, og 113 veileder deg.' },
        ],
        espenTip: 'Beste scenario: Du ringer 113, en kollega henter AED, og du starter HLR. Deleger aktivt — du er skadestedsleder.',
      },
    ],
  },
]

export default function ForstehjelpModule() {
  return (
    <DrawerModule
      moduleCode="HMS-VG2-4"
      moduleTitle="Førstehjelp og skadested"
      moduleIcon="🚑"
      storageKey="learning-vg2-forstehjelp"
      completeRoute="/learning/vg2/hms/forstehjelp/complete"
      phases={phases}
      intro="Livreddende førstehjelp og ansvar på et skadested."
      vissteduAt="Sjansen for å overleve hjertestans dobles hvis HLR startes innen ett minutt og en hjertestarter (AED) brukes innen tre. Hvert minutt uten HLR reduserer overlevelsen med 7–10 %."
      espenSier="Husk «Se, sjekk, varsle, hjelp» — fire ord som gir deg en mental huskeliste i stressede situasjoner. Du trenger ikke være ekspert; du trenger bare å handle. AED-en er smartere enn deg i det øyeblikket — stol på den."
      presentationLink={{ route: '/learning/presentations/forstehjelp', description: 'Livreddende førstehjelp — en visuell presentasjon' }}
    />
  )
}
