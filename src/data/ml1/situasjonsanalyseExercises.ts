import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

export const SITUASJONSANALYSE_EXERCISES: QuizExercise[] = [
  {
    id: 'sa_1',
    icon: '🔲',
    title: 'SWOT — interne vs. eksterne faktorer',
    context: 'En norsk kaffebarkjede gjennomfører en SWOT-analyse. De har identifisert følgende faktorer: sterk merkevare, høy husleie i sentrumslokasjoner, voksende marked for spesialkaffe, og økt konkurranse fra internasjonale kjeder som Starbucks.',
    question: 'Hvilke faktorer i en SWOT-analyse er INTERNE?',
    choices: [
      { id: 'a', label: 'Muligheter og trusler — disse endres av markedet', isCorrect: false, feedback: 'Muligheter og trusler er EKSTERNE faktorer — de oppstår i omgivelsene utenfor bedriftens kontroll. Interne faktorer er det bedriften selv rår over.' },
      { id: 'b', label: 'Styrker og svakheter — disse er under bedriftens kontroll', isCorrect: true, feedback: 'Riktig! Styrker og svakheter er INTERNE — de handler om bedriftens egne ressurser, kompetanse og egenskaper. I eksemplet: sterk merkevare (styrke) og høy husleie (svakhet, men bedriften valgte lokasjonene).' },
      { id: 'c', label: 'Alle fire faktorer er interne siden bedriften selv gjennomfører analysen', isCorrect: false, feedback: 'Hvem som gjennomfører analysen er irrelevant for klassifiseringen. SWOT er alltid delt i interne (styrker/svakheter) og eksterne (muligheter/trusler) — uavhengig av hvem som analyserer.' },
      { id: 'd', label: 'Styrker og muligheter — begge er positive faktorer', isCorrect: false, feedback: 'Klassifiseringen i SWOT handler ikke om positivt/negativt, men om intern/ekstern. Styrker (interne, positive) og muligheter (eksterne, positive) — men de er i ulike kategorier fordi bedriften kontrollerer styrker, men ikke muligheter.' },
    ],
    espenTip: 'Huskeregel for SWOT: Styrker og Svakheter = Selskapet (internt). Muligheter og trusler = Markedet (eksternt). S og S = interne. M og T = eksterne.',
  },
  {
    id: 'sa_2',
    icon: '🌍',
    title: 'PESTEL — GDPR-kategorisering',
    context: 'Spotify gjennomfører en PESTEL-analyse for sin europeiske ekspansjon. De må hensynta GDPR (General Data Protection Regulation), EU-lovgivning om personvern som regulerer hvordan de kan samle inn og bruke brukerdata.',
    question: 'Spotify gjennomfører en PESTEL-analyse. Hvilken faktor er GDPR?',
    choices: [
      { id: 'a', label: 'Teknologisk (T) — GDPR handler om digital teknologi og databehandling', isCorrect: false, feedback: 'GDPR er ikke en teknologisk faktor — det er en juridisk regulering. Teknologiske PESTEL-faktorer inkluderer ny teknologi, digitalisering og automatisering (f.eks. AI-utvikling, 5G). GDPR setter juridiske rammer for bruk av teknologi.' },
      { id: 'b', label: 'Legal (L) — GDPR er en EU-lov om personvern som regulerer databruk', isCorrect: true, feedback: 'Riktig! Legal (L) i PESTEL inkluderer alle lover og reguleringer bedriften må forholde seg til: forbrukervern, arbeidsmiljølov, GDPR, konkurranserett. GDPR er EU-lovgivning — juridisk, ikke teknologisk.' },
      { id: 'c', label: 'Politisk (P) — GDPR ble vedtatt av EU-parlamentet som en politisk beslutning', isCorrect: false, feedback: 'Selv om politiske beslutninger kan føre til lover, skiller PESTEL mellom P (politisk klima, handelspolitikk, subsidier) og L (konkrete lover og reguleringer). GDPR er en lov som påvirker drift direkte — det er L.' },
      { id: 'd', label: 'Sosialt (S) — GDPR handler om samfunnets krav om personvern', isCorrect: false, feedback: 'Sosiale PESTEL-faktorer handler om demografiske trender, livsstilsendringer og kulturelle verdier (f.eks. økt helse-bevissthet). Selv om personvern er en sosial verdi, er GDPR en konkret lov — og det er L (Legal).' },
    ],
    espenTip: 'PESTEL-huskeregel: P=politikk, E=økonomi, S=samfunn/demografi, T=teknologi, E=miljø, L=lover. Når du er usikker: er det en konkret lov? → L. Er det en trend i befolkningen? → S.',
  },
  {
    id: 'sa_3',
    icon: '⚔️',
    title: 'Porters fem krefter — substitutter',
    context: 'Norges togoperatører (VY) analyserer sin konkurrentsituasjon. De identifiserer at folk som vil reise mellom Oslo og Bergen kan velge fly (Norwegian/SAS), buss (NOR-WAY Bussekspress), eller bil. I tillegg vurderer noen om de trenger å reise i det hele tatt (videomøter).',
    question: 'Hva er "substitutter" i Porters fem krefter?',
    choices: [
      { id: 'a', label: 'Direkte konkurrenter som tilbyr samme type produkt (andre togoperatører)', isCorrect: false, feedback: 'Direkte konkurrenter (andre togoperatører) hører til kraften "Rivalisering blant eksisterende konkurrenter" — ikke substitutter. Substitutter er alternative produkter fra andre bransjer som løser samme behov.' },
      { id: 'b', label: 'Alternative produkter eller tjenester som dekker samme kundebehov', isCorrect: true, feedback: 'Riktig! Substitutter er produkter/tjenester fra andre bransjer som løser det samme behovet. For tog: fly, buss, bil, og videomøter (eliminerer reisebehovet helt). Substitutter begrenser prisnivået — hvis tog er for dyrt, tar folk fly.' },
      { id: 'c', label: 'Nye aktører som ønsker å etablere seg i jernbanebransjen', isCorrect: false, feedback: 'Nye aktører i samme bransje tilhører kraften "Trussel fra nykommere". Substitutter kommer fra andre bransjer og løser det samme grunnleggende behovet — i dette tilfellet: transportbehovet mellom byer.' },
      { id: 'd', label: 'Leverandører av tog og jernbanetjenester som kan øke prisene', isCorrect: false, feedback: 'Leverandørers prismakt er en egen kraft — "Leverandørers forhandlingsmakt". Substitutter er kundesiden: alternative måter kunden kan dekke samme behov på, uten å bruke din tjeneste.' },
    ],
    espenTip: 'Netflix er substitutt for kino, ikke konkurrent. Spotify er substitutt for platebutikken. Substitutter kommer gjerne fra uventet hold — det er derfor de er farlige. Uber kom ikke fra taxibransjen selv.',
  },
  {
    id: 'sa_4',
    icon: '🐄',
    title: 'BCG-matrisen — klassifisering',
    context: 'Et norsk konsern har to produkter: 1) Traktorprogramvare med 65% markedsandel i et stabilt, lavvekstmarked. 2) En ny app for presisjonsjordbruk i et marked som vokser 40% per år, men der de har 8% markedsandel.',
    question: 'En bedrift har et produkt med høy markedsandel i et lavvekstmarked. Hva kaller BCG-matrisen dette?',
    choices: [
      { id: 'a', label: 'Stjerne — høy markedsandel og sterk posisjon', isCorrect: false, feedback: 'Stjerner har høy markedsandel OG høy markedsvekst. Traktorprogramvaren har høy markedsandel, men lav vekst — det er en annen kategori. Stjerner er fremtidens melkekyr, men trenger fortsatt investeringer for å vokse.' },
      { id: 'b', label: 'Melkeku — et modent produkt som genererer stabil kontantstrøm', isCorrect: true, feedback: 'Riktig! Melkekyr = høy markedsandel + lavvekstmarked. De er bedriftens kontantstrøm-generatorer. Lite investeringsbehov (markedet vokser ikke), men stabil inntekt. Traktorprogramvaren med 65% andel i et stabilt marked er en typisk melkeku.' },
      { id: 'c', label: 'Spørsmålstegn — usikkert potensial krever analysering', isCorrect: false, feedback: 'Spørsmålstegn har lav markedsandel i et høyvekstmarked (usikkert potensial). Appen med 8% andel i et marked som vokser 40% per år er spørsmålstegnet i eksemplet — ikke traktorprogramvaren.' },
      { id: 'd', label: 'Hund — begrenset fremtidspotensial og bør avvikles', isCorrect: false, feedback: 'Hunder har lav markedsandel OG lav markedsvekst — svake produkter i stagnerende markeder. Traktorprogramvaren har HØY markedsandel (65%) — det er ikke en hund, men en verdifull melkeku.' },
    ],
    espenTip: 'BCG-logikken: Bruk melkekyrenes kontantstrøm til å investere i stjernene og potensielle spørsmålstegn. Avvikle hundene. Enkelt prinsipp — vanskelig å følge i praksis fordi alle er følelsesmessig knyttet til "hundene".',
  },
  {
    id: 'sa_5',
    icon: '📊',
    title: 'Primærdata vs. sekundærdata',
    context: 'En ny norsk klesbutikk vurderer om de skal åpne i Trondheim. De kan enten: A) Kjøpe SSB-data om Trondheims befolkningssammensetning og lese konkurrenters årsrapporter (gratis/billig), eller B) Gjennomføre spørreundersøkelse blant Trondheimsinnbyggere om deres kleshandlingsvaner (kostbart).',
    question: 'Hva er fordelen med primærdata fremfor sekundærdata?',
    choices: [
      { id: 'a', label: 'Primærdata er alltid billigere og raskere å innhente', isCorrect: false, feedback: 'Det motsatte er sant. Primærdata (spørreundersøkelser, intervjuer, fokusgrupper) er dyrere og mer tidkrevende enn sekundærdata. Fordelen med primærdata er ikke kostnader, men relevans og spesifisitet.' },
      { id: 'b', label: 'Primærdata er skreddersydd for din spesifikke problemstilling', isCorrect: true, feedback: 'Riktig! Primærdata samles inn direkte for å besvare DIN problemstilling. SSB-data kan fortelle deg om Trondheimsbefolkningens inntekt, men ikke om de foretrekker din type klær. Spørreundersøkelsen gir deg akkurat det svaret.' },
      { id: 'c', label: 'Primærdata er mer pålitelig fordi det er nyere enn sekundærdata', isCorrect: false, feedback: 'Aktualitet avhenger av innsamlingstidspunktet, ikke datatypen. Sekundærdata kan være nyere (Google Trends fra i går) enn primærdata fra en undersøkelse gjort for 6 måneder siden. Fordelen med primærdata er spesifisitet, ikke aktualitet.' },
      { id: 'd', label: 'Primærdata er tilgjengelig for alle og kan deles med konkurrenter', isCorrect: false, feedback: 'Det er en fordel med SEKUNDÆRDATA — det er offentlig tilgjengelig og gratis. Primærdata som du samler inn er din eksklusive informasjon som konkurrenter ikke har tilgang til. Det er en konkurransefordel, ikke en ulempe.' },
    ],
    espenTip: 'Praktisk regel: Start MED sekundærdata (gratis, raskt) og bruk det til å avgrense hva du IKKE vet. Bruk deretter primærdata kun for de resterende spørsmålene. Slik sparer du ressurser og får bedre svar.',
  },
]
