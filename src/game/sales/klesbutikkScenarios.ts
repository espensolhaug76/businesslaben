// ─── KLESBUTIKK-SALGSSCENARIER (BRANSJE 2) — Espen-godkjent innhold ──────────
//
// Samme forgrenings-format og kvalitet som kafeens scenarier (scenarios.ts). Alle
// er OPPSØKENDE salg: eleven tar kontakt med en kunde som står på gulvet. Derfor
// starter ALLE med åpningssteget «Ta kontakt» med tre valg:
//   (A) observasjonsbasert åpning — knytter an til det kunden faktisk gjør (best)
//   (B) standard «Hei! Kan jeg hjelpe deg?» — høflig, men lukker ofte («nei takk,
//       bare ser») → samtalen må gjenåpnes (ett ekstra steg, `gjenapne`)
//   (C) vente / smile og la kunden være — RIKTIG for noen kunder (browsere), FEIL
//       for andre (utålmodige/utilpasse) → konsekvens i feedback, aldri fasit.
// Åpningsvalget påvirker tone/vanskelighet, men LÅSER ikke utfallet.
//
// INAKTIVE: står IKKE i noen scenariePool (industryDefinition.ts) — kun
// tilgjengelig via dev-scenariovelgeren i Interiør-vyen (KlesbutikkStillas).
// Kundene + sprite hentes fra klesbutikkKunder.ts (registeret).

import type { SalesScenario } from './types'
import { kasseKundeById } from '../data/klesbutikkKunder'

const S = (kundeId: string): string => kasseKundeById(kundeId)?.sprite ?? ''

// Klesbutikk-sortiment-nøkkelord for `sell`/`recommend` (matches mot produkt
// navn+id). Klesbutikken er ikke aktiv bransje ennå, så disse er foroverpekende
// — Espen finpusser mot faktisk sortiment ved aktivering.
const BLAZER_TAGS = ['blazer', 'dressjakke']
const KJOLE_TAGS = ['kjole', 'maxikjole', 'strikkekjole', 'sommerkjole']
const GENSER_TAGS = ['genser', 'strikk', 'cardigan']
const TILBEHOR_TAGS = ['skjerf', 'lue', 'veske', 'belte']

