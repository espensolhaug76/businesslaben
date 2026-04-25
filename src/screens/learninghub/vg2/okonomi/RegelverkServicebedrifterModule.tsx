import DrawerModule, { type DrawerPhase } from '../../shared/DrawerModule'

export const phases: DrawerPhase[] = [
  {
    phaseNumber: 1,
    icon: '⚖️',
    title: 'Fagarbeideren som juridisk representant',
    quote: '"Når du møter kunden bak disken, representerer du ikke deg selv — du representerer bedriften juridisk."',
    content: 'Det kommersielle arbeidslivet er omgitt av et finmasket nett av juridiske reguleringer. Fagarbeidere i serviceyrker møter dette regelverket daglig — ved salg, reklamasjoner, returer og garantier. Å kjenne regelverket gir deg trygghet i krevende situasjoner og beskytter both virksomheten og kunden.',
    subpoints: [
      { label: 'Hvem reglene gjelder', text: 'Alle som selger varer eller tjenester til forbrukere er underlagt Forbrukerkjøpsloven' },
      { label: 'Din rolle', text: 'Som ansatt er du bedriftens juridiske representant — det du sier og gjør, binder bedriften' },
      { label: 'Balansen', text: 'Du plikter å ivareta kundens lovfestede rettigheter OG beskytte bedriften mot uberettigede krav' },
      { label: 'Kunnskapens verdi', text: 'Vet du regelverket, kan du si nei til ulovlige krav med selvtillit — og ja til lovpålagte krav' },
    ],
    practical: 'Refleksjon: Har du noen gang møtt en situasjon i butikk der du (som kunde) følte at den ansatte ikke kjente regelverket? Hva var konsekvensen?',
    exercises: [
      {
        id: 'rs1-1',
        icon: '⚖️',
        title: 'Fagarbeideren og jussen',
        question: 'En butikkansatt sier til en kunde: "Vi gir ingen refusjon, det er vår policy." Hva er problemet?',
        choices: [
          { id: 'a', label: 'Ingenting — bedriften kan ha egne regler', isCorrect: false, feedback: 'Bedrifter kan ikke avtale seg bort fra Forbrukerkjøpslovens minimumsrettigheter.' },
          { id: 'b', label: 'Bedriftspolicies kan ikke overstyre kundens lovfestede reklamasjonsrett', isCorrect: true, feedback: 'Riktig! Forbrukerkjøpsloven gir kunden reklamasjonsrett uavhengig av butikkens policy.' },
          { id: 'c', label: 'Ansatte kan nekte refusjon om de har gyldig grunn', isCorrect: false, feedback: 'Reklamasjonsretten er lovfestet. "Policy" er ikke en gyldig grunn til å nekte lovpålagte rettigheter.' },
          { id: 'd', label: 'Det avhenger av kjøpesummen på produktet', isCorrect: false, feedback: 'Reklamasjonsretten gjelder uavhengig av pris.' },
        ],
        espenTip: 'Huskeregel: Forbrukerkjøpsloven er preseptorisk — den kan ikke settes til side av avtale. Kundens rettigheter er et minimumsivå, ikke et forhandlingsgrunnlag.',
      },
    ],
  },
  {
    phaseNumber: 2,
    icon: '📋',
    title: 'Forbrukerkjøpsloven — reklamasjonsretten',
    quote: '"Reklamasjon er ikke klage — det er en lovfestet rett til retting av feil."',
    content: 'Forbrukerkjøpsloven regulerer kjøp der en næringsdrivende selger til en privatperson. Reklamasjonsretten er kundens viktigste rettighet: retten til å klage på feil eller mangler som forelå ved levering. Det er to sentrale frister å kjenne til.',
    subpoints: [
      { label: '2-årsreklamasjon', text: 'Grunnregelen: kunden kan reklamere innen 2 år fra levering på alle forbrukervarer' },
      { label: '5-årsreklamasjon', text: 'For varer som er ment å vare vesentlig lenger enn 2 år (mobiltelefoner, hvitevarer, møbler), er fristen 5 år' },
      { label: 'Bevisbyrde', text: 'Innen 12 måneder: selger må bevise at varen var feilfri ved levering. Etter 12 måneder: kunden må bevise feilen forelå' },
      { label: 'Kundens krav', text: 'Reparasjon eller omlevering FØRST. Deretter prisavslag eller heving. Refusjon er siste utvei' },
    ],
    practical: 'Huskeregel: "Er varen ment å vare?" — hvitevarer, telefoner, møbler = 5 år. Forbruksartikler = 2 år. Er du usikker? Bruk 5-årsregelen og sjekk etterpå.',
    exercises: [
      {
        id: 'rs2-1',
        icon: '📋',
        title: 'Reklamasjonsfrist',
        question: 'En kunde kjøper en mobiltelefon hos Elkjøp. Etter 3 år slutter skjermen å fungere. Har kunden reklamasjonsrett?',
        choices: [
          { id: 'a', label: 'Nei — 2-årsfristen er utløpt', isCorrect: false, feedback: 'Mobiltelefoner er ment å vare vesentlig lenger enn 2 år. 5-årsregelen gjelder.' },
          { id: 'b', label: 'Ja — mobiltelefoner har 5 års reklamasjonsfrist', isCorrect: true, feedback: 'Riktig! Produkter ment å vare lenge (telefoner, hvitevarer) har 5 års reklamasjonsrett.' },
          { id: 'c', label: 'Avhenger av om kunden har kvitteringen', isCorrect: false, feedback: 'Kvittering er nyttig men ikke et lovkrav for reklamasjon. Bankutskrift kan brukes.' },
          { id: 'd', label: 'Nei — elektronikk har alltid 2 års frist', isCorrect: false, feedback: 'Feil generalisering. Varighetsforventning er nøkkelkriteriet, ikke produktkategori.' },
        ],
        espenTip: 'To-fem-femregelen: Hvitevarer, mobiler, møbler, sko (kvalitetsvarer) = 5 år. Forbruksartikler, batterier, lyspærer = 2 år. Batteri i mobiltelefon = 2 år (det er et forbruksprodukt).',
      },
    ],
  },
  {
    phaseNumber: 3,
    icon: '↩️',
    title: 'Angrerettloven — 14 dager til å angre',
    quote: '"Angrerettloven gir deg den viktigste beskyttelsen mot fjernsalgstyranniet."',
    content: 'Angrerettloven gir forbrukere rett til å gå fra en avtale innen 14 dager, uten begrunnelse og uten kostnad, ved fjernsalg (netthandel, telefonsalg, postordre) og dørsalg (kjøp utenfor butikklokalet). Loven kompenserer for at kunden ikke har hatt mulighet til å se og prøve produktet.',
    subpoints: [
      { label: '14-dagersregelen', text: 'Kunden har 14 dager fra mottak av varen til å melde at de vil bruke angreretten' },
      { label: 'Ingen begrunnelse', text: 'Kunden trenger ikke å oppgi grunn. "Jeg angrer" er tilstrekkelig' },
      { label: 'Fri retur', text: 'Selger må tilby fri retur (i praksis dekke returkostnad) ved bruk av angreretten' },
      { label: 'Viktige unntak', text: 'Angrerett gjelder IKKE for kjøp over disk i butikk, eller for enkelt-overnattinger i hotell' },
    ],
    practical: 'Husketips: Netthandel = angrerett. Butikk over disk = ingen angrerett (butikken kan frivillig tilby åpent kjøp). Hotellovernetting = unntak.',
    exercises: [
      {
        id: 'rs3-1',
        icon: '↩️',
        title: 'Angrerett og unntak',
        question: 'En kunde kjøper en jakke over disk i butikken. To dager senere vil de levere den tilbake og få pengene igjen. Har de lovfestet angrerett?',
        choices: [
          { id: 'a', label: 'Ja — 14-dagersregelen gjelder alle kjøp', isCorrect: false, feedback: 'Angrerettloven gjelder kun fjernsalg og dørsalg — ikke kjøp over disk i butikk.' },
          { id: 'b', label: 'Nei — angrerettloven gjelder ikke kjøp i butikk', isCorrect: true, feedback: 'Riktig! Kjøp over disk er unntatt fra Angrerettloven. Butikken kan frivillig tilby "åpent kjøp".' },
          { id: 'c', label: 'Ja, men bare om jakken ikke er brukt', isCorrect: false, feedback: 'Bruk er relevant for netthandel-retur, men kjøp over disk har ingen lovfestet angrerett.' },
          { id: 'd', label: 'Avhenger av butikkens egen policy', isCorrect: false, feedback: 'Butikken kan tilby åpent kjøp frivillig, men det er ikke en lovfestet rett for kjøp over disk.' },
        ],
        espenTip: 'Angrerett = bare for fjernsalg og dørsalg. Kjøp over disk = ingen lovfestet angrerett. "Åpent kjøp" er butikkens frivillige gave til kunden, ikke lovkrav.',
      },
    ],
  },
  {
    phaseNumber: 4,
    icon: '🎁',
    title: 'Garanti vs reklamasjon — to ulike rettigheter',
    quote: '"Garanti er et løfte. Reklamasjon er en rettighet. Du har alltid reklamasjonsretten — garantien er en bonus."',
    content: 'Garanti og reklamasjon forveksles svært ofte. Det er to fundamentalt ulike beskyttelsesmekanismer. Reklamasjon er lovfestet og gjelder alltid. Garanti er en frivillig tilleggsfordel selger velger å gi. Selgere kan ikke erstatte reklamasjonsretten med garanti.',
    subpoints: [
      { label: 'Reklamasjon', text: 'Lovfestet rett (Forbrukerkjøpsloven). Gjelder alltid. Kan ikke fratas. Dekker feil som forelå ved levering' },
      { label: 'Garanti', text: 'Frivillig løfte fra produsent/selger. Gir forbrukeren sterkere rettigheter enn loven krever' },
      { label: 'Viktig poeng', text: 'En utløpt garanti betyr IKKE at reklamasjonsretten er borte — de er uavhengige' },
      { label: 'Selgers plikt', text: 'Selger plikter å informere kunden om reklamasjonsretten. Utelatelse av informasjon kan gi kunden lengre frist' },
    ],
    practical: 'Huskeregel: Garanti utløper → reklamasjonsretten gjelder fortsatt. Selger sier "garantien er utløpt" → du svarer "men reklamasjonsretten gjelder i X år".',
    exercises: [
      {
        id: 'rs4-1',
        icon: '🎁',
        title: 'Garanti vs reklamasjon',
        question: 'En vaskemaskin har 2 års garanti fra produsenten. Etter 3 år slutter den å fungere. Har kunden rettigheter?',
        choices: [
          { id: 'a', label: 'Nei — garantien er utløpt', isCorrect: false, feedback: 'Garantien er utløpt, men reklamasjonsretten er uavhengig og gjelder i 5 år for hvitevarer.' },
          { id: 'b', label: 'Ja — reklamasjonsretten gjelder i 5 år for hvitevarer, uavhengig av garantien', isCorrect: true, feedback: 'Riktig! Garanti og reklamasjon er uavhengige. Utløpt garanti påvirker ikke reklamasjonsretten.' },
          { id: 'c', label: 'Avhenger av om de kjøpte utvidet garanti', isCorrect: false, feedback: 'Utvidet garanti er frivillig ekstra beskyttelse. Reklamasjonsretten eksisterer uavhengig.' },
          { id: 'd', label: 'Nei — etter 2 år er alle rettigheter borte', isCorrect: false, feedback: 'Feil. 2-årsregelen er minimum for forbruksvarer. Hvitevarer har 5 år.' },
        ],
        espenTip: 'Formel: Reklamasjon = loven. Garanti = bonus fra selger. Utløpt bonus = du har fortsatt det loven gir deg.',
      },
    ],
  },
  {
    phaseNumber: 5,
    icon: '✈️',
    title: 'Pakkereiseloven og overnattingsunntaket',
    quote: '"Reiselivsbransjen har sin egen lov — og hotellovernattinger er unntaket fra angrerettloven."',
    content: 'I reiselivsbransjen gjelder særskilte regler. Pakkereiseloven gir forbrukere sterk beskyttelse ved kjøp av pakkereiser (fly + hotell). Angrerettloven gjør imidlertid et eksplisitt unntak for enkelt-overnattinger: kjøp av ett hotellopphold er ikke underlagt 14-dagersangreretten.',
    subpoints: [
      { label: 'Pakkereiseloven', text: 'Gjelder kombinerte reiser (fly + hotell eller annet). Strenge informasjonsplikt og avbestillingsrettigheter' },
      { label: 'Overnattingsunntaket', text: 'Enkelt-overnattingsavtale (kun hotellrom uten andre elementer) er unntatt fra Angrerettloven' },
      { label: 'Praktisk konsekvens', text: 'Hoteller kan ha egne avbestillingsregler. Er du innenfor fristen? Da gjelder hotellets policy, ikke Angrerettloven' },
      { label: 'Prisgaranti', text: 'Hoteller med dynamisk prising kan ikke etterbelaste for prisendringer etter bekreftet bestilling' },
    ],
    practical: 'Husketips: Nettbooking av kun hotellrom = angrerettloven gjelder IKKE. Les alltid avbestillingsvilkårene nøye. Pakke-reise = sterkere beskyttelse etter Pakkereiseloven.',
    exercises: [
      {
        id: 'rs5-1',
        icon: '✈️',
        title: 'Overnattingsunntaket',
        question: 'En kunde bestiller hotellrom på nett. Neste dag ønsker hun å bruke angreretten og avbestille gratis. Har hun lovfestet rett til dette?',
        choices: [
          { id: 'a', label: 'Ja — nettkjøp har alltid 14 dagers angrerett', isCorrect: false, feedback: 'Feil. Overnattingsavtaler er eksplisitt unntatt fra Angrerettloven.' },
          { id: 'b', label: 'Nei — hotellovernattinger er unntatt fra Angrerettloven', isCorrect: true, feedback: 'Riktig! Overnattingsunntaket gjelder. Hun er avhengig av hotellets egne avbestillingsregler.' },
          { id: 'c', label: 'Ja, men kun innen 24 timer', isCorrect: false, feedback: '24-timers-regelen gjelder noen servicetyper, men ikke hotellbestillinger. Unntaket fra Angrerettloven gjelder.' },
          { id: 'd', label: 'Avhenger av om hun betaler med kredittkort', isCorrect: false, feedback: 'Betalingsmetode påvirker ikke Angrerettlovens unntak for overnattinger.' },
        ],
        espenTip: 'Reiselivsregelen: Bare hotell = hotellets egne regler. Fly + hotell (pakke) = Pakkereiseloven (sterk beskyttelse). Husk forskjellen.',
      },
    ],
  },
  {
    phaseNumber: 6,
    icon: '📱',
    title: 'Elkjøp-eksemplet — reklamasjon i praksis',
    quote: '"Kunden vet ikke alltid reglene. Det er din jobb å kjenne dem og anvende dem riktig."',
    content: 'En selger hos Elkjøp møter daglig kunder med defekte produkter. Eksemplet illustrerer de viktigste vurderingene: hvilken reklamasjonsfrist gjelder, hva kan kunden kreve, og hva er den riktige rekkefølgen for tiltak?',
    subpoints: [
      { label: 'Mobiltelefon, 3 år gammel', text: '5-årsreklamasjon gjelder. Kunden har rettigheter om feilen ikke er selvforvoldt' },
      { label: 'Batteri i telefon, 2,5 år', text: '2-årsreklamasjon. Batteri er forbruksprodukt. Men: kunden har bevisbyrden etter 12 måneder' },
      { label: 'Kunden krever pengene tilbake', text: 'Feil krav å starte med. Rekkefølgen er: reparasjon → omlevering → prisavslag → heving' },
      { label: 'Selgerens svar', text: '"Vi vil reparere eller bytte det ut" er riktig svar, ikke "nei"' },
    ],
    practical: 'Rollespill: Du er ansatt i Elkjøp. En kunde kommer med en 4 år gammel vaskemaskin som har sluttet å virke. Hva spør du om? Hva kan kunden kreve?',
    exercises: [
      {
        id: 'rs6-1',
        icon: '📱',
        title: 'Reklamasjon i butikk',
        question: 'En kunde reklamerer på en TV som ble kjøpt for 2,5 år siden. Hva er riktig svar fra den ansatte?',
        choices: [
          { id: 'a', label: '"2-årsfristen er utløpt, vi kan ikke hjelpe deg."', isCorrect: false, feedback: 'TV er ment å vare lenge, så 5-årsregelen gjelder. Kunden har rettigheter.' },
          { id: 'b', label: '"Vi kan hjelpe deg — TV har 5 års reklamasjonsfrist. La oss se på feilen."', isCorrect: true, feedback: 'Riktig! TV er et langvarig produkt. 5-årsregelen gjelder. Selger undersøker om feilen er forbrukerkjøpslovsrelevant.' },
          { id: 'c', label: '"Ta kontakt med produsenten direkte."', isCorrect: false, feedback: 'Kunden har reklamasjonsrett overfor SELGER (Elkjøp), ikke produsenten. Selger er ansvarlig.' },
          { id: 'd', label: '"Vi tilbyr en rabatt på neste kjøp i stedet."', isCorrect: false, feedback: 'Rabatt er ikke et lovpålagt alternativ til reklamasjonsretten. Kunden kan kreve reparasjon/omlevering.' },
        ],
        espenTip: 'Huskeregel for reklamasjon: 1) Sjekk om det er 2- eller 5-årsprodukt. 2) Er feilen selvforvoldt? 3) Tilby reparasjon/omlevering. Dette er rekkefølgen.',
      },
    ],
  },
  {
    phaseNumber: 7,
    icon: '🤝',
    title: 'Avtaleinngåelse — når er du bundet?',
    quote: '"Et tilbud + en aksept = en bindende avtale. Så enkelt, og så viktig."',
    content: 'I hverdagshandel tenker vi sjelden på avtaleinngåelse som et juridisk begrep. Men det er kritisk å forstå: fra hvilket punkt er kunden og selgeren bundet? Og hva skjer om en prislapp er feil?',
    subpoints: [
      { label: 'Avtalebinding', text: 'Avtale er bindende når et tilbud er mottatt og akseptert. Netthandel: ved mottatt ordrebekreftelse' },
      { label: 'Feilpriset vare', text: 'Er prisen åpenbart feil (utrolig lav), er selger ikke bundet. Kunden burde skjønne at det er feil' },
      { label: 'Tilbud og aksept', text: 'Prislapp i butikk er et tilbud. Kunden aksepterer ved kassen. Ingen binding til prislapp er akseptert' },
      { label: 'Netthandel', text: 'Ordrebekreftelse = bindende avtale. Varsel om at bestillingen er mottatt = ikke nødvendigvis bindende' },
    ],
    practical: 'Tenk over: Du bestiller en vare på nett. Du får en epost "vi har mottatt din bestilling". Er dette bindende? (Svar: ikke nødvendigvis — les vilkårene.)',
    exercises: [
      {
        id: 'rs7-1',
        icon: '🤝',
        title: 'Avtalebinding',
        question: 'En nettbutikk priser en TV til 99 kr ved en datafeil (normalpris 9 900 kr). Hundre kunder bestiller. Er nettbutikken bundet til prisen?',
        choices: [
          { id: 'a', label: 'Ja — bestillingen er bindende for begge parter', isCorrect: false, feedback: 'Åpenbar feilprisning kan frita selger. Kundene burde skjønt at 99 kr er feil.' },
          { id: 'b', label: 'Nei — åpenbar feilprisning er ikke bindende, kunder burde skjønt feilen', isCorrect: true, feedback: 'Riktig! Avtaleloven § 36 og forutsetningslæren kan frita selger ved åpenbar feil.' },
          { id: 'c', label: 'Avhenger av om kunden har fått ordrebekreftelse', isCorrect: false, feedback: 'Selv med ordrebekreftelse kan åpenbar feilprisning bestrides rettslig.' },
          { id: 'd', label: 'Ja — selger har alltid fullt ansvar for prisoppgitt på nett', isCorrect: false, feedback: 'Avtaleloven har unntak for åpenbar feil. Ingen rettsregel er absoluttisk.' },
        ],
        espenTip: 'Åpenbar feil-regelen: Jo mer åpenbar feilen er, jo svakere er bindingen. 99 kr for en TV er åpenbart feil. 9 800 kr for en TV priset 10 000 kr er ikke åpenbart feil.',
      },
    ],
  },
  {
    phaseNumber: 8,
    icon: '🚫',
    title: 'Misforståelse — bytterett er ikke lovfestet',
    quote: '"Åpent kjøp er en gave fra butikken. Reklamasjon er en rettighet fra loven. Forveksle dem ikke."',
    content: 'Den vanligste misforståelsen om forbrukerrettigheter er at "bytterett" eller "åpent kjøp" er en lovfestet rettighet. Det er det ikke. Det er en frivillig service butikkene tilbyr for å bygge lojalitet — og som de kan trekke tilbake når som helst.',
    subpoints: [
      { label: 'Bytterett', text: 'Frivillig service fra butikken. Ingen lovhjemmel. Butikken bestemmer vilkårene og kan nekte' },
      { label: 'Åpent kjøp', text: 'Frivillig tilbud om angrefrist i butikk. Uavhengig av Angrerettloven (som ikke gjelder i butikk)' },
      { label: 'Reklamasjon', text: 'Lovfestet rettighet. Kan ikke nektes. Gjelder ved feil og mangler' },
      { label: 'Kunden skjønner ikke forskjellen', text: 'Mange blander bytterett og reklamasjon. Som ansatt er det din jobb å forklare' },
    ],
    practical: 'Test deg selv: Kan du forklare forskjellen på bytterett, åpent kjøp og reklamasjon på en klar og enkel måte til en kunde som er frustrert? Øv på dette.',
    exercises: [
      {
        id: 'rs8-1',
        icon: '🚫',
        title: 'Bytterett-misforståelsen',
        question: 'En kunde kjøper en genser i riktig størrelse, men liker den ikke etter å ha prøvd den hjemme. Har kunden krav på å levere den tilbake?',
        choices: [
          { id: 'a', label: 'Ja — 14-dagers angrerett gjelder', isCorrect: false, feedback: 'Nei, kjøp over disk er unntatt fra Angrerettloven.' },
          { id: 'b', label: 'Ja — butikker er pålagt å tilby bytterett', isCorrect: false, feedback: 'Bytterett er frivillig og ikke lovpålagt.' },
          { id: 'c', label: 'Nei — "liker ikke" er ikke en mangel. Kunden er avhengig av butikkens frivillige bytterett', isCorrect: true, feedback: 'Riktig! Personlig smaksendring er ikke reklamasjonsgrunn. Kunden trenger butikkens frivillige bytteordning.' },
          { id: 'd', label: 'Avhenger av om kvitteringen er bevart', isCorrect: false, feedback: 'Kvittering er ikke relevant her — kunden har rett og slett ikke lovfestet rett til retur.' },
        ],
        espenTip: 'Mangel ≠ Misliker. Reklamasjon gjelder feil som forelå ved levering — ikke at kunden ombestemte seg. "Jeg vil ha bytterett" = spørsmål til butikken, ikke et lovkrav.',
      },
    ],
  },
  {
    phaseNumber: 9,
    icon: '📚',
    title: 'Lovverket — tre sentrale lover',
    quote: '"Tre lover, tre formål: Forbrukerkjøpsloven beskytter mot feil, Angrerettloven mot fjernsalg, Markedsføringsloven mot villedning."',
    content: 'Regelverket for servicebedrifter er forankret i tre sentrale lover. Å kjenne hovedtrekkene i disse er grunnleggende fagkompetanse for alle i salg og service.',
    subpoints: [
      { label: 'Forbrukerkjøpsloven', text: 'Reklamasjonsrett (2/5 år), rekkefølge for tiltak, bevisbyrde, definisjon av mangel' },
      { label: 'Markedsføringsloven', text: 'Forbud mot villedende markedsføring, krav til prisinformasjon, regler for "før- og nå-pris"' },
      { label: 'Angrerettloven', text: '14-dagers angrerett ved fjernsalg og dørsalg. Viktige unntak (overnatting, flybilletter)' },
      { label: 'Forbrukerrådet', text: 'Gratis klageorgan for forbrukere. Kan hjelpe med tvisteløsning uten domstol' },
    ],
    practical: 'Ressurs: Forbrukerrådet.no har en "Sjekk rettighetene dine"-guide som er lettlest og praktisk for alle i servicebransjen.',
    exercises: [
      {
        id: 'rs9-1',
        icon: '📚',
        title: 'Lovverkstest',
        question: 'En butikk annonserer "SALG — 60 % rabatt på alle møbler" men har bare hatt prisene 1 dag med gammel pris. Hvilken lov brytes?',
        choices: [
          { id: 'a', label: 'Forbrukerkjøpsloven — reklamasjonsretten krenkes', isCorrect: false, feedback: 'Forbrukerkjøpsloven gjelder feil og mangler, ikke villedende priskommunikasjon.' },
          { id: 'b', label: 'Markedsføringsloven — krav til "før-pris" i kampanjer er ikke oppfylt', isCorrect: true, feedback: 'Riktig! "Før-prisen" må ha vært reell og opprettholdt en viss tid for at salgsmarkedsføringen skal være lovlig.' },
          { id: 'c', label: 'Angrerettloven — kunden får ikke sin angrerett', isCorrect: false, feedback: 'Angrerettloven handler om fjernsalg og angrefrist, ikke prismarkedsføring.' },
          { id: 'd', label: 'Ingen lov brytes — butikken kan prise fritt', isCorrect: false, feedback: 'Markedsføringsloven og Forbrukertilsynet regulerer nettopp slike "kunstige" rabatter.' },
        ],
        espenTip: 'Markedsføringsloven + Forbrukertilsynet: Salgspris-kampanjer krever at "gammel pris" har vært reell og opprettholdt over en rimelig periode. Dagbasis holder ikke.',
      },
    ],
  },
  {
    phaseNumber: 10,
    icon: '🌟',
    title: 'Oppsummering — kunnskap som kundebeskyttelse',
    quote: '"Den ansatte som kjenner regelverket, beskytter kunden OG bedriften — og er urokkelig i krevende situasjoner."',
    content: 'Juridisk kunnskap i serviceyrker handler ikke om å bli advokat. Det handler om å møte kundene med trygghet, hjelpe dem med det loven gir dem, og beskytte bedriften mot uberettigede krav. Du er nå rustet til begge deler.',
    subpoints: [
      { label: 'Reklamasjon', text: '2 år (forbruksprodukt) eller 5 år (langvarige produkter). Reparasjon/omlevering → prisavslag → heving' },
      { label: 'Angrerett', text: '14 dager ved fjernsalg og dørsalg. Gjelder IKKE kjøp over disk eller enkelt-hotellovernatting' },
      { label: 'Garanti vs reklamasjon', text: 'Uavhengige. Utløpt garanti betyr ikke at reklamasjonsretten er borte' },
      { label: 'Bytterett', text: 'Frivillig service — ikke lovfestet rettighet' },
      { label: 'Lovene', text: 'Forbrukerkjøpsloven, Angrerettloven, Markedsføringsloven — kjenn de tre' },
    ],
    practical: 'Neste steg: Søk opp Forbrukerkjøpsloven på lovdata.no og les §§ 19-22 (reklamasjon). Det er lettlest og konkret.',
    exercises: [
      {
        id: 'rs10-1',
        icon: '🌟',
        title: 'Oppsummering',
        question: 'En kunde kjøper en laptop på nett, mottar den, og vil bruke angreretten etter 10 dager. Hva er riktig svar fra kundeservice?',
        choices: [
          { id: 'a', label: '"Angreretten er 7 dager, så fristen er utløpt."', isCorrect: false, feedback: 'Angreretten er 14 dager etter Angrerettloven — ikke 7.' },
          { id: 'b', label: '"Ja, du er innen 14-dagersfristen. Vi sender returlabel."', isCorrect: true, feedback: 'Riktig! Nettkjøp = angrerett. 10 dager < 14 dager. Selger plikter å tilby fri retur.' },
          { id: 'c', label: '"Angreretten gjelder bare for klær og ikke elektronikk."', isCorrect: false, feedback: 'Angrerettloven gjelder som utgangspunkt alle varer ved fjernsalg, inkludert elektronikk.' },
          { id: 'd', label: '"Du kan bruke angreretten, men du må betale returfrakten selv."', isCorrect: false, feedback: 'Selger plikter å tilby gratis retur ved bruk av angreretten etter Angrerettloven.' },
        ],
        espenTip: 'Angrerett-sjekkliste: Er det fjernsalg? Ja → 14 dager. Er kunden innen fristen? Ja → fri retur. Er det hotellovernatting? Nei → unntatt.',
      },
    ],
  },
]

export default function RegelverkServicebedrifterModule() {
  return (
    <DrawerModule
      moduleCode="OK-VG2-10"
      moduleTitle="Regelverk for servicebedrifter"
      moduleIcon="⚖️"
      storageKey="learning-vg2-regelverk-servicebedrifter"
      completeRoute="/learning/vg2/okonomi/regelverk-servicebedrifter/complete"
      phases={phases}
      intro="Lover og regler som styrer drift av servicebedrifter — fra kontraktsrett til forbrukerrettigheter."
      presentationLink={{ route: '/learning/presentations/regelverk-servicebedrifter', description: 'Regelverk for servicebedrifter — en visuell presentasjon' }}
    />
  )
}
