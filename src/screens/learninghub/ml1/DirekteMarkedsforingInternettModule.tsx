        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '📩',
            title: 'Direkte markedsføring (DM)',
            quote: 'Kommunikasjon sendt rett til en identifisert person.',
            content: 'Direkte markedsføring (DM) er kommunikasjon som er målrettet til navngitte mottakere via e-post, SMS, push-varsel eller fysisk post. Krever samtykke etter GDPR for personlige data — du kan ikke lovlig sende reklame-SMS uten klar opt-in. DM er presis (treffer rett person), målbar (åpning, klikk, konvertering) og personliggjort (navn, segmentering, atferd). Norske eksempler: Vipps-pushvarsler, DnBs månedlige nyhetsbrev, Komplett.no sine kampanjemailer.',
            subpoints: [
                  { label: 'OPT-IN-KRAV', text: 'GDPR krever klart samtykke før du sender DM. Forhåndsutfylte sjekkbokser er ulovlig.' },
          { label: 'MÅLBARHET', text: 'Hver e-post måles: åpning (open rate), klikk (click rate), konvertering.' },
          { label: 'PERSONALISERING', text: 'Bruk navn, kjøpshistorikk og atferd til å sende relevant innhold — ikke generiske masseutsendelser.' },
            ],
            practical: 'Du har 10 000 kunder. Skal du sende samme nyhetsbrev til alle, eller dele dem i segmenter? Hvilke segmenter ville du laget?',
            exercises: [
            {
      id: 'ml113-1-1',
      icon: '📩',
      title: 'DM krav',
      question: 'Hva er hovedforskjellen på DM og massereklame?',
      choices: [
        { id: 'a', label: 'DM er gratis, massereklame koster', isCorrect: false, feedback: 'Begge koster — DM koster ofte mer per kontakt, men gir høyere konvertering.' },
{ id: 'b', label: 'DM er målrettet til identifisert mottaker, krever samtykke; massereklame er anonym', isCorrect: true, feedback: 'Riktig! DM krever opt-in og er personlig. Massereklame er bredere og uten samtykke-krav (annonse er ikke DM).' },
{ id: 'c', label: 'DM er kun digitalt', isCorrect: false, feedback: 'Tradisjonell DM (postkasse-reklame) finnes også.' },
{ id: 'd', label: 'Massereklame er forbudt', isCorrect: false, feedback: 'Helt feil — det er en av de største reklame-formatene fortsatt.' },
      ],
      espenTip: 'Postkasse-reklame med \'NEI takk\'-merke er bare lovlig fordi det er adresseløst — selv da må NEI-merket respekteres.',
    },
    {
      id: 'ml113-1-2',
      icon: '📩',
      title: 'Open rate',
      question: 'En e-post sendt til 10 000 hadde 2 000 åpninger. Hva er open rate?',
      choices: [
        { id: 'a', label: '5 %', isCorrect: false, feedback: 'Feil regning — 2000/10000 = 20 %.' },
{ id: 'b', label: '10 %', isCorrect: false, feedback: 'Feil regning.' },
{ id: 'c', label: '20 %', isCorrect: true, feedback: 'Riktig! Open rate = åpninger / sendte. 20 % er over gjennomsnittet for kommersielle e-poster i Norge.' },
{ id: 'd', label: '200 %', isCorrect: false, feedback: 'Mer enn 100 % er ikke mulig.' },
      ],
      espenTip: 'Norske gjennomsnitt: 15–25 % open rate, 2–5 % click rate. Forskjellen ligger i emnefelt, avsenderkjennskap og listehygiene.',
    },
    {
      id: 'ml113-1-3',
      icon: '📩',
      title: 'GDPR-samtykke',
      question: 'Du vil sende et nyhetsbrev. Hva er korrekt samtykkemekanisme?',
      choices: [
        { id: 'a', label: 'Forhåndsutfylt sjekkboks som kunden kan fjerne', isCorrect: false, feedback: 'Ulovlig under GDPR — krever aktiv handling.' },
{ id: 'b', label: 'Tom sjekkboks som kunden aktivt må krysse av, med klar informasjon', isCorrect: true, feedback: 'Riktig! Aktiv opt-in er lovkravet. Kunden må selv velge — passivt aksept er ikke gyldig samtykke.' },
{ id: 'c', label: 'Bare antar at de vil ha det', isCorrect: false, feedback: 'Klart ulovlig.' },
{ id: 'd', label: 'Sender uansett — straffen er liten', isCorrect: false, feedback: 'Bot kan være opp til 4 % av global omsetning. Ikke noe å spøke med.' },
      ],
      espenTip: 'Aktiv opt-in pluss tydelig informasjon om hva kundene samtykker til. Datatilsynet sjekker dette regelmessig.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '🔍',
            title: 'SEO — Søkemotoroptimalisering',
            quote: 'Gjør deg fortjent til toppen av Google.',
            content: 'SEO (Search Engine Optimization) handler om å rangere høyere i organiske (ikke-betalte) søkeresultater. Tre hovedkomponenter: teknisk SEO (rask side, mobilvennlig, riktig struktur), innholds-SEO (relevant tekst, søkeord, dybde) og lenker (autoritet fra andre nettsteder). SEO tar måneder å oppnå, men holder lenger enn betalt søk. Google dominerer norsk søk med over 95 % markedsandel — derfor er Google-rangering nesten det samme som SEO.',
            subpoints: [
                  { label: 'TEKNISK', text: 'Rask innlasting, mobiloptimalisert, ren kode, oppdatert kart over sider.' },
          { label: 'INNHOLD', text: 'Tekst som svarer på søkernes spørsmål — bedre enn konkurrentenes.' },
          { label: 'LENKER', text: 'Andre nettsteder som lenker til deg gir autoritet. Kvalitet > kvantitet.' },
            ],
            practical: 'Søk på et begrep i din bransje. Hvem rangerer øverst? Hvorfor tror du de gjør det?',
            exercises: [
            {
      id: 'ml113-2-1',
      icon: '🔍',
      title: 'Hva er SEO',
      question: 'SEO handler om å rangere høyt på...',
      choices: [
        { id: 'a', label: 'Betalte annonser i Google', isCorrect: false, feedback: 'Det er SEM (Search Engine Marketing), ikke SEO.' },
{ id: 'b', label: 'Organiske, ikke-betalte søkeresultater', isCorrect: true, feedback: 'Riktig! SEO er ren rangering basert på relevans og autoritet — ikke betaling.' },
{ id: 'c', label: 'Sosiale medier', isCorrect: false, feedback: 'Sosiale medier har egen optimalisering — ikke SEO.' },
{ id: 'd', label: 'E-postsystemer', isCorrect: false, feedback: 'Helt annet konsept.' },
      ],
      espenTip: 'Google har over 200 rankingfaktorer. Ingen vet alle, men noen er klare: fart, mobil, innhold, lenker.',
    },
    {
      id: 'ml113-2-2',
      icon: '🔍',
      title: 'SEO eller SEM',
      question: 'Du trenger raske resultater på 1 uke. Hva passer best?',
      choices: [
        { id: 'a', label: 'SEO — start tekstoptimalisering', isCorrect: false, feedback: 'SEO tar måneder å virke — for sent for én uke.' },
{ id: 'b', label: 'SEM — kjøp Google Ads for spesifikke søkeord', isCorrect: true, feedback: 'Riktig! SEM (Google Ads, Bing Ads) gir umiddelbar synlighet — du betaler per klikk, men trenger ingen ventetid.' },
{ id: 'c', label: 'Bygge nytt nettsted fra bunnen av', isCorrect: false, feedback: 'Tar måneder — for sent.' },
{ id: 'd', label: 'Det er umulig', isCorrect: false, feedback: 'Det er fullt mulig — bare med riktig verktøy.' },
      ],
      espenTip: 'Strategi: SEM på kort sikt for å teste søkeord, SEO på lang sikt for billig vedvarende trafikk.',
    },
    {
      id: 'ml113-2-3',
      icon: '🔍',
      title: 'Lenker',
      question: 'Hvilke lenker gir best SEO-effekt?',
      choices: [
        { id: 'a', label: 'Mange lenker fra ukjente nettsteder', isCorrect: false, feedback: 'Mange dårlige lenker kan faktisk skade SEO.' },
{ id: 'b', label: 'Få lenker fra autoritative, relevante nettsteder', isCorrect: true, feedback: 'Riktig! Én lenke fra Aftenposten eller en bransjeforening er verdt mer enn 100 lenker fra ukjente blogger.' },
{ id: 'c', label: 'Kjøpte lenker fra link-tjenester', isCorrect: false, feedback: 'Kan straffes av Google. Kortsiktig løsning, langsiktig risiko.' },
{ id: 'd', label: 'Lenker fra egen nettside', isCorrect: false, feedback: 'Interne lenker hjelper, men gir ikke ekstern autoritet.' },
      ],
      espenTip: 'Google bruker E-E-A-T (Experience, Expertise, Authoritativeness, Trust) for rangering. Lenker er bevis på autoritet.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '💰',
            title: 'SEM — Søkemotormarkedsføring',
            quote: 'Betal for synlighet på spesifikke søkeord.',
            content: 'SEM (Search Engine Marketing) — primært Google Ads — er betalt synlighet på søkeresultater. Du byr på søkeord; den som byr høyest (justert for relevans) får øverste plass. Du betaler per klikk (CPC), ikke per visning. Quality Score (relevans, klikkfrekvens, landingsside) påvirker pris — relevant annonse koster mindre. Kortsiktig effekt: trafikk samme dag. Lønnsomhet krever konvertering — ren trafikk uten salg er sløsing.',
            subpoints: [
                  { label: 'AUKSJON', text: 'Du byr på søkeord — Google velger annonsen som kombinerer høyest bud + relevans.' },
          { label: 'CPC', text: 'Du betaler bare når noen klikker. Norske CPC-priser: 1–50 kr per klikk avhengig av bransje.' },
          { label: 'KONVERTERING', text: 'Trafikk uten salg er sløsing. Mål alltid konverteringer, ikke bare klikk.' },
            ],
            practical: 'Hvor mye er du villig til å betale per klikk hvis kun 3 % av klikkene blir kunder?',
            exercises: [
            {
      id: 'ml113-3-1',
      icon: '💰',
      title: 'CPC',
      question: 'Hva betyr det at SEM er CPC-basert?',
      choices: [
        { id: 'a', label: 'Du betaler per visning', isCorrect: false, feedback: 'Det er CPM, ikke CPC.' },
{ id: 'b', label: 'Du betaler bare når noen klikker på annonsen', isCorrect: true, feedback: 'Riktig! CPC = Cost per Click. Annonsering uten klikk er gratis — derfor er Google insentivert til å vise relevante annonser.' },
{ id: 'c', label: 'Du betaler en månedlig flat rate', isCorrect: false, feedback: 'Ikke modellen i Google Ads.' },
{ id: 'd', label: 'Du betaler per kjøp', isCorrect: false, feedback: 'Det finnes (CPA-bidding), men standard er CPC.' },
      ],
      espenTip: 'Bransjer med høye konverteringsverdier (advokat, tannlege, forsikring) har høyest CPC — opp til 500 kr per klikk i USA.',
    },
    {
      id: 'ml113-3-2',
      icon: '💰',
      title: 'Quality Score',
      question: 'Hvorfor får relevante annonser ofte lavere CPC?',
      choices: [
        { id: 'a', label: 'Google liker dem bedre', isCorrect: false, feedback: 'Google er en algoritme — ikke følelser.' },
{ id: 'b', label: 'Google belønner relevans med lavere pris fordi relevante annonser klikkes oftere', isCorrect: true, feedback: 'Riktig! Quality Score reflekterer relevans + click-through rate + landingsside-kvalitet. Bedre QS = lavere CPC.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Google Ads er datadrevet, ikke tilfeldig.' },
{ id: 'd', label: 'Premium-bedrifter får alltid rabatt', isCorrect: false, feedback: 'Kvalitet, ikke størrelse, bestemmer pris.' },
      ],
      espenTip: 'Skriv annonser som faktisk svarer på det folk søker etter. Det reduserer CPC og øker konvertering.',
    },
    {
      id: 'ml113-3-3',
      icon: '💰',
      title: 'Når SEM mister verdi',
      question: 'Når blir SEM-kampanje ulønnsom?',
      choices: [
        { id: 'a', label: 'Når CPC er over 5 kr', isCorrect: false, feedback: 'Avhenger av bransje — 5 kr kan være billig.' },
{ id: 'b', label: 'Når CPA er høyere enn CLV (kostnad per kunde > kundens livstidsverdi)', isCorrect: true, feedback: 'Riktig! Når du betaler mer for å skaffe kunden enn hun bringer inn, taper du penger på hver konvertering.' },
{ id: 'c', label: 'Når annonsen klikkes for ofte', isCorrect: false, feedback: 'Mange klikk er bra — så lenge konverteringen følger.' },
{ id: 'd', label: 'SEM er alltid lønnsomt', isCorrect: false, feedback: 'Hvis man ikke følger med er det fort ulønnsomt.' },
      ],
      espenTip: 'Sett alltid CPA-mål før du starter en kampanje. Stopp når kostnaden overstiger målet — ikke håp at det blir bedre.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📝',
            title: 'Innholdsmarkedsføring',
            quote: 'Skap verdi gjennom artikler, video og podkaster — \'Hjelp, ikke selg\'.',
            content: 'Innholdsmarkedsføring (Content Marketing) bygger autoritet og tillit gjennom verdifullt innhold — ikke gjennom salg. Eksempler: DnBs Magma-blogg om økonomi, Hubspot sine markedsføring-guider, Patagonia sine miljøreportasjer. Strategien er langsiktig: bli den foretrukne eksperten, så kjøper folk fra deg når de er klare. Krever konsistens — minst ukentlig publisering — og faktisk verdi for leseren. SEO og innhold er to sider av samme strategi.',
            subpoints: [
                  { label: 'VERDI FØRST', text: 'Hjelp, ikke selg. Verdi-innhold bygger tillit som senere blir til salg.' },
          { label: 'KONSISTENS', text: 'Minst ukentlig publisering. Sporadisk innhold mister momentum.' },
          { label: 'DISTRIBUSJON', text: 'Skriv én artikkel, distribuer i 5 kanaler: blogg, e-post, sosiale medier, LinkedIn, podkast.' },
            ],
            practical: 'Hvilken bedrift bruker innhold for å lære deg noe? Stoler du mer på dem som leverandør?',
            exercises: [
            {
      id: 'ml113-4-1',
      icon: '📝',
      title: '\'Hjelp, ikke selg\'',
      question: 'Hva betyr \'Hjelp, ikke selg\' i innholdsmarkedsføring?',
      choices: [
        { id: 'a', label: 'Aldri selg noe', isCorrect: false, feedback: 'Du selger til slutt — bare ikke i hver artikkel.' },
{ id: 'b', label: 'Skap reell verdi for leseren først; salg kommer som naturlig konsekvens', isCorrect: true, feedback: 'Riktig! Verdi-innhold bygger tillit. Når kunden er klar til å kjøpe, velger hun deg — fordi du har vist ekspertise gratis.' },
{ id: 'c', label: 'Kun bruk innhold til å selge produktet', isCorrect: false, feedback: 'Da er det bare salgstekst, ikke innholdsmarkedsføring.' },
{ id: 'd', label: 'Ignorer salgsmål', isCorrect: false, feedback: 'Salgsmål skal være der, men nås gjennom verdi.' },
      ],
      espenTip: 'Hubspot bygde et selskap verdt milliarder på å gi bort markedsføring-guider gratis. Det er gull-standard for innholdsmarkedsføring.',
    },
    {
      id: 'ml113-4-2',
      icon: '📝',
      title: 'Konsistens',
      question: 'Hva er typisk minimum publiseringsfrekvens?',
      choices: [
        { id: 'a', label: 'Én gang i året', isCorrect: false, feedback: 'For lavt — ingen autoritetsbygging.' },
{ id: 'b', label: 'Minst ukentlig', isCorrect: true, feedback: 'Riktig! Konsistens er nøkkelen til både SEO og målgruppe-vekst. Ukentlig er minimum for å bygge momentum.' },
{ id: 'c', label: 'Bare når du har tid', isCorrect: false, feedback: 'Sporadisk innhold mister både SEO og leserlojalitet.' },
{ id: 'd', label: 'Daglig', isCorrect: false, feedback: 'Daglig er bra, men ikke realistisk for de fleste — kvalitet > kvantitet.' },
      ],
      espenTip: 'Velg én kanal og publiser konsistent der, fremfor mange kanaler sporadisk. Fokus slår spredning.',
    },
    {
      id: 'ml113-4-3',
      icon: '📝',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk bedrift har en sterk innholdsmarkedsføring-strategi?',
      choices: [
        { id: 'a', label: 'REMA 1000 — annonser i alle medier', isCorrect: false, feedback: 'Det er reklame, ikke innholdsmarkedsføring.' },
{ id: 'b', label: 'DnB med Magma-bloggen om personlig økonomi', isCorrect: true, feedback: 'Riktig! Magma er DnBs innholdshub for økonomiråd — bygger DnB som ekspert uten å hardselge bankprodukter.' },
{ id: 'c', label: 'Coop med katalog', isCorrect: false, feedback: 'Reklame, ikke innholdsmarkedsføring.' },
{ id: 'd', label: 'Telia med fakturaen', isCorrect: false, feedback: 'Faktura er ikke markedsføring.' },
      ],
      espenTip: 'Andre norske eksempler: Equinor sin Energi-podkast, Nordnet sin investorblogg, Schibsted sine bransjeguider.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '📱',
            title: 'Sosiale medier',
            quote: 'Fra monolog til dialog.',
            content: 'Sosiale medier endret reklamen fundamentalt: kunden kan svare, kritisere, dele og kjøpe direkte i samme kanal. Hver plattform har egen dynamikk: Facebook for 30+, Instagram for 20–40, TikTok for 15–25, LinkedIn for B2B, X for nyheter, Snapchat for tenåringer. Krever responstid (svar innen timer, ikke dager) og evne til å håndtere både ros og ris åpent. Norske eksempler: Vipps på TikTok, Kahoot på LinkedIn, Stormberg på Instagram.',
            subpoints: [
                  { label: 'DIALOG', text: 'Forskjellen fra TV: kunden svarer. Krever responskapasitet.' },
          { label: 'PLATTFORMTILPASNING', text: 'Samme video til alle plattformer feiler. Hver kanal har eget format og forventninger.' },
          { label: 'KRISERESPONS', text: 'Sosiale medier sprer dårlige opplevelser raskere enn noen gang. Ha krisplan klar.' },
            ],
            practical: 'Hvilken bedrift gjør det best på sosiale medier i din vurdering? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml113-5-1',
      icon: '📱',
      title: 'Plattformforskjeller',
      question: 'Hva er typisk forskjell mellom Facebook og TikTok?',
      choices: [
        { id: 'a', label: 'De er like', isCorrect: false, feedback: 'Helt forskjellige plattformer og målgrupper.' },
{ id: 'b', label: 'Facebook har eldre brukere (30+), TikTok dominerer 15–25-segmentet', isCorrect: true, feedback: 'Riktig! Aldersprofilen er svært ulik. Innhold som virker på TikTok virker sjelden på Facebook, og omvendt.' },
{ id: 'c', label: 'Facebook er kun B2B', isCorrect: false, feedback: 'Begge er primært B2C.' },
{ id: 'd', label: 'TikTok er forbudt i Norge', isCorrect: false, feedback: 'Helt feil — TikTok er en av de største plattformene blant norske ungdom.' },
      ],
      espenTip: 'Distribusjon vinner: opprett innhold for hver plattform, ikke kopier mellom dem.',
    },
    {
      id: 'ml113-5-2',
      icon: '📱',
      title: 'Krisrespons',
      question: 'En kunde klager høyt på Facebook. Hva gjør du?',
      choices: [
        { id: 'a', label: 'Slett kommentaren', isCorrect: false, feedback: 'Sjelden lurt — andre vil se og dele \'du sletter klager\'.' },
{ id: 'b', label: 'Svar offentlig, profesjonelt, og tilby å ta saken til DM', isCorrect: true, feedback: 'Riktig! Åpenhet og rask respons viser at du tar kunder på alvor. Andre lesere ser at du håndterer problemer godt.' },
{ id: 'c', label: 'Ignorer', isCorrect: false, feedback: 'Verste alternativ — får mange til å føle seg ignorert.' },
{ id: 'd', label: 'Saksøk kunden', isCorrect: false, feedback: 'Helt overdrevet — ødelegger merkevaren totalt.' },
      ],
      espenTip: 'United Airlines tapte over 1 milliard USD i markedsverdi på et viralt \'United breaks guitars\'-klipp i 2009. Krise-kommunikasjon er kritisk.',
    },
    {
      id: 'ml113-5-3',
      icon: '📱',
      title: 'Norske eksempler',
      question: 'Hvilken norsk bedrift har bygget sterk merkevare på sosiale medier?',
      choices: [
        { id: 'a', label: 'Statkraft', isCorrect: false, feedback: 'Solid bedrift, men ikke kjent for sosial-strategi.' },
{ id: 'b', label: 'Vipps med viral innhold på TikTok og Instagram', isCorrect: true, feedback: 'Riktig! Vipps har vært ekstremt aktive på sosiale medier — særlig med humor på TikTok og kundeservice på Twitter/X.' },
{ id: 'c', label: 'Bolig.no', isCorrect: false, feedback: 'Mindre fokus på sosial-strategi.' },
{ id: 'd', label: 'Hydro', isCorrect: false, feedback: 'Mest B2B og pressekontakt.' },
      ],
      espenTip: 'Vipps\' sosial-strategi: humoristisk, lokal, rask respons. Bygger merkevare som \'norsk og folkelig\' i stedet for \'finansiell tjeneste\'.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '🎯',
            title: 'Konvertering — fra besøkende til kunde',
            quote: '100 000 besøkende uten salg er verdiløst.',
            content: 'Conversion Rate Optimization (CRO) handler om å gjøre besøkende til betalende kunder. Verktøy: A/B-testing (to varianter, måle hvilken vinner), heatmaps (Hotjar viser hvor folk klikker), funnel-analyse (hvor faller folk fra). Små endringer kan gi store utslag — en bedre \'Kjøp\'-knapp kan øke salget med 20 %. Klassiske grep: tydelig CTA, færre felter i skjema, sosial bevisning (anmeldelser), gratis frakt-terskel. Industristandard konvertering: 1–3 % for e-handel, 2–5 % for B2B-leads.',
            subpoints: [
                  { label: 'A/B-TESTING', text: 'Test to varianter mot hverandre, mål hvilken som vinner. Statistisk signifikans kreves.' },
          { label: 'CTA', text: 'Call to Action — den knappen kunden skal klikke. Klar tekst, kontrastfarge, plassering.' },
          { label: 'FRIKSJON', text: 'Hvert ekstra felt i skjema reduserer konvertering med 5–10 %. Fjern det du kan.' },
            ],
            practical: 'Tenk på en gang du skulle kjøpe noe på nett, men ga opp før du betalte. Hvorfor?',
            exercises: [
            {
      id: 'ml113-6-1',
      icon: '🎯',
      title: 'CRO',
      question: 'Hva betyr CRO?',
      choices: [
        { id: 'a', label: 'Customer Retention Office', isCorrect: false, feedback: 'Feil — CRO er om konvertering, ikke retention.' },
{ id: 'b', label: 'Conversion Rate Optimization — gjøre besøkende til kunder', isCorrect: true, feedback: 'Riktig! CRO er en egen disiplin. Små forbedringer kan ha stor effekt på bunnlinjen.' },
{ id: 'c', label: 'Content Rating Organization', isCorrect: false, feedback: 'Eksisterer ikke i markedsføring.' },
{ id: 'd', label: 'Click Response Operation', isCorrect: false, feedback: 'Helt feil definisjon.' },
      ],
      espenTip: '1 % økt konvertering på 1 mill kr i salg = 10 000 kr ekstra hver måned. CRO betaler seg fort.',
    },
    {
      id: 'ml113-6-2',
      icon: '🎯',
      title: 'A/B-test',
      question: 'Hva tester en A/B-test?',
      choices: [
        { id: 'a', label: 'To produkter mot hverandre', isCorrect: false, feedback: 'Det er produkttest, ikke A/B-test.' },
{ id: 'b', label: 'To varianter av samme element (knapp, overskrift) for å se hvilken som konverterer bedre', isCorrect: true, feedback: 'Riktig! Du sender 50 % trafikk til A, 50 % til B, måler resultatene. Lav-risiko optimalisering.' },
{ id: 'c', label: 'Bare en hypotese', isCorrect: false, feedback: 'A/B-test krever to konkrete varianter.' },
{ id: 'd', label: 'Hele nettsiden mot konkurrentens', isCorrect: false, feedback: 'Ikke A/B-test — det er konkurrentanalyse.' },
      ],
      espenTip: 'Begynn med store ting (overskrift, hovedbilde) før du tester små (fargenyanser). Optimaliser viktig først.',
    },
    {
      id: 'ml113-6-3',
      icon: '🎯',
      title: 'Friksjon',
      question: 'Et nettskjema har 12 felter. Hva er sannsynlig effekt?',
      choices: [
        { id: 'a', label: 'Bedre konvertering — vi får mer info', isCorrect: false, feedback: 'Tvert imot — flere felter reduserer konvertering.' },
{ id: 'b', label: 'Lavere konvertering — folk gir opp halvveis', isCorrect: true, feedback: 'Riktig! Hvert ekstra felt reduserer konvertering 5–10 %. Fjern alt du ikke trenger umiddelbart.' },
{ id: 'c', label: 'Ingen effekt', isCorrect: false, feedback: 'Datanalyse viser tydelig negativ effekt.' },
{ id: 'd', label: 'Bedre kvalitet på leadene', isCorrect: false, feedback: 'Mulig — men på bekostning av volum.' },
      ],
      espenTip: 'Test: spør bare e-post først, be om mer info etter første kontakt. Progressiv profilering konverterer bedre.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '🤖',
            title: 'Big data og personalisering',
            quote: 'Algoritmen vet hva du vil ha — før du vet det selv.',
            content: 'Big data + AI lar bedrifter forutsi hva kunden vil ha basert på adferd. Spotify Discover Weekly, Netflix-anbefalinger, TikTok For You-feeden — alle bygget på maskinlæring fra adferdsdata. I norske bedrifter: Komplett anbefaler produkter basert på historikk, Vy gir personalisert pristilbud, DnB tilpasser nettbankens dashboard. Kraftig, men reiser etiske spørsmål. GDPR-sjekk: lovlig grunnlag for personalisering må være på plass.',
            subpoints: [
                  { label: 'PERSONALISERING', text: 'Innhold tilpasset hver enkelt — øker konvertering, reduserer irritasjon.' },
          { label: 'AUTOMATISERING', text: 'Kampanjer som triggers av kundens adferd — handlevogn-forlatt, fødselsdag, kjøpsmønster.' },
          { label: 'ETIKK', text: 'Mer data = mer ansvar. Hva er rimelig å bruke, og hva er overgrep mot personvernet?' },
            ],
            practical: 'Hvor langt er du komfortabel med at bedrifter går i å spore din adferd? Hvor går grensen?',
            exercises: [
            {
      id: 'ml113-7-1',
      icon: '🤖',
      title: 'Personalisering',
      question: 'Hva er \'recommendation engine\'?',
      choices: [
        { id: 'a', label: 'En motor som starter en bil', isCorrect: false, feedback: 'Helt feil kontekst.' },
{ id: 'b', label: 'Algoritme som anbefaler produkter/innhold basert på din historikk og lignende brukere', isCorrect: true, feedback: 'Riktig! Spotify, Netflix, Amazon — alle drevet av rec-engines. Forutsier hva du vil ha.' },
{ id: 'c', label: 'Et anbefalingsbrev fra en sjef', isCorrect: false, feedback: 'Helt feil kontekst.' },
{ id: 'd', label: 'En type søkemotor', isCorrect: false, feedback: 'Søkemotor svarer på spørsmål; rec engine foreslår uten at du spør.' },
      ],
      espenTip: 'Netflix sa at deres anbefalingssystem alene sparer dem 1 milliard USD per år i kundeavgang.',
    },
    {
      id: 'ml113-7-2',
      icon: '🤖',
      title: 'Norske eksempler',
      question: 'Hvilken norsk bedrift bruker tydelig personalisering?',
      choices: [
        { id: 'a', label: 'Et tradisjonelt postkontor', isCorrect: false, feedback: 'Lite personalisering.' },
{ id: 'b', label: 'Komplett.no — anbefalinger basert på kjøps- og kikkemønster', isCorrect: true, feedback: 'Riktig! Norske e-handel-aktører bruker rec-engines aktivt. Komplett er en av de mest avanserte.' },
{ id: 'c', label: 'Det offentlige.no', isCorrect: false, feedback: 'Personlig data, men ikke kommersiell personalisering.' },
{ id: 'd', label: 'Aldri norske bedrifter', isCorrect: false, feedback: 'Mange norske bedrifter ligger langt fremme.' },
      ],
      espenTip: 'Mindre norske bedrifter kan bruke rimelige verktøy som Klaviyo, Bloomreach og Salesforce. Personalisering er ikke kun for store selskaper.',
    },
    {
      id: 'ml113-7-3',
      icon: '🤖',
      title: 'Etisk grense',
      question: 'Når blir personalisering problematisk?',
      choices: [
        { id: 'a', label: 'Når den blir basert på kundens kjøp', isCorrect: false, feedback: 'Det er normalt og ofte forventet.' },
{ id: 'b', label: 'Når den utnytter sårbarhet — f.eks. spillavhengige får spillreklame', isCorrect: true, feedback: 'Riktig! Algoritmer kan utnytte mønstre på problematisk måte. Etisk markedsføring krever bevisst grensesetting.' },
{ id: 'c', label: 'Aldri — personalisering er alltid bra', isCorrect: false, feedback: 'Mange åpenbare etiske problemstillinger.' },
{ id: 'd', label: 'Bare hvis kunden ser den', isCorrect: false, feedback: 'Selv usynlig personalisering kan være etisk problematisk.' },
      ],
      espenTip: 'Cambridge Analytica brukte personalisering til politisk manipulasjon. Etiske retningslinjer er nødvendige.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🔒',
            title: 'GDPR og personvern',
            quote: 'Persondata = ansvar. Brudd kan koste 4 % av global omsetning.',
            content: 'GDPR (General Data Protection Regulation) trådte i kraft i EU/EØS i 2018. Krever lovlig grunnlag for å samle og behandle personopplysninger. Brukerens rettigheter: innsyn, retting, sletting (right to be forgotten), dataportabilitet. Plikt: meld datainnbrudd innen 72 timer. Bot kan være 4 % av global omsetning eller 20 mill euro. Datatilsynet håndhever i Norge — har slått ned på flere norske bedrifter for ulovlig sporing og samtykkemekanikk.',
            subpoints: [
                  { label: 'LOVLIG GRUNNLAG', text: 'Du må ha samtykke, kontrakt, lovkrav eller berettiget interesse for å behandle data.' },
          { label: 'DATAINNBRUDD = 72 TIMER', text: 'Meld til Datatilsynet innen 72 timer etter oppdagelse — ikke etter løsning.' },
          { label: 'BOT', text: 'Inntil 4 % av global omsetning. Selv små bedrifter kan rammes hardt.' },
            ],
            practical: 'Hva slags data har bedriften du jobber for / handler hos om deg? Vet du hvor du finner ut det?',
            exercises: [
            {
      id: 'ml113-8-1',
      icon: '🔒',
      title: 'GDPR-bot',
      question: 'Hvor høy kan en GDPR-bot være?',
      choices: [
        { id: 'a', label: '10 000 kr', isCorrect: false, feedback: 'Underestimert — boten kan være enorm.' },
{ id: 'b', label: '100 000 kr', isCorrect: false, feedback: 'Også for lavt for grove brudd.' },
{ id: 'c', label: '4 % av global omsetning eller 20 mill euro — det høyeste', isCorrect: true, feedback: 'Riktig! GDPR har de strengeste personvernsanksjonene globalt. Even Meta og Google har fått milliardbøter.' },
{ id: 'd', label: 'Det er ingen bot', isCorrect: false, feedback: 'Helt feil — GDPR er en av de strengeste lovene.' },
      ],
      espenTip: 'Meta er bøtelagt over 1 milliard euro under GDPR. Selv små norske bedrifter har fått bøter på flere hundretusen.',
    },
    {
      id: 'ml113-8-2',
      icon: '🔒',
      title: 'Datainnbrudd',
      question: 'Hvor raskt må du melde et datainnbrudd?',
      choices: [
        { id: 'a', label: 'Innen 1 time', isCorrect: false, feedback: 'Strengt, men ikke kravet — 72 timer er fristen.' },
{ id: 'b', label: 'Innen 72 timer etter oppdagelse', isCorrect: true, feedback: 'Riktig! GDPR Article 33. Frist starter når du oppdager det, ikke når du har løst det. Forsinket melding gir egne sanksjoner.' },
{ id: 'c', label: 'Innen 30 dager', isCorrect: false, feedback: 'For sent — fristen er mye strengere.' },
{ id: 'd', label: 'Bare hvis det rammer mange', isCorrect: false, feedback: 'Alvorlighetsgrad teller, men meldeplikt gjelder generelt.' },
      ],
      espenTip: 'Meld til Datatilsynet, og om risiko er høy også til de berørte personene. Dokumenter alle steg du tar.',
    },
    {
      id: 'ml113-8-3',
      icon: '🔒',
      title: 'Brukerens rettigheter',
      question: 'Hvilke rettigheter har brukere under GDPR?',
      choices: [
        { id: 'a', label: 'Innsyn, retting, sletting, dataportabilitet', isCorrect: true, feedback: 'Riktig! Disse fire er kjerne-rettighetene. Brukere kan be om alt, og du må svare innen rimelig tid.' },
{ id: 'b', label: 'Bare innsyn', isCorrect: false, feedback: 'Underestimert — GDPR gir flere rettigheter.' },
{ id: 'c', label: 'Bare retten til å bli glemt', isCorrect: false, feedback: 'Én av flere rettigheter.' },
{ id: 'd', label: 'Ingen — bedriften eier dataene', isCorrect: false, feedback: 'Helt feil — brukeren eier sin data, ikke bedriften.' },
      ],
      espenTip: 'Sett opp en intern prosess for å håndtere innsynsbegjæringer. Du har 30 dager — ikke vent til kravet kommer.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🔄',
            title: 'Customer Journey og touchpoints',
            quote: 'Kunden treffer deg 5–20 ganger før kjøp.',
            content: 'Customer Journey er hele reisen kunden går — fra første eksponering til kjøp og etter-bruk. Moderne kunder bruker 5–20 touchpoints før kjøp: så Instagram-annonse, Google-søk, leser anmeldelser, sammenligner priser, snakker med venner, besøker fysisk butikk, kjøper på nett. Hvert touchpoint er en mulighet til å løfte eller miste opplevelsen. Multi-touch attribution prøver å fordele salgs-kreditten korrekt mellom touchpoints — komplisert.',
            subpoints: [
                  { label: 'MULTI-TOUCH', text: 'Sjelden er det én ting som avgjør kjøpet. Salg er resultat av mange møter.' },
          { label: 'ATTRIBUTION', text: 'Hvilken kanal får \'kreditten\' for salget? Last-click er overforenklet, men vanligst.' },
          { label: 'KONSISTENS', text: 'Samme merkevare-opplevelse på alle touchpoints. Sprik svekker tillit.' },
            ],
            practical: 'Tenk tilbake på siste større kjøp du gjorde. Hvor mange touchpoints husker du? Hvilken var avgjørende?',
            exercises: [
            {
      id: 'ml113-9-1',
      icon: '🔄',
      title: 'Customer Journey',
      question: 'Hva er Customer Journey?',
      choices: [
        { id: 'a', label: 'Kundens fysiske reise til butikken', isCorrect: false, feedback: 'For konkret tolkning.' },
{ id: 'b', label: 'Hele kundens prosess fra første eksponering til kjøp og etter-bruk', isCorrect: true, feedback: 'Riktig! Inkluderer alle touchpoints på tvers av kanaler. Mapping av journey er strategisk verktøy.' },
{ id: 'c', label: 'En reise sponset av bedriften', isCorrect: false, feedback: 'Helt feil tolkning.' },
{ id: 'd', label: 'Bare selve kjøpsprosessen', isCorrect: false, feedback: 'For smal definisjon — journey er bredere.' },
      ],
      espenTip: 'Lag et customer journey map: tegn ut alle touchpoints kunden har, fra Google-søk til oppfølging. Avdekker forbedringspunkter.',
    },
    {
      id: 'ml113-9-2',
      icon: '🔄',
      title: 'Antall touchpoints',
      question: 'Hvor mange touchpoints har en typisk B2B-kunde før kjøp?',
      choices: [
        { id: 'a', label: '1–2', isCorrect: false, feedback: 'Underestimert — B2B-kjøp krever mange interaksjoner.' },
{ id: 'b', label: '3–4', isCorrect: false, feedback: 'Fortsatt for lavt for komplekse kjøp.' },
{ id: 'c', label: '5–20', isCorrect: true, feedback: 'Riktig! Forskning viser 5–20 touchpoints i B2B og 7+ i komplekse B2C-kjøp.' },
{ id: 'd', label: '100+', isCorrect: false, feedback: 'Overdrevent — selv komplekse B2B-prosesser når sjelden så mange.' },
      ],
      espenTip: 'Derfor er ren \'én reklame\' tilnærming utdatert. Du trenger flere kontaktpunkter over tid.',
    },
    {
      id: 'ml113-9-3',
      icon: '🔄',
      title: 'Attribution-utfordring',
      question: 'Hva er problemet med \'last-click attribution\'?',
      choices: [
        { id: 'a', label: 'Det er for komplisert', isCorrect: false, feedback: 'Tvert imot — det er enkelt, men for forenklet.' },
{ id: 'b', label: 'Det gir all kreditt til siste touchpoint, og overser tidlige interaksjoner som faktisk skapte interesse', isCorrect: true, feedback: 'Riktig! Last-click favoriserer typisk Google Ads og merkesøk, men ignorerer de tidlige merkebyggende kanalene.' },
{ id: 'c', label: 'Det er ulovlig', isCorrect: false, feedback: 'Det er fullt lovlig — bare ikke pedagogisk korrekt.' },
{ id: 'd', label: 'Det er kun for B2B', isCorrect: false, feedback: 'Brukes i begge segmenter.' },
      ],
      espenTip: 'Multi-touch eller data-driven attribution gir mer presist bilde — men er vanskeligere å sette opp. Start enkelt, optimaliser over tid.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '🚀',
            title: 'Strategisk integrert digital tilstedeværelse',
            quote: 'Det er ikke nok å være på nett. Du må ha en strategi.',
            content: 'Digital strategi binder sammen alt det forrige: SEO, SEM, sosiale medier, e-post, innhold, personalisering. Klarer du å lage en helhetlig digital reise for kunden? Eller er det fragmentert og inkonsistent? Mest suksessfulle bedrifter har én strategi som styrer alle digitale aktiviteter — ikke separate teams som jobber isolert. Mål: at kunden får samme merkevareopplevelse uansett hvilken kanal hun møter deg i. Norske bedrifter som lykkes med dette: Vipps, Kahoot, Komplett.',
            subpoints: [
                  { label: 'HELHET', text: 'Alle digitale kanaler skal støtte samme merkevare og forretningsmål.' },
          { label: 'DATA-DREVET', text: 'Beslutninger basert på faktisk data — ikke magefølelse fra én ansatt.' },
          { label: 'KONTINUERLIG', text: 'Digital strategi er ikke noe du gjør én gang. Test, mål, juster, gjenta.' },
            ],
            practical: 'Hvilken bedrift har for deg den mest helhetlige digitale tilstedeværelsen? Hva gjør de annerledes?',
            exercises: [
            {
      id: 'ml113-10-1',
      icon: '🚀',
      title: 'Helhetlig strategi',
      question: 'Hva kjennetegner moden digital tilstedeværelse?',
      choices: [
        { id: 'a', label: 'Bedriften er på alle plattformer, men hver kanal kjøres separat', isCorrect: false, feedback: 'Fragmentert tilnærming gir inkonsistent merkevare.' },
{ id: 'b', label: 'En helhetlig strategi der alle digitale kanaler støtter samme mål og merkevare', isCorrect: true, feedback: 'Riktig! Modne digitale aktører har én strategi som styrer alle kanaler — koordinert merkebygging.' },
{ id: 'c', label: 'Kun fokus på Facebook', isCorrect: false, feedback: 'Avhengighet av én plattform er strategisk svakhet.' },
{ id: 'd', label: 'Ingen plan, bare reagere på trender', isCorrect: false, feedback: 'Det gir kortvarige resultater, ikke vekst.' },
      ],
      espenTip: 'Vipps\' digitale strategi er styrt fra ett brand-team. Resultatet: konsistent personlighet uansett om du møter dem på TikTok eller i nettbanken.',
    },
    {
      id: 'ml113-10-2',
      icon: '🚀',
      title: 'Data-drevet beslutning',
      question: 'Hvordan velger en moden digital aktør hvilken kanal å satse mer på?',
      choices: [
        { id: 'a', label: 'Magefølelse — det føles riktig', isCorrect: false, feedback: 'Subjektiv og ofte feil.' },
{ id: 'b', label: 'Måler ROAS per kanal og flytter budsjett til de mest lønnsomme', isCorrect: true, feedback: 'Riktig! Datadrevet allokering gir bedre avkastning enn magefølelse. ROAS, CPA og LTV er nøkkelbegrep.' },
{ id: 'c', label: 'Følger hva konkurrenten gjør', isCorrect: false, feedback: 'Lett å bli en kopi uten klar strategi.' },
{ id: 'd', label: 'Spør ledelsen om hva de tror', isCorrect: false, feedback: 'Ledelse uten data er gjetning.' },
      ],
      espenTip: 'Sett opp månedlig review av kanal-performance. Stopp eller justér på 30–90 dager — ikke vent et år.',
    },
    {
      id: 'ml113-10-3',
      icon: '🚀',
      title: 'Kontinuerlig optimalisering',
      question: 'Hvor ofte bør digital strategi justeres?',
      choices: [
        { id: 'a', label: 'Aldri — sett strategi én gang og kjør', isCorrect: false, feedback: 'Digital endrer seg for raskt for det.' },
{ id: 'b', label: 'Hovedstrategien revideres årlig; taktikker testes og justeres månedlig', isCorrect: true, feedback: 'Riktig! Strategisk retning bør være stabil over år, men taktiske valg må kontinuerlig optimaliseres basert på data.' },
{ id: 'c', label: 'Bytter strategi hver uke', isCorrect: false, feedback: 'For ofte — du får ikke bygd noe.' },
{ id: 'd', label: 'Bare hvis noe går galt', isCorrect: false, feedback: 'Reaktivt — du mister muligheter til proaktiv vekst.' },
      ],
      espenTip: 'Test små ting hele tiden, store ting kvartalsvis, fundamentalt en gang i året. Test og lær er kjernen i digital modenhet.',
    },
            ],
          },
        ]

        export default function DirekteMarkedsforingInternettModule() {
          return (
            <DrawerModule
              moduleCode="ML1-13"
              moduleTitle="Direkte markedsføring og internett"
              moduleIcon="🌐"
              storageKey="learning-ml1-direkte-markedsforing-internett"
              completeRoute="/learning/ml1/direkte-markedsforing-internett/complete"
              phases={phases}
              intro="Internett har flyttet makten fra bedriften til kunden. Forbrukeren kan sammenligne, lese anmeldelser og bytte leverandør med ett klikk. Direkte markedsføring og digital tilstedeværelse handler om å fortjene oppmerksomhet — ikke kjøpe seg til den. SEO, innholdsmarkedsføring, sosiale medier og GDPR er kjerneverktøyene."
              vissteduAt="Norske brukere bruker over 6 timer daglig på internett. Cirka 40 % av all kjøpsbeslutning gjøres etter research på nett — selv når selve kjøpet skjer i fysisk butikk. Digital tilstedeværelse påvirker offline-salget like mye som online."
              espenSier="Det er ikke nok å være på internett. Du må være på riktig sted, til riktig tid, med riktig budskap. Det krever struktur, måling og kontinuerlig optimalisering — ikke bare \'å være på Facebook\'."
      presentationLink={{ route: '/learning/presentations/ml1/direkte-markedsforing-internett', description: 'Direkte markedsføring og internett — 10 slides' }}
            />
          )
        }