// ═══ 1. «Angrekjøpet» — mann-skjegg-pakke (retur, service/rykte) ══════════════
// KJERNE (forbrukerjus): angrerett gjelder NETTHANDEL, ikke kjøp i fysisk butikk.
// Bytterett i butikk er FRIVILLIG service dere tilbyr — god service uten å tape
// ansikt, og uten å love mer enn dere må. Avsluttes ved kassen.
export const ANGREKJOPET: SalesScenario = {
  id: 'angrekjopet',
  customerName: 'Kunde med pose',
  personaTag: 'Prisbevisste',
  sprite: S('mann-skjegg-pakke'),
  outcomeKind: 'service',
  avsluttesVedKasse: true,
  description: 'En mann kommer inn med en pose og en genser han kjøpte i butikken forrige uke. Han har angret seg og vil ha pengene tilbake. Genseren feiler ingenting.',
  hiddenNeed: 'Vil ordne opp uten å tape ansikt — helst pengene tilbake, men lar seg lose til bytte/tilgodelapp hvis han blir møtt ryddig og uten pekefinger.',
  steps: [
    {
      id: 'kontakt',
      customerLine: '(står ved kassen med posen i hånda, litt utålmodig, søker blikkontakt)',
      note: 'Ta kontakt. Han VIL bli sett — han står klar med en sak.',
      choices: [
        { id: 'k_a', text: '(går bort) Hei! Ser du har med deg noe — hva kan jeg hjelpe deg med?', quality: 'good', next: 'sak',
          feedback: 'Observasjonsbasert og imøtekommende: du ser at han har en sak og inviterer ham til å fortelle. God start på en potensielt kinkig samtale.' },
        { id: 'k_b', text: 'Hei! Kan jeg hjelpe deg med noe?', quality: 'warn', next: 'gjenapne',
          feedback: 'Høflig standardåpning, men litt intetsigende når han tydelig står med en RETUR-sak. Det går fint — men du fikk ikke helt tak i situasjonen med en gang.' },
        { id: 'k_c', text: '(smiler kort og lar ham stå til han sier ifra)', quality: 'bad', next: 'sak',
          feedback: 'Feil kunde å la vente. Han står klar med en sak og blir bare mer irritert av å bli oversett — å «gi rom» passer browsere, ikke en som venter på hjelp.' },
      ],
    },
    {
      id: 'gjenapne',
      customerLine: 'Jo … jeg har faktisk en sak. Kjøpte denne genseren her forrige uke.',
      note: 'Han åpner selv likevel — følg opp saken hans nå.',
      choices: [
        { id: 'gj_a', text: 'Så klart — fortell, hva gjelder det?', quality: 'good',
          feedback: 'Du fanger tråden fint opp og lar ham legge fram saken. Ingen skade skjedd.' },
        { id: 'gj_b', text: 'Ok. Har du kvittering?', quality: 'warn',
          feedback: 'Du hopper rett på formalia før du vet hva saken er. Litt kjølig inngang på noe som kanskje er en enkel sak.' },
      ],
    },
    {
      id: 'sak',
      customerLine: 'Jeg har rett og slett angret meg. Den var dyr, og jeg trenger den ikke likevel. Jeg vil ha pengene tilbake.',
      note: 'KJERNE: han sier «angret» — og genseren feiler ingenting. Hva sier reglene EGENTLIG?',
      choices: [
        { id: 'sak_a', text: 'Det skal vi finne ut av sammen. Er det noe feil på den, eller har du bare ombestemt deg?', quality: 'good', next: 'jus',
          feedback: 'Klokt: du skiller mellom MANGEL (reklamasjon, egne regler) og ANGRET KJØP (frivillig bytte) før du konkluderer. Riktig rekkefølge.' },
        { id: 'sak_b', text: 'Å nei, angrekjøp gir vi ikke penger tilbake for.', quality: 'warn', next: 'jus',
          feedback: 'Du lander på nesten riktig konklusjon, men slår den fast før du har hørt ferdig — og «gir ikke» høres mer avvisende ut enn nødvendig.' },
        { id: 'sak_c', text: 'Klart det, jeg fikser refusjon med en gang.', quality: 'warn', next: 'refusjon',
          feedback: 'Snill, men du gir bort penger butikken IKKE er forpliktet til — uten å vurdere bytte/tilgodelapp først. Grei kunde, men dårlig presedens.' },
      ],
    },
    {
      id: 'jus',
      customerLine: 'Nei da, det er ikke noe feil på den. Men jeg har jo ANGRERETT, har jeg ikke?',
      note: 'KJERNE-fagord: angrerett vs. bytterett vs. reklamasjon. Vær faglig trygg — og løsningsorientert.',
      choices: [
        { id: 'jus_a', text: 'Angreretten gjelder faktisk netthandel og salg utenom butikk — ikke kjøp i butikk. Men vi tilbyr GJERNE bytte eller en tilgodelapp, det ordner vi fint.', quality: 'good', next: 'losning',
          feedback: 'Helt riktig: angreretten (angrerettloven) gjelder fjernsalg/netthandel, ikke kjøp i fysisk butikk. Bytterett i butikk er frivillig service — og du tilbyr den løsningsorientert. Faglig trygt, uten å tape ansikt for noen.' },
        { id: 'jus_b', text: 'Hmm, jeg tror kanskje det bare gjelder på nett? Jeg er litt usikker …', quality: 'warn', next: 'losning',
          feedback: 'Du er på rett spor, men vingler. Kunne du skillet angrerett/bytterett tryggere, sto du stødigere i samtalen.' },
        { id: 'jus_c', text: 'Nei, det har du ikke krav på her. Kjøpet er ditt ansvar.', quality: 'bad', next: 'losning',
          feedback: 'Jussen er teknisk riktig (ingen angrerett i butikk), men leveringen er kald og lukket. Du sier bare NEI uten å tilby bytte/tilgodelapp — kunden går skuffet, og forskjellen på et blankt avslag og en god serviceløsning er nettopp det som avgjør om han kommer tilbake.' },
      ],
    },
    {
      id: 'refusjon',
      customerLine: 'Så jeg får pengene tilbake? Fint.',
      note: 'Du valgte å refundere. Reflekter over presedensen — men fullfør ryddig ved kassen.',
      choices: [
        { id: 'ref_a', text: 'Ja — men da tar vi det som en engangs-service, ikke en regel. (fullfører ved kassen)', quality: 'warn', cost: 599, next: 'kasse',
          feedback: 'Du redder stemningen og unngår konflikt, men refunderer noe butikken ikke må — og markerer i det minste at det er et unntak. Mentor-refleksjon: gir du full refusjon på angrekjøp, skaper du en forventning neste kunde også vil ha.' },
      ],
    },
    {
      id: 'losning',
      customerLine: 'Ok … hva kan jeg få, da?',
      note: 'Land en konkret løsning. Bytte eller tilgodelapp holder butikken skadesløs OG kunden fornøyd.',
      choices: [
        { id: 'los_a', text: 'Du kan bytte den i noe annet i dag, eller få en tilgodelapp på beløpet som varer i ett år. Hva passer best?', quality: 'good', next: 'kasse',
          feedback: 'Perfekt landing: en frivillig, raus serviceløsning som holder butikken skadesløs og lar kunden gå fornøyd. Ingen tapte penger, ingen tapt ansikt.' },
        { id: 'los_b', text: 'Jeg kan gi deg en tilgodelapp, men da må du bruke den innen en uke.', quality: 'warn', next: 'kasse',
          feedback: 'En løsning, men den korte fristen gjør tilbudet smålig. Du gir med den ene hånda og tar med den andre.' },
        { id: 'los_c', text: 'Vi kan dessverre ikke gjøre noe. Kjøpet er gjort.', quality: 'bad', next: 'kasse',
          feedback: 'Du hadde en enkel, gratis serviceløsning (bytte/tilgodelapp) og lot være. Kunden går misfornøyd, og butikken taper goodwill helt unødvendig.' },
      ],
    },
    {
      id: 'kasse',
      customerLine: '(ved kassen) Greit, det høres ok ut.',
      note: 'Oppgjøret skjer ved kassen. Sisteinntrykket avgjør om han kommer tilbake.',
      choices: [
        { id: 'kas_a', text: 'Da ordner vi det her. Takk for at du tok turen innom i stedet for å bli sur hjemme — velkommen tilbake!', quality: 'good',
          feedback: 'Varm, avvæpnende avslutning. Du snudde en retur-sak til en god opplevelse — det er sånt kunder forteller videre.' },
        { id: 'kas_b', text: 'Værsågod. Ha en fin dag.', quality: 'warn',
          feedback: 'Korrekt, men flatt etter en sak der du kunne bygd litt ekstra goodwill på tampen.' },
        { id: 'kas_c', text: '(ekspederer ferdig uten å si mer)', quality: 'bad',
          feedback: 'Kald avslutning som understreker at dette var et NEI, ikke en service. Han husker følelsen, ikke regelen.' },
      ],
    },
  ],
}

