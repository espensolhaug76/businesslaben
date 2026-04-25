        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '⚖️',
            title: 'Triple Bottom Line',
            quote: 'Profit + People + Planet.',
            content: 'Måle suksess på tre dimensjoner: økonomi (Profit), sosial nytte (People), miljø (Planet). Tradisjonelt regnskap måler bare Profit. Moderne bedrifter rapporterer på alle tre. EUs CSRD (Corporate Sustainability Reporting Directive) gjør trippelt rapportering lovpålagt for store bedrifter fra 2024.',
            subpoints: [
                  { label: '3 DIMENSJONER', text: 'Profit, People, Planet — alle måles.' },
          { label: 'CSRD-LOVKRAV', text: 'EU-direktiv gjør bærekraftsrapportering lovpålagt for større bedrifter.' },
            ],
            practical: 'Hva tror du er din egen \'Triple Bottom Line\'? Hva måler du selv på de tre dimensjonene?',
            exercises: [
            {
      id: 'ml205-1-1',
      icon: '⚖️',
      title: '3 P-er',
      question: 'Hva står Triple Bottom Line for?',
      choices: [
        { id: 'a', label: 'Penger, posisjon, prestige', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Profit, People, Planet', isCorrect: true, feedback: 'Riktig! Tre bunnlinjer i bærekrafts-regnskap.' },
{ id: 'c', label: 'Pris, produkt, plass', isCorrect: false, feedback: 'Det er markedsmiks.' },
{ id: 'd', label: 'Plan, prosess, prestasjon', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Begrepet ble populært etter John Elkingtons bok i 1997. Endret hvordan bedrifter måler seg selv.',
    },
    {
      id: 'ml205-1-2',
      icon: '⚖️',
      title: 'Lovkrav',
      question: 'Er TBL bare frivillig?',
      choices: [
        { id: 'a', label: 'Ja, alltid frivillig', isCorrect: false, feedback: 'Helt feil — lover endrer seg.' },
{ id: 'b', label: 'Nei — EUs CSRD gjør det lovpålagt for store bedrifter fra 2024', isCorrect: true, feedback: 'Riktig! Bærekraft er nå lovpålagt rapportering for de fleste mellomstore-store bedrifter.' },
{ id: 'c', label: 'Bare for offentlige', isCorrect: false, feedback: 'Privat sektor like rammet.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Nei — EU-direktiv først.' },
      ],
      espenTip: 'CSRD-rapportering: ~50 000 europeiske bedrifter rammes. Ekstern revisjon kreves.',
    },
    {
      id: 'ml205-1-3',
      icon: '⚖️',
      title: 'Hvorfor',
      question: 'Hvorfor måle på 3 dimensjoner?',
      choices: [
        { id: 'a', label: 'Politisk korrekthet', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Bedrifter påvirker miljø og samfunn — tradisjonelt regnskap skjuler kostnadene', isCorrect: true, feedback: 'Riktig! Eksterne effekter (forurensning, sosial skade) inkluderes ikke i tradisjonelt regnskap. TBL korrigerer.' },
{ id: 'c', label: 'Bare for reklame', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Krever færre revisorer', isCorrect: false, feedback: 'Tvert imot.' },
      ],
      espenTip: 'Klima er den største \'gratisressursen\' bedrifter har historisk konsumert. TBL gjør den synlig.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🤝',
            title: 'Interessentanalyse',
            quote: 'Hvem påvirker oss, hvem påvirker vi?',
            content: 'Interessenter (stakeholders) er alle som påvirker eller blir påvirket av bedriften: eiere, ansatte, kunder, leverandører, lokalsamfunn, miljø, myndigheter. Kartlegg dem på 2D-matrise: makt × interesse. Høy makt + høy interesse = nøkkel-interessenter — kommuniser tett.',
            subpoints: [
                  { label: 'ALLE', text: 'Eiere, ansatte, kunder, leverandører, lokalsamfunn, miljø, myndigheter.' },
          { label: 'MAKT × INTERESSE', text: 'Strukturert prioritering basert på påvirkning og engasjement.' },
            ],
            practical: 'Liste opp alle interessenter for bedriften du jobber for / kjenner. Hvem har høyest makt + interesse?',
            exercises: [
            {
      id: 'ml205-2-1',
      icon: '🤝',
      title: 'Definisjon',
      question: 'Hva er en interessent?',
      choices: [
        { id: 'a', label: 'Bare eiere', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Alle som påvirker eller blir påvirket av bedriften', isCorrect: true, feedback: 'Riktig! Bredt konsept — fra eiere til lokalsamfunn til miljø.' },
{ id: 'c', label: 'Bare kunder', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare ansatte', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Klassisk skifte fra \'shareholder\'-tenkning (kun eiere) til \'stakeholder\'-tenkning (alle berørte).',
    },
    {
      id: 'ml205-2-2',
      icon: '🤝',
      title: 'Makt-interesse',
      question: 'Hvilke får mest oppmerksomhet?',
      choices: [
        { id: 'a', label: 'Tilfeldige', isCorrect: false, feedback: 'Strukturert prioritering.' },
{ id: 'b', label: 'Høy makt + høy interesse — nøkkel-interessenter', isCorrect: true, feedback: 'Riktig! Kommuniser tett. Avgjør ofte bedriftens skjebne.' },
{ id: 'c', label: 'Lav makt + lav interesse', isCorrect: false, feedback: 'Behov minimal oppmerksomhet.' },
{ id: 'd', label: 'Bare myndigheter', isCorrect: false, feedback: 'Sjelden eneste høyt prioritert.' },
      ],
      espenTip: 'Tegn matrisen: makt på x-akse, interesse på y-akse. Plot interessenter. Øvre høyre = nøkkel.',
    },
    {
      id: 'ml205-2-3',
      icon: '🤝',
      title: 'Norsk eksempel',
      question: 'Hvem er typisk nøkkel-interessenter for Equinor?',
      choices: [
        { id: 'a', label: 'Bare aksjonærer', isCorrect: false, feedback: 'For smalt for stort selskap.' },
{ id: 'b', label: 'Den norske stat (eier 67 %), miljøorganisasjoner, ansatte, lokalsamfunn', isCorrect: true, feedback: 'Riktig! Multi-stakeholder-bilde. Hver har stor makt og interesse.' },
{ id: 'c', label: 'Tilfeldige forbrukere', isCorrect: false, feedback: 'Indirekte.' },
{ id: 'd', label: 'Konkurrenter', isCorrect: false, feedback: 'Konkurrenter er ikke interessenter, men kontekst.' },
      ],
      espenTip: 'For statlig kontrollerte selskaper er staten alltid nøkkel-interessent — politikk påvirker strategi.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🌍',
            title: 'FNs bærekraftsmål',
            quote: '17 mål, 2030.',
            content: 'FN vedtok i 2015 17 bærekraftsmål med 169 delmål. Globalt rammeverk for bærekraftig utvikling innen 2030. Bedrifter velger ut 2-4 mål som er mest relevante — ikke alle 17 (det blir uforpliktende). Equinor: mål 7 (energi) og 13 (klima). Tomra: mål 12 (ansvarlig forbruk).',
            subpoints: [
                  { label: '17 MÅL', text: 'Globalt rammeverk innen 2030.' },
          { label: 'VELG 2-4', text: 'Fokuser på det dere faktisk kan påvirke vesentlig.' },
            ],
            practical: 'Hvilke 2-3 av FNs 17 bærekraftsmål kan en lokal bedrift du kjenner faktisk påvirke vesentlig?',
            exercises: [
            {
      id: 'ml205-3-1',
      icon: '🌍',
      title: 'Antall mål',
      question: 'Hvor mange bærekraftsmål?',
      choices: [
        { id: 'a', label: '10', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '17 — vedtatt av FN i 2015', isCorrect: true, feedback: 'Riktig! 17 mål med 169 delmål. Globalt rammeverk innen 2030.' },
{ id: 'c', label: '20', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: '30', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Norge har eget koordineringsorgan for SDGs. Stortinget rapporterer årlig på fremgang.',
    },
    {
      id: 'ml205-3-2',
      icon: '🌍',
      title: 'Strategi',
      question: 'Hvor mange mål bør en bedrift velge?',
      choices: [
        { id: 'a', label: 'Alle 17', isCorrect: false, feedback: 'For uforpliktende — kan ikke fokusere på alt.' },
{ id: 'b', label: '2-4 som dere faktisk kan påvirke vesentlig', isCorrect: true, feedback: 'Riktig! Fokus gir resultater. Spre ressurser tynt = ingen effekt.' },
{ id: 'c', label: 'Bare 1', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig antall', isCorrect: false, feedback: 'Strukturert valg er bedre.' },
      ],
      espenTip: 'Test: hvilke mål kan dere måle dere selv på? Hvis svaret er \'ingen\', velg andre.',
    },
    {
      id: 'ml205-3-3',
      icon: '🌍',
      title: 'Norsk eksempel',
      question: 'Hvilke mål passer Tomra?',
      choices: [
        { id: 'a', label: 'Mål 12 — ansvarlig forbruk og produksjon (sirkulær økonomi)', isCorrect: true, feedback: 'Riktig! Tomras kjernevirksomhet er resirkulering. Direkte kobling til mål 12.' },
{ id: 'b', label: 'Mål 4 — utdanning', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'c', label: 'Mål 16 — institusjoner', isCorrect: false, feedback: 'Mindre direkte.' },
{ id: 'd', label: 'Tilfeldige', isCorrect: false, feedback: 'Ikke strategisk valg.' },
      ],
      espenTip: 'Velg mål som er kjerne i forretningsmodellen. Da blir bærekraft strategisk, ikke pynt.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '💼',
            title: 'CSR (Corporate Social Responsibility)',
            quote: 'Frivillig samfunnsbidrag.',
            content: 'CSR er bedriftens frivillige bidrag — utover lovkrav. Investering i lokalsamfunn, etiske leverandørkjeder, miljøtiltak utover minimum. Drevet av forventninger fra kunder (særlig yngre), ansatte (rekrutteringsfortrinn), investorer (ESG-fond). Ikke alltid lønnsomt på kort sikt, men bygger merkevare langsiktig.',
            subpoints: [
                  { label: 'FRIVILLIG', text: 'Utover lovkrav. Strategisk valg, ikke compliance.' },
          { label: 'FLERSIDIG VINNING', text: 'Lojalere kunder, bedre rekruttering, lavere risiko, tilgang til ESG-kapital.' },
            ],
            practical: 'Hvilke bedrifter har du sett bygge konkurransefortrinn rundt CSR? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml205-4-1',
      icon: '💼',
      title: 'Definisjon',
      question: 'Hva er CSR?',
      choices: [
        { id: 'a', label: 'Lovkrav om miljø', isCorrect: false, feedback: 'Frivillig — utover lovkrav.' },
{ id: 'b', label: 'Frivillig samfunnsbidrag utover lovkrav', isCorrect: true, feedback: 'Riktig! Skiller seg fra compliance ved at det er valgfritt — men strategisk viktig.' },
{ id: 'c', label: 'Bare donasjoner', isCorrect: false, feedback: 'Bredere — inkluderer ansatte, leverandører, miljø.' },
{ id: 'd', label: 'Reklame', isCorrect: false, feedback: 'Ikke CSR — selv om CSR brukes i reklame.' },
      ],
      espenTip: 'CSR er ikke marketing — men resultatet er ofte bedre marketing. Forskjellen ligger i intensjon og varighet.',
    },
    {
      id: 'ml205-4-2',
      icon: '💼',
      title: 'Drivere',
      question: 'Hvem driver CSR-engasjement?',
      choices: [
        { id: 'a', label: 'Bare myndigheter', isCorrect: false, feedback: 'Bredere driver-base.' },
{ id: 'b', label: 'Kunder (særlig yngre), ansatte, investorer, lovverk', isCorrect: true, feedback: 'Riktig! Multi-stakeholder-press. Yngre generasjoner er sterkest driver.' },
{ id: 'c', label: 'Bare kunder', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldighet', isCorrect: false, feedback: 'Strukturelle drivere.' },
      ],
      espenTip: 'Yngre forbrukere prioriterer CSR. Det er strategisk hvis du vil vinne dem.',
    },
    {
      id: 'ml205-4-3',
      icon: '💼',
      title: 'Stormberg',
      question: 'Hva er Stormbergs CSR-strategi?',
      choices: [
        { id: 'a', label: 'Bare donasjoner', isCorrect: false, feedback: 'De gjør mer.' },
{ id: 'b', label: 'Ansetter folk med hull i CV-en, åpenhet om kostnader, miljøvennlige produkter', isCorrect: true, feedback: 'Riktig! Ekte og konkret. Bygger merkevare på sosial profil.' },
{ id: 'c', label: 'Ingen CSR', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Kun på papir', isCorrect: false, feedback: 'Stormberg er kjent for handlinger.' },
      ],
      espenTip: 'Verdibasert differensiering er vanskelig å kopiere. Konkurrenter kan matche pris/kvalitet, ikke autentiske verdier på et øyeblikk.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🏆',
            title: 'Omdømme',
            quote: 'Kapitalen vi ikke eier.',
            content: 'Omdømme er kapitalen vi ikke eier, men forvalter. Bygges over år gjennom konsistent oppførsel — kan ødelegges på minutter ved skandale. Tillit er fundamentet. Reputation Institute måler bedrifters omdømme årlig. Sterkt omdømme: høyere prising-makt, lojal kundebase, lettere rekruttering, motstandskraft mot kriser.',
            subpoints: [
                  { label: 'YEARS TO BUILD', text: 'Omdømme tar år å bygge, kan ødelegges på dager.' },
          { label: 'VERDI', text: 'Sterkt omdømme = pricing-makt + lojalitet + rekrutterings-fortrinn.' },
            ],
            practical: 'Hvilke norske bedrifter har sterkt omdømme? Hvilke har dårlig?',
            exercises: [
            {
      id: 'ml205-5-1',
      icon: '🏆',
      title: 'Tidsperspektiv',
      question: 'Hvor lang tid tar å bygge sterkt omdømme?',
      choices: [
        { id: 'a', label: 'Måneder', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: 'År — konsistent positiv oppførsel over tid', isCorrect: true, feedback: 'Riktig! Omdømme er resultat av tusenvis av små handlinger over år.' },
{ id: 'c', label: 'Bare uker', isCorrect: false, feedback: 'Helt urealistisk.' },
{ id: 'd', label: 'Generasjoner', isCorrect: false, feedback: 'Overdrevet.' },
      ],
      espenTip: 'Patagonias omdømme bygd over 50 år. Ferd med å være uovertruffent i klesbransjen.',
    },
    {
      id: 'ml205-5-2',
      icon: '🏆',
      title: 'Tap',
      question: 'Hvor raskt kan omdømme tapes?',
      choices: [
        { id: 'a', label: 'Aldri tapt', isCorrect: false, feedback: 'Tvert imot — kan tapes raskt.' },
{ id: 'b', label: 'På dager — én skandale kan ødelegge årevis med arbeid', isCorrect: true, feedback: 'Riktig! Volkswagen Dieselgate ødela årevis med merkebygging på uker.' },
{ id: 'c', label: 'Bare etter mange år', isCorrect: false, feedback: 'For tregt — sosiale medier akselererer.' },
{ id: 'd', label: 'Aldri raskt', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Sosiale medier har dramatisk akselerert omdømme-tap. Krise-kommunikasjon er kritisk.',
    },
    {
      id: 'ml205-5-3',
      icon: '🏆',
      title: 'Verdi',
      question: 'Hva gir sterkt omdømme?',
      choices: [
        { id: 'a', label: 'Bare bedre reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Pricing-makt, lojalitet, rekruttering, krise-motstand', isCorrect: true, feedback: 'Riktig! Bredt strategisk verdi. Apple kan ta 30 % premium fordi merkevaren er sterk.' },
{ id: 'c', label: 'Lavere skatt', isCorrect: false, feedback: 'Ikke direkte.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell verdi.' },
      ],
      espenTip: 'Reputation = future cashflow. Investorer betaler premium for sterke merkevarer.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🌿',
            title: 'Grønnvasking',
            quote: 'Lyver om miljøgevinst.',
            content: 'Grønnvasking (greenwashing) er bruk av vage eller udokumenterte miljøpåstander for å virke mer bærekraftig enn man er. Forbrukertilsynet slår hardt ned. SAS, Statkraft, flyselskaper har fått pålegg om å fjerne \'klimanøytral\'-påstander uten dokumentasjon. EUs Green Claims-direktiv (2024) skjerper kravene. Spesifikke, dokumenterte påstander er kravet.',
            subpoints: [
                  { label: 'FORBUDT', text: 'Markedsføringsloven § 7. Forbrukertilsynet håndhever aktivt.' },
          { label: 'BLI SPESIFIKK', text: '\'25 % redusert utslipp 2019-2023, verifisert av PwC\' > \'miljøvennlig\'.' },
            ],
            practical: 'Hvilke \'grønne\' reklamer ville du undersøkt nærmere som tilsynsperson?',
            exercises: [
            {
      id: 'ml205-6-1',
      icon: '🌿',
      title: 'Hva er det',
      question: 'Hva er grønnvasking?',
      choices: [
        { id: 'a', label: 'Vaske miljøvennlig', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Lyve eller bruke vage påstander om miljøprofil', isCorrect: true, feedback: 'Riktig! Villedning om miljøgevinster. Forbudt under markedsføringsloven.' },
{ id: 'c', label: 'Sertifisering som økologisk', isCorrect: false, feedback: 'Reell merking, ikke grønnvasking.' },
{ id: 'd', label: 'Reduksjon av energibruk', isCorrect: false, feedback: 'Det er bra praksis.' },
      ],
      espenTip: 'Forbrukertilsynet har konkret saksbehandling. Sjekk forbrukertilsynet.no for eksempler.',
    },
    {
      id: 'ml205-6-2',
      icon: '🌿',
      title: 'Akseptabel påstand',
      question: 'Hvilken er akseptabel?',
      choices: [
        { id: 'a', label: '\'Vi er en grønn bedrift\'', isCorrect: false, feedback: 'Vag — ingen dokumentasjon.' },
{ id: 'b', label: '\'Vi reduserte CO2-utslipp 23 % fra 2019 til 2023, verifisert av PwC\'', isCorrect: true, feedback: 'Riktig! Spesifikk, målbar, tidsbestemt, uavhengig verifisert. Standard for akseptabelt.' },
{ id: 'c', label: '\'Klimanøytral\' uten kontekst', isCorrect: false, feedback: 'Forbrukertilsynet har slått ned på dette.' },
{ id: 'd', label: '\'Bærekraftig\'', isCorrect: false, feedback: 'Tomt buzzword.' },
      ],
      espenTip: 'Generell regel: spesifikt, dokumentert, verifiserbart. Ellers er det grønnvasking.',
    },
    {
      id: 'ml205-6-3',
      icon: '🌿',
      title: 'Sanksjon',
      question: 'Hva kan grønnvasking koste?',
      choices: [
        { id: 'a', label: 'Bare advarsel', isCorrect: false, feedback: 'Mer alvorlig.' },
{ id: 'b', label: 'Pålegg om endring + bot opp til 4 % av omsetning + omdømmetap', isCorrect: true, feedback: 'Riktig! Både juridiske sanksjoner og markedsmessig skade. Forbrukere boikotter ofte.' },
{ id: 'c', label: 'Ingenting', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Fengsel for daglig leder', isCorrect: false, feedback: 'Sjelden direkte.' },
      ],
      espenTip: 'Patagonia bruker autentisk bærekraft som konkurransefortrinn. Konkurrenter kan ikke kopiere ekte data.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🔄',
            title: 'Sirkulær økonomi',
            quote: 'Fra bruk-og-kast til gjenbruk.',
            content: 'Sirkulær økonomi: designe produkter for gjenbruk, reparasjon og resirkulering. Motstykke til \'lineær\' økonomi (kjøp-bruk-kast). Eksempler: Patagonia reparerer klær gratis. Apple resirkulerer iPhones. Vestre møbler designet for å vare 50+ år. Tomras pant-system. Strategisk fortrinn + miljøgevinst.',
            subpoints: [
                  { label: 'DESIGN FOR GJENBRUK', text: 'Reparasjon, resirkulering, tilbakeleveringsordninger fra start.' },
          { label: 'FORRETNINGSMODELL', text: 'Kan være kjerneforretning, ikke bare bærekraftstiltak.' },
            ],
            practical: 'Hvilke produkter rundt deg er designet sirkulært? Hvilke er åpenbart lineære?',
            exercises: [
            {
      id: 'ml205-7-1',
      icon: '🔄',
      title: 'Hva er det',
      question: 'Hva kjennetegner sirkulær økonomi?',
      choices: [
        { id: 'a', label: 'Bedrifter som vokser raskt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Designe for gjenbruk, reparasjon, resirkulering', isCorrect: true, feedback: 'Riktig! Motstykke til lineær \'kjøp-bruk-kast\'. Krav til hele produktdesignet.' },
{ id: 'c', label: 'Bare resirkulering på slutten', isCorrect: false, feedback: 'For sent — design er nøkkelen.' },
{ id: 'd', label: 'Kun for klær', isCorrect: false, feedback: 'Brukes i alle bransjer.' },
      ],
      espenTip: 'Tre prinsipper: designe ut avfall, holde produkter og materialer i bruk, regenerere naturlige systemer.',
    },
    {
      id: 'ml205-7-2',
      icon: '🔄',
      title: 'Norsk eksempel',
      question: 'Hvilket norsk selskap er ledende?',
      choices: [
        { id: 'a', label: 'REMA 1000 — billig og raskt', isCorrect: false, feedback: 'Lineær modell.' },
{ id: 'b', label: 'Tomra — pant-systemer som holder materialer i bruk', isCorrect: true, feedback: 'Riktig! Kjernevirksomhet er sirkulær økonomi. Globalt ledende.' },
{ id: 'c', label: 'Statkraft — bare strøm', isCorrect: false, feedback: 'Energi, ikke direkte sirkulær.' },
{ id: 'd', label: 'Bare utenlandske selskaper', isCorrect: false, feedback: 'Helt feil — Norge er sterkt.' },
      ],
      espenTip: 'Tomra er et av verdens mest verdifulle bærekraftsselskaper på Oslo Børs.',
    },
    {
      id: 'ml205-7-3',
      icon: '🔄',
      title: 'Strategi',
      question: 'Er sirkulær kun bærekraft, eller også business?',
      choices: [
        { id: 'a', label: 'Kun bærekraft, koster penger', isCorrect: false, feedback: 'For begrenset syn.' },
{ id: 'b', label: 'Begge — kan være kjerneforretning som gir konkurransefortrinn', isCorrect: true, feedback: 'Riktig! Patagonia, Tomra og IKEA bruker sirkularitet som strategi, ikke bare etikk.' },
{ id: 'c', label: 'Kun reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Brukes i alle størrelser.' },
      ],
      espenTip: 'Patagonia \'Worn Wear\' (brukt-handel) gir både inntekt og merkebygging. Sirkulær = strategi.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🤝',
            title: 'Etisk handel',
            quote: 'Ansvar for hele verdikjeden.',
            content: 'Åpenhetsloven (2022) krever dokumentasjon av menneskerettigheter og arbeidsforhold i hele leverandørkjeden. Bedrifter med 50+ ansatte rammes. Forbrukere kan be om innsyn — bedriften svarer innen 3 uker. Skandaler i leverandørkjeden (H&M, Zara i Bangladesh) skaper omdømmeskade. Etisk handel er strategisk forsvar.',
            subpoints: [
                  { label: 'HELE KJEDEN', text: 'Ikke bare egen bedrift — også underleverandører.' },
          { label: 'ÅPENHETSLOVEN', text: 'Lovpålagt fra 2022 for bedrifter med 50+ ansatte.' },
            ],
            practical: 'Sjekk en favorittklesmerke — kan du finne hvor produkter er laget? Hva sier det om etisk handel?',
            exercises: [
            {
      id: 'ml205-8-1',
      icon: '🤝',
      title: 'Åpenhetsloven',
      question: 'Hva krever Åpenhetsloven?',
      choices: [
        { id: 'a', label: 'Bare regnskap', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Dokumentasjon av menneskerettigheter og arbeidsforhold i leverandørkjeden', isCorrect: true, feedback: 'Riktig! Aktsomhetsvurderinger i hele kjeden. Innsynsrett for forbrukere.' },
{ id: 'c', label: 'Antall ansatte', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare miljørapportering', isCorrect: false, feedback: 'For smalt — også sosiale forhold.' },
      ],
      espenTip: 'Norge var blant første land med slik lov. EU følger etter med Corporate Sustainability Due Diligence Directive.',
    },
    {
      id: 'ml205-8-2',
      icon: '🤝',
      title: 'Hvem omfattes',
      question: 'Hvilke bedrifter må følge Åpenhetsloven?',
      choices: [
        { id: 'a', label: 'Alle bedrifter', isCorrect: false, feedback: 'For bredt.' },
{ id: 'b', label: 'Bedrifter med 50+ ansatte (eller omsetning > 70 mill, balansesum > 35 mill)', isCorrect: true, feedback: 'Riktig! Mellomstore og store. Små unntatt.' },
{ id: 'c', label: 'Bare børsnoterte', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Bare statlige', isCorrect: false, feedback: 'Privat sektor primært.' },
      ],
      espenTip: 'Sjekk om din arbeidsplass er omfattet. Aktsomhetsvurderinger er omfattende prosess.',
    },
    {
      id: 'ml205-8-3',
      icon: '🤝',
      title: 'Innsyn',
      question: 'Hva må bedriften gjøre når forbruker krever innsyn?',
      choices: [
        { id: 'a', label: 'Ignorere', isCorrect: false, feedback: 'Klart feil.' },
{ id: 'b', label: 'Svare innen 3 uker med relevant info', isCorrect: true, feedback: 'Riktig! Lovfestet rett. Du må ha dokumentasjon klar.' },
{ id: 'c', label: 'Saksøke forbrukeren', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare hvis avis spør', isCorrect: false, feedback: 'Loven gjelder alle borgere.' },
      ],
      espenTip: 'Lag standardprosess for innsynskrav. Du har 3 uker, ikke vent til kravet kommer.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '📊',
            title: 'ESG-rapportering',
            quote: 'Environmental, Social, Governance.',
            content: 'ESG (Environmental, Social, Governance) er investorenes vurderingskriterier. ESG-fond har vokst til over 30 trillion USD globalt. Bedrifter med dårlig ESG-score får dyrere finansiering. CSRD-direktivet i EU gjør ESG-rapportering lovpålagt. Tre dimensjoner: Miljø (klima, ressursbruk), Sosialt (ansatte, leverandører, samfunn), Styring (etikk, ledelse, transparens).',
            subpoints: [
                  { label: 'ESG = INVESTOR-KRAV', text: 'Strenge investorer ser kun på ESG-kompatible selskaper.' },
          { label: 'CSRD-LOVKRAV', text: 'EU-direktiv gjør ESG-rapportering obligatorisk for store bedrifter.' },
            ],
            practical: 'Sjekk en bedrifts årsrapport — hvor mye fokus på ESG vs ren økonomi? Endring over år?',
            exercises: [
            {
      id: 'ml205-9-1',
      icon: '📊',
      title: 'Hva er ESG',
      question: 'Hva betyr ESG?',
      choices: [
        { id: 'a', label: 'European Securities Group', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Environmental, Social, Governance — investorers vurderingskriterier', isCorrect: true, feedback: 'Riktig! Tre dimensjoner. Brukes for å vurdere bedrifters ansvarlighet.' },
{ id: 'c', label: 'Earnings, Salary, Growth', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Type regnskap', isCorrect: false, feedback: 'ESG er bredere.' },
      ],
      espenTip: 'ESG-fondene har vokst eksplosivt. Bedrifter som ikke skårer godt får dyrere finansiering.',
    },
    {
      id: 'ml205-9-2',
      icon: '📊',
      title: 'Effekt',
      question: 'Hva skjer med dårlige ESG-bedrifter?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Tvert imot — strukturelle effekter.' },
{ id: 'b', label: 'Dyrere finansiering, kapitalflukt, lavere børsverdi', isCorrect: true, feedback: 'Riktig! ESG-fond ekskluderer dem. Bankene priser inn risiko. Markedet straffer.' },
{ id: 'c', label: 'Lavere skatt', isCorrect: false, feedback: 'Tvert imot — ofte høyere skatt.' },
{ id: 'd', label: 'Bedre omdømme', isCorrect: false, feedback: 'Helt feil — dårligere.' },
      ],
      espenTip: 'BlackRock og andre store kapitaleier truer å trekke kapital fra ESG-svake selskaper. Reell konsekvens.',
    },
    {
      id: 'ml205-9-3',
      icon: '📊',
      title: 'Norge',
      question: 'Hvordan står Norge med ESG?',
      choices: [
        { id: 'a', label: 'Bak resten av Europa', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'I front — Oljefondet ekskluderer selskaper, sterke ESG-krav', isCorrect: true, feedback: 'Riktig! Oljefondet (verdens største) har egne ESG-krav. Også norske finansinstitusjoner.' },
{ id: 'c', label: 'Likegyldig', isCorrect: false, feedback: 'Norge er ledende.' },
{ id: 'd', label: 'Ingen rolle', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Oljefondets ekskluderingsliste sender sjokkbølger globalt. Når Norge ekskluderer, følger andre.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🏆',
            title: 'Strategisk bærekraft',
            quote: 'Konkurransefortrinn, ikke kostnad.',
            content: 'Bærekraft er ikke lenger \'kostnad\' eller \'risikohåndtering\' — det er strategisk konkurransefortrinn. Bedrifter som integrerer bærekraft i kjerneforretningen vinner: lavere kapitalkostnad, sterkere merkevare, bedre rekruttering, høyere kundepriser. Eksempler: Patagonia, Tomra, IKEA, Equinor (i overgangen).',
            subpoints: [
                  { label: 'KONKURRANSEFORTRINN', text: 'Ikke bare etikk — strategisk fordel.' },
          { label: 'INTEGRERT', text: 'Må være del av kjerneforretningen, ikke et tilleggsprosjekt.' },
            ],
            practical: 'Hvordan kan din bedrift gjøre bærekraft til konkurransefortrinn? Hva er allerede integrert?',
            exercises: [
            {
      id: 'ml205-10-1',
      icon: '🏆',
      title: 'Hva endret',
      question: 'Hvordan ser man på bærekraft nå vs før?',
      choices: [
        { id: 'a', label: 'Bare kostnad', isCorrect: false, feedback: 'Gammel tenkning.' },
{ id: 'b', label: 'Strategisk konkurransefortrinn — gir lavere kapitalkostnad, sterkere merkevare, bedre rekruttering', isCorrect: true, feedback: 'Riktig! Modern tenkning. Investorer, kunder, ansatte krever det.' },
{ id: 'c', label: 'Bare risikohåndtering', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare for offentlige', isCorrect: false, feedback: 'Privat sektor like rammet.' },
      ],
      espenTip: 'Den som ikke ser bærekraft som strategi, taper kapital, talenter og kunder. Strukturelt skifte.',
    },
    {
      id: 'ml205-10-2',
      icon: '🏆',
      title: 'Patagonia',
      question: 'Hva er Patagonias strategiske bærekraft?',
      choices: [
        { id: 'a', label: 'Bare donasjoner', isCorrect: false, feedback: 'De gjør mye mer.' },
{ id: 'b', label: 'Hele forretningsmodellen er bygget på reparasjon, gjenbruk, ærlighet', isCorrect: true, feedback: 'Riktig! \'Don\'t buy this jacket\'-kampanjen. Sirkulær økonomi som forretningsmodell.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Ekte handlinger.' },
{ id: 'd', label: 'Ingen strategi', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Yvon Chouinard ga bort hele Patagonia (3 mrd USD) til miljøstiftelse i 2022. \'Earth is now our only shareholder.\'',
    },
    {
      id: 'ml205-10-3',
      icon: '🏆',
      title: 'Måling',
      question: 'Hvordan måler man strategisk bærekraft?',
      choices: [
        { id: 'a', label: 'Kun gjennom hyggelige ord', isCorrect: false, feedback: 'Fluffy.' },
{ id: 'b', label: 'ESG-score + finansielle resultater + merkevareverdi over tid', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal måling. Trippel bunnlinje i praksis.' },
{ id: 'c', label: 'Ikke målbart', isCorrect: false, feedback: 'Mye er målbart.' },
{ id: 'd', label: 'Kun klimagassutslipp', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Triple Bottom Line-rapporter blir mer sofistikerte hver år. CSRD krever standardiserte målinger.',
    },
            ],
          },
        ]

        export default function SamfunnsansvarBaerekraftOmdommeModule() {
          return (
            <DrawerModule
              moduleCode="ML2-05"
              moduleTitle="Samfunnsansvar, bærekraft og omdømme"
              moduleIcon="🌱"
              storageKey="learning-ml2-samfunnsansvar-baerekraft-omdomme"
              completeRoute="/learning/ml2/samfunnsansvar-baerekraft-omdomme/complete"
              phases={phases}
              intro="Bedriftens rolle har endret seg fra ren profitt-jakt til bredere samfunnsansvar. Triple Bottom Line, FNs bærekraftsmål og ESG-investering presser bedrifter mot ansvarlig drift. Ikke kun etisk — også strategisk konkurransefortrinn."
              vissteduAt="ESG-investerte midler globalt har vokst til over 30 trillion USD. Bedrifter med dårlig ESG-score får dyrere finansiering. Bærekraft har blitt finansiell konkurranseparameter, ikke bare etisk."
              espenSier="Samfunnsansvar er ikke kostnad — det er investering i langsiktig overlevelse. Bedrifter uten ESG-strategi taper investorer, kunder og talenter. Tre store grupper, alle viktige."
      presentationLink={{ route: '/learning/presentations/ml2/samfunnsansvar-baerekraft-omdomme', description: 'Samfunnsansvar, bærekraft og omdømme — 10 slides' }}
            />
          )
        }
