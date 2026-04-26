        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📊',
            title: 'Hva er markedsanalyse?',
            quote: 'Strukturert forståelse av markedet.',
            content: 'Markedsanalyse besvarer: Hvor stort er markedet? Hvem er kundene? Hvem er konkurrentene? Hva trender? Verktøy: PESTEL (makro), Porter 5 (bransje), STP (segmentering), TAM/SAM/SOM (markedstørrelse), kundeintervjuer, datakilder (SSB, Statista, Eurostat). Kahoot startet med data: skole-markedet er $200B globalt — verd å satse på. Markedsanalyse skiller informerte fra håpefulle valg.',
            subpoints: [
                  { label: 'DATA', text: 'Beslutninger på data, ikke magefølelse.' },
          { label: 'KILDER', text: 'SSB, bransjeforeninger, kundeintervjuer.' },
            ],
            practical: 'Hva er markedsstørrelsen i din bransje? Globalt og i Norge?',
            exercises: [
            {
      id: 'ent213-1-1',
      icon: '📊',
      title: 'Hva',
      question: 'Hva er markedsanalyse?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Strategisk grunnlag.' },
{ id: 'b', label: 'Strukturert kartlegging av marked, kunder, konkurrenter, trender', isCorrect: true, feedback: 'Riktig! Helhetsperspektiv.' },
{ id: 'c', label: 'Bare salg', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Grunnlag for strategiske valg om hvilke segmenter, hvilken pris, hvilke kanaler.',
    },
    {
      id: 'ent213-1-2',
      icon: '📊',
      title: 'TAM',
      question: 'Hva er TAM?',
      choices: [
        { id: 'a', label: 'Bare salg', isCorrect: false, feedback: 'Markedsstørrelse.' },
{ id: 'b', label: 'Total Addressable Market — globalt potensial om alle kjøper', isCorrect: true, feedback: 'Riktig! Maksimalt marked.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Forretningsbegrep.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Definert begrep.' },
      ],
      espenTip: 'TAM > SAM (servable) > SOM (du kan realistisk fange). Investorer krever alle tre.',
    },
    {
      id: 'ent213-1-3',
      icon: '📊',
      title: 'Kilder',
      question: 'Hvor finner man markedsdata for Norge?',
      choices: [
        { id: 'a', label: 'Bare gjette', isCorrect: false, feedback: 'Det finnes data.' },
{ id: 'b', label: 'SSB, bransjeforeninger, Innovasjon Norge, Statista, kundeintervjuer', isCorrect: true, feedback: 'Riktig! Mange kilder.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte kilder.' },
      ],
      espenTip: 'Sekundære data (SSB) er gratis. Primære (intervjuer) gir innsikt konkurrenter ikke har.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🎯',
            title: 'STP: Segmentering',
            quote: 'Dele marked i homogene grupper.',
            content: 'Segmenteringsbaser: 1) Demografisk (alder, kjønn, inntekt), 2) Geografisk (land, by/bygd), 3) Psykografisk (verdier, livsstil), 4) Atferd (bruk, lojalitet, anledning). Tine segmenterer barneforeldre vs eldre. Stormberg på etisk-bevisste forbrukere. Segmentering må være: Målbar, Tilstrekkelig stor, Tilgjengelig, Differensierbar, Aksjonerbar.',
            subpoints: [
                  { label: 'BASER', text: 'Demografi + psykografi + atferd.' },
          { label: 'KRAV', text: 'MÅDA-modellen sikrer brukbar segmentering.' },
            ],
            practical: 'Hvilke segmenter er viktigst i din bransje?',
            exercises: [
            {
      id: 'ent213-2-1',
      icon: '🎯',
      title: 'Baser',
      question: 'Fire vanlige segmenteringsbaser?',
      choices: [
        { id: 'a', label: 'Bare alder', isCorrect: false, feedback: 'Fire baser.' },
{ id: 'b', label: 'Demografisk, geografisk, psykografisk, atferd', isCorrect: true, feedback: 'Riktig! Standard.' },
{ id: 'c', label: 'Bare 2', isCorrect: false, feedback: 'Fire baser.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mest avansert er ofte psykografi + atferd — fanger \'hvorfor\', ikke bare \'hvem\'.',
    },
    {
      id: 'ent213-2-2',
      icon: '🎯',
      title: 'Krav',
      question: 'Hva må til for godt segment?',
      choices: [
        { id: 'a', label: 'Bare stort', isCorrect: false, feedback: 'Flere krav.' },
{ id: 'b', label: 'Målbar, stor nok, tilgjengelig, differensierbar, aksjonerbar', isCorrect: true, feedback: 'Riktig! Standard krav.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Forretningskrav.' },
      ],
      espenTip: 'Lite segment = ikke lønnsomt. Utilgjengelig segment = kan ikke nås. Begge feiler.',
    },
    {
      id: 'ent213-2-3',
      icon: '🎯',
      title: 'Stormberg',
      question: 'Hva er Stormbergs segment?',
      choices: [
        { id: 'a', label: 'Bare alle', isCorrect: false, feedback: 'Mer fokusert.' },
{ id: 'b', label: 'Etisk-bevisste familier som verdsetter ansvarlig produksjon', isCorrect: true, feedback: 'Riktig! Psykografisk.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk segment.' },
      ],
      espenTip: 'Stormberg konkurrerer ikke på pris — konkurrerer på etikk-verdier. Klart segment.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🎪',
            title: 'STP: Targeting',
            quote: 'Velge segmenter å satse på.',
            content: 'Targeting-strategier: 1) Udifferensiert (én produkt for alle, sjelden), 2) Differensiert (ulike produkter for ulike segmenter — Tine har ulike melker), 3) Konsentrert/nisje (ett segment, dypt fokus — Stormberg etisk forbruker), 4) Mikromarkedsføring (lokalt eller individuelt — Spotify-spillelister). Valg avhenger av ressurser. Små bør ofte konsentrere.',
            subpoints: [
                  { label: 'FOKUS', text: 'Småbedrifter: nisje. Storbedrifter: differensiert.' },
          { label: 'RESSURSER', text: 'Du kan ikke betjene alle segmenter likt godt.' },
            ],
            practical: 'Hvilken targeting-strategi passer din bedrift?',
            exercises: [
            {
      id: 'ent213-3-1',
      icon: '🎪',
      title: 'Strategier',
      question: 'Fire targeting-strategier?',
      choices: [
        { id: 'a', label: 'Bare en', isCorrect: false, feedback: 'Fire.' },
{ id: 'b', label: 'Udifferensiert, differensiert, konsentrert, mikromarkedsføring', isCorrect: true, feedback: 'Riktig! Klassisk.' },
{ id: 'c', label: 'Bare 2', isCorrect: false, feedback: 'Fire alternativer.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Coca-Cola = differensiert (Coke, Diet, Zero, Coke Energy). Stormberg = konsentrert.',
    },
    {
      id: 'ent213-3-2',
      icon: '🎪',
      title: 'Liten',
      question: 'Hva passer småbedrifter?',
      choices: [
        { id: 'a', label: 'Alle segmenter', isCorrect: false, feedback: 'Ressurser ikke nok.' },
{ id: 'b', label: 'Konsentrert/nisje — bli best i ett smalt segment', isCorrect: true, feedback: 'Riktig! Fokus-strategi.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategi-valg.' },
      ],
      espenTip: 'Small fish in big pond drowns. Big fish in small pond winner.',
    },
    {
      id: 'ent213-3-3',
      icon: '🎪',
      title: 'Tine',
      question: 'Hvorfor differensiert hos Tine?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk.' },
{ id: 'b', label: 'Stort selskap, ulike kundebehov — barnemelk, skummet, laktosefri, premium', isCorrect: true, feedback: 'Riktig! Bredde-strategi.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markeds-segmentering.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Tine har ressurser til å betjene mange segmenter. Liten gründer kan ikke.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📍',
            title: 'STP: Posisjonering',
            quote: 'Plass i kundens hode.',
            content: 'Posisjonering = hvordan kunden oppfatter merket sammenlignet med konkurrenter. Posisjoneringsmuligheter: pris (Rema), kvalitet (Stormberg), opprinnelse (Tine norsk), bruksanledning (Vipps daglige), målgruppe (Patagonia friluft), problem løst (Vipps enkel betaling). Posisjoneringskart: to akser (f.eks pris/kvalitet) — finn hull. Volvo = sikkerhet. Apple = enkelhet. Hva er du?',
            subpoints: [
                  { label: 'HODET', text: 'Posisjonering skjer hos kunden, ikke i ditt brand-dokument.' },
          { label: 'HULL', text: 'Finn ledig posisjon konkurrenter ikke eier.' },
            ],
            practical: 'Hvilken posisjon eier din bedrift i kundens hode?',
            exercises: [
            {
      id: 'ent213-4-1',
      icon: '📍',
      title: 'Hva',
      question: 'Hva er posisjonering?',
      choices: [
        { id: 'a', label: 'Bare logo', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Hvordan kunden oppfatter merket relativt til konkurrenter', isCorrect: true, feedback: 'Riktig! Persepsjon.' },
{ id: 'c', label: 'Bare reklame', isCorrect: false, feedback: 'Resultatet, ikke metoden.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Al Ries: \'Positioning is not what you do to a product. It\'s what you do to the mind of the prospect.\'',
    },
    {
      id: 'ent213-4-2',
      icon: '📍',
      title: 'Volvo',
      question: 'Hva er Volvos posisjon?',
      choices: [
        { id: 'a', label: 'Sport', isCorrect: false, feedback: 'Ikke deres posisjon.' },
{ id: 'b', label: 'Sikkerhet — eid posisjon i tiår', isCorrect: true, feedback: 'Riktig! Klassisk eksempel.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsposisjon.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst valg.' },
      ],
      espenTip: 'Volvo investerte i sikkerhet (3-punkts belte gratis), kommuniserte konsistent. Eier mental posisjon.',
    },
    {
      id: 'ent213-4-3',
      icon: '📍',
      title: 'Hull',
      question: 'Hvordan finne posisjon?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'b', label: 'Posisjoneringskart — to relevante akser, finn hull i markedet', isCorrect: true, feedback: 'Riktig! Verktøy.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturert verktøy.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk verktøy.' },
      ],
      espenTip: 'F.eks pris (lav-høy) vs design (basic-premium). Hvor er ledige hull?',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '🥇',
            title: 'Differensiering',
            quote: 'Hva gjør deg unik og verdifull?',
            content: 'Differensieringsdimensjoner: produkt (kvalitet, design, funksjoner), service (rask, personlig), kanal (eksklusiv distribusjon), folk (kompetanse, kultur), image (status, etikk). Ikea differensierer på \'flatpakke + lav pris + design\'. Apple på \'design + økosystem\'. Differensiering må være: 1) Verdifull for kunden, 2) Vanskelig å kopiere, 3) Kommunikerbar. Bare en av tre = ikke nok.',
            subpoints: [
                  { label: 'DIMENSJONER', text: 'Du kan differensiere på flere ting.' },
          { label: 'KOPI', text: 'Hvis konkurrenter kopierer raskt, mister du.' },
            ],
            practical: 'Hva er din primære differensieringsdimensjon?',
            exercises: [
            {
      id: 'ent213-5-1',
      icon: '🥇',
      title: 'Dim',
      question: 'Differensieringsdimensjoner?',
      choices: [
        { id: 'a', label: 'Bare pris', isCorrect: false, feedback: 'Mange dimensjoner.' },
{ id: 'b', label: 'Produkt, service, kanal, folk, image', isCorrect: true, feedback: 'Riktig! Bredt spekter.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsføring.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Ikea: produkt + pris + image. Stormberg: image + folk. Apple: produkt + image.',
    },
    {
      id: 'ent213-5-2',
      icon: '🥇',
      title: 'Krav',
      question: 'Når virker differensiering?',
      choices: [
        { id: 'a', label: 'Alltid', isCorrect: false, feedback: 'Kun hvis kriterier oppfylles.' },
{ id: 'b', label: 'Når den er verdifull, vanskelig å kopiere og kommuniserbar', isCorrect: true, feedback: 'Riktig! Tre krav.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Konkrete krav.' },
      ],
      espenTip: 'Differensiering ingen bryr seg om = ingen verdi. Kopierbar = ingen vedvarende fordel.',
    },
    {
      id: 'ent213-5-3',
      icon: '🥇',
      title: 'Apple',
      question: 'Hvorfor er Apple svært differensiert?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Mer enn det.' },
{ id: 'b', label: 'Design + økosystem + brand — flere dimensjoner sammen', isCorrect: true, feedback: 'Riktig! Multidimensjonal.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Bevisst.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk valg.' },
      ],
      espenTip: 'Multi-dimensjonal differensiering er vanskeligst å kopiere. Konkurrenter må kopiere alt.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🔍',
            title: 'Konkurrentanalyse',
            quote: 'Forstå hvem du kjemper mot.',
            content: 'Konkurrentanalyse-rammeverk: identifiser direkte og indirekte konkurrenter, kartlegg deres styrker/svakheter, pris, posisjon, markedsandel, strategi. Verktøy: SWOT per konkurrent, sammenligningsmatrise, mystery shopping, deres egne årsrapporter, ansatte du intervjuer. Vipps må følge med Apple Pay (direkte) og kontanter (indirekte). DnB følger med fintech-utfordrere. Konkurrenter endrer seg — kontinuerlig overvåking.',
            subpoints: [
                  { label: 'DIREKTE/INDIREKTE', text: 'Glem ikke indirekte alternativer.' },
          { label: 'LEVENDE', text: 'Konkurrentlandskapet endres raskt.' },
            ],
            practical: 'Hvem er din bedrifts største konkurrenter?',
            exercises: [
            {
      id: 'ent213-6-1',
      icon: '🔍',
      title: 'Typer',
      question: 'Direkte vs indirekte konkurrent?',
      choices: [
        { id: 'a', label: 'Det samme', isCorrect: false, feedback: 'Forskjell.' },
{ id: 'b', label: 'Direkte = samme produkt; indirekte = annet alternativ', isCorrect: true, feedback: 'Riktig! Bredere syn.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsdefinisjon.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Vipps direkte: Apple Pay. Indirekte: kontanter, faktura. Begge er konkurrenter.',
    },
    {
      id: 'ent213-6-2',
      icon: '🔍',
      title: 'Datakilder',
      question: 'Hvor finner du konkurrent-data?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Mange kilder.' },
{ id: 'b', label: 'Årsrapporter, mystery shopping, intervjuer, sosiale medier, jobbutlysninger', isCorrect: true, feedback: 'Riktig! Bredt spekter.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturert.' },
{ id: 'd', label: 'Bare gjette', isCorrect: false, feedback: 'Datakilder finnes.' },
      ],
      espenTip: 'Jobbutlysninger forteller hva konkurrenter satser på. Frontside-investerings-signal.',
    },
    {
      id: 'ent213-6-3',
      icon: '🔍',
      title: 'Levende',
      question: 'Hvorfor må analysen være levende?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Konkurrenter endrer strategi, nye aktører, ny teknologi', isCorrect: true, feedback: 'Riktig! Dynamisk landskap.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelt.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Snapshot er foreldet på 6 måneder. Strukturer kontinuerlig overvåking.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '👤',
            title: 'Persona-arbeid',
            quote: 'Konkretiser kunden i en person.',
            content: 'En persona er en fiktiv person som representerer et segment. Inkluderer: demografi, jobb, mål, frustrasjoner, kjøps-prosess, kanaler. Stormberg sin persona er kanskje \'Kari, 38, lærer, 2 barn, opptatt av etikk og holdbarhet\'. Personas hjelper team å snakke om \'Kari\' i stedet for abstrakte segmenter. Bruk i produktutvikling, markedsføring, salg.',
            subpoints: [
                  { label: 'KONKRET', text: 'Persona = navn, alder, foto, sitater.' },
          { label: 'FELLES SPRÅK', text: 'Hele teamet snakker om samme kunde.' },
            ],
            practical: 'Lag en persona for din viktigste kunde — navn, alder, mål, problem.',
            exercises: [
            {
      id: 'ent213-7-1',
      icon: '👤',
      title: 'Hva',
      question: 'Hva er en persona?',
      choices: [
        { id: 'a', label: 'Bare statistikk', isCorrect: false, feedback: 'Konkret person.' },
{ id: 'b', label: 'Fiktiv representativ kunde — navn, kontekst, mål, frustrasjoner', isCorrect: true, feedback: 'Riktig! Empati-verktøy.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedsverktøy.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Personas humaniserer segmentering. \'Hva ville Kari gjort?\' er bedre enn segment-tall.',
    },
    {
      id: 'ent213-7-2',
      icon: '👤',
      title: 'Innhold',
      question: 'Hva er med i god persona?',
      choices: [
        { id: 'a', label: 'Bare alder', isCorrect: false, feedback: 'Mer.' },
{ id: 'b', label: 'Demografi, jobb, mål, frustrasjoner, kanaler, beslutningsprosess', isCorrect: true, feedback: 'Riktig! Helhetlig.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Innhold-krav.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Mål og frustrasjoner er viktigere enn demografi for produktutvikling.',
    },
    {
      id: 'ent213-7-3',
      icon: '👤',
      title: 'Bruk',
      question: 'Hvor bruker du persona?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Bredt.' },
{ id: 'b', label: 'Produktutvikling, markedsføring, salg, kundeservice', isCorrect: true, feedback: 'Riktig! Tverrfaglig.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Praktisk verktøy.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Brukes overalt.' },
      ],
      espenTip: 'Designer tegner for Kari. Markedsfører skriver til Kari. Selger snakker med Kari.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🧪',
            title: 'Markedstesting',
            quote: 'Validere før storskala lansering.',
            content: 'Test før du investerer alt: 1) MVP-test (minimal produkt med ekte kunder), 2) A/B-test (to versjoner, mål forskjell), 3) Geografisk test (lanser i én by først), 4) Concierge-test (gjøre tjenesten manuelt for første kunder), 5) Smoke test (annonse for produkt som ikke finnes — mål interesse). Airbnb begynte som concierge-test, eierne kjørte service selv. Spotify A/B-tester alt.',
            subpoints: [
                  { label: 'BILLIG', text: 'Test før du bygger ferdig.' },
          { label: 'ATFERD', text: 'Hva folk gjør > hva de sier.' },
            ],
            practical: 'Hvordan kan du teste neste produktidé billig?',
            exercises: [
            {
      id: 'ent213-8-1',
      icon: '🧪',
      title: 'Metoder',
      question: 'Markedstest-metoder?',
      choices: [
        { id: 'a', label: 'Bare lansering', isCorrect: false, feedback: 'Test billigere.' },
{ id: 'b', label: 'MVP, A/B-test, geo-test, concierge, smoke test', isCorrect: true, feedback: 'Riktig! Mange metoder.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturerte metoder.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Operasjonelle metoder.' },
      ],
      espenTip: 'Velg metode basert på hva du tester (etterspørsel, pris, kanal, brukervennlighet).',
    },
    {
      id: 'ent213-8-2',
      icon: '🧪',
      title: 'Smoke',
      question: 'Hva er smoke test?',
      choices: [
        { id: 'a', label: 'Brann-test', isCorrect: false, feedback: 'Forretningsbegrep.' },
{ id: 'b', label: 'Annonse for produkt som ikke finnes — mål klikk-rate', isCorrect: true, feedback: 'Riktig! Etterspørselstest.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedstest.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert metode.' },
      ],
      espenTip: 'Bygg landingsside med \'kjøp nå\'. Hvis folk klikker = etterspørsel. Refundér de som betaler.',
    },
    {
      id: 'ent213-8-3',
      icon: '🧪',
      title: 'Concierge',
      question: 'Hvorfor concierge-test?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Test value-proposisjonen før du bygger automatisert produkt', isCorrect: true, feedback: 'Riktig! Bygg riktig produkt.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk test.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Operasjonell test.' },
      ],
      espenTip: 'Airbnb leverte tjenesten manuelt før de bygde plattform. Tester verdien.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '⚠️',
            title: 'Misforståelser om posisjonering',
            quote: 'Vanlige feil i markedsføringsarbeid.',
            content: 'Vanlige feil: 1) Posisjonere på flere ting samtidig (Volvo på sikkerhet OG sport = forvirring). 2) Posisjonere på det produktet er, ikke det kunden trenger. 3) Endre posisjonering for ofte — krever konsistens i 5+ år. 4) Posisjonere mot konkurrenten i stedet for kunden. 5) \'Premium kvalitet til lav pris\' (alle sier det, betyr ingenting).',
            subpoints: [
                  { label: 'KONSISTENS', text: 'Posisjon = mange års samme melding.' },
          { label: 'VALG', text: 'Posisjonere = velge bort.' },
            ],
            practical: 'Hvilken misforståelse om posisjonering kjenner du igjen?',
            exercises: [
            {
      id: 'ent213-9-1',
      icon: '⚠️',
      title: 'Feil',
      question: 'Vanligste posisjonerings-feil?',
      choices: [
        { id: 'a', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk feil.' },
{ id: 'b', label: 'Prøve å posisjonere på flere dimensjoner samtidig — kunden blir forvirret', isCorrect: true, feedback: 'Riktig! Klart problem.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strukturelt.' },
      ],
      espenTip: 'Mind hates complexity. Velg én primær posisjon, kommuniser konsistent.',
    },
    {
      id: 'ent213-9-2',
      icon: '⚠️',
      title: 'Konsistens',
      question: 'Hvor lenge må du holde posisjon?',
      choices: [
        { id: 'a', label: '1 år', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: '5+ år — det tar tid å bygge mental posisjon', isCorrect: true, feedback: 'Riktig! Lang horisont.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Bare lov', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Volvo har posisjonert seg på sikkerhet i 60+ år. Apple på enkelhet i 30+ år.',
    },
    {
      id: 'ent213-9-3',
      icon: '⚠️',
      title: 'Floskel',
      question: 'Hvorfor virker ikke \'premium til lav pris\'?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Alle sier det, ingen tror det, det er en motsigelse', isCorrect: true, feedback: 'Riktig! Klassisk feil.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Markedskommunikasjon.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Strategisk.' },
      ],
      espenTip: 'Hvis du ikke kan velge bort noe, har du ingen posisjon. Velg pris ELLER kvalitet.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '⚖️',
            title: 'Lovverk i markedsanalyse',
            quote: 'Juridiske rammer for markedsforing og analyse.',
            content: 'Markedsanalyse må følge: GDPR (samtykke ved kundeintervjuer, anonymisering av data), markedsføringsloven (sannferdig fremstilling), god markedsføringsskikk (forbruker-vern), konkurranseloven (forbud mot kartell-prising), forbrukerkjøpsloven (krav til produktopplysninger), distansavtaleloven (e-handel). Mystery shopping er lovlig men har grenser — du kan ikke utgi deg som myndighetsperson.',
            subpoints: [
                  { label: 'GDPR', text: 'Kundeintervjuer = personopplysninger.' },
          { label: 'ETIKK', text: 'Mystery shopping har grenser.' },
            ],
            practical: 'Hvilke lovkrav gjelder for din markedsanalyse?',
            exercises: [
            {
      id: 'ent213-10-1',
      icon: '⚖️',
      title: 'GDPR',
      question: 'Hva krever GDPR ved kundeintervjuer?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Sterkt regulert.' },
{ id: 'b', label: 'Samtykke, formål, anonymisering, sletting på forespørsel', isCorrect: true, feedback: 'Riktig! Datasubjekt-rettigheter.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Konkrete krav.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Anonymisering er bedre enn pseudonymisering. Hvis du ikke trenger å vite hvem, slett.',
    },
    {
      id: 'ent213-10-2',
      icon: '⚖️',
      title: 'MfL',
      question: 'Hva sier markedsføringsloven?',
      choices: [
        { id: 'a', label: 'Bare reklame', isCorrect: false, feedback: 'Bredere.' },
{ id: 'b', label: 'Sannferdig fremstilling, forbud mot villedende reklame, balansert sammenligning', isCorrect: true, feedback: 'Riktig! Grunnregler.' },
{ id: 'c', label: 'Bare lov', isCorrect: false, feedback: 'Strukturelle krav.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Konkret lov.' },
      ],
      espenTip: 'Du kan sammenligne med konkurrent — men sammenligningen må være sannferdig og balansert.',
    },
    {
      id: 'ent213-10-3',
      icon: '⚖️',
      title: 'Mystery',
      question: 'Er mystery shopping lovlig?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'Lovlig med grenser.' },
{ id: 'b', label: 'Ja, men du kan ikke utgi deg som myndighet eller bryte avtaler', isCorrect: true, feedback: 'Riktig! Etiske grenser.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'd', label: 'Bare PR', isCorrect: false, feedback: 'Konkret regulering.' },
      ],
      espenTip: 'Vanlig markedsundersøkelse: lovlig. Bedrageri (utgir deg som inspektør): straffbart.',
    },
            ],
          },
        ]

        export default function MarkedsanalysePosisjoneringModule() {
          return (
            <DrawerModule
              moduleCode="ENT2-13"
              moduleTitle="Markedsanalyse og posisjonering"
              moduleIcon="🔍"
              storageKey="learning-ent2-markedsanalyse-posisjonering"
              completeRoute="/learning/ent2/markedsanalyse-posisjonering/complete"
              phases={phases}
              intro="Markedsanalyse og posisjonering bestemmer om du blir oppfattet som premium, billig, ekspert eller generisk. Dette former alt — pris, salg, marketing."
              vissteduAt="Tine, Stormberg, Vipps og Equinor har alle bevisste posisjoner. Du kan ikke være alt for alle. Posisjonering er valg."
              espenSier="Posisjonering skjer i kundens hode, ikke i ditt produktdokument. Hva tenker kunden FØRST når de hører merkenavnet?"
      presentationLink={{ route: '/learning/presentations/ent2/markedsanalyse-posisjonering', description: 'Markedsanalyse og posisjonering — 10 slides' }}
            />
          )
        }
