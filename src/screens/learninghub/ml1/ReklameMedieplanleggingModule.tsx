        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📺',
            title: 'Hva er reklame? Betalt oppmerksomhet',
            quote: 'Reklame er ikke gratis. Du kjøper plass i andres kanaler.',
            content: 'Reklame er kjøpt eksponering i andres kanaler — TV-spott, Google-annonse, plakat på buss. Den skiller seg fra PR (omtale i media du ikke betaler for) og innholdsmarkedsføring (eget innhold på egne kanaler). Reklame er den raskeste måten å nå mange mennesker på, men også den dyreste per kontakt. Norske bedrifter brukte over 25 milliarder kroner på reklame i 2024.',
            subpoints: [
                  { label: 'BETALT', text: 'Reklame er alltid kjøpt — du betaler for plassen, frekvensen og målgruppen.' },
          { label: 'KONTROLL', text: 'Du bestemmer eksakt hva som sies — i motsetning til PR, hvor en journalist tolker.' },
          { label: 'RAKKEVIDDE', text: 'Brukes når du vil nå mange raskt: lansering, sesong, promotering.' },
            ],
            practical: 'Tenk på en reklame du har sett siste uke. Hvor møtte du den? Hva var formålet — kjennskap, holdning eller direkte salg?',
            exercises: [
            {
      id: 'ml112-1-1',
      icon: '📺',
      title: 'Reklame vs. PR',
      question: 'Hva skiller reklame fra PR?',
      choices: [
        { id: 'a', label: 'PR er ulovlig, reklame er lovlig', isCorrect: false, feedback: 'Begge er fullt lovlig — bare ulike kanaler.' },
{ id: 'b', label: 'Reklame er betalt eksponering du kontrollerer; PR er omtale du ikke betaler for', isCorrect: true, feedback: 'Riktig! Reklame = kjøpt + kontrollert. PR = ufortjent + tolket av journalist. Begge har sin plass.' },
{ id: 'c', label: 'Reklame er på TV, PR er på nett', isCorrect: false, feedback: 'Begge bruker alle kanaler — skillet er hvem som betaler.' },
{ id: 'd', label: 'PR er gratis', isCorrect: false, feedback: 'PR-byråer koster ofte mye, selv om medieplassen er ufortjent.' },
      ],
      espenTip: 'PR-bransjen kaller seg gjerne \'earned media\' — du fortjener oppmerksomheten gjennom interessante saker, ikke ved å betale.',
    },
    {
      id: 'ml112-1-2',
      icon: '📺',
      title: 'Norsk reklamebudsjett',
      question: 'Cirka hvor mye brukte norske bedrifter på reklame i 2024?',
      choices: [
        { id: 'a', label: 'Ca 1 milliard kroner', isCorrect: false, feedback: 'Sterkt undervurdert — norsk reklame-økonomi er stor.' },
{ id: 'b', label: 'Ca 5 milliarder kroner', isCorrect: false, feedback: 'Fortsatt for lavt.' },
{ id: 'c', label: 'Over 25 milliarder kroner', isCorrect: true, feedback: 'Riktig! Det norske reklamemarkedet er på over 25 mrd, dominert av digitale kanaler (Meta, Google).' },
{ id: 'd', label: 'Over 100 milliarder kroner', isCorrect: false, feedback: 'For høyt — det er nær hele kulturbudsjettet til staten.' },
      ],
      espenTip: 'Internasjonalt vinner Google og Meta over 70 % av digitalmarkedet. Det skaper avhengighet for norske bedrifter.',
    },
    {
      id: 'ml112-1-3',
      icon: '📺',
      title: 'Når brukes reklame mest',
      question: 'I hvilken situasjon er reklame særlig effektivt?',
      choices: [
        { id: 'a', label: 'For å selge til en enkelt B2B-kunde', isCorrect: false, feedback: 'Personlig salg passer bedre — for dyrt med reklame til én.' },
{ id: 'b', label: 'For å nå mange raskt — produktlansering, sesongkampanje, merkebygging', isCorrect: true, feedback: 'Riktig! Reklame skinner når du må nå et bredt publikum kort tid: lansering, jul, valg.' },
{ id: 'c', label: 'For å erstatte produktutvikling', isCorrect: false, feedback: 'Reklame kan ikke redde et dårlig produkt.' },
{ id: 'd', label: 'Aldri — reklame er bortkastet', isCorrect: false, feedback: 'Veldig dogmatisk. Riktig brukt har reklame stor effekt.' },
      ],
      espenTip: 'Bra reklame uten bra produkt: kunden prøver én gang, blir skuffet, kommer aldri tilbake. Produkt først, reklame andre.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎯',
            title: 'Medieplanleggingens faser',
            quote: 'Strukturen er den samme om budsjettet er 50 000 eller 50 millioner.',
            content: 'Medieplanlegging er en prosess i fem faser: Mål → Målgruppe → Medievalg → Budsjett → Kontroll. Først definerer du hva du vil oppnå (kjennskap, salg, holdning). Deretter hvem du vil nå (alder, geografi, livsstil). Så hvilke kanaler som treffer best (TV for bredde, TikTok for unge, LinkedIn for B2B). Budsjettet allokeres mellom kanalene basert på kostnadseffektivitet. Kontrollfasen måler resultatene mot målene og justerer.',
            subpoints: [
                  { label: 'MÅL', text: 'SMART-formulert: \'Øke uhjulpen kjennskap fra 12 % til 20 % innen 6 mnd\' — ikke \'mer reklame\'.' },
          { label: 'MÅLGRUPPE', text: 'Hvem skal nås? Demografi alene er ikke nok — psykografi og atferd gir presisjon.' },
          { label: 'KANALVALG', text: 'Hver kanal har sin styrke: TV bygger kjennskap, søk fanger intensjon, sosiale medier bygger relasjon.' },
            ],
            practical: 'En lokal frisørsalong får 50 000 kr i markedsbudsjett. Hvilke faser ville du prioritert? Hvor mye til hver?',
            exercises: [
            {
      id: 'ml112-2-1',
      icon: '🎯',
      title: 'Fasenes rekkefølge',
      question: 'Hva er riktig rekkefølge i medieplanlegging?',
      choices: [
        { id: 'a', label: 'Budsjett, mål, målgruppe, medievalg, kontroll', isCorrect: false, feedback: 'Budsjett kommer etter at man vet hva som skal oppnås.' },
{ id: 'b', label: 'Mål, målgruppe, medievalg, budsjett, kontroll', isCorrect: true, feedback: 'Riktig! Klassisk fem-stegs-modell. Mål kommer først; uten klare mål er resten gjetting.' },
{ id: 'c', label: 'Kontroll, mål, medievalg, målgruppe, budsjett', isCorrect: false, feedback: 'Kontroll kommer alltid sist — det er måling av oppnådde resultater.' },
{ id: 'd', label: 'Medievalg, mål, budsjett, kontroll, målgruppe', isCorrect: false, feedback: 'Du kan ikke velge medie før du vet målet og målgruppen.' },
      ],
      espenTip: 'Hopp over mål-fasen, og du måler ingenting. Hopp over kontroll-fasen, og du lærer ingenting til neste kampanje.',
    },
    {
      id: 'ml112-2-2',
      icon: '🎯',
      title: 'SMART-mål i reklame',
      question: 'Hvilket av disse er et SMART-mål for reklame?',
      choices: [
        { id: 'a', label: 'Vi skal bli mer kjent', isCorrect: false, feedback: 'Vagt — målbart? Tidsbestemt? Realistisk? Nei.' },
{ id: 'b', label: 'Øke uhjulpen kjennskap blant 25–40-åringer i Oslo fra 12 % til 20 % innen 6 måneder', isCorrect: true, feedback: 'Riktig! Spesifikt, målbart, ambisiøst, realistisk, tidsbestemt — alle SMART-kriteriene oppfylt.' },
{ id: 'c', label: 'Selge mer', isCorrect: false, feedback: 'For vagt.' },
{ id: 'd', label: 'Få mest mulig reklame', isCorrect: false, feedback: 'Mengde er ikke et mål — effekt er.' },
      ],
      espenTip: 'Skriv målene før du engang tenker på medie. Da unngår du å måle \'hvor mange likes\' i stedet for \'hvor mange kunder\'.',
    },
    {
      id: 'ml112-2-3',
      icon: '🎯',
      title: 'Kanaltilpasning',
      question: 'Du selger pensjonsforsikring. Hvilke kanaler er mest naturlig?',
      choices: [
        { id: 'a', label: 'TikTok og Snapchat', isCorrect: false, feedback: 'Yngre målgruppe — pensjon er ikke deres prioritet ennå.' },
{ id: 'b', label: 'Facebook, Aftenposten online, LinkedIn — kanaler der 40+ er', isCorrect: true, feedback: 'Riktig! Pensjonskunder er typisk 40+, og Facebook + nyhetsmedier dominerer i den aldersgruppen.' },
{ id: 'c', label: 'YouTube Kids', isCorrect: false, feedback: 'Helt feil målgruppe.' },
{ id: 'd', label: 'Twitch og Discord', isCorrect: false, feedback: 'Gamingtjenester — passer ikke målgruppen for pensjon.' },
      ],
      espenTip: 'Bunnregelen: Hvor er målgruppen din? Gå dit. Ikke der reklame-bransjen er trendy.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📊',
            title: 'Dekning og frekvens',
            quote: 'Hvor mange ser deg, og hvor mange ganger?',
            content: 'To grunnbegreper i medieplanlegging: dekning er antall unike personer som har sett annonsen minst én gang. Frekvens er hvor mange ganger hver person har sett den. For å bygge kjennskap kreves typisk 3–7 visninger per person — kalt effektiv frekvens. Ren dekning uten frekvens skaper svak hukommelse. Høy frekvens uten dekning blir mas. GRP (Gross Rating Point) = dekning × frekvens, brukes for å sammenligne kampanjer.',
            subpoints: [
                  { label: 'DEKNING', text: 'Hvor mange unike personer eksponeres. Måles i prosent av målgruppen.' },
          { label: 'FREKVENS', text: 'Hvor mange ganger hver person ser annonsen. 3–7 er ofte optimal for kjennskapsbygging.' },
          { label: 'GRP', text: 'Dekning × frekvens. Brukes som standardmål på kampanjepress.' },
            ],
            practical: 'Hvor mange ganger må du se en TV-reklame før du faktisk husker merkenavnet? Reflekter over egen erfaring.',
            exercises: [
            {
      id: 'ml112-3-1',
      icon: '📊',
      title: 'Dekning vs. frekvens',
      question: 'Hva er forskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Feil — to forskjellige metrikker.' },
{ id: 'b', label: 'Dekning = unike personer, frekvens = antall visninger per person', isCorrect: true, feedback: 'Riktig! Dekning teller hoder, frekvens teller eksponeringer. Sammen forteller de hvor \'hardt\' kampanjen treffer.' },
{ id: 'c', label: 'Dekning er TV, frekvens er digitalt', isCorrect: false, feedback: 'Begrepene gjelder alle medier.' },
{ id: 'd', label: 'Dekning er pris, frekvens er kvalitet', isCorrect: false, feedback: 'Helt feil definisjon.' },
      ],
      espenTip: '100 personer × 1 visning = samme GRP som 50 personer × 2 visninger. Men effekten er ulik — 50 × 2 husker bedre.',
    },
    {
      id: 'ml112-3-2',
      icon: '📊',
      title: 'Effektiv frekvens',
      question: 'Hvor mange ganger må målgruppen typisk se en annonse for at den skal feste seg?',
      choices: [
        { id: 'a', label: '1–2 ganger', isCorrect: false, feedback: 'For lavt — én visning huskes sjelden.' },
{ id: 'b', label: '3–7 ganger', isCorrect: true, feedback: 'Riktig! Klassisk regel fra mediefaget. Under dette er kampanjen for tynn; over dette er det meste sløsing.' },
{ id: 'c', label: '20+ ganger', isCorrect: false, feedback: 'For høyt — overeksponering skaper irritasjon.' },
{ id: 'd', label: 'Bare én gang om reklamen er kreativ nok', isCorrect: false, feedback: 'Selv genial reklame trenger gjentakelse for å feste seg.' },
      ],
      espenTip: 'Spotify Wrapped fungerer fordi vi ser den fra venner i flere uker — uten egen mediekostnad.',
    },
    {
      id: 'ml112-3-3',
      icon: '📊',
      title: 'GRP',
      question: 'Hva betyr GRP 200?',
      choices: [
        { id: 'a', label: '200 personer er nådd', isCorrect: false, feedback: 'Underestimert — GRP er prosent, ikke antall.' },
{ id: 'b', label: '200 % av målgruppen ble nådd, eller f.eks. 100 % to ganger hver', isCorrect: true, feedback: 'Riktig! GRP = dekning% × frekvens. 200 GRP = bred kampanje med god frekvens.' },
{ id: 'c', label: 'Annonsen ble vist 200 ganger totalt', isCorrect: false, feedback: 'Ikke det GRP måler.' },
{ id: 'd', label: 'Kampanjen kostet 200 000 kr', isCorrect: false, feedback: 'GRP måler ikke pris.' },
      ],
      espenTip: 'GRP 100 = svak kampanje. GRP 300+ = sterk kampanje. Brukes for å sammenligne kampanjepress på tvers av kanaler.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎨',
            title: 'Kreativ utforming',
            quote: 'Den beste medieplanen kan ikke redde dårlig kreativ idé.',
            content: 'Tekst, bilde, lyd og video som fanger oppmerksomheten i støyen. De første 3 sekundene avgjør om publikum scroller forbi. En sterk visuell idé er ofte verdt mer enn en stor produksjonsbudsjett. Klassiske grep: humor (Telenor sin julekampanje), historiefortelling (Lerøy laks), provokasjon (Benetton), produktdemo (Apple). Reklame uten klar idé er sjelden minneverdig — uansett produksjonsbudsjett.',
            subpoints: [
                  { label: 'FØRSTE 3 SEK', text: 'På sosiale medier avgjør de første 3 sekundene om publikum stopper opp.' },
          { label: 'ÉN IDÉ', text: 'Sterke kampanjer har én sentral idé. Mange budskap = ingen budskap.' },
          { label: 'PRODUKTET I SENTRUM', text: 'God reklame får produktet inn i historien. Reklame som bare er underholdning huskes — men salget kommer ikke.' },
            ],
            practical: 'Tenk på siste reklame du faktisk husker. Hva gjorde den minneverdig? Var det produktet eller historien?',
            exercises: [
            {
      id: 'ml112-4-1',
      icon: '🎨',
      title: 'Kreativ idé vs. produksjonsbudsjett',
      question: 'Hva er viktigst for at en reklame skal virke?',
      choices: [
        { id: 'a', label: 'Stort produksjonsbudsjett', isCorrect: false, feedback: 'Hjelper, men er sekundært til ideen.' },
{ id: 'b', label: 'En klar, sterk kreativ idé', isCorrect: true, feedback: 'Riktig! Lavbudsjett-kampanjer med god idé slår dyrt produserte uten idé. Apples \'1984\' og Coca-Colas julekampanjer er begge bevis.' },
{ id: 'c', label: 'Mange budskap samtidig', isCorrect: false, feedback: 'Tvert imot — fokus slår spredning.' },
{ id: 'd', label: 'Lengde — minst 60 sekunder', isCorrect: false, feedback: 'Korte kampanjer (6–15 sek) er ofte mer effektive på sosiale medier.' },
      ],
      espenTip: 'Apple bruker ofte enklere reklame enn konkurrentene — men idéen er alltid soleklar: \'Designed by Apple in California\'.',
    },
    {
      id: 'ml112-4-2',
      icon: '🎨',
      title: 'Sosiale medier-attention',
      question: 'Hvor viktige er de første sekundene i en TikTok/Instagram-reklame?',
      choices: [
        { id: 'a', label: 'Ikke viktige — folk ser uansett ferdig', isCorrect: false, feedback: 'Helt feil — gjennomsnittlig stopptid på TikTok er under 2 sekunder.' },
{ id: 'b', label: 'Avgjørende — du har 3 sekunder før de scroller videre', isCorrect: true, feedback: 'Riktig! Algoritmen kombinert med menneskelig adferd betyr at hookene må være på plass i sekund 1–3.' },
{ id: 'c', label: 'Slutten er viktigst — der er Call-to-Action', isCorrect: false, feedback: 'CTA er viktig, men hvis ingen ser frem til slutten...' },
      ],
      espenTip: 'Studio er ofte slik: 80 % av tiden brukes på å lage de første 3 sekundene perfekte. Resten kan være enklere.',
    },
    {
      id: 'ml112-4-3',
      icon: '🎨',
      title: 'Hvilke grep virker',
      question: 'Hvilket av disse er ikke et klassisk kreativt grep?',
      choices: [
        { id: 'a', label: 'Humor', isCorrect: false, feedback: 'Klassisk grep — virker, men risikerer å overskygge produktet.' },
{ id: 'b', label: 'Historiefortelling', isCorrect: false, feedback: 'En av de mest effektive — engasjerer emosjonelt.' },
{ id: 'c', label: 'Bare prislister og spesifikasjoner', isCorrect: true, feedback: 'Riktig! Rene fakta-lister er informasjon, ikke kreativ reklame. De huskes ikke.' },
{ id: 'd', label: 'Provokasjon', isCorrect: false, feedback: 'Risikabelt grep — Benetton brukte det med blandet suksess.' },
      ],
      espenTip: 'Faktabasert reklame har sin plass (B2B, kompleks teknologi), men trenger fortsatt en historie for å feste seg.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '💻',
            title: 'Digital annonsering',
            quote: 'Algoritmene har endret reklamen mer på 10 år enn forrige 50.',
            content: 'Digital annonsering domineres av Google (søk + YouTube) og Meta (Facebook + Instagram). Programmatiske kjøp lar algoritmer kjøpe annonseplass i sanntid basert på målgrupp-data. Du kan målrette på alder, geografi, interesser, livsfase og adferd. Resultatene måles presist — antall visninger, klikk, konverteringer. GDPR setter grenser for sporing; Apples sporing-restriksjoner har gjort målretting vanskeligere fra 2021. TikTok har vokst eksplosivt blant under-30.',
            subpoints: [
                  { label: 'PROGRAMMATIC', text: 'Maskinen kjøper annonseplass i millisekunder, basert på hvem som er på siden akkurat nå.' },
          { label: 'MÅLRETTING', text: 'Mest presist på nett — alder, sted, interesser, kjøpemønster.' },
          { label: 'MÅLBARHET', text: 'Hver visning, klikk og konvertering kan spores. Forskjell fra TV/print, der måling er estimert.' },
            ],
            practical: 'Hvilke annonser har du sett siste dag? Husker du dem? Hvorfor traff de deg?',
            exercises: [
            {
      id: 'ml112-5-1',
      icon: '💻',
      title: 'Programmatic',
      question: 'Hva er programmatisk annonsering?',
      choices: [
        { id: 'a', label: 'Når journalistikken er programmert', isCorrect: false, feedback: 'Det er feil definisjon.' },
{ id: 'b', label: 'Algoritmer kjøper annonseplass i sanntid basert på data om hvem som er på siden', isCorrect: true, feedback: 'Riktig! Programmatic er nå standard for digital displayreklame. Hele kjøp + plassering skjer på millisekunder.' },
{ id: 'c', label: 'Annonser som er program-styrt med AI-tekst', isCorrect: false, feedback: 'Det er AI-generert kreativ, ikke programmatic media.' },
{ id: 'd', label: 'Annonser kun for programmerere', isCorrect: false, feedback: 'Helt feil målgruppe-tolkning.' },
      ],
      espenTip: 'Når du laster en nettside, foregår over 100 annonse-auksjoner i bakgrunnen i løpet av 100 millisekunder. Du ser bare resultatet.',
    },
    {
      id: 'ml112-5-2',
      icon: '💻',
      title: 'Markedslederne',
      question: 'Hvilke to selskaper dominerer norsk digital reklame?',
      choices: [
        { id: 'a', label: 'TV2 og NRK', isCorrect: false, feedback: 'TV2 selger reklame, NRK ikke. Og digitalt dominerer de ikke.' },
{ id: 'b', label: 'Google og Meta (Facebook/Instagram)', isCorrect: true, feedback: 'Riktig! Sammen har de 70 %+ av digital reklame i Norge — en utfordring for både medier og annonsører.' },
{ id: 'c', label: 'Apple og Microsoft', isCorrect: false, feedback: 'Begge har annonsetjenester, men ikke dominerende i Norge.' },
{ id: 'd', label: 'Schibsted og Amedia', isCorrect: false, feedback: 'Norske medier — viktige, men taper terreng til de globale.' },
      ],
      espenTip: 'Det er derfor norske mediebedrifter sliter — annonsekronene flytter til USA-tjenester.',
    },
    {
      id: 'ml112-5-3',
      icon: '💻',
      title: 'GDPR-effekt',
      question: 'Hvordan har GDPR påvirket digital annonsering?',
      choices: [
        { id: 'a', label: 'Ingen effekt', isCorrect: false, feedback: 'Stor effekt — særlig på sporing og målretting.' },
{ id: 'b', label: 'Strengere samtykkekrav for sporing — målretting basert på personlige data er vanskeligere', isCorrect: true, feedback: 'Riktig! GDPR + Apples ATT (App Tracking Transparency) har redusert presisjonen i målretting betydelig fra 2021.' },
{ id: 'c', label: 'Annonser er forbudt på nett', isCorrect: false, feedback: 'Tvert imot — reklame fortsetter, bare med strengere regler.' },
{ id: 'd', label: 'Bare Facebook er rammet', isCorrect: false, feedback: 'Alle digitale annonsører er rammet.' },
      ],
      espenTip: 'Effekten: kontekstuell annonsering (basert på sideinnhold) gjør comeback. Gammel teknologi fungerer igjen.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '📱',
            title: 'Influencer marketing',
            quote: 'Tillit fra én troverdig stemme slår all betalt reklame.',
            content: 'Influencer marketing bruker troverdige tredjeparter (innholdsskapere på sosiale medier) til å nå nisjemålgrupper. Macro-influencere har 100 000+ følgere; mikro-influencere har 10 000–100 000; nano-influencere under 10 000. Mikro- og nano-influencere har ofte HØYERE engasjement og konvertering enn de store. Norske eksempler: Caroline Berg Eriksen (mote), Marcus Bailey (gaming), Brianne Wiest (livsstil). Forbrukertilsynet krever tydelig merking av betalt innhold (#reklame, #annonse).',
            subpoints: [
                  { label: 'MIKRO-INFLUENCERE', text: '10 000–100 000 følgere, høy engasjementsrate, billig CPM, autentisk.' },
          { label: 'MERKEPLIKT', text: 'All betalt innhold må merkes #reklame eller #annonse — strenge norske krav.' },
          { label: 'NISJEFOKUS', text: 'Influencere er sterke i nisjer (gaming, fitness, mote, foreldre) der tradisjonell reklame sliter.' },
            ],
            practical: 'Følger du noen influencer? Hvorfor stoler du på dem? Hvor lett er det å skille redaksjonelt innhold fra betalt?',
            exercises: [
            {
      id: 'ml112-6-1',
      icon: '📱',
      title: 'Mikro vs. macro',
      question: 'Hva er ofte fordelen med mikro-influencere?',
      choices: [
        { id: 'a', label: 'Billigere uten andre fordeler', isCorrect: false, feedback: 'Billigere ja, men også med høyere engasjement og bedre konvertering.' },
{ id: 'b', label: 'Høyere engasjementsrate, mer autentisk og bedre konvertering enn store influencere', isCorrect: true, feedback: 'Riktig! Forskning viser at mikro-influencere (10–100K følgere) ofte gir bedre ROI enn macro. Mer personlig forhold til følgere.' },
{ id: 'c', label: 'De er kjente på TV', isCorrect: false, feedback: 'Det er macro-influencere/kjendiser.' },
{ id: 'd', label: 'De har eget produksjonsteam', isCorrect: false, feedback: 'Det har bare de største.' },
      ],
      espenTip: '10 mikro-influencere a 50 000 kr gir ofte mer effekt enn én macro a 500 000 kr. Test deg fram med små budsjetter først.',
    },
    {
      id: 'ml112-6-2',
      icon: '📱',
      title: 'Norsk merkeplikt',
      question: 'Hva må norske influencere gjøre med betalt innhold?',
      choices: [
        { id: 'a', label: 'Ingenting — det er åpenbart', isCorrect: false, feedback: 'Feil — Forbrukertilsynet krever tydelig merking.' },
{ id: 'b', label: 'Tydelig merke det med #reklame eller #annonse', isCorrect: true, feedback: 'Riktig! Brudd på merkeplikten kan gi bot. Mange norske influencere har fått advarsler eller bøter.' },
{ id: 'c', label: 'Bare merke det hvis annonsøren krever det', isCorrect: false, feedback: 'Krav fra loven, ikke avtale.' },
{ id: 'd', label: 'Gjøre det privat', isCorrect: false, feedback: 'Da er det ikke reklame, og merkeplikten gjelder ikke.' },
      ],
      espenTip: 'Forbrukertilsynet sjekker influencer-kontoer regelmessig. Vær sikker — merk alltid om du har fått betalt eller produkt gratis.',
    },
    {
      id: 'ml112-6-3',
      icon: '📱',
      title: 'Hvor virker influencere best',
      question: 'I hvilken kategori er influencer marketing særlig effektivt?',
      choices: [
        { id: 'a', label: 'Industriell B2B-tjenester', isCorrect: false, feedback: 'B2B er bedre egnet for LinkedIn og personlig salg.' },
{ id: 'b', label: 'Mote, gaming, fitness, livsstil — visuelle nisjeprodukter', isCorrect: true, feedback: 'Riktig! Disse kategoriene drives av visuelle vurderinger og sosial bekreftelse, der influencer-anbefaling er gull.' },
{ id: 'c', label: 'Banktjenester', isCorrect: false, feedback: 'Komplekse finansprodukter krever annet innhold enn TikTok.' },
{ id: 'd', label: 'Begravelsesbyråer', isCorrect: false, feedback: 'Helt feil kontekst.' },
      ],
      espenTip: 'Influencer-marked er verdt over 20 milliarder USD globalt. I Norge er det fortsatt vekst — særlig på TikTok.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📐',
            title: 'Kostnadseffektivitet',
            quote: 'Mål alltid det som faktisk teller.',
            content: 'Reklamebransjen elsker akronymer. CPM (Cost per Mille) = pris per 1000 visninger, brukes for kjennskapsbygging. CPC (Cost per Click) = pris per klikk, brukes for trafikk. CPA (Cost per Acquisition) = pris per faktisk kunde, brukes for salg. ROAS (Return on Ad Spend) = inntekt per annonsekrone. Velg metrikken som matcher målet. Lav CPM betyr ingenting hvis du ikke får noen kunder.',
            subpoints: [
                  { label: 'CPM', text: 'Pris per 1000 visninger. For kjennskapsbygging — TV, display, video.' },
          { label: 'CPC og CPA', text: 'Pris per klikk eller per kunde. For trafikk og salg — Google Ads, Meta.' },
          { label: 'ROAS', text: 'Inntekt / annonsekostnad. ROAS 3 = hver krone i annonser ga 3 kroner i salg.' },
            ],
            practical: 'Du har 10 000 kr og to alternativer: en kampanje med CPM 50 (200 000 visninger) eller en CPC 5 (2 000 klikk). Hva velger du? Hvorfor?',
            exercises: [
            {
      id: 'ml112-7-1',
      icon: '📐',
      title: 'CPM',
      question: 'Hva betyr CPM?',
      choices: [
        { id: 'a', label: 'Cost per Million', isCorrect: false, feedback: 'Feil — det er per 1000.' },
{ id: 'b', label: 'Cost per Mille — pris per 1000 visninger', isCorrect: true, feedback: 'Riktig! Latinsk \'mille\' = tusen. Brukes mye i TV, display og video.' },
{ id: 'c', label: 'Cost per Minute', isCorrect: false, feedback: 'Feil enhet.' },
{ id: 'd', label: 'Customer Performance Measure', isCorrect: false, feedback: 'Helt annet konsept.' },
      ],
      espenTip: 'Norsk TV-reklame ligger ofte på CPM 100–200 kr. Facebook video kan være CPM 30–80 kr.',
    },
    {
      id: 'ml112-7-2',
      icon: '📐',
      title: 'Når bruker du hva',
      question: 'Du vil måle om kampanjen faktisk gir kunder. Hvilken metrikk?',
      choices: [
        { id: 'a', label: 'CPM', isCorrect: false, feedback: 'Måler kun visninger, ikke kunder.' },
{ id: 'b', label: 'CPA — Cost per Acquisition (kostnad per faktisk kjøp)', isCorrect: true, feedback: 'Riktig! CPA er sluttfasitten: hvor mye koster det å skaffe én reell kunde. Brukes mest i performance marketing.' },
{ id: 'c', label: 'Antall likes', isCorrect: false, feedback: 'Vanity metric — ikke koblet til faktisk salg.' },
{ id: 'd', label: 'Antall følgere', isCorrect: false, feedback: 'Samme — bygger merkevare, men måler ikke konvertering.' },
      ],
      espenTip: 'Hvis CPA er høyere enn CLV (Customer Lifetime Value), taper du penger på hver kunde. Da må kampanjen justeres.',
    },
    {
      id: 'ml112-7-3',
      icon: '📐',
      title: 'ROAS-tolkning',
      question: 'Hva betyr ROAS 4?',
      choices: [
        { id: 'a', label: 'Du får 4 nye kunder per kampanje', isCorrect: false, feedback: 'Feil definisjon.' },
{ id: 'b', label: 'Hver krone i annonser ga 4 kroner tilbake i salg', isCorrect: true, feedback: 'Riktig! ROAS 4 betyr 4× tilbakebetaling. ROAS over 3 regnes generelt som lønnsomt for e-handel.' },
{ id: 'c', label: 'Kampanjen varte 4 dager', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Du må vente 4 måneder på resultater', isCorrect: false, feedback: 'ROAS måles per kampanje, ikke tid.' },
      ],
      espenTip: 'ROAS er bruttotallet. Husk å trekke fra produksjonskostnad — netto ROAS er det som faktisk teller.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '⚖️',
            title: 'Reklame-etikk og lovverk',
            quote: 'Forbrukertilsynet slår hardt — og raskt.',
            content: 'Norsk markedsføringslov (mfl.) regulerer hva som er lov. Forbud mot villedende reklame, skjult markedsføring og urimelig handelspraksis. Forbrukertilsynet håndhever loven og kan gi bøter, pålegg om endring eller stansing. Spesielt strenge regler for barn (under 18). Influencere må merke betalt innhold. Black Friday-kampanjer overvåkes for falske \'før-priser\'. Sosiale medier sprer dårlige opplevelser raskere — etisk reklame er også god business.',
            subpoints: [
                  { label: 'VILLEDENDE', text: 'Forbudt å gi inntrykk som er objektivt usant. \'Norges billigste\' krever faktagrunnlag.' },
          { label: 'BARN', text: 'Forbud mot reklame som utnytter barns mangel på erfaring. Strengt regulert i alle kanaler.' },
          { label: 'MERKING', text: 'All betalt innhold må være tydelig merket — i sosiale medier, podkaster, blogger.' },
            ],
            practical: 'Du har sett en reklame du synes er på grensen til villedende. Hvor klager du? Hva skjer da?',
            exercises: [
            {
      id: 'ml112-8-1',
      icon: '⚖️',
      title: 'Tilsynet',
      question: 'Hvilket organ håndhever markedsføringsloven i Norge?',
      choices: [
        { id: 'a', label: 'Datatilsynet', isCorrect: false, feedback: 'De håndhever GDPR/personvern, ikke reklame.' },
{ id: 'b', label: 'Forbrukertilsynet', isCorrect: true, feedback: 'Riktig! Forbrukertilsynet (tidligere Forbrukerombudet) er den primære tilsynsmyndigheten for reklame.' },
{ id: 'c', label: 'Konkurransetilsynet', isCorrect: false, feedback: 'De håndterer kartellsaker, ikke reklame.' },
{ id: 'd', label: 'Mattilsynet', isCorrect: false, feedback: 'Bare for matprodukter — ikke reklame generelt.' },
      ],
      espenTip: 'Forbrukertilsynet publiserer alle vedtak åpent. Sjekk forbrukertilsynet.no for konkrete eksempler på ulovlige kampanjer.',
    },
    {
      id: 'ml112-8-2',
      icon: '⚖️',
      title: 'Black Friday',
      question: 'Hva er en typisk problemstilling med Black Friday-kampanjer?',
      choices: [
        { id: 'a', label: 'Det er for mange kunder', isCorrect: false, feedback: 'Praktisk problem, ikke etisk.' },
{ id: 'b', label: 'Falske \'før-priser\' — produkt heves i pris i oktober for å \'settes ned\' i november', isCorrect: true, feedback: 'Riktig! Forbrukertilsynet slår jevnlig ned på dette. Reell prisreduksjon må sammenlignes med laveste pris siste 30 dager.' },
{ id: 'c', label: 'Det er bare en amerikansk tradisjon', isCorrect: false, feedback: 'Ja, men nå global — og lovverk gjelder uansett opphav.' },
{ id: 'd', label: 'Kampanjen er for kort', isCorrect: false, feedback: 'Tid er ikke problemet — sannferdighet er.' },
      ],
      espenTip: 'EU innførte ny pris-direktiv i 2022: \'Før-pris\' må være laveste pris siste 30 dager. Kampanjer brutt mot dette ulovlig.',
    },
    {
      id: 'ml112-8-3',
      icon: '⚖️',
      title: 'Reklame mot barn',
      question: 'Hvorfor er reklame mot barn særlig regulert?',
      choices: [
        { id: 'a', label: 'Barn er bedre på å gjenkjenne reklame', isCorrect: false, feedback: 'Tvert imot — barn skiller dårligere mellom reklame og redaksjonelt innhold.' },
{ id: 'b', label: 'Barn mangler erfaring til å vurdere kommersielle budskap kritisk', isCorrect: true, feedback: 'Riktig! Markedsføringsloven har strenge regler om reklame som utnytter barns lette påvirkbarhet.' },
{ id: 'c', label: 'Barn har ingen penger uansett', isCorrect: false, feedback: 'De påvirker familiens kjøp betydelig — pester power.' },
{ id: 'd', label: 'Det er ingen regler for barn', isCorrect: false, feedback: 'Helt feil — det er noen av de strengeste reglene.' },
      ],
      espenTip: 'Pester power: barn påvirker mor/fars kjøp på matvarer, leker, ferier. Derfor reklamerer matprodusenter direkte til barn — under strenge regler.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '📈',
            title: 'Effektmåling og optimalisering',
            quote: 'Hva som ikke måles, kan ikke forbedres.',
            content: 'Effektmåling er kontrollfasen i medieplanleggingen. På digitale kanaler er målingen presis — Google Analytics, Meta Pixel, Hubspot sporer hver kunde gjennom konverteringstrakten. På tradisjonelle medier (TV, radio, print) er det estimater via målgruppeundersøkelser (TNS Gallup, Kantar). Brand tracking-undersøkelser måler kjennskap, preferanse og oppmerksomhet over tid. Konkrete tiltak basert på data — ikke magefølelse.',
            subpoints: [
                  { label: 'DIGITAL = PRESIST', text: 'Hvert klikk og kjøp kan kobles tilbake til kampanjen som genererte det.' },
          { label: 'TRADISJONELT = ESTIMERT', text: 'TV-reklame måles via paneler og estimater. Mindre presist, men ofte stort volum.' },
          { label: 'BRAND TRACKING', text: 'Periodiske undersøkelser måler kjennskap, holdning og preferanse over tid.' },
            ],
            practical: 'Hva ville du målt for å vite om en TV-reklame har virket? Hvordan ville du sett om sosial medier-kampanjen ga avkastning?',
            exercises: [
            {
      id: 'ml112-9-1',
      icon: '📈',
      title: 'Hva måles digitalt',
      question: 'Hvilke metrikker kan måles presist på digitale kanaler?',
      choices: [
        { id: 'a', label: 'Kun antall visninger', isCorrect: false, feedback: 'Mye mer kan måles digitalt.' },
{ id: 'b', label: 'Visninger, klikk, varighet, konverteringer, livssyklusverdi', isCorrect: true, feedback: 'Riktig! Hele kundereisen kan spores digitalt — ned til hvilken annonse som ga hvilken kunde.' },
{ id: 'c', label: 'Bare merkekjennskap', isCorrect: false, feedback: 'Det måles via undersøkelser, ikke kun digitalt.' },
{ id: 'd', label: 'Salgsvekst kan ikke måles', isCorrect: false, feedback: 'Tvert imot — salg kan kobles til kampanjer.' },
      ],
      espenTip: 'Multi-touch attribution er en spesialdisiplin: hvilken av de 5 berøringspunktene en kunde hadde, fortjener salgs-kreditten?',
    },
    {
      id: 'ml112-9-2',
      icon: '📈',
      title: 'Brand tracking',
      question: 'Hva måler typisk en brand tracking-undersøkelse?',
      choices: [
        { id: 'a', label: 'Antall ansatte i bedriften', isCorrect: false, feedback: 'Helt annen statistikk.' },
{ id: 'b', label: 'Kjennskap, preferanse, oppfattet kvalitet, kjøpsintensjon over tid', isCorrect: true, feedback: 'Riktig! Brand tracking gir indikatorer på hvordan merkevaren utvikler seg over år. Brukes strategisk for å se effekt av langsiktig merkebygging.' },
{ id: 'c', label: 'Bare salget', isCorrect: false, feedback: 'Salg er separat metrikk.' },
{ id: 'd', label: 'Kun reklamebudsjett', isCorrect: false, feedback: 'Det er input, ikke effekt.' },
      ],
      espenTip: 'Norske selskaper som Equinor, DnB og Telenor gjør kvartalsvis brand tracking — får tidlig signal hvis merkevaren begynner å falme.',
    },
    {
      id: 'ml112-9-3',
      icon: '📈',
      title: 'Hva man IKKE skal måle',
      question: 'Hvilken metrikk er klassisk \'vanity\'?',
      choices: [
        { id: 'a', label: 'Salgsøkning', isCorrect: false, feedback: 'Faktisk verdi, ikke vanity.' },
{ id: 'b', label: 'Antall likes uten kobling til konvertering', isCorrect: true, feedback: 'Riktig! Likes alene måler synlighet, ikke verdi. 1 million likes uten salg = vanity metric.' },
{ id: 'c', label: 'Customer Lifetime Value', isCorrect: false, feedback: 'Konkret, kobler til lønnsomhet.' },
{ id: 'd', label: 'ROAS', isCorrect: false, feedback: 'Direkte mål på avkastning — ikke vanity.' },
      ],
      espenTip: 'Steve Jobs sa: \'I don\'t care what people say about me. I care what they buy.\' Effekt > eksponering.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎬',
            title: 'Casestudier — hva fungerer i Norge',
            quote: 'De beste reklamene treffer kulturen, ikke bare målgruppen.',
            content: 'Eksempler på vellykket norsk reklame: Telenor sin lange julekampanje (emosjonell historie, konsistent stil), Stormberg sin \'Hjelp meg å hjelpe deg\'-kampanje (samfunnsansvar som differensiering), DnBs \'Hva tror du?\' (refleksjon i stedet for produkt), Vy sin \'Stadig flere reiser med tog\' (rebranding fra NSB), Voi sin elsparkesykkel-lansering (rask kjennskap via gateplassering). Fellesnevneren: klar idé, konsistens og kulturell relevans.',
            subpoints: [
                  { label: 'KULTURELL TILPASNING', text: 'Norske kampanjer fungerer best med norske kulturreferanser — ikke direkte oversettelse fra engelsk.' },
          { label: 'KONSISTENS', text: 'Telenor har holdt julekampanje-stilen i 10+ år. Bygger kjennskap over tid.' },
          { label: 'DIFFERENSIERING', text: 'Stormberg differensierer på samfunnsansvar — vanskelig å kopiere, sterk merkebygging.' },
            ],
            practical: 'Hvilken norsk reklame har gjort størst inntrykk på deg? Hva traff?',
            exercises: [
            {
      id: 'ml112-10-1',
      icon: '🎬',
      title: 'Telenor-julen',
      question: 'Hva er Telenor sin reklamestrategi for jul?',
      choices: [
        { id: 'a', label: 'Stadig nye, helt forskjellige kampanjer', isCorrect: false, feedback: 'Tvert imot — konsistens er nøkkelen.' },
{ id: 'b', label: 'Konsistent emosjonell historie i samme stil over mange år', isCorrect: true, feedback: 'Riktig! Telenor har bygget en gjenkjennelig \'jul-stil\' siden 2010-tallet. Forbrukerne forventer kampanjen — det er en kulturell hendelse.' },
{ id: 'c', label: 'Kun produktdemo av nye telefoner', isCorrect: false, feedback: 'De fokuserer på følelser, ikke produkter.' },
{ id: 'd', label: 'Krevd at kundene betaler ekstra', isCorrect: false, feedback: 'Ingen sammenheng.' },
      ],
      espenTip: 'Konsistens gir \'mental hylleplassering\'. Når du tenker jul, tenker du på Telenor — det er den ultimate seier i merkebygging.',
    },
    {
      id: 'ml112-10-2',
      icon: '🎬',
      title: 'Vy',
      question: 'Hva oppnådde Vy med navneskiftet fra NSB?',
      choices: [
        { id: 'a', label: 'Reduserte kostnader umiddelbart', isCorrect: false, feedback: 'Ikke kostnadsdrevet — strategisk merkebygging.' },
{ id: 'b', label: 'Modernisere oppfatningen og skille seg fra utdatert NSB-image', isCorrect: true, feedback: 'Riktig! NSB var assosiert med forsinkelser og gammel teknologi. Vy fikk muligheten til ny start med tydelig moderne profil.' },
{ id: 'c', label: 'Skiftet eierne', isCorrect: false, feedback: 'Selskapet er fortsatt statlig.' },
      ],
      espenTip: 'Navneskifter er dyre og risikable, men kan være verdt det hvis det gamle navnet er en bremsekloss for merkebygging.',
    },
    {
      id: 'ml112-10-3',
      icon: '🎬',
      title: 'Stormberg',
      question: 'Hva er Stormberg sin differensieringsstrategi?',
      choices: [
        { id: 'a', label: 'Lavest pris', isCorrect: false, feedback: 'De er ikke nødvendigvis billigst.' },
{ id: 'b', label: 'Samfunnsansvar — ansetter folk med hull i CV-en, åpenhet om kostnadsstruktur', isCorrect: true, feedback: 'Riktig! Stormberg har bygget en sterk merkevare på sosial profil. Kundene velger dem ikke bare for produktet, men for verdiene.' },
{ id: 'c', label: 'Best teknologi', isCorrect: false, feedback: 'De er solide, men ikke premium-tech.' },
{ id: 'd', label: 'Kun nettsalg', isCorrect: false, feedback: 'De har butikker også.' },
      ],
      espenTip: 'Verdibasert differensiering er vanskelig å kopiere — konkurrenter kan matche pris og kvalitet, men ikke autentisk merkevareverdier på et øyeblikk.',
    },
            ],
          },
        ]

        export default function ReklameMedieplanleggingModule() {
          return (
            <DrawerModule
              moduleCode="ML1-12"
              moduleTitle="Reklame og medieplanlegging"
              moduleIcon="📺"
              storageKey="learning-ml1-reklame-medieplanlegging"
              completeRoute="/learning/ml1/reklame-medieplanlegging/complete"
              phases={phases}
              intro="Reklame er betalt synlighet. Med riktig medieplassering når du målgruppen din presist; med feil plassering brenner du penger uten effekt. Moderne medieplanlegging kombinerer tradisjonelle kanaler (TV, radio, avis) og digitale (Google, Meta, TikTok) i en strategi som måles, justeres og optimaliseres kontinuerlig."
              vissteduAt="Norsk gjennomsnittsforbruker eksponeres for 4 000–10 000 reklamebudskap daglig. Bare 1–2 prosent fester seg i bevisstheten. Det er derfor kreativ utforming og presis plassering er like viktig som budsjettet."
              espenSier="Halvparten av reklamebudsjettet er bortkastet — du vet bare ikke hvilken halvpart. Det er gammelt sitat, men holder fortsatt. Digital sporing løser delvis problemet; god kreativ idé løser den andre halvparten."
      presentationLink={{ route: '/learning/presentations/ml1/reklame-medieplanlegging', description: 'Reklame og medieplanlegging — 10 slides' }}
            />
          )
        }
