import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '📣 God kommunikasjon handler ikke om å rope høyest — det handler om å si riktig ting, til riktig person, på riktig tidspunkt!'

export const KOMMUNIKASJON_KANALER_EXERCISES: QuizExercise[] = [
  {
    id: 'kk-01',
    icon: '📣',
    title: 'AIDA-modellen',
    context:
      'Rema 1000 lanserer en ny kampanje for sine billigste matvarer. De bruker plakater i kollektivtrafikk (store bilder av mat), en catchy jingle på radio, en nettside med alle tilbudene, og en "klikk for å finne nærmeste butikk"-knapp.',
    question: 'Hvilken fase i AIDA-modellen representerer "klikk for å finne nærmeste butikk"-knappen?',
    choices: [
      {
        id: 'a',
        label: 'Attention — knappen fanger oppmerksomheten til nye kunder.',
        isCorrect: false,
        feedback:
          'Feil. Attention er den første fasen der du fanger oppmerksomhet for første gang. En "finn butikk"-knapp vises til folk som allerede er interessert og besøker nettsiden — de er forbi Attention-fasen.',
      },
      {
        id: 'b',
        label: 'Interest — knappen holder interessen oppe ved å gi nyttig informasjon om butikker.',
        isCorrect: false,
        feedback:
          'Feil. Interest-fasen handler om å bygge nysgjerrighet og engasjement etter at oppmerksomheten er fanget. En handlingsknapp som ber deg gjøre noe konkret er ikke Interest — det er en oppfordring til handling.',
      },
      {
        id: 'c',
        label: 'Desire — knappen skaper ønske om å besøke butikken ved å vise den er nær deg.',
        isCorrect: false,
        feedback:
          'Feil. Desire-fasen handler om å omdanne interesse til et aktivt ønske om å kjøpe. En "finn butikk"-knapp er ikke ment å skape ønske — den er et verktøy for å konvertere eksisterende ønske til handling.',
      },
      {
        id: 'd',
        label: 'Action — knappen er en direkte oppfordring til handling (CTA) som konverterer interesse til faktisk butikkbesøk.',
        isCorrect: true,
        feedback:
          'Riktig! Action-fasen er det endelige steget der du gjør det lett for kunden å handle — kjøpe, besøke, registrere seg. En "finn butikk"-knapp er en klassisk Call-to-Action (CTA) som senker terskelen for å gå fra tanke til handling.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'kk-02',
    icon: '🔄',
    title: 'Push vs pull-markedsføring',
    context:
      'Nike sender bannere til folk som ikke har søkt på løpesko (Google Display Ads). Samtidig investerer de i YouTube-videoer om løpeteknikk som rangerer høyt i søk — folk finner dem aktivt.',
    question: 'Hva er forskjellen mellom push- og pull-markedsføring slik Nike illustrerer?',
    choices: [
      {
        id: 'a',
        label: 'Push-markedsføring er dyrere enn pull-markedsføring.',
        isCorrect: false,
        feedback:
          'Feil. Kostnad er ikke definisjonsforskjellen. Begge kan være dyre eller billige avhengig av skala. SEO-innhold (pull) kan koste mye å produsere, mens organisk push på sosiale medier kan være gratis.',
      },
      {
        id: 'b',
        label: 'Push: budskapet presses ut til folk som ikke nødvendigvis har søkt det (Display Ads, TV-reklame). Pull: innhold og tilstedeværelse trekker kunder som aktivt søker (SEO, blogg, YouTube).',
        isCorrect: true,
        feedback:
          'Riktig! Push-markedsføring avbryter og eksponerer folk som ikke spurte om det. Pull-markedsføring appellerer til folk som allerede har vist interesse gjennom søk eller frivillig innholdskonsumpsjon. Pull gir generelt høyere konverteringsrate fordi kunden er i kjøpsmodus.',
      },
      {
        id: 'c',
        label: 'Push brukes på sosiale medier; pull brukes i TV og radio.',
        isCorrect: false,
        feedback:
          'Feil. Begge strategier kan brukes i alle medier. Betalt annonsering på Instagram er push. Organisk innhold på Instagram som folk følger frivillig er pull. Det handler om retningen på kommunikasjonen, ikke kanalen.',
      },
      {
        id: 'd',
        label: 'Pull-markedsføring er alltid bedre fordi kunden er mer mottakelig.',
        isCorrect: false,
        feedback:
          'Feil. Begge strategier har sin plass. Pull virker best for folk som allerede vurderer kjøp. Push er nødvendig for å nå folk som ikke kjenner til produktet ennå — det er slik nye merkevarer bygges. Den beste strategien kombinerer begge.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'kk-03',
    icon: '💰',
    title: 'Betalte, fortjente og eide medier',
    context:
      'Red Bull bruker tre kanaler: (1) de kjøper annonseplass på TV og i nettaviser, (2) de sponser Red Bull Rampage og innholdet spres organisk av fans, (3) de har egne YouTube- og Instagram-kanaler med millioner av følgere.',
    question: 'Hvilken kanalkategori er mest verdifull på lang sikt, og hvorfor?',
    choices: [
      {
        id: 'a',
        label: 'Betalte medier (paid) — fordi de garanterer rekkevidde og synlighet.',
        isCorrect: false,
        feedback:
          'Feil. Betalte medier er effektive men stopper når budsjettet er brukt opp. De bygger ikke varig verdi — det er en "leie" av oppmerksomhet. Rekkevidde garanteres, men lojalitet og organisk vekst bygges ikke.',
      },
      {
        id: 'b',
        label: 'Fortjente medier (earned) — fordi organisk spredning fra fans har høyest troverdighet og koster ingenting per eksponering.',
        isCorrect: true,
        feedback:
          'Riktig! Fortjente medier er omtale, deling og oppmerksomhet du ikke betaler for. Red Bull Rampage-videoer deles av millioner fans globalt — Red Bull betaler for arrangementet, men spredningen er gratis. Peer-to-peer anbefalinger har høyere troverdighet enn betalt reklame.',
      },
      {
        id: 'c',
        label: 'Eide medier (owned) — fordi Red Bull kontrollerer dem og de er gratis å bruke.',
        isCorrect: false,
        feedback:
          'Eide medier (egne kanaler, nettside, e-postliste) er svært verdifulle fordi du kontrollerer dem og ikke er avhengig av algoritmene. Men de er ikke "gratis" — innholdsproduksjon er kostbart. Og de er ikke mer verdifulle enn fortjente medier i det lange løp.',
      },
      {
        id: 'd',
        label: 'Alle tre er like viktige og bør alltid vektes likt.',
        isCorrect: false,
        feedback:
          'Feil. De tre mediekategoriene har ulike styrker og svakheter. I praksis er fortjente medier som regel mest verdifulle fordi de er skalerbare uten proporsjonale kostnader. Men den optimale miksen avhenger av merkevare, bransje og målgruppe.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'kk-04',
    icon: '🤖',
    title: 'Algoritmer og organisk rekkevidde',
    context:
      'En liten norsk klesbutikk poster to ganger daglig på Instagram. Organisk rekkevidde er sunket til 3% av følgerne. En konkurrent postet ett innhold som gikk viralt og nådde 400 000 mennesker organisk.',
    question: 'Hva er den viktigste faktoren Instagram-algoritmen prioriterer for å øke organisk rekkevidde?',
    choices: [
      {
        id: 'a',
        label: 'Publiseringsfrekvens — jo mer du poster, jo mer synlighet får du.',
        isCorrect: false,
        feedback:
          'Feil. Hyppig posting uten engasjement kan faktisk skade rekkevidde. Algoritmer som Instagrams prioriterer innhold som genererer høyt engasjement (likes, kommentarer, lagringer, delinger) — ikke antall poster. To daglige poster med lav engasjement er verre enn én post med høyt engasjement per uke.',
      },
      {
        id: 'b',
        label: 'Engasjement (likes, kommentarer, lagringer, delinger) — algoritmen tolker høyt engasjement som et signal på at innholdet er verdifullt og viser det til flere.',
        isCorrect: true,
        feedback:
          'Riktig! Sosiale medier-algoritmer er designet for å maksimere tid brukerne bruker på plattformen. Innhold med høyt engasjement vises til flere fordi det holder folk på plattformen lenger. Lagringer og delinger vektes typisk høyere enn likes fordi de signaliserer høyere verdi.',
      },
      {
        id: 'c',
        label: 'Antall følgere — kontoer med flest følgere får alltid mest organisk rekkevidde.',
        isCorrect: false,
        feedback:
          'Feil. Antall følgere gir ikke automatisk høy organisk rekkevidde. En konto med 10 000 følgere og 15% engasjementsrate vil typisk nå flere enn en konto med 100 000 følgere og 0,5% engasjementsrate — fordi algoritmen prioriterer engasjement.',
      },
      {
        id: 'd',
        label: 'Hashtag-bruk — riktige hashtagger gir alltid høy organisk rekkevidde.',
        isCorrect: false,
        feedback:
          'Feil. Hashtagger kan hjelpe ny rekkevidde, men de er ikke den primære faktoren. Algoritmen prioriterer innholdsrelevans og engasjement langt over hashtagger. Overbruk av hashtagger kan faktisk signalisere spam til algoritmen.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'kk-05',
    icon: '🦆',
    title: 'Viral strategi: Duolingo på TikTok',
    context:
      'Duolingo opprettet en TikTok-konto og lot sin grønne ugle-maskot opptre som en uhøytidelig, humoristisk og til tider absurd karakter. De svarte på kommentarer med memes, laget trending-innhold og drakk "in on the joke". Resultatet: 10+ millioner TikTok-følgere og massiv organisk rekkevidde uten betalt annonsering.',
    question: 'Hva er det mest presise begrepet for det Duolingo gjorde, og hva er suksessformelen?',
    choices: [
      {
        id: 'a',
        label: 'Betalt viral markedsføring — Duolingo betalte TikTok for algoritmeprioritering.',
        isCorrect: false,
        feedback:
          'Feil. Duolingos TikTok-suksess er et eksempel på organisk viral vekst — ikke betalt. Strategien var basert på autentisk, relaterbart og humoristisk innhold som brukerne frivillig delte. Betalt distribusjon var ikke nøkkelfaktoren.',
      },
      {
        id: 'b',
        label: 'Influencer-markedsføring — Duolingo samarbeidet med kjente TikTok-influencere.',
        isCorrect: false,
        feedback:
          'Feil. Duolingo brukte sin egen konto og sin egne maskot — ikke eksterne influencere. Dette er faktisk et argument for at du ikke trenger influencere for å lykkes på TikTok. Merkevaren selv kan være influencer-kontoen.',
      },
      {
        id: 'c',
        label: 'Organisk innholdsmarkedsføring (content marketing) med viral effekt — Duolingo skapte autentisk, plattformtilpasset innhold som trigget TikToks algoritme gjennom høyt engasjement og delbarhet.',
        isCorrect: true,
        feedback:
          'Riktig! Duolingos suksessformel: (1) forstod TikTok-kulturens humor og ironi, (2) skapte innhold som trigget engasjement (kommentarer, duetter, delinger), (3) var konsekvent og autentisk i tonen. Algoritmen belønnet engasjementet med organisk rekkevidde. Nøkkelen var at innholdet passet TikTok-kulturen — ikke at det passet Duolingos tradisjonelle merkevare.',
      },
      {
        id: 'd',
        label: 'SEO-optimalisering — Duolingo brukte riktige hashtagger for å rangere i TikTok-søk.',
        isCorrect: false,
        feedback:
          'Feil. Hashtagger og søkeoptimalisering er én faktor, men ikke suksessformelen. Det som skalerte Duolingos rekkevidde var innholdets engasjement som trigget For-You-Page-algoritmen. Millioner av brukere så innholdet uten å søke etter det.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
