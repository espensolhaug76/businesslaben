export interface OrgRole {
  id: string
  title: string
  titleNO: string
  icon: string
  level: 'top' | 'middle' | 'staff'
  description: string
}

export interface OrgEmployee {
  id: string
  name: string
  emoji: string
}

export interface OrgExercise {
  id: string
  businessType: string
  icon: string
  description: string
  requiredRoles: string[]
  availableRoles: string[]
  employees: OrgEmployee[]
  feedback: string
  espenTip: string
}

export const ALL_ROLES: OrgRole[] = [
  { id: 'daglig_leder', title: 'General Manager', titleNO: 'Daglig leder', icon: '👔', level: 'top', description: 'Overordnet ansvarlig for daglig drift. Rapporterer til styret.' },
  { id: 'salgssjef', title: 'Sales Manager', titleNO: 'Salgssjef', icon: '💼', level: 'middle', description: 'Ansvarlig for salgsteamet og å nå salgsmål.' },
  { id: 'lagersjef', title: 'Warehouse Manager', titleNO: 'Lagersjef', icon: '📦', level: 'middle', description: 'Ansvarlig for lagerstyring og logistikk.' },
  { id: 'kundeservice', title: 'Customer Service Rep', titleNO: 'Kundeservicemedarbeider', icon: '🎧', level: 'staff', description: 'Håndterer kundehenvendelser og klager.' },
  { id: 'okonomisjef', title: 'Finance Manager', titleNO: 'Økonomisjef', icon: '💰', level: 'middle', description: 'Styrer bedriftens økonomi, regnskap og rapportering.' },
  { id: 'markedssjef', title: 'Marketing Manager', titleNO: 'Markedssjef', icon: '📣', level: 'middle', description: 'Planlegger og gjennomfører markedsføringskampanjer.' },
  { id: 'hr_sjef', title: 'HR Manager', titleNO: 'HR-sjef', icon: '👥', level: 'middle', description: 'Tar seg av rekruttering, opplæring og ansattes trivsel.' },
  { id: 'selger', title: 'Sales Associate', titleNO: 'Selger', icon: '🛍️', level: 'staff', description: 'Jobber i butikken, hjelper kunder og behandler salg.' },
  { id: 'regnskapsforer', title: 'Accountant', titleNO: 'Regnskapsfører', icon: '🧾', level: 'staff', description: 'Tar seg av løpende bokføring og fakturering.' },
  { id: 'resepsjonist', title: 'Receptionist', titleNO: 'Resepsjonist', icon: '🏨', level: 'staff', description: 'Tar imot gjester og styrer resepsjonen.' },
  { id: 'kokksjef', title: 'Head Chef', titleNO: 'Kjøkkensjef', icon: '👨‍🍳', level: 'middle', description: 'Leder kjøkkenet og utvikler menyen.' },
  { id: 'servitor', title: 'Waiter', titleNO: 'Servitør', icon: '🍽️', level: 'staff', description: 'Serverer mat og drikke til gjestene.' },
]

