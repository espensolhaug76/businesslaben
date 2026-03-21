export interface CrisisAction {
  id: string
  label: string
  isCorrect: boolean
  consequence: string
  reputationImpact: number // -20 to +10
}

export interface CrisisScenario {
  id: string
  type: 'payment_down' | 'fire' | 'data_breach' | 'power_outage' | 'staff_shortage'
  icon: string
  title: string
  description: string
  timeLimit: number // seconds
  actions: CrisisAction[]
  contextualHelp: string
  espenTip: string
}

export const CONTINGENCY_SCENARIOS: CrisisScenario[] = [
  {
    id: 'payment_down',
    type: 'payment_down',
    icon: '💳',
    title: 'Betalingsterminal nede!',
    description: 'Betalingsterminalen har sluttet å fungere helt. 8 kunder venter i kø. De blir utålmodige og noen er i ferd med å forlate butikken.',
    timeLimit: 60,
    actions: [
      {
        id: 'manual_mobile',
        label: 'Ta imot Vipps/MobilePay-betaling via telefon',
        isCorrect: true,
        consequence: 'De fleste kunder kan betale raskt. Liten forstyrrelse, køen løser seg.',
        reputationImpact: 8,
      },
      {
        id: 'cash_only',
        label: 'Annonsér: «Kun kontant for øyeblikket»',
        isCorrect: true,
        consequence: 'Noen kunder har kontanter og kan betale. Andre må gå. Delvis service opprettholdes.',
        reputationImpact: 3,
      },
      {
        id: 'close_store',
        label: 'Steng butikken umiddelbart',
        isCorrect: false,
        consequence: 'Alle kunder går frustrerte. Tapte salg og dårlige anmeldelser på nett.',
        reputationImpact: -20,
      },
      {
        id: 'wait_it_out',
        label: 'Be alle vente — IT-support er på vei',
        isCorrect: false,
        consequence: 'Køen vokser til 20+ personer. De fleste går. IT-support bruker 2 timer.',
        reputationImpact: -12,
      },
    ],
    contextualHelp: 'Beredskapsplan: Betalingsterminal nede. Steg 1: Forsøk å starte terminalen på nytt. Steg 2: Aktiver alternative betalingsmetoder (Vipps, kontant). Steg 3: Ring IT-support. Steg 4: Hold kundene informert.',
    espenTip: '⚠️ Ha alltid minst 2 alternative betalingsmetoder! De fleste nordmenn bruker Vipps — sørg for at butikken din er satt opp for det.',
  },
  {
    id: 'fire_alarm',
    type: 'fire',
    icon: '🔥',
    title: 'Brannalarm utløst!',
    description: 'Brannalarmen har gått i lageret. Du kan se røyk. Det er 15 kunder i butikken.',
    timeLimit: 45,
    actions: [
      {
        id: 'evacuate_call',
        label: 'Evakuer alle kunder, ring 110, samle ved møteplass',
        isCorrect: true,
        consequence: 'Alle evakuerer trygt. Brannvesenet ankommer. Du fulgte loven.',
        reputationImpact: 10,
      },
      {
        id: 'check_first',
        label: 'Gå og sjekk lageret for å se hvor ille det er først',
        isCorrect: false,
        consequence: 'Du kaster bort verdifull tid. Brannen sprer seg. Farlig for deg og andre.',
        reputationImpact: -15,
      },
      {
        id: 'extinguisher',
        label: 'Ta brannslukkeren og prøv å slukke selv',
        isCorrect: false,
        consequence: 'For en liten brann kan dette fungere, men du risikerer livet hvis brannen er større. Uten evakuering først er dette farlig.',
        reputationImpact: -5,
      },
      {
        id: 'ignore_alarm',
        label: 'Det er sikkert en falsk alarm — meld fra rolig',
        isCorrect: false,
        consequence: 'Hvis det er ekte, dør folk. Behandle alltid brannalarmer som ekte inntil det motsatte er bekreftet.',
        reputationImpact: -20,
      },
    ],
    contextualHelp: 'Brannberedskapsplan: ALLTID evakuer først, SÅ ring. Gå aldri tilbake inn i bygningen. Møteplass: utenfor hovedinngangen.',
    espenTip: '⚠️ Ved brann: Evakuer → Ring 110 → Samle ved møteplass. GÅ ALDRI tilbake for å hente ting!',
  },
  {
    id: 'data_breach',
    type: 'data_breach',
    icon: '🔐',
    title: 'Datainnbrudd oppdaget!',
    description: 'IT-systemet ditt har oppdaget uautorisert tilgang til kundedatabasen. 2 000 e-postadresser og kjøpshistorikk kan ha blitt eksponert.',
    timeLimit: 60,
    actions: [
      {
        id: 'notify_authorities',
        label: 'Meld umiddelbart til Datatilsynet og varsle berørte kunder',
        isCorrect: true,
        consequence: 'Du oppfylte GDPR-forpliktelsene dine. Kunder stoler på åpenheten din. Bøterisiko minimert.',
        reputationImpact: 7,
      },
      {
        id: 'fix_quietly',
        label: 'Fiks sikkerhetshullet stille uten å si det til noen',
        isCorrect: false,
        consequence: 'GDPR-brudd! Datatilsynet kan bøtelegge deg med opptil €20M eller 4 % av global omsetning. Straffeansvar.',
        reputationImpact: -20,
      },
      {
        id: 'consult_lawyer',
        label: 'Ring advokat og personvernombud umiddelbart',
        isCorrect: true,
        consequence: 'Godt første steg. Med juridisk veiledning kan du svare riktig og minimere ansvar.',
        reputationImpact: 5,
      },
      {
        id: 'wait_confirm',
        label: 'Vent 48 timer for å bekrefte bruddet før du handler',
        isCorrect: false,
        consequence: 'GDPR krever melding innen 72 timer fra OPPDAGELSE. Å vente øker bøter og ansvar.',
        reputationImpact: -10,
      },
    ],
    contextualHelp: 'GDPR-datainnbrudd: Meld til Datatilsynet innen 72 timer. Varsle berørte personer ved høy risiko. Dokumenter alt. Ring personvernombudet.',
    espenTip: '⚠️ GDPR (Personvernforordningen) gjelder for ALLE virksomheter som håndterer kundedata i Norge. Datainnbrudd må meldes innen 72 timer!',
  },
  {
    id: 'power_outage',
    type: 'power_outage',
    icon: '⚡',
    title: 'Fullstendig strømbrudd!',
    description: 'Strømmen er borte i hele bygget. Nødlys er på. Butikken fungerer med batterisikring, men kassene er nede. Klokken er 15:00 på en fredag.',
    timeLimit: 60,
    actions: [
      {
        id: 'manual_operations',
        label: 'Gå over til manuell kontantbetaling, noter salg, ring strømselskapet',
        isCorrect: true,
        consequence: 'Butikken holder åpent. Inntektene fortsetter. Kunder informert. Profesjonell respons.',
        reputationImpact: 8,
      },
      {
        id: 'emergency_close',
        label: 'Steng umiddelbart og be alle kunder forlate stedet',
        isCorrect: false,
        consequence: 'Unødvendig stenging. Tapte inntekter. Fredagsettermiddag = rushtid = stort tap.',
        reputationImpact: -8,
      },
      {
        id: 'call_electrician',
        label: 'Ring en elektriker for å undersøke',
        isCorrect: false,
        consequence: 'Bra, men ikke første prioritet. Først: hold kunder trygge og driften i gang. SÅ undersøk.',
        reputationImpact: -3,
      },
      {
        id: 'social_media',
        label: 'Legg ut på sosiale medier og kontakt pressen om strømbruddet',
        isCorrect: false,
        consequence: 'Dette kan vente. Operativ respons er prioritet. Sosiale medier kan forstørre problemer.',
        reputationImpact: -5,
      },
    ],
    contextualHelp: 'Strømbruddsplan: Aktiver manuelle prosedyrer. Sjekk nødbelysning. Hold butikken åpen hvis trygt. Kontakt strømselskapet (Hafslund: 05000). Dokumenter alle manuelle salg.',
    espenTip: '⚠️ En god beredskapsplan inkluderer manuelle prosedyrer for alle systemer. Øv på dem FØR nødsituasjonen oppstår!',
  },
  {
    id: 'staff_shortage',
    type: 'staff_shortage',
    icon: '🤒',
    title: 'Halvparten av staben er sykemeldt!',
    description: '4 av dine 8 planlagte ansatte har ringt inn syke i dag morges. Det er en travel lørdag. Butikken åpner om 1 time.',
    timeLimit: 60,
    actions: [
      {
        id: 'call_backup',
        label: 'Aktiver vikarpoolen og ring inn vikarer umiddelbart',
        isCorrect: true,
        consequence: 'Du fyller de fleste stillinger. Travelt men håndterbart. Kunder merker nesten ingenting.',
        reputationImpact: 9,
      },
      {
        id: 'reduced_service',
        label: 'Åpne med tilgjengelig personale, reduser servicenivå, prioriter nøkkelavdelinger',
        isCorrect: true,
        consequence: 'Litt tregere, lengre køer. Men butikken holder åpent og kunder blir betjent.',
        reputationImpact: 4,
      },
      {
        id: 'close_store',
        label: 'Steng butikken for dagen',
        isCorrect: false,
        consequence: 'Stort inntektstap. Faste kunder går til konkurrenter. Kommer kanskje ikke tilbake.',
        reputationImpact: -18,
      },
      {
        id: 'social_media_hire',
        label: 'Legg ut en «søkes jobb»-annonse på sosiale medier og be følgere komme og jobbe i dag',
        isCorrect: false,
        consequence: 'Kreativt men urealistisk. Ukjente uten opplæring = sikkerhets- og kvalitetsrisiko.',
        reputationImpact: -5,
      },
    ],
    contextualHelp: 'Personalmangel-plan: Ha en oppdatert vikarpool. Definer minimumsbemanning. Ha en prioriteringsliste over hvilke oppgaver som er viktigst. Leder tar gulvvakter ved behov.',
    espenTip: '⚠️ Alle bedrifter trenger en vikarpool! Minimum 3–5 opplærte tilkallingsvakter er bransjestandard.',
  },
]
