        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '🔍',
            title: 'Porters 5 krefter',
            quote: 'Bransjens lønnsomhet bestemmes av 5 krefter.',
            content: 'Michael Porter identifiserte 5 krefter som sammen bestemmer bransjens lønnsomhetspotensial: Rivalisering, Nyetablerere, Substitutter, Leverandørmakt, Kundemakt. Sterke krefter = lave marginer. Modellen er over 40 år gammel, fortsatt dominerende.',
            subpoints: [
                  { label: '5 KREFTER', text: 'Hver kraft kan være sterk eller svak.' },
          { label: 'LØNNSOMHET', text: 'Sum av kreftene bestemmer hvor mye man tjener i bransjen.' },
            ],
            practical: 'Velg en bransje du kjenner. Vurder hver av de 5 kreftene — sterk eller svak?',
            exercises: [
            {
      id: 'ml203-1-1',
      icon: '🔍',
      title: 'Antall krefter',
      question: 'Hvor mange krefter har Porter?',
      choices: [
        { id: 'a', label: '3', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '5', isCorrect: true, feedback: 'Riktig! Rivalisering, nyetablerere, substitutter, leverandørmakt, kundemakt.' },
{ id: 'c', label: '7', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: '10', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Tegn modellen: bransjen i midten, 4 krefter rundt + intern rivalisering.',
    },
    {
      id: 'ml203-1-2',
      icon: '🔍',
      title: 'Effekt',
      question: 'Hva betyr sterke krefter?',
      choices: [
        { id: 'a', label: 'Høy lønnsomhet', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Lav lønnsomhet — alle blir presset på marginer', isCorrect: true, feedback: 'Riktig! Sterke krefter spiser opp profittpotensialet.' },
{ id: 'c', label: 'Bedriften vokser raskt', isCorrect: false, feedback: 'Ikke direkte sammenheng.' },
{ id: 'd', label: 'Ingen effekt', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Bransje med 4-5 sterke krefter: vanskelig å tjene penger uansett hvor god du er.',
    },
    {
      id: 'ml203-1-3',
      icon: '🔍',
      title: 'Bruk',
      question: 'Når brukes Porter?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Brukes mye.' },
{ id: 'b', label: 'For å vurdere om en bransje er attraktiv å være i', isCorrect: true, feedback: 'Riktig! Strategisk verktøy. Kan også brukes før inntreden i ny bransje.' },
{ id: 'c', label: 'Bare for konkurrenter', isCorrect: false, feedback: 'Bredere bruk.' },
{ id: 'd', label: 'Bare for offentlig sektor', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'Før du starter ny bransje: gjør Porter. Hvis 4-5 krefter er sterke, vurder å gå et annet sted.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '⚔️',
            title: 'Rivalisering',
            quote: 'Hvor hardt kjemper aktørene mot hverandre?',
            content: 'Rivalisering er konkurransen mellom eksisterende aktører. Sterk når: mange like aktører, lav vekst, høye fastkostnader, lite differensiering. Resultat: priskrig, lave marginer. Svak når: få aktører, høy vekst, sterk differensiering.',
            subpoints: [
                  { label: 'STERK NÅR', text: 'Mange aktører, lav vekst, høye fastkostnader, like produkter.' },
          { label: 'PRISKRIG', text: 'Klassisk symptom på sterk rivalisering.' },
            ],
            practical: 'Norsk dagligvare har sterk rivalisering. Hvilke symptomer ser du i butikken?',
            exercises: [
            {
      id: 'ml203-2-1',
      icon: '⚔️',
      title: 'Hva indikerer',
      question: 'Hva er klassisk symptom på sterk rivalisering?',
      choices: [
        { id: 'a', label: 'Høye marginer', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Priskrig og kampanjer', isCorrect: true, feedback: 'Riktig! Aktører konkurrerer på pris fordi de ikke har annet å skille seg ut med.' },
{ id: 'c', label: 'Ingen reklame', isCorrect: false, feedback: 'Sterk rivalisering = mer reklame.' },
{ id: 'd', label: 'Bedrifter samarbeider', isCorrect: false, feedback: 'Det er kartell, ulovlig.' },
      ],
      espenTip: 'Telekom-bransjen i Norge: Telia + Telenor + Ice. Stadige tilbudskampanjer = sterk rivalisering.',
    },
    {
      id: 'ml203-2-2',
      icon: '⚔️',
      title: 'Når svak',
      question: 'Når er rivalisering svak?',
      choices: [
        { id: 'a', label: 'Mange like aktører', isCorrect: false, feedback: 'Det gir sterk rivalisering.' },
{ id: 'b', label: 'Få aktører med differensierte produkter', isCorrect: true, feedback: 'Riktig! Få konkurrenter med distinkte tilbud = svak rivalisering = høyere marginer.' },
{ id: 'c', label: 'Lav vekst i markedet', isCorrect: false, feedback: 'Lav vekst gir typisk sterk rivalisering.' },
{ id: 'd', label: 'Aldri svak', isCorrect: false, feedback: 'Varierer mye.' },
      ],
      espenTip: 'Apple og Samsung dominerer premium-mobiler. Differensiert posisjon = bedre marginer enn generisk telefon-bransje.',
    },
    {
      id: 'ml203-2-3',
      icon: '⚔️',
      title: 'Norsk eksempel',
      question: 'Hvor sterk er rivalisering i norsk dagligvare?',
      choices: [
        { id: 'a', label: 'Svak — bare 3 kjeder', isCorrect: false, feedback: 'Få aktører kan ha sterk eller svak rivalisering — avhenger av oppførsel.' },
{ id: 'b', label: 'Sterk — 3 kjeder konkurrerer hardt på pris', isCorrect: true, feedback: 'Riktig! REMA, NorgesGruppen, Coop konkurrerer hardt på pris og kampanjer. Marginer presses.' },
{ id: 'c', label: 'Ikke eksisterende', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare i Oslo', isCorrect: false, feedback: 'Gjelder hele landet.' },
      ],
      espenTip: 'Selv få aktører kan konkurrere hardt. Spørsmålet er adferd, ikke bare antall.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🚪',
            title: 'Nyetablerere',
            quote: 'Hvor høy er inngangsbarrieren?',
            content: 'Trussel fra nyetablerere avhenger av inngangsbarrierer: høye barrierer = liten trussel = etablerte aktører beskyttet. Eksempler på barrierer: kapitalkrav (oljebransje), regulering (bank), merkelojalitet (Coca-Cola), distribusjon (TINE i butikkhylla). Lave barrierer = stadig nye konkurrenter.',
            subpoints: [
                  { label: 'HØYE BARRIERER', text: 'Beskytter etablerte aktører — gir bedre marginer.' },
          { label: 'EKSEMPLER', text: 'Kapital, regulering, merkelojalitet, distribusjon, teknologi.' },
            ],
            practical: 'Hvor høye er inngangsbarrierene i bedriften du jobber for / kjenner? Hva beskytter dem?',
            exercises: [
            {
      id: 'ml203-3-1',
      icon: '🚪',
      title: 'Effekt av høye',
      question: 'Hva betyr høye inngangsbarrierer?',
      choices: [
        { id: 'a', label: 'Mange nyetablerere', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Få nye aktører — etablerte beskyttet, høyere marginer', isCorrect: true, feedback: 'Riktig! Høye barrierer = lukrativ posisjon for de som er inne.' },
{ id: 'c', label: 'Markedet krymper', isCorrect: false, feedback: 'Ikke direkte sammenheng.' },
{ id: 'd', label: 'Ingen effekt', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Norsk bank: høyt regulert (krever konsesjon, kapital, kompetanse). Få nye aktører siden 1990-tallet.',
    },
    {
      id: 'ml203-3-2',
      icon: '🚪',
      title: 'Type barriere',
      question: 'Hvilken er en inngangsbarriere?',
      choices: [
        { id: 'a', label: 'Lav pris i markedet', isCorrect: false, feedback: 'Det er konsekvens, ikke barriere.' },
{ id: 'b', label: 'Kapitalkrav — det koster milliarder å starte oljevirksomhet', isCorrect: true, feedback: 'Riktig! Kapital er klassisk barriere. Hindrer at små aktører kan utfordre etablerte.' },
{ id: 'c', label: 'Mange kunder', isCorrect: false, feedback: 'Ikke barriere.' },
{ id: 'd', label: 'Vekst', isCorrect: false, feedback: 'Vekst tiltrekker nyetablerere, ikke barriere.' },
      ],
      espenTip: 'Andre barrierer: patent, distribusjon, merkelojalitet, regulering. Hver bransje har sin mix.',
    },
    {
      id: 'ml203-3-3',
      icon: '🚪',
      title: 'Lavbarriere',
      question: 'Hvor er inngangsbarrierene typisk LAVE?',
      choices: [
        { id: 'a', label: 'Olje', isCorrect: false, feedback: 'Helt feil — høye barrierer.' },
{ id: 'b', label: 'Web-startups — krever lite kapital, ingen regulering', isCorrect: true, feedback: 'Riktig! Derfor er det så mange tech-startups. Lave barrierer = konstant ny konkurranse.' },
{ id: 'c', label: 'Bankvirksomhet', isCorrect: false, feedback: 'Strengt regulert.' },
{ id: 'd', label: 'Atomenergi', isCorrect: false, feedback: 'Ekstreme barrierer.' },
      ],
      espenTip: 'Lave barrierer = mange konkurrenter, vanskelig å bygge varig fortrinn.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🔄',
            title: 'Substitutter',
            quote: 'Andre måter å løse samme behov.',
            content: 'Substitutter er produkter som løser SAMME behov med annen teknologi/metode. Sykling er substitutt til buss. Hjemmelaget mat er substitutt til restaurant. Strenge substitutter setter tak på pris. Når substitutet blir bedre/billigere, må bedriften reagere — ellers tapes markedsandel.',
            subpoints: [
                  { label: 'SAMME BEHOV', text: 'Substitutt løser kundens behov, men på annen måte.' },
          { label: 'PRISTAK', text: 'Substitutter setter tak på hva du kan ta i pris.' },
            ],
            practical: 'Hva er substitutt for: bilkjøring, kinobillett, frisørtjeneste? Hvor sterke er substituttene?',
            exercises: [
            {
      id: 'ml203-4-1',
      icon: '🔄',
      title: 'Hva er substitutt',
      question: 'Hva kjennetegner et substitutt?',
      choices: [
        { id: 'a', label: 'Samme produkt fra annen produsent', isCorrect: false, feedback: 'Det er konkurrent, ikke substitutt.' },
{ id: 'b', label: 'Et annet produkt som løser samme behov', isCorrect: true, feedback: 'Riktig! Eksempel: hjemmelaget kaffe substituerer kaféen. Samme behov, annen løsning.' },
{ id: 'c', label: 'Komplementært produkt', isCorrect: false, feedback: 'Helt feil — komplementært utfyller, substitutt erstatter.' },
{ id: 'd', label: 'Sertifisert produkt', isCorrect: false, feedback: 'Helt feil ramme.' },
      ],
      espenTip: 'Streaming-tjenester ble substitutt for kabel-TV. Bytte fra én løsning til en annen for samme behov.',
    },
    {
      id: 'ml203-4-2',
      icon: '🔄',
      title: 'Effekt',
      question: 'Hva gjør sterke substitutter?',
      choices: [
        { id: 'a', label: 'Øker bedriftens marginer', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Setter tak på pris — kunden bytter hvis du blir for dyr', isCorrect: true, feedback: 'Riktig! Substitutter er konkurrenter du kanskje ikke ser. Klassisk strategisk blindsone.' },
{ id: 'c', label: 'Ingen effekt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Eliminerer konkurranse', isCorrect: false, feedback: 'Tvert imot — øker konkurransen.' },
      ],
      espenTip: 'Kodak ignorerte digital som substitutt for film. Resultat: konkurs.',
    },
    {
      id: 'ml203-4-3',
      icon: '🔄',
      title: 'Eksempel',
      question: 'Hva er substitutt for fly Norge-Spania?',
      choices: [
        { id: 'a', label: 'Et annet flyselskap', isCorrect: false, feedback: 'Det er konkurrent, ikke substitutt.' },
{ id: 'b', label: 'Bil/buss/tog/båt', isCorrect: true, feedback: 'Riktig! Andre transportformer for samme behov (komme til Spania).' },
{ id: 'c', label: 'Hotell', isCorrect: false, feedback: 'Det er komplementært, ikke substitutt.' },
{ id: 'd', label: 'Reiseforsikring', isCorrect: false, feedback: 'Komplementært tjeneste.' },
      ],
      espenTip: 'Substitutter er ofte \'usynlige konkurrenter\'. Tenk bredere enn samme bransje.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📦',
            title: 'Leverandørmakt',
            quote: 'Kan leverandørene presse deg?',
            content: 'Leverandørmakt er sterk når: få leverandører, byttekostnader er høye, leverandøren har sterk merkevare. Sterk leverandørmakt = du betaler mer, får dårligere vilkår. Eksempel: Apple har høy leverandørmakt mot tilfeldige tilbehør-produsenter. TINE har sterk makt mot småprodusenter av meieri-produkter.',
            subpoints: [
                  { label: 'STERK NÅR', text: 'Få leverandører, høye byttekostnader, sterk merkevare hos leverandør.' },
          { label: 'RESULTAT', text: 'Du betaler mer, får dårligere vilkår, mindre fleksibilitet.' },
            ],
            practical: 'Hvor sterk er leverandørmakten i bedriften du kjenner? Hvem er nøkkel-leverandører?',
            exercises: [
            {
      id: 'ml203-5-1',
      icon: '📦',
      title: 'Når sterk',
      question: 'Når er leverandørmakt sterk?',
      choices: [
        { id: 'a', label: 'Mange leverandører tilgjengelig', isCorrect: false, feedback: 'Det gir svak makt.' },
{ id: 'b', label: 'Få leverandører med spesifikt produkt og høye byttekostnader', isCorrect: true, feedback: 'Riktig! Få alternativer = leverandøren kan diktere vilkår.' },
{ id: 'c', label: 'Standard varer som finnes overalt', isCorrect: false, feedback: 'Det gir svak leverandørmakt.' },
{ id: 'd', label: 'Aldri sterk', isCorrect: false, feedback: 'Varierer mye.' },
      ],
      espenTip: 'Microsoft har historisk sterk leverandørmakt mot bedrifter via Windows. Få alternativer = høye priser.',
    },
    {
      id: 'ml203-5-2',
      icon: '📦',
      title: 'Tine eksempel',
      question: 'Hvor sterk er TINE som leverandør mot en småbutikk?',
      choices: [
        { id: 'a', label: 'Svak', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Sterk — TINE dominerer norsk meieri-marked', isCorrect: true, feedback: 'Riktig! Småbutikker MÅ ha melk og ost. TINE dikterer vilkår.' },
{ id: 'c', label: 'Lik som svak konkurrent', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare lokal', isCorrect: false, feedback: 'Nasjonal dominans.' },
      ],
      espenTip: 'Derfor er Konkurransetilsynet aktivt med å overvåke TINE — markedsmakt skal ikke misbrukes.',
    },
    {
      id: 'ml203-5-3',
      icon: '📦',
      title: 'Strategisk respons',
      question: 'Hvordan møte sterk leverandørmakt?',
      choices: [
        { id: 'a', label: 'Aksepter alle vilkår', isCorrect: false, feedback: 'Strategi-feil.' },
{ id: 'b', label: 'Diversifiser leverandører, vurder vertikal integrasjon', isCorrect: true, feedback: 'Riktig! Reduser avhengighet til én leverandør. Apple lager mange komponenter selv av samme grunn.' },
{ id: 'c', label: 'Saksøk leverandøren', isCorrect: false, feedback: 'Sjelden løsning.' },
{ id: 'd', label: 'Slutt å produsere', isCorrect: false, feedback: 'Ikke realistisk strategi.' },
      ],
      espenTip: 'Klassisk grep: utvikle sekundærleverandører selv om de er litt dyrere. Reduserer risiko.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '👥',
            title: 'Kundemakt',
            quote: 'Kan kundene presse deg?',
            content: 'Kundemakt er sterk når: få store kunder, lave byttekostnader, gjennomsiktige priser, standardiserte produkter. Eksempel: NorgesGruppen har sterk kundemakt mot småprodusenter. Det offentlige har sterk kundemakt mot leverandører via anbudsprosesser. Sterk kundemakt = du må gi rabatt, bedre vilkår.',
            subpoints: [
                  { label: 'STERK NÅR', text: 'Få store kunder, lave byttekostnader, standardvarer.' },
          { label: 'KOMPENSASJON', text: 'Bygg merkevare, lojalitet, eksklusive funksjoner for å redusere kundemakt.' },
            ],
            practical: 'Hvor sterk er kundemakten der du jobber? Hvem er de største kundene?',
            exercises: [
            {
      id: 'ml203-6-1',
      icon: '👥',
      title: 'Når sterk',
      question: 'Når er kundemakt sterk?',
      choices: [
        { id: 'a', label: 'Mange små kunder', isCorrect: false, feedback: 'Det er svak kundemakt.' },
{ id: 'b', label: 'Få store kunder med lave byttekostnader', isCorrect: true, feedback: 'Riktig! Få men store kunder kan diktere vilkår.' },
{ id: 'c', label: 'Helt nye kunder', isCorrect: false, feedback: 'Ikke direkte sammenheng.' },
{ id: 'd', label: 'Aldri sterk', isCorrect: false, feedback: 'Varierer.' },
      ],
      espenTip: 'Apple har sterk kundemakt mot tilfeldige app-utviklere via App Store. 30 % takst er fast.',
    },
    {
      id: 'ml203-6-2',
      icon: '👥',
      title: 'Norsk eksempel',
      question: 'Hvor sterk er NorgesGruppens kundemakt mot småprodusenter?',
      choices: [
        { id: 'a', label: 'Svak', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Veldig sterk — 35 % markedsandel + hyllekrav + EMV', isCorrect: true, feedback: 'Riktig! Småprodusenter må ha tilgang til kjedene. Kjedene dikterer pris, hyllekrav, betingelser.' },
{ id: 'c', label: 'Bare i Oslo', isCorrect: false, feedback: 'Nasjonal makt.' },
{ id: 'd', label: 'Ingen makt', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Derfor er det vanskelig å starte ny matprodusent i Norge. Distribusjonsbarrieren er kjedemakt.',
    },
    {
      id: 'ml203-6-3',
      icon: '👥',
      title: 'Hvordan motvirke',
      question: 'Hvordan kan en bedrift redusere kundemakt?',
      choices: [
        { id: 'a', label: 'Ignorere kundene', isCorrect: false, feedback: 'Strategi-død.' },
{ id: 'b', label: 'Bygge sterk merkevare og kundelojalitet', isCorrect: true, feedback: 'Riktig! Lojale kunder = lavere bytte-tilbøyelighet = redusert kundemakt.' },
{ id: 'c', label: 'Heve priser', isCorrect: false, feedback: 'Det krever sterk posisjonering først.' },
{ id: 'd', label: 'Slutte å selge', isCorrect: false, feedback: 'Helt urealistisk.' },
      ],
      espenTip: 'Apple-eksempel: brukere er så lojale at de ikke bytter til Samsung. Reduserer kundemakt.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🗺️',
            title: 'Strategiske grupper',
            quote: 'Konkurrenter som spiller likt.',
            content: 'Strategiske grupper er bedrifter i samme bransje som følger like strategier. Eksempler i flybransjen: tradisjonelle (SAS, KLM, Lufthansa), lavpris (Ryanair, Wizz, Norwegian), luxury (Emirates, Singapore). De konkurrerer mest INNEN sin gruppe, mindre på tvers.',
            subpoints: [
                  { label: 'LIKE STRATEGIER', text: 'Bedrifter med samme posisjonering, kundetype, prisnivå.' },
          { label: 'KONKURRANSE INNEN', text: 'Mest intens konkurranse er innenfor strategisk gruppe.' },
            ],
            practical: 'Hvilke strategiske grupper finnes i norsk dagligvare? Hva skiller REMA fra Meny?',
            exercises: [
            {
      id: 'ml203-7-1',
      icon: '🗺️',
      title: 'Hva er det',
      question: 'Hva er en strategisk gruppe?',
      choices: [
        { id: 'a', label: 'Tilfeldige bedrifter', isCorrect: false, feedback: 'Bedrifter med felles strategi.' },
{ id: 'b', label: 'Konkurrenter som følger like strategier — like kundebase, prisnivå', isCorrect: true, feedback: 'Riktig! Hjelper med å forstå hvem du faktisk konkurrerer mest med.' },
{ id: 'c', label: 'Bedrifter i samme by', isCorrect: false, feedback: 'Geografisk er ikke strategisk.' },
{ id: 'd', label: 'Bedrifter med samme leverandør', isCorrect: false, feedback: 'Helt feil ramme.' },
      ],
      espenTip: 'Tegn 2D-kart: pris vs kvalitet, eller kundetype vs produktbredde. Bedrifter som klumper seg er én gruppe.',
    },
    {
      id: 'ml203-7-2',
      icon: '🗺️',
      title: 'Konkurransedynamikk',
      question: 'Hvor er konkurransen sterkest?',
      choices: [
        { id: 'a', label: 'På tvers av bransjer', isCorrect: false, feedback: 'Sjelden — for ulike.' },
{ id: 'b', label: 'Innen samme strategiske gruppe', isCorrect: true, feedback: 'Riktig! Norwegian konkurrerer mer mot Ryanair enn mot Emirates.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert dynamikk.' },
{ id: 'd', label: 'Alle mot alle', isCorrect: false, feedback: 'Sjelden — strategisk segmentering.' },
      ],
      espenTip: 'Identifiser din strategiske gruppe — der er konkurransen mest intens. Andre grupper er sekundære.',
    },
    {
      id: 'ml203-7-3',
      icon: '🗺️',
      title: 'Norsk eksempel',
      question: 'I norsk fly: hvilke er Norwegian\'s strategiske gruppe?',
      choices: [
        { id: 'a', label: 'SAS — tradisjonell', isCorrect: false, feedback: 'Annen gruppe.' },
{ id: 'b', label: 'Ryanair og Wizz — lavpris', isCorrect: true, feedback: 'Riktig! Norwegian er lavpris-gruppe. Konkurrerer mot Ryanair, ikke SAS-Lufthansa.' },
{ id: 'c', label: 'Emirates', isCorrect: false, feedback: 'Premium-gruppe — annen liga.' },
{ id: 'd', label: 'DSB-tog', isCorrect: false, feedback: 'Annet transportmiddel.' },
      ],
      espenTip: 'Strategisk gruppering er strategisk verktøy. Forskjellig fra ren bransje-tilhørighet.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🌊',
            title: 'Bransjeglidning',
            quote: 'Når bransjer smelter sammen.',
            content: 'Bransjeglidning skjer når tradisjonelle bransjegrenser viskes ut. Bank + forsikring (DnB selger forsikring). Telekom + medier (Telenor + TV2). Tech + bil (Apple Car-prosjektet). Skaper både muligheter (nye markeder) og trusler (uventede konkurrenter).',
            subpoints: [
                  { label: 'VISKER GRENSER', text: 'Tradisjonelle bransje-skiller forsvinner.' },
          { label: 'OVERRASKELSE', text: 'Konkurrenter dukker opp fra uventede hold.' },
            ],
            practical: 'Hvilke bransjer i Norge smelter sammen nå? Hvor ser du eksempler på bransjeglidning?',
            exercises: [
            {
      id: 'ml203-8-1',
      icon: '🌊',
      title: 'Hva er det',
      question: 'Hva er bransjeglidning?',
      choices: [
        { id: 'a', label: 'Bedrifter flytter til utlandet', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'b', label: 'Tradisjonelle bransjegrenser viskes ut', isCorrect: true, feedback: 'Riktig! Bank + forsikring, telekom + medier, tech + bil. Nye sammensetninger.' },
{ id: 'c', label: 'Bedrifter krymper', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Markedet stagnerer', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Apple Pay gjorde Apple til finansaktør. Bransjeglidning fra tech til finans.',
    },
    {
      id: 'ml203-8-2',
      icon: '🌊',
      title: 'Driver',
      question: 'Hva driver bransjeglidning?',
      choices: [
        { id: 'a', label: 'Tilfeldighet', isCorrect: false, feedback: 'Strukturelle drivere.' },
{ id: 'b', label: 'Digitalisering, deregulering, teknologi-konvergens', isCorrect: true, feedback: 'Riktig! Disse driverne brer seg på tvers av bransjer og skaper nye sammensetninger.' },
{ id: 'c', label: 'Bare regulering', isCorrect: false, feedback: 'Én av flere drivere.' },
{ id: 'd', label: 'Mode', isCorrect: false, feedback: 'Trend kan være driver, men ikke primær.' },
      ],
      espenTip: 'Plattform-økonomi (Uber, Airbnb) glidde tradisjonelle bransjer (taxi, hotell) til tech.',
    },
    {
      id: 'ml203-8-3',
      icon: '🌊',
      title: 'Strategisk respons',
      question: 'Hvordan reagere på bransjeglidning?',
      choices: [
        { id: 'a', label: 'Ignorere', isCorrect: false, feedback: 'Mister markedsmuligheter og overser trusler.' },
{ id: 'b', label: 'Overvåke andre bransjer aktivt for trender og trusler', isCorrect: true, feedback: 'Riktig! Sett opp \'svakeste signaler\'-overvåking. Konkurrenter kan komme fra uventede hold.' },
{ id: 'c', label: 'Saksøke nykommere', isCorrect: false, feedback: 'Sjelden mulig juridisk.' },
{ id: 'd', label: 'Bare fortsette som vanlig', isCorrect: false, feedback: 'Risikerer å bli disrupted.' },
      ],
      espenTip: 'Norske bedrifter må følge med på tech-utviklingen selv om de ikke er tech. Disrupsjon kommer ofte derfra.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌍',
            title: 'Lokal vs global analyse',
            quote: 'Skala betyr alt.',
            content: 'Bransjeanalyse må gjøres på riktig nivå. Lokal kafé konkurrerer ikke med Starbucks globalt — men kanskje med Starbucks-filialen i samme by. Globalt kan TINE være liten, men nasjonalt dominerende. Definer markedsgrensene først — de avgjør hele analysen.',
            subpoints: [
                  { label: 'MARKEDSGRENSER FØRST', text: 'Definer hvem du faktisk konkurrerer med — geografisk og produktmessig.' },
          { label: 'SKALA BETYR ALT', text: 'Liten på ett nivå, stor på et annet — sammenheng er kritisk.' },
            ],
            practical: 'Hva er markedet for en lokal frisør i Bergen? Lokal? Nasjonal? Global?',
            exercises: [
            {
      id: 'ml203-9-1',
      icon: '🌍',
      title: 'Hva først',
      question: 'Hva må gjøres FØRST i bransjeanalyse?',
      choices: [
        { id: 'a', label: 'Beregne markedsandel', isCorrect: false, feedback: 'Krever klare grenser først.' },
{ id: 'b', label: 'Definere markedsgrenser — geografi, produkt, kundetype', isCorrect: true, feedback: 'Riktig! Uten klare grenser er hele analysen meningsløs. Steg 0.' },
{ id: 'c', label: 'Søk konkurrent-info', isCorrect: false, feedback: 'Krever klare grenser først.' },
{ id: 'd', label: 'Skrive konklusjon', isCorrect: false, feedback: 'Aldri først.' },
      ],
      espenTip: 'Klassisk feil: starte analyse uten å definere markedet. Alt blir gjetning.',
    },
    {
      id: 'ml203-9-2',
      icon: '🌍',
      title: 'Lokal eksempel',
      question: 'En lokal kafé — hvilket marked konkurrerer den i?',
      choices: [
        { id: 'a', label: 'Globalt kaffemarked', isCorrect: false, feedback: 'For bredt.' },
{ id: 'b', label: 'Lokalt — kafeer innen ~1 km radius', isCorrect: true, feedback: 'Riktig! Kunden velger lokalt. Bredere markedsanalyse er meningsløs for lokal kafé.' },
{ id: 'c', label: 'Nasjonalt', isCorrect: false, feedback: 'For bredt for daglig konkurranse.' },
{ id: 'd', label: 'Bare egen butikk', isCorrect: false, feedback: 'For smalt — ingen analyse uten konkurrenter.' },
      ],
      espenTip: 'Geografisk avgrensning avhenger av kundens kjøpsadferd. Kafé = lokal. Online-handel = nasjonal/global.',
    },
    {
      id: 'ml203-9-3',
      icon: '🌍',
      title: 'Skifte nivå',
      question: 'Når blir nivå-skifte viktig?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Kritisk for store bedrifter.' },
{ id: 'b', label: 'Når bedriften ekspanderer geografisk eller endrer kundetype', isCorrect: true, feedback: 'Riktig! Hver gang markedsgrensene endres må analysen revideres.' },
{ id: 'c', label: 'Bare hvert 10. år', isCorrect: false, feedback: 'For sjelden.' },
{ id: 'd', label: 'Kun ved konkurs', isCorrect: false, feedback: 'Da er det for sent.' },
      ],
      espenTip: 'Når TINE eksporterer til Kina: ny analyse. Andre konkurrenter, andre kundepreferanser, andre regulatoriske krav.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📋',
            title: 'Bruk av analysen',
            quote: 'Fra analyse til strategi.',
            content: 'Bransjeanalyse er ikke et mål i seg selv — den er INPUT til strategi. Hvis bransjen er attraktiv (svake krefter): satse mer. Hvis ulønnsom (sterke krefter): vurder å forlate eller posisjonere unikt. Mange selskaper gjør analysen som rituale, men handler ikke på funnene. Det er kasting bort av tid.',
            subpoints: [
                  { label: 'INPUT TIL STRATEGI', text: 'Bransjeanalyse skal føre til strategiske valg, ikke arkiveres.' },
          { label: 'HANDLING > ANALYSE', text: 'Beste analyse uten handling er verdiløs.' },
            ],
            practical: 'Hva ville du gjort hvis bransjeanalyse viste at hovedbransjen din ble strukturelt ulønnsom?',
            exercises: [
            {
      id: 'ml203-10-1',
      icon: '📋',
      title: 'Formål',
      question: 'Hva er hovedformålet med bransjeanalyse?',
      choices: [
        { id: 'a', label: 'Pynt i strategidokument', isCorrect: false, feedback: 'Aldri godt formål.' },
{ id: 'b', label: 'Input til strategiske valg om hvor og hvordan konkurrere', isCorrect: true, feedback: 'Riktig! Analyse → handling. Ellers er det bortkastet tid.' },
{ id: 'c', label: 'Kun for konsulenter', isCorrect: false, feedback: 'Verktøy for ledelsen.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Ikke lovpålagt.' },
      ],
      espenTip: 'Test: hvilke konkrete handlinger fulgte forrige bransjeanalyse? Hvis ingen — for du gjentakende analyser uten verdi.',
    },
    {
      id: 'ml203-10-2',
      icon: '📋',
      title: 'Strukturelt ulønnsom',
      question: 'Hva gjør du hvis bransjen er strukturelt ulønnsom?',
      choices: [
        { id: 'a', label: 'Fortsett som før', isCorrect: false, feedback: 'Strategisk dødsfelle.' },
{ id: 'b', label: 'Vurder å forlate, eller finn unik posisjonering med høyere marginer', isCorrect: true, feedback: 'Riktig! Når kreftene er sterke, må du posisjonere deg utenfor det generiske markedet.' },
{ id: 'c', label: 'Investerer mer', isCorrect: false, feedback: 'Sjelden løsning.' },
{ id: 'd', label: 'Saksøke konkurrenter', isCorrect: false, feedback: 'Helt urealistisk.' },
      ],
      espenTip: 'Klassisk eksempel: aviser. Bransjen ble strukturelt ulønnsom. De som overlevde fant nye forretningsmodeller (digital abonnement).',
    },
    {
      id: 'ml203-10-3',
      icon: '📋',
      title: 'Frekvens',
      question: 'Hvor ofte bør bransjeanalyse oppdateres?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For sjelden.' },
{ id: 'b', label: 'Årlig + ved store endringer', isCorrect: true, feedback: 'Riktig! Stabil bransje: årlig review. Disrupsjon: oftere.' },
{ id: 'c', label: 'Hver dag', isCorrect: false, feedback: 'For ofte.' },
{ id: 'd', label: 'Hvert 10. år', isCorrect: false, feedback: 'For sjelden — verden endrer seg.' },
      ],
      espenTip: 'I tek-bransjer kan endringer gjøre analyse foreldet på 6 måneder. Bygg inn periodisk revisjon.',
    },
            ],
          },
        ]

        export default function MarkedsOgBransjeanalyseModule() {
          return (
            <DrawerModule
              moduleCode="ML2-03"
              moduleTitle="Markeds- og bransjeanalyse"
              moduleIcon="🔍"
              storageKey="learning-ml2-markeds-og-bransjeanalyse"
              completeRoute="/learning/ml2/markeds-og-bransjeanalyse/complete"
              phases={phases}
              intro="Bransjeanalyse forteller hvor lønnsomt det er å være i bransjen. Porters 5 krefter er det dominerende rammeverket. Sterke krefter = lave marginer for alle. Svake krefter = lukrativ posisjon."
              vissteduAt="Norsk dagligvare er kontrollert av 3 kjeder med 96 % markedsandel. Det er en av Europas mest konsentrerte bransjer — og forklarer hvorfor matprisene er som de er."
              espenSier="Bransjeanalyse forteller deg om jobben er verdt det. Hvis 4 av 5 krefter er sterke, er det vanskelig å tjene penger uansett hvor flink du er."
      presentationLink={{ route: '/learning/presentations/ml2/markeds-og-bransjeanalyse', description: 'Markeds- og bransjeanalyse — 10 slides' }}
            />
          )
        }
