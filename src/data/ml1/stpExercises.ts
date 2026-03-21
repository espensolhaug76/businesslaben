import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const STP_EXERCISES: QuizExercise[] = [
  {
    id: 'stp_1',
    icon: '🚗',
    title: 'Posisjonering — Volvo og sikkerhet',
    context: 'Volvo har siden 1950-tallet konsekvent kommunisert sikkerhet i absolutt all sin markedsføring — produktdesign, reklame, sponsing og PR. Selv da de fikk nye eiere (Geely fra Kina i 2010), beholdt de denne posisjonen.',
    question: 'Volvo har i 40+ år kommunisert "sikkerhet" i all sin markedsføring. Hva kalles dette?',
    choices: [
      { id: 'a', label: 'Merkevarebygging — Volvo har brukt mye penger på reklame', isCorrect: false, feedback: 'Merkevarebygging er bredere enn posisjonering. Det spesifikke Volvo gjør er å eie ett klart konsept ("sikkerhet") i kundens bevissthet — og holde det konsistent over tiår. Det er presis posisjonering, ikke bare reklame-investering.' },
      { id: 'b', label: 'Tydelig posisjonering — Volvo eier ordet "sikkerhet" i kundens bevissthet', isCorrect: true, feedback: 'Riktig! Posisjonering handler om å okkupere ett klart, meningsfullt sted i kundens sinn. Volvo eier "sikkerhet" like tydelig som BMW eier "kjøreglede" og Mercedes eier "prestige". Konsistens over tid er selve styrken.' },
      { id: 'c', label: 'Differensiert markedsdekning — Volvo retter seg mot mange segmenter', isCorrect: false, feedback: 'Differensiert markedsdekning handler om å ha ulike tilbud til ulike segmenter. Volvos strategi er annerledes: de velger EN posisjoneringsdimensjon ("sikkerhet") og holder den konsistent på tvers av alle modeller og segmenter.' },
      { id: 'd', label: 'USP (Unique Selling Proposition) — en engangs salgsmelding', isCorrect: false, feedback: 'USP er beslektet, men posisjonering er mer varig og helhetlig. En USP kan være en kampanje-tagline. Posisjonering er den langsiktige, strategiske plassen du okkuperer i kundens bevissthet — og bygges over år, ikke kampanjer.' },
    ],
    espenTip: 'Jack Trout (markedsføringsguru): "Posisjonering er ikke hva du gjør med produktet — det er hva du gjør med kundens hjerne." Volvo har gjort dette bedre enn nesten noen annen bil-merke i verden.',
  },
  {
    id: 'stp_2',
    icon: '🗂️',
    title: 'Differensiert vs. udifferensiert strategi',
    context: 'Tine produserer melk. Tine Lettmelk markedsføres med fokus på helse og lavt fettinnhold til helse-bevisste voksne. Tine Helmelk markedsføres som næringsrik til barnefamilier. Tine Seterrømme posisjoneres som autentisk og tradisjonell for mat-interesserte.',
    question: 'Hva er forskjellen mellom differensiert og udifferensiert markedsdekning?',
    choices: [
      { id: 'a', label: 'Differensiert er dyrere; udifferensiert er billigere — ellers er de like', isCorrect: false, feedback: 'Kostnad er én konsekvens, men ikke definisjonen. Forskjellen er strategisk: differensiert tilpasser tilbud OG kommunikasjon til hvert segment. Udifferensiert ignorerer segmentforskjeller og behandler alle som ett marked.' },
      { id: 'b', label: 'Differensiert tilpasser tilbudet til hvert segment; udifferensiert bruker én tilnærming for alle', isCorrect: true, feedback: 'Riktig! Tine bruker differensiert strategi: ulike produkter, ulik kommunikasjon, ulike kanaler for helse-bevisste, barnefamilier og mat-interesserte. Udifferensiert hadde vært én melkekampanje rettet mot "alle nordmenn".' },
      { id: 'c', label: 'Differensiert betyr fokus på ett smalt nisjesegment; udifferensiert er bredere', isCorrect: false, feedback: 'Du tenker på niche/konsentrert markedsdekning, ikke differensiert. Differensiert betyr FLERE segmenter med tilpassede tilbud til hvert. Niche/konsentrert betyr ALL ressurs på ETT smalt segment (f.eks. Ferrari).' },
      { id: 'd', label: 'Udifferensiert er den moderne tilnærmingen; differensiert er foreldet massemarkeds-strategi', isCorrect: false, feedback: 'Det er omvendt. Udifferensiert (masse-marketing) var dominant på 1950-60-tallet. Differensiert markedsdekning er den moderne tilnærmingen, muliggjort av digital targeting som lar bedrifter nå presise segmenter kostnadseffektivt.' },
    ],
    espenTip: 'Digitale medier har gjort differensiert strategi langt billigere enn før. En Facebook-annonse for Tine Lettmelk kan vises KUN til kvinner 25–45 år med interesse for helse — det koster ikke mer enn en generell annonse.',
  },
  {
    id: 'stp_3',
    icon: '🛒',
    title: 'Rema 1000 og sortimentsposisjonering',
    context: 'Rema 1000 har bevisst valgt et sortiment på ca. 350 varer. Meny har over 3 000 varer. Coop Extra har ca. 2 500 varer. Remas "Det enkle er ofte det beste"-filosofi gjennomsyrer alt fra butikkdesign til kommunikasjon.',
    question: 'Rema 1000 velger et sortiment på 350 varer (vs. Meny 3 000). Hvilken posisjoneringsstrategi og -fordel gir dette?',
    choices: [
      { id: 'a', label: 'Kostnadslederskap — færre varer betyr lavere lagerkostnader og bedre priser', isCorrect: false, feedback: 'Lavere kostnader er én konsekvens, men ikke hele strategien. Rema posisjonerer seg eksplisitt på ENKELHET og kundeopplevelse, ikke bare pris. Kostnadslederskap er Porters generiske strategi — Remas posisjonering er mer nyansert enn bare "billigst".' },
      { id: 'b', label: 'Enkelhet og oversikt — kunder slipper beslutningsstress og handler raskere', isCorrect: true, feedback: 'Riktig! "Decision fatigue" (beslutningsstress) er reelt — for mange valg gjør kunder mindre tilfreds. Remas smale sortiment er en bevisst posisjoneringsstrategi: gjør shopping enklere, raskere og mindre stressende. "Det enkle er ofte det beste."' },
      { id: 'c', label: 'Nisjeposisjonering — Rema fokuserer på et smalt segment av eksklusiv mat', isCorrect: false, feedback: 'Rema er det motsatte av nisje — de er en av Norges bredeste dagligvarekjeder med over 700 butikker og retter seg mot brede befolkningssegmenter. Nisjeprodukter og gourmet er det de bevisst HAR valgt BORT.' },
      { id: 'd', label: 'Differensiert strategi — 350 ulike produkter for 350 ulike målgrupper', isCorrect: false, feedback: 'Antallet produkter er ikke det samme som antallet segmenter. Remas strategi er å tilby ett enkelt, oversiktlig sortiment til sin bredde målgruppe — ikke å differensiere på segmentnivå med produkttilpasning.' },
    ],
    espenTip: 'Forskning viser at butikker med færre produkter har høyere kundetilfredshet. "The Paradox of Choice" (Barry Schwartz): jo flere valg, jo mer stress og jo lavere tilfredshet. Rema har bygget sin posisjonering på denne innsikten.',
  },
  {
    id: 'stp_4',
    icon: '🧑',
    title: 'Persona i markedsføring',
    context: 'Nike Women\'s markedsføringsteam har utviklet "Marte Nilsen, 32 år, Oslo, personlig trener, trener 5 ganger/uke, følger treningsinfluencere på Instagram, vil ha funksjonelt treningsklær som ser bra ut, frustrert over klær som ikke tåler intens trening." All kommunikasjon og produktutvikling testes mot Marte.',
    question: 'Hva er en "persona" i markedsføring?',
    choices: [
      { id: 'a', label: 'En faktisk eksisterende lojal kunde som brukes som ambassadør', isCorrect: false, feedback: 'Det er en merkevareambassadør eller kundecasehistorie — ikke en persona. En persona er semi-fiktiv: basert på data fra mange ekte kunder, men representerer ingen enkelt virkelig person. "Marte" er en arketyp, ikke en virkelig person.' },
      { id: 'b', label: 'En semi-fiktiv representasjon av den ideelle kunden, basert på data og innsikt', isCorrect: true, feedback: 'Riktig! En persona er en datadrevet arketyp som representerer et segment. "Marte" representerer tusenvis av norske treningskvinner i 30-årene — ikke én spesifikk person, men en sammensatt representasjon basert på ekte data og innsikt.' },
      { id: 'c', label: 'En demografisk statistikk over målgruppens gjennomsnittsegenskaper', isCorrect: false, feedback: 'Statistikk er grunnlaget for en persona, men er ikke en persona i seg selv. En god persona går langt utover demografi og inkluderer mål, frustrasjoner, medievaner og motivasjoner — den gjør statistikken menneskelig og handlingsbar.' },
      { id: 'd', label: 'Et fiktivt kundeeksempel brukt kun i presentasjoner og salgsmateriell', isCorrect: false, feedback: 'En persona er ikke en presentasjonsgreie — den er et strategisk arbeidsverktøy. All produktutvikling, kommunikasjon og kanalvalg testes mot personaen: "Ville Marte likt dette? Ville hun sett denne annonsen? Ville hun kjøpt dette produktet?"' },
    ],
    espenTip: 'HubSpot-undersøkelse: Markedsføring basert på tydelige personas genererer 18x mer omsetning enn generisk masse-kommunikasjon. Skriv til én person — da treffer du alle som ligner på den personen.',
  },
  {
    id: 'stp_5',
    icon: '🔄',
    title: 'STP-rekkefølgen',
    context: 'En norsk startup vil lansere en ny type proteinbar. De har gjennomført markedsundersøkelser og delt det potensielle markedet inn i: aktive idrettsutøvere, helse-bevisste kontorarbeidere, og folk på vektreduksjonsprogram. Neste steg er å avgjøre hvem de skal henvende seg til.',
    question: 'I STP-prosessen, hva kommer ETTER segmentering?',
    choices: [
      { id: 'a', label: 'Posisjonering — bestemme merkevareidentitet og kommunikasjonsbudskap', isCorrect: false, feedback: 'Posisjonering er siste steg i STP — ikke det som kommer rett etter segmentering. Du kan ikke posisjonere deg uten å ha valgt hvem du posisjonerer deg for. Rekkefølgen er logisk nødvendig: del opp markedet → velg segment → posisjonér deg for valgt segment.' },
      { id: 'b', label: 'Targeting — valg av hvilke segmenter bedriften vil henvende seg til', isCorrect: true, feedback: 'Riktig! S → T → P er en logisk sekvensiell prosess. Etter segmentering (dele markedet i grupper) kommer Targeting (velge hvilke grupper å henvende seg til). For proteinbar-startupen: skal de fokusere på idrettsutøvere, kontorarbeidere, eller begge?' },
      { id: 'c', label: 'Markedsmiks (4P) — utvikle produkt, pris, distribusjon og kommunikasjon', isCorrect: false, feedback: 'Markedsmiksen (4P) utvikles ETTER STP — den er taktikken som implementerer STP-strategien. Uten klar segmentering, targeting og posisjonering vet du ikke hvilke 4P-valg du skal ta. STP er fundamentet; 4P er bygningen.' },
      { id: 'd', label: 'Analyse — gjennomføre dybdeanalyse av hvert segment', isCorrect: false, feedback: 'Analyse gjøres under segmenteringsfasen — du analyserer segmentenes størrelse, vekst og attraktivitet for å finne de beste segmentene. Etter at segmentene er identifisert og analysert, er neste logiske steg å velge hvilke du vil bearbeide (targeting).' },
    ],
    espenTip: 'STP-rekkefølgen er ikke tilfeldig — den er logisk nødvendig. Du kan ikke posisjonere deg uten å vite for hvem. Du kan ikke velge segment uten å ha delt opp markedet. Og alle tre steg må være på plass før du utvikler markedsmiksen.',
  },
]
