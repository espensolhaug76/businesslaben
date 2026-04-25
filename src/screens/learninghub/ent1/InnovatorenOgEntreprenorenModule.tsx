        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '💡',
            title: 'Hva er entreprenørskap?',
            quote: 'Identifisere muligheter, mobilisere ressurser, skape verdi.',
            content: 'Entreprenørskap er prosessen med å identifisere muligheter og mobilisere ressurser for å skape verdi — økonomisk, sosialt eller kulturelt. Det handler ikke bare om å starte bedrifter, men om en arbeidsmåte og holdning til problemløsning.',
            subpoints: [
                  { label: '3 STEG', text: 'Identifisere mulighet → mobilisere ressurser → skape verdi.' },
          { label: 'BREDT', text: 'Inkluderer sosial og kulturell verdiskaping, ikke bare profitt.' },
            ],
            practical: 'Hvilket problem rundt deg har du tenkt \'noen burde løse det\'? Det er entreprenør-tenkning.',
            exercises: [
            {
      id: 'ent101-1-1',
      icon: '💡',
      title: 'Definisjon',
      question: 'Hva er entreprenørskap?',
      choices: [
        { id: 'a', label: 'Bare å starte bedrift', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Identifisere muligheter og mobilisere ressurser for å skape verdi', isCorrect: true, feedback: 'Riktig! Bredt og strategisk.' },
{ id: 'c', label: 'Bare økonomisk gevinst', isCorrect: false, feedback: 'For smalt — også sosial og kulturell verdi.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert prosess.' },
      ],
      espenTip: 'Schumpeter introduserte begrepet i moderne form. \'Skapende ødeleggelse\' er hans bidrag.',
    },
    {
      id: 'ent101-1-2',
      icon: '💡',
      title: 'Bredt',
      question: 'Inkluderer entreprenørskap kun bedrifter?',
      choices: [
        { id: 'a', label: 'Ja, bare bedrifter', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Nei — også sosial, kulturell, organisatorisk verdiskaping', isCorrect: true, feedback: 'Riktig! Bredt definert.' },
{ id: 'c', label: 'Bare i offentlig sektor', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Sosialt entreprenørskap er voksende felt. Patagonia, Tomra, Warm Up er eksempler.',
    },
    {
      id: 'ent101-1-3',
      icon: '💡',
      title: 'Holdning',
      question: 'Hva er entreprenør-holdning?',
      choices: [
        { id: 'a', label: 'Bare å være sjef', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Se muligheter, ta initiativ, tåle usikkerhet, lære av feil', isCorrect: true, feedback: 'Riktig! Holdning som kan trenes.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare for unge', isCorrect: false, feedback: 'Aldersnøytralt.' },
      ],
      espenTip: 'Du kan være entreprenør i en stor bedrift også — det kalles intraprenørskap.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎨',
            title: 'Innovasjonstyper',
            quote: 'Schumpeter: 4 typer.',
            content: 'Joseph Schumpeter identifiserte 4 innovasjonstyper: produktinnovasjon (ny vare), prosessinnovasjon (ny måte å lage på), markedsinnovasjon (ny måte å selge på) og organisasjonsinnovasjon (ny struktur). Apple kombinerer ofte alle fire — iPhone var produkt + marked + organisasjon.',
            subpoints: [
                  { label: '4 TYPER', text: 'Produkt, prosess, marked, organisasjon.' },
          { label: 'KOMBINASJONER', text: 'Sterke innovasjoner kombinerer flere typer.' },
            ],
            practical: 'Hvilken innovasjon de siste årene synes du har vært mest revolusjonerende?',
            exercises: [
            {
      id: 'ent101-2-1',
      icon: '🎨',
      title: 'Antall',
      question: 'Hvor mange innovasjonstyper?',
      choices: [
        { id: 'a', label: '2', isCorrect: false, feedback: 'For få.' },
{ id: 'b', label: '4 — produkt, prosess, marked, organisasjon', isCorrect: true, feedback: 'Riktig! Schumpeters klassifisering.' },
{ id: 'c', label: '10', isCorrect: false, feedback: 'For mange.' },
{ id: 'd', label: 'Bare 1', isCorrect: false, feedback: 'For lite.' },
      ],
      espenTip: 'Schumpeter publiserte i 1934. Fortsatt grunnleggende rammeverk for innovasjon-typer.',
    },
    {
      id: 'ent101-2-2',
      icon: '🎨',
      title: 'Apple',
      question: 'Hvilke innovasjonstyper kombinerte iPhone?',
      choices: [
        { id: 'a', label: 'Bare produkt', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Produkt + marked (App Store) + organisasjon (vertical integration)', isCorrect: true, feedback: 'Riktig! Multipel innovasjon.' },
{ id: 'c', label: 'Bare prosess', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Sterke innovasjoner kombinerer typer. Det gjør dem vanskeligere å kopiere.',
    },
    {
      id: 'ent101-2-3',
      icon: '🎨',
      title: 'Markedsinnovasjon',
      question: 'Hva er markedsinnovasjon?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Ny måte å selge / nå kunder på — Amazon, Spotify, Tesla direkte salg', isCorrect: true, feedback: 'Riktig! Distribusjons- og forretningsmodell-innovasjon.' },
{ id: 'c', label: 'Bare ny pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Tesla direktedistribusjon (uten forhandlere) er klassisk markedsinnovasjon.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '👤',
            title: 'Egenskaper hos en gründer',
            quote: '4 kjerneegenskaper.',
            content: 'Forskning peker på 4 kjerneegenskaper: utholdenhet (slå seg gjennom motgang), risikovilje (tåle usikkerhet), kreativitet (se nye løsninger), sosiale ferdigheter (selge ideen til andre). Ingen er født med alt — det meste kan trenes. Men noen folk har bedre utgangspunkt.',
            subpoints: [
                  { label: '4 EGENSKAPER', text: 'Utholdenhet, risikovilje, kreativitet, sosiale ferdigheter.' },
          { label: 'KAN TRENES', text: 'Egenskaper er dynamiske, ikke statiske.' },
            ],
            practical: 'Hvilke av de 4 egenskapene har du? Hvilke kan du jobbe med?',
            exercises: [
            {
      id: 'ent101-3-1',
      icon: '👤',
      title: 'Hvilke 4',
      question: 'Hva er kjerneegenskapene?',
      choices: [
        { id: 'a', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Utholdenhet, risikovilje, kreativitet, sosiale ferdigheter', isCorrect: true, feedback: 'Riktig! Forskningsbasert.' },
{ id: 'c', label: 'Bare høy IQ', isCorrect: false, feedback: 'Ikke nok alene.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forskning viser at IQ alene ikke predikerer entreprenør-suksess. Disse 4 egenskapene gjør det.',
    },
    {
      id: 'ent101-3-2',
      icon: '👤',
      title: 'Trening',
      question: 'Kan egenskapene trenes?',
      choices: [
        { id: 'a', label: 'Nei', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — alle 4 kan utvikles bevisst over tid', isCorrect: true, feedback: 'Riktig! Vekst-tankegang.' },
{ id: 'c', label: 'Bare i ungdom', isCorrect: false, feedback: 'Hele livet.' },
{ id: 'd', label: 'Bare for menn', isCorrect: false, feedback: 'Helt urelevant og feil.' },
      ],
      espenTip: 'Carol Dweck: \'growth mindset\' vs \'fixed mindset\'. Tro på egen utvikling er selv en forutsetning for utvikling.',
    },
    {
      id: 'ent101-3-3',
      icon: '👤',
      title: 'Viktigst',
      question: 'Hvilken er ofte viktigst?',
      choices: [
        { id: 'a', label: 'IQ', isCorrect: false, feedback: 'Ikke kjerneegenskap.' },
{ id: 'b', label: 'Utholdenhet — kan bære deg gjennom de tøffe periodene', isCorrect: true, feedback: 'Riktig! Mange bedrifter dør i \'valley of death\' — første 2-3 år.' },
{ id: 'c', label: 'Bare risikovilje', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Angela Duckworth: \'Grit\' (utholdenhet) er sterkeste prediksjon på langtidssuksess.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🏢',
            title: 'Intraprenørskap',
            quote: 'Innovasjon innad i bedrifter.',
            content: 'Intraprenørskap = innovasjon innad i eksisterende bedrifter. Ansatte som tenker som gründere, men har ressursene og sikkerheten i en stor organisasjon. 3M sin Post-it kom fra et intraprenørskapsprosjekt — ansatte fikk 15 % av tiden til egne prosjekter.',
            subpoints: [
                  { label: 'INNAD I BEDRIFT', text: 'Entreprenør-tenkning uten å starte selv.' },
          { label: 'RESSURSFORDEL', text: 'Eksisterende infrastruktur, kunder, kapital.' },
            ],
            practical: 'Kjenner du noen som er \'intraprenør\' i jobben sin? Hva gjør dem annerledes?',
            exercises: [
            {
      id: 'ent101-4-1',
      icon: '🏢',
      title: 'Definisjon',
      question: 'Hva er intraprenørskap?',
      choices: [
        { id: 'a', label: 'Internasjonal entreprenør', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Innovasjon innad i eksisterende bedrifter', isCorrect: true, feedback: 'Riktig! Intern entreprenørskap.' },
{ id: 'c', label: 'Internett-bedrifter', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Investering', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Begrepet ble populært på 1980-tallet. Kombinasjon av \'internal\' og \'entrepreneur\'.',
    },
    {
      id: 'ent101-4-2',
      icon: '🏢',
      title: 'Eksempel',
      question: 'Hva er klassisk intraprenørskap-eksempel?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: '3M Post-it — kom fra ansatt med 15 % free time', isCorrect: true, feedback: 'Riktig! Klassisk eksempel på vellykket intraprenørskap.' },
{ id: 'c', label: 'Apple iPhone', isCorrect: false, feedback: 'Toppledelse-drevet.' },
{ id: 'd', label: 'Tesla', isCorrect: false, feedback: 'Gründer-startup.' },
      ],
      espenTip: 'Google har 20 % free time som har gitt Gmail, Google News, AdSense. Strukturelt insentiv.',
    },
    {
      id: 'ent101-4-3',
      icon: '🏢',
      title: 'Fordel',
      question: 'Hva er fordelen?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Eksisterende ressurser + sikkerhet — kan ta større risiko', isCorrect: true, feedback: 'Riktig! Beste av begge verdener.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Bare pensjon', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Intraprenører kan eksperimentere med store ideer uten å risikere personlig økonomi.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '💎',
            title: 'Verdiskaping',
            quote: '3 former: økonomisk, sosial, kulturell.',
            content: 'Verdiskaping kan ta tre former: økonomisk verdi (overskudd, lønninger, skatt), sosial verdi (samfunnsnytte, jobber, folkehelse), kulturell verdi (opplevelser, mangfold, identitet). Bedrifter skaper alle tre — ofte samtidig. Stormberg er eksempel på alle tre.',
            subpoints: [
                  { label: '3 DIMENSJONER', text: 'Økonomisk + sosial + kulturell verdi.' },
          { label: 'OFTE SAMTIDIG', text: 'God bedrift skaper i alle dimensjoner.' },
            ],
            practical: 'Hvilken bedrift du kjenner skaper sterk sosial verdi? Eller kulturell?',
            exercises: [
            {
      id: 'ent101-5-1',
      icon: '💎',
      title: '3 typer',
      question: 'Hva er de 3 verdiformene?',
      choices: [
        { id: 'a', label: 'Bare økonomisk', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Økonomisk, sosial, kulturell', isCorrect: true, feedback: 'Riktig! Bredt verdibegrep.' },
{ id: 'c', label: 'Bare sosial', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Triple Bottom Line er beslektet — Profit, People, Planet. Bredere verdiramme.',
    },
    {
      id: 'ent101-5-2',
      icon: '💎',
      title: 'Stormberg',
      question: 'Hvilken verdi skaper Stormberg?',
      choices: [
        { id: 'a', label: 'Bare økonomisk', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Økonomisk (overskudd) + sosial (ansetter folk med hull i CV) + miljømessig', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal verdi.' },
{ id: 'c', label: 'Bare miljø', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Stormberg-modellen er studie-objekt internasjonalt. Sosialt entreprenørskap som kommersiell strategi.',
    },
    {
      id: 'ent101-5-3',
      icon: '💎',
      title: 'Sosialt entreprenørskap',
      question: 'Hva er det?',
      choices: [
        { id: 'a', label: 'Bare donasjoner', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Bedrifter der samfunnsmål er viktigere enn økonomisk profitt', isCorrect: true, feedback: 'Riktig! Voksende kategori.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert kategori.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Frivillig kategori.' },
      ],
      espenTip: 'Allmenn Praksis (lavterskel helse), Skobi (jobbskaping for utsatte unge) er norske eksempler.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🇳🇴',
            title: 'Entreprenørskap i Norge',
            quote: 'Gode rammevilkår, lavere takt.',
            content: 'Norge har gode rammevilkår: stabilt politisk system, godt utdannet befolkning, sterke støtteordninger via Innovasjon Norge. Likevel er småbedrifters andel av sysselsettingen lavere enn i USA og Sverige. Norsk velferdsstat reduserer \'pull-faktor\' for entreprenørskap.',
            subpoints: [
                  { label: 'GODE RAMMER', text: 'Stabilitet, utdanning, støtteordninger.' },
          { label: 'LAVERE TAKT', text: 'Tryggere ansettelse reduserer \'push\' til selvstendighet.' },
            ],
            practical: 'Hvorfor tror du det er færre norske gründere enn amerikanske?',
            exercises: [
            {
      id: 'ent101-6-1',
      icon: '🇳🇴',
      title: 'Rammevilkår',
      question: 'Hvordan er norske rammevilkår?',
      choices: [
        { id: 'a', label: 'Verste i Europa', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Gode — stabilitet, utdanning, støtteordninger via Innovasjon Norge', isCorrect: true, feedback: 'Riktig! Internasjonalt rangert høyt.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'World Bank Doing Business-rangering plasserer Norge konsistent høyt for å starte bedrift.',
    },
    {
      id: 'ent101-6-2',
      icon: '🇳🇴',
      title: 'Innovasjon Norge',
      question: 'Hva gjør de?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Tilskudd, lån, mentor, internasjonalisering — støtteordninger for gründere', isCorrect: true, feedback: 'Riktig! Statlig hjelpe-organisasjon.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Spesifikt for små og oppstart.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Innovasjon Norge er et av Norges beste \'eksport-produkter\' — modell mange land har kopiert.',
    },
    {
      id: 'ent101-6-3',
      icon: '🇳🇴',
      title: 'Hvorfor lavere',
      question: 'Hvorfor færre gründere enn USA?',
      choices: [
        { id: 'a', label: 'Vi er dummere', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Velferdsstaten reduserer \'push\' — sikker jobb er attraktiv', isCorrect: true, feedback: 'Riktig! Strukturell forklaring.' },
{ id: 'c', label: 'Bare flaks', isCorrect: false, feedback: 'Strukturelle årsaker.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'USA: starter du ikke bedrift, har du sjelden sikkerhetsnett. Norge: trygdesystemet er en \'safety net\' som reduserer push-faktor.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🌱',
            title: 'Bærekraftig entreprenørskap',
            quote: 'Løse sosiale eller miljømessige utfordringer.',
            content: 'Bærekraftig entreprenørskap: bedrifter som løser sosiale eller miljømessige utfordringer gjennom forretningsmodellen. Ikke \'CSR på siden\', men kjernevirksomheten. Tomra (resirkulering), Allmenn Praksis (tilgjengelig helse), Kahoot (digital læring). Bærekraft som forretningsmodell, ikke vedlegg.',
            subpoints: [
                  { label: 'KJERNE', text: 'Bærekraft i forretningsmodellen, ikke som vedlegg.' },
          { label: 'VEKSTOMRÅDE', text: 'Yngre forbrukere prioriterer dette segmentet.' },
            ],
            practical: 'Hvilken bærekraftig forretningsmodell synes du er smartest?',
            exercises: [
            {
      id: 'ent101-7-1',
      icon: '🌱',
      title: 'Definisjon',
      question: 'Hva er bærekraftig entreprenørskap?',
      choices: [
        { id: 'a', label: 'Bare donasjoner', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Løse sosiale/miljømessige utfordringer gjennom forretningsmodellen', isCorrect: true, feedback: 'Riktig! Strukturell tilnærming.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forskjell fra CSR: bærekraft er kjernevirksomheten, ikke noe som gjøres på siden.',
    },
    {
      id: 'ent101-7-2',
      icon: '🌱',
      title: 'Eksempel',
      question: 'Hvilken bedrift er klassisk eksempel?',
      choices: [
        { id: 'a', label: 'Tradisjonell oljebedrift', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Tomra — pant og sortering = sirkulær økonomi som forretning', isCorrect: true, feedback: 'Riktig! Bærekraft = inntekt.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare amerikanske', isCorrect: false, feedback: 'Norske gjør det også.' },
      ],
      espenTip: 'Tomra ble verdsatt over 30 mrd NOK på Oslo Børs. Bærekraft-fokus er strategisk fortrinn.',
    },
    {
      id: 'ent101-7-3',
      icon: '🌱',
      title: 'Vekst',
      question: 'Hvorfor er dette voksende?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelle drivere.' },
{ id: 'b', label: 'Yngre forbrukere prioriterer det + lovverk + investorer (ESG)', isCorrect: true, feedback: 'Riktig! Multi-faktor vekst.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'En av flere drivere.' },
{ id: 'd', label: 'Mode', isCorrect: false, feedback: 'Strukturell endring.' },
      ],
      espenTip: 'ESG-fond har vokst over 30 trillion USD globalt. Penger flyter mot bærekraft.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '📉',
            title: 'Feiling som læring',
            quote: 'Fail fast, learn faster.',
            content: 'Silicon Valley feirer feilsuksess. De fleste vellykkede gründere har minst én konkurs i bagasjen. Hver feil gir dyrebar læring som neste forsøk drar nytte av. Feile er ikke å mislykkes — det er å lære. Norge har historisk vært strengere på \'feiling\' enn USA. Endrer seg.',
            subpoints: [
                  { label: 'FAIL FAST', text: 'Test raskt, lær raskt, juster raskt.' },
          { label: 'KULTUR', text: 'USA = feile er læring. Tradisjonelt Norge = stigma.' },
            ],
            practical: 'Har du selv feilet med noe? Hva lærte du? Brukes læringen videre?',
            exercises: [
            {
      id: 'ent101-8-1',
      icon: '📉',
      title: 'Filosofi',
      question: 'Hva er \'fail fast, learn faster\'?',
      choices: [
        { id: 'a', label: 'Mislykkes raskt', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Test ideer raskt, lær fra feil, juster og prøv igjen', isCorrect: true, feedback: 'Riktig! Iterativ tilnærming.' },
{ id: 'c', label: 'Aldri prøve', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare prøve én gang', isCorrect: false, feedback: 'Tvert imot.' },
      ],
      espenTip: 'Lean Startup-metoden er bygget rundt dette prinsippet. Eric Ries populariserte det.',
    },
    {
      id: 'ent101-8-2',
      icon: '📉',
      title: 'Suksess',
      question: 'Har vellykkede gründere feilet?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'De fleste har minst én konkurs eller stor feil bak seg', isCorrect: true, feedback: 'Riktig! Feiling er normal del av reisen.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Steve Jobs ble sparket fra Apple, Walt Disney sa opp fra første jobb. Feil og suksess er ofte koblet.',
    },
    {
      id: 'ent101-8-3',
      icon: '📉',
      title: 'Norsk kultur',
      question: 'Hvordan er norsk kultur til feiling?',
      choices: [
        { id: 'a', label: 'Helt akseptert', isCorrect: false, feedback: 'Tradisjonelt mer stigma.' },
{ id: 'b', label: 'Tradisjonelt strengere enn USA, men endrer seg', isCorrect: true, feedback: 'Riktig! Strukturell endring i kultur.' },
{ id: 'c', label: 'Verre enn andre', isCorrect: false, feedback: 'I bevegelse.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Yngre generasjoner er mer åpne om feil. Janteloven utfordres av startup-kultur.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🎯',
            title: 'Erna Solberg som intraprenør',
            quote: 'Endring innenfra.',
            content: 'Da Erna Solberg ble Høyre-leder, drev hun en form for intraprenørskap: hentet nye velgergrupper, modernisert kommunikasjon, fornyet politikken. Hun var ikke gründer i tradisjonell forstand, men endret partiet innenfra. Det er essensen i intraprenørskap — endring fra eksisterende posisjon.',
            subpoints: [
                  { label: 'ENDRING INNENFRA', text: 'Intraprenørskap er ikke bare i bedrifter.' },
          { label: 'BREDT FENOMEN', text: 'Politikk, frivillig sektor, offentlig sektor — alle har intraprenører.' },
            ],
            practical: 'Hvem andre har du sett endre en organisasjon innenfra?',
            exercises: [
            {
      id: 'ent101-9-1',
      icon: '🎯',
      title: 'Bredt',
      question: 'Inkluderer intraprenørskap politikk?',
      choices: [
        { id: 'a', label: 'Bare bedrifter', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Ja — endring innenfra i alle organisasjoner', isCorrect: true, feedback: 'Riktig! Bredt fenomen.' },
{ id: 'c', label: 'Bare offentlig', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Politiske ledere som endrer parti innenfra er klassiske intraprenører. Erna i Høyre, Jonas Gahr Støre i AP.',
    },
    {
      id: 'ent101-9-2',
      icon: '🎯',
      title: 'Hva kreves',
      question: 'Hva kreves for å endre innenfra?',
      choices: [
        { id: 'a', label: 'Bare formell makt', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Visjon + tålmodighet + nettverk + utholdenhet', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal.' },
{ id: 'c', label: 'Bare flaks', isCorrect: false, feedback: 'Strukturerte ferdigheter.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Endring innenfra er ofte vanskeligere enn å starte fra null. Krever andre ferdigheter.',
    },
    {
      id: 'ent101-9-3',
      icon: '🎯',
      title: 'Lærdom',
      question: 'Hva er lærdommen?',
      choices: [
        { id: 'a', label: 'Bare gründere skaper endring', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Du kan være entreprenør i jobben din — uten å starte selv', isCorrect: true, feedback: 'Riktig! Demokratiserer entreprenørskap.' },
{ id: 'c', label: 'Bare ledere kan endre', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Du trenger ikke organisasjonsnummer for å være entreprenør. Tenkemåten kan brukes overalt.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Entreprenørskap som arbeidsmåte',
            quote: 'Holdning, ikke bare bedrift.',
            content: 'Entreprenørskap er en arbeidsmåte og en holdning til problemløsning. Det handler mer om å se muligheter og handle enn om å starte bedrift. Du kan være entreprenør i et stort selskap, en kommune eller en frivillig organisasjon. Holdningen kan trenes opp gjennom bevisst praksis.',
            subpoints: [
                  { label: 'HOLDNING', text: 'Mer enn organisasjonsform — det er en måte å tenke.' },
          { label: 'OVERFØRBAR', text: 'Brukes overalt: jobb, frivillig, samfunn.' },
            ],
            practical: 'Hva er den viktigste lærdommen om entreprenørskap du tar med deg?',
            exercises: [
            {
      id: 'ent101-10-1',
      icon: '🚀',
      title: 'Kjerne',
      question: 'Hva er kjernen i entreprenørskap?',
      choices: [
        { id: 'a', label: 'Bare bedrift', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Holdning og arbeidsmåte — se muligheter, handle, lære', isCorrect: true, feedback: 'Riktig! Bredt og praktisk.' },
{ id: 'c', label: 'Bare risikoinvest', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Entreprenørskap som fag har utvidet seg fra \'starte bedrift\' til \'måte å tenke på\'. Skifte i siste 20 år.',
    },
    {
      id: 'ent101-10-2',
      icon: '🚀',
      title: 'Hvor',
      question: 'Hvor kan entreprenør-tenkning brukes?',
      choices: [
        { id: 'a', label: 'Bare i bedrifter', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Overalt — jobb, frivillig, kommune, skole, hjem', isCorrect: true, feedback: 'Riktig! Bredt anvendelig.' },
{ id: 'c', label: 'Bare i tek', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
      ],
      espenTip: 'Skoler underviser nå entreprenørskap som ferdighet. UE (Ungt Entreprenørskap) i Norge.',
    },
    {
      id: 'ent101-10-3',
      icon: '🚀',
      title: 'Trening',
      question: 'Kan holdningen trenes?',
      choices: [
        { id: 'a', label: 'Nei', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Ja — gjennom bevisst praksis: ta initiativ, prøve, reflektere', isCorrect: true, feedback: 'Riktig! Vekst-tankegang.' },
{ id: 'c', label: 'Bare for unge', isCorrect: false, feedback: 'Hele livet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Entreprenørskap kan læres som hvilket som helst fag. Krever bevisst innsats over tid.',
    },
            ],
          },
        ]

        export default function InnovatorenOgEntreprenorenModule() {
          return (
            <DrawerModule
              moduleCode="ENT1-01"
              moduleTitle="Innovatøren og entreprenøren"
              moduleIcon="💡"
              storageKey="learning-ent1-innovatoren-og-entreprenoren"
              completeRoute="/learning/ent1/innovatoren-og-entreprenoren/complete"
              phases={phases}
              intro="Entreprenørskap er en arbeidsmåte og en holdning til problemløsning — ikke bare \'å starte bedrift\'. Det handler om å identifisere muligheter og mobilisere ressurser for å skape verdi."
              vissteduAt="Norske gründere som Else Marie Hagen (Kahoot), Brian Iversen (Vipps) og Yvon Chouinard-typer har bygget bedrifter verdt milliarder. Norske rammevilkår er gode — Innovasjon Norge støtter aktivt."
              espenSier="Du kan være entreprenør i et stort selskap, en kommune eller en frivillig organisasjon. Det er holdningen som teller, ikke om du har bedrift på Brønnøysund."
      presentationLink={{ route: '/learning/presentations/ent1/innovatoren-og-entreprenoren', description: 'Innovatøren og entreprenøren — 10 slides' }}
            />
          )
        }