// ═══ 2. «Jobbintervjuet» — ung-dame-skjerf (behovsavklaring, mersalg) ═════════
// KJERNE: avdekk den EGENTLIGE anledningen før du roser eller selger. Ærlig råd
// bygger tillit (og riktig salg); ren smiger gir salg i dag, men mistrivsel +
// rykteeffekt etterpå.
export const JOBBINTERVJUET: SalesScenario = {
  id: 'jobbintervjuet',
  customerName: 'Kunde ved speilet',
  personaTag: 'Karriereorienterte',
  sprite: S('ung-dame-skjerf'),
  outcomeKind: 'sale',
  description: 'En ung kunde står foran speilet i en blazer hun har prøvd. Hun vrir seg litt og spør: «Ser denne bra ut?»',
  hiddenNeed: 'Har jobbintervju i morgen og er usikker. Trenger et ÆRLIG råd, ikke smiger — vil gå ut med noe som faktisk sitter og gir henne selvtillit.',
  steps: [
    {
      id: 'kontakt',
      customerLine: '(foran speilet i blazer) Ser denne bra ut, synes du?',
      note: 'Hun spør DEG direkte. Ta kontakt på det hun faktisk gjør.',
      choices: [
        { id: 'k_a', text: 'Den kler deg godt! Skal den brukes til noe spesielt — så finner vi den som sitter aller best?', quality: 'good', next: 'anledning',
          feedback: 'Observasjonsbasert: du svarer på spørsmålet OG åpner for å avdekke anledningen. Da kan du gi ekte råd, ikke bare et høflig «fin».' },
        { id: 'k_b', text: 'Hei! Kan jeg hjelpe deg med noe?', quality: 'warn', next: 'gjenapne',
          feedback: 'Litt på siden — hun stilte jo nettopp et konkret spørsmål, og du overhørte det. Høflig, men du mistet cue-en.' },
        { id: 'k_c', text: '(smiler og lar henne studere seg selv i fred)', quality: 'warn', next: 'anledning',
          feedback: 'Å gi rom er fint iblant — men hun spurte deg direkte, så her ble det å overse en åpen invitasjon. Litt bom på timingen.' },
      ],
    },
    {
      id: 'gjenapne',
      customerLine: 'Jo, egentlig … jeg lurte på om denne blazeren ser bra ut?',
      note: 'Hun gjentar spørsmålet. Nå får du en ny sjanse — grip den.',
      choices: [
        { id: 'gj_a', text: 'Absolutt verdt å se nærmere på — skal den brukes til noe bestemt?', quality: 'good',
          feedback: 'Fin gjenåpning: du kobler svaret til behovet i stedet for bare å svare ja/nei.' },
        { id: 'gj_b', text: 'Ja, den er fin.', quality: 'warn',
          feedback: 'Du svarer, men stopper der — ingen avklaring av hva hun faktisk trenger den til.' },
      ],
    },
    {
      id: 'anledning',
      customerLine: 'Jeg har jobbintervju i morgen … jeg vil se skikkelig ut, men er litt nervøs, ærlig talt.',
      note: 'KJERNE: nå vet du anledningen. Ærlig, treffsikkert råd nå.',
      choices: [
        { id: 'anl_a', text: 'Så spennende! Da vil vi ha noe som sitter riktig i skuldrene og føles trygt å bevege seg i. Ærlig talt henger denne litt i ermene — prøv denne størrelsen, så ser vi.', quality: 'good', next: 'velg', sell: { needTags: BLAZER_TAGS },
          feedback: 'Gull: du tar anledningen på alvor og gir ÆRLIG råd — også når det betyr å foreslå et bytte. Det bygger tillit, og salget passer faktisk behovet hennes.' },
        { id: 'anl_b', text: 'Den er kjempefin! Den tar du bare, den sitter perfekt.', quality: 'warn', next: 'velg', sell: { needTags: BLAZER_TAGS },
          feedback: 'Du får et salg i dag — men det var smiger, ikke råd. Sitter blazeren egentlig dårlig, oppdager hun det på intervjuet, og kommer ikke tilbake til butikken som «lurte» henne. Ros som ikke stemmer, koster rykte senere.' },
        { id: 'anl_c', text: 'Da burde du egentlig ta en dyrere dressjakke, den ser mest proff ut.', quality: 'bad', next: 'velg',
          feedback: 'Du hopper til å oppgradere prisen uten å avklare behov eller passform. Det oppleves som salgspress, og en nervøs kunde mister tilliten til rådene dine.' },
      ],
    },
    {
      id: 'velg',
      customerLine: 'Ok … tror du virkelig jeg ser bra ut i den?',
      note: 'Siste dytt før hun bestemmer seg. Ærlighet vinner tillit.',
      choices: [
        { id: 'vg_a', text: 'Nå sitter den riktig — du ser trygg og profesjonell ut. Gå inn på det intervjuet med rak rygg!', quality: 'good',
          feedback: 'Du gir henne selvtillit basert på noe ekte. Hun går ut som en fornøyd kunde som stoler på deg.' },
        { id: 'vg_b', text: 'Ja ja, helt fin. Skal vi pakke den?', quality: 'warn',
          feedback: 'Litt utålmodig avslutning på et øyeblikk der hun trengte en genuin bekreftelse.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Tusen takk — jeg føler meg faktisk litt tryggere nå.',
      note: 'Sisteinntrykk — en trygg kunde kommer tilbake før neste anledning.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig — lykke til i morgen! Kom gjerne innom og fortell hvordan det gikk.', quality: 'good',
          feedback: 'Varmt og personlig. Du bygde en relasjon, ikke bare et salg.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Grei, men du kunne festet det gode inntrykket med en liten personlig avslutning.' },
      ],
    },
  ],
}

