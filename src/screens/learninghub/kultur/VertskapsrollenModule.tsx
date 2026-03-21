import DrawerModule from '../shared/DrawerModule'
import type { DrawerPhase } from '../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '🏨',
    title: 'Hva er vertskapsrollen?',
    quote: 'En god vert gjør at gjesten føler seg hjemme — selv om de er et fremmed sted.',
    content:
      'Vertskapsrollen handler om å ta imot og ivareta gjester på en profesjonell og varm måte. I servicenæringen — på hotell, restaurant, turistattraksjon, kafe eller eventlokale — er vertskapet kjernen i jobben. Det handler ikke bare om å servere mat eller tildele et rom, men om å skape en opplevelse der gjesten føler seg sett, velkommen og ivaretatt. Den norske vertskapsrollen er preget av et spesifikt paradoks: vi er kjent for å være hjelpsomme og effektive, men mindre naturlig varm og utadvendt enn for eksempel sørnordmenn eller sydeuropeere. Studier viser at gjester husker servicen lenger enn selve produktet — et godt måltid glemmes raskere enn en server som fikk dem til å le.',
    subpoints: [
      { label: 'VERTSKAPSROLLEN', text: 'Summen av handlinger, holdninger og atferd som gjør at gjesten føler seg velkommen, ivaretatt og sett — fra første til siste kontaktpunkt.' },
      { label: 'OPPLEVELSESØKONOMI', text: 'Pine og Gilmore (1999) viste at kunder i dag kjøper opplevelser, ikke bare produkter og tjenester. Vertskapet er det som skaper den minneverdige opplevelsen.' },
      { label: 'SERVICEMOMENT', text: 'Et hvert møte mellom gjest og ansatt er et "sannhetens øyeblikk" — en mulighet til å gjøre et positivt inntrykk eller en feil som huskes.' },
    ],
    practical:
      'Tenk på en gang du var gjest et sted (restaurant, hotell, arrangement). Hva husker du best — maten/rommet, eller måten du ble møtt på? Diskuter hva som skapte en minneverdig opplevelse.',
    exercises: [
      {
        id: 'vr-1-1',
        question: 'Hva er kjernen i vertskapsrollen?',
        choices: [
          { id: 'a', text: 'Å levere varene eller tjenestene raskt og effektivt' },
          { id: 'b', text: 'Å skape en opplevelse der gjesten føler seg sett, velkommen og ivaretatt' },
          { id: 'c', text: 'Å sørge for at bedriften tjener mest mulig per gjest' },
          { id: 'd', text: 'Å overholde alle lover og regler for serveringsbransjen' },
        ],
        correctId: 'b',
        explanation: 'Vertskapsrollen handler i bunn og grunn om mennesker — å gjøre gjesten trygg, sett og ivaretatt. Effektivitet er viktig, men den menneskelige varmen er det som skaper lojalitet.',
      },
      {
        id: 'vr-1-2',
        question: 'Hva kjennetegner "opplevelsesøkonomien" (Pine og Gilmore)?',
        choices: [
          { id: 'a', text: 'At kunder er mest opptatt av pris og effektivitet' },
          { id: 'b', text: 'At kunder kjøper opplevelser — det minneverdige øyeblikket — ikke bare produkter og tjenester' },
          { id: 'c', text: 'At turisme er den viktigste næringen i verden' },
          { id: 'd', text: 'At alle bedrifter bør tilby digitale opplevelser' },
        ],
        correctId: 'b',
        explanation: 'Pine og Gilmore viste at verdiskaping i moderne økonomi handler om å skape minneverdige opplevelser. Kunder betaler mer for en opplevelse de husker — og forteller om til andre.',
      },
      {
        id: 'vr-1-3',
        question: 'Hva er et "sannhetens øyeblikk" i servicesammenheng?',
        choices: [
          { id: 'a', text: 'Når kunden betaler regningen' },
          { id: 'b', text: 'Hvert møte mellom gjest og ansatt — en mulighet til å gi et godt eller dårlig inntrykk' },
          { id: 'c', text: 'Når ledelsen evaluerer de ansatte' },
          { id: 'd', text: 'Første gang en bedrift annonserer et nytt produkt' },
        ],
        correctId: 'b',
        explanation: '"Sannhetens øyeblikk" (Jan Carlzon, SAS, 1980-tallet) er hvert kontaktpunkt mellom gjest og ansatt. Alle disse øyeblikkene til sammen skaper gjestens totale inntrykk av bedriften.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🤝',
    title: 'Første inntrykk og velkomst',
    quote: 'Du får aldri en ny sjanse til å gjøre et første inntrykk — bruk de første 30 sekundene riktig.',
    content:
      'Forskning viser at vi danner oss et inntrykk av en person eller et sted innen 7 sekunder. I servicebransjen er de første møtene avgjørende: blikkkontakt, et ekte smil, en vennlig hilsen og å gi gjesten din fulle oppmerksomhet signaliserer at du bryr deg. Profesjonell velkomst inkluderer: (1) Aktiv tilstedeværelse — ikke stå med ryggen til eller se ned i telefonen. (2) Øyekontakt og smil — oppriktig, ikke plastikk. (3) Verbal hilsen — bruk gjerne navn om du kjenner det. (4) Kroppsposisjon — vend deg mot gjesten, åpen kroppsstilling. (5) Klargjøre kontekst — hjelp gjesten med å orientere seg. For internasjonale gjester er kulturell bevissthet viktig: i noen kulturer er direkte blikkkontakt uhøflig, i andre forventes håndtrykk.',
    subpoints: [
      { label: '7-SEKUNDERREGELEN', text: 'Første inntrykk dannes innen 7 sekunder basert på utseende, kroppsspråk og de første ordene. Dette er vanskelig å endre etterpå.' },
      { label: 'NON-VERBAL KOMMUNIKASJON', text: 'Over 55% av kommunikasjonsinntrykket skapes gjennom kroppsspråk (Mehrabian). Åpen holdning, smil og øyekontakt er grunnleggende for god velkomst.' },
      { label: 'KULTURELLE VARIASJONER', text: 'Hilsevaner varierer mellom kulturer: noen kulturer forventer håndtrykk, andre bue, noen unngår fysisk kontakt. Tilpass velkomsten til gjestens bakgrunn.' },
    ],
    practical:
      'Rollespill: én person er gjest som ankommer en restaurant, én er vert. Vert A hilser med skjermen ned i telefonen og en halvhjertet nikk. Vert B gir full oppmerksomhet og ekte smil. Diskuter forskjellen.',
    exercises: [
      {
        id: 'vr-2-1',
        question: 'Innen hvor lang tid danner vi oss et første inntrykk av en person?',
        choices: [
          { id: 'a', text: 'Innen 30 minutter' },
          { id: 'b', text: 'Innen 2–3 minutter' },
          { id: 'c', text: 'Innen 7 sekunder' },
          { id: 'd', text: 'Etter den første samtalen er ferdig' },
        ],
        correctId: 'c',
        explanation: 'Forskning viser at første inntrykk dannes innen ca. 7 sekunder, og disse inntrykkene er svært vanskelige å endre etterpå. Professjonell velkomst utnytter disse sekundene bevisst.',
      },
      {
        id: 'vr-2-2',
        question: 'En gjest ankommer resepsjonen. Resepsjonisten er på telefon. Hva bør gjøres?',
        choices: [
          { id: 'a', text: 'Fortsette samtalen — gjesten kan vente' },
          { id: 'b', text: 'Gi gjesten øyekontakt og et nikk/smil for å signalisere at du ser dem, og avslutt samtalen så raskt som mulig' },
          { id: 'c', text: 'Peke på stolene og be gjesten sette seg uten å si noe' },
          { id: 'd', text: 'Ignorere gjesten til samtalen er ferdig' },
        ],
        correctId: 'b',
        explanation: 'Øyekontakt og et anerkjennende nikk signaliserer at gjesten er sett selv om du ikke kan snakke med dem umiddelbart. Dette forhindrer at gjesten føler seg usynlig og uvelkommen.',
      },
      {
        id: 'vr-2-3',
        question: 'En japansk gjest ankommer hotellet. Du vet at i Japan er det vanlig å bue i stedet for å håndhilse. Hva er best praksis?',
        choices: [
          { id: 'a', text: 'Kreve håndtrykk slik skikken er i Norge' },
          { id: 'b', text: 'Vise kulturell bevissthet ved å tilpasse hilsemåten, f.eks. med en lett bue og en vennlig velkomst' },
          { id: 'c', text: 'Unngå all fysisk hilsen ved å kun si "hei"' },
          { id: 'd', text: 'Spørre gjesten hva de foretrekker' },
        ],
        correctId: 'b',
        explanation: 'Kulturell bevissthet i velkomst handler om å vise respekt for gjestens bakgrunn. En lett bue og varm verbal hilsen er et signal om at du ser dem som et individ, ikke en "standard gjest".',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '🎯',
    title: 'Tilpasning til gjestens behov',
    quote: 'Den beste servicen er den gjesten ikke visste de trengte — men som de aldri glemmer.',
    content:
      'Profesjonell vertskapsutøvelse handler om å lese gjesten og tilpasse seg. Ikke alle gjester ønsker mye prat og engasjement — noen foretrekker effektivitet og diskresjon. Å lese kroppsspråk og signaler er en sentral kompetanse: en gjest som ser i telefonen og svarer kortfattet ønsker sannsynligvis ikke smalltalk. En gjest som smiler og stiller spørsmål, er åpen for mer interaksjon. Proaktiv service betyr å forutse behov: se at glasset er nesten tomt, at gjesten ser usikker ut på menyen, eller at en familie med barn trenger en barnesete. FISH-filosofien (Pike Place Fish Market, Seattle) er et kjent eksempel: ansatte som velger å ha det gøy på jobb smitter gjestene — entusiasme er smittsomt.',
    subpoints: [
      { label: 'LESE GJESTEN', text: 'Observere kroppsspråk, stemme og verbale signaler for å forstå om gjesten ønsker mye eller lite interaksjon, hjelp eller autonomi.' },
      { label: 'PROAKTIV SERVICE', text: 'Å forutse gjestens behov BEFORE de spør — gjenfylle vann, tilby hjelp med bagasje, klargjøre barnesete. Overgår forventninger uten å trenge instruks.' },
      { label: 'FISH-FILOSOFIEN', text: 'Vær til stede, lek, gjør andres dag, velg din holdning. Fra Pike Place Fish Market: entusiasme og glede på arbeidsplassen skaper minneverdig service.' },
    ],
    practical:
      'Observer 10 minutter i en kafé eller butikk (enten fysisk eller via video). Identifiser tre eksempler på proaktiv service (der den ansatte forutså et behov) og tre eksempler på reaktiv service (der gjesten måtte be om hjelp).',
    exercises: [
      {
        id: 'vr-3-1',
        question: 'Hva er proaktiv service?',
        choices: [
          { id: 'a', text: 'Å svare raskt når gjesten spør om hjelp' },
          { id: 'b', text: 'Å forutse gjestens behov og handle på dem BEFORE gjesten må spørre' },
          { id: 'c', text: 'Å be gjesten om tilbakemelding etter at de er ferdig' },
          { id: 'd', text: 'Å informere gjesten om alle tilgjengelige produkter og tjenester' },
        ],
        correctId: 'b',
        explanation: 'Proaktiv service betyr å forutse behov — gjenfylle vann før glasset er tomt, tilby regn-paraply i resepsjonen på en regndag, eller ta frem barnesete når du ser en familie med barn.',
      },
      {
        id: 'vr-3-2',
        question: 'En gjest på restaurant svarer kortfattet, ser i telefonen og unngår øyekontakt. Hva signaliserer dette?',
        choices: [
          { id: 'a', text: 'Gjesten er misfornøyd med maten' },
          { id: 'b', text: 'Gjesten ønsker effektiv service med minimal interaksjon — respekter dette og gi diskret hjelp' },
          { id: 'c', text: 'Servitøren bør spørre om gjesten har det bra, mange ganger' },
          { id: 'd', text: 'Gjesten bør ignoreres siden de ikke ønsker kontakt' },
        ],
        correctId: 'b',
        explanation: 'Å lese gjesten inkluderer å respektere at noen foretrekker diskresjon og effektivitet fremfor smalltalk. God service tilpasser seg gjestens preferanser — ikke en forhåndsbestemt mal.',
      },
      {
        id: 'vr-3-3',
        question: 'FISH-filosofien sier at vi skal "velge vår holdning". Hva betyr dette i praksis?',
        choices: [
          { id: 'a', text: 'At man alltid skal late som om man er glad, selv om man ikke er det' },
          { id: 'b', text: 'At man bevisst velger en positiv og engasjert innstilling til jobben og gjestene, uavhengig av ytre omstendigheter' },
          { id: 'c', text: 'At man velger hvilke gjester man ønsker å hjelpe' },
          { id: 'd', text: 'At man skal unngå negative tanker i arbeidstiden' },
        ],
        correctId: 'b',
        explanation: 'FISH-filosofien handler om at holdning er et aktivt valg — du kan ikke alltid velge hva som skjer, men du kan velge hvordan du reagerer. En bevisst positiv holdning smitter over på gjester og kollegaer.',
      },
    ],
  },
]

export default function VertskapsrollenModule() {
  return (
    <DrawerModule
      moduleCode="KS6"
      moduleTitle="Vertskapsrollen"
      moduleIcon="🏨"
      storageKey="learning-kultur-vertskapsrollen"
      completeRoute="/learning/kultur/vertskapsrollen/complete"
      phases={PHASES}
      intro="God service handler ikke om hva du gjør — det handler om hvordan du får gjesten til å føle seg. Vertskapsrollen er servicenæringens hjerte."
      vissteduAt="Studier viser at kunder forteller om dårlig service til i gjennomsnitt 9–15 personer. God service fortelles det videre til 5–8. Vertskapet er din beste markedskanal."
      espenSier="Tenk deg det beste restaurantbesøket du noen gang har hatt. Husker du maten, eller husker du personen som serverte deg? Det er vertskapsrollen."
      presentationLink={{ route: '/learning/presentations/vertskapsrollen', description: 'Vertskapsrollen — en visuell gjennomgang av service og gjestfrihet' }}
    />
  )
}
