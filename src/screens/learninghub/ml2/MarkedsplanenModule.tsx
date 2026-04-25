        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📋',
            title: 'Hva er en markedsplan?',
            quote: 'Styringsdokument for én periode.',
            content: 'Markedsplanen samler analyse, mål og tiltak for én periode (typisk ett år). Brukt riktig: kompass og målbevis for hele organisasjonen. Brukt feil: et dokument i en skuff ingen leser. Forskjellen ligger i implementering.',
            subpoints: [
                  { label: 'STYRING', text: 'Brukes som referanse gjennom året.' },
          { label: 'DOKUMENTERT', text: 'Skriftlig plan beats muntlige avtaler.' },
            ],
            practical: 'Har bedriften du jobber for / kjenner en markedsplan? Brukes den faktisk?',
            exercises: [
            {
      id: 'ml217-1-1',
      icon: '📋',
      title: 'Hva',
      question: 'Hva er hovedhensikten?',
      choices: [
        { id: 'a', label: 'Imponere ledelsen', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Styringsdokument som samler analyse, mål og tiltak for én periode', isCorrect: true, feedback: 'Riktig! Praktisk verktøy.' },
{ id: 'c', label: 'Erstatte regnskapet', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Markedsplanen er marketing-funksjonens \'forretningsplan\' — strategisk dokument.',
    },
    {
      id: 'ml217-1-2',
      icon: '📋',
      title: 'Frekvens',
      question: 'Hvor ofte lages en?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Årlig — med kvartalsvis review', isCorrect: true, feedback: 'Riktig! Standard frekvens.' },
{ id: 'c', label: 'Daglig', isCorrect: false, feedback: 'For ofte.' },
{ id: 'd', label: 'Bare ved kriser', isCorrect: false, feedback: 'For reaktivt.' },
      ],
      espenTip: 'Årlig hovedplan + månedlig oppfølging + kvartalsvis review = standard prosess.',
    },
    {
      id: 'ml217-1-3',
      icon: '📋',
      title: 'Verdi',
      question: 'Hva gir en god plan?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verdi.' },
{ id: 'b', label: 'Felles retning + koordinering + målbar fremdrift + læring', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal verdi.' },
{ id: 'c', label: 'Bare for ledelsen', isCorrect: false, feedback: 'For hele organisasjonen.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verktøy.' },
      ],
      espenTip: 'Bedrifter med plan har dokumentert bedre resultater enn de uten. Disiplin lønner seg.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🔍',
            title: 'Situasjonsanalyse (SWOT)',
            quote: 'Hvor er vi nå?',
            content: 'Situasjonsanalyse: indre arbeidsbetingelser (styrker/svakheter) og ytre (muligheter/trusler). Grunnlaget for alle videre valg. Uten ærlig analyse blir resten skinnplanlegging. SWOT er klassikeren — TOWS-matrisen tar det videre ved å koble faktorene.',
            subpoints: [
                  { label: 'INDRE + YTRE', text: 'S+W internt, O+T eksternt.' },
          { label: 'ÆRLIG', text: 'Skinn-SWOT er verdiløs. Tør å se svakhetene.' },
            ],
            practical: 'Lag en quick SWOT for bedriften du kjenner. Hva er ærlig vurderingen?',
            exercises: [
            {
      id: 'ml217-2-1',
      icon: '🔍',
      title: 'Steg',
      question: 'Hva er situasjonsanalysens rolle?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Strategisk grunnlag.' },
{ id: 'b', label: 'Grunnlag for alle videre valg — uten analyse blir mål gjetning', isCorrect: true, feedback: 'Riktig! Steg 0 i strategi.' },
{ id: 'c', label: 'Bare for konsulenter', isCorrect: false, feedback: 'For ledelsen først.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Hopp over situasjonsanalysen, og du planlegger basert på ønsker, ikke realitet.',
    },
    {
      id: 'ml217-2-2',
      icon: '🔍',
      title: 'SWOT',
      question: 'Hva betyr SWOT?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert akronym.' },
{ id: 'b', label: 'Strengths, Weaknesses, Opportunities, Threats', isCorrect: true, feedback: 'Riktig! Klassisk modell.' },
{ id: 'c', label: 'Salgs-, Vekst-, Optimerings-, Tekniske mål', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Strategi, Vekst, Optimal, Tjeneste', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'S+W = internt (du kontrollerer). O+T = eksternt (markedet kontrollerer).',
    },
    {
      id: 'ml217-2-3',
      icon: '🔍',
      title: 'Ærlighet',
      question: 'Hva skiller god SWOT fra dårlig?',
      choices: [
        { id: 'a', label: 'Lengde', isCorrect: false, feedback: 'Ikke avgjørende.' },
{ id: 'b', label: 'Ærlig vurdering — særlig av svakheter', isCorrect: true, feedback: 'Riktig! Skinn-SWOT med bare positive ord er verdiløs.' },
{ id: 'c', label: 'Antall punkter', isCorrect: false, feedback: 'Kvalitet > kvantitet.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Best praksis: la kritisk venn / konsulent gjøre SWOT. Egen blindsone gjør deg blind for svakhetene.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🎯',
            title: 'Målsetting (SMART)',
            quote: 'Hvor skal vi?',
            content: 'Mål bør være SMART: Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt. \'Øke markedsandelen i Trondheim fra 12 % til 18 % innen 31.12\' er SMART. \'Vokse litt\' er det ikke. Alle 5 kriterier må være oppfylt for at målet skal være styrbart.',
            subpoints: [
                  { label: 'ALLE 5 KRITERIER', text: 'Mangler ett, taper målet styringsverdi.' },
          { label: 'KONKRET', text: 'Konkrete tall slår vage formuleringer.' },
            ],
            practical: 'Skriv et SMART-mål for skoleåret. Hva er spesifikt, målbart, ambisiøst, realistisk, tidsbestemt?',
            exercises: [
            {
      id: 'ml217-3-1',
      icon: '🎯',
      title: 'Hva',
      question: 'Hva betyr SMART?',
      choices: [
        { id: 'a', label: 'Smarte ideer', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Spesifikt, Målbart, Ambisiøst, Realistisk, Tidsbestemt', isCorrect: true, feedback: 'Riktig! 5 kriterier alle må oppfylles.' },
{ id: 'c', label: 'Strategi, Marked, Aktivitet, Resultat, Tiltak', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Bare målbart', isCorrect: false, feedback: 'Bredere.' },
      ],
      espenTip: 'SMART-konseptet er fra 1981. Fortsatt grunnleggende i målstyring.',
    },
    {
      id: 'ml217-3-2',
      icon: '🎯',
      title: 'Eksempel',
      question: 'Hvilket er SMART?',
      choices: [
        { id: 'a', label: 'Vi skal vokse', isCorrect: false, feedback: 'For vagt — målbart? Tidsbestemt?' },
{ id: 'b', label: 'Øke omsetning i Norge med 15 % innen 31.12 sammenlignet med fjoråret', isCorrect: true, feedback: 'Riktig! Alle 5 kriterier oppfylt.' },
{ id: 'c', label: 'Selge mer', isCorrect: false, feedback: 'For vagt.' },
{ id: 'd', label: 'Få mest mulig kunder', isCorrect: false, feedback: 'For vagt.' },
      ],
      espenTip: 'Test: kan to mennesker tolke målet på samme måte? Hvis nei, ikke spesifikt nok.',
    },
    {
      id: 'ml217-3-3',
      icon: '🎯',
      title: 'Tid',
      question: 'Hvorfor må mål være tidsbestemt?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk funksjon.' },
{ id: 'b', label: 'Uten frist mister målet drivkraft og målbarhet — utsettes alltid', isCorrect: true, feedback: 'Riktig! \'Innen\' tvinger frem prioritering.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Bruk konkrete datoer: \'31.12.2025\', ikke \'snart\'. Da er det målbart.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '🎚️',
            title: 'Strategivalg (STP)',
            quote: 'Hvem skal vi satse på?',
            content: 'STP: Segmentering (dele markedet), Targeting/Målgruppevalg (velge segmenter), Posisjonering (skille seg ut). Strategien er broen mellom mål og tiltak. Klar STP gjør alle taktiske valg lettere — uklar STP gir hodepine i hver beslutning.',
            subpoints: [
                  { label: 'S → T → P', text: 'Strukturert tre-stegs-prosess.' },
          { label: 'STRATEGISK BRO', text: 'Mellom mål og taktikk.' },
            ],
            practical: 'Hvilke segmenter satser bedrifter du kjenner på? Hvordan posisjonerer de seg?',
            exercises: [
            {
      id: 'ml217-4-1',
      icon: '🎚️',
      title: 'STP',
      question: 'Hva er STP?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Segmentering, Targeting, Posisjonering', isCorrect: true, feedback: 'Riktig! Strategisk modell.' },
{ id: 'c', label: 'Salg, Tilbud, Pris', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'STP er kjernen i strategisk markedsføring. Uten STP er strategi gjetning.',
    },
    {
      id: 'ml217-4-2',
      icon: '🎚️',
      title: 'Posisjonering',
      question: 'Hva er kjernen i posisjonering?',
      choices: [
        { id: 'a', label: 'Bare pris', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Eie ett ord i kundens bevissthet — Volvo = sikkerhet, Apple = innovasjon', isCorrect: true, feedback: 'Riktig! Klassisk konsept.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Test: hvilket ord forbinder kundene med ditt merke? Hvis du ikke vet, har du ikke posisjonert.',
    },
    {
      id: 'ml217-4-3',
      icon: '🎚️',
      title: 'Velge bort',
      question: 'Hvorfor må STP velge bort?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Du kan ikke vinne alle — fokus gir resultater', isCorrect: true, feedback: 'Riktig! Velge bort = velge inn.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Stormberg valgte \'norske familier som vil ha rimelige turklær med god kvalitet\'. Sa nei til luksus-segmentet.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📦',
            title: 'Handlingsplan (markedsmiksen)',
            quote: 'Hva skal vi gjøre konkret?',
            content: 'Handlingsplanen detaljerer tiltak innen produkt, pris, plass, kommunikasjon (og folk i tjenestebedrifter). Hvert tiltak må knyttes til ansvarlig person og frist. Uten konkrete handlinger er strategi bare ord. Tabell-format med kolonner: tiltak, ansvarlig, frist, budsjett, mål.',
            subpoints: [
                  { label: 'KONKRET', text: 'Hver handling med ansvarlig + frist + budsjett.' },
          { label: 'TABELL-FORMAT', text: 'Strukturert oversikt slår tekst.' },
            ],
            practical: 'Lag en handlingsplan-tabell for et lite prosjekt: 5 tiltak, ansvar, frist, budsjett.',
            exercises: [
            {
      id: 'ml217-5-1',
      icon: '📦',
      title: 'Hva',
      question: 'Hva er handlingsplanens rolle?',
      choices: [
        { id: 'a', label: 'Bare oversikt', isCorrect: false, feedback: 'Konkret styring.' },
{ id: 'b', label: 'Detaljerte tiltak med ansvar, frist, budsjett — bro fra strategi til handling', isCorrect: true, feedback: 'Riktig! Operasjonalisering av strategi.' },
{ id: 'c', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Uten handlingsplan blir strategi bare slagord. Konkrete tiltak skaper resultater.',
    },
    {
      id: 'ml217-5-2',
      icon: '📦',
      title: 'Format',
      question: 'Hva er beste format?',
      choices: [
        { id: 'a', label: 'Lang tekst', isCorrect: false, feedback: 'Vanskelig å bruke.' },
{ id: 'b', label: 'Tabell med kolonner: tiltak, ansvarlig, frist, budsjett, KPI', isCorrect: true, feedback: 'Riktig! Strukturert og handlingsrettet.' },
{ id: 'c', label: 'Bare punktliste', isCorrect: false, feedback: 'Mangler struktur.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Kanban-tavle eller Excel/Google Sheet er praktisk. Excel er overlegen for små bedrifter.',
    },
    {
      id: 'ml217-5-3',
      icon: '📦',
      title: 'Ansvar',
      question: 'Hvorfor må hvert tiltak ha ansvarlig?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Felles ansvar = ingen ansvar — én person må eie hver oppgave', isCorrect: true, feedback: 'Riktig! Klassisk RACI-prinsipp.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'RACI-matrise: Responsible, Accountable, Consulted, Informed. Klargjør hvem som gjør hva.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '💰',
            title: 'Budsjett',
            quote: 'Hva koster det og hva forventer vi å tjene?',
            content: 'Budsjett: kostnader per tiltak, forventet inntekts-effekt, ROI-beregning. Ledelsen vil se tall — ikke bare ord. Uten budsjett kan ingen vurdere om planen er realistisk eller verdifull. Tre vanlige metoder: prosent av omsetning, konkurranse, mål-og-oppgave.',
            subpoints: [
                  { label: 'TALL > ORD', text: 'Ledelsen krever budsjett, ikke beskrivelser.' },
          { label: 'MÅL-OG-OPPGAVE', text: 'Beste metode — definer mål, beregn kostnad.' },
            ],
            practical: 'Hvordan ville du forsvart en kampanje på 500 000 kr internt?',
            exercises: [
            {
      id: 'ml217-6-1',
      icon: '💰',
      title: 'Innhold',
      question: 'Hva må budsjettet inneholde?',
      choices: [
        { id: 'a', label: 'Bare kostnader', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Kostnader per tiltak, forventet inntekt, ROI-beregning', isCorrect: true, feedback: 'Riktig! Helhetlig økonomisk vurdering.' },
{ id: 'c', label: 'Bare omsetning', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Test: kan du svare \'hva koster det?\' og \'hva får vi tilbake?\' med tall? Hvis nei, ikke godt nok budsjett.',
    },
    {
      id: 'ml217-6-2',
      icon: '💰',
      title: 'Beste metode',
      question: 'Hvilken budsjettmetode er mest strategisk?',
      choices: [
        { id: 'a', label: 'Prosent av omsetning', isCorrect: false, feedback: 'Enkelt, men reaktivt.' },
{ id: 'b', label: 'Mål-og-oppgavemetoden — definer mål, beregn ressursbehov', isCorrect: true, feedback: 'Riktig! Krever mer arbeid, men gir riktig allokering.' },
{ id: 'c', label: 'Følg konkurrentene', isCorrect: false, feedback: 'Reaktivt.' },
{ id: 'd', label: 'Bare gjenta i fjor', isCorrect: false, feedback: 'Ingen strategi.' },
      ],
      espenTip: 'Mål-og-oppgave tvinger frem realisme — avslører ofte at mål er urealistiske med eksisterende budsjett.',
    },
    {
      id: 'ml217-6-3',
      icon: '💰',
      title: 'Underbudsjett',
      question: 'Hva er klassisk feil?',
      choices: [
        { id: 'a', label: 'For mye', isCorrect: false, feedback: 'Sjelden.' },
{ id: 'b', label: 'Underbudsjettere kommunikasjon ved lansering', isCorrect: true, feedback: 'Riktig! Lansering uten kommunikasjons-budsjett dør.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert problem.' },
{ id: 'd', label: 'Lovstridig', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Tommelfingerregel: lansering trenger 20-50 % av forventet første-års-omsetning i kommunikasjon.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📊',
            title: 'Oppfølging og kontroll',
            quote: 'Hvordan måle om vi lykkes?',
            content: 'KPI-er definert per mål. Rapporteringsfrekvens (månedlig/kvartalsvis). Hvem rapporterer hva til hvem. Avviksanalyse: hvorfor ble det annerledes enn planlagt? Uten oppfølging blir planen et dokument i skuffen. Disiplinerte bedrifter har faste plan-møter månedlig.',
            subpoints: [
                  { label: 'KPI PER MÅL', text: 'Hvert mål må kunne måles.' },
          { label: 'AVVIK = LÆRING', text: 'Når ble det annerledes — hvorfor?' },
            ],
            practical: 'Hvilke KPI-er ville du brukt for å måle en kampanje?',
            exercises: [
            {
      id: 'ml217-7-1',
      icon: '📊',
      title: 'Hva',
      question: 'Hva er KPI?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert mål.' },
{ id: 'b', label: 'Key Performance Indicator — målbare suksess-indikatorer', isCorrect: true, feedback: 'Riktig! Standard ledelsesterm.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Hver mål må ha tilhørende KPI. \'Øke salg\' er ikke nok — \'øke omsetning med 15 %\' er KPI.',
    },
    {
      id: 'ml217-7-2',
      icon: '📊',
      title: 'Frekvens',
      question: 'Hvor ofte rapportere?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Månedlig minimum, kvartalsvis review', isCorrect: true, feedback: 'Riktig! Bygger disiplin uten å bli for tungt.' },
{ id: 'c', label: 'Daglig', isCorrect: false, feedback: 'For ofte.' },
{ id: 'd', label: 'Årlig', isCorrect: false, feedback: 'For sjelden.' },
      ],
      espenTip: 'Månedlig review tvinger frem disiplin. Kvartalsvis tillater større justeringer.',
    },
    {
      id: 'ml217-7-3',
      icon: '📊',
      title: 'Avvik',
      question: 'Hvorfor analysere avvik?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Læring — hvorfor ble det annerledes? Justering for fremtiden', isCorrect: true, feedback: 'Riktig! Avvik = læringspoeng.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for å straffe', isCorrect: false, feedback: 'Helt feil tilnærming.' },
      ],
      espenTip: 'Beste praksis: \'no-blame\'-kultur ved avviksanalyse. Fokus på læring, ikke skyld.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🚀',
            title: 'Implementering',
            quote: 'Få planen ut i livet.',
            content: 'Implementering: hvordan engasjere organisasjonen? Internkommunikasjon, opplæring, ansvarsfordeling. Mange planer dør fordi de aldri kommer ut av møterommet og inn i hverdagen. Krever bevisst arbeid — strategi-planlegging er ofte 30 % av jobben, implementering er 70 %.',
            subpoints: [
                  { label: '70 % JOBBEN', text: 'Implementering er hovedjobben, ikke planlegging.' },
          { label: 'INTERN KOMM', text: 'Folk må forstå og tro på planen.' },
            ],
            practical: 'Hva ville du gjort for å sikre at en plan faktisk gjennomføres?',
            exercises: [
            {
      id: 'ml217-8-1',
      icon: '🚀',
      title: 'Andel',
      question: 'Hvor stor del av jobben er implementering?',
      choices: [
        { id: 'a', label: '10 %', isCorrect: false, feedback: 'Underestimert.' },
{ id: 'b', label: '70 % — planlegging er bare 30 %', isCorrect: true, feedback: 'Riktig! Klassisk regel.' },
{ id: 'c', label: 'Bare 1 %', isCorrect: false, feedback: 'For lavt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Mange bruker 80 % av tiden på planlegging og 20 % på implementering. Bør være motsatt.',
    },
    {
      id: 'ml217-8-2',
      icon: '🚀',
      title: 'Hovedfeil',
      question: 'Hva mislykkes oftest?',
      choices: [
        { id: 'a', label: 'Selve planen', isCorrect: false, feedback: 'Plan er typisk OK.' },
{ id: 'b', label: 'Planen kommer aldri ut av møterommet og inn i hverdagen', isCorrect: true, feedback: 'Riktig! Klassisk feil.' },
{ id: 'c', label: 'For mange møter', isCorrect: false, feedback: 'Symptom.' },
{ id: 'd', label: 'For dyrt', isCorrect: false, feedback: 'Sjelden hovedårsak.' },
      ],
      espenTip: 'Test: spør tilfeldig ansatt om markedsplanen. Hvis hun ikke kjenner, har du implementeringsproblem.',
    },
    {
      id: 'ml217-8-3',
      icon: '🚀',
      title: 'Tiltak',
      question: 'Hvordan sikre implementering?',
      choices: [
        { id: 'a', label: 'Bare god plan', isCorrect: false, feedback: 'Plan uten utførelse er ingenting.' },
{ id: 'b', label: 'Internkommunikasjon + opplæring + tydelig ansvar + månedlig oppfølging', isCorrect: true, feedback: 'Riktig! Helhetlig systemarbeid.' },
{ id: 'c', label: 'Bare penger', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Implementering er disiplin. Følg opp månedlig, juster basert på data, kommuniser konstant.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🔄',
            title: 'Læringssløyfen',
            quote: 'Plan → utfør → mål → lær → ny plan.',
            content: 'Markedsplanen er ikke et engangsdokument — den er del av en kontinuerlig læringssyklus. PDCA: Plan-Do-Check-Act. Hver runde gir innsikt for neste. Mange bedrifter glemmer dette og gjør samme feil år etter år. Disiplinert review er konkurransefortrinn.',
            subpoints: [
                  { label: 'PDCA', text: 'Plan-Do-Check-Act — læringssyklus.' },
          { label: 'KUMULATIV', text: 'Læring akkumuleres over år.' },
            ],
            practical: 'Hva har du lært av siste prosjekt? Hvordan brukes læringen videre?',
            exercises: [
            {
      id: 'ml217-9-1',
      icon: '🔄',
      title: 'PDCA',
      question: 'Hva er PDCA?',
      choices: [
        { id: 'a', label: 'Plan, Direkte, Cancel, Avslutt', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Plan-Do-Check-Act — kontinuerlig forbedringssyklus', isCorrect: true, feedback: 'Riktig! Klassisk modell fra kvalitetsledelse.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare for produksjon', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'PDCA er fra 1950-tallet, fortsatt relevant. Edwards Deming populariserte det i Japan.',
    },
    {
      id: 'ml217-9-2',
      icon: '🔄',
      title: 'Hvorfor',
      question: 'Hvorfor er læringssyklus viktig?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Akkumulert læring over år gir konkurransefortrinn', isCorrect: true, feedback: 'Riktig! Bedrifter som lærer slår de som gjentar.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
{ id: 'd', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Bedrifter som dokumenterer læring konsistent har 3-5x bedre marketing-effekt over år.',
    },
    {
      id: 'ml217-9-3',
      icon: '🔄',
      title: 'Vanlig feil',
      question: 'Hva er klassisk feil?',
      choices: [
        { id: 'a', label: 'For mye refleksjon', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'b', label: 'Hopper rett til ny plan uten å lære av forrige', isCorrect: true, feedback: 'Riktig! Mister verdifull innsikt.' },
{ id: 'c', label: 'For mye dokumentasjon', isCorrect: false, feedback: 'Lite problem.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert problem.' },
      ],
      espenTip: 'Lag retrospektiv etter hver kampanje. Hva virket? Hva ikke? Hva gjør vi annerledes neste gang?',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📈',
            title: 'Markedsplanen som styringsverktøy',
            quote: 'Det viktigste verktøyet for marketing-leder.',
            content: 'Markedsplanen er det viktigste verktøyet for en markedsleder. Binder strategi til handling, gir alle samme retning, gjør markedsføring til forretningsdisiplin — ikke kreativ aktivitet. Ledere som mestrer planlegging vinner langsiktig. De som improviserer brenner seg ut.',
            subpoints: [
                  { label: 'DISIPLIN', text: 'Plan tvinger frem strukturert tenkning.' },
          { label: 'KONKURRANSEFORTRINN', text: 'Bedrifter med plan slår de uten.' },
            ],
            practical: 'Hva er den viktigste lærdommen om markedsplanlegging du tar med deg?',
            exercises: [
            {
      id: 'ml217-10-1',
      icon: '📈',
      title: 'Verdi',
      question: 'Hva er markedsplanens hovedverdi?',
      choices: [
        { id: 'a', label: 'Pynt', isCorrect: false, feedback: 'Praktisk verdi.' },
{ id: 'b', label: 'Binder strategi til handling — gjør marketing til forretningsdisiplin', isCorrect: true, feedback: 'Riktig! Strukturell verdi.' },
{ id: 'c', label: 'Bare for store', isCorrect: false, feedback: 'Gjelder alle.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Tine sin årlige markedsplan inkluderer historisk analyse, mål, kampanjer, lanseringer, budsjett. Følges opp månedlig.',
    },
    {
      id: 'ml217-10-2',
      icon: '📈',
      title: 'Verdi',
      question: 'Hva sa forskning om plan vs ikke plan?',
      choices: [
        { id: 'a', label: 'Ingen forskjell', isCorrect: false, feedback: 'Stor forskjell.' },
{ id: 'b', label: '30 % høyere måloppnåelse for bedrifter med dokumentert plan', isCorrect: true, feedback: 'Riktig! Dokumentasjon tvinger frem disiplin.' },
{ id: 'c', label: 'Plan gir lavere resultater', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt mønster.' },
      ],
      espenTip: 'Strukturert planlegging gir konsekvent bedre resultater enn improvisasjon. Standard funn i forskning.',
    },
    {
      id: 'ml217-10-3',
      icon: '📈',
      title: 'Lærdom',
      question: 'Hva er den viktigste lærdommen?',
      choices: [
        { id: 'a', label: 'Plan er overflødig', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'b', label: 'Markedsføring uten plan er kreativ aktivitet — markedsføring med plan er forretning', isCorrect: true, feedback: 'Riktig! Strukturell forskjell.' },
{ id: 'c', label: 'Bare for ledelsen', isCorrect: false, feedback: 'For hele organisasjonen.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Modne marketing-funksjoner har plan, KPI-er, månedlig review. Umodne er ad hoc og improviserer.',
    },
            ],
          },
        ]

        export default function MarkedsplanenModule() {
          return (
            <DrawerModule
              moduleCode="ML2-17"
              moduleTitle="Markedsplanen"
              moduleIcon="📋"
              storageKey="learning-ml2-markedsplanen"
              completeRoute="/learning/ml2/markedsplanen/complete"
              phases={phases}
              intro="Markedsplanen er det viktigste verktøyet for en markedsleder. Binder strategi til handling, gir alle samme retning, gjør markedsføring til forretningsdisiplin — ikke kreativ aktivitet alene."
              vissteduAt="Bedrifter med dokumentert markedsplan har 30 % høyere måloppnåelse enn de uten. Plan tvinger frem disiplin og koordinering."
              espenSier="En 1-side-plan som alle kan handle på er bedre enn 200 sider som ingen leser. Klarhet slår omfang."
      presentationLink={{ route: '/learning/presentations/ml2/markedsplanen', description: 'Markedsplanen — 10 slides' }}
            />
          )
        }