// ═══ 3. «Størrelsen» — dame-camel-veske (kundebehandling, produktspråk) ═══════
// KJERNE: snakk om PLAGGET og modellen, aldri om kroppen. Profesjonelt
// produktspråk gir trygghet og salg; kroppsfokus gir ubehag og tapt kunde.
export const STORRELSEN: SalesScenario = {
  id: 'storrelsen',
  customerName: 'Kunde med plagg',
  personaTag: 'Trendbevisste',
  sprite: S('dame-camel-veske'),
  outcomeKind: 'sale',
  description: 'En kunde holder opp et plagg og ser tvilende ut. Plagget er lite i størrelsen, og hun ser ut til å være mellom to størrelser.',
  hiddenNeed: 'Vil ha hjelp til å finne riktig størrelse UTEN kommentarer om kroppen sin. Trygghet og respekt avgjør om hun kjøper eller legger plagget fra seg.',
  steps: [
    {
      id: 'kontakt',
      customerLine: '(holder opp plagget, ser fram og tilbake mellom det og speilet, nøler)',
      note: 'Ta kontakt. Hun nøler med et plagg — les situasjonen.',
      choices: [
        { id: 'k_a', text: 'Fin, den der! Vil du at jeg finner den i et par størrelser, så du kan kjenne på forskjellen?', quality: 'good', next: 'storrelse',
          feedback: 'Observasjonsbasert og elegant: du løser størrelses-nølingen uten å nevne kroppen med ett ord. Hun slipper å be om hjelp selv.' },
        { id: 'k_b', text: 'Hei! Kan jeg hjelpe deg med noe?', quality: 'warn', next: 'gjenapne',
          feedback: 'Høflig, men litt generell når du ser at hun står fast på nettopp størrelsen. Går fint — men du kunne truffet mer presist.' },
        { id: 'k_c', text: '(gir henne rom og holder litt avstand)', quality: 'warn', next: 'storrelse',
          feedback: 'Å gi rom kan være riktig — men hun står tydelig fast, og litt for mye avstand gjør at hun må ta initiativet selv i en situasjon som allerede er litt sårbar.' },
      ],
    },
    {
      id: 'gjenapne',
      customerLine: 'Jo … jeg lurte på denne, men er ikke sikker på størrelsen.',
      note: 'Hun sier det selv. Løs det med produktspråk, ikke kroppsspråk.',
      choices: [
        { id: 'gj_a', text: 'Skal vi se — denne modellen er kjent for å være liten i størrelsen. Jeg henter begge de aktuelle.', quality: 'good',
          feedback: 'Du legger «skylda» på modellen, ikke kunden. Trygt og profesjonelt.' },
        { id: 'gj_b', text: 'Hvilken størrelse pleier du å bruke?', quality: 'warn',
          feedback: 'Ikke galt, men litt direkte — noen kunder synes det er ubehagelig. Å tilby å hente flere størrelser er mer skånsomt.' },
      ],
    },
    {
      id: 'storrelse',
      customerLine: 'Jeg vet ikke helt om denne passer meg …',
      note: 'KJERNE: her avgjøres alt av HVORDAN du ordlegger deg.',
      choices: [
        { id: 'st_a', text: 'Denne modellen er rett og slett liten i størrelsen — det er ikke deg, det er snittet. Jeg henter begge, så prøver du i fred.', quality: 'good', next: 'velg', sell: { needTags: KJOLE_TAGS },
          feedback: 'Forbilledlig produktspråk: du flytter fokus fra kroppen til PLAGGET. Hun føler seg trygg og ivaretatt — akkurat det som gjør at hun tør å kjøpe.' },
        { id: 'st_b', text: 'Du trenger nok bare en større størrelse, du.', quality: 'bad', next: 'legg-fra',
          feedback: 'Kroppsfokusert og klønete — «du trenger en større» gjør det til noe ved HENNE. Hun blir ukomfortabel og mister lysten, selv om du mente det praktisk.' },
        { id: 'st_c', text: '(ser en annen kunde og går uten å svare ordentlig)', quality: 'bad', next: 'legg-fra',
          feedback: 'Å overse signalet hennes akkurat nå er verst av alt — hun står i en sårbar vurdering og blir stående alene.' },
      ],
    },
    {
      id: 'velg',
      customerLine: '(prøver den større) Åh — denne sitter jo mye bedre!',
      note: 'Bekreft valget hennes uten å overdrive.',
      choices: [
        { id: 'vg_a', text: 'Ikke sant? Den sitter fint på deg. Vil du ha den?', quality: 'good', sell: { needTags: TILBEHOR_TAGS, addon: true },
          feedback: 'Rolig bekreftelse + en naturlig, lavmælt mersalgsåpning. Hun går fornøyd — og kanskje med et skjerf til.' },
        { id: 'vg_b', text: 'Ja, den var bedre. Skal vi ta den?', quality: 'warn',
          feedback: 'Helt grei, men litt nøytral der du kunne løftet øyeblikket hennes litt mer.' },
      ],
    },
    {
      id: 'legg-fra',
      customerLine: '(legger plagget fra seg) Nei … jeg tror jeg lar det være.',
      note: 'Kommentaren traff feil. Kan du redde møtet?',
      choices: [
        { id: 'lf_a', text: 'Det er helt greit — si ifra om du vil at jeg finner noe annet, helt uforpliktende.', quality: 'good',
          feedback: 'Du redder i det minste stemningen og lar døra stå åpen. Kanskje kommer hun tilbake en annen dag.' },
        { id: 'lf_b', text: 'Ok. (går videre)', quality: 'bad',
          feedback: 'Du bekrefter ubehaget ved å gi helt opp. Hun forlater butikken med en dårlig følelse.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Takk for hjelpen — det var deilig å slippe å føle seg dum.',
      note: 'Sisteinntrykk — respekt huskes lenge.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig! Størrelser er bare tall — det viktigste er at plagget sitter godt. Velkommen tilbake!', quality: 'good',
          feedback: 'Varm, avvæpnende avslutning som bekrefter at hun ble møtt med respekt. Sånt skaper faste kunder.' },
        { id: 'av_b', text: 'Bare hyggelig.', quality: 'warn',
          feedback: 'Grei, men en liten ekstra varme her ville forseglet et godt møte.' },
      ],
    },
  ],
}

