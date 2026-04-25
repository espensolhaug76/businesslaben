        import DrawerModule from '../shared/DrawerModule'
        import type { DrawerPhase } from '../shared/DrawerModule'

        export const phases: DrawerPhase[] = [
                  {
            phaseNumber: 1,
            icon: '👥',
            title: 'Hva er HRM?',
            quote: 'Strategisk arbeid med mennesker.',
            content: 'HRM = Human Resource Management. Mer enn lønnsutbetaling — strategisk planlegging, anskaffelse og utvikling av bedriftens mennesker. Bygger fremtidens organisasjon. I kunnskapsøkonomien er talent strategisk ressurs.',
            subpoints: [
                  { label: 'STRATEGISK', text: 'Mer enn admin — strategisk arbeid.' },
          { label: 'FREMTIDSORIENTERT', text: 'Bygger kompetansen organisasjonen trenger om 3-5 år.' },
            ],
            practical: 'Hva tror du HR gjør i bedriften du jobber for / kjenner? Mer enn lønn?',
            exercises: [
            {
      id: 'ml214-1-1',
      icon: '👥',
      title: 'HRM',
      question: 'Hva er HRM?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Strategisk planlegging, anskaffelse og utvikling av mennesker', isCorrect: true, feedback: 'Riktig! Bredt og strategisk.' },
{ id: 'c', label: 'Bare oppsigelser', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare jus', isCorrect: false, feedback: 'Helt feil.' },
      ],
      espenTip: 'Moderne HR jobber med strategi, kultur, talent — ikke bare administrasjon.',
    },
    {
      id: 'ml214-1-2',
      icon: '👥',
      title: 'Strategisk',
      question: 'Hvorfor er HR strategisk?',
      choices: [
        { id: 'a', label: 'Ikke det', isCorrect: false, feedback: 'Stor strategisk verdi.' },
{ id: 'b', label: 'Folk er kritisk konkurransefortrinn — særlig i kunnskapsøkonomien', isCorrect: true, feedback: 'Riktig! Talent er strategisk ressurs.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'd', label: 'Bare for tek', isCorrect: false, feedback: 'Gjelder alle bransjer.' },
      ],
      espenTip: 'Google bruker mer på rekruttering enn reklame. HR er deres strategiske fortrinn.',
    },
    {
      id: 'ml214-1-3',
      icon: '👥',
      title: 'Verdi',
      question: 'Hva er HRs viktigste oppgave?',
      choices: [
        { id: 'a', label: 'Lønnsutbetaling', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Sikre at bedriften har riktige mennesker til riktige oppgaver', isCorrect: true, feedback: 'Riktig! Right people, right roles.' },
{ id: 'c', label: 'Bare opplæring', isCorrect: false, feedback: 'Bredere.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Jim Collins: \'First who, then what\'. Folk først, deretter strategi.',
    },
            ],
          },
          {
            phaseNumber: 2,
            icon: '📋',
            title: 'Rekrutteringsprosessen',
            quote: '4 steg fra behov til ansettelse.',
            content: 'Rekruttering: jobbanalyse (hva skal personen gjøre?), utlysning (hvem vil vi nå?), seleksjon (intervjuer, tester, referanser), ansettelse (kontrakt, onboarding). Feil ansettelse er dyrt — opp til 6× årslønn i tap. Strukturert prosess gir bedre treff.',
            subpoints: [
                  { label: '4 STEG', text: 'Jobbanalyse, utlysning, seleksjon, ansettelse.' },
          { label: 'DYRT MED FEIL', text: '6× årslønn i tap ved feil ansettelse.' },
            ],
            practical: 'Har du vært gjennom en god rekrutteringsprosess? Hva gjorde den god?',
            exercises: [
            {
      id: 'ml214-2-1',
      icon: '📋',
      title: 'Steg',
      question: 'Hva er de 4 stegene?',
      choices: [
        { id: 'a', label: 'Bare intervju', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Jobbanalyse, utlysning, seleksjon, ansettelse', isCorrect: true, feedback: 'Riktig! Strukturert prosess.' },
{ id: 'c', label: 'Bare lønnsforhandling', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Hopper du over jobbanalyse, ender du ofte med å ansette feil person fordi behovet ikke var klart definert.',
    },
    {
      id: 'ml214-2-2',
      icon: '📋',
      title: 'Kostnad',
      question: 'Hva koster feil ansettelse?',
      choices: [
        { id: 'a', label: 'Bare rekrutteringsgebyr', isCorrect: false, feedback: 'Mye mer.' },
{ id: 'b', label: 'Opp til 6× årslønn — rekruttering + opplæring + mistet produksjon + ny prosess', isCorrect: true, feedback: 'Riktig! Stort økonomisk tap.' },
{ id: 'c', label: 'Lite', isCorrect: false, feedback: 'Tvert imot.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert beregning.' },
      ],
      espenTip: 'Derfor lønner det seg å investere i grundig rekrutteringsprosess. Spar timer på rekruttering, taper måneder på utskifting.',
    },
    {
      id: 'ml214-2-3',
      icon: '📋',
      title: 'Beste praksis',
      question: 'Hva er beste praksis for seleksjon?',
      choices: [
        { id: 'a', label: 'Bare 1 intervju', isCorrect: false, feedback: 'For overflatisk.' },
{ id: 'b', label: 'Strukturerte intervjuer, ferdighetsesting, referansesjekk', isCorrect: true, feedback: 'Riktig! Multi-metode reduserer bias og gir bedre treff.' },
{ id: 'c', label: 'Magefølelse', isCorrect: false, feedback: 'Bias-utsatt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Forskning viser strukturerte intervjuer dobler prediksjons-presisjon vs ustrukturerte.',
    },
            ],
          },
          {
            phaseNumber: 3,
            icon: '🎯',
            title: 'Motivasjonsteori',
            quote: 'Herzberg: hygiene vs motivasjon.',
            content: 'Herzbergs to-faktor-teori: Hygienefaktorer (lønn, arbeidsmiljø, sjefen) må være på plass — men gir ikke motivasjon. Motivasjonsfaktorer (mestring, anerkjennelse, ansvar, vekst) skaper engasjement. Lønn forhindrer misnøye, men skaper ikke motivasjon over tid.',
            subpoints: [
                  { label: 'HYGIENE = MIN.', text: 'Lønn osv må være på plass — ellers misnøye.' },
          { label: 'MOTIVASJON = +', text: 'Mestring, anerkjennelse skaper engasjement.' },
            ],
            practical: 'Hva motiverer deg på jobb / skole? Lønn alene? Eller mer?',
            exercises: [
            {
      id: 'ml214-3-1',
      icon: '🎯',
      title: 'Hygiene',
      question: 'Hva er hygienefaktorer?',
      choices: [
        { id: 'a', label: 'Toaletter', isCorrect: false, feedback: 'Bokstavelig — feil tolkning.' },
{ id: 'b', label: 'Lønn, arbeidsmiljø, sjefen, jobbsikkerhet — må være på plass', isCorrect: true, feedback: 'Riktig! Forebygger misnøye, men skaper ikke motivasjon.' },
{ id: 'c', label: 'Bare bonus', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Lav lønn skaper misnøye. Men høy lønn alene gir ikke varig motivasjon — andre faktorer trengs.',
    },
    {
      id: 'ml214-3-2',
      icon: '🎯',
      title: 'Motivasjon',
      question: 'Hva er motivasjonsfaktorer?',
      choices: [
        { id: 'a', label: 'Bare bonus', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Mestring, anerkjennelse, ansvar, vekstmuligheter', isCorrect: true, feedback: 'Riktig! Skaper varig engasjement.' },
{ id: 'c', label: 'Bare ferie', isCorrect: false, feedback: 'Sekundært.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Daniel Pinks \'Drive\': autonomi, mestring, formål driver høy ytelse mer enn pengebelønning.',
    },
    {
      id: 'ml214-3-3',
      icon: '🎯',
      title: 'Lønn',
      question: 'Hvorfor motiverer ikke høy lønn alene?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Folk venner seg til lønn — den slutter å motivere etter en stund', isCorrect: true, feedback: 'Riktig! Adapsjons-teori. Pengelykke flate ut.' },
{ id: 'c', label: 'Lønn er irrelevant', isCorrect: false, feedback: 'Det er hygiene.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Forskning: pengelykke flater ut etter ~75 000 USD i USA. Mer penger = ikke nødvendigvis mer lykke.',
    },
            ],
          },
          {
            phaseNumber: 4,
            icon: '📚',
            title: 'Kompetanseutvikling',
            quote: '70-20-10-modellen.',
            content: 'Læring skjer på 3 nivåer: 70 % fra arbeidet selv (gjennomføring av oppgaver), 20 % fra andre (mentor, kolleger, feedback), 10 % fra formelle kurs. Kurs alene er ikke nok — læring må være integrert i hverdagen.',
            subpoints: [
                  { label: '70-20-10', text: 'Arbeid > andre > formell læring.' },
          { label: 'KURS ALENE = LITE', text: 'Hovedlæringen skjer i jobben.' },
            ],
            practical: 'Hva har du lært mest av siste år? Kurs, jobben eller folk rundt deg?',
            exercises: [
            {
      id: 'ml214-4-1',
      icon: '📚',
      title: '70-20-10',
      question: 'Hva betyr 70-20-10?',
      choices: [
        { id: 'a', label: 'Pris-strategi', isCorrect: false, feedback: 'Helt feil ramme.' },
{ id: 'b', label: '70 % fra arbeid, 20 % fra andre, 10 % fra kurs', isCorrect: true, feedback: 'Riktig! Klassisk lærings-fordeling.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert modell.' },
{ id: 'd', label: 'Bare for ledere', isCorrect: false, feedback: 'Gjelder alle.' },
      ],
      espenTip: 'Sentral innsikt: kurs alene er ikke nok. Læring må integreres i arbeidet.',
    },
    {
      id: 'ml214-4-2',
      icon: '📚',
      title: 'Praktisk',
      question: 'Hvordan utvikle kompetanse?',
      choices: [
        { id: 'a', label: 'Bare flere kurs', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Utfordrende oppgaver + mentor + målrettet kurs', isCorrect: true, feedback: 'Riktig! Kombinasjon av alle tre nivåer.' },
{ id: 'c', label: 'Bare lese', isCorrect: false, feedback: 'For passivt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Best in class: stretch-oppgaver med støtte, ikke \'kast inn i dypvannet\'.',
    },
    {
      id: 'ml214-4-3',
      icon: '📚',
      title: 'Mentor',
      question: 'Hvorfor mentor?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'b', label: 'Erfaringsoverføring, perspektiv, nettverk — alt vanskelig å få fra kurs', isCorrect: true, feedback: 'Riktig! Mentorskap er undervurdert utviklings-ressurs.' },
{ id: 'c', label: 'Bare for unge', isCorrect: false, feedback: 'Gjelder alle aldre.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Microsoft, Google har formelle mentor-programmer. Norske bedrifter er mer ad hoc — kan forbedres.',
    },
            ],
          },
          {
            phaseNumber: 5,
            icon: '⚖️',
            title: 'Arbeidsmiljøloven',
            quote: 'Norske rammer for arbeidslivet.',
            content: 'Arbeidsmiljøloven setter de juridiske rammene for arbeidslivet i Norge: arbeidstid, ferie, oppsigelse, varsling, diskriminering, HMS. Bryter du den, kan Arbeidstilsynet stenge driften — i tillegg til erstatningsansvar. HR må kjenne hovedpunktene.',
            subpoints: [
                  { label: 'RAMMER', text: 'Arbeidstid, ferie, oppsigelse, varsling, HMS.' },
          { label: 'HÅNDHEVING', text: 'Arbeidstilsynet kan stenge drift ved brudd.' },
            ],
            practical: 'Hvilke rettigheter har norske arbeidstakere som du synes er viktige?',
            exercises: [
            {
      id: 'ml214-5-1',
      icon: '⚖️',
      title: 'Hva',
      question: 'Hva regulerer Arbeidsmiljøloven?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Arbeidstid, ferie, oppsigelse, varsling, HMS, diskriminering', isCorrect: true, feedback: 'Riktig! Helhetlig rammeverk for arbeidslivet.' },
{ id: 'c', label: 'Bare ferie', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare oppsigelse', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Norge har en av Europas sterkeste arbeidstakervern. Strengere enn EU-minimum.',
    },
    {
      id: 'ml214-5-2',
      icon: '⚖️',
      title: 'Oppsigelse',
      question: 'Hva kreves for lovlig oppsigelse?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Strenge krav.' },
{ id: 'b', label: 'Saklig grunn, drøftingsmøte, dokumentasjon, klagerett', isCorrect: true, feedback: 'Riktig! Lovkrav om hele prosessen.' },
{ id: 'c', label: 'Bare ledelsens beslutning', isCorrect: false, feedback: 'Krever mye mer.' },
{ id: 'd', label: 'Bare økonomi', isCorrect: false, feedback: 'Sekundært.' },
      ],
      espenTip: 'Bryter du oppsigelses-prosessen, kan retten opprettholde stillingen — selv etter oppsigelse.',
    },
    {
      id: 'ml214-5-3',
      icon: '⚖️',
      title: 'Sanksjoner',
      question: 'Hva kan Arbeidstilsynet gjøre?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Sterke beføyelser.' },
{ id: 'b', label: 'Stenge drift, gi pålegg, ilegge gebyr', isCorrect: true, feedback: 'Riktig! Tilsynsmyndighet med reelle sanksjoner.' },
{ id: 'c', label: 'Bare advarsel', isCorrect: false, feedback: 'For begrenset.' },
{ id: 'd', label: 'Saksøke ansatte', isCorrect: false, feedback: 'Helt feil — beskytter ansatte.' },
      ],
      espenTip: 'Arbeidstilsynet inspiserer regelmessig. Brudd kan koste mye — både økonomisk og omdømme.',
    },
            ],
          },
          {
            phaseNumber: 6,
            icon: '💰',
            title: 'Belønningssystemer',
            quote: 'Mer enn lønn.',
            content: 'Belønning: lønn, bonus, opsjoner, frynsegoder, anerkjennelse. Ekstreme bonusordninger kan gi vridde insentiver (banksektoren før 2008). Best er ofte balansert grunnlønn pluss beskjeden, predikerbar bonus. Anerkjennelse er gratis og undervurdert.',
            subpoints: [
                  { label: 'BALANSERT', text: 'Grunnlønn + beskjeden bonus + andre goder.' },
          { label: 'ANERKJENNELSE', text: 'Gratis, undervurdert, ofte mest verdifullt.' },
            ],
            practical: 'Hva har vært den mest meningsfulle \'belønningen\' du har fått på jobb / skole?',
            exercises: [
            {
      id: 'ml214-6-1',
      icon: '💰',
      title: 'Forskjellige',
      question: 'Hva inkluderer moderne belønning?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Lønn + bonus + opsjoner + frynsegoder + anerkjennelse', isCorrect: true, feedback: 'Riktig! Multi-dimensjonal.' },
{ id: 'c', label: 'Bare bonus', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Tek-bedrifter bruker opsjoner mye — gir ansatte del i selskapets vekst.',
    },
    {
      id: 'ml214-6-2',
      icon: '💰',
      title: 'Vridde insentiver',
      question: 'Hva er vridde insentiver?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt problem.' },
{ id: 'b', label: 'Belønning som motiverer feil adferd — bankere belønnet for risiko, ikke ansvar', isCorrect: true, feedback: 'Riktig! Klassisk eksempel fra finansbransjen.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt fenomen.' },
{ id: 'd', label: 'Aldri problem', isCorrect: false, feedback: 'Stort problem.' },
      ],
      espenTip: 'Wells Fargo: 5000+ ansatte opprettet falske kontoer pga press på salgstall. Vridde insentiver.',
    },
    {
      id: 'ml214-6-3',
      icon: '💰',
      title: 'Anerkjennelse',
      question: 'Hvorfor er anerkjennelse undervurdert?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt.' },
{ id: 'b', label: 'Gratis, men kraftig motiverende — folk vil føle seg sett og verdsatt', isCorrect: true, feedback: 'Riktig! Mange ledere undervurderer dette.' },
{ id: 'c', label: 'Lovkrav', isCorrect: false, feedback: 'Frivillig praksis.' },
{ id: 'd', label: 'Bare for unge', isCorrect: false, feedback: 'Alle aldre.' },
      ],
      espenTip: 'Daglig anerkjennelse fra leder er sterkt motiverende. Koster ingenting, gir mye.',
    },
            ],
          },
          {
            phaseNumber: 7,
            icon: '📅',
            title: 'Medarbeidersamtalen',
            quote: 'Strukturert dialog.',
            content: 'Medarbeidersamtalen: strukturert dialog om trivsel, prestasjon og mål. Skjer minst en gang i året, helst kvartalsvis. Brukt riktig: utvikling og engasjement. Brukt feil: tidssløsing og frustrasjon. Forberedelse fra begge sider er nøkkelen.',
            subpoints: [
                  { label: 'STRUKTURERT', text: 'Forberedt agenda, dokumentert, med oppfølging.' },
          { label: 'TILBAKEMELDING', text: 'Begge veier — leder gir, ansatt gir tilbake.' },
            ],
            practical: 'Har du opplevd god vs dårlig medarbeidersamtale? Hva skilte dem?',
            exercises: [
            {
      id: 'ml214-7-1',
      icon: '📅',
      title: 'Frekvens',
      question: 'Hvor ofte bør samtalen skje?',
      choices: [
        { id: 'a', label: 'Aldri', isCorrect: false, feedback: 'For lite.' },
{ id: 'b', label: 'Minst årlig, helst kvartalsvis', isCorrect: true, feedback: 'Riktig! Hyppigere gir bedre dialog.' },
{ id: 'c', label: 'Hver dag', isCorrect: false, feedback: 'For ofte.' },
{ id: 'd', label: 'Kun ved problemer', isCorrect: false, feedback: 'For reaktivt.' },
      ],
      espenTip: 'Moderne praksis: kortere men hyppigere samtaler. Årlig samtale er for sjelden.',
    },
    {
      id: 'ml214-7-2',
      icon: '📅',
      title: 'Best praksis',
      question: 'Hva kjennetegner god samtale?',
      choices: [
        { id: 'a', label: 'Bare lederen snakker', isCorrect: false, feedback: 'Skal være dialog.' },
{ id: 'b', label: 'Forberedt, dokumentert, dialogbasert, med konkrete tiltak', isCorrect: true, feedback: 'Riktig! Strukturert prosess.' },
{ id: 'c', label: 'Tilfeldig prat', isCorrect: false, feedback: 'For lite verdi.' },
{ id: 'd', label: 'Bare lønnsdiskusjon', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Send agenda 1 uke før. Ansatt forbereder også. Skriv ned tiltak med deadline.',
    },
    {
      id: 'ml214-7-3',
      icon: '📅',
      title: 'Vanlig feil',
      question: 'Hva er klassisk feil?',
      choices: [
        { id: 'a', label: 'Forberedelse', isCorrect: false, feedback: 'Det er bra.' },
{ id: 'b', label: 'Skje sjelden, uforberedt, uten oppfølging — ren ritualistisk øvelse', isCorrect: true, feedback: 'Riktig! Mister verdien.' },
{ id: 'c', label: 'For ofte', isCorrect: false, feedback: 'Sjelden problem.' },
{ id: 'd', label: 'For mye dokumentasjon', isCorrect: false, feedback: 'Lite problem.' },
      ],
      espenTip: 'Test: skjer det noe konkret etter samtalen? Hvis ikke, er den ritualistisk.',
    },
            ],
          },
          {
            phaseNumber: 8,
            icon: '🚪',
            title: 'Personalavvikling',
            quote: 'Oppsigelse på en lovlig måte.',
            content: 'Oppsigelse og avskjed på en ryddig og lovlig måte. Krav til saklig grunn, drøftingsmøte, rett til advokat. Slurv her gir både rettssaker og dårlig omdømme. Statoils 8000-personers nedbemanning 2014-2016 er klassisk eksempel på god håndtering — åpenhet, sluttpakker, omplassering.',
            subpoints: [
                  { label: 'LOVKRAV', text: 'Saklig grunn, drøftingsmøte, dokumentasjon.' },
          { label: 'OMDØMME', text: 'Hvordan avvikles påvirker bedriftens omdømme.' },
            ],
            practical: 'Hva ville vært viktig hvis du måtte si opp en kollega?',
            exercises: [
            {
      id: 'ml214-8-1',
      icon: '🚪',
      title: 'Saklig grunn',
      question: 'Hva kreves?',
      choices: [
        { id: 'a', label: 'Ingenting', isCorrect: false, feedback: 'Strenge krav.' },
{ id: 'b', label: 'Saklig grunn (mangelfull arbeidsutførelse, nedbemanning, mislighold)', isCorrect: true, feedback: 'Riktig! Loven krever klar grunn.' },
{ id: 'c', label: 'Bare lederens magefølelse', isCorrect: false, feedback: 'Helt urealistisk.' },
{ id: 'd', label: 'Bare økonomisk argument', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Saklig grunn må kunne dokumenteres. Vagt \'pasret ikke kulturen\' er sjelden nok.',
    },
    {
      id: 'ml214-8-2',
      icon: '🚪',
      title: 'Drøftingsmøte',
      question: 'Hva er drøftingsmøte?',
      choices: [
        { id: 'a', label: 'Ferieplanlegging', isCorrect: false, feedback: 'Helt feil.' },
{ id: 'b', label: 'Lovpålagt møte før oppsigelse — gir ansatt mulighet til å bli hørt', isCorrect: true, feedback: 'Riktig! Prosesskrav.' },
{ id: 'c', label: 'Bare for ledere', isCorrect: false, feedback: 'Gjelder alle ansatte.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'Brudd på drøftings-prosess kan være selvstendig grunn for å sette oppsigelse til side.',
    },
    {
      id: 'ml214-8-3',
      icon: '🚪',
      title: 'Statoil',
      question: 'Hva gjorde Statoil bra i 2014-16?',
      choices: [
        { id: 'a', label: 'Ingen nedbemanning', isCorrect: false, feedback: 'Faktisk 8000+ stillinger.' },
{ id: 'b', label: 'Åpen prosess, sluttpakker, omplasseringskurs — bevarte omdømme', isCorrect: true, feedback: 'Riktig! Klassisk eksempel på ryddig nedbemanning.' },
{ id: 'c', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert prosess.' },
{ id: 'd', label: 'Hemmelig', isCorrect: false, feedback: 'Tvert imot — åpen.' },
      ],
      espenTip: 'Resultat: lave rettssaker, bevart omdømme, mange kom tilbake da markedet snudde.',
    },
            ],
          },
          {
            phaseNumber: 9,
            icon: '🌟',
            title: 'Employer branding',
            quote: 'Bli en attraktiv arbeidsgiver.',
            content: 'Employer Branding: hvordan bedriften fremstår som arbeidsgiver. Konkurranse om talent er like hard som konkurranse om kunder. Equinor, DnB, Telenor bruker millioner på å fremstå som førstevalg. Innebærer kultur, lønn, utviklingsmuligheter, omdømme — alt som gjør at folk vil jobbe der.',
            subpoints: [
                  { label: 'TALENT-KONKURRANSE', text: 'Som hard som kunde-konkurranse.' },
          { label: 'HELHETLIG', text: 'Kultur + lønn + utvikling + omdømme — alt teller.' },
            ],
            practical: 'Hvilke bedrifter ville du jobbet for? Hvorfor? Hva gjør dem attraktive?',
            exercises: [
            {
      id: 'ml214-9-1',
      icon: '🌟',
      title: 'Hva',
      question: 'Hva er employer branding?',
      choices: [
        { id: 'a', label: 'Bedriftens logo', isCorrect: false, feedback: 'Bredere konsept.' },
{ id: 'b', label: 'Hvordan bli attraktiv arbeidsgiver i konkurransen om talent', isCorrect: true, feedback: 'Riktig! Strategisk merkebygging mot ansatte og potensielle ansatte.' },
{ id: 'c', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Bare reklame mot ansatte', isCorrect: false, feedback: 'For smalt.' },
      ],
      espenTip: 'Employer branding-rangeringer (Universum) påvirker hvor folk søker. Strategisk verdi.',
    },
    {
      id: 'ml214-9-2',
      icon: '🌟',
      title: 'Talent-konkurranse',
      question: 'Hvorfor så viktig?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturell endring.' },
{ id: 'b', label: 'Talent er strategisk ressurs — best folk gir best resultater', isCorrect: true, feedback: 'Riktig! Særlig i kunnskapsøkonomien.' },
{ id: 'c', label: 'Bare for tek', isCorrect: false, feedback: 'Gjelder alle bransjer.' },
{ id: 'd', label: 'Lovkrav', isCorrect: false, feedback: 'Helt urelevant.' },
      ],
      espenTip: 'Google, Apple bruker mer på rekruttering enn reklame. Talent er deres viktigste innsatsfaktor.',
    },
    {
      id: 'ml214-9-3',
      icon: '🌟',
      title: 'Norsk eksempel',
      question: 'Hvilken norsk bedrift har sterk employer brand?',
      choices: [
        { id: 'a', label: 'Tilfeldig', isCorrect: false, feedback: 'Strategisk valg.' },
{ id: 'b', label: 'Equinor — drømmearbeidsgiver for norske ingeniørstudenter', isCorrect: true, feedback: 'Riktig! Konsistent toppplassering i Universum-undersøkelser.' },
{ id: 'c', label: 'Bare offentlige', isCorrect: false, feedback: 'Privat sektor like sterk.' },
{ id: 'd', label: 'Bare i Oslo', isCorrect: false, feedback: 'Nasjonalt fenomen.' },
      ],
      espenTip: 'Equinor får tilgang til de beste kandidatene — strategisk fortrinn i innovasjon.',
    },
            ],
          },
          {
            phaseNumber: 10,
            icon: '📊',
            title: 'HR-strategi',
            quote: 'Folk er strategisk ressurs.',
            content: 'HR-strategi: planlegging av fremtidig kompetanseebehov. Hvilke ferdigheter trenger vi om 3 år? Hvor henter vi dem? Hvordan beholder vi nøkkeltalentene? Strategiske spørsmål som ikke kan løses akutt — krever 2-5 års horisont. I kunnskapsøkonomien er HR ofte den viktigste strategiske disiplinen.',
            subpoints: [
                  { label: 'LANGSIKTIG', text: '2-5 års horisont — ikke akutte beslutninger.' },
          { label: 'STRATEGISK', text: 'I kunnskapsøkonomien ofte viktigste strategi.' },
            ],
            practical: 'Hva tror du er bedriften du jobber for / kjenner sin viktigste fremtidige kompetanse?',
            exercises: [
            {
      id: 'ml214-10-1',
      icon: '📊',
      title: 'Tidshorisont',
      question: 'Hvor langt frem ser HR-strategi?',
      choices: [
        { id: 'a', label: 'Neste uke', isCorrect: false, feedback: 'For kort.' },
{ id: 'b', label: '2-5 år frem', isCorrect: true, feedback: 'Riktig! Kompetansebygging tar tid.' },
{ id: 'c', label: 'Bare neste år', isCorrect: false, feedback: 'For kort.' },
{ id: 'd', label: '100 år', isCorrect: false, feedback: 'Overdrevet.' },
      ],
      espenTip: 'Du kan ikke \'rekruttere ekspertgruppe i AI\' over natten. Krever flere år å bygge.',
    },
    {
      id: 'ml214-10-2',
      icon: '📊',
      title: 'Spørsmål',
      question: 'Hva er kjernespørsmålene?',
      choices: [
        { id: 'a', label: 'Bare lønn', isCorrect: false, feedback: 'For smalt.' },
{ id: 'b', label: 'Hva trenger vi? Hvor finner vi det? Hvordan beholder vi dem?', isCorrect: true, feedback: 'Riktig! Strategiske spørsmål.' },
{ id: 'c', label: 'Bare oppsigelse', isCorrect: false, feedback: 'For smalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturert.' },
      ],
      espenTip: 'HR-strategi knytter folk til forretningsstrategi. Uten kobling blir det administrasjon.',
    },
    {
      id: 'ml214-10-3',
      icon: '📊',
      title: 'Hvorfor strategisk',
      question: 'Hvorfor er folk strategisk ressurs?',
      choices: [
        { id: 'a', label: 'Lovkrav', isCorrect: false, feedback: 'Strategisk verdi.' },
{ id: 'b', label: 'Folk er bedriftens eneste ressurs som kan tenke selv og innovere', isCorrect: true, feedback: 'Riktig! Maskiner gjør det de programmeres til. Mennesker tilpasser seg og skaper.' },
{ id: 'c', label: 'Bare i USA', isCorrect: false, feedback: 'Globalt.' },
{ id: 'd', label: 'Tilfeldig', isCorrect: false, feedback: 'Strukturelt sant.' },
      ],
      espenTip: 'Drucker: \'In the knowledge economy, the most valuable assets walk out the door every evening.\' Kritisk innsikt.',
    },
            ],
          },
        ]

        export default function PersonaladministrasjonHRMModule() {
          return (
            <DrawerModule
              moduleCode="ML2-14"
              moduleTitle="Personaladministrasjon og HRM"
              moduleIcon="👥"
              storageKey="learning-ml2-personaladministrasjon-hrm"
              completeRoute="/learning/ml2/personaladministrasjon-hrm/complete"
              phases={phases}
              intro="Human Resource Management — strategisk arbeid med mennesker. Rekruttering, motivasjon, kompetanseutvikling, belønning. Folk er bedriftens eneste ressurs som kan tenke selv."
              vissteduAt="Feil ansettelse er dyrt — opp til 6 ganger årslønnen i tap (rekruttering, opplæring, mistet produksjon). HR-strategi er økonomisk strategi."
              espenSier="Menneskene driver alle resultater. HR-strategi er ofte undervurdert sammenlignet med markeds- eller produktstrategi — men kan være det viktigste konkurransefortrinn."
      presentationLink={{ route: '/learning/presentations/ml2/personaladministrasjon-hrm', description: 'Personaladministrasjon og HRM — 10 slides' }}
            />
          )
        }
