import DrawerModule from '../../shared/DrawerModule'
import type { DrawerPhase } from '../../shared/DrawerModule'

export const PHASES: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'Hva er en forretningsplan og hvem er den for?',
    quote: 'Hvis du ikke kan forklare forretningsidéen din på én side, forstår du den ikke godt nok selv.',
    content: 'En forretningsplan skrives for minst tre målgrupper: banker og investorer (som vil se risiko og avkastning), samarbeidspartnere (som vil vite at du er seriøs), og deg selv (som tvinges til å konkretisere antagelser). Strukturen følger typisk et fast mønster: sammendrag, forretningsidé og verdiforslag, markedsanalyse, organisasjonsplan og til slutt en finansplan med budsjettering. Finn.no er et interessant eksempel: i de tidlige dagene hadde grunnleggerne en klar idé om annonsemarkedet, men undervurderte kraftig veksten i boligsegmentet og overvurderte behovet for betalt innhold — likevel var planleggingsprosessen det som hjalp dem prioritere riktig. En plan som aldri trenger revisjon, er en plan som aldri var realistisk.',
    subpoints: [
      { label: 'SAMMENDRAG', text: 'Én til to sider som oppsummerer hele planen — skrives sist, men leses først av investorer og banker.' },
      { label: 'FORRETNINGSIDÉ', text: 'Hva tilbyr du, til hvem og hvorfor er det bedre enn alternativene? Svaret skal passe i tre setninger.' },
      { label: 'FINANSPLAN', text: 'Budsjett, break-even-analyse og likviditetsplan — den delen de fleste hater å skrive, men som alle lesere ser på først.' },
    ],
    practical: 'Start med en «lean canvas» på én side: ni bokser som dekker problem, løsning, kundesegment, inntektsmodell og kostnadsstruktur. Fyll inn hva du vet og marker hva som er antakelser.',
    exercises: [
      {
        id: 'fp-1-1',
        icon: '📋',
        title: 'Målgrupper for forretningsplanen',
        question: 'Hvem er de viktigste målgruppene for en forretningsplan?',
        choices: [
          { id: 'a', label: 'Kun banker og investorer som vurderer om de skal gi lån eller investere', isCorrect: false, feedback: 'Banker er én viktig målgruppe, men forretningsplanen har flere formål. Den er like viktig som et internt styringsverktøy for gründeren selv.' },
          { id: 'b', label: 'Banker, samarbeidspartnere og gründeren selv', isCorrect: true, feedback: 'Riktig! Forretningsplanen tjener minst tre formål: å overbevise finansieringskilder, å vise samarbeidspartnere at du er seriøs, og å tvinge gründeren til å konkretisere egne antakelser.' },
          { id: 'c', label: 'Primært myndighetene som krever dokumentasjon ved selskapsregistrering', isCorrect: false, feedback: 'Myndighetene krever ikke en forretningsplan ved registrering av selskap. Forretningsplanen er et frivillig, men høyst nyttig strategidokument.' },
          { id: 'd', label: 'Ansatte som trenger å forstå bedriftens visjon og mål', isCorrect: false, feedback: 'Ansatte kan ha nytte av å kjenne bedriftens retning, men er ikke den primære målgruppen for en forretningsplan — det dokumentet er primært rettet utover og nedover til gründeren selv.' },
        ],
        espenTip: 'Tenk på forretningsplanen som et brev til tre mottakere på én gang: banksjefen, potensiell partner og deg selv om to år.',
      },
      {
        id: 'fp-1-2',
        icon: '📋',
        title: 'Rekkefølge i forretningsplanen',
        question: 'Sammendraget i en forretningsplan skrives sist, men leses først. Hva er den viktigste grunnen til denne praksisen?',
        choices: [
          { id: 'a', label: 'Det er en tradisjon uten praktisk begrunnelse', isCorrect: false, feedback: 'Praksisen har en veldig klar praktisk begrunnelse: du kan bare oppsummere noe du faktisk har skrevet ut i sin helhet, og investorer leser sammendraget for å avgjøre om de skal bruke tid på resten.' },
          { id: 'b', label: 'Fordi investorer og banker sjelden leser videre enn sammendraget, og det må derfor inneholde de mest overbevisende elementene', isCorrect: true, feedback: 'Riktig! De fleste investorer beslutter om de vil lese videre basert på sammendraget alene. Å skrive det sist sikrer at det faktisk reflekterer det endelige innholdet i planen.' },
          { id: 'c', label: 'Fordi sammendraget er det korteste avsnittet og tar minst tid å skrive', isCorrect: false, feedback: 'Sammendraget er faktisk det vanskeligste avsnittet å skrive godt, nettopp fordi det må kondensere hele planen til én til to overbevisende sider.' },
          { id: 'd', label: 'Fordi banken krever at sammendraget er datert sist i dokumentet', isCorrect: false, feedback: 'Det finnes ingen slik bankregel. Praksisen med å skrive sammendraget sist er en metodisk anbefaling, ikke et formkrav.' },
        ],
        espenTip: 'Husk: sammendraget er salgspitchen din til travle lesere. Skriv det som om det er det eneste de vil lese — for det er det kanskje.',
      },
      {
        id: 'fp-1-3',
        icon: '📋',
        title: 'Lean Canvas',
        question: 'Hva er den primære fordelen med å bruke en «Lean Canvas» i den tidlige planleggingsfasen?',
        choices: [
          { id: 'a', label: 'Den erstatter fullstendig behovet for en tradisjonell forretningsplan', isCorrect: false, feedback: 'Lean Canvas erstatter ikke en fullstendig forretningsplan, men er et nyttig første steg. Banker og investorer vil fremdeles kreve en mer detaljert plan inkludert finansprognoser.' },
          { id: 'b', label: 'Den gir et visuelt oversiktsbilde over forretningsmodellen på én side og synliggjør antakelser', isCorrect: true, feedback: 'Riktig! Lean Canvas tvinger deg til å artikulere de ni kjerne-elementene i forretningsmodellen kompakt, og å markere hvilke deler som er antakelser versus bekreftet kunnskap.' },
          { id: 'c', label: 'Den er juridisk bindende og fungerer som en kontrakt mellom gründer og investor', isCorrect: false, feedback: 'Lean Canvas er et planleggingsverktøy, ikke et juridisk dokument. Bindende avtaler mellom gründere og investorer er egne juridiske dokumenter som aksjonæravtaler.' },
          { id: 'd', label: 'Den er primært et markedsføringsverktøy for å tiltrekke kunder', isCorrect: false, feedback: 'Lean Canvas er et internt strategisk planleggingsverktøy — det er ikke designet for kundekommunikasjon, men for å hjelpe gründeren strukturere sin egen tenkning.' },
        ],
        espenTip: 'Marker alltid antakelsene dine i rødt på Canvas — jo mer rødt, jo mer validering trenger du før du investerer store summer.',
      },
      {
        id: 'fp-1-4',
        icon: '📋',
        title: 'Finn.no og planlegging',
        question: 'Finn.no undervurderte veksten i boligsegmentet i sine tidlige planer. Hva er den viktigste lærdommen fra dette?',
        choices: [
          { id: 'a', label: 'Forretningsplaner er nytteløse fordi fremtiden er umulig å forutsi', isCorrect: false, feedback: 'Det er feil konklusjon. Finn.no lyktes nettopp fordi de planla, selv om planen ikke stemte perfekt. Planleggingsprosessen — ikke det perfekte dokumentet — var det verdifulle.' },
          { id: 'b', label: 'Man bør alltid planlegge for å ta feil på noen antagelser, og justere underveis', isCorrect: true, feedback: 'Riktig! Planer er aldri fullkomne, men prosessen med å planlegge avdekker antakelser og gir et grunnlag for å justere raskt når virkeligheten viser seg annerledes.' },
          { id: 'c', label: 'Boligannonser bør alltid inkluderes i planen for en annonsemarkedsplass', isCorrect: false, feedback: 'Dette er for spesifikt til Finn.no-caset. Den generelle lærdommen handler ikke om boligsegmentet spesifikt, men om verdien av å planlegge systematisk selv under usikkerhet.' },
          { id: 'd', label: 'Gründere bør ansette eksperter til å lage planen fordi de selv er for nærsynte', isCorrect: false, feedback: 'Ekstern hjelp kan være nyttig, men planleggingsprosessen er mest verdifull når gründeren selv er dypt involvert — det er gjennomtenkningen som gir verdi, ikke dokumentet alene.' },
        ],
        espenTip: 'En plan som aldri trenger revisjon er en plan ingen tok seriøst. Bygg revisjonspunkter inn i planen fra start.',
      },
      {
        id: 'fp-1-5',
        icon: '📋',
        title: 'Forretningsidéens kjerne',
        question: 'Hva bør forretningsidédelen av en forretningsplan besvare?',
        choices: [
          { id: 'a', label: 'En detaljert teknisk beskrivelse av produktet eller tjenesten', isCorrect: false, feedback: 'Tekniske detaljer hører hjemme i vedlegg eller produktbeskrivelsen, ikke i forretningsidédelen. Det viktige er verdiforslagets logikk, ikke teknisk spesifikasjon.' },
          { id: 'b', label: 'Hva du tilbyr, til hvem, og hvorfor det er bedre enn alternativene — formulert i tre setninger', isCorrect: true, feedback: 'Riktig! Forretningsidéen skal presist kommunisere produkt/tjeneste, målgruppe og konkurransefortrinn på en kortfattet måte leseren umiddelbart kan evaluere.' },
          { id: 'c', label: 'En fullstendig markedsanalyse med porter-analyse og SWOT', isCorrect: false, feedback: 'Markedsanalysen er et eget kapittel i forretningsplanen. Forretningsidédelen er kortfattet og konseptuell — analysen er grundig og databasert.' },
          { id: 'd', label: 'Gründerens bakgrunn og motivasjon for å starte bedriften', isCorrect: false, feedback: 'Gründerteamets bakgrunn hører hjemme i organisasjonsdelen av planen. Forretningsidédelen handler om hva bedriften tilbyr til markedet.' },
        ],
        espenTip: 'Test forretningsidéen din på en tante som ikke kjenner bransjen. Hvis hun ikke forstår det på 30 sekunder, er det for komplisert.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🔍',
    title: 'Markedsanalyse og konkurransesituasjon',
    quote: 'Din største konkurrent er ikke den du kjenner — det er den kunden allerede bruker pengene sine på.',
    content: 'En grundig markedsanalyse kombinerer primærdata (egne intervjuer, spørreskjema, observasjoner) med sekundærdata (bransjestatistikk, SSB-tall, fagrapporter). Porter\'s Five Forces gir et strukturert rammeverk for å vurdere konkurransesituasjonen: rivaliseringen blant eksisterende aktører, trusselen fra nye aktører, trusselen fra substitutter, leverandørenes forhandlingsmakt og kundenes forhandlingsmakt. En student som starter guidetjeneste i Sognefjorden, må for eksempel analysere ikke bare de 20 eksisterende guideoperatørene, men også Airbnb Experiences, cruiseoperatørenes egne utflukter og turister som foretrekker å utforske på egenhånd. SWOT-analysen kobler den interne situasjonen (styrker og svakheter) til den eksterne (muligheter og trusler) og danner grunnlaget for strategiske valg.',
    subpoints: [
      { label: 'PRIMÆRFORSKNING', text: 'Intervjuer med potensielle kunder, prøvesalg, observasjoner i markedet — dyrere, men gir innsikt ingen rapport kan erstatte.' },
      { label: 'SEKUNDÆRFORSKNING', text: 'SSB, Proff.no, bransjeorganisasjoner og Google Trends — rask og billig, men kan mangle nyanser for nisjemarkeder.' },
      { label: 'PORTERS FIVE FORCES', text: 'Kartlegger fem krefter som bestemmer lønnsomheten i en bransje og hjelper deg finne hvor du har reell konkurransefordel.' },
    ],
    practical: 'Ring fem potensielle kunder og still tre enkle spørsmål: Hva bruker du i dag? Hva er du misfornøyd med? Hva ville du betalt for noe bedre? Svarene er gull verdt.',
    exercises: [
      {
        id: 'fp-2-1',
        icon: '🔍',
        title: 'Primær vs sekundærdata',
        question: 'Hva er den viktigste fordelen med primærdata sammenlignet med sekundærdata?',
        choices: [
          { id: 'a', label: 'Primærdata er alltid billigere å samle inn', isCorrect: false, feedback: 'Det motsatte er sant. Primærdata krever at du selv gjennomfører undersøkelsen — intervjuer, spørreskjema eller observasjoner — og er langt mer kostbart og tidkrevende enn sekundærdata.' },
          { id: 'b', label: 'Primærdata er fersk, skreddersydd og direkte relevant for din spesifikke problemstilling', isCorrect: true, feedback: 'Riktig! Primærdata samles inn for nettopp din situasjon, noe som gjør den mer presis og relevant — men kostnaden er at du selv må gjøre jobben med å samle den inn.' },
          { id: 'c', label: 'Primærdata finnes allerede tilgjengelig fra offentlige registre', isCorrect: false, feedback: 'Det er sekundærdata som finnes i offentlige registre som SSB og Proff.no. Primærdata er informasjon du samler inn selv, direkte fra kilden.' },
          { id: 'd', label: 'Primærdata er mer pålitelig fordi den er uavhengig av bedriftens egne interesser', isCorrect: false, feedback: 'Påliteligheten avhenger av metode og design, ikke av om dataene er primær eller sekundær. En dårlig designet spørreundersøkelse gir upålitelig primærdata.' },
        ],
        espenTip: 'Start alltid med å sjekke hva som allerede finnes (sekundær), og bruk primærundersøkelse for å fylle hullene der eksisterende data ikke er presis nok.',
      },
      {
        id: 'fp-2-2',
        icon: '🔍',
        title: 'Porters Five Forces',
        question: 'Hvilken av de fem kreftene i Porter\'s Five Forces handler om faren for at nye aktører kan komme inn i markedet?',
        choices: [
          { id: 'a', label: 'Rivalisering blant eksisterende aktører', isCorrect: false, feedback: 'Rivalisering handler om konkurranseintensiteten mellom de selskapene som allerede er i markedet, ikke om potensielle nye konkurrenter.' },
          { id: 'b', label: 'Trusselen fra nye aktører (inntrengere)', isCorrect: true, feedback: 'Riktig! Denne kraften vurderer hvor lett det er for nye bedrifter å etablere seg i bransjen — jo lavere inngangsbarrierer, jo høyere trussel og jo lavere potensiell lønnsomhet.' },
          { id: 'c', label: 'Leverandørenes forhandlingsmakt', isCorrect: false, feedback: 'Leverandørmakt handler om i hvilken grad leverandørene kan presse opp prisene eller begrense tilgang på innsatsfaktorer, ikke om nye aktørers inntreden.' },
          { id: 'd', label: 'Trusselen fra substitutter', isCorrect: false, feedback: 'Substitutt-trusselen handler om alternative produkter eller tjenester som løser det samme kundebehovet, ikke om nye aktører innenfor samme produktkategori.' },
        ],
        espenTip: 'Husk «FIVE» i Five Forces: Ny inntreden, Substitutter, Leverandører, Kunder, Rivalisering. Lav inngangsbarriere = mange nye = lav lønnsomhet.',
      },
      {
        id: 'fp-2-3',
        icon: '🔍',
        title: 'SWOT-analysens formål',
        question: 'Hva kobler SWOT-analysen som gjør den nyttig i strategisk planlegging?',
        choices: [
          { id: 'a', label: 'Den kobler bedriftens finansielle situasjon til markedets vekstpotensial', isCorrect: false, feedback: 'SWOT er ikke primært en finansiell analyse. Den kobler interne faktorer (styrker og svakheter) til eksterne faktorer (muligheter og trusler) i omgivelsene.' },
          { id: 'b', label: 'Den kobler intern situasjon (styrker og svakheter) til ekstern situasjon (muligheter og trusler)', isCorrect: true, feedback: 'Riktig! SWOT er et bro-verktøy som lar deg se sammenhengen mellom hva bedriften er god på (eller svak på) og hva omgivelsene byr på av muligheter eller trusler.' },
          { id: 'c', label: 'Den kobler markedsanalysen til finansplanen for å gi et helhetlig bilde', isCorrect: false, feedback: 'SWOT er et selvstendig strategiverktøy, ikke et bindeledd mellom spesifikke plan-seksjoner. Det er et vurderingsrammeverk, ikke en finansiell modell.' },
          { id: 'd', label: 'Den kobler kortsiktige mål til langsiktig visjon og misjon', isCorrect: false, feedback: 'Balansert målstyring (BSC) eller OKR-rammeverket passer bedre til å koble kortsiktige mål til langsiktig visjon. SWOT handler om situasjonsanalyse, ikke målstyring.' },
        ],
        espenTip: 'Bruk SWOT-krysset: styrke + mulighet = vekststrategi, styrke + trussel = defensiv strategi, svakhet + mulighet = satsingsomrde.',
      },
      {
        id: 'fp-2-4',
        icon: '🔍',
        title: 'Konkurranseanalyse i praksis',
        question: 'En student planlegger å starte en guidetjeneste i Sognefjorden. Hvem bør inkluderes i konkurranseanalysen?',
        choices: [
          { id: 'a', label: 'Kun de registrerte guideoperatørene i Sognefjordsregionen', isCorrect: false, feedback: 'En for snever konkurranseanalyse overser viktige konkurrenter. Kunder kan velge mange alternativer for å oppleve Sognefjorden — guideoperatørene er bare én kategori.' },
          { id: 'b', label: 'Guideoperatører, Airbnb Experiences, cruiseoperatørers utflukter og selvstendige turister', isCorrect: true, feedback: 'Riktig! En fullstendig konkurranseanalyse inkluderer alle måter kunden kan dekke det samme behovet — inkludert substitutter og «ikke-kjøpe»-alternativet.' },
          { id: 'c', label: 'Kun aktørene som tilbyr identiske tjenester til samme pris', isCorrect: false, feedback: 'Konkurrenter er alle som kjemper om den samme kundens penger eller tid — det er et mye bredere begrep enn identiske tilbud til identisk pris.' },
          { id: 'd', label: 'Alle reiselivsbedrifter i Norge for å sikre et komplett bilde', isCorrect: false, feedback: 'En konkurranseanalyse av alle norske reiselivsbedrifter vil være altfor bred og lite handlingsorientert. Fokuser på aktørene som konkurrerer om den samme kundegruppen i det samme geografiske markedet.' },
        ],
        espenTip: 'Din viktigste konkurrent er ikke alltid en annen guideoperatør — det kan være kunden som velger å laste ned Google Maps og gå selv.',
      },
      {
        id: 'fp-2-5',
        icon: '🔍',
        title: 'Bruk av SSB i markedsanalyse',
        question: 'Hva er Statistisk sentralbyrå (SSB) best egnet til i en markedsanalyse?',
        choices: [
          { id: 'a', label: 'Å gi dybdeinformasjon om spesifikke kunders preferanser og kjøpsmotiver', isCorrect: false, feedback: 'Dybdeinformasjon om individuelle kunders preferanser krever primærundersøkelse som intervjuer eller fokusgrupper. SSB leverer aggregert statistikk, ikke individuelle preferanser.' },
          { id: 'b', label: 'Å levere bredt tilgjengelig statistikk om befolkning, økonomi og næringsstruktur som sekundærdata', isCorrect: true, feedback: 'Riktig! SSB er Norges offisielle statistikkbyrå og tilbyr gratis tilgang til et enormt datatilfang — alt fra befolkningsstatistikk og inntektsfordeling til bransjestatistikk og handelstall.' },
          { id: 'c', label: 'Å gjennomføre skreddersydde markedsundersøkelser for enkeltbedrifter', isCorrect: false, feedback: 'SSB gjennomfører ikke skreddersydde undersøkelser for enkeltbedrifter — det er kommersielle aktører som Kantar og Ipsos som tilbyr det. SSB produserer nasjonal statistikk.' },
          { id: 'd', label: 'Å analysere konkurransesituasjonen innen spesifikke nisjemarkeder', isCorrect: false, feedback: 'Nisjekonkurranseanalyse krever mer spesifikke datakilder enn SSBs brede statistikk. For nisjemarkeder trenger du bransjespesifikke rapporter og primærundersøkelse.' },
        ],
        espenTip: 'SSB.no er gratis og inneholder mer nyttig data enn de fleste skjønner. Søk på bransjenavn eller produktkategori og du finner tall du kan sitere direkte i planen.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '💼',
    title: 'Forretningsmodell og inntektsstrømmer',
    quote: 'En god idé uten en forretningsmodell er bare en hobby.',
    content: 'Business Model Canvas, utviklet av Alexander Osterwalder, lar deg visualisere hele forretningsmodellen på ett ark med ni byggeklosser: kundesegment, verdiforslag, kanaler, kunderelasjoner, inntektsstrømmer, nøkkelressurser, nøkkelaktiviteter, nøkkelpartnere og kostnadsstruktur. Inntektsmodeller varierer enormt: Spotify tar månedlig abonnement uavhengig av bruk, Finn.no tar betalt per annonse (transaksjon), Salesforce selger programvare som abonnement (SaaS), mens Duolingo gir grunnfunksjonalitet gratis og selger premium-funksjoner (freemium). En norsk startup innen bærekraftig turisme kan kombinere tre strømmer: direkte billettinntekter fra turer, B2B-samarbeid med hoteller som tilbyr guidetjenesten til gjestene, og sponsorinntekter fra merkevarer som Bergans eller Norrøna. En enkelt inntektsstrøm gjør bedriften sårbar; to-tre strømmer gir motstandskraft.',
    subpoints: [
      { label: 'ABONNEMENT', text: 'Forutsigbar månedlig inntekt, høy kundeverdi over tid — men krever at kunden ser verdien måned etter måned.' },
      { label: 'TRANSAKSJON', text: 'Betaling per kjøp eller bruk — enkel å forstå, men inntekten er usikker og varierer med etterspørselen.' },
      { label: 'FREEMIUM', text: 'Lavterskel inngang som bygger stor brukerbase — men konverteringsraten fra gratis til betalt er typisk bare 2–5 %.' },
    ],
    practical: 'Tegn Business Model Canvas for bedriften din på et whiteboard. Marker med rødt alle boksene du er usikker på — de boksene er dine høyeste risikoområder.',
    glossaryTerm: 'Forretningsmodell',
    exercises: [
      {
        id: 'fp-3-1',
        icon: '💼',
        title: 'Business Model Canvas',
        question: 'Hvor mange byggeklosser består Business Model Canvas av?',
        choices: [
          { id: 'a', label: 'Fem byggeklosser: produkt, marked, økonomi, teknologi og team', isCorrect: false, feedback: 'Dette er ikke Business Model Canvas. Canvas er en spesifikk modell med ni byggeklosser utviklet av Alexander Osterwalder.' },
          { id: 'b', label: 'Syv byggeklosser basert på McKinseys 7S-rammeverk', isCorrect: false, feedback: 'McKinseys 7S-rammeverk er et annet strategisk verktøy. Business Model Canvas har ni byggeklosser og er designet spesifikt for å visualisere forretningsmodeller.' },
          { id: 'c', label: 'Ni byggeklosser som dekker alt fra kundesegmenter til kostnadsstruktur', isCorrect: true, feedback: 'Riktig! De ni byggeklossene er: kundesegment, verdiforslag, kanaler, kunderelasjoner, inntektsstrømmer, nøkkelressurser, nøkkelaktiviteter, nøkkelpartnere og kostnadsstruktur.' },
          { id: 'd', label: 'Tolv byggeklosser inkludert finansiell risiko og bærekraft', isCorrect: false, feedback: 'Det opprinnelige Business Model Canvas har ni byggeklosser. Det finnes varianter som Lean Canvas, men de endrer ikke på det originale antallet.' },
        ],
        espenTip: 'Huskeliste for de ni boksene: Hvem? (kundesegment), Hva? (verdiforslag), Hvor? (kanaler), Hvordan? (relasjoner), Inntekt, Ressurser, Aktiviteter, Partnere, Kostnader.',
      },
      {
        id: 'fp-3-2',
        icon: '💼',
        title: 'Freemium-modellen',
        question: 'Hva er den typiske konverteringsraten fra gratis til betalt bruker i en freemium-modell?',
        choices: [
          { id: 'a', label: '20–30 % av gratisbrukerne oppgraderer til betalt', isCorrect: false, feedback: 'En slik konverteringsrate ville vært eksepsjonelt høy. I virkeligheten er 2–5 % mer realistisk, noe som betyr at man trenger en svært stor gratisbase for å bygge en lønnsom betalingsbase.' },
          { id: 'b', label: '10–15 % av gratisbrukerne oppgraderer til betalt', isCorrect: false, feedback: 'En konverteringsrate på 10–15 % er realistisk for noen abonnementstjenester, men typisk for høy for freemium-modellen der gratistilbudet er svært godt.' },
          { id: 'c', label: '2–5 % av gratisbrukerne oppgraderer til betalt', isCorrect: true, feedback: 'Riktig! Freemium-modellen krever typisk at man skaffer en svært stor gratisbase for å få tilstrekkelig betalende kunder. Duolingo er et godt eksempel med millioner av gratisbrukere og et relativt lite antall betalende abonnenter.' },
          { id: 'd', label: 'Under 0,5 % av gratisbrukerne oppgraderer til betalt', isCorrect: false, feedback: 'En konverteringsrate under 0,5 % ville gjort freemium-modellen nesten ubrukelig kommersielt. En velfungerende freemium-modell sikter mot 2–5 %.' },
        ],
        espenTip: 'Freemium virker: du trenger 100 gratisbrukere for å få 2–5 betalende kunder. Regnestykket fungerer bare med enorme brukervolumer.',
      },
      {
        id: 'fp-3-3',
        icon: '💼',
        title: 'Inntektsstrømmers motstandskraft',
        question: 'Hvorfor anbefales det å ha to-tre inntektsstrømmer fremfor én for en oppstartsbedrift?',
        choices: [
          { id: 'a', label: 'Fordi investorer alltid krever minimum tre inntektsstrømmer før de investerer', isCorrect: false, feedback: 'Det finnes ingen slik universell investorkrav. Noen svært suksessrike bedrifter har startet med én enkel inntektsstrøm. Poenget er redusert sårbarhet, ikke et formkrav.' },
          { id: 'b', label: 'For å redusere sårbarheten hvis én inntektsstrøm faller bort eller svikter', isCorrect: true, feedback: 'Riktig! Diversifiserte inntektsstrømmer gir motstandskraft mot markedssvingninger, sesongvariasjoner og uforutsette hendelser. En guidetjeneste med billettinntekter, B2B-kontrakter og sponsoravtaler tåler for eksempel en rolig sesong bedre enn én som utelukkende selger enkeltbilletter.' },
          { id: 'c', label: 'Fordi det er lovpålagt å ha mehrere inntektskilder i norsk næringsliv', isCorrect: false, feedback: 'Det finnes ingen lov som krever et bestemt antall inntektsstrømmer. Dette er et forretningsmessig råd basert på risikostyring, ikke et juridisk krav.' },
          { id: 'd', label: 'Fordi en enkelt inntektsstrøm automatisk gir monopolstatus og regulatorisk risiko', isCorrect: false, feedback: 'Monopolstatus handler om markedsandel, ikke antall inntektsstrømmer. En liten bedrift med én inntektsstrøm er ikke et monopol.' },
        ],
        espenTip: 'Tenk på inntektsstrømmene som bein på en stol — tre bein er mye mer stabilt enn ett, selv om ett tykt bein kan virke robust.',
      },
      {
        id: 'fp-3-4',
        icon: '💼',
        title: 'SaaS vs tradisjonell lisensiering',
        question: 'Hva er den viktigste forskjellen mellom tradisjonell programvarelisensiering og SaaS-modellen (Software as a Service)?',
        choices: [
          { id: 'a', label: 'SaaS er alltid billigere for kunden enn tradisjonell lisensiering', isCorrect: false, feedback: 'Over tid kan SaaS faktisk bli dyrere, siden kunden betaler løpende abonnement. Fordelen med SaaS er lavere oppstartskostnad og jevnere cashflow, ikke nødvendigvis lavere totalkostnad.' },
          { id: 'b', label: 'SaaS-modellen gir løpende abonnementsinntekter fremfor engangsbetaling ved lisensiering', isCorrect: true, feedback: 'Riktig! SaaS gir leverandøren forutsigbar, løpende inntekt (MRR — Monthly Recurring Revenue) som er svært verdifull for bedriftens planlegging og verdsettelse av selskapet.' },
          { id: 'c', label: 'SaaS krever ikke internettilgang og kan brukes offline', isCorrect: false, feedback: 'Det motsatte er sant. SaaS er nettopp definert ved at programvaren kjøres i skyen og leveres over internett — det er ikke en lokalinstallert løsning.' },
          { id: 'd', label: 'Tradisjonell lisensiering gir bedriften lavere skattebelastning i Norge', isCorrect: false, feedback: 'Skatteregler avhenger ikke av om bedriften selger via lisensiering eller SaaS — begge modellene beskattes som ordinær inntekt.' },
        ],
        espenTip: 'MRR (Monthly Recurring Revenue) er investors favorittbegrep — forutsigbar månedsinntekt verdsettes mye høyere enn usikker engangsinntekt.',
      },
      {
        id: 'fp-3-5',
        icon: '💼',
        title: 'Abonnementsmodellens krav',
        question: 'Hva er den avgjørende forutsetningen for at abonnementsmodellen skal lykkes over tid?',
        choices: [
          { id: 'a', label: 'At produktet eller tjenesten er unik og har ingen substitutter i markedet', isCorrect: false, feedback: 'Selv unike produkter mister abonnenter hvis de ikke leverer tilstrekkelig verdi måned etter måned. Unikhet er ikke en garanti — kontinuerlig verdileveranse er nøkkelen.' },
          { id: 'b', label: 'At kunden opplever tilstrekkelig verdi måned etter måned til å rettferdiggjøre det løpende gebyret', isCorrect: true, feedback: 'Riktig! I motsetning til en engangstransaksjon må abonnementsmodellen «selge» produktet på nytt til kunden hver måned. Høy churn (frafall) er tegnet på at verdileveransen ikke opprettholdes.' },
          { id: 'c', label: 'At prisen er lavere enn alle konkurrentenes abonnementspriser', isCorrect: false, feedback: 'Priskonkurranse er ikke bærekraftig som strategi. Spotify er ikke billigst — det lykkes fordi brukerne opplever verdien som større enn abonnementsgebyret, ikke fordi det er gratis.' },
          { id: 'd', label: 'At bedriften har minimum 1000 abonnenter ved lansering', isCorrect: false, feedback: 'Det finnes ingen universelt krav til antall abonnenter ved lansering. Mange vellykkede abonnementsselskaper startet med svært få kunder og vokste organisk.' },
        ],
        espenTip: 'Churn-rate (frafall) er abonnementsmodellens viktigste nøkkeltall. Lavt frafall = kunden opplever verdi. Høyt frafall = noe er galt.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '💰',
    title: 'Finansplan og likviditetsbudsjett',
    quote: 'Mange bedrifter går konkurs mens de tjener penger — det handler om tidspunktet for inn- og utbetalinger.',
    content: 'Den vanligste misforståelsen blant nye gründere er å forveksle overskudd med penger på konto. En bedrift kan ha et positivt resultatregnskap og likevel gå konkurs dersom utbetalingene kommer før innbetalingene. Et kafékonsept som åpner med 500.000 kr i startkapital, vil typisk ha oppstartskostnader på 350.000–400.000 kr (leie, inventar, varer), og deretter månedlige faste kostnader på 80.000–100.000 kr før én krone er tjent inn. Likviditetsbudsjettet viser uke for uke og måned for måned når pengene faktisk beveger seg — ikke bare når de er opptjent. Break-even-analysen viser hvilket omsetningsnivå som dekker alle kostnader, og er absolutt minimumsnivå for at bedriften skal overleve på sikt.',
    subpoints: [
      { label: 'RESULTAT VS. LIKVIDITET', text: 'Resultat = inntekter minus kostnader (uavhengig av betalingstidspunkt). Likviditet = faktisk cash på konto. Det er cash som betaler regningene.' },
      { label: 'OPPSTARTSKOSTNADER', text: 'Alt som må betales før du åpner: depositum, inventar, varelager, nettside, registreringsgebyr, markedsføring ved lansering.' },
      { label: 'LIKVIDITETSBUDSJETT', text: 'Uke-for-uke oversikt over forventede inn- og utbetalinger — det viktigste styringsverktøyet for en bedrift i oppstartsfasen.' },
    ],
    practical: 'Bygg et enkelt likviditetsbudsjett i Excel: to kolonner per måned (inn og ut), og en løpende saldo. Negativ saldo betyr at du trenger mer finansiering eller lavere kostnader.',
    glossaryTerm: 'Nullpunkt (Break-even)',
    exercises: [
      {
        id: 'fp-4-1',
        icon: '💰',
        title: 'Resultat vs likviditet',
        question: 'En bedrift har et positivt årsresultat på 200.000 kr, men opplever likviditetsproblemer. Hva er den mest sannsynlige forklaringen?',
        choices: [
          { id: 'a', label: 'Regnskapsavdelingen har gjort feil i beregningen av årsresultatet', isCorrect: false, feedback: 'En regnskapsfeil er sjelden årsaken til dette vanlige fenomenet. Problemet er strukturelt: resultatregnskapet bokfører inntekter når de er opptjent, men likviditet handler om når pengene faktisk er tilgjengelige.' },
          { id: 'b', label: 'Inntektene er bokført men ikke innbetalt (lange betalingsfrister), mens kostnadene allerede er betalt', isCorrect: true, feedback: 'Riktig! Dette er den klassiske likviditetsklemmefellen: bedriften har solgt mye (positiv resultat), men kundene betaler etter 30–60 dager, mens leverandørene krever betaling umiddelbart.' },
          { id: 'c', label: 'Bedriften har investert for lite og trenger mer egenkapital', isCorrect: false, feedback: 'Mer egenkapital løser langsiktige kapitalbehovsproblemer, men beskriver ikke den spesifikke situasjonen der positiv resultat coexisterer med likviditetsproblemer.' },
          { id: 'd', label: 'Skatten er høyere enn forventet og spiser opp kontantbeholdningen', isCorrect: false, feedback: 'Skatt betales av overskudd og ville redusere nettoresultatet, men det er ikke det som typisk skaper situasjonen der et positivt resultat coexisterer med likviditetsproblemer.' },
        ],
        espenTip: 'Huskeregel: Resultat er hva du har tjent. Likviditet er hva du faktisk kan bruke. En bedrift med 200.000 kr i fortjeneste men 0 kr på konto kan gå konkurs.',
      },
      {
        id: 'fp-4-2',
        icon: '💰',
        title: 'Break-even-analyse',
        question: 'Hva forteller break-even-analysen deg som gründer?',
        choices: [
          { id: 'a', label: 'Det maksimale omsetningsnivået bedriften kan oppnå uten å ansette flere', isCorrect: false, feedback: 'Kapasitetsgrenser bestemmer maksimal omsetning, ikke break-even-analysen. Break-even handler om minimumsnivået, ikke maksimum.' },
          { id: 'b', label: 'Det omsetningsnivået der alle kostnader er dekket og bedriften verken tjener eller taper', isCorrect: true, feedback: 'Riktig! Break-even (nullpunkt) er det omsetningsnivået der totale inntekter er lik totale kostnader — under dette nivået taper bedriften penger, over dette nivået tjener den penger.' },
          { id: 'c', label: 'Hvilken pris som gir maksimal lønnsomhet gitt markedets etterspørsel', isCorrect: false, feedback: 'Optimal prisstrategi bestemmes av markedsanalyse og etterspørselskurver. Break-even-analysen forteller deg hva som er minimum for å overleve, ikke hva som er optimalt.' },
          { id: 'd', label: 'Hvor mange ansatte du bør ha i forhold til omsetningen', isCorrect: false, feedback: 'Bemanning bestemmes av operasjonell planlegging. Break-even er en finansiell beregning som forteller om omsetningsnivå og kostnadsdekning, ikke bemanningsoptimalisering.' },
        ],
        espenTip: 'Break-even = Faste kostnader ÷ Dekningsbidrag per enhet. Kjenner du dette tallet, vet du hva du MÅ selge for å overleve.',
      },
      {
        id: 'fp-4-3',
        icon: '💰',
        title: 'Oppstartskostnader',
        question: 'Hvilken av følgende er typisk en oppstartskostnad som må betales FØR bedriften begynner å generere inntekter?',
        choices: [
          { id: 'a', label: 'Månedlig lønn til ansatte i driftsperioden', isCorrect: false, feedback: 'Lønn i driftsperioden er en løpende driftskostnad, ikke en oppstartskostnad. Oppstartskostnader er det som må betales for å komme i gang, ikke for å holde driften gående.' },
          { id: 'b', label: 'Depositum på lokale og kjøp av inventar', isCorrect: true, feedback: 'Riktig! Depositum, inventar, varelager, nettside, registreringsgebyr og markedsføring ved lansering er typiske oppstartskostnader som må finansieres før første krone er tjent.' },
          { id: 'c', label: 'Kostnad for varekjøp tilpasset etterspørselen', isCorrect: false, feedback: 'Varekjøp i drift er en variabel kostnad som følger omsetningen. Oppstartskostnader er de engangsbetalingene som er nødvendige for å etablere driften.' },
          { id: 'd', label: 'Regnskapskostnader for det løpende regnskapsarbeidet', isCorrect: false, feedback: 'Regnskapshonorar er en løpende driftskostnad. Oppstartskostnader er de initial investeringene som gjøres én gang for å etablere bedriften.' },
        ],
        espenTip: 'Lag en «sjekkliste for åpningsdagen» — alt som MÅ betales FØR du kan ta imot første kunde er en oppstartskostnad.',
      },
      {
        id: 'fp-4-4',
        icon: '💰',
        title: 'Likviditetsbudsjett',
        question: 'Hva betyr en negativ saldo i likviditetsbudsjettet?',
        choices: [
          { id: 'a', label: 'Bedriften har et negativt årsresultat og går med underskudd', isCorrect: false, feedback: 'Negativ saldo i likviditetsbudsjettet betyr at kontantbeholdningen er negativ, men det er ikke det samme som negativt årsresultat. En bedrift kan ha positiv resulttatbudsjettet men negativ likviditet.' },
          { id: 'b', label: 'Bedriften trenger mer finansiering eller må redusere kostnader for å unngå betalingsproblemer', isCorrect: true, feedback: 'Riktig! Negativ saldo betyr at det er for lite penger på konto til å dekke forpliktelsene. Dette er et varselsignal om at man trenger ekstra finansiering, reduserte kostnader eller raskere innbetalinger.' },
          { id: 'c', label: 'Bedriften har brukt for mye tid på budsjettering og bør forenkle prosessen', isCorrect: false, feedback: 'Negativ saldo er ikke et signal om for mye budsjettering — det er tvert imot et argument for at budsjetteringen var nødvendig og avdekket et reelt problem som nå kan løses.' },
          { id: 'd', label: 'Bedriften kan søke om skattefritak det aktuelle året', isCorrect: false, feedback: 'Skattefritak har ingen direkte sammenheng med negativ saldo i likviditetsbudsjettet. Skatteberegning er basert på skattepliktig inntekt, ikke kontantbeholdning.' },
        ],
        espenTip: 'Negativ saldo er et varseltegn, ikke en katastrofe — det er nettopp derfor man lager likviditetsbudsjettet: for å oppdage problemet mens det fortsatt er tid til å gjøre noe.',
      },
      {
        id: 'fp-4-5',
        icon: '💰',
        title: 'Kafé-eksempelet',
        context: 'Et nytt kafékonsept åpner med 500.000 kr i startkapital. Oppstartskostnader utgjorde 380.000 kr, og månedlige faste kostnader er 90.000 kr.',
        question: 'Etter oppstart, hvor mange måneder rekker startkapitalen uten noen inntekter?',
        choices: [
          { id: 'a', label: 'Ca. 1,3 måneder', isCorrect: true, feedback: 'Riktig! 500.000 − 380.000 = 120.000 kr igjen etter oppstart. 120.000 ÷ 90.000 ≈ 1,3 måneder. Dette illustrerer dramatisk viktigheten av å generere inntekter raskt.' },
          { id: 'b', label: 'Ca. 5,6 måneder', isCorrect: false, feedback: 'Denne beregningen overser oppstartskostnadene. Etter oppstartskostnadene på 380.000 kr er det bare 120.000 kr igjen, som dekker ca. 1,3 måneder med faste kostnader.' },
          { id: 'c', label: 'Ca. 3,0 måneder', isCorrect: false, feedback: 'Sjekk regnestykket: 500.000 − 380.000 = 120.000 kr disponibelt etter oppstart. 120.000 ÷ 90.000 ≈ 1,3 måneder, ikke 3,0.' },
          { id: 'd', label: 'Ca. 0,5 måneder', isCorrect: false, feedback: 'For lavt. 120.000 kr ÷ 90.000 kr = 1,33 måneder, ikke 0,5. Oppstartskostnadene etterlater 120.000 kr, ikke bare 45.000 kr.' },
        ],
        espenTip: 'Dette eksempelet viser hvorfor kaféeiere ALDRI må åpne uten solid kontantreserve — 1,3 måneder er altfor lite buffer til uforutsette hendelser.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '⚡',
    title: 'Risikovurdering og exit-strategi',
    quote: 'Den beste forretningsplanen er ikke den som forteller deg alt kan gå bra — det er den som forteller deg nøyaktig hva som kan gå galt.',
    content: 'Alle forretningsplaner inneholder usikkerhet, og seriøse investorer er særlig skeptiske til planer uten risikovurdering. Risikotypene kan deles i markedsrisiko (etterspørselen uteblir, konkurrenten senker pris drastisk), finansiell risiko (kostnadene overstiger budsjettet, likviditeten strammes inn) og operasjonell risiko (nøkkelpersoner slutter, IT-systemer feiler, leverandøren leverer ikke). En risikomatrise plotter sannsynlighet mot konsekvens og hjelper deg prioritere hvilke risikoer som krever tiltak. Exit-strategien forteller hva som skjer hvis forretningsplanen ikke lykkes — dette er ikke negativt tenkning, det er profesjonalitet. En guidetjeneste i Sognefjorden kan ha tre exit-scenarioer: selge virksomheten til en større operatør, pivotere til bedriftsmarkedet (teambuilding), eller avvikle ryddig med minimale tap. Investorer spør alltid om exit — ha svaret klart.',
    subpoints: [
      { label: 'MARKEDSRISIKO', text: 'Etterspørselen er lavere enn antatt, ny konkurrent lanserer tilsvarende produkt, eller en teknologiendring gjør tilbudet ditt irrelevant.' },
      { label: 'FINANSIELL RISIKO', text: 'Oppstartskostnadene overskrider budsjettet, inntektene kommer seinere enn planlagt, eller finansieringen tørker inn.' },
      { label: 'OPERASJONELL RISIKO', text: 'Nøkkelpersoner slutter, leverandøren svikter, myndighetskrav endres, eller en pandemi stenger ned markedet.' },
    ],
    practical: 'Sett opp tre scenarioer: optimistisk (alt går bedre enn planlagt), realistisk (planen holder) og pessimistisk (50 % lavere inntekter). Hva gjør du i hvert tilfelle?',
    exercises: [
      {
        id: 'fp-5-1',
        icon: '⚡',
        title: 'Risikomatrisens funksjon',
        question: 'Hva brukes en risikomatrise primært til i en forretningsplan?',
        choices: [
          { id: 'a', label: 'Å beregne den eksakte finansielle kostnaden av alle identifiserte risikoer', isCorrect: false, feedback: 'En risikomatrise gir ikke eksakte finansielle beregninger — det er risikokostnadsanalyser og forsikringskalkyler som gjør det. Matrisen hjelper med prioritering og visuell oversikt.' },
          { id: 'b', label: 'Å visualisere og prioritere risikoer basert på sannsynlighet og konsekvens', isCorrect: true, feedback: 'Riktig! Risikomatrisen plotter risikoer på to akser — sannsynlighet og konsekvens — og skaper et kart som hjelper ledelsen prioritere hvilke risikoer som krever umiddelbar handling.' },
          { id: 'c', label: 'Å dokumentere at bedriften har forsikring mot alle identifiserte risikoer', isCorrect: false, feedback: 'Risikoregisteret dokumenterer identifiserte risikoer og tiltak, men det er ikke det samme som forsikringsdokumentasjon. Mange risikoer er ikke forsikringsbare.' },
          { id: 'd', label: 'Å eliminere all risiko fra forretningsplanen', isCorrect: false, feedback: 'Ingen bedrift kan eliminere all risiko — det ville krevd at man ikke gjorte noe forretningsmessig i det hele tatt. Målet er å identifisere, prioritere og håndtere risikoene på en systematisk måte.' },
        ],
        espenTip: 'Husk: Høy sannsynlighet × høy konsekvens = rød sone = handle nå. Lav sannsynlighet × lav konsekvens = grønn sone = aksepter og overvåk.',
      },
      {
        id: 'fp-5-2',
        icon: '⚡',
        title: 'Markedsrisiko',
        question: 'Hva er et typisk eksempel på markedsrisiko for en ny restaurantvirksomhet?',
        choices: [
          { id: 'a', label: 'At kjøkkenmaskinen havarerer og stopper produksjonen', isCorrect: false, feedback: 'Et havarimaskine er operasjonell risiko — det handler om den interne driften, ikke om markedets atferd.' },
          { id: 'b', label: 'At en nøkkelkokk slutter og tar med seg mange stammekunder', isCorrect: false, feedback: 'Tap av nøkkelperson er operasjonell risiko. Selv om det kan påvirke inntektene, er årsaken intern (personalavgang), ikke markedets atferd.' },
          { id: 'c', label: 'At en ny konkurrent åpner rett ved siden av og tar en stor andel av kundegrunnlaget', isCorrect: true, feedback: 'Riktig! Markedsrisiko er risikoen for at markedsbetingelsene endrer seg negativt — ny konkurranse, endrede forbrukertrender eller at etterspørselen viser seg lavere enn antatt.' },
          { id: 'd', label: 'At bankens renteøkning øker kostnadene på bedriftslånet', isCorrect: false, feedback: 'Renteendringer er finansiell risiko — de påvirker bedriftens finansieringskostnader, men er ikke direkte knyttet til markedets atferd.' },
        ],
        espenTip: 'Markedsrisiko = hva markedet gjør med deg. Operasjonell risiko = hva som skjer inni bedriften. Finansiell risiko = pengeflyt og kapitalproblemer.',
      },
      {
        id: 'fp-5-3',
        icon: '⚡',
        title: 'Exit-strategier',
        question: 'Hvorfor er exit-strategien en viktig del av en forretningsplan overfor investorer?',
        choices: [
          { id: 'a', label: 'Den viser at gründeren ikke er tilstrekkelig optimistisk om bedriftens fremtid', isCorrect: false, feedback: 'Exit-strategi tolkes ikke som pessimisme av profesjonelle investorer — tvert imot. Det er et tegn på realisme og profisjonalitet. Investorer verdsetter gründere som er ærlige om risiko.' },
          { id: 'b', label: 'Den forteller investoren hvordan de potensielt kan realisere avkastningen på investeringen sin', isCorrect: true, feedback: 'Riktig! Investorer trenger å vite hvordan de kan få tilbake pengene sine — enten ved børsnotering, salg til strategisk kjøper, eller tilbakekjøp. Exit-strategien er investorens avkastningsmulighet.' },
          { id: 'c', label: 'Den er et juridisk krav etter norsk aksjelov for alle aksjeselskaper', isCorrect: false, feedback: 'Norsk aksjelov krever ikke en exit-strategi i forretningsplanen. Det er investorenes forventning og god forretningsmessig praksis, ikke et lovkrav.' },
          { id: 'd', label: 'Den dokumenterer at gründeren er villig til å selge bedriften til hvem som helst', isCorrect: false, feedback: 'En exit-strategi er ikke et salgsbevis — det er en plan for mulige fremtidsscenarioer. Gründeren beholder full kontroll over hvem og når de eventuelt selger.' },
        ],
        espenTip: 'Investorer tenker alltid: «Når og hvordan får jeg pengene mine igjen pluss avkastning?» Exit-strategien svarer på dette spørsmålet direkte.',
      },
      {
        id: 'fp-5-4',
        icon: '⚡',
        title: 'Tre-scenarioanalyse',
        question: 'Hva er formålet med å sette opp tre scenarioer (optimistisk, realistisk, pessimistisk) i en forretningsplan?',
        choices: [
          { id: 'a', label: 'Å gjennomsnittlig beregne det mest sannsynlige utfallet av alle tre', isCorrect: false, feedback: 'Scenarioanalyse handler ikke om å beregne ett gjennomsnitt — det handler om å forberede seg på reelt forskjellige fremtider og ha en plan for hvert av dem.' },
          { id: 'b', label: 'Å vise at planleggingen er grundig og at det finnes beredskapsplaner for ulike utfall', isCorrect: true, feedback: 'Riktig! Tre-scenarioanalysen demonstrerer at gründeren har tenkt grundig gjennom usikkerheten og har konkrete planer for hvordan bedriften håndterer ulike fremtidsscenarioer — noe investorer og banker setter stor pris på.' },
          { id: 'c', label: 'Å overbevise investoren om at den optimistiske scenarioen er mest sannsynlig', isCorrect: false, feedback: 'Å presentere bare den optimistiske scenarioen eller argumentere for at den er mest sannsynlig uten god begrunnelse, er et rødt flagg for erfarne investorer.' },
          { id: 'd', label: 'Å oppfylle krav fra Brønnøysundregistrene ved selskapsregistrering', isCorrect: false, feedback: 'Brønnøysundregistrene krever ikke tre-scenarioanalyse ved registrering. Dette er et planleggingsverktøy, ikke et formkrav.' },
        ],
        espenTip: 'Det pessimistiske scenarioen er det viktigste å planlegge for. Hva gjør du hvis inntektene er 50 % lavere enn planlagt? Har du svaret?',
      },
      {
        id: 'fp-5-5',
        icon: '⚡',
        title: 'Investor og risiko',
        question: 'Hva signaliserer en forretningsplan uten risikovurdering til en erfaren investor?',
        choices: [
          { id: 'a', label: 'At bedriften er så solid at ingen risikoer er relevante', isCorrect: false, feedback: 'Ingen bedrift er risikofri. En plan uten risikovurdering vil bli tolket som urealistisk av erfarne investorer, ikke som et tegn på styrke.' },
          { id: 'b', label: 'At gründeren mangler forretningserfaring eller ikke har tenkt grundig nok gjennom utfordringene', isCorrect: true, feedback: 'Riktig! Erfarne investorer er nettopp skeptiske til planer uten risikovurdering, fordi det indikerer manglende realisme og strategisk tenkning. En god risiko-analyse er et tegn på modenhet og troverdighet.' },
          { id: 'c', label: 'At gründeren ønsker å holde tilbake sensitiv informasjon om forretningsmodellen', isCorrect: false, feedback: 'Risikovurderingen er ikke sensitiv informasjon — det er en del av den åpne og ærlige kommunikasjonen som bygger investortillit. Å utelate den tolkes ikke som diskresjon, men som svakhet.' },
          { id: 'd', label: 'At forretningsplanen er i et tidlig stadium og vil bli oppdatert', isCorrect: false, feedback: 'Selv en tidlig forretningsplan bør inkludere en foreløpig risikovurdering. «Vi skal legge til dette seinere» er ikke akseptabelt for investorer som vurderer om de skal bruke tid på planen.' },
        ],
        espenTip: 'Risikovurdering er din troverdighetssjekk: «Har gründeren tenkt på hva som kan gå galt?» Svaret «ja, og her er planen» er mye bedre enn «ingenting kan gå galt».',
      },
    ],
  },
]

export default function ForretningsplanModule() {
  return (
    <DrawerModule
      moduleCode="FD-VG2-1"
      moduleTitle="Forretningsplanlegging"
      moduleIcon="📑"
      storageKey="learning-vg2-forretningsplan"
      completeRoute="/learning/vg2/forretningsdrift/forretningsplan/complete"
      phases={PHASES}
      intro="En forretningsplan er ikke bare et dokument du lager for å overbevise banken om et lån — det er primært et verktøy for å tvinge deg selv til å tenke klart om hva du faktisk holder på med. En god forretningsplan avdekker forutsetninger du tok for gitt, svakheter du ikke hadde sett og muligheter du ikke hadde prioritert. Å lage en solid plan er en av de mest verdifulle investeringene en gründer kan gjøre."
      vissteduAt="Ifølge Statistisk sentralbyrå overlever bare rundt 50 % av norske nyetablerte foretak de første fem årene. De som overlever, kjennetegnes ikke av at alt gikk som planlagt — tvert imot. De overlever fordi de hadde planlagt for usikkerhet og var forberedt på å justere kursen underveis."
      espenSier="Jeg har hjulpet mange gründere med forretningsplaner, og den vanligste feilen er å bruke 80 % av innsatsen på produktbeskrivelsen og 20 % på alt annet. Banken og investorene bryr seg egentlig mest om finansplanen og markedsanalysen — de vil se at du forstår tallene og kjenner markedet ditt."
      presentationLink={{ route: '/learning/presentations/forretningsidee', description: 'Forretningsidé — en visuell gjennomgang av forretningsmodell og USP' }}
    />
  )
}
