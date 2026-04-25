import DrawerModule from '../../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '🤝',
    title: 'Trepartssamarbeidet i norsk arbeidsliv',
    quote: 'Den norske modellen er ikke gavmildhet — det er et resultat av at arbeidere og arbeidsgivere lærte at samarbeid lønner seg mer enn kamp.',
    content: 'Trepartssamarbeidet mellom staten, NHO og LO/YS/Akademikerne er grunnmuren i norsk arbeidsliv. Modellen sikrer at de som berøres av spillereglene er med på å lage dem. Gjennombruddet var Hovedavtalen i 1935. Under koronakrisen 2020 ble permitteringsreglene vedtatt på fem arbeidsdager.',
    subpoints: [
      'LO OG NHO: LO med ca. 960 000 medlemmer og NHO med ca. 27 000 medlemsbedrifter er de dominerende partene',
      'STATEN SOM PART: Setter skattenivå, trygdeytelser og arbeidsmarkedspolitikk som påvirker forhandlingsrommet',
      'MODELLENS STYRKE: Norge er blant landene med lavest antall arbeidskonflikter per arbeidstaker',
    ],
    practical: 'Neste gang du leser om et lønnsoppgjør i norske medier, identifiser hvilken av de tre partene som uttaler seg om hva — det gir deg et praktisk innblikk i dynamikken.',
    glossaryTerm: 'Trepartssamarbeid',
    exercises: [
      {
        id: 'as-1-1',
        question: 'Hvem er de tre partene i det norske trepartssamarbeidet?',
        choices: [
          { id: 'a', text: 'Storting, Regjering og Høyesterett' },
          { id: 'b', text: 'Staten, arbeidsgiverorganisasjoner og arbeidstakerorganisasjoner' },
          { id: 'c', text: 'NHO, LO og Finansdepartementet' },
          { id: 'd', text: 'Bedriftene, fagforeningene og domstolene' },
        ],
        correctId: 'b',
        explanation: 'De tre partene er staten (myndighetene), arbeidsgiverorganisasjoner (primært NHO) og arbeidstakerorganisasjoner (primært LO, men også YS og Akademikerne).',
      },
      {
        id: 'as-1-2',
        question: 'Hva var «Hovedavtalen» av 1935?',
        choices: [
          { id: 'a', text: 'Norges første grunnlov om arbeidsrett' },
          { id: 'b', text: 'En historisk overenskomst mellom LO og NAF som etablerte rammene for kollektiv forhandling' },
          { id: 'c', text: 'En avtale om å forby streiker' },
          { id: 'd', text: 'Norges tilslutning til ILO' },
        ],
        correctId: 'b',
        explanation: 'Hovedavtalen av 1935 mellom LO og NAF (forløperen til NHO) var gjennombruddet for norsk trepartssamarbeid — den etablerte rammene for kollektiv forhandling i norsk arbeidsliv.',
      },
      {
        id: 'as-1-3',
        question: 'Hva demonstrerte koronakrisen i 2020 om trepartssamarbeidet?',
        choices: [
          { id: 'a', text: 'At modellen var for treg til å håndtere kriser' },
          { id: 'b', text: 'At permitteringsreglene kunne vedtas på fem arbeidsdager da alle tre parter samarbeidet' },
          { id: 'c', text: 'At staten tok full kontroll uten å konsultere partene' },
          { id: 'd', text: 'At LO og NHO ble enige uten statlig innblanding' },
        ],
        correctId: 'b',
        explanation: 'Under koronakrisen ble nye permitteringsregler forhandlet frem og vedtatt av Stortinget på fem arbeidsdager — mulig fordi alle tre parter satt ved bordet og prioriterte løsning over posisjon.',
      },
      {
        id: 'as-1-4',
        question: 'Hva er en viktig konsekvens av trepartssamarbeidet for arbeidslivet?',
        choices: [
          { id: 'a', text: 'Alle arbeidstakere er automatisk fagorganiserte' },
          { id: 'b', text: 'Høy legitimitet for spillereglene og lavt konfliktnivå' },
          { id: 'c', text: 'Staten bestemmer alle lønninger' },
          { id: 'd', text: 'Fagforeninger kan ikke streike' },
        ],
        correctId: 'b',
        explanation: 'Fordi de berørte partene er med på å lage spillereglene, får regelverket høy legitimitet og etterlevelse — noe som bidrar til Norges lavt konfliktnivå i arbeidslivet.',
      },
      {
        id: 'as-1-5',
        question: 'Hva er NHOs rolle i norsk arbeidsliv?',
        choices: [
          { id: 'a', text: 'NHO representerer fagorganiserte arbeidstakere' },
          { id: 'b', text: 'NHO er statens representant i lønnsforhandlinger' },
          { id: 'c', text: 'NHO er arbeidsgiverorganisasjonen med ca. 27 000 medlemsbedrifter' },
          { id: 'd', text: 'NHO er en uavhengig akademisk institusjon' },
        ],
        correctId: 'c',
        explanation: 'NHO (Næringslivets Hovedorganisasjon) er den dominerende arbeidsgiverorganisasjonen med ca. 27 000 tilknyttede bedrifter — motpart til LO i lønnsforhandlinger.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📋',
    title: 'Arbeidsmiljøloven — sentrale rettigheter og plikter',
    quote: 'Arbeidsmiljøloven er ikke byråkrati — den er resultatet av årevis med kamp for menneskeverdet på arbeidsplassen.',
    content: 'AML fra 2005 gjelder for nesten alle arbeidstakere. Sentrale rettigheter: skriftlig arbeidskontrakt (§ 14-5), maks 40 timer/uke (§ 10-4), vern mot usaklig oppsigelse (§ 15-7), vern mot diskriminering (§ 13-1). Arbeidsgiver plikter fullt forsvarlig arbeidsmiljø og systematisk HMS-arbeid (§ 3-1).',
    subpoints: [
      'SKRIFTLIG KONTRAKT: Skal foreligge senest én måned etter oppstart — krev dette fra dag én',
      'OPPSIGELSENS VERN: Ugyldig hvis ikke saklig begrunnet — «vi liker deg ikke» holder ikke',
      'HMS-PLIKT: Systematisk HMS-arbeid er lovpålagt — Arbeidstilsynet kontrollerer og sanksjonerer',
    ],
    practical: 'Les arbeidsavtalen din nøye — sjekk at den inneholder stillingsbeskrivelse, lønn, arbeidstid, oppsigelsesfrist og tariffavtale. Mangel er ikke uvanlig, og du har rett til å spørre.',
    glossaryTerm: 'Arbeidsmiljoeloven',
    exercises: [
      {
        id: 'as-2-1',
        question: 'Hva sier Arbeidsmiljølovens § 14-5 om arbeidskontrakt?',
        choices: [
          { id: 'a', text: 'Arbeidskontrakt er kun nødvendig for lederstillinger' },
          { id: 'b', text: 'Skriftlig arbeidsavtale skal foreligge senest én måned etter at arbeidsforholdet startet' },
          { id: 'c', text: 'Muntlig avtale er like bindende som skriftlig' },
          { id: 'd', text: 'Arbeidskontrakt er kun nødvendig ved fast ansettelse' },
        ],
        correctId: 'b',
        explanation: 'AML § 14-5 pålegger arbeidsgivere å ha skriftlig arbeidsavtale klar senest én måned etter oppstart. Avtalen skal inneholde stillingens art, lønn, arbeidstid og oppsigelsesfrist.',
      },
      {
        id: 'as-2-2',
        question: 'Hva er maksimal normal arbeidstid per uke etter Arbeidsmiljøloven?',
        choices: [
          { id: 'a', text: '37,5 timer' },
          { id: 'b', text: '40 timer' },
          { id: 'c', text: '45 timer' },
          { id: 'd', text: 'Det er ingen lovregulert grense' },
        ],
        correctId: 'b',
        explanation: 'AML § 10-4 setter maksimal ordinær arbeidstid til 40 timer per uke (37,5 timer for skiftarbeid). Arbeid utover dette er overtid og krever særskilt kompensasjon.',
      },
      {
        id: 'as-2-3',
        question: 'Hva kreves for at en oppsigelse skal være gyldig?',
        choices: [
          { id: 'a', text: 'Arbeidsgiver kan si opp hvem som helst i prøvetiden' },
          { id: 'b', text: 'Oppsigelsen må være saklig begrunnet i virksomhetens eller arbeidstakers forhold' },
          { id: 'c', text: 'Tre advarsler er alltid nødvendig' },
          { id: 'd', text: 'Oppsigelse er alltid gyldig ved fire ukers varsel' },
        ],
        correctId: 'b',
        explanation: 'En oppsigelse er ugyldig dersom den ikke er saklig begrunnet i virksomhetens (nedbemanning) eller arbeidstakers (mislighold) forhold — arbeidstaker kan bestride oppsigelsen i retten.',
      },
      {
        id: 'as-2-4',
        question: 'Hvilken etat håndhever Arbeidsmiljøloven?',
        choices: [
          { id: 'a', text: 'NAV' },
          { id: 'b', text: 'Skatteetaten' },
          { id: 'c', text: 'Arbeidstilsynet' },
          { id: 'd', text: 'Politiet' },
        ],
        correctId: 'c',
        explanation: 'Arbeidstilsynet er tilsynsmyndigheten for Arbeidsmiljøloven — de gjennomfører tilsyn, gir pålegg og kan ilegge bøter ved brudd på arbeidsmiljøregelverket.',
      },
      {
        id: 'as-2-5',
        question: 'Hva innebærer prøvetid etter AML?',
        choices: [
          { id: 'a', text: 'Arbeidsgiver kan si opp arbeidstaker uten grunn i prøvetiden' },
          { id: 'b', text: 'Prøvetid på maks 6 måneder gir noe lavere terskel for oppsigelse, men HMS-plikter og diskrimineringsvern gjelder fra dag én' },
          { id: 'c', text: 'Arbeidstaker kan ikke motta lønn i prøvetiden' },
          { id: 'd', text: 'Prøvetid er ulovlig etter ny AML' },
        ],
        correctId: 'b',
        explanation: 'Prøvetid (maks 6 måneder, § 15-6) gir noe lavere terskel for oppsigelse, men arbeidsgiver er ikke fritatt fra HMS-plikter, forbudet mot diskriminering eller kravet om saklig grunn.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '📜',
    title: 'Tariffavtaler og kollektiv forhandling',
    quote: 'En tariffavtale er arbeidsplassens grunnlov — den setter minimumsstandardene som beskytter alle, også de som ikke er fagorganisert.',
    content: 'En tariffavtale er kollektiv avtale mellom fagforening og arbeidsgiver om lønns- og arbeidsvilkår. Frontfagsmodellen: konkurranseutsatt industri forhandler først og setter normen. Tariffavtaler kan allmenngjøres av Tariffnemda — da gjelder minimumssatsene alle bedrifter i bransjen.',
    subpoints: [
      'FRONTFAGSMODELLEN: Industriforbundet forhandler med Norsk Industri — resultatet er normen for alle andre sektorer',
      'ALLMENNGJØRING: Tariffer kan gjøres obligatoriske for alle bedrifter i bransjen, inkludert uorganiserte',
      'REMA 1000-EKSEMPELET: Tariffavtalen sikrer tillegg for kvelds- og helgearbeid utover loven',
    ],
    practical: 'Finn ut om det er en tariffavtale i bransjen du jobber eller ønsker å jobbe i — gå til LO.no eller Fagforbundet.no og søk på bransjenavn.',
    glossaryTerm: 'Tariffavtale',
    exercises: [
      {
        id: 'as-3-1',
        question: 'Hva er en tariffavtale?',
        choices: [
          { id: 'a', text: 'En individuell arbeidskontrakt mellom ansatt og arbeidsgiver' },
          { id: 'b', text: 'En kollektiv avtale mellom en fagforening og arbeidsgiver/arbeidsgiverforening' },
          { id: 'c', text: 'Et statlig regelverk for minimumslønn' },
          { id: 'd', text: 'En forsikringsordning for ansatte' },
        ],
        correctId: 'b',
        explanation: 'En tariffavtale er en kollektiv avtale forhandlet frem mellom fagforening og arbeidsgiver (eller arbeidsgiverforening) om lønns- og arbeidsvilkår.',
      },
      {
        id: 'as-3-2',
        question: 'Hva er Frontfagsmodellen?',
        choices: [
          { id: 'a', text: 'En modell der offentlig sektor forhandler lønn først' },
          { id: 'b', text: 'En modell der konkurranseutsatt industri forhandler lønn først og setter norm for resten' },
          { id: 'c', text: 'En modell der alle bransjer forhandler samtidig' },
          { id: 'd', text: 'En modell der staten bestemmer lønnsveksten' },
        ],
        correctId: 'b',
        explanation: 'Frontfagsmodellen innebærer at konkurranseutsatt industri (eksportbedrifter) forhandler lønn først. Resultatet setter normen for hva andre sektorer kan forvente — for å bevare norsk konkurransekraft.',
      },
      {
        id: 'as-3-3',
        question: 'Hva betyr allmenngjøring av en tariffavtale?',
        choices: [
          { id: 'a', text: 'At alle arbeidstakere må melde seg inn i fagforeningen' },
          { id: 'b', text: 'At minimumssatsene i tariffavtalen gjelder alle bedrifter i bransjen, også uorganiserte' },
          { id: 'c', text: 'At tariffavtalen publiseres offentlig' },
          { id: 'd', text: 'At staten overtar forhandlingsretten' },
        ],
        correctId: 'b',
        explanation: 'Allmenngjøring gjøres av Tariffnemda og betyr at minimumssatsene i en tariffavtale gjelder alle bedrifter i bransjen — også uorganiserte og utenlandske bedrifter.',
      },
      {
        id: 'as-3-4',
        question: 'Hvem løser tvister om tolkning av tariffavtaler?',
        choices: [
          { id: 'a', text: 'Tingretten' },
          { id: 'b', text: 'Arbeidstilsynet' },
          { id: 'c', text: 'Arbeidsretten' },
          { id: 'd', text: 'NAV' },
        ],
        correctId: 'c',
        explanation: 'Arbeidsretten er en spesialisert domstol for kollektive arbeidsrettstvister — herunder tvister om tolkning av tariffavtaler.',
      },
      {
        id: 'as-3-5',
        question: 'Hvem er dekket av en tariffavtale på en arbeidsplass?',
        choices: [
          { id: 'a', text: 'Kun fagorganiserte ansatte' },
          { id: 'b', text: 'Kun ledere og nøkkelpersonell' },
          { id: 'c', text: 'Alle ansatte på arbeidsplassen, inkludert ikke-fagorganiserte' },
          { id: 'd', text: 'Kun heltidsansatte' },
        ],
        correctId: 'c',
        explanation: 'Tariffavtaler setter minimumsstandarder for hele virksomheten — alle ansatte dekkes, ikke bare de som er fagorganisert. Dette er en viktig styrke ved kollektive avtaler.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '⚖️',
    title: 'Likestilling og diskriminering i arbeidslivet',
    quote: 'Likestilling er ikke bare rettferdig — det er smart. Selskaper som utnytter hele talentbasen sin vinner.',
    content: 'Likestillings- og diskrimineringsloven (2017) forbyr diskriminering på 9 grunnlag, inkludert kjønn, etnisitet, funksjonsnedsettelse og alder. Aktivitetsplikten: bedrifter med over 50 ansatte plikter aktivt å arbeide for likestilling og rapportere om dette. Norges styrekvoteringlov fra 2006 er kopiert av mange land.',
    subpoints: [
      'AKTIVITETSPLIKTEN: Over 50 ansatte — ikke bare å ikke diskriminere, men aktivt arbeide for likestilling',
      'LØNNSGAPET: Ca. 13 % uforklart gap — primært yrkessegregering, ikke diskriminering for identisk arbeid',
      'STYREKVOTERING: 40 % av hvert kjønn i ASA-styrer fra 2006 — en norsk innovasjon kopiert av EU',
    ],
    practical: 'Se om din fremtidige arbeidsgiver publiserer lønnsstatistikk fordelt på kjønn i årsrapporten — mangel på åpenhet er et signal om prioriteringer.',
    exercises: [
      {
        id: 'as-4-1',
        question: 'Hva er aktivitetsplikten i norsk likestillingslovgivning?',
        choices: [
          { id: 'a', text: 'Alle ansatte må delta i likestillingsopplæring' },
          { id: 'b', text: 'Bedrifter med over 50 ansatte plikter aktivt å arbeide for likestilling og rapportere om det' },
          { id: 'c', text: 'Alle stillingsutlysninger må ha kjønnsnøytrale titler' },
          { id: 'd', text: 'Bedrifter plikter å ha like mange kvinner og menn' },
        ],
        correctId: 'b',
        explanation: 'Aktivitetsplikten betyr at bedrifter med over 50 ansatte ikke bare skal la være å diskriminere — de skal aktivt jobbe for likestilling og rapportere om tiltakene i årsberetningen.',
      },
      {
        id: 'as-4-2',
        question: 'Hva er den primære årsaken til lønnsgapet mellom kvinner og menn i Norge?',
        choices: [
          { id: 'a', text: 'Direkte diskriminering for identisk arbeid' },
          { id: 'b', text: 'Yrkessegregering — kvinner og menn velger ulike yrker med ulikt lønnsnivå' },
          { id: 'c', text: 'Kvinner jobber systematisk mindre enn menn' },
          { id: 'd', text: 'Kvinner har lavere utdanning' },
        ],
        correctId: 'b',
        explanation: 'Hoveddelen av lønnsgapet (ca. 13 %) skyldes yrkessegregering — kvinner og menn velger ulike yrker som er ulikt lønnet — og ulikt fordelt ubetalt omsorgsarbeid.',
      },
      {
        id: 'as-4-3',
        question: 'Hva kravene til kjønnsrepresentasjon i ASA-styrer?',
        choices: [
          { id: 'a', text: '50 % kvinner i alle styrer' },
          { id: 'b', text: 'Minst 40 % representasjon av hvert kjønn' },
          { id: 'c', text: 'Minst én representant av hvert kjønn' },
          { id: 'd', text: 'Det er ingen lovkrav i Norge' },
        ],
        correctId: 'b',
        explanation: 'Norsk lov krever minst 40 % representasjon av hvert kjønn i styrer for aksjeselskaper allmennaksjeselskaper (ASA). Loven ble innført i 2006 og er siden kopiert av EU og mange land.',
      },
      {
        id: 'as-4-4',
        question: 'På hvilke grunnlag forbyr Likestillings- og diskrimineringsloven diskriminering?',
        choices: [
          { id: 'a', text: 'Kun kjønn og etnisitet' },
          { id: 'b', text: '9 grunnlag, inkludert kjønn, etnisitet, religion, funksjonsnedsettelse og alder' },
          { id: 'c', text: 'Kun synlige karakteristikker som kjønn og alder' },
          { id: 'd', text: 'Alle diskrimineringsformer er forbudt uten spesifiserte grunnlag' },
        ],
        correctId: 'b',
        explanation: 'Loven forbyr diskriminering på 9 grunnlag: kjønn, graviditet, foreldrepermisjon, omsorgsoppgaver, etnisitet, religion/livssyn, funksjonsnedsettelse, seksuell orientering og alder.',
      },
      {
        id: 'as-4-5',
        question: 'Hva viser Schibsteds publisering av kjønnsfordelt lønnsstatistikk?',
        choices: [
          { id: 'a', text: 'At de har løst likestillingsproblemet' },
          { id: 'b', text: 'En praksis for åpenhet som kan brukes som bransjestatus quo for andre' },
          { id: 'c', text: 'At de er pålagt dette av Arbeidstilsynet' },
          { id: 'd', text: 'At alle norske bedrifter gjør det samme' },
        ],
        correctId: 'b',
        explanation: 'Schibsteds offentliggjøring av detaljerte lønnsstatistikker fordelt på kjønn og stilling er et frivillig transparenstiltak som viser at de tar likestillingsarbeidet seriøst.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '🤖',
    title: 'Fremtidens arbeidsliv — digitalisering og AI',
    quote: 'Automatisering tar ikke jobber — det tar oppgaver. Jobben er å utvikle seg raskere enn oppgavene forsvinner.',
    content: 'Digitalisering og AI endrer arbeidslivet fundamentalt. Rutinejobber med høy forutsigbarhet er mest eksponert. Plattformøkonomien (Wolt, Uber) utfordrer tradisjonelle ansettelsesmodeller. Norsk Høyesterett slo i 2023 fast at plattformarbeidere kan være arbeidstakere med fulle rettigheter.',
    subpoints: [
      'AUTOMATISERINGSRISIKO: SSB anslår ca. 33 % av norske jobber er i høy risiko innen 2030',
      'PLATTFORMØKONOMIEN: Høyesterett slo fast at sjåfører for en norsk plattform var arbeidstakere i 2023',
      'OMSTILLINGSKOMPETANSE: Livslang læring er ikke et valg — norske bedrifter investerer mer enn noensinne',
    ],
    practical: 'Se på dine tre primære ønskede arbeidsoppgaver og vurder hvilke som kan automatiseres — det hjelper deg å identifisere hvilken kompetanse som er verdt å investere i.',
    exercises: [
      {
        id: 'as-5-1',
        question: 'Hvilke typer jobber er mest utsatt for automatisering?',
        choices: [
          { id: 'a', text: 'Jobber som krever menneskelig empati og kreativitet' },
          { id: 'b', text: 'Rutinejobber med høy forutsigbarhet — kassearbeid, dataregistrering, standardisert regnskap' },
          { id: 'c', text: 'Jobber i utdanningssektoren' },
          { id: 'd', text: 'Alle jobber er like utsatt' },
        ],
        correctId: 'b',
        explanation: 'Rutinejobber med høy forutsigbarhet er mest utsatt for automatisering. Jobber som krever menneskelig dømmekraft, kreativitet og empati er minst utsatt på kort sikt.',
      },
      {
        id: 'as-5-2',
        question: 'Hva er plattformøkonomien?',
        choices: [
          { id: 'a', text: 'Den tradisjonelle arbeidsmodellen med faste ansettelser' },
          { id: 'b', text: 'En økonomi der digitale plattformer (som Wolt og Uber) kobler tilbud og etterspørsel uten faste ansettelsesforhold' },
          { id: 'c', text: 'En statlig arbeidsmarkedsmodell' },
          { id: 'd', text: 'Handel via e-handelsplattformer' },
        ],
        correctId: 'b',
        explanation: 'Plattformøkonomien eller «gig-economy» er arbeidsmodeller der plattformer som Wolt, Uber og Airbnb kobler tilbud og etterspørsel — ofte uten tradisjonelle arbeidstakerrettigheter.',
      },
      {
        id: 'as-5-3',
        question: 'Hva fastslo norsk Høyesterett i 2023 om plattformarbeidere?',
        choices: [
          { id: 'a', text: 'At plattformarbeidere er selvstendige næringsdrivende uten arbeidstakerrettigheter' },
          { id: 'b', text: 'At sjåfører for en bestemt norsk plattform var arbeidstakere med fulle rettigheter' },
          { id: 'c', text: 'At plattformøkonomien er forbudt i Norge' },
          { id: 'd', text: 'At arbeidsmiljøloven ikke gjelder for plattformarbeid' },
        ],
        correctId: 'b',
        explanation: 'Høyesterett slo i 2023 fast at sjåfører for en bestemt norsk plattform var arbeidstakere — et gjennombrudd for gig-arbeideres rettigheter som utfordrer plattformenes forretningsmodell.',
      },
      {
        id: 'as-5-4',
        question: 'Hva er «flexicurity»?',
        choices: [
          { id: 'a', text: 'Fleksible arbeidstider uten fast arbeidssted' },
          { id: 'b', text: 'En kombinasjon av fleksibelt arbeidsmarked og sjenerøse velferdsytelser — den norske modellen' },
          { id: 'c', text: 'Et system for fjernarbeid' },
          { id: 'd', text: 'Deltidsarbeid som en rettighet' },
        ],
        correctId: 'b',
        explanation: 'Flexicurity kombinerer et relativt fleksibelt arbeidsmarked (bedrifter kan justere bemanning) med sjenerøse velferdsytelser (dagpenger, omskolering) — den norske modellen anses som blant de beste implementeringene.',
      },
      {
        id: 'as-5-5',
        question: 'Hva er den viktigste kompetansen for fremtidens arbeidsliv?',
        choices: [
          { id: 'a', text: 'Spesialisert ekspertkunnskap innenfor ett smalt felt' },
          { id: 'b', text: 'Evne til livslang læring og omstilling' },
          { id: 'c', text: 'Programmeringsferdigheter er alt som teller' },
          { id: 'd', text: 'Fysisk styrke og manuell dyktighet' },
        ],
        correctId: 'b',
        explanation: 'I en tid der jobber og oppgaver endres raskt, er evnen til livslang læring og omstilling den viktigste kompetansen — å holde seg relevant ved å kontinuerlig oppdatere sin fagkunnskap.',
      },
    ],
  },
];

export default function ArbeidslivetsSpillereglerModule() {
  return (
    <DrawerModule
      moduleCode="KK-VG2-5"
      moduleTitle="Arbeidslivets spilleregler"
      moduleIcon="📜"
      storageKey="learning-vg2-arbeidslivets-spilleregler"
      completeRoute="/learning/vg2/okonomi/arbeidslivets-spilleregler/complete"
      phases={phases}
      intro="Det norske arbeidslivet er bygget på et unikt fundament av lover, avtaler og samarbeidsrelasjoner. Resultatet er et arbeidsliv med lav konfliktnivå, høy produktivitet og sterk sosial trygghet — men det krever at alle parter kjenner spillereglene."
      vissteduAt="Norge topper konsekvent internasjonale rangeringer for arbeidstakertilfredshet og er blant landene med høyest sysselsetting (over 75 % av befolkningen i arbeidsfør alder er i jobb). Det norske systemet kalles internasjonalt «flexicurity»."
      espenSier="Mange unge tror at kunnskap om arbeidsrett og fagorganisering er for «kjedelige folk». Det er en kostbar misforståelse. Jeg har sett gode folk bli utnyttet fordi de ikke kjente rettighetene sine."
      presentationLink={{ route: '/learning/presentations/partene-arbeidslivet', description: 'Partene i arbeidslivet — en visuell gjennomgang av den norske modellen' }}
    />
  );
}
