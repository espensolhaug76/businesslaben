        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '💰',
            title: 'Prisens strategiske rolle',
            quote: 'Mer enn en lapp.',
            content: 'Pris er ikke bare en lapp — det er signal om verdi, posisjonering og målgruppe. Premium-pris signaliserer kvalitet (selv ved samme produkt). Lavpris signaliserer tilgjengelighet. Velg bevisst hvor i prishierarkiet du ligger — det styrer hvem som kjøper og hvor mye de bruker.',
            subpoints: [
                  { label: 'SIGNAL', text: 'Pris kommuniserer kvalitet og målgruppe.' },
          { label: 'POSISJONERING', text: 'Pris definerer hvor du er i markedet — premium, mellom, lavpris.' },
            ],
            practical: 'Hvilke produkter kjøper du basert på høy pris (signal om kvalitet)? Hvilke unngår du pga lav pris?',
            exercises: [
            {
      id: 'ml209-1-1',
      icon: '💰',
      title: 'Pris-signal',
      question: 'Hva signaliserer høy pris ofte?',
      choices: [
        { id: 'a', label: 'Dårlig kvalitet', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Kvalitet, eksklusivitet, premium-segment', isCorrect: true, feedback: 'Riktig! Kunder bruker pris som proxy for kvalitet.' },
{ id: 'c', label: 'Bare grådighet', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Vin-eksperimenter: samme vin med ulike pris-merker. Forsøkspersoner foretrekker konsistent dyrere — selv om det er identisk.',
    },
    {
      id: 'ml209-1-2',
      icon: '💰',
      title: 'Lavpris',
      question: 'Hva signaliserer lavpris?',
      choices: [
        { id: 'a', label: 'Bare bra deal', isCorrect: false, feedback: 'Også risiko-signal.' },
{ id: 'b', label: 'Tilgjengelighet, men også potensiell lavkvalitet', isCorrect: true, feedback: 'Riktig! Tveegget sverd. For lavt kan skade salget.' },
{ id: 'c', label: 'Bare sosial bevissthet', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Premium', isCorrect: false, feedback: 'Helt feil retning.' },
      ],
      espenTip: 'Studier viser at premium-produkter ofte taper salg når de blir for billige — kunder mister tillit til kvalitet.',
    },
    {
      id: 'ml209-1-3',
      icon: '💰',
      title: 'Strategisk valg',
      question: 'Hva må du gjøre med pris?',
      choices: [
        { id: 'a', label: 'Velge laveste mulig', isCorrect: false, feedback: 'Strategisk feil.' },
{ id: 'b', label: 'Bevisst velge posisjonering — premium, mellom, lavpris', isCorrect: true, feedback: 'Riktig! Bevisst valg, ikke bare kostnadsbasert beregning.' },
{ id: 'c', label: 'Følge konkurrenten', isCorrect: false, feedback: 'Reaktivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'IKEA valgte lavpris bevisst. Apple valgte premium. Begge ekstremt vellykket — ulike strategier.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📊',
            title: 'Kalkulasjonsmetoder',
            quote: 'Selvkost vs bidrag.',
            content: 'Selvkostmetoden: alle kostnader + påslag for fortjeneste. Brukes for langsiktige beslutninger og \'er produktet lønnsomt\'. Bidragsmetoden: variable kostnader + dekningsbidrag. Brukes for kortsiktige beslutninger (\'skal vi ta neste ordre?\'). Begge har sin plass.',
            subpoints: [
                  { label: 'SELVKOST', text: 'Alle kostnader fordelt — for langsiktig.' },
          { label: 'BIDRAG', text: 'Variable kostnader + dekningsbidrag — for kortsiktig.' },
            ],
            practical: 'Når ville du brukt selvkost vs bidragsmetoden i bedrift du kjenner?',
            exercises: [
            {
      id: 'ml209-2-1',
      icon: '📊',
      title: 'Selvkost',
      question: 'Når brukes selvkost?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes ofte.' },
{ id: 'b', label: 'Langsiktige beslutninger om produktets reelle lønnsomhet', isCorrect: true, feedback: 'Riktig! Dekker alle kostnader for full vurdering.' },
{ id: 'c', label: 'Bare i offentlig sektor', isCorrect: false, feedback: 'Brukes overalt.' },
{ id: 'd', label: 'Aldri kortsiktig', isCorrect: false, feedback: 'Det er korrekt — bidrag er kortsiktig.' },
      ],
      espenTip: 'Settes priser for hele året: selvkost. Vurderes om man skal kutte produktet: selvkost.',
    },
    {
      id: 'ml209-2-2',
      icon: '📊',
      title: 'Bidrag',
      question: 'Når brukes bidragsmetoden?',
      choices: [
        { id: 'a', label: 'Bare langsiktig', isCorrect: false, feedback: 'Det er selvkost.' },
{ id: 'b', label: 'Kortsiktige beslutninger — skal vi ta neste ordre? Pris-justering?', isCorrect: true, feedback: 'Riktig! Når faste kostnader allerede er dekket.' },
{ id: 'c', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'd', label: 'Bare for offentlig', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'Hotell med ledig kapasitet: bidragsmetoden viser at en billig last-minute fortsatt er lønnsom.',
    },
    {
      id: 'ml209-2-3',
      icon: '📊',
      title: 'Forskjell',
      question: 'Hva er hovedforskjellen?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Selvkost inkluderer alle kostnader; bidrag bare variable', isCorrect: true, feedback: 'Riktig! Strukturell forskjell som styrer beslutninger.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategiske valg.' },
{ id: 'd', label: 'Bare for små', isCorrect: false, feedback: 'Begge brukes overalt.' },
      ],
      espenTip: 'Norske bedrifter bruker oftest bidragsmetoden i operasjonelle beslutninger, selvkost i strategiske.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📈',
            title: 'Priselastisitet',
            quote: 'Hvor påvirkes salget av pris?',
            content: 'Priselastisitet: %-endring i salg / %-endring i pris. Elastisk: små prisendringer gir store volumendringer (klær, fly). Uelastisk: lite respons (insulin, drivstoff). Måling avgjør hvor mye du kan presse pris uten å miste salg. Spørsmål: hvis pris opp 10 %, hvor mye faller salg?',
            subpoints: [
                  { label: 'ELASTISK = SENSITIV', text: 'Små prisendringer, store volumendringer.' },
          { label: 'UELASTISK = STABIL', text: 'Salget endres lite av prisen.' },
            ],
            practical: 'Hvilke produkter er priselastiske for deg? Hvilke uelastiske (du kjøper uavhengig av pris)?',
            exercises: [
            {
      id: 'ml209-3-1',
      icon: '📈',
      title: 'Definisjon',
      question: 'Hva er priselastisitet?',
      choices: [
        { id: 'a', label: 'Tilfeldig variasjon', isCorrect: false, feedback: 'Strukturelt mål.' },
{ id: 'b', label: '%-endring i salg / %-endring i pris', isCorrect: true, feedback: 'Riktig! Standard formel for å måle prissensitivitet.' },
{ id: 'c', label: 'Bare for ferskvarer', isCorrect: false, feedback: 'Gjelder alle produkter.' },
{ id: 'd', label: 'Helt urelevant', isCorrect: false, feedback: 'Strategisk viktig.' },
      ],
      espenTip: 'Hvis pris opp 10 % og salg faller 20 %: elastisitet -2 (elastisk). Hvis salg faller 5 %: -0.5 (uelastisk).',
    },
    {
      id: 'ml209-3-2',
      icon: '📈',
      title: 'Elastisk eksempel',
      question: 'Hva er typisk elastisk produkt?',
      choices: [
        { id: 'a', label: 'Insulin', isCorrect: false, feedback: 'Uelastisk — pasienter må kjøpe.' },
{ id: 'b', label: 'Klær — kunder venter på salg, sammenligner mye', isCorrect: true, feedback: 'Riktig! Mange substitutter, ikke nødvendighet.' },
{ id: 'c', label: 'Drivstoff', isCorrect: false, feedback: 'Relativt uelastisk.' },
{ id: 'd', label: 'Mat', isCorrect: false, feedback: 'Også uelastisk.' },
      ],
      espenTip: 'Sommerklær: kunden venter til salget kommer. Klassisk elastisk produkt.',
    },
    {
      id: 'ml209-3-3',
      icon: '📈',
      title: 'Strategisk implikasjon',
      question: 'Hva med uelastiske produkter?',
      choices: [
        { id: 'a', label: 'Aldri øke pris', isCorrect: false, feedback: 'Tvert imot — kan det.' },
{ id: 'b', label: 'Kan øke pris uten å miste mye salg — men sårbart for negativ omtale', isCorrect: true, feedback: 'Riktig! Strategisk fleksibilitet, men etisk risiko.' },
{ id: 'c', label: 'Ignorer pris', isCorrect: false, feedback: 'Sjelden klokt.' },
{ id: 'd', label: 'Senke pris drastisk', isCorrect: false, feedback: 'Sjelden lønnsomt.' },
      ],
      espenTip: 'Insulinprodusenter har historisk presset priser opp pga uelastisitet. Etisk svært kontroversielt.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎢',
            title: 'Skumming vs penetrering',
            quote: 'Lansering-strategier.',
            content: 'Skumming: høy startpris, fokus på premium-kunder. Apple iPhone-strategi. Penetrering: lav startpris for å vinne markedsandel raskt. Spotify-strategi. Skumming krever sterk merkevare og lite konkurranse. Penetrering krever skala-fordeler og nettverkseffekter.',
            subpoints: [
                  { label: 'SKUMMING', text: 'Høy pris, høyt dekningsbidrag, premium-segment først.' },
          { label: 'PENETRERING', text: 'Lav pris, vinn markedsandel raskt, bygg skala.' },
            ],
            practical: 'Hvilken strategi har du sett ved lansering av nye produkter? Apple eller Spotify?',
            exercises: [
            {
      id: 'ml209-4-1',
      icon: '🎢',
      title: 'Skumming',
      question: 'Hva kjennetegner skumming?',
      choices: [
        { id: 'a', label: 'Lavest mulig pris', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Høy startpris for premium-segment, høy margin', isCorrect: true, feedback: 'Riktig! Apple-modell. Senker pris over tid.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'd', label: 'Bare for B2B', isCorrect: false, feedback: 'Brukes B2C også.' },
      ],
      espenTip: 'Apple iPhone lansering: høy pris til \'tidlige adoptører\'. Senere modeller får lavere priser når marketet er bygget.',
    },
    {
      id: 'ml209-4-2',
      icon: '🎢',
      title: 'Penetrering',
      question: 'Når passer penetrering?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'Når nettverkseffekter eller skala-fordeler er kritiske', isCorrect: true, feedback: 'Riktig! Spotify, WhatsApp, Uber — alle brukte penetrering.' },
{ id: 'c', label: 'Bare premium-merker', isCorrect: false, feedback: 'Det er skumming.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'WhatsApp ga bort tjenesten gratis — vant 1 milliard brukere. Klassisk penetrering.',
    },
    {
      id: 'ml209-4-3',
      icon: '🎢',
      title: 'Risiko',
      question: 'Hva er risiko ved penetrering?',
      choices: [
        { id: 'a', label: 'Ingen risiko', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'b', label: 'Vanskelig å heve pris senere, kunder forventer lav pris', isCorrect: true, feedback: 'Riktig! \'Race to the bottom\' kan ramme.' },
{ id: 'c', label: 'Bare juridisk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Norwegian: vant markedsandel med lave priser. Vanskelig å heve dem senere — pris-presset bidro til konkurs.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📅',
            title: 'Yield Management',
            quote: 'Dynamisk prising.',
            content: 'Yield Management: dynamisk prising basert på sanntidsdata om etterspørsel. Flyselskaper, hoteller, leiebiler bruker det — samme rom kan koste 800 kr én natt og 3000 kr neste. Maksimerer inntekt per enhet kapasitet. Krever mye data og avanserte algoritmer.',
            subpoints: [
                  { label: 'DATADRIVEN', text: 'Algoritmer justerer pris i sanntid basert på etterspørsel.' },
          { label: 'KAPASITETSMAKSIMERING', text: 'Maksimerer inntekt per fast kapasitet (sete, rom, bil).' },
            ],
            practical: 'Har du opplevd yield management? Hvor sterkt varierte prisene?',
            exercises: [
            {
      id: 'ml209-5-1',
      icon: '📅',
      title: 'Hva',
      question: 'Hva er yield management?',
      choices: [
        { id: 'a', label: 'Frukthøsting', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Dynamisk prising basert på sanntidsetterspørsel', isCorrect: true, feedback: 'Riktig! Algoritmedrevet pris-optimalisering.' },
{ id: 'c', label: 'Bonusplan', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for olje', isCorrect: false, feedback: 'Brukes nå overalt.' },
      ],
      espenTip: 'American Airlines var pioneer på 1980-tallet. Nå standard i fly-, hotell- og leiebilbransjer.',
    },
    {
      id: 'ml209-5-2',
      icon: '📅',
      title: 'Hvor',
      question: 'Hvor brukes yield management mest?',
      choices: [
        { id: 'a', label: 'Mat', isCorrect: false, feedback: 'Lite — ferske varer kommer og går.' },
{ id: 'b', label: 'Flyselskaper, hoteller, leiebiler — alle med fast kapasitet', isCorrect: true, feedback: 'Riktig! Bransjer med fast antall enheter (seter, rom, biler).' },
{ id: 'c', label: 'Møbler', isCorrect: false, feedback: 'Ikke fast kapasitet.' },
{ id: 'd', label: 'Bare gratis tjenester', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Spotify: Konserter med yield management. Konsertbilletter koster mer når etterspørselen er høy.',
    },
    {
      id: 'ml209-5-3',
      icon: '📅',
      title: 'Etisk',
      question: 'Er det etisk å variere pris så mye?',
      choices: [
        { id: 'a', label: 'Klart uetisk', isCorrect: false, feedback: 'Avhenger — ofte aksepteres.' },
{ id: 'b', label: 'Etisk komplisert — kan oppfattes urettferdig, men maksimerer kapasitetsbruk', isCorrect: true, feedback: 'Riktig! Bransjespesifikk debatt. Forbrukere aksepterer det i fly, mer skeptiske i andre kategorier.' },
{ id: 'c', label: 'Alltid etisk OK', isCorrect: false, feedback: 'For liberalt.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Fly: aksepteres. Drivstoff under naturkatastrofe: oppfattes uetisk. Kontekst avgjør.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🎯',
            title: 'Avansert prisdiskriminering',
            quote: 'Ulik pris til ulike grupper.',
            content: 'Prisdiskriminering: ulik pris til ulike grupper basert på betalingsvilje. Studentrabatt, seniorpriser, geografisk prising (samme tjeneste i Norge dyrere enn Polen), tidspriser (matiné billigere enn kveldskino). Maksimerer total fortjeneste ved å fange ulike prissegmenter.',
            subpoints: [
                  { label: 'BETALINGSVILJE', text: 'Forskjellige grupper har ulik vilje til å betale.' },
          { label: 'SEGMENTERING', text: 'Pris-segmenter må kunne skilles fra hverandre.' },
            ],
            practical: 'Hvilke prisdiskriminering møter du daglig? Studentrabatt? Geografisk? Tidpunkt?',
            exercises: [
            {
      id: 'ml209-6-1',
      icon: '🎯',
      title: 'Hva',
      question: 'Hva er prisdiskriminering?',
      choices: [
        { id: 'a', label: 'Diskriminering basert på rase', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Ulik pris for samme produkt til ulike grupper', isCorrect: true, feedback: 'Riktig! Strategisk segmentering basert på betalingsvilje.' },
{ id: 'c', label: 'Bare lavere pris til alle', isCorrect: false, feedback: 'Det er rabatt.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig hvis riktig gjort.' },
      ],
      espenTip: 'Akademisk term — ikke negativt. Studentrabatt er klassisk eksempel.',
    },
    {
      id: 'ml209-6-2',
      icon: '🎯',
      title: 'Eksempel',
      question: 'Hva er klassisk eksempel?',
      choices: [
        { id: 'a', label: 'Alle betaler samme', isCorrect: false, feedback: 'Det er motsatt.' },
{ id: 'b', label: 'Studentrabatt — yngre med lavere inntekt får lavere pris', isCorrect: true, feedback: 'Riktig! Vanlig og akseptert. Bedriften får salg den ellers ikke ville fått.' },
{ id: 'c', label: 'Tilfeldige rabatter', isCorrect: false, feedback: 'Strukturert segmentering.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'Kino: matiné-priser, student-rabatt, senior-rabatt — flere lag av prisdiskriminering.',
    },
    {
      id: 'ml209-6-3',
      icon: '🎯',
      title: 'Etisk',
      question: 'Når blir det problematisk?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Kan være problematisk.' },
{ id: 'b', label: 'Når prisen utnytter sårbarhet (insulin, nødtjenester)', isCorrect: true, feedback: 'Riktig! Etiske grenser ved nødvendighetsvarer.' },
{ id: 'c', label: 'Bare hvis lovstridig', isCorrect: false, feedback: 'Etikk er bredere enn jus.' },
{ id: 'd', label: 'Bare i Norge', isCorrect: false, feedback: 'Globalt spørsmål.' },
      ],
      espenTip: 'Insulinprisdiskriminering i USA er etisk svært kontroversielt. Norge har strengere regulering.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🧠',
            title: 'Psykologisk prissetting',
            quote: 'Pris som perception.',
            content: 'Terskeleffekter: 199 vs 200 — hjernen oppfatter kategorisk forskjell. Ankereffekt: dyr versjon i menyen får mellomprisen til å virke billig. Bundling: 3 for 99 kr selger bedre enn 33 kr per stykk. Dekoy-effekt: åpenbart dårlig deal får alternativene til å virke gode. Psychology > kalkyle for forbruker-prissetting.',
            subpoints: [
                  { label: 'TERSKLER', text: '199 vs 200 — kategorisk forskjell i oppfattelse.' },
          { label: 'ANKER', text: 'Dyr versjon i menyen skifter referansepunktet.' },
            ],
            practical: 'Hvilke psykologiske pris-grep har du sett? Restaurant-meny? Online-handel?',
            exercises: [
            {
      id: 'ml209-7-1',
      icon: '🧠',
      title: 'Terskeleffekt',
      question: 'Hvorfor 199 vs 200?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Hjernen oppfatter 199 som \'i 100-tallet\'; 200 som \'i 200-tallet\'', isCorrect: true, feedback: 'Riktig! Klassisk psykologi. Selv om forskjellen er 1 kr, oppfattes den større.' },
{ id: 'c', label: 'Skattefordel', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Forskning: 9-priser (199, 19.99) gir konsistent flere salg enn 200, 20 kr. Psykologisk effekt godt dokumentert.',
    },
    {
      id: 'ml209-7-2',
      icon: '🧠',
      title: 'Anker',
      question: 'Hva er ankereffekten?',
      choices: [
        { id: 'a', label: 'Båtanker', isCorrect: false, feedback: 'Bokstavelig.' },
{ id: 'b', label: 'Første pris vi ser blir referansepunkt — alle andre vurderes mot den', isCorrect: true, feedback: 'Riktig! Restaurant: dyr versjon i menyen får andre å virke billige.' },
{ id: 'c', label: 'Bare for båter', isCorrect: false, feedback: 'For konkret.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt fenomen.' },
      ],
      espenTip: 'Williams-Sonoma satte \'super-premium brødmaskin\' for 429 USD ved siden av 279 USD-versjonen. 279 USD-salg doblet.',
    },
    {
      id: 'ml209-7-3',
      icon: '🧠',
      title: 'Bundling',
      question: 'Hvorfor virker bundling?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Reduserer pris-sammenligning, øker total ordreverdi', isCorrect: true, feedback: 'Riktig! 3 for 99 kr er vanskeligere å sammenligne med enkeltpris.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for mat', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'Microsoft Office: enkeltprodukter dyrere enn pakke. Får kunder til å kjøpe mer.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '⚔️',
            title: 'Pris som konkurransefortrinn',
            quote: 'Kostnadslederskap.',
            content: 'Kostnadslederskap (Porter): bli den billigste i bransjen ved å ha lavest kostnadsstruktur. Krever skala og effektivitet. IKEA, Ryanair, Amazon, Walmart. Få bransjer kan ha mer enn én reell kostnadsleder. Strategien er kraftfull men risikabel — én feil i kostnadsstruktur og strategien faller.',
            subpoints: [
                  { label: 'LAVPRIS-STRATEGI', text: 'Kostnadslederskap krever bransjebeste kostnadsstruktur.' },
          { label: 'ÉN VINNER', text: 'Få bransjer rommer mer enn én reell kostnadsleder.' },
            ],
            practical: 'Hvem er kostnadsleder i bransjer du kjenner? Hva gjør dem så billige?',
            exercises: [
            {
      id: 'ml209-8-1',
      icon: '⚔️',
      title: 'Krav',
      question: 'Hva kreves for kostnadslederskap?',
      choices: [
        { id: 'a', label: 'Bare lave priser', isCorrect: false, feedback: 'Konsekvens, ikke krav.' },
{ id: 'b', label: 'Bransjebeste kostnadsstruktur — skala, effektivitet, prosess', isCorrect: true, feedback: 'Riktig! Kostnadene må faktisk være lavest, ikke bare prisene.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'IKEA: flatpakke, selvbetjening, masseinnkjøp = lave kostnader = lave priser. Hele forretningsmodellen optimalisert.',
    },
    {
      id: 'ml209-8-2',
      icon: '⚔️',
      title: 'Ryanair',
      question: 'Hvordan oppnår Ryanair lave priser?',
      choices: [
        { id: 'a', label: 'Bare lavt vedlikehold', isCorrect: false, feedback: 'Det ville være farlig.' },
{ id: 'b', label: 'Standardiserte fly, sekundære flyplasser, no-frills, ekstragebyrer for alt', isCorrect: true, feedback: 'Riktig! Hver kostnad presset ned. Strukturell strategi.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Subsidier', isCorrect: false, feedback: 'Helt feil — null subsidier.' },
      ],
      espenTip: 'Ryanair har laveste kostnad per sete-km i bransjen. Lave priser er resultat av strukturell strategi.',
    },
    {
      id: 'ml209-8-3',
      icon: '⚔️',
      title: 'Risiko',
      question: 'Hva er risiko?',
      choices: [
        { id: 'a', label: 'Ingen risiko', isCorrect: false, feedback: 'Stor risiko.' },
{ id: 'b', label: 'Én ny konkurrent med ny teknologi/modell kan slå deg på pris', isCorrect: true, feedback: 'Riktig! Strukturell sårbarhet.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'For lite oppmerksomhet', isCorrect: false, feedback: 'Strategi gir oppmerksomhet.' },
      ],
      espenTip: 'Tradisjonelle bilforhandlere mister terreng til Tesla og Kia/Hyundai med ny modell. Disrupsjon truer kostnadsledere.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Priskrig',
            quote: 'Ødeleggende konkurranse.',
            content: 'Priskrig: aktører senker priser for å vinne markedsandel — alle taper. Fly-bransjen er klassisk. Norske dagligvare-kjeder konkurrerer hardt på pris. Vinnere: kunder kortvarig. Tapere: alle aktører + ofte hele bransjen langsiktig. Differensiering er beste forsvar.',
            subpoints: [
                  { label: 'ALLE TAPER', text: 'Priskrig presser marginer i hele bransjen.' },
          { label: 'DIFFERENSIERING', text: 'Beste forsvar er å posisjonere unikt — ikke konkurrere på pris.' },
            ],
            practical: 'Har du sett priskrig i bransjer du kjenner? Hva ble resultatet?',
            exercises: [
            {
      id: 'ml209-9-1',
      icon: '⚠️',
      title: 'Effekt',
      question: 'Hva er effekten av priskrig?',
      choices: [
        { id: 'a', label: 'Bedrifter vinner mer', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Marginer presses for alle, ofte konkurser, kunder vinner kortsiktig', isCorrect: true, feedback: 'Riktig! \'Race to the bottom\'. Strategisk dødsfelle.' },
{ id: 'c', label: 'Bare positiv for konkurrenter', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Norwegian utløste priskrig i Europa-fly. Resultat: Norwegian til skifteretten, andre med skadede marginer.',
    },
    {
      id: 'ml209-9-2',
      icon: '⚠️',
      title: 'Forsvar',
      question: 'Beste forsvar mot priskrig?',
      choices: [
        { id: 'a', label: 'Senke pris ennå mer', isCorrect: false, feedback: 'Akselererer krigen.' },
{ id: 'b', label: 'Differensiering — gjør produktet ulikt nok at pris-sammenligning blir vanskelig', isCorrect: true, feedback: 'Riktig! Apple unngår priskrig med differensiering.' },
{ id: 'c', label: 'Saksøke konkurrenter', isCorrect: false, feedback: 'Sjelden mulig.' },
{ id: 'd', label: 'Slutte å konkurrere', isCorrect: false, feedback: 'Helt urealistisk.' },
      ],
      espenTip: 'Apple har unngått priskrig på telefoner i 15+ år gjennom differensiering på design og økosystem.',
    },
    {
      id: 'ml209-9-3',
      icon: '⚠️',
      title: 'Hvem vinner',
      question: 'Hvem vinner priskriger?',
      choices: [
        { id: 'a', label: 'Den med dypest lommer', isCorrect: false, feedback: 'Ofte sant — men dyr seier.' },
{ id: 'b', label: 'Vanligvis ingen — kortsiktig kunden, langsiktig taper alle aktører', isCorrect: true, feedback: 'Riktig! Klassisk lose-lose. Strukturell skade på bransje.' },
{ id: 'c', label: 'Den nyeste', isCorrect: false, feedback: 'Tilfeldig.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt forutsigbart.' },
      ],
      espenTip: 'Etter Norwegian-konkurs har norske flypriser steget. Bransje gjenoppbygger marginer over år.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📈',
            title: 'Pris-effekt på bunnlinjen',
            quote: 'Kraftfull spake.',
            content: 'Pris er det konkurransemiddelet som påvirker bunnlinjen raskest. 1 % høyere pris = ofte 5-10 % høyere overskudd (avhenger av margin). Ingen annen variabel har samme direkte effekt. Derfor er prisstrategi alltid et toppledelses-tema. Mange bedrifter undervurderer denne hevarmen.',
            subpoints: [
                  { label: 'HEVARMEN', text: '1 % pris = 5-10 % overskudd. Strkste enkeltspake.' },
          { label: 'UNDERVURDERT', text: 'Få bedrifter optimaliserer pris like grundig som de gjør med kostnader.' },
            ],
            practical: 'Hvis du kunne heve prisen 5 % uten salgs-fall, hva ville bunnlinjen-effekten vært?',
            exercises: [
            {
      id: 'ml209-10-1',
      icon: '📈',
      title: 'Hevarm',
      question: 'Hva er pris-effekten på bunnlinjen?',
      choices: [
        { id: 'a', label: 'Lik prisøkningen', isCorrect: false, feedback: 'Mye sterkere effekt.' },
{ id: 'b', label: '1 % pris-økning gir typisk 5-10 % overskudd-økning', isCorrect: true, feedback: 'Riktig! Multiplikator-effekt fordi alle kostnader er allerede dekket.' },
{ id: 'c', label: 'Negativ', isCorrect: false, feedback: 'Tvert imot — positiv.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell sammenheng.' },
      ],
      espenTip: 'Test: bedrift med 10 % margin. 1 % pris-økning = 1/10 av margin = 10 % overskudd-økning. Kraftfull.',
    },
    {
      id: 'ml209-10-2',
      icon: '📈',
      title: 'Hvorfor',
      question: 'Hvorfor så stor effekt?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Faste kostnader er allerede dekket — hele økningen flyr til bunnlinjen', isCorrect: true, feedback: 'Riktig! Marginalanalyse forklarer effekten.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Enkel matematikk: hvis dekningsbidrag er 30 %, gir 1 % pris-økning 3.3 % overskudd-økning.',
    },
    {
      id: 'ml209-10-3',
      icon: '📈',
      title: 'Strategisk',
      question: 'Hva betyr dette for ledelsen?',
      choices: [
        { id: 'a', label: 'Ignorere pris', isCorrect: false, feedback: 'Strategisk feil.' },
{ id: 'b', label: 'Pris er like viktig som kostnader — krever toppledelses-fokus', isCorrect: true, feedback: 'Riktig! Underprioritert i mange bedrifter.' },
{ id: 'c', label: 'Bare salg-team håndterer', isCorrect: false, feedback: 'For lavt nivå.' },
{ id: 'd', label: 'Tilfeldig setting', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Konsulentbransjen har bygget hele praksiser rundt \'pricing optimization\'. McKinsey, BCG har egne pris-team.',
    },
            ],
          },
        ]

        export default function PrisstrategiAvansertModule() {
          return (
            <DrawerModule
              moduleCode="ML2-09"
              moduleTitle="Prisstrategier (avansert)"
              moduleIcon="💰"
              storageKey="learning-ml2-prisstrategi-avansert"
              completeRoute="/learning/ml2/prisstrategi-avansert/complete"
              phases={phases}
              intro="Pris er det eneste P-et som genererer inntekt — alt annet er kostnad. 1 % høyere pris gir typisk 5-10 % bedre overskudd. Strategisk prissetting er den kraftigste enkeltfaktoren for lønnsomhet."
              vissteduAt="Norwegian bruker dynamisk prising — samme flybillett kan koste 99 kr én dag og 4990 kr neste. Yield management har erstattet flate priser."
              espenSier="Pris er ofte det undervurderte P-et. Bedrifter bruker millioner på reklame, men sjelden tid på å optimalisere prising. Det er bortkastet potensial."
      presentationLink={{ route: '/learning/presentations/ml2/prisstrategi-avansert', description: 'Prisstrategier (avansert) — 10 slides' }}
            />
          )
        }
