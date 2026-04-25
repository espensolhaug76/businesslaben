import DrawerModule from '../shared/DrawerModule';

export const phases = [
  {
    phaseNumber: 1,
    icon: '📋',
    title: 'SWOT-analyse i dybden',
    quote: 'Interne vs. eksterne faktorer',
    content: 'SWOT = Strengths (styrker), Weaknesses (svakheter), Opportunities (muligheter), Threats (trusler). VIKTIG: Styrker og svakheter er INTERNE — du kontrollerer dem. Muligheter og trusler er EKSTERNE — de oppstår i markedet utenfor din kontroll.',
    subpoints: [
      'STYRKER (interne): Hva er bedriften god på? Sterk merkevare (Nike), lav kostnad (Rema 1000), teknologifortrinn (Apple)',
      'SVAKHETER (interne): Hva henger bedriften etter på? Høy gjeld, svak digital tilstedeværelse, smal produktlinje',
      'MULIGHETER (eksterne): Endringer i markedet du kan utnytte — eldrebølgen, bærekrafttrend',
      'TRUSLER (eksterne): Endringer som kan skade bedriften — ny teknologi, ny lovgivning, ny sterk konkurrent',
    ],
    practical: 'En god SWOT-analyse leder til strategiske valg: Bygg på styrker + Utnytt muligheter = SO-strategi. Reduser svakheter + Unngå trusler = WT-strategi.',
    glossaryTerm: 'SWOT-analyse',
    exercises: [
      {
        id: 'sa-1-1',
        question: 'Hva er styrker og svakheter i en SWOT-analyse?',
        choices: [
          { id: 'a', text: 'Eksterne faktorer i markedet' },
          { id: 'b', text: 'Interne faktorer bedriften kontrollerer' },
          { id: 'c', text: 'Faktorer kun relatert til konkurrenter' },
          { id: 'd', text: 'Fremtidige prognoser for markedet' },
        ],
        correctId: 'b',
        explanation: 'Styrker og svakheter er INTERNE faktorer — de er under bedriftens kontroll og handler om hva bedriften gjør bra eller dårlig.',
      },
      {
        id: 'sa-1-2',
        question: 'Hva er muligheter og trusler i en SWOT-analyse?',
        choices: [
          { id: 'a', text: 'Interne faktorer bedriften kontrollerer' },
          { id: 'b', text: 'Eksterne faktorer i markedet og omgivelsene utenfor bedriftens kontroll' },
          { id: 'c', text: 'Kun teknologiske endringer' },
          { id: 'd', text: 'Faktorene HR-avdelingen håndterer' },
        ],
        correctId: 'b',
        explanation: 'Muligheter og trusler er EKSTERNE faktorer — de eksisterer i markedet og omgivelsene uavhengig av bedriften, men bedriften kan velge å utnytte dem eller beskytte seg mot dem.',
      },
      {
        id: 'sa-1-3',
        question: 'Hva er en SO-strategi i SWOT?',
        choices: [
          { id: 'a', text: 'Å redusere svakheter og unngå trusler' },
          { id: 'b', text: 'Å bygge på styrker for å utnytte muligheter' },
          { id: 'c', text: 'Å styrke intern struktur og organisasjon' },
          { id: 'd', text: 'Å slå seg sammen med en konkurrent' },
        ],
        correctId: 'b',
        explanation: 'SO-strategien (Strengths-Opportunities) handler om å bruke bedriftens styrker aktivt for å gripe de eksterne mulighetene i markedet.',
      },
      {
        id: 'sa-1-4',
        question: 'Et selskap har høy gjeld og svak digital tilstedeværelse. Hva er dette i SWOT?',
        choices: [
          { id: 'a', text: 'Trusler' },
          { id: 'b', text: 'Muligheter' },
          { id: 'c', text: 'Svakheter' },
          { id: 'd', text: 'Styrker' },
        ],
        correctId: 'c',
        explanation: 'Høy gjeld og svak digital tilstedeværelse er interne svakheter — faktorer bedriften selv er ansvarlig for og kan jobbe med å forbedre.',
      },
      {
        id: 'sa-1-5',
        question: 'En bærekrafttrend i markedet er for et grønt selskap...',
        choices: [
          { id: 'a', text: 'En svakhet' },
          { id: 'b', text: 'En trussel' },
          { id: 'c', text: 'En mulighet' },
          { id: 'd', text: 'En styrke' },
        ],
        correctId: 'c',
        explanation: 'En bærekrafttrend er en ekstern mulighet — en endring i markedet som et grønt selskap kan utnytte for vekst, uten at selskapet selv skapte trenden.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '🌍',
    title: 'PESTEL-analyse',
    quote: 'De seks ytre kreftene som former alle bransjer',
    content: 'PESTEL identifiserer makrofaktorer som påvirker alle bedrifter i en bransje: Politisk, Ekonomisk, Sosialt, Teknologisk, Miljø og Legalt. Disse faktorene er ikke under noen enkelt bedrifts kontroll — men kluge bedrifter forutser dem og posisjonerer seg deretter.',
    subpoints: [
      'P — POLITISK: Handelspolitikk, subsidier, skatter, politisk stabilitet',
      'E — EKONOMISK: Renter, inflasjon, arbeidsledighet, kjøpekraft',
      'S — SOSIALT: Demografiske trender, livsstil, helse-bevissthet — vegansk trend, eldrebølgen',
      'T — TEKNOLOGISK: Ny teknologi, digitalisering, automatisering',
      'E — MILJØ: Klima, naturressurser, bærekraft',
      'L — LEGALT: GDPR, forbrukervern, arbeidsmiljølov, konkurranserett',
    ],
    practical: 'PESTEL brukes til å identifisere MULIGHETER og TRUSLER i SWOT. Det er makroanalysen som fyller den eksterne halvdelen av SWOT.',
    glossaryTerm: 'PESTEL',
    exercises: [
      {
        id: 'sa-2-1',
        question: 'Hva analyserer PESTEL?',
        choices: [
          { id: 'a', text: 'Interne styrker og svakheter i bedriften' },
          { id: 'b', text: 'Makrofaktorer i omgivelsene som påvirker bransjen' },
          { id: 'c', text: 'Konkurrentenes strategier' },
          { id: 'd', text: 'Kundeservice-kvalitet' },
        ],
        correctId: 'b',
        explanation: 'PESTEL analyserer makrofaktorer — politiske, ekonomiske, sosiale, teknologiske, miljømessige og legale krefter som påvirker alle bedrifter i en bransje.',
      },
      {
        id: 'sa-2-2',
        question: 'EU innfører ny personvernlov (GDPR). Dette er en...',
        choices: [
          { id: 'a', text: 'Teknologisk faktor' },
          { id: 'b', text: 'Legal faktor' },
          { id: 'c', text: 'Sosialt faktor' },
          { id: 'd', text: 'Ekonomisk faktor' },
        ],
        correctId: 'b',
        explanation: 'GDPR er et regelverk — en legal (L) faktor i PESTEL. Lover og reguleringer klassifiseres under det legale aspektet.',
      },
      {
        id: 'sa-2-3',
        question: 'Økt helse-bevissthet og vegansk trend er hvilken PESTEL-faktor?',
        choices: [
          { id: 'a', text: 'Politisk (P)' },
          { id: 'b', text: 'Teknologisk (T)' },
          { id: 'c', text: 'Sosialt (S)' },
          { id: 'd', text: 'Miljø (E)' },
        ],
        correctId: 'c',
        explanation: 'Helse-bevissthet og livsstilstrender er sosiale (S) faktorer — demografiske og kulturelle endringer i samfunnet som påvirker forbrukernes atferd.',
      },
      {
        id: 'sa-2-4',
        question: 'Hvordan henger PESTEL og SWOT sammen?',
        choices: [
          { id: 'a', text: 'De er to uavhengige verktøy uten kobling' },
          { id: 'b', text: 'PESTEL fyller den interne halvdelen av SWOT' },
          { id: 'c', text: 'PESTEL identifiserer muligheter og trusler til SWOT (ekstern analyse)' },
          { id: 'd', text: 'SWOT erstatter PESTEL i moderne analyse' },
        ],
        correctId: 'c',
        explanation: 'PESTEL er makroanalysen som identifiserer de eksterne faktorene — muligheter og trusler — som inngår i den eksterne halvdelen av SWOT-analysen.',
      },
      {
        id: 'sa-2-5',
        question: 'EU-klimaregelverk som tvinger bilindustrien til å investere i elbiler er...',
        choices: [
          { id: 'a', text: 'En politisk (P) faktor' },
          { id: 'b', text: 'En legal (L) faktor' },
          { id: 'c', text: 'En miljø (E) faktor' },
          { id: 'd', text: 'Riktig klassifisert som enten E (miljø) eller L (legal) — begge er riktige' },
        ],
        correctId: 'd',
        explanation: 'EU-klimaregelverk kan klassifiseres som både en miljø-faktor (E) og en legal faktor (L). PESTEL-faktorer overlapper ofte — det viktige er å identifisere konsekvensen for bedriften.',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '⚔️',
    title: 'Porters fem krefter',
    quote: 'Hva bestemmer lønnsomheten i en bransje?',
    content: 'Michael Porter (Harvard, 1979) identifiserte fem krefter som bestemmer lønnsomheten i en bransje. Jo sterkere kreftene er, jo vanskeligere er det å tjene penger — uavhengig av din strategi.',
    subpoints: [
      '1. EKSISTERENDE KONKURRENTER: Intens rivalitet presser prisene ned (Spotify vs Apple Music vs Tidal)',
      '2. NYKOMMERTRUSSEL: Lave etableringsbarrierer gir lett inngang (Airbnb disrupted hotell)',
      '3. SUBSTITUTTER: Produkter som kan erstatte ditt setter tak på hva du kan ta betalt',
      '4. LEVERANDØRMAKT: Få leverandører = høy makt (Boeing avhengig av GE og Rolls Royce)',
      '5. KUNDENES FORHANDLINGSMAKT: Store kunder (Walmart, NorgesGruppen) presser priser ned',
    ],
    practical: 'Analysér bransjens lønnsomhetspotensial FØRST — det nytter lite å ha en fantastisk strategi i en bransje der alle taper penger.',
    glossaryTerm: 'Porters fem krefter',
    exercises: [
      {
        id: 'sa-3-1',
        question: 'Hva måler Porters fem krefter?',
        choices: [
          { id: 'a', text: 'En enkelt bedrifts interne styrke' },
          { id: 'b', text: 'Lønnsomhetspotensialet i en hel bransje' },
          { id: 'c', text: 'Kvaliteten på bedriftens produkter' },
          { id: 'd', text: 'Antall konkurrenter i markedet' },
        ],
        correctId: 'b',
        explanation: 'Porters fem krefter analyserer strukturen i en hel bransje for å vurdere dens lønnsomhetspotensial. Jo sterkere kreftene er, jo lavere er bransjens lønnsomhet generelt.',
      },
      {
        id: 'sa-3-2',
        question: 'Airbnb disrupted hotellbransjen fordi de hadde lave etableringsbarrierer. Dette er...',
        choices: [
          { id: 'a', text: 'Eksisterende konkurrenters rivalitet' },
          { id: 'b', text: 'Leverandørmakt' },
          { id: 'c', text: 'Inntrengertrussel (nykommertrusselen)' },
          { id: 'd', text: 'Substituttrussel' },
        ],
        correctId: 'c',
        explanation: 'Airbnb er et eksempel på inntrengertrussel — en nykomme som entret markedet med lave etableringsbarrierer (ingen eiendomsinvestering, kun digital plattform).',
      },
      {
        id: 'sa-3-3',
        question: 'Hva er substitutter i Porters rammeverk?',
        choices: [
          { id: 'a', text: 'Direkte konkurrenter som selger det samme produktet' },
          { id: 'b', text: 'Produkter fra andre bransjer som kan erstatte ditt' },
          { id: 'c', text: 'Erstatningsprodukter for ansatte' },
          { id: 'd', text: 'Leverandørenes backup-produkter' },
        ],
        correctId: 'b',
        explanation: 'Substitutter er produkter fra andre bransjer som tilfredsstiller samme behov — fly er substitutt for tog, streaming er substitutt for kino. De setter et tak på hva du kan ta betalt.',
      },
      {
        id: 'sa-3-4',
        question: 'NorgesGruppen kontrollerer over 40 % av norsk dagligvare og presser leverandørpriser. Dette er...',
        choices: [
          { id: 'a', text: 'Leverandørmakt' },
          { id: 'b', text: 'Kundenes forhandlingsmakt' },
          { id: 'c', text: 'Eksisterende konkurrenter' },
          { id: 'd', text: 'Inntrengertrussel' },
        ],
        correctId: 'b',
        explanation: 'NorgesGruppen som stor kjøper representer kundenes forhandlingsmakt — store kunder som kontrollerer store volumer kan presse leverandørenes priser ned.',
      },
      {
        id: 'sa-3-5',
        question: 'Hvilken av disse bransjestrukturene er minst attraktiv for nye aktører?',
        choices: [
          { id: 'a', text: 'Mange kunder, svake konkurrenter, mange leverandører' },
          { id: 'b', text: 'Høye etableringsbarrierer, svak konkurranse, lojale kunder' },
          { id: 'c', text: 'Sterk konkurranse, sterke kunder, sterke leverandører og gode substitutter' },
          { id: 'd', text: 'Ny teknologi, få konkurrenter, mange kunder' },
        ],
        correctId: 'c',
        explanation: 'En bransje med sterk rivalisering, sterk kundermakt, sterk leverandørmakt, sterke substitutter og lav inngangsbarriere er det minst attraktive utgangspunktet — alle fem kreftene er sterke.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🔲',
    title: 'BCG-matrisen',
    quote: 'Markedsandel og vekst — prioriter riktig',
    content: 'Boston Consulting Group (1970) lagde en 2×2-matrise for å klassifisere produkter basert på markedsvekst og relativ markedsandel: Stjerner (høy vekst, høy andel), Melkekyr (lav vekst, høy andel), Spørsmålstegn (høy vekst, lav andel), Hunder (lav vekst, lav andel).',
    subpoints: [
      '⭐ STJERNER (høy vekst, høy andel): Krever investering for å holde posisjon, men genererer god inntekt',
      '🐄 MELKEKYR (lav vekst, høy andel): Stabil kontantstrøm med lite investeringsbehov — bedriftens finansieringsmotor',
      '❓ SPØRSMÅLSTEGN (høy vekst, lav andel): Potensielt fremtidige stjerner — eller fremtidige hunder',
      '🐕 HUNDER (lav vekst, lav andel): Svake produkter i stagnerende markeder — avvikle og frigjør ressurser',
    ],
    practical: 'Bruk BCG til å prioritere ressurser: Melk kyrne for å finansiere stjernene. Investér selektivt i spørsmålstegnene. Avvikle hundene.',
    glossaryTerm: 'BCG-matrisen',
    exercises: [
      {
        id: 'sa-4-1',
        question: 'Hva er en "melkeku" i BCG-matrisen?',
        choices: [
          { id: 'a', text: 'Et nytt produkt med høy vekst og stor markedsandel' },
          { id: 'b', text: 'Et etablert produkt med dominerende posisjon i et modent marked — lav vekst, høy andel' },
          { id: 'c', text: 'Et usikkert produkt i et voksende marked' },
          { id: 'd', text: 'Et svakt produkt i et stagnerende marked' },
        ],
        correctId: 'b',
        explanation: 'Melkekyr er produkter med høy markedsandel i modne (lav vekst) markeder — de genererer stabil kontantstrøm med lite investeringsbehov. De er bedriftens finansieringsmotor.',
      },
      {
        id: 'sa-4-2',
        question: 'Hva kjennetegner et "spørsmålstegn" i BCG-matrisen?',
        choices: [
          { id: 'a', text: 'Høy markedsandel og høy vekst' },
          { id: 'b', text: 'Lav markedsandel og lav vekst' },
          { id: 'c', text: 'Høy vekst i markedet, men lav markedsandel for produktet' },
          { id: 'd', text: 'Lav vekst og høy markedsandel' },
        ],
        correctId: 'c',
        explanation: 'Spørsmålstegn er produkter i raskt voksende markeder (høy vekst) der bedriften har lav markedsandel — de kan bli fremtidige stjerner med riktig investering, eller hunder hvis man ikke lykkes.',
      },
      {
        id: 'sa-4-3',
        question: 'BlackBerry-telefoner etter iPhone-lanseringen (fallende andel, ingen vekst) er...',
        choices: [
          { id: 'a', text: 'En stjerne' },
          { id: 'b', text: 'En melkeku' },
          { id: 'c', text: 'Et spørsmålstegn' },
          { id: 'd', text: 'En hund' },
        ],
        correctId: 'd',
        explanation: 'BlackBerry etter iPhone er en klassisk "hund" — lav og fallende markedsandel i et marked uten vekst. BCG-rådet: avvikle og frigjør ressurser.',
      },
      {
        id: 'sa-4-4',
        question: 'Hva er BCG-rådets strategi for "stjerner"?',
        choices: [
          { id: 'a', text: 'Avvikle og frigjør kapital' },
          { id: 'b', text: 'Invester for å beholde eller øke markedsandelen' },
          { id: 'c', text: 'Hold posisjonen uten å investere' },
          { id: 'd', text: 'Selg til konkurrent' },
        ],
        correctId: 'b',
        explanation: 'Stjerner er i raskt voksende markeder — de trenger investering for å beholde posisjonen mot konkurrenter. Mangel på investering kan føre til at en stjerne synker til et spørsmålstegn.',
      },
      {
        id: 'sa-4-5',
        question: 'Hva er formålet med BCG-matrisen?',
        choices: [
          { id: 'a', text: 'Å analysere makroomgivelsene i bransjen' },
          { id: 'b', text: 'Å vurdere kundetilfredshet for hvert produkt' },
          { id: 'c', text: 'Å prioritere ressursallokering i en produktportefølje' },
          { id: 'd', text: 'Å vurdere kvaliteten på salgsteamet' },
        ],
        correctId: 'c',
        explanation: 'BCG-matrisen er et ressursallokeringsverktøy — den hjelper bedrifter å prioritere hvilke produkter de skal investere i, holde, melke eller avvikle.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '📊',
    title: 'Datainnsamling og markedsinformasjon',
    quote: 'Primær vs. sekundærdata — velg riktig verktøy',
    content: 'God analyse krever god data. Uten pålitelig informasjon er selv de beste analytiske rammeverk basert på gjetning. Forstå forskjellen på datatypene og velg riktig. Triangulering — å kombinere uavhengige datakilder — gir mer pålitelig analyse.',
    subpoints: [
      'PRIMÆRDATA: Innsamlet direkte for din undersøkelse (spørreundersøkelser, intervjuer, fokusgrupper) — spesifikt men dyrt',
      'SEKUNDÆRDATA: Allerede innsamlet av andre (SSB, bransjerapporter, Google Trends) — billig og raskt',
      'DIGITAL DATA: Nettanalyse, sosiale medier-innsikt, søkedata — enormt omfang, sanntid, GDPR-begrenset',
      'TRIANGULERING: Kombiner flere uavhengige datakilder for mer pålitelig analyse',
    ],
    practical: 'Start alltid med sekundærdata (gratis!) — bruk primærdata kun for det sekundærdata ikke kan svare på.',
    glossaryTerm: 'Primærdata',
    exercises: [
      {
        id: 'sa-5-1',
        question: 'Hva er primærdata?',
        choices: [
          { id: 'a', text: 'Data fra SSB og offentlige registre' },
          { id: 'b', text: 'Data innsamlet direkte av bedriften for en spesifikk undersøkelse' },
          { id: 'c', text: 'Data fra konkurrenters årsrapporter' },
          { id: 'd', text: 'Data fra bransjens interesseorganisasjoner' },
        ],
        correctId: 'b',
        explanation: 'Primærdata innsamles direkte av bedriften for det spesifikke formålet — f.eks. spørreundersøkelser, dybdeintervjuer, fokusgrupper og observasjoner.',
      },
      {
        id: 'sa-5-2',
        question: 'Hva er fordelen med sekundærdata fremfor primærdata?',
        choices: [
          { id: 'a', text: 'Det er skreddersydd for din spesifikke problemstilling' },
          { id: 'b', text: 'Det er billig og raskt å skaffe' },
          { id: 'c', text: 'Det er alltid mer nøyaktig' },
          { id: 'd', text: 'Det er aldri utdatert' },
        ],
        correctId: 'b',
        explanation: 'Sekundærdata er billig og raskt tilgjengelig — ofte gratis fra SSB, bransjerapporter og Google. Ulempen er at det ikke er skreddersydd for din spesifikke problemstilling.',
      },
      {
        id: 'sa-5-3',
        question: 'Hva er triangulering i datainnsamling?',
        choices: [
          { id: 'a', text: 'Å bruke kun tre datakilder' },
          { id: 'b', text: 'Å kombinere flere uavhengige datakilder for mer pålitelig analyse' },
          { id: 'c', text: 'Å analysere data geometrisk' },
          { id: 'd', text: 'Å dele opp markedet i tre segmenter' },
        ],
        correctId: 'b',
        explanation: 'Triangulering betyr å kombinere flere uavhengige datakilder. Tre uavhengige kilder som peker i samme retning gir sterk evidens for en konklusjon — én kilde kan ta feil eller være skjev.',
      },
      {
        id: 'sa-5-4',
        question: 'Hva setter GDPR begrensninger på?',
        choices: [
          { id: 'a', text: 'Bruk av sekundærdata' },
          { id: 'b', text: 'Innsamling og bruk av persondata i EU/EØS' },
          { id: 'c', text: 'Størrelsen på markedsforskningsbudsjetter' },
          { id: 'd', text: 'Bruk av sosiale medier til markedsføring' },
        ],
        correctId: 'b',
        explanation: 'GDPR (General Data Protection Regulation) setter juridiske grenser for innsamling, lagring og bruk av persondata i EU/EØS — dette påvirker spesielt digital data og nettanalyse.',
      },
      {
        id: 'sa-5-5',
        question: 'Hva bør man gjøre FØRST når man trenger markedsinformasjon?',
        choices: [
          { id: 'a', text: 'Gjennomføre en dyr spørreundersøkelse' },
          { id: 'b', text: 'Starte med tilgjengelig sekundærdata' },
          { id: 'c', text: 'Ansette en ekstern markedsanalysebyråer' },
          { id: 'd', text: 'Samle inn primærdata om konkurrenter' },
        ],
        correctId: 'b',
        explanation: 'Start alltid med sekundærdata — det er gratis og raskt. Bruk primærdata kun for det sekundærdata ikke kan besvare. Spar tid og penger, men få bedre svar.',
      },
    ],
  },
];

export default function SituasjonsanalyseModule() {
  return (
    <DrawerModule
      moduleCode="ML1-02"
      moduleTitle="Situasjonsanalyse"
      moduleIcon="🔍"
      storageKey="learning-ml1-situasjonsanalyse"
      completeRoute="/learning/ml1/situasjonsanalyse/complete"
      phases={phases}
      intro="Gode beslutninger krever god innsikt. Situasjonsanalyse er verktøykassen for å forstå hvor bedriften står, hvilke krefter som påvirker markedet, og hvilke strategiske valg som er tilgjengelige."
      vissteduAt="NorgesGruppen gjennomfører over 500 000 kundeinteraksjoner daglig — alle data analyseres for å optimere produktsortiment, priser og kampanjer i sanntid."
      espenSier="En god SWOT tar maks 2 timer — men mange bedrifter tar beslutninger uten noen analyse i det hele tatt. Situasjonsanalyse er ikke sikkert å gjøre — det er farlig IKKE å gjøre det."
      presentationLink={{ route: '/learning/presentations/ml1/situasjonsanalyse', description: 'Markedsinformasjon og MIS — 10 slides' }}
    />
  );
}