// ═══ 4. «Gaven» — arbeidsmann-korslagt (bytterett, gavekvittering, mersalg) ═══
// KJERNE: trygg en usikker gavekjøper — avdekk litt info, tilby GAVEKVITTERING og
// forklar åpen bytterett. Presset dyrt salg returneres; overlatt til seg selv går
// han tomhendt. Avsluttes ved kassen.
export const GAVEN: SalesScenario = {
  id: 'gaven',
  customerName: 'Usikker gavekjøper',
  personaTag: 'Familieorienterte',
  sprite: S('arbeidsmann-korslagt'),
  outcomeKind: 'sale',
  avsluttesVedKasse: true,
  description: 'En mann står med armene i kryss og ser litt rådvill ut blant dameplaggene. Han skal kjøpe en gave til partneren, men vet lite om størrelse og stil.',
  hiddenNeed: 'Vil bli trygget: at han ikke bommer helt, OG at gaven kan byttes hvis den ikke passer. Trenger en gavekvittering og en åpen bytterett for å tørre å kjøpe.',
  steps: [
    {
      id: 'kontakt',
      customerLine: '(står med armene i kryss blant dameplaggene, ser litt fortapt ut)',
      note: 'Ta kontakt. Han er tydelig utenfor komfortsonen.',
      choices: [
        { id: 'k_a', text: '(rolig) Hei! Ser ut som du leter etter noe bestemt — skal det være en gave, kanskje?', quality: 'good', next: 'info',
          feedback: 'Observasjonsbasert og lavmælt: du leser kroppsspråket og gjetter forsiktig på gave. Han puster lettet ut over å bli møtt uten mas.' },
        { id: 'k_b', text: 'Hei! Kan jeg hjelpe deg med noe?', quality: 'warn', next: 'gjenapne',
          feedback: 'Høflig, men en usikker kunde svarer ofte «nei takk, bare ser» på et sånt åpent spørsmål — selv når han egentlig trenger hjelp.' },
        { id: 'k_c', text: '(lar ham være i fred blant plaggene)', quality: 'bad', next: 'gaar',
          feedback: 'Feil kunde å overlate til seg selv. En trygg browser klarer seg — men en rådvill gavekjøper som ikke får hjelp, gir opp og går tomhendt.' },
      ],
    },
    {
      id: 'gjenapne',
      customerLine: 'Nei takk, jeg bare … (nøler) … egentlig skal jeg ha en gave, men jeg aner ikke hva.',
      note: 'Han innrømmer det likevel. Nå kan du hjelpe på ordentlig.',
      choices: [
        { id: 'gj_a', text: 'Helt supert, det hjelper vi deg med. Fortell litt om hvem den er til.', quality: 'good',
          feedback: 'Du snur en lukket start til en åpen samtale. Fint reddet.' },
        { id: 'gj_b', text: 'Ok, hva slags budsjett har du?', quality: 'warn',
          feedback: 'Å starte med pris før du vet noe om mottakeren gjør en allerede usikker kunde enda mer stresset.' },
      ],
    },
    {
      id: 'info',
      customerLine: 'Det er til samboeren min. Jeg vet ærlig talt ikke hvilken størrelse hun bruker … eller hva hun liker, egentlig.',
      note: 'KJERNE 1: få fram nok info til å treffe — uten å gjøre ham flau over å ikke vite.',
      choices: [
        { id: 'inf_a', text: 'Det ordner vi. Vet du omtrent — er hun mindre, som meg, eller større? Og går hun mest i farger eller nøytralt? Da finner vi noe trygt.', quality: 'good', next: 'trygg',
          feedback: 'Du gjør det lett for ham: enkle referanser i stedet for eksakte tall, ingen flauhet. Nå har du nok til å foreslå noe treffsikkert.' },
        { id: 'inf_b', text: 'Du burde egentlig vite størrelsen når du kjøper klær til noen …', quality: 'bad', next: 'gaar',
          feedback: 'Du gjør ham flau over nettopp det han var usikker på. Han lukker seg og finner en unnskyldning for å gå.' },
        { id: 'inf_c', text: 'Bare ta denne, den er populær.', quality: 'warn', next: 'trygg',
          feedback: 'Du hopper til et forslag uten å avklare noe. Kanskje treffer du — men han står like usikker på om det passer henne.' },
      ],
    },
    {
      id: 'trygg',
      customerLine: 'Ok … men hva om den ikke passer, eller hun ikke liker den?',
      note: 'KJERNE 2: her er gavekvittering + åpen bytterett gullverdt for tryggheten.',
      choices: [
        { id: 'try_a', text: 'Da legger jeg ved en gavekvittering — så kan hun bytte størrelse eller farge helt selv, uten at du er med. Da kan du kjøpe med god samvittighet.', quality: 'good', next: 'mersalg', sell: { needTags: GENSER_TAGS },
          feedback: 'Akkurat det som løser usikkerheten: gavekvittering skjuler prisen og gir mottakeren fri bytterett. Du fjerner risikoen for ham — og gjør salget trygt.' },
        { id: 'try_b', text: 'Slapp av, hun kommer sikkert til å like den.', quality: 'warn', next: 'mersalg', sell: { needTags: GENSER_TAGS },
          feedback: 'Velment forsikring, men du svarer ikke på den faktiske bekymringen — bytte. En gavekvittering hadde tryggeta ham langt mer.' },
        { id: 'try_c', text: 'Kjøpt er kjøpt, så det får du bare satse på.', quality: 'bad', next: 'gaar',
          feedback: 'Du bekrefter frykten hans i stedet for å løse den. Han tør ikke ta sjansen og går uten å kjøpe.' },
      ],
    },
    {
      id: 'mersalg',
      customerLine: 'Det hørtes betryggende ut. Da tar jeg den, tror jeg.',
      note: 'Naturlig mersalg: innpakning eller en liten ting til gjør gaven komplett.',
      choices: [
        { id: 'me_a', text: 'Fint valg! Skal jeg pakke den pent inn, og kanskje et skjerf til som matcher?', quality: 'good', next: 'kasse', sell: { needTags: TILBEHOR_TAGS, addon: true },
          feedback: 'Naturlig og hjelpsomt mersalg som gjør gaven mer komplett — ikke pushy, men et ekte tilbud som passer anledningen.' },
        { id: 'me_b', text: 'Supert. (går mot kassen)', quality: 'warn', next: 'kasse',
          feedback: 'Helt greit, men en åpenbar mersalgs- og servicemulighet (innpakning!) glapp.' },
      ],
    },
    {
      id: 'gaar',
      customerLine: 'Nei, jeg tror jeg venter litt … takk uansett. (går mot døra)',
      note: 'Han er på vei ut tomhendt. Én siste sjanse til å snu det.',
      choices: [
        { id: 'ga_a', text: 'Helt i orden! Og husk — kjøper du senere, legger vi alltid ved gavekvittering, så det er null risiko. Velkommen tilbake!', quality: 'good',
          feedback: 'Du lar ham gå med verdigheten i behold OG planter en trygghet (gavekvittering) som kan hente ham tilbake. Best mulige utgang av en tapt runde.' },
        { id: 'ga_b', text: 'Ok. Ha det.', quality: 'bad',
          feedback: 'Du gir helt slipp. Han går tomhendt og kommer neppe tilbake — en tapt sjanse som en trygghet på tampen kunne reddet.' },
      ],
    },
    {
      id: 'kasse',
      customerLine: '(ved kassen) Takk — jeg hadde ikke klart dette uten hjelp.',
      note: 'Oppgjør ved kassen. Legg gavekvitteringen synlig ved.',
      choices: [
        { id: 'kas_a', text: 'Her er gavekvitteringen — den legger jeg oppi. Lykke til, jeg er sikker på at hun blir glad!', quality: 'good',
          feedback: 'Trygg, varm avslutning. Du gjorde en nervøs gavekjøper til en fornøyd — og sannsynlig gjenganger til jul og bursdager.' },
        { id: 'kas_b', text: 'Værsågod, ha det.', quality: 'warn',
          feedback: 'Grei, men husk å nevne gavekvitteringen eksplisitt — den var jo hele tryggheten hans.' },
      ],
    },
  ],
}

