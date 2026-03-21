export interface HMSHazard {
  id: string
  x: number
  y: number
  icon: string
  hazardType: string
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
  consequence: string
  solution: string
  severity: 'low' | 'medium' | 'high'
}

export interface HMSScenario {
  id: string
  setting: string
  icon: string
  description: string
  bgGradient: string
  hazards: HMSHazard[]
  espenTip: string
}

export const HMS_SCENARIOS: HMSScenario[] = [
  {
    id: 'grocery_store',
    setting: 'Dagligvarebutikk',
    icon: '🛒',
    description: 'En travel dagligvarebutikk. Klikk på ⚠️-markørene for å identifisere HMS-farer!',
    bgGradient: 'from-orange-950/40 to-amber-950/40',
    hazards: [
      {
        id: 'wet_floor', x: 25, y: 70, icon: '💧', hazardType: 'Vått gulv',
        question: 'Du ser vann på gulvet ved kjøledisken. Hva er faren?',
        correctAnswer: 'Skli/fall-risiko – vått gulv er en av de vanligste ulykkesårsakene på arbeidsplassen',
        incorrectAnswers: [
          'Kjøleskapet lekker mat – et mattrygghetstilfelle',
          'Gulvet vaskes nettopp – ingen fare her',
        ],
        consequence: 'Kunder eller ansatte kan gli, falle og skade seg alvorlig.',
        solution: 'Sett ut «vått gulv»-skilt umiddelbart, tørk opp vannet og meld fra om lekkasjen til driftsansvarlig.',
        severity: 'high',
      },
      {
        id: 'blocked_exit', x: 85, y: 50, icon: '🚪', hazardType: 'Blokkert nødutgang',
        question: 'Leveringskasser er stablet foran nødutgangen. Hva er faren?',
        correctAnswer: 'Blokkert nødutgang – dette er ulovlig og livstruende ved brann',
        incorrectAnswers: [
          'Kassene lagres midlertidig – akseptabelt',
          'Kassene kan falle på kunder',
        ],
        consequence: 'I en nødsituasjon (brann) kan ikke folk komme seg ut. Dette kan koste liv.',
        solution: 'Flytt kassene umiddelbart. Nødutganger MÅ alltid holdes fri. Påbudt ved lov (AML).',
        severity: 'high',
      },
      {
        id: 'heavy_items', x: 55, y: 30, icon: '📦', hazardType: 'Tunge gjenstander høyt',
        question: 'Tunge drikkevareskasser (24 flasker) ligger øverst på hylla i 2 meters høyde. Hva er faren?',
        correctAnswer: 'Risiko for at tunge gjenstander faller ned på ansatte eller kunder',
        incorrectAnswers: [
          'Lagringen er effektiv – utnytter all høyde',
          'Hylla kan brekke – en skade på eiendom',
        ],
        consequence: 'Tunge gjenstander som faller fra høyde kan forårsake alvorlige skader eller død.',
        solution: 'Lagre tunge ting under skulderhøyde. Bruk riktige hyller med vektgrenser. Gi ansatte opplæring i manuelt løft.',
        severity: 'high',
      },
      {
        id: 'electrical_cord', x: 40, y: 85, icon: '⚡', hazardType: 'Strømledning på gulv',
        question: 'En skjøteledning krysser gulvet mellom kassen og bakrommet. Hva er faren?',
        correctAnswer: 'Snublefare + brannrisiko – ledninger på gulv kan gi fall og elektrisk brann',
        incorrectAnswers: [
          'Ledningen er bare midlertidig – ingen problem',
          'Ledningen kan bli skadet av varevogner',
        ],
        consequence: 'Ansatte eller kunder kan snuble. Skadede ledninger gir elektrisk brann.',
        solution: 'Legg ledninger langs vegger med festeskinner. Installer faste stikkontakter der det trengs.',
        severity: 'medium',
      },
      {
        id: 'missing_extinguisher', x: 70, y: 60, icon: '🧯', hazardType: 'Manglende brannslukker',
        question: 'Brannslukningsapparatet mangler fra sin merkede plass. Hva gjør du?',
        correctAnswer: 'Meld fra umiddelbart – manglende brannsikringsutstyr er alvorlig brudd',
        incorrectAnswers: [
          'Noen av de ansatte har sikkert flyttet det – de setter det tilbake',
          'Sjekk om det er et annet apparat i nærheten – det holder',
        ],
        consequence: 'Uten brannslukker kan en liten brann bli stor før brannvesenet ankommer.',
        solution: 'Meld til verneombud umiddelbart. Dokumenter mangler. Skift ut i dag.',
        severity: 'high',
      },
      {
        id: 'unsafe_lifting', x: 15, y: 45, icon: '🏋️', hazardType: 'Feil løfteteknikk',
        question: 'En ansatt løfter en tung kasse med bøyd rygg og strake bein. Hva er faren?',
        correctAnswer: 'Feil løfteteknikk – alvorlig risiko for ryggskade',
        incorrectAnswers: [
          'Den ansatte ser sterk ut – klarer det fint',
          'Kassen er for tung for hylla',
        ],
        consequence: 'Ryggskader er den vanligste arbeidsulykken i handel. De kan bli permanente.',
        solution: 'Gi alle ansatte opplæring i riktig løfteteknikk: bøy knær, rett rygg, hold tett inntil kroppen. Bruk hjelpemidler for tunge ting.',
        severity: 'medium',
      },
      {
        id: 'poor_lighting', x: 10, y: 20, icon: '💡', hazardType: 'Dårlig belysning',
        question: 'Lageret har to ødelagte lyspærer – det er ganske mørkt. Hva er faren?',
        correctAnswer: 'Dårlig sikt øker ulykkesrisikoen og belaster de ansattes øyne',
        incorrectAnswers: [
          'Spar strøm – det er lyst nok til å jobbe',
          'Det er vanskelig å finne riktige varer – et kundeserviceproblem',
        ],
        consequence: 'Ansatte kan ikke se hindringer, utløpsdatoer eller farer tydelig. Ulykkesrisikoen øker betydelig.',
        solution: 'Skift pærer umiddelbart. Sikre at belysning oppfyller lovkrav (minimum 200 lux i arbeidsområder).',
        severity: 'medium',
      },
      {
        id: 'hygiene', x: 90, y: 85, icon: '🧴', hazardType: 'Tom håndsprit',
        question: 'Håndspriten ved delikatessdisken er tom. Hva bør du gjøre?',
        correctAnswer: 'Fyll på umiddelbart – mathygiene er regulert av Mattilsynet',
        incorrectAnswers: [
          'Kunder kan bruke toalettet i stedet',
          'Det er bare en anbefaling – ikke lovpålagt',
        ],
        consequence: 'Risiko for matsmitte og matforgiftning. Kan føre til stenging av butikk og bøter.',
        solution: 'Fyll på umiddelbart. Sjekk alle dispensere ved starten av hvert skift. Dette er et krav til matvaresikkerhet.',
        severity: 'high',
      },
    ],
    espenTip: '⚠️ HMS (Helse, Miljø og Sikkerhet) er lovpålagt for ALLE norske virksomheter! Arbeidsmiljøloven gjelder alle arbeidsplasser.',
  },
  {
    id: 'warehouse',
    setting: 'Distribusjonslager',
    icon: '🏭',
    description: 'Et distribusjonslager med mange potensielle farer. Finn alle HMS-risikoene!',
    bgGradient: 'from-gray-950/60 to-slate-950/60',
    hazards: [
      {
        id: 'forklift_area', x: 30, y: 60, icon: '🚜', hazardType: 'Gående i truckgater',
        question: 'Ansatte til fots går i samme område som en truck. Hva er faren?',
        correctAnswer: 'Kollisjonsrisiko mellom gående og truck – svært farlig',
        incorrectAnswers: [
          'Truckfører kan se alle – ingen risiko',
          'De ansatte er bare på gjennomgang – akseptabelt',
        ],
        consequence: 'Truck er en av de vanligste årsakene til dødelige arbeidsulykker på lager.',
        solution: 'Merk egne gangfelt og truckgater tydelig. Påbudt med refleksvest for alle i lagerområdet.',
        severity: 'high',
      },
      {
        id: 'unstable_stack', x: 65, y: 40, icon: '📦', hazardType: 'Ustabil stabling',
        question: 'Kasser er stablet i en ustabil pyramideform opp til 4 meters høyde. Hva er faren?',
        correctAnswer: 'Ustabil stabling – kassene kan velte og falle ned på arbeidere',
        incorrectAnswers: [
          'Det sparer gulvplass – effektiv lagring',
          'Kassene i bunnen belastes for mye – produktskade',
        ],
        consequence: 'Kasser som faller fra 4 meters høyde kan være dødelig.',
        solution: 'Stable rett, bruk riktige reolsystemer og overskrid aldri vektgrenser. Gi opplæring i sikker stabling.',
        severity: 'high',
      },
      {
        id: 'no_ppe', x: 80, y: 70, icon: '⛑️', hazardType: 'Manglende verneutstyr',
        question: 'Ansatte jobber uten vernesko og hjelm i lagerområdet. Hva er faren?',
        correctAnswer: 'Manglende personlig verneutstyr (PVU) – lovpålagt i lageromgivelser',
        incorrectAnswers: [
          'PVU er bare påkrevd i tung industri, ikke lager',
          'De ansatte kjenner risikoen og har akseptert den',
        ],
        consequence: 'Fotskader fra fallende gjenstander og hodeskader fra fallende last.',
        solution: 'Påbudt med vernesko og hjelm i lager. Arbeidsgiver MÅ stille PVU gratis til rådighet.',
        severity: 'high',
      },
      {
        id: 'chemical_storage', x: 20, y: 30, icon: '🧪', hazardType: 'Kjemikalier ved matvarer',
        question: 'Rengjøringsmidler lagres ved siden av matvarer i åpen hylle. Hva er faren?',
        correctAnswer: 'Risiko for kjemisk kontaminering av mat – kjemikalier må lagres atskilt fra mat',
        incorrectAnswers: [
          'Kjemikaliene er forseglet – ingen forurensningsrisiko',
          'Det er mer praktisk å ha dem samlet',
        ],
        consequence: 'Kjemisk forurensning av mat kan forårsake alvorlig sykdom eller død.',
        solution: 'Oppbevar kjemikalier i låst skap, tydelig merket, og helt atskilt fra mat. Påkrevd av både matvaresikkerhet og kjemikalieregler.',
        severity: 'high',
      },
      {
        id: 'first_aid', x: 50, y: 80, icon: '🩺', hazardType: 'Utgått førstehjelp',
        question: 'Førstehjelpsskapet er ikke blitt etterfylt på et år. Mange ting er utgått. Hva gjør du?',
        correctAnswer: 'Etterfyll umiddelbart – fullverdig førstehjelpsskrin er lovpålagt',
        incorrectAnswers: [
          'Det meste er fortsatt brukbart – etterfyll når det er tomt',
          'Ring 113 ved nødsituasjoner – førstehjelpsskapet trengs ikke',
        ],
        consequence: 'I en nødsituasjon kan manglende eller utgått utstyr være livstruende.',
        solution: 'Sjekk og etterfyll førstehjelpsskapet månedlig. Tildel ansvar til en bestemt person. Lovpålagt.',
        severity: 'high',
      },
    ],
    espenTip: '⚠️ Lagre har høyest ulykkesfrekvens av alle arbeidsmiljøer. Strenge HMS-rutiner redder liv!',
  },
]