export const ORG_EXERCISES: OrgExercise[] = [
  {
    id: 'tesla_showroom',
    businessType: 'Tesla Showroom',
    icon: '⚡',
    description: 'Du skal åpne et nytt Tesla-showroom i Oslo. Du har 6 stillinger å besette. Hvilke roller er viktigst for en premium elbilforhandler?',
    requiredRoles: ['daglig_leder', 'salgssjef', 'kundeservice'],
    availableRoles: ['daglig_leder', 'salgssjef', 'kundeservice', 'markedssjef', 'okonomisjef', 'selger', 'lagersjef'],
    employees: [
      { id: 'e1', name: 'Maja', emoji: '👩' },
      { id: 'e2', name: 'Erik', emoji: '👨' },
      { id: 'e3', name: 'Sofia', emoji: '👩‍💼' },
      { id: 'e4', name: 'Jonas', emoji: '👨‍💼' },
      { id: 'e5', name: 'Lena', emoji: '👩‍🔬' },
      { id: 'e6', name: 'Mikael', emoji: '🧑‍💻' },
    ],
    feedback: 'Tesla trenger sterk kundeservice og salgsekspertise. Daglig leder koordinerer alt, mens Salgssjef driver inntektene. Kundeservicemedarbeidere tar seg av prøvekjøringer og oppfølging.',
    espenTip: '⚠️ Tesla er et premiummerke — kundene forventer eksepsjonell service! Sørg for at du har dedikert kundeservice.',
  },
  {
    id: 'grocery_store',
    businessType: 'Rema 1000',
    icon: '🛒',
    description: 'Du er ny butikksjef ved en Rema 1000. Sett opp et team på 7 for effektiv dagligvaredrift.',
    requiredRoles: ['daglig_leder', 'lagersjef', 'selger'],
    availableRoles: ['daglig_leder', 'lagersjef', 'selger', 'kundeservice', 'okonomisjef', 'hr_sjef', 'regnskapsforer'],
    employees: [
      { id: 'e1', name: 'Anne', emoji: '👩' },
      { id: 'e2', name: 'Per', emoji: '👨' },
      { id: 'e3', name: 'Hilde', emoji: '👩‍🦱' },
      { id: 'e4', name: 'Knut', emoji: '🧔' },
      { id: 'e5', name: 'Siri', emoji: '👩‍🦰' },
      { id: 'e6', name: 'Ole', emoji: '👴' },
      { id: 'e7', name: 'Marte', emoji: '👧' },
    ],
    feedback: 'Dagligvarebutikker trenger effektiv lagerstyring (Lagersjef) og kundevendt personale. Daglig leder har oversikt over den daglige driften.',
    espenTip: '⚠️ I en dagligvarebutikk er lagerstyring kritisk! Tomme hyller driver bort kunder.',
  },
  {
    id: 'thon_hotel',
    businessType: 'Thon Hotel',
    icon: '🏨',
    description: 'Du skal åpne et nytt Thon Hotel med 5 nøkkelstillinger. Hoteller trenger en unik miks av hospitality-roller.',
    requiredRoles: ['daglig_leder', 'resepsjonist', 'kokksjef'],
    availableRoles: ['daglig_leder', 'resepsjonist', 'kokksjef', 'servitor', 'markedssjef', 'hr_sjef', 'okonomisjef'],
    employees: [
      { id: 'e1', name: 'Ingrid', emoji: '👩‍💼' },
      { id: 'e2', name: 'Lars', emoji: '👨‍🍳' },
      { id: 'e3', name: 'Nina', emoji: '👩' },
      { id: 'e4', name: 'Bjørn', emoji: '👨' },
      { id: 'e5', name: 'Astrid', emoji: '👩‍🦳' },
    ],
    feedback: 'Hoteller lever og dør med gjesteopplevelsen. Resepsjonisten er hotellets ansikt utad, Kjøkkensjef leverer kvalitetsmiddag, og Daglig leder sørger for at alt går knirkefritt.',
    espenTip: '⚠️ Førsteinntrykk er alt i hotellbransjen! Resepsjonist-rollen er avgjørende for gjestenes tilfredshet.',
  },
  {
    id: 'cafe',
    businessType: 'Kaffebrenneriet Café',
    icon: '☕',
    description: 'Sett opp en koselig spesialitetskaffebar i Bergen med 5 stillinger. Fokus på kvalitet og kundeopplevelse.',
    requiredRoles: ['daglig_leder', 'kokksjef', 'kundeservice'],
    availableRoles: ['daglig_leder', 'kokksjef', 'kundeservice', 'servitor', 'markedssjef', 'regnskapsforer'],
    employees: [
      { id: 'e1', name: 'Tuva', emoji: '👩' },
      { id: 'e2', name: 'Mads', emoji: '👨' },
      { id: 'e3', name: 'Frida', emoji: '👩‍🦱' },
      { id: 'e4', name: 'Tobias', emoji: '🧔' },
      { id: 'e5', name: 'Emilie', emoji: '👩‍🦰' },
    ],
    feedback: 'En kaffebar lykkes når produktet (kaffe/mat) og servicen er fremragende. Kjøkkensjef tar seg av menyen, kundeservice holder stamgjestene tilbake.',
    espenTip: '⚠️ På kafeer er fart og vennlighet nøkkelen. Lær opp de ansatte godt!',
  },
  {
    id: 'fashion_store',
    businessType: 'Zara Norway',
    icon: '👗',
    description: 'Åpne en ny Zara-butikk på Aker Brygge. Sett opp 6 stillinger for et travelt motehandel-miljø.',
    requiredRoles: ['daglig_leder', 'salgssjef', 'selger'],
    availableRoles: ['daglig_leder', 'salgssjef', 'selger', 'lagersjef', 'markedssjef', 'kundeservice', 'hr_sjef'],
    employees: [
      { id: 'e1', name: 'Isabella', emoji: '👩' },
      { id: 'e2', name: 'Henrik', emoji: '👨' },
      { id: 'e3', name: 'Camilla', emoji: '👩‍🦱' },
      { id: 'e4', name: 'Daniel', emoji: '👨‍💼' },
      { id: 'e5', name: 'Nora', emoji: '👩‍🦳' },
      { id: 'e6', name: 'Alexander', emoji: '👦' },
    ],
    feedback: 'Motehandel trenger god vareeksponering og salgsegenskaper. Lagersjef håndterer lagerrotasjon (avgjørende i fast fashion!), Selgere driver inntektene.',
    espenTip: '⚠️ Fast fashion = rask lageromsetning! Lagerstyring er viktigere her enn i de fleste andre butikker.',
  },
]