// ═══ 5. «Prøverommet» — dame-forerhund (likeverd, universell utforming) ══════
// KJERNE (samme standard som kafeens Likeverd-scenario): møt en kunde med
// førerhund likeverdig. Arbeidshund skal med overalt — ingen nekt, ingen
// sentimentalisering/klapping. Praktisk tilrettelegging uten å gjøre nummer av
// det. RYKTE er metrikken.
export const PROVEROMMET: SalesScenario = {
  id: 'proverommet',
  customerName: 'Kunde med førerhund',
  personaTag: 'Trendbevisste',
  sprite: S('dame-forerhund'),
  outcomeKind: 'service',
  description: 'En kunde kommer inn med førerhund og vil prøve et par plagg. En helt vanlig kunde — hunden er arbeidshund, ikke et kjæledyr på besøk.',
  hiddenNeed: 'Vil handle og prøve klær som alle andre — bli behandlet likeverdig, få praktisk hjelp på forespørsel, og slippe at det gjøres et nummer av hunden.',
  steps: [
    {
      id: 'kontakt',
      customerLine: '(med førerhund) Hei! Jeg har lyst til å prøve et par plagg — er det greit at hunden er med inn?',
      note: 'Ta kontakt. Førsteinntrykket avgjør om hun føler seg velkommen.',
      choices: [
        { id: 'k_a', text: 'Hjertelig velkommen — førerhund er selvsagt greit, den går med overalt. Prøverommet er rett bortover, jeg viser deg gjerne.', quality: 'good', next: 'plagg',
          feedback: 'Akkurat riktig: førerhund er arbeidshund med adgang overalt, og du svarer som en selvfølge + tilbyr praktisk hjelp. Hun føler seg velkommen med en gang.' },
        { id: 'k_b', text: 'Hei! Kan jeg hjelpe deg med noe?', quality: 'warn', next: 'gjenapne',
          feedback: 'Du overhørte spørsmålet hennes om hunden — det hun trengte svar på FØR hun tør å gå videre. Høflig, men litt tonedøvt.' },
        { id: 'k_c', text: '(smiler og lar henne se seg om i fred)', quality: 'good', next: 'plagg',
          feedback: 'For en helt vanlig kunde er det helt greit å gi rom — så lenge du er tilgjengelig. Hun spurte riktignok om hunden, så et kjapt «selvsagt greit» hadde vært enda bedre, men å ikke gjøre noe nummer av det er helt rett tone.' },
      ],
    },
    {
      id: 'gjenapne',
      customerLine: 'Jo, jeg lurte egentlig på om det er greit at førerhunden er med inn?',
      note: 'Hun gjentar det viktige spørsmålet. Svar tydelig og selvsagt.',
      choices: [
        { id: 'gj_a', text: 'Så klart — den er jo på jobb. Velkommen inn, begge to.', quality: 'good',
          feedback: 'Tydelig og avslappet. Du bekrefter det opplagte uten å gjøre det til en sak.' },
        { id: 'gj_b', text: 'Eh … ja, det går vel greit.', quality: 'warn',
          feedback: 'Nølingen er unødvendig — førerhund har selvsagt adgang. Det lille «vel» kan få henne til å føle seg til bry.' },
      ],
    },
    {
      id: 'plagg',
      customerLine: 'Så fint. Jeg så to gensere jeg har lyst til å prøve — kan du si litt om hvor de henger?',
      note: 'KJERNE: gi praktisk hjelp på HENNES premisser — beskriv, vis vei, uten å overta.',
      choices: [
        { id: 'pl_a', text: 'Gjerne — de grå henger langs veggen til høyre, og de mønstrede på stativet midt i rommet. Vil du at jeg henter et par, eller finner du fram selv?', quality: 'good', next: 'hunden',
          feedback: 'Forbilledlig: du beskriver konkret og lar HENNE velge hvor mye hjelp hun vil ha. Praktisk tilrettelegging uten umyndiggjøring.' },
        { id: 'pl_b', text: 'De henger jo der borte. (peker)', quality: 'bad', next: 'hunden',
          feedback: 'Å peke hjelper ikke en svaksynt kunde. Hun ba nettopp om en BESKRIVELSE — «der borte» gir henne ingenting.' },
        { id: 'pl_c', text: 'Bare bli her, så henter jeg alt til deg, det er enklest.', quality: 'warn', next: 'hunden',
          feedback: 'Velment, men du overtar uten å spørre. Hun kan fint være med og velge selv — å «ordne alt» kan umyndiggjøre like mye som å ikke hjelpe.' },
      ],
    },
    {
      id: 'hunden',
      customerLine: '(en kollega av deg bøyer seg ned mot hunden: «åh, så søt! hei, vovven!»)',
      note: 'KJERNE: hunden er på jobb. Hvordan håndterer du oppmerksomheten rundt den?',
      choices: [
        { id: 'hu_a', text: '(vennlig, til kollegaen) Den er faktisk på jobb nå, så vi lar den være — den fører henne. (til kunden) Skal vi finne den første genseren?', quality: 'good', next: 'avslutt',
          feedback: 'Riktig og elegant: du beskytter hundens arbeid uten å kjefte, og flytter fokus tilbake til KUNDEN. Førerhund skal ikke forstyrres/klappes når den jobber.' },
        { id: 'hu_b', text: '(bøyer deg også ned) Åh, den er jo helt nydelig! Hva heter den?', quality: 'warn', next: 'avslutt',
          feedback: 'Velment, men feil fokus: nå står to ansatte og koser med arbeidshunden mens KUNDEN venter. Hunden skal ikke forstyrres på jobb — og hun ble bikkja sin, ikke en kunde.' },
        { id: 'hu_c', text: 'Kanskje hunden burde vente utenfor, så slipper vi oppstyret?', quality: 'bad', next: 'avslutt',
          feedback: 'Alvorlig feil: å be føreren sette fra seg førerhunden er å frata henne det hun ser med. Det er diskriminering, ikke en praktisk løsning — arbeidshunden skal alltid med.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: '(etter å ha prøvd) Denne tar jeg. Takk — det var et hyggelig og ryddig besøk.',
      note: 'Tilby praktisk hjelp videre — men spør, ikke overta.',
      choices: [
        { id: 'av_a', text: 'Så fint at den passer! Vil du at jeg pakker den og legger den i vesken din, eller ordner du deg fint selv?', quality: 'good',
          feedback: 'Du tilbyr den lille praktiske hånda OG lar henne velge. Det er kjernen i likeverdig, universelt utformet service — hun går som en fornøyd, likestilt kunde.' },
        { id: 'av_b', text: 'Bare hyggelig. (rekker fram posen)', quality: 'warn',
          feedback: 'Grei, men å rekke fram noe uten et ord er lite hjelpsomt for en svaksynt kunde — si gjerne HVOR du legger den.' },
        { id: 'av_c', text: '(tar hånda hennes og leder henne mot kassen uten å spørre)', quality: 'bad',
          feedback: 'Ta aldri tak i noen uten å spørre først. Velment, men det fratar henne kontrollen — det motsatte av god, likeverdig hjelp.' },
      ],
    },
  ],
}

// ═══ 6. «Mobilbildet» — mann-strikk-mobil (forbrukeratferd, sortiment) ═══════
// KJERNE: ta kunden på alvor FØRST (anerkjenn + spør), så vis nærmeste alternativ
// i eget sortiment. Salg ELLER et godt møte uten salg er begge OK. Blankt «nei»
// sender ham til nettbutikken; falske løfter gir klage senere.
export const MOBILBILDET: SalesScenario = {
  id: 'mobilbildet',
  customerName: 'Kunde med mobil',
  personaTag: 'Trendbevisste',
  sprite: S('mann-strikk-mobil'),
  outcomeKind: 'sale',
  description: 'En kunde holder fram mobilen med bilde av en genser fra en nettbutikk: «Har dere denne?» Butikken fører den ikke.',
  hiddenNeed: 'Er egentlig åpen for et alternativ — HVIS selgeren tar ham på alvor først. Blir han avvist, går han rett til nettbutikken i stedet.',
  steps: [
    {
      id: 'kontakt',
      customerLine: '(holder fram mobilen) Hei, har dere denne genseren? Jeg så den i en nettbutikk.',
      note: 'Ta kontakt. Han kommer med et konkret bilde — møt det.',
      choices: [
        { id: 'k_a', text: '(ser på bildet) Fin, den! Vi fører ikke akkurat den, men fortell — hva er det du liker med den? Så finner vi noe i nærheten.', quality: 'good', next: 'behov',
          feedback: 'Observasjonsbasert og løsningsorientert: du anerkjenner valget hans og graver etter hva som TILTALER ham, i stedet for bare å avvise. Nå kan du treffe med et alternativ.' },
        { id: 'k_b', text: 'Hei! Kan jeg hjelpe deg med noe?', quality: 'warn', next: 'gjenapne',
          feedback: 'Du overså mobilen han holdt fram. Høflig, men du mistet den konkrete inngangen han ga deg.' },
        { id: 'k_c', text: '(lar ham bla i fred på mobilen litt til)', quality: 'good', next: 'behov',
          feedback: 'For en kunde som utforsker er det greit å gi et øyeblikk — men han rakk å spørre deg direkte, så her burde du egentlig svart. Riktig instinkt (ikke masete), litt sen timing.' },
      ],
    },
    {
      id: 'gjenapne',
      customerLine: 'Jo, jeg lurte på om dere har denne genseren her? (viser mobilen)',
      note: 'Han viser bildet igjen. Ta det på alvor nå.',
      choices: [
        { id: 'gj_a', text: 'La meg se — den fører vi ikke, men hva liker du best med den? Fasongen, fargen, strikken?', quality: 'good',
          feedback: 'Fin gjenåpning: du snur et «nei, vi har den ikke» til en behovssamtale.' },
        { id: 'gj_b', text: 'Nei, den har vi ikke.', quality: 'warn',
          feedback: 'Sant, men du stopper der og lukker døra. Han står igjen uten et alternativ.' },
      ],
    },
    {
      id: 'behov',
      customerLine: 'Jeg liker liksom den grove strikken, og at den ikke er så tettsittende.',
      note: 'KJERNE: bruk det han sier til å finne nærmeste treff i EGET sortiment.',
      choices: [
        { id: 'be_a', text: 'Da har jeg akkurat noe — vi har en grovstrikket genser i en litt løsere passform, borte på stativet. Vil du kjenne på den?', quality: 'good', next: 'alternativ', sell: { needTags: GENSER_TAGS },
          feedback: 'Perfekt: du oversetter det han liker til et konkret alternativ i sortimentet. Enten kjøper han — eller så går han fornøyd fordi du faktisk hjalp. Begge deler er en seier.' },
        { id: 'be_b', text: 'Vi har mange gensere, bare se deg rundt.', quality: 'warn', next: 'alternativ',
          feedback: 'Passivt — du hadde nettopp nok info til å foreslå noe konkret, men sender ham i stedet på egen leting.' },
        { id: 'be_c', text: 'Jeg kan jo bare bestille den for deg fra den nettbutikken?', quality: 'bad', next: 'lovepris',
          feedback: 'Du lover noe du ikke kan holde — dere er en annen butikk og kan ikke bestille en konkurrents vare. Et løfte som sprekker gir en klage senere.' },
      ],
    },
    {
      id: 'alternativ',
      customerLine: '(kjenner på genseren) Hmm, den var faktisk ganske fin …',
      note: 'La ham lande i sitt eget tempo — ikke press.',
      choices: [
        { id: 'al_a', text: 'Ingen hast — ta den gjerne på og kjenn etter. Den har samme grove følelsen som den du så.', quality: 'good',
          feedback: 'Du kobler alternativet tilbake til det han opprinnelig likte, uten å presse. Enten kjøper han nå, eller så kommer han tilbake.' },
        { id: 'al_b', text: 'Den er mye bedre enn den på nett, tro meg.', quality: 'warn',
          feedback: 'Å snakke ned konkurrenten uten grunnlag virker desperat. La plagget tale for seg selv.' },
      ],
    },
    {
      id: 'lovepris',
      customerLine: 'Å, kan dere det? Når kommer den, da?',
      note: 'Løftet ditt sitter fast. Rett det opp før det blir en skuffelse.',
      choices: [
        { id: 'lo_a', text: 'Beklager — jeg tok litt hardt i der. Vi kan faktisk ikke bestille fra andre butikker. Men la meg vise deg vårt nærmeste alternativ.', quality: 'good', next: 'alternativ', sell: { needTags: GENSER_TAGS },
          feedback: 'Bra reddet: du er ærlig om at løftet var feil og styrer tilbake til noe du FAKTISK kan tilby. Bedre en ærlig korrigering nå enn en klage senere.' },
        { id: 'lo_b', text: 'Eh … jeg sjekker og ringer deg. (vet at du ikke kan)', quality: 'bad', next: 'avslutt',
          feedback: 'Du bygger videre på et løfte du ikke kan holde. Han venter på en telefon som aldri kommer — og forteller andre om butikken som lovet og skuffet.' },
      ],
    },
    {
      id: 'avslutt',
      customerLine: 'Ok, takk for hjelpen uansett.',
      note: 'Sisteinntrykk — også et møte UTEN salg kan gi en kunde som kommer tilbake.',
      choices: [
        { id: 'av_a', text: 'Bare hyggelig! Kom gjerne innom igjen — vi får inn nytt jevnlig, og da er det bare å vise meg bildet på nytt.', quality: 'good',
          feedback: 'Varmt og fremtidsrettet. Selv uten salg i dag går han ut med et godt inntrykk — og en grunn til å komme tilbake i stedet for å handle på nett.' },
        { id: 'av_b', text: 'Ok, ha det.', quality: 'warn',
          feedback: 'Grei, men litt anonym avslutning på et møte du kunne brukt til å knytte ham til butikken.' },
      ],
    },
  ],
}

// ── Registser (INAKTIVT) ─────────────────────────────────────────────────────
export const KLESBUTIKK_SCENARIOS: SalesScenario[] = [
  ANGREKJOPET, JOBBINTERVJUET, STORRELSEN, GAVEN, PROVEROMMET, MOBILBILDET,
]

/** scenario-id → kunde-id (klesbutikkKunder.ts) — for spriteCal-oppslag i
 *  kassevyen (DEL 3). Sprite er allerede satt via S(kundeId) over. */
export const KLESBUTIKK_SCENARIO_KUNDE: Record<string, string> = {
  angrekjopet: 'mann-skjegg-pakke',
  jobbintervjuet: 'ung-dame-skjerf',
  storrelsen: 'dame-camel-veske',
  gaven: 'arbeidsmann-korslagt',
  proverommet: 'dame-forerhund',
  mobilbildet: 'mann-strikk-mobil',
}

export const klesbutikkScenarioById = (id: string): SalesScenario | undefined =>
  KLESBUTIKK_SCENARIOS.find(s => s.id === id)
