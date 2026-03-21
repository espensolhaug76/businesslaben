import type { QuizExercise } from '../../screens/learninghub/shared/QuizModule'

const ESPEN_TIP = '🚚 Distribusjon handler ikke bare om logistikk — det er en strategisk beslutning som påvirker merkevarens posisjonering!'

export const DISTRIBUSJON_EXERCISES: QuizExercise[] = [
  {
    id: 'dist-01',
    icon: '🔗',
    title: 'Direkte vs indirekte distribusjon',
    context:
      'Tesla selger alle sine biler direkte gjennom egne showroom og nettside. Toyota selger sine biler gjennom et nettverk av uavhengige forhandlere over hele verden.',
    question: 'Hva er den viktigste fordelen for Tesla ved å bruke direkte distribusjon fremfor Toyotas indirekte modell?',
    choices: [
      {
        id: 'a',
        label: 'Tesla slipper å betale moms og avgifter fordi de selger direkte.',
        isCorrect: false,
        feedback:
          'Feil. Moms og avgifter gjelder uavhengig av distribusjonskanal. Det er ikke skattemessige fordeler som er motivet for Teslas direktemodell.',
      },
      {
        id: 'b',
        label: 'Tesla kontrollerer kundeopplevelsen, prissettingen og merkevaren fullt ut — ingen forhandler kan rabattere eller misrepresentere merket.',
        isCorrect: true,
        feedback:
          'Riktig! Direkte distribusjon gir fullstendig kontroll over hvert kontaktpunkt med kunden: pris, presentasjon, testdrivsopplevelse og ettersalgsservice. Tesla-showroom ser identiske ut globalt. En Toyota-forhandler kan derimot gi rabatter, prioritere andre merker og skape ulike kundeopplevelser.',
      },
      {
        id: 'c',
        label: 'Tesla når flere kunder fordi de ikke er begrenset til forhandlernes geografiske plassering.',
        isCorrect: false,
        feedback:
          'Feil. Toyota har faktisk langt flere salgspunkter globalt gjennom sitt forhandlernettverk. Indirekte distribusjon gir typisk bredere geografisk dekning enn direkte distribusjon.',
      },
      {
        id: 'd',
        label: 'Direkte distribusjon er alltid billigere fordi det eliminerer mellomledd.',
        isCorrect: false,
        feedback:
          'Feil. Direkte distribusjon eliminerer mellomledd, men krever at produsenten selv investerer i showroom, ansatte og logistikk. For mange bedrifter er indirekte distribusjon faktisk billigere fordi forhandlerne bærer disse kostnadene.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'dist-02',
    icon: '🥤',
    title: 'Intensiv distribusjon',
    context:
      'Coca-Cola er tilgjengelig i over 200 land og selges i dagligvarebutikker, kiosker, bensinstasjoneer, restauranter, automater, kinoer, idrettsarenaer og flyplasser. Målet er at en Coca-Cola aldri skal være mer enn 50 meter unna en potensiell kunde.',
    question: 'Hva kalles denne distribusjonsstrategien, og hvorfor passer den for Coca-Cola?',
    choices: [
      {
        id: 'a',
        label: 'Selektiv distribusjon — Coca-Cola velger nøye ut sine distribusjonspunkter for å bevare eksklusivitet.',
        isCorrect: false,
        feedback:
          'Feil. Selektiv distribusjon innebærer å velge et begrenset antall utsalgssteder basert på kvalitetskriterier. Dette er stikk motsatt av det Coca-Cola gjør. Coca-Cola ønsker å være overalt.',
      },
      {
        id: 'b',
        label: 'Eksklusiv distribusjon — Coca-Cola har eksklusivavtaler med dagligvarekjeder.',
        isCorrect: false,
        feedback:
          'Feil. Eksklusiv distribusjon betyr at produsenten kun selger gjennom én eller et fåtall utvalgte forhandlere. Coca-Cola gjør det stikk motsatte — de er tilgjengelig overalt og har ingen eksklusivitet.',
      },
      {
        id: 'c',
        label: 'Intensiv distribusjon — Coca-Cola vil være tilgjengelig på så mange salgspunkter som mulig fordi produktet er et lavpris impulskjøp.',
        isCorrect: true,
        feedback:
          'Riktig! Intensiv distribusjon betyr maksimal tilgjengelighet i alle mulige kanaler. Det passer perfekt for forbruksvarer og impulskjøp: jo lettere tilgjengelig, jo høyere salgsvolum. Coca-Cola er et typisk convenience good — kunden bytter til Pepsi om Coca-Cola ikke finnes der de er.',
      },
      {
        id: 'd',
        label: 'Omnikanal-distribusjon — Coca-Cola integrerer digitale og fysiske salgskanaler sømløst.',
        isCorrect: false,
        feedback:
          'Feil. Omnikanal handler om å gi en sømløs og integrert handleopplevelse på tvers av kanaler (nett og butikk). Coca-Cola bruker mange kanaler, men fokuset er på maksimal fysisk tilgjengelighet — ikke på å integrere digital og fysisk handel.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'dist-03',
    icon: '⌚',
    title: 'Eksklusiv distribusjon',
    context:
      'Rolex selger kun gjennom et lite nettverk av godkjente forhandlere og egne butikker. Du kan ikke kjøpe en ny Rolex på nett, i varemagasiner eller hos generelle urhandlere. Ventekøene for populære modeller er 2–5 år.',
    question: 'Hvilken distribusjonstrategi bruker Rolex, og hva er den strategiske fordelen?',
    choices: [
      {
        id: 'a',
        label: 'Intensiv distribusjon — Rolex vil nå flest mulig kunder gjennom mange kanaler.',
        isCorrect: false,
        feedback:
          'Feil. Rolex gjør det stikk motsatte av intensiv distribusjon. De begrenser bevisst tilgjengeligheten for å beskytte merkevarens eksklusivitet og opprettholde høye priser.',
      },
      {
        id: 'b',
        label: 'Eksklusiv distribusjon — Rolex bruker et svært begrenset antall godkjente forhandlere for å kontrollere merkeopplevelsen og opprettholde kunstig knapphet som øker prestisjefølelsen.',
        isCorrect: true,
        feedback:
          'Riktig! Eksklusiv distribusjon er kjernen i Rolex sin luksus-strategi. Begrenset tilgjengelighet skaper etterspørsel som overstiger tilbudet, noe som gir ventelister og øker opplevd eksklusivitet. En Rolex som alle kan kjøpe overalt er ikke lenger en Rolex i verdimessig forstand.',
      },
      {
        id: 'c',
        label: 'Selektiv distribusjon — Rolex velger forhandlere basert på kvalitet men er tilgjengelig i mange butikker.',
        isCorrect: false,
        feedback:
          'Delvis riktig — Rolex velger forhandlere basert på kvalitet. Men selektiv distribusjon innebærer typisk et moderat antall forhandlere, ikke den ekstreme begrensningen Rolex bruker. Rolex er nærmere eksklusiv enn selektiv distribusjon.',
      },
      {
        id: 'd',
        label: 'Direkte distribusjon — Rolex selger kun gjennom egne butikker for å eliminere mellomledd.',
        isCorrect: false,
        feedback:
          'Feil. Rolex selger primært gjennom godkjente tredjeparts-forhandlere (indirekte distribusjon), ikke bare egne butikker. Kombinasjonen av eksklusivt valgte forhandlere og egne boutiques er det som karakteriserer strategien.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'dist-04',
    icon: '🛒',
    title: 'Omnikanal vs multikanal',
    context:
      'IKEA lar deg starte et kjøp på nett, se 3D-modellen i appen, bestille hjem-levering eller hente i butikk, og returnere varen via hvilken som helst kanal. Kundehistorikken er synlig uansett hvilken kanal du bruker.',
    question: 'Hva skiller IKEAs omnikanal-strategi fra en enkel multikanal-strategi?',
    choices: [
      {
        id: 'a',
        label: 'Omnikanal betyr å selge i mange kanaler; multikanal betyr å selge i kun én kanal.',
        isCorrect: false,
        feedback:
          'Feil. Multikanal betyr å selge i flere kanaler. Omnikanal betyr å selge i flere kanaler OG integrere dem slik at kunden opplever én sømløs handleflyt. Definisjonen du beskriver er feil.',
      },
      {
        id: 'b',
        label: 'Omnikanal integrerer alle kanaler slik at kunden opplever én sømløs handleopplevelse uavhengig av kanal; multikanal har separate, uavhengige kanaler.',
        isCorrect: true,
        feedback:
          'Riktig! Multikanal = selger gjennom nett OG butikk, men de opererer uavhengig (ulike priser, separate systemer, ingen delt kundehistorikk). Omnikanal = alle kanaler er integrert i én kundereise. Du kan begynne på nett, fortsette i appen og fullføre i butikk — alt er synkronisert.',
      },
      {
        id: 'c',
        label: 'Multikanal er mer avansert enn omnikanal fordi det krever flere systemer.',
        isCorrect: false,
        feedback:
          'Feil. Omnikanal er mer krevende å implementere enn multikanal fordi det krever integrasjon av alle systemer (lager, kundedata, betalingsløsninger). Multikanal er enklere — du bare legger til kanaler uten å integrere dem.',
      },
      {
        id: 'd',
        label: 'Omnikanal brukes kun av nettbutikker; multikanal er for fysiske butikker.',
        isCorrect: false,
        feedback:
          'Feil. Omnikanal kombinerer nettopp nett og fysiske butikker i én integrert opplevelse. Det er ikke begrenset til nettbutikker — poenget er at grensen mellom digital og fysisk handel viskes ut.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
  {
    id: 'dist-05',
    icon: '📦',
    title: 'Push vs pull i distribusjon',
    context:
      'Red Bull bruker to strategier: de betaler dagligvarekjedene for hylleplass (butikken "pusher" produktet til kunder). Samtidig bruker de ekstremsponsing og sosiale medier for å skape en fanklubb som aktivt etterspør Red Bull i butikker.',
    question: 'Hva er forskjellen mellom push- og pull-strategi i distribusjon, slik Red Bull demonstrerer?',
    choices: [
      {
        id: 'a',
        label: 'Push = reklame til forbrukerne; pull = betaling til butikker for hylleplass.',
        isCorrect: false,
        feedback:
          'Feil. Du har byttet om definisjonene. Betaling for hylleplass er push (produsent presser produktet gjennom distribusjonskjeden til forbruker). Reklame som skaper forbrukernes etterspørsel er pull (forbrukerne trekker produktet gjennom kjeden).',
      },
      {
        id: 'b',
        label: 'Push = produsenten presser produktet gjennom distribusjonskjeden (hylleplass, forhandlerinsentiver); pull = markedsføring skaper forbrukernes etterspørsel som trekker produktet gjennom kjeden.',
        isCorrect: true,
        feedback:
          'Riktig! Push: produsenten bruker salgsfremmende aktiviteter mot forhandlere (hylleplass, kampanjer, rabatter til butikk). Pull: markedsføring rettet mot sluttkonsumenter som skaper etterspørsel — forbrukerne "ber om" produktet i butikk. Red Bull er eksemplarisk i å kombinere begge.',
      },
      {
        id: 'c',
        label: 'Push og pull er bare ulike navn for det samme — begge handler om å øke salg.',
        isCorrect: false,
        feedback:
          'Feil. Push og pull er distinkt ulike strategier med ulike kanaler, budsjetter og målgrupper. Push retter seg mot distribusjonskjeden (B2B); pull retter seg mot sluttkonsumentene (B2C). De kan brukes separat eller i kombinasjon.',
      },
      {
        id: 'd',
        label: 'Pull-strategi brukes kun av store merkevarer med store markedsføringbudsjetter.',
        isCorrect: false,
        feedback:
          'Feil. Pull-strategi kan brukes av alle — sosiale medier har demokratisert evnen til å bygge etterspørsel organisk. Mange småbedrifter bruker pull-strategi gjennom UGC (user generated content) og influencer-samarbeid uten store budsjetter.',
      },
    ],
    espenTip: ESPEN_TIP,
  },
]
