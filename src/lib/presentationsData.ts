export interface PresentationSlide { title: string; content: string }
export interface Presentation { id: string; title: string; subject: 'ssr_fd' | 'ssr_mi' | 'ssr_ks'; slides: PresentationSlide[] }

export const ALL_PRESENTATIONS: Presentation[] = [
  // ── Forretningsdrift ────────────────────────────────────────────────────────
  {
    id: 'regler-lovverk', title: 'Regler og lovverk for servicenæringen', subject: 'ssr_fd',
    slides: [
      { title: 'Regler og lovverk for servicenæringen', content: 'Hvilke lover og regler må bedrifter i service­næringen forholde seg til?' },
      { title: 'Arbeidsmiljøloven', content: 'Regulerer arbeidsforhold, arbeidstid, hvile­pauser og ansattes rettigheter og plikter' },
      { title: 'Forbrukerkjøpsloven', content: 'Beskytter forbrukere ved kjøp av varer og tjenester – reklamasjon og angrerett' },
      { title: 'Markedsføringsloven', content: 'Forbyr villedende reklame, skjult reklame og urimelige forretningsmetoder' },
      { title: 'GDPR og personvern', content: 'Regler for innsamling, lagring og bruk av personopplysninger om kunder og ansatte' },
      { title: 'Oppsummering', content: 'Lovverket er rammene bedriften opererer innenfor – brudd kan gi bøter og omdømmeskade' },
    ],
  },
  {
    id: 'organisasjon', title: 'Ansvarsfordeling, roller og organisasjonskart', subject: 'ssr_fd',
    slides: [
      { title: 'Ansvarsfordeling, roller og organisasjonskart', content: 'Hvordan strukturerer vi en bedrift for tydelig ansvar og effektivt samarbeid?' },
      { title: 'Organisasjonskart', content: 'Visuell fremstilling av hierarki, rapporteringslinjer og ansvarsområder i bedriften' },
      { title: 'Hierarkisk vs. flat struktur', content: 'Hierarki: klare kommando­linjer. Flat: kort vei til beslutninger og stor fleksibilitet' },
      { title: 'Linje- og stabsorganisasjon', content: 'Linjeledelse har direkte autoritet. Stab (HR, IT, økonomi) gir faglig støtte' },
      { title: 'Roller og ansvarsfordeling', content: 'Klare stillings­beskrivelser hindrer dobbeltarbeid og sikrer at oppgaver blir utført' },
      { title: 'Oppsummering', content: 'God organisering gir bedre resultater, trivsel og tydelig ansvarlighet' },
    ],
  },
  {
    id: 'verdikjeden', title: 'Verdikjeden og bærekraftig utvikling', subject: 'ssr_fd',
    slides: [
      { title: 'Verdikjeden og bærekraftig utvikling', content: 'Porters verdikjede viser hvordan bedriften skaper verdi fra råvare til ferdig produkt' },
      { title: 'Primæraktiviteter', content: 'Innkjøp, produksjon, logistikk, salg og markedsføring, og ettersalgsservice' },
      { title: 'Støtteaktiviteter', content: 'Infrastruktur, HRM, teknologi­utvikling og innkjøp/anskaffelse støtter primæraktivitetene' },
      { title: 'Sirkulær økonomi', content: 'Redusere, gjenbruke, resirkulere – lukke ressurs­sløyfene for å minimere avfall' },
      { title: 'Bærekraft i praksis', content: 'Grønn profil kan gi konkurransefortrinn, tiltrekke kunder og redusere kostnader' },
      { title: 'Oppsummering', content: 'Hvert ledd i verdikjeden er en mulighet til å skape verdi og redusere miljøavtrykk' },
    ],
  },
  {
    id: 'prissetting', title: 'Prissetting', subject: 'ssr_fd',
    slides: [
      { title: 'Prissetting', content: 'Riktig pris balanserer lønnsomhet, kundeverdi og konkurransesituasjon' },
      { title: 'Kostnadsbasert prising', content: 'Pris = kostnader + ønsket dekningsbidrag. Enkel, men tar ikke hensyn til markedet' },
      { title: 'Markedsbasert prising', content: 'Pris fastsettes ut fra hva kundene er villige til å betale – betalingsvillighet' },
      { title: 'Konkurransebasert prising', content: 'Prisen settes i forhold til konkurrentenes priser – pris-leder vs. pris-følger' },
      { title: 'Yield management', content: 'Dynamisk prising etter etterspørsel og kapasitet – brukt i hotell, fly og arrangementer' },
      { title: 'Oppsummering', content: 'Prising er strategi – velg metode basert på kostnader, marked og bedriftens mål' },
    ],
  },
  {
    id: 'regnskap', title: 'Regnskap, budsjett og lønnsomhet', subject: 'ssr_fd',
    slides: [
      { title: 'Regnskap, budsjett og lønnsomhet', content: 'Tallenes tale – forstå bedriftens økonomi og ta bedre beslutninger' },
      { title: 'Budsjett vs. regnskap', content: 'Budsjett er plan. Regnskap er virkeligheten. Avviksanalyse viser hva som gikk galt eller riktig' },
      { title: 'Resultatregnskap', content: 'Inntekter − Kostnader = Resultat. Viser om bedriften tjener eller taper penger' },
      { title: 'Dekningsbidrag og dekningsgrad', content: 'DB = Salgsinntekt − Variable kostnader. DG = DB / Salgsinntekt × 100 %' },
      { title: 'Faste og variable kostnader', content: 'Faste kostnader endres ikke med produksjons­volumet. Variable kostnader følger aktiviteten' },
      { title: 'Likviditet og soliditet', content: 'Likviditet: evne til å betale løpende forpliktelser. Soliditet: andelen egenkapital av totalkapital' },
    ],
  },
  {
    id: 'risikovurdering', title: 'Risikovurdering og forebyggende tiltak', subject: 'ssr_fd',
    slides: [
      { title: 'Risikovurdering og forebyggende tiltak', content: 'Identifiser, vurder og reduser risiko før noe går galt' },
      { title: 'Hva er risiko?', content: 'Risiko = sannsynlighet × konsekvens. Alle bedrifter har risiko – poenget er å håndtere den' },
      { title: 'ROS-analyse', content: 'Risiko- og sårbarhetsanalyse: kartlegg farer, vurder sannsynlighet og konsekvens, prioriter tiltak' },
      { title: 'Forebyggende tiltak', content: 'Tekniske (utstyr, rutiner) og organisatoriske (opplæring, ansvarsfordeling) tiltak' },
      { title: 'Kontinuerlig forbedring', content: 'Risikovurdering er ikke engangs – gjennomfør jevnlig og etter avvik' },
      { title: 'Oppsummering', content: 'Systematisk risiko­arbeid beskytter ansatte, kunder og bedriftens økonomi' },
    ],
  },
  {
    id: 'beredskapsplaner', title: 'Beredskapsplaner', subject: 'ssr_fd',
    slides: [
      { title: 'Beredskapsplaner', content: 'En beredskapsplan sikrer at alle vet hva de skal gjøre i en krise eller nødsituasjon' },
      { title: 'Hva skal planen inneholde?', content: 'Varslings­rutiner, ansvarsroller, ressursoversikt og kommunikasjons­plan for kriser' },
      { title: 'Varsling og kommunikasjon', content: 'Hvem varsles? I hvilken rekkefølge? Interne og eksterne kontaktpunkter må være klare' },
      { title: 'Handling under krise', content: 'Ro, oversikt og klare kommando­linjer er avgjørende for effektiv krise­håndtering' },
      { title: 'Øvelse og vedlikehold', content: 'En plan som ikke øves er en plan som svikter – gjennomfør regelmessige øvelser og oppdateringer' },
      { title: 'Oppsummering', content: 'God beredskap reduserer skade, sikrer ansatte og gjenoppretter drift raskere' },
    ],
  },
  {
    id: 'hms', title: 'Helse, miljø og sikkerhet (HMS)', subject: 'ssr_fd',
    slides: [
      { title: 'Helse, miljø og sikkerhet (HMS)', content: 'HMS handler om å skape et trygt, sunt og trivelig arbeidsmiljø for alle' },
      { title: 'Internkontroll', content: 'Bedriften skal systematisk kartlegge farer, innføre tiltak og dokumentere HMS-arbeidet' },
      { title: 'Verneombud og AMU', content: 'Verneombudet representerer ansatte i HMS-saker. AMU er arbeidsmiljøutvalget (>50 ansatte)' },
      { title: 'Fysisk og psykososialt miljø', content: 'Ergonomi, støy og luftkvalitet + trivsel, inkludering og forebygging av mobbing' },
      { title: 'Arbeidstilsynet', content: 'Statlig tilsyn som kontrollerer at arbeidsplassen følger HMS-regelverket – brudd gir pålegg' },
      { title: 'Oppsummering', content: 'Godt HMS-arbeid øker trivsel, reduserer sykefravær og styrker bedriftens omdømme' },
    ],
  },

  // ── Markedsføring og innovasjon ──────────────────────────────────────────────
  {
    id: 'regelverk-markedsforing', title: 'Regelverk for markedsføring og salg', subject: 'ssr_mi',
    slides: [
      { title: 'Regelverk for markedsføring og salg', content: 'Lovverket setter grenser for hvordan bedrifter kan markedsføre seg – uten å villede forbrukere' },
      { title: 'Forbrukertilsynet', content: 'Overvåker at markedsføring er lovlig, redelig og ikke villedende – kan forby og bøtelegge' },
      { title: 'Regler for reklame', content: 'Reklame skal være tydelig merket. Sammenlignende reklame er tillatt, men faktabasert' },
      { title: 'Skjult reklame', content: 'Influencer-samarbeid og sponset innhold skal merkes tydelig – "Annonse" eller "#reklame"' },
      { title: 'Etisk markedsføring', content: 'Unngå kjønns­diskriminerende, stereotypisk eller krenkende reklame' },
      { title: 'Oppsummering', content: 'Lovlig og etisk markedsføring bygger tillit og langsiktige kunde­relasjoner' },
    ],
  },
  {
    id: 'forretningsidee', title: 'Forretningsidé', subject: 'ssr_mi',
    slides: [
      { title: 'Forretningsidé', content: 'En god forretningsidé løser et reelt behov bedre, raskere eller billigere enn alternativene' },
      { title: 'Visjon og misjon', content: 'Visjon: hvor vil vi? Misjon: hvorfor eksisterer vi? Disse styrer alle beslutninger' },
      { title: 'Behovsanalyse', content: 'Kartlegg målgruppens smerte­punkter – hva savner de, hva irriterer dem, hva ønsker de?' },
      { title: 'USP – Unikt salgsargument', content: 'Hva gjør din bedrift unik? USP er grunnen kunden velger deg fremfor konkurrenten' },
      { title: 'Innovasjon', content: 'Radikal (nytt marked) vs. inkrementell innovasjon (forbedring av eksisterende produkt/tjeneste)' },
      { title: 'Oppsummering', content: 'En sterk forretningsidé kombinerer reelt behov, unik verdi og gjennomførbarhet' },
    ],
  },
  {
    id: 'forbrukeratferd', title: 'Forbrukeratferd og målgrupper', subject: 'ssr_mi',
    slides: [
      { title: 'Forbrukeratferd og målgrupper', content: 'Forstå hvem kundene dine er og hva som driver kjøpsbeslutningene deres' },
      { title: 'Kjøpsprosessen', content: 'Behovs­erkjennelse → informasjonssøk → evaluering → kjøp → etterkjøpsvurdering' },
      { title: 'Maslows behovshierarki', content: 'Fra fysiologiske behov til selvrealisering – forstå hvilke behov produktet ditt tilfredsstiller' },
      { title: 'STP-modellen', content: 'Segmentering: del markedet opp. Targeting: velg segment. Posisjonering: plasser deg i sinnet til kunden' },
      { title: 'Indre og ytre påvirkning', content: 'Motivasjon, holdninger, referansegrupper og kultur påvirker hva vi kjøper' },
      { title: 'Oppsummering', content: 'Kjenner du kunden, kan du kommunisere rett budskap til rett person på rett tidspunkt' },
    ],
  },
  {
    id: 'konkurransemidlene', title: 'Konkurransemidler', subject: 'ssr_mi',
    slides: [
      { title: 'Konkurransemidler', content: 'De fem P-ene: Produkt, Pris, Plass, Påvirkning og Personale' },
      { title: 'Produkt', content: 'Kjerneprodukt, faktisk produkt og utvidet produkt – hva tilbyr vi egentlig kunden?' },
      { title: 'Pris og distribusjon', content: 'Pris signaliserer kvalitet. Distribusjon (Plass) avgjør hvor og hvordan kunden får produktet' },
      { title: 'Påvirkning (Promotering)', content: 'AIDA-modellen: Attention → Interest → Desire → Action – veien fra ukjent til kjøper' },
      { title: 'Personale', content: 'Ansatte er en del av produktet i serviceyrker – kompetanse og service er konkurransefortrinn' },
      { title: 'Oppsummering', content: 'En koordinert bruk av alle P-ene gir det sterkeste konkurransefortrinnet' },
    ],
  },
  {
    id: 'markedsplan', title: 'Markedsplan', subject: 'ssr_mi',
    slides: [
      { title: 'Markedsplan', content: 'En markedsplan er bedriftens veikart for å nå sine markeds­mål – konkret og tidsbestemt' },
      { title: 'Situasjonsanalyse', content: 'Kartlegg nå-situasjonen: interne styrker/svakheter og eksterne muligheter/trusler' },
      { title: 'SWOT-analyse', content: 'Strengths, Weaknesses, Opportunities, Threats – grunnlaget for strategivalg' },
      { title: 'SMART-mål', content: 'Spesifikke, Målbare, Attraktive, Realistiske og Tidsbestemte mål gir retning og framdrift' },
      { title: 'Tiltak og budsjett', content: 'Konkrete handlinger, ansvarlige og tidsfrister koblet til et realistisk markedsbudsjettet' },
      { title: 'Oppsummering', content: 'En god markedsplan koordinerer innsats, ressurser og prioriteringer mot klare mål' },
    ],
  },
  {
    id: 'kampanje', title: 'Markedsføringskampanje', subject: 'ssr_mi',
    slides: [
      { title: 'Markedsføringskampanje', content: 'En kampanje er en koordinert serie tiltak for å nå et spesifikt markeds­mål i en periode' },
      { title: 'AIDA-modellen', content: 'Attention: fang oppmerksomheten. Interest: vekk interesse. Desire: skap ønske. Action: kjøp!' },
      { title: 'Budskapsutforming', content: 'Hva er kjernebudskapet? Hvilken tone? Rasjonell vs. emosjonell appell?' },
      { title: 'Kanalvalg', content: 'Sosiale medier, søke­motor, e-post, OOH eller PR – velg kanaler der målgruppen er' },
      { title: 'Måling og evaluering', content: 'KPI-er som rekkevidde, klikk, konvertering og ROI viser om kampanjen lyktes' },
      { title: 'Oppsummering', content: 'En vellykket kampanje kombinerer klart budskap, riktige kanaler og kontinuerlig måling' },
    ],
  },
  {
    id: 'salg', title: 'Salg', subject: 'ssr_mi',
    slides: [
      { title: 'Salg', content: 'Profesjonelt salg er å hjelpe kunden finne den beste løsningen på sitt behov' },
      { title: 'Kontaktfasen', content: 'Første inntrykk teller – smil, øyekontakt, åpen kroppsspråk og en god åpnings­setning' },
      { title: 'Behovs­kartlegging', content: 'Still åpne spørsmål, lytt aktivt og identifiser kundens egentlige behov og motivasjon' },
      { title: 'Løsnings­presentasjon', content: 'Knytt produktets egenskaper til kundens behov – vis verdi, ikke bare funksjoner' },
      { title: 'Innvendinger og avslutning', content: 'Møt innvendinger med empati og fakta. Avslutt med en tydelig kjøps­oppfordring' },
      { title: 'Oppsummering', content: 'God selger = god lytter. Forstå kunden, skap tillit og tilby riktig løsning' },
    ],
  },
  {
    id: 'teknologi-ki', title: 'Teknologi og KI i salg', subject: 'ssr_mi',
    slides: [
      { title: 'Teknologi og KI i salg og markedsføring', content: 'Digitale verktøy og kunstig intelligens transformerer hvordan bedrifter selger og kommuniserer' },
      { title: 'CRM-systemer', content: 'Customer Relationship Management – samler kunde­data for bedre oppfølging og salgs­muligheter' },
      { title: 'Chatbots og AI-assistenter', content: 'Svarer kunder 24/7, kvalifiserer leads og avlaster selgere for rutinespørsmål' },
      { title: 'Personalisering', content: 'Algoritmer analyserer atferd og anbefaler relevante produkter – Amazon, Netflix, TikTok' },
      { title: 'Etiske utfordringer', content: 'Privatliv, datamisbruk, algoritmisk bias og avhengighets­skapende design er reelle utfordringer' },
      { title: 'Oppsummering', content: 'KI er et verktøy – bedrifter som bruker det ansvarlig og kreativt får konkurranse­fortrinn' },
    ],
  },
  {
    id: 'administrative-funksjoner', title: 'Administrative funksjoner', subject: 'ssr_mi',
    slides: [
      { title: 'Administrative funksjoner', content: 'Effektiv administrasjon er ryggraden som gjør at salg og service kan fungere smidig' },
      { title: 'Ordre­håndtering', content: 'Fra bestilling mottas til varen er levert – hver prosess­steg teller for kunde­tilfreds­heten' },
      { title: 'Lagerstyring', content: 'Optimalt lager­nivå balanserer service­grad og binde­kapital – for mye eller lite er kostbart' },
      { title: 'Fakturering og betalings­oppfølging', content: 'Nøyaktig fakturering og rask oppfølging av ubetalte fordringer sikrer god likviditet' },
      { title: 'Rutiner og dokumentasjon', content: 'Klare rutiner og god dokumentasjon reduserer feil, sikrer kontinuitet og letter opplæring' },
      { title: 'Oppsummering', content: 'Gode administrative rutiner frigjør tid til kundekontakt og verdiskapende aktiviteter' },
    ],
  },

  // ── Kultur og samhandling ────────────────────────────────────────────────────
  {
    id: 'partene-arbeidslivet', title: 'Partene i arbeidslivet', subject: 'ssr_ks',
    slides: [
      { title: 'Partene i arbeidslivet', content: 'Norsk arbeidsliv bygger på samarbeid mellom arbeidsgiver, arbeidstaker og stat – trepartsmodellen' },
      { title: 'Fagforeninger og arbeidsgiverorganisasjoner', content: 'LO er Norges største fagforbund. NHO er den største arbeidsgiverorganisasjonen. Begge forhandler om lønn og vilkår' },
      { title: 'Tariffavtaler', content: 'Kollektive avtaler mellom fagforeninger og arbeidsgiver­organisasjoner som regulerer lønn og arbeidsvilkår' },
      { title: 'Trepartssamarbeidet', content: 'Stat, arbeidsgivere og arbeidstakere samarbeider om lønnsdannelse og arbeidslivs­politikk' },
      { title: 'Streik og lockout', content: 'Siste utvei ved brutte forhandlinger – regulert av arbeidstvistloven med varsel og megling' },
      { title: 'Oppsummering', content: 'Trepartssamarbeidet gir Norge lav arbeidsledighet, høy produktivitet og jevn inntektsfordeling' },
    ],
  },
  {
    id: 'relasjonsbygging', title: 'Relasjonsbygging og nettverk', subject: 'ssr_ks',
    slides: [
      { title: 'Relasjonsbygging og nettverk', content: 'Sterke relasjoner er fundamentet for langsiktig suksess i service­yrker' },
      { title: 'Lojalitetsstigen', content: 'Potensielle kunder → kunder → faste kunder → ambassadører – bygg relasjoner som klatrer oppover' },
      { title: 'Interne relasjoner', content: 'Gode relasjoner internt (kollegaer, ledelse) skaper trivsel, samarbeid og bedre service utad' },
      { title: 'Nettverk i praksis', content: 'Delta på bransje­arrangementer, bruk LinkedIn, hold kontakten – nettverk er langsiktig investering' },
      { title: 'Tillit som valuta', content: 'Tillit bygges gjennom konsistens, ærlighet og å holde det man lover – og tapes raskt' },
      { title: 'Oppsummering', content: 'Investér i relasjoner – de gir gjenkjøp, anbefalinger og samarbeids­muligheter over tid' },
    ],
  },
  {
    id: 'etikk-baerekraft', title: 'Etikk og bærekraft', subject: 'ssr_ks',
    slides: [
      { title: 'Etikk og bærekraft', content: 'Etisk adferd og bærekraftig drift er ikke bare riktig – det er god forretning' },
      { title: 'Forretningsetikk', content: 'Normer for hva som er riktig og galt i forretnings­messige sammenhenger – fra hverdags­valg til store dilemmaer' },
      { title: 'CSR – Corporate Social Responsibility', content: 'Bedriftens ansvar overfor ansatte, lokalsamfunn, miljø og fremtidige generasjoner' },
      { title: 'Personlig etisk ansvar', content: 'Etikk starter med den enkelte – varsling, integritet og mot til å si ifra' },
      { title: 'FNs bærekraftsmål', content: '17 mål for en bedre verden – bedrifter kan bidra gjennom sin kjernevirksomhet' },
      { title: 'Oppsummering', content: 'Etisk og bærekraftig praksis bygger omdømme, tiltrekker talent og gir langsiktig lønnsomhet' },
    ],
  },
  {
    id: 'kommunikasjon', title: 'Kommunikasjon og kundebehandling', subject: 'ssr_ks',
    slides: [
      { title: 'Kommunikasjon og kundebehandling', content: 'God kommunikasjon er grunnlaget for all god service og samarbeid' },
      { title: 'Kommunikasjons­prosessen', content: 'Sender → budskap → kanal → mottaker → tilbakemelding – støy kan oppstå i hvert ledd' },
      { title: 'Aktiv lytting', content: 'Lytt for å forstå, ikke for å svare – bruk bekreftelse, oppsummering og åpne spørsmål' },
      { title: 'Ikke-verbal kommunikasjon', content: 'Kroppsspråk, ansikts­uttrykk og tonefall formidler ofte mer enn ordene vi sier' },
      { title: 'Kulturelle forskjeller', content: 'Direkte vs. indirekte kommunikasjon, kroppsspråk og høflighets­normer varierer på tvers av kulturer' },
      { title: 'Oppsummering', content: 'Bevisst kommunikasjon reduserer misforståelser og skaper bedre kunde- og kollegaopplevelser' },
    ],
  },
  {
    id: 'vertskapsrollen', title: 'Vertskapsrollen', subject: 'ssr_ks',
    slides: [
      { title: 'Vertskapsrollen', content: 'Fra kunde til gjest – å gi gjesten en opplevelse som overgår forventningene' },
      { title: 'Hva er god vertskap?', content: 'Gjesten skal føle seg sett, velkommen og ivaretatt fra første til siste kontakt­punkt' },
      { title: '"Det lille ekstra"', content: 'Service som overgår forventningene huskes lenge – det lille ekstra er gratis å gi' },
      { title: 'Service­trappen', content: 'Fysisk produkt → service → relasjoner → totalopp­levelse – klatre ett trappetrinn av gangen' },
      { title: 'Profesjonell adferd', content: 'Dress code, pålitelighet, diskresjon og positiv holdning er kjennetegn på en god servicemedarbeider' },
      { title: 'Oppsummering', content: 'Vertskaps­rollen handler om å skape minner – gjester som husker deg, kommer tilbake' },
    ],
  },
  {
    id: 'konflikt-nod', title: 'Konflikt- og nødssituasjonshåndtering', subject: 'ssr_ks',
    slides: [
      { title: 'Konflikt- og nødssituasjonshåndtering', content: 'Vet du hva du gjør når det virkelig gjelder? Forberedelse redder liv og situasjoner' },
      { title: 'Konflikt­eskalering', content: 'Konflikter trapper opp i stadier – jo tidligere du griper inn, jo enklere er det å løse' },
      { title: 'De-eskalerings­teknikker', content: 'Rolig stemme, åpent kroppsspråk, empati og aktiv lytting demper opphissede situasjoner' },
      { title: 'Nødssituasjoner', content: 'DHLR: Defibrilator, Hjerte-lunge-redning, Livredning, Ringe 113 – kjenner du prosedyrene?' },
      { title: 'Varslings­rutiner', content: 'Hvem varsles, i hvilken rekkefølge og hvordan? Klare rutiner hindrer panikk og forvirring' },
      { title: 'Oppsummering', content: 'Øvelse gjør mester – kjennskap til prosedyrer gir trygghet og raskere riktig handling' },
    ],
  },
  {
    id: 'klaghandtering', title: 'Klagehåndtering og konfliktforebygging', subject: 'ssr_ks',
    slides: [
      { title: 'Klagehåndtering og konfliktforebygging', content: 'En klage er en gave – kunden gir deg en sjanse til å rette opp feilen og beholde lojaliteten' },
      { title: 'Forebygging er billigst', content: 'Klar kommunikasjon, realistiske forventninger og god onboarding reduserer klager' },
      { title: 'LEST-modellen', content: 'Lytt – Erkjenn – Spør/løs – Takk for tilbakemeldingen. En enkel ramme for klage­håndtering' },
      { title: 'Service recovery', content: 'Rask, oppriktig og raus kompensasjon etter feil kan gjøre kunden mer lojal enn om feilen aldri skjedde' },
      { title: 'Dokumentasjon', content: 'Loggfør klager og avvik – mønstere avslører systemfeil som kan forbedres' },
      { title: 'Oppsummering', content: 'God klage­håndtering snur negativ opplevelse til positiv – og gir verdifull innsikt til forbedring' },
    ],
  },
]

/** Map from MINE_FAG_OPTIONS id (e.g. 'ssr_fd_vg1') to subject key */
export function subjectFromFagId(fagId: string): 'ssr_fd' | 'ssr_mi' | 'ssr_ks' | null {
  if (fagId.startsWith('ssr_fd')) return 'ssr_fd'
  if (fagId.startsWith('ssr_mi')) return 'ssr_mi'
  if (fagId.startsWith('ssr_ks')) return 'ssr_ks'
  return null
}

export function getPresentationsForSubject(fagId: string): Presentation[] {
  const subject = subjectFromFagId(fagId)
  if (!subject) return ALL_PRESENTATIONS
  return ALL_PRESENTATIONS.filter(p => p.subject === subject)
}
