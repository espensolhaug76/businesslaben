        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📊',
            title: 'Markedsmiksen — 4 P-er',
            quote: 'Strategiske valg som hører sammen.',
            content: 'Markedsmiksen består av 4 P-er: Produkt (hva tilbyr vi), Pris (hva koster det), Plass (hvor selges det), Påvirkning (hvordan kommuniserer vi). Hver P er en variabel — sammen utgjør de bedriftens totale tilbud til markedet. Endrer du én, må de andre vurderes på nytt.',
            subpoints: [
                  { label: '4 P-ER', text: 'Produkt, Pris, Plass, Påvirkning.' },
          { label: 'INTEGRERT', text: 'Endre én = vurder de tre andre.' },
            ],
            practical: 'Velg en bedrift. Beskriv markedsmiksen — alle 4 P-er. Henger de sammen?',
            exercises: [
            {
      id: 'ml212-1-1',
      icon: '📊',
      title: '4 P-er',
      question: 'Hva er de 4 P-ene?',
      choices: [
        { id: 'a', label: 'Penger, posisjon, prestige, prosess', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Produkt, Pris, Plass, Påvirkning', isCorrect: true, feedback: 'Riktig! Klassisk markedsmiks.' },
{ id: 'c', label: 'Plan, prosess, prestasjon, profitt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare 3', isCorrect: false, feedback: 'For få.' },
      ],
      espenTip: 'McCarthy formulerte 4 P-er i 1960. Fortsatt grunnleggende rammeverk.',
    },
    {
      id: 'ml212-1-2',
      icon: '📊',
      title: 'Tjenester',
      question: 'Hva med tjenester?',
      choices: [
        { id: 'a', label: 'Bare 4 P-er', isCorrect: false, feedback: 'Tjenester får ofte 7 P-er.' },
{ id: 'b', label: 'Tjenester får 7 P-er — pluss People, Process, Physical evidence', isCorrect: true, feedback: 'Riktig! Tjenester er mer komplekse pga menneskelig leveranse.' },
{ id: 'c', label: 'Bare 2', isCorrect: false, feedback: 'For få.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert utvidelse.' },
      ],
      espenTip: '7 P-ene utviklet for tjenester på 1980-tallet. People (ansatte), Process (leveranse), Physical evidence (fysiske spor).',
    },
    {
      id: 'ml212-1-3',
      icon: '📊',
      title: 'Integrasjon',
      question: 'Hvorfor må P-ene henge sammen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Premium-produkt + lavpris = inkonsistent. Hver P signaliserer posisjonering', isCorrect: true, feedback: 'Riktig! Sprik forvirrer kunden og svekker merket.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare estetikk', isCorrect: false, feedback: 'Strategisk verdi.' },
      ],
      espenTip: 'Rolex selges ikke i REMA. Premium-pris krever premium-distribusjon og premium-kommunikasjon. Konsistens.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎯',
            title: 'Synergieffekter',
            quote: '1+1=3.',
            content: 'God markedsmiks har synergi — P-ene forsterker hverandre. Apple: premium-produkt + premium-pris + premium-distribusjon (egne butikker) + premium-kommunikasjon. Hver P bygger merket. Dårlig miks: motstridende signaler. Bil med luksus-design men solgt i lavpris-kanaler — taper begge segmenter.',
            subpoints: [
                  { label: 'FORSTERKING', text: 'P-ene skal forsterke samme posisjonering.' },
          { label: 'MOTSTRIDENDE = TAP', text: 'Sprikende P-er svekker hverandre.' },
            ],
            practical: 'Hvilken bedrift har best synergi mellom 4 P-er? Hvilken har sprik?',
            exercises: [
            {
      id: 'ml212-2-1',
      icon: '🎯',
      title: 'Synergi',
      question: 'Hva betyr synergi i markedsmiks?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'P-ene forsterker hverandres budskap', isCorrect: true, feedback: 'Riktig! Total effekt > sum av deler.' },
{ id: 'c', label: 'Bare for tjenester', isCorrect: false, feedback: 'Gjelder produkter også.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Apple-eksempel: design + pris + butikker + reklame — alt forsterker \'premium og innovativ\'.',
    },
    {
      id: 'ml212-2-2',
      icon: '🎯',
      title: 'Sprik-eksempel',
      question: 'Eksempel på dårlig synergi?',
      choices: [
        { id: 'a', label: 'Konsistent merkevare', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Luksus-bil solgt på REMA — produkt og distribusjon er motstridende', isCorrect: true, feedback: 'Riktig! Tilfeldig eksempel — men prinsippet stemmer.' },
{ id: 'c', label: 'Ingen problem', isCorrect: false, feedback: 'Stort problem.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Sprik kan ramme alt: produkt, pris, kanal, kommunikasjon. Sjekk konsistensen.',
    },
    {
      id: 'ml212-2-3',
      icon: '🎯',
      title: 'Test',
      question: 'Hvordan teste synergi?',
      choices: [
        { id: 'a', label: 'Magefølelse', isCorrect: false, feedback: 'Subjektiv.' },
{ id: 'b', label: 'Spør: signaliserer hver P samme posisjonering?', isCorrect: true, feedback: 'Riktig! Strukturert sjekk på konsistens.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'For sent — bør sjekkes før.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hvert tiltak bør \'passe\' merkets posisjonering. Hvis ikke, kutt eller juster.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '📋',
            title: 'Markedsplanen som styringsverktøy',
            quote: 'Det dokumentet som binder alt sammen.',
            content: 'Markedsplanen samler analyse, mål, strategi, tiltak og budsjett i ett dokument. For en mellomstor bedrift typisk 30-80 sider. Brukes som styringsverktøy gjennom året. Kortere er ofte bedre — én side som folk handler på er mer verdifull enn 200 sider som ingen leser.',
            subpoints: [
                  { label: 'STYRINGSVERKTØY', text: 'Brukes som referanse gjennom året.' },
          { label: 'HANDLING > LENGDE', text: 'Kort plan som handles på > lang plan som arkiveres.' },
            ],
            practical: 'Har bedriften du jobber for / kjenner en markedsplan? Brukes den faktisk?',
            exercises: [
            {
      id: 'ml212-3-1',
      icon: '📋',
      title: 'Lengde',
      question: 'Hva er typisk for en god markedsplan?',
      choices: [
        { id: 'a', label: 'Minst 200 sider', isCorrect: false, feedback: 'For lang.' },
{ id: 'b', label: '30-80 sider for mellomstore bedrifter, men kortere er ofte bedre', isCorrect: true, feedback: 'Riktig! Lengde alene gir ikke verdi.' },
{ id: 'c', label: 'Bare 1 setning', isCorrect: false, feedback: 'For kort.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Test: kan du forklare planen på 5 minutter? Hvis nei, er den for kompleks.',
    },
    {
      id: 'ml212-3-2',
      icon: '📋',
      title: 'Funksjon',
      question: 'Hva er markedsplanens funksjon?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'b', label: 'Styringsverktøy gjennom året — refereres til i beslutninger', isCorrect: true, feedback: 'Riktig! Brukt riktig: kompass.' },
{ id: 'c', label: 'Bare for ledelsen', isCorrect: false, feedback: 'Bredere bruk.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Hvis planen ligger i skuffen etter januar, er den ikke et styringsverktøy.',
    },
    {
      id: 'ml212-3-3',
      icon: '📋',
      title: 'Hvor mislykkes',
      question: 'Hva er klassisk feil?',
      choices: [
        { id: 'a', label: 'For ambisiøs', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'b', label: 'Skrives én gang, refereres aldri til, glemmes', isCorrect: true, feedback: 'Riktig! \'Strategi-arkivet\'-feilen.' },
{ id: 'c', label: 'For mange møter', isCorrect: false, feedback: 'Symptom.' },
{ id: 'd', label: 'For dyrt', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
      ],
      espenTip: 'Lag månedlige planmøter. Sjekk: er vi på sporet? Avvik = juster.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📈',
            title: 'Hvorfor måle?',
            quote: 'Læring, kontroll, bevis.',
            content: 'Effektmåling tjener tre formål: 1) Læring (hva virker, hva virker ikke?), 2) Kontroll (er vi på sporet mot målene?), 3) Bevis (legitimerer markedsføringsbudsjettet for ledelsen). Uten måling er markedsføring magi. Med måling er det forretningsdisiplin.',
            subpoints: [
                  { label: '3 FORMÅL', text: 'Læring, kontroll, bevis.' },
          { label: 'DISIPLIN', text: 'Måling tvinger frem strukturert tenkning.' },
            ],
            practical: 'Hva ville du målt for å vite om markedsføring i bedriften du kjenner virker?',
            exercises: [
            {
      id: 'ml212-4-1',
      icon: '📈',
      title: '3 grunner',
      question: 'Hvorfor måle effekt?',
      choices: [
        { id: 'a', label: 'Bare lovkrav', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'b', label: 'Læring + kontroll + bevis for ledelsen', isCorrect: true, feedback: 'Riktig! Tre uavhengige verdier.' },
{ id: 'c', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'd', label: 'Bare for konsulenter', isCorrect: false, feedback: 'For ledelsen først.' },
      ],
      espenTip: 'Måling er hvordan markedsføring blir tatt på alvor i ledelsen. Uten data er det \'kreativt arbeid\'.',
    },
    {
      id: 'ml212-4-2',
      icon: '📈',
      title: 'Læring',
      question: 'Hvordan brukes læring?',
      choices: [
        { id: 'a', label: 'Bare arkivere', isCorrect: false, feedback: 'Verdiløst.' },
{ id: 'b', label: 'Justere neste kampanje basert på hva som virket', isCorrect: true, feedback: 'Riktig! Iterativ forbedring over tid.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Best in class: A/B-tester hver kampanje. Læring akkumulerer over år.',
    },
    {
      id: 'ml212-4-3',
      icon: '📈',
      title: 'Bevis',
      question: 'Hvorfor er bevis viktig?',
      choices: [
        { id: 'a', label: 'Bare ego', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'b', label: 'Når økonomi-direktør spør \'hva fikk vi for pengene?\' kreves dokumentasjon', isCorrect: true, feedback: 'Riktig! Marketing-budsjett er ofte først ut i kostnadskutt.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare i krise', isCorrect: false, feedback: 'Daglig behov.' },
      ],
      espenTip: 'Marketing-direktører som kan vise ROI behold budsjett. De som ikke kan, taper det.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🧠',
            title: 'Kommunikasjonseffekt',
            quote: 'Ble vi husket? Endret vi holdninger?',
            content: 'Kommunikasjonseffekt måles i kjennskap (kjenner kundene oss?), recall (husker de reklamen?), preferanse (foretrekker de oss?). Måles via brand tracking-undersøkelser. Tar tid å se utslag — men er strategiske indikatorer på merkevarens helse.',
            subpoints: [
                  { label: 'KJENNSKAP', text: 'Andel av målgruppen som kjenner merket.' },
          { label: 'RECALL', text: 'Andel som spontant husker reklamen og budskapet.' },
            ],
            practical: 'Hvilke merker har du sterk uhjulpen kjennskap til (kommer på dem uten påminnelse)?',
            exercises: [
            {
      id: 'ml212-5-1',
      icon: '🧠',
      title: 'Uhjulpen',
      question: 'Hva er uhjulpen kjennskap?',
      choices: [
        { id: 'a', label: 'Med påminnelse', isCorrect: false, feedback: 'Det er hjulpen.' },
{ id: 'b', label: 'Spontan kjennskap — kunden nevner merket uten påminnelse', isCorrect: true, feedback: 'Riktig! Sterkeste indikator på topp-of-mind.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Måling brukes overalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Test: \'Nevn 3 mobiloperatører\'. Spontane svar = uhjulpen kjennskap. Sterke merker scorer høyt.',
    },
    {
      id: 'ml212-5-2',
      icon: '🧠',
      title: 'Ad recall',
      question: 'Hva betyr ad recall?',
      choices: [
        { id: 'a', label: 'Tilbakekalling av reklame', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Andel av målgruppen som husker en spesifikk reklame', isCorrect: true, feedback: 'Riktig! Måles etter kampanje for å vurdere effekt.' },
{ id: 'c', label: 'Bare for produktproblemer', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert måling.' },
      ],
      espenTip: 'Bra ad recall: 30-50 %. Verdensklasse: 60+ %. Avhenger av kampanje-type og kategori.',
    },
    {
      id: 'ml212-5-3',
      icon: '🧠',
      title: 'Brand tracking',
      question: 'Hvor ofte måles?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Kvartalsvis eller halvårlig — ser endring over tid', isCorrect: true, feedback: 'Riktig! Frekvens nok til å fange utvikling, ikke for ofte.' },
{ id: 'c', label: 'Daglig', isCorrect: false, feedback: 'For ofte og dyrt.' },
{ id: 'd', label: 'Bare ved krise', isCorrect: false, feedback: 'For sjelden — bør være proaktivt.' },
      ],
      espenTip: 'Norske store bedrifter (DnB, Telenor, Equinor) gjør kvartalsvis brand tracking. Standard.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '💰',
            title: 'Salgseffekt',
            quote: 'Hvor mye økte salget?',
            content: 'Salgseffekt: hvor mye økte omsetningen direkte av kampanjen? ROAS (Return on Ad Spend) er nøkkeltallet for digitale kampanjer — inntekt / annonsekostnad. ROAS 3 = hver krone i annonser ga 3 kroner i salg. Over 3 regnes generelt som lønnsomt for e-handel.',
            subpoints: [
                  { label: 'ROAS = SALGSEFFEKT', text: 'Inntekt / annonsekostnad.' },
          { label: 'ROAS 3+', text: 'Generelt lønnsomt for e-handel.' },
            ],
            practical: 'Hvilken ROAS ville vært akseptabel for en bedrift du kjenner? Hva avhenger det av?',
            exercises: [
            {
      id: 'ml212-6-1',
      icon: '💰',
      title: 'ROAS',
      question: 'Hva betyr ROAS?',
      choices: [
        { id: 'a', label: 'Rate of Annual Sales', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Return on Ad Spend — inntekt per annonsekrone', isCorrect: true, feedback: 'Riktig! Standard performance metric.' },
{ id: 'c', label: 'Average Sales', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Risk Assessment', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'ROAS 4 = 4× tilbakebetaling. ROAS over 3 er generelt lønnsomt.',
    },
    {
      id: 'ml212-6-2',
      icon: '💰',
      title: 'Margin-effekt',
      question: 'Hvorfor avhenger \'lønnsom ROAS\' av margin?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Matematisk.' },
{ id: 'b', label: 'Lav margin krever høyere ROAS for å være lønnsom', isCorrect: true, feedback: 'Riktig! Hvis margin er 20 %, krever ROAS 5+ for å være lønnsom etter alle kostnader.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare estetikk', isCorrect: false, feedback: 'Praktisk regel.' },
      ],
      espenTip: 'Lavpris-bransjer (mat) krever høyere ROAS. Premium-bransjer (luksus) kan klare seg med lavere.',
    },
    {
      id: 'ml212-6-3',
      icon: '💰',
      title: 'Multi-touch',
      question: 'Hva er problemet med last-click attribution?',
      choices: [
        { id: 'a', label: 'For komplisert', isCorrect: false, feedback: 'Tvert imot — for enkelt.' },
{ id: 'b', label: 'Gir all kreditt til siste touchpoint, ignorerer tidlige merkebyggende kanaler', isCorrect: true, feedback: 'Riktig! Favoriserer typisk Google Ads, undervurderer TV/sosiale medier.' },
{ id: 'c', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig.' },
      ],
      espenTip: 'Multi-touch attribution gir mer presist bilde — men er vanskeligere å sette opp.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📐',
            title: 'ROI i markedsføring',
            quote: 'Avkastning på investert markedskapital.',
            content: 'ROI = (gevinst - kostnad) / kostnad × 100. Inkluderer alle kostnader, ikke bare annonser (også internt arbeid). Hvis ROI er 30 %, er hver krone investert verdt 1,30 kr. Vanskelig å beregne presist for merkebygging — men kritisk for å rettferdiggjøre marketing-budsjett.',
            subpoints: [
                  { label: 'HELHETLIG ROI', text: 'Inkluder alle kostnader — internt arbeid, byråer, teknologi.' },
          { label: 'KORT vs LANG SIKT', text: 'Direktesalg er lett; merkebygging er vanskelig å attribuere.' },
            ],
            practical: 'Hvordan ville du beregnet ROI for en merkekampanje uten direkte salg?',
            exercises: [
            {
      id: 'ml212-7-1',
      icon: '📐',
      title: 'Definisjon',
      question: 'Hva er ROI?',
      choices: [
        { id: 'a', label: 'Bare omsetning', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: '(Gevinst - kostnad) / kostnad × 100', isCorrect: true, feedback: 'Riktig! Standard formel for avkastning.' },
{ id: 'c', label: 'Bare kostnad', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'ROI 30 % = 1.30 kr tilbake per krone investert. Standard finansielt mål.',
    },
    {
      id: 'ml212-7-2',
      icon: '📐',
      title: 'Inkluder',
      question: 'Hva må inkluderes i markedskostnad?',
      choices: [
        { id: 'a', label: 'Bare annonser', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Annonser + internt arbeid + byråer + teknologi', isCorrect: true, feedback: 'Riktig! Helhetlig kostnadsbilde.' },
{ id: 'c', label: 'Bare lønninger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mange undervurderer marketing-kostnad ved å glemme internt arbeid. Gir feilaktig høy ROI.',
    },
    {
      id: 'ml212-7-3',
      icon: '📐',
      title: 'Vanskelig',
      question: 'Hvorfor er merkebygging vanskelig å attribuere?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelle årsaker.' },
{ id: 'b', label: 'Effekt skjer over år, mange faktorer påvirker, ikke direkte salg-link', isCorrect: true, feedback: 'Riktig! Strukturell utfordring i ROI-beregning.' },
{ id: 'c', label: 'Bare for B2B', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Coca-Cola kan ikke beregne nøyaktig ROI for julekampanjen. Men de vet at kjennskap og preferanse holdes høyt — strategisk verdi.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🔍',
            title: 'Digital sporing — Analytics',
            quote: 'Følg kunden fra første klikk til ferdig kjøp.',
            content: 'Google Analytics, Hubspot, Mixpanel sporer hver bruker gjennom konverteringstrakten. Kan se: hvor de kom fra, hva de gjorde, hvor de falt fra, hva som ble kjøp. GDPR setter grenser for personlig sporing. Cookie-løse løsninger blir viktigere fra 2024.',
            subpoints: [
                  { label: 'ANALYTICS', text: 'Standard verktøy: Google Analytics, Hubspot.' },
          { label: 'GDPR-EFFEKT', text: 'Reduserer presisjon, men målinger er fortsatt mulige.' },
            ],
            practical: 'Bruker bedriften du kjenner Google Analytics? Hva sporer de?',
            exercises: [
            {
      id: 'ml212-8-1',
      icon: '🔍',
      title: 'Funksjon',
      question: 'Hva gjør analytics-verktøy?',
      choices: [
        { id: 'a', label: 'Bare antall besøk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Sporer hele brukerreisen — kilde, atferd, konvertering', isCorrect: true, feedback: 'Riktig! Helhetlig analyse av digital atferd.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig med samtykke.' },
      ],
      espenTip: 'Google Analytics 4 er gratis og brukes av millioner av nettsider globalt.',
    },
    {
      id: 'ml212-8-2',
      icon: '🔍',
      title: 'Konverteringstrakt',
      question: 'Hva er en konverteringstrakt?',
      choices: [
        { id: 'a', label: 'Fysisk trakt', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Strukturert vei fra første kontakt til kjøp — typisk smalere ved hvert steg', isCorrect: true, feedback: 'Riktig! Visualisering av kundereisen.' },
{ id: 'c', label: 'Bare for små', isCorrect: false, feedback: 'Brukes alle størrelser.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert modell.' },
      ],
      espenTip: '100 besøk → 30 produktvisninger → 5 handlevogn → 1 kjøp. Trakt blir smalere — analyse identifiserer hvor folk faller fra.',
    },
    {
      id: 'ml212-8-3',
      icon: '🔍',
      title: 'GDPR-effekt',
      question: 'Hva har GDPR endret?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Stor effekt.' },
{ id: 'b', label: 'Strengere samtykkekrav — målretting basert på personlige data er vanskeligere', isCorrect: true, feedback: 'Riktig! Strukturell endring i bransjen.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'EU/EØS-direktiv.' },
{ id: 'd', label: 'Bare for Facebook', isCorrect: false, feedback: 'Hele bransjen rammet.' },
      ],
      espenTip: 'Apples ATT (App Tracking Transparency) i 2021 reduserte effektiviteten av målrettet annonsering ytterligere.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Feilkilder ved måling',
            quote: 'Sesong, konkurrenter, eksterne sjokk.',
            content: 'Måling er ikke perfekt. Sesong (julehandel ≠ januarsalg), konkurrenter (deres kampanjer påvirker dine resultater), eksterne sjokk (pandemi, krig, valuta). Tolking krever fagforståelse, ikke bare tallene. Korrelasjon er ikke kausalitet — pass på å trekke for raske konklusjoner.',
            subpoints: [
                  { label: 'KORRELASJON ≠ KAUSALITET', text: 'Salg økte etter kampanjen — men var det kampanjen eller noe annet?' },
          { label: 'KONTEKST', text: 'Tall må tolkes i lys av sesong, konkurranse, makro.' },
            ],
            practical: 'Salget steg 20 % etter kampanjen. Men: solskinnsdag, konkurrent stengt, jul. Hva avgjorde egentlig?',
            exercises: [
            {
      id: 'ml212-9-1',
      icon: '⚠️',
      title: 'Korrelasjon',
      question: 'Hva er forskjellen på korrelasjon og kausalitet?',
      choices: [
        { id: 'a', label: 'De er det samme', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Korrelasjon = ting endrer seg sammen; kausalitet = én forårsaker den andre', isCorrect: true, feedback: 'Riktig! Kritisk skille i analyse.' },
{ id: 'c', label: 'Bare statistikk-jargong', isCorrect: false, feedback: 'Praktisk viktig.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert skille.' },
      ],
      espenTip: 'Klassisk eksempel: iskremsalg og drukninger korrelerer — men begge skyldes sommer, ikke at iskrem forårsaker drukninger.',
    },
    {
      id: 'ml212-9-2',
      icon: '⚠️',
      title: 'Sesong',
      question: 'Hvordan håndtere sesong?',
      choices: [
        { id: 'a', label: 'Ignorere', isCorrect: false, feedback: 'Gir feilaktige konklusjoner.' },
{ id: 'b', label: 'Sammenligne med samme periode året før', isCorrect: true, feedback: 'Riktig! Year-on-year-sammenligning fjerner sesongeffekt.' },
{ id: 'c', label: 'Bare se på totale tall', isCorrect: false, feedback: 'Sesong skjuler virkelig effekt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert metode.' },
      ],
      espenTip: 'Detaljhandel-bransjen lever av YoY-sammenligning. Standard analytisk teknikk.',
    },
    {
      id: 'ml212-9-3',
      icon: '⚠️',
      title: 'A/B-test',
      question: 'Hvorfor bruke A/B-test?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Kraftfull metode.' },
{ id: 'b', label: 'Eliminerer eksterne faktorer — sammenligner to varianter samtidig', isCorrect: true, feedback: 'Riktig! Best-praksis for å isolere kausalitet.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Brukes alle størrelser.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Lovlig.' },
      ],
      espenTip: 'Send 50 % trafikk til variant A, 50 % til B. Mål forskjellen. Kontrollert eksperiment.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🎯',
            title: 'Kontrollfasen — start på neste runde',
            quote: 'Lukk loopen.',
            content: 'Kontrollfasen er starten på neste planleggingsperiode. Læring fra forrige runde bygges inn i neste års strategi. Det er hvordan markedsføring vokser fra håndverk til vitenskap. Mange bedrifter glemmer dette — gjør samme feil år etter år. Disiplinert review er konkurransefortrinn.',
            subpoints: [
                  { label: 'LÆRING ER PRODUKT', text: 'Hver kampanje gir innsikt for neste.' },
          { label: 'CYKLISK', text: 'Plan → utfør → mål → lær → ny plan.' },
            ],
            practical: 'Hva har du lært av siste prosjekt du var med på? Hvordan brukes læringen videre?',
            exercises: [
            {
      id: 'ml212-10-1',
      icon: '🎯',
      title: 'Prosess',
      question: 'Hvordan ser læringssyklusen ut?',
      choices: [
        { id: 'a', label: 'Plan → utfør → ferdig', isCorrect: false, feedback: 'Mangler læring og iterasjon.' },
{ id: 'b', label: 'Plan → utfør → mål → lær → ny plan', isCorrect: true, feedback: 'Riktig! Cyklisk læring.' },
{ id: 'c', label: 'Bare planlegging', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'PDCA-syklus (Plan-Do-Check-Act) er klassisk modell. Brukt i kvalitetsledelse i 80+ år.',
    },
    {
      id: 'ml212-10-2',
      icon: '🎯',
      title: 'Hva mister man',
      question: 'Hva mister bedrifter som ikke gjør review?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Mye.' },
{ id: 'b', label: 'Læring som kunne forbedret neste kampanje — gjentar samme feil', isCorrect: true, feedback: 'Riktig! Klassisk feil i mange bedrifter.' },
{ id: 'c', label: 'Bare tid', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Bedrifter som dokumenterer læring konsistent har 3-5x bedre marketing-effekt over år. Forskning støtter dette.',
    },
    {
      id: 'ml212-10-3',
      icon: '🎯',
      title: 'Disiplin',
      question: 'Hva er kritisk for kontrollfasen?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Disiplinert review-prosess — ikke bare arkivering', isCorrect: true, feedback: 'Riktig! Faste reviews i kalenderen, dokumenterte læringspoeng.' },
{ id: 'c', label: 'Bare ledelse', isCorrect: false, feedback: 'Bredt teamarbeid.' },
{ id: 'd', label: 'Bare i krise', isCorrect: false, feedback: 'Konstant prosess.' },
      ],
      espenTip: 'Best praksis: månedlige reviews + årlig retrospektiv. Læring akkumulerer.',
    },
            ],
          },
        ]

        export default function MarkedsmiksOgEffektmalingModule() {
          return (
            <DrawerModule
              moduleCode="ML2-12"
              moduleTitle="Markedsmiks og effektmåling"
              moduleIcon="📊"
              storageKey="learning-ml2-markedsmiks-og-effektmaling"
              completeRoute="/learning/ml2/markedsmiks-og-effektmaling/complete"
              phases={phases}
              intro="Markedsmiksen er sammensetningen av strategiske valg innen produkt, pris, plass og påvirkning. Effektmåling forteller om miksen virker. KPI, ROI, ROAS og analytics gjør markedsføringen målbar — fra magi til disiplin."
              vissteduAt="Bedrifter som måler markedsføringen sin systematisk har 30 % høyere avkastning enn de som ikke gjør det. Måling tvinger frem disiplin og læring."
              espenSier="Halvparten av reklamebudsjettet er bortkastet — du vet bare ikke hvilken halvpart. Effektmåling reduserer det til kanskje en fjerdedel."
      presentationLink={{ route: '/learning/presentations/ml2/markedsmiks-og-effektmaling', description: 'Markedsmiks og effektmåling — 10 slides' }}
            />
          )
        }
